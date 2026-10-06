import React, { useState } from 'react';
import {
  X,
  Coins,
  Sparkles,
  Zap,
  Shield,
  Crown,
  CheckCircle2,
  ArrowUpRight,
  TrendingDown,
  History,
  CreditCard,
  Layers,
  ChevronRight
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export function CreditModal() {
  const {
    isCreditModalOpen,
    closeCreditModal,
    creditBalance,
    creditTransactions,
    addCredits,
    activeSubscription,
    user,
    userRole,
    ROLES,
    getRoleMeta,
    showToast
  } = useSecurity();

  const [selectedPackage, setSelectedPackage] = useState('pack-2'); // default to popular pack
  const [customAmount, setCustomAmount] = useState('');
  const [activeTab, setActiveTab] = useState('packages'); // 'packages' | 'history'
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCreditModalOpen) return null;

  const packages = [
    {
      id: 'pack-1',
      name: 'Gói Trải Nghiệm',
      credits: 5000,
      price: '49.000đ',
      priceNum: 49000,
      badge: 'Cơ bản',
      desc: 'Khoảng 100 truy vấn AI hoặc 10 lần sinh giọng Voicebox.',
      color: '#3B82F6',
      bgGrad: 'linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0.02) 100%)'
    },
    {
      id: 'pack-2',
      name: 'Gói Tiêu Chuẩn',
      credits: 20000,
      price: '179.000đ',
      priceNum: 179000,
      badge: 'Phổ biến nhất 🔥',
      popular: true,
      desc: 'Tiết kiệm 20%. Đầy đủ quyền truy cập các model AI cao cấp.',
      color: '#F59E0B',
      bgGrad: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(217, 119, 6, 0.03) 100%)'
    },
    {
      id: 'pack-3',
      name: 'Gói Sáng Tạo Pro',
      credits: 50000,
      price: '399.000đ',
      priceNum: 399000,
      badge: 'Tiết kiệm 35%',
      desc: 'Tối ưu cho Creator & Developer thực hiện nhiều dự án liên tục.',
      color: '#8B5CF6',
      bgGrad: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.02) 100%)'
    },
    {
      id: 'pack-4',
      name: 'Gói Doanh Nghiệp',
      credits: 200000,
      price: '1.290.000đ',
      priceNum: 1290000,
      badge: 'Giá sỉ tốt nhất',
      desc: 'Băng thông ưu tiên cao nhất, hỗ trợ clone voice và sinh video lớn.',
      color: '#10B981',
      bgGrad: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.02) 100%)'
    }
  ];

  const handleConfirmTopUp = () => {
    setIsProcessing(true);
    let amountToAdd = 0;
    let packName = '';

    if (customAmount && parseInt(customAmount, 10) > 0) {
      amountToAdd = parseInt(customAmount, 10);
      packName = `Nạp tùy chỉnh +${amountToAdd.toLocaleString()} credits`;
    } else {
      const pkg = packages.find(p => p.id === selectedPackage);
      if (pkg) {
        amountToAdd = pkg.credits;
        packName = `${pkg.name} (+${pkg.credits.toLocaleString()} credits)`;
      }
    }

    if (amountToAdd <= 0) {
      showToast('Cảnh báo', 'Vui lòng chọn hoặc nhập số credit hợp lệ.', 'warning');
      setIsProcessing(false);
      return;
    }

    setTimeout(() => {
      addCredits(amountToAdd, packName);
      setIsProcessing(false);
      closeCreditModal();
    }, 400);
  };

  const roleMeta = getRoleMeta ? getRoleMeta(userRole) : { label: 'Người dùng', badgeBg: '#EFF6FF', badgeColor: '#2563EB' };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCreditModal();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 640,
          maxHeight: '90vh',
          backgroundColor: '#FFFFFF',
          borderRadius: 24,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          border: '1px solid #E2E8F0',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          animation: 'creditModalFadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #F1F5F9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(to right, #FAF5FF, #F0FDF4)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(245, 158, 11, 0.35)'
              }}
            >
              <Coins size={22} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0F172A' }}>
                Quản lý AI Credits
              </h3>
              <p style={{ margin: '2px 0 0', fontSize: 13, color: '#64748B' }}>
                Nạp thêm năng lượng để sáng tạo không giới hạn cùng Topdoo
              </p>
            </div>
          </div>

          <button
            onClick={closeCreditModal}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: 'none',
              background: '#F1F5F9',
              color: '#64748B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
            aria-label="Đóng"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {/* User & Balance Showcase Card */}
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 18,
              background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 20,
              boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.3)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 500 }}>Số dư khả dụng</span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 12,
                    background: 'rgba(255, 255, 255, 0.12)',
                    color: '#38BDF8'
                  }}
                >
                  {roleMeta.label || 'Thành viên'}
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 12,
                    background: activeSubscription === 'enterprise' ? '#10B981' : (activeSubscription === 'pro' ? '#8B5CF6' : '#64748B'),
                    color: '#FFFFFF'
                  }}
                >
                  Gói {activeSubscription?.toUpperCase() || 'FREE'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 32, fontWeight: 900, color: '#FBBF24', letterSpacing: '-0.02em' }}>
                  {creditBalance !== undefined ? creditBalance.toLocaleString() : '0'}
                </span>
                <span style={{ fontSize: 16, fontWeight: 700, color: '#FCD34D' }}>cr</span>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 4 }}>Tài khoản</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#F8FAFC', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.fullName || user?.email || 'Khách trải nghiệm'}
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div
            style={{
              display: 'flex',
              gap: 8,
              borderBottom: '1px solid #E2E8F0',
              marginBottom: 18,
              paddingBottom: 4
            }}
          >
            <button
              onClick={() => setActiveTab('packages')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 10,
                border: 'none',
                background: activeTab === 'packages' ? '#EFF6FF' : 'transparent',
                color: activeTab === 'packages' ? '#2563EB' : '#64748B',
                fontWeight: activeTab === 'packages' ? 700 : 500,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              <Zap size={14} />
              <span>Gói Nạp Credit</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 14px',
                borderRadius: 10,
                border: 'none',
                background: activeTab === 'history' ? '#EFF6FF' : 'transparent',
                color: activeTab === 'history' ? '#2563EB' : '#64748B',
                fontWeight: activeTab === 'history' ? 700 : 500,
                fontSize: 13,
                cursor: 'pointer'
              }}
            >
              <History size={14} />
              <span>Lịch Sử Giao Dịch</span>
            </button>
          </div>

          {activeTab === 'packages' ? (
            <>
              {/* Packages Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: 12,
                  marginBottom: 16
                }}
              >
                {packages.map((pkg) => {
                  const isSelected = selectedPackage === pkg.id && !customAmount;
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => {
                        setSelectedPackage(pkg.id);
                        setCustomAmount('');
                      }}
                      style={{
                        padding: '16px',
                        borderRadius: 16,
                        border: isSelected ? `2px solid ${pkg.color}` : '1.5px solid #E2E8F0',
                        background: isSelected ? pkg.bgGrad : '#FFFFFF',
                        cursor: 'pointer',
                        position: 'relative',
                        transition: 'all 0.15s ease',
                        boxShadow: isSelected ? `0 6px 18px -4px ${pkg.color}35` : 'none'
                      }}
                    >
                      {pkg.popular && (
                        <span
                          style={{
                            position: 'absolute',
                            top: -9,
                            right: 14,
                            background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
                            color: '#FFFFFF',
                            fontSize: 10,
                            fontWeight: 800,
                            padding: '2px 8px',
                            borderRadius: 12,
                            boxShadow: '0 2px 6px rgba(245, 158, 11, 0.4)'
                          }}
                        >
                          PHỔ BIẾN
                        </span>
                      )}

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>{pkg.name}</span>
                        <div
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            border: isSelected ? `5px solid ${pkg.color}` : '2px solid #CBD5E1',
                            background: '#FFFFFF'
                          }}
                        />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
                        <span style={{ fontSize: 22, fontWeight: 800, color: pkg.color }}>
                          +{pkg.credits.toLocaleString()}
                        </span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#64748B' }}>credits</span>
                      </div>

                      <div style={{ fontSize: 15, fontWeight: 800, color: '#0F172A', marginBottom: 6 }}>
                        {pkg.price}
                      </div>

                      <div style={{ fontSize: 12, color: '#64748B', lineHeight: 1.4 }}>
                        {pkg.desc}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Amount Field */}
              <div
                style={{
                  padding: '14px 16px',
                  borderRadius: 14,
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  marginBottom: 16
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 6 }}>
                  Hoặc nạp số lượng credit tùy chỉnh:
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="number"
                    placeholder="Ví dụ: 15000, 30000, 100000..."
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedPackage(null);
                    }}
                    style={{
                      flex: 1,
                      padding: '8px 14px',
                      borderRadius: 10,
                      border: '1.5px solid #CBD5E1',
                      fontSize: 14,
                      outline: 'none',
                      background: '#FFFFFF'
                    }}
                  />
                  {customAmount && (
                    <button
                      onClick={() => setCustomAmount('')}
                      style={{
                        padding: '8px 12px',
                        background: '#E2E8F0',
                        border: 'none',
                        borderRadius: 10,
                        fontSize: 12,
                        cursor: 'pointer',
                        color: '#475569'
                      }}
                    >
                      Xóa
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* Transaction History Tab */
            <div style={{ minHeight: 240 }}>
              {(!creditTransactions || creditTransactions.length === 0) ? (
                <div style={{ textAlign: 'center', padding: '40px 10px', color: '#94A3B8' }}>
                  <History size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
                  <div style={{ fontSize: 14, fontWeight: 600 }}>Chưa có giao dịch nào</div>
                  <div style={{ fontSize: 12 }}>Các lượt sử dụng hoặc nạp credit sẽ hiển thị tại đây.</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {creditTransactions.slice(0, 10).map((tx, idx) => {
                    const isTopUp = tx.type === 'TOP_UP' || tx.type === 'REFUND' || (tx.amount > 0 && !tx.type?.includes('DEDUCT'));
                    return (
                      <div
                        key={tx.id || idx}
                        style={{
                          padding: '12px 14px',
                          borderRadius: 12,
                          background: '#F8FAFC',
                          border: '1px solid #E2E8F0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              background: isTopUp ? 'rgba(16, 185, 129, 0.12)' : 'rgba(239, 68, 68, 0.12)',
                              color: isTopUp ? '#10B981' : '#EF4444',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                            }}
                          >
                            {isTopUp ? <ArrowUpRight size={16} /> : <TrendingDown size={16} />}
                          </div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                              {tx.description || tx.type}
                            </div>
                            <div style={{ fontSize: 11, color: '#94A3B8' }}>
                              {tx.timestamp || 'Gần đây'}
                            </div>
                          </div>
                        </div>

                        <div
                          style={{
                            fontSize: 14,
                            fontWeight: 800,
                            color: isTopUp ? '#10B981' : '#EF4444'
                          }}
                        >
                          {isTopUp ? '+' : '-'}{Math.abs(tx.amount || 0).toLocaleString()} cr
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: '16px 24px',
            borderTop: '1px solid #F1F5F9',
            background: '#F8FAFC',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12
          }}
        >
          <div style={{ fontSize: 12, color: '#64748B' }}>
            🔒 Thanh toán bảo mật qua QR VNPAY / Momo / Thẻ tín dụng
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={closeCreditModal}
              style={{
                padding: '10px 18px',
                borderRadius: 12,
                border: '1.5px solid #CBD5E1',
                background: '#FFFFFF',
                color: '#475569',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Để sau
            </button>

            <button
              onClick={handleConfirmTopUp}
              disabled={isProcessing}
              style={{
                padding: '10px 22px',
                borderRadius: 12,
                border: 'none',
                background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                boxShadow: '0 4px 14px rgba(37, 99, 235, 0.35)',
                opacity: isProcessing ? 0.7 : 1
              }}
            >
              <Zap size={15} />
              <span>{isProcessing ? 'Đang kích hoạt...' : 'Nạp Credit Ngay'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
