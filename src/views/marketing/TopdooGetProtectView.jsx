import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Lock,
  Globe,
  Users,
  BarChart3,
  Check,
  ArrowRight,
  ChevronRight,
  User,
  Mail,
  Phone,
  Eye,
  EyeOff,
  Headphones,
  Zap,
  Settings,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooGetProtectView() {
  const { navigateMarketing, setMode, setCurrentView, showToast, user } = useSecurity();

  // Form state
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    password: '',
    agreeTerms: true
  });
  const [showPassword, setShowPassword] = useState(false);
  // Nếu đã đăng nhập thì tự động chuyển sang Bước 2: Chọn gói bảo vệ
  const [currentStep, setCurrentStep] = useState(user ? 2 : 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('free'); // 'free' or 'pro'

  // Đồng bộ khi user thay đổi
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: prev.fullName || user.fullName || '',
        email: prev.email || user.email || ''
      }));
      if (currentStep === 1) {
        setCurrentStep(2);
      }
    }
  }, [user]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
      showToast('Thông báo', 'Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.', 'warning');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Thành công', 'Tạo tài khoản thành công! Đang chuyển đến bước Chọn gói bảo vệ...', 'success');
      navigateMarketing('topdoo-plan-security');
    }, 500);
  };

  const handleActivatePlan = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setCurrentStep(3);
      showToast('Kích hoạt thành công', 'Hệ thống Topdoo Security AI đã được kích hoạt!', 'success');
      setTimeout(() => {
        setMode('app');
        setCurrentView('overview');
      }, 1200);
    }, 800);
  };

  return (
    <div className="topdoo-landing topdoo-get-protect-page">
      {/* 1. Header */}
      <MarketingHeader />

      <main className="get-protect-main-content">
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
            <span className="breadcrumb-current">Bắt đầu bảo vệ ngay</span>
          </div>

          {/* 2-Column Main Section */}
          <div className="get-protect-main-grid">
            {/* Left Column: Product Info + 3D Art + Stats */}
            <div className="get-protect-left-col">
              {/* Badge: TOPDOO SECURITY */}
              <div className="security-badge-pill">
                <div className="security-badge-icon-box">
                  <ShieldCheck size={14} color="#059669" />
                </div>
                <span>TOPDOO SECURITY</span>
              </div>

              {/* Title */}
              <h1 className="get-protect-hero-title">
                Bắt đầu <span className="security-title-emerald">bảo vệ ngay</span>
              </h1>

              {/* Description */}
              <p className="get-protect-hero-desc">
                Kích hoạt Topdoo Security để bảo vệ dữ liệu, tài khoản và hoạt động trực tuyến của bạn với sức mạnh AI. Chỉ vài bước đơn giản, bạn đã sẵn sàng an tâm trong thế giới số.
              </p>

              {/* 4 Checkmark items row */}
              <div className="get-protect-checklist-row">
                <div className="get-protect-check-item">
                  <div className="security-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Triển khai nhanh</span>
                </div>
                <div className="get-protect-check-item">
                  <div className="security-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>An toàn, tin cậy</span>
                </div>
                <div className="get-protect-check-item">
                  <div className="security-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Không cần thẻ tín dụng</span>
                </div>
                <div className="get-protect-check-item">
                  <div className="security-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>

              {/* 3D Art Card with bannerGetProtect.png */}
              <div className="get-protect-art-card">
                <img
                  src="/bannerGetProtect.png"
                  alt="Topdoo Security 3D Shield"
                  className="get-protect-art-img"
                />

                {/* 4 Floating Badges around the shield */}
                <div className="get-protect-float-badge float-badge-lock">
                  <div className="get-protect-float-icon">
                    <Lock size={15} color="#FFFFFF" strokeWidth={2.5} />
                  </div>
                  <div className="get-protect-float-text">
                    <span>Bảo vệ</span>
                    <span>dữ liệu cá nhân</span>
                  </div>
                </div>

                <div className="get-protect-float-badge float-badge-threat">
                  <div className="get-protect-float-icon">
                    <Users size={15} color="#FFFFFF" strokeWidth={2.5} />
                  </div>
                  <div className="get-protect-float-text">
                    <span>Ngăn chặn</span>
                    <span>mối đe dọa AI</span>
                  </div>
                </div>

                <div className="get-protect-float-badge float-badge-net">
                  <div className="get-protect-float-icon">
                    <Globe size={15} color="#FFFFFF" strokeWidth={2.5} />
                  </div>
                  <div className="get-protect-float-text">
                    <span>An toàn khi</span>
                    <span>truy cập internet</span>
                  </div>
                </div>

                <div className="get-protect-float-badge float-badge-chart">
                  <div className="get-protect-float-icon">
                    <BarChart3 size={15} color="#FFFFFF" strokeWidth={2.5} />
                  </div>
                  <div className="get-protect-float-text">
                    <span>Giám sát</span>
                    <span>liên tục 24/7</span>
                  </div>
                </div>

                {/* Calligraphy text bottom right */}
                <div className="get-protect-script-slogan">
                  <span>Safe Today</span>
                  <span>Brighter Tomorrow</span>
                </div>
              </div>

              {/* Stats Bar under Artwork */}
              <div className="get-protect-stats-bar">
                <div className="get-protect-stat-item">
                  <div className="get-protect-stat-icon">
                    <Users size={18} color="#059669" />
                  </div>
                  <div className="get-protect-stat-info">
                    <div className="stat-val">10.000+</div>
                    <div className="stat-lbl">Người dùng tin tưởng</div>
                  </div>
                </div>

                <div className="get-protect-stat-item">
                  <div className="get-protect-stat-icon">
                    <ShieldCheck size={18} color="#059669" />
                  </div>
                  <div className="get-protect-stat-info">
                    <div className="stat-val">99.9%</div>
                    <div className="stat-lbl">Tỷ lệ phát hiện mối đe dọa</div>
                  </div>
                </div>

                <div className="get-protect-stat-item">
                  <div className="get-protect-stat-icon">
                    <Headphones size={18} color="#059669" />
                  </div>
                  <div className="get-protect-stat-info">
                    <div className="stat-val">24/7</div>
                    <div className="stat-lbl">Hỗ trợ toàn cầu</div>
                  </div>
                </div>

                <div className="get-protect-stat-item">
                  <div className="get-protect-stat-icon">
                    <Globe size={18} color="#059669" />
                  </div>
                  <div className="get-protect-stat-info">
                    <div className="stat-val">50+</div>
                    <div className="stat-lbl">Quốc gia và vùng lãnh thổ</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Registration / Onboarding Form Card */}
            <div className="get-protect-right-col">
              <div className="get-protect-form-card">
                {/* Header */}
                <div className="form-card-header">
                  <h2 className="form-card-title">Tạo tài khoản và bắt đầu bảo vệ</h2>
                  <p className="form-card-desc">
                    Chỉ mất 1 phút để kích hoạt Topdoo Security. Hãy cung cấp thông tin của bạn để trải nghiệm giải pháp bảo mật AI mạnh mẽ.
                  </p>
                </div>

                {/* 3-Step Stepper */}
                <div className="get-protect-stepper">
                  <div
                    className={`step-node ${currentStep >= 1 ? 'active' : ''} ${user || currentStep > 1 ? 'completed' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setCurrentStep(1)}
                  >
                    <div className="step-circle">{user ? <Check size={13} strokeWidth={3} /> : '1'}</div>
                    <span className="step-label">Tài khoản</span>
                  </div>
                  <div className="step-line" />
                  <div
                    className={`step-node ${currentStep === 2 ? 'active' : ''}`}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setCurrentStep(2);
                      navigateMarketing('topdoo-plan-security');
                    }}
                  >
                    <div className="step-circle">2</div>
                    <span className="step-label">Chọn gói</span>
                  </div>
                  <div className="step-line" />
                  <div className={`step-node ${currentStep === 3 ? 'active' : ''}`}>
                    <div className="step-circle">3</div>
                    <span className="step-label">Kích hoạt</span>
                  </div>
                </div>

                {/* STEP 1: Registration Form or Authenticated User Card */}
                {currentStep === 1 && (
                  user ? (
                    <div className="authenticated-user-card" style={{
                      padding: '28px 24px',
                      background: 'linear-gradient(135deg, rgba(240,253,244,0.95) 0%, rgba(220,252,231,0.7) 100%)',
                      border: '1px solid #86EFAC',
                      borderRadius: '16px',
                      textAlign: 'center',
                      boxShadow: '0 8px 20px -6px rgba(5,150,105,0.12)',
                      marginBottom: '1rem'
                    }}>
                      <div style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '50%',
                        background: '#DCFCE7',
                        border: '2px solid #86EFAC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 14px',
                        color: '#059669'
                      }}>
                        <CheckCircle2 size={32} />
                      </div>
                      <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#065F46', marginBottom: '6px' }}>
                        Tài khoản đã sẵn sàng!
                      </h3>
                      <p style={{ fontSize: '14px', color: '#047857', marginBottom: '4px' }}>
                        Bạn đang đăng nhập với: <strong>{user.fullName || user.email}</strong>
                      </p>
                      <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
                        {user.email} • Quyền hạn: <span style={{ fontWeight: 600, color: '#059669' }}>{user.role || 'USER'}</span>
                      </p>
                      <button
                        type="button"
                        className="btn-form-submit"
                        style={{ width: '100%', justifyContent: 'center' }}
                        onClick={() => {
                          setCurrentStep(2);
                          navigateMarketing('topdoo-plan-security');
                        }}
                      >
                        <span>Tiếp tục chọn gói bảo vệ ngay</span>
                        <ArrowRight size={17} />
                      </button>
                    </div>
                  ) : (
                  <form onSubmit={handleFormSubmit} className="get-protect-form">
                    {/* Field 1: Họ và tên */}
                    <div className="form-field-group">
                      <label className="field-label">
                        Họ và tên <span className="text-rose-500">*</span>
                      </label>
                      <div className="field-input-wrap">
                        <User size={17} className="field-icon-left" />
                        <input
                          type="text"
                          required
                          className="field-input"
                          placeholder="Nguyễn Văn A"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Field 2: Email */}
                    <div className="form-field-group">
                      <label className="field-label">
                        Email <span className="text-rose-500">*</span>
                      </label>
                      <div className="field-input-wrap">
                        <Mail size={17} className="field-icon-left" />
                        <input
                          type="email"
                          required
                          className="field-input"
                          placeholder="youremail@example.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Field 3: Số điện thoại */}
                    <div className="form-field-group">
                      <label className="field-label">Số điện thoại</label>
                      <div className="field-input-wrap">
                        <Phone size={17} className="field-icon-left" />
                        <input
                          type="tel"
                          className="field-input"
                          placeholder="0123 456 789"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Field 4: Mật khẩu */}
                    <div className="form-field-group">
                      <label className="field-label">
                        Mật khẩu <span className="text-rose-500">*</span>
                      </label>
                      <div className="field-input-wrap">
                        <Lock size={17} className="field-icon-left" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          minLength={8}
                          className="field-input field-input-password"
                          placeholder="Tạo mật khẩu (tối thiểu 8 ký tự)"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                        />
                        <button
                          type="button"
                          className="field-eye-btn"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label="Toggle password visibility"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    {/* Checkbox agreement */}
                    <label className="field-checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.agreeTerms}
                        onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                        className="field-checkbox"
                      />
                      <span>
                        Tôi đồng ý với{' '}
                        <a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Điều khoản', 'Điều khoản dịch vụ tiêu chuẩn của Topdoo.', 'info'); }} className="link-terms">
                          Điều khoản dịch vụ
                        </a>{' '}
                        và{' '}
                        <a href="#privacy" onClick={(e) => { e.preventDefault(); showToast('Chính sách', 'Chính sách bảo mật thông tin chuẩn quốc tế.', 'info'); }} className="link-terms">
                          Chính sách bảo mật
                        </a>{' '}
                        của Topdoo.
                      </span>
                    </label>

                    {/* Submit Button */}
                    <button type="submit" className="btn-form-submit" disabled={isSubmitting}>
                      <span>{isSubmitting ? 'Đang xử lý...' : 'Tiếp tục'}</span>
                      <ArrowRight size={16} />
                    </button>

                    {/* Social Divider */}
                    <div className="form-social-divider">
                      <span className="divider-line" />
                      <span className="divider-text">Hoặc đăng ký nhanh với</span>
                      <span className="divider-line" />
                    </div>

                    {/* Social Login Buttons */}
                    <div className="form-social-buttons">
                      <button
                        type="button"
                        className="btn-social"
                        onClick={() => showToast('Google Login', 'Đang liên kết với tài khoản Google...', 'info')}
                      >
                        <svg className="social-svg-icon" viewBox="0 0 24 24" width="16" height="16">
                          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>Google</span>
                      </button>

                      <button
                        type="button"
                        className="btn-social"
                        onClick={() => showToast('Microsoft Login', 'Đang liên kết với tài khoản Microsoft...', 'info')}
                      >
                        <svg className="social-svg-icon" viewBox="0 0 24 24" width="16" height="16">
                          <rect x="1" y="1" width="10" height="10" fill="#F25022" />
                          <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
                          <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
                          <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
                        </svg>
                        <span>Microsoft</span>
                      </button>

                      <button
                        type="button"
                        className="btn-social"
                        onClick={() => showToast('Apple Login', 'Đang liên kết với tài khoản Apple ID...', 'info')}
                      >
                        <svg className="social-svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="#000000">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-.98 1.71-.85 2.73.99.08 2.02-.52 2.55-1.23z" />
                        </svg>
                        <span>Apple</span>
                      </button>
                    </div>

                    {/* Bottom link: Already have account */}
                    <div className="form-card-footer">
                      <span>Bạn đã có tài khoản?</span>
                      <button
                        type="button"
                        className="btn-login-link"
                        onClick={() => {
                          showToast('Đăng nhập thành công', 'Chào mừng bạn quay lại! Chuyển đến trang Chọn gói...', 'success');
                          navigateMarketing('topdoo-plan-security');
                        }}
                      >
                        Đăng nhập ngay →
                      </button>
                    </div>
                  </form>
                  )
                )}

                {/* STEP 2: Chọn gói bảo vệ */}
                {currentStep === 2 && (
                  <div className="get-protect-step-content">
                    <div className="plan-selection-grid">
                      <div
                        className={`plan-card-option ${selectedPlan === 'free' ? 'selected' : ''}`}
                        onClick={() => setSelectedPlan('free')}
                      >
                        <div className="plan-badge">Miễn phí trải nghiệm</div>
                        <h4 className="plan-name">Cá nhân (Cơ bản)</h4>
                        <div className="plan-price">0đ <span>/ vĩnh viễn</span></div>
                        <ul className="plan-perks">
                          <li>✔ Quét mã độc & URL độc hại</li>
                          <li>✔ Bảo vệ trình duyệt cơ bản</li>
                          <li>✔ Cảnh báo rò rỉ dữ liệu</li>
                        </ul>
                      </div>

                      <div
                        className={`plan-card-option ${selectedPlan === 'pro' ? 'selected' : ''}`}
                        onClick={() => setSelectedPlan('pro')}
                      >
                        <div className="plan-badge popular">Khuyên dùng</div>
                        <h4 className="plan-name">Doanh nghiệp Pro</h4>
                        <div className="plan-price">199.000đ <span>/ tháng</span></div>
                        <ul className="plan-perks">
                          <li>✔ Toàn bộ tính năng Cá nhân</li>
                          <li>✔ AI giám sát liên tục 24/7</li>
                          <li>✔ Báo cáo bảo mật nâng cao & API</li>
                        </ul>
                      </div>
                    </div>

                    <div className="step-action-buttons">
                      <button className="btn-step-back" onClick={() => setCurrentStep(1)}>
                        Quay lại
                      </button>
                      <button className="btn-form-submit" onClick={handleActivatePlan} disabled={isSubmitting}>
                        <span>{isSubmitting ? 'Đang kích hoạt...' : 'Kích hoạt ngay'}</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Kích hoạt thành công */}
                {currentStep === 3 && (
                  <div className="get-protect-success-state">
                    <div className="success-icon-box">
                      <CheckCircle2 size={46} color="#059669" />
                    </div>
                    <h3 className="success-heading">Chào mừng bạn đến với Topdoo Security!</h3>
                    <p className="success-sub">
                      Tài khoản của bạn đã được bảo vệ bởi mạng lưới AI. Đang chuẩn bị Security Console cho bạn...
                    </p>
                    <button
                      className="btn-form-submit"
                      onClick={() => {
                        setMode('app');
                        setCurrentView('overview');
                      }}
                    >
                      <span>Vào Security Console ngay</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 3. Section: 3 Feature Cards Row */}
          <div className="get-protect-features-grid">
            {/* Feature 1 */}
            <div className="get-protect-feature-card">
              <div className="feature-icon-circle">
                <Zap size={20} color="#059669" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Triển khai tức thì</h3>
                <p className="feature-desc">Kích hoạt và bắt đầu bảo vệ chỉ trong vài phút.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="get-protect-feature-card">
              <div className="feature-icon-circle">
                <Settings size={20} color="#059669" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Tự động bảo vệ</h3>
                <p className="feature-desc">AI liên tục giám sát và ngăn chặn rủi ro 24/7.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="get-protect-feature-card">
              <div className="feature-icon-circle">
                <ShieldCheck size={20} color="#059669" />
              </div>
              <div className="feature-content">
                <h3 className="feature-title">Dữ liệu luôn an toàn</h3>
                <p className="feature-desc">Mã hóa và bảo vệ thông tin của bạn theo tiêu chuẩn quốc tế.</p>
              </div>
            </div>
          </div>

          {/* 4. Section: Community Social Proof Banner */}
          <div className="get-protect-community-banner">
            <div className="community-banner-left">
              <div className="community-icon-box">
                <Users size={22} color="#059669" />
              </div>
              <div>
                <h3 className="community-title">Tham gia cộng đồng Topdoo Security</h3>
                <p className="community-sub">Hơn 10.000+ người dùng đã tin tưởng. Bạn cũng hãy bảo vệ mình ngay hôm nay!</p>
              </div>
            </div>

            <button
              className="btn-community-stories"
              onClick={() => showToast('Cộng đồng', 'Khám phá hơn 500+ câu chuyện thành công từ người dùng Topdoo.', 'info')}
            >
              <span>Xem câu chuyện người dùng</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </main>

      {/* 5. Footer */}
      <MarketingFooter />
    </div>
  );
}
