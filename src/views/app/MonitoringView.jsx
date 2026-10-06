import React, { useState } from 'react';
import {
  Activity,
  Pause,
  Play,
  Sliders,
  Shield,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  Radio,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { PageTransition } from '../../components/common/PageTransition';

export function MonitoringView() {
  const {
    monitoringEvents,
    isMonitoringActive,
    setIsMonitoringActive,
    navigateToEntity,
    showToast
  } = useSecurity();

  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredEvents = monitoringEvents.filter(ev => {
    if (filterSeverity === 'ALL') return true;
    return ev.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  const togglePause = () => {
    setIsMonitoringActive(!isMonitoringActive);
    showToast(
      isMonitoringActive ? 'Surveillance Paused' : 'Surveillance Resumed',
      isMonitoringActive ? 'Surveillance radar feed paused temporarily.' : 'Live sensor telemetry stream reconnected.',
      isMonitoringActive ? 'warning' : 'success'
    );
  };

  const criticalCount = monitoringEvents.filter(e => e.severity === 'Critical').length;
  const highCount = monitoringEvents.filter(e => e.severity === 'High').length;

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200, margin: '0 auto', paddingBottom: 40 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: isMonitoringActive ? '#ECFDF5' : '#FEF3C7', border: `1px solid ${isMonitoringActive ? '#A7F3D0' : '#FDE68A'}`, borderRadius: 999, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: isMonitoringActive ? '#059669' : '#D97706' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: isMonitoringActive ? '#047857' : '#B45309' }}>
                {isMonitoringActive ? 'Real-Time Sensor Telemetry Online' : 'Surveillance Stream Paused'}
              </span>
            </div>
            <h1 className="heading-xl">Continuous Surveillance & Telemetry Feed</h1>
            <p className="subheading" style={{ marginTop: 4, maxWidth: 840 }}>
              Live automated security sensors monitoring DNS mutations, on-chain token drains, brand spoofing, and risk score adjustments.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className={`btn btn-sm ${isMonitoringActive ? 'btn-secondary' : 'btn-primary'}`}
              onClick={togglePause}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              {isMonitoringActive ? <Pause size={14} /> : <Play size={14} />}
              <span>{isMonitoringActive ? 'Pause Surveillance' : 'Resume Telemetry'}</span>
            </button>
          </div>
        </div>

        {/* KPI Stats Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Active Sensor Monitors</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>1,842</div>
            <div style={{ fontSize: 12, color: '#059669', marginTop: 2 }}>Streaming 24/7 telemetry</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Triggered Events (24h)</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#2563EB', marginTop: 4 }}>428</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>+34 vs previous window</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Critical Threat Mutations</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#DC2626', marginTop: 4 }}>19</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Requires immediate action</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Global Ingestion Latency</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#059669', marginTop: 4 }}>18ms</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>US-East cluster node #04</div>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { id: 'ALL', label: 'All Telemetry Events', count: monitoringEvents.length },
              { id: 'Critical', label: 'Critical Events', count: criticalCount },
              { id: 'High', label: 'High Priority', count: highCount },
              { id: 'Medium', label: 'Medium Changes', count: monitoringEvents.filter(e => e.severity === 'Medium').length }
            ].map(tab => {
              const isActive = filterSeverity.toLowerCase() === tab.id.toLowerCase();
              return (
                <button
                  key={tab.id}
                  onClick={() => setFilterSeverity(tab.id)}
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

          <div style={{ fontSize: 12, color: '#64748B', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Activity size={14} color="#2563EB" />
            <span>Auto-refreshing every 3.5s</span>
          </div>
        </div>

        {/* Main Event Stream Card */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredEvents.map(ev => {
              const isCritical = ev.severity === 'Critical';
              const isHigh = ev.severity === 'High';

              const severityBadgeBg = isCritical ? '#FEF2F2' : (isHigh ? '#FFF7ED' : '#FEFCE8');
              const severityBadgeColor = isCritical ? '#DC2626' : (isHigh ? '#C2410C' : '#A16207');
              const severityBadgeBorder = isCritical ? '#FECACA' : (isHigh ? '#FFEDD5' : '#FEF08A');
              const dotColor = isCritical ? '#DC2626' : (isHigh ? '#EA580C' : '#CA8A04');

              return (
                <div
                  key={ev.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    background: isCritical ? '#FFFDFD' : '#F8FAFC',
                    border: `1px solid ${isCritical ? '#FECACA' : '#E2E8F0'}`,
                    borderLeft: `4px solid ${dotColor}`,
                    borderRadius: 12,
                    gap: 16,
                    flexWrap: 'wrap'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, flex: 1, minWidth: 280 }}>
                    <div style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: dotColor,
                      flexShrink: 0
                    }} />

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{ fontWeight: 700, fontSize: 13.5, color: '#0F172A' }}>
                          {ev.event}
                        </span>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '1px 6px',
                          borderRadius: 4,
                          background: severityBadgeBg,
                          color: severityBadgeColor,
                          border: `1px solid ${severityBadgeBorder}`
                        }}>
                          {ev.severity.toUpperCase()}
                        </span>
                        <TechnicalMono value={ev.entityIdentifier} length={20} truncate canCopy={false} />
                      </div>

                      <div style={{ fontSize: 12, color: '#475569', marginTop: 4, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                        <span>{ev.change}</span>
                        <span>•</span>
                        <span style={{ color: '#64748B' }}>Sensor Rule: <strong>{ev.rule}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <span style={{ fontSize: 12, color: '#64748B' }}>{ev.timestamp}</span>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => navigateToEntity(ev.entityId)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                    >
                      <span>Investigate</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
