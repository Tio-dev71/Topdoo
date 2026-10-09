import React, { useState } from 'react';
import {
  Search,
  Zap,
  Bell,
  HelpCircle,
  User,
  ExternalLink,
  Shield,
  CheckCircle,
  AlertTriangle,
  Menu,
  ChevronDown,
  Building,
  LogOut,
  ArrowLeft,
  Home,
  LogIn,
  Settings
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export function Header() {
  const {
    mode,
    setMode,
    setMarketingRoute,
    setCurrentView,
    setIsSearchOpen,
    alerts,
    setMobileMenuOpen,
    navigateToEntity,
    showToast,
    user,
    signOut,
    openAuthModal,
    openCreditModal,
    userRole,
    setUserRole,
    ROLES,
    getRoleMeta,
    workspaces,
    currentWorkspace,
    switchWorkspace,
    creditBalance,
    addCredits
  } = useSecurity();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadAlerts = alerts.filter(a => a.status === 'Unresolved');

  return (
    <header className="top-header">
      <div className="header-left">
        {/* Mobile menu toggle */}
        <button
          className="mobile-menu-toggle-btn"
          onClick={() => setMobileMenuOpen(prev => !prev)}
          id="mobile-nav-toggle"
          title="Mở menu điều hướng"
          aria-label="Mở menu điều hướng"
        >
          <Menu size={18} />
        </button>

        {/* Quay lại màn hình chính Topdoo */}
        <button
          className="btn-exit-console-pill"
          onClick={() => {
            setMode('marketing');
            setMarketingRoute('topdoo-security');
            if (typeof window !== 'undefined') window.history.pushState({}, '', '/topdoo-security');
          }}
          title="Rời khỏi SecOps Console và quay lại Trang chủ Topdoo Security"
        >
          <ArrowLeft size={14} />
          <span className="exit-text-desktop">⬅️ Quay lại Trang chủ</span>
          <span className="exit-text-mobile">Trang chủ</span>
        </button>

        {/* Global Search Trigger */}
        <button
          className="search-trigger-btn"
          onClick={() => setIsSearchOpen(true)}
          title="Tìm kiếm thông minh (⌘K)"
        >
          <Search size={15} color="var(--text-muted)" />
          <span className="search-text-full">Tìm kiếm tên miền, URL, ví, SĐT, IP hoặc báo cáo...</span>
          <span className="search-text-short">Tìm kiếm...</span>
          <span className="search-kbd">⌘K</span>
        </button>

        {/* Quick Check Action Button */}
        <button
          className="btn btn-primary btn-sm header-quick-check-btn header-desktop-only"
          onClick={() => {
            setMode('app');
            setCurrentView('quick-check');
          }}
        >
          <Zap size={13} />
          <span className="quick-check-text-full">Kiểm tra nhanh</span>
          <span className="quick-check-text-short">Quét</span>
        </button>
      </div>

      <div className="header-right">
        {/* Workspace Switcher (M9) */}
        {mode === 'app' && workspaces && workspaces.length > 0 && (
          <div className="header-workspace-wrap header-desktop-only" style={{ display: 'flex', alignItems: 'center' }}>
            <select
              value={currentWorkspace?.id}
              onChange={(e) => switchWorkspace(e.target.value)}
              style={{
                padding: '4px 8px',
                fontSize: 11.5,
                fontWeight: 600,
                background: '#F8FAFC',
                border: '1px solid var(--border-default)',
                borderRadius: 6,
                color: 'var(--text-primary)',
                cursor: 'pointer',
                outline: 'none'
              }}
              title="Chuyển đổi Không gian làm việc (M9 Workspace)"
            >
              {workspaces.map(w => (
                <option key={w.id} value={w.id}>
                  🏢 {w.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* RBAC Role Switcher (M10) */}
        {mode === 'app' && (
          <div className="header-role-wrap header-desktop-only" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <select
              value={userRole}
              onChange={(e) => {
                setUserRole(e.target.value);
                showToast('Thay đổi quyền RBAC', `Chuyển quyền sang: ${getRoleMeta(e.target.value).label}`, 'info');
              }}
              style={{
                padding: '4px 8px',
                fontSize: 11,
                fontWeight: 700,
                color: getRoleMeta(userRole).color,
                background: getRoleMeta(userRole).bg,
                border: `1px solid ${getRoleMeta(userRole).border}`,
                borderRadius: 6,
                cursor: 'pointer',
                outline: 'none'
              }}
              title="Chuyển đổi Vai trò thử nghiệm (M10 RBAC)"
            >
              <option value={ROLES.SECURITY_ANALYST}>🔍 Analyst</option>
              <option value={ROLES.ADMIN}>🛡️ Admin</option>
              <option value={ROLES.OWNER}>👑 Owner</option>
              <option value={ROLES.DEVELOPER}>💻 Developer</option>
              <option value={ROLES.USER}>👤 User</option>
            </select>
          </div>
        )}

        {/* AI Credits Badge (M11 & M1) */}
        <div
          className="header-credits-badge"
          onClick={() => {
            const choice = window.prompt(
              "Nạp thêm AI Credits vào tài khoản Topdoo:\nNhập số credits cần nạp (Ví dụ: 10000, 50000, 200000) hoặc bấm OK để nạp nhanh +10,000:",
              "10000"
            );
            if (choice !== null) {
              const val = parseInt(choice, 10);
              if (!isNaN(val) && val > 0) {
                addCredits(val, `Nạp trực tiếp +${val.toLocaleString()} Credits`);
              }
            }
          }}
          title="Số dư AI Credits (Bấm để nạp thêm tùy ý không giới hạn)"
        >
          <span>🪙</span>
          <span className="credits-text-full">{creditBalance !== undefined ? creditBalance.toLocaleString() : '50,000'} Credits</span>
          <span className="credits-text-short">{creditBalance !== undefined ? (creditBalance >= 1000 ? `${Math.round(creditBalance / 1000)}k` : creditBalance) : '50k'}</span>
        </div>

        {/* Quay lại Trang chủ Topdoo - desktop only */}
        <button
          className="btn-return-home-main header-desktop-home-btn"
          onClick={() => {
            setMode('marketing');
            setMarketingRoute('topdoo-security');
            if (typeof window !== 'undefined') window.history.pushState({}, '', '/topdoo-security');
          }}
          title="Rời khỏi SecOps Console và quay lại Trang chủ Topdoo Security"
        >
          <Home size={14} style={{ color: '#2563EB' }} />
          <span>Trang chủ Topdoo</span>
        </button>

        {/* Notifications Popover */}
        <div style={{ position: 'relative' }}>
          <button
            className="btn-icon"
            onClick={() => setNotificationsOpen(prev => !prev)}
            title="Thông báo bảo mật"
            style={{ position: 'relative' }}
          >
            <Bell size={16} />
            {unreadAlerts.length > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: 'var(--risk-critical)',
                  border: '1.5px solid var(--bg-header)'
                }}
              />
            )}
          </button>

          {notificationsOpen && (
            <div
              style={{
                position: 'absolute',
                top: 44,
                right: 0,
                width: 380,
                maxWidth: 'calc(100vw - 20px)',
                background: 'var(--bg-card-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 60,
                padding: '14px 0'
              }}
            >
              <div style={{ padding: '0 16px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>
                  Thông báo mối đe dọa & bảo mật
                </span>
                <span style={{ fontSize: 11, color: 'var(--risk-critical)', fontWeight: 600 }}>
                  {unreadAlerts.length} Chưa xử lý
                </span>
              </div>

              <div style={{ maxHeight: 340, overflowY: 'auto' }}>
                {alerts.slice(0, 5).map(alert => (
                  <div
                    key={alert.id}
                    style={{
                      padding: '12px 16px',
                      borderBottom: '1px solid var(--border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: alert.severity === 'Critical' ? 'var(--risk-critical)' : '#F59E0B' }}>
                        {alert.severity === 'Critical' ? 'NGHIÊM TRỌNG' : 'CẢNH BÁO'}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{alert.timestamp}</span>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {alert.title}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                      {alert.reason}
                    </div>
                    <div style={{ marginTop: 6, display: 'flex', gap: 8 }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: 11, padding: '2px 8px' }}
                        onClick={() => {
                          setNotificationsOpen(false);
                          navigateToEntity(alert.entityId);
                        }}
                      >
                        Điều tra
                      </button>
                      <button
                        className="btn btn-ghost btn-sm"
                        style={{ fontSize: 11, padding: '2px 8px' }}
                        onClick={() => {
                          setNotificationsOpen(false);
                          setCurrentView('alerts');
                        }}
                      >
                        Xem cảnh báo
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: '8px 16px 0', textAlign: 'center' }}>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ width: '100%', fontSize: 12 }}
                  onClick={() => {
                    setNotificationsOpen(false);
                    setCurrentView('alerts');
                  }}
                >
                  Xem tất cả cảnh báo bảo mật →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Documentation / Help */}
        <button
          className="btn-icon header-desktop-only"
          title="Cơ sở kiến thức bảo mật & Tài liệu API"
          onClick={() => {
            setMode('app');
            setCurrentView('risk-scores');
          }}
        >
          <HelpCircle size={16} />
        </button>

        {/* User Workspace Profile */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
          {user ? (
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 6, borderLeft: '1px solid var(--border-subtle)', cursor: 'pointer' }}
              onClick={() => setProfileOpen(prev => !prev)}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1E293B, #3B82F6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 12,
                  color: '#FFFFFF',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  overflow: 'hidden',
                  flexShrink: 0
                }}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  (user.fullName || user.email || 'TS').substring(0, 2).toUpperCase()
                )}
              </div>
              <div className="header-desktop-only" style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                  {user.fullName || user.email.split('@')[0]}
                </span>
                <span style={{ fontSize: 10, color: '#059669', fontWeight: 600 }}>
                  {user.plan ? `Gói ${user.plan}` : 'Đã đăng nhập'}
                </span>
              </div>
              <ChevronDown className="header-desktop-only" size={13} color="var(--text-muted)" />
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingLeft: 6, borderLeft: '1px solid var(--border-subtle)' }}>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}
                onClick={() => setProfileOpen(prev => !prev)}
                title="Tài khoản khách (Demo)"
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748B',
                    flexShrink: 0
                  }}
                >
                  <User size={16} />
                </div>
                <div className="header-desktop-only" style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                    Khách tham quan
                  </span>
                  <span style={{ fontSize: 10, color: '#D97706', fontWeight: 600 }}>
                    Chưa đăng nhập
                  </span>
                </div>
              </div>
              <button
                className="btn btn-primary btn-sm header-desktop-only"
                onClick={() => openAuthModal('login')}
                style={{ fontSize: 11.5, padding: '4px 10px', gap: 5, fontWeight: 700 }}
              >
                <LogIn size={13} />
                <span>Đăng nhập</span>
              </button>
            </div>
          )}

          {profileOpen && (
            <div
              style={{
                position: 'absolute',
                top: 44,
                right: 0,
                width: 250,
                maxWidth: 'calc(100vw - 20px)',
                background: 'var(--bg-card-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 60,
                padding: '8px 0'
              }}
            >
              {user ? (
                <>
                  <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>
                      {user.fullName || user.email}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                      {user.email}
                    </div>
                  </div>
                  <button
                    className="btn btn-ghost"
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 16px', fontSize: 13, borderRadius: 0 }}
                    onClick={() => {
                      setProfileOpen(false);
                      setCurrentView('settings');
                    }}
                  >
                    <Settings size={14} />
                    <span>Cài đặt tài khoản</span>
                  </button>
                  <button
                    className="btn btn-ghost"
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 16px', fontSize: 13, borderRadius: 0, color: '#DC2626' }}
                    onClick={() => {
                      setProfileOpen(false);
                      signOut();
                    }}
                  >
                    <LogOut size={14} />
                    <span>Đăng xuất</span>
                  </button>
                </>
              ) : (
                <>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>
                      Chế độ Khách (Guest Demo)
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>
                      Đăng nhập tài khoản Topdoo để lưu lịch sử kiểm tra, quản lý danh sách theo dõi và sử dụng API bảo mật.
                    </div>
                  </div>
                  <div style={{ padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', justifyContent: 'center', fontSize: 12, padding: '7px' }}
                      onClick={() => {
                        setProfileOpen(false);
                        openAuthModal('login');
                      }}
                    >
                      <LogIn size={14} />
                      <span>Đăng nhập ngay</span>
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ width: '100%', justifyContent: 'center', fontSize: 12, padding: '6px' }}
                      onClick={() => {
                        setProfileOpen(false);
                        openAuthModal('register');
                      }}
                    >
                      <span>Tạo tài khoản mới</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
