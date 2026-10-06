import React, { useState } from 'react';
import {
  Sliders,
  Shield,
  ShieldAlert,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  Activity,
  Layers,
  ChevronDown,
  ChevronUp,
  FileText,
  Network,
  Globe,
  Lock,
  RotateCcw,
  Zap,
  Info,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { RiskGauge } from '../../components/common/RiskGauge';
import { RiskBadge } from '../../components/common/RiskBadge';
import { PageTransition } from '../../components/common/PageTransition';

export function RiskScoreMethodologyView() {
  const { showToast, setCurrentView } = useSecurity();

  // Interactive sandbox weights slider
  const [weights, setWeights] = useState({
    reportHistory: 28,
    phishingSignals: 24,
    networkConnections: 18,
    domainReputation: 12,
    evidenceQuality: 5
  });

  const [activePreset, setActivePreset] = useState('custom');

  const factorMax = {
    reportHistory: 35,
    phishingSignals: 30,
    networkConnections: 20,
    domainReputation: 15,
    evidenceQuality: 5
  };

  const totalScore = Math.min(100, Math.max(0, Object.values(weights).reduce((a, b) => a + b, 0)));

  const applyPreset = (presetName) => {
    setActivePreset(presetName);
    if (presetName === 'safe') {
      setWeights({
        reportHistory: 0,
        phishingSignals: 0,
        networkConnections: 0,
        domainReputation: 2,
        evidenceQuality: 0
      });
      showToast('Loaded Safe Enterprise Baseline Preset', 'success');
    } else if (presetName === 'moderate') {
      setWeights({
        reportHistory: 12,
        phishingSignals: 14,
        networkConnections: 8,
        domainReputation: 10,
        evidenceQuality: 2
      });
      showToast('Loaded Moderate Risk Domain Preset', 'info');
    } else if (presetName === 'phishing') {
      setWeights({
        reportHistory: 24,
        phishingSignals: 28,
        networkConnections: 12,
        domainReputation: 13,
        evidenceQuality: 4
      });
      showToast('Loaded Brand Impersonation Trap Preset', 'warning');
    } else if (presetName === 'critical') {
      setWeights({
        reportHistory: 35,
        phishingSignals: 30,
        networkConnections: 19,
        domainReputation: 14,
        evidenceQuality: 5
      });
      showToast('Loaded Active Drainer / Critical Scam Preset', 'error');
    } else {
      setWeights({
        reportHistory: 28,
        phishingSignals: 24,
        networkConnections: 18,
        domainReputation: 12,
        evidenceQuality: 5
      });
      showToast('Weights reset to baseline model', 'info');
    }
  };

  const handleSliderChange = (factor, value) => {
    setActivePreset('custom');
    setWeights(prev => ({ ...prev, [factor]: Number(value) }));
  };

  const [expandedFAQ, setExpandedFAQ] = useState({
    scoringModel: true,
    falsePositiveMitigation: true,
    sybilDefense: false,
    reEvaluation: false
  });

  const toggleFAQ = (key) => {
    setExpandedFAQ(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Determine classification details based on totalScore
  const getClassification = (score) => {
    if (score <= 20) {
      return {
        tier: 'Safe / Verified',
        color: '#059669',
        bg: '#ECFDF5',
        border: '#A7F3D0',
        action: 'Automated Whitelist & Unrestricted Passthrough',
        desc: 'Authentic enterprise infrastructure, authoritative DNS, EV TLS, and established domain age.'
      };
    } else if (score <= 40) {
      return {
        tier: 'Low Risk',
        color: '#2563EB',
        bg: '#EFF6FF',
        border: '#BFDBFE',
        action: 'Standard Inspection & Routine Telemetry Logging',
        desc: 'Minor configuration warnings or new SSL certificates, but clean operational history.'
      };
    } else if (score <= 60) {
      return {
        tier: 'Moderate Risk',
        color: '#D97706',
        bg: '#FFFBEB',
        border: '#FDE68A',
        action: 'Heuristic Warning Banner & User Caution Recommended',
        desc: 'Young domain registration, affiliate cloaking, or unverified community abuse inquiries.'
      };
    } else if (score <= 80) {
      return {
        tier: 'High Risk',
        color: '#EA580C',
        bg: '#FFF7ED',
        border: '#FED7AA',
        action: 'Pre-Emptive Interstitial Interception & Security Quarantine',
        desc: 'Brand typosquatting, deceptive DOM elements, or links to known scam clusters.'
      };
    } else {
      return {
        tier: 'Critical / Scam',
        color: '#DC2626',
        bg: '#FEF2F2',
        border: '#FECACA',
        action: 'Immediate Automated Blacklist & Gateway Block',
        desc: 'Active wallet drainer, reverse proxy phishing, or corroborated fraudulent transactions.'
      };
    }
  };

  const currentClass = getClassification(totalScore);

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1120, margin: '0 auto', paddingBottom: 40 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 999, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8' }}>Explainable Security Architecture</span>
            </div>
            <h1 className="heading-xl">TOPDOO Risk Scoring Engine & Methodology</h1>
            <p className="subheading" style={{ marginTop: 6, maxWidth: 840 }}>
              Algorithmic transparency at scale: TOPDOO computes transparent, vector-weighted security scores from 0 to 100 without black-box obscurity. Every single signal is inspectable and verifiable.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className="btn btn-secondary"
              onClick={() => showToast('Scoring methodology specification exported', 'success')}
            >
              <BookOpen size={15} />
              <span>Export Whitepaper</span>
            </button>
            <button
              className="btn btn-primary"
              onClick={() => setCurrentView('quick-check')}
            >
              <Zap size={15} />
              <span>Test Live Entity</span>
            </button>
          </div>
        </div>

        {/* Standardized 5-Tier Semantic Risk Classification */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 22, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Layers size={17} color="#2563EB" />
                <span>Standardized 5-Tier Semantic Risk Classification</span>
              </h3>
              <p style={{ fontSize: 12.5, color: '#64748B', marginTop: 2 }}>
                Global cybersecurity posture mapping calibrated across multi-million threat vector samples
              </p>
            </div>
            <span style={{ fontSize: 12, fontWeight: 500, color: '#64748B', background: '#F8FAFC', padding: '4px 10px', borderRadius: 6, border: '1px solid #E2E8F0' }}>
              Scale: 0 (Impenetrable) → 100 (Critical Malice)
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12 }}>
            {/* Safe Card */}
            <div style={{
              padding: '16px 14px',
              borderRadius: 12,
              background: '#F0FDF4',
              border: '1px solid #BBF7D0',
              borderTop: '4px solid #059669',
              display: 'flex',
              flexDirection: 'column',
              gap: 6
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: '#059669', letterSpacing: '-0.02em' }}>0 – 20</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, background: '#DCFCE7', color: '#15803D', padding: '2px 7px', borderRadius: 4 }}>TIER 1</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: '#0F172A' }}>Safe / Verified</div>
              <div style={{ fontSize: 11.5, color: '#475569', lineHeight: 1.45 }}>
                Authentic enterprise platforms, authoritative DNS, EV TLS, DNSSEC protection.
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 6, fontSize: 11, color: '#059669', fontWeight: 600 }}>
                e.g. google.com, chase.com
              </div>
            </div>

            {/* Low Risk Card */}
            <div style={{
              padding: '16px 14px',
              borderRadius: 12,
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderTop: '4px solid #2563EB',
              display: 'flex',
              flexDirection: 'column',
              gap: 6
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: '#2563EB', letterSpacing: '-0.02em' }}>21 – 40</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, background: '#DBEAFE', color: '#1E40AF', padding: '2px 7px', borderRadius: 4 }}>TIER 2</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: '#0F172A' }}>Low Risk</div>
              <div style={{ fontSize: 11.5, color: '#475569', lineHeight: 1.45 }}>
                Minor configuration warnings, recent SSL reissue, normal anomaly telemetry.
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 6, fontSize: 11, color: '#2563EB', fontWeight: 600 }}>
                e.g. unverified subdomains
              </div>
            </div>

            {/* Moderate Risk Card */}
            <div style={{
              padding: '16px 14px',
              borderRadius: 12,
              background: '#FFFBEB',
              border: '1px solid #FDE68A',
              borderTop: '4px solid #D97706',
              display: 'flex',
              flexDirection: 'column',
              gap: 6
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: '#D97706', letterSpacing: '-0.02em' }}>41 – 60</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, background: '#FEF3C7', color: '#B45309', padding: '2px 7px', borderRadius: 4 }}>TIER 3</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: '#0F172A' }}>Moderate Risk</div>
              <div style={{ fontSize: 11.5, color: '#475569', lineHeight: 1.45 }}>
                Young domain registration, affiliate cloaking, community inquiries pending.
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 6, fontSize: 11, color: '#D97706', fontWeight: 600 }}>
                e.g. crypto promotional sites
              </div>
            </div>

            {/* High Risk Card */}
            <div style={{
              padding: '16px 14px',
              borderRadius: 12,
              background: '#FFF7ED',
              border: '1px solid #FED7AA',
              borderTop: '4px solid #EA580C',
              display: 'flex',
              flexDirection: 'column',
              gap: 6
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: '#EA580C', letterSpacing: '-0.02em' }}>61 – 80</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, background: '#FFEDD5', color: '#C2410C', padding: '2px 7px', borderRadius: 4 }}>TIER 4</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: '#0F172A' }}>High Risk</div>
              <div style={{ fontSize: 11.5, color: '#475569', lineHeight: 1.45 }}>
                Brand typosquatting, deceptive DOM forms, links to illicit scam network clusters.
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 6, fontSize: 11, color: '#EA580C', fontWeight: 600 }}>
                e.g. spoofed-login-chase.net
              </div>
            </div>

            {/* Critical Card */}
            <div style={{
              padding: '16px 14px',
              borderRadius: 12,
              background: '#FEF2F2',
              border: '1px solid #FECACA',
              borderTop: '4px solid #DC2626',
              display: 'flex',
              flexDirection: 'column',
              gap: 6
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: '#DC2626', letterSpacing: '-0.02em' }}>81 – 100</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, background: '#FEE2E2', color: '#B91C1C', padding: '2px 7px', borderRadius: 4 }}>TIER 5</span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: '#0F172A' }}>Critical / Scam</div>
              <div style={{ fontSize: 11.5, color: '#475569', lineHeight: 1.45 }}>
                Active wallet drainer, reverse proxy session interception, confirmed financial fraud.
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 6, fontSize: 11, color: '#DC2626', fontWeight: 600 }}>
                e.g. eth-drainer-claim.io
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Sandbox Weight Calculator */}
        <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, paddingBottom: 16, borderBottom: '1px solid #E2E8F0' }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sliders size={18} color="#2563EB" />
                <span>Interactive Multi-Factor Contribution Sandbox</span>
              </h3>
              <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 3 }}>
                Manipulate telemetry factor inputs to test real-time algorithmic weighting and defensive triage
              </div>
            </div>

            {/* Quick Presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: '#64748B', marginRight: 4 }}>Presets:</span>
              <button
                className={`btn btn-sm ${activePreset === 'safe' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => applyPreset('safe')}
                style={{ fontSize: 11.5, padding: '4px 10px', height: 30 }}
              >
                Safe Enterprise
              </button>
              <button
                className={`btn btn-sm ${activePreset === 'moderate' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => applyPreset('moderate')}
                style={{ fontSize: 11.5, padding: '4px 10px', height: 30 }}
              >
                Moderate Risk
              </button>
              <button
                className={`btn btn-sm ${activePreset === 'phishing' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => applyPreset('phishing')}
                style={{ fontSize: 11.5, padding: '4px 10px', height: 30 }}
              >
                Phishing Trap
              </button>
              <button
                className={`btn btn-sm ${activePreset === 'critical' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => applyPreset('critical')}
                style={{ fontSize: 11.5, padding: '4px 10px', height: 30 }}
              >
                Active Drainer
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => applyPreset('default')}
                title="Reset to default baseline"
                style={{ fontSize: 11.5, padding: '4px 8px', height: 30 }}
              >
                <RotateCcw size={13} />
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) minmax(320px, 1fr)', gap: 32, marginTop: 22 }}>
            {/* Sliders List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Factor 1: Report History */}
              <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FileText size={15} color="#2563EB" />
                    <span style={{ fontWeight: 600, fontSize: 13.5, color: '#0F172A' }}>Report History & Victim Volume</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: '#64748B' }}>Max +35</span>
                    <span style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: weights.reportHistory > 20 ? '#DC2626' : '#2563EB',
                      background: weights.reportHistory > 20 ? '#FEE2E2' : '#EFF6FF',
                      padding: '2px 8px',
                      borderRadius: 6
                    }}>
                      +{weights.reportHistory} pts
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="35"
                  value={weights.reportHistory}
                  onChange={(e) => handleSliderChange('reportHistory', e.target.value)}
                  className="dev-pg-range-input"
                  style={{ width: '100%', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                  <span>0 (No public complaints)</span>
                  <span>15 (Elevated chatter)</span>
                  <span>35 (Mass victim filings)</span>
                </div>
              </div>

              {/* Factor 2: Phishing & DOM */}
              <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ShieldAlert size={15} color="#EA580C" />
                    <span style={{ fontWeight: 600, fontSize: 13.5, color: '#0F172A' }}>Phishing & DOM Impersonation</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: '#64748B' }}>Max +30</span>
                    <span style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: weights.phishingSignals > 18 ? '#EA580C' : '#2563EB',
                      background: weights.phishingSignals > 18 ? '#FFEDD5' : '#EFF6FF',
                      padding: '2px 8px',
                      borderRadius: 6
                    }}>
                      +{weights.phishingSignals} pts
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={weights.phishingSignals}
                  onChange={(e) => handleSliderChange('phishingSignals', e.target.value)}
                  className="dev-pg-range-input"
                  style={{ width: '100%', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                  <span>0 (Authentic DOM)</span>
                  <span>15 (Keyword mimicry)</span>
                  <span>30 (Pixel-perfect clone & proxy)</span>
                </div>
              </div>

              {/* Factor 3: Network Connections */}
              <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Network size={15} color="#8B5CF6" />
                    <span style={{ fontWeight: 600, fontSize: 13.5, color: '#0F172A' }}>Scam Network Graph Links</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: '#64748B' }}>Max +20</span>
                    <span style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: weights.networkConnections > 12 ? '#8B5CF6' : '#2563EB',
                      background: weights.networkConnections > 12 ? '#F3E8FF' : '#EFF6FF',
                      padding: '2px 8px',
                      borderRadius: 6
                    }}>
                      +{weights.networkConnections} pts
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={weights.networkConnections}
                  onChange={(e) => handleSliderChange('networkConnections', e.target.value)}
                  className="dev-pg-range-input"
                  style={{ width: '100%', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                  <span>0 (Isolated IP)</span>
                  <span>10 (Co-hosted with flags)</span>
                  <span>20 (Direct cluster bridge)</span>
                </div>
              </div>

              {/* Factor 4: Domain & Infrastructure */}
              <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Globe size={15} color="#0EA5E9" />
                    <span style={{ fontWeight: 600, fontSize: 13.5, color: '#0F172A' }}>Domain / Infrastructure Age</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: '#64748B' }}>Max +15</span>
                    <span style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#2563EB',
                      background: '#EFF6FF',
                      padding: '2px 8px',
                      borderRadius: 6
                    }}>
                      +{weights.domainReputation} pts
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  value={weights.domainReputation}
                  onChange={(e) => handleSliderChange('domainReputation', e.target.value)}
                  className="dev-pg-range-input"
                  style={{ width: '100%', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                  <span>0 (&gt; 5 years registered)</span>
                  <span>7 (6–12 months old)</span>
                  <span>15 (&lt; 14 days ephemeral)</span>
                </div>
              </div>

              {/* Factor 5: Evidence Quality */}
              <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ShieldCheck size={15} color="#059669" />
                    <span style={{ fontWeight: 600, fontSize: 13.5, color: '#0F172A' }}>Cryptographic Evidence Quality</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, color: '#64748B' }}>Max +5</span>
                    <span style={{
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#059669',
                      background: '#DCFCE7',
                      padding: '2px 8px',
                      borderRadius: 6
                    }}>
                      +{weights.evidenceQuality} pts
                    </span>
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={weights.evidenceQuality}
                  onChange={(e) => handleSliderChange('evidenceQuality', e.target.value)}
                  className="dev-pg-range-input"
                  style={{ width: '100%', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                  <span>0 (Unverified hearsay)</span>
                  <span>3 (Screenshots & logs)</span>
                  <span>5 (On-chain Tx & PCAP hash)</span>
                </div>
              </div>
            </div>

            {/* Right side live result box */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              background: '#F8FAFC',
              borderRadius: 16,
              padding: 24,
              border: `1.5px solid ${currentClass.border}`,
              boxShadow: '0 4px 14px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748B' }}>
                  Live Algorithmic Output
                </span>
                <span style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: currentClass.color,
                  background: currentClass.bg,
                  padding: '3px 8px',
                  borderRadius: 6,
                  border: `1px solid ${currentClass.border}`
                }}>
                  {currentClass.tier}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                <RiskGauge score={totalScore} size="lg" />
              </div>

              {/* Dynamic Action Callout */}
              <div style={{
                marginTop: 12,
                padding: '12px 14px',
                borderRadius: 10,
                background: currentClass.bg,
                border: `1px solid ${currentClass.border}`,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 10
              }}>
                <Activity size={18} color={currentClass.color} style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: currentClass.color }}>
                    Mandated Defensive Action:
                  </div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: '#0F172A', marginTop: 2 }}>
                    {currentClass.action}
                  </div>
                </div>
              </div>

              {/* Factor Contribution Breakdown */}
              <div style={{ marginTop: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
                  <span>Weight Composition Breakdown</span>
                  <span className="mono" style={{ color: '#0F172A', fontWeight: 700 }}>{totalScore} / 100</span>
                </div>

                {/* Stacked bar */}
                <div style={{ height: 8, width: '100%', borderRadius: 999, background: '#E2E8F0', display: 'flex', overflow: 'hidden', marginBottom: 14 }}>
                  <div style={{ width: `${(weights.reportHistory / 100) * 100}%`, background: '#2563EB' }} title="Report History" />
                  <div style={{ width: `${(weights.phishingSignals / 100) * 100}%`, background: '#EA580C' }} title="Phishing Signals" />
                  <div style={{ width: `${(weights.networkConnections / 100) * 100}%`, background: '#8B5CF6' }} title="Network Links" />
                  <div style={{ width: `${(weights.domainReputation / 100) * 100}%`, background: '#0EA5E9' }} title="Domain Age" />
                  <div style={{ width: `${(weights.evidenceQuality / 100) * 100}%`, background: '#059669' }} title="Evidence Quality" />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: 11.5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: '#2563EB' }} />
                    <span style={{ color: '#64748B' }}>Reports:</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>{weights.reportHistory}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: '#EA580C' }} />
                    <span style={{ color: '#64748B' }}>Phishing:</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>{weights.phishingSignals}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: '#8B5CF6' }} />
                    <span style={{ color: '#64748B' }}>Network:</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>{weights.networkConnections}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: '#0EA5E9' }} />
                    <span style={{ color: '#64748B' }}>Domain:</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>{weights.domainReputation}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, gridColumn: 'span 2' }}>
                    <span style={{ width: 8, height: 8, borderRadius: 2, background: '#059669' }} />
                    <span style={{ color: '#64748B' }}>Evidence Quality Index:</span>
                    <span style={{ fontWeight: 600, color: '#0F172A' }}>+{weights.evidenceQuality}</span>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #E2E8F0', fontSize: 11.5, color: '#94A3B8', textAlign: 'center' }}>
                Deterministic formula: R = min(100, Σ(W_i · S_i))
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Deep-Dive Methodology Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0F172A', marginTop: 8 }}>
            Methodological Safeguards & Algorithmic Specifications
          </h3>

          {/* FAQ 1: Scoring Model */}
          <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div
              onClick={() => toggleFAQ('scoringModel')}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                cursor: 'pointer',
                background: expandedFAQ.scoringModel ? '#F8FAFC' : '#FFFFFF',
                borderBottom: expandedFAQ.scoringModel ? '1px solid #E2E8F0' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Shield size={18} color="#2563EB" />
                <span style={{ fontSize: 14.5, fontWeight: 600, color: '#0F172A' }}>
                  How the Multi-Factor Cumulative Algorithm Works
                </span>
              </div>
              {expandedFAQ.scoringModel ? <ChevronUp size={17} color="#64748B" /> : <ChevronDown size={17} color="#64748B" />}
            </div>

            {expandedFAQ.scoringModel && (
              <div style={{ padding: '18px 20px', fontSize: 13.5, color: '#475569', lineHeight: 1.65, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p>
                  Unlike legacy threat intelligence feeds that supply only a binary "clean or blacklisted" flag, TOPDOO computes an explainable, multi-dimensional cumulative vector score. Each signal is isolated with a bounded ceiling to prevent individual outlier distortion.
                </p>
                <p>
                  For example, a domain created within the last 72 hours starts with an elevated infrastructure uncertainty rating (+15 pts). If heuristic scanning detects logo duplication of Chase or Binance and an active wallet-approval drainer script (+30 pts), the score rapidly escalates past 60. When community submissions corroborate intercepted credentials, the score caps into Tier 5 (Critical Fraud), mandating automated edge-level quarantine.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 2: False Positive Mitigation */}
          <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div
              onClick={() => toggleFAQ('falsePositiveMitigation')}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                cursor: 'pointer',
                background: expandedFAQ.falsePositiveMitigation ? '#F8FAFC' : '#FFFFFF',
                borderBottom: expandedFAQ.falsePositiveMitigation ? '1px solid #E2E8F0' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle size={18} color="#059669" />
                <span style={{ fontSize: 14.5, fontWeight: 600, color: '#0F172A' }}>
                  False Positive Mitigation & Cryptographic Anchoring
                </span>
              </div>
              {expandedFAQ.falsePositiveMitigation ? <ChevronUp size={17} color="#64748B" /> : <ChevronDown size={17} color="#64748B" />}
            </div>

            {expandedFAQ.falsePositiveMitigation && (
              <div style={{ padding: '18px 20px', fontSize: 13.5, color: '#475569', lineHeight: 1.65, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p>
                  False positives destroy operational trust. To protect legitimate businesses, TOPDOO utilizes strict cryptographic anchoring for verified organizations. Verified enterprise entities (e.g. <code>google.com</code>, <code>chase.com</code>, <code>fpt.vn</code>) possess immutable EV TLS signatures, authoritative DNSSEC records, and 5+ years of verified domain longevity.
                </p>
                <p>
                  These anchored entities possess an algorithmic hard ceiling of 10 points, guaranteeing that malicious spam reports or coordinated brigading attacks can never falsely flag an authentic enterprise as phishing or fraudulent.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 3: Sybil Defense */}
          <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div
              onClick={() => toggleFAQ('sybilDefense')}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                cursor: 'pointer',
                background: expandedFAQ.sybilDefense ? '#F8FAFC' : '#FFFFFF',
                borderBottom: expandedFAQ.sybilDefense ? '1px solid #E2E8F0' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Lock size={18} color="#D97706" />
                <span style={{ fontSize: 14.5, fontWeight: 600, color: '#0F172A' }}>
                  Anti-Brigading & Sybil Attack Defenses
                </span>
              </div>
              {expandedFAQ.sybilDefense ? <ChevronUp size={17} color="#64748B" /> : <ChevronDown size={17} color="#64748B" />}
            </div>

            {expandedFAQ.sybilDefense && (
              <div style={{ padding: '18px 20px', fontSize: 13.5, color: '#475569', lineHeight: 1.65, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p>
                  Community reports are never counted linearly (1 report ≠ 1 score point). Instead, incoming submissions are processed through a logarithmic decay formula weighted by the reporter's verifiable reputation index, device fingerprinting, and cryptographic proof attachments (e.g., blockchain transaction hashes, PCAP capture logs, signed receipts).
                </p>
                <p>
                  Unauthenticated or bot-originated report storms are automatically quarantined in a triage buffer until human threat intelligence analysts review and corroborate the claimed incident.
                </p>
              </div>
            )}
          </div>

          {/* FAQ 4: Continuous Re-evaluation */}
          <div style={{ background: '#FFFFFF', borderRadius: 12, border: '1px solid #E2E8F0', overflow: 'hidden' }}>
            <div
              onClick={() => toggleFAQ('reEvaluation')}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                cursor: 'pointer',
                background: expandedFAQ.reEvaluation ? '#F8FAFC' : '#FFFFFF',
                borderBottom: expandedFAQ.reEvaluation ? '1px solid #E2E8F0' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Activity size={18} color="#8B5CF6" />
                <span style={{ fontSize: 14.5, fontWeight: 600, color: '#0F172A' }}>
                  Continuous Telemetry Re-evaluation & Invalidation Triggers
                </span>
              </div>
              {expandedFAQ.reEvaluation ? <ChevronUp size={17} color="#64748B" /> : <ChevronDown size={17} color="#64748B" />}
            </div>

            {expandedFAQ.reEvaluation && (
              <div style={{ padding: '18px 20px', fontSize: 13.5, color: '#475569', lineHeight: 1.65, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <p>
                  Risk scores are not static stamps. Cached scores feature an automatic 4-hour TTL (Time-To-Live). In addition, immediate score recalculation is triggered dynamically whenever any of the following events occur:
                </p>
                <ul style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <li>Authoritative Name Server (NS) or IP A-record relocation</li>
                  <li>SSL/TLS Certificate expiration, revocation, or Let's Encrypt rotation</li>
                  <li>Newly corroborated blockchain fund transfer into flagged cluster addresses</li>
                  <li>Verified takedown confirmation by hosting providers or domain registrars</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
