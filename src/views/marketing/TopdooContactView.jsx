import React, { useState } from 'react';
import {
  Headphones,
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowRight,
  Send,
  CheckCircle2,
  Heart,
  ShieldCheck,
  FileText,
  ListFilter,
  Users,
  Check
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooContactView() {
  const { navigateMarketing, showToast } = useSecurity();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    demandType: '',
    message: '',
    agreedPolicy: true
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Accordion FAQ State
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (idx) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  const handleInputChange = (field, val) => {
    if (field === 'message' && val.length > 500) return;
    setFormData((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      showToast('Lỗi nhập liệu', 'Vui lòng nhập họ và tên của bạn.', 'error');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      showToast('Lỗi nhập liệu', 'Vui lòng nhập địa chỉ email hợp lệ.', 'error');
      return;
    }
    if (!formData.phone.trim()) {
      showToast('Lỗi nhập liệu', 'Vui lòng nhập số điện thoại liên hệ.', 'error');
      return;
    }
    if (!formData.agreedPolicy) {
      showToast('Lỗi chính sách', 'Vui lòng đồng ý với Chính sách bảo mật thông tin.', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      showToast(
        'Gửi yêu cầu thành công!',
        'Cảm ơn bạn. Chuyên gia Topdoo sẽ liên hệ tư vấn trong vòng 24 giờ làm việc.',
        'success'
      );
    }, 800);
  };

  // 5 FAQs matching mockup
  const faqList = [
    {
      q: 'Tôi sẽ nhận được phản hồi trong bao lâu?',
      a: 'Thông thường, đội ngũ chuyên gia Topdoo sẽ liên hệ lại với bạn trong vòng 2 - 4 giờ làm việc, và cam kết tối đa không quá 24 giờ kể từ khi nhận được yêu cầu tư vấn.'
    },
    {
      q: 'Topdoo có tư vấn demo sản phẩm không?',
      a: 'Có, chúng tôi cung cấp các buổi demo 1:1 trực tiếp qua Google Meet hoặc Zoom để hướng dẫn chi tiết tính năng và cách ứng dụng giải pháp AI vào thực tế công việc của bạn.'
    },
    {
      q: 'Chi phí tư vấn có mất phí không?',
      a: 'Hoàn toàn miễn phí. Đội ngũ chuyên gia của Topdoo luôn sẵn sàng lắng nghe, đánh giá nhu cầu và đề xuất lộ trình giải pháp phù hợp nhất mà bạn không phải trả bất kỳ khoản phí nào.'
    },
    {
      q: 'Doanh nghiệp có thể yêu cầu giải pháp riêng không?',
      a: 'Chắc chắn rồi. Chúng tôi có đội ngũ kỹ sư giải pháp giàu kinh nghiệm sẵn sàng may đo các mô hình AI Agents, tối ưu quy trình và tích hợp API theo đặc thù riêng của từng doanh nghiệp.'
    },
    {
      q: 'Tôi có thể liên hệ qua những kênh nào?',
      a: 'Bạn có thể gửi biểu mẫu trực tuyến, gọi trực tiếp hotline 1900 1234, gửi email về support@topdoo.com hoặc sử dụng tính năng Chat trực tuyến trên website.'
    }
  ];

  // 6 Partner Brands for bottom strip
  const partnerLogos = [
    {
      name: 'Vietcombank',
      render: () => (
        <svg viewBox="0 0 160 36" height="24" fill="none">
          <path d="M12 26L4 10h7l4.5 10L20 10h7l-8 16h-7z" fill="#006633" />
          <text x="32" y="23" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#0F172A">Vietcombank</text>
        </svg>
      )
    },
    {
      name: 'FPT',
      render: () => (
        <svg viewBox="0 0 90 36" height="24" fill="none">
          <g transform="skewX(-14)">
            <rect x="6" y="8" width="8" height="20" rx="2" fill="#F37021" />
            <rect x="18" y="8" width="8" height="20" rx="2" fill="#005DAB" />
            <rect x="30" y="8" width="8" height="20" rx="2" fill="#00A651" />
          </g>
          <text x="46" y="24" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="900" fontStyle="italic" fill="#0F172A">FPT</text>
        </svg>
      )
    },
    {
      name: 'MBBank',
      render: () => (
        <svg viewBox="0 0 110 36" height="24" fill="none">
          <path d="M8 12h4l3 7 3-7h4v14h-3v-9l-3 7h-2l-3-7v9h-3V12z" fill="#005BAA" />
          <path d="M24 12h5c2 0 4 1 4 3 0 1.5-.8 2.5-2 2.8 1.5.4 2.5 1.5 2.5 3.2 0 2.5-2 4-5 4h-4.5V12zm3 4.5h2c.8 0 1.5-.4 1.5-1.2s-.7-1.3-1.5-1.3h-2v2.5zm0 6.5h2.2c1 0 1.8-.5 1.8-1.5 0-.9-.8-1.5-1.8-1.5H27V23z" fill="#EE0033" />
          <text x="40" y="23" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fill="#0F172A">Bank</text>
        </svg>
      )
    },
    {
      name: 'Shopee',
      render: () => (
        <svg viewBox="0 0 100 36" height="24" fill="none">
          <rect x="4" y="10" width="16" height="15" rx="3" fill="#EE4D2D" />
          <path d="M12 15c-2 0-2 1-2 1.5 0 1.5 3 1.5 3 3 0 1.5-1.5 2-2.5 2s-2.5-.5-2.5-1.5" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
          <text x="26" y="23" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="#0F172A">Shopee</text>
        </svg>
      )
    },
    {
      name: 'Samsung',
      render: () => (
        <svg viewBox="0 0 110 36" height="24" fill="none">
          <text x="4" y="23" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="900" fill="#034EA2" letterSpacing="0.8px">SAMSUNG</text>
        </svg>
      )
    },
    {
      name: 'PNJ',
      render: () => (
        <svg viewBox="0 0 85 36" height="24" fill="none">
          <path d="M6 18L12 8l6 10-6 10-6-10z" fill="#F4B400" />
          <path d="M12 8l6 10h-12l6-10z" fill="#0F4C81" />
          <text x="24" y="24" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#0F172A">PNJ</text>
        </svg>
      )
    }
  ];

  return (
    <div className="topdoo-contact-page">
      <MarketingHeader />

      {/* =========================================================================
          1. HERO SECTION (FULL WIDTH EDGE-TO-EDGE LIKE TRANG CHỦ / BUSINESS)
          ========================================================================= */}
      <section className="contact-hero-section full-width-hero">
        {/* Background Banner Image spanning 100% full width */}
        <img
          src="/bannerSupport.png"
          alt="Topdoo Hỗ trợ & Tư vấn"
          className="contact-hero-bg-img"
        />

        <div className="landing-container contact-hero-container">
          {/* Breadcrumbs embedded at the top of hero */}
          <div className="contact-breadcrumbs">
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Trang chủ
            </button>
            <ChevronRight size={14} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Liên hệ tư vấn</span>
          </div>

          <div className="contact-hero-grid">
            {/* Left Content Column */}
            <div className="contact-hero-left">
              {/* Badge: LIÊN HỆ TƯ VẤN */}
              <div className="contact-badge-pill">
                <div className="contact-badge-icon-box">
                  <Headphones size={13} color="#2563EB" />
                </div>
                <span>LIÊN HỆ TƯ VẤN</span>
              </div>

              {/* Title */}
              <h1 className="contact-hero-title">
                Chúng tôi luôn sẵn sàng<br />
                <span className="contact-title-blue">đồng hành cùng bạn</span>
              </h1>

              {/* Subtitle */}
              <p className="contact-hero-desc">
                Hãy chia sẻ nhu cầu của bạn, đội ngũ chuyên gia Topdoo sẽ tư vấn giải pháp AI phù hợp nhất cho cá nhân, doanh nghiệp và tổ chức.
              </p>

              {/* 4 Feature Pills in Row */}
              <div className="contact-features-row">
                <div className="contact-feature-item">
                  <div className="feature-icon-circle">
                    <Phone size={15} color="#2563EB" />
                  </div>
                  <div className="feature-text-block">
                    <span className="feature-bold">Phản hồi nhanh</span>
                    <span className="feature-sub">trong 24h</span>
                  </div>
                </div>

                <div className="contact-feature-item">
                  <div className="feature-icon-circle">
                    <Users size={15} color="#2563EB" />
                  </div>
                  <div className="feature-text-block">
                    <span className="feature-bold">Tư vấn 1:1</span>
                    <span className="feature-sub">cùng chuyên gia</span>
                  </div>
                </div>

                <div className="contact-feature-item">
                  <div className="feature-icon-circle">
                    <ShieldCheck size={15} color="#2563EB" />
                  </div>
                  <div className="feature-text-block">
                    <span className="feature-bold">Giải pháp phù hợp</span>
                    <span className="feature-sub">với nhu cầu thực tế</span>
                  </div>
                </div>

                <div className="contact-feature-item">
                  <div className="feature-icon-circle">
                    <Heart size={15} color="#2563EB" fill="#2563EB" />
                  </div>
                  <div className="feature-text-block">
                    <span className="feature-bold">Đồng hành dài hạn</span>
                    <span className="feature-sub">và hỗ trợ liên tục</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual Area: Banner image already contains 3D robot, speech bubble & checklist */}
            <div className="contact-hero-right"></div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. MAIN CONTENT (FORM + INFO & FAQ)
          ========================================================================= */}
      <section className="contact-main-section">
        <div className="landing-container">
          <div className="contact-main-grid">
            {/* ================= LEFT: FORM CARD ================= */}
            <div className="contact-form-card">
              <div className="form-card-header">
                <h2 className="form-card-title">Gửi yêu cầu tư vấn</h2>
                <p className="form-card-subtitle">
                  Điền thông tin để đội ngũ Topdoo liên hệ và tư vấn giải pháp phù hợp nhất cho bạn.
                </p>
              </div>

              {formSubmitted ? (
                <div className="form-success-state">
                  <div className="success-icon-wrap">
                    <CheckCircle2 size={48} color="#16A34A" />
                  </div>
                  <h3 className="success-title">Yêu cầu đã được gửi thành công!</h3>
                  <p className="success-desc">
                    Cảm ơn <strong>{formData.fullName}</strong>. Chuyên gia tư vấn của Topdoo sẽ liên hệ với bạn qua số điện thoại <strong>{formData.phone}</strong> hoặc email <strong>{formData.email}</strong> trong thời gian sớm nhất.
                  </p>
                  <button
                    className="btn-success-reset"
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        demandType: '',
                        message: '',
                        agreedPolicy: true
                      });
                    }}
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form className="contact-form-body" onSubmit={handleSubmit}>
                  {/* 2x2 Input Grid */}
                  <div className="form-fields-grid">
                    {/* Full Name */}
                    <div className="form-group">
                      <label className="form-label">
                        Họ và tên <span className="text-required">*</span>
                      </label>
                      <div className="input-with-icon">
                        <User size={16} className="input-icon" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          placeholder="Nguyễn Văn A"
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="form-group">
                      <label className="form-label">
                        Email <span className="text-required">*</span>
                      </label>
                      <div className="input-with-icon">
                        <Mail size={16} className="input-icon" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="yourname@company.com"
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                      <label className="form-label">
                        Số điện thoại <span className="text-required">*</span>
                      </label>
                      <div className="input-with-icon">
                        <Phone size={16} className="input-icon" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          placeholder="0123 456 789"
                          className="form-input"
                        />
                      </div>
                    </div>

                    {/* Demand Type Dropdown */}
                    <div className="form-group">
                      <label className="form-label">
                        Loại nhu cầu <span className="text-required">*</span>
                      </label>
                      <div className="input-with-icon select-wrap">
                        <ListFilter size={16} className="input-icon" />
                        <select
                          value={formData.demandType}
                          onChange={(e) => handleInputChange('demandType', e.target.value)}
                          className="form-input form-select"
                        >
                          <option value="">Chọn nhu cầu của bạn</option>
                          <option value="business">Tư vấn giải pháp Doanh nghiệp</option>
                          <option value="agents">Xây dựng AI Agents chuyên biệt</option>
                          <option value="api">Tích hợp API & SDK</option>
                          <option value="personal">Giải pháp AI cho Cá nhân / Creator</option>
                          <option value="education">Đào tạo & Giáo dục AI</option>
                          <option value="other">Nhu cầu khác</option>
                        </select>
                        <ChevronDown size={14} className="select-chevron" />
                      </div>
                    </div>
                  </div>

                  {/* Message Textarea */}
                  <div className="form-group">
                    <label className="form-label">
                      Nội dung tư vấn <span className="text-required">*</span>
                    </label>
                    <div className="textarea-with-icon">
                      <FileText size={16} className="textarea-icon" />
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Hãy chia sẻ chi tiết về nhu cầu, mục tiêu hoặc câu hỏi của bạn..."
                        className="form-textarea"
                      />
                    </div>
                    <div className="textarea-char-count">
                      {formData.message.length}/500
                    </div>
                  </div>

                  {/* Checkbox Policy */}
                  <div className="form-policy-check">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.agreedPolicy}
                        onChange={(e) => handleInputChange('agreedPolicy', e.target.checked)}
                        className="policy-checkbox"
                      />
                      <span>
                        Tôi đồng ý với{' '}
                        <button
                          type="button"
                          className="policy-link-btn"
                          onClick={() => showToast('Chính sách bảo mật', 'Topdoo cam kết bảo mật 100% dữ liệu và thông tin liên hệ của bạn.', 'info')}
                        >
                          Chính sách bảo mật thông tin
                        </button>{' '}
                        của Topdoo
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-submit-contact"
                  >
                    <span>{isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* ================= RIGHT COLUMN (CONTACT INFO + FAQ) ================= */}
            <div className="contact-right-col">
              {/* TOP ROW: Contact Info + Tower Card */}
              <div className="contact-info-tower-row">
                {/* 1. Contact Methods */}
                <div className="contact-methods-box">
                  <h3 className="methods-box-title">Thông tin liên hệ</h3>
                  <p className="methods-box-subtitle">
                    Bạn cũng có thể liên hệ với chúng tôi qua các kênh dưới đây.
                  </p>

                  <div className="methods-list">
                    {/* Hotline */}
                    <div className="method-item">
                      <div className="method-icon-circle">
                        <Phone size={18} color="#2563EB" />
                      </div>
                      <div className="method-text">
                        <div className="method-label-row">
                          <span className="method-label">Hotline</span>
                          <span className="method-val-blue">1900 1234</span>
                        </div>
                        <div className="method-note">(Thứ 2 - Thứ 6, 8:00 - 18:00)</div>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="method-item">
                      <div className="method-icon-circle">
                        <Mail size={18} color="#2563EB" />
                      </div>
                      <div className="method-text">
                        <div className="method-label-row">
                          <span className="method-label">Email</span>
                          <span className="method-val-blue">support@topdoo.com</span>
                        </div>
                        <div className="method-note">Phản hồi trong vòng 24h</div>
                      </div>
                    </div>

                    {/* Địa chỉ */}
                    <div className="method-item">
                      <div className="method-icon-circle">
                        <MapPin size={18} color="#2563EB" />
                      </div>
                      <div className="method-text">
                        <div className="method-label-row">
                          <span className="method-label">Địa chỉ</span>
                          <span className="method-val-dark">Tầng 10, Tòa nhà Topdoo</span>
                        </div>
                        <div className="method-note">Số 123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</div>
                      </div>
                    </div>

                    {/* Chat trực tuyến */}
                    <div className="method-item chat-item">
                      <div className="method-icon-circle">
                        <MessageSquare size={18} color="#2563EB" />
                      </div>
                      <div className="method-text chat-text-flex">
                        <div className="chat-left">
                          <div className="method-label">Chat trực tuyến</div>
                          <div className="method-note">Trò chuyện ngay với đội ngũ tư vấn</div>
                        </div>
                        <button
                          className="btn-start-chat-link"
                          onClick={() => showToast('Chat trực tuyến', 'Đang kết nối tới chuyên viên tư vấn Topdoo...', 'info')}
                        >
                          <span>Bắt đầu chat</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Topdoo Skyscraper Showcase Card */}
                <div className="contact-tower-card">
                  <img
                    src="/topdoo_tower.jpg"
                    alt="Tòa nhà trụ sở Topdoo"
                    className="tower-card-bg-img"
                  />
                  <div className="tower-card-overlay">
                    <div className="tower-card-top-content">
                      <h4 className="tower-title">
                        Cùng <span className="tower-title-bold">Topdoo</span><br />
                        kiến tạo <span className="tower-title-bold">tương lai</span><br />
                        với <span className="tower-title-bold tower-title-blue">AI</span>
                      </h4>
                      <div className="tower-accent-line"></div>
                      <p className="tower-subtitle">
                        Đối tác đáng tin cậy trên hành trình chuyển đổi số của bạn.
                      </p>
                    </div>

                    {/* Logo directly on the building glass facade */}
                    <div className="tower-facade-branding">
                      <div className="tower-facade-icon">
                        <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
                          <circle cx="16" cy="16" r="14" fill="#00C4FF" />
                          <path d="M16 6C16 6 22 12 22 17C22 20.3 19.3 23 16 23C12.7 23 10 20.3 10 17C10 12 16 6 16 6Z" fill="#0056D2" />
                          <path d="M16 11C16 11 19 14.5 19 17.5C19 19.4 17.7 21 16 21C14.3 21 13 19.4 13 17.5C13 14.5 16 11 16 11Z" fill="#FFFFFF" />
                        </svg>
                      </div>
                      <span className="tower-facade-text">TOPDOO</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM: FAQ ACCORDION */}
              <div className="contact-faq-card">
                <div className="faq-card-header">
                  <h3 className="faq-card-title">Câu hỏi thường gặp</h3>
                  <button
                    className="faq-all-link"
                    onClick={() => {
                      showToast('Câu hỏi thường gặp', 'Xem toàn bộ câu hỏi thường gặp tại trung tâm trợ giúp.', 'info');
                    }}
                  >
                    <span>Xem tất cả</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="faq-accordion-list">
                  {faqList.map((item, idx) => {
                    const isOpen = activeFaq === idx;
                    return (
                      <div
                        key={idx}
                        className={`faq-accordion-item ${isOpen ? 'open' : ''}`}
                      >
                        <button
                          className="faq-question-btn"
                          onClick={() => toggleFaq(idx)}
                          aria-expanded={isOpen}
                        >
                          <span className="faq-question-text">{item.q}</span>
                          <div className={`faq-chevron-icon ${isOpen ? 'rotate' : ''}`}>
                            <ChevronDown size={16} />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="faq-answer-pane">
                            <p>{item.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. BOTTOM PARTNER TRUST STRIP (10.000+ KHÁCH HÀNG)
          ========================================================================= */}
      <section className="contact-trust-section">
        <div className="landing-container">
          <div className="contact-trust-bar">
            {/* Left Info */}
            <div className="trust-bar-left">
              <div className="trust-users-circle">
                <Users size={22} color="#2563EB" />
              </div>
              <div className="trust-users-text">
                <div className="trust-users-title">Hơn 10.000+ khách hàng đã tin tưởng Topdoo</div>
                <div className="trust-users-desc">Chúng tôi tự hào được đồng hành cùng nhiều doanh nghiệp trong hành trình ứng dụng AI.</div>
              </div>
            </div>

            {/* Center: Logos with vertical dividers */}
            <div className="trust-bar-logos">
              {partnerLogos.map((logo, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <div className="trust-logo-divider" />}
                  <div className="trust-logo-wrap">
                    {logo.render()}
                  </div>
                </React.Fragment>
              ))}
            </div>

            {/* Right Arrow Action */}
            <button
              className="btn-trust-arrow"
              onClick={() => showToast('Đối tác & Khách hàng', 'Đang chuyển đến trang giới thiệu mạng lưới đối tác Topdoo...', 'info')}
            >
              <ArrowRight size={18} color="#2563EB" />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. FOOTER
          ========================================================================= */}
      <MarketingFooter />
    </div>
  );
}
