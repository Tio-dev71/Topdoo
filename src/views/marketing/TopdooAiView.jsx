import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  ChevronRight,
  Play,
  Check,
  Sparkles,
  Bot,
  Zap,
  Search,
  MessageSquare,
  Image as ImageIcon,
  Video,
  BookOpen,
  Users,
  Compass,
  FileText,
  LayoutGrid,
  Layers,
  Tag,
  TrendingUp,
  Settings,
  Shield,
  Code2,
  Globe,
  Plus,
  Send,
  Mic,
  BarChart3,
  Clock,
  CheckCircle2,
  FolderOpen,
  Cpu,
  Monitor,
  Smartphone,
  Sparkle,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';

export function TopdooAiView() {
  const {
    navigateMarketing,
    setMode,
    setCurrentView,
    showToast,
    sendAiPrompt,
    creditBalance,
    addCredits,
    AI_MODELS,
    nineRouterConfig,
    nineRouterHealth,
    refresh9RouterHealth,
    update9RouterSettings,
    generateVoiceSpeech,
    stopVoiceSpeech,
    isSpeaking
  } = useSecurity();

  // Voice Speech Playing State
  const [speakingMsgId, setSpeakingMsgId] = useState(null);

  // 9Router Modal State
  const [is9RouterModalOpen, setIs9RouterModalOpen] = useState(false);
  const [custom9RouterUrl, setCustom9RouterUrl] = useState(nineRouterConfig?.baseUrl || '/api/9router/v1');
  const [custom9RouterKey, setCustom9RouterKey] = useState(nineRouterConfig?.apiKey || '');
  const [isPinging9Router, setIsPinging9Router] = useState(false);

  // Active feature tab in horizontal ribbon
  const [activeFeatureTab, setActiveFeatureTab] = useState('chat');

  // Interactive Live Workspace State
  const [selectedModel, setSelectedModel] = useState('gpt-5');
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState('chat');
  const [promptInput, setPromptInput] = useState('');
  const [activeSearchTool, setActiveSearchTool] = useState(false);
  const [activeAnalyzeTool, setActiveAnalyzeTool] = useState(false);
  const [activeImageTool, setActiveImageTool] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const chatScrollRef = useRef(null);

  const modelsList = AI_MODELS && AI_MODELS.length > 0 ? AI_MODELS : [
    { id: 'gpt-5', name: 'GPT-5', color: '#10A37F', provider: 'OpenAI', creditCost: 15, desc: 'Mô hình tư duy đa nhiệm thế hệ mới' },
    { id: 'claude', name: 'Claude', color: '#D97706', provider: 'Anthropic', creditCost: 12, desc: 'Xử lý ngữ cảnh sâu & viết văn phong phú' },
    { id: 'gemini', name: 'Gemini', color: '#7C3AED', provider: 'Google', creditCost: 5, desc: 'Đa phương tiện & tốc độ phản hồi cực nhanh' },
    { id: 'deepseek', name: 'DeepSeek', color: '#0284C7', provider: 'DeepSeek', creditCost: 8, desc: 'Suy luận logic toán học & lập trình' },
    { id: 'llama', name: 'Llama', color: '#2563EB', provider: 'Meta', creditCost: 4, desc: 'Mã nguồn mở linh hoạt & tối ưu' }
  ];

  const handleSendPrompt = async (textToSend) => {
    const text = (textToSend || promptInput).trim();
    if (!text || isGenerating) return;

    const userMsg = { role: 'user', content: text, id: Date.now() };
    setChatMessages((prev) => [...prev, userMsg]);
    setPromptInput('');
    setIsGenerating(true);

    try {
      const response = await sendAiPrompt(text, selectedModel);
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.content,
          id: Date.now() + 1,
          model: response.model,
          isFallback: response.isFallback,
          fallbackReason: response.fallbackReason,
          routedVia: response.routedVia,
          metrics: response.metrics
        }
      ]);
    } catch (err) {
      setChatMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ Có sự cố kết nối tới Cổng AI Gateway. Vui lòng kiểm tra lại kết nối mạng hoặc số dư credit!',
          id: Date.now() + 1
        }
      ]);
    } finally {
      setIsGenerating(false);
      setTimeout(() => {
        if (chatScrollRef.current) {
          chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
        }
      }, 60);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendPrompt(suggestion);
  };

  const scrollToWorkspace = () => {
    const el = document.getElementById('ai-workspace-preview');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="topdoo-landing topdoo-ai-page">
      {/* 1. Universal Topdoo Marketing Header */}
      <MarketingHeader />

      {/* 2. Hero Section with bannerAIroute.png and Integrated Breadcrumbs */}
      <section className="ai-hero-section">
        {/* Full-bleed background visual with SVG text overlay locked to banner coordinates */}
        <div className="ai-hero-bg-wrap">
          <img
            src="/bannerAIroute.png"
            alt="Topdoo AI Route Banner"
            className="ai-hero-bg-img"
          />
          <svg
            viewBox="0 0 2048 768"
            preserveAspectRatio="xMaxYMid slice"
            className="ai-hero-svg-overlay"
          >
            {/* 1. Hoi */}
            <text x="1308" y="146" fill="#FFFFFF" fontSize="24" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">Hỏi</text>
            <text x="1308" y="174" fill="#E0F2FE" fontSize="15" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">Mọi điều bạn muốn</text>

            {/* 2. Tim kiem */}
            <text x="1715" y="152" fill="#FFFFFF" fontSize="24" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">Tìm kiếm</text>
            <text x="1715" y="180" fill="#E0F2FE" fontSize="15" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">Thông tin chính xác</text>

            {/* 3. Phan tich */}
            <text x="1115" y="296" fill="#FFFFFF" fontSize="24" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">Phân tích</text>
            <text x="1115" y="324" fill="#E0F2FE" fontSize="15" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">Tài liệu, dữ liệu</text>

            {/* 4. Sang tao */}
            <text x="1765" y="306" fill="#FFFFFF" fontSize="24" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">Sáng tạo</text>
            <text x="1765" y="334" fill="#E0F2FE" fontSize="15" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">Hình ảnh, video, nội dung</text>

            {/* 5. An toan */}
            <text x="1705" y="470" fill="#FFFFFF" fontSize="24" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">An toàn</text>
            <text x="1705" y="498" fill="#E0F2FE" fontSize="15" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">Bảo mật & riêng tư</text>

            {/* Slogan */}
            <g transform="translate(1710, 625) rotate(-6)">
              <text x="0" y="0" fill="#1E3A8A" fontSize="32" fontWeight="700" fontStyle="italic" fontFamily="'Brush Script MT', 'Caveat', cursive, sans-serif">Good Technology</text>
              <text x="22" y="34" fill="#1E3A8A" fontSize="32" fontWeight="700" fontStyle="italic" fontFamily="'Brush Script MT', 'Caveat', cursive, sans-serif">A Brighter Tomorrow.</text>
            </g>
          </svg>
        </div>

        <div className="landing-container ai-hero-container">
          {/* Breadcrumbs sitting directly on top of the hero banner */}
          <div className="ai-hero-breadcrumbs">
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
            <span className="breadcrumb-current">Topdoo AI</span>
          </div>

          <div className="ai-hero-grid">
            {/* Left Content Column */}
            <div className="ai-hero-left">
              <div className="ai-hero-pill">
                <Globe size={13} color="#2563EB" />
                <span>TOPDOO AI</span>
              </div>

              <h1 className="ai-hero-heading">
                Topdoo AI<br />
                <span className="ai-heading-blue">Trợ lý AI thông minh</span><br />
                cho mọi công việc
              </h1>

              <p className="ai-hero-subheading">
                Topdoo AI giúp bạn làm việc nhanh hơn, sáng tạo hơn và an toàn hơn. Từ chat, tìm kiếm, phân tích, tạo nội dung đến tự động hoá – tất cả trong một nền tảng.
              </p>

              <div className="ai-hero-cta-group">
                <button
                  className="btn-ai-hero-primary"
                  onClick={scrollToWorkspace}
                >
                  <span>Dùng thử miễn phí</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  className="btn-ai-hero-secondary"
                  onClick={() => showToast('Video giới thiệu', 'Đang tải video trải nghiệm Topdoo AI...', 'info')}
                >
                  <div className="play-icon-circle">
                    <Play size={12} fill="#2563EB" color="#2563EB" />
                  </div>
                  <span>Xem video</span>
                </button>
              </div>

              {/* 3 Value Props Bar */}
              <div className="ai-hero-badges-row">
                <div className="ai-value-badge">
                  <div className="ai-badge-icon icon-blue">
                    <Zap size={16} />
                  </div>
                  <div className="ai-badge-text">
                    <div className="ai-badge-title">Nhanh hơn</div>
                    <div className="ai-badge-desc">Tiết kiệm thời gian</div>
                  </div>
                </div>

                <div className="ai-value-badge">
                  <div className="ai-badge-icon icon-cyan">
                    <TrendingUp size={16} />
                  </div>
                  <div className="ai-badge-text">
                    <div className="ai-badge-title">Thông minh hơn</div>
                    <div className="ai-badge-desc">Nâng cao hiệu suất</div>
                  </div>
                </div>

                <div className="ai-value-badge">
                  <div className="ai-badge-icon icon-indigo">
                    <Shield size={16} />
                  </div>
                  <div className="ai-badge-text">
                    <div className="ai-badge-title">An toàn hơn</div>
                    <div className="ai-badge-desc">Bảo vệ dữ liệu</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Spacing Column for 3D Robot artwork */}
            <div className="ai-hero-right" />
          </div>
        </div>
      </section>

      {/* 4. Horizontal Quick Feature Ribbon (9 Items) */}
      <section className="ai-feature-ribbon-section">
        <div className="landing-container">
          <div className="ai-feature-ribbon-card">
            {[
              { id: 'chat', label: 'AI Chat', icon: MessageSquare, desc: 'Trò chuyện thông minh' },
              { id: 'search', label: 'AI Search', icon: Search, desc: 'Tìm kiếm chính xác' },
              { id: 'research', label: 'Deep Research', icon: FileText, desc: 'Nghiên cứu đa nguồn' },
              { id: 'document', label: 'Phân tích tài liệu', icon: BookOpen, desc: 'Trích xuất dữ liệu' },
              { id: 'image', label: 'AI Image', icon: ImageIcon, desc: 'Tạo hình ảnh 4K' },
              { id: 'workspace', label: 'Workspace', icon: LayoutGrid, desc: 'Không gian làm việc' },
              { id: 'agents', label: 'AI Agents', icon: Bot, desc: 'Trợ lý tự động hóa' },
              { id: 'models', label: 'Models', icon: Layers, desc: 'Đa mô hình AI' },
              { id: 'pricing', label: 'Pricing', icon: Tag, desc: 'Bảng giá linh hoạt' }
            ].map((item) => {
              const IconComp = item.icon;
              const isActive = activeFeatureTab === item.id;
              return (
                <div
                  key={item.id}
                  className={`ai-ribbon-item ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setActiveFeatureTab(item.id);
                    scrollToWorkspace();
                  }}
                >
                  <div className="ai-ribbon-icon-box">
                    <IconComp size={18} />
                  </div>
                  <div className="ai-ribbon-label">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Section: "Sức mạnh của Topdoo AI" & Live Interactive Workspace */}
      <section id="ai-workspace-preview" className="ai-power-section">
        <div className="landing-container">
          <div className="ai-power-grid">
            {/* Left Column: Strengths & Capabilities */}
            <div className="ai-power-left">
              <h2 className="ai-power-heading">Sức mạnh của Topdoo AI</h2>
              <p className="ai-power-desc">
                Được xây dựng trên các mô hình AI tiên tiến hàng đầu thế giới, Topdoo AI mang đến trải nghiệm thông minh, an toàn và cá nhân hoá cho từng người dùng.
              </p>

              <div className="ai-strengths-list">
                {[
                  {
                    title: 'Đa mô hình, đa khả năng',
                    desc: 'Hỗ trợ nhiều mô hình AI mạnh mẽ (GPT, Claude, Gemini...)',
                    icon: Monitor
                  },
                  {
                    title: 'Hiểu ngữ cảnh sâu',
                    desc: 'Trả lời chính xác, tự nhiên, phù hợp nhu cầu',
                    icon: Compass
                  },
                  {
                    title: 'Tích hợp công cụ mạnh mẽ',
                    desc: 'Tìm kiếm, phân tích, tạo nội dung, tự động hoá...',
                    icon: LayoutGrid
                  },
                  {
                    title: 'Bảo mật và riêng tư',
                    desc: 'Dữ liệu của bạn luôn được bảo vệ',
                    icon: Shield
                  },
                  {
                    title: 'Dùng mọi lúc, mọi nơi',
                    desc: 'Trên web, mobile và tích hợp với các sản phẩm TOP',
                    icon: Smartphone
                  }
                ].map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <div key={idx} className="ai-strength-card">
                      <div className="ai-strength-icon">
                        <IconComp size={18} color="#2563EB" />
                      </div>
                      <div className="ai-strength-text">
                        <div className="ai-strength-title">{item.title}</div>
                        <div className="ai-strength-sub">{item.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Live Interactive Workspace Mockup */}
            <div className="ai-workspace-container">
              <div className="ai-workspace-card">
                {/* Mini Left Sidebar */}
                <div className="ws-mini-sidebar">
                  <div className="ws-sidebar-brand">
                    <img src="/topdoo.jpeg" alt="Logo" className="ws-brand-logo" />
                    <span className="ws-brand-name">TOPDOO AI</span>
                  </div>

                  <nav className="ws-sidebar-nav">
                    {[
                      { id: 'chat', label: 'Chat', icon: MessageSquare },
                      { id: 'image', label: 'Tạo hình ảnh', icon: ImageIcon },
                      { id: 'analysis', label: 'Phân tích', icon: BarChart3 },
                      { id: 'research', label: 'Nghiên cứu sâu', icon: BookOpen },
                      { id: 'library', label: 'Thư viện', icon: FolderOpen },
                      { id: 'agents', label: 'Agents', icon: Bot },
                      { id: 'history', label: 'Lịch sử', icon: Clock }
                    ].map((tab) => {
                      const IconComp = tab.icon;
                      const isActive = activeWorkspaceTab === tab.id;
                      return (
                        <div
                          key={tab.id}
                          className={`ws-nav-btn ${isActive ? 'active' : ''}`}
                          onClick={() => {
                            setActiveWorkspaceTab(tab.id);
                            showToast('Chuyển chế độ', `Đã chuyển sang không gian ${tab.label}`, 'info');
                          }}
                        >
                          <IconComp size={15} />
                          <span>{tab.label}</span>
                        </div>
                      );
                    })}
                  </nav>

                  <button
                    className="ws-new-chat-btn"
                    onClick={() => {
                      setChatMessages([]);
                      showToast('Cuộc trò chuyện mới', 'Đã khởi tạo phiên trò chuyện trống.', 'success');
                    }}
                  >
                    <Plus size={14} />
                    <span>Cuộc trò chuyện mới</span>
                  </button>
                </div>

                {/* Main Workspace Area */}
                <div className="ws-main-area">
                  {/* Top Bar with User Profile */}
                  <div className="ws-topbar">
                    <div className="ws-topbar-right">
                      {/* 9Router Status Pill */}
                      <button
                        type="button"
                        onClick={() => setIs9RouterModalOpen(true)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 11,
                          fontWeight: 700,
                          padding: '4px 10px',
                          borderRadius: 8,
                          border: `1px solid ${nineRouterHealth?.isOnline ? 'rgba(16, 185, 129, 0.4)' : 'rgba(245, 158, 11, 0.4)'}`,
                          background: nineRouterHealth?.isOnline ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                          color: nineRouterHealth?.isOnline ? '#34D399' : '#FBBF24',
                          cursor: 'pointer',
                          marginRight: 4
                        }}
                        title="Bấm để cấu hình 9Router AI Gateway"
                      >
                        <span style={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          background: nineRouterHealth?.isOnline ? '#10B981' : '#F59E0B',
                          boxShadow: nineRouterHealth?.isOnline ? '0 0 8px #10B981' : 'none'
                        }} />
                        <span>9Router: {nineRouterHealth?.isOnline ? `Online (${nineRouterHealth.modelsCount || 49} models)` : 'Offline'}</span>
                        <Settings size={12} style={{ opacity: 0.8 }} />
                      </button>

                      <div className="ws-pro-badge">
                        <span>⭐ Pro</span>
                      </div>
                      <div
                        onClick={() => addCredits(1000, 'Nạp nhanh')}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: 11,
                          fontWeight: 700,
                          color: '#F59E0B',
                          background: 'rgba(245, 158, 11, 0.12)',
                          padding: '3px 8px',
                          borderRadius: 6,
                          cursor: 'pointer',
                          border: '1px solid rgba(245, 158, 11, 0.25)',
                          marginRight: 6
                        }}
                        title="Click để nạp nhanh +1,000 Credits"
                      >
                        <span>🪙</span>
                        <span>{creditBalance !== undefined ? creditBalance.toLocaleString() : '5,000'} cr</span>
                      </div>
                      <div className="ws-user-info">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                          alt="User Avatar"
                          className="ws-user-avatar"
                        />
                        <div className="ws-user-text">
                          <span className="ws-user-hello">Xin chào</span>
                          <span className="ws-user-name">Nguyễn Phạm Tuấn</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Chat Content Stream */}
                  <div className="ws-chat-body" ref={chatScrollRef}>
                    {chatMessages.length === 0 ? (
                      <div className="ws-welcome-block">
                        <h3 className="ws-welcome-heading">Chào mừng bạn đến với Topdoo AI</h3>
                        <p className="ws-welcome-sub">
                          Hỏi bất cứ điều gì. Sáng tạo bất cứ nội dung gì. An toàn trên mọi hành trình.
                        </p>

                        {/* Interactive Model Selector Tabs */}
                        <div className="ws-models-selector-row">
                          {modelsList.map((mod) => {
                            const isSelected = selectedModel === mod.id;
                            return (
                              <button
                                key={mod.id}
                                className={`ws-model-pill ${isSelected ? 'selected' : ''}`}
                                onClick={() => {
                                  setSelectedModel(mod.id);
                                  showToast('Đổi mô hình', `Đã chọn ${mod.name} (${mod.creditCost} credits/lượt)`, 'info');
                                }}
                                title={`${mod.desc || ''} - Tiêu hao: ${mod.creditCost} credits`}
                              >
                                <span className="model-dot" style={{ backgroundColor: mod.color }} />
                                <span className="model-title">{mod.name}</span>
                                <span style={{ fontSize: 10, padding: '1px 5px', borderRadius: 4, background: 'rgba(255,255,255,0.1)', marginLeft: 4 }}>
                                  {mod.creditCost} cr
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="ws-messages-list">
                        {chatMessages.map((msg) => (
                          <div key={msg.id} className={`ws-message-row ${msg.role}`}>
                            {msg.role === 'assistant' && (
                              <div className="ws-ai-avatar">
                                <Bot size={16} color="#FFFFFF" />
                              </div>
                            )}
                            <div className={`ws-bubble ${msg.role}`}>
                              {msg.isFallback && (
                                <div style={{
                                  marginBottom: 8,
                                  padding: '6px 10px',
                                  borderRadius: 6,
                                  background: 'rgba(245, 158, 11, 0.15)',
                                  border: '1px solid rgba(245, 158, 11, 0.3)',
                                  color: '#FCD34D',
                                  fontSize: 11,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 6
                                }}>
                                  <span>⚠️</span>
                                  <span><strong>Auto-Fallback:</strong> {msg.fallbackReason}</span>
                                </div>
                              )}
                              <div className="ws-bubble-text" style={{ whiteSpace: 'pre-wrap' }}>
                                {msg.content}
                              </div>
                              {msg.routedVia && (
                                <div style={{
                                  fontSize: 10,
                                  color: '#38BDF8',
                                  marginTop: 6,
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 4
                                }}>
                                  <span>⚡</span>
                                  <span>{msg.routedVia}</span>
                                </div>
                              )}
                               {msg.metrics && (
                                <div style={{
                                  marginTop: 8,
                                  paddingTop: 6,
                                  borderTop: '1px solid rgba(255,255,255,0.1)',
                                  fontSize: 10,
                                  color: 'rgba(255,255,255,0.5)',
                                  display: 'flex',
                                  gap: 12,
                                  alignItems: 'center',
                                  flexWrap: 'wrap'
                                }}>
                                  <span>⚡ {msg.metrics.latencyMs}ms</span>
                                  <span>🪙 -{msg.metrics.creditsDeducted} cr</span>
                                  <span>🎯 {msg.metrics.totalTokens} tokens</span>

                                  {/* Voicebox TTS Trigger */}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (speakingMsgId === msg.id) {
                                        stopVoiceSpeech();
                                        setSpeakingMsgId(null);
                                      } else {
                                        setSpeakingMsgId(msg.id);
                                        generateVoiceSpeech({ text: msg.content }).finally(() => setSpeakingMsgId(null));
                                      }
                                    }}
                                    style={{
                                      marginLeft: 'auto',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: 4,
                                      padding: '2px 8px',
                                      borderRadius: 4,
                                      border: '1px solid rgba(167, 139, 250, 0.4)',
                                      backgroundColor: speakingMsgId === msg.id ? '#7C3AED' : 'rgba(124, 58, 237, 0.2)',
                                      color: '#E9D5FF',
                                      fontSize: 10,
                                      fontWeight: 600,
                                      cursor: 'pointer'
                                    }}
                                    title="Đọc phản hồi bằng Topdoo Voice AI"
                                  >
                                    {speakingMsgId === msg.id ? <VolumeX size={11} /> : <Volume2 size={11} />}
                                    <span>{speakingMsgId === msg.id ? 'Dừng đọc' : 'Nghe đọc AI'}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                        {isGenerating && (
                          <div className="ws-message-row assistant">
                            <div className="ws-ai-avatar">
                              <Bot size={16} color="#FFFFFF" />
                            </div>
                            <div className="ws-bubble assistant generating">
                              <div className="typing-dots">
                                <span />
                                <span />
                                <span />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Input Box with Action Chips */}
                  <div className="ws-input-container">
                    <div className="ws-input-box">
                      <input
                        type="text"
                        className="ws-input-field"
                        placeholder="Hỏi Topdoo AI bất cứ điều gì..."
                        value={promptInput}
                        onChange={(e) => setPromptInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendPrompt();
                        }}
                      />

                      <div className="ws-input-actions-bar">
                        <div className="ws-tools-group">
                          <button
                            className="ws-tool-btn tool-plus"
                            title="Thêm tệp đính kèm"
                            onClick={() => showToast('Đính kèm tệp', 'Chọn file PDF, DOCX, hoặc ảnh để phân tích...', 'info')}
                          >
                            <Plus size={15} />
                          </button>

                          <button
                            className={`ws-tool-chip ${activeSearchTool ? 'active' : ''}`}
                            onClick={() => setActiveSearchTool(!activeSearchTool)}
                          >
                            <Search size={12} />
                            <span>Tìm kiếm</span>
                          </button>

                          <button
                            className={`ws-tool-chip ${activeAnalyzeTool ? 'active' : ''}`}
                            onClick={() => setActiveAnalyzeTool(!activeAnalyzeTool)}
                          >
                            <BarChart3 size={12} />
                            <span>Phân tích</span>
                          </button>

                          <button
                            className={`ws-tool-chip ${activeImageTool ? 'active' : ''}`}
                            onClick={() => setActiveImageTool(!activeImageTool)}
                          >
                            <ImageIcon size={12} />
                            <span>Tạo hình ảnh</span>
                          </button>
                        </div>

                        <div className="ws-send-group">
                          <button
                            className="ws-mic-btn"
                            title="Nhập bằng giọng nói"
                            onClick={() => showToast('Voice Input', 'Tính năng nhận diện giọng nói đang hoạt động...', 'info')}
                          >
                            <Mic size={15} />
                          </button>

                          <button
                            className={`ws-send-btn ${promptInput.trim() ? 'ready' : ''}`}
                            onClick={() => handleSendPrompt()}
                            disabled={!promptInput.trim() || isGenerating}
                            title="Gửi câu hỏi"
                          >
                            <Send size={14} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div className="ws-suggestions-row">
                      <span className="ws-sugg-label">Gợi ý cho bạn:</span>
                      <button
                        className="ws-sugg-pill"
                        onClick={() => handleSuggestionClick('Lập kế hoạch marketing cho sản phẩm công nghệ AI')}
                      >
                        <FileText size={12} color="#2563EB" />
                        <span>Lập kế hoạch marketing</span>
                      </button>
                      <button
                        className="ws-sugg-pill"
                        onClick={() => handleSuggestionClick('Tóm tắt & phân tích các chỉ số tài chính trong tài liệu PDF')}
                      >
                        <BookOpen size={12} color="#0284C7" />
                        <span>Phân tích tài liệu PDF</span>
                      </button>
                      <button
                        className="ws-sugg-pill"
                        onClick={() => handleSuggestionClick('Tạo hình ảnh 3D robot trợ lý thông minh trên nền xanh neon')}
                      >
                        <ImageIcon size={12} color="#9333EA" />
                        <span>Tạo hình ảnh</span>
                      </button>
                      <button
                        className="ws-sugg-pill"
                        onClick={() => handleSuggestionClick('Nghiên cứu chuyên sâu về xu hướng AI năm 2026')}
                      >
                        <Compass size={12} color="#0D9488" />
                        <span>Nghiên cứu chuyên sâu</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Section: "Ứng dụng trong thực tế" */}
      <section className="ai-usecases-section">
        <div className="landing-container">
          <div className="section-header-row">
            <div>
              <h2 className="section-heading-main">Ứng dụng trong thực tế</h2>
              <p className="section-subheading-text">Topdoo AI đồng hành cùng bạn trong công việc, học tập và cuộc sống.</p>
            </div>
            <a
              href="#use-cases"
              className="section-more-link"
              onClick={(e) => {
                e.preventDefault();
                showToast('Use Cases', 'Đang chuyển đến thư viện tình huống sử dụng Topdoo AI...', 'info');
              }}
            >
              <span>Xem tất cả use cases</span>
              <ArrowRight size={14} />
            </a>
          </div>

          <div className="ai-usecases-grid">
            {[
              {
                id: 'individual',
                target: 'Cá nhân',
                caption: 'Học tập, sáng tạo, làm việc hiệu quả hơn',
                img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80'
              },
              {
                id: 'business',
                target: 'Doanh nghiệp',
                caption: 'Tối ưu vận hành, tăng trưởng bền vững',
                img: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80'
              },
              {
                id: 'creator',
                target: 'Nhà sáng tạo nội dung',
                caption: 'Biến ý tưởng thành nội dung ấn tượng',
                img: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=600&auto=format&fit=crop&q=80'
              },
              {
                id: 'education',
                target: 'Giáo dục',
                caption: 'Học AI dễ dàng, ứng dụng thực tế',
                img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'
              },
              {
                id: 'family',
                target: 'Gia đình',
                caption: 'An toàn số cho bạn và người thân',
                img: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?w=600&auto=format&fit=crop&q=80'
              }
            ].map((card) => (
              <div
                key={card.id}
                className="ai-usecase-card"
                onClick={() => showToast(card.target, `Khám phá các tính năng Topdoo AI dành cho ${card.target}...`, 'info')}
              >
                <div className="ai-usecase-thumb">
                  <img
                    src={card.img}
                    alt={card.target}
                    className="ai-usecase-img"
                    loading="lazy"
                  />
                  <div className="ai-usecase-overlay" />
                </div>
                <div className="ai-usecase-body">
                  <div className="ai-usecase-target">{card.target}</div>
                  <div className="ai-usecase-caption">{card.caption}</div>
                  <div className="ai-usecase-arrow">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Section: Stats & Founder Quote */}
      <section className="ai-stats-quote-section">
        <div className="landing-container">
          <div className="ai-stats-quote-grid">
            {/* Left: 4 Stats Cards */}
            <div className="ai-stats-quad-grid">
              <div className="ai-stat-card">
                <div className="ai-stat-icon-wrap icon-users">
                  <Users size={18} color="#2563EB" />
                </div>
                <div className="ai-stat-text-col">
                  <div className="ai-stat-number">1M+</div>
                  <div className="ai-stat-label">Người dùng tin tưởng</div>
                </div>
              </div>

              <div className="ai-stat-card">
                <div className="ai-stat-icon-wrap icon-tools">
                  <LayoutGrid size={18} color="#0284C7" />
                </div>
                <div className="ai-stat-text-col">
                  <div className="ai-stat-number">100+</div>
                  <div className="ai-stat-label">Công cụ AI tích hợp</div>
                </div>
              </div>

              <div className="ai-stat-card">
                <div className="ai-stat-icon-wrap icon-globe">
                  <Globe size={18} color="#4F46E5" />
                </div>
                <div className="ai-stat-text-col">
                  <div className="ai-stat-number">50+</div>
                  <div className="ai-stat-label">Quốc gia</div>
                </div>
              </div>

              <div className="ai-stat-card">
                <div className="ai-stat-icon-wrap icon-shield">
                  <Shield size={18} color="#059669" />
                </div>
                <div className="ai-stat-text-col">
                  <div className="ai-stat-number">99.9%</div>
                  <div className="ai-stat-label">An toàn & bảo mật</div>
                </div>
              </div>
            </div>

            {/* Right: Founder Quote Card */}
            <div className="ai-quote-card">
              <div className="ai-quote-text">
                “AI không chỉ là công nghệ, mà là cơ hội để mỗi người sống, làm việc và sáng tạo tốt hơn.”
              </div>
              <div className="ai-quote-footer">
                <div className="ai-quote-signature">
                  <svg width="130" height="32" viewBox="0 0 130 32" fill="none">
                    <path
                      d="M10 24C18 12 28 8 36 20C40 26 44 24 48 14C52 4 58 10 65 24C72 14 82 8 92 18C100 24 108 22 120 16"
                      stroke="#1D4ED8"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M30 20L115 22"
                      stroke="#1D4ED8"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="ai-quote-brand">
                  <img src="/topdoo.jpeg" alt="Logo" className="ai-quote-mini-logo" />
                  <span>TOPDOO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Bottom Call to Action Section (Mountain Night Sky using /bannerBottomCta.png) */}
      <section className="ai-bottom-cta-section">
        <div className="ai-bottom-cta-bg-layer">
          <img
            src="/bannerBottomCta.png"
            alt="Mountain Sky Background"
            className="ai-bottom-cta-bg-img"
          />
          <div className="ai-bottom-cta-dark-overlay" />
        </div>

        <div className="landing-container ai-bottom-cta-container">
          <div className="ai-bottom-cta-grid">
            {/* Left handwriting slogan */}
            <div className="ai-bottom-slogan-left">
              <span>Good Technology</span>
              <span>A Brighter Tomorrow.</span>
            </div>

            {/* Center Heading & Buttons */}
            <div className="ai-bottom-cta-center">
              <h2 className="ai-bottom-cta-title">
                Bắt đầu hành trình cùng Topdoo AI ngay hôm nay
              </h2>
              <p className="ai-bottom-cta-desc">
                Khám phá sức mạnh của AI để tạo ra những giá trị lớn hơn cho bạn và cộng đồng.
              </p>
              <div className="ai-bottom-cta-actions">
                <button
                  className="btn-ai-bottom-primary"
                  onClick={scrollToWorkspace}
                >
                  <span>Dùng thử miễn phí</span>
                  <ArrowRight size={15} />
                </button>
                <button
                  className="btn-ai-bottom-secondary"
                  onClick={() => showToast('Liên hệ tư vấn', 'Gửi yêu cầu thành công! Chuyên viên Topdoo AI sẽ liên hệ hỗ trợ bạn.', 'success')}
                >
                  <span>Liên hệ tư vấn</span>
                </button>
              </div>
            </div>

            {/* Right Aesthetic Monospace Watermark */}
            <div className="ai-bottom-watermark-right">
              <span>AI</span>
              <span>SAFER</span>
              <span>BRIGHTER</span>
              <span>TOMORROW</span>
            </div>
          </div>
        </div>
      </section>

      {/* 9Router Configuration Modal */}
      {is9RouterModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: 16
        }}>
          <div style={{
            backgroundColor: '#1E293B',
            border: '1px solid #334155',
            borderRadius: 16,
            width: '100%',
            maxWidth: 520,
            color: '#FFFFFF',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 18
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20 }}>⚡</span>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#F8FAFC' }}>
                  Cấu Hình 9Router AI Gateway
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIs9RouterModalOpen(false)}
                style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: 18, cursor: 'pointer', padding: 4 }}
              >
                ✕
              </button>
            </div>

            {/* Trạng thái hiện tại */}
            <div style={{
              backgroundColor: nineRouterHealth?.isOnline ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
              border: `1px solid ${nineRouterHealth?.isOnline ? 'rgba(16, 185, 129, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
              borderRadius: 10,
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: nineRouterHealth?.isOnline ? '#10B981' : '#F59E0B'
                }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: nineRouterHealth?.isOnline ? '#34D399' : '#FBBF24' }}>
                    {nineRouterHealth?.isOnline ? '9Router Đang Hoạt Động' : '9Router Chưa Kết Nối'}
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>
                    {nineRouterHealth?.isOnline
                      ? `${nineRouterHealth.modelsCount || 49} mô hình khả dụng • Độ trễ: ${nineRouterHealth.latencyMs || 25}ms`
                      : 'Hãy chạy lệnh "9router" trong terminal để mở cổng 20128'}
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={isPinging9Router}
                onClick={async () => {
                  setIsPinging9Router(true);
                  const res = await refresh9RouterHealth();
                  setIsPinging9Router(false);
                  if (res?.isOnline) {
                    showToast('Kết nối thành công', `Đã tìm thấy ${res.modelsCount} model trong 9Router!`, 'success');
                  } else {
                    showToast('Không thể kết nối', 'Vui lòng kiểm tra lại 9Router server.', 'warning');
                  }
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid #475569',
                  backgroundColor: '#334155',
                  color: '#FFFFFF',
                  fontSize: 11,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {isPinging9Router ? 'Đang test...' : 'Kiểm tra Ping'}
              </button>
            </div>

            {/* Input fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#CBD5E1', marginBottom: 6 }}>
                  9Router Base URL (OpenAI-compatible Endpoint):
                </label>
                <input
                  type="text"
                  value={custom9RouterUrl}
                  onChange={(e) => setCustom9RouterUrl(e.target.value)}
                  placeholder="/api/9router/v1"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1px solid #475569',
                    backgroundColor: '#0F172A',
                    color: '#F8FAFC',
                    fontSize: 13,
                    fontFamily: 'monospace'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#CBD5E1', marginBottom: 6 }}>
                  9Router API Key (Bearer Token):
                </label>
                <input
                  type="text"
                  value={custom9RouterKey}
                  onChange={(e) => setCustom9RouterKey(e.target.value)}
                  placeholder="Nhập API Key (tùy chọn hoặc để trống nếu dùng server proxy)"
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: 8,
                    border: '1px solid #475569',
                    backgroundColor: '#0F172A',
                    color: '#F8FAFC',
                    fontSize: 13,
                    fontFamily: 'monospace'
                  }}
                />
              </div>
            </div>

            <div style={{
              fontSize: 11,
              color: '#94A3B8',
              backgroundColor: '#0F172A',
              padding: 10,
              borderRadius: 8,
              border: '1px solid #334155',
              lineHeight: 1.5
            }}>
              💡 <strong>Mẹo:</strong> 9Router tự động nén token (RTK Token Saver), tự động fallback giữa các subscription/free provider và mở Web Dashboard quản lý tại: <code style={{ color: '#38BDF8' }}>http://localhost:20128/dashboard</code>.
            </div>

            {/* Footer buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, borderTop: '1px solid #334155', paddingTop: 14 }}>
              <button
                type="button"
                onClick={() => setIs9RouterModalOpen(false)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 8,
                  border: '1px solid #475569',
                  backgroundColor: 'transparent',
                  color: '#CBD5E1',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Hủy
              </button>

              <button
                type="button"
                onClick={() => {
                  update9RouterSettings({
                    baseUrl: custom9RouterUrl,
                    apiKey: custom9RouterKey,
                    enabled: true
                  });
                  setIs9RouterModalOpen(false);
                }}
                style={{
                  padding: '8px 18px',
                  borderRadius: 8,
                  border: 'none',
                  backgroundColor: '#0084FF',
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Lưu & Kích Hoạt 9Router
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Universal Marketing Footer */}
      <MarketingFooter />
    </div>
  );
}
