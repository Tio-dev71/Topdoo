import React, { useState } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Play,
  Sparkles,
  Zap,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  PenTool,
  LayoutGrid,
  Tag,
  Globe,
  Users,
  Bot,
  Share2,
  Box,
  Flame,
  Scale,
  Bookmark,
  Heart,
  Star,
  Search,
  MoreHorizontal,
  Code2,
  BarChart3,
  Target,
  CheckCircle2,
  SlidersHorizontal,
  Megaphone,
  X
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooToolsView() {
  const { navigateMarketing, showToast } = useSecurity();

  // Active category filter (default null so no category is auto active on mount)
  const [activeCategory, setActiveCategory] = useState(null);

  // Video modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Category ribbon items
  const categories = [
    { id: 'writing', name: 'Writing', label: 'Viết nội dung', icon: PenTool, color: '#2563EB', bg: '#EFF6FF' },
    { id: 'image', name: 'Image', label: 'Tạo hình ảnh', icon: ImageIcon, color: '#0284C7', bg: '#F0F9FF' },
    { id: 'video', name: 'Video', label: 'Tạo video', icon: Video, color: '#4F46E5', bg: '#EEF2FF' },
    { id: 'audio', name: 'Audio', label: 'Âm thanh', icon: Music, color: '#7C3AED', bg: '#F5F3FF' },
    { id: 'productivity', name: 'Productivity', label: 'Năng suất', icon: LayoutGrid, color: '#059669', bg: '#ECFDF5' },
    { id: 'marketing', name: 'Marketing', label: 'Tiếp thị', icon: Megaphone, color: '#EA580C', bg: '#FFF7ED' },
    { id: 'coding', name: 'Coding', label: 'Lập trình', icon: Code2, color: '#2563EB', bg: '#EFF6FF' },
    { id: 'research', name: 'Research', label: 'Nghiên cứu', icon: Search, color: '#0284C7', bg: '#F0F9FF' },
    { id: 'all', name: 'Xem tất cả', label: 'danh mục', icon: MoreHorizontal, color: '#64748B', bg: '#F8FAFC' }
  ];

  // 5 Feature highlights for "Topdoo Tools là gì?"
  const aboutFeatures = [
    {
      title: 'Tuyển chọn chất lượng',
      desc: 'Cập nhật liên tục, đánh giá thực tế',
      icon: Flame,
      iconColor: '#0284C7',
      bgColor: '#E0F2FE'
    },
    {
      title: 'Dễ dàng so sánh',
      desc: 'So sánh tính năng, giá, ưu nhược điểm',
      icon: BarChart3,
      iconColor: '#EA580C',
      bgColor: '#FFEDD5'
    },
    {
      title: 'AI đề xuất thông minh',
      desc: 'Gợi ý công cụ phù hợp với nhu cầu',
      icon: Sparkles,
      iconColor: '#D97706',
      bgColor: '#FEF3C7'
    },
    {
      title: 'Lưu công cụ yêu thích',
      desc: 'Tạo bộ sưu tập riêng',
      icon: Bookmark,
      iconColor: '#2563EB',
      bgColor: '#DBEAFE'
    },
    {
      title: 'Cộng đồng đánh giá',
      desc: 'Hàng ngàn đánh giá từ người dùng thực tế',
      icon: Users,
      iconColor: '#E11D48',
      bgColor: '#FFE4E6'
    }
  ];

  // 5 Featured Products
  const featuredTools = [
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      subtitle: 'Trợ lý AI đa năng',
      category: 'Writing',
      rating: '4.9',
      reviews: '12k',
      price: 'Miễn phí',
      priceType: 'free',
      iconType: 'chatgpt'
    },
    {
      id: 'canva',
      name: 'Canva AI',
      subtitle: 'Thiết kế đồ họa với AI',
      category: 'Design',
      rating: '4.8',
      reviews: '8k',
      price: 'Freemium',
      priceType: 'freemium',
      iconType: 'canva'
    },
    {
      id: 'notion',
      name: 'Notion AI',
      subtitle: 'Nâng cao năng suất',
      category: 'Productivity',
      rating: '4.7',
      reviews: '6k',
      price: 'Freemium',
      priceType: 'freemium',
      iconType: 'notion'
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      subtitle: 'Tạo hình ảnh AI',
      category: 'Image',
      rating: '4.9',
      reviews: '10k',
      price: 'Từ $10/tháng',
      priceType: 'paid',
      iconType: 'midjourney'
    },
    {
      id: 'capcut',
      name: 'CapCut',
      subtitle: 'Chỉnh sửa video AI',
      category: 'Video',
      rating: '4.7',
      reviews: '9k',
      price: 'Freemium',
      priceType: 'freemium',
      iconType: 'capcut'
    }
  ];

  // Render SVG / icon for tools
  const renderToolLogo = (type) => {
    switch (type) {
      case 'chatgpt':
        return (
          <div className="tool-logo-box bg-emerald">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        );
      case 'canva':
        return (
          <div className="tool-logo-box bg-canva">
            <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 13, fontStyle: 'italic', fontFamily: 'serif' }}>Canva</span>
          </div>
        );
      case 'notion':
        return (
          <div className="tool-logo-box bg-dark">
            <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 16, fontFamily: 'serif' }}>N</span>
          </div>
        );
      case 'midjourney':
        return (
          <div className="tool-logo-box bg-sailboat">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20a2.4 2.4 0 0 0 2 1 18.4 18.4 0 0 0 16 0 2.4 2.4 0 0 0 2-1L12 4 2 20z" />
              <path d="M12 4v16" />
            </svg>
          </div>
        );
      case 'capcut':
        return (
          <div className="tool-logo-box bg-black">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="#FFFFFF">
              <path d="M4 6h7l-3.5 6L11 18H4l3.5-6L4 6zm9 0h7l-3.5 6 3.5 6h-7l3.5-6-3.5-6z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="tool-logo-box bg-dark">
            <Sparkles size={20} color="#FFFFFF" />
          </div>
        );
    }
  };

  return (
    <div className="topdoo-landing topdoo-tools-page">
      {/* 1. Global Marketing Header */}
      <MarketingHeader />

      {/* 2. Hero Section with /bannerToolsroute.png Background */}
      <section className="tools-hero-section">
        <div className="tools-hero-bg-wrap">
          <img
            src="/bannerToolsroute.png"
            alt="Topdoo Tools Route Banner"
            className="tools-hero-bg-img"
          />
        </div>

        <div className="landing-container tools-hero-container">
          {/* Breadcrumbs positioned over the banner */}
          <div className="tools-hero-breadcrumbs">
            <span
              className="breadcrumb-link"
              onClick={() => navigateMarketing('home')}
            >
              Trang chủ
            </span>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <span
              className="breadcrumb-link"
              onClick={() => navigateMarketing('home')}
            >
              Sản phẩm
            </span>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Topdoo Tools</span>
          </div>

          <div className="tools-hero-grid">
            {/* Left Content Column */}
            <div className="tools-hero-left">
              <div className="tools-hero-pill">
                <Box size={14} color="#EA580C" />
                <span>TOPDOO TOOLS</span>
              </div>

              <h1 className="tools-hero-heading">
                Khám phá <span className="tools-heading-orange">hàng nghìn</span><br />
                công cụ AI tốt nhất
              </h1>

              <p className="tools-hero-subheading">
                Topdoo Tools giúp bạn tìm, so sánh và sử dụng các công cụ AI phù hợp nhất cho công việc, học tập và cuộc sống. Tất cả trong một nền tảng, được tuyển chọn và đánh giá bởi cộng đồng.
              </p>

              {/* Action Buttons */}
              <div className="tools-hero-cta-group">
                <button
                  className="btn-tools-hero-primary"
                  onClick={() => navigateMarketing('topdoo-explore-tools')}
                >
                  <span>Khám phá công cụ</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  className="btn-tools-hero-secondary"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <div className="btn-play-circle-orange">
                    <Play size={13} fill="#EA580C" color="#EA580C" />
                  </div>
                  <span>Xem video</span>
                </button>
              </div>

              {/* 4 Stats */}
              <div className="tools-hero-stats">
                <div className="tools-stat-item">
                  <div className="tools-stat-value">10.000+</div>
                  <div className="tools-stat-label">Công cụ AI</div>
                </div>
                <div className="tools-stat-item">
                  <div className="tools-stat-value">50+</div>
                  <div className="tools-stat-label">Danh mục</div>
                </div>
                <div className="tools-stat-item">
                  <div className="tools-stat-value">1M+</div>
                  <div className="tools-stat-label">Người dùng</div>
                </div>
                <div className="tools-stat-item">
                  <div className="tools-stat-value stat-star-val">
                    <span className="stat-star-icon">★</span> 4.9/5
                  </div>
                  <div className="tools-stat-label">Đánh giá từ cộng đồng</div>
                </div>
              </div>
            </div>

            {/* Right Visual Area with Floating Tooltips matching mockup */}
            <div className="tools-hero-right">
              <div className="tools-floating-bubble bubble-top-left">
                <span>Tìm công cụ tốt nhất cho ý tưởng của bạn</span>
              </div>
              <div className="tools-floating-bubble bubble-top-right">
                <span>So sánh tính năng dễ dàng</span>
              </div>
              <div className="tools-floating-bubble bubble-far-right">
                <span>Được tuyển chọn bởi chuyên gia</span>
              </div>
              <div className="tools-floating-bubble bubble-bottom-left">
                <span>Tiết kiệm thời gian, nâng cao hiệu suất</span>
              </div>
              <div className="tools-hero-cursive-slogan">
                <span>More Tools</span>
                <span>More Possibilities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Filter Ribbon */}
      <section className="tools-categories-section">
        <div className="landing-container">
          <div className="tools-categories-ribbon">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  className={`tools-cat-item ${cat.id === 'all' ? 'cat-item-all' : ''} ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(isActive ? null : cat.id);
                    showToast(cat.name, isActive ? 'Đã bỏ chọn bộ lọc danh mục' : `Đang lọc danh mục ${cat.name} (${cat.label})...`, 'info');
                  }}
                >
                  <div className="tools-cat-icon-badge" style={{ backgroundColor: cat.bg }}>
                    <IconComp size={18} color={cat.color} />
                  </div>
                  <div className="tools-cat-info">
                    <div className="tools-cat-name">{cat.name}</div>
                    <div className="tools-cat-label">{cat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. "Topdoo Tools là gì?" Section with bannerTools2route.png */}
      <section className="tools-about-section">
        <div className="landing-container">
          <div className="tools-about-grid">
            {/* Left Column: Explanations & 5 Features */}
            <div className="tools-about-left">
              <h2 className="tools-about-heading">Topdoo Tools là gì?</h2>
              <p className="tools-about-description">
                Nền tảng khám phá và sử dụng các công cụ AI hàng đầu thế giới, được tuyển chọn, phân loại và đánh giá khách quan. Dù bạn là cá nhân, marketer, nhà sáng tạo nội dung hay doanh nghiệp, Topdoo Tools luôn có công cụ phù hợp cho bạn.
              </p>

              <div className="tools-about-features-list">
                {aboutFeatures.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="tools-about-feature-row">
                      <div
                        className="tools-about-feat-icon"
                        style={{ backgroundColor: item.bgColor }}
                      >
                        <IconComp size={18} color={item.iconColor} />
                      </div>
                      <div className="tools-about-feat-text">
                        <div className="tools-about-feat-title">{item.title}</div>
                        <div className="tools-about-feat-desc">{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Top Card with bannerTools2route.png + Bottom 3 Mini Cards */}
            <div className="tools-about-right">
              {/* Featured Visual Card */}
              <div className="tools-about-card-hero">
                <img
                  src="/bannerTools2route.png"
                  alt="Khám phá công cụ AI"
                  className="tools-about-card-bg"
                />

                <div className="tools-about-card-overlay">
                  <h3 className="tools-about-card-title">
                    Khám phá công cụ AI<br />cho mọi ý tưởng
                  </h3>
                  <p className="tools-about-card-desc">
                    Từ viết nội dung, thiết kế, video đến lập trình – tất cả trong một nền tảng.
                  </p>
                  <button
                    className="btn-tools-about-explore"
                    onClick={() => navigateMarketing('topdoo-explore-tools')}
                  >
                    <span>Bắt đầu khám phá</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Floating tags matching design */}
                <div className="tools-about-tag tag-top">
                  <span>Làm việc nhanh hơn</span>
                </div>
                <div className="tools-about-tag tag-mid">
                  <span>Hiệu quả hơn</span>
                </div>
                <div className="tools-about-tag tag-bot">
                  <span>Hiệu quả nhanh hơn</span>
                </div>
                <div className="tools-about-cursive">
                  <span>Good Tools</span>
                  <span>Better Results</span>
                </div>
              </div>

              {/* Bottom 3 Mini Cards */}
              <div className="tools-about-mini-cards">
                <div
                  className="tools-mini-card"
                  onClick={() => showToast('Trending Tools', 'Đang chuyển đến danh sách công cụ thịnh hành...', 'info')}
                >
                  <div className="tools-mini-card-icon bg-orange-soft">
                    <Flame size={18} color="#EA580C" />
                  </div>
                  <div className="tools-mini-card-body">
                    <div className="tools-mini-card-title">Trending Tools</div>
                    <div className="tools-mini-card-desc">Những công cụ AI hot nhất hiện nay</div>
                  </div>
                  <ArrowRight size={15} className="tools-mini-card-arrow" />
                </div>

                <div
                  className="tools-mini-card"
                  onClick={() => showToast('AI Recommendations', 'Đang phân tích gợi ý thông minh cho bạn...', 'info')}
                >
                  <div className="tools-mini-card-icon bg-amber-soft">
                    <Sparkles size={18} color="#D97706" />
                  </div>
                  <div className="tools-mini-card-body">
                    <div className="tools-mini-card-title">AI Recommendations</div>
                    <div className="tools-mini-card-desc">Đề xuất công cụ phù hợp với nhu cầu của bạn</div>
                  </div>
                  <ArrowRight size={15} className="tools-mini-card-arrow" />
                </div>

                <div
                  className="tools-mini-card"
                  onClick={() => showToast('Bộ sưu tập', 'Đang mở các bộ sưu tập AI theo chủ đề...', 'info')}
                >
                  <div className="tools-mini-card-icon bg-emerald-soft">
                    <Bookmark size={18} color="#059669" />
                  </div>
                  <div className="tools-mini-card-body">
                    <div className="tools-mini-card-title">Bộ sưu tập</div>
                    <div className="tools-mini-card-desc">Các bộ công cụ theo chủ đề</div>
                  </div>
                  <ArrowRight size={15} className="tools-mini-card-arrow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. "Công cụ nổi bật" Section */}
      <section id="featured-tools-section" className="tools-featured-section">
        <div className="landing-container">
          <div className="tools-featured-header">
            <div>
              <h2 className="tools-featured-title">Công cụ nổi bật</h2>
              <p className="tools-featured-subtitle">Những công cụ được cộng đồng yêu thích nhất</p>
            </div>
            <div
              className="tools-view-all-link"
              onClick={() => navigateMarketing('topdoo-explore-tools')}
            >
              <span>Xem tất cả công cụ</span>
              <ArrowRight size={14} />
            </div>
          </div>

          <div className="tools-products-grid">
            {featuredTools.map((tool) => (
              <div
                key={tool.id}
                className="tool-product-card"
                onClick={() => showToast(tool.name, `Đang mở trang chi tiết và hướng dẫn sử dụng ${tool.name}...`, 'info')}
              >
                <div className="tool-card-top">
                  {renderToolLogo(tool.iconType)}
                  <div className="tool-card-identity">
                    <div className="tool-card-name">{tool.name}</div>
                    <div className="tool-card-sub">{tool.subtitle}</div>
                  </div>
                </div>

                <div className="tool-card-badge-row">
                  <span className={`tool-category-pill pill-${tool.category.toLowerCase()}`}>
                    {tool.category}
                  </span>
                </div>

                <div className="tool-card-footer">
                  <div className="tool-card-rating">
                    <span className="tool-star">★</span>
                    <span className="tool-score">{tool.rating}</span>
                    <span className="tool-reviews">({tool.reviews})</span>
                  </div>
                  <div className={`tool-price-tag price-${tool.priceType}`}>
                    {tool.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer CTA Banner with /bannerToolsFooterroute.png */}
      <section className="tools-footer-cta-section">
        <div className="landing-container">
          <div className="tools-footer-cta-banner">
            <img
              src="/bannerToolsFooterroute.png"
              alt="Topdoo Tools CTA Banner"
              className="tools-footer-cta-bg"
            />

            <div className="tools-footer-cta-content">
              <h2 className="tools-footer-cta-heading">
                Khám phá hàng nghìn công cụ AI ngay hôm nay
              </h2>
              <p className="tools-footer-cta-subheading">
                Tiết kiệm thời gian. Tăng hiệu suất. Hiện thực hoá mọi ý tưởng.
              </p>

              <div className="tools-footer-cta-actions">
                <button
                  className="btn-tools-cta-primary"
                  onClick={() => navigateMarketing('topdoo-explore-tools')}
                >
                  <span>Khám phá công cụ</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  className="btn-tools-cta-secondary"
                  onClick={() => showToast('Đăng ký miễn phí', 'Chuyển đến màn hình tạo tài khoản Topdoo thành viên...', 'info')}
                >
                  <span>Đăng ký miễn phí</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Global Marketing Footer */}
      <MarketingFooter />

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="studio-video-modal-backdrop" onClick={() => setIsVideoModalOpen(false)}>
          <div className="studio-video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="btn-modal-close"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <X size={20} />
            </button>
            <div className="studio-video-player-wrap">
              <img
                src="/studio_video_showcase.jpg"
                alt="Topdoo Tools Video Demo"
                className="studio-video-poster"
              />
              <div className="studio-video-overlay-play">
                <div className="play-button-pulse-orange">
                  <Play size={32} fill="#EA580C" color="#EA580C" />
                </div>
                <div className="studio-video-title-text">
                  Giới thiệu nền tảng Topdoo Tools – Hệ sinh thái công cụ AI toàn diện
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
