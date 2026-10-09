import React, { useState, useRef, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowRight,
  Globe,
  Search,
  MessageSquare,
  Feather,
  Box,
  Shield,
  Code2,
  Sparkles,
  Bot,
  Zap,
  Image as ImageIcon,
  Video,
  BookOpen,
  Users,
  Compass,
  FileText,
  LayoutGrid,
  GraduationCap,
  ClipboardList,
  Layers,
  Tag,
  TrendingUp,
  Settings,
  Music,
  Presentation,
  PenTool,
  Wand2,
  Scale,
  Bookmark,
  Flame,
  Heart,
  Star,
  ShieldCheck,
  Lock,
  UserCheck,
  Cloud,
  Puzzle,
  Key,
  BarChart2,
  Link2,
  Phone,
  Mail,
  User,
  Database,
  Cpu,
  QrCode,
  Plug,
  Bell,
  AlertTriangle,
  HelpCircle,
  Newspaper,
  Calendar,
  Megaphone,
  Gift,
  Handshake,
  Briefcase,
  Share2,
  Building2,
  Building,
  Menu,
  X,
  Coins,
  LogOut
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export function MarketingHeader() {
  const {
    navigateMarketing,
    marketingRoute,
    setMode,
    setCurrentView,
    showToast,
    setIsSearchOpen,
    openAuthModal,
    user,
    signOut,
    userRole,
    creditBalance,
    addCredits,
    openCreditModal
  } = useSecurity();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpandedSection, setMobileExpandedSection] = useState(null);
  const dropdownTimerRef = useRef(null);

  const handleMobileNav = (route) => {
    setIsMobileMenuOpen(false);
    navigateMarketing(route);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMouseEnterDropdown = (menuKey) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setActiveDropdown(menuKey);
  };

  const handleMouseLeaveDropdown = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
    }
    dropdownTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setHoveredProduct(null);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const launchSecurityConsole = (targetView = 'overview') => {
    setMode('app');
    setCurrentView(targetView);
  };

  const goToTopdooAi = () => {
    setActiveDropdown(null);
    setHoveredProduct(null);
    navigateMarketing('topdoo-ai');
  };

  const goToTopdooStudio = () => {
    setActiveDropdown(null);
    setHoveredProduct(null);
    navigateMarketing('topdoo-studio');
  };

  const goToTopdooTools = () => {
    setActiveDropdown(null);
    setHoveredProduct(null);
    navigateMarketing('topdoo-tools');
  };

  const goToExploreTools = () => {
    setActiveDropdown(null);
    setHoveredProduct(null);
    navigateMarketing('topdoo-explore-tools');
  };

  const goToTopdooSecurity = () => {
    setActiveDropdown(null);
    setHoveredProduct(null);
    navigateMarketing('topdoo-security');
  };

  const goToTopdooDeveloper = () => {
    setActiveDropdown(null);
    setHoveredProduct(null);
    navigateMarketing('topdoo-developer');
  };

  const toolsMenuColumns = [
    {
      id: 'inspection',
      title: 'Công cụ kiểm tra',
      subtitle: 'Kiểm tra nhanh, phát hiện rủi ro',
      items: [
        {
          id: 'quick-check',
          title: 'Quick Check',
          desc: 'Kiểm tra nhanh dấu hiệu lừa đảo',
          icon: Search,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => launchSecurityConsole('quick-check')
        },
        {
          id: 'link-scanner',
          title: 'Kiểm tra link/Website',
          desc: 'Phân tích độ an toàn của đường link',
          icon: Link2,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => launchSecurityConsole('url-scanner')
        },
        {
          id: 'phone-check',
          title: 'Kiểm tra số điện thoại',
          desc: 'Nhận diện cuộc gọi nghi ngờ',
          icon: Phone,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => launchSecurityConsole('quick-check')
        },
        {
          id: 'email-check',
          title: 'Kiểm tra email',
          desc: 'Phát hiện email lừa đảo',
          icon: Mail,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => launchSecurityConsole('phishing-check')
        },
        {
          id: 'social-check',
          title: 'Kiểm tra tài khoản MXH',
          desc: 'Đánh giá độ tin cậy tài khoản',
          icon: User,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => launchSecurityConsole('quick-check')
        },
        {
          id: 'file-check',
          title: 'Kiểm tra tệp tin',
          desc: 'Quét virus, mã độc, nội dung rủi ro',
          icon: FileText,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => launchSecurityConsole('quick-check')
        }
      ]
    },
    {
      id: 'analysis',
      title: 'Công cụ phân tích',
      subtitle: 'Phân tích chuyên sâu với AI',
      items: [
        {
          id: 'scam-database',
          title: 'Scam Database',
          desc: 'Tra cứu dữ liệu lừa đảo toàn cầu',
          icon: Database,
          iconBg: '#F3E8FF',
          iconColor: '#8B5CF6',
          action: () => launchSecurityConsole('scam-database')
        },
        {
          id: 'ai-analysis',
          title: 'AI Analysis',
          desc: 'Phân tích nội dung, hình ảnh bằng AI',
          icon: Cpu,
          iconBg: '#E0F2FE',
          iconColor: '#0284C7',
          action: () => launchSecurityConsole('verification-center')
        },
        {
          id: 'whois-lookup',
          title: 'WHOIS Lookup',
          desc: 'Tra cứu thông tin tên miền',
          icon: Globe,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => launchSecurityConsole('url-scanner')
        },
        {
          id: 'content-analysis',
          title: 'Phân tích nội dung',
          desc: 'Kiểm tra văn bản, tin nhắn',
          icon: FileText,
          iconBg: '#E0F2FE',
          iconColor: '#0284C7',
          action: () => launchSecurityConsole('evidence-workspace')
        },
        {
          id: 'image-analysis',
          title: 'Phân tích hình ảnh',
          desc: 'Nhận diện hình ảnh lừa đảo',
          icon: ImageIcon,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => launchSecurityConsole('evidence-workspace')
        },
        {
          id: 'qr-scanner',
          title: 'Quét mã QR',
          desc: 'Kiểm tra độ an toàn của mã QR',
          icon: QrCode,
          iconBg: '#E0F2FE',
          iconColor: '#0284C7',
          action: () => launchSecurityConsole('quick-check')
        }
      ]
    },
    {
      id: 'support',
      title: 'Công cụ hỗ trợ',
      subtitle: 'Tiện ích bảo vệ an toàn hơn',
      items: [
        {
          id: 'browser-extension',
          title: 'Tiện ích trình duyệt',
          desc: 'Cảnh báo website nguy hiểm',
          icon: ShieldCheck,
          iconBg: '#DCFCE7',
          iconColor: '#10B981',
          action: () => {
            setActiveDropdown(null);
            launchSecurityConsole('url-scanner');
            showToast('Tiện ích trình duyệt Topdoo Shield', 'Chuyển đến công cụ bảo mật...', 'info');
          }
        },
        {
          id: 'webhook',
          title: 'Webhook',
          desc: 'Nhận thông báo theo thời gian thực',
          icon: Plug,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => navigateMarketing('topdoo-developer-api-sdk')
        },
        {
          id: 'api-integration',
          title: 'API & Tích hợp',
          desc: 'Kết nối vào hệ thống của bạn',
          icon: Settings,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => navigateMarketing('topdoo-developer-api-sdk')
        },
        {
          id: 'reports-analytics',
          title: 'Báo cáo & Thống kê',
          desc: 'Xem báo cáo, xu hướng lừa đảo',
          icon: BarChart2,
          iconBg: '#E0F2FE',
          iconColor: '#0284C7',
          action: () => launchSecurityConsole('reports')
        },
        {
          id: 'risk-alerts',
          title: 'Cảnh báo rủi ro',
          desc: 'Thiết lập nhận cảnh báo',
          icon: Bell,
          iconBg: '#FEE2E2',
          iconColor: '#EF4444',
          action: () => launchSecurityConsole('alerts-center')
        },
        {
          id: 'user-guide',
          title: 'Hướng dẫn sử dụng',
          desc: 'Tài liệu và video hướng dẫn',
          icon: BookOpen,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => navigateMarketing('topdoo-developer-docs')
        }
      ]
    }
  ];

  const exploreMenuColumns = [
    {
      id: 'knowledge',
      title: 'Kiến thức & Hướng dẫn',
      subtitle: 'Trang bị kỹ năng an toàn số cho bạn',
      items: [
        {
          id: 'topdoo-academy-hub',
          title: 'Topdoo Academy',
          desc: 'Khóa học an ninh số & AI thực chiến',
          icon: GraduationCap,
          iconBg: '#DBEAFE',
          iconColor: '#1D4ED8',
          action: () => navigateMarketing('topdoo-academy')
        },
        {
          id: 'knowledge-hub',
          title: 'Trung tâm kiến thức',
          desc: 'Bài viết, hướng dẫn, mẹo bảo mật',
          icon: BookOpen,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => navigateMarketing('topdoo-developer-docs')
        },
        {
          id: 'scam-warnings',
          title: 'Cảnh báo lừa đảo',
          desc: 'Thông tin các chiêu trò mới nhất',
          icon: AlertTriangle,
          iconBg: '#FEE2E2',
          iconColor: '#EF4444',
          action: () => launchSecurityConsole('alerts-center')
        },
        {
          id: 'user-guide-explore',
          title: 'Hướng dẫn sử dụng',
          desc: 'Tài liệu, video hướng dẫn chi tiết',
          icon: FileText,
          iconBg: '#DCFCE7',
          iconColor: '#10B981',
          action: () => navigateMarketing('topdoo-developer-docs')
        },
        {
          id: 'faq',
          title: 'Câu hỏi thường gặp (FAQ)',
          desc: 'Giải đáp các thắc mắc phổ biến',
          icon: HelpCircle,
          iconBg: '#F3E8FF',
          iconColor: '#8B5CF6',
          action: () => {
            navigateMarketing('home');
            setTimeout(() => {
              const el = document.getElementById('faq') || document.querySelector('.faq-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 150);
          }
        }
      ]
    },
    {
      id: 'news',
      title: 'Tin tức & Cập nhật',
      subtitle: 'Luôn cập nhật để an toàn hơn',
      items: [
        {
          id: 'cyber-news',
          title: 'Tin tức an ninh mạng',
          desc: 'Cập nhật xu hướng, sự kiện',
          icon: Newspaper,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => {
            setActiveDropdown(null);
            navigateMarketing('topdoo-community');
          }
        },
        {
          id: 'scam-trends-report',
          title: 'Báo cáo xu hướng lừa đảo',
          desc: 'Thống kê và phân tích định kỳ',
          icon: BarChart2,
          iconBg: '#E0F2FE',
          iconColor: '#0284C7',
          action: () => launchSecurityConsole('reports')
        },
        {
          id: 'user-stories',
          title: 'Câu chuyện người dùng',
          desc: 'Chia sẻ kinh nghiệm thực tế',
          icon: Users,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => {
            setActiveDropdown(null);
            navigateMarketing('topdoo-community');
          }
        },
        {
          id: 'webinar-events',
          title: 'Sự kiện & Webinar',
          desc: 'Hội thảo, đào tạo trực tuyến',
          icon: Calendar,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => {
            setActiveDropdown(null);
            navigateMarketing('topdoo-community');
          }
        }
      ]
    },
    {
      id: 'community',
      title: 'Cộng đồng',
      subtitle: 'Cùng nhau xây dựng không gian số an toàn',
      items: [
        {
          id: 'topdoo-community',
          title: 'Cộng đồng Topdoo',
          desc: 'Kết nối, thảo luận, chia sẻ',
          icon: Users,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => navigateMarketing('topdoo-community')
        },
        {
          id: 'experts-partners',
          title: 'Chuyên gia & Đối tác',
          desc: 'Gặp gỡ các chuyên gia bảo mật',
          icon: ShieldCheck,
          iconBg: '#DCFCE7',
          iconColor: '#10B981',
          action: () => navigateMarketing('topdoo-contact')
        },
        {
          id: 'contribute-report',
          title: 'Đóng góp báo cáo',
          desc: 'Chung tay cảnh báo lừa đảo',
          icon: Megaphone,
          iconBg: '#FEE2E2',
          iconColor: '#EF4444',
          action: () => launchSecurityConsole('report-scam')
        },
        {
          id: 'ambassador-program',
          title: 'Chương trình đại sứ',
          desc: 'Lan tỏa an toàn số',
          icon: Gift,
          iconBg: '#F3E8FF',
          iconColor: '#8B5CF6',
          action: () => {
            setActiveDropdown(null);
            navigateMarketing('topdoo-community');
          }
        }
      ]
    }
  ];

  const companyMenuColumns = [
    {
      id: 'about',
      title: 'Về Topdoo',
      subtitle: 'Tìm hiểu về chúng tôi',
      items: [
        {
          id: 'about-us',
          title: 'Giới thiệu',
          desc: 'Sứ mệnh, tầm nhìn, giá trị cốt lõi',
          icon: Building2,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => navigateMarketing('topdoo-company')
        },
        {
          id: 'team',
          title: 'Đội ngũ',
          desc: 'Những con người phía sau Topdoo',
          icon: Users,
          iconBg: '#F3E8FF',
          iconColor: '#8B5CF6',
          action: () => navigateMarketing('topdoo-company')
        },
        {
          id: 'news',
          title: 'Tin tức',
          desc: 'Cập nhật hoạt động, sự kiện',
          icon: FileText,
          iconBg: '#DCFCE7',
          iconColor: '#10B981',
          action: () => {
            setActiveDropdown(null);
            navigateMarketing('topdoo-company');
          }
        },
        {
          id: 'careers',
          title: 'Tuyển dụng',
          desc: 'Gia nhập cùng chúng tôi',
          icon: Briefcase,
          iconBg: '#FEF3C7',
          iconColor: '#D97706',
          action: () => {
            setActiveDropdown(null);
            navigateMarketing('topdoo-company');
          }
        },
        {
          id: 'contact',
          title: 'Liên hệ',
          desc: 'Kết nối và hợp tác',
          icon: Mail,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => navigateMarketing('topdoo-contact')
        }
      ]
    },
    {
      id: 'partnerships',
      title: 'Đối tác & Hợp tác',
      subtitle: 'Cùng nhau tạo ra giá trị lớn hơn',
      items: [
        {
          id: 'strategic-partners',
          title: 'Đối tác chiến lược',
          desc: 'Mạng lưới đối tác toàn cầu',
          icon: Handshake,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => navigateMarketing('topdoo-contact')
        },
        {
          id: 'enterprise-collab',
          title: 'Hợp tác doanh nghiệp',
          desc: 'Giải pháp cho tổ chức, doanh nghiệp',
          icon: Building,
          iconBg: '#F3E8FF',
          iconColor: '#8B5CF6',
          action: () => navigateMarketing('topdoo-business')
        },
        {
          id: 'partner-program',
          title: 'Chương trình đại lý',
          desc: 'Cơ hội hợp tác kinh doanh',
          icon: Share2,
          iconBg: '#CCFBF1',
          iconColor: '#0D9488',
          action: () => {
            setActiveDropdown(null);
            navigateMarketing('topdoo-business');
          }
        },
        {
          id: 'api-integration',
          title: 'API & Tích hợp',
          desc: 'Kết nối và mở rộng hệ sinh thái',
          icon: Code2,
          iconBg: '#FFEDD5',
          iconColor: '#EA580C',
          action: () => navigateMarketing('topdoo-developer-api-sdk')
        },
        {
          id: 'media-press',
          title: 'Truyền thông',
          desc: 'Tài liệu, hình ảnh, brand kit',
          icon: Megaphone,
          iconBg: '#EBF5FF',
          iconColor: '#0084FF',
          action: () => {
            setActiveDropdown(null);
            navigateMarketing('topdoo-company');
          }
        }
      ]
    }
  ];

  return (
    <>
      <header className="landing-header">
        <div className="landing-header-inner">
          {/* Logo */}
        <div
          className="landing-logo"
          onClick={() => navigateMarketing('home')}
          style={{ cursor: 'pointer' }}
        >
          {marketingRoute === 'topdoo-url-scanner' || marketingRoute === 'url-scanner' ? (
            <div className="topdoo-round-logo-mark" style={{ display: 'flex', alignItems: 'center' }}>
              <svg viewBox="0 0 36 36" fill="none" width="32" height="32">
                <circle cx="18" cy="18" r="18" fill="url(#topdooBlueGradMark)" />
                <path d="M12 18C12 14.686 14.686 12 18 12C21.314 12 24 14.686 24 18C24 21.314 21.314 24 18 24C15.5 24 13.5 22 13.5 19.5" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
                <circle cx="18" cy="18" r="3.2" fill="#38BDF8" />
                <defs>
                  <linearGradient id="topdooBlueGradMark" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00B4D8" />
                    <stop offset="0.5" stopColor="#0077B6" />
                    <stop offset="1" stopColor="#03045E" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          ) : (
            <img src="/topdoo.jpeg" alt="TOPDOO Logo" className="landing-logo-img" />
          )}
          <span className="landing-logo-text">TOPDOO</span>
        </div>

        {/* Navigation Links */}
        <nav className="landing-nav-links">
          {/* Sản phẩm Dropdown Trigger */}
          <div
            className={`nav-dropdown-trigger ${activeDropdown === 'products' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnterDropdown('products')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <button
              className={`nav-link-btn ${activeDropdown === 'products' ? 'active' : ''}`}
              onClick={() => setActiveDropdown(activeDropdown === 'products' ? null : 'products')}
            >
              <span>Sản phẩm</span>
              {activeDropdown === 'products' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {activeDropdown === 'products' && (
              <>
                <div className="mega-menu-backdrop" onClick={() => setActiveDropdown(null)} />
                <div
                  className="products-mega-wrapper"
                  onMouseEnter={() => handleMouseEnterDropdown('products')}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <div className="products-mega-modal">
                    {/* 3 Columns Body */}
                    <div className="mega-modal-grid">
                      {/* Column 1: 5 Core Product Cards */}
                      <div className="mega-col-products">
                        <div className="mega-col-products-header">
                          <h3 className="mega-modal-title">Sản phẩm của Topdoo</h3>
                          <p className="mega-modal-subtitle">
                            Bộ giải pháp AI toàn diện cho cá nhân, doanh nghiệp và cộng đồng.
                          </p>
                        </div>

                        <div className="mega-products-list">
                          {[
                            {
                              id: 'ai',
                              title: 'Topdoo AI',
                              desc: 'Trợ lý AI thông minh cho mọi công việc',
                              color: 'blue',
                              icon: MessageSquare,
                              action: goToTopdooAi
                            },
                            {
                              id: 'studio',
                              title: 'Topdoo Studio',
                              desc: 'Sáng tạo nội dung đa phương tiện',
                              color: 'purple',
                              icon: Feather,
                              action: goToTopdooStudio
                            },
                            {
                              id: 'tools',
                              title: 'Topdoo Tools',
                              desc: 'Bộ công cụ AI dành cho mọi nhu cầu',
                              color: 'orange',
                              icon: Box,
                              action: goToTopdooTools
                            },
                            {
                              id: 'security',
                              title: 'Topdoo Security',
                              desc: 'Bảo vệ bạn trên không gian số',
                              color: 'green',
                              icon: Shield,
                              action: goToTopdooSecurity
                            },
                            {
                              id: 'developer',
                              title: 'Topdoo Developer',
                              desc: 'Xây dựng cùng AI với API & SDK',
                              color: 'indigo',
                              icon: Code2,
                              action: () => {
                                setActiveDropdown(null);
                                launchSecurityConsole('api-integrations');
                              }
                            }
                          ].map((prod) => {
                            const IconComp = prod.icon;
                            const isActive = hoveredProduct === prod.id;
                            return (
                              <div
                                key={prod.id}
                                className={`mega-product-card ${isActive ? 'active' : ''} card-${prod.color}`}
                                onMouseEnter={() => setHoveredProduct(prod.id)}
                                onClick={prod.action}
                              >
                                <div className={`mega-prod-icon-box bg-gradient-${prod.color}`}>
                                  <IconComp size={20} color="#FFFFFF" />
                                </div>
                                <div className="mega-prod-text">
                                  <div className="mega-prod-title">{prod.title}</div>
                                  <div className="mega-prod-desc">{prod.desc}</div>
                                </div>
                                <div className="mega-prod-arrow">
                                  <ArrowRight size={15} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Column 2: Dynamic Features */}
                      <div className="mega-col-features">
                        {hoveredProduct === 'ai' ? (
                          <>
                            <div className="mega-col-heading-row">
                              <div className="mega-col-heading-blue">Topdoo AI</div>
                              <span
                                onClick={goToTopdooAi}
                                className="mega-col-overview-link"
                                style={{ cursor: 'pointer' }}
                              >
                                <span>Xem tổng quan</span>
                                <ArrowRight size={13} />
                              </span>
                            </div>
                            <div className="mega-col-subheading">Trợ lý AI thông minh cho mọi công việc</div>

                            <div className="mega-features-list-ai">
                              {[
                                { title: 'AI Chat', desc: 'Trò chuyện thông minh, hỗ trợ mọi tác vụ', icon: MessageSquare },
                                { title: 'AI Search', desc: 'Tìm kiếm thông tin với AI', icon: Search },
                                { title: 'Deep Research', desc: 'Nghiên cứu chuyên sâu, phân tích đa nguồn', icon: FileText },
                                { title: 'Phân tích tài liệu', desc: 'Tóm tắt, phân tích, trích xuất dữ liệu', icon: BookOpen },
                                { title: 'AI Image', desc: 'Tạo hình ảnh từ văn bản', icon: ImageIcon },
                                { title: 'Workspace', desc: 'Không gian làm việc AI', icon: LayoutGrid },
                                { title: 'AI Agents', desc: 'Xây dựng trợ lý AI tự động', icon: Bot },
                                { title: 'Models', desc: 'Lựa chọn và trải nghiệm nhiều mô hình AI', icon: Layers },
                                { title: 'Pricing', desc: 'Gói dịch vụ & tính năng', icon: Tag }
                              ].map((item, idx) => {
                                const IconComp = item.icon;
                                return (
                                  <div
                                    key={idx}
                                    className="mega-feature-row-ai"
                                    onClick={() => {
                                      showToast(item.title, `Đang mở tính năng ${item.title}...`, 'info');
                                      goToTopdooAi();
                                    }}
                                  >
                                    <div className="mega-feat-ai-badge">
                                      <IconComp size={15} color="#2563EB" />
                                    </div>
                                    <div className="mega-feat-ai-text">
                                      <div className="mega-feat-ai-title">{item.title}</div>
                                      <div className="mega-feat-ai-desc">{item.desc}</div>
                                    </div>
                                    <ChevronRight size={14} className="mega-feat-chevron" />
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : hoveredProduct === 'studio' ? (
                          <>
                            <div className="mega-col-heading-row">
                              <div className="mega-col-heading-purple">Topdoo Studio</div>
                              <span
                                onClick={goToTopdooStudio}
                                className="mega-col-overview-link"
                                style={{ cursor: 'pointer' }}
                              >
                                <span>Xem tổng quan</span>
                                <ArrowRight size={13} />
                              </span>
                            </div>
                            <div className="mega-col-subheading">Sáng tạo nội dung, dễ dàng hơn với AI</div>

                            <div className="mega-features-list-studio">
                              {[
                                { title: 'Viết nội dung', desc: 'Bài viết, blog, kịch bản, nội dung marketing', icon: FileText },
                                { title: 'Hình ảnh', desc: 'Tạo ảnh AI, chỉnh sửa, thiết kế đồ họa', icon: ImageIcon },
                                { title: 'Video', desc: 'Tạo video AI, chuyển văn bản thành video', icon: Video },
                                { title: 'Âm thanh', desc: 'Tạo giọng nói, nhạc, podcast', icon: Music },
                                { title: 'Thuyết trình', desc: 'Tạo slide đẹp, chuyên nghiệp', icon: Presentation },
                                { title: 'Tài liệu', desc: 'Soạn thảo, tóm tắt, chuyển đổi định dạng', icon: FileText },
                                { title: 'Thiết kế', desc: 'Logo, banner, poster, UI/UX', icon: PenTool },
                                { title: 'Template Library', desc: 'Hàng ngàn mẫu sẵn sàng sử dụng', icon: LayoutGrid },
                                { title: 'Pricing', desc: 'Gói dịch vụ & tính năng', icon: Tag }
                              ].map((item, idx) => {
                                const IconComp = item.icon;
                                return (
                                  <div
                                    key={idx}
                                    className="mega-feature-row-studio"
                                    onClick={() => {
                                      showToast(item.title, `Đang mở tính năng ${item.title}...`, 'info');
                                      goToTopdooStudio();
                                    }}
                                  >
                                    <div className="mega-feat-studio-badge">
                                      <IconComp size={15} color="#9333EA" />
                                    </div>
                                    <div className="mega-feat-studio-text">
                                      <div className="mega-feat-studio-title">{item.title}</div>
                                      <div className="mega-feat-studio-desc">{item.desc}</div>
                                    </div>
                                    <ChevronRight size={14} className="mega-feat-chevron" />
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : hoveredProduct === 'tools' ? (
                          <>
                            <div className="mega-col-heading-row">
                              <div className="mega-col-heading-orange">Topdoo Tools</div>
                              <span
                                onClick={goToTopdooTools}
                                className="mega-col-overview-link"
                                style={{ cursor: 'pointer' }}
                              >
                                <span>Xem tổng quan</span>
                                <ArrowRight size={13} />
                              </span>
                            </div>
                            <div className="mega-col-subheading">Bộ công cụ AI dành cho mọi nhu cầu</div>

                            <div className="mega-features-list-tools">
                              {[
                                { title: 'Khám phá công cụ', desc: 'Hàng nghìn công cụ AI được tuyển chọn', icon: Compass },
                                { title: 'Danh mục công cụ', desc: 'Writing, Image, Video, Code & hơn thế', icon: LayoutGrid },
                                { title: 'So sánh công cụ', desc: 'So sánh tính năng, giá & hiệu năng', icon: Scale },
                                { title: 'Bộ sưu tập', desc: 'Tuyển tập công cụ theo từng chủ đề', icon: Bookmark },
                                { title: 'Trending Tools', desc: 'Công cụ AI thịnh hành nhất', icon: Flame },
                                { title: 'AI Recommendations', desc: 'Gợi ý công cụ theo nhu cầu của bạn', icon: Sparkles },
                                { title: 'Saved Tools', desc: 'Công cụ AI bạn đã lưu trữ', icon: Heart },
                                { title: 'Reviews', desc: 'Đánh giá & trải nghiệm từ cộng đồng', icon: Star },
                                { title: 'Pricing', desc: 'Gói dịch vụ & tính năng', icon: Tag }
                              ].map((item, idx) => {
                                const IconComp = item.icon;
                                return (
                                  <div
                                    key={idx}
                                    className="mega-feature-row-tools"
                                    onClick={() => {
                                      if (item.title === 'Khám phá công cụ') {
                                        goToExploreTools();
                                      } else {
                                        showToast(item.title, `Đang mở tính năng ${item.title}...`, 'info');
                                        goToTopdooTools();
                                      }
                                    }}
                                  >
                                    <div className="mega-feat-tools-badge">
                                      <IconComp size={15} color="#EA580C" />
                                    </div>
                                    <div className="mega-feat-tools-text">
                                      <div className="mega-feat-tools-title">{item.title}</div>
                                      <div className="mega-feat-tools-desc">{item.desc}</div>
                                    </div>
                                    <ChevronRight size={14} className="mega-feat-chevron" />
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : hoveredProduct === 'security' ? (
                          <>
                            <div className="mega-col-heading-row">
                              <div className="mega-col-heading-green">Topdoo Security</div>
                              <span
                                onClick={goToTopdooSecurity}
                                className="mega-col-overview-link overview-link-blue"
                                style={{ cursor: 'pointer' }}
                              >
                                <span>Xem tổng quan</span>
                                <ArrowRight size={13} />
                              </span>
                            </div>
                            <div className="mega-col-subheading">Bảo vệ bạn trên không gian số với AI</div>

                            <div className="mega-features-list-security">
                              {[
                                { title: 'Bảo vệ dữ liệu cá nhân', desc: 'Phát hiện và ngăn chặn rò rỉ dữ liệu', icon: ShieldCheck, view: 'data-privacy' },
                                { title: 'Phòng chống tấn công mạng', desc: 'Phát hiện mối đe doạ bằng AI', icon: Lock, view: 'network-defense' },
                                { title: 'Quét mã độc & liên kết nguy hiểm', desc: 'Kiểm tra an toàn trước khi truy cập', icon: Search, view: 'quick-check' },
                                { title: 'Xác thực an toàn', desc: 'Bảo vệ tài khoản đa lớp', icon: UserCheck, view: 'iam' },
                                { title: 'Giám sát hệ thống', desc: 'Theo dõi và cảnh báo 24/7', icon: Cloud, view: 'monitoring' },
                                { title: 'Báo cáo bảo mật', desc: 'Phân tích rủi ro, đề xuất giải pháp', icon: FileText, view: 'reports' },
                                { title: 'Quản lý quyền truy cập', desc: 'Kiểm soát và phân quyền thông minh', icon: Settings, view: 'access-control' },
                                { title: 'Tư vấn bảo mật AI', desc: 'Nhận khuyến nghị bảo mật cá nhân hóa', icon: ShieldCheck, view: 'ai-advisor' }
                              ].map((item, idx) => {
                                const IconComp = item.icon;
                                return (
                                  <div
                                    key={idx}
                                    className="mega-feature-row-security"
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      launchSecurityConsole(item.view || 'overview');
                                    }}
                                  >
                                    <div className="mega-feat-security-badge">
                                      <IconComp size={15} color="#059669" />
                                    </div>
                                    <div className="mega-feat-security-text">
                                      <div className="mega-feat-security-title">{item.title}</div>
                                      <div className="mega-feat-security-desc">{item.desc}</div>
                                    </div>
                                    <ChevronRight size={14} className="mega-feat-chevron" />
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : hoveredProduct === 'developer' ? (
                          <>
                            <div className="mega-col-heading-row">
                              <div className="mega-col-heading-indigo">Topdoo Developer</div>
                              <span
                                onClick={goToTopdooDeveloper}
                                className="mega-col-overview-link overview-link-indigo"
                                style={{ cursor: 'pointer' }}
                              >
                                <span>Xem tổng quan</span>
                                <ArrowRight size={13} />
                              </span>
                            </div>
                            <div className="mega-col-subheading">Nền tảng dành cho nhà phát triển trong kỷ nguyên AI</div>

                            <div className="mega-features-list-developer">
                              {[
                                { title: 'API tích hợp AI', desc: 'Truy cập các mô hình AI mạnh mẽ qua API đơn giản', icon: Code2 },
                                { title: 'SDK & thư viện', desc: 'Bộ công cụ phát triển đa ngôn ngữ (Python, JavaScript, Java,...)', icon: Layers },
                                { title: 'Tài liệu dành cho nhà phát triển', desc: 'Hướng dẫn chi tiết, dễ hiểu, luôn cập nhật', icon: FileText },
                                { title: 'Tích hợp và mở rộng', desc: 'Dễ dàng tích hợp vào sản phẩm và hệ thống của bạn', icon: Puzzle },
                                { title: 'Quản lý API Key', desc: 'Bảo mật, kiểm soát và giám sát sử dụng', icon: Key },
                                { title: 'Sandbox & Playground', desc: 'Thử nghiệm trực tuyến trước khi triển khai', icon: BarChart2 },
                                { title: 'Cộng đồng Developer', desc: 'Kết nối, học hỏi và chia sẻ cùng hàng nghìn nhà phát triển', icon: Users }
                              ].map((item, idx) => {
                                const IconComp = item.icon;
                                return (
                                  <div
                                    key={idx}
                                    className="mega-feature-row-developer"
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      launchSecurityConsole('api-integrations');
                                    }}
                                  >
                                    <div className="mega-feat-developer-badge">
                                      <IconComp size={15} color="#7C3AED" />
                                    </div>
                                    <div className="mega-feat-developer-text">
                                      <div className="mega-feat-developer-title">{item.title}</div>
                                      <div className="mega-feat-developer-desc">{item.desc}</div>
                                    </div>
                                    <ChevronRight size={14} className="mega-feat-chevron" />
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="mega-col-heading">Tính năng nổi bật</div>
                            <div className="mega-features-list">
                              {[
                                { title: 'AI Chat', desc: 'Trò chuyện thông minh, hỗ trợ mọi tác vụ', icon: Zap, color: 'blue', action: goToTopdooAi },
                                { title: 'AI Search', desc: 'Tìm kiếm thông tin với AI', icon: Search, color: 'blue', action: goToTopdooAi },
                                { title: 'Phân tích tài liệu', desc: 'Tóm tắt, phân tích, trích xuất dữ liệu', icon: ClipboardList, color: 'blue', action: goToTopdooAi },
                                { title: 'Tạo hình ảnh', desc: 'Biến ý tưởng thành hình ảnh', icon: ImageIcon, color: 'blue', action: goToTopdooStudio },
                                { title: 'Tạo video', desc: 'Video AI chuyên nghiệp', icon: Video, color: 'blue', action: goToTopdooStudio },
                                { title: 'Kiểm tra bảo mật', desc: 'Phát hiện rủi ro, bảo vệ an toàn', icon: ShieldCheck, color: 'green', action: goToTopdooSecurity },
                                { title: 'API & SDK', desc: 'Tích hợp AI vào sản phẩm của bạn', icon: Code2, color: 'blue', action: () => { setActiveDropdown(null); launchSecurityConsole('api-integrations'); } },
                                { title: 'Học cùng Topdoo', desc: 'Khóa học, hướng dẫn, tài nguyên', icon: GraduationCap, color: 'blue', action: () => { setActiveDropdown(null); navigateMarketing('topdoo-academy'); } }
                              ].map((feat, idx) => {
                                const IconComp = feat.icon;
                                const isGreen = feat.color === 'green';
                                return (
                                  <div
                                    key={idx}
                                    className="mega-feature-row"
                                    onClick={feat.action}
                                  >
                                    <div className={`mega-feat-circle ${isGreen ? 'bg-circle-green' : 'bg-circle-blue'}`}>
                                      <IconComp size={16} />
                                    </div>
                                    <div className="mega-feat-text">
                                      <div className="mega-feat-title">{feat.title}</div>
                                      <div className="mega-feat-desc">{feat.desc}</div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </>
                        )}
                      </div>

                      {/* Column 3: Promo Card */}
                      <div className="mega-col-promo">
                        {hoveredProduct === 'ai' ? (
                          <div className="mega-promo-card-ai-full" onClick={goToTopdooAi} style={{ cursor: 'pointer' }}>
                            <img
                              src="/menuItem-AI.png"
                              alt="Topdoo AI"
                              className="promo-ai-full-bg"
                            />

                            <div className="promo-ai-full-content">
                              <div className="promo-ai-full-pill">
                                <Globe size={13} color="#60A5FA" />
                                <span>TOPDOO AI</span>
                              </div>

                              <h4 className="promo-ai-full-title">
                                Trợ lý AI<br />
                                <span className="text-highlight-cyan">thông minh</span><br />
                                cho mọi công việc
                              </h4>

                              <p className="promo-ai-full-desc">
                                Hỏi. Sáng tạo. Phân tích. Tự động hoá. Topdoo AI luôn đồng hành cùng bạn mọi lúc, mọi nơi.
                              </p>

                              <button
                                className="btn-promo-ai-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToTopdooAi();
                                }}
                              >
                                <span>Dùng thử ngay</span>
                                <ArrowRight size={14} />
                              </button>
                            </div>

                            <div className="promo-ai-hud-label tag-hoi">
                              <MessageSquare size={11} color="#60A5FA" />
                              <span>Hỏi</span>
                            </div>
                            <div className="promo-ai-hud-label tag-sangtao">
                              <ImageIcon size={11} color="#60A5FA" />
                              <span>Sáng tạo</span>
                            </div>
                            <div className="promo-ai-hud-label tag-phantich">
                              <TrendingUp size={11} color="#60A5FA" />
                              <span>Phân tích</span>
                            </div>
                            <div className="promo-ai-hud-label tag-tudonghoa">
                              <Settings size={11} color="#60A5FA" />
                              <span>Tự động hoá</span>
                            </div>

                            <div className="promo-ai-full-slogan">
                              <span>Good Technology</span>
                              <span>A Brighter Tomorrow.</span>
                            </div>
                          </div>
                        ) : hoveredProduct === 'studio' ? (
                          <div
                            className="mega-promo-card-studio-full"
                            onClick={goToTopdooStudio}
                            style={{ cursor: 'pointer' }}
                          >
                            <img
                              src="/menuItem-Studio.png"
                              alt="Topdoo Studio"
                              className="promo-studio-full-bg"
                            />

                            <div className="promo-studio-full-content">
                              <div className="promo-studio-full-pill">
                                <Wand2 size={13} color="#9333EA" />
                                <span>TOPDOO STUDIO</span>
                              </div>

                              <h4 className="promo-studio-full-title">
                                Sáng tạo<br />
                                không giới hạn
                              </h4>

                              <p className="promo-studio-full-desc">
                                Biến ý tưởng thành hiện thực với sức mạnh của AI. Từ văn bản, hình ảnh, video đến âm thanh – tất cả trong một nền tảng.
                              </p>

                              <button
                                className="btn-promo-studio-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToTopdooStudio();
                                }}
                              >
                                <span>Bắt đầu sáng tạo</span>
                                <ArrowRight size={14} />
                              </button>
                            </div>

                            <div className="promo-studio-full-slogan">
                              <span>Create</span>
                              <span>Anything</span>
                              <span>with AI</span>
                            </div>
                          </div>
                        ) : hoveredProduct === 'tools' ? (
                          <div
                            className="mega-promo-card-tools-full"
                            onClick={goToTopdooTools}
                            style={{ cursor: 'pointer' }}
                          >
                            <img
                              src="/menuItem-Tools.png"
                              alt="Topdoo Tools"
                              className="promo-tools-full-bg"
                            />

                            <div className="promo-tools-full-content">
                              <div className="promo-tools-full-pill">
                                <Box size={13} color="#EA580C" />
                                <span>TOPDOO TOOLS</span>
                              </div>

                              <h4 className="promo-tools-full-title">
                                Khám phá<br />
                                <span className="text-highlight-orange">hàng nghìn</span><br />
                                công cụ AI
                              </h4>

                              <p className="promo-tools-full-desc">
                                Tất cả công cụ AI bạn cần — trong một nền tảng. Tìm kiếm, so sánh, lưu trữ và nhận gợi ý thông minh từ Topdoo Tools.
                              </p>

                              <button
                                className="btn-promo-tools-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToExploreTools();
                                }}
                              >
                                <span>Khám phá ngay</span>
                                <ArrowRight size={14} />
                              </button>
                            </div>
                          </div>
                        ) : hoveredProduct === 'security' ? (
                          <div
                            className="mega-promo-card-security-full"
                            onClick={goToTopdooSecurity}
                            style={{ cursor: 'pointer' }}
                          >
                            <img
                              src="/menuItem-Security.png"
                              alt="Topdoo Security"
                              className="promo-security-full-bg"
                            />

                            <div className="promo-security-full-content">
                              <div className="promo-security-full-pill">
                                <Shield size={12} color="#059669" />
                                <span>TOPDOO SECURITY</span>
                              </div>

                              <h4 className="promo-security-full-title">
                                An toàn hơn<br />
                                trong thế giới số
                              </h4>

                              <p className="promo-security-full-desc">
                                Topdoo Security sử dụng AI để phát hiện, ngăn chặn và bảo vệ bạn khỏi các mối đe doạ trực tuyến. Bảo vệ dữ liệu, danh tính và mọi hoạt động số của bạn — để bạn yên tâm sáng tạo và phát triển.
                              </p>

                              <button
                                className="btn-promo-security-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToTopdooSecurity();
                                }}
                              >
                                <span>Bắt đầu bảo vệ ngay</span>
                                <ArrowRight size={14} />
                              </button>
                            </div>
                          </div>
                        ) : hoveredProduct === 'developer' ? (
                          <div
                            className="mega-promo-card-dev-full"
                            onClick={goToTopdooDeveloper}
                            style={{ cursor: 'pointer' }}
                          >
                            <img
                              src="/menuItem-dev.png"
                              alt="Topdoo Developer"
                              className="promo-dev-full-bg"
                            />

                            <div className="promo-dev-full-content">
                              <div className="promo-dev-full-pill">
                                <Code2 size={12} color="#FFFFFF" />
                                <span>TOPDOO DEVELOPER</span>
                              </div>

                              <h4 className="promo-dev-full-title">
                                Xây dựng<br />
                                tương lai cùng AI
                              </h4>

                              <p className="promo-dev-full-desc">
                                API mạnh mẽ, tài liệu đầy đủ, SDK linh hoạt và cộng đồng hỗ trợ – tất cả dành cho nhà phát triển, để bạn xây dựng những ứng dụng thông minh hơn, nhanh hơn và hiệu quả hơn.
                              </p>

                              <button
                                className="btn-promo-dev-full"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToTopdooDeveloper();
                                }}
                              >
                                <span>Bắt đầu xây dựng</span>
                                <ArrowRight size={14} />
                              </button>
                            </div>

                            <div className="promo-dev-full-slogan">
                              <span>Build</span>
                              <span>Without Limits</span>
                            </div>
                          </div>
                        ) : (
                          <div className="mega-promo-card">
                            <img
                              src="/promo-cubes-artwork.png"
                              alt="Topdoo Platform"
                              className="promo-cubes-full-bg"
                            />

                            <div className="promo-default-content">
                              <div className="promo-brand-pill">
                                <img src="/topdoo.jpeg" alt="Logo" className="promo-mini-logo" />
                                <span>TOPDOO</span>
                              </div>

                              <h4 className="promo-headline">
                                Một nền tảng.<br />
                                Mọi khả năng.
                              </h4>

                              <p className="promo-description">
                                Từ sáng tạo nội dung, tự động hoá đến bảo mật và phát triển — Topdoo đồng hành cùng bạn kiến tạo tương lai tốt đẹp hơn.
                              </p>

                              <button
                                className="btn-promo-cta"
                                onClick={() => {
                                  setActiveDropdown(null);
                                  launchSecurityConsole('overview');
                                }}
                              >
                                <span>Dùng thử miễn phí</span>
                                <ArrowRight size={14} />
                              </button>
                            </div>

                            <div className="promo-cubes-slogan">
                              <span>Good Technology</span>
                              <span>A Brighter Tomorrow.</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Bottom Full-width Help Banner */}
                    <div className={`mega-modal-bottom-bar ${
                      hoveredProduct === 'studio'
                        ? 'studio-theme'
                        : hoveredProduct === 'tools'
                        ? 'tools-theme'
                        : hoveredProduct === 'security'
                        ? 'security-theme'
                        : hoveredProduct === 'developer'
                        ? 'developer-theme'
                        : ''
                    }`}>
                      <div className="bottom-bar-left">
                        <div className="bottom-bar-icon">
                          <Users
                            size={18}
                            color={
                              hoveredProduct === 'studio'
                                ? '#7E22CE'
                                : hoveredProduct === 'tools'
                                ? '#EA580C'
                                : hoveredProduct === 'security'
                                ? '#059669'
                                : hoveredProduct === 'developer'
                                ? '#6D28D9'
                                : '#2563EB'
                            }
                          />
                        </div>
                        <div>
                          <div className="bottom-bar-title">
                            {hoveredProduct === 'studio'
                              ? 'Bạn muốn sáng tạo nội dung chuyên nghiệp?'
                              : hoveredProduct === 'tools'
                              ? 'Không biết công cụ nào phù hợp?'
                              : hoveredProduct === 'security'
                              ? 'Bạn cần tư vấn giải pháp bảo mật phù hợp?'
                              : hoveredProduct === 'developer'
                              ? 'Bạn cần tư vấn giải pháp phát triển AI?'
                              : 'Bạn cần trợ giúp?'}
                          </div>
                          <div className="bottom-bar-desc">
                            {hoveredProduct === 'tools'
                              ? 'Để Topdoo gợi ý cho bạn những công cụ AI phù hợp nhất với nhu cầu.'
                              : hoveredProduct === 'security'
                              ? 'Đội ngũ chuyên gia Topdoo luôn sẵn sàng hỗ trợ bạn.'
                              : hoveredProduct === 'developer'
                              ? 'Đội ngũ chuyên gia Topdoo luôn sẵn sàng hỗ trợ bạn.'
                              : 'Đội ngũ Topdoo luôn sẵn sàng tư vấn giải pháp phù hợp với bạn.'}
                          </div>
                        </div>
                      </div>
                      <div className="bottom-bar-actions">
                        {hoveredProduct === 'developer' ? (
                          <button
                            className="btn-bottom-developer-action"
                            onClick={() => {
                              setActiveDropdown(null);
                              navigateMarketing('topdoo-contact');
                            }}
                          >
                            <span>Liên hệ tư vấn</span>
                            <ArrowRight size={14} />
                          </button>
                        ) : hoveredProduct === 'studio' ? (
                          <button
                            className="btn-bottom-studio-action"
                            onClick={() => {
                              setActiveDropdown(null);
                              navigateMarketing('topdoo-contact');
                            }}
                          >
                            <span>Tư vấn ngay</span>
                            <ArrowRight size={14} />
                          </button>
                        ) : hoveredProduct === 'tools' ? (
                          <button
                            className="btn-bottom-tools-action"
                            onClick={() => {
                              setActiveDropdown(null);
                              navigateMarketing('topdoo-tools');
                            }}
                          >
                            <span>Nhận gợi ý ngay</span>
                            <ArrowRight size={14} />
                          </button>
                        ) : hoveredProduct === 'security' ? (
                          <button
                            className="btn-bottom-security-action"
                            onClick={() => {
                              setActiveDropdown(null);
                              navigateMarketing('topdoo-contact');
                            }}
                          >
                            <span>Liên hệ tư vấn</span>
                            <ArrowRight size={14} />
                          </button>
                        ) : (
                          <>
                            <button
                              className="btn-bottom-action"
                              onClick={() => {
                                setActiveDropdown(null);
                                navigateMarketing('topdoo-developer-api-sdk');
                              }}
                            >
                              <BookOpen size={14} />
                              <span>Xem tài liệu</span>
                            </button>
                            <button
                              className="btn-bottom-action"
                              onClick={() => {
                                setActiveDropdown(null);
                                navigateMarketing('topdoo-company');
                              }}
                            >
                              <Video size={14} />
                              <span>Xem video</span>
                            </button>
                            <button
                              className="btn-bottom-action btn-bottom-primary"
                              onClick={() => {
                                setActiveDropdown(null);
                                navigateMarketing('topdoo-contact');
                              }}
                            >
                              <MessageSquare size={14} />
                              <span>Liên hệ tư vấn</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Công cụ Dropdown */}
          <div
            className={`nav-dropdown-trigger ${activeDropdown === 'tools' || marketingRoute === 'topdoo-url-scanner' || marketingRoute === 'url-scanner' || marketingRoute === 'topdoo-tools' || marketingRoute === 'topdoo-explore-tools' ? 'active active-tools-pill' : ''}`}
            onMouseEnter={() => handleMouseEnterDropdown('tools')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <button
              className={`nav-link-btn ${activeDropdown === 'tools' || marketingRoute === 'topdoo-url-scanner' || marketingRoute === 'url-scanner' || marketingRoute === 'topdoo-tools' || marketingRoute === 'topdoo-explore-tools' ? 'active active-tools-pill' : ''}`}
              onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
            >
              <span>Công cụ</span>
              {activeDropdown === 'tools' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {activeDropdown === 'tools' && (
              <>
                <div
                  className="tools-dropdown-backdrop"
                  onClick={() => setActiveDropdown(null)}
                />
                <div
                  className="tools-mega-dropdown"
                  onMouseEnter={() => handleMouseEnterDropdown('tools')}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  {toolsMenuColumns.map((col) => (
                    <div key={col.id} className="tools-col">
                      <div className="tools-col-header">
                        <h4 className="tools-col-title">{col.title}</h4>
                        <p className="tools-col-subtitle">{col.subtitle}</p>
                      </div>
                      <div className="tools-items-list">
                        {col.items.map((item) => {
                          const IconComp = item.icon;
                          return (
                            <div
                              key={item.id}
                              className="tools-menu-item"
                              onClick={() => {
                                setActiveDropdown(null);
                                item.action();
                              }}
                            >
                              <div
                                className="tools-item-icon-box"
                                style={{
                                  backgroundColor: item.iconBg,
                                  color: item.iconColor
                                }}
                              >
                                <IconComp size={18} strokeWidth={2.2} />
                              </div>
                              <div className="tools-item-text">
                                <div className="tools-item-title">{item.title}</div>
                                <div className="tools-item-desc">{item.desc}</div>
                              </div>
                              <div className="tools-item-arrow">
                                <ChevronRight size={14} strokeWidth={2.2} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Bảng giá */}
          <button
            className={`nav-link-btn ${marketingRoute === 'topdoo-pricing' ? 'active-price-pill' : ''}`}
            onClick={() => {
              navigateMarketing('topdoo-pricing');
            }}
          >
            <span>Bảng giá</span>
          </button>

          {/* Khám phá */}
          <div
            className={`nav-dropdown-trigger ${activeDropdown === 'explore' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnterDropdown('explore')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <button
              className={`nav-link-btn ${activeDropdown === 'explore' ? 'active' : ''}`}
              onClick={() => setActiveDropdown(activeDropdown === 'explore' ? null : 'explore')}
            >
              <span>Khám phá</span>
              {activeDropdown === 'explore' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {activeDropdown === 'explore' && (
              <>
                <div
                  className="explore-dropdown-backdrop"
                  onClick={() => setActiveDropdown(null)}
                />
                <div
                  className="explore-mega-dropdown"
                  onMouseEnter={() => handleMouseEnterDropdown('explore')}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <div className="explore-mega-grid">
                    {exploreMenuColumns.map((col) => (
                      <div key={col.id} className="explore-col">
                        <div className="explore-col-header">
                          <h4 className="explore-col-title">{col.title}</h4>
                          <p className="explore-col-subtitle">{col.subtitle}</p>
                        </div>
                        <div className="explore-items-list">
                          {col.items.map((item) => {
                            const IconComp = item.icon;
                            return (
                              <div
                                key={item.id}
                                className="explore-menu-item"
                                onClick={() => {
                                  setActiveDropdown(null);
                                  item.action();
                                }}
                              >
                                <div
                                  className="explore-item-icon-box"
                                  style={{
                                    backgroundColor: item.iconBg,
                                    color: item.iconColor
                                  }}
                                >
                                  <IconComp size={18} strokeWidth={2.2} />
                                </div>
                                <div className="explore-item-text">
                                  <div className="explore-item-title">{item.title}</div>
                                  <div className="explore-item-desc">{item.desc}</div>
                                </div>
                                <div className="explore-item-arrow">
                                  <ChevronRight size={14} strokeWidth={2.2} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {/* Column 4: Promotional Featured Card */}
                    <div className="explore-promo-col">
                      <div className="explore-promo-card">
                        <div className="explore-promo-header">
                          <h4 className="explore-promo-title">
                            Kiến thức hôm nay<br />An toàn hơn ngày mai
                          </h4>
                          <p className="explore-promo-desc">
                            Cùng Topdoo xây dựng cộng đồng số thông minh và an toàn.
                          </p>
                        </div>

                        {/* Graphic illustration: Glowing book & lightbulb */}
                        <div className="explore-promo-graphic">
                          <svg width="170" height="96" viewBox="0 0 170 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <linearGradient id="bookCoverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#2563EB" />
                                <stop offset="100%" stopColor="#1D4ED8" />
                              </linearGradient>
                              <linearGradient id="bookPageGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#FFFFFF" />
                                <stop offset="100%" stopColor="#EFF6FF" />
                              </linearGradient>
                              <linearGradient id="bulbGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#60A5FA" />
                                <stop offset="100%" stopColor="#0284C7" />
                              </linearGradient>
                              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#38BDF8" />
                                <stop offset="100%" stopColor="#2563EB" />
                              </linearGradient>
                              <filter id="bulbGlow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="6" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                              </filter>
                            </defs>
                            
                            {/* Glowing light rays */}
                            <ellipse cx="85" cy="40" rx="36" ry="24" fill="#93C5FD" opacity="0.4" filter="url(#bulbGlow)" />
                            
                            {/* Open Book Base */}
                            <path d="M22 72C40 67 65 67 85 71C105 67 130 67 148 72C144 82 120 83 85 82C50 83 26 82 22 72Z" fill="#1E40AF" opacity="0.4" />
                            {/* Book Cover */}
                            <path d="M25 68C42 63 65 63 85 67C105 63 128 63 145 68L148 71C128 66 105 66 85 70C65 66 42 66 22 71L25 68Z" fill="url(#bookCoverGrad)" />
                            {/* Book Pages Left */}
                            <path d="M26 66C44 61 65 61 84 65L84 46C65 42 44 42 26 47Z" fill="url(#bookPageGrad)" stroke="#BFDBFE" strokeWidth="1" />
                            <line x1="36" y1="52" x2="74" y2="49" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                            <line x1="36" y1="57" x2="68" y2="54" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                            <line x1="36" y1="62" x2="72" y2="59" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                            {/* Book Pages Right */}
                            <path d="M86 65C105 61 126 61 144 66L144 47C126 42 105 42 86 46Z" fill="url(#bookPageGrad)" stroke="#BFDBFE" strokeWidth="1" />
                            <line x1="96" y1="49" x2="134" y2="52" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                            <line x1="96" y1="54" x2="128" y2="57" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                            <line x1="96" y1="59" x2="132" y2="62" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
                            
                            {/* Glowing Idea Lightbulb */}
                            <g transform="translate(71, 14)">
                              <circle cx="14" cy="14" r="13" fill="url(#bulbGrad)" filter="url(#bulbGlow)" opacity="0.8" />
                              <circle cx="14" cy="14" r="10" fill="#60A5FA" />
                              <path d="M10 22H18M11 25H17" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                              <path d="M14 9V6M8 10L6 8M20 10L22 8M8 18L6 20M20 18L22 20" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
                              <circle cx="14" cy="14" r="5" fill="#FFFFFF" opacity="0.9" />
                            </g>
                            
                            {/* Floating Security Shield on Right */}
                            <g transform="translate(122, 22)">
                              <path d="M12 2L2 6V13C2 19 6.5 24 12 26C17.5 24 22 19 22 13V6L12 2Z" fill="url(#shieldGrad)" />
                              <path d="M8 14L11 17L16 11" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            
                            {/* Floating Sparkles on Left */}
                            <path d="M16 30L17.5 34L21.5 35.5L17.5 37L16 41L14.5 37L10.5 35.5L14.5 34L16 30Z" fill="#38BDF8" opacity="0.85" />
                          </svg>
                        </div>

                        <button
                          className="btn-explore-promo"
                          onClick={() => {
                            setActiveDropdown(null);
                            navigateMarketing('topdoo-explore');
                          }}
                        >
                          <span>Khám phá ngay</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Business */}
          <div
            className={`nav-dropdown-trigger ${activeDropdown === 'business' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnterDropdown('business')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <button
              className={`nav-link-btn ${marketingRoute === 'topdoo-business' || marketingRoute === 'topdoo-solutions' ? 'active-business-pill' : ''} ${activeDropdown === 'business' ? 'active' : ''}`}
              onClick={() => {
                setActiveDropdown(activeDropdown === 'business' ? null : 'business');
              }}
            >
              <span>Business</span>
              {activeDropdown === 'business' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {activeDropdown === 'business' && (
              <>
                <div
                  className="business-dropdown-backdrop"
                  onClick={() => setActiveDropdown(null)}
                />
                <div
                  className="business-mega-dropdown"
                  onMouseEnter={() => handleMouseEnterDropdown('business')}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <div className="business-mega-grid">
                    {/* Left: Business items */}
                    <div className="business-items-col">
                      <div
                        className="business-menu-item"
                        onClick={() => {
                          setActiveDropdown(null);
                          navigateMarketing('topdoo-solutions');
                        }}
                      >
                        <div className="business-item-icon biz-blue">
                          <Sparkles size={22} />
                        </div>
                        <div className="business-item-text">
                          <div className="business-item-title">Xem các giải pháp AI</div>
                          <div className="business-item-desc">
                            Giải pháp AI toàn diện thiết kế theo quy mô và từng ngành nghề
                          </div>
                        </div>
                        <ChevronRight size={16} className="business-item-arrow" />
                      </div>

                      <div
                        className="business-menu-item"
                        onClick={() => {
                          setActiveDropdown(null);
                          navigateMarketing('topdoo-business');
                        }}
                      >
                        <div className="business-item-icon biz-slate">
                          <Building2 size={22} />
                        </div>
                        <div className="business-item-text">
                          <div className="business-item-title">Topdoo Business Hub</div>
                          <div className="business-item-desc">
                            Tổng quan giải pháp, năng lực triển khai & chuyển đổi số
                          </div>
                        </div>
                        <ChevronRight size={16} className="business-item-arrow" />
                      </div>

                      <div
                        className="business-menu-item"
                        onClick={() => {
                          setActiveDropdown(null);
                          navigateMarketing('topdoo-contact');
                        }}
                      >
                        <div className="business-item-icon biz-indigo">
                          <Users size={22} />
                        </div>
                        <div className="business-item-text">
                          <div className="business-item-title">Liên hệ tư vấn doanh nghiệp</div>
                          <div className="business-item-desc">
                            Tư vấn 1:1 cùng chuyên gia giải pháp công nghệ Topdoo
                          </div>
                        </div>
                        <ChevronRight size={16} className="business-item-arrow" />
                      </div>
                    </div>

                    {/* Right: Promo card */}
                    <div className="business-promo-card">
                      <div className="business-promo-content">
                        <div className="business-promo-badge">Dành cho doanh nghiệp</div>
                        <div className="business-promo-heading">
                          Giải pháp AI<br />toàn diện
                        </div>
                        <div className="business-promo-desc">
                          Tăng tốc vận hành và chuyển đổi số cùng Topdoo
                        </div>
                        <button
                          className="business-promo-btn"
                          onClick={() => {
                            setActiveDropdown(null);
                            navigateMarketing('topdoo-solutions');
                          }}
                        >
                          Tìm hiểu ngay
                          <ChevronRight size={15} />
                        </button>
                      </div>
                      <img
                        src="/bannerBusiness.png"
                        alt="Giải pháp AI doanh nghiệp"
                        className="business-promo-image"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Company */}
          <div
            className={`nav-dropdown-trigger ${activeDropdown === 'company' || marketingRoute === 'topdoo-company' ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnterDropdown('company')}
            onMouseLeave={handleMouseLeaveDropdown}
          >
            <button
              className={`nav-link-btn ${activeDropdown === 'company' || marketingRoute === 'topdoo-company' ? 'active-company-pill' : ''} ${activeDropdown === 'company' ? 'active' : ''}`}
              onClick={() => {
                setActiveDropdown(activeDropdown === 'company' ? null : 'company');
              }}
            >
              <span>Company</span>
              {activeDropdown === 'company' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {activeDropdown === 'company' && (
              <>
                <div
                  className="company-dropdown-backdrop"
                  onClick={() => setActiveDropdown(null)}
                />
                <div
                  className="company-mega-dropdown"
                  onMouseEnter={() => handleMouseEnterDropdown('company')}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <div className="company-mega-grid">
                    {/* Content Columns: Về Topdoo & Đối tác & Hợp tác */}
                    {companyMenuColumns.map((col) => (
                      <div key={col.id} className="company-col">
                        <div className="company-col-header">
                          <h4 className="company-col-title">{col.title}</h4>
                          <p className="company-col-subtitle">{col.subtitle}</p>
                        </div>
                        <div className="company-items-list">
                          {col.items.map((item) => {
                            const IconComp = item.icon;
                            return (
                              <div
                                key={item.id}
                                className="company-menu-item"
                                onClick={() => {
                                  setActiveDropdown(null);
                                  item.action();
                                }}
                              >
                                <div
                                  className="company-item-icon-box"
                                  style={{
                                    backgroundColor: item.iconBg,
                                    color: item.iconColor
                                  }}
                                >
                                  <IconComp size={18} strokeWidth={2.2} />
                                </div>
                                <div className="company-item-text">
                                  <div className="company-item-title">{item.title}</div>
                                  <div className="company-item-desc">{item.desc}</div>
                                </div>
                                <div className="company-item-arrow">
                                  <ChevronRight size={14} strokeWidth={2.2} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {/* Column 3: Promotional Featured Card */}
                    <div className="company-promo-col">
                      <div className="company-promo-card">
                        <div className="company-promo-header">
                          <h4 className="company-promo-title">
                            Cùng chung tay<br />vì một Internet an toàn hơn
                          </h4>
                          <p className="company-promo-desc">
                            Topdoo hợp tác với các tổ chức, doanh nghiệp và cộng đồng trên toàn cầu để xây dựng không gian số an toàn.
                          </p>
                        </div>

                        {/* Graphic illustration: 3D Earth Globe with Shield & Network Orbit */}
                        <div className="company-promo-graphic">
                          <svg width="190" height="110" viewBox="0 0 190 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                              <radialGradient id="globeAura" cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.45" />
                                <stop offset="70%" stopColor="#38BDF8" stopOpacity="0.15" />
                                <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
                              </radialGradient>
                              <linearGradient id="globeGrad" x1="20%" y1="15%" x2="85%" y2="85%">
                                <stop offset="0%" stopColor="#7DD3FC" />
                                <stop offset="35%" stopColor="#38BDF8" />
                                <stop offset="70%" stopColor="#2563EB" />
                                <stop offset="100%" stopColor="#1E3A8A" />
                              </linearGradient>
                              <linearGradient id="companyShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#38BDF8" />
                                <stop offset="50%" stopColor="#2563EB" />
                                <stop offset="100%" stopColor="#1D4ED8" />
                              </linearGradient>
                              <linearGradient id="orbitGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2" />
                                <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
                              </linearGradient>
                              <filter id="companyGlowFilter" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                              </filter>
                            </defs>

                            {/* Soft Background Aura */}
                            <ellipse cx="95" cy="55" rx="55" ry="42" fill="url(#globeAura)" />

                            {/* Orbit Ring (Back Half) */}
                            <path d="M28 56C30 42 60 32 95 32C130 32 160 42 162 56" stroke="url(#orbitGrad)" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />

                            {/* 3D Earth Globe Sphere */}
                            <g transform="translate(95, 55)">
                              {/* Shadow behind globe */}
                              <ellipse cx="0" cy="36" rx="30" ry="6" fill="#1E3A8A" opacity="0.15" />
                              
                              {/* Main Sphere */}
                              <circle cx="0" cy="0" r="34" fill="url(#globeGrad)" />
                              
                              {/* Globe Atmosphere Ring */}
                              <circle cx="0" cy="0" r="34" stroke="#BAE6FD" strokeWidth="1.2" opacity="0.6" />

                              {/* Latitude / Longitude Grid lines */}
                              <ellipse cx="0" cy="0" rx="34" ry="12" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.3" fill="none" />
                              <ellipse cx="0" cy="0" rx="14" ry="34" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.3" fill="none" />
                              <line x1="-34" y1="0" x2="34" y2="0" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.35" />
                              <line x1="0" y1="-34" x2="0" y2="34" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.35" />

                              {/* Stylized Continents on globe */}
                              <path d="M-18 -18C-12 -22 -6 -18 -8 -10C-10 -2 -14 6 -10 16C-6 22 -12 26 -16 22C-22 16 -24 -2 -18 -18Z" fill="#FFFFFF" opacity="0.32" />
                              <path d="M4 -22C12 -24 22 -16 20 -8C18 -2 24 6 18 14C12 20 8 16 6 8C4 0 2 -12 4 -22Z" fill="#FFFFFF" opacity="0.32" />

                              {/* Highlight shine on top-left of sphere */}
                              <ellipse cx="-12" cy="-14" rx="12" ry="7" fill="#FFFFFF" opacity="0.25" transform="rotate(-30, -12, -14)" />
                            </g>

                            {/* Orbit Ring (Front Half) */}
                            <path d="M28 56C30 70 60 80 95 80C130 80 160 70 162 56" stroke="url(#orbitGrad)" strokeWidth="1.8" />

                            {/* Floating Network Node 1: Left Node with Avatar */}
                            <g transform="translate(34, 42)">
                              <circle cx="9" cy="9" r="11" fill="#FFFFFF" filter="url(#companyGlowFilter)" opacity="0.95" />
                              <circle cx="9" cy="9" r="9" fill="#EFF6FF" stroke="#38BDF8" strokeWidth="1.5" />
                              <circle cx="9" cy="7" r="3" fill="#0084FF" />
                              <path d="M4.5 13.5C4.5 11.2 6.5 10 9 10C11.5 10 13.5 11.2 13.5 13.5" stroke="#0084FF" strokeWidth="1.2" strokeLinecap="round" />
                            </g>

                            {/* Floating Network Node 2: Right Node with Avatar */}
                            <g transform="translate(144, 38)">
                              <circle cx="9" cy="9" r="11" fill="#FFFFFF" filter="url(#companyGlowFilter)" opacity="0.95" />
                              <circle cx="9" cy="9" r="9" fill="#EFF6FF" stroke="#38BDF8" strokeWidth="1.5" />
                              <circle cx="9" cy="7" r="3" fill="#0084FF" />
                              <path d="M4.5 13.5C4.5 11.2 6.5 10 9 10C11.5 10 13.5 11.2 13.5 13.5" stroke="#0084FF" strokeWidth="1.2" strokeLinecap="round" />
                            </g>

                            {/* Floating Node 3: Tiny glowing connector dots */}
                            <circle cx="26" cy="62" r="3" fill="#38BDF8" filter="url(#companyGlowFilter)" />
                            <circle cx="166" cy="65" r="3" fill="#38BDF8" filter="url(#companyGlowFilter)" />
                            <circle cx="68" cy="78" r="2.5" fill="#60A5FA" />
                            <circle cx="122" cy="78" r="2.5" fill="#60A5FA" />

                            {/* Metallic Foreground 3D Shield */}
                            <g transform="translate(95, 48)">
                              <path d="M0 -18L15 -11V3C15 12 8 18 0 21C-8 18 -15 12 -15 3V-11L0 -18Z" fill="#0084FF" opacity="0.2" filter="url(#companyGlowFilter)" />
                              <path d="M0 -17L14 -10V2.5C14 11 7.5 16.5 0 19.5C-7.5 16.5 -14 11 -14 2.5V-10L0 -17Z" fill="url(#companyShieldGrad)" stroke="#FFFFFF" strokeWidth="1.6" />
                              <path d="M0 -14L10 -9V2C10 8 5.5 13 0 15.5C-5.5 13 -10 8 -10 2V-9L0 -14Z" fill="#1D4ED8" opacity="0.45" />
                              <path d="M-4.5 1L-1 4.5L5.5 -2.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                          </svg>
                        </div>

                        <button
                          className="btn-company-promo"
                          onClick={() => {
                            setActiveDropdown(null);
                            navigateMarketing('topdoo-contact');
                          }}
                        >
                          <span>Hợp tác cùng Topdoo</span>
                          <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Right Header Actions */}
        <div className="landing-header-actions">
          {marketingRoute === 'topdoo-url-scanner' || marketingRoute === 'url-scanner' ? (
            <>
              {/* Search Pill Bar */}
              <div
                className="header-search-pill-bar"
                onClick={() => setIsSearchOpen(true)}
                title="Tìm kiếm thông minh (⌘K)"
              >
                <Search size={14} className="search-pill-icon" />
                <span className="search-pill-text">Tìm kiếm tài liệu, API, công cụ, ...</span>
                <span className="search-pill-shortcut">⌘ K</span>
              </div>

              {/* Notification Bell */}
              <button
                className="btn-header-bell"
                onClick={() => showToast('Bạn có 1 thông báo an ninh mới từ cộng đồng Topdoo', 'info')}
                title="Thông báo an ninh"
              >
                <Bell size={18} />
                <span className="bell-badge-count">1</span>
              </button>

              {/* 9-Dot Launcher Grid Button */}
              <button
                className="btn-header-launcher-grid"
                onClick={() => showToast('Trung tâm công cụ Topdoo', 'Mở danh mục ứng dụng nhanh', 'info')}
                title="Ứng dụng Topdoo"
              >
                <LayoutGrid size={18} />
              </button>

              {/* Profile Avatar Badge */}
              <div
                className="header-user-profile-badge"
                onClick={() => navigateMarketing('topdoo-developer-dashboard')}
                title="Tài khoản Developer"
              >
                <img
                  src="/developer_avatar.jpg"
                  alt="Nguyễn Văn A"
                  className="user-badge-avatar"
                />
                <div className="user-badge-text">
                  <span className="user-badge-name">Nguyễn Văn A</span>
                  <span className="user-badge-role">
                    <span>Developer</span>
                    <ChevronDown size={11} />
                  </span>
                </div>
              </div>

              {/* Mobile Hamburger Menu Toggle Button */}
              <button
                type="button"
                className="btn-mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
                title="Menu điều hướng di động"
              >
                {isMobileMenuOpen ? <X size={20} color="#0F172A" /> : <Menu size={20} color="#0F172A" />}
              </button>
            </>
          ) : (
            <>
              <button
                className="btn-search-trigger"
                onClick={() => setIsSearchOpen(true)}
                title="Tìm kiếm thông minh (⌘K)"
              >
                <Search size={18} />
              </button>

              <button
                className="btn-header-bell"
                onClick={() => showToast('Thông báo an ninh', 'Hệ thống đang hoạt động an toàn.', 'info')}
                title="Thông báo"
              >
                <Bell size={18} />
                <span className="bell-badge-dot" />
              </button>

              <div
                className="landing-lang-switcher"
                onClick={() => showToast('Đang chọn ngôn ngữ hiển thị: Tiếng Việt (VI)', 'info')}
                title="Chọn ngôn ngữ"
              >
                <Globe size={15} />
                <span>VI</span>
                <ChevronDown size={12} />
              </div>

              {/* AI Credits Badge - ONLY SHOWN WHEN LOGGED IN TO KEEP NAVBAR CLEAN */}
              {user && (
                <div
                  onClick={() => openCreditModal && openCreditModal()}
                  className="header-credit-badge desktop-only-credit"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '5px 12px',
                    borderRadius: 20,
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    color: '#D97706',
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: 'pointer',
                    userSelect: 'none',
                    transition: 'all 0.2s'
                  }}
                  title="Số dư AI Credits (Bấm để nạp thêm & quản lý)"
                >
                  <span>🪙</span>
                  <span>{creditBalance !== undefined ? creditBalance.toLocaleString() : '0'} cr</span>
                </div>
              )}

              {user ? (
                /* Logged In User Avatar Badge & Dropdown */
                <div style={{ position: 'relative' }}>
                  <div
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '4px 10px 4px 6px',
                      borderRadius: 24,
                      border: '1.5px solid #E2E8F0',
                      background: '#FFFFFF',
                      cursor: 'pointer',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease'
                    }}
                    title="Menu tài khoản"
                  >
                    <img
                      src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                      alt={user.fullName || user.email}
                      style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', maxWidth: 110, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {user.fullName || user.email}
                      </span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: '#2563EB', textTransform: 'capitalize' }}>
                        {user.role || userRole || 'Thành viên'}
                      </span>
                    </div>
                    <ChevronDown size={12} color="#64748B" />
                  </div>

                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: 'calc(100% + 8px)',
                        width: 230,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 12,
                        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)',
                        border: '1px solid #E2E8F0',
                        padding: '8px 0',
                        zIndex: 9999
                      }}
                    >
                      <div style={{ padding: '8px 16px', borderBottom: '1px solid #F1F5F9' }}>
                        <div style={{ fontSize: 11, color: '#64748B' }}>Đã đăng nhập bằng</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#0F172A', wordBreak: 'break-all' }}>
                          {user.email}
                        </div>
                      </div>

                      {/* Quản lý Credits Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          if (openCreditModal) openCreditModal();
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          border: 'none',
                          background: 'none',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#D97706',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          borderBottom: '1px solid #F8FAFC'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <Coins size={14} color="#D97706" />
                          <span>AI Credits</span>
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, background: 'rgba(245, 158, 11, 0.15)', padding: '2px 8px', borderRadius: 10 }}>
                          {creditBalance !== undefined ? creditBalance.toLocaleString() : '0'} cr
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          setMode('app');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          border: 'none',
                          background: 'none',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#1E293B',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8
                        }}
                      >
                        <Shield size={14} color="#2563EB" />
                        <span>Vào Console An Ninh</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          navigateMarketing('topdoo-developer-dashboard');
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          border: 'none',
                          background: 'none',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#1E293B',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8
                        }}
                      >
                        <Code2 size={14} color="#7C3AED" />
                        <span>Developer Dashboard</span>
                      </button>

                      <div style={{ height: 1, backgroundColor: '#F1F5F9', margin: '4px 0' }} />

                      <button
                        type="button"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          signOut();
                        }}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          border: 'none',
                          background: 'none',
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#EF4444',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8
                        }}
                      >
                        <UserCheck size={14} color="#EF4444" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    className="btn-auth-login desktop-auth-btn"
                    onClick={() => openAuthModal('login')}
                  >
                    <span>Đăng nhập</span>
                  </button>

                  <button
                    className="btn-auth-signup desktop-auth-btn"
                    onClick={() => openAuthModal('trial')}
                  >
                    <span>Dùng thử miễn phí</span>
                  </button>
                </>
              )}

              {/* Mobile Hamburger Menu Toggle Button */}
              <button
                type="button"
                className="btn-mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
                title="Menu điều hướng di động"
              >
                {isMobileMenuOpen ? <X size={22} color="#0F172A" /> : <Menu size={22} color="#0F172A" />}
              </button>
            </>
          )}
        </div>
      </div>
    </header>

      {/* =========================================================================
          MOBILE NAVIGATION DRAWER OVERLAY
          ========================================================================= */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="mobile-nav-drawer-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Header */}
            <div className="mobile-drawer-header">
              <div
                className="landing-logo"
                onClick={() => handleMobileNav('home')}
                style={{ cursor: 'pointer' }}
              >
                <img src="/topdoo.jpeg" alt="TOPDOO Logo" className="landing-logo-img" />
                <span className="landing-logo-text">TOPDOO</span>
              </div>
              <button
                className="btn-mobile-drawer-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Đóng menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body Scrollable */}
            <div className="mobile-drawer-body">
              {/* User Account / Auth Card */}
              {user ? (
                <div className="mobile-user-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <img
                      src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80'}
                      alt={user.fullName || user.email}
                      style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {user.fullName || user.email}
                      </div>
                      <div style={{ fontSize: 11, color: '#2563EB', fontWeight: 600 }}>
                        {user.role || userRole || 'Thành viên'}
                      </div>
                    </div>
                  </div>

                  {/* Credit Balance in Drawer */}
                  <div
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (openCreditModal) openCreditModal();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)',
                      border: '1px solid rgba(245, 158, 11, 0.3)',
                      borderRadius: 14,
                      cursor: 'pointer',
                      marginBottom: 10
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span>🪙</span>
                      <div>
                        <div style={{ fontSize: 11, color: '#92400E', fontWeight: 600 }}>Số dư AI Credits</div>
                        <div style={{ fontSize: 15, fontWeight: 800, color: '#B45309' }}>
                          {creditBalance !== undefined ? creditBalance.toLocaleString() : '0'} cr
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: '#2563EB', background: '#FFFFFF', padding: '4px 10px', borderRadius: 8, boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
                      Nạp thêm +
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        setMode('app');
                      }}
                      className="btn-mobile-action-sub"
                    >
                      <Shield size={13} color="#2563EB" />
                      <span>Console App</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        signOut();
                      }}
                      className="btn-mobile-action-sub"
                      style={{ color: '#EF4444' }}
                    >
                      <LogOut size={13} />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mobile-auth-cta-box">
                  <div style={{ fontSize: 13, color: '#64748B', marginBottom: 12 }}>
                    Trải nghiệm bộ công cụ AI toàn diện với tài khoản Topdoo
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <button
                      className="btn-mobile-login"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAuthModal('login');
                      }}
                    >
                      Đăng nhập
                    </button>
                    <button
                      className="btn-mobile-trial"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        openAuthModal('trial');
                      }}
                    >
                      Dùng thử
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Search Button in Drawer */}
              <div
                className="mobile-search-pill"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
              >
                <Search size={16} color="#64748B" />
                <span>Tìm kiếm công cụ, API, tài liệu...</span>
              </div>

              {/* Menu Categories Accordion */}
              <div className="mobile-nav-sections-list">
                {/* 1. Sản phẩm (Products) */}
                <div className="mobile-nav-group">
                  <div
                    className="mobile-nav-group-title"
                    onClick={() => setMobileExpandedSection(mobileExpandedSection === 'products' ? null : 'products')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Box size={16} color="#2563EB" />
                      <span>Sản phẩm</span>
                    </div>
                    {mobileExpandedSection === 'products' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>

                  {mobileExpandedSection === 'products' && (
                    <div className="mobile-nav-sub-list">
                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-ai')}>
                        <Bot size={15} color="#2563EB" />
                        <div>
                          <div className="nav-item-name">Topdoo AI</div>
                          <div className="nav-item-desc">Trợ lý và mô hình đa phương thức</div>
                        </div>
                      </div>

                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-studio')}>
                        <Wand2 size={15} color="#7C3AED" />
                        <div>
                          <div className="nav-item-name">Topdoo Studio</div>
                          <div className="nav-item-desc">Sáng tạo nội dung, âm thanh, video AI</div>
                        </div>
                      </div>

                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-tools')}>
                        <Zap size={15} color="#F59E0B" />
                        <div>
                          <div className="nav-item-name">Topdoo Tools</div>
                          <div className="nav-item-desc">Bộ công cụ tiện ích AI đa năng</div>
                        </div>
                      </div>

                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-security')}>
                        <Shield size={15} color="#10B981" />
                        <div>
                          <div className="nav-item-name">Topdoo Security</div>
                          <div className="nav-item-desc">Trung tâm an toàn & rủi ro số</div>
                        </div>
                      </div>

                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-developer')}>
                        <Code2 size={15} color="#6366F1" />
                        <div>
                          <div className="nav-item-name">Topdoo Developer</div>
                          <div className="nav-item-desc">API, SDK & Developer Console</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Công cụ (Tools) */}
                <div className="mobile-nav-group">
                  <div
                    className="mobile-nav-group-title"
                    onClick={() => setMobileExpandedSection(mobileExpandedSection === 'tools' ? null : 'tools')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Zap size={16} color="#F59E0B" />
                      <span>Công cụ</span>
                    </div>
                    {mobileExpandedSection === 'tools' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>

                  {mobileExpandedSection === 'tools' && (
                    <div className="mobile-nav-sub-list">
                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-explore-tools')}>
                        <LayoutGrid size={15} color="#0284C7" />
                        <div>
                          <div className="nav-item-name">Khám phá tất cả công cụ</div>
                          <div className="nav-item-desc">Thư viện công cụ AI thông minh</div>
                        </div>
                      </div>

                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-url-scanner')}>
                        <ShieldCheck size={15} color="#10B981" />
                        <div>
                          <div className="nav-item-name">Quét URL & Website</div>
                          <div className="nav-item-desc">Kiểm tra lừa đảo và mã độc</div>
                        </div>
                      </div>

                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-plan-security')}>
                        <Lock size={15} color="#8B5CF6" />
                        <div>
                          <div className="nav-item-name">Gói bảo vệ an ninh số</div>
                          <div className="nav-item-desc">Bảo vệ cá nhân và gia đình</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Bảng giá Direct Link */}
                <div
                  className="mobile-nav-direct-link"
                  onClick={() => handleMobileNav('topdoo-pricing')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Tag size={16} color="#10B981" />
                    <span style={{ fontWeight: 700 }}>Bảng giá</span>
                  </div>
                  <ChevronRight size={16} color="#94A3B8" />
                </div>

                {/* 4. Khám phá (Explore) */}
                <div className="mobile-nav-group">
                  <div
                    className="mobile-nav-group-title"
                    onClick={() => setMobileExpandedSection(mobileExpandedSection === 'explore' ? null : 'explore')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Compass size={16} color="#8B5CF6" />
                      <span>Khám phá</span>
                    </div>
                    {mobileExpandedSection === 'explore' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>

                  {mobileExpandedSection === 'explore' && (
                    <div className="mobile-nav-sub-list">
                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-academy')}>
                        <GraduationCap size={15} color="#8B5CF6" />
                        <div>
                          <div className="nav-item-name">Topdoo Academy</div>
                          <div className="nav-item-desc">Học viện kỹ năng & an toàn số</div>
                        </div>
                      </div>

                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-community')}>
                        <Users size={15} color="#3B82F6" />
                        <div>
                          <div className="nav-item-name">Cộng đồng Topdoo</div>
                          <div className="nav-item-desc">Diễn đàn trao đổi & chia sẻ</div>
                        </div>
                      </div>

                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-solutions')}>
                        <Layers size={15} color="#0284C7" />
                        <div>
                          <div className="nav-item-name">Giải pháp tổng thể</div>
                          <div className="nav-item-desc">Bộ giải pháp chuyên sâu</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 5. Doanh nghiệp (Business) Direct Link */}
                <div
                  className="mobile-nav-direct-link"
                  onClick={() => handleMobileNav('topdoo-business')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Building2 size={16} color="#2563EB" />
                    <span style={{ fontWeight: 700 }}>Business</span>
                  </div>
                  <ChevronRight size={16} color="#94A3B8" />
                </div>

                {/* 6. Về Topdoo (Company) */}
                <div className="mobile-nav-group">
                  <div
                    className="mobile-nav-group-title"
                    onClick={() => setMobileExpandedSection(mobileExpandedSection === 'company' ? null : 'company')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Building size={16} color="#64748B" />
                      <span>Company</span>
                    </div>
                    {mobileExpandedSection === 'company' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>

                  {mobileExpandedSection === 'company' && (
                    <div className="mobile-nav-sub-list">
                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-company')}>
                        <Building size={15} color="#2563EB" />
                        <div>
                          <div className="nav-item-name">Về Topdoo</div>
                          <div className="nav-item-desc">Tầm nhìn, sứ mệnh & câu chuyện</div>
                        </div>
                      </div>

                      <div className="mobile-nav-item" onClick={() => handleMobileNav('topdoo-contact')}>
                        <Mail size={15} color="#10B981" />
                        <div>
                          <div className="nav-item-name">Liên hệ hỗ trợ</div>
                          <div className="nav-item-desc">Đội ngũ kỹ thuật 24/7</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="mobile-drawer-footer">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: '#64748B' }}>
                <span>Ngôn ngữ: Tiếng Việt (VI)</span>
                <span>Hotline: 1900 8888</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
