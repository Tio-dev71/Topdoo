import React, { useState } from 'react';
import {
  Bookmark,
  Plus,
  Trash2,
  Sliders,
  Bell,
  Activity,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Shield,
  Eye,
  Search,
  X
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { RiskBadge } from '../../components/common/RiskBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { PageTransition } from '../../components/common/PageTransition';

export function WatchlistView() {
  const {
    entities,
    toggleWatchlist,
    navigateToEntity,
    watchlistRules,
    setWatchlistRules,
    showToast
  } = useSecurity();

  const [isRuleModalOpen, setIsRuleModalOpen] = useState(false);
  const [newEntityInput, setNewEntityInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Watchlisted entities
  const watchlistEntities = entities.filter(e => e.watchlist);

  const filteredWatchlist = watchlistEntities.filter(e => {
    if (!searchTerm.trim()) return true;
    return e.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.type.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const criticalWatchCount = watchlistEntities.filter(e => e.riskScore >= 75).length;

  const handleToggleRule = (ruleId) => {
    setWatchlistRules(prev =>
      prev.map(r => r.id === ruleId ? { ...r, enabled: !r.enabled } : r)
    );
    showToast('Rule Updated', 'Surveillance alert threshold updated.', 'info');
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if (!newEntityInput.trim()) return;
    const match = entities.find(e => e.identifier.toLowerCase().includes(newEntityInput.toLowerCase().trim()));
    if (match) {
      if (!match.watchlist) {
        toggleWatchlist(match.id);
        showToast('Entity Watched', `Added ${match.identifier} to your active surveillance list.`, 'success');
      } else {
        showToast('Already Watched', `${match.identifier} is already in your watchlist.`, 'info');
      }
    } else {
      showToast('Entity Added', `Added ${newEntityInput} to continuous surveillance radar.`, 'success');
    }
    setNewEntityInput('');
  };

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200, margin: '0 auto', paddingBottom: 40 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 999, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8' }}>Automated Threat Surveillance</span>
            </div>
            <h1 className="heading-xl">Active Watchlist & Surveillance Radar</h1>
            <p className="subheading" style={{ marginTop: 4, maxWidth: 840 }}>
              Track critical high-risk entities, crypto drainers, and phishing domains with real-time change triggers and threat elevation alerts.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setIsRuleModalOpen(true)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Sliders size={14} />
              <span>Configure Monitoring Rules</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Monitored Entities</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', marginTop: 4 }}>{watchlistEntities.length}</div>
            <div style={{ fontSize: 12, color: '#2563EB', marginTop: 2 }}>Continuous sensor tracking</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Critical Threat Targets</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#DC2626', marginTop: 4 }}>{criticalWatchCount}</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Score ≥ 75 critical malice</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Alert Rules Active</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#059669', marginTop: 4 }}>
              {watchlistRules.filter(r => r.enabled).length} / {watchlistRules.length}
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Triggers enabled</div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px 20px', borderRadius: 14, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Telemetry Feed</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#059669', marginTop: 4 }}>Active</div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>Real-time event pulse streaming</div>
          </div>
        </div>

        {/* Quick Add Bar & Search */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <form onSubmit={handleAddCustom} style={{
            flex: 1,
            minWidth: 320,
            background: '#FFFFFF',
            padding: '8px 12px',
            borderRadius: 12,
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            display: 'flex',
            gap: 10
          }}>
            <input
              type="text"
              placeholder="Add domain, wallet, email, phone or URL to surveillance radar..."
              value={newEntityInput}
              onChange={(e) => setNewEntityInput(e.target.value)}
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                padding: '6px 8px',
                color: '#0F172A',
                fontSize: 13,
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={!newEntityInput.trim()}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Plus size={14} />
              <span>Add to Watchlist</span>
            </button>
          </form>

          <div style={{ position: 'relative', width: 280 }}>
            <Search size={15} style={{ position: 'absolute', left: 12, top: 11, color: '#94A3B8' }} />
            <input
              type="text"
              placeholder="Filter watchlist..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 12,
                padding: '8px 12px 8px 36px',
                fontSize: 13,
                color: '#0F172A',
                outline: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}
            />
          </div>
        </div>

        {/* Main Table */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  <th style={{ padding: '14px 18px', fontWeight: 600 }}>Watched Entity</th>
                  <th style={{ padding: '14px 18px', fontWeight: 600 }}>Type</th>
                  <th style={{ padding: '14px 18px', fontWeight: 600 }}>Risk Score</th>
                  <th style={{ padding: '14px 18px', fontWeight: 600 }}>Status</th>
                  <th style={{ padding: '14px 18px', fontWeight: 600 }}>Last Observed</th>
                  <th style={{ padding: '14px 18px', fontWeight: 600 }}>Surveillance Status</th>
                  <th style={{ padding: '14px 18px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWatchlist.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '48px 0', color: '#64748B' }}>
                      <Bookmark size={32} color="#94A3B8" style={{ margin: '0 auto 8px' }} />
                      <div style={{ fontWeight: 600, fontSize: 14, color: '#0F172A' }}>No watchlisted entities found</div>
                      <div style={{ fontSize: 12, marginTop: 4 }}>Add entities using the input above or star items in the Scam Database.</div>
                    </td>
                  </tr>
                ) : (
                  filteredWatchlist.map(ent => (
                    <tr
                      key={ent.id}
                      style={{
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background 0.15s ease'
                      }}
                    >
                      <td style={{ padding: '14px 18px' }}>
                        <div
                          style={{ cursor: 'pointer', display: 'inline-flex' }}
                          onClick={() => navigateToEntity(ent.id)}
                        >
                          <TechnicalMono value={ent.identifier} length={22} truncate canCopy={false} />
                        </div>
                        <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>
                          {ent.name}
                        </div>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: '#F1F5F9', color: '#475569' }}>
                          {ent.type}
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <RiskBadge score={ent.riskScore} size="sm" />
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <StatusBadge status={ent.status} />
                      </td>
                      <td style={{ padding: '14px 18px', color: '#64748B' }}>
                        {ent.lastSeen}
                      </td>
                      <td style={{ padding: '14px 18px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#059669', fontSize: 12, fontWeight: 600 }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#059669' }} />
                          Active Pulse (24/7)
                        </span>
                      </td>
                      <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{ padding: '4px 10px', fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                            onClick={() => navigateToEntity(ent.id)}
                          >
                            <span>Dossier</span>
                            <ExternalLink size={12} />
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleWatchlist(ent.id)}
                            style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: 4 }}
                            title="Remove from Watchlist"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monitoring Rules Configuration Modal */}
        {isRuleModalOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.4)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 20
          }} onClick={() => setIsRuleModalOpen(false)}>
            <div style={{
              background: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E2E8F0',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
              width: '100%',
              maxWidth: 520,
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 18
            }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A' }}>
                  Configure Watchlist Surveillance Rules
                </div>
                <button
                  type="button"
                  onClick={() => setIsRuleModalOpen(false)}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 4 }}
                >
                  <X size={18} />
                </button>
              </div>

              <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5 }}>
                Configure automated notifications triggered when monitored entities undergo changes in DNS resolution, smart contract approvals, or risk score elevations.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {watchlistRules.map(rule => (
                  <div
                    key={rule.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      background: '#F8FAFC',
                      borderRadius: 10,
                      border: '1px solid #E2E8F0'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>{rule.name}</div>
                      <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>{rule.trigger}</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={rule.enabled}
                      onChange={() => handleToggleRule(rule.id)}
                      style={{ width: 18, height: 18, accentColor: '#2563EB', cursor: 'pointer' }}
                    />
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 6 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setIsRuleModalOpen(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => setIsRuleModalOpen(false)}>
                  Save Rule Preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
