import React, { useState, useRef, useEffect } from 'react';
import {
  Shield,
  Zap,
  Globe,
  Fish,
  Database,
  Share2,
  Bookmark,
  Activity,
  FileCheck,
  CheckCircle2,
  Percent,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Terminal,
  Lock,
  Layers,
  Search,
  Check,
  HelpCircle,
  Play,
  Sparkles,
  Bot,
  Feather,
  Box,
  Code2,
  MessageSquare,
  Image as ImageIcon,
  Video,
  Mic,
  FileText,
  Scan,
  Compass,
  Laptop,
  Briefcase,
  Camera,
  GraduationCap,
  Users,
  Eye,
  AlertTriangle,
  LifeBuoy,
  BookOpen,
  Flag,
  Copy,
  ChevronRight,
  LayoutGrid,
  Tag,
  TrendingUp,
  Settings,
  ShieldCheck,
  Link2,
  Bug,
  Cloud,
  BarChart3
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function PublicWebsite() {
  const { setMode, setCurrentView, runQuickCheck, showToast, navigateMarketing, openAuthModal, user } = useSecurity();

  const [codeTab, setCodeTab] = useState('python');
  const [copiedCode, setCopiedCode] = useState(false);

  const launchSecurityConsole = (targetView = 'overview') => {
    setMode('app');
    setCurrentView(targetView);
  };

  const codeSnippets = {
    python: `from topdoo import Topdoo
client = Topdoo(api_key="YOUR_API_KEY")

response = client.chat.create(
    model="TOPDOO-1",
    messages=[{"role": "user", "content": "Hello, Topdoo!"}]
)
print(response.choices[0].message.content)`,

    javascript: `import { Topdoo } from '@topdoo/sdk';
const client = new Topdoo({ apiKey: process.env.TOPDOO_API_KEY });

const response = await client.chat.create({
  model: 'TOPDOO-1',
  messages: [{ role: 'user', content: 'Hello, Topdoo!' }]
});
console.log(response.choices[0].message.content);`,

    curl: `curl -X POST https://api.topdoo.com/v1/chat/completions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "TOPDOO-1",
    "messages": [{"role": "user", "content": "Hello, Topdoo!"}]
  }'`
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippets[codeTab]);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
    showToast('Code Copied', 'API code snippet copied to clipboard.', 'success');
  };

  return (
    <div className="topdoo-landing">
      <MarketingHeader />

      {/* =========================================================================
          2. HERO SECTION
          ========================================================================= */}
      <section className="landing-hero-section">
        <div className="landing-hero-inner">
          {/* Left Text Column */}
          <div className="landing-hero-content">
            <h1 className="hero-main-title">
              <span className="hero-highlight-ai">AI</span> toàn diện<br />
              cho sáng tạo, năng suất<br />
              và an toàn số
            </h1>

            <p className="hero-main-subtitle">
              Topdoo giúp bạn làm việc thông minh hơn với bộ công cụ AI mạnh mẽ, hiệu quả và an toàn. Từ ý tưởng đến thực thi — tất cả trong một nền tảng.
            </p>

            <div className="hero-cta-group">
              <button
                className="btn-hero-primary"
                onClick={() => {
                  if (user) {
                    navigateMarketing('topdoo-developer-dashboard');
                  } else {
                    openAuthModal('trial');
                  }
                }}
              >
                <span>{user ? 'Vào Dashboard làm việc' : 'Dùng thử miễn phí'}</span>
                <ArrowRight size={16} />
              </button>

              <button
                className="btn-hero-video"
                onClick={() => showToast('Video giới thiệu', 'Đang phát video giới thiệu hệ sinh thái Topdoo AI...', 'info')}
              >
                <div className="play-icon-circle"><Play size={12} fill="#2563EB" color="#2563EB" /></div>
                <span>Xem video</span>
              </button>
            </div>

            {/* Metrics Strip */}
            <div className="hero-metrics-strip">
              <div className="hero-metric-item">
                <div className="metric-val">1M+</div>
                <div className="metric-lbl">Người dùng tin tưởng</div>
              </div>
              <div className="hero-metric-item">
                <div className="metric-val">100+</div>
                <div className="metric-lbl">Công cụ AI</div>
              </div>
              <div className="hero-metric-item">
                <div className="metric-val">50+</div>
                <div className="metric-lbl">Quốc gia</div>
              </div>
              <div className="hero-metric-item">
                <div className="metric-val">99.9%</div>
                <div className="metric-lbl">An toàn & bảo mật</div>
              </div>
            </div>
          </div>

          {/* Right Space: Shows the 3D cube, rings, city from bannerHomeTopdoo.png + calligraphy slogan */}
          <div className="landing-hero-visual">
            <div className="hero-slogan-wrapper">
              <div className="hero-slogan-script">
                “Công nghệ vì cuộc sống tốt đẹp hơn”
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. SECTION: TOPDOO LÀ GÌ?
          ========================================================================= */}
      <section id="section-about" className="landing-section bg-white">
        <div className="landing-container">
          <div className="about-grid">
            {/* Left Content */}
            <div className="about-left">
              <h2 className="section-title-tag">TOPDOO LÀ GÌ?</h2>
              <p className="about-description">
                Topdoo là nền tảng công nghệ & AI thuộc hệ sinh thái TOP, cung cấp bộ công cụ toàn diện giúp cá nhân, doanh nghiệp tạo nội dung, nâng cao năng suất và bảo vệ an toàn trên không gian số.
              </p>

              <div className="about-features-grid">
                <div className="about-feature-pill">
                  <div className="about-pill-icon"><Zap size={16} /></div>
                  <span>Đơn giản dễ sử dụng</span>
                </div>
                <div className="about-feature-pill">
                  <div className="about-pill-icon"><Compass size={16} /></div>
                  <span>Mạnh mẽ và linh hoạt</span>
                </div>
                <div className="about-feature-pill">
                  <div className="about-pill-icon"><Shield size={16} /></div>
                  <span>An toàn và đáng tin cậy</span>
                </div>
                <div className="about-feature-pill">
                  <div className="about-pill-icon"><Users size={16} /></div>
                  <span>Vì cộng đồng và tương lai</span>
                </div>
              </div>

              <button
                className="btn-section-action"
                onClick={() => {
                  const el = document.getElementById('section-products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Tìm hiểu thêm</span>
                <ArrowRight size={15} />
              </button>
            </div>

            {/* Right Quote Box */}
            <div className="about-right">
              <div className="quote-box-card">
                <div className="quote-text">
                  “AI không chỉ là công nghệ, mà là cơ hội để mỗi người phát huy thêm năng lực, làm việc và sáng tạo tốt hơn.”
                </div>
                <div className="quote-signature">
                  <div className="signature-handwritten">Nguyễn Đình Thọ</div>
                  <div className="quote-logo-mark">
                    <img src="/topdoo.jpeg" alt="Logo" className="quote-mini-logo" />
                    <span>TOPDOO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. SECTION: SẢN PHẨM CHÍNH
          ========================================================================= */}
      <section id="section-products" className="landing-section bg-light">
        <div className="landing-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading-main">SẢN PHẨM CHÍNH</h2>
              <p className="section-subheading-text">Bộ giải pháp AI toàn diện cho mọi nhu cầu của bạn</p>
            </div>
            <a href="#section-products" className="section-more-link">
              <span>Khám phá tất cả sản phẩm</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="products-card-grid">
            {/* Topdoo AI */}
            <div className="product-card card-blue" onClick={() => navigateMarketing('topdoo-ai')}>
              <div className="product-card-icon"><Bot size={24} /></div>
              <div className="product-card-title">Topdoo AI</div>
              <div className="product-card-desc">Trợ lý AI thông minh cho mọi công việc</div>
              <div className="product-card-circle-btn"><ArrowRight size={14} /></div>
            </div>

            {/* Topdoo Studio */}
            <div className="product-card card-purple" onClick={() => showToast('Topdoo Studio', 'Khởi chạy phòng sáng tạo đa phương tiện...', 'info')}>
              <div className="product-card-icon"><Feather size={24} /></div>
              <div className="product-card-title">Topdoo Studio</div>
              <div className="product-card-desc">Sáng tạo nội dung đa phương tiện</div>
              <div className="product-card-circle-btn"><ArrowRight size={14} /></div>
            </div>

            {/* Topdoo Tools */}
            <div className="product-card card-orange" onClick={() => showToast('Topdoo Tools', 'Mở kho công cụ AI đa năng...', 'info')}>
              <div className="product-card-icon"><Box size={24} /></div>
              <div className="product-card-title">Topdoo Tools</div>
              <div className="product-card-desc">Bộ công cụ AI dành cho mọi nhu cầu</div>
              <div className="product-card-circle-btn"><ArrowRight size={14} /></div>
            </div>

            {/* Topdoo Security (Launches Security Console) */}
            <div className="product-card card-green" onClick={() => launchSecurityConsole('overview')}>
              <div className="product-card-icon"><Shield size={24} /></div>
              <div className="product-card-title">Topdoo Security</div>
              <div className="product-card-desc">Bảo vệ bạn trên không gian số</div>
              <div className="product-card-circle-btn"><ArrowRight size={14} /></div>
            </div>

            {/* Topdoo Developer */}
            <div className="product-card card-indigo" onClick={() => launchSecurityConsole('api-integrations')}>
              <div className="product-card-icon"><Code2 size={24} /></div>
              <div className="product-card-title">Topdoo Developer</div>
              <div className="product-card-desc">Xây dựng cùng AI với API & SDK</div>
              <div className="product-card-circle-btn"><ArrowRight size={14} /></div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. SECTION: CÔNG CỤ NỔI BẬT
          ========================================================================= */}
      <section className="landing-section bg-white">
        <div className="landing-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading-main">CÔNG CỤ NỔI BẬT</h2>
              <p className="section-subheading-text">Những công cụ được cộng đồng yêu thích nhất</p>
            </div>
            <span
              onClick={() => navigateMarketing('topdoo-explore-tools')}
              className="section-more-link"
              style={{ cursor: 'pointer' }}
            >
              <span>Khám phá tất cả công cụ</span>
              <ArrowRight size={14} />
            </span>
          </div>

          <div className="featured-tools-grid">
            {[
              { title: 'Quét bảo mật', icon: ShieldCheck, color: 'emerald', action: () => launchSecurityConsole('quick-check') },
              { title: 'Kiểm tra liên kết', icon: Link2, color: 'blue', action: () => launchSecurityConsole('quick-check') },
              { title: 'Quét mã độc', icon: Bug, color: 'blue', action: () => launchSecurityConsole('malware') },
              { title: 'Quản lý mật khẩu', icon: Lock, color: 'blue', action: () => launchSecurityConsole('passwords') },
              { title: 'Sao lưu dữ liệu', icon: Cloud, color: 'blue', action: () => launchSecurityConsole('backup') },
              { title: 'Giám sát hệ thống', icon: Eye, color: 'blue', action: () => launchSecurityConsole('monitoring') },
              { title: 'Báo cáo bảo mật', icon: BarChart3, color: 'blue', action: () => launchSecurityConsole('reports') },
              { title: 'Cài đặt bảo mật', icon: Settings, color: 'blue', action: () => launchSecurityConsole('settings') }
            ].map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div
                  key={idx}
                  className={`featured-tool-card ${tool.color === 'emerald' ? 'tool-card-emerald' : ''}`}
                  onClick={tool.action || (() => showToast(tool.title, `Đang mở công cụ ${tool.title}...`, 'info'))}
                >
                  <div className={`featured-tool-icon ${tool.color === 'emerald' ? 'icon-emerald' : ''}`}>
                    <Icon size={20} />
                  </div>
                  <div className="featured-tool-name">{tool.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. SECTION: ỨNG DỤNG THỰC TẾ
          ========================================================================= */}
      <section id="section-usecases" className="landing-section bg-light">
        <div className="landing-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading-main">ỨNG DỤNG THỰC TẾ</h2>
              <p className="section-subheading-text">Topdoo đồng hành cùng bạn trong công việc, học tập và cuộc sống</p>
            </div>
            <a href="#section-usecases" className="section-more-link">
              <span>Xem thêm use cases</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="usecases-card-grid">
            {/* Cá nhân */}
            <div className="usecase-card">
              <div className="usecase-thumb thumb-individual">
                <img
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&auto=format&fit=crop&q=80"
                  alt="Cá nhân"
                  className="usecase-photo"
                  loading="lazy"
                />
                <div className="usecase-photo-overlay" />
              </div>
              <div className="usecase-body">
                <div className="usecase-target">Cá nhân</div>
                <div className="usecase-caption">Học tập, sáng tạo, làm việc hiệu quả hơn.</div>
                <div className="usecase-action"><ArrowRight size={14} /></div>
              </div>
            </div>

            {/* Doanh nghiệp */}
            <div className="usecase-card">
              <div className="usecase-thumb thumb-business">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=80"
                  alt="Doanh nghiệp"
                  className="usecase-photo"
                  loading="lazy"
                />
                <div className="usecase-photo-overlay" />
              </div>
              <div className="usecase-body">
                <div className="usecase-target">Doanh nghiệp</div>
                <div className="usecase-caption">Tối ưu vận hành, tăng trưởng bền vững.</div>
                <div className="usecase-action"><ArrowRight size={14} /></div>
              </div>
            </div>

            {/* Nhà sáng tạo nội dung */}
            <div className="usecase-card">
              <div className="usecase-thumb thumb-creator">
                <img
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&auto=format&fit=crop&q=80"
                  alt="Nhà sáng tạo nội dung"
                  className="usecase-photo"
                  loading="lazy"
                />
                <div className="usecase-photo-overlay" />
              </div>
              <div className="usecase-body">
                <div className="usecase-target">Nhà sáng tạo nội dung</div>
                <div className="usecase-caption">Biến ý tưởng thành nội dung ấn tượng.</div>
                <div className="usecase-action"><ArrowRight size={14} /></div>
              </div>
            </div>

            {/* Giáo dục */}
            <div className="usecase-card">
              <div className="usecase-thumb thumb-education">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500&auto=format&fit=crop&q=80"
                  alt="Giáo dục"
                  className="usecase-photo"
                  loading="lazy"
                />
                <div className="usecase-photo-overlay" />
              </div>
              <div className="usecase-body">
                <div className="usecase-target">Giáo dục</div>
                <div className="usecase-caption">Học AI dễ dàng, ứng dụng thực tế.</div>
                <div className="usecase-action"><ArrowRight size={14} /></div>
              </div>
            </div>

            {/* Gia đình */}
            <div className="usecase-card">
              <div className="usecase-thumb thumb-family">
                <img
                  src="https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=500&auto=format&fit=crop&q=80"
                  alt="Gia đình"
                  className="usecase-photo"
                  loading="lazy"
                />
                <div className="usecase-photo-overlay" />
              </div>
              <div className="usecase-body">
                <div className="usecase-target">Gia đình</div>
                <div className="usecase-caption">An toàn số cho bạn và người thân.</div>
                <div className="usecase-action"><ArrowRight size={14} /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          7. SECTION: SECURITY & DIGITAL SAFETY
          ========================================================================= */}
      <section id="section-security" className="landing-section bg-white">
        <div className="landing-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading-main">SECURITY & DIGITAL SAFETY</h2>
              <p className="section-subheading-text">Bảo vệ bạn và gia đình trên không gian số</p>
            </div>
            <a href="#section-security" className="section-more-link" onClick={() => launchSecurityConsole('overview')}>
              <span>Xem hiểu thêm</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="security-showcase-box">
            {/* Left Big Blue Feature Card */}
            <div className="sec-banner-card">
              <div className="sec-banner-icon"><Shield size={36} /></div>
              <div className="sec-banner-title">
                Không gian số an toàn hơn cho mọi người
              </div>
              <button
                className="btn-sec-explore"
                onClick={() => launchSecurityConsole('overview')}
              >
                <span>Khám phá ngay</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Middle 2 Columns of Features */}
            <div className="sec-features-columns">
              <div className="sec-col">
                <div className="sec-item" onClick={() => launchSecurityConsole('url-scanner')}>
                  <div className="sec-item-icon"><Globe size={16} /></div>
                  <span>Kiểm tra website, URL</span>
                </div>
                <div className="sec-item" onClick={() => launchSecurityConsole('scam-database')}>
                  <div className="sec-item-icon"><Shield size={16} /></div>
                  <span>Phát hiện lừa đảo (scam)</span>
                </div>
                <div className="sec-item" onClick={() => launchSecurityConsole('evidence')}>
                  <div className="sec-item-icon"><Database size={16} /></div>
                  <span>Kiểm tra rò rỉ dữ liệu</span>
                </div>
                <div className="sec-item" onClick={() => launchSecurityConsole('watchlist')}>
                  <div className="sec-item-icon"><Lock size={16} /></div>
                  <span>Bảo vệ tài khoản MXH</span>
                </div>
              </div>

              <div className="sec-col">
                <div className="sec-item" onClick={() => launchSecurityConsole('phishing-check')}>
                  <div className="sec-item-icon"><Bot size={16} /></div>
                  <span>Phát hiện deepfake</span>
                </div>
                <div className="sec-item" onClick={() => launchSecurityConsole('reports')}>
                  <div className="sec-item-icon"><LifeBuoy size={16} /></div>
                  <span>Tư vấn an toàn số</span>
                </div>
                <div className="sec-item" onClick={() => launchSecurityConsole('risk-scores')}>
                  <div className="sec-item-icon"><BookOpen size={16} /></div>
                  <span>Kiến thức bảo mật</span>
                </div>
                <div className="sec-item" onClick={() => launchSecurityConsole('report-scam')}>
                  <div className="sec-item-icon"><Flag size={16} /></div>
                  <span>Báo cáo lừa đảo</span>
                </div>
              </div>
            </div>

            {/* Right Glowing 3D Shield Padlock Illustration */}
            <div className="sec-visual-column">
              <img
                src="/security-shield-3d.png"
                alt="TOPDOO 3D Security Shield"
                className="sec-shield-3d-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8. SECTION: DEVELOPER PLATFORM
          ========================================================================= */}
      <section className="landing-section bg-light">
        <div className="landing-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading-main">DEVELOPER PLATFORM</h2>
              <p className="section-subheading-text">Xây dựng sản phẩm AI mạnh mẽ với hạ tầng của Topdoo</p>
            </div>
            <a href="#developer" className="section-more-link" onClick={() => launchSecurityConsole('api-integrations')}>
              <span>Xem tài liệu</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="developer-platform-grid">
            {/* Left 6 Feature Cards */}
            <div className="dev-cards-subgrid">
              <div className="dev-card" onClick={() => launchSecurityConsole('api-integrations')}>
                <div className="dev-card-icon"><Code2 size={20} /></div>
                <div className="dev-card-title">API & SDK</div>
              </div>
              <div className="dev-card" onClick={() => launchSecurityConsole('api-integrations')}>
                <div className="dev-card-icon"><FileText size={20} /></div>
                <div className="dev-card-title">Documentation</div>
              </div>
              <div className="dev-card" onClick={() => launchSecurityConsole('risk-scores')}>
                <div className="dev-card-icon"><Compass size={20} /></div>
                <div className="dev-card-title">Playground</div>
              </div>
              <div className="dev-card" onClick={() => launchSecurityConsole('api-integrations')}>
                <div className="dev-card-icon"><Share2 size={20} /></div>
                <div className="dev-card-title">Webhooks</div>
              </div>
              <div className="dev-card" onClick={() => launchSecurityConsole('monitoring')}>
                <div className="dev-card-icon"><Activity size={20} /></div>
                <div className="dev-card-title">Monitoring</div>
              </div>
              <div className="dev-card" onClick={() => launchSecurityConsole('overview')}>
                <div className="dev-card-icon"><CheckCircle2 size={20} /></div>
                <div className="dev-card-title">Status</div>
              </div>
            </div>

            {/* Right Terminal Code Window */}
            <div className="dev-code-terminal">
              <div className="terminal-header">
                <div className="terminal-tabs">
                  {['python', 'javascript', 'curl'].map(lang => (
                    <button
                      key={lang}
                      className={`terminal-tab-btn ${codeTab === lang ? 'active' : ''}`}
                      onClick={() => setCodeTab(lang)}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button className="terminal-copy-btn" onClick={handleCopyCode} title="Sao chép code">
                  {copiedCode ? <Check size={14} color="#10B981" /> : <Copy size={14} />}
                </button>
              </div>
              <pre className="terminal-body">
                <code>{codeSnippets[codeTab]}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          9. SECTION: TOPDOO ACADEMY & HỆ SINH THÁI TOP
          ========================================================================= */}
      <section id="section-academy" className="landing-section bg-white">
        <div className="landing-container">
          <div className="academy-ecosystem-grid">
            {/* Topdoo Academy */}
            <div className="academy-col">
              <h2 className="col-heading-bold">TOPDOO ACADEMY</h2>
              <p className="col-subtext">Học AI từ cơ bản đến nâng cao, ứng dụng thực tế</p>

              <div className="academy-tags-grid">
                <div className="academy-tag-item"><BookOpen size={16} /><span>AI cơ bản</span></div>
                <div className="academy-tag-item"><Briefcase size={16} /><span>AI cho doanh nghiệp</span></div>
                <div className="academy-tag-item"><Sparkles size={16} /><span>Prompt Engineering</span></div>
                <div className="academy-tag-item"><Bot size={16} /><span>AI Agents</span></div>
                <div className="academy-tag-item"><Laptop size={16} /><span>AI cho sáng tạo</span></div>
                <div className="academy-tag-item"><Shield size={16} /><span>Cybersecurity</span></div>
              </div>

              <button
                className="btn-col-action"
                onClick={() => showToast('Topdoo Academy', 'Chương trình đào tạo AI thực chiến chuẩn bị khai giảng.', 'info')}
              >
                <span>Khám phá khóa học</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Hệ sinh thái TOP */}
            <div id="section-ecosystem" className="ecosystem-col">
              <h2 className="col-heading-bold">HỆ SINH THÁI TOP</h2>
              <p className="col-subtext">Cùng kiến tạo một hệ sinh thái số vì cuộc sống tốt đẹp hơn</p>

              <div className="ecosystem-pills-wrap">
                <span className="eco-pill pill-cyan">Topmedia</span>
                <span className="eco-pill pill-purple">Topfly</span>
                <span className="eco-pill pill-orange">Toplay</span>
                <span className="eco-pill pill-dark">Topvc</span>
                <span className="eco-pill pill-green">Topvn</span>
                <span className="eco-pill pill-blue">TopHold</span>
                <span className="eco-pill pill-navy">Topfinance</span>
                <span className="eco-pill pill-indigo">Topbiz</span>
                <span className="eco-pill pill-teal">Carerum</span>
              </div>

              <button
                className="btn-col-action"
                onClick={() => showToast('Hệ sinh thái TOP', 'Khám phá các thương hiệu trong hệ sinh thái TOP.', 'info')}
              >
                <span>Khám phá hệ sinh thái</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          10. SECTION: BẢNG GIÁ LINH HOẠT
          ========================================================================= */}
      <section id="section-pricing" className="landing-section bg-light">
        <div className="landing-container">
          <div className="section-header-center">
            <h2 className="section-heading-main">BẢNG GIÁ LINH HOẠT</h2>
            <p className="section-subheading-text">Phù hợp cho mọi nhu cầu từ cá nhân đến doanh nghiệp</p>
          </div>

          <div className="pricing-cards-row">
            {/* Free */}
            <div className="price-card">
              <div className="price-title">Free</div>
              <div className="price-amount">0đ<span className="price-period">/tháng</span></div>
              <div className="price-desc">Trải nghiệm cơ bản</div>
              <div className="price-features">
                <div><Check size={14} color="#10B981" /><span>Truy cập công cụ cơ bản</span></div>
                <div><Check size={14} color="#10B981" /><span>Giới hạn tính năng</span></div>
                <div><Check size={14} color="#10B981" /><span>Hỗ trợ cộng đồng</span></div>
              </div>
              <button className="btn-price-outline" onClick={() => launchSecurityConsole('overview')}>
                Bắt đầu ngay
              </button>
            </div>

            {/* Plus */}
            <div className="price-card">
              <div className="price-title">Plus</div>
              <div className="price-amount">199.000đ<span className="price-period">/tháng</span></div>
              <div className="price-desc">Cho cá nhân chuyên nghiệp</div>
              <div className="price-features">
                <div><Check size={14} color="#10B981" /><span>100+ ứng dụng nâng cao</span></div>
                <div><Check size={14} color="#10B981" /><span>Tạo nội dung nâng cao</span></div>
                <div><Check size={14} color="#10B981" /><span>Hỗ trợ ưu tiên</span></div>
              </div>
              <button className="btn-price-outline" onClick={() => launchSecurityConsole('overview')}>
                Dùng thử miễn phí
              </button>
            </div>

            {/* Pro - Featured */}
            <div className="price-card card-featured">
              <div className="price-featured-badge">Phổ biến nhất</div>
              <div className="price-title">Pro</div>
              <div className="price-amount">499.000đ<span className="price-period">/tháng</span></div>
              <div className="price-desc">Dành cho nhà sáng tạo & team</div>
              <div className="price-features">
                <div><Check size={14} color="#10B981" /><span>Toàn bộ tính năng AI</span></div>
                <div><Check size={14} color="#10B981" /><span>Mở rộng sử dụng cao</span></div>
                <div><Check size={14} color="#10B981" /><span>AI Agents & Automation</span></div>
                <div><Check size={14} color="#10B981" /><span>Hỗ trợ 24/7</span></div>
              </div>
              <button className="btn-price-primary" onClick={() => launchSecurityConsole('overview')}>
                Dùng thử miễn phí
              </button>
            </div>

            {/* Business */}
            <div className="price-card">
              <div className="price-title">Business</div>
              <div className="price-amount">Liên hệ</div>
              <div className="price-desc">Giải pháp cho doanh nghiệp</div>
              <div className="price-features">
                <div><Check size={14} color="#10B981" /><span>Tùy chỉnh theo yêu cầu</span></div>
                <div><Check size={14} color="#10B981" /><span>Tích hợp hệ thống</span></div>
                <div><Check size={14} color="#10B981" /><span>Bảo mật nâng cao</span></div>
                <div><Check size={14} color="#10B981" /><span>Hỗ trợ chuyên biệt</span></div>
              </div>
              <button className="btn-price-outline" onClick={() => showToast('Liên hệ Business', 'Vui lòng gửi email đến business@topdoo.com', 'info')}>
                Liên hệ tư vấn
              </button>
            </div>

            {/* API Pricing */}
            <div className="price-card">
              <div className="price-title">API Pricing</div>
              <div className="price-amount">Từ 0.005đ<span className="price-period">/1k tokens</span></div>
              <div className="price-desc">Linh hoạt theo nhu cầu sử dụng</div>
              <div className="price-features">
                <div><Check size={14} color="#10B981" /><span>Nhiều model AI</span></div>
                <div><Check size={14} color="#10B981" /><span>Trạm sạc theo mức sử dụng</span></div>
                <div><Check size={14} color="#10B981" /><span>Tài liệu đầy đủ</span></div>
                <div><Check size={14} color="#10B981" /><span>Hỗ trợ kỹ thuật</span></div>
              </div>
              <button className="btn-price-outline" onClick={() => launchSecurityConsole('api-integrations')}>
                Xem chi tiết
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          11. BOTTOM CTA BANNER
          ========================================================================= */}
      <section className="landing-cta-banner">
        <div className="cta-banner-inner">
          <div className="cta-banner-content">
            <h2 className="cta-banner-title">Bắt đầu cùng Topdoo ngay hôm nay</h2>
            <p className="cta-banner-subtitle">
              Khám phá sức mạnh của AI để tạo ra những giá trị lớn hơn cho bạn và cộng đồng.
            </p>

            <div className="cta-banner-buttons">
              <button
                className="btn-banner-primary"
                onClick={() => {
                  if (user) {
                    navigateMarketing('topdoo-developer-dashboard');
                  } else {
                    openAuthModal('trial');
                  }
                }}
              >
                <span>{user ? 'Vào Dashboard làm việc' : 'Dùng thử miễn phí'}</span>
                <ArrowRight size={16} />
              </button>
              <button
                className="btn-banner-outline"
                onClick={() => showToast('Tư vấn Topdoo', 'Chuyên viên tư vấn sẽ liên hệ với bạn trong 24 giờ.', 'info')}
              >
                <span>Liên hệ tư vấn</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="cta-banner-signature">
            <span>Cùng nhau</span>
            <span>kiến tạo tương lai</span>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
