import React, { useState } from 'react';
import {
  Fish,
  Search,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  XCircle,
  AlertCircle,
  ExternalLink,
  Lock,
  Globe,
  HelpCircle,
  ArrowRight,
  Bookmark,
  Share2,
  RefreshCw,
  Server,
  Code,
  FileText,
  Terminal,
  Activity,
  Check
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { RiskGauge } from '../../components/common/RiskGauge';
import { RiskBadge } from '../../components/common/RiskBadge';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { PageTransition } from '../../components/common/PageTransition';

const mobileStyles = `
  @media (max-width: 768px) {
    .phishing-form {
      flex-direction: column !important;
      gap: 12px !important;
    }
    .phishing-form input {
      width: 100% !important;
    }
    .phishing-form button {
      width: 100% !important;
      justify-content: center;
    }
    .phishing-verdict-card {
      padding: 16px !important;
    }
    .phishing-tabs {
      flex-wrap: wrap;
    }
    .phishing-tabs button {
      flex: 1;
      justify-content: center;
      padding: 10px 8px !important;
      font-size: 12.5px !important;
    }
  }
`;

export function PhishingCheckView() {
  const { entities, navigateToEntity, toggleWatchlist, showToast } = useSecurity();

  const [inputUrl, setInputUrl] = useState('https://chase-security-verify.net/auth');
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState('signals'); // 'signals' | 'network' | 'dom'

  const [analyzedTarget, setAnalyzedTarget] = useState(() => {
    return entities.find(e => e.identifier.includes('chase') || e.category.includes('Phishing')) || entities[0];
  });

  const handleInspect = (targetUrl) => {
    const urlToTest = typeof targetUrl === 'string' ? targetUrl : inputUrl;
    if (!urlToTest.trim()) return;

    setIsScanning(true);
    setTimeout(() => {
      const cleanUrl = urlToTest.toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      const match = entities.find(e =>
        e.identifier.toLowerCase().includes(cleanUrl) ||
        cleanUrl.includes(e.identifier.toLowerCase())
      );

      if (match) {
        setAnalyzedTarget(match);
        showToast(`Target identified: ${match.name}`, 'info');
      } else {
        // If not found in database, synthesize dynamic inspection entity
        setAnalyzedTarget({
          id: 'temp-' + Date.now(),
          identifier: cleanUrl,
          name: `${cleanUrl} (Ad-hoc Scan)`,
          riskScore: cleanUrl.includes('topdoo') || cleanUrl.includes('google') ? 2 : 78,
          status: cleanUrl.includes('topdoo') ? 'Verified Authentic' : 'Suspicious Domain / Unrated',
          targetBrand: cleanUrl.includes('chase') ? 'Chase Bank' : (cleanUrl.includes('metamask') ? 'MetaMask' : 'Unknown Brand'),
          category: 'Web Inspection',
          createdAt: '2026-09-20',
          lastSeen: 'Just now',
          reportsCount: 6,
          watchlist: false,
          ip: '198.51.100.89',
          asn: 'AS16276 (OVH Hosting)',
          ssl: 'Let\'s Encrypt TLS (Domain Validated)',
          domainAge: '14 days'
        });
        showToast('Live heuristic scan complete', 'success');
      }
      setIsScanning(false);
    }, 450);
  };

  const sampleTargets = [
    { label: 'chase-security-verify.net', type: 'Banking Phishing', score: 92, brand: 'Chase' },
    { label: 'metamask-claim-airdrop.xyz', type: 'Crypto Phishing', score: 94, brand: 'MetaMask' },
    { label: 'luxury-clearance-outlet.shop', type: 'Deceptive Store', score: 68, brand: 'Outlet' },
    { label: 'topdoo.com', type: 'Verified Enterprise', score: 2, brand: 'TOPDOO' }
  ];

  const isPhishingOrScam = analyzedTarget.riskScore > 60;
  const isSafe = analyzedTarget.riskScore <= 20;

  // Generate contextual heuristic signals based on target risk
  const signals = isSafe ? [
    {
      status: 'clean',
      icon: CheckCircle,
      title: 'Valid Authoritative TLS 1.3 Certificate',
      desc: 'Extended Validation (EV) certificate backed by DigiCert Global Root G2 with permanent cryptographic anchoring.',
      telemetry: 'TLS 1.3 • RSA 4096-bit • HSTS Preloaded'
    },
    {
      status: 'clean',
      icon: CheckCircle,
      title: 'Established Domain Longevity (> 5 Years)',
      desc: `First registered in 2021. Established domain age eliminates disposable infrastructure vectors.`,
      telemetry: 'Age: 5+ Years • Non-expiring DNSSEC'
    },
    {
      status: 'clean',
      icon: CheckCircle,
      title: 'Zero Impersonation or Cloned DOM Signatures',
      desc: 'Authentic DOM stylesheet integrity. No outbound credential relay scripts or foreign iframe mirrors detected.',
      telemetry: 'CSP Policy Enforced • Subresource Integrity (SRI) Valid'
    },
    {
      status: 'clean',
      icon: CheckCircle,
      title: 'Authoritative Enterprise Autonomous System (ASN)',
      desc: 'Routed via Cloudflare Enterprise / Google Cloud Infrastructure with verified abuse response SLA.',
      telemetry: 'AS13335 (Cloudflare) • Clean IP History'
    }
  ] : [
    {
      status: 'clean',
      icon: CheckCircle,
      title: 'HTTPS Certificate Active',
      desc: 'Valid TLS certificate present. Note: Over 89% of modern phishing traps utilize automated free SSL certificates to appear legitimate.',
      telemetry: 'Let\'s Encrypt Authority X3 • Domain Validated (DV)'
    },
    {
      status: analyzedTarget.riskScore > 75 ? 'critical' : 'warning',
      icon: analyzedTarget.riskScore > 75 ? AlertCircle : AlertTriangle,
      title: `Newly Registered Domain (${analyzedTarget.domainAge || '18 days old'})`,
      desc: `Registered on ${analyzedTarget.createdAt || 'recent date'}. Over 78% of active credential harvesting campaigns use disposable domains under 60 days old.`,
      telemetry: `Domain Age: ${analyzedTarget.domainAge || '18 days'} • Registrar: Privacy Protected`
    },
    {
      status: 'critical',
      icon: XCircle,
      title: `Brand Impersonation Detected (${analyzedTarget.targetBrand || 'Targeted Brand'})`,
      desc: `DOM structure, high-resolution logos, CSS token architecture and input forms mimic the official ${analyzedTarget.targetBrand || 'financial'} authentication portal.`,
      telemetry: '94% Structural DOM Similarity • Cloned Assets'
    },
    {
      status: 'critical',
      icon: XCircle,
      title: 'Suspicious Reverse-Proxy Interception Trap',
      desc: 'Active man-in-the-middle (MitM) relay script detected intercepting session tokens and intermediate 2FA one-time passwords in transit.',
      telemetry: 'Intercept Endpoint: /api/auth/relay-otp • WebSocket Sniffer'
    },
    {
      status: analyzedTarget.riskScore > 80 ? 'critical' : 'warning',
      icon: analyzedTarget.riskScore > 80 ? XCircle : AlertTriangle,
      title: 'Corroborated Victim Complaints in Global Threat Feeds',
      desc: `${analyzedTarget.reportsCount || 27} corroborated user abuse complaints filed with verified phishing message logs and fraudulent debit reports.`,
      telemetry: 'APWG Match • Google Safe Browsing Flagged • TOPDOO Verified'
    }
  ];

  return (
    <PageTransition>
      <style>{mobileStyles}</style>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1080, margin: '0 auto', paddingBottom: 40 }}>
        {/* Header */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 999, marginBottom: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#DC2626' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#B91C1C' }}>Active Threat Telemetry & URL Scanner</span>
          </div>
          <h1 className="heading-xl">Phishing & Impersonation Heuristic Scanner</h1>
          <p className="subheading" style={{ marginTop: 6, maxWidth: 840 }}>
            Deep inspection of suspicious URLs, reverse-proxy traps, brand typosquatting domains, and credential harvesting landing pages with real-time heuristic scoring.
          </p>

          {/* Search Box */}
          <form
            className="phishing-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleInspect();
            }}
            style={{
              marginTop: 18,
              display: 'flex',
              gap: 8,
              background: '#FFFFFF',
              padding: 8,
              borderRadius: 14,
              border: '1.5px solid #E2E8F0',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1, paddingLeft: 12 }}>
              <Search size={18} color="#64748B" />
              <input
                type="text"
                placeholder="Enter suspicious URL or phishing landing page (e.g. https://chase-security-verify.net)..."
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  color: '#0F172A',
                  background: 'transparent'
                }}
              />
            </div>
            <button
              type="submit"
              disabled={isScanning}
              className="btn btn-primary"
              style={{ padding: '10px 20px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 8 }}
            >
              {isScanning ? (
                <>
                  <RefreshCw size={16} className="spin-animation" />
                  <span>Scanning Heuristics...</span>
                </>
              ) : (
                <>
                  <Fish size={16} />
                  <span>Investigate Phishing</span>
                </>
              )}
            </button>
          </form>

          {/* Quick Example Pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B' }}>Quick Test Targets:</span>
            {sampleTargets.map((item, idx) => {
              const isTargetActive = analyzedTarget.identifier.includes(item.label);
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setInputUrl(`https://${item.label}/auth`);
                    handleInspect(item.label);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 12px',
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: 500,
                    cursor: 'pointer',
                    background: isTargetActive ? '#EFF6FF' : '#FFFFFF',
                    border: `1px solid ${isTargetActive ? '#2563EB' : '#E2E8F0'}`,
                    color: isTargetActive ? '#1D4ED8' : '#334155',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <span style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: item.score > 80 ? '#DC2626' : (item.score > 40 ? '#D97706' : '#059669')
                  }} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Verdict Card */}
        <div className="phishing-verdict-card" style={{
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #E2E8F0',
          borderTop: `5px solid ${isSafe ? '#059669' : (isPhishingOrScam ? '#DC2626' : '#D97706')}`,
          padding: 24,
          boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 24 }}>
            {/* Left side details */}
            <div style={{ flex: 1, minWidth: 320 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  padding: '3px 9px',
                  borderRadius: 6,
                  background: isSafe ? '#ECFDF5' : '#FEF2F2',
                  color: isSafe ? '#059669' : '#DC2626',
                  border: `1px solid ${isSafe ? '#A7F3D0' : '#FECACA'}`
                }}>
                  {isSafe ? 'Verified Safe Entity' : 'Phishing Threat Target'}
                </span>
                <RiskBadge score={analyzedTarget.riskScore} />
                <span style={{ fontSize: 12, color: '#64748B' }}>
                  Category: <strong>{analyzedTarget.category || 'Phishing'}</strong>
                </span>
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em', wordBreak: 'break-all' }}>
                {analyzedTarget.identifier}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, flexWrap: 'wrap', fontSize: 13, color: '#475569' }}>
                <div>
                  Mimicking Brand: <strong style={{ color: '#2563EB' }}>{analyzedTarget.targetBrand || 'Unknown'}</strong>
                </div>
                <span>•</span>
                <div>
                  Status: <strong style={{ color: isSafe ? '#059669' : '#DC2626' }}>{analyzedTarget.status}</strong>
                </div>
                <span>•</span>
                <div>
                  Last Seen: <span style={{ color: '#64748B' }}>{analyzedTarget.lastSeen || 'Recently'}</span>
                </div>
              </div>

              {/* Quick Technical Specs Chips */}
              <div style={{ display: 'flex', gap: 8, marginTop: 16, flexWrap: 'wrap' }}>
                <div style={{ background: '#F8FAFC', padding: '6px 12px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }}>
                  <span style={{ color: '#64748B' }}>IP Host: </span>
                  <strong className="mono" style={{ color: '#0F172A' }}>{analyzedTarget.ip || '198.51.100.89'}</strong>
                </div>
                <div style={{ background: '#F8FAFC', padding: '6px 12px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }}>
                  <span style={{ color: '#64748B' }}>ASN: </span>
                  <strong style={{ color: '#0F172A' }}>{analyzedTarget.asn || 'AS16276 (OVH)'}</strong>
                </div>
                <div style={{ background: '#F8FAFC', padding: '6px 12px', borderRadius: 8, border: '1px solid #E2E8F0', fontSize: 12 }}>
                  <span style={{ color: '#64748B' }}>Domain Age: </span>
                  <strong style={{ color: '#0F172A' }}>{analyzedTarget.domainAge || '28 days'}</strong>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    toggleWatchlist(analyzedTarget.id);
                    showToast(analyzedTarget.watchlist ? 'Removed from Watchlist' : 'Added to Security Watchlist', 'info');
                  }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <Bookmark size={15} color={analyzedTarget.watchlist ? '#2563EB' : '#64748B'} />
                  <span>{analyzedTarget.watchlist ? 'Target Watched' : 'Watch Target'}</span>
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => navigateToEntity(analyzedTarget.id)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <span>Open Deep Entity Dossier</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Right side Gauge */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 24px',
              background: '#F8FAFC',
              borderRadius: 14,
              border: '1px solid #E2E8F0',
              minWidth: 220
            }}>
              <RiskGauge score={analyzedTarget.riskScore} size="lg" />
              <div style={{ marginTop: 12, textAlign: 'center' }}>
                <div style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: isSafe ? '#059669' : '#DC2626',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em'
                }}>
                  {isSafe ? 'Enterprise Clean' : 'Confirmed Malicious'}
                </div>
                <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>
                  {isSafe ? 'No malicious telemetry recorded' : 'Active credential interception trap'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation for Inspection Details */}
        <div className="phishing-tabs" style={{ display: 'flex', gap: 8, borderBottom: '1px solid #E2E8F0', paddingBottom: 1 }}>
          <button
            onClick={() => setActiveTab('signals')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              border: 'none',
              background: 'transparent',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              color: activeTab === 'signals' ? '#2563EB' : '#64748B',
              borderBottom: `2.5px solid ${activeTab === 'signals' ? '#2563EB' : 'transparent'}`,
              marginBottom: -1,
              transition: 'all 0.15s ease'
            }}
          >
            <ShieldAlert size={16} />
            <span>Heuristic Signals ({signals.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('dom')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              border: 'none',
              background: 'transparent',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              color: activeTab === 'dom' ? '#2563EB' : '#64748B',
              borderBottom: `2.5px solid ${activeTab === 'dom' ? '#2563EB' : 'transparent'}`,
              marginBottom: -1,
              transition: 'all 0.15s ease'
            }}
          >
            <Code size={16} />
            <span>DOM & Payload Forensics</span>
          </button>

          <button
            onClick={() => setActiveTab('network')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              border: 'none',
              background: 'transparent',
              fontSize: 13.5,
              fontWeight: 600,
              cursor: 'pointer',
              color: activeTab === 'network' ? '#2563EB' : '#64748B',
              borderBottom: `2.5px solid ${activeTab === 'network' ? '#2563EB' : 'transparent'}`,
              marginBottom: -1,
              transition: 'all 0.15s ease'
            }}
          >
            <Server size={16} />
            <span>DNS & Infrastructure Routing</span>
          </button>
        </div>

        {/* Tab 1: Signals List */}
        {activeTab === 'signals' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {signals.map((sig, idx) => {
              const Icon = sig.icon;
              const isCrit = sig.status === 'critical';
              const isWarn = sig.status === 'warning';
              const isClean = sig.status === 'clean';

              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    padding: '16px 18px',
                    borderRadius: 12,
                    background: isCrit ? '#FEF2F2' : (isWarn ? '#FFFBEB' : '#F0FDF4'),
                    border: `1px solid ${isCrit ? '#FECACA' : (isWarn ? '#FDE68A' : '#BBF7D0')}`,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ marginTop: 2, flexShrink: 0 }}>
                    <Icon
                      size={20}
                      color={isCrit ? '#DC2626' : (isWarn ? '#D97706' : '#059669')}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                      <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                        {sig.title}
                      </span>
                      <span style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 4,
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        color: '#475569'
                      }}>
                        {sig.telemetry}
                      </span>
                    </div>
                    <div style={{ fontSize: 13, color: '#475569', marginTop: 4, lineHeight: 1.5 }}>
                      {sig.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: DOM & Payload Forensics */}
        {activeTab === 'dom' && (
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 22 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Terminal size={17} color="#2563EB" />
              <span>Extracted Form Action & Reverse-Proxy Payload Dump</span>
            </h3>

            {isSafe ? (
              <div style={{ padding: 20, textAlign: 'center', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <CheckCircle size={28} color="#059669" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>Clean Authenticated DOM Baseline</div>
                <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 4 }}>
                  No credential relay scripts, obfuscated payload loaders, or external exfiltration hooks were observed on this entity.
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ background: '#0F172A', borderRadius: 10, padding: 16, color: '#F8FAFC', fontFamily: 'monospace', fontSize: 12.5, overflowX: 'auto' }}>
                  <div style={{ color: '#94A3B8', marginBottom: 8 }}>// Intercepted Credential Exfiltration POST Form Action</div>
                  <div style={{ color: '#F87171' }}>&lt;form action="https://chase-security-verify.net/api/harvest/session-v4" method="POST"&gt;</div>
                  <div style={{ color: '#60A5FA', paddingLeft: 16 }}>&lt;input name="username" type="text" autocomplete="off" /&gt;</div>
                  <div style={{ color: '#60A5FA', paddingLeft: 16 }}>&lt;input name="password" type="password" autocomplete="off" /&gt;</div>
                  <div style={{ color: '#60A5FA', paddingLeft: 16 }}>&lt;input name="otp_token" type="text" placeholder="6-digit SMS Code" /&gt;</div>
                  <div style={{ color: '#F87171' }}>&lt;/form&gt;</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
                  <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>CLONED BRAND ASSETS</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#DC2626', marginTop: 4 }}>
                      14 hotlinked SVG logos & CSS stylesheets
                    </div>
                  </div>
                  <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>EXFILTRATION C2 PROTOCOL</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#DC2626', marginTop: 4 }}>
                      Encrypted WebSocket to 185.220.101.44:8443
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: DNS & Routing */}
        {activeTab === 'network' && (
          <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 22 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Server size={17} color="#2563EB" />
              <span>DNS Zone Telemetry & Upstream Routing</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
              <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>AUTHORITATIVE A-RECORD</div>
                <div className="mono" style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginTop: 4 }}>
                  {analyzedTarget.ip || '198.51.100.89'}
                </div>
                <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>
                  Subnet: 198.51.100.0/24 (Associated with 4 other phishing hosts)
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>NAME SERVERS (NS)</div>
                <div className="mono" style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A', marginTop: 4 }}>
                  ns1.{analyzedTarget.identifier}
                </div>
                <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>
                  Self-hosted rogue DNS nameserver to evade registrars
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>SSL/TLS CERTIFICATE</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A', marginTop: 4 }}>
                  {analyzedTarget.ssl || 'Let\'s Encrypt DV'}
                </div>
                <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>
                  Issued automatically with zero organization identity verification
                </div>
              </div>

              <div style={{ background: '#F8FAFC', padding: 16, borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#64748B' }}>REGISTRAR & WHOIS</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A', marginTop: 4 }}>
                  {analyzedTarget.registrar || 'Tucows Domains Inc.'}
                </div>
                <div style={{ fontSize: 11.5, color: '#64748B', marginTop: 2 }}>
                  Proxy Protection Service enabled (Country: {analyzedTarget.country || 'US'})
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Why is this risky? Plain-Language Advisory */}
        <div style={{
          background: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #E2E8F0',
          borderLeft: `5px solid ${isSafe ? '#059669' : '#DC2626'}`,
          padding: 22,
          boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <HelpCircle size={18} color={isSafe ? '#059669' : '#DC2626'} />
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A' }}>
              {isSafe ? 'Platform Safety Advisory' : 'Incident Response Guide: What if you entered information here?'}
            </h3>
          </div>

          {isSafe ? (
            <div style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.65 }}>
              This domain is a confirmed, cryptographically verified enterprise property. Navigation, account login, and transaction workflows are secured by end-to-end encryption and strict domain name authority.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13.5, color: '#475569', lineHeight: 1.6 }}>
              <p>
                This website exhibits conclusive hallmarks of an active <strong>credential harvesting attack</strong>. It impersonates <strong>{analyzedTarget.targetBrand || 'official brands'}</strong> while intercepting passwords and one-time two-factor SMS codes in real-time. If you interacted with this link, take immediate defensive action:
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10, marginTop: 4 }}>
                <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#DC2626', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>1</span>
                    <span>Reset Official Password</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                    Navigate directly to the official brand portal (do NOT click links in emails/SMS) and change your password immediately.
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#DC2626', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>2</span>
                    <span>Revoke 2FA & Terminate Sessions</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                    Check your security settings to log out of all active web and mobile sessions, and re-bind your authenticator app.
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: '#DC2626', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>3</span>
                    <span>Notify Bank or Exchange</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                    Alert your financial provider's fraud hotline to freeze linked payment cards and place an anti-theft credit lock.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
