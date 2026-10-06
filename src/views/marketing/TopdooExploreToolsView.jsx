import React, { useState, useMemo } from 'react';
import {
  Search,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Heart,
  Star,
  Sparkles,
  Flame,
  Bookmark,
  Trophy,
  Scale,
  Box,
  Check,
  Compass,
  PenTool,
  Image as ImageIcon,
  Video,
  Music,
  LayoutGrid,
  Megaphone,
  Code2,
  Palette,
  MoreHorizontal,
  ArrowRight,
  Filter,
  CheckCircle2,
  X,
  Radio
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooExploreToolsView() {
  const { navigateMarketing, showToast } = useSecurity();

  // Search input in hero
  const [heroSearch, setHeroSearch] = useState('');

  // Top category ribbon
  const [activeCategory, setActiveCategory] = useState('all');

  // Left sidebar filters
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);

  // Accordion collapsed state for filter sections
  const [collapsedSections, setCollapsedSections] = useState({
    categories: false,
    price: false,
    rating: false,
    platform: false
  });

  // Sorting and Pagination
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [savedToolIds, setSavedToolIds] = useState(new Set());

  // Review Modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedToolForReview, setSelectedToolForReview] = useState(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewerName, setReviewerName] = useState('Chuyên gia bảo mật');

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewComment.trim()) {
      showToast('Cảnh báo', 'Vui lòng nhập cảm nhận hoặc nhận xét của bạn.', 'warning');
      return;
    }
    showToast('Cảm ơn bạn!', `Đã ghi nhận đánh giá ${reviewRating}★ cho ${selectedToolForReview?.name || 'công cụ'}.`, 'success');
    setIsReviewModalOpen(false);
    setReviewComment('');
  };

  // Toggle favorite / bookmark
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

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleResetFilters = () => {
    setSidebarSearch('');
    setSelectedCategories([]);
    setSelectedPrice('all');
    setSelectedRatings([]);
    setSelectedPlatforms([]);
    setActiveCategory('all');
    setHeroSearch('');
    showToast('Đặt lại bộ lọc', 'Đã xóa tất cả bộ lọc tìm kiếm.', 'info');
  };

  // 11 Categories in ribbon
  const categories = [
    { id: 'all', name: 'Tất cả', label: 'Tất cả', icon: Compass, color: '#FFFFFF', bg: '#2563EB', isPrimary: true },
    { id: 'writing', name: 'Writing', label: 'Viết nội dung', icon: PenTool, color: '#2563EB', bg: '#EFF6FF' },
    { id: 'image', name: 'Image', label: 'Tạo hình ảnh', icon: ImageIcon, color: '#0284C7', bg: '#F0F9FF' },
    { id: 'video', name: 'Video', label: 'Tạo video', icon: Video, color: '#4F46E5', bg: '#EEF2FF' },
    { id: 'audio', name: 'Audio', label: 'Âm thanh', icon: Music, color: '#7C3AED', bg: '#F5F3FF' },
    { id: 'productivity', name: 'Productivity', label: 'Năng suất', icon: LayoutGrid, color: '#059669', bg: '#ECFDF5' },
    { id: 'marketing', name: 'Marketing', label: 'Tiếp thị', icon: Megaphone, color: '#EA580C', bg: '#FFF7ED' },
    { id: 'coding', name: 'Coding', label: 'Lập trình', icon: Code2, color: '#2563EB', bg: '#EFF6FF' },
    { id: 'research', name: 'Research', label: 'Nghiên cứu', icon: Search, color: '#0284C7', bg: '#F0F9FF' },
    { id: 'design', name: 'Design', label: 'Thiết kế', icon: Palette, color: '#9333EA', bg: '#FAF5FF' },
    { id: 'other', name: 'Khác', label: 'Design', icon: MoreHorizontal, color: '#64748B', bg: '#F8FAFC' }
  ];

  // Quick chips below hero search
  const popularKeywords = ['ChatGPT', 'Canva AI', 'Midjourney', 'Notion AI', 'CapCut AI', 'Claude', 'Gemini'];

  // Sidebar category checklist
  const sidebarCategoryOptions = [
    { id: 'writing', label: 'Writing', count: 342 },
    { id: 'image', label: 'Image', count: 285 },
    { id: 'video', label: 'Video', count: 210 },
    { id: 'audio', label: 'Audio', count: 98 },
    { id: 'productivity', label: 'Productivity', count: 320 },
    { id: 'marketing', label: 'Marketing', count: 176 },
    { id: 'coding', label: 'Coding', count: 154 },
    { id: 'research', label: 'Research', count: 87 },
    { id: 'design', label: 'Design', count: 129 },
    { id: 'other', label: 'Khác', count: 210 }
  ];

  // 12 Tools Data matching the design mockup exactly
  const allTools = [
    {
      id: 'chatgpt',
      name: 'ChatGPT',
      subtitle: 'Trợ lý AI đa năng cho mọi công việc',
      isHot: true,
      tags: ['Writing', 'Productivity', 'Chat'],
      category: 'writing',
      rating: '4.9',
      reviewCount: '12.4K',
      userCount: '100M+ người dùng',
      priceType: 'freemium',
      platforms: ['web', 'ios', 'android', 'macos', 'windows'],
      iconType: 'chatgpt'
    },
    {
      id: 'canva',
      name: 'Canva AI',
      subtitle: 'Thiết kế đồ họa dễ dàng với AI',
      isHot: false,
      tags: ['Design', 'Image', 'Marketing'],
      category: 'design',
      rating: '4.8',
      reviewCount: '8.2K',
      userCount: '50M+ người dùng',
      priceType: 'freemium',
      platforms: ['web', 'ios', 'android', 'macos', 'windows'],
      iconType: 'canva'
    },
    {
      id: 'notion',
      name: 'Notion AI',
      subtitle: 'Nâng cao năng suất, từ ý tưởng đến thực thi',
      isHot: false,
      tags: ['Productivity', 'Writing'],
      category: 'productivity',
      rating: '4.7',
      reviewCount: '6.1K',
      userCount: '20M+ người dùng',
      priceType: 'freemium',
      platforms: ['web', 'windows', 'macos', 'ios', 'android'],
      iconType: 'notion'
    },
    {
      id: 'claude',
      name: 'Claude',
      subtitle: 'Trợ lý AI an toàn, mạnh mẽ của Anthropic',
      isHot: false,
      tags: ['Chat', 'Research', 'Writing'],
      category: 'writing',
      rating: '4.8',
      reviewCount: '4.2K',
      userCount: '10M+ người dùng',
      priceType: 'freemium',
      platforms: ['web', 'ios', 'android'],
      iconType: 'claude'
    },
    {
      id: 'midjourney',
      name: 'Midjourney',
      subtitle: 'Tạo hình ảnh nghệ thuật bằng AI',
      isHot: false,
      tags: ['Image', 'Design', 'Art'],
      category: 'image',
      rating: '4.9',
      reviewCount: '9.8K',
      userCount: '20M+ người dùng',
      priceType: 'paid',
      platforms: ['web'],
      iconType: 'midjourney'
    },
    {
      id: 'capcut',
      name: 'CapCut AI',
      subtitle: 'Chỉnh sửa video chuyên nghiệp với AI',
      isHot: false,
      tags: ['Video', 'Editing', 'Social Media'],
      category: 'video',
      rating: '4.7',
      reviewCount: '7.3K',
      userCount: '100M+ người dùng',
      priceType: 'freemium',
      platforms: ['web', 'windows', 'macos', 'ios', 'android'],
      iconType: 'capcut'
    },
    {
      id: 'luma',
      name: 'Luma AI',
      subtitle: 'Tạo video 3D, hình ảnh chân thực',
      isHot: false,
      tags: ['Video', '3D', 'Creativity'],
      category: 'video',
      rating: '4.6',
      reviewCount: '3.1K',
      userCount: '5M+ người dùng',
      priceType: 'freemium',
      platforms: ['web', 'ios'],
      iconType: 'luma'
    },
    {
      id: 'runway',
      name: 'Runway',
      subtitle: 'Chỉnh sửa video AI thế hệ mới',
      isHot: false,
      tags: ['Video', 'Editing', 'AI'],
      category: 'video',
      rating: '4.6',
      reviewCount: '2.9K',
      userCount: '10M+ người dùng',
      priceType: 'freemium',
      platforms: ['web', 'ios'],
      iconType: 'runway'
    },
    {
      id: 'grammarly',
      name: 'Grammarly',
      subtitle: 'Viết tốt hơn, rõ ràng hơn với AI',
      isHot: false,
      tags: ['Writing', 'Productivity'],
      category: 'writing',
      rating: '4.7',
      reviewCount: '6.5K',
      userCount: '30M+ người dùng',
      priceType: 'freemium',
      platforms: ['web', 'windows', 'macos', 'chrome'],
      iconType: 'grammarly'
    },
    {
      id: 'perplexity',
      name: 'Perplexity',
      subtitle: 'Tìm kiếm thông minh với nguồn trích dẫn',
      isHot: false,
      tags: ['Research', 'Search', 'AI'],
      category: 'research',
      rating: '4.8',
      reviewCount: '4.1K',
      userCount: '20M+ người dùng',
      priceType: 'freemium',
      platforms: ['web', 'ios', 'android', 'chrome'],
      iconType: 'perplexity'
    },
    {
      id: 'figma',
      name: 'Figma AI',
      subtitle: 'Thiết kế giao diện nhanh hơn với AI',
      isHot: false,
      tags: ['Design', 'UI/UX', 'Productivity'],
      category: 'design',
      rating: '4.6',
      reviewCount: '3.9K',
      userCount: '10M+ người dùng',
      priceType: 'freemium',
      platforms: ['web', 'macos', 'windows'],
      iconType: 'figma'
    },
    {
      id: 'elevenlabs',
      name: 'ElevenLabs',
      subtitle: 'Tạo giọng nói AI tự nhiên như thật',
      isHot: false,
      tags: ['Audio', 'Voice', 'Podcast'],
      category: 'audio',
      rating: '4.7',
      reviewCount: '4.0K',
      userCount: '10M+ người dùng',
      priceType: 'freemium',
      platforms: ['web'],
      iconType: 'elevenlabs'
    }
  ];

  // Filtered tools logic
  const filteredTools = useMemo(() => {
    return allTools.filter((tool) => {
      // 1. Hero Search Filter
      if (heroSearch.trim()) {
        const query = heroSearch.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(query);
        const matchesSub = tool.subtitle.toLowerCase().includes(query);
        const matchesTags = tool.tags.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesSub && !matchesTags) return false;
      }

      // 2. Ribbon Category Filter
      if (activeCategory !== 'all') {
        if (tool.category !== activeCategory) return false;
      }

      // 3. Sidebar Search Filter
      if (sidebarSearch.trim()) {
        const query = sidebarSearch.toLowerCase().trim();
        const matchesName = tool.name.toLowerCase().includes(query);
        const matchesSub = tool.subtitle.toLowerCase().includes(query);
        if (!matchesName && !matchesSub) return false;
      }

      // 4. Sidebar Category Filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(tool.category)) return false;
      }

      // 5. Price Filter
      if (selectedPrice !== 'all') {
        if (tool.priceType !== selectedPrice) return false;
      }

      // 6. Rating Filter
      if (selectedRatings.length > 0) {
        const score = parseFloat(tool.rating);
        const matchesRating = selectedRatings.some((threshold) => score >= threshold);
        if (!matchesRating) return false;
      }

      // 7. Platform Filter
      if (selectedPlatforms.length > 0) {
        const matchesPlat = selectedPlatforms.some((plat) => tool.platforms.includes(plat));
        if (!matchesPlat) return false;
      }

      return true;
    });
  }, [allTools, heroSearch, activeCategory, sidebarSearch, selectedCategories, selectedPrice, selectedRatings, selectedPlatforms]);

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
      case 'luma':
        return (
          <div className="explore-tool-icon bg-luma-dark">
            <div style={{ width: 14, height: 14, background: 'linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #EC4899 100%)', transform: 'rotate(45deg)', borderRadius: 2 }} />
          </div>
        );
      case 'runway':
        return (
          <div className="explore-tool-icon bg-runway-dark">
            <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 15, fontFamily: 'sans-serif' }}>R</span>
          </div>
        );
      case 'grammarly':
        return (
          <div className="explore-tool-icon bg-grammarly-green">
            <span style={{ color: '#FFFFFF', fontWeight: 900, fontSize: 16 }}>G</span>
          </div>
        );
      case 'perplexity':
        return (
          <div className="explore-tool-icon bg-perplexity-teal">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" />
            </svg>
          </div>
        );
      case 'figma':
        return (
          <div className="explore-tool-icon bg-figma-dark">
            <div style={{ display: 'grid', gridTemplateColumns: '8px 8px', gap: 2 }}>
              <div style={{ width: 8, height: 8, background: '#F24E1E', borderRadius: '4px 0 0 4px' }} />
              <div style={{ width: 8, height: 8, background: '#FF7262', borderRadius: '0 4px 4px 0' }} />
              <div style={{ width: 8, height: 8, background: '#A259FF', borderRadius: 4 }} />
              <div style={{ width: 8, height: 8, background: '#1ABCFE', borderRadius: '50%' }} />
            </div>
          </div>
        );
      case 'elevenlabs':
        return (
          <div className="explore-tool-icon bg-eleven-dark">
            <span style={{ color: '#0F172A', fontWeight: 900, fontSize: 15 }}>||</span>
          </div>
        );
      default:
        return (
          <div className="explore-tool-icon bg-notion-dark">
            <Sparkles size={18} color="#FFFFFF" />
          </div>
        );
    }
  };

  return (
    <div className="topdoo-landing topdoo-explore-tools-page">
      {/* 1. Global Header */}
      <MarketingHeader />

      {/* 2. Hero Banner with /bannerToolsDiscover.png Background */}
      <section className="explore-hero-section">
        <div className="explore-hero-bg-wrap">
          <img
            src="/bannerToolsDiscover.png"
            alt="Khám phá công cụ AI cho mọi nhu cầu"
            className="explore-hero-bg-img"
          />
        </div>

        <div className="landing-container explore-hero-container">
          {/* Breadcrumbs positioned over the banner */}
          <div className="explore-hero-breadcrumbs">
            <span className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Trang chủ
            </span>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <span className="breadcrumb-link" onClick={() => navigateMarketing('topdoo-tools')}>
              Tools
            </span>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Khám phá công cụ</span>
          </div>

          <div className="explore-hero-grid">
            {/* Left Content Column */}
            <div className="explore-hero-left">
              <div className="explore-hero-pill">
                <Box size={14} color="#EA580C" />
                <span>TOPDOO TOOLS</span>
              </div>

              <h1 className="explore-hero-heading">
                Khám phá công cụ <span className="explore-heading-orange">AI</span><br />
                cho mọi nhu cầu
              </h1>

              <p className="explore-hero-subheading">
                Hàng nghìn công cụ AI được tuyển chọn, đánh giá khách quan giúp bạn làm việc thông minh hơn, nhanh hơn và sáng tạo hơn.
              </p>

              {/* Big Search Input with Orange Submit Button */}
              <div className="explore-hero-search-box">
                <div className="explore-search-input-wrap">
                  <Search size={18} className="explore-search-input-icon" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Tìm công cụ AI, ví dụ: ChatGPT, tạo ảnh, viết nội dung, video..."
                    className="explore-search-input"
                  />
                  {heroSearch && (
                    <button className="btn-clear-hero-search" onClick={() => setHeroSearch('')}>
                      <X size={14} />
                    </button>
                  )}
                </div>
                <button
                  className="btn-explore-search-submit"
                  onClick={() => {
                    const el = document.getElementById('explore-catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Search size={18} />
                </button>
              </div>

              {/* Popular Keyword Chips */}
              <div className="explore-popular-chips-row">
                <span className="chips-label">Tìm kiếm phổ biến:</span>
                <div className="chips-list">
                  {popularKeywords.map((kw, idx) => (
                    <button
                      key={idx}
                      className="explore-chip-btn"
                      onClick={() => setHeroSearch(kw)}
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Hero Visual Area with Floating Badges matching mockup */}
            <div className="explore-hero-right">
              {/* Blue Pill: Hơn 10.000+ công cụ AI */}
              <div className="explore-float-badge badge-blue-tools">
                <span>Hơn 10.000+ công cụ AI</span>
              </div>

              {/* Feature Checklist Box */}
              <div className="explore-float-card card-features-check">
                <div className="feature-check-item">
                  <Check size={13} className="check-icon-cyan" />
                  <span>Được tuyển chọn</span>
                </div>
                <div className="feature-check-item">
                  <Check size={13} className="check-icon-cyan" />
                  <span>Cập nhật liên tục</span>
                </div>
                <div className="feature-check-item">
                  <Check size={13} className="check-icon-cyan" />
                  <span>Đánh giá khách quan</span>
                </div>
              </div>

              {/* Speech Bubble */}
              <div className="explore-float-bubble bubble-right-target">
                <span>Tìm đúng công cụ cho ý tưởng của bạn!</span>
              </div>

              {/* Slogan */}
              <div className="explore-cursive-slogan">
                <span>More Tools</span>
                <span>More Possibilities</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Filter Ribbon (11 categories) */}
      <section className="explore-categories-section">
        <div className="landing-container">
          <div className="explore-categories-ribbon">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  className={`explore-cat-item ${cat.isPrimary ? 'item-primary' : ''} ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.id === 'all') {
                      showToast('Tất cả', 'Hiển thị tất cả danh mục công cụ AI', 'info');
                    } else {
                      showToast(cat.name, `Đang lọc danh mục ${cat.name} (${cat.label})...`, 'info');
                    }
                  }}
                >
                  <div
                    className="explore-cat-icon-badge"
                    style={{
                      backgroundColor: isActive && !cat.isPrimary ? '#FFF7ED' : cat.bg,
                      color: isActive && !cat.isPrimary ? '#EA580C' : cat.color
                    }}
                  >
                    <IconComp size={18} color={isActive && !cat.isPrimary ? '#EA580C' : cat.color} />
                  </div>
                  <div className="explore-cat-info">
                    <div className="explore-cat-name">{cat.name}</div>
                    <div className="explore-cat-label">{cat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Quick Action 4 Cards Row */}
      <section className="explore-quick-cards-section">
        <div className="landing-container">
          <div className="explore-quick-cards-grid">
            {/* Card 1: Trending Tools */}
            <div
              className="explore-quick-card"
              onClick={() => showToast('Trending Tools', 'Hiển thị danh sách công cụ AI thịnh hành...', 'info')}
            >
              <div className="quick-card-icon-wrap bg-orange-soft">
                <Flame size={18} color="#EA580C" />
              </div>
              <div className="quick-card-text">
                <div className="quick-card-title">Trending Tools</div>
                <div className="quick-card-desc">Những công cụ đang được quan tâm nhất</div>
              </div>
              <ArrowRight size={15} className="quick-card-arrow" />
            </div>

            {/* Card 2: AI Recommendations */}
            <div
              className="explore-quick-card"
              onClick={() => showToast('AI Recommendations', 'Hệ thống đang chuẩn bị gợi ý công cụ AI phù hợp...', 'info')}
            >
              <div className="quick-card-icon-wrap bg-amber-soft">
                <Star size={18} color="#D97706" />
              </div>
              <div className="quick-card-text">
                <div className="quick-card-title">AI Recommendations</div>
                <div className="quick-card-desc">Gợi ý công cụ phù hợp với nhu cầu của bạn</div>
              </div>
              <ArrowRight size={15} className="quick-card-arrow" />
            </div>

            {/* Card 3: Bộ sưu tập */}
            <div
              className="explore-quick-card"
              onClick={() => showToast('Bộ sưu tập', 'Đang mở các bộ sưu tập AI theo chủ đề...', 'info')}
            >
              <div className="quick-card-icon-wrap bg-amber-soft">
                <Trophy size={18} color="#D97706" />
              </div>
              <div className="quick-card-text">
                <div className="quick-card-title">Bộ sưu tập</div>
                <div className="quick-card-desc">Các bộ công cụ theo chủ đề</div>
              </div>
              <ArrowRight size={15} className="quick-card-arrow" />
            </div>

            {/* Card 4: So sánh công cụ */}
            <div
              className="explore-quick-card"
              onClick={() => showToast('So sánh công cụ', 'Mở bảng so sánh tính năng và chi phí công cụ AI...', 'info')}
            >
              <div className="quick-card-icon-wrap bg-orange-soft">
                <Scale size={18} color="#EA580C" />
              </div>
              <div className="quick-card-text">
                <div className="quick-card-title">So sánh công cụ</div>
                <div className="quick-card-desc">So sánh tính năng, giá, ưu nhược điểm</div>
              </div>
              <ArrowRight size={15} className="quick-card-arrow" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Main Catalog Section: Filter Sidebar (Left) + Tools Grid (Right) */}
      <section id="explore-catalog-section" className="explore-catalog-section">
        <div className="landing-container">
          <div className="explore-catalog-grid">
            {/* Left Sidebar Filter */}
            <aside className="explore-sidebar-panel">
              {/* Filter Header */}
              <div className="sidebar-filter-header">
                <div className="sidebar-filter-title">Bộ lọc</div>
                <button className="btn-reset-filters" onClick={handleResetFilters}>
                  Xóa tất cả
                </button>
              </div>

              {/* Sidebar Search Input */}
              <div className="sidebar-search-box">
                <Search size={14} className="sidebar-search-icon" />
                <input
                  type="text"
                  placeholder="Tìm trong kết quả..."
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  className="sidebar-search-input"
                />
                {sidebarSearch && (
                  <button className="btn-sidebar-clear" onClick={() => setSidebarSearch('')}>
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Filter Group: Danh mục */}
              <div className="sidebar-filter-group">
                <div className="filter-group-header" onClick={() => toggleSection('categories')}>
                  <span className="filter-group-title">Danh mục</span>
                  {collapsedSections.categories ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </div>

                {!collapsedSections.categories && (
                  <div className="filter-group-body">
                    {sidebarCategoryOptions.map((opt) => {
                      const isChecked = selectedCategories.includes(opt.id);
                      return (
                        <label key={opt.id} className="filter-checkbox-label">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedCategories((prev) =>
                                prev.includes(opt.id) ? prev.filter((id) => id !== opt.id) : [...prev, opt.id]
                              );
                            }}
                            className="filter-checkbox"
                          />
                          <span className="filter-checkbox-custom" />
                          <span className="filter-item-name">{opt.label}</span>
                          <span className="filter-item-count">({opt.count})</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter Group: Giá */}
              <div className="sidebar-filter-group">
                <div className="filter-group-header" onClick={() => toggleSection('price')}>
                  <span className="filter-group-title">Giá</span>
                  {collapsedSections.price ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </div>

                {!collapsedSections.price && (
                  <div className="filter-group-body">
                    {[
                      { id: 'all', label: 'Tất cả' },
                      { id: 'free', label: 'Miễn phí' },
                      { id: 'freemium', label: 'Freemium' },
                      { id: 'paid', label: 'Trả phí' }
                    ].map((p) => (
                      <label key={p.id} className="filter-radio-label">
                        <input
                          type="radio"
                          name="price-filter"
                          checked={selectedPrice === p.id}
                          onChange={() => setSelectedPrice(p.id)}
                          className="filter-radio"
                        />
                        <span className="filter-radio-custom" />
                        <span className="filter-item-name">{p.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter Group: Đánh giá */}
              <div className="sidebar-filter-group">
                <div className="filter-group-header" onClick={() => toggleSection('rating')}>
                  <span className="filter-group-title">Đánh giá</span>
                  {collapsedSections.rating ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </div>

                {!collapsedSections.rating && (
                  <div className="filter-group-body">
                    {[
                      { id: 4.5, label: 'Từ 4.5+', stars: 2 },
                      { id: 4.0, label: 'Từ 4.0+', stars: 1 },
                      { id: 3.5, label: 'Từ 3.5+', stars: 1 }
                    ].map((r) => {
                      const isChecked = selectedRatings.includes(r.id);
                      return (
                        <label key={r.id} className="filter-checkbox-label">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedRatings((prev) =>
                                prev.includes(r.id) ? prev.filter((id) => id !== r.id) : [...prev, r.id]
                              );
                            }}
                            className="filter-checkbox"
                          />
                          <span className="filter-checkbox-custom" />
                          <span className="filter-stars-icon">★★</span>
                          <span className="filter-item-name">{r.label}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter Group: Nền tảng */}
              <div className="sidebar-filter-group">
                <div className="filter-group-header" onClick={() => toggleSection('platform')}>
                  <span className="filter-group-title">Nền tảng</span>
                  {collapsedSections.platform ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
                </div>

                {!collapsedSections.platform && (
                  <div className="filter-group-body">
                    {[
                      { id: 'web', label: 'Web' },
                      { id: 'windows', label: 'Windows' },
                      { id: 'macos', label: 'macOS' },
                      { id: 'ios', label: 'iOS' },
                      { id: 'android', label: 'Android' },
                      { id: 'chrome', label: 'Chrome Extension' }
                    ].map((plat) => {
                      const isChecked = selectedPlatforms.includes(plat.id);
                      return (
                        <label key={plat.id} className="filter-checkbox-label">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              setSelectedPlatforms((prev) =>
                                prev.includes(plat.id) ? prev.filter((id) => id !== plat.id) : [...prev, plat.id]
                              );
                            }}
                            className="filter-checkbox"
                          />
                          <span className="filter-checkbox-custom" />
                          <span className="filter-item-name">{plat.label}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Filter Submit Button */}
              <button
                className="btn-apply-filters"
                onClick={() => {
                  showToast('Bộ lọc', `Đã áp dụng bộ lọc! Tìm thấy ${filteredTools.length} công cụ phù hợp.`, 'success');
                }}
              >
                Lọc kết quả
              </button>
            </aside>

            {/* Right Main Content (Tools Catalog Grid) */}
            <main className="explore-main-content">
              {/* Header with Title and Sorting */}
              <div className="explore-content-header">
                <div>
                  <h2 className="explore-results-title">
                    {filteredTools.length > 0 ? '10.000+ công cụ AI' : '0 công cụ AI'}
                  </h2>
                  <p className="explore-results-subtitle">
                    Khám phá, so sánh và chọn công cụ phù hợp nhất với bạn.
                  </p>
                </div>

                <div className="explore-sort-wrap">
                  <span className="sort-label">Sắp xếp theo</span>
                  <div className="sort-select-box">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-native-select"
                    >
                      <option value="popular">Phổ biến nhất</option>
                      <option value="rating">Đánh giá cao nhất</option>
                      <option value="newest">Mới nhất</option>
                      <option value="name">Tên A-Z</option>
                    </select>
                    <ChevronDown size={14} className="sort-select-arrow" />
                  </div>
                </div>
              </div>

              {/* 12 AI Tools Grid */}
              {filteredTools.length > 0 ? (
                <div className="explore-tools-grid">
                  {filteredTools.map((tool) => {
                    const isSaved = savedToolIds.has(tool.id);
                    return (
                      <div
                        key={tool.id}
                        className="explore-tool-card"
                        onClick={() => showToast(tool.name, `Đang mở thông tin chi tiết và trải nghiệm ${tool.name}...`, 'info')}
                      >
                        {/* Card Header: Logo, Name, Hot Badge, Bookmark Heart */}
                        <div className="tool-card-head">
                          <div className="head-left-logo">
                            {renderToolIcon(tool.iconType)}
                          </div>

                          <div className="head-right-actions">
                            {tool.isHot && <span className="badge-hot-tag">Hot</span>}
                            <button
                              className={`btn-tool-heart ${isSaved ? 'saved' : ''}`}
                              onClick={(e) => toggleSaveTool(tool.id, tool.name, e)}
                              title={isSaved ? 'Bỏ lưu' : 'Lưu công cụ'}
                            >
                              <Heart size={14} fill={isSaved ? '#EF4444' : 'none'} color={isSaved ? '#EF4444' : '#94A3B8'} />
                            </button>
                          </div>
                        </div>

                        {/* Title & Description */}
                        <div className="tool-card-identity">
                          <div className="tool-card-name">{tool.name}</div>
                          <div className="tool-card-desc">{tool.subtitle}</div>
                        </div>

                        {/* Category / Feature Tag Pills */}
                        <div className="tool-card-tags-row">
                          {tool.tags.map((tag, tIdx) => (
                            <span key={tIdx} className="tool-tag-chip">
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Rating and User Count */}
                        <div className="tool-card-metrics-row">
                          <div className="metric-rating-wrap">
                            <span className="star-icon">★</span>
                            <span className="rating-score">{tool.rating}</span>
                            <span className="review-count">({tool.reviewCount})</span>
                          </div>
                          <div className="metric-users-wrap">
                            {tool.userCount}
                          </div>
                        </div>

                        {/* Bottom Action: Outline Button "Truy cập →" & "★ Đánh giá" */}
                        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                          <button
                            className="btn-tool-card-visit"
                            style={{ flex: 1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              showToast('Truy cập công cụ', `Chuyển tiếp đến trang web chính thức của ${tool.name}...`, 'success');
                            }}
                          >
                            <span>Truy cập</span>
                            <ArrowRight size={13} />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedToolForReview(tool);
                              setIsReviewModalOpen(true);
                            }}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#FEF3C7',
                              border: '1px solid #FDE68A',
                              borderRadius: 8,
                              color: '#B45309',
                              fontSize: 12,
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 4
                            }}
                          >
                            <span>★</span>
                            <span>Đánh giá</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="explore-empty-state">
                  <Sparkles size={36} color="#EA580C" />
                  <div className="empty-state-title">Không tìm thấy công cụ AI phù hợp</div>
                  <div className="empty-state-desc">Hãy thử thay đổi từ khóa tìm kiếm hoặc đặt lại các bộ lọc bên trái.</div>
                  <button className="btn-empty-reset" onClick={handleResetFilters}>
                    Đặt lại bộ lọc
                  </button>
                </div>
              )}

              {/* Pagination Controls */}
              <div className="explore-pagination-row">
                <div className="pagination-pages-wrap">
                  <button
                    className="pagination-btn-arrow"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    ‹
                  </button>
                  {[1, 2, 3, 4, 5].map((pageNum) => (
                    <button
                      key={pageNum}
                      className={`pagination-number-btn ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  ))}
                  <span className="pagination-dots">...</span>
                  <button
                    className="pagination-number-btn"
                    onClick={() => setCurrentPage(100)}
                  >
                    100
                  </button>
                  <button
                    className="pagination-btn-arrow"
                    onClick={() => setCurrentPage((p) => p + 1)}
                  >
                    ›
                  </button>
                </div>

                <div className="pagination-size-wrap">
                  <select className="pagination-size-select">
                    <option value="12">Hiển thị 12 / trang</option>
                    <option value="24">Hiển thị 24 / trang</option>
                    <option value="48">Hiển thị 48 / trang</option>
                  </select>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* 6. Footer CTA Banner with /bannerToolsDiscoverFooter.png Background */}
      <section className="explore-footer-cta-section">
        <div className="landing-container">
          <div className="explore-footer-cta-banner">
            <img
              src="/bannerToolsDiscoverFooter.png"
              alt="Khám phá thêm nhiều công cụ AI tuyệt vời"
              className="explore-footer-cta-bg"
            />

            <div className="explore-footer-cta-content">
              <h2 className="explore-footer-cta-heading">
                Khám phá thêm nhiều công cụ AI tuyệt vời
              </h2>
              <p className="explore-footer-cta-subheading">
                Cập nhật hàng ngày • Đánh giá khách quan • Cộng đồng chia sẻ
              </p>

              <div className="explore-footer-cta-actions">
                <button
                  className="btn-explore-footer-primary"
                  onClick={() => {
                    const el = document.getElementById('explore-catalog-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Khám phá ngay</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  className="btn-explore-footer-secondary"
                  onClick={() => showToast('Cộng đồng Topdoo', 'Chuyển đến nhóm cộng đồng chia sẻ AI Topdoo...', 'info')}
                >
                  <span>Tham gia cộng đồng</span>
                </button>
              </div>
            </div>

            <div className="explore-footer-cursive-slogan">
              <span>Good Technology</span>
              <span>A Brighter Tomorrow</span>
            </div>
          </div>
        </div>
      </section>

      {/* Star Rating Review Modal */}
      {isReviewModalOpen && selectedToolForReview && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div style={{
            width: '100%',
            maxWidth: 520,
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 24,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)',
            border: '1px solid #E2E8F0'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                  Đánh giá {selectedToolForReview.name}
                </h3>
                <span style={{ fontSize: 12, color: '#64748B' }}>
                  Chia sẻ nhận xét thực tế giúp cộng đồng đưa ra lựa chọn sáng suốt
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                style={{
                  border: 'none',
                  background: '#F1F5F9',
                  borderRadius: 8,
                  width: 30,
                  height: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={16} color="#64748B" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Xếp hạng số sao:
                </label>
                <div style={{ display: 'flex', gap: 8, fontSize: 24, cursor: 'pointer' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setReviewRating(star)}
                      style={{ color: star <= reviewRating ? '#F59E0B' : '#CBD5E1', transition: 'color 0.15s' }}
                    >
                      ★
                    </span>
                  ))}
                  <span style={{ fontSize: 14, color: '#64748B', alignSelf: 'center', marginLeft: 8 }}>
                    {reviewRating} trên 5 sao
                  </span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Họ và tên hoặc chức danh:
                </label>
                <input
                  type="text"
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #CBD5E1',
                    fontSize: 13,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Nhận xét & Trải nghiệm thực tế:
                </label>
                <textarea
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Công cụ này có điểm gì nổi bật? Tốc độ, độ chính xác hoặc chi phí thế nào..."
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 8,
                    border: '1px solid #CBD5E1',
                    fontSize: 13,
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 8,
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                    color: '#475569',
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: '#EA580C',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(234, 88, 12, 0.3)'
                  }}
                >
                  Gửi đánh giá
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Global Footer */}
      <MarketingFooter />
    </div>
  );
}
