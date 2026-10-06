import React, { useState } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Globe,
  Search,
  Link2,
  Mail,
  Share2,
  Star,
  Activity,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Settings,
  LogOut,
  ArrowRight,
  Bell,
  Crown,
  LayoutGrid,
  Bot,
  Rocket,
  Wrench,
  Code2,
  Tag,
  Compass,
  Briefcase,
  Building2,
  HelpCircle,
  User,
  ExternalLink,
  AlertTriangle,
  Monitor,
  Play,
  FileText,
  Lock,
  Layers,
  Sparkles,
  Check,
  RotateCw,
  MessageSquare,
  Flag
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';

export function TopdooUrlScannerView() {
  const { navigateMarketing, setMode, setCurrentView, showToast, openAuthModal, setIsSearchOpen } = useSecurity();

  // Active top-level step tab: 'url-scanner', 'phishing', 'network', 'watchlist', 'monitoring'
  const [activeTab, setActiveTab] = useState('url-scanner');

  // Scanner sub-mode: 'single' vs 'batch'
  const [scanMode, setScanMode] = useState('single');

  // Default scanned payload matching reference screenshot
  const defaultThreatResult = {
    target: 'https://gift-vn.online',
    domain: 'gift-vn.online',
    type: 'Website giả mạo',
    country: 'Việt Nam (nghi ngờ)',
    createdDate: '10/04/2025 (mới)',
    lastUpdated: '24/04/2025, 10:24',
    status: 'Không an toàn',
    isSafe: false,
    threatLevel: 'Nguy cơ lừa đảo rất cao',
    score: 92,
    threatDescription: 'Trang web này đã được xác định là lừa đảo, giả mạo thương hiệu để chiếm đoạt thông tin cá nhân và tài sản.',
    metrics: [
      { id: 'domain', icon: Shield, label: 'Uy tín tên miền', score: 95, barColor: '#EF4444' },
      { id: 'content', icon: MessageSquare, label: 'Nội dung & lời mời chào', score: 88, barColor: '#EF4444' },
      { id: 'behavior', icon: Settings, label: 'Hành vi & kỹ thuật', score: 90, barColor: '#EF4444' },
      { id: 'network', icon: Share2, label: 'Mạng lưới liên quan', score: 80, barColor: '#F87171' },
      { id: 'ai', icon: Bot, label: 'Kết quả AI tổng hợp', score: 92, barColor: '#EF4444' }
    ],
    detectionSigns: [
      'Giả mạo thương hiệu Topdoo/Gift',
      'Yêu cầu cung cấp thông tin cá nhân, tài khoản ngân hàng',
      'Sử dụng tên miền mới, ẩn danh thông tin đăng ký',
      'Nội dung, hình ảnh có dấu hiệu sao chép',
      'Đã xuất hiện trong nhiều báo cáo lừa đảo'
    ],
    recommendations: [
      'Không truy cập website này',
      'Không nhập bất kỳ thông tin cá nhân nào',
      'Cảnh báo người thân, bạn bè',
      'Báo cáo lừa đảo cho Topdoo',
      'Kiểm tra các liên kết khác trước khi truy cập'
    ]
  };

  // Input states (default to running scan state as requested)
  const [inputUrl, setInputUrl] = useState('https://gift-vn.online');
  const [batchUrls, setBatchUrls] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(defaultThreatResult);

  // Sidebar expanded sections
  const [toolsExpanded, setToolsExpanded] = useState(true);
  const [productsExpanded, setProductsExpanded] = useState(false);

  // Handle single scan execution
  const handleExecuteScan = (e) => {
    if (e) e.preventDefault();
    const target = inputUrl.trim();
    if (!target) {
      showToast('Vui lòng nhập URL hoặc tên miền cần kiểm tra', 'warning');
      return;
    }

    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      const isKnownScam = target.includes('gift-vn') || target.includes('scam') || target.includes('bit.ly') || target.includes('online');
      const cleanDomain = target.replace(/^https?:\/\//i, '').split('/')[0];
      const nowStr = new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
      
      if (isKnownScam) {
        setScanResult({
          target,
          domain: cleanDomain,
          type: 'Website giả mạo',
          country: 'Việt Nam (nghi ngờ)',
          createdDate: '10/04/2025 (mới)',
          lastUpdated: nowStr,
          status: 'Không an toàn',
          isSafe: false,
          threatLevel: 'Nguy cơ lừa đảo rất cao',
          score: 92,
          threatDescription: 'Trang web này đã được xác định là lừa đảo, giả mạo thương hiệu để chiếm đoạt thông tin cá nhân và tài sản.',
          metrics: [
            { id: 'domain', icon: Shield, label: 'Uy tín tên miền', score: 95, barColor: '#EF4444' },
            { id: 'content', icon: MessageSquare, label: 'Nội dung & lời mời chào', score: 88, barColor: '#EF4444' },
            { id: 'behavior', icon: Settings, label: 'Hành vi & kỹ thuật', score: 90, barColor: '#EF4444' },
            { id: 'network', icon: Share2, label: 'Mạng lưới liên quan', score: 80, barColor: '#F87171' },
            { id: 'ai', icon: Bot, label: 'Kết quả AI tổng hợp', score: 92, barColor: '#EF4444' }
          ],
          detectionSigns: [
            'Giả mạo thương hiệu Topdoo/Gift',
            'Yêu cầu cung cấp thông tin cá nhân, tài khoản ngân hàng',
            'Sử dụng tên miền mới, ẩn danh thông tin đăng ký',
            'Nội dung, hình ảnh có dấu hiệu sao chép',
            'Đã xuất hiện trong nhiều báo cáo lừa đảo'
          ],
          recommendations: [
            'Không truy cập website này',
            'Không nhập bất kỳ thông tin cá nhân nào',
            'Cảnh báo người thân, bạn bè',
            'Báo cáo lừa đảo cho Topdoo',
            'Kiểm tra các liên kết khác trước khi truy cập'
          ]
        });
        showToast('Cảnh báo nguy cơ cao!', `Đường link ${target} có 92/100 điểm rủi ro lừa đảo.`, 'critical');
      } else {
        setScanResult({
          target,
          domain: cleanDomain,
          type: 'Website thông thường',
          country: 'Hoa Kỳ (Cloudflare)',
          createdDate: '15/01/2018',
          lastUpdated: nowStr,
          status: 'An toàn & Đáng tin cậy',
          isSafe: true,
          threatLevel: 'Độ an toàn cao',
          score: 12,
          threatDescription: 'Trang web này được xác minh có chứng chỉ SSL hợp lệ, danh tiếng tốt và không có báo cáo nguy hiểm nào.',
          metrics: [
            { id: 'domain', icon: Shield, label: 'Uy tín tên miền', score: 12, barColor: '#10B981' },
            { id: 'content', icon: MessageSquare, label: 'Nội dung & lời mời chào', score: 10, barColor: '#10B981' },
            { id: 'behavior', icon: Settings, label: 'Hành vi & kỹ thuật', score: 15, barColor: '#10B981' },
            { id: 'network', icon: Share2, label: 'Mạng lưới liên quan', score: 8, barColor: '#10B981' },
            { id: 'ai', icon: Bot, label: 'Kết quả AI tổng hợp', score: 11, barColor: '#10B981' }
          ],
          detectionSigns: [
            'Chứng chỉ số SSL/TLS hợp lệ (Let\'s Encrypt)',
            'Không yêu cầu thông tin nhạy cảm bất thường',
            'Tên miền hoạt động lâu năm và ổn định',
            'Chưa từng có báo cáo mã độc trên cơ sở dữ liệu an ninh',
            'Độ tin cậy được xếp hạng an toàn bởi Topdoo AI'
          ],
          recommendations: [
            'Có thể truy cập an toàn',
            'Luôn kiểm tra thanh địa chỉ HTTPS trên trình duyệt',
            'Bật bảo mật hai lớp nếu đăng nhập tài khoản',
            'Báo cáo cho Topdoo nếu có bất thường mới phát sinh',
            'Thêm vào Watchlist để theo dõi định kỳ'
          ]
        });
        showToast('Kết quả kiểm tra', `Đường link ${target} an toàn (Điểm rủi ro: 12/100).`, 'success');
      }
    }, 700);
  };

  const handleSelectExample = (url) => {
    setInputUrl(url);
    showToast('Đã chọn ví dụ', `Tải đường link mẫu: ${url}`, 'info');
  };

  return (
    <div className="topdoo-url-scanner-page">
      {/* 1. TOP HEADER (Unified Marketing Header) */}
      <MarketingHeader />

      {/* 2. MAIN LAYOUT: SIDEBAR + CONTENT */}
      <div className="scanner-layout-body">
        {/* Left Sidebar */}
        <aside className="scanner-sidebar">
          <div className="scanner-sidebar-inner">
            <nav className="scanner-nav-menu">
              {/* Trang chủ */}
              <button
                type="button"
                className="scanner-nav-item"
                onClick={() => navigateMarketing('home')}
              >
                <div className="scanner-nav-icon">
                  <LayoutGrid size={17} />
                </div>
                <span>Trang chủ</span>
              </button>

              {/* Sản phẩm (Collapsible) */}
              <div className="scanner-nav-accordion">
                <button
                  type="button"
                  className="scanner-nav-item with-chevron"
                  onClick={() => setProductsExpanded(!productsExpanded)}
                >
                  <div className="scanner-nav-icon">
                    <Layers size={17} />
                  </div>
                  <span>Sản phẩm</span>
                  {productsExpanded ? <ChevronUp size={14} className="chevron" /> : <ChevronDown size={14} className="chevron" />}
                </button>
                {productsExpanded && (
                  <div className="scanner-subnav-list">
                    <button
                      type="button"
                      className="scanner-subnav-item"
                      onClick={() => navigateMarketing('topdoo-security')}
                    >
                      <span>Topdoo Security</span>
                    </button>
                    <button
                      type="button"
                      className="scanner-subnav-item"
                      onClick={() => navigateMarketing('topdoo-ai')}
                    >
                      <span>Topdoo AI</span>
                    </button>
                    <button
                      type="button"
                      className="scanner-subnav-item"
                      onClick={() => navigateMarketing('topdoo-studio')}
                    >
                      <span>Topdoo Studio</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Công cụ (Expanded) */}
              <div className="scanner-nav-accordion open">
                <button
                  type="button"
                  className="scanner-nav-item with-chevron active-group"
                  onClick={() => setToolsExpanded(!toolsExpanded)}
                >
                  <div className="scanner-nav-icon">
                    <Sparkles size={17} />
                  </div>
                  <span>Công cụ</span>
                  {toolsExpanded ? <ChevronUp size={14} className="chevron" /> : <ChevronDown size={14} className="chevron" />}
                </button>

                {toolsExpanded && (
                  <div className="scanner-subnav-list">
                    {/* Topdoo Security - Active */}
                    <button
                      type="button"
                      className="scanner-subnav-item active"
                      onClick={() => {
                        setActiveTab('url-scanner');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    >
                      <ShieldCheck size={16} />
                      <span>Topdoo Security</span>
                    </button>

                    {/* Topdoo AI */}
                    <button
                      type="button"
                      className="scanner-subnav-item"
                      onClick={() => navigateMarketing('topdoo-ai')}
                    >
                      <Bot size={16} />
                      <span>Topdoo AI</span>
                    </button>

                    {/* Topdoo Studio */}
                    <button
                      type="button"
                      className="scanner-subnav-item"
                      onClick={() => navigateMarketing('topdoo-studio')}
                    >
                      <Rocket size={16} />
                      <span>Topdoo Studio</span>
                    </button>

                    {/* Topdoo Tools */}
                    <button
                      type="button"
                      className="scanner-subnav-item"
                      onClick={() => navigateMarketing('topdoo-tools')}
                    >
                      <Wrench size={16} />
                      <span>Topdoo Tools</span>
                    </button>

                    {/* Topdoo Developer */}
                    <button
                      type="button"
                      className="scanner-subnav-item"
                      onClick={() => navigateMarketing('topdoo-developer-dashboard')}
                    >
                      <Code2 size={16} />
                      <span>Topdoo Developer</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Bảng giá */}
              <button
                type="button"
                className="scanner-nav-item"
                onClick={() => navigateMarketing('topdoo-pricing')}
              >
                <div className="scanner-nav-icon">
                  <Tag size={17} />
                </div>
                <span>Bảng giá</span>
              </button>

              {/* Khám phá */}
              <button
                type="button"
                className="scanner-nav-item"
                onClick={() => navigateMarketing('topdoo-explore')}
              >
                <div className="scanner-nav-icon">
                  <Compass size={17} />
                </div>
                <span>Khám phá</span>
              </button>

              {/* Business */}
              <button
                type="button"
                className="scanner-nav-item"
                onClick={() => navigateMarketing('topdoo-business')}
              >
                <div className="scanner-nav-icon">
                  <Briefcase size={17} />
                </div>
                <span>Business</span>
              </button>

              {/* Company */}
              <button
                type="button"
                className="scanner-nav-item"
                onClick={() => navigateMarketing('topdoo-company')}
              >
                <div className="scanner-nav-icon">
                  <Building2 size={17} />
                </div>
                <span>Company</span>
              </button>
            </nav>

            {/* Upgrade Pro Card in Sidebar */}
            <div className="scanner-pro-card">
              <div className="scanner-pro-crown-box">
                <Crown size={16} color="#D97706" />
              </div>
              <h4 className="scanner-pro-title">Nâng cấp Pro</h4>
              <p className="scanner-pro-desc">
                Mở rộng giới hạn, nhiều tính năng mạnh mẽ hơn.
              </p>
              <button
                type="button"
                className="scanner-pro-btn"
                onClick={() => navigateMarketing('topdoo-pricing')}
              >
                <span>Nâng cấp ngay</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="scanner-sidebar-bottom">
              <button
                type="button"
                className="scanner-nav-item"
                onClick={() => showToast('Cài đặt hệ thống', 'Mở tùy chỉnh bảng điều khiển...', 'info')}
              >
                <div className="scanner-nav-icon">
                  <Settings size={17} />
                </div>
                <span>Cài đặt</span>
              </button>

              <button
                type="button"
                className="scanner-nav-item"
                onClick={() => {
                  showToast('Đăng xuất', 'Bạn đã đăng xuất an toàn.', 'info');
                  navigateMarketing('home');
                }}
              >
                <div className="scanner-nav-icon">
                  <LogOut size={17} />
                </div>
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="scanner-main-content">
          <div className="scanner-content-inner">
            {/* 1. Breadcrumbs */}
            <div className="scanner-breadcrumbs-bar">
              <button
                type="button"
                className="crumb-link"
                onClick={() => navigateMarketing('home')}
              >
                <span>🏠 Trang chủ</span>
              </button>
              <span className="crumb-sep">&gt;</span>
              <button
                type="button"
                className="crumb-link"
                onClick={() => navigateMarketing('topdoo-tools')}
              >
                <span>Công cụ</span>
              </button>
              <span className="crumb-sep">&gt;</span>
              <button
                type="button"
                className="crumb-link"
                onClick={() => navigateMarketing('topdoo-security')}
              >
                <span>Topdoo Security</span>
              </button>
              <span className="crumb-sep">&gt;</span>
              <span className="crumb-current">URL/Domain Scanner</span>
            </div>

            {/* 2. Header Banner Card */}
            <div className="scanner-header-banner">
              <div className="banner-left">
                <div className="banner-shield-glow">
                  <ShieldCheck size={28} color="#059669" strokeWidth={2.4} />
                </div>
                <div className="banner-title-wrap">
                  <h2 className="banner-title">
                    Topdoo. <span className="banner-highlight">Pro Security</span>
                  </h2>
                  <p className="banner-subtitle">
                    Bảo vệ bạn trên không gian số với AI
                  </p>
                </div>
              </div>

              <div className="banner-right">
                <p className="banner-quote">
                  &ldquo;Phát hiện sớm — Ngăn chặn kịp thời — An toàn hơn mỗi ngày&rdquo;
                </p>
                <p className="banner-subquote">
                  Cùng cộng đồng xây dựng không gian số trong lành.
                </p>
                {/* Watermark shield */}
                <div className="banner-watermark-shield">
                  <Shield size={120} strokeWidth={1} />
                </div>
              </div>
            </div>

            {/* Section Heading */}
            <div className="scanner-section-intro">
              <h3 className="scanner-section-title">Công cụ bảo vệ toàn diện</h3>
              <p className="scanner-section-desc">
                Kiểm tra, phân tích và giám sát các mối đe dọa trực tuyến với AI.
              </p>
            </div>

            {/* 3. Tab Steps Navigation Bar */}
            <div className="scanner-tabs-bar">
              {/* Tab 1: URL/Domain Scanner */}
              <button
                type="button"
                className={`scanner-tab-item ${activeTab === 'url-scanner' ? 'active' : ''}`}
                onClick={() => setActiveTab('url-scanner')}
              >
                <div className="tab-icon-box blue">
                  <Link2 size={18} strokeWidth={2.4} />
                </div>
                <div className="tab-text">
                  <div className="tab-title">URL/Domain Scanner</div>
                  <div className="tab-desc">Kiểm tra link &amp; tên miền</div>
                </div>
              </button>

              <div className="tab-arrow-divider">&gt;</div>

              {/* Tab 2: Phishing Check */}
              <button
                type="button"
                className={`scanner-tab-item ${activeTab === 'phishing' ? 'active' : ''}`}
                onClick={() => setActiveTab('phishing')}
              >
                <div className="tab-icon-box red">
                  <Mail size={18} strokeWidth={2.4} />
                </div>
                <div className="tab-text">
                  <div className="tab-title">Phishing Check</div>
                  <div className="tab-desc">Phát hiện lừa đảo</div>
                </div>
              </button>

              <div className="tab-arrow-divider">&gt;</div>

              {/* Tab 3: Scam Network */}
              <button
                type="button"
                className={`scanner-tab-item ${activeTab === 'network' ? 'active' : ''}`}
                onClick={() => setActiveTab('network')}
              >
                <div className="tab-icon-box purple">
                  <Share2 size={18} strokeWidth={2.4} />
                </div>
                <div className="tab-text">
                  <div className="tab-title">Scam Network</div>
                  <div className="tab-desc">Phân tích mạng lưới lừa đảo</div>
                </div>
              </button>

              <div className="tab-arrow-divider">&gt;</div>

              {/* Tab 4: Watchlist */}
              <button
                type="button"
                className={`scanner-tab-item ${activeTab === 'watchlist' ? 'active' : ''}`}
                onClick={() => setActiveTab('watchlist')}
              >
                <div className="tab-icon-box amber">
                  <Star size={18} strokeWidth={2.4} />
                </div>
                <div className="tab-text">
                  <div className="tab-title">Watchlist</div>
                  <div className="tab-desc">Theo dõi &amp; cảnh báo</div>
                </div>
              </button>

              <div className="tab-arrow-divider">&gt;</div>

              {/* Tab 5: Monitoring */}
              <button
                type="button"
                className={`scanner-tab-item ${activeTab === 'monitoring' ? 'active' : ''}`}
                onClick={() => setActiveTab('monitoring')}
              >
                <div className="tab-icon-box green">
                  <Activity size={18} strokeWidth={2.4} />
                </div>
                <div className="tab-text">
                  <div className="tab-title">Monitoring</div>
                  <div className="tab-desc">Giám sát liên tục</div>
                </div>
              </button>
            </div>

            {/* 4. HERO CARD: URL/Domain Scanner (Active View) */}
            <div className="scanner-hero-card">
              <div className="scanner-hero-grid">
                {/* Left Column: Form & Tools */}
                <div className="scanner-hero-left">
                  {/* Title & Sub */}
                  <div className="scanner-header-row">
                    <div className="scanner-header-icon-box">
                      <Link2 size={24} color="#0084FF" strokeWidth={2.4} />
                    </div>
                    <div className="scanner-header-titles">
                      <h3 className="scanner-card-title">URL/Domain Scanner</h3>
                      <p className="scanner-card-subtitle">
                        Kiểm tra nhanh độ an toàn của đường link hoặc tên miền, phát hiện các dấu hiệu lừa đảo, mã độc và rủi ro bảo mật.
                      </p>
                    </div>
                  </div>

                  {/* Sub-tabs: Đơn lẻ vs Hàng loạt */}
                  <div className="scanner-subtabs-row">
                    <button
                      type="button"
                      className={`scanner-pill-tab ${scanMode === 'single' ? 'active' : ''}`}
                      onClick={() => setScanMode('single')}
                    >
                      Kiểm tra đơn lẻ
                    </button>
                    <button
                      type="button"
                      className={`scanner-pill-tab ${scanMode === 'batch' ? 'active' : ''}`}
                      onClick={() => setScanMode('batch')}
                    >
                      Kiểm tra hàng loạt
                    </button>
                  </div>

                  {/* Search Input Bar */}
                  {scanMode === 'single' ? (
                    <form className="scanner-input-bar-wrap" onSubmit={handleExecuteScan}>
                      <div className="scanner-input-relative">
                        <input
                          type="text"
                          className="scanner-main-input"
                          placeholder="Nhập URL hoặc tên miền (ví dụ: https://example.com)"
                          value={inputUrl}
                          onChange={(e) => setInputUrl(e.target.value)}
                        />
                        {inputUrl && (
                          <button
                            type="button"
                            className="btn-input-clear"
                            onClick={() => {
                              setInputUrl('');
                              setScanResult(null);
                            }}
                            title="Xóa URL"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="btn-scanner-submit"
                        disabled={isScanning}
                      >
                        <Search size={16} />
                        <span>{isScanning ? 'Đang kiểm tra...' : 'Kiểm tra ngay'}</span>
                      </button>
                    </form>
                  ) : (
                    <div className="scanner-batch-wrap">
                      <textarea
                        className="scanner-batch-input"
                        rows="4"
                        placeholder="Nhập danh sách URL hoặc tên miền (mỗi dòng một địa chỉ)..."
                        value={batchUrls}
                        onChange={(e) => setBatchUrls(e.target.value)}
                      />
                      <button
                        type="button"
                        className="btn-scanner-submit batch"
                        onClick={() => {
                          showToast('Quét hàng loạt', 'Đang phân tích danh sách các mục...', 'info');
                        }}
                      >
                        <Search size={16} />
                        <span>Quét hàng loạt URL</span>
                      </button>
                    </div>
                  )}

                  {/* Input Footer: Examples */}
                  <div className="scanner-input-footer">
                    <div className="scanner-examples-links">
                      <span className="ex-label">Ví dụ:</span>
                      <button
                        type="button"
                        className="ex-link"
                        onClick={() => handleSelectExample('https://example.com')}
                      >
                        https://example.com
                      </button>
                      <span className="ex-sep">|</span>
                      <button
                        type="button"
                        className="ex-link"
                        onClick={() => handleSelectExample('http://bit.ly/abc123')}
                      >
                        http://bit.ly/abc123
                      </button>
                      <span className="ex-sep">|</span>
                      <button
                        type="button"
                        className="ex-link"
                        onClick={() => handleSelectExample('https://topdoosecurity.com')}
                      >
                        https://topdoosecurity.com
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn-advanced-options"
                      onClick={() => showToast('Tùy chọn nâng cao', 'Cấu hình quét chuyên sâu bằng AI và DNS...', 'info')}
                    >
                      <SlidersHorizontal size={13} />
                      <span>Tùy chọn nâng cao</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Illustration & Feature Checkmarks */}
                <div className="scanner-hero-right">
                  <div className="scanner-feature-card">
                    {/* Visual Mockup Graphic */}
                    <div className="scanner-graphic-mockup">
                      <div className="mockup-url-bar">
                        <div className="mockup-protocol">
                          <Lock size={12} color="#10B981" />
                          <span className="mockup-url-text">https://</span>
                        </div>
                        <div className="mockup-scan-lens">
                          <Search size={18} color="#0084FF" strokeWidth={2.5} />
                        </div>
                        {/* 3D Shield Badge */}
                        <div className="mockup-shield-badge">
                          <ShieldCheck size={28} color="#10B981" fill="#DCFCE7" />
                        </div>
                      </div>
                      <div className="mockup-page-sheet">
                        <div className="sheet-line l1"></div>
                        <div className="sheet-line l2"></div>
                        <div className="sheet-line l3"></div>
                      </div>
                    </div>

                    {/* 4 Feature Bullet Checkmarks */}
                    <div className="scanner-benefits-list">
                      <div className="benefit-item">
                        <div className="benefit-check-circle">
                          <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                        </div>
                        <span>Phát hiện website lừa đảo</span>
                      </div>
                      <div className="benefit-item">
                        <div className="benefit-check-circle">
                          <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                        </div>
                        <span>Kiểm tra mã độc, liên kết nguy hiểm</span>
                      </div>
                      <div className="benefit-item">
                        <div className="benefit-check-circle">
                          <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                        </div>
                        <span>Phân tích reputation &amp; độ tin cậy</span>
                      </div>
                      <div className="benefit-item">
                        <div className="benefit-check-circle">
                          <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                        </div>
                        <span>Kết quả nhanh chóng, chính xác</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 5. SCAN RESULTS DASHBOARD (Khi chạy / Scanned state) */}
            {scanResult ? (
              <section className="scan-results-dashboard">
                {/* Header */}
                <div className="scan-results-header">
                  <div className="results-header-left">
                    <span className="results-green-indicator">●</span>
                    <h3 className="results-heading-text">Kết quả kiểm tra</h3>
                    <span className="results-updated-pill">
                      Dữ liệu cập nhật mới nhất: {scanResult.lastUpdated}
                    </span>
                  </div>

                  <div className="results-header-actions">
                    <button
                      type="button"
                      className="btn-results-action"
                      onClick={() => showToast('Tải báo cáo (PDF)', 'Đang tạo tệp báo cáo PDF an ninh...', 'info')}
                    >
                      <FileText size={14} />
                      <span>Tải báo cáo (PDF)</span>
                    </button>
                    <button
                      type="button"
                      className="btn-results-action"
                      onClick={() => handleExecuteScan()}
                      disabled={isScanning}
                    >
                      <RotateCw size={14} className={isScanning ? 'spin-icon' : ''} />
                      <span>Kiểm tra lại</span>
                    </button>
                  </div>
                </div>

                {/* ROW 1: 3 Columns (Threat Alert | Basic Info | Evaluation Metrics) */}
                <div className="scan-results-grid-3col">
                  {/* Card 1: Threat Alert Card */}
                  <div className="result-card threat-alert-card">
                    <div className="threat-top-row">
                      <div className="threat-circle-icon">
                        <span>!</span>
                      </div>
                      <div className="threat-meta-info">
                        <div className="threat-title-row">
                          <span className="threat-level-title">{scanResult.threatLevel}</span>
                          <span className="threat-score-badge">{scanResult.score}/100</span>
                        </div>
                        <div className="threat-target-text">{scanResult.target}</div>
                        <div className="threat-tag-pill">
                          <span className="threat-tag-dot">●</span>
                          <span>{scanResult.type}</span>
                        </div>
                      </div>
                    </div>

                    <p className="threat-card-desc">
                      {scanResult.threatDescription}
                    </p>

                    <div className="threat-card-buttons">
                      <button
                        type="button"
                        className="btn-threat-warn"
                        onClick={() => showToast('Cảnh báo an ninh', 'Đã ghi nhận cảnh báo và thông báo cộng đồng.', 'warning')}
                      >
                        <Flag size={14} />
                        <span>Cảnh báo ngay</span>
                      </button>
                      <button
                        type="button"
                        className="btn-threat-share"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(scanResult.target);
                          }
                          showToast('Chia sẻ kết quả', 'Đã sao chép liên kết báo cáo an ninh.', 'info');
                        }}
                      >
                        <Share2 size={14} />
                        <span>Chia sẻ kết quả</span>
                      </button>
                    </div>
                  </div>

                  {/* Card 2: Basic Information Card */}
                  <div className="result-card basic-info-card">
                    <h4 className="result-card-title">Thông tin cơ bản</h4>
                    <div className="basic-info-rows-list">
                      <div className="basic-row">
                        <div className="basic-label">
                          <Globe size={14} className="basic-icon" />
                          <span>Tên miền</span>
                        </div>
                        <div className="basic-value bold">{scanResult.domain}</div>
                      </div>
                      <div className="basic-row">
                        <div className="basic-label">
                          <Shield size={14} className="basic-icon" />
                          <span>Loại</span>
                        </div>
                        <div className="basic-value">{scanResult.type}</div>
                      </div>
                      <div className="basic-row">
                        <div className="basic-label">
                          <span className="basic-icon-emoji">📍</span>
                          <span>Quốc gia</span>
                        </div>
                        <div className="basic-value">
                          <span className="country-flag">🇻🇳</span> {scanResult.country}
                        </div>
                      </div>
                      <div className="basic-row">
                        <div className="basic-label">
                          <FileText size={14} className="basic-icon" />
                          <span>Ngày tạo</span>
                        </div>
                        <div className="basic-value">{scanResult.createdDate}</div>
                      </div>
                      <div className="basic-row">
                        <div className="basic-label">
                          <Activity size={14} className="basic-icon" />
                          <span>Cập nhật gần nhất</span>
                        </div>
                        <div className="basic-value">{scanResult.lastUpdated}</div>
                      </div>
                      <div className="basic-row last-status-row">
                        <div className="basic-label">
                          <AlertTriangle size={14} className="basic-icon" />
                          <span>Trạng thái</span>
                        </div>
                        <div className="basic-value status-danger-text">
                          <span className="status-red-dot">●</span> {scanResult.status}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Evaluation Metrics Card */}
                  <div className="result-card metrics-eval-card">
                    <h4 className="result-card-title">Chỉ số đánh giá</h4>
                    <div className="metrics-eval-rows">
                      {scanResult.metrics.map((metric) => {
                        const IconComp = metric.icon;
                        return (
                          <div key={metric.id} className="metric-item-row">
                            <div className="metric-label-wrap">
                              <IconComp size={14} className="metric-row-icon" />
                              <span>{metric.label}</span>
                            </div>
                            <div className="metric-score-wrap">
                              <span className="metric-score-text">{metric.score}/100</span>
                              <div className="metric-bar-track">
                                <div
                                  className="metric-bar-fill"
                                  style={{
                                    width: `${metric.score}%`,
                                    backgroundColor: metric.barColor || '#EF4444'
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* ROW 2: 3 Columns (Detection Signs | Recommendations | Next Actions) */}
                <div className="scan-results-grid-3col">
                  {/* Card 4: Detection Signs */}
                  <div className="result-card signs-card">
                    <h4 className="result-card-title">Dấu hiệu nhận biết</h4>
                    <ul className="signs-list">
                      {scanResult.detectionSigns.map((sign, idx) => (
                        <li key={idx} className="signs-item">
                          <span className="signs-bullet-dot">●</span>
                          <span>{sign}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card 5: Recommendations */}
                  <div className="result-card recs-card">
                    <div className="recs-title-row">
                      <ShieldCheck size={16} color="#059669" />
                      <h4 className="result-card-title">Khuyến nghị</h4>
                    </div>
                    <ul className="recs-list">
                      {scanResult.recommendations.map((rec, idx) => (
                        <li key={idx} className="recs-item">
                          <CheckCircle2 size={15} color="#10B981" className="recs-check-icon" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card 6: Next Actions */}
                  <div className="result-card next-actions-card">
                    <h4 className="result-card-title">Hành động tiếp theo</h4>
                    <div className="actions-button-row">
                      <button
                        type="button"
                        className="btn-action-light"
                        onClick={() => {
                          setInputUrl('');
                          setScanResult(null);
                        }}
                      >
                        <Search size={14} />
                        <span>Kiểm tra trang khác</span>
                      </button>
                      <button
                        type="button"
                        className="btn-action-light"
                        onClick={() => {
                          setActiveTab('watchlist');
                          showToast('Watchlist', `Đã thêm ${scanResult.domain} vào danh sách theo dõi.`, 'success');
                        }}
                      >
                        <ShieldCheck size={14} />
                        <span>Thêm vào Watchlist</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn-action-blue-full"
                      onClick={() => showToast('Tải báo cáo chi tiết', 'Đang kết xuất tài liệu PDF chi tiết...', 'info')}
                    >
                      <FileText size={15} />
                      <span>Tải báo cáo chi tiết</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </section>
            ) : (
              <div className="scanner-features-2x2-grid">
                {/* Card 1: Phishing Check */}
                <div className="feature-grid-card phishing">
                <div className="card-header">
                  <div className="card-header-icon-box red">
                    <Mail size={22} color="#EF4444" strokeWidth={2.4} />
                  </div>
                  <div className="card-header-titles">
                    <h4 className="feature-card-title">Phishing Check</h4>
                    <p className="feature-card-sub">
                      Phát hiện các trang web, email và nội dung có dấu hiệu lừa đảo.
                    </p>
                  </div>
                </div>

                <div className="card-body-content">
                  <div className="card-body-left">
                    <ul className="feature-points-list">
                      <li>
                        <span className="dot red">●</span>
                        <span>Phân tích email, link, trang đăng nhập giả mạo</span>
                      </li>
                      <li>
                        <span className="dot red">●</span>
                        <span>Nhận diện thương hiệu bị mạo danh</span>
                      </li>
                      <li>
                        <span className="dot red">●</span>
                        <span>Cảnh báo theo thời gian thực</span>
                      </li>
                      <li>
                        <span className="dot red">●</span>
                        <span>Cập nhật liên tục từ cộng đồng và AI</span>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="btn-card-action"
                      onClick={() => {
                        setActiveTab('phishing');
                        showToast('Phishing Check', 'Chuyển đến công cụ kiểm tra giả mạo Phishing.', 'info');
                      }}
                    >
                      <span>Kiểm tra phishing</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Right Graphic: Opening envelope with warning */}
                  <div className="card-body-graphic phishing-graphic">
                    <svg width="130" height="96" viewBox="0 0 130 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Envelope Back */}
                      <rect x="25" y="32" width="80" height="52" rx="8" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
                      {/* Paper sticking out */}
                      <rect x="36" y="14" width="58" height="44" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.2" />
                      <line x1="43" y1="24" x2="84" y2="24" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="43" y1="31" x2="72" y2="31" stroke="#E2E8F0" strokeWidth="2.5" strokeLinecap="round" />
                      {/* Envelope flap / front folds */}
                      <path d="M25 84L65 54L105 84" fill="#DBEAFE" stroke="#BFDBFE" strokeWidth="1.5" />
                      <path d="M25 34L65 60L105 34" fill="#EFF6FF" opacity="0.7" stroke="#BFDBFE" strokeWidth="1.5" />
                      {/* Red triangle warning badge */}
                      <g transform="translate(65, 52)">
                        <path d="M0 -15L15 11H-15L0 -15Z" fill="#EF4444" filter="drop-shadow(0 2px 5px rgba(239, 68, 68, 0.45))" />
                        <line x1="0" y1="-8" x2="0" y2="3" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
                        <circle cx="0" cy="7.5" r="1.3" fill="#FFFFFF" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 2: Scam Network */}
              <div className="feature-grid-card network">
                <div className="card-header">
                  <div className="card-header-icon-box purple">
                    <Share2 size={22} color="#8B5CF6" strokeWidth={2.4} />
                  </div>
                  <div className="card-header-titles">
                    <h4 className="feature-card-title">Scam Network</h4>
                    <p className="feature-card-sub">
                      Phân tích và hiển thị mạng lưới các website, tài khoản, IP có liên quan đến hoạt động lừa đảo.
                    </p>
                  </div>
                </div>

                <div className="card-body-content">
                  <div className="card-body-left">
                    <ul className="feature-points-list">
                      <li>
                        <span className="dot purple">●</span>
                        <span>Truy vết mối liên kết giữa các đối tượng</span>
                      </li>
                      <li>
                        <span className="dot purple">●</span>
                        <span>Hiển thị sơ đồ mạng lưới lừa đảo</span>
                      </li>
                      <li>
                        <span className="dot purple">●</span>
                        <span>Phân tích tổ chức, máy chủ, tên miền liên quan</span>
                      </li>
                      <li>
                        <span className="dot purple">●</span>
                        <span>Cập nhật dữ liệu từ cộng đồng toàn cầu</span>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="btn-card-action"
                      onClick={() => {
                        setActiveTab('network');
                        showToast('Scam Network', 'Mở bản đồ trực quan mạng lưới lừa đảo liên kết.', 'info');
                      }}
                    >
                      <span>Xem mạng lưới</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Right Graphic: Connected node graph on clean transparent background */}
                  <div className="card-body-graphic network-graphic">
                    <svg width="150" height="110" viewBox="0 0 150 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Connection lines */}
                      <line x1="68" y1="55" x2="105" y2="20" stroke="#FCA5A5" strokeWidth="1.2" strokeDasharray="3 3" />
                      <line x1="68" y1="55" x2="115" y2="52" stroke="#FCA5A5" strokeWidth="1.2" />
                      <line x1="68" y1="55" x2="105" y2="88" stroke="#FCA5A5" strokeWidth="1.2" strokeDasharray="3 3" />
                      <line x1="68" y1="55" x2="28" y2="38" stroke="#E2E8F0" strokeWidth="1.2" />
                      <line x1="68" y1="55" x2="32" y2="72" stroke="#E2E8F0" strokeWidth="1.2" />

                      {/* Small satellite nodes */}
                      <circle cx="28" cy="38" r="4.5" fill="#93C5FD" stroke="#3B82F6" strokeWidth="1" />
                      <circle cx="32" cy="72" r="3.5" fill="#C4B5FD" stroke="#8B5CF6" strokeWidth="1" />

                      {/* Central scammer node with red glow */}
                      <circle cx="68" cy="55" r="16" fill="#EF4444" filter="drop-shadow(0 2px 6px rgba(239, 68, 68, 0.4))" />
                      <circle cx="68" cy="50" r="4" fill="#FFFFFF" />
                      <path d="M61 62C61 58 64 57 68 57C72 57 75 58 75 62" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />

                      {/* Pill 1: scam1.com */}
                      <g transform="translate(86, 10)">
                        <rect width="52" height="18" rx="4" fill="#FEF2F2" stroke="#FECACA" strokeWidth="1" />
                        <text x="26" y="12" fill="#DC2626" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">scam1.com</text>
                      </g>

                      {/* Pill 2: fake-shop.net */}
                      <g transform="translate(94, 43)">
                        <rect width="54" height="18" rx="4" fill="#FEF2F2" stroke="#FECACA" strokeWidth="1" />
                        <text x="27" y="12" fill="#DC2626" fontSize="7.5" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">fake-shop.net</text>
                      </g>

                      {/* Pill 3: pay-vn.org */}
                      <g transform="translate(88, 78)">
                        <rect width="50" height="18" rx="4" fill="#FEF2F2" stroke="#FECACA" strokeWidth="1" />
                        <text x="25" y="12" fill="#DC2626" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">pay-vn.org</text>
                      </g>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 3: Watchlist */}
              <div className="feature-grid-card watchlist">
                <div className="card-header">
                  <div className="card-header-icon-box amber">
                    <Star size={22} color="#D97706" strokeWidth={2.4} />
                  </div>
                  <div className="card-header-titles">
                    <h4 className="feature-card-title">Watchlist</h4>
                    <p className="feature-card-sub">
                      Theo dõi các URL, tên miền, email hoặc tài khoản đáng ngờ.
                    </p>
                  </div>
                </div>

                <div className="card-body-content">
                  <div className="card-body-left">
                    <ul className="feature-points-list">
                      <li>
                        <span className="dot amber">●</span>
                        <span>Thêm mục cần theo dõi</span>
                      </li>
                      <li>
                        <span className="dot amber">●</span>
                        <span>Nhận cảnh báo khi có thay đổi</span>
                      </li>
                      <li>
                        <span className="dot amber">●</span>
                        <span>Quản lý danh sách cá nhân hoặc tổ chức</span>
                      </li>
                      <li>
                        <span className="dot amber">●</span>
                        <span>Đồng bộ trên mọi thiết bị</span>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="btn-card-action"
                      onClick={() => {
                        setActiveTab('watchlist');
                        showToast('Watchlist', 'Quản lý danh sách đối tượng đang theo dõi.', 'info');
                      }}
                    >
                      <span>Quản lý watchlist</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Right Graphic: Clipboard checklist */}
                  <div className="card-body-graphic watchlist-graphic">
                    <svg width="130" height="110" viewBox="0 0 130 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                      {/* Clipboard body */}
                      <rect x="25" y="14" width="80" height="84" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" filter="drop-shadow(0 2px 6px rgba(0,0,0,0.04))" />
                      {/* Clip on top */}
                      <rect x="52" y="8" width="26" height="12" rx="3" fill="#0084FF" />
                      <rect x="59" y="11" width="12" height="4" rx="2" fill="#FFFFFF" opacity="0.8" />
                      {/* Star Badge on top right */}
                      <circle cx="95" cy="22" r="10" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1" />
                      <path d="M95 16L96.5 19.5L100 20L97.5 22.5L98 26L95 24L92 26L92.5 22.5L90 20L93.5 19.5L95 16Z" fill="#D97706" />

                      {/* Items */}
                      <circle cx="37" cy="40" r="3" fill="#F59E0B" />
                      <text x="45" y="43" fill="#334155" fontSize="8" fontFamily="sans-serif">gift-vn.online</text>

                      <circle cx="37" cy="58" r="3" fill="#F59E0B" />
                      <text x="45" y="61" fill="#334155" fontSize="8" fontFamily="sans-serif">example-scam.com</text>

                      <circle cx="37" cy="76" r="3" fill="#F59E0B" />
                      <text x="45" y="79" fill="#334155" fontSize="8" fontFamily="sans-serif">user@fake.com</text>

                      {/* Bell badge on bottom right */}
                      <circle cx="98" cy="88" r="10" fill="#EBF5FF" stroke="#BFDBFE" strokeWidth="1" />
                      <path d="M98 83C96 83 95 84.5 95 86.5V89L94 90H102L101 89V86.5C101 84.5 100 83 98 83Z" fill="#0084FF" />
                      <circle cx="98" cy="92" r="1" fill="#0084FF" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card 4: Monitoring */}
              <div className="feature-grid-card monitoring">
                <div className="card-header">
                  <div className="card-header-icon-box green">
                    <Activity size={22} color="#10B981" strokeWidth={2.4} />
                  </div>
                  <div className="card-header-titles">
                    <h4 className="feature-card-title">Monitoring</h4>
                    <p className="feature-card-sub">
                      Giám sát liên tục các nguồn dữ liệu để phát hiện rủi ro mới.
                    </p>
                  </div>
                </div>

                <div className="card-body-content">
                  <div className="card-body-left">
                    <ul className="feature-points-list">
                      <li>
                        <span className="dot green">●</span>
                        <span>Tự động quét và giám sát 24/7</span>
                      </li>
                      <li>
                        <span className="dot green">●</span>
                        <span>Cảnh báo tức thời khi có mối đe dọa</span>
                      </li>
                      <li>
                        <span className="dot green">●</span>
                        <span>Theo dõi nhiều nguồn cùng lúc</span>
                      </li>
                      <li>
                        <span className="dot green">●</span>
                        <span>Báo cáo định kỳ qua email</span>
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="btn-card-action"
                      onClick={() => {
                        setActiveTab('monitoring');
                        showToast('Monitoring', 'Cài đặt chế độ giám sát tự động 24/7.', 'info');
                      }}
                    >
                      <span>Thiết lập giám sát</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Right Graphic: Monitor ECG & live tags */}
                  <div className="card-body-graphic monitor-graphic">
                    <div className="monitor-screen-wrap">
                      <div className="monitor-frame">
                        <div className="monitor-live-badge">LIVE</div>
                        <svg className="monitor-ecg-svg" viewBox="0 0 100 40" fill="none">
                          <path
                            d="M 5 22 L 25 22 L 32 10 L 40 32 L 48 18 L 54 26 L 60 22 L 95 22"
                            stroke="#10B981"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="monitor-stand"></div>
                      <div className="monitor-base"></div>
                    </div>

                    <div className="monitor-tags-list">
                      <div className="mon-tag green">
                        <span className="mon-icon">🛡️</span>
                        <span>Website <strong>120</strong> giám sát</span>
                      </div>
                      <div className="mon-tag teal">
                        <span className="mon-icon">🌐</span>
                        <span>Domain <strong>85</strong> giám sát</span>
                      </div>
                      <div className="mon-tag blue">
                        <span className="mon-icon">✉️</span>
                        <span>Email <strong>42</strong> giám sát</span>
                      </div>
                      <div className="mon-tag purple">
                        <span className="mon-icon">📡</span>
                        <span>IP Address <strong>64</strong> giám sát</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* 7. FOOTER */}
            <footer className="scanner-content-footer">
              <div className="footer-left">
                <span>&copy; 2025 Topdoo. All rights reserved.</span>
              </div>
              <div className="footer-center">
                <button type="button" className="footer-link" onClick={() => showToast('Điều khoản dịch vụ', 'Chính sách dịch vụ Topdoo', 'info')}>
                  Điều khoản dịch vụ
                </button>
                <span className="footer-sep">|</span>
                <button type="button" className="footer-link" onClick={() => showToast('Chính sách bảo mật', 'Chính sách bảo vệ quyền riêng tư', 'info')}>
                  Chính sách bảo mật
                </button>
                <span className="footer-sep">|</span>
                <button type="button" className="footer-link" onClick={() => navigateMarketing('topdoo-contact')}>
                  Hỗ trợ
                </button>
              </div>
              <div className="footer-right">
                <div className="lang-pill">
                  <span className="flag">🇻🇳</span>
                  <span>Tiếng Việt</span>
                  <ChevronDown size={13} />
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
