import React from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Bookmark,
  FileText,
  CheckCircle,
  Bell,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Activity,
  Layers,
  Zap,
  Globe,
  Radio,
  ExternalLink,
  ChevronRight,
  Search,
  Eye,
  BarChart3,
  Shield
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { RiskBadge } from '../../components/common/RiskBadge';
import { StatusBadge } from '../../components/common/StatusBadge';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { AnimatedCounter } from '../../components/common/AnimatedCounter';
import { PageTransition } from '../../components/common/PageTransition';
import { DonutChart } from '../../components/charts/DonutChart';
import { AreaSparkline } from '../../components/charts/AreaSparkline';

export function DashboardOverview() {
  const {
    statsOverview,
    entities,
    reports,
    alerts,
    navigateToEntity,
    setCurrentView,
    toggleWatchlist
  } = useSecurity();

  const recentThreats = entities.slice(0, 5);

  const riskCounts = {
    critical: entities.filter(e => e.riskScore >= 81).length,
    high: entities.filter(e => e.riskScore >= 61 && e.riskScore < 81).length,
    medium: entities.filter(e => e.riskScore >= 41 && e.riskScore < 61).length,
    low: entities.filter(e => e.riskScore >= 21 && e.riskScore < 41).length,
    safe: entities.filter(e => e.riskScore < 21).length
  };
  const totalEntities = entities.length || 1;

  const riskChartData = [
    { name: 'Nghiêm trọng (81–100)', value: riskCounts.critical, color: '#DC2626' },
    { name: 'Rủi ro cao (61–80)', value: riskCounts.high, color: '#EA580C' },
    { name: 'Rủi ro vừa (41–60)', value: riskCounts.medium, color: '#D97706' },
    { name: 'Rủi ro thấp (21–40)', value: riskCounts.low, color: '#2563EB' },
    { name: 'An toàn (0–20)', value: riskCounts.safe, color: '#059669' }
  ];

  const velocityData = [
    { time: '00:00', value: 480 },
    { time: '03:00', value: 390 },
    { time: '06:00', value: 620 },
    { time: '09:00', value: 1100 },
    { time: '12:00', value: 1480 },
    { time: '15:00', value: 1650 },
    { time: '18:00', value: 1320 },
    { time: '21:00', value: 1150 },
    { time: 'Hiện tại', value: 1540 }
  ];

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {/* Hero Banner - matching marketing gradient style */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 20,
            background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 40%, #E0E7FF 100%)',
            padding: '32px 36px',
            border: '1px solid rgba(59, 130, 246, 0.15)',
          }}
        >
          {/* Decorative background circles - matching marketing style */}
          <div style={{
            position: 'absolute',
            top: -60,
            right: -40,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />
          <div style={{
            position: 'absolute',
            bottom: -80,
            right: 120,
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, position: 'relative', zIndex: 1 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 14px',
                    borderRadius: 9999,
                    background: 'rgba(5, 150, 105, 0.12)',
                    border: '1px solid rgba(5, 150, 105, 0.25)',
                    color: '#059669',
                    fontSize: 12,
                    fontWeight: 600
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#059669', boxShadow: '0 0 6px rgba(5, 150, 105, 0.5)' }} />
                  Đang hoạt động trực tiếp
                </span>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>•</span>
                <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>17 nguồn dữ liệu tình báo</span>
              </div>
              <h1 style={{
                fontSize: 28,
                fontWeight: 800,
                color: '#0F172A',
                letterSpacing: '-0.03em',
                margin: 0,
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif"
              }}>
                Tổng quan An ninh mạng
              </h1>
              <p style={{
                margin: '8px 0 0',
                fontSize: 15,
                color: '#475569',
                maxWidth: 580,
                lineHeight: 1.6
              }}>
                Giám sát mối đe dọa thời gian thực, phân tích tương quan thực thể tự động và phân tích danh tiếng trên web, blockchain và viễn thông.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 10, alignItems: 'center', alignSelf: 'center' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => setCurrentView('monitoring')}
                style={{
                  borderRadius: 12,
                  padding: '10px 18px',
                  fontWeight: 600,
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(226, 232, 240, 0.8)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                }}
              >
                <Activity size={15} color="#2563EB" />
                <span>Giám sát</span>
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setCurrentView('quick-check')}
                style={{
                  borderRadius: 12,
                  padding: '10px 22px',
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 100%)',
                  boxShadow: '0 4px 16px rgba(37, 99, 235, 0.3)',
                  border: 'none'
                }}
              >
                <Zap size={15} />
                <span>Quét nhanh</span>
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="kpi-grid">
          {[
            {
              label: 'Mối đe dọa phát hiện',
              value: statsOverview.threatsDetected,
              icon: ShieldAlert,
              iconColor: '#DC2626',
              borderColor: '#DC2626',
              change: statsOverview.threatsChange,
              changeColor: '#DC2626',
              subtitle: 'so với 30 ngày trước'
            },
            {
              label: 'Thực thể rủi ro cao',
              value: statsOverview.highRiskEntities,
              icon: AlertTriangle,
              iconColor: '#EA580C',
              borderColor: '#EA580C',
              change: statsOverview.highRiskChange,
              changeColor: '#EA580C',
              subtitle: 'đã đánh dấu'
            },
            {
              label: 'Danh sách theo dõi',
              value: statsOverview.activeWatchlist,
              icon: Bookmark,
              iconColor: '#2563EB',
              borderColor: '#2563EB',
              change: statsOverview.activeWatchlistChange,
              changeColor: '#059669',
              subtitle: 'đang giám sát'
            },
            {
              label: 'Báo cáo mở',
              value: statsOverview.openReports,
              icon: FileText,
              iconColor: '#64748B',
              borderColor: '#64748B',
              change: statsOverview.openReportsChange,
              changeColor: '#059669',
              subtitle: 'đang xử lý'
            },
            {
              label: 'Báo cáo đã xác minh',
              value: statsOverview.verifiedReports,
              icon: CheckCircle,
              iconColor: '#059669',
              borderColor: '#059669',
              change: statsOverview.verifiedReportsChange,
              changeColor: '#059669',
              subtitle: 'đã xác nhận'
            },
            {
              label: 'Cảnh báo hoạt động',
              value: statsOverview.activeAlerts,
              icon: Bell,
              iconColor: '#DC2626',
              borderColor: '#DC2626',
              change: statsOverview.activeAlertsChange,
              changeColor: '#DC2626',
              subtitle: 'hành động khẩn cấp'
            }
          ].map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <div
                key={idx}
                className="kpi-card"
                style={{
                  borderTop: `3px solid ${kpi.borderColor}`,
                  borderRadius: 16,
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  borderTopColor: kpi.borderColor,
                  borderTopWidth: 3,
                  boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)',
                  transition: 'all 200ms ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 1px 4px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="kpi-label">
                  <span>{kpi.label}</span>
                  <Icon size={16} color={kpi.iconColor} />
                </div>
                <div className="kpi-value">
                  <AnimatedCounter value={kpi.value} />
                </div>
                <div className="kpi-meta">
                  <span style={{ color: kpi.changeColor, fontWeight: 600 }}>
                    {kpi.change}
                  </span>
                  <span className="text-muted">{kpi.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Grid: Threats Table + Analytics Column */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: 24 }}>
          {/* Left Column: Recent Threats Table */}
          <div className="sec-card" style={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: 20,
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)'
          }}>
            <div className="sec-card-header" style={{ marginBottom: 18 }}>
              <div>
                <div className="sec-card-title" style={{ fontSize: 16, fontWeight: 700 }}>
                  <ShieldAlert size={18} color="#DC2626" />
                  <span>Chỉ số đe dọa gần đây</span>
                </div>
                <div style={{ fontSize: 12, color: '#64748B', marginTop: 3 }}>
                  Thực thể độc hại được xác minh bởi heuristics & báo cáo cộng đồng
                </div>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setCurrentView('scam-database')}
                style={{
                  color: '#2563EB',
                  fontWeight: 600,
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4
                }}
              >
                <span>Xem cơ sở dữ liệu</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="table-responsive" style={{ border: '1px solid #E2E8F0', borderRadius: 14, overflow: 'hidden' }}>
              <table className="sec-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: 'linear-gradient(to right, #F8FAFC, #F1F5F9)' }}>
                    <th style={{ padding: '12px 12px', fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Đối tượng</th>
                    <th style={{ padding: '12px 8px', fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Loại</th>
                    <th style={{ padding: '12px 8px', fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mức rủi ro</th>
                    <th style={{ padding: '12px 8px', fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mục tiêu</th>
                    <th style={{ padding: '12px 8px', fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Hoạt động</th>
                    <th style={{ padding: '12px 12px', fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {recentThreats.map((ent, idx) => (
                    <tr
                      key={ent.id}
                      style={{
                        background: idx % 2 === 0 ? '#FFFFFF' : '#FAFBFD',
                        borderBottom: '1px solid #F1F5F9',
                        transition: 'background 120ms ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#F0F7FF'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = idx % 2 === 0 ? '#FFFFFF' : '#FAFBFD'; }}
                    >
                      <td style={{ padding: '12px 12px' }}>
                        <div
                          className="table-entity-link"
                          onClick={() => navigateToEntity(ent.id)}
                          style={{ cursor: 'pointer', display: 'inline-flex' }}
                        >
                          <TechnicalMono value={ent.identifier} length={18} truncate canCopy={false} />
                        </div>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 600,
                            padding: '3px 8px',
                            borderRadius: 8,
                            background: '#F1F5F9',
                            color: '#475569',
                            textTransform: 'uppercase'
                          }}
                        >
                          {ent.type?.toUpperCase() === 'BANK' ? 'NGÂN HÀNG' : ent.type?.toUpperCase() === 'DOMAIN' ? 'TÊN MIỀN' : ent.type?.toUpperCase() === 'WALLET' ? 'VÍ' : ent.type?.toUpperCase() === 'PHONE' ? 'SĐT' : ent.type?.toUpperCase() === 'EMAIL' ? 'EMAIL' : ent.type?.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <RiskBadge score={ent.riskScore} size="sm" />
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{ fontSize: 12, fontWeight: 500, color: '#334155' }}>
                          {ent.targetBrand || '—'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{ fontSize: 11, color: '#64748B', whiteSpace: 'nowrap' }}>
                          {ent.lastSeen}
                        </span>
                      </td>
                      <td style={{ padding: '12px 12px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: 4 }}>
                          <button
                            className="btn btn-secondary btn-sm"
                            style={{
                              padding: '4px 10px',
                              fontSize: 11,
                              borderRadius: 8,
                              fontWeight: 600
                            }}
                            onClick={() => navigateToEntity(ent.id)}
                          >
                            Điều tra
                          </button>
                          <button
                            className="btn btn-ghost btn-sm"
                            style={{
                              padding: '4px 6px',
                              fontSize: 11,
                              borderRadius: 8,
                              color: ent.watchlist ? '#2563EB' : '#94A3B8'
                            }}
                            onClick={() => toggleWatchlist(ent.id)}
                            title={ent.watchlist ? 'Xoá khỏi danh sách' : 'Thêm vào danh sách'}
                          >
                            <Bookmark size={13} fill={ent.watchlist ? '#2563EB' : 'none'} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Charts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Risk Distribution */}
            <div className="sec-card" style={{
              borderRadius: 20,
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)'
            }}>
              <div className="sec-card-header" style={{ marginBottom: 12 }}>
                <div className="sec-card-title" style={{ fontSize: 15, fontWeight: 700 }}>
                  <Layers size={16} color="#2563EB" />
                  <span>Phân bố rủi ro</span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#2563EB',
                    background: 'rgba(37, 99, 235, 0.08)',
                    padding: '3px 10px',
                    borderRadius: 9999
                  }}
                >
                  {totalEntities} Đang hoạt động
                </span>
              </div>

              <DonutChart
                data={riskChartData}
                centerValue={totalEntities.toString()}
                centerLabel="Thực thể"
                height={170}
                innerRadius={50}
                outerRadius={70}
              />

              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginTop: 14 }}>
                {riskChartData.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: 12,
                      padding: '5px 10px',
                      borderRadius: 8,
                      background: '#F8FAFC'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color }} />
                      <span style={{ color: '#475569', fontWeight: 500 }}>{item.name}</span>
                    </span>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>
                      {item.value} <span style={{ fontWeight: 400, color: '#94A3B8', fontSize: 11 }}>({Math.round((item.value / totalEntities) * 100)}%)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detection Velocity */}
            <div className="sec-card" style={{
              borderRadius: 20,
              border: '1px solid #E2E8F0',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)'
            }}>
              <div className="sec-card-header" style={{ marginBottom: 8 }}>
                <div className="sec-card-title" style={{ fontSize: 15, fontWeight: 700 }}>
                  <TrendingUp size={16} color="#059669" />
                  <span>Tốc độ phát hiện</span>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: '#059669',
                    fontWeight: 700,
                    background: 'rgba(5, 150, 105, 0.08)',
                    padding: '3px 10px',
                    borderRadius: 9999
                  }}
                >
                  +18.4% 24h
                </span>
              </div>
              <div style={{ fontSize: 12, color: '#64748B', marginBottom: 12 }}>
                Giám sát trực tiếp hơn 8.400 đăng ký tên miền & giao dịch sổ cái mỗi giờ.
              </div>

              <AreaSparkline
                data={velocityData}
                dataKey="value"
                xAxisKey="time"
                height={75}
                strokeColor="#2563EB"
                fillColor="#2563EB"
                gradientId="dashVelocity"
              />
            </div>
          </div>
        </div>

        {/* Lower Row: Recent Reports + Active Security Alerts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 24 }}>
          {/* Recent Reports */}
          <div className="sec-card" style={{
            borderRadius: 20,
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)'
          }}>
            <div className="sec-card-header">
              <div className="sec-card-title" style={{ fontSize: 15, fontWeight: 700 }}>
                <FileText size={16} color="#2563EB" />
                <span>Báo cáo cộng đồng gần đây</span>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setCurrentView('reports')}
                style={{ color: '#2563EB', fontWeight: 600, fontSize: 12 }}
              >
                <span>Trung tâm báo cáo</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {reports.slice(0, 3).map((rep) => (
                <div
                  key={rep.id}
                  onClick={() => setCurrentView('reports')}
                  style={{
                    padding: '14px 16px',
                    background: '#FFFFFF',
                    borderRadius: 12,
                    border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 6,
                    borderLeft: '3px solid #2563EB',
                    transition: 'all 200ms ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.03)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: '#0F172A' }}>
                        {rep.id}
                      </span>
                      <span
                        style={{
                          fontSize: 10,
                          fontWeight: 600,
                          padding: '2px 6px',
                          borderRadius: 6,
                          background: '#F1F5F9',
                          color: '#475569'
                        }}
                      >
                        {rep.category}
                      </span>
                    </div>
                    <StatusBadge status={rep.status} />
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {rep.title}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748B', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Mục tiêu: <span className="mono" style={{ fontWeight: 600 }}>{rep.entityIdentifier}</span></span>
                    <span>{rep.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Security Alerts */}
          <div className="sec-card" style={{
            borderRadius: 20,
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 4px rgba(0, 0, 0, 0.04)'
          }}>
            <div className="sec-card-header">
              <div className="sec-card-title" style={{ fontSize: 15, fontWeight: 700 }}>
                <Bell size={16} color="#DC2626" />
                <span>Cảnh báo bảo mật khẩn cấp</span>
              </div>
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setCurrentView('alerts')}
                style={{ color: '#2563EB', fontWeight: 600, fontSize: 12 }}
              >
                <span>Trung tâm cảnh báo</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {alerts.slice(0, 3).map((alt) => {
                const isCritical = alt.severity === 'Critical';
                return (
                  <div
                    key={alt.id}
                    style={{
                      padding: '14px 16px',
                      background: '#FFFFFF',
                      borderRadius: 12,
                      border: '1px solid #E2E8F0',
                      borderLeft: `3px solid ${isCritical ? '#DC2626' : '#EA580C'}`,
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 6,
                      transition: 'all 200ms ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.03)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            color: isCritical ? '#DC2626' : '#D97706',
                            background: isCritical ? 'rgba(220, 38, 38, 0.08)' : 'rgba(217, 119, 6, 0.08)',
                            padding: '3px 10px',
                            borderRadius: 9999
                          }}
                        >
                          {isCritical ? 'NGHIÊM TRỌNG' : 'CẢNH BÁO'}
                        </span>
                        <span style={{ fontSize: 11, color: '#94A3B8' }}>{alt.timestamp}</span>
                      </div>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: 11, padding: '4px 12px', borderRadius: 8, fontWeight: 600 }}
                        onClick={() => navigateToEntity(alt.entityId)}
                      >
                        Điều tra
                      </button>
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#0F172A' }}>
                      {alt.title}
                    </div>
                    <div style={{ fontSize: 12, color: '#475569' }}>
                      {alt.reason}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
