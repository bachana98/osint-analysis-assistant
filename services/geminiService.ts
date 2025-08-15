
import { GoogleGenAI } from "@google/genai";
import type { OsintInput, Report, Graph, GeminiAnalysisResult } from '../types';
import { SYSTEM_PROMPT } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

function constructUserPrompt(input: OsintInput): string {
    return `
[TASK]
გააკეთე deep-OSINT ძიება და სრული ანგარიში.

TARGET:
- სახელი და გვარი: ${input.full_name}
- ალიასები/ტრანსლიტერაციები: ${input.aliases}
- ჰენდლები/პროფილები: ${input.handles}
- ლოკაციები (ქალაქი/ქვეყანა): ${input.locations}
- დაკავშირებული ორგანიზაციები: ${input.organizations}
- დროითი დიაპაზონი: ${input.from || 'N/A'} → ${input.to || 'N/A'}
- ენის პრიორიტეტი: ${input.language_priority}

SCOPE:
- სიღრმე: ${input.depth}
- გამორიცხე: ${input.exclusions}
- შედეგები: executive_summary, detailed_report, timeline, graph, json, geojson, dork_pack, appendix

OUTPUT:
- ენა: ka
- ციტირება: inline (URL)
- დააბრუნე Report JSON და Graph JSON ზემოთ მოცემული სქემებით.
`;
}

// A more robust JSON parser that finds JSON within backticks
const parseJsonFromText = <T,>(text: string, schemaIdentifier: string): T | null => {
    // Regex to find a JSON block for either report or graph
    const regex = new RegExp("```json\\s*(\\{\\s*\"" + schemaIdentifier + "\"[\\s\\S]*?\\})\\s*```");
    const match = text.match(regex);
    if (match && match[1]) {
        let jsonString = match[1];
        try {
            // Attempt to fix common LLM-generated JSON errors.
            let fixedJson = jsonString;

            // 1. Fix missing commas between properties.
            // e.g., { "key": "value" "key2": "value2" } -> { "key": "value", "key2": "value2" }
            // This looks for a value-ending character followed by whitespace and a property-starting quote.
            const missingCommaRegex = /([}\]]|true|false|null|"|[0-9])\s*(")/g;
            fixedJson = fixedJson.replace(missingCommaRegex, '$1, $2');
            
            // 2. Remove trailing commas from objects and arrays.
              // e.g., { "key": "value", } -> { "key": "value" }
            const trailingCommaRegex = /,(?=\s*[}\]])/g;
            fixedJson = fixedJson.replace(trailingCommaRegex, '');

            return JSON.parse(fixedJson) as T;
        } catch (e) {
            console.error(`Failed to parse JSON for schema: ${schemaIdentifier}`, e);
            // Log the original un-fixed string to help debug the model's output
            console.error("Problematic JSON string (original):", jsonString);
            return null;
        }
    }
    return null;
};


export const runOsintAnalysis = async (input: OsintInput): Promise<GeminiAnalysisResult> => {
    try {
        const userPrompt = constructUserPrompt(input);
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [{role: "user", parts: [{text: SYSTEM_PROMPT}, {text: userPrompt}]}],
        });

        const rawText = response.text;
        const report = parseJsonFromText<Report>(rawText, 'summary');
        const graph = parseJsonFromText<Graph>(rawText, 'nodes');

        // Attempt to extract the Georgian text report, excluding the JSON parts
        let detailedReportText = rawText;
        if (report) {
            detailedReportText = detailedReportText.replace(/```json\s*(\{[\s\S]*?"next_steps"[\s\S]*?\})\s*```/g, '');
        }
        if (graph) {
            detailedReportText = detailedReportText.replace(/```json\s*(\{[\s\S]*?"edges"[\s\S]*?\})\s*```/g, '');
        }

        if (report) {
            report.detailed_report_text = detailedReportText.trim();
        }

        return { report, graph, rawText };

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        if (error instanceof Error) {
            throw new Error(`Gemini API Error: ${error.message}`);
        }
        throw new Error("An unknown error occurred while communicating with the Gemini API.");
      }
};