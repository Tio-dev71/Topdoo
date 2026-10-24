import React, { useState, useEffect, useRef } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Bot,
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  RotateCcw,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  AlertTriangle,
  Flame,
  MessageSquare,
  Lock,
  PhoneCall,
  Info
} from 'lucide-react';
import {
  streamSecurityChat,
  getChatbotConfig,
  AVAILABLE_9ROUTER_MODELS
} from '../../services/chatbotService';
import { useSecurity } from '../../context/SecurityContext';

export function SecurityCopilotChat() {
  const { showToast } = useSecurity();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [config, setConfig] = useState(getChatbotConfig);

  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const abortControllerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Chat message history
  const [messages, setMessages] = useState(() => {
    return [
      {
        role: 'assistant',
        content: config.welcomeMessage,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }
    ];
  });

  // Listen for admin config updates
  useEffect(() => {
    const handleConfigUpdate = (e) => {
      if (e.detail) {
        setConfig(e.detail);
      }
    };
    window.addEventListener('topdoo_chatbot_config_updated', handleConfigUpdate);
    return () => window.removeEventListener('topdoo_chatbot_config_updated', handleConfigUpdate);
  }, []);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  // Suggested Quick Security Questions
  const quickQuestions = [
    { label: '🔍 Kiểm tra link đáng ngờ', prompt: 'Tôi vừa nhận được một tin nhắn kèm link lạ yêu cầu đăng nhập. Làm sao để tôi kiểm tra xem link này có phải lừa đảo không?' },
    { label: '🏦 Lỡ chuyển tiền cho kẻ lừa đảo', prompt: 'Tôi vừa chuyển tiền cho một số tài khoản nghi là lừa đảo. Tôi phải làm gì ngay bây giờ để có cơ hội phong tỏa tiền?' },
    { label: '📱 Bị ép cài file APK Dịch vụ công', prompt: 'Có người gọi điện tự xưng công an yêu cầu cài file APK Dịch vụ công / VNeID vào điện thoại. Đây có phải lừa đảo không và tôi cần phòng tránh ra sao?' },
    { label: '🔐 Lộ mật khẩu & OTP ngân hàng', prompt: 'Tôi lỡ điền mật khẩu và mã OTP vào một trang web lạ. Hãy hướng dẫn tôi quy trình khẩn cấp xử lý từng bước!' },
    { label: '🛡️ Nhận diện SMS Brandname giả mạo', prompt: 'Làm thế nào kẻ lừa đảo có thể gửi tin nhắn lọt vào đúng luồng SMS Brandname của ngân hàng và cách phân biệt?' }
  ];

  const handleSendMessage = async (textToSend) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isGenerating) return;

    setInputMessage('');
    const timeNow = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

    // Append user message
    const newMessages = [
      ...messages,
      { role: 'user', content: query, timestamp: timeNow }
    ];
    setMessages(newMessages);

    // Prepare placeholder assistant message
    const assistantIndex = newMessages.length;
    setMessages(prev => [
      ...prev,
      { role: 'assistant', content: '', isStreaming: true, timestamp: timeNow }
    ]);

    setIsGenerating(true);
    abortControllerRef.current = new AbortController();

    try {
      await streamSecurityChat({
        messages: newMessages,
        systemPrompt: config.systemPrompt,
        model: config.model,
        temperature: config.temperature,
        signal: abortControllerRef.current.signal,
        onChunk: (delta, accumulated) => {
          setMessages(prev => {
            const next = [...prev];
            if (next[assistantIndex]) {
              next[assistantIndex] = {
                ...next[assistantIndex],
                content: accumulated,
                isStreaming: true
              };
            }
            return next;
          });
        },
        onDone: (finalText) => {
          setMessages(prev => {
            const next = [...prev];
            if (next[assistantIndex]) {
              next[assistantIndex] = {
                ...next[assistantIndex],
                content: finalText,
                isStreaming: false
              };
            }
            return next;
          });
          setIsGenerating(false);
        },
        onError: (err) => {
          setMessages(prev => {
            const next = [...prev];
            if (next[assistantIndex]) {
              next[assistantIndex] = {
                ...next[assistantIndex],
                content: `⚠️ Không thể kết nối tới máy chủ AI 9Router: ${err.message || 'Lỗi mạng'}. Vui lòng thử lại sau.`,
                isStreaming: false,
                isError: true
              };
            }
            return next;
          });
          setIsGenerating(false);
        }
      });
    } catch (e) {
      setIsGenerating(false);
    }
  };

  const handleStopGenerating = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        role: 'assistant',
        content: config.welcomeMessage,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    showToast('Đã xóa lịch sử', 'Đoạn hội thoại đã được đặt lại từ đầu.', 'info');
  };

  const handleCopy = (content, index) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    showToast('Đã sao chép', 'Nội dung phản hồi đã được lưu vào clipboard.', 'success');
  };

  // Render markdown-like simple formatting (bold, bullet points, headers)
  const renderFormattedContent = (content) => {
    if (!content) return null;

    const lines = content.split('\n');
    return lines.map((line, idx) => {
      // Header lines
      if (line.startsWith('### ')) {
        return <h4 key={idx} style={{ fontSize: '0.95rem', fontWeight: 700, margin: '8px 0 4px', color: 'var(--text-primary)' }}>{line.replace('### ', '')}</h4>;
      }
      if (line.startsWith('## ') || line.startsWith('# ')) {
        return <h3 key={idx} style={{ fontSize: '1rem', fontWeight: 800, margin: '10px 0 6px', color: '#38bdf8' }}>{line.replace(/^#+ /, '')}</h3>;
      }

      // Bullet points
      if (line.startsWith('- ') || line.startsWith('* ')) {
        const parsed = parseBold(line.slice(2));
        return (
          <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', margin: '3px 0' }}>
            <span style={{ color: '#38bdf8', fontSize: '14px', lineHeight: '20px' }}>•</span>
            <span style={{ flex: 1, fontSize: '13px', lineHeight: '1.5' }}>{parsed}</span>
          </div>
        );
      }

      // Numbered items
      if (/^\d+\.\s/.test(line)) {
        const num = line.match(/^(\d+\.)\s/)[1];
        const rest = line.replace(/^\d+\.\s/, '');
        return (
          <div key={idx} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', margin: '4px 0' }}>
            <span style={{ color: '#38bdf8', fontWeight: 700, fontSize: '13px', minWidth: '18px' }}>{num}</span>
            <span style={{ flex: 1, fontSize: '13px', lineHeight: '1.5' }}>{parseBold(rest)}</span>
          </div>
        );
      }

      // Empty line spacer
      if (!line.trim()) {
        return <div key={idx} style={{ height: '6px' }} />;
      }

      // Normal text with bold support
      return (
        <p key={idx} style={{ margin: '3px 0', fontSize: '13px', lineHeight: '1.55', color: 'inherit' }}>
          {parseBold(line)}
        </p>
      );
    });
  };

  const parseBold = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} style={{ color: '#f8fafc', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const activeModelMeta = AVAILABLE_9ROUTER_MODELS.find(m => m.id === config.model) || { name: config.model };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <div
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="security-copilot-fab"
          title="Trò chuyện với AI Trợ lý Bảo mật Topdoo Copilot"
        >
          <div className="fab-glow-ring" />
          <div className="fab-core">
            <Shield className="fab-shield-icon" />
            <Sparkles className="fab-sparkle-icon" />
          </div>
          <div className="fab-tooltip">
            <span className="fab-dot" />
            <span>Topdoo Cyber Copilot (9Router AI)</span>
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`security-copilot-window ${isMinimized ? 'minimized' : ''} ${isExpanded ? 'expanded' : ''}`}
        >
          {/* Header */}
          <div className="copilot-header">
            <div className="copilot-header-left">
              <div className="copilot-avatar">
                <ShieldCheck size={20} className="avatar-shield" />
                <span className="avatar-status-dot" title="9Router Live Engine: Hoạt động" />
              </div>
              <div className="copilot-header-meta">
                <div className="copilot-title-row">
                  <span className="copilot-title">{config.botName || 'Topdoo Cyber Copilot'}</span>
                  <span className="copilot-badge">9Router</span>
                </div>
                <div className="copilot-subtitle">
                  <span className="copilot-model-name">{activeModelMeta.name}</span>
                </div>
              </div>
            </div>

            <div className="copilot-header-actions">
              <button
                onClick={handleClearHistory}
                className="copilot-action-btn"
                title="Xóa làm mới đoạn chat"
              >
                <RotateCcw size={15} />
              </button>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="copilot-action-btn hide-mobile"
                title={isExpanded ? 'Thu nhỏ cửa sổ' : 'Phóng to cửa sổ'}
              >
                {isExpanded ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="copilot-action-btn"
                title={isMinimized ? 'Mở rộng' : 'Thu nhỏ dưới thanh'}
              >
                <ChevronDown size={17} style={{ transform: isMinimized ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="copilot-action-btn close-btn"
                title="Đóng trợ lý"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Body when not minimized */}
          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="copilot-messages">
                {messages.map((msg, index) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={index}
                      className={`copilot-message-row ${isUser ? 'user-row' : 'assistant-row'}`}
                    >
                      {!isUser && (
                        <div className="message-avatar">
                          <Bot size={16} />
                        </div>
                      )}

                      <div className={`copilot-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'} ${msg.isError ? 'error-bubble' : ''}`}>
                        <div className="bubble-content">
                          {renderFormattedContent(msg.content)}
                          {msg.isStreaming && !msg.content && (
                            <div className="copilot-typing-indicator">
                              <span />
                              <span />
                              <span />
                            </div>
                          )}
                        </div>

                        <div className="bubble-footer">
                          <span className="bubble-timestamp">{msg.timestamp}</span>
                          {!isUser && msg.content && (
                            <button
                              onClick={() => handleCopy(msg.content, index)}
                              className="bubble-copy-btn"
                              title="Sao chép nội dung"
                            >
                              {copiedIndex === index ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions Carousel / Chips */}
              <div className="copilot-quick-chips">
                <div className="quick-chips-scroll">
                  {quickQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(q.prompt)}
                      disabled={isGenerating}
                      className="quick-chip-btn"
                    >
                      {q.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Emergency Banner */}
              <div className="copilot-hotline-bar">
                <PhoneCall size={12} className="hotline-icon" />
                <span>Hotline khẩn cấp tội phạm công nghệ cao: <strong>{config.emergencyHotline}</strong></span>
              </div>

              {/* Input Area */}
              <div className="copilot-input-area">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="copilot-form"
                >
                  <textarea
                    rows={1}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder="Mô tả sự cố, gửi link hoặc câu hỏi bảo mật..."
                    className="copilot-textarea"
                  />

                  {isGenerating ? (
                    <button
                      type="button"
                      onClick={handleStopGenerating}
                      className="copilot-stop-btn"
                      title="Dừng sinh phản hồi"
                    >
                      <span className="stop-square" />
                      <span>Dừng</span>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!inputMessage.trim()}
                      className="copilot-send-btn"
                      title="Gửi câu hỏi"
                    >
                      <Send size={16} />
                    </button>
                  )}
                </form>
                <div className="copilot-disclaimer">
                  AI bảo mật vận hành độc lập trên cụm 9Router VPS. Không cung cấp mã OTP/Mật khẩu cho bất kỳ ai.
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
