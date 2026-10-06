import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronRight,
  Heart,
  Star,
  Sparkles,
  Flame,
  Bookmark,
  Scale,
  Compass,
  PenLine,
  Image as ImageIcon,
  Video,
  Music,
  Code2,
  TrendingUp,
  Megaphone,
  Palette,
  GraduationCap,
  MoreHorizontal,
  ArrowRight,
  User,
  Folder,
  Users,
  LayoutGrid,
  X,
  Lightbulb
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooExploreView() {
  const { navigateMarketing, showToast } = useSecurity();

  // Search in hero
  const [heroSearch, setHeroSearch] = useState('');

  // Active category filter
  const [activeCategory, setActiveCategory] = useState('all');

  // Tool bookmarking / favorites
  const [savedToolIds, setSavedToolIds] = useState(new Set());

  const toggleSaveTool = (id, name, e) => {
    e.stopPropagation();
    setSavedToolIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Đã bỏ lưu', `Đã xóa ${name} khỏi danh sách đã lưu.`, 'info');
      } else {
        next.add(id);
        showToast('Đã lưu công cụ', `Đã thêm ${name} vào bộ sưu tập yêu thích của bạn!`, 'success');
      }
      return next;
    });
  };

  // Popular search keyword chips
  const popularKeywords = ['ChatGPT', 'Canva AI', 'Midjourney', 'Notion AI', 'CapCut AI', 'Claude', 'Figma AI'];

  // 12 Category items
  const categories = [
    { id: 'all', name: 'Tất cả', icon: LayoutGrid, isPrimary: true },
    { id: 'writing', name: 'Viết nội dung', icon: PenLine },
    { id: 'image', name: 'Tạo hình ảnh', icon: ImageIcon },
    { id: 'video', name: 'Tạo video', icon: Video },
    { id: 'audio', name: 'Âm thanh', icon: Music },
    { id: 'coding', name: 'Lập trình', icon: Code2 },
    { id: 'productivity', name: 'Năng suất', icon: TrendingUp },
    { id: 'marketing', name: 'Marketing', icon: Megaphone },
    { id: 'design', name: 'Thiết kế', icon: Palette },
    { id: 'research', name: 'Nghiên cứu', icon: Search },
    { id: 'education', name: 'Giáo dục', icon: GraduationCap },
    { id: 'other', name: 'Khác', icon: MoreHorizontal }
  ];

  // 6 Featured Tools shown in the section
  const featuredTools = [
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      subtitle: 'Trợ lý AI đa năng cho mọi công việc',
      category: 'writing',
      tags: ['Writing', 'Chat'],
      rating: '4.9',
      reviewCount: '12.4K',
      userCount: '100M+',
      iconType: 'chatgpt'
    },
    {
      id: 'canva',
      name: 'Canva AI',
      subtitle: 'Thiết kế đồ họa dễ dàng với AI',
      category: 'design',
      tags: ['Design', 'Image'],
      rating: '4.8',
      reviewCount: '8.2K',
      userCount: '50M+',
      iconType: 'canva'
    },
    {
      id: 'notion',
      name: 'Notion AI',
      subtitle: 'Nâng cao năng suất từ ý tưởng đến thực thi',
      category: 'productivity',
      tags: ['Productivity', 'Writing'],
      rating: '4.7',
      reviewCount: '6.1K',
      userCount: '20M+',
      iconType: 'notion'
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      subtitle: 'Tạo hình ảnh nghệ thuật bằng AI',
      category: 'image',
      tags: ['Image', 'Art'],
      rating: '4.9',
      reviewCount: '9.8K',
      userCount: '20M+',
      iconType: 'midjourney'
    },
    {
      id: 'capcut',
      name: 'CapCut AI',
      subtitle: 'Chỉnh sửa video chuyên nghiệp với AI',
      category: 'video',
      tags: ['Video', 'Editing'],
      rating: '4.7',
      reviewCount: '7.3K',
      userCount: '100M+',
      iconType: 'capcut'
    },
    {
      id: 'claude',
      name: 'Claude',
      subtitle: 'Trợ lý AI an toàn, mạnh mẽ của Anthropic',
      category: 'writing',
      tags: ['Chat', 'Research'],
      rating: '4.8',
      reviewCount: '4.2K',
      userCount: '10M+',
      iconType: 'claude'
    }
  ];

  // Filter tools based on activeCategory or search
  const visibleTools = useMemo(() => {
    return featuredTools.filter((tool) => {
      if (heroSearch.trim()) {
        const q = heroSearch.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(q);
        const matchesSub = tool.subtitle.toLowerCase().includes(q);
        const matchesTags = tool.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesSub && !matchesTags) return false;
      }
      if (activeCategory !== 'all') {
        if (tool.category !== activeCategory && !tool.tags.map((t) => t.toLowerCase()).includes(activeCategory)) {
          return false;
        }
      }
      return true;
    });
  }, [featuredTools, heroSearch, activeCategory]);

  // Tool SVG Logo renderer
  const renderToolIcon = (type) => {
    switch (type) {
      case 'chatgpt':
        return (
          <div className="explore-tool-icon bg-emerald-icon">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2Z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
        );
      case 'canva':
        return (
          <div className="explore-tool-icon bg-canva-gradient">
            <span style={{ color: '#FFFFFF', fontWeight: 800, fontSize: 13, fontStyle: 'italic', fontFamily: 'serif' }}>Canva</span>
          </div>
        );
      case 'notion':
        return (
          <div className="explore-tool-icon bg-notion-dark">
            <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 16, fontFamily: 'serif' }}>N</span>
          </div>
        );
      case 'claude':
        return (
          <div className="explore-tool-icon bg-claude-coral">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#D97706">
              <circle cx="12" cy="12" r="3" fill="#D97706" />
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'midjourney':
        return (
          <div className="explore-tool-icon bg-white-border">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 20a2.4 2.4 0 0 0 2 1 18.4 18.4 0 0 0 16 0 2.4 2.4 0 0 0 2-1L12 4 2 20z" />
              <path d="M12 4v16" />
            </svg>
          </div>
        );
      case 'capcut':
        return (
          <div className="explore-tool-icon bg-capcut-dark">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="#FFFFFF">
              <path d="M4 6h7l-3.5 6L11 18H4l3.5-6L4 6zm9 0h7l-3.5 6 3.5 6h-7l3.5-6-3.5-6z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="explore-tool-icon bg-notion-dark">
            <Sparkles size={16} color="#FFFFFF" />
          </div>
        );
    }
  };

  return (
    <div className="topdoo-explore-portal-page">
      <MarketingHeader />

      {/* 1. Hero Section with bannerAbout.png (Full Width Edge-to-Edge like Trang Chủ) */}
      <section className="explore-portal-hero-section full-width-hero">
        {/* Background image: bannerAbout.png */}
        <img
          src="/bannerAbout.png"
          alt="Khám phá Topdoo AI"
          className="explore-portal-hero-bg-img"
        />

        <div className="landing-container explore-portal-hero-container">
          {/* Breadcrumbs embedded at the top of hero */}
          <div className="explore-portal-breadcrumbs">
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Trang chủ
            </button>
            <ChevronRight size={14} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Khám phá</span>
          </div>

          <div className="explore-portal-hero-grid">
            {/* Left Content Column */}
            <div className="explore-portal-hero-left">
              {/* Badge: KHÁM PHÁ TOPDOO */}
              <div className="explore-portal-badge">
                <div className="portal-badge-icon-wrap">
                  <Compass size={14} color="#2563EB" />
                </div>
                <span>KHÁM PHÁ TOPDOO</span>
              </div>

              {/* Title */}
              <h1 className="explore-portal-title">
                Khám phá thế giới AI<br />
                cùng <span className="explore-portal-title-brand">Topdoo</span>
              </h1>

              {/* Subtitle */}
              <p className="explore-portal-desc">
                Tìm kiếm, trải nghiệm và khám phá hàng nghìn công cụ AI phù hợp cho công việc, học tập và cuộc sống của bạn.
              </p>

              {/* Big Search Input with Blue Submit Button */}
              <div className="explore-portal-search-box">
                <Search size={18} className="portal-search-icon" />
                <input
                  type="text"
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  placeholder="Tìm công cụ AI, ví dụ: ChatGPT, tạo ảnh, viết nội dung, video..."
                  className="portal-search-input"
                />
                {heroSearch && (
                  <button className="btn-clear-portal-search" onClick={() => setHeroSearch('')}>
                    <X size={14} />
                  </button>
                )}
                <button
                  className="btn-portal-search-submit"
                  onClick={() => {
                    const el = document.getElementById('portal-featured-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Tìm kiếm
                </button>
              </div>

              {/* Popular Keyword Chips */}
              <div className="explore-portal-chips-row">
                <span className="portal-chips-label">Tìm kiếm phổ biến:</span>
                <div className="portal-chips-list">
                  {popularKeywords.map((kw, idx) => (
                    <button
                      key={idx}
                      className="portal-chip-btn"
                      onClick={() => setHeroSearch(kw)}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Hero Visual Area with Floating Badges matching mockup */}
            <div className="explore-portal-hero-right">
              {/* Badge 1 (top-left near robot) */}
              <div className="portal-float-badge badge-new-tools">
                <div className="portal-float-icon-wrap bg-purple-soft">
                  <Compass size={14} color="#7C3AED" />
                </div>
                <span>Khám phá công cụ mới</span>
              </div>

              {/* Badge 2 (top-right) */}
              <div className="portal-float-badge badge-efficiency">
                <div className="portal-float-icon-wrap bg-blue-soft">
                  <TrendingUp size={14} color="#2563EB" />
                </div>
                <span>Tăng hiệu suất mỗi ngày</span>
              </div>

              {/* Badge 3 (bottom-right) */}
              <div className="portal-float-badge badge-future">
                <div className="portal-float-icon-wrap bg-sky-soft">
                  <Lightbulb size={14} color="#0284C7" />
                </div>
                <span>Kiến tạo tương lai cùng AI</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Filter Ribbon (12 Categories) */}
      <section className="explore-portal-categories-section">
        <div className="landing-container">
          <div className="explore-portal-categories-bar">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`portal-cat-pill ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.id === 'all') {
                      showToast('Tất cả', 'Đang hiển thị tất cả công cụ AI', 'info');
                    } else {
                      showToast(cat.name, `Đang lọc danh mục ${cat.name}...`, 'info');
                    }
                  }}
                >
                  <div className={`portal-cat-icon ${cat.isPrimary ? 'primary' : ''} ${isActive ? 'active-icon' : ''}`}>
                    <IconComp size={16} />
                  </div>
                  <span className="portal-cat-name">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Quick Action 4 Cards Row (Pastel Tints) */}
      <section className="explore-portal-quick-cards-section">
        <div className="landing-container">
          <div className="explore-portal-quick-cards-grid">
            {/* Card 1: Trending Tools */}
            <div
              className="portal-quick-card tint-purple"
              onClick={() => showToast('Trending Tools', 'Hiển thị các công cụ AI được quan tâm nhất...', 'info')}
            >
              <div className="portal-quick-icon-wrap icon-purple">
                <Flame size={18} color="#FFFFFF" />
              </div>
              <div className="portal-quick-card-text">
                <div className="portal-quick-card-title text-purple">Trending Tools</div>
                <div className="portal-quick-card-desc">Những công cụ AI được quan tâm nhất</div>
              </div>
              <ArrowRight size={15} className="portal-quick-card-arrow arrow-purple" />
            </div>

            {/* Card 2: AI Recommendations */}
            <div
              className="portal-quick-card tint-blue"
              onClick={() => showToast('AI Recommendations', 'Đang phân tích gợi ý công cụ phù hợp với bạn...', 'info')}
            >
              <div className="portal-quick-icon-wrap icon-blue">
                <Sparkles size={18} color="#FFFFFF" />
              </div>
              <div className="portal-quick-card-text">
                <div className="portal-quick-card-title text-blue">AI Recommendations</div>
                <div className="portal-quick-card-desc">Gợi ý công cụ phù hợp với nhu cầu của bạn</div>
              </div>
              <ArrowRight size={15} className="portal-quick-card-arrow arrow-blue" />
            </div>

            {/* Card 3: Bộ sưu tập */}
            <div
              className="portal-quick-card tint-green"
              onClick={() => showToast('Bộ sưu tập', 'Đang mở các bộ sưu tập AI theo chủ đề...', 'info')}
            >
              <div className="portal-quick-icon-wrap icon-green">
                <Bookmark size={18} color="#FFFFFF" />
              </div>
              <div className="portal-quick-card-text">
                <div className="portal-quick-card-title text-green">Bộ sưu tập</div>
                <div className="portal-quick-card-desc">Các bộ công cụ theo chủ đề</div>
              </div>
              <ArrowRight size={15} className="portal-quick-card-arrow arrow-green" />
            </div>

            {/* Card 4: So sánh công cụ */}
            <div
              className="portal-quick-card tint-orange"
              onClick={() => showToast('So sánh công cụ', 'Mở bảng so sánh tính năng và chi phí công cụ AI...', 'info')}
            >
              <div className="portal-quick-icon-wrap icon-orange">
                <Scale size={18} color="#FFFFFF" />
              </div>
              <div className="portal-quick-card-text">
                <div className="portal-quick-card-title text-orange">So sánh công cụ</div>
                <div className="portal-quick-card-desc">So sánh tính năng, giá, ưu nhược điểm</div>
              </div>
              <ArrowRight size={15} className="portal-quick-card-arrow arrow-orange" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: Công cụ nổi bật (6 Cards) */}
      <section className="explore-portal-featured-section" id="portal-featured-section">
        <div className="landing-container">
          {/* Section Header */}
          <div className="explore-portal-featured-header">
            <div className="featured-header-left">
              <h2 className="featured-section-title">Công cụ nổi bật</h2>
              <p className="featured-section-subtitle">Những công cụ AI được cộng đồng yêu thích nhất</p>
            </div>
            <button
              className="featured-header-link"
              onClick={() => navigateMarketing('topdoo-explore-tools')}
            >
              <span>Xem tất cả công cụ</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* 6 Cards Grid */}
          <div className="explore-portal-tools-grid">
            {visibleTools.map((tool) => {
              const isSaved = savedToolIds.has(tool.id);
              return (
                <div key={tool.id} className="explore-portal-tool-card">
                  {/* Top Bar: Icon & Save heart button */}
                  <div className="tool-card-top">
                    {renderToolIcon(tool.iconType)}
                    <button
                      className={`btn-tool-save-heart ${isSaved ? 'saved' : ''}`}
                      onClick={(e) => toggleSaveTool(tool.id, tool.name, e)}
                      title={isSaved ? 'Bỏ lưu' : 'Lưu vào danh sách'}
                    >
                      <Heart size={15} fill={isSaved ? '#EF4444' : 'none'} color={isSaved ? '#EF4444' : '#94A3B8'} />
                    </button>
                  </div>

                  {/* Name & Subtitle */}
                  <h3 className="tool-card-name">{tool.name}</h3>
                  <p className="tool-card-desc">{tool.subtitle}</p>

                  {/* Category Tags */}
                  <div className="tool-card-tags">
                    {tool.tags.map((tag, idx) => (
                      <span key={idx} className="tool-tag-pill">{tag}</span>
                    ))}
                  </div>

                  {/* Rating & User Stats */}
                  <div className="tool-card-stats-row">
                    <div className="tool-stat-rating">
                      <Star size={13} fill="#F59E0B" color="#F59E0B" />
                      <span className="rating-score">{tool.rating}</span>
                      <span className="rating-reviews">({tool.reviewCount})</span>
                    </div>
                    <div className="tool-stat-users">
                      <User size={13} color="#64748B" />
                      <span>{tool.userCount}</span>
                    </div>
                  </div>

                  {/* Access Button */}
                  <button
                    className="btn-tool-access"
                    onClick={() => {
                      showToast(tool.name, `Đang mở liên kết tới công cụ ${tool.name}...`, 'info');
                    }}
                  >
                    <span>Truy cập</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Section: 3 Bottom Action Cards */}
      <section className="explore-portal-bottom-section">
        <div className="landing-container">
          <div className="explore-portal-bottom-grid">
            {/* Card 1: Đề xuất dành riêng cho bạn */}
            <div className="portal-bottom-card bottom-card-blue">
              <div className="bottom-card-icon-wrap bg-indigo-soft">
                <User size={22} color="#6366F1" />
              </div>
              <h3 className="bottom-card-title">Đề xuất dành riêng cho bạn</h3>
              <p className="bottom-card-desc">
                Đăng nhập để nhận gợi ý công cụ AI phù hợp nhất với nhu cầu và sở thích của bạn.
              </p>
              <button
                className="btn-bottom-action btn-bottom-blue"
                onClick={() => {
                  showToast('Đăng nhập', 'Mở khung đăng nhập tài khoản Topdoo...', 'info');
                }}
              >
                <span>Đăng nhập ngay</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 2: Bộ sưu tập theo chủ đề */}
            <div className="portal-bottom-card bottom-card-amber">
              <div className="bottom-card-icon-wrap bg-amber-soft">
                <Folder size={22} color="#D97706" />
              </div>
              <h3 className="bottom-card-title">Bộ sưu tập theo chủ đề</h3>
              <p className="bottom-card-desc">
                Khám phá các bộ công cụ được tuyển chọn theo từng lĩnh vực, ngành nghề.
              </p>
              <button
                className="btn-bottom-action btn-bottom-amber"
                onClick={() => {
                  navigateMarketing('topdoo-explore-tools');
                }}
              >
                <span>Xem bộ sưu tập</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 3: Cộng đồng Topdoo */}
            <div className="portal-bottom-card bottom-card-purple">
              <div className="bottom-card-icon-wrap bg-purple-soft">
                <Users size={22} color="#7C3AED" />
              </div>
              <h3 className="bottom-card-title">Cộng đồng Topdoo</h3>
              <p className="bottom-card-desc">
                Tham gia cộng đồng người dùng AI, chia sẻ và học hỏi kinh nghiệm.
              </p>
              <button
                className="btn-bottom-action btn-bottom-purple"
                onClick={() => {
                  showToast('Cộng đồng Topdoo', 'Đang chuyển hướng tới cộng đồng Topdoo AI...', 'info');
                }}
              >
                <span>Tham gia ngay</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Marketing Footer */}
      <MarketingFooter />
    </div>
  );
}
