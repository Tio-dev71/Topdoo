import React, { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Building,
  ArrowRight,
  Check,
  Gift,
  Clock,
  CreditCard,
  Headphones,
  Layers,
  Sparkles
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export function MarketingAuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    showToast,
    navigateMarketing,
    signUp,
    signIn,
    socialSignIn,
    authError
  } = useSecurity();

  // Tab state for login modal
  const [activeTab, setActiveTab] = useState('email'); // 'email' | 'sso'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [ssoDomain, setSsoDomain] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    if (isAuthModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await signIn(email, password);
    setIsSubmitting(false);
    if (!result.error) {
      navigateMarketing('topdoo-developer-dashboard');
    }
  };

  const handleTrialSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const result = await signUp(email, password, name);
    setIsSubmitting(false);
    if (!result.error) {
      navigateMarketing('topdoo-trial-welcome');
    }
  };

  const handleSocialAuth = async (provider) => {
    setIsSubmitting(true);
    showToast(
      `Kết nối ${provider}`,
      `Đang xác thực tài khoản qua ${provider}...`,
      'info'
    );
    await socialSignIn(provider);
    setIsSubmitting(false);
  };

  const handleQuickLogin = (roleEmail, defaultPass = 'Topmediacto!!!') => {
    setEmail(roleEmail);
    setPassword(defaultPass);
    showToast('Tài khoản mẫu', `Đã điền ${roleEmail}. Bấm "Đăng nhập" để tiếp tục!`, 'info');
  };

  const handleSsoSubmit = (e) => {
    e.preventDefault();
    if (!ssoDomain) {
      showToast('Thông báo', 'Vui lòng nhập workspace domain doanh nghiệp của bạn', 'warning');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(
        'Xác thực SSO Doanh nghiệp',
        `Đang chuyển tiếp tới cổng xác thực ${ssoDomain}...`,
        'info'
      );
      closeAuthModal();
    }, 600);
  };

  // Render Trial / Register Modal (2-column layout with bannerTry)
  if (authModalMode === 'trial' || authModalMode === 'register') {
    return (
      <div
        className="mkt-auth-overlay"
        onClick={closeAuthModal}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="mkt-trial-modal-dialog"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Column: Showcase & bannerTry */}
          <div className="trial-modal-left">
            <div className="trial-left-top">
              {/* Logo & Badge */}
              <div className="trial-logo-badge-row">
                <div className="mkt-auth-logo">
                  <img src="/topdoo.jpeg" alt="TOPDOO Logo" className="mkt-auth-logo-img" />
                  <span className="mkt-auth-logo-text">TOPDOO</span>
                </div>

                <div className="trial-pill-badge">
                  <Gift size={13} className="trial-badge-icon" />
                  <span>Dùng thử miễn phí</span>
                </div>
              </div>

              {/* Title & Description */}
              <h2 className="trial-hero-heading">
                Khám phá sức mạnh <br />
                của Topdoo ngay hôm nay
              </h2>

              <p className="trial-hero-sub">
                Trải nghiệm toàn bộ tính năng với 14 ngày miễn phí. Không cần thẻ tín dụng. Dễ dàng bắt đầu, hủy bất kỳ lúc nào.
              </p>
            </div>

            {/* Middle Artwork container with bannerTry.png */}
            <div className="trial-art-showcase">
              <img
                src="/bannerTry.png"
                alt="Topdoo AI Trial Showcase"
                className="trial-art-img"
              />
            </div>

            {/* Bottom 4 Feature Badges */}
            <div className="trial-stats-bar">
              <div className="trial-stat-card">
                <div className="trial-stat-icon-wrap">
                  <Layers size={14} />
                </div>
                <span className="trial-stat-text">Full tính năng</span>
              </div>

              <div className="trial-stat-card">
                <div className="trial-stat-icon-wrap">
                  <Clock size={14} />
                </div>
                <span className="trial-stat-text">14 ngày miễn phí</span>
              </div>

              <div className="trial-stat-card">
                <div className="trial-stat-icon-wrap">
                  <CreditCard size={14} />
                </div>
                <span className="trial-stat-text">Không cần thẻ tín dụng</span>
              </div>

              <div className="trial-stat-card">
                <div className="trial-stat-icon-wrap">
                  <Headphones size={14} />
                </div>
                <span className="trial-stat-text">Hỗ trợ 24/7</span>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Form */}
          <div className="trial-modal-right">
            {/* Close Button */}
            <button
              type="button"
              className="trial-close-btn"
              onClick={closeAuthModal}
              aria-label="Đóng cửa sổ"
            >
              <X size={20} />
            </button>

            {/* Form Title & Subtitle */}
            <div className="trial-form-header">
              <h3 className="trial-form-title">Tạo tài khoản dùng thử miễn phí</h3>
              <p className="trial-form-subtitle">
                Bắt đầu hành trình cùng Topdoo chỉ trong 1 phút
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleTrialSubmit} className="trial-form-body">
              <div className="mkt-form-group">
                <label className="mkt-form-label">
                  Họ và tên <span className="required-star">*</span>
                </label>
                <div className="mkt-input-wrapper">
                  <User size={18} className="mkt-input-icon" />
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A"
                    className="mkt-form-input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="mkt-form-group">
                <label className="mkt-form-label">
                  Email <span className="required-star">*</span>
                </label>
                <div className="mkt-input-wrapper">
                  <Mail size={18} className="mkt-input-icon" />
                  <input
                    type="email"
                    required
                    placeholder="youremail@example.com"
                    className="mkt-form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="mkt-form-group">
                <label className="mkt-form-label">
                  Mật khẩu <span className="required-star">*</span>
                </label>
                <div className="mkt-input-wrapper">
                  <Lock size={18} className="mkt-input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Tạo mật khẩu (tối thiểu 8 ký tự)"
                    className="mkt-form-input mkt-password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="mkt-password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* 4 Green Checkmarks Benefits */}
              <div className="trial-benefits-list">
                <div className="trial-benefit-row">
                  <div className="trial-check-badge">
                    <Check size={11} strokeWidth={3.5} />
                  </div>
                  <span>Truy cập đầy đủ tính năng trong 14 ngày</span>
                </div>

                <div className="trial-benefit-row">
                  <div className="trial-check-badge">
                    <Check size={11} strokeWidth={3.5} />
                  </div>
                  <span>Không cần thẻ tín dụng</span>
                </div>

                <div className="trial-benefit-row">
                  <div className="trial-check-badge">
                    <Check size={11} strokeWidth={3.5} />
                  </div>
                  <span>Có thể hủy bất kỳ lúc nào</span>
                </div>

                <div className="trial-benefit-row">
                  <div className="trial-check-badge">
                    <Check size={11} strokeWidth={3.5} />
                  </div>
                  <span>Hỗ trợ 24/7 trong suốt thời gian dùng thử</span>
                </div>
              </div>

              {/* Primary Submit Button */}
              {authError && (
                <div className="mkt-auth-error-message" style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem', padding: '0.5rem', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '6px' }}>
                  {authError}
                </div>
              )}
              <button
                type="submit"
                className="trial-submit-btn"
                disabled={isSubmitting}
              >
                <span>Bắt đầu dùng thử miễn phí</span>
                <ArrowRight size={17} />
              </button>
            </form>

            {/* Divider */}
            <div className="mkt-auth-divider">
              <div className="mkt-divider-line"></div>
              <span className="mkt-divider-text">Hoặc đăng ký bằng</span>
              <div className="mkt-divider-line"></div>
            </div>

            {/* Social Logins */}
            <div className="mkt-social-grid">
              <button
                type="button"
                className="mkt-social-btn"
                onClick={() => handleSocialAuth('Google')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="mkt-social-icon">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                className="mkt-social-btn"
                onClick={() => handleSocialAuth('Microsoft')}
              >
                <svg width="18" height="18" viewBox="0 0 23 23" className="mkt-social-icon">
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H12z" />
                </svg>
                <span>Microsoft</span>
              </button>

              <button
                type="button"
                className="mkt-social-btn"
                onClick={() => handleSocialAuth('Apple')}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000" className="mkt-social-icon">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.63 1.36-.57.65-1.07 1.72-.94 2.74 1 .08 2.02-.5 2.64-1.25z" />
                </svg>
                <span>Apple</span>
              </button>
            </div>

            {/* Switch to Login */}
            <div className="mkt-auth-footer">
              <p className="mkt-auth-switch-text">
                Đã có tài khoản?{' '}
                <button
                  type="button"
                  className="mkt-switch-link"
                  onClick={() => setAuthModalMode('login')}
                >
                  Đăng nhập ngay <ArrowRight size={14} className="inline-icon" />
                </button>
              </p>
            </div>

            {/* Terms notice */}
            <p className="trial-terms-notice">
              Bằng việc đăng ký, bạn đồng ý với{' '}
              <a href="#terms" onClick={(e) => e.preventDefault()}>Điều khoản dịch vụ</a>{' '}
              và{' '}
              <a href="#privacy" onClick={(e) => e.preventDefault()}>Chính sách bảo mật</a>{' '}
              của Topdoo.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Render Login Modal (1-column layout matching Image 1)
  return (
    <div
      className="mkt-auth-overlay"
      onClick={closeAuthModal}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="mkt-auth-modal-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="mkt-auth-top-header">
          <div className="mkt-auth-logo">
            <img src="/topdoo.jpeg" alt="TOPDOO Logo" className="mkt-auth-logo-img" />
            <span className="mkt-auth-logo-text">TOPDOO</span>
          </div>

          <button
            type="button"
            className="mkt-auth-close-btn"
            onClick={closeAuthModal}
            aria-label="Đóng cửa sổ"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Title & Subtitle */}
        <div className="mkt-auth-title-section">
          <h2 className="mkt-auth-title">Đăng nhập</h2>
          <p className="mkt-auth-subtitle-bold">Chào mừng bạn trở lại Topdoo</p>
          <p className="mkt-auth-subtitle-sub">Tiếp tục hành trình khám phá sức mạnh AI.</p>
        </div>

        {/* Auth Method Tabs */}
        <div className="mkt-auth-tabs">
          <button
            type="button"
            className={`mkt-auth-tab ${activeTab === 'email' ? 'active' : ''}`}
            onClick={() => setActiveTab('email')}
          >
            Đăng nhập bằng email
          </button>
          <button
            type="button"
            className={`mkt-auth-tab ${activeTab === 'sso' ? 'active' : ''}`}
            onClick={() => setActiveTab('sso')}
          >
            Đăng nhập bằng SSO
          </button>
        </div>

        {/* Quick Test Accounts Bar */}
        {activeTab === 'email' && (
          <div style={{
            margin: '0 0 16px 0',
            padding: '10px 12px',
            backgroundColor: 'rgba(37, 99, 235, 0.06)',
            borderRadius: 10,
            border: '1px solid rgba(37, 99, 235, 0.15)'
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#1E40AF', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span>⚡</span>
              <span>Chọn tài khoản mẫu để test nhanh:</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {[
                { label: 'Admin (Full)', email: 'admin@topdoo.com' },
                { label: 'SecOps Analyst', email: 'analyst@topdoo.com' },
                { label: 'Developer', email: 'dev@topdoo.com' },
                { label: 'User', email: 'user@topdoo.com' }
              ].map(t => (
                <button
                  key={t.email}
                  type="button"
                  onClick={() => handleQuickLogin(t.email)}
                  style={{
                    padding: '3px 8px',
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 6,
                    border: '1px solid #BFDBFE',
                    backgroundColor: email === t.email ? '#2563EB' : '#FFFFFF',
                    color: email === t.email ? '#FFFFFF' : '#1D4ED8',
                    cursor: 'pointer'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab 1: Email Login Form */}
        {activeTab === 'email' ? (
          <form className="mkt-auth-form" onSubmit={handleLoginSubmit}>
            <div className="mkt-form-group">
              <label className="mkt-form-label">Email</label>
              <div className="mkt-input-wrapper">
                <Mail size={18} className="mkt-input-icon" />
                <input
                  type="email"
                  required
                  placeholder="youremail@example.com"
                  className="mkt-form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mkt-form-group">
              <label className="mkt-form-label">Mật khẩu</label>
              <div className="mkt-input-wrapper">
                <Lock size={18} className="mkt-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Nhập mật khẩu của bạn"
                  className="mkt-form-input mkt-password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="mkt-password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Checkbox and Forgot Password Link */}
            <div className="mkt-form-options">
              <label className="mkt-checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mkt-hidden-checkbox"
                />
                <span className={`mkt-custom-checkbox ${rememberMe ? 'checked' : ''}`}>
                  {rememberMe && <Check size={12} strokeWidth={3} />}
                </span>
                <span>Duy trì đăng nhập</span>
              </label>

              <button
                type="button"
                className="mkt-forgot-password-link"
                onClick={() => showToast('Quên mật khẩu', 'Liên kết đặt lại mật khẩu đã được gửi đến email của bạn.', 'info')}
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Primary Action Button */}
            {authError && (
              <div className="mkt-auth-error-message" style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem', padding: '0.5rem', backgroundColor: 'rgba(239,68,68,0.1)', borderRadius: '6px' }}>
                {authError}
              </div>
            )}
            <button
              type="submit"
              className="mkt-submit-btn"
              disabled={isSubmitting}
            >
              <span>Đăng nhập</span>
              <ArrowRight size={17} />
            </button>
          </form>
        ) : (
          /* Tab 2: SSO Form */
          <form className="mkt-auth-form" onSubmit={handleSsoSubmit}>
            <div className="mkt-form-group">
              <label className="mkt-form-label">Domain doanh nghiệp / Workspace</label>
              <div className="mkt-input-wrapper">
                <Building size={18} className="mkt-input-icon" />
                <input
                  type="text"
                  required
                  placeholder="company.topdoo.com"
                  className="mkt-form-input"
                  value={ssoDomain}
                  onChange={(e) => setSsoDomain(e.target.value)}
                />
              </div>
            </div>
            <p className="mkt-sso-desc">
              Đăng nhập an toàn thông qua nhà cung cấp danh tính của tổ chức: Okta, Azure AD, Ping Identity hoặc Google Workspace.
            </p>

            <button
              type="submit"
              className="mkt-submit-btn"
              disabled={isSubmitting}
            >
              <span>Tiếp tục với SSO</span>
              <ArrowRight size={17} />
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="mkt-auth-divider">
          <div className="mkt-divider-line"></div>
          <span className="mkt-divider-text">Hoặc đăng nhập bằng</span>
          <div className="mkt-divider-line"></div>
        </div>

        {/* Social Login Buttons */}
        <div className="mkt-social-grid">
          <button
            type="button"
            className="mkt-social-btn"
            onClick={() => handleSocialAuth('Google')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" className="mkt-social-icon">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            className="mkt-social-btn"
            onClick={() => handleSocialAuth('Microsoft')}
          >
            <svg width="18" height="18" viewBox="0 0 23 23" className="mkt-social-icon">
              <path fill="#f35325" d="M1 1h10v10H1z" />
              <path fill="#81bc06" d="M12 1h10v10H12z" />
              <path fill="#05a6f0" d="M1 12h10v10H1z" />
              <path fill="#ffba08" d="M12 12h10v10H12z" />
            </svg>
            <span>Microsoft</span>
          </button>

          <button
            type="button"
            className="mkt-social-btn"
            onClick={() => handleSocialAuth('Apple')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#000000" className="mkt-social-icon">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.38c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.63 1.36-.57.65-1.07 1.72-.94 2.74 1 .08 2.02-.5 2.64-1.25z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>

        {/* Footer Mode Switch: Toggle to Free Trial */}
        <div className="mkt-auth-footer">
          <p className="mkt-auth-switch-text">
            Chưa có tài khoản?{' '}
            <button
              type="button"
              className="mkt-switch-link"
              onClick={() => setAuthModalMode('trial')}
            >
              Đăng ký ngay <ArrowRight size={14} className="inline-icon" />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
