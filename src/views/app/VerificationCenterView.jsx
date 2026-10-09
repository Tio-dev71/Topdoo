import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  FileText,
  Shield,
  Clock,
  ArrowRight,
  Filter,
  Check,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  UserCheck,
  Flame,
  Search
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RiskBadge } from '../../components/common/RiskBadge';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { PageTransition } from '../../components/common/PageTransition';

export function VerificationCenterView() {
  const {
    reports,
    verifyReport,
    navigateToEntity,
    showToast,
    userRole,
    canPerform,
    PERMISSIONS,
    getRoleMeta
  } = useSecurity();

  const [selectedReport, setSelectedReport] = useState(() => reports[0]);
  const [filterState, setFilterState] = useState('ALL');
  const [analystNotes, setAnalystNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter(r => {
    const matchesFilter = filterState === 'ALL' || r.status.toLowerCase() === filterState.toLowerCase();
    const matchesSearch = !searchTerm.trim() ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.entityIdentifier.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const isAuthorizedToVerify = canPerform(PERMISSIONS.VERIFY_REPORT);

  const handleAction = (status, approved) => {
    if (!selectedReport) return;
    verifyReport(selectedReport.id, approved, analystNotes);
    setAnalystNotes('');
  };

  const pendingCount = reports.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length;
  const verifiedCount = reports.filter(r => r.status === 'Verified').length;
  const rejectedCount = reports.filter(r => r.status === 'Rejected').length;

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200, margin: '0 auto', paddingBottom: 40 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 999, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8' }}>SecOps Analyst Triage & Consensus</span>
            </div>
            <h1 className="heading-xl">Security Verification & Triage Center</h1>
            <p className="subheading" style={{ marginTop: 4, maxWidth: 840 }}>
              Audit incoming community threat claims, cross-reference cryptographic evidence against blockchain and WHOIS telemetry, and validate accuracy before syndication.
            </p>
          </div>
        </div>

        {/* Operational Stats Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pending Triage Queue</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#D97706', marginTop: 4 }}>{pendingCount} Cases</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Awaiting human analyst consensus</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Confirmed Malicious</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#059669', marginTop: 4 }}>{verifiedCount} Dossiers</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Syndicated to live detection feeds</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Rejected Claims</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#DC2626', marginTop: 4 }}>{rejectedCount} False Positives</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Insufficient corroborating evidence</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Average SLA</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#2563EB', marginTop: 4 }}>4.2 min</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Automated sandbox + analyst review</div>
          </div>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'All Cases', count: reports.length },
              { id: 'submitted', label: 'Submitted (New)', count: reports.filter(r => r.status === 'Submitted').length },
              { id: 'under review', label: 'Under Review', count: reports.filter(r => r.status === 'Under Review').length },
              { id: 'verified', label: 'Verified', count: verifiedCount },
              { id: 'rejected', label: 'Rejected', count: rejectedCount }
            ].map(tab => {
              const isActive = filterState.toLowerCase() === tab.id.toLowerCase();
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterState(tab.id)}
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
                  <span>{tab.label}</span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: 10,
                    background: isActive ? '#2563EB' : '#F1F5F9',
                    color: isActive ? '#FFFFFF' : '#64748B'
                  }}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div style={{ position: 'relative', width: 280 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: 11, color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search queue..."
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
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Main Grid: Queue Table on Left, Decision Reviewer on Right */}
        <div className="secops-split-grid">
          {/* Left Pane: Verification Queue Table */}
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#F8FAFC' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                Triage Queue Records ({filteredReports.length})
              </div>
              <span style={{ fontSize: 12, color: '#64748B' }}>Select row to audit</span>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                <thead>
                  <tr style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Case ID</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Target Entity</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Risk</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Status</th>
                    <th style={{ padding: '12px 16px', fontWeight: 600 }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map(rep => {
                    const isSelected = selectedReport?.id === rep.id;
                    return (
                      <tr
                        key={rep.id}
                        onClick={() => setSelectedReport(rep)}
                        style={{
                          background: isSelected ? '#EFF6FF' : '#FFFFFF',
                          borderBottom: '1px solid #F1F5F9',
                          borderLeft: isSelected ? '4px solid #2563EB' : '4px solid transparent',
                          cursor: 'pointer',
                          transition: 'background 0.15s ease'
                        }}
                      >
                        <td style={{ padding: '12px 16px' }}>
                          <span className="mono" style={{ fontWeight: 700, color: isSelected ? '#2563EB' : '#0F172A' }}>{rep.id}</span>
                          <div style={{ fontSize: 11, color: '#64748B' }}>{rep.category}</div>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <TechnicalMono value={rep.entityIdentifier} length={16} truncate canCopy={false} />
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <RiskBadge score={rep.riskScore} size="sm" />
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <StatusBadge status={rep.status} />
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 11.5, color: '#64748B' }}>
                          {rep.createdAt.split(' ')[0]}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Pane: Decision Panel */}
          {selectedReport ? (
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="mono" style={{ fontSize: 14, fontWeight: 800, color: '#2563EB' }}>
                      {selectedReport.id}
                    </span>
                    <StatusBadge status={selectedReport.status} />
                  </div>
                  <RiskBadge score={selectedReport.riskScore} />
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', lineHeight: 1.4 }}>
                  {selectedReport.title}
                </h2>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                  Submitted by <strong>{selectedReport.submittedBy}</strong> • Target: <span className="mono">{selectedReport.entityIdentifier}</span>
                </div>
              </div>

              {/* Claim Narrative */}
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Victim / Submitter Narrative
                </span>
                <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0', fontSize: 13, lineHeight: 1.6, color: '#1E293B', marginTop: 6 }}>
                  {selectedReport.description}
                </div>
                <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 8 }}>
                  Loss Claimed: <strong style={{ color: selectedReport.lossReported?.includes('$') || selectedReport.lossReported?.includes('ETH') ? '#DC2626' : '#059669' }}>{selectedReport.lossReported || 'Prevented'}</strong>
                </div>
              </div>

              {/* Automated Validation Checklist */}
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Automated Security Heuristic Checks
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: '#334155', background: '#F8FAFC', padding: '10px 14px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>WHOIS registration timestamp matches incident campaign emergence.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: '#334155', background: '#F8FAFC', padding: '10px 14px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Reverse proxy and TLS certificate fingerprint aligns with known bad clusters.</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12.5, color: '#334155', background: '#F8FAFC', padding: '10px 14px', borderRadius: 8, border: '1px solid #E2E8F0' }}>
                    <CheckCircle2 size={16} color="#059669" />
                    <span>Smart contract approval signature confirms unauthorized drainer permit.</span>
                  </div>
                </div>
              </div>

              {/* Reviewer Action Box */}
              <div style={{ background: '#F8FAFC', padding: 18, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.03em', margin: 0 }}>
                    SecOps Analyst Audit Notes & Resolution
                  </label>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 6,
                      color: getRoleMeta(userRole).color,
                      background: getRoleMeta(userRole).bg,
                      border: `1px solid ${getRoleMeta(userRole).border}`
                    }}
                  >
                    RBAC: {getRoleMeta(userRole).label}
                  </span>
                </div>

                {!isAuthorizedToVerify && (
                  <div style={{ background: '#FEF3C7', border: '1px solid #FCD34D', borderRadius: 8, padding: '8px 12px', fontSize: 12, color: '#92400E', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <AlertTriangle size={15} color="#D97706" />
                    <span>Tài khoản hiện tại ở chế độ Chỉ Xem. Hãy chọn vai trò <strong>Security Analyst</strong> hoặc <strong>Admin</strong> ở thanh điều hướng để mở quyền duyệt.</span>
                  </div>
                )}

                <textarea
                  rows={2}
                  placeholder="Record verification rationale or justification for approval / rejection..."
                  value={analystNotes}
                  onChange={(e) => setAnalystNotes(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: 8,
                    padding: '10px 12px',
                    fontSize: 13,
                    color: '#0F172A',
                    marginBottom: 14,
                    outline: 'none'
                  }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => showToast('Request Sent', 'Message dispatched to submitter requesting supplementary HAR logs.', 'info')}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    <HelpCircle size={14} />
                    <span>Request Details</span>
                  </button>

                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleAction('Rejected', false)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      <XCircle size={14} />
                      <span>Reject Claim</span>
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleAction('Verified', true)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      <CheckCircle2 size={14} />
                      <span>Verify & Confirm</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer action to entity profile */}
              <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#64748B' }}>
                  Status: <strong>{selectedReport.status}</strong>
                </span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigateToEntity(selectedReport.entityId)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <span>Open Target Dossier</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </PageTransition>
  );
}
