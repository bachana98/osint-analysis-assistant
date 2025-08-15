
import React from 'react';
import type { Affiliation, Relationship } from '../types';

interface EntitiesViewProps {
  affiliations: Affiliation[];
  relationships: Relationship[];
}

const SourceLinks: React.FC<{ sources: string[] }> = ({ sources }) => (
    <div className="flex flex-col space-y-1">
        {sources.map((src, i) => (
            <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline truncate">
                Source {i + 1}
            </a>
        ))}
    </div>
);


export const EntitiesView: React.FC<EntitiesViewProps> = ({ affiliations, relationships }) => {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold mb-3 text-cyan-400 border-b border-cyan-400/20 pb-2">Affiliations</h3>
        {affiliations && affiliations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="p-3 text-sm font-semibold text-slate-300">Entity</th>
                  <th className="p-3 text-sm font-semibold text-slate-300">Role</th>
                  <th className="p-3 text-sm font-semibold text-slate-300">Period</th>
                  <th className="p-3 text-sm font-semibold text-slate-300 text-center">Confidence</th>
                  <th className="p-3 text-sm font-semibold text-slate-300">Sources</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {affiliations.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-700/30">
                    <td className="p-3 font-medium text-slate-200">{item.entity}</td>
                    <td className="p-3 text-slate-300">{item.role}</td>
                    <td className="p-3 text-slate-400 text-sm">{item.from} to {item.to || 'Present'}</td>
                    <td className="p-3 text-center font-mono text-slate-300">{item.confidence.toFixed(2)}</td>
                    <td className="p-3"><SourceLinks sources={item.sources} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-400">No affiliations identified.</p>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-3 text-cyan-400 border-b border-cyan-400/20 pb-2">Relationships</h3>
        {relationships && relationships.length > 0 ? (
           <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">
              <thead className="bg-slate-700/50">
                  <tr>
                    <th className="p-3 text-sm font-semibold text-slate-300">Source Entity</th>
                    <th className="p-3 text-sm font-semibold text-slate-300">Target Entity</th>
                    <th className="p-3 text-sm font-semibold text-slate-300">Type</th>
                    <th className="p-3 text-sm font-semibold text-slate-300 text-center">Confidence</th>
                    <th className="p-3 text-sm font-semibold text-slate-300">Evidence</th>
                  </tr>
              </thead>
              <tbody className="divide-y divide-slate-700">
                {relationships.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-700/30">
                    <td className="p-3 font-medium text-slate-200">{item.source_entity}</td>
                    <td className="p-3 font-medium text-slate-200">{item.target_entity}</td>
                    <td className="p-3 text-slate-300 capitalize">{item.type}</td>
                    <td className="p-3 text-center font-mono text-slate-300">{item.confidence.toFixed(2)}</td>
                    <td className="p-3"><SourceLinks sources={item.evidence} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-slate-400">No relationships identified.</p>
        )}
      </div>
    </div>
  );
};
