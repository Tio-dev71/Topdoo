import React from 'react';
import {
  Shield,
  ShieldCheck,
  LayoutDashboard,
  Zap,
  Globe,
  Fish,
  Database,
  Share2,
  Bookmark,
  Activity,
  Bell,
  FileText,
  FileCheck,
  CheckCircle2,
  Percent,
  Sliders,
  Terminal,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  PlusCircle,
  AlertCircle
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export function Sidebar() {
  const {
    currentView,
    setCurrentView,
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileMenuOpen,
    setMobileMenuOpen,
    setMode,
    alerts,
    reports,
    entities
  } = useSecurity();

  const unreadAlertsCount = alerts.filter(a => a.status === 'Unresolved').length;
  const watchlistCount = entities.filter(e => e.watchlist).length;
  const pendingVerificationCount = reports.filter(r => r.status === 'Submitted' || r.status === 'Under Review').length;

  const navItem = (id, label, icon, badge = null, badgeType = 'default') => {
    const isActive = currentView === id;
    const IconComponent = icon;

    return (
      <button
        key={id}
        onClick={() => {
          setMode('app');
          setCurrentView(id);
          if (mobileMenuOpen) setMobileMenuOpen(false);
        }}
        className={`nav-item ${isActive ? 'active' : ''}`}
        title={sidebarCollapsed ? label : undefined}
      >
        <IconComponent size={16} />
        {!sidebarCollapsed && <span>{label}</span>}
        {!sidebarCollapsed && badge !== null && (
          <span className={`nav-item-badge ${badgeType}`}>
            {badge}
          </span>
        )}
      </button>
    );
  };

  return (
    <aside className={`app-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-header">
        <div
          className="brand-logo-wrap"
          onClick={() => {
            setMode('app');
            setCurrentView('overview');
          }}
          style={{ cursor: 'pointer' }}
        >
          <img
            src="/topdoo.jpeg"
            alt="TOPDOO Logo"
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              objectFit: 'cover',
              boxShadow: '0 0 12px rgba(37, 99, 235, 0.35)',
              border: '1px solid rgba(59, 130, 246, 0.4)'
            }}
          />
          {!sidebarCollapsed && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: '0.04em' }}>TOPDOO</span>
              <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.08em' }}>
                TRUNG TÂM BẢO MẬT
              </span>
            </div>
          )}
        </div>

        <button
          className="btn-icon"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          title={sidebarCollapsed ? 'Mở rộng' : 'Thu gọn'}
          style={{ width: 26, height: 26 }}
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation Body */}
      <div className="sidebar-nav">
        {/* OVERVIEW */}
        <div className="nav-group">
          {navItem('overview', 'Tổng quan', LayoutDashboard)}
        </div>

        {/* SECURITY */}
        <div>
          {!sidebarCollapsed && <div className="nav-section-title">Bảo mật</div>}
          <div className="nav-group">
            {navItem('quick-check', 'Kiểm tra nhanh', Zap)}
            {navItem('url-scanner', 'Quét URL / Tên miền', Globe)}
            {navItem('phishing-check', 'Kiểm tra Phishing', Fish)}
            {navItem('scam-database', 'Cơ sở dữ liệu Scam', Database, entities.length)}
            {navItem('scam-network', 'Mạng lưới Scam', Share2)}
            {navItem('watchlist', 'Danh sách theo dõi', Bookmark, watchlistCount)}
            {navItem('monitoring', 'Giám sát', Activity)}
            {navItem('alerts', 'Cảnh báo', Bell, unreadAlertsCount, 'critical')}
          </div>
        </div>

        {/* INTELLIGENCE */}
        <div>
          {!sidebarCollapsed && <div className="nav-section-title">Phân tích</div>}
          <div className="nav-group">
            {navItem('reports', 'Báo cáo & Vụ việc', FileText, reports.length)}
            {navItem('evidence', 'Kho bằng chứng', FileCheck)}
            {navItem('verification', 'Hàng chờ xác minh', CheckCircle2, pendingVerificationCount, 'warning')}
            {navItem('risk-scores', 'Đánh giá rủi ro', Percent)}
          </div>
        </div>

        {/* MANAGEMENT */}
        <div>
          {!sidebarCollapsed && <div className="nav-section-title">Quản lý</div>}
          <div className="nav-group">
            {navItem('report-scam', 'Báo cáo lừa đảo', PlusCircle)}
            {navItem('api-integrations', 'API & Tích hợp', Terminal)}
            {navItem('release-gate', 'Release Gate & SLO', ShieldCheck)}
            {navItem('settings', 'Cài đặt', Settings)}
          </div>
        </div>
      </div>

      {/* Sidebar Footer with quick actions */}
      <div className="sidebar-footer">
        {!sidebarCollapsed ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              className="btn btn-primary"
              style={{ width: '100%', fontSize: 12, padding: '8px' }}
              onClick={() => {
                setMode('app');
                setCurrentView('report-scam');
              }}
            >
              <PlusCircle size={14} />
              <span>Báo cáo đối tượng</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-muted)' }}>
              <span>Trạng thái hệ thống</span>
              <span style={{ color: 'var(--risk-safe)', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
                Hoạt động
              </span>
            </div>
          </div>
        ) : (
          <button
            className="btn-icon"
            style={{ width: '100%' }}
            onClick={() => {
              setMode('app');
              setCurrentView('report-scam');
            }}
            title="Báo cáo lừa đảo"
          >
            <PlusCircle size={16} />
          </button>
        )}
      </div>
    </aside>
  );
}
