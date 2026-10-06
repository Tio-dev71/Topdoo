import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Lock,
  Search,
  UserCheck,
  Cloud,
  FileText,
  Settings,
  ArrowRight,
  Play,
  Check,
  Users,
  Building2,
  User,
  Globe,
  Headphones,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X,
  Laptop,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Activity
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooSecurityView() {
  const { navigateMarketing, setMode, setCurrentView, showToast } = useSecurity();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: ready, 1: scanning, 2: complete
  const [scanProgress, setScanProgress] = useState(0);

  const startLiveDemoScan = () => {
    setIsDemoModalOpen(true);
    setScanStep(1);
    setScanProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        clearInterval(interval);
        setScanProgress(100);
        setScanStep(2);
      } else {
        setScanProgress(current);
      }
    }, 180);
  };

  const handleLaunchConsole = (view = 'overview') => {
    setMode('app');
    setCurrentView(view);
  };

  return (
    <div className="topdoo-landing topdoo-security-page">
      {/* 1. Header */}
      <MarketingHeader />

      {/* 2. Hero Section (Full-width edge-to-edge) */}
      <section className="security-hero-section full-width-hero">
        <img
          src="/bannerSecurity.png"
          alt="Topdoo Security Platform"
          className="security-hero-bg-img"
        />

        <div className="landing-container security-hero-container">
          {/* Breadcrumbs */}
          <div className="security-breadcrumbs">
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Trang chủ
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Sản phẩm
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Topdoo Security</span>
          </div>

          <div className="security-hero-grid">
            {/* Left Content Column */}
            <div className="security-hero-left">
              {/* Badge: TOPDOO SECURITY */}
              <div className="security-badge-pill">
                <div className="security-badge-icon-box">
                  <ShieldCheck size={14} color="#059669" />
                </div>
                <span>TOPDOO SECURITY</span>
              </div>

              {/* Title */}
              <h1 className="security-hero-title">
                Bảo vệ bạn trên <span className="security-title-emerald">không gian số</span>
              </h1>

              {/* Description */}
              <p className="security-hero-desc">
                Topdoo Security sử dụng AI để phát hiện, ngăn chặn và bảo vệ bạn khỏi các mối đe dọa trực tuyến. Giữ an toàn dữ liệu, danh tính và mọi hoạt động số của bạn — để bạn yên tâm sáng tạo và phát triển.
              </p>

              {/* CTA Buttons */}
              <div className="security-cta-group">
                <button
                  className="btn-security-primary"
                  onClick={() => navigateMarketing('topdoo-get-protect')}
                >
                  <span>Bắt đầu bảo vệ ngay</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  className="btn-security-video"
                  onClick={startLiveDemoScan}
                >
                  <div className="btn-video-icon-circle">
                    <Play size={11} fill="#059669" color="#059669" />
                  </div>
                  <span>Xem video</span>
                </button>
              </div>

              {/* Checkmarks Row */}
              <div className="security-checklist-row">
                <div className="security-check-item">
                  <div className="security-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Bảo mật toàn diện</span>
                </div>
                <div className="security-check-item">
                  <div className="security-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Phát hiện sớm với AI</span>
                </div>
                <div className="security-check-item">
                  <div className="security-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Hỗ trợ 24/7</span>
                </div>
                <div className="security-check-item">
                  <div className="security-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Được tin dùng bởi 10.000+ người</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Artwork Highlights */}
            <div className="security-hero-right">
              {/* Floating Slogan calligraphy */}
              <div className="security-floating-slogan">
                <span>Your Security</span>
                <span>Our Priority</span>
              </div>

              {/* Floating Badges matching the mockup */}
              <div className="security-floating-badge float-ai-badge">
                <div className="security-float-icon chip-icon">
                  <span>AI</span>
                </div>
                <div className="security-float-text">
                  <span>AI phát hiện</span>
                  <span>mối đe dọa</span>
                </div>
              </div>

              <div className="security-floating-badge float-data-badge">
                <div className="security-float-icon lock-icon">
                  <Lock size={14} color="#FFFFFF" strokeWidth={2.5} />
                </div>
                <div className="security-float-text">
                  <span>Bảo vệ</span>
                  <span>dữ liệu cá nhân</span>
                </div>
              </div>

              <div className="security-floating-badge float-net-badge">
                <div className="security-float-icon globe-icon">
                  <Globe size={14} color="#FFFFFF" strokeWidth={2.5} />
                </div>
                <div className="security-float-text">
                  <span>An toàn khi</span>
                  <span>truy cập internet</span>
                </div>
              </div>

              <div className="security-floating-badge float-ident-badge">
                <div className="security-float-icon user-icon">
                  <Users size={14} color="#FFFFFF" strokeWidth={2.5} />
                </div>
                <div className="security-float-text">
                  <span>Bảo vệ danh tính</span>
                  <span>và tài khoản</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: Stats & Testimonial Bar */}
      <section className="security-stats-section">
        <div className="landing-container">
          <div className="security-stats-bar">
            {/* 4 Metric items */}
            <div className="security-metric-item">
              <div className="security-metric-icon">
                <Users size={20} color="#059669" />
              </div>
              <div className="security-metric-content">
                <div className="security-metric-value">10.000+</div>
                <div className="security-metric-label">Người dùng tin tưởng</div>
              </div>
            </div>

            <div className="security-metric-item">
              <div className="security-metric-icon">
                <ShieldCheck size={20} color="#059669" />
              </div>
              <div className="security-metric-content">
                <div className="security-metric-value">99.9%</div>
                <div className="security-metric-label">Tỷ lệ phát hiện mối đe dọa</div>
              </div>
            </div>

            <div className="security-metric-item">
              <div className="security-metric-icon">
                <Headphones size={20} color="#059669" />
              </div>
              <div className="security-metric-content">
                <div className="security-metric-value">24/7</div>
                <div className="security-metric-label">Hỗ trợ toàn cầu</div>
              </div>
            </div>

            <div className="security-metric-item">
              <div className="security-metric-icon">
                <Globe size={20} color="#059669" />
              </div>
              <div className="security-metric-content">
                <div className="security-metric-value">50+</div>
                <div className="security-metric-label">Quốc gia và vùng lãnh thổ</div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="security-quote-item">
              <span className="security-quote-mark">“</span>
              <div className="security-quote-body">
                <p className="security-quote-text">
                  "Topdoo Security giúp chúng tôi yên tâm hơn khi làm việc và phát triển trên môi trường số."
                </p>
                <div className="security-quote-author">
                  <span className="author-name">Nguyễn Minh Đức</span>
                  <span className="author-role">CTO, Công ty ABC</span>
                </div>
              </div>
              <span className="security-quote-mark-end">”</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: Tính năng nổi bật */}
      <section className="security-features-section">
        <div className="landing-container">
          <div className="security-features-header">
            <div>
              <h2 className="security-section-title">Tính năng nổi bật</h2>
              <p className="security-section-sub">Giải pháp bảo mật toàn diện với công nghệ AI tiên tiến</p>
            </div>
            <button
              className="security-link-more"
              onClick={() => handleLaunchConsole('overview')}
            >
              <span>Xem tất cả tính năng</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="security-features-grid">
            {/* Feature 1 */}
            <div
              className="security-feature-card"
              onClick={() => handleLaunchConsole('quick-check')}
            >
              <div className="security-feat-icon-box">
                <Search size={20} color="#059669" />
              </div>
              <h3 className="security-feat-card-title">Phát hiện mối đe dọa AI</h3>
              <p className="security-feat-card-desc">
                Sử dụng AI để phát hiện và ngăn chặn mã độc, phishing, ransomware...
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="security-feature-card"
              onClick={() => handleLaunchConsole('data-privacy')}
            >
              <div className="security-feat-icon-box">
                <Lock size={20} color="#059669" />
              </div>
              <h3 className="security-feat-card-title">Bảo vệ dữ liệu cá nhân</h3>
              <p className="security-feat-card-desc">
                Mã hóa và giám sát dữ liệu để ngăn rò rỉ thông tin quan trọng.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="security-feature-card"
              onClick={() => handleLaunchConsole('quick-check')}
            >
              <div className="security-feat-icon-box">
                <Globe size={20} color="#059669" />
              </div>
              <h3 className="security-feat-card-title">An toàn khi truy cập</h3>
              <p className="security-feat-card-desc">
                Mã hoá bạn khi truy cập website, tải tệp và sử dụng mạng công cộng.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              className="security-feature-card"
              onClick={() => handleLaunchConsole('iam')}
            >
              <div className="security-feat-icon-box">
                <UserCheck size={20} color="#059669" />
              </div>
              <h3 className="security-feat-card-title">Bảo vệ danh tính số</h3>
              <p className="security-feat-card-desc">
                Phát hiện và cảnh báo các hành vi giả mạo, đánh cắp tài khoản.
              </p>
            </div>

            {/* Feature 5 */}
            <div
              className="security-feature-card"
              onClick={() => handleLaunchConsole('monitoring')}
            >
              <div className="security-feat-icon-box">
                <Settings size={20} color="#059669" />
              </div>
              <h3 className="security-feat-card-title">Giám sát liên tục 24/7</h3>
              <p className="security-feat-card-desc">
                Theo dõi hệ thống theo thời gian thực, cảnh báo ngay khi có rủi ro.
              </p>
            </div>

            {/* Feature 6 */}
            <div
              className="security-feature-card"
              onClick={() => handleLaunchConsole('reports')}
            >
              <div className="security-feat-icon-box">
                <FileText size={20} color="#059669" />
              </div>
              <h3 className="security-feat-card-title">Báo cáo bảo mật</h3>
              <p className="security-feat-card-desc">
                Cung cấp báo cáo chi tiết, đề xuất giải pháp tối ưu cho bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: Security Showcase & Target Audience */}
      <section className="security-showcase-section">
        <div className="landing-container">
          <div className="security-showcase-grid">
            {/* Left 60%: Interactive Security Showcase Card (securityFeature.png) */}
            <div className="security-feature-showcase-card">
              <img
                src="/securityFeature.png"
                alt="Topdoo Security Laptop Showcase"
                className="security-feature-bg-img"
              />

              <div className="security-feature-overlay-content">
                <h3 className="showcase-title">
                  Chủ động bảo vệ,<br />
                  an tâm từng kết nối
                </h3>

                <div className="showcase-checklist">
                  <div className="showcase-check-item">
                    <div className="showcase-check-dot">
                      <Check size={12} strokeWidth={3.5} color="#FFFFFF" />
                    </div>
                    <span>Quét toàn bộ thiết bị</span>
                  </div>
                  <div className="showcase-check-item">
                    <div className="showcase-check-dot">
                      <Check size={12} strokeWidth={3.5} color="#FFFFFF" />
                    </div>
                    <span>Phát hiện rủi ro theo thời gian thực</span>
                  </div>
                  <div className="showcase-check-item">
                    <div className="showcase-check-dot">
                      <Check size={12} strokeWidth={3.5} color="#FFFFFF" />
                    </div>
                    <span>Đề xuất cách xử lý</span>
                  </div>
                  <div className="showcase-check-item">
                    <div className="showcase-check-dot">
                      <Check size={12} strokeWidth={3.5} color="#FFFFFF" />
                    </div>
                    <span>Một giao diện, toàn bộ bảo mật</span>
                  </div>
                </div>

                <button
                  className="btn-showcase-demo"
                  onClick={startLiveDemoScan}
                >
                  <span>Xem demo trực tiếp</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right 40%: Phù hợp cho mọi đối tượng */}
            <div className="security-audience-card">
              <h3 className="audience-title">Phù hợp cho mọi đối tượng</h3>

              <div className="audience-list">
                {/* 1. Cá nhân */}
                <div
                  className="audience-item"
                  onClick={() => showToast('Cá nhân', 'Khám phá các tính năng bảo mật toàn diện cho tài khoản cá nhân!', 'info')}
                >
                  <div className="audience-icon-box">
                    <User size={18} color="#059669" />
                  </div>
                  <div className="audience-content">
                    <h4 className="audience-item-title">Cá nhân</h4>
                    <p className="audience-item-desc">
                      Bảo vệ tài khoản, dữ liệu và danh tính cá nhân.
                    </p>
                  </div>
                </div>

                {/* 2. Doanh nghiệp */}
                <div
                  className="audience-item"
                  onClick={() => showToast('Doanh nghiệp', 'Giải pháp bảo mật chuyên sâu cho doanh nghiệp và đội nhóm.', 'info')}
                >
                  <div className="audience-icon-box">
                    <Building2 size={18} color="#059669" />
                  </div>
                  <div className="audience-content">
                    <h4 className="audience-item-title">Doanh nghiệp</h4>
                    <p className="audience-item-desc">
                      Đảm bảo an toàn hệ thống, dữ liệu và hoạt động kinh doanh.
                    </p>
                  </div>
                </div>

                {/* 3. Tổ chức */}
                <div
                  className="audience-item"
                  onClick={() => showToast('Tổ chức', 'Bảo mật linh hoạt cho các tổ chức, trường học và cộng đồng.', 'info')}
                >
                  <div className="audience-icon-box">
                    <Users size={18} color="#059669" />
                  </div>
                  <div className="audience-content">
                    <h4 className="audience-item-title">Tổ chức</h4>
                    <p className="audience-item-desc">
                      Giải pháp bảo mật linh hoạt, dễ triển khai và mở rộng.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: Bottom CTA Banner */}
      <section className="security-bottom-cta-section">
        <div className="landing-container">
          <div className="security-bottom-cta-banner">
            <div className="bottom-cta-left">
              <div className="bottom-cta-icon-box">
                <ShieldCheck size={26} color="#059669" />
              </div>
              <div>
                <h3 className="bottom-cta-title">Sẵn sàng bảo vệ thế giới số của bạn?</h3>
                <p className="bottom-cta-sub">Hãy để Topdoo Security đồng hành cùng bạn ngay hôm nay.</p>
              </div>
            </div>

            <div className="bottom-cta-actions">
              <button
                className="btn-bottom-cta-primary"
                onClick={() => navigateMarketing('topdoo-get-protect')}
              >
                <span>Bắt đầu miễn phí</span>
                <ArrowRight size={15} />
              </button>
              <button
                className="btn-bottom-cta-secondary"
                onClick={() => navigateMarketing('topdoo-contact')}
              >
                <span>Liên hệ tư vấn</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <MarketingFooter />

      {/* 8. Interactive Live Demo Modal */}
      {isDemoModalOpen && (
        <div className="security-demo-modal-backdrop" onClick={() => setIsDemoModalOpen(false)}>
          <div className="security-demo-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="security-demo-modal-close" onClick={() => setIsDemoModalOpen(false)}>
              <X size={18} />
            </button>

            <div className="security-demo-modal-header">
              <div className="demo-header-badge">
                <ShieldCheck size={16} color="#059669" />
                <span>TOPDOO SECURITY DEMO</span>
              </div>
              <h3 className="demo-modal-title">Mô phỏng Quét An Ninh Hệ Thống AI</h3>
              <p className="demo-modal-subtitle">Trải nghiệm khả năng quét thời gian thực của Topdoo Security</p>
            </div>

            <div className="security-demo-scan-body">
              {scanStep === 1 && (
                <div className="scan-in-progress">
                  <div className="scan-radar-circle">
                    <RefreshCw size={36} className="scan-spin-icon" color="#059669" />
                  </div>
                  <div className="scan-progress-label">Đang phân tích các luồng kết nối số...</div>
                  <div className="scan-progress-bar-wrap">
                    <div className="scan-progress-bar-fill" style={{ width: `${scanProgress}%` }} />
                  </div>
                  <div className="scan-progress-percent">{scanProgress}%</div>
                  <div className="scan-items-checklist">
                    <div className={`scan-check-row ${scanProgress > 25 ? 'done' : ''}`}>
                      <CheckCircle2 size={14} color={scanProgress > 25 ? '#059669' : '#94A3B8'} />
                      <span>Kiểm tra tệp tin hệ thống và mã độc ngầm</span>
                    </div>
                    <div className={`scan-check-row ${scanProgress > 50 ? 'done' : ''}`}>
                      <CheckCircle2 size={14} color={scanProgress > 50 ? '#059669' : '#94A3B8'} />
                      <span>Quét URL & phát hiện kết nối lừa đảo phishing</span>
                    </div>
                    <div className={`scan-check-row ${scanProgress > 75 ? 'done' : ''}`}>
                      <CheckCircle2 size={14} color={scanProgress > 75 ? '#059669' : '#94A3B8'} />
                      <span>Kiểm tra rò rỉ dữ liệu mật khẩu cá nhân</span>
                    </div>
                    <div className={`scan-check-row ${scanProgress >= 100 ? 'done' : ''}`}>
                      <CheckCircle2 size={14} color={scanProgress >= 100 ? '#059669' : '#94A3B8'} />
                      <span>Tối ưu hóa tường lửa AI đa lớp 24/7</span>
                    </div>
                  </div>
                </div>
              )}

              {scanStep === 2 && (
                <div className="scan-completed-state">
                  <div className="scan-success-badge">
                    <ShieldCheck size={48} color="#059669" />
                  </div>
                  <h4 className="scan-success-title">Thiết bị & Kết nối của bạn an toàn!</h4>
                  <p className="scan-success-desc">
                    Hệ thống AI đã hoàn tất quét 42.890 tệp tin, 12 cổng mạng và phát hiện 0 mối đe dọa.
                  </p>
                  <div className="scan-summary-grid">
                    <div className="summary-stat-box">
                      <div className="stat-num text-emerald">0</div>
                      <div className="stat-text">Mã độc</div>
                    </div>
                    <div className="summary-stat-box">
                      <div className="stat-num text-emerald">0</div>
                      <div className="stat-text">Phishing</div>
                    </div>
                    <div className="summary-stat-box">
                      <div className="stat-num text-emerald">0</div>
                      <div className="stat-text">Ransomware</div>
                    </div>
                    <div className="summary-stat-box">
                      <div className="stat-num text-emerald">An toàn</div>
                      <div className="stat-text">Trạng thái</div>
                    </div>
                  </div>

                  <div className="scan-modal-actions">
                    <button
                      className="btn-modal-console"
                      onClick={() => {
                        setIsDemoModalOpen(false);
                        handleLaunchConsole('overview');
                      }}
                    >
                      <span>Mở Security Console</span>
                      <ArrowRight size={15} />
                    </button>
                    <button
                      className="btn-modal-close-outline"
                      onClick={() => setIsDemoModalOpen(false)}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
