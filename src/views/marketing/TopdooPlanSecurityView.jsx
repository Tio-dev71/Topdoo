import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  Check,
  ChevronRight,
  ArrowRight,
  User,
  Crown,
  Gem,
  Building2,
  MessageCircle,
  Calendar,
  Headphones,
  DollarSign,
  RefreshCw,
  Lock,
  Sparkles,
  Users,
  CheckCircle2,
  X,
  Phone,
  Mail
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooPlanSecurityView() {
  const { navigateMarketing, setMode, setCurrentView, showToast, setActiveSecurityPlan } = useSecurity();

  // State
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
  const [isDetailComparisonExpanded, setIsDetailComparisonExpanded] = useState(false);
  const [selectedPlanModal, setSelectedPlanModal] = useState(null); // plan object to confirm
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [scheduleData, setScheduleData] = useState({ name: '', email: '', phone: '', note: '' });

  // Plan data
  const plans = [
    {
      id: 'personal',
      name: 'Personal',
      icon: User,
      iconBg: '#E0F2FE',
      iconColor: '#0284C7',
      subtitle: 'Bảo vệ cá nhân cơ bản',
      monthlyPrice: '0đ',
      yearlyPrice: '0đ',
      priceUnit: '/tháng',
      buttonText: 'Bắt đầu miễn phí',
      buttonVariant: 'outline',
      badge: null,
      isFeatured: false,
      features: [
        'Bảo vệ tài khoản cá nhân',
        'Quét mã độc cơ bản',
        'Cảnh báo website nguy hiểm',
        'Bảo vệ khi truy cập internet',
        'Hỗ trợ cộng đồng'
      ]
    },
    {
      id: 'plus',
      name: 'Plus',
      icon: Crown,
      iconBg: '#D1FAE5',
      iconColor: '#059669',
      subtitle: 'An toàn hơn mỗi ngày',
      monthlyPrice: '99.000đ',
      yearlyPrice: '79.000đ',
      priceUnit: '/tháng',
      buttonText: 'Bắt đầu ngay',
      buttonVariant: 'solid',
      badge: null,
      isFeatured: false,
      features: [
        'Tất cả tính năng Personal',
        'Bảo vệ nhiều thiết bị (tối đa 5)',
        'Chặn ransomware, phishing',
        'Giám sát rò rỉ dữ liệu',
        'Hỗ trợ ưu tiên'
      ]
    },
    {
      id: 'pro',
      name: 'Pro',
      icon: Gem,
      iconBg: '#A7F3D0',
      iconColor: '#059669',
      subtitle: 'Bảo vệ toàn diện cho cá nhân và đội nhóm nhỏ',
      monthlyPrice: '299.000đ',
      yearlyPrice: '239.000đ',
      priceUnit: '/tháng',
      buttonText: 'Dùng thử 7 ngày',
      buttonVariant: 'solid-primary',
      badge: 'Phổ biến nhất',
      isFeatured: true,
      features: [
        'Tất cả tính năng Plus',
        'Bảo vệ không giới hạn thiết bị',
        'Quét mã độc nâng cao với AI',
        'Giám sát danh tính số',
        'Tư vấn bảo mật chuyên gia',
        'Hỗ trợ 24/7'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      icon: Building2,
      iconBg: '#D1FAE5',
      iconColor: '#059669',
      subtitle: 'Dành cho doanh nghiệp',
      monthlyPrice: 'Liên hệ',
      yearlyPrice: 'Liên hệ',
      priceUnit: '',
      buttonText: 'Liên hệ tư vấn',
      buttonVariant: 'outline',
      badge: null,
      isFeatured: false,
      features: [
        'Tất cả tính năng Pro',
        'Quản lý tập trung',
        'Báo cáo bảo mật nâng cao',
        'Tích hợp với hệ thống DN',
        'Hỗ trợ triển khai & đào tạo',
        'SLA theo nhu cầu'
      ]
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlanModal(plan);
  };

  const handleConfirmPlanActivation = () => {
    if (selectedPlanModal) {
      setActiveSecurityPlan({
        id: selectedPlanModal.id,
        name: `Topdoo Security ${selectedPlanModal.name}`,
        badge: 'Đã chọn',
        subtitle: selectedPlanModal.subtitle,
        price: `${billingCycle === 'yearly' ? selectedPlanModal.yearlyPrice : selectedPlanModal.monthlyPrice}${selectedPlanModal.priceUnit}`,
        cycle: billingCycle === 'yearly' ? 'năm' : 'tháng'
      });
    }
    setSelectedPlanModal(null);
    showToast('Chọn gói thành công', `Đã chọn gói ${selectedPlanModal?.name}. Chuyển đến bước kích hoạt thanh toán...`, 'success');
    navigateMarketing('topdoo-activate-security');
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    showToast('Đã gửi tin nhắn', 'Chuyên gia bảo mật Topdoo đang kết nối và sẽ phản hồi trong giây lát!', 'success');
    setChatMessage('');
    setIsChatModalOpen(false);
  };

  const handleSendSchedule = (e) => {
    e.preventDefault();
    if (!scheduleData.name || !scheduleData.phone) {
      showToast('Thông báo', 'Vui lòng cung cấp Họ tên và Số điện thoại liên hệ.', 'warning');
      return;
    }
    showToast('Đặt lịch thành công', 'Chúng tôi đã ghi nhận lịch hẹn và sẽ gọi xác nhận trong vòng 15 phút!', 'success');
    setScheduleData({ name: '', email: '', phone: '', note: '' });
    setIsScheduleModalOpen(false);
  };

  return (
    <div className="topdoo-landing topdoo-plan-security-page">
      {/* 1. Header */}
      <MarketingHeader />

      <main className="plan-security-main-content">
        <div className="landing-container">
          {/* Breadcrumbs */}
          <div className="get-protect-breadcrumbs">
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Trang chủ
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <button className="breadcrumb-link" onClick={() => navigateMarketing('topdoo-security')}>
              Topdoo Security
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <button className="breadcrumb-link" onClick={() => navigateMarketing('topdoo-get-protect')}>
              Bắt đầu bảo vệ ngay
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Chọn gói</span>
          </div>

          {/* 2. Hero Section Banner with Mascot Artwork bannerPlanSecurity */}
          <div className="plan-security-hero-banner">
            {/* Background Robot Art Image */}
            <div className="plan-security-art-backdrop">
              <img
                src="/bannerPlanSecurity.png"
                alt="Topdoo Security AI Mascot"
                className="plan-security-robot-img"
              />
              <div className="plan-security-art-fade" />
            </div>

            {/* Left Content */}
            <div className="plan-security-hero-left">
              {/* Badge */}
              <div className="security-badge-pill">
                <div className="security-badge-icon-box">
                  <ShieldCheck size={14} color="#059669" />
                </div>
                <span>TOPDOO SECURITY</span>
              </div>

              {/* Title */}
              <h1 className="plan-security-hero-title">
                Chọn gói phù hợp <span className="security-title-emerald">với nhu cầu của bạn</span>
              </h1>

              {/* Description */}
              <p className="plan-security-hero-desc">
                Bảo vệ dữ liệu, tài khoản và hoạt động trực tuyến với Topdoo Security. Linh hoạt lựa chọn gói dịch vụ phù hợp cho cá nhân, doanh nghiệp hoặc tổ chức.
              </p>

              {/* Stepper (Tạo tài khoản -> Chọn gói -> Kích hoạt) */}
              <div className="plan-security-stepper">
                <div
                  className="step-node completed"
                  onClick={() => navigateMarketing('topdoo-get-protect')}
                  style={{ cursor: 'pointer' }}
                  title="Quay lại bước tạo tài khoản"
                >
                  <div className="step-circle step-circle-completed">
                    <Check size={12} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span className="step-label">Tạo tài khoản</span>
                </div>

                <div className="step-line step-line-active" />

                <div className="step-node active">
                  <div className="step-circle step-circle-active">2</div>
                  <span className="step-label">Chọn gói</span>
                </div>

                <div className="step-line" />

                <div
                  className="step-node"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigateMarketing('topdoo-activate-security')}
                  title="Chuyển sang bước kích hoạt"
                >
                  <div className="step-circle">3</div>
                  <span className="step-label">Kích hoạt</span>
                </div>
              </div>
            </div>

            {/* Right Overlaid Graphics over Mascot */}
            <div className="plan-security-hero-right">
              {/* Speech Bubble */}
              <div className="plan-robot-speech-bubble">
                <span className="bubble-line-1">Bảo vệ hôm nay</span>
                <span className="bubble-line-2">An tâm ngày mai!</span>
                <div className="speech-bubble-tail" />
              </div>

              {/* Script Slogan in green script font */}
              <div className="plan-robot-script-slogan">
                <span>Your Security</span>
                <span>Our Priority</span>
              </div>

              {/* Floating Pill Badges */}
              <div className="plan-robot-pill-list">
                <div className="plan-robot-pill-item">
                  <div className="robot-pill-check">
                    <Check size={10} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>An toàn dữ liệu</span>
                </div>

                <div className="plan-robot-pill-item">
                  <div className="robot-pill-check">
                    <Check size={10} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Ngăn chặn mối đe dọa</span>
                </div>

                <div className="plan-robot-pill-item">
                  <div className="robot-pill-check">
                    <Check size={10} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Bảo vệ 24/7</span>
                </div>

                <div className="plan-robot-pill-item">
                  <div className="robot-pill-check">
                    <Check size={10} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Đồng hành cùng bạn</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Billing Toggle: Tháng / Năm */}
          <div className="plan-billing-switch-wrapper">
            <div className="plan-billing-pill-container">
              <button
                type="button"
                className={`billing-tab-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                Thanh toán theo tháng
              </button>
              <button
                type="button"
                className={`billing-tab-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('yearly')}
              >
                Thanh toán theo năm
              </button>
            </div>
            <span className="billing-save-badge">Tiết kiệm đến 20%</span>
          </div>

          {/* 4. Main 2-Column Section */}
          <div className="plan-security-main-grid">
            {/* Left Column (~75%): 4 Pricing Cards + Comparison Table */}
            <div className="plan-security-left-col">
              {/* 4 Pricing Cards Row */}
              <div className="pricing-cards-quad-grid">
                {plans.map((plan) => {
                  const Icon = plan.icon;
                  const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

                  return (
                    <div
                      key={plan.id}
                      className={`pricing-quad-card ${plan.isFeatured ? 'featured' : ''}`}
                    >
                      {/* Popular Badge for Pro */}
                      {plan.badge && (
                        <div className="pricing-card-badge-pill">
                          {plan.badge}
                        </div>
                      )}

                      {/* Icon */}
                      <div
                        className="pricing-card-icon-circle"
                        style={{ backgroundColor: plan.iconBg, color: plan.iconColor }}
                      >
                        <Icon size={22} strokeWidth={2.2} />
                      </div>

                      {/* Title & Sub */}
                      <h3 className="pricing-card-name">{plan.name}</h3>
                      <p className="pricing-card-sub">{plan.subtitle}</p>

                      {/* Price */}
                      <div className="pricing-card-price-row">
                        <span className="price-number">{price}</span>
                        {plan.priceUnit && (
                          <span className="price-unit">{plan.priceUnit}</span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <button
                        type="button"
                        className={`btn-pricing-action ${plan.buttonVariant}`}
                        onClick={() => handlePlanSelect(plan)}
                      >
                        {plan.buttonText}
                      </button>

                      {/* Checklist */}
                      <ul className="pricing-card-features-list">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="feature-list-item">
                            <div className="feature-check-icon">
                              <Check size={12} strokeWidth={3} color="#059669" />
                            </div>
                            <span className="feature-text">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Quick Comparison Table Card (So sánh nhanh các gói) */}
              <div className="quick-comparison-card">
                <div className="comparison-card-header">
                  <h3 className="comparison-card-title">So sánh nhanh các gói</h3>
                  <button
                    type="button"
                    className="btn-toggle-detail-comparison"
                    onClick={() => setIsDetailComparisonExpanded(!isDetailComparisonExpanded)}
                  >
                    <span>{isDetailComparisonExpanded ? 'Thu gọn bảng so sánh' : 'Xem bảng so sánh chi tiết'}</span>
                    <ArrowRight size={14} className={isDetailComparisonExpanded ? 'rotate-90' : ''} />
                  </button>
                </div>

                <div className="comparison-table-wrapper">
                  <table className="comparison-table">
                    <thead>
                      <tr>
                        <th className="col-feature-name">Tính năng</th>
                        <th className="col-plan">Personal</th>
                        <th className="col-plan">Plus</th>
                        <th className="col-plan col-plan-pro">Pro</th>
                        <th className="col-plan">Business</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* Row 1 */}
                      <tr>
                        <td className="cell-feature-name">Bảo vệ tài khoản cá nhân</td>
                        <td className="cell-check"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                        <td className="cell-check"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                        <td className="cell-check cell-pro"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                        <td className="cell-check"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                      </tr>

                      {/* Row 2 */}
                      <tr>
                        <td className="cell-feature-name">Bảo vệ nhiều thiết bị</td>
                        <td className="cell-text">1</td>
                        <td className="cell-text">5</td>
                        <td className="cell-text cell-pro highlight-emerald">Không giới hạn</td>
                        <td className="cell-text highlight-emerald">Không giới hạn</td>
                      </tr>

                      {/* Row 3 */}
                      <tr>
                        <td className="cell-feature-name">Quét mã độc nâng cao (AI)</td>
                        <td className="cell-dash">—</td>
                        <td className="cell-check"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                        <td className="cell-check cell-pro"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                        <td className="cell-check"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                      </tr>

                      {/* Row 4 */}
                      <tr>
                        <td className="cell-feature-name">Giám sát danh tính số</td>
                        <td className="cell-dash">—</td>
                        <td className="cell-dash">—</td>
                        <td className="cell-check cell-pro"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                        <td className="cell-check"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                      </tr>

                      {/* Extended detailed features when expanded */}
                      {isDetailComparisonExpanded && (
                        <>
                          <tr>
                            <td className="cell-feature-name">Chặn ransomware & URL lừa đảo</td>
                            <td className="cell-dash">—</td>
                            <td className="cell-check"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                            <td className="cell-check cell-pro"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                            <td className="cell-check"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                          </tr>
                          <tr>
                            <td className="cell-feature-name">Security Telemetry & Báo cáo nâng cao</td>
                            <td className="cell-dash">—</td>
                            <td className="cell-dash">—</td>
                            <td className="cell-check cell-pro"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                            <td className="cell-check"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                          </tr>
                          <tr>
                            <td className="cell-feature-name">Tư vấn chuyên gia bảo mật 1-on-1</td>
                            <td className="cell-dash">—</td>
                            <td className="cell-dash">—</td>
                            <td className="cell-check cell-pro"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                            <td className="cell-check"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                          </tr>
                          <tr>
                            <td className="cell-feature-name">Quản lý tập trung & Phân quyền nhóm</td>
                            <td className="cell-dash">—</td>
                            <td className="cell-dash">—</td>
                            <td className="cell-dash">—</td>
                            <td className="cell-check"><div className="table-check-dot"><Check size={12} strokeWidth={3} /></div></td>
                          </tr>
                          <tr>
                            <td className="cell-feature-name">Cam kết SLA thời gian phản hồi</td>
                            <td className="cell-dash">—</td>
                            <td className="cell-text">48h</td>
                            <td className="cell-text cell-pro highlight-emerald">4h</td>
                            <td className="cell-text highlight-emerald">15 phút</td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column (~25%): Sidebar Cards */}
            <div className="plan-security-right-col">
              {/* Card 1: Tư vấn / Chưa chắc chọn gói nào */}
              <div className="plan-sidebar-card card-consultation">
                <h3 className="sidebar-card-title">Bạn chưa chắc chọn gói nào?</h3>
                <p className="sidebar-card-desc">
                  Đội ngũ chuyên gia Topdoo sẵn sàng tư vấn giải pháp phù hợp nhất với bạn.
                </p>

                <div className="sidebar-buttons-stack">
                  <button
                    type="button"
                    className="btn-sidebar-chat"
                    onClick={() => setIsChatModalOpen(true)}
                  >
                    <MessageCircle size={16} />
                    <span>Chat với chuyên gia</span>
                  </button>

                  <button
                    type="button"
                    className="btn-sidebar-schedule"
                    onClick={() => setIsScheduleModalOpen(true)}
                  >
                    <Calendar size={16} />
                    <span>Đặt lịch tư vấn</span>
                  </button>
                </div>
              </div>

              {/* Card 2: Cam kết của Topdoo Security */}
              <div className="plan-sidebar-card card-commitments">
                <h3 className="sidebar-card-title">Cam kết của Topdoo Security</h3>

                <div className="commitments-list">
                  {/* Commitment 1 */}
                  <div className="commitment-item">
                    <div className="commitment-icon-box">
                      <ShieldCheck size={18} color="#059669" />
                    </div>
                    <div className="commitment-text">
                      <div className="commitment-title">Bảo mật thông tin tuyệt đối</div>
                      <div className="commitment-sub">Dữ liệu của bạn luôn được mã hóa</div>
                    </div>
                  </div>

                  {/* Commitment 2 */}
                  <div className="commitment-item">
                    <div className="commitment-icon-box">
                      <DollarSign size={18} color="#059669" />
                    </div>
                    <div className="commitment-text">
                      <div className="commitment-title">Không phát sinh chi phí ẩn</div>
                      <div className="commitment-sub">Minh bạch và rõ ràng</div>
                    </div>
                  </div>

                  {/* Commitment 3 */}
                  <div className="commitment-item">
                    <div className="commitment-icon-box">
                      <Headphones size={18} color="#059669" />
                    </div>
                    <div className="commitment-text">
                      <div className="commitment-title">Hỗ trợ 24/7</div>
                      <div className="commitment-sub">Luôn đồng hành cùng bạn</div>
                    </div>
                  </div>

                  {/* Commitment 4 */}
                  <div className="commitment-item">
                    <div className="commitment-icon-box">
                      <RefreshCw size={18} color="#059669" />
                    </div>
                    <div className="commitment-text">
                      <div className="commitment-title">Cancel anytime</div>
                      <div className="commitment-sub">Dễ dàng hủy bất cứ lúc nào</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Bottom Community Social Proof Banner */}
          <div className="plan-security-bottom-banner">
            <div className="bottom-banner-left">
              <div className="bottom-banner-icon-box">
                <Users size={22} color="#0284C7" />
              </div>
              <div className="bottom-banner-text">
                <h3 className="bottom-banner-title">Hơn 10.000+ người dùng đã tin tưởng Topdoo Security</h3>
                <p className="bottom-banner-sub">
                  Hãy tham gia ngay hôm nay để bảo vệ dữ liệu và an toàn hơn trên không gian số.
                </p>
              </div>
            </div>

            <button
              type="button"
              className="btn-bottom-banner-cta"
              onClick={() => handlePlanSelect(plans[2])} // Pro plan default
            >
              <span>Bắt đầu bảo vệ ngay</span>
              <ArrowRight size={16} />
            </button>

            {/* Glowing Shield Emblem Watermark on right */}
            <div className="bottom-banner-watermark">
              <ShieldCheck size={90} color="#059669" opacity={0.12} />
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal when picking a plan */}
      {selectedPlanModal && (
        <div className="plan-modal-overlay" onClick={() => setSelectedPlanModal(null)}>
          <div className="plan-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setSelectedPlanModal(null)}
            >
              <X size={18} />
            </button>

            <div className="modal-header-icon-box">
              <CheckCircle2 size={40} color="#059669" />
            </div>

            <h3 className="modal-title">Xác nhận chọn gói {selectedPlanModal.name}</h3>
            <p className="modal-desc">
              Bạn đang chọn gói bảo vệ <strong>{selectedPlanModal.name}</strong> ({selectedPlanModal.subtitle}) với mức giá{' '}
              <strong className="text-emerald-600">
                {billingCycle === 'yearly' ? selectedPlanModal.yearlyPrice : selectedPlanModal.monthlyPrice}
                {selectedPlanModal.priceUnit}
              </strong>.
            </p>

            <div className="modal-features-preview">
              <div className="modal-features-label">Quyền lợi nổi bật bao gồm:</div>
              <ul className="modal-features-list">
                {selectedPlanModal.features.slice(0, 4).map((f, i) => (
                  <li key={i}>
                    <Check size={14} color="#059669" strokeWidth={3} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-actions-row">
              <button
                type="button"
                className="btn-modal-cancel"
                onClick={() => setSelectedPlanModal(null)}
              >
                Chọn gói khác
              </button>
              <button
                type="button"
                className="btn-modal-confirm"
                onClick={handleConfirmPlanActivation}
              >
                <span>Xác nhận & Kích hoạt</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Support Modal */}
      {isChatModalOpen && (
        <div className="plan-modal-overlay" onClick={() => setIsChatModalOpen(false)}>
          <div className="plan-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsChatModalOpen(false)}
            >
              <X size={18} />
            </button>

            <div className="modal-header-icon-box">
              <MessageCircle size={40} color="#059669" />
            </div>

            <h3 className="modal-title">Chat với chuyên gia Topdoo</h3>
            <p className="modal-desc">
              Đặt câu hỏi về kiến trúc bảo mật, giải pháp cho doanh nghiệp hoặc tư vấn gói phù hợp.
            </p>

            <form onSubmit={handleSendChat} className="modal-form">
              <textarea
                className="modal-textarea"
                rows={4}
                required
                placeholder="Nhập câu hỏi hoặc nhu cầu bảo vệ hệ thống của bạn..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
              />
              <div className="modal-actions-row">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setIsChatModalOpen(false)}
                >
                  Hủy
                </button>
                <button type="submit" className="btn-modal-confirm">
                  <span>Gửi tin nhắn</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Consultation Modal */}
      {isScheduleModalOpen && (
        <div className="plan-modal-overlay" onClick={() => setIsScheduleModalOpen(false)}>
          <div className="plan-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modal-close-btn"
              onClick={() => setIsScheduleModalOpen(false)}
            >
              <X size={18} />
            </button>

            <div className="modal-header-icon-box">
              <Calendar size={40} color="#059669" />
            </div>

            <h3 className="modal-title">Đặt lịch tư vấn bảo mật 1-on-1</h3>
            <p className="modal-desc">
              Chuyên gia của Topdoo sẽ liên hệ phân tích mô hình bảo vệ tối ưu nhất cho tổ chức của bạn.
            </p>

            <form onSubmit={handleSendSchedule} className="modal-form">
              <div className="modal-field">
                <label>Họ và tên *</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={scheduleData.name}
                  onChange={(e) => setScheduleData({ ...scheduleData, name: e.target.value })}
                />
              </div>
              <div className="modal-field">
                <label>Số điện thoại *</label>
                <input
                  type="tel"
                  required
                  placeholder="0912 345 678"
                  value={scheduleData.phone}
                  onChange={(e) => setScheduleData({ ...scheduleData, phone: e.target.value })}
                />
              </div>
              <div className="modal-field">
                <label>Email liên hệ</label>
                <input
                  type="email"
                  placeholder="contact@company.com"
                  value={scheduleData.email}
                  onChange={(e) => setScheduleData({ ...scheduleData, email: e.target.value })}
                />
              </div>
              <div className="modal-actions-row">
                <button
                  type="button"
                  className="btn-modal-cancel"
                  onClick={() => setIsScheduleModalOpen(false)}
                >
                  Đóng
                </button>
                <button type="submit" className="btn-modal-confirm">
                  <span>Xác nhận lịch hẹn</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Footer */}
      <MarketingFooter />
    </div>
  );
}
