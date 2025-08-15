
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';

export const Loader: React.FC = () => {
    const messages = [
        "Analyzing digital footprints...",
        "Cross-referencing sources...",
        "Building relationship graph...",
        "Scanning public archives...",
        "Compiling structured report..."
    ];
    const [message, setMessage] = React.useState(messages[0]);

    React.useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            index = (index + 1) % messages.length;
            setMessage(messages[index]);
        }, 2500);

        return () => clearInterval(intervalId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-slate-800/50 p-10 rounded-lg border border-slate-700 border-dashed">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-24 w-24 rounded-full border-t-2 border-b-2 border-cyan-400 animate-spin"></div>
        <SearchIcon className="h-12 w-12 text-cyan-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-300 mt-6">Analysis in Progress</h3>
      <p className="text-slate-400 mt-2 text-center w-64">{message}</p>
    </div>
  );
};
