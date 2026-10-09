import React, { useState } from 'react';
import {
  ChevronRight,
  ArrowRight,
  Code2,
  Layers,
  FileText,
  Users,
  Globe,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Terminal,
  Zap,
  BookOpen,
  Cpu,
  X,
  Play,
  CloudUpload,
  Settings
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooDeveloperView() {
  const { navigateMarketing, setMode, setCurrentView, showToast, user } = useSecurity();

  // Modals state
  const [isQuickstartModalOpen, setIsQuickstartModalOpen] = useState(false);
  const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);
  const [isPartnersModalOpen, setIsPartnersModalOpen] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);
  const [activeCodeTab, setActiveCodeTab] = useState('python');

  const codeSnippets = {
    python: `import topdoo

# Khởi tạo Topdoo AI Developer Client
client = topdoo.Client(api_key="sk-topdoo-live-demo-key")

response = client.ai.generate(
    model="topdoo-pro-v2",
    prompt="Xây dựng tương lai cùng AI với Topdoo Developer",
    temperature=0.7
)

print(response.content)`,
    javascript: `import { TopdooClient } from '@topdoo/sdk';

const client = new TopdooClient({
  apiKey: 'sk-topdoo-live-demo-key'
});

const response = await client.ai.generate({
  model: 'topdoo-pro-v2',
  prompt: 'Xây dựng tương lai cùng AI với Topdoo Developer',
  temperature: 0.7
});

console.log(response.content);`,
    curl: `curl https://api.topdoo.com/v1/ai/generate \\
  -H "Authorization: Bearer sk-topdoo-live-demo-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "topdoo-pro-v2",
    "prompt": "Xây dựng tương lai cùng AI với Topdoo Developer",
    "temperature": 0.7
  }'`
  };

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedSnippet(true);
    showToast('Đã sao chép mã', 'Đoạn mã tích hợp đã được lưu vào clipboard!', 'success');
    setTimeout(() => setCopiedSnippet(false), 2000);
  };

  const launchConsole = (view = 'api-integrations') => {
    setMode('app');
    setCurrentView(view);
  };

  return (
    <div className="topdoo-landing topdoo-developer-page">
      {/* 1. Header */}
      <MarketingHeader />

      {/* 2. Full-Width Hero Section with bannerDevroute.png */}
      <section className="dev-hero-section">
        <div className="dev-hero-bg-wrap">
          <img
            src="/bannerDevroute.png"
            alt="Topdoo Developer Platform"
            className="dev-hero-bg-img"
          />
          <div className="dev-hero-bg-overlay" />
        </div>

        <div className="landing-container dev-hero-container">
          {/* Breadcrumbs */}
          <div className="dev-hero-breadcrumbs">
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Trang chủ
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <button className="breadcrumb-link" onClick={() => navigateMarketing('topdoo-company')}>
              Company
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <button className="breadcrumb-link" onClick={() => navigateMarketing('topdoo-developer')}>
              Topdoo Developer
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Tổng quan</span>
          </div>

          <div className="dev-hero-grid">
            {/* Left Column: Text & Actions */}
            <div className="dev-hero-left">
              <div className="dev-tag-pill">
                <Code2 size={13} className="dev-tag-icon" />
                <span>TOPDOO DEVELOPER</span>
              </div>

              <h1 className="dev-hero-title">
                <span>Xây dựng</span>
                <span className="dev-hero-gradient-text">tương lai cùng AI</span>
              </h1>

              <p className="dev-hero-desc">
                Topdoo Developer là nền tảng toàn diện dành cho nhà phát triển, tích hợp API, SDK, công cụ và tài nguyên AI mạnh mẽ, giúp bạn tạo ra những ứng dụng thông minh hơn, nhanh hơn và hiệu quả hơn.
              </p>

              <div className="dev-hero-actions">
                <button
                  type="button"
                  className="btn-dev-primary"
                  onClick={() => navigateMarketing(user ? 'topdoo-developer-dashboard' : 'topdoo-developer-login')}
                >
                  <span>{user ? 'Vào Developer Dashboard' : 'Bắt đầu xây dựng'}</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="btn-dev-secondary"
                  onClick={() => {
                    const el = document.getElementById('dev-core-values');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Xem tổng quan</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Trust checklist pills */}
              <div className="dev-trust-pills">
                <div className="dev-trust-pill-item">
                  <span className="dev-check-circle">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span>Dễ dàng tích hợp</span>
                </div>
                <div className="dev-trust-pill-item">
                  <span className="dev-check-circle">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span>Tài liệu đầy đủ</span>
                </div>
                <div className="dev-trust-pill-item">
                  <span className="dev-check-circle">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span>Hỗ trợ 24/7</span>
                </div>
                <div className="dev-trust-pill-item">
                  <span className="dev-check-circle">
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span>Cộng đồng developer lớn</span>
                </div>
              </div>
            </div>

            {/* Right Column: Spacing for the artwork rendered on bannerDevroute.png */}
            <div className="dev-hero-right" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* 3. Main Content Container */}
      <main className="landing-container dev-main-content">
        {/* Section 1: Giá trị cốt lõi của Topdoo Developer */}
        <section id="dev-core-values" className="dev-section dev-core-values-section">
          <div className="dev-section-header">
            <div className="dev-section-header-left">
              <h2 className="dev-section-title">Giá trị cốt lõi của Topdoo Developer</h2>
              <p className="dev-section-subtitle">
                Cung cấp đầy đủ công cụ và tài nguyên để bạn tập trung sáng tạo, phát triển và mở rộng.
              </p>
            </div>
            <button
              type="button"
              className="dev-section-link-btn"
              onClick={() => setIsFeaturesModalOpen(true)}
            >
              <span>Xem tất cả tính năng</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="dev-core-values-grid">
            {/* Card 1: API tích hợp AI */}
            <div
              className="dev-value-card"
              onClick={() => setIsQuickstartModalOpen(true)}
            >
              <div className="dev-value-icon-box">
                <Code2 size={22} color="#7C3AED" />
              </div>
              <h3 className="dev-value-title">API tích hợp AI</h3>
              <p className="dev-value-desc">
                Truy cập các mô hình AI mạnh mẽ qua API đơn giản.
              </p>
              <div className="dev-value-arrow-circle">
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Card 2: SDK & thư viện */}
            <div
              className="dev-value-card"
              onClick={() => {
                showToast('SDK & Thư viện', 'Bộ SDK Python, Node.js, Go và Java sẵn sàng cho dự án của bạn!', 'info');
                setIsQuickstartModalOpen(true);
              }}
            >
              <div className="dev-value-icon-box">
                <Layers size={22} color="#7C3AED" />
              </div>
              <h3 className="dev-value-title">SDK & thư viện</h3>
              <p className="dev-value-desc">
                Bộ công cụ phát triển đa ngôn ngữ (Python, JavaScript, Java,...)
              </p>
              <div className="dev-value-arrow-circle">
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Card 3: Tài liệu toàn diện */}
            <div
              className="dev-value-card"
              onClick={() => {
                showToast('Tài liệu Developer', 'Tài liệu hướng dẫn chi tiết đang mở trong chế độ Sandbox.', 'info');
                launchConsole('reports');
              }}
            >
              <div className="dev-value-icon-box">
                <FileText size={22} color="#7C3AED" />
              </div>
              <h3 className="dev-value-title">Tài liệu toàn diện</h3>
              <p className="dev-value-desc">
                Hướng dẫn chi tiết, dễ hiểu, luôn cập nhật.
              </p>
              <div className="dev-value-arrow-circle">
                <ArrowRight size={14} />
              </div>
            </div>

            {/* Card 4: Cộng đồng Developer */}
            <div
              className="dev-value-card"
              onClick={() => {
                showToast('Cộng đồng Topdoo Developer', 'Chào mừng bạn đến với kênh Discord và GitHub cộng đồng!', 'success');
              }}
            >
              <div className="dev-value-icon-box">
                <Users size={22} color="#7C3AED" />
              </div>
              <h3 className="dev-value-title">Cộng đồng Developer</h3>
              <p className="dev-value-desc">
                Kết nối, học hỏi và chia sẻ cùng hàng nghìn nhà phát triển.
              </p>
              <div className="dev-value-arrow-circle">
                <ArrowRight size={14} />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Được hơn 10.000+ nhà phát triển tin tưởng */}
        <section className="dev-section dev-stats-section">
          <div className="dev-section-header-simple">
            <h2 className="dev-section-title">Được hơn 10.000+ nhà phát triển tin tưởng</h2>
            <p className="dev-section-subtitle">
              Topdoo đồng hành cùng các nhà phát triển trên toàn thế giới.
            </p>
          </div>

          <div className="dev-stats-grid">
            {/* Stat 1 */}
            <div className="dev-stat-card">
              <div className="dev-stat-icon-box">
                <Users size={20} color="#7C3AED" />
              </div>
              <div className="dev-stat-info">
                <div className="dev-stat-number">10.000+</div>
                <div className="dev-stat-label">Developer tin tưởng</div>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="dev-stat-card">
              <div className="dev-stat-icon-box">
                <Globe size={20} color="#7C3AED" />
              </div>
              <div className="dev-stat-info">
                <div className="dev-stat-number">50+</div>
                <div className="dev-stat-label">Quốc gia và vùng lãnh thổ</div>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="dev-stat-card">
              <div className="dev-stat-icon-box">
                <Code2 size={20} color="#7C3AED" />
              </div>
              <div className="dev-stat-info">
                <div className="dev-stat-number">1.000+</div>
                <div className="dev-stat-label">Dự án đã triển khai</div>
              </div>
            </div>

            {/* Stat 4 */}
            <div className="dev-stat-card">
              <div className="dev-stat-icon-box">
                <ShieldCheck size={20} color="#7C3AED" />
              </div>
              <div className="dev-stat-info">
                <div className="dev-stat-number">99.9%</div>
                <div className="dev-stat-label">Độ ổn định hệ thống</div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Testimonial & Bottom CTA Gradient Banner */}
        <section className="dev-section dev-promo-dual-section">
          <div className="dev-promo-dual-grid">
            {/* Left Column: Testimonial Card */}
            <div className="dev-testimonial-card">
              <div className="dev-testimonial-avatar-wrap">
                <img
                  src="/executive_portrait.jpg"
                  alt="Nguyễn Hoàng Long"
                  className="dev-testimonial-avatar"
                />
              </div>

              <div className="dev-testimonial-body">
                {/* Decorative Quotation Mark */}
                <div className="dev-quote-symbol" aria-hidden="true">
                  <svg width="34" height="26" viewBox="0 0 34 26" fill="none">
                    <path
                      d="M9.8 0C4.3 0 0 4.5 0 10.1C0 17.5 5.7 24 13.5 25.8L14.7 21.6C8.8 20.3 5.4 16.1 5.1 12.3C6.3 12.8 7.7 13.1 9.2 13.1C13.8 13.1 17.5 9.4 17.5 4.8C17.5 2.1 16.4 0 9.8 0ZM26.3 0C20.8 0 16.5 4.5 16.5 10.1C16.5 17.5 22.2 24 30 25.8L31.2 21.6C25.3 20.3 21.9 16.1 21.6 12.3C22.8 12.8 24.2 13.1 25.7 13.1C30.3 13.1 34 9.4 34 4.8C34 2.1 32.9 0 26.3 0Z"
                      fill="#CBD5E1"
                    />
                  </svg>
                </div>

                <p className="dev-testimonial-quote">
                  “Topdoo Developer giúp chúng tôi tích hợp AI nhanh chóng và dễ dàng. Tài liệu rõ ràng, hỗ trợ tuyệt vời và cộng đồng rất năng động.”
                </p>

                <div className="dev-testimonial-author">
                  <div className="dev-author-name">Nguyễn Hoàng Long</div>
                  <div className="dev-author-role">Senior Developer, Công ty XYZ</div>
                </div>
              </div>
            </div>

            {/* Right Column: Purple/Blue Gradient CTA Banner */}
            <div className="dev-gradient-cta-banner">
              <div className="dev-cta-content-left">
                <h3 className="dev-cta-headline">
                  Sẵn sàng biến ý tưởng<br />
                  thành sản phẩm thực tế?
                </h3>
                <p className="dev-cta-subtext">
                  Khám phá sức mạnh của Topdoo Developer ngay hôm nay.
                </p>
                <button
                  type="button"
                  className="btn-dev-cta-white"
                  onClick={() => navigateMarketing(user ? 'topdoo-developer-dashboard' : 'topdoo-developer-login')}
                >
                  <span>{user ? 'Vào Developer Dashboard' : 'Bắt đầu xây dựng'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* 3D Isometric Platform & Cursive script */}
              <div className="dev-cta-artwork-right">
                {/* 3D Isometric Stack Visual */}
                <div className="dev-iso-stack-container">
                  {/* Floating Cloud Tag */}
                  <div className="dev-iso-float-tag tag-cloud">
                    <CloudUpload size={13} color="#FFFFFF" />
                  </div>

                  {/* Floating Gear Tag */}
                  <div className="dev-iso-float-tag tag-gear">
                    <Settings size={12} color="#FFFFFF" />
                  </div>

                  {/* Floating Code Tag */}
                  <div className="dev-iso-float-tag tag-code">
                    <Code2 size={12} color="#FFFFFF" />
                  </div>

                  {/* Isometric Layers SVG */}
                  <svg
                    width="140"
                    height="120"
                    viewBox="0 0 140 120"
                    className="dev-iso-svg"
                    fill="none"
                  >
                    {/* Bottom Layer Shadow/Platform */}
                    <path
                      d="M70 110L20 82L70 54L120 82L70 110Z"
                      fill="#4338CA"
                      opacity="0.5"
                    />
                    <path
                      d="M20 82V90L70 118V110L20 82Z"
                      fill="#3730A3"
                      opacity="0.6"
                    />
                    <path
                      d="M120 82V90L70 118V110L120 82Z"
                      fill="#312E81"
                      opacity="0.6"
                    />

                    {/* Middle Layer */}
                    <path
                      d="M70 85L25 60L70 35L115 60L70 85Z"
                      fill="#6366F1"
                      opacity="0.8"
                    />
                    <path
                      d="M25 60V68L70 93V85L25 60Z"
                      fill="#4F46E5"
                    />
                    <path
                      d="M115 60V68L70 93V85L115 60Z"
                      fill="#4338CA"
                    />

                    {/* Top Layer Base */}
                    <path
                      d="M70 65L32 44L70 23L108 44L70 65Z"
                      fill="#E0E7FF"
                    />
                    <path
                      d="M32 44V51L70 72V65L32 44Z"
                      fill="#C7D2FE"
                    />
                    <path
                      d="M108 44V51L70 72V65L108 44Z"
                      fill="#A5B4FC"
                    />

                    {/* Top Layer Center Badge */}
                    <rect
                      x="57"
                      y="33"
                      width="26"
                      height="20"
                      rx="4"
                      fill="#7C3AED"
                    />
                    {/* Code Icon inside rect */}
                    <path
                      d="M65 40L61 43L65 46M75 40L79 43L75 46"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Elegant Cursive Script Slogan */}
                <div className="dev-cta-cursive-slogan">
                  <span>More</span>
                  <span>Ideas</span>
                  <span>Brighter</span>
                  <span>Tomorrow</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Đối tác & khách hàng tiêu biểu */}
        <section className="dev-section dev-partners-section">
          <div className="dev-section-header">
            <h2 className="dev-partners-title">Đối tác & khách hàng tiêu biểu</h2>
            <button
              type="button"
              className="dev-section-link-btn"
              onClick={() => setIsPartnersModalOpen(true)}
            >
              <span>Xem tất cả đối tác</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="dev-partners-strip">
            {/* 1. Vietcombank */}
            <div className="dev-partner-logo-item" title="Vietcombank">
              <svg width="18" height="15" viewBox="0 0 14 12" fill="none">
                <polygon points="7,1 13,11 1,11" fill="#00843D" />
              </svg>
              <span className="dev-partner-text dev-partner-vcb">Vietcombank</span>
            </div>

            {/* 2. FPT */}
            <div className="dev-partner-logo-item" title="FPT Corporation">
              <span className="dev-partner-fpt">
                <span className="fpt-orange">F</span>
                <span className="fpt-blue">P</span>
                <span className="fpt-green">T</span>
              </span>
            </div>

            {/* 3. Viettel */}
            <div className="dev-partner-logo-item" title="Viettel">
              <span className="dev-partner-viettel">viettel</span>
            </div>

            {/* 4. VNG */}
            <div className="dev-partner-logo-item" title="VNG">
              <span className="dev-partner-vng">VNG</span>
            </div>

            {/* 5. MB Bank */}
            <div className="dev-partner-logo-item" title="MB Bank">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="2" width="20" height="20" rx="4" fill="#004899" />
                <path
                  d="M12 5.5L13.8 9.5H18L14.6 12.2L15.9 16.5L12 13.8L8.1 16.5L9.4 12.2L6 9.5H10.2L12 5.5Z"
                  fill="#FFFFFF"
                />
              </svg>
              <span className="dev-partner-mb">MB Bank</span>
            </div>

            {/* 6. Shopee */}
            <div className="dev-partner-logo-item" title="Shopee">
              <svg width="15" height="17" viewBox="0 0 16 18" fill="none">
                <path
                  d="M13.5 4.5H11.5C11.5 2.57 9.93 1 8 1C6.07 1 4.5 2.57 4.5 4.5H2.5C1.67 4.5 1 5.17 1 6L2.2 15.6C2.28 16.38 2.94 17 3.73 17H12.27C13.06 17 13.72 16.38 13.8 15.6L15 6C15 5.17 14.33 4.5 13.5 4.5ZM8 2.5C9.1 2.5 10 3.4 10 4.5H6C6 3.4 6.9 2.5 8 2.5Z"
                  fill="#EE4D2D"
                />
                <path
                  d="M9.5 9.5C9.5 8.9 9 8.5 8.2 8.3C7.2 8.1 6.8 7.8 6.8 7.3C6.8 6.8 7.3 6.4 8 6.4C8.7 6.4 9.1 6.7 9.2 7.3H10.1C10 6.3 9.2 5.6 8 5.6C6.8 5.6 5.9 6.3 5.9 7.4C5.9 8.4 6.6 8.8 7.6 9C8.6 9.2 8.9 9.6 8.9 10.1C8.9 10.7 8.3 11.1 7.6 11.1C6.7 11.1 6.2 10.7 6.1 9.9H5.1C5.2 11.1 6.2 11.9 7.6 11.9C8.8 11.9 9.8 11.1 9.8 9.9L9.5 9.5Z"
                  fill="#FFFFFF"
                />
              </svg>
              <span className="dev-partner-shopee">Shopee</span>
            </div>

            {/* 7. SAMSUNG */}
            <div className="dev-partner-logo-item" title="Samsung">
              <span className="dev-partner-samsung">SAMSUNG</span>
            </div>

            {/* 8. PNJ */}
            <div className="dev-partner-logo-item" title="PNJ">
              <svg width="15" height="14" viewBox="0 0 24 22" fill="none">
                <path
                  d="M12 2L2 8L12 20L22 8L12 2Z"
                  stroke="#002D72"
                  strokeWidth="2"
                  fill="#EBF3FE"
                />
                <path
                  d="M2 8H22M12 2L7 8L12 20L17 8L12 2Z"
                  stroke="#002D72"
                  strokeWidth="1.5"
                />
              </svg>
              <span className="dev-partner-pnj">PNJ</span>
            </div>
          </div>
        </section>
      </main>

      {/* 4. Footer */}
      <MarketingFooter />

      {/* MODAL 1: Quickstart & API Sandbox */}
      {isQuickstartModalOpen && (
        <div className="plan-modal-overlay" onClick={() => setIsQuickstartModalOpen(false)}>
          <div className="plan-modal-dialog dev-quickstart-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="company-modal-header">
              <div className="dev-modal-title-wrap">
                <div className="dev-modal-icon-badge">
                  <Terminal size={18} color="#7C3AED" />
                </div>
                <div>
                  <h3 className="company-modal-title">Topdoo AI Quickstart Sandbox</h3>
                  <p className="company-modal-subtitle">Tích hợp mô hình AI chỉ với 3 dòng code</p>
                </div>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsQuickstartModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="dev-quickstart-body">
              {/* Language switcher tabs */}
              <div className="dev-code-tabs">
                <button
                  type="button"
                  className={`dev-code-tab ${activeCodeTab === 'python' ? 'active' : ''}`}
                  onClick={() => setActiveCodeTab('python')}
                >
                  Python
                </button>
                <button
                  type="button"
                  className={`dev-code-tab ${activeCodeTab === 'javascript' ? 'active' : ''}`}
                  onClick={() => setActiveCodeTab('javascript')}
                >
                  Node.js / JavaScript
                </button>
                <button
                  type="button"
                  className={`dev-code-tab ${activeCodeTab === 'curl' ? 'active' : ''}`}
                  onClick={() => setActiveCodeTab('curl')}
                >
                  cURL
                </button>
              </div>

              {/* Code window */}
              <div className="dev-code-window">
                <div className="dev-code-window-top">
                  <div className="dev-window-dots">
                    <span className="dot dot-red" />
                    <span className="dot dot-yellow" />
                    <span className="dot dot-green" />
                  </div>
                  <span className="dev-code-lang-label">
                    {activeCodeTab === 'python' ? 'quickstart.py' : activeCodeTab === 'javascript' ? 'quickstart.js' : 'terminal'}
                  </span>
                  <button
                    type="button"
                    className="dev-code-copy-btn"
                    onClick={() => handleCopyCode(codeSnippets[activeCodeTab])}
                  >
                    {copiedSnippet ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                    <span>{copiedSnippet ? 'Đã chép' : 'Sao chép'}</span>
                  </button>
                </div>
                <pre className="dev-code-content">
                  <code>{codeSnippets[activeCodeTab]}</code>
                </pre>
              </div>

              <div className="dev-quickstart-footer">
                <div className="dev-free-tier-info">
                  <Sparkles size={16} color="#7C3AED" />
                  <span>Miễn phí 1.000.000 tokens thử nghiệm cho nhà phát triển mới.</span>
                </div>
                <div className="dev-modal-actions">
                  <button
                    type="button"
                    className="btn-dev-modal-secondary"
                    onClick={() => {
                      setIsQuickstartModalOpen(false);
                      launchConsole('api-integrations');
                    }}
                  >
                    Mở API Console
                  </button>
                  <button
                    type="button"
                    className="btn-dev-modal-primary"
                    onClick={() => {
                      setIsQuickstartModalOpen(false);
                      showToast('Tạo API Key', 'API Key mới của bạn: sk-topdoo-live-8923a1', 'success');
                      launchConsole('api-integrations');
                    }}
                  >
                    Lấy API Key ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Features Catalog */}
      {isFeaturesModalOpen && (
        <div className="plan-modal-overlay" onClick={() => setIsFeaturesModalOpen(false)}>
          <div className="plan-modal-dialog dev-features-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="company-modal-header">
              <div>
                <h3 className="company-modal-title">Tất cả tính năng của Topdoo Developer</h3>
                <p className="company-modal-subtitle">Bộ công cụ hoàn chỉnh để xây dựng và scale ứng dụng AI</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsFeaturesModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="dev-features-grid-modal">
              {[
                { title: 'Topdoo AI Chat API', desc: 'Tích hợp mô hình hội thoại đa ngôn ngữ với ngữ cảnh cực lớn (128k context).', icon: Zap },
                { title: 'Vision & Image Generation', desc: 'Xử lý hình ảnh, OCR, nhận diện tài liệu và tạo ảnh nghệ thuật theo yêu cầu.', icon: Cpu },
                { title: 'Semantic Vector Embeddings', desc: 'Vector search và RAG engine tốc độ cao với độ chính xác trên 98%.', icon: Layers },
                { title: 'Enterprise Webhooks', desc: 'Nhận sự kiện theo thời gian thực về tokens, billing và trạng thái jobs.', icon: Globe },
                { title: 'Zero-Trust Security Keys', desc: 'Quản lý API Key phân quyền chi tiết theo IP, domain và hạn mức chi tiêu.', icon: ShieldCheck },
                { title: 'Multi-language SDKs', desc: 'Thư viện client chính thức cho Python, TypeScript/JS, Go, PHP và Java.', icon: Code2 }
              ].map((feat, idx) => {
                const IconComp = feat.icon;
                return (
                  <div key={idx} className="dev-feature-modal-card">
                    <div className="dev-modal-feat-icon">
                      <IconComp size={18} color="#7C3AED" />
                    </div>
                    <div>
                      <h4 className="dev-modal-feat-title">{feat.title}</h4>
                      <p className="dev-modal-feat-desc">{feat.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="dev-modal-bottom-bar">
              <button
                type="button"
                className="btn-dev-modal-primary"
                onClick={() => {
                  setIsFeaturesModalOpen(false);
                  setIsQuickstartModalOpen(true);
                }}
              >
                Bắt đầu thử nghiệm ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Partners Directory */}
      {isPartnersModalOpen && (
        <div className="plan-modal-overlay" onClick={() => setIsPartnersModalOpen(false)}>
          <div className="plan-modal-dialog dev-partners-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="company-modal-header">
              <div>
                <h3 className="company-modal-title">Mạng lưới Đối tác & Doanh nghiệp Topdoo</h3>
                <p className="company-modal-subtitle">Các tập đoàn hàng đầu tin cậy tích hợp hệ sinh thái AI của Topdoo</p>
              </div>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsPartnersModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="dev-partners-modal-list">
              <p className="dev-partners-modal-intro">
                Topdoo hân hạnh cung cấp hạ tầng AI bảo mật, API phân tích dữ liệu và giải pháp chuyển đổi số cho hơn 50+ tập đoàn lớn trong khu vực Đông Nam Á và quốc tế.
              </p>
              <div className="dev-partners-modal-grid">
                {['Vietcombank', 'FPT Corporation', 'Viettel Group', 'VNG Corporation', 'MB Bank', 'Shopee', 'Samsung Vina', 'PNJ Group'].map((item, idx) => (
                  <div key={idx} className="dev-partner-modal-item">
                    <CheckCircle2 size={16} color="#10B981" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="dev-modal-bottom-bar">
              <button
                type="button"
                className="btn-dev-modal-primary"
                onClick={() => {
                  setIsPartnersModalOpen(false);
                  navigateMarketing('topdoo-contact');
                }}
              >
                Đăng ký đối tác doanh nghiệp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
