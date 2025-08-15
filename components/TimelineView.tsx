
import React from 'react';
import type { TimelineEvent } from '../types';
import { CalendarIcon } from './icons/CalendarIcon';

interface TimelineViewProps {
  timeline: TimelineEvent[];
}

export const TimelineView: React.FC<TimelineViewProps> = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return <p className="text-slate-400">No timeline data available.</p>;
  }
  
  const categoryColors: { [key: string]: string } = {
      career: 'bg-blue-500/20 text-blue-300',
      education: 'bg-green-500/20 text-green-300',
      media: 'bg-purple-500/20 text-purple-300',
      legal: 'bg-red-500/20 text-red-300',
      publication: 'bg-indigo-500/20 text-indigo-300',
      property: 'bg-orange-500/20 text-orange-300',
      other: 'bg-slate-500/20 text-slate-300'
  }

  return (
    <div className="relative border-l-2 border-slate-700 pl-8 space-y-8">
      {timeline.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((item, index) => (
        <div key={index} className="relative">
          <div className="absolute -left-[45px] top-1 h-8 w-8 bg-slate-800 rounded-full flex items-center justify-center ring-4 ring-slate-900">
            <CalendarIcon className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="bg-slate-700/30 p-4 rounded-lg">
            <div className="flex justify-between items-start">
              <p className="text-sm font-semibold text-cyan-400">{item.date}</p>
              <div className="flex items-center gap-2">
                {item.confidence && (
                    <span className="text-xs font-mono bg-slate-600 px-1.5 py-0.5 rounded">
                        Conf: {item.confidence.toFixed(2)}
                    </span>
                )}
                <span className={`text-xs font-medium px-2 py-1 rounded-full capitalize ${categoryColors[item.category] || categoryColors['other']}`}>
                    {item.category}
                </span>
              </div>
            </div>
            <h4 className="font-semibold text-slate-200 mt-1">{item.event}</h4>
            <div className="mt-2">
                {item.sources.map((src, i) => (
                    <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="text-xs text-slate-400 hover:text-cyan-400 truncate block">
                        Source {i+1}
                    </a>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
