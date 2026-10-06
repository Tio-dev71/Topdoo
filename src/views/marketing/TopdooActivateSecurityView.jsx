import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Check,
  ChevronRight,
  ArrowRight,
  Gem,
  Lock,
  CreditCard,
  Building2,
  FileText,
  Zap,
  Settings,
  Users,
  Headphones,
  Globe,
  MessageCircle,
  Phone,
  CheckCircle2,
  X,
  QrCode,
  Sparkles,
  Bug,
  Database,
  BarChart2
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooActivateSecurityView() {
  const { navigateMarketing, setMode, setCurrentView, showToast, activeSecurityPlan } = useSecurity();

  // State
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card', 'ewallet', 'bank', 'corporate'
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isActivating, setIsActivating] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);

  // Card form state
  const [cardData, setCardData] = useState({
    cardNumber: '4532 •••• •••• 8892',
    cardName: 'NGUYEN VAN A',
    expiry: '12/28',
    cvv: '•••'
  });

  const handleActivate = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      showToast('Thông báo', 'Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.', 'warning');
      return;
    }

    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      setIsSuccessModalOpen(true);
      showToast('Kích hoạt thành công', 'Hệ thống Topdoo Security AI đã được kích hoạt thành công!', 'success');
    }, 1200);
  };

  const handleGoToApp = () => {
    setIsSuccessModalOpen(false);
    setMode('app');
    setCurrentView('overview');
  };

  return (
    <div className="topdoo-landing topdoo-activate-security-page">
      {/* 1. Marketing Header */}
      <MarketingHeader />

      <main className="activate-main-content">
        <div className="landing-container">
          {/* Breadcrumbs */}
          <div className="get-protect-breadcrumbs">
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Trang chủ
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <button className="breadcrumb-link" onClick={() => navigateMarketing('topdoo-security')}>
              Topdoo Security
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <button className="breadcrumb-link" onClick={() => navigateMarketing('topdoo-get-protect')}>
              Bắt đầu bảo vệ ngay
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <button className="breadcrumb-link" onClick={() => navigateMarketing('topdoo-plan-security')}>
              Chọn gói
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Kích hoạt</span>
          </div>

          {/* Main 2-Column Grid */}
          <div className="activate-main-grid">
            {/* Left Column: Visual Art + 4 Features + Stats + Help */}
            <div className="activate-left-col">
              {/* Badge: TOPDOO SECURITY */}
              <div className="security-badge-pill">
                <div className="security-badge-icon-box">
                  <ShieldCheck size={14} color="#059669" />
                </div>
                <span>TOPDOO SECURITY</span>
              </div>

              {/* Hero Title */}
              <h1 className="activate-hero-title">
                Kích hoạt Topdoo Security <br />
                <span className="security-title-emerald">Chỉ còn một bước nữa!</span>
              </h1>

              {/* Description */}
              <p className="activate-hero-desc">
                Bạn đã chọn gói <strong>{activeSecurityPlan?.name?.replace('Topdoo Security ', '') || 'Pro'}</strong>. Hãy hoàn tất kích hoạt để bắt đầu bảo vệ dữ liệu, tài khoản và hoạt động trực tuyến ngay hôm nay.
              </p>

              {/* Stepper (Tạo tài khoản -> Chọn gói -> Kích hoạt) */}
              <div className="activate-stepper">
                <div
                  className="step-node completed"
                  onClick={() => navigateMarketing('topdoo-get-protect')}
                  style={{ cursor: 'pointer' }}
                  title="Quay lại tạo tài khoản"
                >
                  <div className="step-circle step-circle-completed">
                    <Check size={13} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span className="step-label">Tạo tài khoản</span>
                </div>

                <div className="step-line step-line-active" />

                <div
                  className="step-node completed"
                  onClick={() => navigateMarketing('topdoo-plan-security')}
                  style={{ cursor: 'pointer' }}
                  title="Quay lại chọn gói"
                >
                  <div className="step-circle step-circle-completed">
                    <Check size={13} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span className="step-label">Chọn gói</span>
                </div>

                <div className="step-line step-line-active" />

                <div className="step-node active">
                  <div className="step-circle step-circle-active">3</div>
                  <span className="step-label active-label">Kích hoạt</span>
                </div>
              </div>

              {/* 3D Art Card with Mascot Artwork */}
              <div className="activate-art-card">
                <img
                  src="/bannerSecurityRobotShield.png"
                  alt="Topdoo Security Activation Art"
                  className="activate-art-img"
                />

                {/* 4 Floating Badges around the Shield & Mascot */}
                {/* 1. Top Right: An toàn hơn mỗi ngày */}
                <div className="activate-float-badge float-badge-lock">
                  <div className="activate-float-icon icon-solid-green">
                    <Lock size={15} color="#FFFFFF" strokeWidth={2.5} />
                  </div>
                  <div className="activate-float-text">
                    <span>An toàn hơn</span>
                    <span>mỗi ngày</span>
                  </div>
                </div>

                {/* 2. Middle Right: Dữ liệu được bảo vệ */}
                <div className="activate-float-badge float-badge-data">
                  <div className="activate-float-icon icon-soft-green">
                    <Database size={16} color="#059669" strokeWidth={2.2} />
                  </div>
                  <div className="activate-float-text">
                    <span>Dữ liệu được</span>
                    <span>bảo vệ</span>
                  </div>
                </div>

                {/* 3. Top Left: Không còn mối đe dọa */}
                <div className="activate-float-badge float-badge-threat">
                  <div className="activate-float-icon icon-soft-green">
                    <Bug size={16} color="#059669" strokeWidth={2.2} />
                  </div>
                  <div className="activate-float-text">
                    <span>Không còn</span>
                    <span>mối đe dọa</span>
                  </div>
                </div>

                {/* 4. Bottom Left: Tự động giám sát 24/7 */}
                <div className="activate-float-badge float-badge-chart">
                  <div className="activate-float-icon icon-soft-green">
                    <BarChart2 size={16} color="#059669" strokeWidth={2.2} />
                  </div>
                  <div className="activate-float-text">
                    <span>Tự động giám sát</span>
                    <span>24/7</span>
                  </div>
                </div>

                {/* Handwritten Cursive Script Slogan Bottom Right */}
                <div className="activate-script-slogan">
                  <span>Your Security</span>
                  <span>Our Priority</span>
                </div>
              </div>

              {/* 4 Feature Highlights Grid */}
              <div className="activate-features-quad-grid">
                <div className="activate-feature-box">
                  <div className="feature-icon-circle">
                    <Zap size={20} color="#059669" />
                  </div>
                  <div className="feature-info">
                    <div className="feature-name">Kích hoạt nhanh</div>
                    <div className="feature-sub">Chỉ trong 1 phút</div>
                  </div>
                </div>

                <div className="activate-feature-box">
                  <div className="feature-icon-circle">
                    <ShieldCheck size={20} color="#059669" />
                  </div>
                  <div className="feature-info">
                    <div className="feature-name">Bảo vệ toàn diện</div>
                    <div className="feature-sub">Dữ liệu, tài khoản, thiết bị</div>
                  </div>
                </div>

                <div className="activate-feature-box">
                  <div className="feature-icon-circle">
                    <Settings size={20} color="#059669" />
                  </div>
                  <div className="feature-info">
                    <div className="feature-name">Tự động hoạt động</div>
                    <div className="feature-sub">Giám sát 24/7 không cần cấu hình</div>
                  </div>
                </div>

                <div className="activate-feature-box">
                  <div className="feature-icon-circle">
                    <Users size={20} color="#059669" />
                  </div>
                  <div className="feature-info">
                    <div className="feature-name">Đội ngũ hỗ trợ</div>
                    <div className="feature-sub">Luôn sẵn sàng đồng hành cùng bạn</div>
                  </div>
                </div>
              </div>

              {/* Stats Bar */}
              <div className="activate-stats-bar">
                <div className="activate-stat-item">
                  <div className="activate-stat-icon">
                    <Users size={18} color="#0284C7" />
                  </div>
                  <div className="activate-stat-info">
                    <div className="stat-val">10.000+</div>
                    <div className="stat-lbl">Người dùng tin tưởng</div>
                  </div>
                </div>

                <div className="activate-stat-item">
                  <div className="activate-stat-icon">
                    <ShieldCheck size={18} color="#0284C7" />
                  </div>
                  <div className="activate-stat-info">
                    <div className="stat-val">99.9%</div>
                    <div className="stat-lbl">Tỷ lệ phát hiện mối đe dọa</div>
                  </div>
                </div>

                <div className="activate-stat-item">
                  <div className="activate-stat-icon">
                    <Headphones size={18} color="#0284C7" />
                  </div>
                  <div className="activate-stat-info">
                    <div className="stat-val">24/7</div>
                    <div className="stat-lbl">Hỗ trợ toàn cầu</div>
                  </div>
                </div>

                <div className="activate-stat-item">
                  <div className="activate-stat-icon">
                    <Globe size={18} color="#0284C7" />
                  </div>
                  <div className="activate-stat-info">
                    <div className="stat-val">50+</div>
                    <div className="stat-lbl">Quốc gia và vùng lãnh thổ</div>
                  </div>
                </div>
              </div>

              {/* Need Help / Support Strip */}
              <div className="activate-support-strip">
                <div className="support-strip-left">
                  <div className="support-strip-icon-box">
                    <MessageCircle size={22} color="#0284C7" />
                  </div>
                  <div>
                    <h4 className="support-strip-title">Cần hỗ trợ?</h4>
                    <p className="support-strip-desc">
                      Đội ngũ chuyên gia Topdoo luôn sẵn sàng giúp bạn kích hoạt và sử dụng dịch vụ.
                    </p>
                  </div>
                </div>

                <div className="support-strip-actions">
                  <button
                    type="button"
                    className="btn-support-chat"
                    onClick={() => setIsSupportModalOpen(true)}
                  >
                    <MessageCircle size={15} />
                    <span>Chat với chuyên gia</span>
                  </button>

                  <a
                    href="tel:19001234"
                    className="btn-support-phone"
                    onClick={(e) => {
                      e.preventDefault();
                      showToast('Tổng đài hỗ trợ', 'Đang kết nối đến hotline 1900 1234...', 'info');
                    }}
                  >
                    <Phone size={15} />
                    <span>1900 1234</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Checkout & Payment Card */}
            <div className="activate-right-col">
              <div className="activate-checkout-card">
                {/* 1. Thông tin gói dịch vụ */}
                <div className="checkout-section">
                  <h3 className="checkout-section-title">Thông tin gói dịch vụ</h3>

                  <div className="checkout-plan-box">
                    <div className="plan-box-left">
                      <div className="plan-box-gem-icon">
                        <Gem size={22} color="#059669" />
                      </div>
                      <div className="plan-box-info">
                        <div className="plan-box-header">
                          <h4 className="plan-box-name">{activeSecurityPlan?.name || 'Topdoo Security Pro'}</h4>
                          <span className="plan-box-badge">{activeSecurityPlan?.badge || 'Đã chọn'}</span>
                        </div>
                        <p className="plan-box-desc">
                          {activeSecurityPlan?.subtitle || 'Bảo vệ toàn diện cho cá nhân và đội nhóm nhỏ'}
                        </p>
                      </div>
                    </div>

                    <div className="plan-box-price-row">
                      <div className="plan-box-price">
                        {activeSecurityPlan?.price || '299.000đ/tháng'}
                      </div>
                      <button
                        type="button"
                        className="btn-change-plan-link"
                        onClick={() => navigateMarketing('topdoo-plan-security')}
                      >
                        <span>Thay đổi gói</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. Phương thức thanh toán */}
                <div className="checkout-section">
                  <h3 className="checkout-section-title">Phương thức thanh toán</h3>

                  <div className="payment-options-list">
                    {/* Option 1: Thẻ tín dụng / Ghi nợ */}
                    <label
                      className={`payment-option-item ${paymentMethod === 'card' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('card')}
                    >
                      <div className="payment-radio-wrap">
                        <input
                          type="radio"
                          name="payment"
                          value="card"
                          checked={paymentMethod === 'card'}
                          onChange={() => setPaymentMethod('card')}
                        />
                        <span className="payment-label-text">Thẻ tín dụng / Ghi nợ</span>
                      </div>

                      <div className="payment-brand-logos">
                        {/* VISA */}
                        <span className="brand-logo-visa">VISA</span>
                        {/* MasterCard */}
                        <span className="brand-logo-mastercard">
                          <span className="circle-red" />
                          <span className="circle-orange" />
                        </span>
                        {/* JCB */}
                        <span className="brand-logo-jcb">JCB</span>
                      </div>
                    </label>

                    {/* Option 2: Ví điện tử */}
                    <label
                      className={`payment-option-item ${paymentMethod === 'ewallet' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('ewallet')}
                    >
                      <div className="payment-radio-wrap">
                        <input
                          type="radio"
                          name="payment"
                          value="ewallet"
                          checked={paymentMethod === 'ewallet'}
                          onChange={() => setPaymentMethod('ewallet')}
                        />
                        <span className="payment-label-text">Ví điện tử</span>
                      </div>

                      <div className="payment-brand-logos">
                        <span className="brand-logo-momo">MoMo</span>
                        <span className="brand-logo-zalopay">ZaloPay</span>
                      </div>
                    </label>

                    {/* Option 3: Chuyển khoản ngân hàng */}
                    <label
                      className={`payment-option-item ${paymentMethod === 'bank' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <div className="payment-radio-wrap">
                        <input
                          type="radio"
                          name="payment"
                          value="bank"
                          checked={paymentMethod === 'bank'}
                          onChange={() => setPaymentMethod('bank')}
                        />
                        <span className="payment-label-text">Chuyển khoản ngân hàng</span>
                      </div>

                      <div className="payment-brand-logos">
                        <Building2 size={18} color="#059669" />
                      </div>
                    </label>

                    {/* Option 4: Thanh toán doanh nghiệp (Hóa đơn VAT) */}
                    <label
                      className={`payment-option-item ${paymentMethod === 'corporate' ? 'selected' : ''}`}
                      onClick={() => setPaymentMethod('corporate')}
                    >
                      <div className="payment-radio-wrap">
                        <input
                          type="radio"
                          name="payment"
                          value="corporate"
                          checked={paymentMethod === 'corporate'}
                          onChange={() => setPaymentMethod('corporate')}
                        />
                        <span className="payment-label-text">Thanh toán doanh nghiệp (Hóa đơn VAT)</span>
                      </div>

                      <div className="payment-brand-logos">
                        <FileText size={18} color="#059669" />
                      </div>
                    </label>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <label className="checkout-checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="field-checkbox"
                  />
                  <span>
                    Tôi đồng ý với{' '}
                    <a
                      href="#terms"
                      onClick={(e) => {
                        e.preventDefault();
                        showToast('Điều khoản', 'Điều khoản dịch vụ tiêu chuẩn của Topdoo.', 'info');
                      }}
                      className="link-terms"
                    >
                      Điều khoản dịch vụ
                    </a>{' '}
                    và{' '}
                    <a
                      href="#privacy"
                      onClick={(e) => {
                        e.preventDefault();
                        showToast('Chính sách', 'Chính sách bảo mật thông tin chuẩn quốc tế.', 'info');
                      }}
                      className="link-terms"
                    >
                      Chính sách bảo mật
                    </a>{' '}
                    của Topdoo.
                  </span>
                </label>

                {/* Submit Activation Button */}
                <button
                  type="button"
                  className="btn-checkout-activate"
                  disabled={isActivating}
                  onClick={handleActivate}
                >
                  <Lock size={16} />
                  <span>{isActivating ? 'Đang kích hoạt hệ thống...' : 'Kích hoạt ngay'}</span>
                  <ArrowRight size={16} />
                </button>

                {/* SSL Guarantee Seal */}
                <div className="checkout-ssl-seal">
                  <Lock size={13} color="#6B7280" />
                  <span>Thanh toán an toàn – Mã hóa SSL 256-bit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Success Activation Modal */}
      {isSuccessModalOpen && (
        <div className="plan-modal-overlay">
          <div className="plan-modal-dialog">
            <div className="modal-header-icon-box">
              <CheckCircle2 size={46} color="#059669" />
            </div>

            <h3 className="modal-title">Kích hoạt thành công!</h3>
            <p className="modal-desc">
              Gói <strong>{activeSecurityPlan?.name || 'Topdoo Security Pro'}</strong> đã được kích hoạt. Toàn bộ tính năng bảo vệ AI, tường lửa đám mây và hệ thống giám sát 24/7 đã sẵn sàng.
            </p>

            <div className="modal-features-preview">
              <div className="modal-features-label">Trạng thái bảo vệ:</div>
              <ul className="modal-features-list">
                <li><Check size={14} color="#059669" strokeWidth={3} /> <span>Hệ thống bảo vệ AI: Đang hoạt động</span></li>
                <li><Check size={14} color="#059669" strokeWidth={3} /> <span>Giám sát URL & Mã độc: Thời gian thực</span></li>
                <li><Check size={14} color="#059669" strokeWidth={3} /> <span>Hỗ trợ kỹ thuật: Ưu tiên 24/7</span></li>
              </ul>
            </div>

            <button
              type="button"
              className="btn-modal-confirm"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleGoToApp}
            >
              <span>Vào Security Console ngay</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Support Chat Modal */}
      {isSupportModalOpen && (
        <div className="plan-modal-overlay" onClick={() => setIsSupportModalOpen(false)}>
          <div className="plan-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsSupportModalOpen(false)}
            >
              <X size={18} />
            </button>

            <div className="modal-header-icon-box">
              <MessageCircle size={40} color="#059669" />
            </div>

            <h3 className="modal-title">Hỗ trợ kích hoạt Topdoo Security</h3>
            <p className="modal-desc">
              Chuyên viên bảo mật luôn sẵn sàng hỗ trợ bạn thanh toán, kích hoạt và cấu hình hệ thống.
            </p>

            <div className="modal-actions-row">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setIsSupportModalOpen(false)}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn-modal-confirm"
                onClick={() => {
                  showToast('Đang kết nối', 'Đang mở cửa sổ live chat hỗ trợ...', 'success');
                  setIsSupportModalOpen(false);
                }}
              >
                <span>Bắt đầu trò chuyện</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <MarketingFooter />
    </div>
  );
}
