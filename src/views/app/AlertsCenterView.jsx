import React, { useState } from 'react';
import {
  Bell,
  CheckCircle,
  XCircle,
  VolumeX,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Filter,
  Info,
  AlertTriangle,
  Radio,
  Check
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { TechnicalMono } from '../../components/common/TechnicalMono';
import { PageTransition } from '../../components/common/PageTransition';

export function AlertsCenterView() {
  const { alerts, resolveAlert, navigateToEntity, showToast } = useSecurity();

  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [selectedAlert, setSelectedAlert] = useState(() => alerts[0]);

  const filteredAlerts = alerts.filter(a => {
    if (filterSeverity === 'ALL') return true;
    return a.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  const handleMute = (alertId) => {
    showToast('Alert Muted', `Notification category silenced for alert ${alertId}.`, 'info');
  };

  const handleResolve = (alertId) => {
    resolveAlert(alertId);
    showToast('Alert Resolved', `Incident ${alertId} marked as addressed.`, 'success');
  };

  const criticalCount = alerts.filter(a => a.severity === 'Critical').length;
  const highCount = alerts.filter(a => a.severity === 'High').length;

  return (
    <PageTransition>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1200, margin: '0 auto', paddingBottom: 40 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 999, marginBottom: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2563EB' }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#1D4ED8' }}>Phân loại Sự cố & Điều phối Cảnh báo An ninh</span>
            </div>
            <h1 className="heading-xl">Trung tâm Cảnh báo An ninh</h1>
            <p className="subheading" style={{ marginTop: 4, maxWidth: 840 }}>
              Ưu tiên xử lý các sự cố lừa đảo nghiêm trọng, website mạo danh ngân hàng / VNeID / thuế, số tài khoản lừa đảo mới phát sinh và các chiến dịch mã độc nguy hiểm.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', label: 'Tất cả cảnh báo', count: alerts.length },
            { id: 'Critical', label: 'Mức Nghiêm trọng', count: criticalCount },
            { id: 'High', label: 'Ưu tiên cao', count: highCount },
            { id: 'Medium', label: 'Mức Trung bình', count: alerts.filter(a => a.severity === 'Medium').length }
          ].map(tab => {
            const isActive = filterSeverity.toLowerCase() === tab.id.toLowerCase();
            return (
              <button
                key={tab.id}
                onClick={() => setFilterSeverity(tab.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '7px 14px',
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
                <span>{tab.label}</span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: 10,
                  background: isActive ? '#2563EB' : '#F1F5F9',
                  color: isActive ? '#FFFFFF' : '#64748B'
                }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Two-Column Grid: Alerts List on Left, Detail on Right */}
        <div className="secops-split-grid">
          {/* Left Column: Alerts List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filteredAlerts.length === 0 ? (
              <div style={{ background: '#FFFFFF', padding: 36, borderRadius: 14, border: '1px solid #E2E8F0', textAlign: 'center', color: '#64748B' }}>
                <Bell size={32} color="#94A3B8" style={{ margin: '0 auto 8px' }} />
                <div style={{ fontWeight: 600, fontSize: 14, color: '#0F172A' }}>Không có cảnh báo trong danh mục này</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>Tất cả các vector đe dọa hiện đều nằm trong ngưỡng kiểm soát an toàn.</div>
              </div>
            ) : (
              filteredAlerts.map(alert => {
                const isSelected = selectedAlert?.id === alert.id;
                const isCritical = alert.severity === 'Critical';
                const isHigh = alert.severity === 'High';

                const badgeBg = isCritical ? '#FEF2F2' : (isHigh ? '#FFF7ED' : '#FEFCE8');
                const badgeColor = isCritical ? '#DC2626' : (isHigh ? '#C2410C' : '#A16207');
                const badgeBorder = isCritical ? '#FECACA' : (isHigh ? '#FFEDD5' : '#FEF08A');

                return (
                  <div
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    style={{
                      padding: 16,
                      borderRadius: 12,
                      background: '#FFFFFF',
                      border: `1.5px solid ${isSelected ? '#2563EB' : '#E2E8F0'}`,
                      borderLeft: isSelected ? '5px solid #2563EB' : `1.5px solid #E2E8F0`,
                      boxShadow: isSelected ? '0 4px 12px rgba(37, 99, 235, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 4,
                          background: badgeBg,
                          color: badgeColor,
                          border: `1px solid ${badgeBorder}`
                        }}>
                          {isCritical ? 'NGHIÊM TRỌNG' : isHigh ? 'ƯU TIÊN CAO' : 'TRUNG BÌNH'}
                        </span>
                        <span className="mono" style={{ fontSize: 12, color: '#64748B', fontWeight: 600 }}>
                          {alert.id}
                        </span>
                      </div>
                      <span style={{ fontSize: 11.5, color: '#64748B' }}>{alert.timestamp}</span>
                    </div>

                    <div style={{ fontWeight: 700, fontSize: 14, color: '#0F172A', lineHeight: 1.4 }}>
                      {alert.title}
                    </div>

                    <div style={{ fontSize: 12, color: '#475569', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>Mục tiêu:</span>
                      <TechnicalMono value={alert.entityIdentifier} length={20} truncate canCopy={false} />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Alert Detail Inspector */}
          {selectedAlert ? (
            <div className="secops-detail-panel" style={{
              background: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E2E8F0',
              padding: 24,
              boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              position: 'sticky',
              top: 80,
              display: 'flex',
              flexDirection: 'column',
              gap: 20
            }}>
              {/* Header */}
              <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{
                    fontSize: 11.5,
                    fontWeight: 800,
                    padding: '3px 10px',
                    borderRadius: 999,
                    background: selectedAlert.severity === 'Critical' ? '#FEF2F2' : '#FFF7ED',
                    color: selectedAlert.severity === 'Critical' ? '#DC2626' : '#C2410C',
                    border: `1px solid ${selectedAlert.severity === 'Critical' ? '#FECACA' : '#FFEDD5'}`
                  }}>
                    {selectedAlert.severity === 'Critical' ? 'CẢNH BÁO KHẨN CẤP' : 'CẢNH BÁO AN NINH'} • {selectedAlert.category}
                  </span>
                  <span style={{ fontSize: 12, color: '#64748B' }}>{selectedAlert.timestamp}</span>
                </div>

                <h2 style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', lineHeight: 1.4 }}>
                  {selectedAlert.title}
                </h2>
              </div>

              {/* Structured Root-Cause Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                    Nguyên nhân Kích hoạt Sự cố
                  </div>
                  <div style={{ fontSize: 13, color: '#1E293B', lineHeight: 1.6 }}>
                    {selectedAlert.reason}
                  </div>
                </div>

                <div style={{ background: '#F8FAFC', padding: 14, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>
                    Tác động An ninh & Vận hành
                  </div>
                  <div style={{ fontSize: 13, color: '#334155', lineHeight: 1.6 }}>
                    {selectedAlert.details}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 6 }}>
                    Hạ tầng / Đối tượng Vi phạm Mục tiêu
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: 12, borderRadius: 10, border: '1px solid #E2E8F0' }}>
                    <TechnicalMono value={selectedAlert.entityIdentifier} />
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => navigateToEntity(selectedAlert.entityId)}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                    >
                      <span>Xem hồ sơ</span>
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => handleMute(selectedAlert.id)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#64748B' }}
                >
                  <VolumeX size={14} />
                  <span>Tạm tắt phân loại này</span>
                </button>

                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleResolve(selectedAlert.id)}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                  >
                    <CheckCircle size={14} />
                    <span>Đánh dấu đã xử lý</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: '#FFFFFF', padding: 36, borderRadius: 16, border: '1px solid #E2E8F0', textAlign: 'center', color: '#64748B' }}>
              Chọn một cảnh báo từ danh sách bên trái để kiểm tra chi tiết nguyên nhân sự cố.
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
