import React from 'react';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

const workflowSteps = [
  "User Input",
  "AI Studio Super OSINT Prompt",
  "Data Enrichment Layer",
  "Cross-Referencing & Validation",
  "Visualization & Report Generation",
  "JSON/GeoJSON + PDF/Graph Output"
];

const WorkflowStep: React.FC<{ title: string; isLast?: boolean }> = ({ title, isLast }) => (
  <div className="flex items-center gap-x-2 md:gap-x-4">
    <div className="bg-slate-700/50 border border-slate-600 rounded-md p-3 text-center text-xs font-semibold text-slate-300 w-36 min-h-[5rem] flex items-center justify-center">
      {title}
    </div>
    {!isLast && <ArrowRightIcon className="w-6 h-6 text-slate-500 flex-shrink-0" />}
  </div>
);

export const WorkflowDiagram: React.FC = () => {
    return (
        <div className="w-full mt-8">
            <h4 className="text-lg font-semibold text-slate-300 mb-4 text-center">Analysis Workflow</h4>
            <div className="flex flex-wrap items-center justify-center gap-y-2">
                {workflowSteps.map((step, index) => (
                    <WorkflowStep
                      key={step}
                      title={step}
                      isLast={index === workflowSteps.length - 1}
                    />
                ))}
            </div>
        </div>
    );
};
