import React from 'react';
import {
  Building2,
  ArrowRight,
  CheckCircle2,
  Users,
  BarChart3,
  Bot,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  Award,
  Sparkles,
  Quote
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooBusinessView() {
  const { navigateMarketing, showToast } = useSecurity();

  // 4 Core Enterprise Solutions
  const enterpriseSolutions = [
    {
      id: 'operations',
      title: 'Vận hành thông minh',
      desc: 'Tự động hoá quy trình, tối ưu hiệu suất làm việc.',
      icon: Users,
      iconBg: 'bg-blue-soft',
      iconColor: '#2563EB'
    },
    {
      id: 'analytics',
      title: 'Phân tích dữ liệu',
      desc: 'Biến dữ liệu thành insight hành động.',
      icon: BarChart3,
      iconBg: 'bg-sky-soft',
      iconColor: '#0284C7'
    },
    {
      id: 'agents',
      title: 'AI Agents cho doanh nghiệp',
      desc: 'Xây dựng trợ lý AI tùy chỉnh theo nghiệp vụ.',
      icon: Bot,
      iconBg: 'bg-indigo-soft',
      iconColor: '#4F46E5'
    },
    {
      id: 'security',
      title: 'Bảo mật & tuân thủ',
      desc: 'Đảm bảo an toàn dữ liệu, tuân thủ tiêu chuẩn quốc tế.',
      icon: ShieldCheck,
      iconBg: 'bg-cyan-soft',
      iconColor: '#0891B2'
    }
  ];

  // 8 Partner Brand Logos with SVGs
  const partnerBrands = [
    {
      name: 'Vietcombank',
      render: () => (
        <div className="partner-logo-item">
          <svg viewBox="0 0 160 38" height="28" fill="none">
            <path d="M12 28L4 12h7l4.5 10L20 12h7l-8 16h-7z" fill="#006633" />
            <text x="32" y="24" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#0F172A" letterSpacing="-0.3px">Vietcombank</text>
          </svg>
        </div>
      )
    },
    {
      name: 'FPT',
      render: () => (
        <div className="partner-logo-item">
          <svg viewBox="0 0 100 38" height="28" fill="none">
            <g transform="skewX(-14)">
              <rect x="8" y="10" width="10" height="20" rx="3" fill="#F37021" />
              <rect x="22" y="10" width="10" height="20" rx="3" fill="#005DAB" />
              <rect x="36" y="10" width="10" height="20" rx="3" fill="#00A651" />
            </g>
            <text x="54" y="25" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="900" fontStyle="italic" fill="#0F172A">FPT</text>
          </svg>
        </div>
      )
    },
    {
      name: 'Viettel',
      render: () => (
        <div className="partner-logo-item">
          <svg viewBox="0 0 120 38" height="28" fill="none">
            <ellipse cx="14" cy="20" rx="9" ry="8" stroke="#EE0033" strokeWidth="2.5" fill="none" strokeDasharray="30 10" />
            <text x="30" y="25" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="bold" fill="#0F172A" letterSpacing="-0.5px">viettel</text>
          </svg>
        </div>
      )
    },
    {
      name: 'Vingroup',
      render: () => (
        <div className="partner-logo-item">
          <svg viewBox="0 0 130 38" height="28" fill="none">
            <path d="M12 26c4-12 12-14 16-14-6 2-10 6-12 10 3-4 8-6 12-6-8 3-12 7-16 10z" fill="#D32F2F" />
            <text x="34" y="24" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="800" fill="#0F172A" letterSpacing="0.8px">VINGROUP</text>
          </svg>
        </div>
      )
    },
    {
      name: 'MBBank',
      render: () => (
        <div className="partner-logo-item">
          <svg viewBox="0 0 120 38" height="28" fill="none">
            <path d="M10 14h4l3 7 3-7h4v14h-3v-9l-3 7h-2l-3-7v9h-3V14z" fill="#005BAA" />
            <path d="M26 14h5c2 0 4 1 4 3 0 1.5-.8 2.5-2 2.8 1.5.4 2.5 1.5 2.5 3.2 0 2.5-2 4-5 4h-4.5V14zm3 4.5h2c.8 0 1.5-.4 1.5-1.2s-.7-1.3-1.5-1.3h-2v2.5zm0 6.5h2.2c1 0 1.8-.5 1.8-1.5 0-.9-.8-1.5-1.8-1.5H29V25z" fill="#EE0033" />
            <text x="44" y="24" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fill="#0F172A">Bank</text>
          </svg>
        </div>
      )
    },
    {
      name: 'Shopee',
      render: () => (
        <div className="partner-logo-item">
          <svg viewBox="0 0 110 38" height="28" fill="none">
            <path d="M8 12c0-1.5 1.5-3 3.5-3h1c2 0 3.5 1.5 3.5 3v1H8v-1z" stroke="#EE4D2D" strokeWidth="1.5" />
            <rect x="5" y="13" width="18" height="15" rx="3" fill="#EE4D2D" />
            <path d="M14 18c-2 0-2 1-2 1.5 0 1.5 3 1.5 3 3 0 1.5-1.5 2-2.5 2s-2.5-.5-2.5-1.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
            <text x="28" y="25" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#0F172A">Shopee</text>
          </svg>
        </div>
      )
    },
    {
      name: 'Samsung',
      render: () => (
        <div className="partner-logo-item">
          <svg viewBox="0 0 120 38" height="28" fill="none">
            <text x="6" y="25" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="900" fill="#034EA2" letterSpacing="0.8px">SAMSUNG</text>
          </svg>
        </div>
      )
    },
    {
      name: 'PNJ',
      render: () => (
        <div className="partner-logo-item">
          <svg viewBox="0 0 90 38" height="28" fill="none">
            <path d="M8 19L14 9l6 10-6 10-6-10z" fill="#F4B400" />
            <path d="M14 9l6 10h-12l6-10z" fill="#0F4C81" />
            <text x="26" y="25" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#0F172A">PNJ</text>
          </svg>
        </div>
      )
    }
  ];

  // 4 Stats Data
  const businessStats = [
    {
      val: '1.000+',
      lbl: 'Doanh nghiệp tin tưởng',
      icon: Building2,
      color: '#2563EB',
      bg: 'bg-blue-soft'
    },
    {
      val: '50+',
      lbl: 'Ngành nghề triển khai',
      icon: Users,
      color: '#2563EB',
      bg: 'bg-blue-soft'
    },
    {
      val: '300%',
      lbl: 'Tăng năng suất trung bình',
      icon: TrendingUp,
      color: '#2563EB',
      bg: 'bg-blue-soft'
    },
    {
      val: '99.9%',
      lbl: 'Cam kết an toàn dữ liệu',
      icon: ShieldCheck,
      color: '#2563EB',
      bg: 'bg-blue-soft'
    }
  ];

  return (
    <div className="topdoo-business-page">
      <MarketingHeader />

      {/* =========================================================================
          1. HERO SECTION (FULL WIDTH BANNER LIKE TRANG CHỦ)
          ========================================================================= */}
      <section className="business-hero-section full-width-hero">
        {/* Background Banner Image spanning 100% full width */}
        <img
          src="/bannerBusiness.png"
          alt="Topdoo AI for Business"
          className="business-hero-bg-img"
        />

        <div className="landing-container business-hero-container">
          {/* Breadcrumbs at the top of hero */}
          <div className="business-breadcrumb">
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Trang chủ
            </button>
            <ChevronRight size={14} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Business</span>
          </div>

          <div className="business-hero-grid">
            {/* Left Content Column */}
            <div className="business-hero-left">
              {/* Badge: TOPDOO BUSINESS */}
              <div className="business-badge-pill">
                <div className="business-badge-icon-box">
                  <Building2 size={14} color="#2563EB" />
                </div>
                <span>TOPDOO BUSINESS</span>
              </div>

              {/* Title */}
              <h1 className="business-hero-title">
                Giải pháp AI toàn diện<br />
                cho <span className="business-title-blue">doanh nghiệp</span>
              </h1>

              {/* Subtitle */}
              <p className="business-hero-desc">
                Topdoo đồng hành cùng doanh nghiệp trong hành trình chuyển đổi số với bộ công cụ AI mạnh mẽ, linh hoạt và bảo mật, giúp tối ưu vận hành, tăng năng suất và bứt phá tăng trưởng.
              </p>

              {/* 2 CTA Buttons */}
              <div className="business-cta-group">
                <button
                  className="btn-business-primary"
                  onClick={() => navigateMarketing('topdoo-contact')}
                >
                  <span>Liên hệ tư vấn</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  className="btn-business-outline"
                  onClick={() => navigateMarketing('topdoo-solutions')}
                >
                  <span>Xem giải pháp</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* 4 Trust Checks */}
              <div className="business-trust-row">
                <div className="business-trust-item">
                  <CheckCircle2 size={16} className="business-check-icon" />
                  <span>Triển khai nhanh chóng</span>
                </div>
                <div className="business-trust-item">
                  <CheckCircle2 size={16} className="business-check-icon" />
                  <span>Tùy chỉnh theo nhu cầu</span>
                </div>
                <div className="business-trust-item">
                  <CheckCircle2 size={16} className="business-check-icon" />
                  <span>Hỗ trợ 24/7</span>
                </div>
                <div className="business-trust-item">
                  <CheckCircle2 size={16} className="business-check-icon" />
                  <span>Bảo mật doanh nghiệp</span>
                </div>
              </div>
            </div>

            {/* Right Visual Area: Banner image already contains calligraphy slogan */}
            <div className="business-hero-right"></div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SECTION: GIẢI PHÁP THEO NHU CẦU DOANH NGHIỆP (4 CARDS)
          ========================================================================= */}
      <section className="business-solutions-section" id="business-solutions-section">
        <div className="landing-container">
          <div className="business-section-header">
            <div className="business-header-left">
              <h2 className="business-section-title">Giải pháp theo nhu cầu doanh nghiệp</h2>
              <p className="business-section-subtitle">Linh hoạt triển khai cho mọi quy mô và ngành nghề</p>
            </div>
            <button
              className="business-header-link"
              onClick={() => navigateMarketing('topdoo-solutions')}
            >
              <span>Xem tất cả giải pháp</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="business-solutions-grid">
            {enterpriseSolutions.map((sol) => {
              const IconComp = sol.icon;
              return (
                <div
                  key={sol.id}
                  className="business-solution-card"
                  onClick={() => navigateMarketing('topdoo-solutions')}
                >
                  <div className={`solution-icon-wrap ${sol.iconBg}`}>
                    <IconComp size={22} color={sol.iconColor} />
                  </div>
                  <h3 className="solution-card-title">{sol.title}</h3>
                  <p className="solution-card-desc">{sol.desc}</p>
                  <div className="solution-card-arrow-box">
                    <ArrowRight size={14} color="#2563EB" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECTION: ĐƯỢC HƠN 1.000+ DOANH NGHIỆP TIN TƯỞNG (8 LOGOS)
          ========================================================================= */}
      <section className="business-partners-section">
        <div className="landing-container">
          <div className="business-section-header">
            <div className="business-header-left">
              <h2 className="business-section-title">Được hơn 1.000+ doanh nghiệp tin tưởng</h2>
              <p className="business-section-subtitle">Topdoo là đối tác AI của nhiều doanh nghiệp trong các lĩnh vực khác nhau</p>
            </div>
            <button
              className="business-header-link"
              onClick={() => showToast('Khách hàng', 'Hiển thị danh sách đối tác doanh nghiệp đồng hành cùng Topdoo...', 'info')}
            >
              <span>Xem tất cả khách hàng</span>
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="business-partners-bar">
            {partnerBrands.map((brand, idx) => (
              <React.Fragment key={idx}>
                {brand.render()}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SECTION: 4 BUSINESS STATS BAR
          ========================================================================= */}
      <section className="business-stats-section">
        <div className="landing-container">
          <div className="business-stats-grid">
            {businessStats.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="business-stat-card">
                  <div className={`stat-icon-wrap ${item.bg}`}>
                    <IconComp size={22} color={item.color} />
                  </div>
                  <div className="stat-text-col">
                    <div className="stat-number">{item.val}</div>
                    <div className="stat-label">{item.lbl}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SECTION: BOTTOM 2 CARDS (SUCCESS STORY & CTA)
          ========================================================================= */}
      <section className="business-bottom-section">
        <div className="landing-container">
          <div className="business-bottom-grid">
            {/* Card 1: Câu chuyện thành công */}
            <div className="business-story-card">
              <div className="story-card-inner">
                {/* Author Avatar */}
                <div className="story-avatar-wrap">
                  <img
                    src="/executive_portrait.jpg"
                    alt="Nguyễn Văn Hoàng - Giám đốc Chuyển đổi số"
                    className="story-avatar-img"
                  />
                </div>

                {/* Story Content */}
                <div className="story-content-col">
                  <div className="story-header-row">
                    <h3 className="story-title">Câu chuyện thành công</h3>
                    <div className="story-quote-icon">
                      <Quote size={24} color="#93C5FD" />
                    </div>
                  </div>

                  <blockquote className="story-quote-text">
                    “Topdoo giúp chúng tôi tự động hoá quy trình và tiết kiệm hơn 60% thời gian vận hành.”
                  </blockquote>

                  <div className="story-author-meta">
                    <div className="story-author-name">Nguyễn Văn Hoàng</div>
                    <div className="story-author-role">Giám đốc Chuyển đổi số, Công ty ABC</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: CTA Card (Vibrant Blue with 3D Growth Graphic) */}
            <div className="business-cta-card">
              <div className="cta-card-content">
                <h3 className="cta-card-title">
                  Sẵn sàng đưa doanh nghiệp của bạn lên một tầm cao mới?
                </h3>
                <p className="cta-card-desc">
                  Nhận tư vấn giải pháp AI phù hợp với nhu cầu và quy mô của doanh nghiệp.
                </p>
                <button
                  className="btn-cta-action"
                  onClick={() => navigateMarketing('topdoo-contact')}
                >
                  <span>Liên hệ ngay</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* 3D Growth Bars Graphic */}
              <div className="cta-growth-visual">
                <div className="growth-chart-wrap">
                  <div className="growth-bars">
                    <div className="growth-bar bar-1"></div>
                    <div className="growth-bar bar-2"></div>
                    <div className="growth-bar bar-3"></div>
                    <div className="growth-bar bar-4"></div>
                  </div>
                  <div className="growth-arrow-svg">
                    <svg viewBox="0 0 60 60" width="60" height="60" fill="none">
                      <path d="M10 50L45 15M45 15H25M45 15V35" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="growth-badge-text">
                    <span className="badge-ai">AI</span>
                    <span className="badge-drive">Drive</span>
                    <span className="badge-growth">Growth</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FOOTER
          ========================================================================= */}
      <MarketingFooter />
    </div>
  );
}
