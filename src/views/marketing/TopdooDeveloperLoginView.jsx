import React, { useState } from 'react';
import {
  Code2,
  Layers,
  FileText,
  Users,
  Globe,
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Check,
  User,
  Building,
  KeyRound,
  Sparkles,
  X
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';

export function TopdooDeveloperLoginView() {
  const { navigateMarketing, setMode, setCurrentView, showToast } = useSecurity();

  // Mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState('login');
  // Method: 'email' | 'sso'
  const [loginMethod, setLoginMethod] = useState('email');

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [ssoDomain, setSsoDomain] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Forgot Password Modal
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (loginMethod === 'sso') {
      if (!ssoDomain.trim()) {
        showToast('Thiếu thông tin', 'Vui lòng nhập tên miền Workspace của doanh nghiệp.', 'warning');
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        showToast('SSO Redirect', `Đang chuyển hướng tới cổng xác thực ${ssoDomain}...`, 'info');
      }, 900);
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      showToast('Email không hợp lệ', 'Vui lòng nhập địa chỉ email chính xác.', 'warning');
      return;
    }

    if (!password.trim() || password.length < 6) {
      showToast('Mật khẩu quá ngắn', 'Mật khẩu phải chứa ít nhất 6 ký tự.', 'warning');
      return;
    }

    if (authMode === 'register') {
      if (!fullName.trim()) {
        showToast('Thiếu thông tin', 'Vui lòng nhập họ và tên của bạn.', 'warning');
        return;
      }
      if (password !== confirmPassword) {
        showToast('Mật khẩu không khớp', 'Mật khẩu xác nhận không trùng khớp.', 'warning');
        return;
      }
      if (!agreeTerms) {
        showToast('Điều khoản dịch vụ', 'Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật.', 'warning');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        showToast('Đăng ký thành công', `Chào mừng ${fullName}! Tài khoản Topdoo Developer đã được khởi tạo.`, 'success');
        navigateMarketing('topdoo-developer-dashboard');
      }, 1000);
      return;
    }

    // Login logic
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      showToast('Đăng nhập thành công', 'Chào mừng bạn trở lại với Topdoo Developer Console!', 'success');
      navigateMarketing('topdoo-developer-dashboard');
    }, 900);
  };

  const handleSocialAuth = (provider) => {
    setIsLoading(true);
    showToast(`${provider} Auth`, `Đang kết nối với tài khoản ${provider}...`, 'info');
    setTimeout(() => {
      setIsLoading(false);
      showToast('Đăng nhập thành công', `Xác thực qua ${provider} thành công! Đang vào Developer Console...`, 'success');
      navigateMarketing('topdoo-developer-dashboard');
    }, 1100);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!resetEmail.trim() || !resetEmail.includes('@')) {
      showToast('Email không hợp lệ', 'Vui lòng nhập địa chỉ email hợp lệ để nhận liên kết khôi phục.', 'warning');
      return;
    }
    setResetSent(true);
    showToast('Đã gửi email khôi phục', `Hướng dẫn đặt lại mật khẩu đã được gửi đến ${resetEmail}.`, 'success');
    setTimeout(() => {
      setIsForgotPasswordOpen(false);
      setResetSent(false);
      setResetEmail('');
    }, 2500);
  };

  return (
    <div className="topdoo-landing topdoo-dev-auth-page">
      {/* 1. Header */}
      <MarketingHeader />

      {/* 2. Main Authentication Container */}
      <main className="dev-auth-main">
        <div className="landing-container dev-auth-container">
          <div className="dev-auth-grid">
            {/* Left Column: Developer Showcase & Artwork */}
            <div className="dev-auth-left">
              {/* Header Tag Badge */}
              <div className="dev-auth-tag-pill">
                <div className="dev-auth-tag-icon-box">
                  <Code2 size={16} color="#FFFFFF" strokeWidth={2.5} />
                </div>
                <div className="dev-auth-tag-text">
                  <div className="dev-auth-tag-title">TOPDOO DEVELOPER</div>
                  <div className="dev-auth-tag-subtitle">
                    Nền tảng dành cho nhà phát triển trong kỷ nguyên AI
                  </div>
                </div>
              </div>

              {/* H1 Headline */}
              <h1 className="dev-auth-hero-title">
                <div>Xây dựng</div>
                <div className="dev-auth-gradient-text">tương lai cùng AI</div>
              </h1>

              {/* Description */}
              <p className="dev-auth-hero-desc">
                Công cụ mạnh mẽ. Tài liệu đầy đủ. Cộng đồng sẵn sàng hỗ trợ.
                Topdoo Developer giúp bạn biến ý tưởng thành sản phẩm thực tế nhanh hơn, hiệu quả hơn.
              </p>

              {/* 4 Feature Badges in a row */}
              <div className="dev-auth-features-row">
                <div className="dev-auth-feature-item">
                  <div className="dev-auth-feature-icon">
                    <Code2 size={20} />
                  </div>
                  <span className="dev-auth-feature-label">API mạnh mẽ</span>
                </div>

                <div className="dev-auth-feature-item">
                  <div className="dev-auth-feature-icon">
                    <Layers size={20} />
                  </div>
                  <span className="dev-auth-feature-label">SDK đa ngôn ngữ</span>
                </div>

                <div className="dev-auth-feature-item">
                  <div className="dev-auth-feature-icon">
                    <FileText size={20} />
                  </div>
                  <span className="dev-auth-feature-label">Tài liệu đầy đủ</span>
                </div>

                <div className="dev-auth-feature-item">
                  <div className="dev-auth-feature-icon">
                    <Users size={20} />
                  </div>
                  <span className="dev-auth-feature-label">Cộng đồng hỗ trợ</span>
                </div>
              </div>

              {/* 3D Illustration Artwork Area using bannerLoginDev.png */}
              <div className="dev-auth-illustration-wrap">
                <img
                  src="/bannerLoginDev.png"
                  alt="Topdoo Developer Platform Illustration"
                  className="dev-auth-illustration-img"
                />

                {/* Handwritten Cursive Signature Text */}
                <div className="dev-auth-cursive-text">
                  Build<br />
                  <span>Without Limits</span>
                </div>
              </div>

              {/* Bottom 3-column stats strip */}
              <div className="dev-auth-stats-row">
                <div className="dev-auth-stat-item">
                  <div className="dev-auth-stat-icon">
                    <Users size={18} />
                  </div>
                  <div className="dev-auth-stat-info">
                    <div className="dev-auth-stat-number">10.000+</div>
                    <div className="dev-auth-stat-label">Developer tin tưởng</div>
                  </div>
                </div>

                <div className="dev-auth-stat-item">
                  <div className="dev-auth-stat-icon">
                    <Globe size={18} />
                  </div>
                  <div className="dev-auth-stat-info">
                    <div className="dev-auth-stat-number">50+</div>
                    <div className="dev-auth-stat-label">Quốc gia và vùng lãnh thổ</div>
                  </div>
                </div>

                <div className="dev-auth-stat-item">
                  <div className="dev-auth-stat-icon">
                    <Zap size={18} />
                  </div>
                  <div className="dev-auth-stat-info">
                    <div className="dev-auth-stat-number">99.9%</div>
                    <div className="dev-auth-stat-label">Độ ổn định hệ thống</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Authentication Card */}
            <div className="dev-auth-right">
              <div className="dev-auth-card">
                {/* Topdoo Brand Logo Header inside card */}
                <div className="dev-auth-card-top">
                  <div className="dev-auth-logo-badge">
                    <svg width="24" height="24" viewBox="0 0 40 40" fill="none">
                      <circle cx="20" cy="20" r="18" fill="#0284C7" />
                      <circle cx="20" cy="20" r="8" fill="#38BDF8" />
                      <circle cx="12" cy="20" r="4" fill="#E0F2FE" />
                      <circle cx="28" cy="20" r="4" fill="#E0F2FE" />
                      <circle cx="20" cy="12" r="4" fill="#E0F2FE" />
                      <circle cx="20" cy="28" r="4" fill="#E0F2FE" />
                    </svg>
                    <span className="dev-auth-logo-text">TOPDOO</span>
                  </div>
                </div>

                {/* Card Title & Subtitle */}
                <h2 className="dev-auth-card-title">
                  {authMode === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản Developer'}
                </h2>
                <p className="dev-auth-card-subtitle">
                  {authMode === 'login'
                    ? 'Đăng nhập để tiếp tục hành trình cùng Topdoo Developer'
                    : 'Bắt đầu xây dựng ứng dụng AI cùng Topdoo Developer ngay hôm nay'}
                </p>

                {/* Navigation Tabs (Only in login mode or switchable) */}
                {authMode === 'login' && (
                  <div className="dev-auth-tabs">
                    <button
                      type="button"
                      className={`dev-auth-tab-btn ${loginMethod === 'email' ? 'active' : ''}`}
                      onClick={() => setLoginMethod('email')}
                    >
                      Đăng nhập bằng email
                    </button>
                    <button
                      type="button"
                      className={`dev-auth-tab-btn ${loginMethod === 'sso' ? 'active' : ''}`}
                      onClick={() => setLoginMethod('sso')}
                    >
                      Đăng nhập bằng SSO
                    </button>
                  </div>
                )}

                {/* Main Auth Form */}
                <form onSubmit={handleSubmit} className="dev-auth-form">
                  {/* Register Fields */}
                  {authMode === 'register' && (
                    <div className="dev-auth-field">
                      <label htmlFor="reg-fullname">Họ và tên</label>
                      <div className="dev-auth-input-wrap">
                        <User size={18} className="dev-auth-input-icon" />
                        <input
                          id="reg-fullname"
                          type="text"
                          placeholder="Nguyễn Văn A"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* SSO Method Fields */}
                  {authMode === 'login' && loginMethod === 'sso' ? (
                    <div className="dev-auth-field">
                      <label htmlFor="sso-domain">Tên miền tổ chức / Workspace SSO</label>
                      <div className="dev-auth-input-wrap">
                        <Building size={18} className="dev-auth-input-icon" />
                        <input
                          id="sso-domain"
                          type="text"
                          placeholder="company.topdoo.com hoặc yourdomain.com"
                          value={ssoDomain}
                          onChange={(e) => setSsoDomain(e.target.value)}
                          required
                        />
                      </div>
                      <div className="dev-auth-field-hint">
                        Đăng nhập một lần (SAML 2.0 / OIDC) dành cho các khách hàng doanh nghiệp.
                      </div>
                    </div>
                  ) : (
                    /* Email & Password Fields */
                    <>
                      <div className="dev-auth-field">
                        <label htmlFor="auth-email">Email</label>
                        <div className="dev-auth-input-wrap">
                          <Mail size={18} className="dev-auth-input-icon" />
                          <input
                            id="auth-email"
                            type="email"
                            placeholder="youremail@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="dev-auth-field">
                        <label htmlFor="auth-password">Mật khẩu</label>
                        <div className="dev-auth-input-wrap">
                          <Lock size={18} className="dev-auth-input-icon" />
                          <input
                            id="auth-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Nhập mật khẩu của bạn"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <button
                            type="button"
                            className="dev-auth-eye-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </div>

                      {authMode === 'register' && (
                        <div className="dev-auth-field">
                          <label htmlFor="auth-confirm-password">Xác nhận mật khẩu</label>
                          <div className="dev-auth-input-wrap">
                            <KeyRound size={18} className="dev-auth-input-icon" />
                            <input
                              id="auth-confirm-password"
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Nhập lại mật khẩu"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              required
                            />
                            <button
                              type="button"
                              className="dev-auth-eye-btn"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              aria-label={showConfirmPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                            >
                              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Options row: Remember Me & Forgot Password */}
                  {authMode === 'login' && loginMethod === 'email' && (
                    <div className="dev-auth-row-options">
                      <label className="dev-auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="dev-auth-checkbox-input"
                        />
                        <span className="dev-auth-custom-checkbox">
                          {rememberMe && <Check size={12} strokeWidth={3} />}
                        </span>
                        <span className="dev-auth-checkbox-text">Duy trì đăng nhập</span>
                      </label>

                      <button
                        type="button"
                        className="dev-auth-link-forgot"
                        onClick={() => setIsForgotPasswordOpen(true)}
                      >
                        Quên mật khẩu?
                      </button>
                    </div>
                  )}

                  {/* Register terms checkbox */}
                  {authMode === 'register' && (
                    <div className="dev-auth-terms-row">
                      <label className="dev-auth-checkbox-label">
                        <input
                          type="checkbox"
                          checked={agreeTerms}
                          onChange={(e) => setAgreeTerms(e.target.checked)}
                          className="dev-auth-checkbox-input"
                        />
                        <span className="dev-auth-custom-checkbox">
                          {agreeTerms && <Check size={12} strokeWidth={3} />}
                        </span>
                        <span className="dev-auth-checkbox-text">
                          Tôi đồng ý với{' '}
                          <button
                            type="button"
                            className="link-inline"
                            onClick={() => showToast('Điều khoản', 'Điều khoản dịch vụ Topdoo Platform.', 'info')}
                          >
                            Điều khoản dịch vụ
                          </button>{' '}
                          và{' '}
                          <button
                            type="button"
                            className="link-inline"
                            onClick={() => showToast('Chính sách', 'Chính sách bảo mật Topdoo.', 'info')}
                          >
                            Chính sách bảo mật
                          </button>
                        </span>
                      </label>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn-dev-auth-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="dev-auth-loading-spinner" />
                    ) : (
                      <>
                        <span>
                          {authMode === 'login'
                            ? (loginMethod === 'sso' ? 'Đăng nhập với SSO' : 'Đăng nhập')
                            : 'Đăng ký tài khoản'}
                        </span>
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="dev-auth-divider">
                  <span className="dev-auth-divider-line" />
                  <span className="dev-auth-divider-text">
                    {authMode === 'login' ? 'Hoặc đăng nhập bằng' : 'Hoặc đăng ký bằng'}
                  </span>
                  <span className="dev-auth-divider-line" />
                </div>

                {/* Social Login Buttons: Google, Microsoft, Apple */}
                <div className="dev-auth-social-row">
                  <button
                    type="button"
                    className="btn-dev-auth-social"
                    onClick={() => handleSocialAuth('Google')}
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
                    className="btn-dev-auth-social"
                    onClick={() => handleSocialAuth('Microsoft')}
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
                    className="btn-dev-auth-social"
                    onClick={() => handleSocialAuth('Apple')}
                  >
                    <svg className="social-svg-icon" viewBox="0 0 24 24" width="16" height="16" fill="#000000">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.63 1.35-.57.65-.98 1.71-.85 2.73.99.08 2.02-.52 2.55-1.23z" />
                    </svg>
                    <span>Apple</span>
                  </button>
                </div>

                {/* Switch between Login and Register */}
                <div className="dev-auth-switch-mode">
                  {authMode === 'login' ? (
                    <>
                      <span>Chưa có tài khoản?</span>
                      <button
                        type="button"
                        className="btn-link-switch-auth"
                        onClick={() => {
                          setAuthMode('register');
                          setLoginMethod('email');
                        }}
                      >
                        Đăng ký ngay &rarr;
                      </button>
                    </>
                  ) : (
                    <>
                      <span>Đã có tài khoản?</span>
                      <button
                        type="button"
                        className="btn-link-switch-auth"
                        onClick={() => {
                          setAuthMode('login');
                          setLoginMethod('email');
                        }}
                      >
                        Đăng nhập ngay &rarr;
                      </button>
                    </>
                  )}
                </div>

                {/* Security Assurance Badge Box */}
                <div className="dev-auth-security-box">
                  <div className="dev-auth-security-icon-circle">
                    <ShieldCheck size={20} />
                  </div>
                  <div className="dev-auth-security-content">
                    <div className="dev-auth-security-title">Đăng nhập an toàn</div>
                    <div className="dev-auth-security-text">
                      Dữ liệu của bạn được mã hóa và bảo vệ theo chuẩn bảo mật quốc tế.
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal & Support Footer Links below the card */}
              <div className="dev-auth-footer-links">
                <button
                  type="button"
                  onClick={() => showToast('Điều khoản dịch vụ', 'Hiển thị các quy định và thỏa thuận sử dụng dịch vụ.', 'info')}
                >
                  Điều khoản dịch vụ
                </button>
                <span className="dev-auth-link-sep">|</span>
                <button
                  type="button"
                  onClick={() => showToast('Chính sách bảo mật', 'Cam kết bảo mật thông tin và mã hóa dữ liệu người dùng.', 'info')}
                >
                  Chính sách bảo mật
                </button>
                <span className="dev-auth-link-sep">|</span>
                <button
                  type="button"
                  onClick={() => showToast('Trung tâm hỗ trợ', 'Đội ngũ kỹ thuật Topdoo sẵn sàng hỗ trợ bạn 24/7.', 'info')}
                >
                  Hỗ trợ
                </button>
                <span className="dev-auth-link-sep">|</span>
                <button
                  type="button"
                  onClick={() => navigateMarketing('topdoo-contact')}
                >
                  Liên hệ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {isForgotPasswordOpen && (
        <div className="plan-modal-overlay" onClick={() => setIsForgotPasswordOpen(false)}>
          <div className="plan-modal-dialog dev-auth-reset-modal" onClick={(e) => e.stopPropagation()}>
            <div className="plan-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div className="dev-auth-modal-icon-badge">
                  <KeyRound size={20} color="#2563EB" />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                    Khôi phục mật khẩu
                  </h3>
                  <p style={{ margin: '2px 0 0', fontSize: 13, color: '#64748B' }}>
                    Nhập email đã đăng ký để nhận liên kết đặt lại mật khẩu
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsForgotPasswordOpen(false)}
                aria-label="Đóng"
              >
                <X size={18} />
              </button>
            </div>

            <div className="plan-modal-body">
              {resetSent ? (
                <div className="dev-auth-reset-success">
                  <div className="dev-auth-reset-success-icon">
                    <Check size={28} color="#16A34A" />
                  </div>
                  <h4>Đã gửi email khôi phục</h4>
                  <p>
                    Vui lòng kiểm tra hộp thư đến của <strong>{resetEmail}</strong> để tiến hành đặt lại mật khẩu.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleResetPassword} className="dev-auth-form">
                  <div className="dev-auth-field" style={{ marginBottom: 20 }}>
                    <label htmlFor="reset-email">Email tài khoản</label>
                    <div className="dev-auth-input-wrap">
                      <Mail size={18} className="dev-auth-input-icon" />
                      <input
                        id="reset-email"
                        type="email"
                        placeholder="youremail@example.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-dev-auth-submit"
                    style={{ width: '100%' }}
                  >
                    <span>Gửi liên kết khôi phục</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
