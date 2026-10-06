import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Calendar,
  BookOpen,
  Code2,
  Package,
  FileText,
  Play,
  Headphones,
  MessageSquare,
  Phone,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooTrialWelcomeView() {
  const { navigateMarketing, showToast, setMode, setCurrentView } = useSecurity();

  // Calculate 14 days trial date range
  const today = new Date();
  const endDate = new Date();
  endDate.setDate(today.getDate() + 14);

  const formatDate = (date) => {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
  };

  const trialDateRange = `Từ ${formatDate(today)} đến ${formatDate(endDate)}`;

  const handleStartExperience = () => {
    showToast(
      'Khởi động Topdoo Developer',
      'Đang mở trung tâm tích hợp API & Sandbox Developer...',
      'success'
    );
    navigateMarketing('topdoo-developer-dashboard');
  };

  const handleOpenDocs = () => {
    showToast('Tài liệu hướng dẫn', 'Đang chuyển đến cổng tài liệu Topdoo Developer Docs...', 'info');
    navigateMarketing('topdoo-developer');
  };

  const handleOpenPlayground = () => {
    showToast('Mở Playground', 'Đang khởi tạo môi trường thử nghiệm AI Sandbox...', 'info');
    navigateMarketing('topdoo-ai');
  };

  return (
    <div className="trial-welcome-root">
      {/* Sticky Marketing Header */}
      <MarketingHeader />

      <main className="trial-welcome-main">
        <div className="trial-welcome-container">
          {/* Subheader Bar: Back to Home + Welcome Banner */}
          <div className="trial-subnav-bar">
            <button
              type="button"
              className="trial-back-btn"
              onClick={() => navigateMarketing('home')}
            >
              <ArrowLeft size={16} />
              <span>Quay về trang chủ</span>
            </button>

            <div className="trial-welcome-toast-pill">
              <span className="toast-party-emoji">🎉</span>
              <span>Chào mừng bạn đến với Topdoo!</span>
            </div>
          </div>

          {/* Stepper Progress Bar (Step 1, 2, 3) */}
          <div className="trial-stepper-wrap">
            <div className="trial-step-item">
              <div className="trial-step-circle done">
                <Check size={14} strokeWidth={3} />
              </div>
              <div className="trial-step-text">
                <span className="trial-step-title">Tạo tài khoản</span>
                <span className="trial-step-sub">Hoàn thành</span>
              </div>
            </div>

            <div className="trial-step-divider"></div>

            <div className="trial-step-item">
              <div className="trial-step-circle done">
                <Check size={14} strokeWidth={3} />
              </div>
              <div className="trial-step-text">
                <span className="trial-step-title">Kích hoạt dùng thử</span>
                <span className="trial-step-sub">Hoàn thành</span>
              </div>
            </div>

            <div className="trial-step-divider"></div>

            <div className="trial-step-item">
              <div className="trial-step-circle active">3</div>
              <div className="trial-step-text">
                <span className="trial-step-title">Bắt đầu trải nghiệm</span>
                <span className="trial-step-sub">Sẵn sàng</span>
              </div>
            </div>
          </div>

          {/* Hero Welcome Card with bannerHello.png */}
          <div className="trial-hero-banner-card">
            <div className="trial-hero-content-col">
              {/* Green checkmark circle badge */}
              <div className="trial-hero-check-badge">
                <Check size={28} strokeWidth={3} />
              </div>

              {/* Main Headline */}
              <h1 className="trial-hero-title">
                Bạn đã <span className="highlight-emerald">bắt đầu</span> dùng thử <br />
                Topdoo <span className="highlight-blue">Developer!</span>
              </h1>

              {/* Description */}
              <p className="trial-hero-desc">
                Tài khoản của bạn đã được kích hoạt gói Dùng thử miễn phí 14 ngày. Hãy khám phá đầy đủ các tính năng và công cụ mạnh mẽ của Topdoo Developer để xây dựng những ứng dụng AI tuyệt vời.
              </p>

              {/* Summary Card (14 ngày miễn phí & Check perks) */}
              <div className="trial-summary-box">
                <div className="trial-summary-left">
                  <div className="trial-calendar-icon-wrap">
                    <Calendar size={24} color="#0084FF" />
                  </div>
                  <div className="trial-calendar-details">
                    <span className="trial-cal-label">Thời gian dùng thử</span>
                    <strong className="trial-cal-days">14 ngày miễn phí</strong>
                    <span className="trial-cal-dates">{trialDateRange}</span>
                  </div>
                </div>

                <div className="trial-summary-right">
                  <div className="trial-perk-row">
                    <div className="trial-small-check"><Check size={11} strokeWidth={3.5} /></div>
                    <span>Full tính năng Developer</span>
                  </div>
                  <div className="trial-perk-row">
                    <div className="trial-small-check"><Check size={11} strokeWidth={3.5} /></div>
                    <span>Không cần thẻ tín dụng</span>
                  </div>
                  <div className="trial-perk-row">
                    <div className="trial-small-check"><Check size={11} strokeWidth={3.5} /></div>
                    <span>Hỗ trợ 24/7</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="trial-hero-action-buttons">
                <button
                  type="button"
                  className="trial-btn-primary-action"
                  onClick={handleStartExperience}
                >
                  <span>Bắt đầu trải nghiệm ngay</span>
                  <ArrowRight size={17} />
                </button>

                <button
                  type="button"
                  className="trial-btn-outline-action"
                  onClick={handleOpenDocs}
                >
                  <BookOpen size={16} />
                  <span>Khám phá tài liệu</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Start Section: Bắt đầu với Topdoo Developer */}
          <div className="trial-quickstart-section">
            <div className="trial-quickstart-header">
              <div className="trial-qs-header-left">
                <h2 className="trial-qs-title">Bắt đầu với Topdoo Developer</h2>
                <p className="trial-qs-subtitle">
                  Dưới đây là một số bước giúp bạn nhanh chóng làm quen và xây dựng dự án đầu tiên.
                </p>
              </div>

              <button
                type="button"
                className="trial-qs-header-link"
                onClick={handleOpenDocs}
              >
                <span>Xem hướng dẫn chi tiết</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* 4 Cards Grid */}
            <div className="trial-cards-grid">
              {/* Card 1: Khám phá API */}
              <div className="trial-action-card" onClick={handleStartExperience}>
                <div className="trial-card-top-icon purple">
                  <Code2 size={22} />
                </div>
                <h3 className="trial-card-title">Khám phá API</h3>
                <p className="trial-card-desc">
                  Trải nghiệm các mô hình AI mạnh mẽ qua API đơn giản.
                </p>
                <div className="trial-card-link-action">
                  <span>Bắt đầu</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Card 2: Cài đặt SDK */}
              <div className="trial-action-card" onClick={handleOpenDocs}>
                <div className="trial-card-top-icon blue">
                  <Package size={22} />
                </div>
                <h3 className="trial-card-title">Cài đặt SDK</h3>
                <p className="trial-card-desc">
                  Tích hợp nhanh với Python, JavaScript, Java...
                </p>
                <div className="trial-card-link-action">
                  <span>Xem hướng dẫn</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Card 3: Đọc tài liệu */}
              <div className="trial-action-card" onClick={handleOpenDocs}>
                <div className="trial-card-top-icon emerald">
                  <FileText size={22} />
                </div>
                <h3 className="trial-card-title">Đọc tài liệu</h3>
                <p className="trial-card-desc">
                  Hướng dẫn chi tiết và ví dụ thực tế.
                </p>
                <div className="trial-card-link-action">
                  <span>Xem tài liệu</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Card 4: Thử nghiệm ngay */}
              <div className="trial-action-card" onClick={handleOpenPlayground}>
                <div className="trial-card-top-icon orange">
                  <Play size={22} fill="#EA580C" />
                </div>
                <h3 className="trial-card-title">Thử nghiệm ngay</h3>
                <p className="trial-card-desc">
                  Trải nghiệm trong sandbox trực tuyến.
                </p>
                <div className="trial-card-link-action">
                  <span>Mở Playground</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Support Banner */}
          <div className="trial-support-banner">
            <div className="trial-support-left">
              <div className="trial-support-icon-wrap">
                <Headphones size={22} color="#059669" />
              </div>
              <div className="trial-support-info">
                <h4 className="trial-support-title">Chúng tôi luôn sẵn sàng hỗ trợ bạn!</h4>
                <p className="trial-support-sub">
                  Nếu bạn có bất kỳ câu hỏi nào trong quá trình dùng thử, hãy liên hệ đội ngũ chuyên gia của Topdoo.
                </p>
              </div>
            </div>

            <div className="trial-support-actions">
              <button
                type="button"
                className="trial-support-btn"
                onClick={() => showToast('Tư vấn trực tuyến', 'Chuyên viên tư vấn kỹ thuật đang kết nối với bạn...', 'info')}
              >
                <MessageSquare size={16} color="#2563EB" />
                <span>Chat với chuyên gia</span>
              </button>

              <a
                href="tel:19001234"
                className="trial-support-btn phone"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Hotline hỗ trợ', 'Tổng đài Topdoo: 1900 1234 (miễn phí cuộc gọi)', 'info');
                }}
              >
                <Phone size={16} color="#2563EB" />
                <span>1900 1234</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
