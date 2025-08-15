import React, { useState } from 'react';
import type { Report, Graph } from '../types';
import { Loader } from './Loader';
import { TimelineView } from './TimelineView';
import { GraphView } from './GraphView';
import { RiskMatrix } from './RiskMatrix';
import { ThreatAssessmentView } from './ThreatAssessmentView';
import { EntitiesView } from './EntitiesView';
import { DorkPackView } from './DorkPackView';
import { PropertiesView } from './PropertiesView';
import { ImageryEvidenceView } from './ImageryEvidenceView';
import { GeoJsonView } from './GeoJsonView';
import { InfoIcon } from './icons/InfoIcon';
import { UsersIcon } from './icons/UsersIcon';
import { CodeIcon } from './icons/CodeIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { BuildingIcon } from './icons/BuildingIcon';
import { ImageIcon } from './icons/ImageIcon';
import { MapIcon } from './icons/MapIcon';
import { WorkflowDiagram } from './WorkflowDiagram';


interface ResultsDisplayProps {
  report: Report | null;
  graph: Graph | null;
  rawText: string | null;
  isLoading: boolean;
  error: string | null;
}

type Tab = 'summary' | 'timeline' | 'graph' | 'entities' | 'properties' | 'imagery' | 'geojson' | 'risks' | 'threats' | 'dorks' | 'sources' | 'raw';

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ report, graph, rawText, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState<Tab>('summary');

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="bg-slate-800/50 p-6 rounded-lg border border-red-500/50 text-red-300">
        <h3 className="font-bold text-lg mb-2">An Error Occurred</h3>
        <p>{error}</p>
        {rawText && (
          <div className="mt-4">
              <h4 className="font-semibold mb-2">Raw API Output:</h4>
              <pre className="bg-slate-900 p-4 rounded-md text-xs overflow-auto max-h-96">
                  <code>{rawText}</code>
              </pre>
          </div>
        )}
      </div>
    );
  }

  if (!report) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-800/50 p-10 rounded-lg border border-slate-700 border-dashed">
        <InfoIcon className="w-16 h-16 text-slate-500 mb-4" />
        <h3 className="text-xl font-semibold text-slate-300">Awaiting Analysis</h3>
        <p className="text-slate-400 mt-2 text-center max-w-md">Fill out the form and click "Run Analysis" to see the results here.</p>
        <WorkflowDiagram />
      </div>
    );
  }

  const TabButton: React.FC<{ tabName: Tab; label: string; icon?: React.ReactNode }> = ({ tabName, label, icon }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`px-3 py-2 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
        activeTab === tabName
          ? 'bg-cyan-600 text-white'
          : 'text-slate-300 hover:bg-slate-700'
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="bg-slate-800/50 p-1 sm:p-2 rounded-lg border border-slate-700">
        <div className="p-4 border-b border-slate-700">
            <h2 className="text-2xl font-bold text-white">Analysis for: <span className="text-cyan-400">{report.identity_profile.canonical_name}</span></h2>
            <p className="text-sm text-slate-400 mt-1">Overall Confidence Score: <span className="font-mono bg-slate-700 px-2 py-0.5 rounded">{report.summary.overall_confidence.toFixed(2)}</span></p>
        </div>
        
        <div className="p-2 sm:p-4 border-b border-slate-700 flex flex-wrap gap-2">
            <TabButton tabName="summary" label="Summary" />
            <TabButton tabName="timeline" label="Timeline" />
            <TabButton tabName="graph" label="Graph" />
            <TabButton tabName="entities" label="Entities" icon={<UsersIcon className="w-4 h-4" />} />
            <TabButton tabName="properties" label="Properties" icon={<BuildingIcon className="w-4 h-4" />} />
            <TabButton tabName="imagery" label="Imagery" icon={<ImageIcon className="w-4 h-4" />} />
            <TabButton tabName="geojson" label="GeoJSON" icon={<MapIcon className="w-4 h-4" />} />
            <TabButton tabName="risks" label="Risks" />
            <TabButton tabName="threats" label="Threats" icon={<ShieldIcon className="w-4 h-4" />} />
            <TabButton tabName="dorks" label="Dorks" icon={<CodeIcon className="w-4 h-4" />} />
            <TabButton tabName="sources" label="Sources" />
            <TabButton tabName="raw" label="Raw" />
        </div>
        
        <div className="p-4 sm:p-6">
            {activeTab === 'summary' && (
                <div className="space-y-8">
                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-cyan-400 border-b border-cyan-400/20 pb-2">Key Findings</h3>
                        <ul className="list-disc pl-5 space-y-2 text-slate-300">
                            {report.summary.key_findings.map((finding, index) => (
                                <li key={index}>
                                    {finding.text}
                                    <span className="ml-2 text-xs font-mono bg-slate-700 px-1.5 py-0.5 rounded">Conf: {finding.confidence.toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {report.summary.open_questions && report.summary.open_questions.length > 0 &&
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-cyan-400 border-b border-cyan-400/20 pb-2">Open Questions</h3>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300">
                                {report.summary.open_questions.map((q, index) => <li key={index}>{q}</li>)}
                            </ul>
                        </div>
                    }

                    <div>
                        <h3 className="text-xl font-semibold mb-3 text-cyan-400 border-b border-cyan-400/20 pb-2">Detailed Report</h3>
                         <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-white max-w-none whitespace-pre-wrap">
                            {report.detailed_report_text || "No detailed report text available."}
                        </div>
                    </div>
                    
                    {report.limitations && report.limitations.length > 0 &&
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-orange-400 border-b border-orange-400/20 pb-2">Limitations</h3>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300">
                                {report.limitations.map((l, index) => <li key={index}>{l}</li>)}
                            </ul>
                        </div>
                    }

                    {report.next_steps && report.next_steps.length > 0 &&
                        <div>
                            <h3 className="text-xl font-semibold mb-3 text-green-400 border-b border-green-400/20 pb-2">Next Steps</h3>
                            <ul className="list-disc pl-5 space-y-2 text-slate-300">
                                {report.next_steps.map((s, index) => <li key={index}>{s}</li>)}
                            </ul>
                        </div>
                    }
                </div>
            )}
            {activeTab === 'timeline' && <TimelineView timeline={report.timeline} />}
            {activeTab === 'graph' && graph && <GraphView graph={graph} />}
            {activeTab === 'entities' && <EntitiesView affiliations={report.affiliations} relationships={report.relationships}/>}
            {activeTab === 'properties' && <PropertiesView properties={report.properties} />}
            {activeTab === 'imagery' && <ImageryEvidenceView imagery={report.imagery_evidence} />}
            {activeTab === 'geojson' && <GeoJsonView artifacts={report.geojson_artifacts} />}
            {activeTab === 'risks' && <RiskMatrix signals={report.risk_signals} />}
            {activeTab === 'threats' && <ThreatAssessmentView threats={report.threat_assessment} />}
            {activeTab === 'dorks' && <DorkPackView dork_pack={report.dork_pack} />}
            {activeTab === 'sources' && <SourceList sources={report.source_registry} />}
            {activeTab === 'raw' && (
                <div>
                    <h3 className="text-xl font-semibold mb-3">Raw API Output</h3>
                    <pre className="bg-slate-900 p-4 rounded-md text-xs overflow-auto max-h-[60vh]"><code>{rawText}</code></pre>
                </div>
            )}
        </div>
    </div>
  );
};

export const SourceList: React.FC<{sources: Report['source_registry']}> = ({sources}) => {
    if (!sources || sources.length === 0) {
        return <p className="text-slate-400">No sources found.</p>
    }
    return (
        <div className="space-y-3">
            {sources.map((source, index) => (
                <div key={index} className="bg-slate-700/50 p-3 rounded-md">
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline break-all">{source.url}</a>
                    <div className="text-sm text-slate-400 mt-1 flex flex-wrap gap-4">
                        <span>Publisher: <span className="font-semibold text-slate-300">{source.publisher}</span></span>
                        <span className="capitalize">Type: <span className="font-semibold text-slate-300">{source.type}</span></span>
                        <span>First Seen: <span className="font-semibold text-slate-300">{source.first_seen}</span></span>
                         {source.last_seen && <span>Last Seen: <span className="font-semibold text-slate-300">{source.last_seen}</span></span>}
                    </div>
                </div>
            ))}
        </div>
    )
}