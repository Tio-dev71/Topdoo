import React, { useState } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Bookmark,
  Share2,
  Download,
  AlertTriangle,
  FileText,
  FileCheck,
  CheckCircle,
  Share,
  Layers,
  Activity,
  History,
  Clock,
  ArrowRight,
  ExternalLink,
  PlusCircle,
  Copy,
  Check,
  Server,
  Network
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { RiskGauge } from '../../components/common/RiskGauge';
import { RiskBadge } from '../../components/common/RiskBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { PageTransition } from '../../components/common/PageTransition';

export function EntityProfileView() {
  const {
    activeEntity,
    entities,
    reports,
    evidenceList,
    toggleWatchlist,
    navigateToEntity,
    setCurrentView,
    showToast
  } = useSecurity();

  const [activeTab, setActiveTab] = useState('overview');
  const [copied, setCopied] = useState(false);

  if (!activeEntity) {
    return (
      <PageTransition>
        <div
          style={{
            padding: 60,
            textAlign: 'center',
            background: '#FFFFFF',
            borderRadius: 16,
            border: '1px solid #E2E8F0',
            maxWidth: 600,
            margin: '40px auto'
          }}
        >
          <ShieldAlert size={36} color="#94A3B8" style={{ marginBottom: 12 }} />
          <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', marginBottom: 6 }}>
            No Entity Selected
          </h3>
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
            Please select an entity from the Scam Database or Overview to view its complete intelligence dossier.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => setCurrentView('scam-database')}
            style={{ borderRadius: 10, padding: '8px 20px', fontWeight: 600 }}
          >
            Open Scam Database
          </button>
        </div>
      </PageTransition>
    );
  }

  // Linked reports & evidence for this specific entity
  const linkedReports = reports.filter(r => r.entityId === activeEntity.id || r.entityIdentifier === activeEntity.identifier);
  const linkedEvidence = evidenceList.filter(ev => ev.entityId === activeEntity.id || ev.entityIdentifier === activeEntity.identifier);

  const handleCopyIdentifier = () => {
    navigator.clipboard.writeText(activeEntity.identifier);
    setCopied(true);
    showToast('Copied to Clipboard', activeEntity.identifier, 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Link Copied', `Direct investigation link for ${activeEntity.identifier} copied to clipboard.`, 'success');
  };

  const handleExportDossier = () => {
    const jsonStr = JSON.stringify(activeEntity, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `topdoo_dossier_${activeEntity.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Dossier Exported', `Downloaded full intelligence dossier for ${activeEntity.identifier}.`, 'info');
  };

  const riskColor =
    activeEntity.riskScore >= 81 ? '#DC2626' :
    activeEntity.riskScore >= 61 ? '#EA580C' :
    activeEntity.riskScore >= 41 ? '#D97706' :
    activeEntity.riskScore >= 21 ? '#2563EB' : '#059669';

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1100, margin: '0 auto' }}>
        {/* Entity Profile Header Card */}
        <div
          className="sec-card"
          style={{
            padding: '28px 32px',
            borderRadius: 20,
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            borderTop: `4px solid ${riskColor}`
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    padding: '3px 8px',
                    borderRadius: 6,
                    background: '#F1F5F9',
                    color: '#475569'
                  }}
                >
                  {activeEntity.type}
                </span>
                <StatusBadge status={activeEntity.status} />
                <span style={{ fontSize: 12, color: '#94A3B8' }}>•</span>
                <span style={{ fontSize: 12, color: '#64748B', fontFamily: 'monospace', fontWeight: 600 }}>
                  ID: {activeEntity.id}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em', color: '#0F172A', margin: 0 }}>
                  {activeEntity.identifier}
                </h1>
                <button
                  type="button"
                  onClick={handleCopyIdentifier}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '4px 8px',
                    borderRadius: 6,
                    border: '1px solid #E2E8F0',
                    background: '#F8FAFC',
                    color: copied ? '#059669' : '#64748B',
                    cursor: 'pointer',
                    fontSize: 11,
                    gap: 4
                  }}
                  title="Copy Identifier"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div style={{ fontSize: 13, color: '#475569' }}>
                <strong style={{ color: '#0F172A' }}>{activeEntity.name}</strong> • First observed on {activeEntity.createdAt} • Last seen {activeEntity.lastSeen}
              </div>
            </div>

            {/* Action Toolbar */}
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => toggleWatchlist(activeEntity.id)}
                style={{
                  borderRadius: 10,
                  padding: '7px 12px',
                  fontWeight: 600,
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: activeEntity.watchlist ? '#2563EB' : '#475569'
                }}
              >
                <Bookmark size={14} fill={activeEntity.watchlist ? '#2563EB' : 'none'} />
                <span>{activeEntity.watchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={handleShare}
                style={{
                  borderRadius: 10,
                  padding: '7px 12px',
                  fontWeight: 600,
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#475569'
                }}
              >
                <Share2 size={14} />
                <span>Share</span>
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={handleExportDossier}
                style={{
                  borderRadius: 10,
                  padding: '7px 12px',
                  fontWeight: 600,
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#475569'
                }}
              >
                <Download size={14} />
                <span>Export Dossier</span>
              </button>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentView('report-scam')}
                style={{
                  borderRadius: 10,
                  padding: '7px 16px',
                  fontWeight: 600,
                  background: '#2563EB',
                  boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
                }}
              >
                <PlusCircle size={14} />
                <span>Report Abuse</span>
              </button>
            </div>
          </div>

          {/* Risk Assessment Strip with Light Theme Background */}
          <div
            style={{
              marginTop: 24,
              padding: '18px 20px',
              borderRadius: 14,
              background: '#F8FAFC',
              border: '1px solid #E2E8F0'
            }}
          >
            <RiskGauge score={activeEntity.riskScore} size="lg" />
          </div>
        </div>

        {/* Tab Navigation matching Modern Pill Style */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            overflowX: 'auto',
            paddingBottom: 4
          }}
        >
          {[
            { id: 'overview', label: 'Intelligence Overview' },
            { id: 'reports', label: `Reports (${linkedReports.length})` },
            { id: 'evidence', label: `Evidence Vault (${linkedEvidence.length})` },
            { id: 'verification', label: 'Verification Audit' },
            { id: 'network', label: `Connected Network (${activeEntity.relatedEntityIds?.length || 0})` },
            { id: 'activity', label: 'Activity Telemetry' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '8px 16px',
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  borderRadius: 10,
                  border: isActive ? '1px solid #2563EB' : '1px solid #E2E8F0',
                  background: isActive ? '#2563EB' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#475569',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 2px 8px rgba(37, 99, 235, 0.2)' : '0 1px 2px rgba(0, 0, 0, 0.03)'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB CONTENT: OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Threat Intelligence Summary */}
            <div className="sec-card" style={{ borderRadius: 16 }}>
              <div className="sec-card-header" style={{ marginBottom: 12 }}>
                <div className="sec-card-title" style={{ fontSize: 15, fontWeight: 700 }}>
                  <ShieldAlert size={16} color="#DC2626" />
                  <span>Threat Intelligence Assessment</span>
                </div>
                <RiskBadge score={activeEntity.riskScore} size="sm" />
              </div>
              <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.6, margin: 0 }}>
                {activeEntity.summary}
              </p>
            </div>

            {/* Contributing Risk Factors */}
            <div className="sec-card" style={{ borderRadius: 16 }}>
              <div className="sec-card-header" style={{ marginBottom: 16 }}>
                <div className="sec-card-title" style={{ fontSize: 15, fontWeight: 700 }}>
                  <Activity size={16} color="#2563EB" />
                  <span>Algorithmic Risk Factor Contribution</span>
                </div>
                <span style={{ fontSize: 12, color: '#64748B' }}>
                  Weighted Signal Composition
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {activeEntity.riskFactors?.map((factor, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 12,
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                          {factor.name}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 9999,
                            background: factor.status === 'Critical' ? 'rgba(220, 38, 38, 0.08)' : '#E2E8F0',
                            color: factor.status === 'Critical' ? '#DC2626' : '#475569'
                          }}
                        >
                          {factor.status}
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontWeight: 800, fontSize: 13, color: factor.score > 20 ? '#DC2626' : '#0F172A' }}>
                          +{factor.score} pts
                        </span>
                        <span style={{ fontSize: 11, color: '#94A3B8' }}>/ {factor.max} max</span>
                      </div>
                    </div>

                    <div style={{ height: 5, background: '#E2E8F0', borderRadius: 9999, overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${(factor.score / factor.max) * 100}%`,
                          background: factor.score > 20 ? '#DC2626' : (factor.score > 10 ? '#D97706' : '#2563EB'),
                          borderRadius: 9999,
                          transition: 'width 0.5s ease'
                        }}
                      />
                    </div>

                    <div style={{ fontSize: 12, color: '#475569', lineHeight: 1.4 }}>
                      {factor.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Network Entities */}
            <div className="sec-card" style={{ borderRadius: 16 }}>
              <div className="sec-card-header" style={{ marginBottom: 14 }}>
                <div className="sec-card-title" style={{ fontSize: 15, fontWeight: 700 }}>
                  <Layers size={16} color="#2563EB" />
                  <span>Directly Connected Infrastructure Nodes</span>
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setCurrentView('scam-network')}
                  style={{ color: '#2563EB', fontWeight: 600, fontSize: 12 }}
                >
                  <span>Open Full Graph</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {activeEntity.relatedEntityIds?.map(relId => {
                  const rel = entities.find(e => e.id === relId);
                  if (!rel) return null;
                  return (
                    <div
                      key={relId}
                      onClick={() => navigateToEntity(rel.id)}
                      style={{
                        padding: '12px 16px',
                        background: '#FFFFFF',
                        borderRadius: 10,
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 120ms ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#2563EB';
                        e.currentTarget.style.background = '#F8FAFC';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#E2E8F0';
                        e.currentTarget.style.background = '#FFFFFF';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
                          {rel.type}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', fontFamily: 'monospace' }}>
                          {rel.identifier}
                        </span>
                        <span style={{ fontSize: 12, color: '#64748B' }}>
                          ({rel.name})
                        </span>
                      </div>
                      <RiskBadge score={rel.riskScore} size="sm" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: REPORTS */}
        {activeTab === 'reports' && (
          <div className="sec-card" style={{ borderRadius: 16 }}>
            <div className="sec-card-header" style={{ marginBottom: 18 }}>
              <div className="sec-card-title" style={{ fontSize: 15, fontWeight: 700 }}>
                <FileText size={16} color="#2563EB" />
                <span>Incident & Victim Reports ({linkedReports.length})</span>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentView('report-scam')}
                style={{ borderRadius: 8, fontWeight: 600 }}
              >
                <PlusCircle size={14} />
                <span>File Incident Report</span>
              </button>
            </div>

            {linkedReports.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}>
                No direct community reports linked to this entity.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {linkedReports.map(rep => (
                  <div
                    key={rep.id}
                    style={{
                      padding: 16,
                      background: '#F8FAFC',
                      borderRadius: 12,
                      border: '1px solid #E2E8F0',
                      borderLeft: '4px solid #2563EB',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="mono" style={{ fontWeight: 800, fontSize: 13, color: '#0F172A' }}>
                          {rep.id}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: 4,
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#475569'
                          }}
                        >
                          {rep.category}
                        </span>
                      </div>
                      <StatusBadge status={rep.status} />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                      {rep.title}
                    </div>
                    <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                      {rep.description}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748B', paddingTop: 8, borderTop: '1px solid #E2E8F0', flexWrap: 'wrap', gap: 8 }}>
                      <span>Loss Incurred: <strong style={{ color: '#DC2626' }}>{rep.lossReported}</strong></span>
                      <span>Filed: {rep.createdAt}</span>
                      <span>Reviewer: {rep.reviewer}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: EVIDENCE */}
        {activeTab === 'evidence' && (
          <div className="sec-card" style={{ borderRadius: 16 }}>
            <div className="sec-card-header" style={{ marginBottom: 18 }}>
              <div className="sec-card-title" style={{ fontSize: 15, fontWeight: 700 }}>
                <FileCheck size={16} color="#2563EB" />
                <span>Forensic Evidence Vault ({linkedEvidence.length})</span>
              </div>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setCurrentView('evidence')}
                style={{ borderRadius: 8, fontWeight: 600 }}
              >
                <span>Evidence Workspace</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {linkedEvidence.length === 0 ? (
              <div style={{ padding: 40, textAlign: 'center', color: '#64748B' }}>
                No forensic evidence items stored for this entity.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {linkedEvidence.map(ev => (
                  <div
                    key={ev.id}
                    style={{
                      padding: 16,
                      background: '#F8FAFC',
                      borderRadius: 12,
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span className="mono" style={{ fontWeight: 800, fontSize: 13, color: '#0F172A' }}>{ev.id}</span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: 4,
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#475569'
                          }}
                        >
                          {ev.type}
                        </span>
                      </div>
                      <StatusBadge status={ev.verificationStatus} />
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                      {ev.title}
                    </div>
                    <div style={{ fontSize: 13, color: '#475569' }}>
                      {ev.description}
                    </div>
                    <div style={{ fontSize: 11, color: '#64748B', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                      <span>Digest: <span className="mono" style={{ color: '#0F172A', fontWeight: 600 }}>{ev.hash.substring(0, 18)}...</span></span>
                      <span>Collector: {ev.source}</span>
                      <span>Recorded: {ev.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: VERIFICATION */}
        {activeTab === 'verification' && (
          <div className="sec-card" style={{ borderRadius: 16 }}>
            <div className="sec-card-header" style={{ marginBottom: 18 }}>
              <div className="sec-card-title" style={{ fontSize: 15, fontWeight: 700 }}>
                <CheckCircle size={16} color="#059669" />
                <span>Analyst Verification & Cryptographic Ledger Audit</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div
                style={{
                  padding: 18,
                  background: '#F8FAFC',
                  borderRadius: 12,
                  border: '1px solid #E2E8F0',
                  borderLeft: '4px solid #059669'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                    Tier 2 Senior Human Intelligence Review
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: '#059669',
                      fontWeight: 700,
                      background: 'rgba(5, 150, 105, 0.08)',
                      padding: '2px 8px',
                      borderRadius: 9999
                    }}
                  >
                    CONFIRMED
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                  Audited by Lead Threat Intelligence Analyst (Marcus Sterling). Reverse proxy interceptor validated via headless chromium browser emulator.
                </div>
              </div>

              <div
                style={{
                  padding: 18,
                  background: '#F8FAFC',
                  borderRadius: 12,
                  border: '1px solid #E2E8F0',
                  borderLeft: '4px solid #2563EB'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                    Bytecode Decompilation & Contract Signature Match
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: '#2563EB',
                      fontWeight: 700,
                      background: 'rgba(37, 99, 235, 0.08)',
                      padding: '2px 8px',
                      borderRadius: 9999
                    }}
                  >
                    VALIDATED
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                  Contract EVM bytecode matches Inferno drainer compiler digest with 99.4% binary similarity.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: NETWORK */}
        {activeTab === 'network' && (
          <div className="sec-card" style={{ borderRadius: 16 }}>
            <div className="sec-card-header" style={{ marginBottom: 14 }}>
              <div className="sec-card-title" style={{ fontSize: 15, fontWeight: 700 }}>
                <Layers size={16} color="#2563EB" />
                <span>Correlated Threat Cluster Map</span>
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentView('scam-network')}
                style={{ borderRadius: 8, fontWeight: 600 }}
              >
                <span>Launch Interactive Visualizer</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 18 }}>
              This entity is centrally linked to <strong>{activeEntity.relatedEntityIds?.length || 0}</strong> external nodes sharing hosting providers, blockchain sweepers, and deceptive call centers.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {activeEntity.relatedEntityIds?.map((relId) => {
                const rel = entities.find(e => e.id === relId);
                if (!rel) return null;
                return (
                  <div
                    key={relId}
                    style={{
                      padding: '14px 18px',
                      background: '#F8FAFC',
                      borderRadius: 12,
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      transition: 'all 120ms ease'
                    }}
                    onClick={() => navigateToEntity(rel.id)}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#2563EB';
                      e.currentTarget.style.background = '#FFFFFF';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.background = '#F8FAFC';
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: 4,
                            background: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            color: '#475569',
                            textTransform: 'uppercase'
                          }}
                        >
                          {rel.type}
                        </span>
                        <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', fontFamily: 'monospace' }}>
                          {rel.identifier}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>
                        Shared telemetry: co-located on bulletproof host • active proxy router
                      </div>
                    </div>
                    <RiskBadge score={rel.riskScore} size="sm" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB CONTENT: ACTIVITY TELEMETRY */}
        {activeTab === 'activity' && (
          <div className="sec-card" style={{ borderRadius: 16 }}>
            <div className="sec-card-header" style={{ marginBottom: 18 }}>
              <div className="sec-card-title" style={{ fontSize: 15, fontWeight: 700 }}>
                <Clock size={16} color="#2563EB" />
                <span>Chronological Event Telemetry</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'relative', paddingLeft: 12 }}>
              <div
                style={{
                  position: 'absolute',
                  top: 8,
                  bottom: 8,
                  left: 17,
                  width: 2,
                  background: '#E2E8F0'
                }}
              />

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', position: 'relative' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#DC2626', marginTop: 4, flexShrink: 0, boxShadow: '0 0 0 3px rgba(220,38,38,0.2)' }} />
                <div style={{ flex: 1, background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                    Risk Score elevated from 76 to {activeEntity.riskScore}
                  </div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
                    Triggered by surge in community abuse reports and verified drainer transactions.
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>14 minutes ago</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', position: 'relative' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#2563EB', marginTop: 4, flexShrink: 0, boxShadow: '0 0 0 3px rgba(37,99,235,0.2)' }} />
                <div style={{ flex: 1, background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                    Automated Sandbox crawl performed
                  </div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
                    Extracted obfuscated JavaScript payload and identified reverse proxy IP.
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>42 minutes ago</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', position: 'relative' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#059669', marginTop: 4, flexShrink: 0, boxShadow: '0 0 0 3px rgba(5,150,105,0.2)' }} />
                <div style={{ flex: 1, background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                    Entity initial registration observed
                  </div>
                  <div style={{ fontSize: 12, color: '#475569', marginTop: 2 }}>
                    WHOIS entry logged and added to continuous monitoring radar.
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{activeEntity.createdAt}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
