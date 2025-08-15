
import React, { useMemo } from 'react';
import type { Graph, GraphNode } from '../types';

interface GraphViewProps {
  graph: Graph;
}

const colors: { [key in GraphNode['type'] | 'edge' | 'text']: string } = {
    person: '#22d3ee', // cyan-400
    org: '#f472b6', // pink-400
    asset: '#facc15', // yellow-400
    edge: '#64748b', // slate-500
    text: '#cbd5e1' // slate-300
};

export const GraphView: React.FC<GraphViewProps> = ({ graph }) => {
  const width = 800;
  const height = 500;
  
  const nodePositions = useMemo(() => {
    const positions = new Map<string, { x: number; y: number }>();
    if (!graph.nodes) return positions;

    const numNodes = graph.nodes.length;
    const radius = Math.min(width, height) / 2 - 50;
    const centerX = width / 2;
    const centerY = height / 2;

    graph.nodes.forEach((node, index) => {
      const angle = (index / numNodes) * 2 * Math.PI;
      positions.set(node.id, {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      });
    });
    return positions;
  }, [graph.nodes, width, height]);

  if (!graph || !graph.nodes || !graph.edges) {
    return <p className="text-slate-400">No graph data available.</p>;
  }

  return (
    <div className="bg-slate-900/50 p-4 rounded-lg overflow-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[600px]">
        <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill={colors.edge} />
            </marker>
        </defs>

        {graph.edges.map((edge, i) => {
          const sourcePos = nodePositions.get(edge.source);
          const targetPos = nodePositions.get(edge.target);
          if (!sourcePos || !targetPos) return null;

          const dx = targetPos.x - sourcePos.x;
          const dy = targetPos.y - sourcePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const nx = dx/dist;
          const ny = dy/dist;
          
          const targetX = targetPos.x - nx * 18; // offset to not overlap with circle
          const targetY = targetPos.y - ny * 18;

          return (
            <g key={`edge-${i}`}>
                <line
                    x1={sourcePos.x}
                    y1={sourcePos.y}
                    x2={targetX}
                    y2={targetY}
                    stroke={colors.edge}
                    strokeWidth="1.5"
                    markerEnd="url(#arrowhead)"
                />
                <text
                    x={sourcePos.x + dx/2}
                    y={sourcePos.y + dy/2 - 5}
                    fill={colors.text}
                    fontSize="10"
                    textAnchor="middle"
                >
                    {edge.relation}
                </text>
            </g>
          );
        })}

        {graph.nodes.map((node) => {
          const pos = nodePositions.get(node.id);
          if (!pos) return null;

          return (
            <g key={node.id}>
              <circle
                cx={pos.x}
                cy={pos.y}
                r="15"
                fill={colors[node.type] || colors.org}
                stroke="#1e293b"
                strokeWidth="2"
              />
              <text
                x={pos.x}
                y={pos.y + 30}
                fill={colors.text}
                fontSize="12"
                textAnchor="middle"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
