import React from 'react';
import type { ImageryEvidence } from '../types';

interface ImageryEvidenceViewProps {
  imagery: ImageryEvidence[];
}

export const ImageryEvidenceView: React.FC<ImageryEvidenceViewProps> = ({ imagery }) => {
  if (!imagery || imagery.length === 0) {
    return <p className="text-slate-400">No imagery evidence available.</p>;
  }

  return (
    <div className="space-y-8">
      {imagery.map((evidence, index) => (
        <div key={index} className="bg-slate-700/20 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-3 text-cyan-400 border-b border-cyan-400/20 pb-2">
            Target: <span className="font-mono">{evidence.target_ref}</span>
          </h3>
          <div className="space-y-4">
            {evidence.snapshots.map((snapshot, sIndex) => (
                <div key={sIndex} className="bg-slate-800/50 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                        <p className="font-semibold text-slate-200">{snapshot.provider}</p>
                        <span className="text-sm text-slate-400">{snapshot.capture_date}</span>
                    </div>
                    <a href={snapshot.url} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-400 hover:underline break-all my-2 block">View Source Imagery</a>
                    <div>
                        <p className="font-semibold text-slate-300 text-sm">Observations:</p>
                        <ul className="list-disc pl-5 text-slate-400 text-sm mt-1">
                            {snapshot.observations.map((obs, oIndex) => <li key={oIndex}>{obs}</li>)}
                        </ul>
                    </div>
                    <div className="text-right mt-2 font-mono text-xs text-slate-500">
                        Conf: {snapshot.confidence.toFixed(2)}
                    </div>
                </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
