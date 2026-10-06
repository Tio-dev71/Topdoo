import React, { useState } from 'react';
import {
  Terminal,
  Key,
  Webhook,
  Layers,
  Copy,
  Plus,
  Trash2,
  ExternalLink,
  Code2,
  Check,
  Shield,
  Zap,
  Globe,
  MessageSquare,
  CheckCircle,
  FileCode,
  Radio
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { PageTransition } from '../../components/common/PageTransition';

export function ApiIntegrationsView() {
  const { apiKeys, createApiKey, revokeApiKey, showToast } = useSecurity();

  const [activeTab, setActiveTab] = useState('keys'); // keys, integrations, webhooks, docs
  const [newKeyName, setNewKeyName] = useState('');
  const [selectedSnippetLang, setSelectedSnippetLang] = useState('curl');
  const [copiedKeyId, setCopiedKeyId] = useState(null);

  const handleCreateKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) return;
    createApiKey(newKeyName);
    showToast('API Key Generated', `Created new API credential "${newKeyName}".`, 'success');
    setNewKeyName('');
  };

  const handleCopyKey = (keyVal, id) => {
    navigator.clipboard.writeText(keyVal);
    setCopiedKeyId(id);
    showToast('Copied API Key', 'API secret copied to clipboard.', 'success');
    setTimeout(() => setCopiedKeyId(null), 2000);
  };

  const integrationsList = [
    {
      id: 'browser-ext',
      title: 'TOPDOO Browser Guard Extension',
      category: 'Browser Protection',
      desc: 'Real-time proactive phishing blocking and suspicious link interceptor for Chrome, Brave, and Edge.',
      status: 'Connected • v2.4.1',
      icon: Globe,
      active: true
    },
    {
      id: 'shopify',
      title: 'Shopify Merchant Scam Sentry',
      category: 'E-commerce Fraud Protection',
      desc: 'Automatically screens high-risk buyer domains, proxy orders, and disputed payment wallets on checkout.',
      status: 'Ready to Install',
      icon: Shield,
      active: false
    },
    {
      id: 'slack',
      title: 'Slack SecOps Incident Bot',
      category: 'ChatOps & Notifications',
      desc: 'Streams critical threat alerts and domain mutations directly into your internal #secops channel.',
      status: 'Configured',
      icon: MessageSquare,
      active: true
    },
    {
      id: 'discord',
      title: 'Discord Anti-Phishing Webhook',
      category: 'Community Defense',
      desc: 'Auto-deletes malicious Web3 drainer and token claim links posted in community Discord servers.',
      status: 'Connected',
      icon: MessageSquare,
      active: true
    },
    {
      id: 'telegram',
      title: 'Telegram Fraud Intel Sentinel',
      category: 'Threat Radar',
      desc: 'Monitors suspicious impersonation support handles and incoming fraud reports via Telegram bot.',
      status: 'Configured',
      icon: Zap,
      active: true
    },
    {
      id: 'webhooks',
      title: 'Custom Ingestion & Alert Webhooks',
      category: 'Developer Gateway',
      desc: 'POST and receive real-time JSON event payloads on risk score threshold elevations.',
      status: '2 Active Endpoints',
      icon: Webhook,
      active: true
    }
  ];

  const codeSnippets = {
    curl: `curl -X POST https://api.topdoo.com/v1/quickcheck \\
  -H "Authorization: Bearer topdoo_live_992a81b37c0944e2b9201a4" \\
  -H "Content-Type: application/json" \\
  -d '{"target": "metamask-claim-airdrop.xyz", "deep_dns": true}'`,

    node: `import { TopdooSecurity } from '@topdoo/sdk';

const topdoo = new TopdooSecurity({
  apiKey: process.env.TOPDOO_API_KEY
});

const assessment = await topdoo.quickCheck({
  target: '0x71C8564E3b82928374dC8187e59b20755AA9B829'
});

console.log(assessment.riskScore, assessment.riskCategory);
// Output: 98, 'CRITICAL'`,

    python: `from topdoo import TopdooClient

client = TopdooClient(api_key="topdoo_live_992a81b37c0944e2b9201a4")

# Inspect suspicious domain in real-time
result = client.inspect_domain("chase-security-verify.net")
if result.is_phishing:
    print(f"Alert: {result.target_brand} impersonation detected!")
    print(f"Risk Score: {result.risk_score}/100")`
  };

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1100, margin: '0 auto', paddingBottom: 40 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 999, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8' }}>Developer Platform & Connectors</span>
            </div>
            <h1 className="heading-xl">API Keys & Platform Integrations</h1>
            <p className="subheading" style={{ marginTop: 4, maxWidth: 840 }}>
              Build automated threat detection and incident triage pipelines using the high-throughput TOPDOO Security Intelligence Engine.
            </p>
          </div>
        </div>

        {/* Tab Pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'keys', label: 'API Keys & Secrets', count: apiKeys.length },
            { id: 'integrations', label: 'Pre-Built Connectors', count: integrationsList.length },
            { id: 'webhooks', label: 'Real-Time Webhooks', count: '2 Active' },
            { id: 'docs', label: 'Developer SDK Code' }
          ].map(t => {
            const isActive = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
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
                <span>{t.label}</span>
                {t.count && (
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: 10,
                    background: isActive ? '#2563EB' : '#F1F5F9',
                    color: isActive ? '#FFFFFF' : '#64748B'
                  }}>
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: API KEYS */}
        {activeTab === 'keys' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Generate Key Bar */}
            <form onSubmit={handleCreateKey} style={{
              background: '#FFFFFF',
              padding: '14px 18px',
              borderRadius: 14,
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              flexWrap: 'wrap'
            }}>
              <input
                type="text"
                placeholder="Enter API key name (e.g. Production Ingestion Gateway, Staging Scanner)..."
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                style={{
                  flex: 1,
                  minWidth: 260,
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  borderRadius: 8,
                  padding: '8px 14px',
                  fontSize: 13,
                  color: '#0F172A',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={!newKeyName.trim()}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
              >
                <Plus size={14} />
                <span>Generate New API Key</span>
              </button>
            </form>

            {/* Keys Table */}
            <div style={{ background: '#FFFFFF', borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B', fontSize: 11.5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 600 }}>Key Label</th>
                      <th style={{ padding: '14px 18px', fontWeight: 600 }}>API Secret Token</th>
                      <th style={{ padding: '14px 18px', fontWeight: 600 }}>Created Date</th>
                      <th style={{ padding: '14px 18px', fontWeight: 600 }}>Permissions</th>
                      <th style={{ padding: '14px 18px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map(k => (
                      <tr key={k.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ fontWeight: 700, color: '#0F172A' }}>{k.name}</div>
                          <div style={{ fontSize: 11.5, color: '#64748B' }}>Rate Limit: 2,500 req/min</div>
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#F8FAFC', padding: '4px 10px', borderRadius: 6, border: '1px solid #E2E8F0' }}>
                            <span className="mono" style={{ fontSize: 12, color: '#334155' }}>{k.key}</span>
                            <button
                              type="button"
                              onClick={() => handleCopyKey(k.key, k.id)}
                              style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', padding: 2 }}
                              title="Copy API Token"
                            >
                              {copiedKeyId === k.id ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                            </button>
                          </div>
                        </td>
                        <td style={{ padding: '14px 18px', color: '#64748B' }}>
                          {k.created || k.createdAt || '2026-09-01'}
                        </td>
                        <td style={{ padding: '14px 18px' }}>
                          <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 4, background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0' }}>
                            Full Threat Intelligence
                          </span>
                        </td>
                        <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => {
                              revokeApiKey(k.id);
                              showToast('Key Revoked', `API key ${k.name} has been revoked.`, 'warning');
                            }}
                            style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', padding: 4 }}
                            title="Revoke Key"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CONNECTORS */}
        {activeTab === 'integrations' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
            {integrationsList.map(item => {
              const IconComp = item.icon;
              return (
                <div
                  key={item.id}
                  style={{
                    background: '#FFFFFF',
                    padding: 22,
                    borderRadius: 16,
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 12
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <IconComp size={20} color="#2563EB" />
                    </div>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: item.active ? '#ECFDF5' : '#F1F5F9',
                      color: item.active ? '#047857' : '#64748B',
                      border: `1px solid ${item.active ? '#A7F3D0' : '#E2E8F0'}`
                    }}>
                      {item.status}
                    </span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginBottom: 4 }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                      {item.category}
                    </div>
                    <p style={{ fontSize: 12.5, color: '#64748B', lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>

                  <div style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid #F1F5F9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => showToast('Configuring Connector', `Opening configuration panel for ${item.title}.`, 'info')}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    >
                      <span>Manage Settings</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 3: WEBHOOKS */}
        {activeTab === 'webhooks' && (
          <div style={{ background: '#FFFFFF', padding: 28, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>Active Threat Telemetry Webhooks</h2>
              <p style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
                Deliver automated JSON notifications whenever a watched entity's risk score elevates or a new phishing domain is corroborated.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: 16, background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0' }}>POST</span>
                    <span className="mono" style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>https://secops.company.internal/webhooks/topdoo-alerts</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                    Events: <code>entity.risk_elevated</code>, <code>report.verified</code>
                  </div>
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => showToast('Webhook Test', 'Dispatched simulated test payload to endpoint (200 OK).', 'success')}
                >
                  Send Test Ping
                </button>
              </div>

              <div style={{ padding: 16, background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 4, background: '#ECFDF5', color: '#047857', border: '1px solid #A7F3D0' }}>POST</span>
                    <span className="mono" style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>https://gateway.discord.com/api/webhooks/secops-syndication</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
                    Events: <code>malicious_drainer.quarantine</code>
                  </div>
                </div>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => showToast('Webhook Test', 'Dispatched simulated test payload to Discord gateway (204 No Content).', 'success')}
                >
                  Send Test Ping
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CODE SDK EXAMPLES */}
        {activeTab === 'docs' && (
          <div style={{ background: '#FFFFFF', padding: 28, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>TOPDOO SDK Code Samples</h2>
              <p style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
                Integrate live threat scoring into custom web apps, smart contract transactions, or firewall proxies.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              {['curl', 'node', 'python'].map(lang => (
                <button
                  key={lang}
                  onClick={() => setSelectedSnippetLang(lang)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 8,
                    fontSize: 12.5,
                    fontWeight: selectedSnippetLang === lang ? 700 : 500,
                    border: `1px solid ${selectedSnippetLang === lang ? '#2563EB' : '#E2E8F0'}`,
                    background: selectedSnippetLang === lang ? '#EFF6FF' : '#FFFFFF',
                    color: selectedSnippetLang === lang ? '#1D4ED8' : '#475569',
                    cursor: 'pointer'
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            <div style={{
              background: '#0F172A',
              borderRadius: 12,
              padding: 20,
              overflowX: 'auto',
              border: '1px solid #1E293B',
              position: 'relative'
            }}>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(codeSnippets[selectedSnippetLang]);
                  showToast('Code Copied', 'Copied snippet to clipboard.', 'success');
                }}
                style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 6,
                  color: '#FFFFFF',
                  padding: '4px 8px',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <Copy size={12} />
                <span>Copy</span>
              </button>

              <pre style={{
                margin: 0,
                color: '#38BDF8',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                fontSize: 13,
                lineHeight: 1.6
              }}>
                {codeSnippets[selectedSnippetLang]}
              </pre>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
