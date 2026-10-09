import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Search,
  UserCheck,
  Cloud,
  FileText,
  Settings,
  ArrowRight,
  Play,
  Check,
  Users,
  Building2,
  User,
  Globe,
  Headphones,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  X,
  Laptop,
  AlertTriangle,
  RefreshCw,
  Terminal,
  Activity,
  Zap,
  Radio,
  Download,
  ExternalLink,
  Flame,
  KeyRound,
  Server,
  Share2,
  Copy,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  MapPin,
  CreditCard,
  Phone
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import {
  scanLiveWebsite,
  scanLivePasswordPwned,
  scanLiveCheckScam,
  scanLiveIpServer,
  scanLiveBreachEmail
} from '../../services/realSecurityScanner';

export function TopdooSecurityView() {
  const { navigateMarketing, setMode, setCurrentView, showToast, user, recordScanToConsole } = useSecurity();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [scanStep, setScanStep] = useState(0); // 0: ready, 1: scanning, 2: complete
  const [scanProgress, setScanProgress] = useState(0);

  // ─── UNIVERSAL REAL AI SECURITY SCANNER STATE ─────────────────────
  const [activeScanTab, setActiveScanTab] = useState('url'); // 'url' | 'checkscam' | 'password' | 'ip' | 'breach'
  const [scanInput, setScanInput] = useState('');
  const [isLiveScanning, setIsLiveScanning] = useState(false);
  const [liveScanProgress, setLiveScanProgress] = useState(0);
  const [scanStageText, setScanStageText] = useState('');
  const [scanResult, setScanResult] = useState(null);
  const [showVtEnginesList, setShowVtEnginesList] = useState(false);

  // Default input placeholders and sample quick targets by tab
  const scanTabsMeta = {
    url: {
      name: 'Website & URL (VirusTotal)',
      icon: Globe,
      placeholder: 'Nhập đường link website (VD: topdoo.com, google.com hoặc link lạ)...',
      samples: [
        { label: 'Topdoo Platform', val: 'https://topdoo.com' },
        { label: 'Link mạo danh ngân hàng (Phishing test)', val: 'http://vcb-digibank-xacthuc.tk' },
        { label: 'Trang Web Crypto nghi vấn', val: 'https://free-crypto-giveaway2026.xyz' }
      ]
    },
    checkscam: {
      name: 'Tra cứu STK & SĐT (CheckScam)',
      icon: ShieldAlert,
      placeholder: 'Nhập số tài khoản ngân hàng hoặc số điện thoại người bán/giao dịch...',
      samples: [
        { label: 'STK An toàn (Topdoo Official)', val: '19036888888888' },
        { label: 'STK Lừa đảo giả CSKH (MB Bank)', val: '0389281726' },
        { label: 'SĐT mạo danh shipper lừa đảo', val: '0878192837' }
      ]
    },
    password: {
      name: 'Mật khẩu rò rỉ (HaveIBeenPwned)',
      icon: Lock,
      placeholder: 'Nhập mật khẩu thử nghiệm (kiểm tra an toàn k-Anonymity)...',
      samples: [
        { label: 'Mật khẩu yếu (123456)', val: '123456' },
        { label: 'Mật khẩu trung bình', val: 'MatKhau2026@' },
        { label: 'Mật khẩu siêu cấp', val: 'Topdoo#Cyber$8921!xK' }
      ]
    },
    ip: {
      name: 'Tra cứu IP Máy chủ (GeoIP)',
      icon: Server,
      placeholder: 'Nhập địa chỉ IPv4/IPv6 hoặc máy chủ (VD: 157.66.100.35)...',
      samples: [
        { label: 'Topdoo Cloud Server', val: '157.66.100.35' },
        { label: 'Cloudflare Public DNS', val: '1.1.1.1' },
        { label: 'Tor Exit Node độc hại', val: '185.220.101.5' }
      ]
    },
    breach: {
      name: 'Kiểm tra Rò rỉ Email',
      icon: UserCheck,
      placeholder: 'Nhập email của bạn để kiểm tra rò rỉ Dark Web...',
      samples: [
        { label: 'Email công ty', val: user?.email || 'admin@topdoo.com' },
        { label: 'Email mẫu nghi rò rỉ', val: 'victim_account1996@gmail.com' }
      ]
    }
  };

  const handleTabChange = (tabKey) => {
    setActiveScanTab(tabKey);
    setScanResult(null);
    setIsLiveScanning(false);
    setShowVtEnginesList(false);
    setScanInput(''); // Không gán cứng, để người dùng tự do nhập
  };

  const executeLiveScan = async (targetVal = scanInput) => {
    const query = (targetVal || '').trim();
    if (!query) {
      showToast('Thông báo', 'Vui lòng nhập đối tượng cần kiểm tra', 'warning');
      return;
    }

    setIsLiveScanning(true);
    setScanResult(null);
    setShowVtEnginesList(false);
    setLiveScanProgress(15);
    setScanStageText('Khởi tạo kết nối mạng lưới Threat Intelligence toàn cầu...');

    let progress = 15;
    const progressTimer = setInterval(() => {
      progress = Math.min(progress + 14, 88);
      setLiveScanProgress(progress);
      if (progress < 40) {
        setScanStageText('Truy xuất dữ liệu DNS, chứng chỉ mã hóa và cấu trúc số...');
      } else if (progress < 70) {
        setScanStageText('Đối chiếu cơ sở dữ liệu 78+ Antivirus Engines & Dark Web Dumps...');
      } else {
        setScanStageText('AI chấm điểm tín nhiệm, lập ma trận rủi ro và khuyến nghị...');
      }
    }, 250);

    try {
      let result = null;

      if (activeScanTab === 'url') {
        result = await scanLiveWebsite(query);
      } else if (activeScanTab === 'checkscam') {
        result = await scanLiveCheckScam(query);
      } else if (activeScanTab === 'password') {
        result = await scanLivePasswordPwned(query);
      } else if (activeScanTab === 'ip') {
        result = await scanLiveIpServer(query);
      } else if (activeScanTab === 'breach') {
        result = await scanLiveBreachEmail(query);
      }

      clearInterval(progressTimer);
      setLiveScanProgress(100);
      setScanStageText('Phân tích an ninh hoàn tất!');

      setTimeout(() => {
        setIsLiveScanning(false);
        setScanResult(result);
        if (recordScanToConsole && result) {
          recordScanToConsole(result);
        }
        showToast(
          'Quét hoàn tất',
          `Điểm an toàn: ${result.score}/100 (${result.statusLabel})`,
          result.status === 'danger' ? 'error' : (result.status === 'warning' ? 'warning' : 'success')
        );
      }, 350);
    } catch (err) {
      clearInterval(progressTimer);
      setIsLiveScanning(false);
      showToast('Lỗi phân tích', err.message || 'Không thể hoàn thành phiên quét an ninh', 'error');
    }
  };

  const startLiveDemoScan = () => {
    setIsDemoModalOpen(true);
    setScanStep(1);
    setScanProgress(0);

    let current = 0;
    const interval = setInterval(() => {
      current += 15;
      if (current >= 100) {
        clearInterval(interval);
        setScanProgress(100);
        setScanStep(2);
      } else {
        setScanProgress(current);
      }
    }, 180);
  };

  const handleLaunchConsole = (view = 'overview') => {
    setMode('app');
    setCurrentView(view);
  };

  return (
    <div className="topdoo-landing topdoo-security-page">
      {/* 1. Header */}
      <MarketingHeader />

      {/* 2. Hero Section (Full-width edge-to-edge) */}
      <section className="security-hero-section full-width-hero">
        <img
          src="/bannerSecurity.png"
          alt="Topdoo Security Platform"
          className="security-hero-bg-img"
        />

        <div className="landing-container security-hero-container">
          {/* Breadcrumbs */}
          <div className="security-breadcrumbs">
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Trang chủ
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <button className="breadcrumb-link" onClick={() => navigateMarketing('home')}>
              Sản phẩm
            </button>
            <ChevronRight size={13} className="breadcrumb-arrow" />
            <span className="breadcrumb-current">Topdoo Security</span>
          </div>

          <div className="security-hero-grid">
            {/* Left Content Column */}
            <div className="security-hero-left">
              {/* Badge: TOPDOO SECURITY */}
              <div className="security-badge-pill">
                <div className="security-badge-icon-box">
                  <ShieldCheck size={14} color="#059669" />
                </div>
                <span>TOPDOO SECURITY AI</span>
              </div>

              {/* Title */}
              <h1 className="security-hero-title">
                Bảo vệ bạn trên <span className="security-title-emerald">không gian số</span>
              </h1>

              {/* Description */}
              <p className="security-hero-desc">
                Topdoo Security sử dụng AI để phát hiện, ngăn chặn và bảo vệ bạn khỏi các mối đe dọa trực tuyến. Giữ an toàn dữ liệu, danh tính và mọi hoạt động số của bạn — để bạn yên tâm sáng tạo và phát triển.
              </p>

              {/* CTA Buttons */}
              <div className="security-cta-group">
                <button
                  className="btn-security-primary"
                  onClick={() => navigateMarketing(user ? 'topdoo-plan-security' : 'topdoo-get-protect')}
                >
                  <span>{user ? 'Chọn gói bảo vệ ngay' : 'Bắt đầu bảo vệ ngay'}</span>
                  <ArrowRight size={16} />
                </button>
                <button
                  className="btn-security-video"
                  onClick={startLiveDemoScan}
                >
                  <div className="btn-video-icon-circle">
                    <Play size={11} fill="#059669" color="#059669" />
                  </div>
                  <span>Xem video mô phỏng</span>
                </button>
              </div>

              {/* Checkmarks Row */}
              <div className="security-checklist-row">
                <div className="security-check-item">
                  <div className="security-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Bảo mật toàn diện</span>
                </div>
                <div className="security-check-item">
                  <div className="security-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Phát hiện sớm với AI</span>
                </div>
                <div className="security-check-item">
                  <div className="security-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Hỗ trợ 24/7</span>
                </div>
                <div className="security-check-item">
                  <div className="security-check-dot">
                    <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                  </div>
                  <span>Được tin dùng bởi 10.000+ người</span>
                </div>
              </div>
            </div>

            {/* Right Column: Floating Artwork Highlights */}
            <div className="security-hero-right">
              {/* Floating Slogan calligraphy */}
              <div className="security-floating-slogan">
                <span>Your Security</span>
                <span>Our Priority</span>
              </div>

              {/* Floating Badges */}
              <div className="security-floating-badge float-ai-badge">
                <div className="security-float-icon chip-icon">
                  <span>AI</span>
                </div>
                <div className="security-float-text">
                  <span>AI phát hiện</span>
                  <span>mối đe dọa</span>
                </div>
              </div>

              <div className="security-floating-badge float-data-badge">
                <div className="security-float-icon lock-icon">
                  <Lock size={14} color="#FFFFFF" strokeWidth={2.5} />
                </div>
                <div className="security-float-text">
                  <span>Bảo vệ</span>
                  <span>dữ liệu cá nhân</span>
                </div>
              </div>

              <div className="security-floating-badge float-net-badge">
                <div className="security-float-icon globe-icon">
                  <Globe size={14} color="#FFFFFF" strokeWidth={2.5} />
                </div>
                <div className="security-float-text">
                  <span>An toàn khi</span>
                  <span>truy cập internet</span>
                </div>
              </div>

              <div className="security-floating-badge float-ident-badge">
                <div className="security-float-icon user-icon">
                  <Users size={14} color="#FFFFFF" strokeWidth={2.5} />
                </div>
                <div className="security-float-text">
                  <span>Bảo vệ danh tính</span>
                  <span>và tài khoản</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section: Stats & Testimonial Bar */}
      <section className="security-stats-section">
        <div className="landing-container">
          <div className="security-stats-bar">
            {/* 4 Metric items */}
            <div className="security-metric-item">
              <div className="security-metric-icon">
                <Users size={20} color="#059669" />
              </div>
              <div className="security-metric-content">
                <div className="security-metric-value">10.000+</div>
                <div className="security-metric-label">Người dùng tin tưởng</div>
              </div>
            </div>

            <div className="security-metric-item">
              <div className="security-metric-icon">
                <ShieldCheck size={20} color="#059669" />
              </div>
              <div className="security-metric-content">
                <div className="security-metric-value">99.9%</div>
                <div className="security-metric-label">Tỷ lệ phát hiện mối đe dọa</div>
              </div>
            </div>

            <div className="security-metric-item">
              <div className="security-metric-icon">
                <Headphones size={20} color="#059669" />
              </div>
              <div className="security-metric-content">
                <div className="security-metric-value">24/7</div>
                <div className="security-metric-label">Hỗ trợ toàn cầu</div>
              </div>
            </div>

            <div className="security-metric-item">
              <div className="security-metric-icon">
                <Globe size={20} color="#059669" />
              </div>
              <div className="security-metric-content">
                <div className="security-metric-value">50+</div>
                <div className="security-metric-label">Quốc gia và vùng lãnh thổ</div>
              </div>
            </div>

            {/* Testimonial Quote */}
            <div className="security-quote-item">
              <span className="security-quote-mark">“</span>
              <div className="security-quote-body">
                <p className="security-quote-text">
                  "Topdoo Security giúp chúng tôi yên tâm hơn khi làm việc và phát triển trên môi trường số."
                </p>
                <div className="security-quote-author">
                  <span className="author-name">Nguyễn Minh Đức</span>
                  <span className="author-role">CTO, Công ty ABC</span>
                </div>
              </div>
              <span className="security-quote-mark-end">”</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRẠM QUÉT AN NINH ĐA NĂNG (UNIVERSAL AI SECURITY SCANNER SUITE)
          ========================================================================= */}
      <section className="security-scanner-suite-section">
        <div className="landing-container">
          <div className="scanner-suite-card">
            {/* Header */}
            <div className="scanner-suite-header">
              <div className="scanner-header-badge">
                <Zap size={14} color="#059669" />
                <span>TOPDOO AI SCANNER ENGINE</span>
              </div>
              <h2 className="scanner-suite-title">Trạm kiểm tra an ninh mạng trực tiếp</h2>
              <p className="scanner-suite-subtitle">
                Phân tích rủi ro trong 5 giây với công nghệ AI & Threat Intelligence toàn cầu. Hãy kiểm tra ngay link lạ, tài khoản rò rỉ hoặc đo độ an toàn của bạn.
              </p>
            </div>

            {/* 4 Mode Tabs */}
            <div className="scanner-mode-tabs">
              {Object.keys(scanTabsMeta).map((tabKey) => {
                const TabIcon = scanTabsMeta[tabKey].icon;
                const isActive = activeScanTab === tabKey;
                return (
                  <button
                    key={tabKey}
                    type="button"
                    className={`scanner-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleTabChange(tabKey)}
                  >
                    <TabIcon size={16} />
                    <span>{scanTabsMeta[tabKey].name}</span>
                  </button>
                );
              })}
            </div>

            {/* Input Bar with Action Button */}
            <div className="scanner-input-box-wrapper">
              <div className="scanner-input-container">
                <div className="scanner-input-icon">
                  {React.createElement(scanTabsMeta[activeScanTab].icon, { size: 19, color: '#059669' })}
                </div>
                <input
                  type={activeScanTab === 'password' ? 'text' : 'text'}
                  className="scanner-main-input"
                  placeholder={scanTabsMeta[activeScanTab].placeholder}
                  value={scanInput}
                  onChange={(e) => setScanInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') executeLiveScan();
                  }}
                  disabled={isLiveScanning}
                />
                {scanInput && (
                  <button
                    type="button"
                    className="scanner-clear-btn"
                    onClick={() => setScanInput('')}
                    title="Xóa nội dung"
                  >
                    <X size={16} />
                  </button>
                )}
                <button
                  type="button"
                  className="scanner-action-btn"
                  onClick={() => executeLiveScan()}
                  disabled={isLiveScanning}
                >
                  {isLiveScanning ? (
                    <>
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Đang quét AI...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={17} />
                      <span>Quét an ninh ngay</span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick sample chips */}
              <div className="scanner-samples-row">
                <span className="sample-label">Mẫu kiểm tra nhanh:</span>
                {scanTabsMeta[activeScanTab].samples.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="sample-chip"
                    onClick={() => {
                      setScanInput(s.val);
                      executeLiveScan(s.val);
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scanning In-Progress Feedback */}
            {isLiveScanning && (
              <div className="scanner-scanning-box">
                <div className="scanning-bar-wrap">
                  <div className="scanning-bar-fill" style={{ width: `${liveScanProgress}%` }} />
                </div>
                <div className="scanning-meta-row">
                  <span className="scanning-step-text">
                    <RefreshCw size={13} className="inline-icon animate-spin" /> {scanStageText}
                  </span>
                  <span className="scanning-percent-text">{liveScanProgress}%</span>
                </div>
              </div>
            )}

            {/* SCORECARD RESULT */}
            {scanResult && !isLiveScanning && (
              <div className={`scanner-scorecard ${scanResult.status}`}>
                <div className="scorecard-top-row">
                  {/* Left: Gauge Score Circle */}
                  <div className="scorecard-gauge-box">
                    <div className="gauge-circle-outer">
                      <div className="gauge-score-num">{scanResult.score}</div>
                      <div className="gauge-score-total">/100</div>
                    </div>
                    <div className={`scorecard-status-badge ${scanResult.status}`}>
                      {scanResult.status === 'safe' && <CheckCircle2 size={14} />}
                      {scanResult.status === 'warning' && <AlertTriangle size={14} />}
                      {scanResult.status === 'danger' && <ShieldAlert size={14} />}
                      <span>{scanResult.statusLabel}</span>
                    </div>
                  </div>

                  {/* Right: Technical Summary & Metrics */}
                  <div className="scorecard-content-box">
                    <h3 className="scorecard-title">Kết quả đánh giá: {scanResult.target}</h3>
                    <p className="scorecard-summary">{scanResult.summary}</p>

                    {/* 1. VirusTotal & Live Domain Intelligence Section */}
                    {scanResult.virusTotal && (
                      <div className="vt-live-summary-card">
                        <div className="vt-server-infra-row">
                          <div className="infra-pill">
                            <Server size={14} className="infra-icon" />
                            <span className="infra-label">Máy chủ IP:</span>
                            <span className="infra-val font-mono">{scanResult.primaryIp}</span>
                            {scanResult.ipInfo && (
                              <span className="infra-geo">
                                {scanResult.ipInfo.flag || '🌐'} {scanResult.ipInfo.city ? `${scanResult.ipInfo.city}, ` : ''}{scanResult.ipInfo.country} ({scanResult.ipInfo.isp})
                              </span>
                            )}
                          </div>
                          {scanResult.domainInfo?.domainAgeText && (
                            <div className="infra-pill">
                              <Globe size={14} className="infra-icon" />
                              <span className="infra-label">Tuổi tên miền:</span>
                              <span className="infra-val">{scanResult.domainInfo.domainAgeText}</span>
                              {scanResult.domainInfo.registrar && (
                                <span className="infra-registrar">({scanResult.domainInfo.registrar})</span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* VirusTotal Vendor Bar */}
                        <div className={`vt-verdict-banner ${scanResult.virusTotal.detectedCount > 0 ? 'detected' : 'clean'}`}>
                          <div className="vt-verdict-left">
                            <div className={`vt-verdict-score-badge ${scanResult.virusTotal.detectedCount > 0 ? 'badge-detected' : 'badge-clean'}`}>
                              {scanResult.virusTotal.detectedCount > 0 ? <ShieldAlert size={18} /> : <ShieldCheck size={18} />}
                              <span>
                                {scanResult.virusTotal.detectedCount} / {scanResult.virusTotal.totalEngines}
                              </span>
                            </div>
                            <div className="vt-verdict-meta">
                              <div className="vt-verdict-title">
                                {scanResult.virusTotal.detectedCount > 0
                                  ? 'Cảnh báo: Có nhà cung cấp bảo mật phát hiện độc hại!'
                                  : '78/78 Hãng bảo mật quốc tế xác nhận an toàn (Chuẩn VirusTotal)'}
                              </div>
                              <div className="vt-verdict-sub">
                                {scanResult.virusTotal.detectedCount > 0
                                  ? `${scanResult.virusTotal.detectedCount} trên tổng số ${scanResult.virusTotal.totalEngines} động cơ Antivirus gắn nhãn trang web này là lừa đảo/độc hại.`
                                  : 'Google Safe Browsing, Kaspersky, Bitdefender, Microsoft Defender, Bkav Pro, Viettel Threat Intelligence...'}
                              </div>
                              {scanResult.virusTotal.detectedCount > 0 && (
                                <div className="mt-2 text-xs opacity-90 flex items-center gap-1 border border-red-200 bg-red-50 text-red-700 px-2 py-1 rounded w-fit">
                                  <ExternalLink size={12} />
                                  <span>Nguồn căn cứ: <strong>VirusTotal & Các hãng bảo mật toàn cầu</strong></span>
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn-toggle-vt-engines"
                            onClick={() => setShowVtEnginesList(!showVtEnginesList)}
                          >
                            <span>{showVtEnginesList ? 'Thu gọn danh sách hãng' : 'Chi tiết 78 Antivirus'}</span>
                            {showVtEnginesList ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </div>

                        {/* Expanded 78 Engines Grid */}
                        {showVtEnginesList && (
                          <div className="vt-engines-collapsible">
                            <div className="vt-engines-grid">
                              {scanResult.virusTotal.engines.map((eng, idx) => (
                                <div key={idx} className={`vt-engine-tile ${eng.detected ? 'is-detected' : 'is-clean'}`}>
                                  <div className="vt-engine-name">{eng.name}</div>
                                  <div className="vt-engine-status">
                                    {eng.detected ? (
                                      <>
                                        <ShieldAlert size={12} className="vt-icon-danger" />
                                        <span>{eng.category}</span>
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle2 size={12} className="vt-icon-clean" />
                                        <span>Sạch sẽ (Clean)</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 2. CheckScam.vn Alert Block */}
                    {scanResult.type === 'checkscam' && (
                      <div className={`checkscam-banner-card ${scanResult.scamData ? 'scam-detected' : 'scam-clean'}`}>
                        {scanResult.scamData ? (
                          <div className="checkscam-danger-content">
                            <div className="checkscam-header-row">
                              <div className="checkscam-badge-danger">
                                <ShieldAlert size={18} />
                                <span>CẢNH BÁO LỪA ĐẢO TỪ HỆ THỐNG CHECKSCAM.VN</span>
                              </div>
                              <span className="checkscam-report-tag">
                                <Users size={13} /> {scanResult.scamData.reportCount} Nạn nhân đã tố cáo
                              </span>
                            </div>

                            <div className="checkscam-details-grid">
                              <div className="cs-detail-item">
                                <span className="cs-lbl">Chủ tài khoản:</span>
                                <span className="cs-val text-red font-mono font-bold">{scanResult.scamData.accountHolder || 'Chưa định danh'}</span>
                              </div>
                              <div className="cs-detail-item">
                                <span className="cs-lbl">Ngân hàng / Đơn vị:</span>
                                <span className="cs-val font-semibold">{scanResult.scamData.bankName || scanResult.scamData.carrier}</span>
                              </div>
                              <div className="cs-detail-item">
                                <span className="cs-lbl">Số tài khoản / SĐT:</span>
                                <span className="cs-val font-mono font-bold">{scanResult.scamData.accountNumber || scanResult.scamData.phoneNumber}</span>
                              </div>
                              {scanResult.scamData.totalDamage && (
                                <div className="cs-detail-item">
                                  <span className="cs-lbl">Thiệt hại ghi nhận:</span>
                                  <span className="cs-val text-red font-bold">{scanResult.scamData.totalDamage}</span>
                                </div>
                              )}
                            </div>

                            <div className="checkscam-modus-box">
                              <div className="cs-modus-title">
                                <AlertTriangle size={14} color="#DC2626" />
                                <span>Thủ đoạn lừa đảo & hành vi ghi nhận:</span>
                              </div>
                              <p className="cs-modus-desc">{scanResult.scamData.details}</p>
                            </div>

                            <div className="checkscam-police-notice">
                              <div className="flex items-start gap-2">
                                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                                <div>
                                  <span className="block mb-1">
                                    Khuyến cáo khẩn: Cục An Toàn Thông Tin & Bộ Công An cảnh báo người dân <strong>TUYỆT ĐỐI KHÔNG CHUYỂN TIỀN</strong> tới tài khoản này!
                                  </span>
                                  <div className="text-xs opacity-90 flex items-center gap-1 mt-2 bg-red-100 text-red-800 px-2 py-1 rounded w-fit">
                                    <ExternalLink size={12} />
                                    <span>Căn cứ chứng minh: <strong>Hệ thống CheckScam.vn</strong> & <strong>Tín Nhiệm Mạng Quốc Gia (khonggianmang.vn)</strong></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="checkscam-clean-content">
                            <div className="checkscam-clean-header">
                              <div className="checkscam-badge-clean">
                                <CheckCircle2 size={18} />
                                <span>TÍN NHIỆM CHECKSCAM.VN: CHƯA CÓ BÁO CÁO LỪA ĐẢO</span>
                              </div>
                              <span className="cs-clean-tag">Cơ sở dữ liệu sạch</span>
                            </div>
                            <p className="checkscam-clean-desc">
                              Mục tiêu <code>{scanResult.target}</code> chưa từng bị phản ánh lừa đảo chiếm đoạt tài sản trên hệ thống CheckScam.vn hoặc cơ sở dữ liệu Tín Nhiệm Mạng Quốc Gia. Hãy luôn gọi video xác nhận chính chủ trước khi giao dịch giá trị lớn.
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 3. HaveIBeenPwned Dark Web Password Breach Card */}
                    {scanResult.type === 'password' && (
                      <div className={`password-breach-card ${scanResult.pwnedCount > 0 ? 'is-pwned' : 'is-safe'}`}>
                        {scanResult.pwnedCount > 0 ? (
                          <div className="pw-breach-content">
                            <div className="pw-breach-header">
                              <div className="pw-breach-badge danger">
                                <Lock size={16} />
                                <span>ĐÃ BỊ RÒ RỈ {scanResult.pwnedCount.toLocaleString('vi-VN')} LẦN TRÊN DARK WEB</span>
                              </div>
                              <span className="pw-privacy-tag">
                                <ShieldCheck size={13} /> Bảo vệ quyền riêng tư k-Anonymity (SHA-1)
                              </span>
                            </div>
                            <div className="pw-breach-stats-grid">
                              <div className="pw-stat-box">
                                <span className="pw-stat-lbl">Thời gian bẻ khóa máy tính:</span>
                                <span className="pw-stat-val text-red font-bold">{scanResult.crackTimeText}</span>
                              </div>
                              <div className="pw-stat-box">
                                <span className="pw-stat-lbl">Độ phức tạp (Entropy):</span>
                                <span className="pw-stat-val font-semibold">{scanResult.entropy} bits</span>
                              </div>
                              <div className="pw-stat-box">
                                <span className="pw-stat-lbl">Độ dài mật khẩu:</span>
                                <span className="pw-stat-val">{scanResult.length} ký tự</span>
                              </div>
                            </div>
                            <div className="pw-alert-callout">
                              <div className="flex items-start gap-2">
                                <AlertTriangle size={15} color="#DC2626" className="mt-0.5 shrink-0" />
                                <div>
                                  <span className="block mb-1">
                                    Mật khẩu này đã bị lộ trong các vụ hack cơ sở dữ liệu thế giới. Tin tặc có thể dùng phương thức Credential Stuffing để tự động đăng nhập tài khoản của bạn.
                                  </span>
                                  <div className="text-xs opacity-90 flex items-center gap-1 mt-2 bg-red-100 text-red-800 px-2 py-1 rounded w-fit">
                                    <ExternalLink size={12} />
                                    <span>Nguồn trích dẫn: Cơ sở dữ liệu rò rỉ toàn cầu <strong>HaveIBeenPwned (Troy Hunt)</strong></span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="pw-safe-content">
                            <div className="pw-breach-header">
                              <div className="pw-breach-badge safe">
                                <CheckCircle2 size={16} />
                                <span>CHƯA TỪNG BỊ RÒ RỈ TRÊN DARK WEB</span>
                              </div>
                              <span className="pw-privacy-tag">
                                <ShieldCheck size={13} /> Đối chiếu 900+ Triệu tài khoản HaveIBeenPwned
                              </span>
                            </div>
                            <div className="pw-breach-stats-grid">
                              <div className="pw-stat-box">
                                <span className="pw-stat-lbl">Thời gian bẻ khóa ước tính:</span>
                                <span className="pw-stat-val text-emerald font-bold">{scanResult.crackTimeText}</span>
                              </div>
                              <div className="pw-stat-box">
                                <span className="pw-stat-lbl">Độ phức tạp Entropy:</span>
                                <span className="pw-stat-val font-semibold">{scanResult.entropy} bits (Rất mạnh)</span>
                              </div>
                              <div className="pw-stat-box">
                                <span className="pw-stat-lbl">Độ dài mật khẩu:</span>
                                <span className="pw-stat-val">{scanResult.length} ký tự</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* 4. Real GeoIP Card */}
                    {scanResult.type === 'ip' && scanResult.geo && (
                      <div className="geoip-card">
                        <div className="geoip-header">
                          <div className="geoip-badge">
                            <MapPin size={16} />
                            <span>Vị trí địa lý máy chủ IP: {scanResult.geo.city || 'Khu vực'}, {scanResult.geo.country} {scanResult.geo.flag?.emoji || ''}</span>
                          </div>
                        </div>
                        <div className="geoip-grid">
                          <div className="geoip-item">
                            <span className="geoip-lbl">Nhà mạng / ISP:</span>
                            <span className="geoip-val">{scanResult.geo.connection?.isp || scanResult.geo.connection?.org || 'N/A'}</span>
                          </div>
                          <div className="geoip-item">
                            <span className="geoip-lbl">Hệ số tự trị ASN:</span>
                            <span className="geoip-val font-mono">AS{scanResult.geo.connection?.asn || 'N/A'}</span>
                          </div>
                          <div className="geoip-item">
                            <span className="geoip-lbl">Tọa độ địa lý:</span>
                            <span className="geoip-val font-mono">{scanResult.geo.latitude}, {scanResult.geo.longitude}</span>
                          </div>
                          <div className="geoip-item">
                            <span className="geoip-lbl">Múi giờ:</span>
                            <span className="geoip-val">{scanResult.geo.timezone?.id || 'UTC'}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="scorecard-metrics-grid">
                      {scanResult.metrics.map((m, idx) => (
                        <div key={idx} className={`metric-tile ${m.pass ? 'pass' : 'fail'}`}>
                          <div className="metric-tile-header">
                            <span className="metric-tile-label">{m.label}</span>
                            <span className={`metric-status-tag ${m.pass ? 'tag-pass' : 'tag-fail'}`}>
                              {m.pass ? 'ĐẠT' : 'CẢNH BÁO'}
                            </span>
                          </div>
                          <div className="metric-tile-val">{m.val}</div>
                        </div>
                      ))}
                    </div>

                    <div className="scorecard-recommendation-box">
                      <div className="recom-title">
                        <Sparkles size={14} color="#059669" />
                        <span>Khuyến nghị của Topdoo AI:</span>
                      </div>
                      <p className="recom-text">{scanResult.recommendation}</p>
                    </div>

                    <div className="scorecard-actions-row">
                      <button
                        type="button"
                        className="btn-scorecard-action primary"
                        onClick={() => navigateMarketing(user ? 'topdoo-plan-security' : 'topdoo-get-protect')}
                      >
                        <ShieldCheck size={15} />
                        <span>{user ? 'Kích hoạt bảo vệ tài khoản' : 'Bắt đầu dùng thử miễn phí'}</span>
                      </button>
                      <button
                        type="button"
                        className="btn-scorecard-action outline"
                        onClick={() => {
                          showToast('Báo cáo phân tích', 'Báo cáo an ninh chi tiết đã được gửi đến clipboard của bạn.', 'info');
                          navigator.clipboard?.writeText?.(JSON.stringify(scanResult, null, 2));
                        }}
                      >
                        <Copy size={14} />
                        <span>Sao chép báo cáo</span>
                      </button>
                      <button
                        type="button"
                        className="btn-scorecard-action ghost"
                        onClick={() => setScanResult(null)}
                      >
                        <span>Quét mục tiêu khác</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
          RADAR AN NINH & LIVE THREAT FEED THỜI GIAN THỰC
          ========================================================================= */}
      <section className="security-radar-section">
        <div className="landing-container">
          <div className="radar-section-grid">
            {/* Left: Radar Visualizer */}
            <div className="radar-visual-card">
              <div className="radar-card-header">
                <div className="radar-pulse-dot" />
                <span className="radar-header-label">TOPDOO THREAT RADAR 360° (LIVE)</span>
              </div>

              {/* Animated Radar Canvas */}
              <div className="radar-circle-container">
                <div className="radar-sweep-arm" />
                <div className="radar-concentric-circle circle-1" />
                <div className="radar-concentric-circle circle-2" />
                <div className="radar-concentric-circle circle-3" />
                <div className="radar-axis-line horizontal" />
                <div className="radar-axis-line vertical" />

                {/* Threat Blips */}
                <div className="radar-blip blip-1" title="Phishing Domain detected" />
                <div className="radar-blip blip-2" title="Malware signature intercepted" />
                <div className="radar-blip blip-3" title="Botnet scan blocked" />
                <div className="radar-blip blip-safe" title="Your Current Endpoint (Safe)" />

                <div className="radar-center-shield">
                  <ShieldCheck size={24} color="#059669" />
                </div>
              </div>

              <div className="radar-stats-trio">
                <div className="radar-trio-item">
                  <span className="trio-val text-emerald">1.482+</span>
                  <span className="trio-lbl">Mối đe dọa bị chặn (24h)</span>
                </div>
                <div className="radar-trio-item">
                  <span className="trio-val text-emerald">99.98%</span>
                  <span className="trio-lbl">Độ chính xác AI</span>
                </div>
                <div className="radar-trio-item">
                  <span className="trio-val text-emerald">12ms</span>
                  <span className="trio-lbl">Tốc độ phản ứng</span>
                </div>
              </div>
            </div>

            {/* Right: Live Threat Stream Ticker */}
            <div className="radar-feed-card">
              <div className="feed-header-row">
                <div className="feed-title-box">
                  <Radio size={16} color="#059669" className="animate-pulse" />
                  <h3 className="feed-title">Luồng cảnh báo an ninh thời gian thực</h3>
                </div>
                <span className="feed-badge-live">LIVE FEED</span>
              </div>

              <p className="feed-sub">
                Cập nhật các cuộc tấn công lừa đảo, rò rỉ dữ liệu và mã độc vừa được hệ sinh thái Topdoo AI vô hiệu hóa tại Việt Nam và toàn cầu:
              </p>

              <div className="threat-incident-list">
                <div className="threat-incident-item danger">
                  <div className="incident-icon-pill red">
                    <ShieldAlert size={14} />
                  </div>
                  <div className="incident-content">
                    <div className="incident-title-row">
                      <span className="incident-title">Chặn tên miền Phishing mạo danh ngân hàng</span>
                      <span className="incident-time">Vừa xong</span>
                    </div>
                    <div className="incident-desc">
                      Tên miền <code>vcb-online-digibank.top</code> bị chặn khi đang gửi tin nhắn mồi nhử cho người dùng.
                    </div>
                  </div>
                </div>

                <div className="threat-incident-item warning">
                  <div className="incident-icon-pill yellow">
                    <AlertTriangle size={14} />
                  </div>
                  <div className="incident-content">
                    <div className="incident-title-row">
                      <span className="incident-title">Phát hiện 280 tài khoản rò rỉ từ đợt tấn công sàn TMĐT</span>
                      <span className="incident-time">2 phút trước</span>
                    </div>
                    <div className="incident-desc">
                      Gửi thông báo cảnh báo tức thì cho các chủ tài khoản bị ảnh hưởng để kích hoạt đổi mật khẩu.
                    </div>
                  </div>
                </div>

                <div className="threat-incident-item safe">
                  <div className="incident-icon-pill green">
                    <CheckCircle2 size={14} />
                  </div>
                  <div className="incident-content">
                    <div className="incident-title-row">
                      <span className="incident-title">Bảo vệ an toàn 24.500 lượt giao dịch số</span>
                      <span className="incident-time">5 phút trước</span>
                    </div>
                    <div className="incident-desc">
                      Tường lửa Topdoo Zero-Trust xác thực thành công cho các phiên làm việc doanh nghiệp.
                    </div>
                  </div>
                </div>

                <div className="threat-incident-item danger">
                  <div className="incident-icon-pill red">
                    <Flame size={14} />
                  </div>
                  <div className="incident-content">
                    <div className="incident-title-row">
                      <span className="incident-title">Chặn tệp đính kèm chứa Trojan tống tiền</span>
                      <span className="incident-time">11 phút trước</span>
                    </div>
                    <div className="incident-desc">
                      Tệp độc hại ngụy trang <code>HoaDon_Thue_Q4.pdf.exe</code> bị cách ly trước khi mở.
                    </div>
                  </div>
                </div>
              </div>

              {/* Console bridge link */}
              <div className="radar-feed-footer">
                <button
                  type="button"
                  className="btn-feed-console"
                  onClick={() => handleLaunchConsole('alerts')}
                >
                  <span>Xem trung tâm giám sát đầy đủ trong SecOps Console</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Section: Tính năng nổi bật */}
      <section className="security-features-section">
        <div className="landing-container">
          <div className="security-features-header">
            <div>
              <h2 className="security-section-title">Tính năng nổi bật</h2>
              <p className="security-section-sub">Giải pháp bảo mật toàn diện với công nghệ AI tiên tiến</p>
            </div>
            <button
              className="security-link-more"
              onClick={() => handleLaunchConsole('overview')}
            >
              <span>Xem tất cả tính năng</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="security-features-grid">
            {/* Feature 1 */}
            <div
              className="security-feature-card"
              onClick={() => handleLaunchConsole('quick-check')}
            >
              <div className="security-feat-icon-box">
                <Search size={20} color="#059669" />
              </div>
              <h3 className="security-feat-card-title">Phát hiện mối đe dọa AI</h3>
              <p className="security-feat-card-desc">
                Sử dụng AI để phát hiện và ngăn chặn mã độc, phishing, ransomware theo thời gian thực.
              </p>
            </div>

            {/* Feature 2 */}
            <div
              className="security-feature-card"
              onClick={() => handleLaunchConsole('data-privacy')}
            >
              <div className="security-feat-icon-box">
                <Lock size={20} color="#059669" />
              </div>
              <h3 className="security-feat-card-title">Bảo vệ dữ liệu cá nhân</h3>
              <p className="security-feat-card-desc">
                Mã hóa và giám sát dữ liệu để ngăn rò rỉ thông tin quan trọng trên Dark Web.
              </p>
            </div>

            {/* Feature 3 */}
            <div
              className="security-feature-card"
              onClick={() => handleLaunchConsole('quick-check')}
            >
              <div className="security-feat-icon-box">
                <Globe size={20} color="#059669" />
              </div>
              <h3 className="security-feat-card-title">An toàn khi truy cập</h3>
              <p className="security-feat-card-desc">
                Bảo vệ bạn khi truy cập website, tải tệp và sử dụng mạng Wi-Fi công cộng.
              </p>
            </div>

            {/* Feature 4 */}
            <div
              className="security-feature-card"
              onClick={() => handleLaunchConsole('iam')}
            >
              <div className="security-feat-icon-box">
                <UserCheck size={20} color="#059669" />
              </div>
              <h3 className="security-feat-card-title">Bảo vệ danh tính số</h3>
              <p className="security-feat-card-desc">
                Phát hiện và cảnh báo các hành vi giả mạo, đánh cắp tài khoản và lừa đảo danh tính.
              </p>
            </div>

            {/* Feature 5 */}
            <div
              className="security-feature-card"
              onClick={() => handleLaunchConsole('monitoring')}
            >
              <div className="security-feat-icon-box">
                <Settings size={20} color="#059669" />
              </div>
              <h3 className="security-feat-card-title">Giám sát liên tục 24/7</h3>
              <p className="security-feat-card-desc">
                Theo dõi hệ thống theo thời gian thực, cảnh báo ngay lập tức qua SMS/Telegram/Email.
              </p>
            </div>

            {/* Feature 6 */}
            <div
              className="security-feature-card"
              onClick={() => handleLaunchConsole('reports')}
            >
              <div className="security-feat-icon-box">
                <FileText size={20} color="#059669" />
              </div>
              <h3 className="security-feat-card-title">Báo cáo bảo mật</h3>
              <p className="security-feat-card-desc">
                Cung cấp báo cáo chuyên sâu, chỉ số bảo mật và đề xuất giải pháp tối ưu cho bạn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CẦU NỐI SECOPS ENTERPRISE CONSOLE
          ========================================================================= */}
      <section className="security-secops-bridge-section">
        <div className="landing-container">
          <div className="secops-bridge-card">
            <div className="secops-bridge-left">
              <div className="secops-bridge-badge">
                <Terminal size={14} color="#059669" />
                <span>DÀNH CHO DOANH NGHIỆP & SEC-OPS</span>
              </div>
              <h3 className="secops-bridge-title">Cần bảng điều khiển chuyên sâu cho toàn bộ tổ chức?</h3>
              <p className="secops-bridge-desc">
                Topdoo SecOps Console cung cấp trung tâm giám sát SIEM, cơ sở dữ liệu lừa đảo quốc gia, quản lý chứng cứ và tích hợp API bảo mật tự động hóa cho các hệ thống của bạn.
              </p>
              <div className="secops-bridge-actions">
                <button
                  type="button"
                  className="btn-secops-primary"
                  onClick={() => handleLaunchConsole('overview')}
                >
                  <Activity size={16} />
                  <span>Mở Topdoo SecOps Console</span>
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  className="btn-secops-secondary"
                  onClick={() => handleLaunchConsole('scam-database')}
                >
                  <DatabaseIcon size={16} />
                  <span>Tra cứu Scam Database</span>
                </button>
              </div>
            </div>
            <div className="secops-bridge-right">
              <div className="secops-terminal-preview">
                <div className="terminal-header">
                  <div className="terminal-dots">
                    <span className="dot red" />
                    <span className="dot yellow" />
                    <span className="dot green" />
                  </div>
                  <span className="terminal-title">topdoo-secops-agent --daemon</span>
                </div>
                <div className="terminal-code-body">
                  <div className="term-line green">$ topdoo-agent scan --all-endpoints</div>
                  <div className="term-line">[AI Engine] Active threats monitored: 12.490</div>
                  <div className="term-line">[Zero-Trust] Firewall rules: ENFORCED</div>
                  <div className="term-line">[SIEM Webhook] Telegram / Slack connected</div>
                  <div className="term-line green">[Status] All systems operational (100% OK)</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: Security Showcase & Target Audience */}
      <section className="security-showcase-section">
        <div className="landing-container">
          <div className="security-showcase-grid">
            {/* Left 60%: Interactive Security Showcase Card */}
            <div className="security-feature-showcase-card">
              <img
                src="/securityFeature.png"
                alt="Topdoo Security Laptop Showcase"
                className="security-feature-bg-img"
              />

              <div className="security-feature-overlay-content">
                <h3 className="showcase-title">
                  Chủ động bảo vệ,<br />
                  an tâm từng kết nối
                </h3>

                <div className="showcase-checklist">
                  <div className="showcase-check-item">
                    <div className="showcase-check-dot">
                      <Check size={12} strokeWidth={3.5} color="#FFFFFF" />
                    </div>
                    <span>Quét toàn bộ thiết bị</span>
                  </div>
                  <div className="showcase-check-item">
                    <div className="showcase-check-dot">
                      <Check size={12} strokeWidth={3.5} color="#FFFFFF" />
                    </div>
                    <span>Phát hiện rủi ro theo thời gian thực</span>
                  </div>
                  <div className="showcase-check-item">
                    <div className="showcase-check-dot">
                      <Check size={12} strokeWidth={3.5} color="#FFFFFF" />
                    </div>
                    <span>Đề xuất cách xử lý</span>
                  </div>
                  <div className="showcase-check-item">
                    <div className="showcase-check-dot">
                      <Check size={12} strokeWidth={3.5} color="#FFFFFF" />
                    </div>
                    <span>Một giao diện, toàn bộ bảo mật</span>
                  </div>
                </div>

                <button
                  className="btn-showcase-demo"
                  onClick={startLiveDemoScan}
                >
                  <span>Xem demo trực tiếp</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Right 40%: Phù hợp cho mọi đối tượng */}
            <div className="security-audience-card">
              <h3 className="audience-title">Phù hợp cho mọi đối tượng</h3>

              <div className="audience-list">
                {/* 1. Cá nhân */}
                <div
                  className="audience-item"
                  onClick={() => showToast('Cá nhân', 'Khám phá các tính năng bảo mật toàn diện cho tài khoản cá nhân!', 'info')}
                >
                  <div className="audience-icon-box">
                    <User size={18} color="#059669" />
                  </div>
                  <div className="audience-content">
                    <h4 className="audience-item-title">Cá nhân</h4>
                    <p className="audience-item-desc">
                      Bảo vệ tài khoản, dữ liệu và danh tính cá nhân khi mua sắm, lướt web.
                    </p>
                  </div>
                </div>

                {/* 2. Doanh nghiệp */}
                <div
                  className="audience-item"
                  onClick={() => showToast('Doanh nghiệp', 'Giải pháp bảo vệ toàn diện hệ thống thông tin và dữ liệu doanh nghiệp!', 'info')}
                >
                  <div className="audience-icon-box">
                    <Building2 size={18} color="#059669" />
                  </div>
                  <div className="audience-content">
                    <h4 className="audience-item-title">Doanh nghiệp</h4>
                    <p className="audience-item-desc">
                      Bảo vệ toàn diện hệ thống, dữ liệu khách hàng và tuân thủ các tiêu chuẩn bảo mật.
                    </p>
                  </div>
                </div>

                {/* 3. Đội ngũ kỹ thuật / Developer */}
                <div
                  className="audience-item"
                  onClick={() => handleLaunchConsole('overview')}
                >
                  <div className="audience-icon-box">
                    <Laptop size={18} color="#059669" />
                  </div>
                  <div className="audience-content">
                    <h4 className="audience-item-title">Đội ngũ kỹ thuật</h4>
                    <p className="audience-item-desc">
                      Công cụ mạnh mẽ, API bảo mật và tích hợp dễ dàng vào quy trình phát triển.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: FAQ */}
      <section className="security-faq-section">
        <div className="landing-container">
          <div className="security-faq-header">
            <h2 className="security-faq-title">Câu hỏi thường gặp</h2>
            <p className="security-faq-subtitle">Giải đáp thắc mắc về Topdoo Security</p>
          </div>

          <div className="security-faq-grid">
            <div className="security-faq-card">
              <h4 className="faq-question">Topdoo Security hoạt động như thế nào?</h4>
              <p className="faq-answer">
                Topdoo Security sử dụng mô hình học máy (Machine Learning) tiên tiến để phân tích hành vi, phát hiện bất thường và chủ động ngăn chặn các mối đe dọa ngay khi chúng xuất hiện.
              </p>
            </div>

            <div className="security-faq-card">
              <h4 className="faq-question">Dữ liệu của tôi có được an toàn không?</h4>
              <p className="faq-answer">
                Chúng tôi áp dụng mã hóa đầu cuối (End-to-End Encryption) chuẩn quân sự AES-256 và tuân thủ nghiêm ngặt các tiêu chuẩn bảo mật quốc tế ISO 27001 và SOC 2.
              </p>
            </div>

            <div className="security-faq-card">
              <h4 className="faq-question">Tôi có thể dùng thử miễn phí không?</h4>
              <p className="faq-answer">
                Có, Topdoo cung cấp gói trải nghiệm miễn phí trọn đời cho các tính năng quét cơ bản và 14 ngày trải nghiệm đầy đủ các tính năng nâng cao không cần thẻ tín dụng.
              </p>
            </div>

            <div className="security-faq-card">
              <h4 className="faq-question">Làm thế nào để nhận hỗ trợ khi gặp sự cố?</h4>
              <p className="faq-answer">
                Đội ngũ kỹ sư an ninh thông tin của Topdoo luôn sẵn sàng 24/7 qua cổng hỗ trợ trực tuyến, điện thoại và email khẩn cấp cho tất cả người dùng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom CTA Banner */}
      <section className="security-bottom-cta-section">
        <div className="landing-container">
          <div className="security-bottom-cta-card">
            <div className="bottom-cta-left">
              <div className="bottom-cta-icon-box">
                <ShieldCheck size={28} color="#059669" />
              </div>
              <div className="bottom-cta-text-wrap">
                <h3 className="bottom-cta-title">Sẵn sàng bảo vệ thế giới số của bạn?</h3>
                <p className="bottom-cta-sub">Hãy để Topdoo Security AI đồng hành bảo vệ dữ liệu và danh tính của bạn ngay hôm nay.</p>
              </div>
            </div>

            <div className="bottom-cta-actions">
              <button
                className="btn-bottom-cta-primary"
                onClick={() => navigateMarketing(user ? 'topdoo-plan-security' : 'topdoo-get-protect')}
              >
                <span>{user ? 'Chọn gói bảo vệ' : 'Bắt đầu miễn phí'}</span>
                <ArrowRight size={15} />
              </button>
              <button
                className="btn-bottom-cta-secondary"
                onClick={() => navigateMarketing('topdoo-contact')}
              >
                <span>Liên hệ tư vấn</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive Live Demo Modal */}
      {isDemoModalOpen && (
        <div className="security-demo-modal-backdrop" onClick={() => setIsDemoModalOpen(false)}>
          <div className="security-demo-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="security-demo-modal-close" onClick={() => setIsDemoModalOpen(false)}>
              <X size={18} />
            </button>

            <div className="security-demo-modal-header">
              <div className="demo-header-badge">
                <ShieldCheck size={16} color="#059669" />
                <span>TOPDOO SECURITY DEMO</span>
              </div>
              <h3 className="demo-modal-title">Mô phỏng Quét An Ninh Hệ Thống AI</h3>
              <p className="demo-modal-subtitle">Trải nghiệm khả năng quét thời gian thực của Topdoo Security</p>
            </div>

            <div className="security-demo-scan-body">
              {scanStep === 1 && (
                <div className="scan-in-progress">
                  <div className="scan-radar-circle">
                    <RefreshCw size={36} className="scan-spin-icon" color="#059669" />
                  </div>
                  <div className="scan-progress-label">Đang phân tích các luồng kết nối số...</div>
                  <div className="scan-progress-bar-wrap">
                    <div className="scan-progress-bar-fill" style={{ width: `${scanProgress}%` }} />
                  </div>
                  <div className="scan-progress-percent">{scanProgress}%</div>
                  <div className="scan-items-checklist">
                    <div className={`scan-check-row ${scanProgress > 25 ? 'done' : ''}`}>
                      <CheckCircle2 size={14} color={scanProgress > 25 ? '#059669' : '#94A3B8'} />
                      <span>Kiểm tra tệp tin hệ thống và mã độc ngầm</span>
                    </div>
                    <div className={`scan-check-row ${scanProgress > 50 ? 'done' : ''}`}>
                      <CheckCircle2 size={14} color={scanProgress > 50 ? '#059669' : '#94A3B8'} />
                      <span>Quét URL & phát hiện kết nối lừa đảo phishing</span>
                    </div>
                    <div className={`scan-check-row ${scanProgress > 75 ? 'done' : ''}`}>
                      <CheckCircle2 size={14} color={scanProgress > 75 ? '#059669' : '#94A3B8'} />
                      <span>Kiểm tra rò rỉ dữ liệu mật khẩu cá nhân</span>
                    </div>
                    <div className={`scan-check-row ${scanProgress >= 100 ? 'done' : ''}`}>
                      <CheckCircle2 size={14} color={scanProgress >= 100 ? '#059669' : '#94A3B8'} />
                      <span>Tối ưu hóa tường lửa AI đa lớp 24/7</span>
                    </div>
                  </div>
                </div>
              )}

              {scanStep === 2 && (
                <div className="scan-completed-state">
                  <div className="scan-success-badge">
                    <ShieldCheck size={48} color="#059669" />
                  </div>
                  <h4 className="scan-success-title">Thiết bị & Kết nối của bạn an toàn!</h4>
                  <p className="scan-success-desc">
                    Hệ thống AI đã hoàn tất quét 42.890 tệp tin, 12 cổng mạng và phát hiện 0 mối đe dọa.
                  </p>
                  <div className="scan-summary-grid">
                    <div className="summary-stat-box">
                      <div className="stat-num text-emerald">0</div>
                      <div className="stat-text">Mã độc</div>
                    </div>
                    <div className="summary-stat-box">
                      <div className="stat-num text-emerald">0</div>
                      <div className="stat-text">Phishing</div>
                    </div>
                    <div className="summary-stat-box">
                      <div className="stat-num text-emerald">0</div>
                      <div className="stat-text">Ransomware</div>
                    </div>
                    <div className="summary-stat-box">
                      <div className="stat-num text-emerald">An toàn</div>
                      <div className="stat-text">Trạng thái</div>
                    </div>
                  </div>

                  <div className="scan-modal-actions">
                    <button
                      className="btn-modal-console"
                      onClick={() => {
                        setIsDemoModalOpen(false);
                        handleLaunchConsole('overview');
                      }}
                    >
                      <span>Mở Security Console</span>
                      <ArrowRight size={15} />
                    </button>
                    <button
                      className="btn-modal-close-outline"
                      onClick={() => setIsDemoModalOpen(false)}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 9. Footer */}
      <MarketingFooter />
    </div>
  );
}

// Small helper for Database icon if not in lucide
function DatabaseIcon(props) {
  return (
    <svg width={props.size || 16} height={props.size || 16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5V19A9 3 0 0 0 21 19V5" />
      <path d="M3 12A9 3 0 0 0 21 12" />
    </svg>
  );
}
