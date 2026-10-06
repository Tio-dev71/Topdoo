import React, { useState, useMemo } from 'react';
import {
  Building2,
  Building,
  Landmark,
  ShoppingCart,
  GraduationCap,
  HeartPulse,
  Factory,
  MoreHorizontal,
  LayoutGrid,
  Bot,
  BarChart2,
  Users,
  FileText,
  ShieldCheck,
  Box,
  Briefcase,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Play,
  Check,
  Sparkles,
  X,
  Send,
  Mail,
  Phone,
  User
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooSolutionsView() {
  const { navigateMarketing, showToast } = useSecurity();

  // Active Category Filter Tab
  const [activeTab, setActiveTab] = useState('all');

  // Customer Story Carousel Slide Index
  const [storyOffset, setStoryOffset] = useState(0);

  // Demo Modal State
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [demoForm, setDemoForm] = useState({
    fullName: '',
    workEmail: '',
    phone: '',
    companyName: '',
    solutionType: 'Tự động hoá quy trình doanh nghiệp'
  });
  const [demoSubmitting, setDemoSubmitting] = useState(false);

  // 9 Filter Tabs with vertical icon + text layout matching mockup
  const filterTabs = [
    { id: 'all', label: 'Tất cả', icon: LayoutGrid },
    { id: 'sme', label: 'Doanh nghiệp vừa và nhỏ', icon: Building },
    { id: 'enterprise', label: 'Doanh nghiệp lớn', icon: Building2 },
    { id: 'finance', label: 'Tài chính - Ngân hàng', icon: Landmark },
    { id: 'ecommerce', label: 'Thương mại điện tử', icon: ShoppingCart },
    { id: 'education', label: 'Giáo dục', icon: GraduationCap },
    { id: 'healthcare', label: 'Y tế', icon: HeartPulse },
    { id: 'manufacturing', label: 'Sản xuất', icon: Factory },
    { id: 'other', label: 'Khác', icon: MoreHorizontal }
  ];

  // 8 Highlighted Solutions
  const allSolutions = [
    {
      id: 'automation',
      title: 'Tự động hoá quy trình doanh nghiệp',
      desc: 'Giảm thiểu công việc thủ công, tăng hiệu suất vận hành.',
      icon: Bot,
      color: '#2563EB',
      bg: '#EFF6FF',
      categories: ['all', 'sme', 'enterprise', 'manufacturing']
    },
    {
      id: 'bi-analytics',
      title: 'Phân tích dữ liệu và BI thông minh',
      desc: 'Biến dữ liệu thành insight, hỗ trợ ra quyết định nhanh hơn.',
      icon: BarChart2,
      color: '#0284C7',
      bg: '#F0F9FF',
      categories: ['all', 'finance', 'ecommerce', 'enterprise']
    },
    {
      id: 'ai-agents',
      title: 'AI Agents cho doanh nghiệp',
      desc: 'Trợ lý AI làm việc 24/7, hỗ trợ chăm sóc khách hàng, nội bộ và vận hành.',
      icon: Users,
      color: '#7C3AED',
      bg: '#F5F3FF',
      categories: ['all', 'sme', 'enterprise', 'ecommerce', 'education']
    },
    {
      id: 'marketing-content',
      title: 'Tạo nội dung & Marketing AI',
      desc: 'Sản xuất nội dung nhanh chóng, chuyên nghiệp, đa kênh.',
      icon: FileText,
      color: '#0D9488',
      bg: '#F0FDFA',
      categories: ['all', 'ecommerce', 'education', 'sme']
    },
    {
      id: 'ecommerce-ai',
      title: 'Giải pháp AI cho thương mại điện tử',
      desc: 'Cá nhân hóa trải nghiệm khách hàng, tối ưu doanh thu.',
      icon: ShoppingCart,
      color: '#E11D48',
      bg: '#FFF1F2',
      categories: ['all', 'ecommerce', 'sme', 'enterprise']
    },
    {
      id: 'enterprise-security',
      title: 'Bảo mật & tuân thủ AI Enterprise',
      desc: 'Đảm bảo an toàn dữ liệu, tuân thủ tiêu chuẩn quốc tế.',
      icon: ShieldCheck,
      color: '#059669',
      bg: '#ECFDF5',
      categories: ['all', 'finance', 'healthcare', 'enterprise']
    },
    {
      id: 'system-integration',
      title: 'Tích hợp AI vào hệ thống hiện có',
      desc: 'Dễ dàng tích hợp với CRM, ERP, API và hạ tầng sẵn có.',
      icon: Box,
      color: '#D97706',
      bg: '#FFFBEB',
      categories: ['all', 'enterprise', 'manufacturing', 'finance']
    },
    {
      id: 'custom-industry',
      title: 'Giải pháp theo ngành & tùy chỉnh',
      desc: 'Tư vấn và xây dựng giải pháp AI riêng cho từng lĩnh vực.',
      icon: Briefcase,
      color: '#6D28D9',
      bg: '#F5F3FF',
      categories: ['all', 'education', 'healthcare', 'manufacturing', 'other']
    }
  ];

  // Filter solutions based on active tab
  const filteredSolutions = useMemo(() => {
    if (activeTab === 'all') return allSolutions;
    return allSolutions.filter((item) => item.categories.includes(activeTab));
  }, [activeTab]);

  // 4 Corporate Metrics
  const statsMetrics = [
    {
      num: '1.000+',
      label: 'Khách hàng doanh nghiệp',
      icon: Building2
    },
    {
      num: '50+',
      label: 'Ngành nghề triển khai',
      icon: Users
    },
    {
      num: '300%',
      label: 'Tăng năng suất trung bình',
      icon: BarChart2
    },
    {
      num: '99.9%',
      label: 'Cam kết an toàn dữ liệu',
      icon: ShieldCheck
    }
  ];

  // 4 Customer Success Stories
  const successStories = [
    {
      id: 'vietcombank',
      name: 'Vietcombank',
      quote: '“Tối ưu 70% thời gian xử lý và nâng cao trải nghiệm khách hàng.”',
      renderLogo: () => (
        <svg viewBox="0 0 160 36" height="26" fill="none">
          <path d="M12 26L4 10h7l4.5 10L20 10h7l-8 16h-7z" fill="#006633" />
          <text x="32" y="23" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#0F172A">Vietcombank</text>
        </svg>
      )
    },
    {
      id: 'fpt',
      name: 'FPT',
      quote: '“Triển khai AI Agents giúp tăng 3x hiệu suất đội ngũ.”',
      renderLogo: () => (
        <svg viewBox="0 0 110 36" height="26" fill="none">
          <path d="M4 25V9h9c2.8 0 4.5 1.5 4.5 4s-1.7 4-4.5 4H9v8H4zm5-11.5v3.5h3.5c1.2 0 2-.6 2-1.7s-.8-1.8-2-1.8H9z" fill="#034EA2" />
          <path d="M19 25V9h12v3.5H24v3h6.5v3.5H24V25h-5z" fill="#F37021" />
          <path d="M33 12.5V9h13v3.5h-4.3V25h-4.4V12.5H33z" fill="#009944" />
        </svg>
      )
    },
    {
      id: 'shopee',
      name: 'Shopee',
      quote: '“Cá nhân hóa nội dung bằng AI giúp tăng 40% doanh thu.”',
      renderLogo: () => (
        <svg viewBox="0 0 110 36" height="26" fill="none">
          <path d="M7 11c0-1.5 1.3-3 3-3h1c1.7 0 3 1.5 3 3v1H7v-1z" stroke="#EE4D2D" strokeWidth="1.5" />
          <rect x="4" y="12" width="16" height="14" rx="2.5" fill="#EE4D2D" />
          <path d="M12 16.5c-1.8 0-1.8 1-1.8 1.4 0 1.4 2.8 1.4 2.8 2.8 0 1.4-1.4 1.8-2.3 1.8s-2.3-.5-2.3-1.4" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
          <text x="26" y="23" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#0F172A">Shopee</text>
        </svg>
      )
    },
    {
      id: 'samsung',
      name: 'SAMSUNG',
      quote: '“Ứng dụng AI vào vận hành giúp tối ưu toàn diện quy trình.”',
      renderLogo: () => (
        <svg viewBox="0 0 110 36" height="26" fill="none">
          <text x="4" y="23" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="900" fill="#034EA2" letterSpacing="0.8px">SAMSUNG</text>
        </svg>
      )
    }
  ];

  const handleNextStory = () => {
    setStoryOffset((prev) => (prev + 1) % successStories.length);
  };

  const handlePrevStory = () => {
    setStoryOffset((prev) => (prev - 1 + successStories.length) % successStories.length);
  };

  const handleOpenDemoModal = (solutionTitle = '') => {
    if (solutionTitle) {
      setDemoForm((prev) => ({ ...prev, solutionType: solutionTitle }));
    }
    setDemoModalOpen(true);
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    if (!demoForm.fullName.trim()) {
      showToast('Lỗi nhập liệu', 'Vui lòng nhập họ và tên của bạn.', 'warning');
      return;
    }
    if (!demoForm.workEmail.trim() || !demoForm.workEmail.includes('@')) {
      showToast('Lỗi nhập liệu', 'Vui lòng nhập email công việc hợp lệ.', 'warning');
      return;
    }
    if (!demoForm.phone.trim()) {
      showToast('Lỗi nhập liệu', 'Vui lòng nhập số điện thoại liên hệ.', 'warning');
      return;
    }

    setDemoSubmitting(true);
    setTimeout(() => {
      setDemoSubmitting(false);
      setDemoModalOpen(false);
      showToast(
        'Đăng ký demo thành công!',
        `Cảm ơn ${demoForm.fullName}. Chuyên gia giải pháp Topdoo sẽ liên hệ demo ${demoForm.solutionType} cho ${demoForm.companyName || 'doanh nghiệp của bạn'} trong 24h tới.`,
        'success'
      );
    }, 700);
  };

  return (
    <div className="topdoo-solutions-page">
      <MarketingHeader />

      {/* =========================================================================
          1. HERO SECTION (FULL WIDTH EDGE-TO-EDGE LIKE TRANG CHỦ / BUSINESS)
          ========================================================================= */}
      <section className="solutions-hero-section full-width-hero">
        {/* Background Banner Image spanning 100% full width */}
        <img
          src="/bannerSolution.png"
          alt="Topdoo AI Solutions for Business"
          className="solutions-hero-bg-img"
        />

        <div className="landing-container solutions-hero-container">
          {/* Breadcrumbs embedded at the top of hero */}
          <div className="solutions-breadcrumbs">
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Trang chủ
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <button className="breadcrumb-link" onClick={() => navigateMarketing('topdoo-business')}>
              Business
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Giải pháp</span>
          </div>

          <div className="solutions-hero-grid">
            {/* Left Content Column */}
            <div className="solutions-hero-left">
              {/* Badge: TOPDOO BUSINESS */}
              <div className="solutions-badge-pill">
                <div className="solutions-badge-icon-box">
                  <Building2 size={13} color="#2563EB" />
                </div>
                <span>TOPDOO BUSINESS</span>
              </div>

              {/* Title */}
              <h1 className="solutions-hero-title">
                Xem các giải pháp AI<br />
                dành cho <span className="solutions-title-blue">doanh nghiệp</span>
              </h1>

              {/* Subtitle */}
              <p className="solutions-hero-desc">
                Khám phá những giải pháp AI toàn diện, được thiết kế theo từng quy mô và ngành nghề, giúp doanh nghiệp tối ưu vận hành, tăng hiệu suất và bứt phá tăng trưởng.
              </p>

              {/* 2 CTA Buttons */}
              <div className="solutions-cta-group">
                <button
                  className="btn-solutions-primary"
                  onClick={() => navigateMarketing('topdoo-contact')}
                >
                  <span>Liên hệ tư vấn</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  className="btn-solutions-outline"
                  onClick={() => handleOpenDemoModal()}
                >
                  <span>Nhận demo giải pháp</span>
                  <div className="play-icon-circle">
                    <Play size={10} fill="#2563EB" color="#2563EB" />
                  </div>
                </button>
              </div>
            </div>

            {/* Spacer for Right artwork which is in banner image */}
            <div className="solutions-hero-right-spacer" aria-hidden="true" />
          </div>

          {/* 4 Feature Check Pills in a Single Horizontal Row along the bottom of the hero */}
          <div className="solutions-features-bottom-bar">
            <div className="solutions-feature-item">
              <div className="solutions-check-circle">
                <Check size={11} strokeWidth={3} color="#FFFFFF" />
              </div>
              <span className="solutions-feature-text">Tư vấn 1:1 cùng chuyên gia</span>
            </div>

            <div className="solutions-feature-item">
              <div className="solutions-check-circle">
                <Check size={11} strokeWidth={3} color="#FFFFFF" />
              </div>
              <span className="solutions-feature-text">Demo trực tiếp sản phẩm</span>
            </div>

            <div className="solutions-feature-item">
              <div className="solutions-check-circle">
                <Check size={11} strokeWidth={3} color="#FFFFFF" />
              </div>
              <span className="solutions-feature-text">Giải pháp phù hợp nhu cầu</span>
            </div>

            <div className="solutions-feature-item">
              <div className="solutions-check-circle">
                <Check size={11} strokeWidth={3} color="#FFFFFF" />
              </div>
              <span className="solutions-feature-text">Hỗ trợ triển khai 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. INDUSTRY & CATEGORY FILTER TABS (9 VERTICAL TABS LIKE MOCKUP)
          ========================================================================= */}
      <section className="solutions-filter-section">
        <div className="landing-container">
          <div className="solutions-tabs-scroller">
            <div className="solutions-tabs-grid-bar">
              {filterTabs.map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    className={`solutions-tab-card ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <div className="tab-card-icon-wrap">
                      <IconComponent size={22} className="tab-card-icon" />
                    </div>
                    <span className="tab-card-label">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED SOLUTIONS GRID (8 CARDS)
          ========================================================================= */}
      <section className="solutions-grid-section">
        <div className="landing-container">
          {/* Header */}
          <div className="solutions-grid-header">
            <div>
              <h2 className="solutions-section-title">Các giải pháp nổi bật</h2>
              <p className="solutions-section-subtitle">
                Lựa chọn giải pháp phù hợp với mục tiêu và ngành nghề của bạn.
              </p>
            </div>
            <button
              className="btn-view-all-solutions"
              onClick={() => setActiveTab('all')}
            >
              <span>Xem tất cả giải pháp</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Cards Grid */}
          <div className="solutions-cards-grid">
            {filteredSolutions.map((sol) => {
              const IconComp = sol.icon;
              return (
                <div
                  key={sol.id}
                  className="solution-card-item"
                  onClick={() => handleOpenDemoModal(sol.title)}
                >
                  <div className="solution-card-top">
                    <div
                      className="solution-icon-box"
                      style={{ backgroundColor: sol.bg, color: sol.color }}
                    >
                      <IconComp size={24} />
                    </div>
                    <div className="solution-text-block">
                      <h3 className="solution-item-title">{sol.title}</h3>
                      <p className="solution-item-desc">{sol.desc}</p>
                    </div>
                  </div>

                  <div className="solution-card-bottom">
                    <button
                      className="btn-solution-arrow"
                      aria-label={`Xem chi tiết ${sol.title}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenDemoModal(sol.title);
                      }}
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. STATS METRICS BAR (4 METRICS IN A SINGLE CARD CONTAINER)
          ========================================================================= */}
      <section className="solutions-stats-section">
        <div className="landing-container">
          <div className="solutions-stats-bar">
            {statsMetrics.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="solutions-stat-item">
                  <div className="solutions-stat-icon-wrap">
                    <IconComp size={22} color="#2563EB" />
                  </div>
                  <div className="solutions-stat-content">
                    <div className="stat-number-text">{item.num}</div>
                    <div className="stat-label-text">{item.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. CUSTOMER SUCCESS STORIES (4 STORIES WITH SIDE ARROWS)
          ========================================================================= */}
      <section className="solutions-stories-section">
        <div className="landing-container">
          {/* Header */}
          <div className="stories-header-row">
            <div>
              <h2 className="stories-title">Câu chuyện thành công</h2>
              <p className="stories-subtitle">
                Hơn 1.000+ doanh nghiệp đã tin tưởng và đạt kết quả ấn tượng với Topdoo.
              </p>
            </div>

            <button
              className="btn-view-all-customers"
              onClick={() => navigateMarketing('topdoo-business')}
            >
              <span>Xem tất cả khách hàng</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Cards Row with edge carousel navigation buttons */}
          <div className="stories-cards-row-wrapper">
            <button
              className="btn-story-edge-nav prev"
              onClick={handlePrevStory}
              aria-label="Khách hàng trước"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="stories-cards-grid">
              {successStories.map((story) => (
                <div key={story.id} className="story-card-item">
                  <div className="story-brand-logo">
                    {story.renderLogo()}
                  </div>
                  <p className="story-quote-text">{story.quote}</p>
                </div>
              ))}
            </div>

            <button
              className="btn-story-edge-nav next"
              onClick={handleNextStory}
              aria-label="Khách hàng tiếp theo"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. BOTTOM CTA CARD BANNER
          ========================================================================= */}
      <section className="solutions-bottom-cta-section">
        <div className="landing-container">
          <div className="solutions-cta-card-box">
            <div className="cta-box-left">
              <h3 className="cta-box-title">Sẵn sàng cho bước chuyển đổi với AI?</h3>
              <p className="cta-box-subtitle">
                Đội ngũ chuyên gia Topdoo luôn sẵn sàng tư vấn giải pháp phù hợp với doanh nghiệp của bạn.
              </p>
            </div>

            <div className="cta-box-right">
              <button
                className="btn-cta-primary-consult"
                onClick={() => navigateMarketing('topdoo-contact')}
              >
                <span>Liên hệ tư vấn ngay</span>
                <ArrowRight size={16} />
              </button>
              <button
                className="btn-cta-outline-demo"
                onClick={() => handleOpenDemoModal()}
              >
                <div className="play-icon-tiny-circle">
                  <Play size={10} fill="#2563EB" color="#2563EB" />
                </div>
                <span>Xem demo giải pháp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. MODAL: ĐĂNG KÝ NHẬN DEMO GIẢI PHÁP
          ========================================================================= */}
      {demoModalOpen && (
        <div className="demo-modal-overlay" onClick={() => setDemoModalOpen(false)}>
          <div
            className="demo-modal-window"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              className="btn-modal-close"
              onClick={() => setDemoModalOpen(false)}
              aria-label="Đóng"
            >
              <X size={18} />
            </button>

            <div className="demo-modal-header">
              <div className="demo-modal-icon-badge">
                <Sparkles size={20} color="#2563EB" />
              </div>
              <h3 className="demo-modal-title">Đăng ký nhận Demo giải pháp</h3>
              <p className="demo-modal-desc">
                Trải nghiệm thực tế các mô hình AI Agents và giải pháp thông minh được cá nhân hóa cho doanh nghiệp bạn.
              </p>
            </div>

            <form onSubmit={handleDemoSubmit} className="demo-modal-form">
              <div className="modal-form-group">
                <label className="modal-form-label">
                  <User size={14} />
                  <span>Họ và tên *</span>
                </label>
                <input
                  type="text"
                  className="modal-form-input"
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={demoForm.fullName}
                  onChange={(e) => setDemoForm({ ...demoForm, fullName: e.target.value })}
                  required
                />
              </div>

              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label className="modal-form-label">
                    <Mail size={14} />
                    <span>Email công ty *</span>
                  </label>
                  <input
                    type="email"
                    className="modal-form-input"
                    placeholder="email@company.com"
                    value={demoForm.workEmail}
                    onChange={(e) => setDemoForm({ ...demoForm, workEmail: e.target.value })}
                    required
                  />
                </div>

                <div className="modal-form-group">
                  <label className="modal-form-label">
                    <Phone size={14} />
                    <span>Số điện thoại *</span>
                  </label>
                  <input
                    type="tel"
                    className="modal-form-input"
                    placeholder="0912 345 678"
                    value={demoForm.phone}
                    onChange={(e) => setDemoForm({ ...demoForm, phone: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="modal-form-group">
                <label className="modal-form-label">
                  <Building2 size={14} />
                  <span>Tên doanh nghiệp / tổ chức</span>
                </label>
                <input
                  type="text"
                  className="modal-form-input"
                  placeholder="Tên công ty hoặc tổ chức của bạn"
                  value={demoForm.companyName}
                  onChange={(e) => setDemoForm({ ...demoForm, companyName: e.target.value })}
                />
              </div>

              <div className="modal-form-group">
                <label className="modal-form-label">
                  <Briefcase size={14} />
                  <span>Giải pháp AI bạn quan tâm</span>
                </label>
                <select
                  className="modal-form-select"
                  value={demoForm.solutionType}
                  onChange={(e) => setDemoForm({ ...demoForm, solutionType: e.target.value })}
                >
                  {allSolutions.map((sol) => (
                    <option key={sol.id} value={sol.title}>
                      {sol.title}
                    </option>
                  ))}
                  <option value="Tư vấn giải pháp tổng thể theo yêu cầu">
                    Tư vấn giải pháp tổng thể theo yêu cầu
                  </option>
                </select>
              </div>

              <div className="modal-form-footer">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setDemoModalOpen(false)}
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="btn-modal-submit"
                  disabled={demoSubmitting}
                >
                  {demoSubmitting ? (
                    <span>Đang gửi yêu cầu...</span>
                  ) : (
                    <>
                      <span>Xác nhận đăng ký Demo</span>
                      <Send size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MarketingFooter />
    </div>
  );
}
export default TopdooSolutionsView;
