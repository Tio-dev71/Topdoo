import React, { useState } from 'react';
import {
  Share2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  ArrowRight,
  List,
  Shield,
  Activity,
  Globe,
  Wallet,
  Phone,
  Server,
  Building2,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { initialNetwork, getRiskMeta } from '../../data/securityData';
import { RiskBadge } from '../../components/common/RiskBadge';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { PageTransition } from '../../components/common/PageTransition';

export function ScamNetworkView() {
  const { entities, navigateToEntity } = useSecurity();

  const [viewMode, setViewMode] = useState('graph'); // 'graph' or 'table'
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState('ent-1');

  // Node coordinates layout
  const nodePositions = {
    'ent-1': { x: 420, y: 260 },
    'ent-2': { x: 620, y: 160 },
    'ent-3': { x: 220, y: 160 },
    'node-srv-1': { x: 440, y: 430 },
    'ent-4': { x: 260, y: 440 },
    'ent-5': { x: 120, y: 360 },
    'ent-6': { x: 720, y: 360 },
    'ent-7': { x: 820, y: 240 },
    'ent-8': { x: 840, y: 440 },
    'ent-9': { x: 160, y: 520 },
    'ent-10': { x: 80, y: 500 },
    'ent-11': { x: 540, y: 520 }
  };

  const selectedNode = initialNetwork.nodes.find(n => n.id === selectedNodeId) || initialNetwork.nodes[0];
  const selectedEntity = entities.find(e => e.id === selectedNode.id) || entities[0];

  // Connected edges for selected node
  const activeEdges = initialNetwork.edges.filter(
    e => e.source === selectedNodeId || e.target === selectedNodeId
  );

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
            padding: '24px 28px',
            borderRadius: 16,
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '3px 10px',
                  borderRadius: 9999,
                  background: 'rgba(37, 99, 235, 0.08)',
                  border: '1px solid rgba(37, 99, 235, 0.2)',
                  color: '#2563EB',
                  fontSize: 12,
                  fontWeight: 600
                }}
              >
                <Share2 size={13} />
                Infrastructure Graph Analysis
              </span>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>•</span>
              <span style={{ fontSize: 12, color: '#64748B' }}>{initialNetwork.nodes.length} Interconnected Nodes</span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
              Scam Infrastructure Network & Cluster Visualizer
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: '#475569', maxWidth: 680 }}>
              Trace shared hosting providers, bulletproof reverse proxies, money laundering contract sweeps, and cross-border social engineering rings.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center', alignSelf: 'center' }}>
            {/* View mode toggle */}
            <div
              style={{
                display: 'flex',
                background: '#F1F5F9',
                padding: 3,
                borderRadius: 10,
                border: '1px solid #E2E8F0'
              }}
            >
              <button
                type="button"
                onClick={() => setViewMode('graph')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: viewMode === 'graph' ? 700 : 500,
                  border: 'none',
                  background: viewMode === 'graph' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'graph' ? '#2563EB' : '#64748B',
                  boxShadow: viewMode === 'graph' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 150ms ease'
                }}
              >
                <Share2 size={14} />
                <span>Interactive Graph</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '6px 14px',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: viewMode === 'table' ? 700 : 500,
                  border: 'none',
                  background: viewMode === 'table' ? '#FFFFFF' : 'transparent',
                  color: viewMode === 'table' ? '#2563EB' : '#64748B',
                  boxShadow: viewMode === 'table' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 150ms ease'
                }}
              >
                <List size={14} />
                <span>Accessible Table</span>
              </button>
            </div>
          </div>
        </div>

        {/* GRAPH VIEW */}
        {viewMode === 'graph' ? (
          <div className="network-graph-container" style={{ width: '100%', height: 640, position: 'relative', background: '#F8FAFC', borderRadius: 16, border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
            {/* Zoom & Canvas controls */}
            <div className="network-controls">
              <button
                type="button"
                className="btn-icon"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  color: '#0F172A',
                  cursor: 'pointer'
                }}
                onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.8))}
                title="Zoom In"
              >
                <ZoomIn size={15} />
              </button>
              <button
                type="button"
                className="btn-icon"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  color: '#0F172A',
                  cursor: 'pointer'
                }}
                onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.6))}
                title="Zoom Out"
              >
                <ZoomOut size={15} />
              </button>
              <button
                type="button"
                className="btn-icon"
                style={{
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  color: '#0F172A',
                  cursor: 'pointer'
                }}
                onClick={() => setZoomLevel(1)}
                title="Reset Zoom"
              >
                <Maximize2 size={15} />
              </button>
            </div>

            {/* Side Drawer: Inspected Node Information */}
            {selectedNode && (
              <div
                className="network-side-drawer"
                style={{
                  background: 'rgba(255, 255, 255, 0.96)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid #E2E8F0',
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: '#F1F5F9',
                      color: '#475569',
                      textTransform: 'uppercase'
                    }}
                  >
                    {selectedNode.type}
                  </span>
                  <RiskBadge score={selectedNode.riskScore} size="sm" />
                </div>

                <div style={{ fontWeight: 800, fontSize: 15, color: '#0F172A', marginBottom: 3, wordBreak: 'break-all' }}>
                  {selectedNode.label}
                </div>
                <div style={{ fontSize: 12, color: '#64748B', marginBottom: 16 }}>
                  Role: <strong style={{ color: '#334155' }}>{selectedNode.category}</strong>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, borderTop: '1px solid #F1F5F9', paddingTop: 14, fontSize: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Correlated Edges:</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{activeEdges.length} links</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Abuse Reports:</span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{selectedEntity?.reportsCount || 12}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748B' }}>Threat Classification:</span>
                    <span style={{ color: selectedNode.riskScore >= 70 ? '#DC2626' : '#2563EB', fontWeight: 700 }}>
                      {selectedNode.riskScore >= 70 ? 'Malicious Cluster' : 'Suspicious Infrastructure'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  style={{
                    width: '100%',
                    marginTop: 18,
                    borderRadius: 10,
                    fontWeight: 600,
                    background: '#2563EB',
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.25)'
                  }}
                  onClick={() => navigateToEntity(selectedNode.id)}
                >
                  <span>Open Intelligence Profile</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            )}

            {/* SVG Graph Render Area */}
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 960 620"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s ease-out'
              }}
            >
              {/* Subtle Dot Grid Background */}
              <defs>
                <pattern id="lightGrid" width="36" height="36" patternUnits="userSpaceOnUse">
                  <circle cx="18" cy="18" r="1.2" fill="#CBD5E1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#lightGrid)" />

              {/* Render Edges */}
              {initialNetwork.edges.map((edge, idx) => {
                const src = nodePositions[edge.source];
                const tgt = nodePositions[edge.target];
                if (!src || !tgt) return null;

                const isHighlighted = edge.source === selectedNodeId || edge.target === selectedNodeId;

                return (
                  <g key={idx}>
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke={isHighlighted ? '#2563EB' : '#CBD5E1'}
                      strokeWidth={isHighlighted ? 2.5 : 1.2}
                      strokeDasharray={isHighlighted ? 'none' : '4, 4'}
                    />
                    {/* Midpoint relation text badge */}
                    {isHighlighted && (
                      <g transform={`translate(${(src.x + tgt.x) / 2}, ${(src.y + tgt.y) / 2})`}>
                        <rect
                          x="-38"
                          y="-10"
                          width="76"
                          height="18"
                          rx="4"
                          fill="#FFFFFF"
                          stroke="#2563EB"
                          strokeWidth="1"
                        />
                        <text
                          y="3"
                          fill="#2563EB"
                          fontSize="9"
                          fontFamily="sans-serif"
                          textAnchor="middle"
                          fontWeight="700"
                        >
                          {edge.relation}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Render Nodes */}
              {initialNetwork.nodes.map(node => {
                const pos = nodePositions[node.id];
                if (!pos) return null;

                const isSelected = selectedNodeId === node.id;
                const meta = getRiskMeta(node.riskScore);

                return (
                  <g
                    key={node.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    onClick={() => setSelectedNodeId(node.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {/* Selection Pulse Ring */}
                    {isSelected && (
                      <circle
                        r="28"
                        fill="rgba(37, 99, 235, 0.12)"
                        stroke="#2563EB"
                        strokeWidth="2"
                      />
                    )}

                    {/* Node Shadow */}
                    <circle
                      r={isSelected ? 20 : 16}
                      fill="#FFFFFF"
                      stroke={meta.color}
                      strokeWidth={isSelected ? 3.5 : 2.5}
                      filter="drop-shadow(0 2px 6px rgba(0,0,0,0.1))"
                    />

                    {/* Center icon dot */}
                    <circle
                      r="4"
                      fill={meta.color}
                    />

                    {/* Node label with pill background */}
                    <g transform="translate(0, 32)">
                      <rect
                        x={-(Math.min(node.label.length, 16) * 4 + 10)}
                        y="-10"
                        width={Math.min(node.label.length, 16) * 8 + 20}
                        height="18"
                        rx="4"
                        fill="#FFFFFF"
                        stroke={isSelected ? '#2563EB' : '#E2E8F0'}
                        strokeWidth="1"
                        filter="drop-shadow(0 1px 3px rgba(0,0,0,0.05))"
                      />
                      <text
                        y="3"
                        fill={isSelected ? '#2563EB' : '#0F172A'}
                        fontSize="10"
                        fontWeight={isSelected ? '700' : '600'}
                        textAnchor="middle"
                        fontFamily="monospace"
                      >
                        {node.label.length > 16 ? `${node.label.substring(0, 14)}...` : node.label}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        ) : (
          /* ACCESSIBLE TABLE ALTERNATIVE */
          <div
            className="sec-card"
            style={{
              padding: 0,
              overflow: 'hidden',
              borderRadius: 16,
              background: '#FFFFFF',
              border: '1px solid #E2E8F0'
            }}
          >
            <div className="table-responsive">
              <table className="sec-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569' }}>Node Identifier</th>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569' }}>Vector Type</th>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569' }}>Role / Cluster Function</th>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569' }}>Risk Level</th>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569' }}>Connected Edges</th>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {initialNetwork.nodes.map((node, idx) => (
                    <tr
                      key={node.id}
                      style={{
                        background: idx % 2 === 0 ? '#FFFFFF' : '#FBFDFE',
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background 120ms ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#F0F7FF'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 === 0 ? '#FFFFFF' : '#FBFDFE'; }}
                    >
                      <td style={{ padding: '14px 16px' }}>
                        <div
                          className="table-entity-link"
                          onClick={() => navigateToEntity(node.id)}
                          style={{ cursor: 'pointer', display: 'inline-flex' }}
                        >
                          <TechnicalMono value={node.label} canCopy={false} />
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: 4,
                            background: '#F1F5F9',
                            color: '#475569',
                            textTransform: 'uppercase'
                          }}
                        >
                          {node.type}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: 13, color: '#334155', fontWeight: 500 }}>
                          {node.category}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <RiskBadge score={node.riskScore} size="sm" />
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: '#2563EB',
                            background: 'rgba(37, 99, 235, 0.08)',
                            padding: '2px 8px',
                            borderRadius: 9999
                          }}
                        >
                          {initialNetwork.edges.filter(e => e.source === node.id || e.target === node.id).length} links
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{
                            padding: '4px 12px',
                            fontSize: 11,
                            borderRadius: 6,
                            fontWeight: 600
                          }}
                          onClick={() => navigateToEntity(node.id)}
                        >
                          Investigate
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
