
import React, { useState } from 'react';
import type { OsintInput } from '../types';
import { SearchIcon } from './icons/SearchIcon';

interface OsintFormProps {
  onSubmit: (data: OsintInput) => void;
  isLoading: boolean;
}

export const OsintForm: React.FC<OsintFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<OsintInput>({
    full_name: 'ბიძინა ივანიშვილი',
    aliases: 'Bidzina Ivanishvili, Борис Иванишвили',
    locations: 'საქართველო, თბილისი, საჩხერე',
    handles: '',
    organizations: 'ქართული ოცნება, Cartu Group',
    from: '',
    to: '',
    language_priority: 'ka, en, ru',
    depth: 'deep',
    exclusions: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const InputField: React.FC<{ label: string; name: keyof OsintInput; placeholder?: string; type?: 'text' | 'date'; value: string }> = ({ label, name, placeholder, type = 'text', value }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-slate-200"
      />
    </div>
  );
  
  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 space-y-6">
        <h2 className="text-xl font-semibold text-white">Investigation Target</h2>
        <InputField label="Full Name" name="full_name" value={formData.full_name} placeholder="e.g., John Doe" />
        <InputField label="Aliases / Transliterations" name="aliases" value={formData.aliases} placeholder="e.g., Johnny D, Jon Doe" />
        <InputField label="Locations (Country/City)" name="locations" value={formData.locations} placeholder="e.g., USA, New York" />
        <InputField label="Known Handles / Profiles" name="handles" value={formData.handles} placeholder="e.g., @johndoe, linkedin.com/in/johndoe" />
        <InputField label="Associated Organizations" name="organizations" value={formData.organizations} placeholder="e.g., Acme Corp, Globex Inc." />
        
        <h2 className="text-xl font-semibold text-white mt-4 pt-4 border-t border-slate-700">Scope</h2>
        <div className="grid grid-cols-2 gap-4">
            <InputField label="From Date" name="from" type="date" value={formData.from} />
            <InputField label="To Date" name="to" type="date" value={formData.to} />
        </div>
        <InputField label="Language Priority" name="language_priority" value={formData.language_priority} placeholder="e.g., en, fr, de" />
        <div>
            <label htmlFor="depth" className="block text-sm font-medium text-slate-300 mb-1">Analysis Depth</label>
            <select id="depth" name="depth" value={formData.depth} onChange={handleChange} className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-slate-200">
                <option value="quick">Quick</option>
                <option value="standard">Standard</option>
                <option value="deep">Deep</option>
                <option value="max">Max</option>
            </select>
        </div>
        <div>
          <label htmlFor="exclusions" className="block text-sm font-medium text-slate-300 mb-1">Exclusions</label>
          <textarea
            id="exclusions"
            name="exclusions"
            value={formData.exclusions}
            onChange={handleChange}
            rows={2}
            placeholder="e.g., irrelevant person with same name, private data"
            className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-slate-200"
          />
        </div>

        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-200">
            {isLoading ? (
                <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                </>
            ) : (
                <>
                    <SearchIcon className="w-5 h-5" />
                    Run Analysis
                </>
            )}
        </button>
    </form>
  );
};