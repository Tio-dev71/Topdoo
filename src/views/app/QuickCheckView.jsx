import React, { useState } from 'react';
import {
  Zap,
  Shield,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowRight,
  Bookmark,
  Share2,
  ExternalLink,
  Search,
  RefreshCw,
  FileText,
  Network,
  Lock,
  Globe,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { RiskGauge } from '../../components/common/RiskGauge';
import { RiskBadge } from '../../components/common/RiskBadge';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { PageTransition } from '../../components/common/PageTransition';

export function QuickCheckView() {
  const {
    quickCheckQuery,
    setQuickCheckQuery,
    isScanning,
    scanStepIndex,
    scanStages,
    quickCheckResult,
    runQuickCheck,
    navigateToEntity,
    toggleWatchlist,
    setCurrentView
  } = useSecurity();

  const [inputVal, setInputVal] = useState(quickCheckQuery || '');

  // Detect identifier type in real-time
  const detectType = (val) => {
    if (!val) return null;
    const v = val.trim();
    if (v.startsWith('0x') && v.length >= 40) return 'Ethereum Wallet / Smart Contract';
    if (v.includes('@')) return 'Email Address';
    if (/^\+?[0-9\s\-()]{7,20}$/.test(v)) return 'Telephone / SMS Sender';
    if (v.startsWith('http://') || v.startsWith('https://')) return 'Full Web URL';
    if (v.includes('.')) return 'Domain Name / Hostname';
    return 'Entity / Organization Name';
  };

  const detectedType = detectType(inputVal);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVal.trim()) {
      runQuickCheck(inputVal);
    }
  };

  const sampleTargets = [
    { label: 'MetaMask Airdrop', value: 'metamask-claim-airdrop.xyz' },
    { label: 'Inferno Drainer', value: '0x71C8564E3b82928374dC8187e59b20755AA9B829' },
    { label: 'Chase Smishing', value: 'chase-security-verify.net' },
    { label: 'Apex Capital Ponzi', value: 'apex-capital-investments.ltd' },
    { label: 'TOPDOO Node', value: 'topdoo.com' }
  ];

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 960, margin: '0 auto' }}>
        {/* Hero Section matching Marketing Aesthetic */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 100%)',
            padding: '36px 32px',
            borderRadius: 20,
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '4px 14px',
              borderRadius: 9999,
              background: 'rgba(37, 99, 235, 0.08)',
              border: '1px solid rgba(37, 99, 235, 0.2)',
              color: '#2563EB',
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 16
            }}
          >
            <Zap size={14} />
            <span>Multi-Vector AI Threat Inspection Engine</span>
          </div>

          <h1
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.025em',
              marginBottom: 10
            }}
          >
            Check Before You Trust
          </h1>

          <p
            style={{
              fontSize: 15,
              color: '#475569',
              maxWidth: 620,
              margin: '0 auto 24px',
              lineHeight: 1.6
            }}
          >
            Instantly evaluate URLs, domains, crypto wallet addresses, phone numbers, emails, and brand names against real-time global cyber threat intelligence.
          </p>

          {/* Big Search Form */}
          <form onSubmit={handleSubmit} className="quick-check-box" style={{ maxWidth: 720, margin: '0 auto' }}>
            <input
              type="text"
              className="quick-check-input"
              placeholder="Paste a URL, domain, wallet (0x...), phone number, or email..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isScanning}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!inputVal.trim() || isScanning}
              style={{
                minWidth: 140,
                borderRadius: 12,
                fontWeight: 600,
                fontSize: 14,
                padding: '10px 20px',
                background: '#2563EB',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)'
              }}
            >
              {isScanning ? (
                <>
                  <Loader2 size={16} className="spin" />
                  <span>Scanning...</span>
                </>
              ) : (
                <>
                  <Zap size={16} />
                  <span>Inspect Risk</span>
                </>
              )}
            </button>
          </form>

          {/* Real-time Type Indicator & Samples */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              maxWidth: 720,
              margin: '16px auto 0',
              fontSize: 12,
              flexWrap: 'wrap',
              gap: 10
            }}
          >
            <div style={{ color: '#64748B' }}>
              {detectedType ? (
                <span style={{ color: '#2563EB', fontWeight: 600 }}>
                  Target Type: {detectedType}
                </span>
              ) : (
                <span>Supported: URLs, Domains, Web3 Wallets, Phone Numbers, Emails</span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>Try:</span>
              {sampleTargets.slice(0, 3).map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputVal(item.value);
                    runQuickCheck(item.value);
                  }}
                  style={{
                    fontSize: 11,
                    background: '#FFFFFF',
                    padding: '3px 10px',
                    borderRadius: 9999,
                    border: '1px solid #E2E8F0',
                    color: '#475569',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 120ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2563EB';
                    e.currentTarget.style.color = '#2563EB';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.color = '#475569';
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SCANNING PROGRESS STATE */}
        {isScanning && (
          <div
            className="scanner-progress-container"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: 20,
              padding: '36px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              textAlign: 'center',
              maxWidth: 720,
              margin: '0 auto',
              width: '100%'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 12 }}>
              <Loader2 size={26} color="#2563EB" className="spin" />
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                Live Security Intelligence Interrogation
              </h2>
            </div>
            <p style={{ fontSize: 13, color: '#64748B', maxWidth: 520, margin: '0 auto 24px' }}>
              Querying distributed blocklists, heuristic correlation clusters, and threat telemetry feeds...
            </p>

            <div className="scanner-steps-list" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {scanStages.map((stage, idx) => {
                const isPast = idx < scanStepIndex;
                const isCurrent = idx === scanStepIndex;

                return (
                  <div
                    key={idx}
                    className={`scanner-step-row ${isCurrent ? 'active' : ''} ${isPast ? 'completed' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '12px 16px',
                      borderRadius: 10,
                      background: isCurrent ? 'rgba(37, 99, 235, 0.06)' : (isPast ? '#F8FAFC' : '#FFFFFF'),
                      border: isCurrent ? '1px solid #2563EB' : '1px solid #E2E8F0',
                      transition: 'all 160ms ease'
                    }}
                  >
                    <div style={{ width: 22, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                      {isPast ? (
                        <CheckCircle size={18} color="#059669" />
                      ) : isCurrent ? (
                        <Loader2 size={18} color="#2563EB" className="spin" />
                      ) : (
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#CBD5E1' }} />
                      )}
                    </div>
                    <div style={{ flex: 1, textAlign: 'left' }}>
                      <div style={{ fontWeight: isCurrent ? 700 : 600, fontSize: 13, color: isCurrent ? '#2563EB' : (isPast ? '#0F172A' : '#94A3B8') }}>
                        {stage.title}
                      </div>
                      {isCurrent && (
                        <div style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                          {stage.desc}
                        </div>
                      )}
                    </div>
                    {isPast && (
                      <span style={{ fontSize: 11, color: '#059669', fontWeight: 700 }}>VERIFIED</span>
                    )}
                    {isCurrent && (
                      <span style={{ fontSize: 11, color: '#2563EB', fontWeight: 700 }}>ANALYZING...</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* RESULT PAGE */}
        {!isScanning && quickCheckResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Main Risk Header Card */}
            <div
              className="sec-card"
              style={{
                padding: '28px 32px',
                borderRadius: 20,
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                borderTop: `4px solid ${
                  quickCheckResult.riskScore >= 81 ? '#DC2626' :
                  quickCheckResult.riskScore >= 61 ? '#EA580C' :
                  quickCheckResult.riskScore >= 41 ? '#D97706' :
                  quickCheckResult.riskScore >= 21 ? '#2563EB' : '#059669'
                }`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
                      {quickCheckResult.type}
                    </span>
                    <span style={{ fontSize: 12, color: '#94A3B8' }}>•</span>
                    <span style={{ fontSize: 12, color: '#64748B' }}>Target Assessed</span>
                  </div>

                  <h2
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      color: '#0F172A',
                      margin: '4px 0'
                    }}
                  >
                    {quickCheckResult.identifier}
                  </h2>

                  <div style={{ fontSize: 14, color: '#475569', maxWidth: 620, lineHeight: 1.5 }}>
                    {quickCheckResult.summary}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => toggleWatchlist(quickCheckResult.id)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 10,
                      fontWeight: 600,
                      background: '#FFFFFF',
                      border: '1px solid #E2E8F0',
                      color: quickCheckResult.watchlist ? '#2563EB' : '#475569'
                    }}
                  >
                    <Bookmark size={15} fill={quickCheckResult.watchlist ? '#2563EB' : 'none'} />
                    <span>{quickCheckResult.watchlist ? 'In Watchlist' : 'Add to Watchlist'}</span>
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigateToEntity(quickCheckResult.id)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 10,
                      fontWeight: 600,
                      background: '#2563EB',
                      boxShadow: '0 4px 14px rgba(37, 99, 235, 0.25)'
                    }}
                  >
                    <span>Full Intelligence Profile</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              <div style={{ borderTop: '1px solid #F1F5F9', marginTop: 24, paddingTop: 24 }}>
                <RiskGauge score={quickCheckResult.riskScore} size="lg" />
              </div>
            </div>

            {/* Risk Factors Breakdown */}
            <div className="sec-card" style={{ borderRadius: 20 }}>
              <div className="sec-card-header" style={{ marginBottom: 18 }}>
                <div>
                  <div className="sec-card-title" style={{ fontSize: 16, fontWeight: 700 }}>
                    <Shield size={18} color="#2563EB" />
                    <span>Multi-Signal Risk Factor Contribution</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>
                    Explainable algorithmic weight breakdown justifying the calculated risk score
                  </div>
                </div>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => setCurrentView('risk-scores')}
                  style={{ color: '#2563EB', fontWeight: 600, fontSize: 12 }}
                >
                  <span>Methodology Docs</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {quickCheckResult.riskFactors?.map((factor, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '14px 18px',
                      borderRadius: 12,
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      transition: 'all 120ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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
                          {factor.status.toUpperCase()}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span
                          style={{
                            fontWeight: 800,
                            fontSize: 13,
                            color: factor.score > 20 ? '#DC2626' : '#0F172A'
                          }}
                        >
                          +{factor.score} pts
                        </span>
                        <span style={{ fontSize: 11, color: '#94A3B8' }}>/ {factor.max} max</span>
                      </div>
                    </div>

                    {/* Weight Progress Bar */}
                    <div style={{ height: 5, borderRadius: 9999, background: '#E2E8F0', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${(factor.score / factor.max) * 100}%`,
                          background: factor.score > 20 ? '#DC2626' : (factor.score > 10 ? '#D97706' : '#059669'),
                          borderRadius: 9999,
                          transition: 'width 0.6s ease'
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

            {/* Quick Actions Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
              <div
                className="sec-card"
                style={{
                  cursor: 'pointer',
                  borderRadius: 16,
                  padding: 20,
                  transition: 'all 160ms cubic-bezier(0.16, 1, 0.3, 1)',
                  border: '1px solid #E2E8F0'
                }}
                onClick={() => setCurrentView('scam-network')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Network size={16} color="#2563EB" />
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                    Explore Scam Network
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>
                  Inspect correlated infrastructure nodes, hosting providers, and linked wallets in visual graph.
                </div>
              </div>

              <div
                className="sec-card"
                style={{
                  cursor: 'pointer',
                  borderRadius: 16,
                  padding: 20,
                  transition: 'all 160ms cubic-bezier(0.16, 1, 0.3, 1)',
                  border: '1px solid #E2E8F0'
                }}
                onClick={() => setCurrentView('phishing-check')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <ShieldCheck size={16} color="#2563EB" />
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                    Deep Phishing Analysis
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>
                  Inspect DOM clone signatures, brand logo spoofing, SSL certificate details, and reverse proxies.
                </div>
              </div>

              <div
                className="sec-card"
                style={{
                  cursor: 'pointer',
                  borderRadius: 16,
                  padding: 20,
                  transition: 'all 160ms cubic-bezier(0.16, 1, 0.3, 1)',
                  border: '1px solid #E2E8F0'
                }}
                onClick={() => setCurrentView('report-scam')}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2563EB';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(37, 99, 235, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#E2E8F0';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <FileText size={16} color="#2563EB" />
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                    Submit Incident Report
                  </div>
                </div>
                <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.5 }}>
                  Upload on-chain tx hashes, phishing email headers, or customer deception screenshots.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
