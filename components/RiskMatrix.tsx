
import React from 'react';
import type { RiskSignal } from '../types';

interface RiskMatrixProps {
  signals: RiskSignal[];
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ signals }) => {
  if (!signals || signals.length === 0) {
    return <p className="text-slate-400">No risk signals identified.</p>;
  }

  const severityClasses: { [key: string]: string } = {
    low: 'bg-green-500/20 text-green-300',
    medium: 'bg-yellow-500/20 text-yellow-300',
    high: 'bg-red-500/20 text-red-300',
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left table-auto">
        <thead className="bg-slate-700/50">
          <tr>
            <th className="p-3 text-sm font-semibold text-slate-300">Signal</th>
            <th className="p-3 text-sm font-semibold text-slate-300">Description</th>
            <th className="p-3 text-sm font-semibold text-slate-300 text-center">Severity</th>
            <th className="p-3 text-sm font-semibold text-slate-300 text-center">Confidence</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {signals.map((signal, index) => (
            <tr key={index} className="hover:bg-slate-700/30">
              <td className="p-3 font-medium text-slate-200">{signal.signal}</td>
              <td className="p-3 text-slate-400">{signal.description}</td>
              <td className="p-3 text-center">
                <span className={`px-3 py-1 text-xs font-bold rounded-full capitalize ${severityClasses[signal.severity] || 'bg-gray-500/20'}`}>
                  {signal.severity}
                </span>
              </td>
              <td className="p-3 text-center font-mono text-slate-300">{signal.confidence.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
