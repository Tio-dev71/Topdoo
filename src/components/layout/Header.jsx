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
  LogOut
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export function Header() {
  const {
    mode,
    setMode,
    setCurrentView,
    setIsSearchOpen,
    alerts,
    setMobileMenuOpen,
    navigateToEntity,
    showToast,
    user,
    signOut,
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
          className="btn-icon"
          onClick={() => setMobileMenuOpen(prev => !prev)}
          style={{ display: 'none' }}
          id="mobile-nav-toggle"
        >
          <Menu size={18} />
        </button>

        {/* Global Search Trigger */}
        <button
          className="search-trigger-btn"
          onClick={() => setIsSearchOpen(true)}
        >
          <Search size={15} color="var(--text-muted)" />
          <span>Tìm kiếm tên miền, URL, ví, SĐT, IP hoặc báo cáo...</span>
          <span className="search-kbd">⌘K</span>
        </button>

        {/* Quick Check Action Button */}
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setMode('app');
            setCurrentView('quick-check');
          }}
          style={{ gap: 6 }}
        >
          <Zap size={13} />
          <span>Kiểm tra nhanh</span>
        </button>
      </div>

      <div className="header-right">
        {/* Workspace Switcher (M9) */}
        {mode === 'app' && workspaces && workspaces.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 10px',
            fontSize: 12,
            fontWeight: 700,
            color: '#F59E0B',
            background: 'rgba(245, 158, 11, 0.1)',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: 6,
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'all 0.2s'
          }}
          title="Số dư AI Credits (Bấm để nạp thêm tùy ý không giới hạn)"
        >
          <span>🪙</span>
          <span>{creditBalance !== undefined ? creditBalance.toLocaleString() : '50,000'} Credits</span>
        </div>

        {/* View mode toggle (Marketing vs App) */}
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => setMode(mode === 'app' ? 'marketing' : 'app')}
          title="Chuyển đổi giữa Bảng điều khiển và Trang web công khai"
          style={{ fontSize: 12, padding: '4px 10px' }}
        >
          {mode === 'app' ? (
            <>
              <ExternalLink size={12} />
              <span>Trang chủ</span>
            </>
          ) : (
            <>
              <Shield size={12} />
              <span>Bảng điều khiển</span>
            </>
          )}
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
          className="btn-icon"
          title="Cơ sở kiến thức bảo mật & Tài liệu API"
          onClick={() => {
            setMode('app');
            setCurrentView('risk-scores');
          }}
        >
          <HelpCircle size={16} />
        </button>

        {/* User Workspace Profile */}
        <div style={{ position: 'relative' }}>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 8, borderLeft: '1px solid var(--border-subtle)', cursor: 'pointer' }}
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
                fontWeight: 600,
                fontSize: 12,
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.15)'
              }}
            >
              {user?.email ? user.email.substring(0, 2).toUpperCase() : 'TS'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                {user?.email ? user.email.split('@')[0] : 'Topdoo SecOps'}
              </span>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                {user ? 'Đã đăng nhập' : 'Gói Enterprise • Node #04'}
              </span>
            </div>
          </div>

          {profileOpen && (
            <div
              style={{
                position: 'absolute',
                top: 44,
                right: 0,
                width: 220,
                background: 'var(--bg-card-elevated)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-lg)',
                zIndex: 60,
                padding: '8px 0'
              }}
            >
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
              {user && signOut && (
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
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
