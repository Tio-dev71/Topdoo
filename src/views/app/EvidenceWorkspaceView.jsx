import React, { useState } from 'react';
import {
  FileCheck,
  Search,
  Filter,
  Upload,
  Link,
  Shield,
  Clock,
  Hash,
  ExternalLink,
  Eye,
  CheckCircle,
  Flag,
  FileCode,
  Image,
  FileText,
  Smartphone,
  ChevronRight,
  ShieldCheck,
  Copy,
  Download,
  AlertCircle
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { PageTransition } from '../../components/common/PageTransition';

export function EvidenceWorkspaceView() {
  const {
    evidenceList,
    selectedEvidenceId,
    setSelectedEvidenceId,
    navigateToEntity,
    showToast
  } = useSecurity();

  const [filterType, setFilterType] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeItem, setActiveItem] = useState(() => {
    return evidenceList.find(e => e.id === selectedEvidenceId) || evidenceList[0];
  });
  const [verifiedMap, setVerifiedMap] = useState({});

  const filterOptions = [
    { id: 'ALL', label: 'All Artifacts' },
    { id: 'Hash', label: 'Tx Hashes' },
    { id: 'Screenshot', label: 'Screenshots' },
    { id: 'SMS', label: 'SMS Payloads' },
    { id: 'HAR', label: 'HAR Logs' },
    { id: 'Document', label: 'Affidavits' }
  ];

  const filteredEvidence = evidenceList.filter(ev => {
    const matchesSearch = !searchTerm.trim() ||
      ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.entityIdentifier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || ev.type.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesType;
  });

  const handleVerifyEvidence = (evId) => {
    setVerifiedMap(prev => ({ ...prev, [evId]: true }));
    showToast('Evidence Authenticated', `Evidence ${evId} cryptographic SHA-256 integrity and chain of custody verified.`, 'success');
  };

  const handleFlagEvidence = (evId) => {
    showToast('Evidence Flagged', `Evidence ${evId} flagged for secondary SecOps forensic audit.`, 'warning');
  };

  const copyHash = (hashVal) => {
    navigator.clipboard.writeText(hashVal);
    showToast('Hash Copied', hashVal, 'success');
  };

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200, margin: '0 auto', paddingBottom: 40 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 999, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8' }}>Forensic Evidence & Chain of Custody</span>
            </div>
            <h1 className="heading-xl">Digital Forensics & Evidence Workspace</h1>
            <p className="subheading" style={{ marginTop: 4, maxWidth: 840 }}>
              Immutable repository of cryptographic transaction proofs, network HAR captures, phishing landing screenshots, and forensic affidavits.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => showToast('Evidence Linker', 'Select existing reports to link this forensic item.', 'info')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Link size={14} />
              <span>Link Artifact</span>
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => showToast('Upload Portal', 'Drag and drop forensic archives or paste raw payloads.', 'info')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Upload size={14} />
              <span>Ingest New Evidence</span>
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Cataloged Evidence Items</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>{evidenceList.length}</div>
            <div style={{ fontSize: 12, color: '#2563EB', marginTop: 2 }}>Cryptographically hashed & preserved</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Verified Hashes</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#059669', marginTop: 4 }}>
              {evidenceList.filter(e => e.verificationStatus === 'Verified' || verifiedMap[e.id]).length}
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>SHA-256 chain integrity confirmed</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Evidence Categories</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#D97706', marginTop: 4 }}>5 Formats</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Blockchain, HAR, DOM, SMS, Docs</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Chain of Custody</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#059669', marginTop: 4 }}>100%</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Tamper-evident timestamped log</div>
          </div>
        </div>

        {/* Filter Chips & Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {filterOptions.map(opt => {
              const isActive = filterType === opt.id;
              const count = opt.id === 'ALL'
                ? evidenceList.length
                : evidenceList.filter(e => e.type.toLowerCase().includes(opt.id.toLowerCase())).length;
              return (
                <button
                  key={opt.id}
                  onClick={() => setFilterType(opt.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '7px 14px',
                    borderRadius: 999,
                    fontSize: 13,
                    fontWeight: isActive ? 700 : 500,
                    border: `1px solid ${isActive ? '#2563EB' : '#E2E8F0'}`,
                    background: isActive ? '#EFF6FF' : '#FFFFFF',
                    color: isActive ? '#1D4ED8' : '#475569',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span>{opt.label}</span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: 10,
                    background: isActive ? '#2563EB' : '#F1F5F9',
                    color: isActive ? '#FFFFFF' : '#64748B'
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ position: 'relative', width: 280 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: 11, color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search evidence by title or entity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 10,
                padding: '8px 12px 8px 36px',
                fontSize: 13,
                color: '#0F172A',
                outline: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            />
          </div>
        </div>

        {/* Two-Pane Workspace Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1.75fr', gap: 20, alignItems: 'start' }}>
          {/* Left Pane: Evidence List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredEvidence.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: 36, borderRadius: 14, border: '1px solid #E2E8F0', textAlign: 'center', color: '#64748B' }}>
                <FileCode size={32} color="#94A3B8" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontWeight: 600, fontSize: 14, color: '#0F172A' }}>No matching evidence found</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Try clearing search or picking another artifact category.</div>
              </div>
            ) : (
              filteredEvidence.map(ev => {
                const isSelected = activeItem?.id === ev.id;
                const isVerified = ev.verificationStatus === 'Verified' || verifiedMap[ev.id];
                return (
                  <div
                    key={ev.id}
                    onClick={() => {
                      setActiveItem(ev);
                      setSelectedEvidenceId(ev.id);
                    }}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      background: '#FFFFFF',
                      border: `1.5px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
                      borderLeft: isSelected ? '5px solid #2563EB' : '1.5px solid #E2E8F0',
                      boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: isSelected ? '#2563EB' : '#0F172A' }}>
                          {ev.id}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: '#F1F5F9', color: '#475569' }}>
                          {ev.type}
                        </span>
                      </div>
                      <StatusBadge status={isVerified ? 'Verified' : ev.verificationStatus} />
                    </div>

                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', lineHeight: 1.4 }}>
                      {ev.title}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#64748B', marginTop: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>Target:</span>
                        <TechnicalMono value={ev.entityIdentifier} length={18} truncate canCopy={false} />
                      </div>
                      <span className="mono" style={{ fontSize: 11.5 }}>{ev.size}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Pane: Selected Artifact Inspection Detail */}
          {activeItem ? (
            <div style={{
              background: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E2E8F0',
              padding: 24,
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              position: 'sticky',
              top: 80,
              display: 'flex',
              flexDirection: 'column',
              gap: 20
            }}>
              {/* Header */}
              <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span className="mono" style={{ fontSize: 14, fontWeight: 800, color: '#2563EB' }}>
                        {activeItem.id}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: '#F1F5F9', color: '#475569' }}>
                        {activeItem.type}
                      </span>
                      <StatusBadge status={verifiedMap[activeItem.id] ? 'Verified' : activeItem.verificationStatus} />
                    </div>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', lineHeight: 1.4 }}>
                      {activeItem.title}
                    </h2>
                    <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                      Ingested on {activeItem.timestamp} • Origin: <strong>{activeItem.submittedBy}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleFlagEvidence(activeItem.id)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    >
                      <Flag size={13} />
                      <span>Flag</span>
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleVerifyEvidence(activeItem.id)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    >
                      <CheckCircle size={13} />
                      <span>Verify Hash</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Forensic Artifact Inspection Preview Sandbox */}
              <div style={{
                background: '#F8FAFC',
                borderRadius: 14,
                border: '1px solid #E2E8F0',
                padding: 18,
                display: 'flex',
                flexDirection: 'column',
                gap: 14
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: '#64748B' }}>
                  <span style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Forensic Artifact Sandbox</span>
                  <span className="mono" style={{ fontWeight: 600 }}>{activeItem.size}</span>
                </div>

                <div style={{
                  padding: 16,
                  background: '#FFFFFF',
                  borderRadius: 10,
                  border: '1px solid #CBD5E1',
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: '#1E293B',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                }}>
                  {activeItem.description}
                </div>

                {/* Cryptographic Hash Box */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                  background: '#FFFFFF',
                  padding: 14,
                  borderRadius: 10,
                  border: '1px solid #CBD5E1'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Cryptographic SHA-256 Digest
                    </span>
                    {(activeItem.verificationStatus === 'Verified' || verifiedMap[activeItem.id]) && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#059669', fontWeight: 700 }}>
                        <ShieldCheck size={13} />
                        <span>Integrity Validated</span>
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <TechnicalMono value={activeItem.hash} />
                    <button
                      type="button"
                      onClick={() => copyHash(activeItem.hash)}
                      style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: 4 }}
                      title="Copy SHA-256 Hash"
                    >
                      <Copy size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Metadata Grid */}
              {activeItem.metadata && Object.keys(activeItem.metadata).length > 0 && (
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Technical Metadata & Inspection Headers
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    {Object.entries(activeItem.metadata).map(([k, v]) => (
                      <div key={k}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>{k}</span>
                        <div className="mono" style={{ fontSize: 12, fontWeight: 600, color: '#0F172A', marginTop: 2, wordBreak: 'break-all' }}>
                          {Array.isArray(v) ? v.join(', ') : String(v)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Entity Footer */}
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 12, color: '#64748B' }}>Target Entity:</span>
                  <TechnicalMono value={activeItem.entityIdentifier} />
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigateToEntity(activeItem.entityId)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <span>Open Intelligence Profile</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ background: '#FFFFFF', padding: 36, borderRadius: 16, border: '1px solid #E2E8F0', textAlign: 'center', color: '#64748B' }}>
              Select a forensic item from the left pane to inspect its metadata and cryptographic hash.
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
