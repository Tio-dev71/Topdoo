import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export function MarketingFooter() {
  const { navigateMarketing, setMode, setCurrentView } = useSecurity();

  const launchSecurityConsole = (targetView = 'overview') => {
    setMode('app');
    setCurrentView(targetView);
  };

  return (
    <footer className="landing-footer">
      <div className="landing-container">
        <div className="footer-top-grid">
          {/* Brand Column */}
          <div className="footer-brand-col">
            <div
              className="footer-logo"
              onClick={() => navigateMarketing('home')}
              style={{ cursor: 'pointer' }}
            >
              <img src="/topdoo.jpeg" alt="Topdoo" className="footer-logo-img" />
              <span className="footer-logo-text">TOPDOO</span>
            </div>
            <p className="footer-brand-desc">
              Nền tảng công nghệ & AI toàn diện thuộc hệ sinh thái TOP. Công nghệ vì cuộc sống tốt đẹp hơn.
            </p>
            <div className="footer-social-links">
              <a href="#facebook" className="social-icon-btn" title="Facebook">f</a>
              <a href="#youtube" className="social-icon-btn" title="YouTube">▶</a>
              <a href="#linkedin" className="social-icon-btn" title="LinkedIn">in</a>
              <a href="#tiktok" className="social-icon-btn" title="TikTok">♪</a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="footer-link-col">
            <div className="footer-col-title">Sản phẩm</div>
            <ul className="footer-links-list">
              <li>
                <a
                  href="#topdoo-ai"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateMarketing('topdoo-ai');
                  }}
                >
                  Topdoo AI
                </a>
              </li>
              <li><a href="#topdoo-studio">Topdoo Studio</a></li>
              <li><a href="#topdoo-tools">Topdoo Tools</a></li>
              <li>
                <a
                  href="#topdoo-security"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateMarketing('topdoo-security');
                  }}
                >
                  Topdoo Security
                </a>
              </li>
              <li>
                <a
                  href="#topdoo-dev"
                  onClick={(e) => {
                    e.preventDefault();
                    launchSecurityConsole('api-integrations');
                  }}
                >
                  Topdoo Developer
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-link-col">
            <div className="footer-col-title">Khám phá</div>
            <ul className="footer-links-list">
              <li><a href="#ai-directory">AI Directory</a></li>
              <li><a href="#tin-tuc">Tin tức</a></li>
              <li><a href="#huong-dan">Hướng dẫn</a></li>
              <li><a href="#case-study">Case Study</a></li>
              <li><a href="#xu-huong">Xu hướng</a></li>
              <li><a href="#cong-dong">Cộng đồng ↗</a></li>
            </ul>
          </div>

          <div className="footer-link-col">
            <div className="footer-col-title">Hỗ trợ</div>
            <ul className="footer-links-list">
              <li><a href="#help-center">Trung tâm trợ giúp</a></li>
              <li><a href="#lien-he">Liên hệ</a></li>
              <li><a href="#dieu-khoan">Điều khoản</a></li>
              <li><a href="#chinh-sach">Chính sách bảo mật</a></li>
            </ul>
          </div>

          <div className="footer-link-col">
            <div className="footer-col-title">Công ty</div>
            <ul className="footer-links-list">
              <li><a href="#gioi-thieu">Giới thiệu</a></li>
              <li><a href="#tam-nhin">Tầm nhìn</a></li>
              <li><a href="#doi-tac">Đối tác</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <div>© 2026 Topdoo. All rights reserved.</div>
          <div>Good Technology, A Brighter Tomorrow.</div>
          <div className="footer-lang-selector">
            <span>🇻🇳 Tiếng Việt</span>
            <ChevronDown size={13} />
          </div>
        </div>
      </div>
    </footer>
  );
}
