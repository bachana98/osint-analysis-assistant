
import React from 'react';
import type { Dork } from '../types';
import { CodeIcon } from './icons/CodeIcon';

interface DorkPackViewProps {
  dork_pack: Dork[];
}

export const DorkPackView: React.FC<DorkPackViewProps> = ({ dork_pack }) => {
  if (!dork_pack || dork_pack.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-slate-800/50 p-10 rounded-lg border border-slate-700 border-dashed">
            <CodeIcon className="w-16 h-16 text-slate-500 mb-4" />
            <h3 className="text-xl font-semibold text-slate-300">No Dork Pack Generated</h3>
            <p className="text-slate-400 mt-2 text-center">The analysis did not produce a list of search queries.</p>
        </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-slate-400 text-sm">This is the list of search queries (dorks) generated and used by the AI for this investigation.</p>
      {dork_pack.map((dork, index) => (
        <div key={index} className="bg-slate-700/30 p-4 rounded-lg border border-slate-700">
          <p className="font-mono text-cyan-300 bg-slate-900 p-3 rounded-md break-words text-sm">{dork.query}</p>
          <p className="mt-3 text-sm text-slate-300">{dork.rationale}</p>
          <div className="mt-3 flex gap-4 text-xs">
            <span className="font-semibold text-slate-400">Engine: <span className="font-mono bg-slate-600 px-2 py-1 rounded-full">{dork.engine}</span></span>
            <span className="font-semibold text-slate-400">Track: <span className="font-mono bg-slate-600 px-2 py-1 rounded-full">{dork.track}</span></span>
          </div>
        </div>
      ))}
    </div>
  );
};
