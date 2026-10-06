import React, { useState } from 'react';
import {
  Check,
  X,
  CheckCircle2,
  Feather,
  Crown,
  Gem,
  Building2,
  Code2,
  Users,
  Package,
  Clock,
  ShieldCheck,
  Headphones,
  Lock,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowRight,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooPricingView() {
  const { navigateMarketing, showToast } = useSecurity();

  // Billing toggle: 'monthly' | 'yearly'
  const [billingCycle, setBillingCycle] = useState('monthly');

  // FAQ accordion state
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const faqList = [
    {
      q: 'Tôi có thể dùng thử miễn phí bao lâu?',
      a: 'Gói Free không giới hạn thời gian. Với gói Pro, bạn được trải nghiệm miễn phí 7 ngày đầy đủ tính năng cao cấp trước khi quyết định gia hạn.'
    },
    {
      q: 'Có cần thẻ tín dụng khi đăng ký không?',
      a: 'Không, bạn chỉ cần đăng nhập bằng Email hoặc Google để bắt đầu sử dụng gói Free và dùng thử mà không cần nhập bất kỳ thông tin thanh toán nào.'
    },
    {
      q: 'Có thể nâng cấp hoặc hủy gói bất cứ lúc nào?',
      a: 'Hoàn toàn có thể. Bạn có thể tự do nâng cấp, hạ cấp hoặc hủy gói bất kỳ lúc nào trực tiếp trong bảng điều khiển tài khoản mà không bị phạt phí.'
    },
    {
      q: 'Gói Business có gì khác so với Pro?',
      a: 'Gói Business hỗ trợ quản trị nhiều thành viên trong tổ chức, phân quyền chuyên sâu, dung lượng lưu trữ lớn hơn, cam kết SLA bảo mật và có quản lý riêng hỗ trợ 24/7.'
    },
    {
      q: 'Topdoo có hoàn tiền không?',
      a: 'Topdoo có chính sách hoàn tiền 100% trong vòng 14 ngày đầu tiên kể từ khi nâng cấp gói trả phí nếu bạn không hài lòng về chất lượng dịch vụ.'
    }
  ];

  return (
    <div className="topdoo-pricing-page">
      <MarketingHeader />

      {/* 1. Hero Section with bannerPriceroute.png (Full Width Edge-to-Edge) */}
      <section className="pricing-hero-section full-width-hero">
        {/* Background Image: bannerPriceroute.png spanning 100% full width */}
        <img
          src="/bannerPriceroute.png"
          alt="Bảng giá Topdoo AI"
          className="pricing-hero-bg-img"
        />

        <div className="landing-container pricing-hero-container">
          {/* Breadcrumbs embedded at the top of hero */}
          <div className="pricing-breadcrumbs">
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Trang chủ
            </button>
            <ChevronRight size={14} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Bảng giá</span>
          </div>

          {/* Left Content Column */}
          <div className="pricing-hero-left">
            {/* Badge: BẢNG GIÁ TOPDOO */}
            <div className="pricing-badge-label">
              <span>BẢNG GIÁ TOPDOO</span>
            </div>

            {/* Title */}
            <h1 className="pricing-hero-title">
              Chọn gói phù hợp <span className="pricing-title-blue">với bạn</span>
            </h1>

            {/* Subtitle */}
            <p className="pricing-hero-desc">
              Truy cập toàn bộ sức mạnh AI để sáng tạo, làm việc hiệu quả và an toàn hơn.
            </p>

            {/* 4 Guarantees / Trust Badges */}
            <div className="pricing-trust-pills-row">
              <div className="pricing-trust-item">
                <CheckCircle2 size={16} className="trust-check-icon" />
                <span>Không cần thẻ tín dụng</span>
              </div>
              <div className="pricing-trust-item">
                <CheckCircle2 size={16} className="trust-check-icon" />
                <span>Dùng thử miễn phí</span>
              </div>
              <div className="pricing-trust-item">
                <CheckCircle2 size={16} className="trust-check-icon" />
                <span>Nâng cấp hoặc hủy bất cứ lúc nào</span>
              </div>
              <div className="pricing-trust-item">
                <CheckCircle2 size={16} className="trust-check-icon" />
                <span>Hỗ trợ 24/7</span>
              </div>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="pricing-toggle-wrap">
              <div className="pricing-toggle-box">
                <button
                  className={`btn-toggle-cycle ${billingCycle === 'monthly' ? 'active' : ''}`}
                  onClick={() => setBillingCycle('monthly')}
                >
                  Thanh toán theo tháng
                </button>
                <button
                  className={`btn-toggle-cycle ${billingCycle === 'yearly' ? 'active' : ''}`}
                  onClick={() => setBillingCycle('yearly')}
                >
                  Thanh toán theo năm
                </button>
                <span className="pricing-save-tag">
                  Tiết kiệm đến 20%
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 5 Pricing Cards Row */}
      <section className="pricing-cards-section">
        <div className="landing-container">
          <div className="pricing-cards-grid">
            {/* Card 1: Free */}
            <div className="pricing-plan-card">
              <div className="plan-icon-wrap icon-free">
                <Feather size={20} color="#2563EB" />
              </div>
              <h3 className="plan-name">Free</h3>
              <p className="plan-subtitle">Khởi đầu dễ dàng</p>
              <div className="plan-price-row">
                <span className="price-amount">0đ</span>
                <span className="price-period">/tháng</span>
              </div>

              <button
                className="btn-plan-action btn-plan-outline"
                onClick={() => showToast('Gói Free', 'Bạn đang sử dụng gói Free mặc định.', 'info')}
              >
                Bắt đầu miễn phí
              </button>

              <div className="plan-features-list">
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>AI Chat (giới hạn)</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Truy cập công cụ cơ bản</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Sử dụng mẫu có sẵn</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>5GB lưu trữ đám mây</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Cộng đồng hỗ trợ</span>
                </div>
                <div className="plan-feature-item negative">
                  <X size={14} className="feature-x" />
                  <span>Tính năng nâng cao</span>
                </div>
              </div>

              <div className="plan-card-footer">
                <span>Phù hợp cho cá nhân mới bắt đầu</span>
              </div>
            </div>

            {/* Card 2: Plus */}
            <div className="pricing-plan-card">
              <div className="plan-icon-wrap icon-plus">
                <Crown size={20} color="#9333EA" />
              </div>
              <h3 className="plan-name">Plus</h3>
              <p className="plan-subtitle">Làm nhiều hơn mỗi ngày</p>
              <div className="plan-price-row">
                <span className="price-amount">
                  {billingCycle === 'yearly' ? '79.000đ' : '99.000đ'}
                </span>
                <span className="price-period">/tháng</span>
              </div>

              <button
                className="btn-plan-action btn-plan-primary"
                onClick={() => showToast('Nâng cấp Plus', 'Đang kết nối cổng thanh toán gói Plus...', 'success')}
              >
                Bắt đầu ngay
              </button>

              <div className="plan-features-list">
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>AI Chat không giới hạn</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>AI Search</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Tạo hình ảnh, video cơ bản</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Truy cập nhiều công cụ AI</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>50GB lưu trữ</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Hỗ trợ ưu tiên</span>
                </div>
                <div className="plan-feature-item negative">
                  <X size={14} className="feature-x" />
                  <span>Một số tính năng nâng cao</span>
                </div>
              </div>

              <div className="plan-card-footer">
                <span>Phù hợp cho cá nhân, học tập</span>
              </div>
            </div>

            {/* Card 3: Pro (Featured / Phổ biến nhất) */}
            <div className="pricing-plan-card card-featured-pro">
              <div className="badge-popular-top">
                <span>Phổ biến nhất</span>
              </div>

              <div className="plan-icon-wrap icon-pro">
                <Gem size={20} color="#2563EB" />
              </div>
              <h3 className="plan-name">Pro</h3>
              <p className="plan-subtitle">Tối ưu hiệu suất</p>
              <div className="plan-price-row">
                <span className="price-amount text-blue-featured">
                  {billingCycle === 'yearly' ? '239.000đ' : '299.000đ'}
                </span>
                <span className="price-period">/tháng</span>
              </div>

              <button
                className="btn-plan-action btn-plan-primary btn-featured"
                onClick={() => showToast('Dùng thử Pro', 'Bắt đầu 7 ngày trải nghiệm gói Pro miễn phí!', 'success')}
              >
                Dùng thử 7 ngày
              </button>

              <div className="plan-features-list">
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Toàn bộ tính năng Plus</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Deep Research</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>AI Agents (giới hạn)</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Tạo video chuyên nghiệp</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>200GB lưu trữ</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Workspace & Collaboration</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>

              <div className="plan-card-footer">
                <span>Phù hợp cho người dùng chuyên nghiệp</span>
              </div>
            </div>

            {/* Card 4: Business */}
            <div className="pricing-plan-card">
              <div className="plan-icon-wrap icon-business">
                <Building2 size={20} color="#059669" />
              </div>
              <h3 className="plan-name">Business</h3>
              <p className="plan-subtitle">Dành cho doanh nghiệp</p>
              <div className="plan-price-row">
                <span className="price-amount">Liên hệ</span>
              </div>

              <button
                className="btn-plan-action btn-plan-outline-dark"
                onClick={() => showToast('Liên hệ Doanh nghiệp', 'Liên hệ tư vấn viên: business@topdoo.com', 'info')}
              >
                Liên hệ tư vấn
              </button>

              <div className="plan-features-list">
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Tất cả tính năng Pro</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>AI Agents nâng cao</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Bảo mật doanh nghiệp</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Quản lý thành viên</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Dung lượng lưu trữ lớn</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Tích hợp SSO, SLA</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Hỗ trợ riêng 24/7</span>
                </div>
              </div>

              <div className="plan-card-footer">
                <span>Phù hợp cho doanh nghiệp, tổ chức</span>
              </div>
            </div>

            {/* Card 5: API Pricing */}
            <div className="pricing-plan-card">
              <div className="plan-icon-wrap icon-api">
                <Code2 size={20} color="#EA580C" />
              </div>
              <h3 className="plan-name">API Pricing</h3>
              <p className="plan-subtitle">Tích hợp vào sản phẩm</p>
              <div className="plan-price-row">
                <span className="price-amount price-api-text">Từ 0.000đ</span>
                <span className="price-period">/token</span>
              </div>

              <button
                className="btn-plan-action btn-plan-outline-blue"
                onClick={() => showToast('API Portal', 'Đang chuyển hướng tới tài liệu API Topdoo Developer...', 'info')}
              >
                Xem chi tiết API
              </button>

              <div className="plan-features-list">
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Truy cập API toàn diện</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Nhiều model AI</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Thanh toán theo mức sử dụng</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Tài liệu & SDK đầy đủ</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Monitoring & Logs</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Hỗ trợ kỹ thuật</span>
                </div>
                <div className="plan-feature-item positive">
                  <Check size={14} className="feature-check" />
                  <span>Ưu đãi cho doanh nghiệp</span>
                </div>
              </div>

              <div className="plan-card-footer">
                <span>Dành cho nhà phát triển</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats / Metrics Ribbon (5 metrics) */}
      <section className="pricing-stats-section">
        <div className="landing-container">
          <div className="pricing-stats-bar">
            {/* Metric 1 */}
            <div className="pricing-stat-item">
              <div className="stat-icon-wrap bg-blue-soft">
                <Users size={18} color="#2563EB" />
              </div>
              <div className="stat-text-col">
                <div className="stat-number">1M+</div>
                <div className="stat-label">Người dùng tin tưởng</div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="pricing-stat-item">
              <div className="stat-icon-wrap bg-sky-soft">
                <Package size={18} color="#0284C7" />
              </div>
              <div className="stat-text-col">
                <div className="stat-number">50+</div>
                <div className="stat-label">Công cụ AI</div>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="pricing-stat-item">
              <div className="stat-icon-wrap bg-cyan-soft">
                <Clock size={18} color="#0891B2" />
              </div>
              <div className="stat-text-col">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Thời gian hoạt động</div>
              </div>
            </div>

            {/* Metric 4 */}
            <div className="pricing-stat-item">
              <div className="stat-icon-wrap bg-indigo-soft">
                <ShieldCheck size={18} color="#4F46E5" />
              </div>
              <div className="stat-text-col">
                <div className="stat-number">Dữ liệu an toàn</div>
                <div className="stat-label">Chuẩn quốc tế</div>
              </div>
            </div>

            {/* Metric 5 */}
            <div className="pricing-stat-item">
              <div className="stat-icon-wrap bg-emerald-soft">
                <Headphones size={18} color="#059669" />
              </div>
              <div className="stat-text-col">
                <div className="stat-number">Hỗ trợ 24/7</div>
                <div className="stat-label">Luôn đồng hành</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bottom 3 Sections: Cam kết - FAQ - Chưa chắc chọn gói nào */}
      <section className="pricing-bottom-section">
        <div className="landing-container">
          <div className="pricing-bottom-grid">
            {/* Col 1: Cam kết của Topdoo */}
            <div className="pricing-bottom-card card-commitment">
              <div className="commitment-icon-wrap">
                <Lock size={22} color="#2563EB" />
              </div>
              <h3 className="commitment-title">Cam kết của Topdoo</h3>
              <p className="commitment-desc">Trải nghiệm an toàn, minh bạch và không rủi ro.</p>

              <div className="commitment-list">
                <div className="commitment-item">
                  <CheckCircle2 size={16} className="commitment-check-icon" />
                  <span>Không thu phí ẩn</span>
                </div>
                <div className="commitment-item">
                  <CheckCircle2 size={16} className="commitment-check-icon" />
                  <span>Bảo mật dữ liệu tuyệt đối</span>
                </div>
                <div className="commitment-item">
                  <CheckCircle2 size={16} className="commitment-check-icon" />
                  <span>Dễ dàng nâng cấp hoặc hủy</span>
                </div>
                <div className="commitment-item">
                  <CheckCircle2 size={16} className="commitment-check-icon" />
                  <span>Hỗ trợ 24/7</span>
                </div>
              </div>
            </div>

            {/* Col 2: Câu hỏi thường gặp */}
            <div className="pricing-bottom-card card-faq">
              <div className="faq-header-row">
                <h3 className="faq-title">Câu hỏi thường gặp</h3>
                <button
                  className="faq-link-all"
                  onClick={() => showToast('FAQ', 'Hiển thị toàn bộ câu hỏi thường gặp...', 'info')}
                >
                  <span>Xem tất cả</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="faq-accordion-list">
                {faqList.map((item, idx) => {
                  const isExpanded = expandedFaq === idx;
                  return (
                    <div key={idx} className={`faq-accordion-item ${isExpanded ? 'expanded' : ''}`}>
                      <div className="faq-question-row" onClick={() => toggleFaq(idx)}>
                        <span className="faq-question-text">{item.q}</span>
                        <ChevronDown size={14} className={`faq-chevron ${isExpanded ? 'rotate' : ''}`} />
                      </div>
                      {isExpanded && (
                        <div className="faq-answer-row">
                          <p>{item.a}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Col 3: Chưa chắc chọn gói nào? */}
            <div className="pricing-bottom-card card-consultation">
              <h3 className="consultation-title">Chưa chắc chọn gói nào?</h3>
              <p className="consultation-desc">
                Đội ngũ Topdoo sẵn sàng tư vấn giải pháp phù hợp nhất với bạn.
              </p>

              <div className="consultation-actions">
                <button
                  className="btn-consult-primary"
                  onClick={() => showToast('Tư vấn', 'Đội ngũ tư vấn sẽ liên hệ với bạn trong ít phút.', 'info')}
                >
                  Liên hệ tư vấn
                </button>
                <button
                  className="btn-consult-chat"
                  onClick={() => showToast('Chat hỗ trợ', 'Đang mở cửa sổ chat hỗ trợ trực tuyến...', 'info')}
                >
                  <MessageSquare size={14} />
                  <span>Chat với chúng tôi</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Marketing Footer */}
      <MarketingFooter />
    </div>
  );
}
