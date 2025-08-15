import React from 'react';
import type { Property } from '../types';
import { BuildingIcon } from './icons/BuildingIcon';

interface PropertiesViewProps {
  properties: Property[];
}

export const PropertiesView: React.FC<PropertiesViewProps> = ({ properties }) => {
  if (!properties || properties.length === 0) {
    return <p className="text-slate-400">No property information identified.</p>;
  }

  return (
    <div className="space-y-6">
      {properties.map((prop, index) => (
        <div key={index} className="bg-slate-700/30 p-4 rounded-lg border border-slate-700">
          <div className="flex justify-between items-start">
            <h4 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
                <BuildingIcon className="w-5 h-5" />
                {prop.label}
            </h4>
            <span className="font-mono text-xs bg-slate-600 px-2 py-1 rounded">Conf: {prop.confidence.toFixed(2)}</span>
          </div>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-slate-300">Address</p>
              <p className="text-slate-400">{prop.address_text}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-300">Admin Area</p>
              <p className="text-slate-400">{prop.admin_area}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-300">Coordinates</p>
              <p className="font-mono text-slate-400">{prop.coordinates.lat}, {prop.coordinates.lon} ({prop.coordinates.precision})</p>
            </div>
             <div>
              <p className="font-semibold text-slate-300">Parcel ID</p>
              <p className="text-slate-400">{prop.parcel_id || 'N/A'}</p>
            </div>
          </div>
          {prop.notes && (
             <div className="mt-4">
                <p className="font-semibold text-slate-300 text-sm">Notes</p>
                <p className="text-slate-400 text-sm bg-slate-900/50 p-2 rounded-md mt-1">{prop.notes}</p>
            </div>
          )}
          <div className="mt-4">
            <p className="font-semibold text-slate-300 text-sm mb-1">Source Evidence</p>
            <div className="flex flex-col space-y-1">
                {prop.source_evidence.map((src, i) => (
                    <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:underline truncate">
                        {src}
                    </a>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
