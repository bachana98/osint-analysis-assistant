import React from 'react';
import type { Threat } from '../types';

interface ThreatAssessmentViewProps {
  threats: Threat[];
}

export const ThreatAssessmentView: React.FC<ThreatAssessmentViewProps> = ({ threats }) => {
  if (!threats || threats.length === 0) {
    return <p className="text-slate-400">No specific threats assessed based on the available data.</p>;
  }

  const severityClasses: { [key: string]: { border: string, text: string, bg: string } } = {
    low: { border: 'border-green-400/50', text: 'text-green-300', bg: 'bg-green-500/10' },
    medium: { border: 'border-yellow-400/50', text: 'text-yellow-300', bg: 'bg-yellow-500/10' },
    high: { border: 'border-red-400/50', text: 'text-red-300', bg: 'bg-red-500/10' },
  };

  return (
    <div className="space-y-4">
      {threats.map((threat, index) => {
        const classes = severityClasses[threat.severity] || severityClasses.low;
        return (
          <div key={index} className={`border-l-4 p-4 rounded-r-lg ${classes.border} ${classes.bg}`}>
            <div className="flex justify-between items-start">
              <h4 className={`text-lg font-semibold ${classes.text}`}>{threat.threat_type}</h4>
              <span className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${classes.bg} ${classes.text} border ${classes.border}`}>{threat.severity}</span>
            </div>
            <p className="mt-2 text-slate-300">{threat.description}</p>
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-slate-200 mb-1">Recommendation:</h5>
              <p className="text-sm text-slate-400">{threat.recommendation}</p>
            </div>
            <div className="mt-3 flex justify-between items-center text-xs">
                <div>
                    {threat.sources.map((src, i) => (
                        <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline mr-2">
                            Source {i+1}
                        </a>
                    ))}
                </div>
                <span className="font-mono text-slate-400">Conf: {threat.confidence.toFixed(2)}</span>
            </div>
          </div>
        )
      })}
    </div>
  );
};
