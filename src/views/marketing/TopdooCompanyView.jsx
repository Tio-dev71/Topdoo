import React, { useState } from 'react';
import {
  ChevronRight,
  ArrowRight,
  Play,
  Users,
  Building,
  Globe,
  Star,
  ShieldCheck,
  Target,
  Eye,
  Heart,
  Check,
  Sparkles,
  Briefcase,
  Mail,
  X,
  Phone,
  Calendar,
  Award,
  Layers,
  ChevronDown
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooCompanyView() {
  const { navigateMarketing, showToast } = useSecurity();

  // Modal states
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCareersModalOpen, setIsCareersModalOpen] = useState(false);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState(4); // Default to 2025

  // Careers form
  const [careerForm, setCareerForm] = useState({
    name: '',
    email: '',
    position: 'AI Engineer',
    portfolio: ''
  });

  // Partner form
  const [partnerForm, setPartnerForm] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const milestones = [
    {
      year: '2021',
      title: 'Thành lập Topdoo',
      desc: 'Khởi đầu từ phòng lab nghiên cứu AI với đội ngũ 5 kỹ sư hạt nhân đam mê công nghệ.'
    },
    {
      year: '2022',
      title: 'Ra mắt sản phẩm đầu tiên',
      desc: 'Giới thiệu nền tảng AI Workspace và hệ thống bảo mật đám mây thế hệ mới.'
    },
    {
      year: '2023',
      title: 'Đạt 1 triệu người dùng',
      desc: 'Cột mốc tăng trưởng bùng nổ, mở rộng hệ sinh thái công cụ số hóa cho doanh nghiệp.'
    },
    {
      year: '2024',
      title: 'Mở rộng ra thị trường quốc tế',
      desc: 'Thiết lập văn phòng đại diện tại Singapore và phục vụ khách hàng trên 20 quốc gia.'
    },
    {
      year: '2025',
      title: 'Hơn 10 triệu người dùng và 50+ đối tác doanh nghiệp',
      desc: 'Trở thành hệ sinh thái công nghệ AI và an ninh mạng tin cậy hàng đầu khu vực.'
    }
  ];

  const handleCareerSubmit = (e) => {
    e.preventDefault();
    showToast(
      'Ứng tuyển thành công',
      `Cảm ơn ${careerForm.name || 'bạn'}! Bộ phận Nhân sự Topdoo sẽ liên hệ với bạn trong 48h làm việc.`,
      'success'
    );
    setIsCareersModalOpen(false);
  };

  const handlePartnerSubmit = (e) => {
    e.preventDefault();
    showToast(
      'Gửi yêu cầu hợp tác thành công',
      `Cảm ơn ${partnerForm.companyName || 'quý đối tác'}! Giám đốc phát triển kinh doanh Topdoo sẽ phản hồi trong 24h.`,
      'success'
    );
    setIsPartnerModalOpen(false);
  };

  return (
    <div className="topdoo-landing topdoo-company-page">
      {/* 1. Header */}
      <MarketingHeader />

      {/* 2. Full-Width Hero Section with /bannerCompanyroute.png Background */}
      <section className="company-hero-section">
        <div className="company-hero-bg-wrap">
          <img
            src="/bannerCompanyroute.png"
            alt="Topdoo Company Headquarters"
            className="company-hero-bg-img"
          />
          <div className="company-hero-bg-overlay" />
        </div>

        <div className="landing-container company-hero-container">
          {/* Breadcrumbs */}
          <div className="company-hero-breadcrumbs">
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Trang chủ
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Company</span>
          </div>

          <div className="company-hero-grid">
            {/* Left Column: Text & CTAs */}
            <div className="company-hero-left">
              <span className="company-tag-pill">VỀ TOPDOO</span>

              <h1 className="company-hero-title">
                <span>Kiến tạo công nghệ</span>
                <span className="company-title-line2">
                  vì một <span className="company-title-blue">tương lai tốt đẹp hơn</span>
                </span>
              </h1>

              <p className="company-hero-desc">
                Topdoo tin rằng AI có thể giúp con người làm việc hiệu quả hơn, an toàn hơn và sáng tạo hơn. Chúng tôi không chỉ xây dựng công cụ mà còn kiến tạo giá trị bền vững cho cộng đồng, doanh nghiệp và xã hội.
              </p>

              <div className="company-hero-actions">
                <button
                  type="button"
                  className="btn-company-primary"
                  onClick={() => {
                    const el = document.getElementById('company-story');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Câu chuyện của chúng tôi</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  type="button"
                  className="btn-company-video"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <span className="btn-video-icon-circle">
                    <Play size={13} fill="#0284C7" color="#0284C7" />
                  </span>
                  <span>Xem video</span>
                </button>
              </div>
            </div>

            {/* Right Column: Slogan in sky area above the building */}
            <div className="company-hero-right">
              <div className="company-script-slogan">
                <span>Good Technology</span>
                <span>A Brighter Tomorrow.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Below Hero */}
      <main className="company-main-content">
        <div className="landing-container">
          {/* Stats Ribbon (5 Items) */}
          <section className="company-stats-ribbon">
            <div className="company-stat-card">
              <div className="stat-circle-icon">
                <Users size={20} color="#0284C7" />
              </div>
              <div className="stat-text-box">
                <div className="stat-number">10.000+</div>
                <div className="stat-label">Người dùng tin tưởng</div>
              </div>
            </div>

            <div className="company-stat-card">
              <div className="stat-circle-icon">
                <Building size={20} color="#0284C7" />
              </div>
              <div className="stat-text-box">
                <div className="stat-number">50+</div>
                <div className="stat-label">Doanh nghiệp đối tác</div>
              </div>
            </div>

            <div className="company-stat-card">
              <div className="stat-circle-icon">
                <Globe size={20} color="#0284C7" />
              </div>
              <div className="stat-text-box">
                <div className="stat-number">20+</div>
                <div className="stat-label">Quốc gia và vùng lãnh thổ</div>
              </div>
            </div>

            <div className="company-stat-card">
              <div className="stat-circle-icon">
                <Star size={20} color="#0284C7" fill="#0284C7" />
              </div>
              <div className="stat-text-box">
                <div className="stat-number">4.8/5</div>
                <div className="stat-label">Đánh giá trung bình</div>
              </div>
            </div>

            <div className="company-stat-card">
              <div className="stat-circle-icon">
                <ShieldCheck size={20} color="#0284C7" />
              </div>
              <div className="stat-text-box">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Cam kết an toàn</div>
              </div>
            </div>
          </section>

          {/* 4. Section "Câu chuyện Topdoo" */}
          <section id="company-story" className="company-story-section">
            <div className="company-story-grid">
              {/* Left Column: Story text */}
              <div className="company-story-left">
                <h2 className="company-story-title">Câu chuyện Topdoo</h2>
                <div className="company-story-accent-bar" />
                <p className="company-story-desc">
                  Topdoo được thành lập với sứ mệnh đưa công nghệ AI đến gần hơn với mọi người. Từ một nhóm nhỏ những người đam mê công nghệ, chúng tôi đã phát triển thành nền tảng AI toàn diện được hàng triệu người tin dùng trên toàn thế giới.
                </p>
                <button
                  type="button"
                  className="btn-company-outline"
                  onClick={() => setIsStoryModalOpen(true)}
                >
                  <span>Tìm hiểu thêm</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* Right Column: High-Res Team Photo with Overlays */}
              <div className="company-story-right">
                <div className="company-team-banner">
                  <img
                    src="/company_team.jpg"
                    alt="Đội ngũ kỹ sư và chuyên gia Topdoo"
                    className="company-team-img"
                  />
                  <div className="team-banner-overlay-gradient" />

                  {/* Left Overlay Text */}
                  <div className="team-overlay-left">
                    <span className="team-overlay-tag">Technology</span>
                    <span className="team-overlay-title">People</span>
                    <span className="team-overlay-sub">A Better World</span>
                  </div>

                  {/* Right Overlay Text */}
                  <div className="team-overlay-right">
                    <span>Đồng hành</span>
                    <span>Cùng bạn</span>
                    <span>Kiến tạo</span>
                    <span className="highlight-text">tương lai</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 5. 4 Core Pillars: Sứ mệnh, Tầm nhìn, Giá trị cốt lõi & Founder Quote */}
          <section className="company-pillars-section">
            <div className="company-pillars-grid">
              {/* Pillar 1: Sứ mệnh */}
              <div className="company-pillar-card">
                <div className="pillar-icon-box">
                  <Target size={22} color="#2563EB" />
                </div>
                <h3 className="pillar-title">Sứ mệnh</h3>
                <p className="pillar-desc">
                  Biến AI thành trợ thủ đắc lực cho mọi người trong công việc và cuộc sống.
                </p>
              </div>

              {/* Pillar 2: Tầm nhìn */}
              <div className="company-pillar-card">
                <div className="pillar-icon-box">
                  <Eye size={22} color="#2563EB" />
                </div>
                <h3 className="pillar-title">Tầm nhìn</h3>
                <p className="pillar-desc">
                  Trở thành nền tảng AI hàng đầu châu Á, góp phần xây dựng một xã hội thông minh và bền vững.
                </p>
              </div>

              {/* Pillar 3: Giá trị cốt lõi */}
              <div className="company-pillar-card">
                <div className="pillar-icon-box">
                  <Heart size={22} color="#2563EB" fill="#EFF6FF" />
                </div>
                <h3 className="pillar-title">Giá trị cốt lõi</h3>
                <ul className="pillar-checklist">
                  <li>
                    <span className="pillar-check-badge">
                      <Check size={11} color="#FFFFFF" strokeWidth={3} />
                    </span>
                    <span>Lấy người dùng làm trung tâm</span>
                  </li>
                  <li>
                    <span className="pillar-check-badge">
                      <Check size={11} color="#FFFFFF" strokeWidth={3} />
                    </span>
                    <span>Đổi mới không ngừng</span>
                  </li>
                  <li>
                    <span className="pillar-check-badge">
                      <Check size={11} color="#FFFFFF" strokeWidth={3} />
                    </span>
                    <span>An toàn và minh bạch</span>
                  </li>
                  <li>
                    <span className="pillar-check-badge">
                      <Check size={11} color="#FFFFFF" strokeWidth={3} />
                    </span>
                    <span>Cùng phát triển</span>
                  </li>
                </ul>
              </div>

              {/* Pillar 4: Founder Quote Card */}
              <div className="company-pillar-card card-founder-quote">
                <div className="quote-mark-icon" aria-hidden="true">
                  <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                    <path d="M7.5 0C3.36 0 0 3.36 0 7.5C0 11.64 2.8 15.68 7 19.32L9.34 16.98C6.54 14.74 5 12.32 5 10H8C10.76 10 13 7.76 13 5C13 2.24 10.76 0 8 0H7.5ZM21.5 0C17.36 0 14 3.36 14 7.5C14 11.64 16.8 15.68 21 19.32L23.34 16.98C20.54 14.74 19 12.32 19 10H22C24.76 10 27 7.76 27 5C27 2.24 24.76 0 22 0H21.5Z" fill="#93C5FD"/>
                  </svg>
                </div>
                <p className="founder-quote-text">
                  Chúng tôi tin rằng công nghệ chỉ thực sự có ý nghĩa khi nó giúp con người sống tốt đẹp hơn.
                </p>
                <div className="founder-info-row">
                  <img
                    src="/executive_portrait.jpg"
                    alt="Trần Minh Quân - CEO & Co-founder Topdoo"
                    className="founder-avatar-img"
                  />
                  <div>
                    <h4 className="founder-name">Trần Minh Quân</h4>
                    <span className="founder-role">CEO & Co-founder Topdoo</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. Hành trình phát triển & Được tin tưởng bởi */}
          <section className="company-journey-section">
            <div className="company-journey-grid">
              {/* Left Column: Timeline Stepper */}
              <div className="company-timeline-card">
                <h3 className="journey-block-title">Hành trình phát triển</h3>

                <div className="timeline-horizontal-track">
                  <div className="timeline-line-rail" />

                  <div className="timeline-nodes-row">
                    {milestones.map((m, idx) => (
                      <div
                        key={m.year}
                        className={`timeline-node-item ${selectedMilestone === idx ? 'selected' : ''}`}
                        onClick={() => setSelectedMilestone(idx)}
                        title={`${m.year}: ${m.desc}`}
                      >
                        <div className="timeline-dot-circle" />
                        <div className="timeline-year">{m.year}</div>
                        <div className="timeline-sub-title">{m.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Partners Grid */}
              <div className="company-partners-card">
                <div className="partners-card-header">
                  <h3 className="journey-block-title">Được tin tưởng bởi</h3>
                  <button
                    type="button"
                    className="btn-partners-view-all"
                    onClick={() => {
                      showToast('Đối tác chiến lược', 'Topdoo hiện đang phục vụ hơn 50+ doanh nghiệp hàng đầu.', 'info');
                    }}
                  >
                    <span>Xem tất cả</span>
                    <ArrowRight size={13} />
                  </button>
                </div>

                <div className="company-partners-grid">
                  {/* Vietcombank */}
                  <div className="partner-logo-box" title="Vietcombank">
                    <svg width="14" height="12" viewBox="0 0 14 12" fill="none">
                      <polygon points="7,1 13,11 1,11" fill="#00843D" />
                    </svg>
                    <span className="partner-name-vcb">Vietcombank</span>
                  </div>

                  {/* FPT */}
                  <div className="partner-logo-box" title="FPT Corporation">
                    <span className="partner-name-fpt">
                      <span className="fpt-orange">F</span>
                      <span className="fpt-blue">P</span>
                      <span className="fpt-green">T</span>
                    </span>
                  </div>

                  {/* SAMSUNG */}
                  <div className="partner-logo-box" title="Samsung">
                    <span className="partner-name-samsung">SAMSUNG</span>
                  </div>

                  {/* Shopee */}
                  <div className="partner-logo-box" title="Shopee">
                    <svg width="14" height="16" viewBox="0 0 16 18" fill="none">
                      <path d="M13.5 4.5H11.5C11.5 2.57 9.93 1 8 1C6.07 1 4.5 2.57 4.5 4.5H2.5C1.67 4.5 1 5.17 1 6L2.2 15.6C2.28 16.38 2.94 17 3.73 17H12.27C13.06 17 13.72 16.38 13.8 15.6L15 6C15 5.17 14.33 4.5 13.5 4.5ZM8 2.5C9.1 2.5 10 3.4 10 4.5H6C6 3.4 6.9 2.5 8 2.5Z" fill="#EE4D2D"/>
                      <path d="M9.5 9.5C9.5 8.9 9 8.5 8.2 8.3C7.2 8.1 6.8 7.8 6.8 7.3C6.8 6.8 7.3 6.4 8 6.4C8.7 6.4 9.1 6.7 9.2 7.3H10.1C10 6.3 9.2 5.6 8 5.6C6.8 5.6 5.9 6.3 5.9 7.4C5.9 8.4 6.6 8.8 7.6 9C8.6 9.2 8.9 9.6 8.9 10.1C8.9 10.7 8.3 11.1 7.6 11.1C6.7 11.1 6.2 10.7 6.1 9.9H5.1C5.2 11.1 6.2 11.9 7.6 11.9C8.8 11.9 9.8 11.1 9.8 9.9L9.5 9.5Z" fill="#FFFFFF"/>
                    </svg>
                    <span className="partner-name-shopee">Shopee</span>
                  </div>

                  {/* MB Bank */}
                  <div className="partner-logo-box" title="MB Bank">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <rect x="2" y="2" width="20" height="20" rx="4" fill="#004899"/>
                      <path d="M12 5.5L13.8 9.5H18L14.6 12.2L15.9 16.5L12 13.8L8.1 16.5L9.4 12.2L6 9.5H10.2L12 5.5Z" fill="#FFFFFF"/>
                    </svg>
                    <span className="partner-name-mb">MB Bank</span>
                  </div>

                  {/* VNG */}
                  <div className="partner-logo-box" title="VNG">
                    <span className="partner-name-vng">VNG</span>
                  </div>

                  {/* PNJ */}
                  <div className="partner-logo-box" title="PNJ">
                    <svg width="15" height="14" viewBox="0 0 24 22" fill="none">
                      <path d="M12 2L2 8L12 20L22 8L12 2Z" stroke="#002D72" strokeWidth="2" fill="#EBF3FE"/>
                      <path d="M2 8H22M12 2L7 8L12 20L17 8L12 2Z" stroke="#002D72" strokeWidth="1.5"/>
                    </svg>
                    <span className="partner-name-pnj">PNJ</span>
                  </div>

                  {/* Grab */}
                  <div className="partner-logo-box" title="Grab">
                    <span className="partner-name-grab">Grab</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7. Bottom CTA Banner: Cùng Topdoo kiến tạo tương lai */}
          <section className="company-bottom-cta-banner">
            {/* Globe Wireframe Background Graphic */}
            <div className="cta-globe-illustration" aria-hidden="true">
              <svg width="340" height="220" viewBox="0 0 340 220" fill="none">
                <circle cx="210" cy="110" r="95" stroke="rgba(255, 255, 255, 0.22)" strokeWidth="1.5" strokeDasharray="3 3"/>
                <ellipse cx="210" cy="110" rx="95" ry="42" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5"/>
                <ellipse cx="210" cy="110" rx="42" ry="95" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.5"/>
                <line x1="115" y1="110" x2="305" y2="110" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1"/>
                <line x1="210" y1="15" x2="210" y2="205" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1"/>
              </svg>
            </div>

            <div className="cta-banner-content">
              <div className="cta-banner-left">
                <h2 className="cta-banner-title">Cùng Topdoo kiến tạo tương lai</h2>
                <p className="cta-banner-desc">
                  Chúng tôi luôn tìm kiếm những con người tài năng, những đối tác chiến lược và những ý tưởng đột phá để cùng nhau xây dựng một thế giới tốt đẹp hơn.
                </p>
              </div>

              <div className="cta-banner-actions">
                <button
                  type="button"
                  className="btn-cta-careers"
                  onClick={() => setIsCareersModalOpen(true)}
                >
                  <span>Gia nhập đội ngũ</span>
                  <ArrowRight size={15} />
                </button>

                <button
                  type="button"
                  className="btn-cta-partner"
                  onClick={() => setIsPartnerModalOpen(true)}
                >
                  <span>Liên hệ hợp tác</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Handwritten Signature Far Right */}
            <div className="cta-script-slogan">
              <span>Stronger</span>
              <span>Together</span>
            </div>
          </section>
        </div>
      </main>

      {/* MODAL 1: Video Showcase Modal */}
      {isVideoModalOpen && (
        <div className="plan-modal-overlay" onClick={() => setIsVideoModalOpen(false)}>
          <div className="plan-modal-dialog company-video-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <X size={18} />
            </button>

            <h3 className="modal-title" style={{ textAlign: 'left', marginBottom: 12 }}>
              Hành trình Topdoo – Kiến tạo tương lai số
            </h3>

            <div className="company-video-wrapper">
              <div className="video-player-mock">
                <div className="video-overlay-pulse">
                  <Play size={48} fill="#FFFFFF" color="#FFFFFF" />
                </div>
                <div className="video-bottom-controls">
                  <span className="video-track-bar"><span className="video-progress-fill" /></span>
                  <div className="video-time-row">
                    <span>01:45 / 03:20</span>
                    <span>1080p Full HD</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="modal-desc" style={{ textAlign: 'left', marginTop: 12 }}>
              Khám phá văn hóa làm việc, câu chuyện khởi nguồn và triết lý công nghệ vị nhân sinh của đội ngũ Topdoo qua những thước phim tài liệu chân thực.
            </p>
          </div>
        </div>
      )}

      {/* MODAL 2: Careers Modal */}
      {isCareersModalOpen && (
        <div className="plan-modal-overlay" onClick={() => setIsCareersModalOpen(false)}>
          <div className="plan-modal-dialog career-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsCareersModalOpen(false)}
            >
              <X size={18} />
            </button>

            <div className="modal-header-icon-box">
              <Briefcase size={36} color="#0062FF" />
            </div>

            <h3 className="modal-title">Gia nhập đội ngũ Topdoo</h3>
            <p className="modal-desc">
              Chúng tôi luôn chào đón những kỹ sư, nhà thiết kế và chuyên gia công nghệ xuất sắc.
            </p>

            <form onSubmit={handleCareerSubmit} className="company-modal-form">
              <div className="form-group-item">
                <label>Họ và tên *</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={careerForm.name}
                  onChange={(e) => setCareerForm({ ...careerForm, name: e.target.value })}
                />
              </div>

              <div className="form-group-item">
                <label>Email liên hệ *</label>
                <input
                  type="email"
                  required
                  placeholder="name@email.com"
                  value={careerForm.email}
                  onChange={(e) => setCareerForm({ ...careerForm, email: e.target.value })}
                />
              </div>

              <div className="form-group-item">
                <label>Vị trí quan tâm *</label>
                <select
                  value={careerForm.position}
                  onChange={(e) => setCareerForm({ ...careerForm, position: e.target.value })}
                >
                  <option value="AI Engineer">Senior AI / ML Research Engineer</option>
                  <option value="Frontend Architect">Lead Frontend Architect (React / UI)</option>
                  <option value="Security Specialist">Cybersecurity & Threat Analyst</option>
                  <option value="Product Manager">AI Platform Product Manager</option>
                  <option value="Other">Vị trí khác</option>
                </select>
              </div>

              <div className="form-group-item">
                <label>Link CV / LinkedIn / Portfolio</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={careerForm.portfolio}
                  onChange={(e) => setCareerForm({ ...careerForm, portfolio: e.target.value })}
                />
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setIsCareersModalOpen(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-modal-confirm">
                  <span>Gửi hồ sơ ứng tuyển</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Partner Consultation Modal */}
      {isPartnerModalOpen && (
        <div className="plan-modal-overlay" onClick={() => setIsPartnerModalOpen(false)}>
          <div className="plan-modal-dialog partner-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsPartnerModalOpen(false)}
            >
              <X size={18} />
            </button>

            <div className="modal-header-icon-box">
              <Building size={36} color="#0062FF" />
            </div>

            <h3 className="modal-title">Hợp tác chiến lược cùng Topdoo</h3>
            <p className="modal-desc">
              Kết nối doanh nghiệp của bạn với công nghệ AI và hệ sinh thái giải pháp số toàn diện.
            </p>

            <form onSubmit={handlePartnerSubmit} className="company-modal-form">
              <div className="form-group-item">
                <label>Tên doanh nghiệp / Tổ chức *</label>
                <input
                  type="text"
                  required
                  placeholder="Tập đoàn ABC"
                  value={partnerForm.companyName}
                  onChange={(e) => setPartnerForm({ ...partnerForm, companyName: e.target.value })}
                />
              </div>

              <div className="form-group-item">
                <label>Người đại diện *</label>
                <input
                  type="text"
                  required
                  placeholder="Họ và tên"
                  value={partnerForm.contactName}
                  onChange={(e) => setPartnerForm({ ...partnerForm, contactName: e.target.value })}
                />
              </div>

              <div className="form-row-2cols">
                <div className="form-group-item">
                  <label>Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="contact@company.com"
                    value={partnerForm.email}
                    onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group-item">
                  <label>Số điện thoại *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={partnerForm.phone}
                    onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group-item">
                <label>Nhu cầu hợp tác</label>
                <textarea
                  rows={3}
                  placeholder="Mô tả ngắn gọn về nhu cầu giải pháp AI hoặc tích hợp bảo mật..."
                  value={partnerForm.notes}
                  onChange={(e) => setPartnerForm({ ...partnerForm, notes: e.target.value })}
                />
              </div>

              <div className="modal-actions-row">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setIsPartnerModalOpen(false)}
                >
                  Đóng
                </button>
                <button type="submit" className="btn-modal-confirm">
                  <span>Gửi thông tin hợp tác</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Story Detail Modal */}
      {isStoryModalOpen && (
        <div className="plan-modal-overlay" onClick={() => setIsStoryModalOpen(false)}>
          <div className="plan-modal-dialog story-detail-dialog" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsStoryModalOpen(false)}
            >
              <X size={18} />
            </button>

            <h3 className="modal-title" style={{ textAlign: 'left', marginBottom: 12 }}>
              Hành trình khởi nghiệp & Triết lý Topdoo
            </h3>

            <div style={{ textAlign: 'left', fontSize: 14, color: '#374151', lineHeight: 1.65 }}>
              <p>
                Khởi đầu vào năm 2021 tại TP. Hồ Chí Minh từ một nhóm nghiên cứu nhỏ chuyên sâu về trí tuệ nhân tạo và xử lý ngôn ngữ tự nhiên, Topdoo được thành lập với niềm tin kiên định: <em>Công nghệ tiên tiến nhất chỉ phát huy giá trị cao nhất khi phục vụ con người một cách gần gũi, an toàn và trực quan.</em>
              </p>
              <p style={{ marginTop: 10 }}>
                Trải qua 5 năm phát triển, hệ sinh thái TOP đã mở rộng thành chuỗi giải pháp toàn diện gồm: <strong>Topdoo AI</strong> (trợ lý thông minh), <strong>Topdoo Studio</strong> (sản xuất nội dung đa phương tiện), <strong>Topdoo Tools</strong> (công cụ tự động hóa) và <strong>Topdoo Security</strong> (an ninh mạng và phòng chống lừa đảo trực tuyến).
              </p>
              <p style={{ marginTop: 10 }}>
                Chúng tôi tự hào đồng hành cùng hơn 10 triệu người dùng và 50+ tập đoàn lớn trong khu vực để kiến tạo một tương lai số an toàn và thịnh vượng.
              </p>
            </div>

            <div className="modal-actions-row" style={{ marginTop: 20 }}>
              <button
                type="button"
                className="btn-modal-confirm"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => setIsStoryModalOpen(false)}
              >
                <span>Đã hiểu</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Footer */}
      <MarketingFooter />
    </div>
  );
}
