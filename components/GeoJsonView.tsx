import React from 'react';
import type { GeoJsonArtifact } from '../types';
import { MapIcon } from './icons/MapIcon';

interface GeoJsonViewProps {
  artifacts: GeoJsonArtifact[];
}

export const GeoJsonView: React.FC<GeoJsonViewProps> = ({ artifacts }) => {
  if (!artifacts || artifacts.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-slate-800/50 p-10 rounded-lg border border-slate-700 border-dashed">
            <MapIcon className="w-16 h-16 text-slate-500 mb-4" />
            <h3 className="text-xl font-semibold text-slate-300">No GeoJSON Artifacts Generated</h3>
            <p className="text-slate-400 mt-2 text-center">The analysis did not produce any geographic data files.</p>
        </div>
    );
  }
  
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Maybe add a toast notification later
  }

  return (
    <div className="space-y-6">
      {artifacts.map((artifact, index) => (
        <div key={index} className="bg-slate-900/50 rounded-lg">
          <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-t-lg">
             <h4 className="font-semibold text-slate-200">{artifact.name}</h4>
             <button onClick={() => handleCopy(JSON.stringify(artifact, null, 2))} className="text-xs bg-slate-600 hover:bg-slate-500 text-slate-200 font-semibold py-1 px-3 rounded-md transition-colors">
                Copy JSON
            </button>
          </div>
          <pre className="p-4 text-xs overflow-auto max-h-[60vh]">
            <code>{JSON.stringify(artifact, null, 2)}</code>
          </pre>
        </div>
      ))}
    </div>
  );
};
