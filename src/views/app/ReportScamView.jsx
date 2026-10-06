import React, { useState } from 'react';
import {
  FileText,
  Upload,
  CheckCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Shield,
  HelpCircle,
  Link,
  DollarSign,
  FileCheck,
  Globe,
  Wallet,
  Phone,
  Mail,
  Share2,
  Building,
  Server,
  Trash2,
  Copy,
  ExternalLink
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { PageTransition } from '../../components/common/PageTransition';

export function ReportScamView() {
  const { submitNewReport, setCurrentView, setSelectedReportId, showToast } = useSecurity();

  const [currentStep, setCurrentStep] = useState(1);
  const [submittedReportId, setSubmittedReportId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    type: 'url',
    identifier: '',
    targetBrand: '',
    category: 'Phishing',
    lossAmount: '',
    title: '',
    description: '',
    email: '',
    evidenceFiles: [
      { name: 'evidence_screenshot_01.png', size: '1.2 MB' }
    ]
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleFinishSubmit = (e) => {
    e.preventDefault();
    const repId = submitNewReport(formData);
    setSubmittedReportId(repId);
    setCurrentStep(6);
    showToast('Report Lodged', `Incident ${repId} registered in global threat telemetry queue.`, 'success');
  };

  const entityTypes = [
    { id: 'url', label: 'Website URL', desc: 'Full link (https://...)', icon: Globe },
    { id: 'domain', label: 'Domain Name', desc: 'Hostname or subdomain', icon: Server },
    { id: 'wallet', label: 'Crypto Wallet', desc: 'ETH, BTC, Solana address', icon: Wallet },
    { id: 'phone', label: 'Phone / SMS', desc: 'VOIP or mobile number', icon: Phone },
    { id: 'email', label: 'Email Address', desc: 'Sender or contact address', icon: Mail },
    { id: 'social', label: 'Social Profile', desc: 'Telegram, Instagram, X', icon: Share2 },
    { id: 'company', label: 'Fake Company', desc: 'Shell corp or entity', icon: Building },
    { id: 'other', label: 'Other Vector', desc: 'IP, APK, or malware file', icon: Shield }
  ];

  const scamCategories = [
    { id: 'Phishing', label: 'Phishing & Credential Theft', desc: 'Fake login portals, reverse proxies, and password harvesters.' },
    { id: 'Crypto Phishing', label: 'Crypto Drainer / Permit2 Exploit', desc: 'Malicious token approvals, automated wallet sweeping scripts.' },
    { id: 'Investment Scam', label: 'Investment / Ponzi Scheme', desc: 'High-yield trading bots, fake forex platforms, liquidity traps.' },
    { id: 'Impersonation', label: 'Brand & Support Impersonation', desc: 'Customer service spoofing, CEO fraud, fake security alerts.' },
    { id: 'E-commerce Fraud', label: 'Fake Storefront & Checkout', desc: 'Counterfeit sales, non-delivery of items, payment gateways.' },
    { id: 'Vishing / Smishing', label: 'SMS & Telephone Fraud', desc: 'Urgent banking alerts, parcel delivery lures, OTP interceptors.' },
    { id: 'Romance Scam', label: 'Romance / Pig Butchering', desc: 'Social engineering grooming leading to fraudulent deposits.' },
    { id: 'Other', label: 'Other Deceptive Schemes', desc: 'Extortion, malware distribution, or unclassified fraud.' }
  ];

  const popularBrands = ['MetaMask', 'Chase', 'Coinbase', 'PayPal', 'Binance', 'Telegram', 'Apple', 'Amazon'];

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast('Copied to Clipboard', text, 'success');
  };

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 880, margin: '0 auto', paddingBottom: 40 }}>
        {/* Header */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 999, marginBottom: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8' }}>Decentralized Threat Intelligence Intake</span>
          </div>
          <h1 className="heading-xl">Report a Fraudulent or Malicious Entity</h1>
          <p className="subheading" style={{ marginTop: 4, maxWidth: 720 }}>
            Submit suspicious URLs, wallets, phone numbers, or domain infrastructure to protect millions of Web3 and financial users.
          </p>

          {/* Modern Stepper */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
            padding: '14px 20px',
            background: '#FFFFFF',
            borderRadius: 14,
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
            overflowX: 'auto'
          }}>
            {[
              { step: 1, label: 'Entity Target' },
              { step: 2, label: 'Classification' },
              { step: 3, label: 'Incident Details' },
              { step: 4, label: 'Forensic Evidence' },
              { step: 5, label: 'Review & Lodging' },
              { step: 6, label: 'Confirmed' }
            ].map(s => {
              const isPast = currentStep > s.step;
              const isCurrent = currentStep === s.step;
              return (
                <div
                  key={s.step}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    color: isCurrent ? '#2563EB' : (isPast ? '#059669' : '#94A3B8'),
                    flexShrink: 0
                  }}
                >
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      background: isPast ? '#059669' : (isCurrent ? '#2563EB' : '#F1F5F9'),
                      color: isPast || isCurrent ? '#FFFFFF' : '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 700,
                      boxShadow: isCurrent ? '0 0 0 3px rgba(37,99,235,0.15)' : 'none'
                    }}
                  >
                    {isPast ? '✓' : s.step}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: isCurrent ? 700 : 500, color: isCurrent ? '#0F172A' : (isPast ? '#334155' : '#94A3B8') }}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* STEP 1: ENTITY TYPE & IDENTIFIER */}
        {currentStep === 1 && (
          <div style={{ background: '#FFFFFF', padding: 28, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
              Step 1: Select Entity Type & Target
            </h2>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
              What specific cyber threat vector or identifier are you submitting for investigation?
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 12, marginBottom: 24 }}>
              {entityTypes.map(t => {
                const IconComponent = t.icon;
                const isSelected = formData.type === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: t.id })}
                    style={{
                      padding: 14,
                      borderRadius: 12,
                      border: `1.5px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
                      background: isSelected ? '#EFF6FF' : '#FFFFFF',
                      textAlign: 'left',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      cursor: 'pointer',
                      boxShadow: isSelected ? '0 2px 8px rgba(37,99,235,0.08)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <IconComponent size={18} color={isSelected ? '#2563EB' : '#64748B'} />
                      {isSelected && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563EB' }} />}
                    </div>
                    <div style={{ fontWeight: 700, fontSize: 13, color: isSelected ? '#1D4ED8' : '#0F172A' }}>{t.label}</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>{t.desc}</div>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
                  Entity Value / Identifier <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder={
                    formData.type === 'wallet' ? '0x... or Solana wallet address' :
                    (formData.type === 'url' ? 'https://malicious-gateway-airdrop.xyz' :
                    (formData.type === 'phone' ? '+1 (800) 492-0199' : 'Enter target identifier...'))
                  }
                  value={formData.identifier}
                  onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: 10,
                    padding: '12px 16px',
                    color: '#0F172A',
                    fontSize: 14,
                    outline: 'none',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                  }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                    Target Brand Being Impersonated (Optional)
                  </label>
                  <span style={{ fontSize: 11.5, color: '#64748B' }}>Click to select common brands:</span>
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                  {popularBrands.map(b => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, targetBrand: b })}
                      style={{
                        padding: '4px 10px',
                        borderRadius: 6,
                        border: '1px solid #E2E8F0',
                        background: formData.targetBrand === b ? '#EFF6FF' : '#F8FAFC',
                        color: formData.targetBrand === b ? '#1D4ED8' : '#475569',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {b}
                    </button>
                  ))}
                </div>

                <input
                  type="text"
                  placeholder="e.g. MetaMask, Chase, PayPal, Coinbase, Amazon"
                  value={formData.targetBrand}
                  onChange={(e) => setFormData({ ...formData, targetBrand: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: 10,
                    padding: '12px 16px',
                    color: '#0F172A',
                    fontSize: 14,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 28, paddingTop: 20, borderTop: '1px solid #E2E8F0' }}>
              <button
                className="btn btn-primary"
                disabled={!formData.identifier.trim()}
                onClick={nextStep}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <span>Next: Incident Classification</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: INCIDENT CATEGORY */}
        {currentStep === 2 && (
          <div style={{ background: '#FFFFFF', padding: 28, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
              Step 2: Incident Classification
            </h2>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
              Choose the primary fraudulent scheme, methodology, or exploit observed.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 24 }}>
              {scamCategories.map(c => {
                const isSelected = formData.category === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: c.id })}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      border: `1.5px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
                      background: isSelected ? '#EFF6FF' : '#FFFFFF',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      boxShadow: isSelected ? '0 2px 8px rgba(37,99,235,0.08)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: isSelected ? '#1D4ED8' : '#0F172A' }}>{c.label}</div>
                      {isSelected && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563EB' }} />}
                    </div>
                    <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4 }}>{c.desc}</div>
                  </button>
                );
              })}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid #E2E8F0' }}>
              <button className="btn btn-secondary" onClick={prevStep} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
              <button className="btn btn-primary" onClick={nextStep} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span>Next: Description & Narrative</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DESCRIPTION & LOSS NARRATIVE */}
        {currentStep === 3 && (
          <div style={{ background: '#FFFFFF', padding: 28, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
              Step 3: Description & Incident Narrative
            </h2>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
              Detail what happened, how the target was encountered, and any damages or loss incurred.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
                  Incident Summary Title <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Counterfeit MetaMask claim portal drained 2.4 ETH via permit2 allowance exploit"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: 10,
                    padding: '12px 16px',
                    color: '#0F172A',
                    fontSize: 14,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
                  Financial Loss Reported (if any)
                </label>
                <input
                  type="text"
                  placeholder="e.g. $4,800 USD or 1.5 ETH (or 'None / Prevented')"
                  value={formData.lossAmount}
                  onChange={(e) => setFormData({ ...formData, lossAmount: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: 10,
                    padding: '12px 16px',
                    color: '#0F172A',
                    fontSize: 14,
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
                  Detailed Description & Timeline <span style={{ color: '#DC2626' }}>*</span>
                </label>
                <textarea
                  rows={6}
                  placeholder="Explain the sequence of events: initial contact vector, messages received, phishing links clicked, transaction hashes, smart contracts interacted with, or extortion tactics used..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: 10,
                    padding: '12px 16px',
                    color: '#0F172A',
                    fontSize: 14,
                    lineHeight: 1.6,
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, paddingTop: 20, borderTop: '1px solid #E2E8F0' }}>
              <button className="btn btn-secondary" onClick={prevStep} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
              <button
                className="btn btn-primary"
                disabled={!formData.title.trim() || !formData.description.trim()}
                onClick={nextStep}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
              >
                <span>Next: Supporting Evidence</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: FORENSIC EVIDENCE */}
        {currentStep === 4 && (
          <div style={{ background: '#FFFFFF', padding: 28, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
              Step 4: Supporting Forensic Evidence
            </h2>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
              Attach screenshots, transaction proofs, raw email headers, or chat exports to accelerate verification.
            </p>

            <div
              style={{
                border: '2px dashed #93C5FD',
                borderRadius: 14,
                padding: '36px 20px',
                textAlign: 'center',
                background: '#F8FAFC',
                marginBottom: 20
              }}
            >
              <Upload size={36} color="#2563EB" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>
                Drag & drop screenshots, HAR archives, or TXT exports here
              </div>
              <div style={{ fontSize: 12.5, color: '#64748B', marginTop: 4 }}>
                Supported formats: PNG, JPG, PDF, TXT, HAR, JSON (up to 25MB per file)
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                style={{ marginTop: 16, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                onClick={() => {
                  setFormData(prev => ({
                    ...prev,
                    evidenceFiles: [...prev.evidenceFiles, { name: `telemetry_dump_${Date.now()}.json`, size: '340 KB' }]
                  }));
                  showToast('Evidence Added', 'Simulated file attachment added to case bundle.', 'info');
                }}
              >
                <PlusCircle size={14} />
                <span>Simulate File Attach</span>
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
                Attached Forensic Items ({formData.evidenceFiles.length}):
              </div>
              {formData.evidenceFiles.map((file, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: '#F8FAFC',
                    borderRadius: 10,
                    border: '1px solid #E2E8F0',
                    fontSize: 13
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FileCheck size={16} color="#059669" />
                    <span className="mono" style={{ fontWeight: 600, color: '#0F172A' }}>{file.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ fontSize: 12, color: '#64748B' }}>{file.size}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          evidenceFiles: prev.evidenceFiles.filter((_, i) => i !== idx)
                        }));
                      }}
                      style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 2 }}
                      title="Remove file"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid #E2E8F0' }}>
              <button className="btn btn-secondary" onClick={prevStep} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
              <button className="btn btn-primary" onClick={nextStep} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span>Next: Review & Confirm</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: REVIEW */}
        {currentStep === 5 && (
          <div style={{ background: '#FFFFFF', padding: 28, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>
              Step 5: Review Submission
            </h2>
            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 20 }}>
              Verify the details below before lodging this threat report into the TOPDOO verification queue.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, background: '#F8FAFC', padding: 20, borderRadius: 12, border: '1px solid #E2E8F0', marginBottom: 24 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Target Entity ({formData.type})</span>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', marginTop: 2 }}>{formData.identifier}</div>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Classification</span>
                <div style={{ fontSize: 13.5, color: '#0F172A', marginTop: 2 }}>
                  <strong>{formData.category}</strong> {formData.targetBrand && `• Mimicking ${formData.targetBrand}`}
                </div>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Incident Title</span>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginTop: 2 }}>{formData.title}</div>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Narrative Description</span>
                <div style={{ fontSize: 13, color: '#334155', marginTop: 2, lineHeight: 1.6 }}>{formData.description}</div>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Financial Loss Reported</span>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: formData.lossAmount ? '#DC2626' : '#059669', marginTop: 2 }}>
                  {formData.lossAmount || 'None declared / Prevented'}
                </div>
              </div>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Evidence Attachments</span>
                <div style={{ fontSize: 13, color: '#0F172A', marginTop: 2 }}>{formData.evidenceFiles.length} file(s) attached</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 20, borderTop: '1px solid #E2E8F0' }}>
              <button className="btn btn-secondary" onClick={prevStep} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <ArrowLeft size={14} />
                <span>Back</span>
              </button>
              <button className="btn btn-primary btn-lg" onClick={handleFinishSubmit} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <span>Submit Report to Intelligence Engine</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 6: SUBMISSION COMPLETE */}
        {currentStep === 6 && (
          <div style={{ background: '#FFFFFF', padding: 48, borderRadius: 16, border: '1px solid #E2E8F0', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.03)' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#ECFDF5', border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={32} color="#059669" />
            </div>

            <h2 className="heading-xl" style={{ fontSize: 24, marginBottom: 8, color: '#0F172A' }}>
              Report Successfully Lodged
            </h2>
            <p style={{ fontSize: 14, color: '#64748B', maxWidth: 540, margin: '0 auto 24px', lineHeight: 1.6 }}>
              Your threat intelligence submission has been cataloged and routed to the automated sandbox crawler and analyst verification queue.
            </p>

            <div style={{
              display: 'inline-flex',
              flexDirection: 'column',
              gap: 8,
              background: '#F8FAFC',
              padding: '16px 32px',
              borderRadius: 14,
              border: '1px solid #E2E8F0',
              marginBottom: 32
            }}>
              <span style={{ fontSize: 11, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Tracking Identifier</span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <span className="mono" style={{ fontSize: 22, fontWeight: 800, color: '#2563EB' }}>
                  {submittedReportId || 'REP-2026-9012'}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(submittedReportId || 'REP-2026-9012')}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748B' }}
                  title="Copy Tracking ID"
                >
                  <Copy size={16} />
                </button>
              </div>
              <span style={{ fontSize: 12, color: '#D97706', fontWeight: 700 }}>Status: Under Review (Priority Triage)</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setCurrentStep(1);
                  setFormData({
                    type: 'url',
                    identifier: '',
                    targetBrand: '',
                    category: 'Phishing',
                    lossAmount: '',
                    title: '',
                    description: '',
                    email: '',
                    evidenceFiles: []
                  });
                }}
              >
                Report Another Suspicious Entity
              </button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (submittedReportId) setSelectedReportId(submittedReportId);
                  setCurrentView('reports');
                }}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <span>Track in Reports Center</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
