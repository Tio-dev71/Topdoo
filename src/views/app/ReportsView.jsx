import React, { useState } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  PlusCircle,
  CheckCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  Printer,
  ShieldAlert,
  ShieldCheck,
  AlertCircle,
  DollarSign,
  User,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { StatusBadge } from '../../components/common/StatusBadge';
import { RiskBadge } from '../../components/common/RiskBadge';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { PageTransition } from '../../components/common/PageTransition';

export function ReportsView() {
  const {
    reports,
    selectedReportId,
    setSelectedReportId,
    navigateToEntity,
    setCurrentView,
    showToast
  } = useSecurity();

  const [filterTab, setFilterTab] = useState('all'); // all, verified, review, my
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState(() => {
    return reports.find(r => r.id === selectedReportId) || reports[0];
  });

  const verifiedCount = reports.filter(r => r.status === 'Verified').length;
  const reviewCount = reports.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length;

  const filteredReports = reports.filter(r => {
    const matchesTab = (() => {
      if (filterTab === 'verified') return r.status === 'Verified';
      if (filterTab === 'review') return r.status === 'Submitted' || r.status === 'Under Review';
      if (filterTab === 'my') return r.submittedBy.includes('security-labs') || r.submittedBy.includes('investigator') || r.submittedBy.includes('You');
      return true;
    })();

    const matchesSearch = !searchTerm.trim() ||
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.entityIdentifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handlePrintPDF = () => {
    window.print();
    showToast('Exporting Report', 'Triggered print dialog for case dossier file.', 'info');
  };

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200, margin: '0 auto', paddingBottom: 40 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 999, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8' }}>Incident Dossiers & Community Intelligence</span>
            </div>
            <h1 className="heading-xl">Investigation & Incident Reports</h1>
            <p className="subheading" style={{ marginTop: 4, maxWidth: 840 }}>
              Verified community fraud dossiers, authenticated victim filings, analyst case logs, and exportable digital forensics reports.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handlePrintPDF}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Printer size={15} />
              <span>Export Case PDF</span>
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setCurrentView('report-scam')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <PlusCircle size={15} />
              <span>File New Incident Report</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Dossiers Logged</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>{reports.length}</div>
            <div style={{ fontSize: 12, color: '#10B981', marginTop: 2 }}>Across 8 distinct fraud vectors</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Verified Fraud Cases</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#059669', marginTop: 4 }}>{verifiedCount}</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Cryptographically corroborated</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Pending SecOps Triage</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#D97706', marginTop: 4 }}>{reviewCount}</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Awaiting analyst verification</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Community Protection</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#2563EB', marginTop: 4 }}>$1.85M+</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Estimated victim losses mitigated</div>
          </div>
        </div>

        {/* Filter Controls & Search Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Reports', count: reports.length },
              { id: 'verified', label: 'Verified Cases', count: verifiedCount },
              { id: 'review', label: 'Under Review', count: reviewCount },
              { id: 'my', label: 'My Submissions', count: reports.filter(r => r.submittedBy.includes('investigator') || r.submittedBy.includes('You')).length }
            ].map(tab => {
              const isActive = filterTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterTab(tab.id)}
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

          {/* Search Box */}
          <div style={{ position: 'relative', width: 280 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: 11, color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Search by ID, title, or target..."
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

        {/* Main Master-Detail Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1.75fr', gap: 20, alignItems: 'start' }}>
          {/* Left Master List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredReports.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: 36, borderRadius: 14, border: '1px solid #E2E8F0', textAlign: 'center', color: '#64748B' }}>
                <FileText size={32} color="#94A3B8" style={{ margin: '0 auto 10px' }} />
                <div style={{ fontWeight: 600, fontSize: 14, color: '#0F172A' }}>No matching reports found</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Try clearing your search query or selecting a different status filter.</div>
              </div>
            ) : (
              filteredReports.map(rep => {
                const isSelected = selectedReport?.id === rep.id;
                return (
                  <div
                    key={rep.id}
                    onClick={() => {
                      setSelectedReport(rep);
                      setSelectedReportId(rep.id);
                    }}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      background: isSelected ? '#FFFFFF' : '#FFFFFF',
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
                          {rep.id}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: '#F1F5F9', color: '#475569' }}>
                          {rep.category}
                        </span>
                      </div>
                      <StatusBadge status={rep.status} />
                    </div>

                    <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', lineHeight: 1.4 }}>
                      {rep.title}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: '#64748B', marginTop: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>Target:</span>
                        <TechnicalMono value={rep.entityIdentifier} length={20} truncate canCopy={false} />
                      </div>
                      <span>{rep.createdAt.split(' ')[0]}</span>
                    </div>

                    {rep.lossReported && (
                      <div style={{ fontSize: 11.5, color: '#DC2626', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span>Loss: {rep.lossReported}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Right Detail Dossier */}
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

                <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', lineHeight: 1.4 }}>
                  {selectedReport.title}
                </h2>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span>Logged {selectedReport.createdAt}</span>
                  <span>•</span>
                  <span>Submitted by <strong>{selectedReport.submittedBy}</strong></span>
                </div>
              </div>

              {/* Target & Loss Banner */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Target Entity</span>
                  <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TechnicalMono value={selectedReport.entityIdentifier} />
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#64748B', textTransform: 'uppercase' }}>Victim Loss Declared</span>
                  <div style={{ fontSize: 14, fontWeight: 700, color: selectedReport.lossReported?.includes('$') || selectedReport.lossReported?.includes('ETH') ? '#DC2626' : '#059669', marginTop: 4 }}>
                    {selectedReport.lossReported || 'Prevented / Nil'}
                  </div>
                </div>
              </div>

              {/* Incident Narrative */}
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                  Incident Description & Narrative
                </h3>
                <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6, background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  {selectedReport.description}
                </div>
              </div>

              {/* Timeline */}
              {selectedReport.timeline && selectedReport.timeline.length > 0 && (
                <div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                    Investigation Timeline
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 8, position: 'relative' }}>
                    {selectedReport.timeline.map((step, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 12.5 }}>
                        <div style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: idx === selectedReport.timeline.length - 1 ? '#2563EB' : '#94A3B8',
                          marginTop: 5,
                          flexShrink: 0
                        }} />
                        <span className="mono" style={{ color: '#64748B', minWidth: 100, fontWeight: 600 }}>{step.date}</span>
                        <span style={{ color: '#334155', flex: 1 }}>{step.event}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer action to entity profile */}
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: '#64748B' }}>
                  Audited by: <strong>{selectedReport.reviewer || 'SecOps Automation'}</strong>
                </span>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigateToEntity(selectedReport.entityId)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <span>Open Deep Entity Dossier</span>
                  <ExternalLink size={13} />
                </button>
              </div>
            </div>
          ) : (
            <div style={{ background: '#FFFFFF', padding: 36, borderRadius: 16, border: '1px solid #E2E8F0', textAlign: 'center', color: '#64748B' }}>
              Select a report from the list to view its complete forensic dossier.
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
