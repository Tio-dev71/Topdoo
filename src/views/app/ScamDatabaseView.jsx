import React, { useState, useMemo } from 'react';
import {
  Database,
  Search,
  Filter,
  Download,
  ArrowUpDown,
  Bookmark,
  ExternalLink,
  ChevronRight,
  Shield,
  Layers,
  FileSpreadsheet,
  Globe,
  Wallet,
  Phone,
  Mail,
  Building2,
  X
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { RiskBadge } from '../../components/common/RiskBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { PageTransition } from '../../components/common/PageTransition';
import { FilterChips } from '../../components/common/FilterChips';
import { EmptyState } from '../../components/common/EmptyState';

export function ScamDatabaseView() {
  const { entities, navigateToEntity, toggleWatchlist, showToast } = useSecurity();

  // Search & Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [sortBy, setSortBy] = useState('riskDesc');

  // Type filter options with counts
  const typeFilterOptions = useMemo(() => [
    { id: 'ALL', label: 'All Vectors', count: entities.length },
    { id: 'domain', label: 'Domains & URLs', icon: Globe, count: entities.filter(e => e.type === 'domain').length },
    { id: 'wallet', label: 'Crypto Wallets', icon: Wallet, count: entities.filter(e => e.type === 'wallet').length },
    { id: 'phone', label: 'Phone & SMS', icon: Phone, count: entities.filter(e => e.type === 'phone').length },
    { id: 'email', label: 'Email Hosts', icon: Mail, count: entities.filter(e => e.type === 'email').length },
    { id: 'company', label: 'Shell Companies', icon: Building2, count: entities.filter(e => e.type === 'company').length }
  ], [entities]);

  // Filtered & sorted entities
  const filteredEntities = useMemo(() => {
    return entities.filter(ent => {
      // Search
      const matchesSearch =
        !searchTerm.trim() ||
        ent.identifier.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        ent.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        (ent.targetBrand && ent.targetBrand.toLowerCase().includes(searchTerm.toLowerCase().trim()));

      // Type
      const matchesType = filterType === 'ALL' || ent.type === filterType;

      // Risk
      let matchesRisk = true;
      if (filterRisk === 'CRITICAL') matchesRisk = ent.riskScore >= 81;
      else if (filterRisk === 'HIGH') matchesRisk = ent.riskScore >= 61 && ent.riskScore < 81;
      else if (filterRisk === 'MEDIUM') matchesRisk = ent.riskScore >= 41 && ent.riskScore < 61;
      else if (filterRisk === 'SAFE') matchesRisk = ent.riskScore < 41;

      return matchesSearch && matchesType && matchesRisk;
    }).sort((a, b) => {
      if (sortBy === 'riskDesc') return b.riskScore - a.riskScore;
      if (sortBy === 'riskAsc') return a.riskScore - b.riskScore;
      if (sortBy === 'reportsDesc') return b.reportsCount - a.reportsCount;
      if (sortBy === 'nameAsc') return a.identifier.localeCompare(b.identifier);
      return 0;
    });
  }, [entities, searchTerm, filterType, filterRisk, sortBy]);

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Identifier', 'Type', 'Risk Score', 'Category', 'Reports Count', 'Country', 'Last Seen', 'Status'];
    const rows = filteredEntities.map(e => [
      e.id,
      `"${e.identifier}"`,
      e.type,
      e.riskScore,
      `"${e.category || ''}"`,
      e.reportsCount,
      e.country || 'N/A',
      `"${e.lastSeen}"`,
      `"${e.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `topdoo_scam_intelligence_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Export Complete', `Successfully exported ${filteredEntities.length} threat intelligence entities to CSV.`, 'success');
  };

  const hasActiveFilters = searchTerm || filterType !== 'ALL' || filterRisk !== 'ALL';

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
                <Database size={13} />
                Global Threat Repository
              </span>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>•</span>
              <span style={{ fontSize: 12, color: '#64748B' }}>{entities.length} Total Verified Entities</span>
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', margin: 0 }}>
              Centralized Scam Intelligence Database
            </h1>
            <p style={{ margin: '6px 0 0', fontSize: 14, color: '#475569', maxWidth: 640 }}>
              Explore verified fraud nodes, crypto drainers, deceptive telecom endpoints, shell corporations, and phishing syndicates.
            </p>
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={handleExportCSV}
            style={{
              borderRadius: 10,
              padding: '8px 16px',
              fontWeight: 600,
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
              alignSelf: 'center'
            }}
          >
            <Download size={14} color="#2563EB" />
            <span>Export CSV Dataset</span>
          </button>
        </div>

        {/* Vector Filter Chips */}
        <div>
          <FilterChips
            options={typeFilterOptions}
            value={filterType}
            onChange={setFilterType}
            size="md"
          />
        </div>

        {/* Search & Select Filter Bar */}
        <div
          className="sec-card"
          style={{
            padding: '16px 20px',
            borderRadius: 16,
            background: '#FFFFFF',
            border: '1px solid #E2E8F0'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 2fr) minmax(160px, 1fr) minmax(160px, 1fr) auto', gap: 12, alignItems: 'center' }}>
            {/* Search Input */}
            <div style={{ position: 'relative' }}>
              <Search size={15} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search identifier, domain, wallet, brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 10,
                  padding: '9px 12px 9px 38px',
                  fontSize: 13,
                  color: '#0F172A',
                  outline: 'none',
                  transition: 'all 150ms ease'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.background = '#FFFFFF';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.12)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.background = '#F8FAFC';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    color: '#94A3B8',
                    cursor: 'pointer'
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Risk Filter */}
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value)}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 10,
                padding: '9px 12px',
                fontSize: 13,
                color: '#0F172A',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="ALL">All Risk Levels</option>
              <option value="CRITICAL">Critical (81–100)</option>
              <option value="HIGH">High (61–80)</option>
              <option value="MEDIUM">Medium (41–60)</option>
              <option value="SAFE">Safe / Clean (0–40)</option>
            </select>

            {/* Sort By */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 10,
                padding: '9px 12px',
                fontSize: 13,
                color: '#0F172A',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="riskDesc">Sort: Highest Risk</option>
              <option value="riskAsc">Sort: Lowest Risk</option>
              <option value="reportsDesc">Sort: Most Reports</option>
              <option value="nameAsc">Sort: Alphabetical</option>
            </select>

            {/* Reset Filters */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setFilterType('ALL');
                  setFilterRisk('ALL');
                  setSortBy('riskDesc');
                }}
                className="btn btn-ghost btn-sm"
                style={{
                  fontSize: 12,
                  color: '#64748B',
                  fontWeight: 600,
                  whiteSpace: 'nowrap'
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Database Main Table */}
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
          {filteredEntities.length === 0 ? (
            <div style={{ padding: 32 }}>
              <EmptyState
                title="No threat entities match your filter"
                description="Try clearing search queries or switching vector categories."
                actionLabel="Reset All Filters"
                onAction={() => {
                  setSearchTerm('');
                  setFilterType('ALL');
                  setFilterRisk('ALL');
                  setSortBy('riskDesc');
                }}
              />
            </div>
          ) : (
            <div className="table-responsive">
              <table className="sec-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569' }}>Entity Identifier</th>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569' }}>Vector</th>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569' }}>Risk Level</th>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569' }}>Threat Category</th>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569' }}>Reports</th>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569' }}>Status</th>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569' }}>Last Observed</th>
                    <th style={{ padding: '14px 16px', fontSize: 12, fontWeight: 600, color: '#475569', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntities.map((ent, idx) => (
                    <tr
                      key={ent.id}
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
                          onClick={() => navigateToEntity(ent.id)}
                          style={{ cursor: 'pointer', display: 'inline-flex' }}
                        >
                          <TechnicalMono value={ent.identifier} length={24} truncate canCopy={false} />
                        </div>
                        <div style={{ fontSize: 12, color: '#64748B', marginTop: 2, fontWeight: 500 }}>
                          {ent.name}
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: 6,
                            background: '#F1F5F9',
                            color: '#475569',
                            textTransform: 'uppercase'
                          }}
                        >
                          {ent.type}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <RiskBadge score={ent.riskScore} size="sm" />
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: 12, color: '#334155', fontWeight: 500 }}>
                          {ent.category || 'Threat Asset'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span
                          style={{
                            fontSize: 12,
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: 9999,
                            background: ent.reportsCount > 10 ? 'rgba(220, 38, 38, 0.08)' : '#F1F5F9',
                            color: ent.reportsCount > 10 ? '#DC2626' : '#475569'
                          }}
                        >
                          {ent.reportsCount}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <StatusBadge status={ent.status} />
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontSize: 12, color: '#64748B' }}>
                          {ent.lastSeen}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: 6 }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{
                              padding: '4px 12px',
                              fontSize: 11,
                              borderRadius: 6,
                              fontWeight: 600
                            }}
                            onClick={() => navigateToEntity(ent.id)}
                          >
                            Investigate
                          </button>
                          <button
                            className="btn btn-ghost btn-sm"
                            style={{
                              padding: '4px 8px',
                              fontSize: 11,
                              borderRadius: 6,
                              color: ent.watchlist ? '#2563EB' : '#94A3B8'
                            }}
                            onClick={() => toggleWatchlist(ent.id)}
                            title={ent.watchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                          >
                            <Bookmark size={14} fill={ent.watchlist ? '#2563EB' : 'none'} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer with counter */}
          <div
            style={{
              padding: '14px 20px',
              background: '#F8FAFC',
              borderTop: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: 12,
              color: '#64748B'
            }}
          >
            <span>
              Showing <strong style={{ color: '#0F172A' }}>{filteredEntities.length}</strong> of{' '}
              <strong style={{ color: '#0F172A' }}>{entities.length}</strong> verified threat indicators
            </span>
            <span>
              Real-time updates synced with TOPDOO Threat Feed Network
            </span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
