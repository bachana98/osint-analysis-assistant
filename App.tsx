
import React, { useState, useCallback } from 'react';
import { OsintForm } from './components/OsintForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { runOsintAnalysis } from './services/geminiService';
import type { OsintInput, Report, Graph } from './types';
import { TargetIcon } from './components/icons/TargetIcon';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [graph, setGraph] = useState<Graph | null>(null);
  const [rawText, setRawText] = useState<string | null>(null);

  const handleAnalysisRequest = useCallback(async (input: OsintInput) => {
    setIsLoading(true);
    setError(null);
    setReport(null);
    setGraph(null);
    setRawText(null);

    try {
      const result = await runOsintAnalysis(input);
      if (result.report || result.graph) {
        setReport(result.report);
        setGraph(result.graph);
        setRawText(result.rawText);
      } else {
        setError('Failed to parse a valid report from the API response. Check the raw output for details.');
        setRawText(result.rawText);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <header className="bg-slate-950/70 backdrop-blur-md p-4 border-b border-slate-700 sticky top-0 z-10">
        <div className="container mx-auto flex items-center gap-4">
           <TargetIcon className="w-8 h-8 text-cyan-400" />
           <h1 className="text-2xl font-bold tracking-tight text-white">OSINT Analysis Assistant</h1>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 xl:col-span-3">
            <OsintForm onSubmit={handleAnalysisRequest} isLoading={isLoading} />
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <ResultsDisplay
              report={report}
              graph={graph}
              rawText={rawText}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
