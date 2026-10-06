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
  Presentation,
  FileText,
  PenTool,
  LayoutGrid,
  Tag,
  Globe,
  Users,
  Bot,
  Share2,
  Wand2,
  Cpu,
  Layers,
  Shield,
  Clock,
  Briefcase,
  Megaphone,
  User,
  FolderOpen,
  X,
  Palette,
  Mic,
  Monitor,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Copy,
  Plus,
  Maximize2,
  Volume2,
  VolumeX,
  Radio,
  RefreshCw,
  Sliders,
  UploadCloud,
  Terminal
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import {
  STUDIO_TEMPLATES,
  initialStudioProjects,
  generateStudioAsset
} from '../../services/studioService';

export function TopdooStudioView() {
  const {
    navigateMarketing,
    showToast,
    creditBalance,
    deductCredits,
    voiceboxConfig,
    voiceboxHealth,
    voiceProfiles,
    activeVoiceProfile,
    setActiveVoiceProfile,
    isSpeaking,
    refreshVoiceboxHealth,
    generateVoiceSpeech,
    cloneVoice,
    stopVoiceSpeech
  } = useSecurity();

  // Active filter tab in the 8-card quick format ribbon
  const [activeFormatTab, setActiveFormatTab] = useState('all');

  // Video modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Canvas Workspace Modal state
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState('DESIGN');
  const [canvasPrompt, setCanvasPrompt] = useState('Thiết kế infographic cảnh báo chiến dịch lừa đảo mạo danh ngân hàng và cổng thanh toán');
  const [activeProject, setActiveProject] = useState(initialStudioProjects[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [studioProjectsList, setStudioProjectsList] = useState(initialStudioProjects);

  // Voicebox Studio State
  const [voiceStudioTab, setVoiceStudioTab] = useState('tts'); // 'tts' | 'clone' | 'quickstart'
  const [ttsScript, setTtsScript] = useState('Chào mừng bạn đến với Topdoo Studio! Hệ thống đã tích hợp Voicebox AI giúp bạn nhân bản giọng nói và lồng tiếng tự động.');
  const [ttsSpeed, setTtsSpeed] = useState(1.0);
  const [ttsPitch, setTtsPitch] = useState(1.0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [lastSpeechResult, setLastSpeechResult] = useState(null);

  // Clone Voice State
  const [cloneName, setCloneName] = useState('');
  const [cloneGender, setCloneGender] = useState('Nữ');
  const [cloneDesc, setCloneDesc] = useState('');
  const [cloneFileName, setCloneFileName] = useState('');
  const [isCloningVoice, setIsCloningVoice] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const handleSynthesizeVoice = async () => {
    if (!ttsScript.trim()) {
      showToast('Cảnh báo', 'Vui lòng nhập văn bản cần lồng tiếng.', 'warning');
      return;
    }
    setIsSynthesizing(true);
    const res = await generateVoiceSpeech({
      text: ttsScript,
      profileId: activeVoiceProfile?.id,
      speed: ttsSpeed,
      pitch: ttsPitch
    });
    setIsSynthesizing(false);
    if (res.success) {
      setLastSpeechResult(res);
    }
  };

  const handleSelectProfile = (profile) => {
    setActiveVoiceProfile(profile);
    if (profile.sampleText) {
      setTtsScript(profile.sampleText);
    }
  };

  const handlePreviewVoice = async (e, profile) => {
    e.stopPropagation();
    setActiveVoiceProfile(profile);
    setIsSynthesizing(true);
    const sample = profile.sampleText || profile.description;
    const res = await generateVoiceSpeech({
      text: sample,
      profileId: profile.id,
      speed: 1.0,
      pitch: 1.0
    });
    setIsSynthesizing(false);
    if (res.success) {
      setLastSpeechResult(res);
    }
  };

  const handleCloneVoiceSubmit = async (e) => {
    e.preventDefault();
    if (!cloneName.trim()) {
      showToast('Cảnh báo', 'Vui lòng nhập tên cho giọng nhân bản.', 'warning');
      return;
    }
    setIsCloningVoice(true);
    const res = await cloneVoice({
      voiceName: cloneName,
      sampleAudioBlob: null,
      description: cloneDesc || 'Giọng nhân bản tùy chỉnh tạo từ Topdoo Studio',
      gender: cloneGender
    });
    setIsCloningVoice(false);
    if (res.success) {
      setCloneName('');
      setCloneDesc('');
      setCloneFileName('');
      setVoiceStudioTab('tts');
    }
  };

  const handleGenerateAsset = () => {
    if (!canvasPrompt.trim()) {
      showToast('Cảnh báo', 'Vui lòng nhập mô tả yêu cầu thiết kế.', 'warning');
      return;
    }

    const cost = selectedFormat === 'VIDEO' ? 25 : (selectedFormat === 'PRESENTATION' ? 20 : 15);
    if (creditBalance < cost) {
      showToast('Hết Credit', `Bạn cần tối thiểu ${cost} credits để sinh tài sản này.`, 'danger');
      return;
    }

    setIsGenerating(true);
    showToast('Đang tạo thiết kế', `AI đang kết xuất canvas dạng ${selectedFormat}...`, 'info');

    setTimeout(() => {
      const { project, creditCost } = generateStudioAsset(canvasPrompt, selectedFormat);
      if (typeof deductCredits === 'function') {
        deductCredits(creditCost, 'STUDIO_GENERATION', `Tạo asset Studio ${selectedFormat}: ${project.title}`);
      }
      setActiveProject(project);
      setStudioProjectsList((prev) => [project, ...prev]);
      setIsGenerating(false);
      showToast('Thành công', `Đã tạo thiết kế mới! (-${creditCost} credits)`, 'success');
    }, 1200);
  };

  const handleDownloadProject = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(activeProject, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", `${activeProject.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.json`);
    dlAnchor.click();
    showToast('Tải xuống', 'Đã lưu tệp thiết kế JSON vào máy tính.', 'success');
  };

  const handleCopyProject = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(activeProject.outputContent || activeProject.prompt);
      showToast('Đã sao chép', 'Nội dung dự án đã được lưu vào bộ nhớ tạm.', 'info');
    }
  };

  // Quick formats list
  const quickFormats = [
    { id: 'text', label: 'Viết nội dung', icon: FileText, desc: 'Bài viết, blog, kịch bản' },
    { id: 'image', label: 'Hình ảnh', icon: ImageIcon, desc: 'Tạo & chỉnh sửa ảnh AI' },
    { id: 'video', label: 'Video', icon: Video, desc: 'Biến văn bản thành video' },
    { id: 'audio', label: 'Âm thanh', icon: Music, desc: 'Giọng nói AI & nhạc nền' },
    { id: 'presentation', label: 'Thuyết trình', icon: Presentation, desc: 'Slide chuẩn chuyên nghiệp' },
    { id: 'document', label: 'Tài liệu', icon: FileSpreadsheet, desc: 'Tóm tắt & chuyển đổi' },
    { id: 'design', label: 'Thiết kế', icon: PenTool, desc: 'Banner, logo, UI/UX' },
    { id: 'template', label: 'Template', icon: LayoutGrid, desc: 'Hàng ngàn mẫu sẵn dùng' }
  ];

  // 10 Core Features
  const coreFeatures = [
    {
      id: 'feat-1',
      title: 'Viết nội dung',
      desc: 'Bài viết, blog, kịch bản, nội dung marketing',
      format: 'text',
      color: 'purple',
      badgeIcon: FileText,
      graphicType: 'writing'
    },
    {
      id: 'feat-2',
      title: 'Hình ảnh',
      desc: 'Tạo ảnh AI, chỉnh sửa, thiết kế đồ họa',
      format: 'image',
      color: 'blue',
      badgeIcon: ImageIcon,
      graphicType: 'image'
    },
    {
      id: 'feat-3',
      title: 'Video',
      desc: 'Tạo video AI, chuyển văn bản thành video',
      format: 'video',
      color: 'pink',
      badgeIcon: Video,
      graphicType: 'video'
    },
    {
      id: 'feat-4',
      title: 'Âm thanh',
      desc: 'Tạo giọng nói, nhạc, podcast',
      format: 'audio',
      color: 'violet',
      badgeIcon: Music,
      graphicType: 'audio'
    },
    {
      id: 'feat-5',
      title: 'Thuyết trình',
      desc: 'Tạo slide đẹp, chuyên nghiệp',
      format: 'presentation',
      color: 'sky',
      badgeIcon: Presentation,
      graphicType: 'presentation'
    },
    {
      id: 'feat-6',
      title: 'Tài liệu',
      desc: 'Soạn thảo, tóm tắt, chuyển đổi định dạng',
      format: 'document',
      color: 'indigo',
      badgeIcon: FileText,
      graphicType: 'document'
    },
    {
      id: 'feat-7',
      title: 'Thiết kế',
      desc: 'Logo, banner, poster, UI/UX',
      format: 'design',
      color: 'purple',
      badgeIcon: PenTool,
      graphicType: 'design'
    },
    {
      id: 'feat-8',
      title: 'Template Library',
      desc: 'Hàng ngàn mẫu sẵn sàng',
      format: 'template',
      color: 'blue',
      badgeIcon: LayoutGrid,
      graphicType: 'template'
    },
    {
      id: 'feat-9',
      title: 'AI Assistant',
      desc: 'Hỗ trợ sáng tạo thông minh',
      format: 'all',
      color: 'cyan',
      badgeIcon: Bot,
      graphicType: 'robot'
    },
    {
      id: 'feat-10',
      title: 'Hợp tác & Chia sẻ',
      desc: 'Làm việc nhóm hiệu quả',
      format: 'all',
      color: 'teal',
      badgeIcon: Share2,
      graphicType: 'collaboration'
    }
  ];

  // Filtered features based on quick format ribbon
  const displayedFeatures = activeFormatTab === 'all'
    ? coreFeatures
    : coreFeatures.filter(f => f.format === activeFormatTab || f.format === 'all');

  // 4 Audience Cards
  const audiences = [
    {
      id: 'personal',
      title: 'Cá nhân',
      role: 'Cá nhân',
      desc: 'Học tập, sáng tạo, phát triển bản thân',
      icon: User,
      iconBg: '#3B82F6',
      img: '/studio_audience_personal.jpg'
    },
    {
      id: 'marketer',
      title: 'Marketer',
      role: 'Marketer',
      desc: 'Tạo chiến dịch, nội dung marketing',
      icon: Megaphone,
      iconBg: '#8B5CF6',
      img: '/studio_audience_marketer.jpg'
    },
    {
      id: 'business',
      title: 'Doanh nghiệp',
      role: 'Doanh nghiệp',
      desc: 'Tăng năng suất, chuẩn hoá thương hiệu',
      icon: Briefcase,
      iconBg: '#7C3AED',
      img: '/studio_audience_business.jpg'
    },
    {
      id: 'creator',
      title: 'Nhà sáng tạo nội dung',
      role: 'Nhà sáng tạo nội dung',
      desc: 'YouTuber, blogger, creator chuyên nghiệp',
      icon: Video,
      iconBg: '#9333EA',
      img: '/studio_audience_creator.jpg'
    }
  ];

  return (
    <div className="topdoo-landing topdoo-studio-page">
      {/* 1. Global Marketing Header */}
      <MarketingHeader />

      {/* 2. Hero Section with /bannerStudioroute.png Background */}
      <section className="studio-hero-section">
        <div className="studio-hero-bg-wrap">
          <img
            src="/bannerStudioroute.png"
            alt="Topdoo Studio Route Banner"
            className="studio-hero-bg-img"
          />
        </div>

        <div className="landing-container studio-hero-container">
          {/* Breadcrumbs positioned over the banner */}
          <div className="studio-hero-breadcrumbs">
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
            <span className="breadcrumb-current">Topdoo Studio</span>
          </div>

          <div className="studio-hero-grid">
            {/* Left Content Column */}
            <div className="studio-hero-left">
              <div className="studio-hero-pill">
                <Wand2 size={13} color="#7C3AED" />
                <span>TOPDOO STUDIO</span>
              </div>

              <h1 className="studio-hero-heading">
                Sáng tạo nội dung<br />
                <span className="studio-heading-purple">dễ dàng hơn với AI</span>
              </h1>

              <p className="studio-hero-subheading">
                Topdoo Studio giúp bạn biến ý tưởng thành nội dung ấn tượng chỉ trong vài phút. Từ văn bản, hình ảnh, video, âm thanh đến thuyết trình – tất cả trong một nền tảng, với sức mạnh của AI.
              </p>

              {/* Action Buttons */}
              <div className="studio-hero-cta-group">
                <button
                  className="btn-studio-hero-primary"
                  onClick={() => setIsCanvasOpen(true)}
                  style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)', boxShadow: '0 4px 14px rgba(124, 58, 237, 0.35)' }}
                >
                  <Wand2 size={16} />
                  <span>Mở Canvas Workspace</span>
                </button>

                <button
                  className="btn-studio-hero-secondary"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  <div className="btn-play-circle-purple">
                    <Play size={13} fill="#7C3AED" color="#7C3AED" />
                  </div>
                  <span>Xem video</span>
                </button>
              </div>

              {/* 4 Value Propositions Row */}
              <div className="studio-hero-props-row">
                <div className="studio-prop-item">
                  <div className="studio-prop-icon">
                    <Clock size={16} color="#FFFFFF" />
                  </div>
                  <div className="studio-prop-text">
                    <span className="studio-prop-title">Nhanh hơn</span>
                    <span className="studio-prop-desc">Tiết kiệm thời gian</span>
                  </div>
                </div>

                <div className="studio-prop-item">
                  <div className="studio-prop-icon">
                    <Wand2 size={16} color="#FFFFFF" />
                  </div>
                  <div className="studio-prop-text">
                    <span className="studio-prop-title">Đơn giản hơn</span>
                    <span className="studio-prop-desc">Ai cũng có thể dùng</span>
                  </div>
                </div>

                <div className="studio-prop-item">
                  <div className="studio-prop-icon">
                    <Sparkles size={16} color="#FFFFFF" />
                  </div>
                  <div className="studio-prop-text">
                    <span className="studio-prop-title">Chuyên nghiệp hơn</span>
                    <span className="studio-prop-desc">Nội dung chất lượng cao</span>
                  </div>
                </div>

                <div className="studio-prop-item">
                  <div className="studio-prop-icon">
                    <Layers size={16} color="#FFFFFF" />
                  </div>
                  <div className="studio-prop-text">
                    <span className="studio-prop-title">Tất cả trong một</span>
                    <span className="studio-prop-desc">Một nền tảng duy nhất</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Spacer for Banner Artwork */}
            <div className="studio-hero-right-spacer" />
          </div>
        </div>
      </section>

      {/* 3. Section: 8 Quick Creative Formats Ribbon */}
      <section className="studio-quick-formats-section">
        <div className="landing-container">
          <div className="studio-quick-formats-grid">
            {quickFormats.map((fmt) => {
              const IconComp = fmt.icon;
              const isActive = activeFormatTab === fmt.id;
              return (
                <div
                  key={fmt.id}
                  className={`studio-quick-fmt-card ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    const next = activeFormatTab === fmt.id ? 'all' : fmt.id;
                    setActiveFormatTab(next);
                    showToast('Định dạng sáng tạo', `Đang xem tính năng ${fmt.label}`, 'info');
                  }}
                >
                  <div className="studio-quick-fmt-badge">
                    <IconComp size={22} color="#7C3AED" />
                  </div>
                  <span className="studio-quick-fmt-label">{fmt.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Section: "Topdoo Studio là gì?" */}
      <section className="studio-about-section">
        <div className="landing-container">
          <div className="studio-about-grid">
            {/* Left Column: Visual Showcase Video Card */}
            <div className="studio-showcase-video-card">
              <img
                src="/studio_video_showcase.jpg"
                alt="Biến ý tưởng thành hiện thực cùng Topdoo Studio"
                className="studio-showcase-img"
              />
              <div className="studio-showcase-overlay">
                <div className="studio-showcase-badge-title">
                  Biến ý tưởng<br />
                  thành hiện thực<br />
                  cùng Topdoo Studio
                </div>

                <button
                  className="studio-showcase-play-btn"
                  onClick={() => setIsVideoModalOpen(true)}
                  aria-label="Xem video giới thiệu Topdoo Studio"
                >
                  <div className="studio-play-pulse-ring" />
                  <Play size={24} fill="#7C3AED" color="#7C3AED" className="play-triangle" />
                </button>

                <div className="studio-showcase-slogan">
                  <span>Ideas</span>
                  <span>into Amazing Content</span>
                </div>
              </div>
            </div>

            {/* Right Column: Descriptions & 6 Strengths */}
            <div className="studio-about-content">
              <h2 className="studio-about-title">Topdoo Studio là gì?</h2>
              <p className="studio-about-description">
                Topdoo Studio là nền tảng sáng tạo nội dung tích hợp AI, giúp bạn tạo ra văn bản, hình ảnh, video, âm thanh, thuyết trình, tài liệu và thiết kế một cách nhanh chóng và dễ dàng. Dù bạn là cá nhân, marketer, nhà sáng tạo nội dung hay doanh nghiệp, Topdoo Studio đều có thể đồng hành cùng bạn.
              </p>

              <div className="studio-strengths-grid">
                <div className="studio-strength-card">
                  <div className="studio-strength-icon">
                    <Cpu size={18} color="#7C3AED" />
                  </div>
                  <div className="studio-strength-info">
                    <div className="studio-strength-title">Tích hợp AI mạnh mẽ</div>
                    <div className="studio-strength-sub">Đa mô hình, kết quả vượt trội</div>
                  </div>
                </div>

                <div className="studio-strength-card">
                  <div className="studio-strength-icon">
                    <Wand2 size={18} color="#7C3AED" />
                  </div>
                  <div className="studio-strength-info">
                    <div className="studio-strength-title">Dễ sử dụng</div>
                    <div className="studio-strength-sub">Giao diện thân thiện, tiếng Việt</div>
                  </div>
                </div>

                <div className="studio-strength-card">
                  <div className="studio-strength-icon">
                    <Layers size={18} color="#7C3AED" />
                  </div>
                  <div className="studio-strength-info">
                    <div className="studio-strength-title">Đa định dạng</div>
                    <div className="studio-strength-sub">Văn bản, hình ảnh, video, âm thanh...</div>
                  </div>
                </div>

                <div className="studio-strength-card">
                  <div className="studio-strength-icon">
                    <LayoutGrid size={18} color="#7C3AED" />
                  </div>
                  <div className="studio-strength-info">
                    <div className="studio-strength-title">Kho template khổng lồ</div>
                    <div className="studio-strength-sub">Hàng ngàn mẫu chuyên nghiệp</div>
                  </div>
                </div>

                <div className="studio-strength-card">
                  <div className="studio-strength-icon">
                    <Globe size={18} color="#7C3AED" />
                  </div>
                  <div className="studio-strength-info">
                    <div className="studio-strength-title">Làm việc mọi nơi</div>
                    <div className="studio-strength-sub">Trên web, mobile, cloud</div>
                  </div>
                </div>

                <div className="studio-strength-card">
                  <div className="studio-strength-icon">
                    <Shield size={18} color="#7C3AED" />
                  </div>
                  <div className="studio-strength-info">
                    <div className="studio-strength-title">Bảo mật & an toàn</div>
                    <div className="studio-strength-sub">Dữ liệu của bạn luôn được bảo vệ</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Section: "Tính năng chính" (10 Cards Grid) */}
      <section className="studio-features-section" id="tinh-nang-chinh">
        <div className="landing-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading-main">Tính năng chính</h2>
              <p className="section-subheading-text">Tất cả công cụ sáng tạo bạn cần trong một nền tảng duy nhất.</p>
            </div>
            <a
              href="#tinh-nang-chinh"
              className="section-more-link studio-link"
              onClick={(e) => {
                e.preventDefault();
                showToast('Tính năng Topdoo Studio', 'Đang hiển thị toàn bộ 10 tính năng sáng tạo cốt lõi.', 'info');
              }}
            >
              <span>Xem chi tiết tính năng</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="studio-features-grid">
            {displayedFeatures.map((feat) => {
              return (
                <div
                  key={feat.id}
                  className={`studio-feature-card card-glow-${feat.color}`}
                  onClick={() => showToast(feat.title, `Đang mở công cụ ${feat.title} trong Topdoo Studio...`, 'success')}
                >
                  <div className="studio-feat-content">
                    <h3 className="studio-feat-title">{feat.title}</h3>
                    <p className="studio-feat-desc">{feat.desc}</p>
                  </div>

                  {/* Feature Visual Graphics */}
                  <div className="studio-feat-visual">
                    {feat.graphicType === 'writing' && (
                      <div className="art-writing-pad">
                        <div className="pad-sheet">
                          <span className="pad-line pad-line-1" />
                          <span className="pad-line pad-line-2" />
                          <span className="pad-line pad-line-3" />
                        </div>
                        <div className="pad-pen">
                          <PenTool size={18} color="#7C3AED" />
                        </div>
                      </div>
                    )}

                    {feat.graphicType === 'image' && (
                      <div className="art-image-frame">
                        <div className="img-landscape">
                          <span className="img-sun" />
                          <span className="img-mountain" />
                        </div>
                      </div>
                    )}

                    {feat.graphicType === 'video' && (
                      <div className="art-video-circle">
                        <div className="video-play-disc">
                          <Play size={18} fill="#FFFFFF" color="#FFFFFF" />
                        </div>
                      </div>
                    )}

                    {feat.graphicType === 'audio' && (
                      <div className="art-audio-waves">
                        <span className="wave-bar wave-1" />
                        <span className="wave-bar wave-2" />
                        <span className="wave-bar wave-3" />
                        <span className="wave-bar wave-4" />
                        <span className="wave-bar wave-5" />
                      </div>
                    )}

                    {feat.graphicType === 'presentation' && (
                      <div className="art-presentation-board">
                        <div className="pres-screen">
                          <span className="pres-chart-bar b1" />
                          <span className="pres-chart-bar b2" />
                          <span className="pres-chart-bar b3" />
                        </div>
                        <div className="pres-stand" />
                      </div>
                    )}

                    {feat.graphicType === 'document' && (
                      <div className="art-doc-sheet">
                        <div className="sheet-corner" />
                        <span className="doc-line d1" />
                        <span className="doc-line d2" />
                        <span className="doc-line d3" />
                      </div>
                    )}

                    {feat.graphicType === 'design' && (
                      <div className="art-design-crystal">
                        <div className="crystal-core">
                          <Sparkles size={18} color="#FFFFFF" />
                        </div>
                      </div>
                    )}

                    {feat.graphicType === 'template' && (
                      <div className="art-template-folder">
                        <div className="folder-back" />
                        <div className="folder-paper f1" />
                        <div className="folder-paper f2" />
                        <div className="folder-front" />
                      </div>
                    )}

                    {feat.graphicType === 'robot' && (
                      <div className="art-robot-mascot">
                        <div className="robot-head">
                          <div className="robot-eyes">
                            <span className="robot-eye" />
                            <span className="robot-eye" />
                          </div>
                        </div>
                        <div className="robot-body" />
                      </div>
                    )}

                    {feat.graphicType === 'collaboration' && (
                      <div className="art-collab-network">
                        <div className="node node-center">
                          <Users size={14} color="#0284C7" />
                        </div>
                        <span className="node-dot dot-1" />
                        <span className="node-dot dot-2" />
                        <span className="node-dot dot-3" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5B. Section: "Phòng Thu Âm Thanh Topdoo Voice Studio" */}
      <section className="studio-voicebox-section" id="voicebox-studio" style={{ padding: '80px 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="landing-container">
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 20, marginBottom: 32 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px', borderRadius: 20, backgroundColor: 'rgba(124, 58, 237, 0.1)', color: '#7C3AED', fontSize: 12, fontWeight: 700, marginBottom: 12 }}>
                <Radio size={14} className="animate-pulse" />
                <span>TOPDOO NEURAL VOICE STUDIO • ĐỘC QUYỀN TOPDOO</span>
              </div>
              <h2 className="section-heading-main" style={{ margin: '0 0 8px 0' }}>Phòng Thu Topdoo Voice Studio</h2>
              <p className="section-subheading-text" style={{ margin: 0, maxWidth: 640 }}>
                Công nghệ âm thanh AI độc quyền của Topdoo — Nhân bản giọng nói tức thì (Zero-shot Voice Clone) và tổng hợp giọng đọc AI đa cảm xúc thế hệ mới chuẩn phòng thu studio.
              </p>
            </div>

            {/* Gateway Status Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 14px',
                borderRadius: 12,
                backgroundColor: '#ECFDF5',
                border: '1px solid #A7F3D0'
              }}>
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: '#10B981',
                  display: 'inline-block'
                }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#065F46' }}>
                  Topdoo Voice Engine: Đang hoạt động (Độ trễ &lt; 300ms)
                </span>
                <button
                  type="button"
                  onClick={refreshVoiceboxHealth}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'flex', alignItems: 'center', color: '#64748B' }}
                  title="Kiểm tra lại trạng thái máy chủ âm thanh"
                >
                  <RefreshCw size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 24, borderBottom: '1px solid #E2E8F0', paddingBottom: 12 }}>
            <button
              type="button"
              onClick={() => setVoiceStudioTab('tts')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 10,
                border: 'none',
                backgroundColor: voiceStudioTab === 'tts' ? '#7C3AED' : '#FFFFFF',
                color: voiceStudioTab === 'tts' ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                boxShadow: voiceStudioTab === 'tts' ? '0 4px 12px rgba(124, 58, 237, 0.25)' : 'none'
              }}
            >
              <Volume2 size={16} />
              <span>1. Lồng Tiếng & Đọc Văn Bản (TTS)</span>
            </button>

            <button
              type="button"
              onClick={() => setVoiceStudioTab('clone')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 18px',
                borderRadius: 10,
                border: 'none',
                backgroundColor: voiceStudioTab === 'clone' ? '#7C3AED' : '#FFFFFF',
                color: voiceStudioTab === 'clone' ? '#FFFFFF' : '#475569',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                boxShadow: voiceStudioTab === 'clone' ? '0 4px 12px rgba(124, 58, 237, 0.25)' : 'none'
              }}
            >
              <Mic size={16} />
              <span>2. Nhân Bản Giọng Nói (Zero-shot Clone)</span>
            </button>
          </div>

          {/* TAB 1: TEXT-TO-SPEECH STUDIO */}
          {voiceStudioTab === 'tts' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 1fr) minmax(360px, 1.4fr)', gap: 24, alignItems: 'start' }}>
              {/* Left Column: Voice Profiles Selection */}
              <div style={{ backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                  <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: '#0F172A' }}>
                    Chọn Giọng Đọc ({voiceProfiles?.length || 0})
                  </h3>
                  <button
                    type="button"
                    onClick={() => setVoiceStudioTab('clone')}
                    style={{ fontSize: 12, fontWeight: 600, color: '#7C3AED', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                  >
                    <Plus size={14} />
                    <span>Clone giọng mới</span>
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 420, overflowY: 'auto' }}>
                  {voiceProfiles?.map((p) => {
                    const isSelected = activeVoiceProfile?.id === p.id;
                    return (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProfile(p)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: 12,
                          borderRadius: 12,
                          border: `1.5px solid ${isSelected ? '#7C3AED' : '#E2E8F0'}`,
                          backgroundColor: isSelected ? 'rgba(124, 58, 237, 0.05)' : '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          position: 'relative'
                        }}
                      >
                        <img
                          src={p.avatar}
                          alt={p.name}
                          style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 6 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontSize: 14, fontWeight: 700, color: isSelected ? '#7C3AED' : '#0F172A' }}>{p.name}</span>
                              {p.isCloned && (
                                <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', borderRadius: 4, backgroundColor: '#FEE2E2', color: '#DC2626' }}>
                                  Cloned
                                </span>
                              )}
                              <span style={{ fontSize: 11, color: '#64748B' }}>({p.gender})</span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => handlePreviewVoice(e, p)}
                              title="Nghe thử giọng mẫu"
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 4,
                                padding: '3px 8px',
                                borderRadius: 6,
                                border: '1px solid rgba(124, 58, 237, 0.3)',
                                backgroundColor: isSelected ? '#7C3AED' : 'rgba(124, 58, 237, 0.08)',
                                color: isSelected ? '#FFFFFF' : '#7C3AED',
                                fontSize: 11,
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.15s'
                              }}
                            >
                              <Volume2 size={12} />
                              <span>Thử giọng</span>
                            </button>
                          </div>
                          <p style={{ margin: '2px 0 6px 0', fontSize: 12, color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {p.description}
                          </p>
                          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {p.tone && (
                              <span style={{ fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 4, backgroundColor: '#FEF3C7', color: '#B45309' }}>
                                🎵 {p.tone}
                              </span>
                            )}
                            <span style={{ fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 4, backgroundColor: '#F1F5F9', color: '#475569' }}>
                              ⚡ {p.engine}
                            </span>
                            <span style={{ fontSize: 10, fontWeight: 600, padding: '1px 6px', borderRadius: 4, backgroundColor: '#EDE9FE', color: '#6D28D9' }}>
                              {p.language}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Text Input & Synthesizer Player */}
              <div style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Active Selected Voice Indicator Card */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  backgroundColor: '#F5F3FF',
                  borderRadius: 10,
                  border: '1px solid #DDD6FE'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img
                      src={activeVoiceProfile?.avatar}
                      alt=""
                      style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#5B21B6' }}>
                        Đang chọn: {activeVoiceProfile?.name} ({activeVoiceProfile?.gender})
                      </div>
                      <div style={{ fontSize: 11, color: '#7C3AED', fontWeight: 600 }}>
                        {activeVoiceProfile?.tone || activeVoiceProfile?.engine} • {activeVoiceProfile?.language}
                      </div>
                    </div>
                  </div>
                  {activeVoiceProfile?.sampleText && (
                    <button
                      type="button"
                      onClick={() => setTtsScript(activeVoiceProfile.sampleText)}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: '4px 10px',
                        borderRadius: 6,
                        border: '1px solid #C4B5FD',
                        backgroundColor: '#FFFFFF',
                        color: '#6D28D9',
                        cursor: 'pointer'
                      }}
                      title="Nạp câu thoại mẫu phù hợp nhất với chất giọng này"
                    >
                      Điền câu mẫu
                    </button>
                  )}
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <label style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>
                      Kịch Bản Lồng Tiếng (Voiceover Script)
                    </label>
                    <span style={{ fontSize: 12, color: '#94A3B8' }}>{ttsScript.length} ký tự</span>
                  </div>
                  <textarea
                    rows={5}
                    value={ttsScript}
                    onChange={(e) => setTtsScript(e.target.value)}
                    placeholder="Nhập nội dung cần chuyển thành giọng nói..."
                    style={{
                      width: '100%',
                      padding: 12,
                      borderRadius: 10,
                      border: '1px solid #CBD5E1',
                      fontSize: 14,
                      lineHeight: 1.6,
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Speed & Pitch Controls */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>
                      <span>Tốc độ đọc (Speed)</span>
                      <span>{ttsSpeed}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="2.0"
                      step="0.1"
                      value={ttsSpeed}
                      onChange={(e) => setTtsSpeed(parseFloat(e.target.value))}
                      style={{ width: '100%', accentColor: '#7C3AED' }}
                    />
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 600, color: '#475569', marginBottom: 4 }}>
                      <span>Cao độ (Pitch)</span>
                      <span>{ttsPitch}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="1.5"
                      step="0.1"
                      value={ttsPitch}
                      onChange={(e) => setTtsPitch(parseFloat(e.target.value))}
                      style={{ width: '100%', accentColor: '#7C3AED' }}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    type="button"
                    disabled={isSynthesizing}
                    onClick={handleSynthesizeVoice}
                    style={{
                      flex: 1,
                      padding: '12px 20px',
                      borderRadius: 10,
                      border: 'none',
                      backgroundColor: '#7C3AED',
                      color: '#FFFFFF',
                      fontWeight: 700,
                      fontSize: 14,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      cursor: isSynthesizing ? 'not-allowed' : 'pointer',
                      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                      opacity: isSynthesizing ? 0.7 : 1
                    }}
                  >
                    {isSynthesizing ? <RefreshCw size={16} className="animate-spin" /> : <Volume2 size={16} />}
                    <span>{isSynthesizing ? 'Đang tạo âm thanh...' : `Phát Giọng ${activeVoiceProfile?.name || 'AI'} (-5 credits)`}</span>
                  </button>

                  {isSpeaking && (
                    <button
                      type="button"
                      onClick={stopVoiceSpeech}
                      style={{
                        padding: '12px 18px',
                        borderRadius: 10,
                        border: '1px solid #FCA5A5',
                        backgroundColor: '#FEF2F2',
                        color: '#DC2626',
                        fontWeight: 700,
                        fontSize: 14,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6
                      }}
                    >
                      <VolumeX size={16} />
                      <span>Dừng phát</span>
                    </button>
                  )}
                </div>

                {/* Audio Status Card & Visualizer */}
                {lastSpeechResult && (
                  <div style={{
                    padding: 16,
                    borderRadius: 12,
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          backgroundColor: '#7C3AED',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFFFFF'
                        }}>
                          <Play size={14} fill="#FFFFFF" />
                        </div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A' }}>
                            {lastSpeechResult.profile?.name} • {lastSpeechResult.durationSec}s
                          </div>
                          <div style={{ fontSize: 11, color: '#64748B' }}>
                            {lastSpeechResult.profile?.tone || lastSpeechResult.engine} • {lastSpeechResult.routedVia}
                          </div>
                        </div>
                      </div>

                      {lastSpeechResult.audioUrl && (
                        <a
                          href={lastSpeechResult.audioUrl}
                          download={`topdoo_voice_${lastSpeechResult.profile?.id || 'speech'}.wav`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 4,
                            padding: '6px 10px',
                            borderRadius: 6,
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#334155',
                            textDecoration: 'none'
                          }}
                        >
                          <Download size={13} />
                          <span>Tải WAV</span>
                        </a>
                      )}
                    </div>

                    {/* Audio Player Controls */}
                    {lastSpeechResult.audioUrl && (
                      <audio
                        src={lastSpeechResult.audioUrl}
                        controls
                        style={{ width: '100%', height: 32, marginTop: 4, outline: 'none' }}
                      />
                    )}

                    {/* Animated Waveform Bars */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 28, padding: '4px 8px', backgroundColor: '#FFFFFF', borderRadius: 6, border: '1px solid #E2E8F0' }}>
                      {[40, 70, 30, 90, 60, 100, 45, 80, 50, 95, 75, 40, 65, 85, 30, 70, 55, 90, 45, 60, 35, 80, 50].map((h, i) => (
                        <div
                          key={i}
                          style={{
                            flex: 1,
                            height: isSpeaking ? `${h}%` : '20%',
                            backgroundColor: isSpeaking ? '#7C3AED' : '#CBD5E1',
                            borderRadius: 2,
                            transition: 'height 0.2s ease'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: ZERO-SHOT VOICE CLONING */}
          {voiceStudioTab === 'clone' && (
            <div style={{ backgroundColor: '#FFFFFF', padding: 32, borderRadius: 16, border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', maxWidth: 760, margin: '0 auto' }}>
              <div style={{ marginBottom: 24, textAlign: 'center' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', backgroundColor: 'rgba(124, 58, 237, 0.1)', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <Mic size={26} />
                </div>
                <h3 style={{ margin: '0 0 6px 0', fontSize: 20, fontWeight: 800, color: '#0F172A' }}>
                  Nhân Bản Giọng Nói Mới (Zero-shot Cloning)
                </h3>
                <p style={{ margin: 0, fontSize: 13, color: '#64748B' }}>
                  Chỉ cần cung cấp 1 đoạn mẫu âm thanh từ 3 đến 10 giây. AI của Voicebox sẽ phân tích âm vực và tái tạo giọng đọc của bạn.
                </p>
              </div>

              <form onSubmit={handleCloneVoiceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Tên Giọng Nói Mới *
                    </label>
                    <input
                      type="text"
                      required
                      value={cloneName}
                      onChange={(e) => setCloneName(e.target.value)}
                      placeholder="Ví dụ: Giọng MC Minh Quân, Giọng CEO..."
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                      Giới Tính
                    </label>
                    <select
                      value={cloneGender}
                      onChange={(e) => setCloneGender(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13, backgroundColor: '#FFFFFF' }}
                    >
                      <option value="Nữ">Nữ</option>
                      <option value="Nam">Nam</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Mô Tả Giọng
                  </label>
                  <input
                    type="text"
                    value={cloneDesc}
                    onChange={(e) => setCloneDesc(e.target.value)}
                    placeholder="Ví dụ: Giọng ấm áp, truyền cảm, thích hợp làm video review..."
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #CBD5E1', fontSize: 13, boxSizing: 'border-box' }}
                  />
                </div>

                {/* Audio Upload / Record Box */}
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                    Mẫu Âm Thanh (Audio Sample 3 - 10s)
                  </label>
                  <div style={{
                    border: '2px dashed #CBD5E1',
                    borderRadius: 12,
                    padding: '24px 16px',
                    textAlign: 'center',
                    backgroundColor: '#F8FAFC',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    setCloneFileName('audio_sample_recording.wav');
                    showToast('Đã chọn mẫu', 'Đã tải lên audio_sample_recording.wav (5.4 giây)', 'info');
                  }}
                  >
                    <UploadCloud size={32} color="#7C3AED" style={{ margin: '0 auto 8px' }} />
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>
                      {cloneFileName ? `Đã chọn: ${cloneFileName}` : 'Kéo thả file âm thanh (MP3/WAV) vào đây hoặc bấm để chọn'}
                    </div>
                    <div style={{ fontSize: 11, color: '#64748B', marginTop: 4 }}>
                      Khuyến nghị đoạn nói rõ ràng, không lẫn tạp âm, thời lượng từ 3 đến 10 giây.
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCloningVoice}
                  style={{
                    padding: '14px 20px',
                    borderRadius: 10,
                    border: 'none',
                    backgroundColor: '#7C3AED',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    cursor: isCloningVoice ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                    marginTop: 8
                  }}
                >
                  {isCloningVoice ? <RefreshCw size={16} className="animate-spin" /> : <Mic size={16} />}
                  <span>{isCloningVoice ? 'Đang phân tích âm sắc & Clone...' : 'Bắt Đầu Nhân Bản Giọng Nói (-20 credits)'}</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      {/* 6. Section: "Ai nên dùng Topdoo Studio?" */}
      <section className="studio-audience-section">
        <div className="landing-container">
          <div className="section-header-center">
            <h2 className="section-heading-main">Ai nên dùng Topdoo Studio?</h2>
            <p className="section-subheading-text">Phù hợp cho mọi nhu cầu sáng tạo nội dung.</p>
          </div>

          <div className="studio-audience-grid">
            {audiences.map((aud) => {
              const IconComp = aud.icon;
              return (
                <div
                  key={aud.id}
                  className="studio-audience-card"
                  onClick={() => showToast(aud.title, `Giải pháp tối ưu dành cho ${aud.title}!`, 'info')}
                >
                  <div className="audience-img-wrap">
                    <img src={aud.img} alt={aud.title} className="audience-card-img" />
                  </div>

                  <div className="audience-card-body">
                    <div className="audience-header-row">
                      <div className="audience-badge-icon" style={{ backgroundColor: aud.iconBg }}>
                        <IconComp size={14} color="#FFFFFF" />
                      </div>
                      <h3 className="audience-card-title">{aud.title}</h3>
                    </div>
                    <p className="audience-card-desc">{aud.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Section: Bottom CTA Banner with /bannerFooterStudio.png */}
      <section className="studio-bottom-cta-section">
        <div className="studio-footer-bg-wrap">
          <img
            src="/bannerFooterStudio.png"
            alt="Topdoo Studio Bottom Banner"
            className="studio-footer-bg-img"
          />
        </div>

        <div className="landing-container studio-footer-container">
          <div className="studio-footer-content">
            <h2 className="studio-footer-title">
              Bắt đầu hành trình sáng tạo cùng Topdoo Studio
            </h2>
            <p className="studio-footer-desc">
              Biến ý tưởng thành những nội dung ấn tượng ngay hôm nay.
            </p>

            <div className="studio-footer-buttons">
              <button
                className="btn-studio-footer-primary"
                onClick={() => showToast('Dùng thử miễn phí', 'Chào mừng bạn đến với Topdoo Studio! Trải nghiệm ngay 14 ngày miễn phí.', 'success')}
              >
                <span>Dùng thử miễn phí</span>
                <ArrowRight size={16} />
              </button>

              <button
                className="btn-studio-footer-secondary"
                onClick={() => showToast('Liên hệ tư vấn', 'Yêu cầu tư vấn của bạn đã được tiếp nhận. Đội ngũ chuyên gia sẽ liên hệ sớm nhất.', 'success')}
              >
                <span>Liên hệ tư vấn</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Interactive Video Preview Modal */}
      {isVideoModalOpen && (
        <div className="studio-video-modal-backdrop" onClick={() => setIsVideoModalOpen(false)}>
          <div className="studio-video-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="studio-video-modal-close"
              onClick={() => setIsVideoModalOpen(false)}
              aria-label="Đóng video"
            >
              <X size={20} />
            </button>

            <div className="studio-video-player-mockup">
              <div className="video-player-header">
                <div className="video-player-dots">
                  <span className="dot dot-red" />
                  <span className="dot dot-yellow" />
                  <span className="dot dot-green" />
                </div>
                <div className="video-player-title">Topdoo Studio — Trải nghiệm sáng tạo nội dung AI thế hệ mới</div>
              </div>

              <div className="video-player-screen">
                <img
                  src="/bannerStudioroute.png"
                  alt="Video Player Preview"
                  className="video-player-bg"
                />
                <div className="video-player-center-play">
                  <div className="big-play-btn">
                    <Play size={36} fill="#7C3AED" color="#7C3AED" />
                  </div>
                  <div className="video-player-badge">Trải nghiệm tương tác 4K</div>
                </div>

                <div className="video-player-controls-bar">
                  <div className="controls-left">
                    <Play size={16} fill="#FFFFFF" color="#FFFFFF" />
                    <span className="controls-time">02:18 / 04:30</span>
                  </div>
                  <div className="controls-progress">
                    <div className="progress-fill" style={{ width: '52%' }} />
                  </div>
                  <div className="controls-right">
                    <span className="controls-hd">1080p HD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Canvas Workspace Modal (Interactive Studio Editor) */}
      {isCanvasOpen && (
        <div className="studio-canvas-modal-overlay" style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div className="studio-canvas-modal-card" style={{
            width: '100%',
            maxWidth: 1200,
            height: '90vh',
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '1px solid #E2E8F0'
          }}>
            {/* Modal Top Bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 24px',
              borderBottom: '1px solid #E2E8F0',
              backgroundColor: '#F8FAFC'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  backgroundColor: '#7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}>
                  <Wand2 size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0F172A' }}>
                    Topdoo Studio Canvas Workspace
                  </h3>
                  <span style={{ fontSize: 12, color: '#64748B' }}>
                    Trình tạo nội dung & layout đồ họa đa phương tiện với AI
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  padding: '6px 14px',
                  backgroundColor: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  borderRadius: 20,
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#1D4ED8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6
                }}>
                  <span>🪙 Số dư:</span>
                  <strong>{creditBalance.toLocaleString()} cr</strong>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCanvasOpen(false)}
                  style={{
                    border: 'none',
                    background: '#F1F5F9',
                    borderRadius: 8,
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#64748B'
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body: 2 Columns */}
            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
              {/* Left Control Panel */}
              <div style={{
                width: 380,
                borderRight: '1px solid #E2E8F0',
                padding: 20,
                overflowY: 'auto',
                backgroundColor: '#FAFAFA',
                display: 'flex',
                flexDirection: 'column',
                gap: 16
              }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
                    1. Định dạng tài sản (Format)
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {[
                      { id: 'DESIGN', label: 'Infographic/Ảnh', cost: 15, icon: ImageIcon },
                      { id: 'VIDEO', label: 'Kịch bản Video', cost: 25, icon: Video },
                      { id: 'PRESENTATION', label: 'Slide Báo cáo', cost: 20, icon: Presentation },
                      { id: 'TEXT', label: 'Bài viết/Advisory', cost: 10, icon: FileText }
                    ].map((fmt) => (
                      <button
                        key={fmt.id}
                        type="button"
                        onClick={() => setSelectedFormat(fmt.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '10px 12px',
                          borderRadius: 8,
                          border: selectedFormat === fmt.id ? '2px solid #7C3AED' : '1px solid #CBD5E1',
                          backgroundColor: selectedFormat === fmt.id ? '#FAF5FF' : '#FFFFFF',
                          color: selectedFormat === fmt.id ? '#7C3AED' : '#475569',
                          fontWeight: 600,
                          fontSize: 12,
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <fmt.icon size={16} />
                        <div>
                          <div>{fmt.label}</div>
                          <span style={{ fontSize: 10, color: '#94A3B8' }}>{fmt.cost} credits</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
                    2. Chọn mẫu Template sẵn
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {STUDIO_TEMPLATES.map((tmpl) => (
                      <div
                        key={tmpl.id}
                        onClick={() => {
                          setSelectedFormat(tmpl.type);
                          setCanvasPrompt(tmpl.description);
                          showToast('Đã chọn template', tmpl.title, 'info');
                        }}
                        style={{
                          padding: 10,
                          borderRadius: 8,
                          border: '1px solid #E2E8F0',
                          backgroundColor: '#FFFFFF',
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ fontSize: 12, fontWeight: 600, color: '#1E293B' }}>{tmpl.title}</div>
                        <div style={{ fontSize: 11, color: '#64748B' }}>{tmpl.dimensions} • {tmpl.creditCost} credits</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 8 }}>
                    3. Mô tả yêu cầu (Prompt)
                  </label>
                  <textarea
                    rows={4}
                    value={canvasPrompt}
                    onChange={(e) => setCanvasPrompt(e.target.value)}
                    placeholder="Mô tả nội dung, bối cảnh, đối tượng độc giả hoặc phong cách hình ảnh mong muốn..."
                    style={{
                      width: '100%',
                      padding: 12,
                      borderRadius: 8,
                      border: '1px solid #CBD5E1',
                      fontSize: 13,
                      resize: 'none',
                      fontFamily: 'inherit',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <button
                  type="button"
                  disabled={isGenerating}
                  onClick={handleGenerateAsset}
                  style={{
                    padding: '12px 18px',
                    borderRadius: 10,
                    border: 'none',
                    background: 'linear-gradient(135deg, #7C3AED 0%, #9333EA 100%)',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    cursor: isGenerating ? 'not-allowed' : 'pointer',
                    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
                    opacity: isGenerating ? 0.7 : 1
                  }}
                >
                  <Wand2 size={16} />
                  <span>{isGenerating ? 'Đang kết xuất...' : 'Tạo bằng AI (Trừ credit)'}</span>
                </button>

                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: 12 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 8 }}>
                    Dự án gần đây ({studioProjectsList.length})
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 140, overflowY: 'auto' }}>
                    {studioProjectsList.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => setActiveProject(p)}
                        style={{
                          padding: '8px 10px',
                          borderRadius: 6,
                          backgroundColor: activeProject.id === p.id ? '#EDE9FE' : '#FFFFFF',
                          border: '1px solid #E2E8F0',
                          cursor: 'pointer',
                          fontSize: 12,
                          color: '#1E293B',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {p.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Canvas Interactive Preview */}
              <div style={{
                flex: 1,
                padding: 24,
                backgroundColor: '#F1F5F9',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                overflowY: 'auto'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h4 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                      {activeProject.title}
                    </h4>
                    <span style={{ fontSize: 12, color: '#64748B' }}>
                      Định dạng: {activeProject.type} • Tiêu hao: {activeProject.creditsUsed} credits
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <button
                      type="button"
                      onClick={handleCopyProject}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '8px 12px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#334155',
                        cursor: 'pointer'
                      }}
                    >
                      <Copy size={14} />
                      <span>Sao chép</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadProject}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '8px 12px',
                        backgroundColor: '#FFFFFF',
                        border: '1px solid #CBD5E1',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        color: '#334155',
                        cursor: 'pointer'
                      }}
                    >
                      <Download size={14} />
                      <span>Tải JSON</span>
                    </button>
                  </div>
                </div>

                {/* Canvas Sheet */}
                <div style={{
                  flex: 1,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 12,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E2E8F0',
                  padding: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  minHeight: 400
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    padding: '4px 10px',
                    borderRadius: 20,
                    backgroundColor: '#F1F5F9',
                    fontSize: 11,
                    fontWeight: 600,
                    color: '#64748B'
                  }}>
                    Canvas Scale: 100%
                  </div>

                  <div style={{
                    borderBottom: '2px solid #7C3AED',
                    paddingBottom: 16,
                    marginBottom: 20
                  }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.08em',
                      color: '#7C3AED',
                      textTransform: 'uppercase'
                    }}>
                      TOPDOO STUDIO GENERATED ASSET
                    </span>
                    <h2 style={{ margin: '8px 0 4px 0', fontSize: 24, fontWeight: 800, color: '#0F172A' }}>
                      {activeProject.title}
                    </h2>
                    <p style={{ margin: 0, fontSize: 13, color: '#64748B', fontStyle: 'italic' }}>
                      Yêu cầu gốc: "{activeProject.prompt}"
                    </p>
                  </div>

                  <div style={{
                    flex: 1,
                    backgroundColor: '#F8FAFC',
                    borderRadius: 8,
                    padding: 20,
                    border: '1px dashed #CBD5E1',
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: '#334155',
                    whiteSpace: 'pre-wrap',
                    fontFamily: 'monospace'
                  }}>
                    {activeProject.outputContent || 'Chưa có nội dung kết xuất.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. Global Marketing Footer */}
      <MarketingFooter />
    </div>
  );
}
