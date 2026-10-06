import React, { useEffect, useRef } from 'react';
import { Search, X, Shield, FileText, FileCheck, AlertCircle, ArrowRight, CornerDownLeft, Eye } from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { RiskBadge } from './RiskBadge';
import { TechnicalMono } from './TechnicalMono';

export function GlobalSearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    searchResults,
    navigateToEntity,
    setSelectedReportId,
    setCurrentView,
    setMode
  } = useSecurity();

  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Keyboard shortcut listener (Cmd+K or Ctrl+K or /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  return (
    <div className="modal-backdrop" onClick={() => setIsSearchOpen(false)}>
      <div
        className="modal-card"
        style={{ maxWidth: 680, maxHeight: '82vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--border-default)', gap: 12 }}>
          <Search size={18} color="var(--text-muted)" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search domain, URL, IP, wallet address, email, phone, or report ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: 15,
              color: 'var(--text-primary)'
            }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="btn-icon">
              <X size={16} />
            </button>
          )}
          <span className="search-kbd">ESC</span>
        </div>

        {/* Results Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {!searchQuery.trim() ? (
            <div style={{ padding: '24px 12px', textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 12 }}>
                Try searching for quick examples:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                {['metamask-claim-airdrop.xyz', '0x71C8564E3b82928374dC8187e59b20755AA9B829', 'chase-security-verify.net', 'REP-2026-8921', '+1 (800) 492-0199', 'topdoo.com'].map(sample => (
                  <button
                    key={sample}
                    onClick={() => setSearchQuery(sample)}
                    style={{
                      background: 'var(--bg-muted)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '4px 10px',
                      fontSize: 12,
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>
          ) : searchResults?.totalCount === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--text-muted)' }}>
              <AlertCircle size={32} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>No direct matches found</div>
              <div style={{ fontSize: 13 }}>
                Would you like to run a live heuristic Quick Check on <span className="mono" style={{ color: '#60A5FA' }}>"{searchQuery}"</span>?
              </div>
              <button
                className="btn btn-primary"
                style={{ marginTop: 16 }}
                onClick={() => {
                  setIsSearchOpen(false);
                  setMode('app');
                  setCurrentView('quick-check');
                }}
              >
                Scan with Quick Check
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* EXACT MATCH / ENTITIES */}
              {searchResults.entities.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Shield size={12} />
                    <span>Entities & Assets ({searchResults.entities.length})</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {searchResults.entities.map(ent => (
                      <div
                        key={ent.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateToEntity(ent.id);
                        }}
                        style={{
                          padding: '12px 14px',
                          background: 'var(--bg-card-hover)',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          transition: 'all var(--transition-fast)'
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: 14 }}>
                              {ent.identifier}
                            </span>
                            <span className="entity-type-badge">{ent.type}</span>
                            {ent.watchlist && (
                              <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 4, background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                                In Watchlist
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize: 12, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 12 }}>
                            <span>{ent.reportsCount} scam reports</span>
                            <span>•</span>
                            <span>{ent.evidenceCount} evidence items</span>
                            <span>•</span>
                            <span>{ent.relatedEntityIds?.length || 0} network nodes</span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <RiskBadge score={ent.riskScore} />
                          <ArrowRight size={14} color="var(--text-muted)" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* REPORTS MATCH */}
              {searchResults.reports.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FileText size={12} />
                    <span>Scam Reports ({searchResults.reports.length})</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {searchResults.reports.map(rep => (
                      <div
                        key={rep.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setSelectedReportId(rep.id);
                          setMode('app');
                          setCurrentView('reports');
                        }}
                        style={{
                          padding: '10px 14px',
                          background: 'var(--bg-input)',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{rep.id}</span>
                            <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{rep.title}</span>
                          </div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                            Target: <span className="mono">{rep.entityIdentifier}</span> • {rep.status}
                          </div>
                        </div>
                        <RiskBadge score={rep.riskScore} size="sm" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EVIDENCE MATCH */}
              {searchResults.evidence.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FileCheck size={12} />
                    <span>Forensic Evidence ({searchResults.evidence.length})</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {searchResults.evidence.map(ev => (
                      <div
                        key={ev.id}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setMode('app');
                          setCurrentView('evidence');
                        }}
                        style={{
                          padding: '10px 14px',
                          background: 'var(--bg-input)',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer'
                        }}
                      >
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{ev.title}</div>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                            {ev.type} • Linked to <span className="mono">{ev.entityIdentifier}</span>
                          </div>
                        </div>
                        <span className="status-badge verified">{ev.verificationStatus}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div style={{ padding: '10px 20px', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
          <div>Navigate with ↑ ↓ and Press <span className="search-kbd">ENTER</span> to select</div>
          <div>TOPDOO Intelligence Engine v2.4</div>
        </div>
      </div>
    </div>
  );
}
