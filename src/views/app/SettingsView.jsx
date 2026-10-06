import React, { useState } from 'react';
import {
  Settings,
  Shield,
  Bell,
  Users,
  Lock,
  Save,
  CheckCircle,
  Database,
  Server,
  KeyRound,
  Sliders,
  Check,
  FolderPlus,
  Briefcase,
  UserCheck,
  Plus,
  Activity,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { PageTransition } from '../../components/common/PageTransition';

export function SettingsView() {
  const {
    showToast,
    userRole,
    setUserRole,
    ROLES,
    getRoleMeta,
    workspaces,
    currentWorkspace,
    switchWorkspace,
    addProjectToCurrentWorkspace,
    appeals,
    sloMetrics,
    handleAppealDecision,
    creditBalance,
    addCredits,
    nineRouterConfig,
    nineRouterHealth,
    refresh9RouterHealth,
    update9RouterSettings,
    voiceboxConfig,
    voiceboxHealth,
    refreshVoiceboxHealth,
    updateVoiceboxSettings
  } = useSecurity();

  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [isAddingProject, setIsAddingProject] = useState(false);

  // 9Router Gateway State
  const [nineUrl, setNineUrl] = useState(nineRouterConfig?.baseUrl || 'http://localhost:20128/v1');
  const [nineKey, setNineKey] = useState(nineRouterConfig?.apiKey || 'sk-tiodev-chatbot-secret');
  const [isPinging, setIsPinging] = useState(false);

  // Voicebox Gateway State
  const [voiceUrl, setVoiceUrl] = useState(voiceboxConfig?.baseUrl || 'http://localhost:17493');
  const [isPingingVoice, setIsPingingVoice] = useState(false);

  const [settings, setSettings] = useState({
    orgName: 'Topdoo Security SecOps Lab',
    primaryCluster: 'US-East (Virginia)',
    criticalAlertEmail: 'secops-triage@topdoo.com',
    autoQuarantineThreshold: 85,
    enablePermit2Scanning: true,
    enableDarkPoolMonitoring: true,
    require2FA: true,
    retentionDays: 90
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Preferences Saved', 'Workspace threat intelligence policies updated successfully.', 'success');
  };

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 920, margin: '0 auto', paddingBottom: 40 }}>
        {/* Header */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 999, marginBottom: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8' }}>SecOps Administration & Policy Controls</span>
          </div>
          <h1 className="heading-xl">Workspace Settings & Security Controls</h1>
          <p className="subheading" style={{ marginTop: 4, maxWidth: 760 }}>
            Configure autonomous quarantine sensitivity thresholds, smart contract scanners, telemetry retention policies, and enterprise node clusters.
          </p>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Organization & Cluster */}
          <div style={{ background: '#FFFFFF', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={18} color="#2563EB" />
              <span>Organization & Infrastructure Node Cluster</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
                  SecOps Organization Name
                </label>
                <input
                  type="text"
                  value={settings.orgName}
                  onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: 13.5,
                    color: '#0F172A',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
                  Primary Intelligence Node Cluster
                </label>
                <select
                  value={settings.primaryCluster}
                  onChange={(e) => setSettings({ ...settings, primaryCluster: e.target.value })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: 13.5,
                    color: '#0F172A',
                    outline: 'none'
                  }}
                >
                  <option value="US-East (Virginia)">US-East (Virginia) • Primary Core</option>
                  <option value="EU-Central (Frankfurt)">EU-Central (Frankfurt) • GDPR Compliant</option>
                  <option value="AP-Southeast (Singapore)">AP-Southeast (Singapore) • APAC Fast</option>
                </select>
              </div>
            </div>
          </div>

          {/* Automated Threat Quarantine Policies */}
          <div style={{ background: '#FFFFFF', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bell size={18} color="#DC2626" />
              <span>Automated Threat Quarantine & Policy Rules</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Threshold Slider */}
              <div style={{ padding: '16px 18px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>
                    Automated Blocklist Quarantine Threshold
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                    Entities scoring above this score will trigger instant automated webhook syndication and firewall push.
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span className="mono" style={{ fontWeight: 800, fontSize: 16, color: '#DC2626', background: '#FEF2F2', padding: '2px 8px', borderRadius: 6, border: '1px solid #FECACA' }}>
                    ≥ {settings.autoQuarantineThreshold}
                  </span>
                  <input
                    type="range"
                    min="60"
                    max="95"
                    value={settings.autoQuarantineThreshold}
                    onChange={(e) => setSettings({ ...settings, autoQuarantineThreshold: Number(e.target.value) })}
                    style={{ accentColor: '#DC2626', cursor: 'pointer' }}
                  />
                </div>
              </div>

              {/* Permit2 Scanner */}
              <div style={{ padding: '14px 18px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5, color: '#0F172A' }}>
                    Continuous Web3 Permit2 Allowance Scanner
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                    Automatically decompile smart contracts to detect signature drainer routines.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enablePermit2Scanning}
                  onChange={(e) => setSettings({ ...settings, enablePermit2Scanning: e.target.checked })}
                  style={{ width: 18, height: 18, accentColor: '#2563EB', cursor: 'pointer' }}
                />
              </div>

              {/* Dark Pool Scanner */}
              <div style={{ padding: '14px 18px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5, color: '#0F172A' }}>
                    Dark Web Forum & Leak Monitor
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                    Continuously index underground forums for brand typosquats and leaked corporate credentials.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.enableDarkPoolMonitoring}
                  onChange={(e) => setSettings({ ...settings, enableDarkPoolMonitoring: e.target.checked })}
                  style={{ width: 18, height: 18, accentColor: '#2563EB', cursor: 'pointer' }}
                />
              </div>
            </div>
          </div>

          {/* Access & Retention */}
          <div style={{ background: '#FFFFFF', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Lock size={18} color="#059669" />
              <span>Authentication & Forensic Data Retention</span>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              <div style={{ padding: '14px 18px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 13.5, color: '#0F172A' }}>
                    Mandatory 2FA for Analysts
                  </div>
                  <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                    Require hardware key (FIDO2) or TOTP to approve reports.
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={settings.require2FA}
                  onChange={(e) => setSettings({ ...settings, require2FA: e.target.checked })}
                  style={{ width: 18, height: 18, accentColor: '#059669', cursor: 'pointer' }}
                />
              </div>

              <div style={{ padding: '14px 18px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E2E8F0' }}>
                <label style={{ fontWeight: 700, fontSize: 13.5, color: '#0F172A', display: 'block', marginBottom: 4 }}>
                  Forensic Log Retention Period
                </label>
                <select
                  value={settings.retentionDays}
                  onChange={(e) => setSettings({ ...settings, retentionDays: Number(e.target.value) })}
                  style={{
                    width: '100%',
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 13,
                    color: '#0F172A',
                    outline: 'none',
                    marginTop: 4
                  }}
                >
                  <option value={30}>30 Days (Standard Triage)</option>
                  <option value={90}>90 Days (Enterprise Compliant)</option>
                  <option value={365}>365 Days (Full Forensic Archive)</option>
                </select>
              </div>
            </div>
          </div>

          {/* M9: Workspace & Projects Management */}
          <div style={{ background: '#FFFFFF', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                <Briefcase size={18} color="#7C3AED" />
                <span>Không gian làm việc & Dự án (M9 Workspace)</span>
              </h2>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', background: '#F5F3FF', color: '#7C3AED', border: '1px solid #DDD6FE', borderRadius: 999 }}>
                Gói: {currentWorkspace?.plan}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ padding: 14, background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{currentWorkspace?.name}</div>
                  <div style={{ fontSize: 12, color: '#64748B' }}>Định danh (Slug): <code>{currentWorkspace?.slug}</code> • {currentWorkspace?.memberCount} thành viên</div>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setIsAddingProject(!isAddingProject)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <Plus size={14} />
                  <span>Tạo dự án mới</span>
                </button>
              </div>

              {isAddingProject && (
                <div style={{ padding: 16, background: '#EFF6FF', borderRadius: 10, border: '1px solid #BFDBFE', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1E40AF' }}>Thêm Dự án mới vào Workspace:</div>
                  <input
                    type="text"
                    placeholder="Tên dự án (Ví dụ: Giám sát Phishing Q4/2026)"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #93C5FD', fontSize: 13, outline: 'none' }}
                  />
                  <input
                    type="text"
                    placeholder="Mô tả mục tiêu dự án..."
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                    style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #93C5FD', fontSize: 13, outline: 'none' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={() => setIsAddingProject(false)}
                    >
                      Hủy
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        if (!newProjectName.trim()) {
                          showToast('Vui lòng nhập tên dự án', '', 'warning');
                          return;
                        }
                        addProjectToCurrentWorkspace({ name: newProjectName, description: newProjectDesc });
                        setNewProjectName('');
                        setNewProjectDesc('');
                        setIsAddingProject(false);
                      }}
                    >
                      Xác nhận tạo dự án
                    </button>
                  </div>
                </div>
              )}

              {/* Projects List */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12, marginTop: 4 }}>
                {currentWorkspace?.projects?.map(p => (
                  <div key={p.id} style={{ padding: 14, borderRadius: 10, border: '1px solid #E2E8F0', background: '#FFFFFF' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: 700, fontSize: 13.5, color: '#0F172A' }}>{p.name}</span>
                      <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: p.status === 'ACTIVE' ? '#ECFDF5' : '#F1F5F9', color: p.status === 'ACTIVE' ? '#059669' : '#64748B' }}>
                        {p.status}
                      </span>
                    </div>
                    <p style={{ fontSize: 12, color: '#64748B', marginTop: 4, lineHeight: 1.4 }}>{p.description}</p>
                    <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 8 }}>
                      Theo dõi: <strong>{p.threatCount || 0} mục tiêu</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* M10: Identity & Access Control (RBAC) */}
          <div style={{ background: '#FFFFFF', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                <UserCheck size={18} color="#2563EB" />
                <span>Phân quyền vai trò RBAC (M10 Identity & Access)</span>
              </h2>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', background: getRoleMeta(userRole).bg, color: getRoleMeta(userRole).color, border: `1px solid ${getRoleMeta(userRole).border}`, borderRadius: 999 }}>
                Vai trò của bạn: {getRoleMeta(userRole).label}
              </span>
            </div>

            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
              Hệ thống áp dụng mô hình phân quyền chặt chẽ theo vai trò (Role-Based Access Control). Bạn có thể kiểm tra danh sách quyền hạn tương ứng dưới đây:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              <div style={{ padding: 12, borderRadius: 8, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>Tra cứu & Quét URL</div>
                <div style={{ fontSize: 11.5, color: '#059669', marginTop: 2 }}>✓ Tất cả vai trò (All Users)</div>
              </div>
              <div style={{ padding: 12, borderRadius: 8, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>Nộp Báo cáo Lừa đảo</div>
                <div style={{ fontSize: 11.5, color: '#059669', marginTop: 2 }}>✓ Tất cả vai trò (All Users)</div>
              </div>
              <div style={{ padding: 12, borderRadius: 8, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>Phê duyệt / Từ chối Báo cáo</div>
                <div style={{ fontSize: 11.5, color: (userRole === ROLES.SECURITY_ANALYST || userRole === ROLES.ADMIN || userRole === ROLES.OWNER) ? '#059669' : '#DC2626', marginTop: 2 }}>
                  {(userRole === ROLES.SECURITY_ANALYST || userRole === ROLES.ADMIN || userRole === ROLES.OWNER) ? '✓ Cho phép (Authorized)' : '✗ Bị khóa (Analyst/Admin/Owner)'}
                </div>
              </div>
              <div style={{ padding: 12, borderRadius: 8, background: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A' }}>Quản lý API Key & SDK</div>
                <div style={{ fontSize: 11.5, color: (userRole === ROLES.DEVELOPER || userRole === ROLES.ADMIN || userRole === ROLES.OWNER) ? '#059669' : '#DC2626', marginTop: 2 }}>
                  {(userRole === ROLES.DEVELOPER || userRole === ROLES.ADMIN || userRole === ROLES.OWNER) ? '✓ Cho phép (Authorized)' : '✗ Bị khóa (Developer/Admin/Owner)'}
                </div>
              </div>
            </div>
          </div>

          {/* M12: Appeals & Dispute Center */}
          <div style={{ background: '#FFFFFF', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                <AlertTriangle size={18} color="#D97706" />
                <span>Trung tâm Kháng nghị & Gỡ nhãn lừa đảo (M12 Appeals & Disputes)</span>
              </h2>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', background: '#FEF3C7', color: '#B45309', border: '1px solid #FDE68A', borderRadius: 999 }}>
                Đang chờ xử lý: {appeals?.filter(a => a.status === 'PENDING').length || 0} yêu cầu
              </span>
            </div>

            <p style={{ fontSize: 13, color: '#64748B', marginBottom: 16 }}>
              Xem xét các yêu cầu gỡ nhãn cảnh báo đỏ từ chủ sở hữu tên miền hoặc dự án. Quyết định được phân quyền cho SecOps Analyst, Admin hoặc Owner.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {appeals?.map((app) => (
                <div
                  key={app.id}
                  style={{
                    padding: 16,
                    borderRadius: 12,
                    border: '1px solid #E2E8F0',
                    background: app.status === 'PENDING' ? '#FFFBEB' : '#F8FAFC',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontWeight: 800, fontSize: 13.5, color: '#0F172A' }}>{app.id}</span>
                      <span style={{ fontSize: 12, color: '#64748B' }}>• Gửi {app.submittedAt}</span>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: '3px 8px',
                        borderRadius: 6,
                        background:
                          app.status === 'PENDING'
                            ? '#FEF3C7'
                            : app.status === 'APPROVED'
                            ? '#ECFDF5'
                            : '#FEF2F2',
                        color:
                          app.status === 'PENDING'
                            ? '#B45309'
                            : app.status === 'APPROVED'
                            ? '#059669'
                            : '#DC2626',
                        border: `1px solid ${
                          app.status === 'PENDING'
                            ? '#FDE68A'
                            : app.status === 'APPROVED'
                            ? '#A7F3D0'
                            : '#FECACA'
                        }`
                      }}
                    >
                      {app.status === 'PENDING' ? '⏳ ĐANG CHỜ DUYỆT' : app.status === 'APPROVED' ? '✓ ĐÃ CHẤP THUẬN' : '✗ ĐÃ BÁC BỎ'}
                    </span>
                  </div>

                  <div style={{ fontSize: 13, color: '#1E293B' }}>
                    <strong>Mục tiêu khiếu nại:</strong>{' '}
                    <code style={{ background: 'rgba(0,0,0,0.06)', padding: '2px 6px', borderRadius: 4 }}>
                      {app.targetIdentifier}
                    </code>{' '}
                    • <span style={{ color: '#64748B' }}>Người gửi: {app.requesterEmail}</span>
                  </div>

                  <div style={{ fontSize: 12.5, color: '#475569', lineHeight: 1.5, background: '#FFFFFF', padding: 10, borderRadius: 8, border: '1px solid #E2E8F0' }}>
                    <strong>Lý do giải trình:</strong> {app.reason}
                  </div>

                  {app.reviewedBy && (
                    <div style={{ fontSize: 12, color: '#64748B', display: 'flex', gap: 6, alignItems: 'center' }}>
                      <CheckCircle2 size={14} color="#059669" />
                      <span>Xử lý bởi: <strong>{app.reviewedBy}</strong> — <em>"{app.reviewerNotes}"</em></span>
                    </div>
                  )}

                  {app.status === 'PENDING' && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 4 }}>
                      <button
                        type="button"
                        className="btn btn-secondary btn-sm"
                        style={{ color: '#DC2626', borderColor: '#FECACA' }}
                        onClick={() => handleAppealDecision(app.id, 'reject', 'Duy trì nhãn cảnh báo đỏ do còn nghi vấn rủi ro.')}
                      >
                        <XCircle size={14} />
                        <span>Bác bỏ khiếu nại</span>
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        style={{ background: '#059669', borderColor: '#047857' }}
                        onClick={() => handleAppealDecision(app.id, 'approve', 'Đã xác minh dự án phi lợi nhuận hợp lệ.')}
                      >
                        <CheckCircle2 size={14} />
                        <span>Chấp thuận & Gỡ nhãn</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* M12: System Observability & SLO Metrics */}
          <div style={{ background: '#FFFFFF', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', display: 'flex', alignItems: 'center', gap: 8, margin: 0 }}>
                <Activity size={18} color="#059669" />
                <span>Chỉ số Độ tin cậy & Giám sát SLO / Latency P95 (M12 Observability)</span>
              </h2>
              <span style={{ fontSize: 12, fontWeight: 700, padding: '3px 10px', background: '#ECFDF5', color: '#059669', border: '1px solid #A7F3D0', borderRadius: 999 }}>
                Trạng thái: 100% OPERATIONAL
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
              {sloMetrics?.map((slo) => (
                <div
                  key={slo.id}
                  style={{
                    padding: 14,
                    borderRadius: 12,
                    border: '1px solid #E2E8F0',
                    background: '#F8FAFC',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontWeight: 700, fontSize: 13, color: '#0F172A' }}>{slo.name}</span>
                    <span style={{ fontSize: 10.5, fontWeight: 700, padding: '2px 6px', borderRadius: 4, background: '#ECFDF5', color: '#059669' }}>
                      {slo.status}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 4 }}>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: '#059669' }}>{slo.uptime}%</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>Target: {slo.targetUptime}%</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>P95: {slo.p95Latency}</div>
                      <div style={{ fontSize: 11, color: '#64748B' }}>Lỗi: {(slo.errorRate * 100).toFixed(2)}%</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ width: '100%', height: 6, background: '#E2E8F0', borderRadius: 999, overflow: 'hidden' }}>
                    <div style={{ width: `${slo.uptime}%`, height: '100%', background: '#059669', borderRadius: 999 }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 9Router AI Gateway Configuration */}
          <div style={{ background: '#FFFFFF', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>⚡</span>
                <span>9Router AI Gateway (Cổng kết nối AI cục bộ & đa nhà cung cấp)</span>
              </h2>

              <span style={{
                padding: '4px 10px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 700,
                background: nineRouterHealth?.isOnline ? '#ECFDF5' : '#FEF3C7',
                color: nineRouterHealth?.isOnline ? '#059669' : '#D97706',
                border: `1px solid ${nineRouterHealth?.isOnline ? '#A7F3D0' : '#FDE68A'}`,
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: nineRouterHealth?.isOnline ? '#059669' : '#D97706' }} />
                <span>{nineRouterHealth?.isOnline ? `Online (${nineRouterHealth.modelsCount || 49} models)` : 'Chưa kết nối (Port 20128)'}</span>
              </span>
            </div>

            <p style={{ fontSize: 13, color: '#64748B', marginTop: 0, marginBottom: 16 }}>
              Topdoo AI sử dụng <strong>9Router</strong> làm cầu nối thông minh để định tuyến tới hơn 40 nhà cung cấp (OpenAI, Anthropic Claude, Google Gemini, DeepSeek, Grok...), tự động tối ưu token (RTK) và tự động fallback chống nghẽn mạng.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
                  9Router Gateway Endpoint URL
                </label>
                <input
                  type="text"
                  value={nineUrl}
                  onChange={(e) => setNineUrl(e.target.value)}
                  placeholder="http://localhost:20128/v1"
                  style={{
                    width: '100%',
                    background: '#F8FAFC',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: 13.5,
                    color: '#0F172A',
                    fontFamily: 'monospace'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 700, color: '#0F172A', display: 'block', marginBottom: 6 }}>
                  9Router API Key (Bearer Token)
                </label>
                <input
                  type="text"
                  value={nineKey}
                  onChange={(e) => setNineKey(e.target.value)}
                  placeholder="sk-tiodev-chatbot-secret"
                  style={{
                    width: '100%',
                    background: '#F8FAFC',
                    border: '1.5px solid #CBD5E1',
                    borderRadius: 10,
                    padding: '10px 14px',
                    fontSize: 13.5,
                    color: '#0F172A',
                    fontFamily: 'monospace'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid #F1F5F9' }}>
              <div style={{ fontSize: 12, color: '#64748B' }}>
                {nineRouterHealth?.isOnline ? (
                  <span style={{ color: '#059669', fontWeight: 600 }}>
                    ✓ Kết nối bình thường. Độ trễ ping: {nineRouterHealth.latencyMs || 20}ms.
                  </span>
                ) : (
                  <span>Gợi ý: Mở terminal chạy lệnh <code style={{ color: '#2563EB', fontWeight: 700 }}>9router</code> để kích hoạt server.</span>
                )}
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  disabled={isPinging}
                  onClick={async () => {
                    setIsPinging(true);
                    const res = await refresh9RouterHealth();
                    setIsPinging(false);
                    if (res?.isOnline) {
                      showToast('9Router Online', `Phát hiện ${res.modelsCount} models đang hoạt động.`, 'success');
                    } else {
                      showToast('9Router Offline', 'Không phản hồi từ port 20128.', 'warning');
                    }
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  {isPinging ? 'Đang ping...' : 'Kiểm tra kết nối (Ping)'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    update9RouterSettings({
                      baseUrl: nineUrl,
                      apiKey: nineKey,
                      enabled: true
                    });
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ backgroundColor: '#2563EB' }}
                >
                  Lưu cấu hình 9Router
                </button>
              </div>
            </div>
          </div>

          {/* Voicebox AI Studio Gateway Configuration */}
          <div className="card" style={{ border: '1px solid #E2E8F0', padding: 24, borderRadius: 16, backgroundColor: 'var(--bg-card)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🎙️ Voicebox AI Studio Gateway (Voice Cloning & TTS Engine)</span>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 12,
                    backgroundColor: voiceboxHealth?.isOnline ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    color: voiceboxHealth?.isOnline ? '#10B981' : '#F59E0B'
                  }}>
                    {voiceboxHealth?.isOnline ? 'ONLINE (17493)' : 'LOCAL AUDIO ENGINE'}
                  </span>
                </h3>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--text-muted)', maxWidth: 640 }}>
                  Lõi AI tổng hợp âm thanh mã nguồn mở (Jamie Pine). Hỗ trợ nhân bản giọng đọc tức thì (Zero-shot Cloning) và tổng hợp giọng đa mô hình (Kokoro 82M, Qwen3-TTS, Chatterbox).
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Voicebox REST API Endpoint URL
                </label>
                <input
                  type="text"
                  value={voiceUrl}
                  onChange={(e) => setVoiceUrl(e.target.value)}
                  placeholder="http://localhost:17493"
                  className="input-text"
                  style={{ width: '100%', fontFamily: 'monospace', fontSize: 13 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6 }}>
                  Lệnh chạy nhanh Docker Container
                </label>
                <div style={{ padding: '8px 12px', borderRadius: 8, backgroundColor: 'rgba(0,0,0,0.05)', border: '1px solid var(--border-subtle)', fontFamily: 'monospace', fontSize: 11, color: '#7C3AED' }}>
                  git clone https://github.com/jamiepine/voicebox && docker compose up -d
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Nếu Voicebox chưa chạy, Topdoo tự động fallback sang Web Audio Synthesis của trình duyệt để không làm gián đoạn trải nghiệm.
              </span>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  disabled={isPingingVoice}
                  onClick={async () => {
                    setIsPingingVoice(true);
                    const res = await refreshVoiceboxHealth();
                    setIsPingingVoice(false);
                    if (res.isOnline) {
                      showToast('Voicebox Online', `Kết nối thành công! Đang kích hoạt engine ${res.engine}.`, 'success');
                    } else {
                      showToast('Voicebox Offline', 'Không tìm thấy server ở cổng 17493. Đang dùng Web Audio Fallback.', 'warning');
                    }
                  }}
                  className="btn btn-secondary btn-sm"
                >
                  {isPingingVoice ? 'Đang ping...' : 'Kiểm tra Ping (17493)'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    updateVoiceboxSettings({
                      baseUrl: voiceUrl,
                      enabled: true
                    });
                  }}
                  className="btn btn-primary btn-sm"
                  style={{ backgroundColor: '#7C3AED' }}
                >
                  Lưu cấu hình Voicebox
                </button>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 10 }}>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <Save size={16} />
              <span>Save Workspace Preferences</span>
            </button>
          </div>
        </form>
      </div>
    </PageTransition>
  );
}
