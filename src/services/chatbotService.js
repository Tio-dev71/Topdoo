// TOPDOO CYBER THREAT COPILOT & 9ROUTER INTEGRATION SERVICE
// Communicates with 9Router running on server (port 20128) via /api/9router/v1

export const DEFAULT_SECURITY_SYSTEM_PROMPT = `Bạn là Topdoo Cyber Threat Copilot — Chuyên gia Cố vấn An ninh mạng và Trí tuệ Mối đe dọa (Threat Intelligence) tối cao của nền tảng Topdoo Security.

MỤC TIÊU & NHIỆM VỤ CỦA BẠN:
1. Phát hiện và vạch trần các hình thức lừa đảo trên không gian mạng:
   - SMS Phishing, mạo danh ngân hàng (Vietcombank, MB Bank, Techcombank,...), chiếm quyền OTP.
   - Ứng dụng độc hại (.APK) mạo danh Dịch vụ công Quốc gia, Thuế điện tử, VNeID, chiếm quyền trợ năng Android (Accessibility) để điều khiển thiết bị từ xa.
   - Lừa đảo chuyển tiền online, bẫy việc làm từ xa, sàn đầu tư ảo mạo danh, giả danh cơ quan công an / viện kiểm sát.
   - Trang web giả mạo thương mại điện tử, mã độc đánh cắp cookie / mật khẩu trình duyệt.

2. Hướng dẫn ứng phó khẩn cấp cho nạn nhân:
   - Khi lỡ chuyển tiền: Hướng dẫn liên hệ ngân hàng khóa giao dịch ngay trong 15-30 phút đầu, gọi hotline cơ quan chức năng.
   - Khi lỡ cài file APK độc: Hướng dẫn ngắt Wi-Fi/4G lập tức, bật Chế độ máy bay, gỡ ứng dụng qua Safe Mode hoặc khôi phục cài đặt gốc.
   - Khi lộ mật khẩu / OTP: Hướng dẫn đổi mật khẩu tức thì trên thiết bị sạch khác, thu hồi phiên đăng nhập, kích hoạt 2FA / FIDO2.

3. NGUYÊN TẮC TRẢ LỜI:
   - Ngôn ngữ: Tiếng Việt chuẩn mực, chuyên nghiệp, khẩn trương, trấn an người dùng nhưng chỉ ra rủi ro chính xác.
   - Cấu trúc: Ngắn gọn, có đề mục rõ ràng, dùng bullet points hoặc số thứ tự cho các bước hành động.
   - Cảnh báo bắt buộc: Tuyệt đối không chia sẻ mã OTP, mật khẩu, CCCD, hay mã khóa bí mật cho bất kỳ ai, kể cả người tự xưng là cán bộ công an hoặc nhân viên ngân hàng.
   - Dẫn nguồn: Nhắc người dùng có thể tra cứu thêm trực tiếp trên Topdoo Quick Check hoặc Cổng CheckScam / An Toàn Thông Tin Quốc Gia.`;

export const AVAILABLE_9ROUTER_MODELS = [
  { id: 'kr/auto', name: 'Auto Optimized (Khuyên dùng - Nhanh, Tiết kiệm)', speed: 'Cực nhanh', provider: '9Router Core' },
  { id: 'kr/auto-thinking', name: 'Auto Thinking (Suy luận sâu CoT)', speed: 'Trung bình', provider: '9Router Core' },
  { id: 'kr/deepseek-3.2', name: 'DeepSeek 3.2 (Chuyên gia thuật toán & Logic)', speed: 'Nhanh', provider: 'DeepSeek via 9Router' },
  { id: 'kr/claude-sonnet-4.5', name: 'Claude Sonnet 4.5 (Tư duy ngôn ngữ & Phân tích chuyên sâu)', speed: 'Nhanh', provider: 'Anthropic via 9Router' },
  { id: 'kr/glm-5', name: 'GLM 5 (Xử lý tiếng Việt & đa nhiệm tốt)', speed: 'Nhanh', provider: 'Zhipu via 9Router' },
  { id: 'kr/qwen3-coder-next', name: 'Qwen 3 Coder Next (Phân tích mã độc & Payload)', speed: 'Rất nhanh', provider: 'Qwen via 9Router' }
];

const CONFIG_STORAGE_KEY = 'topdoo_security_chatbot_config';

/**
 * Lấy cấu hình Chatbot hiện tại (Admin quản lý)
 */
export const getChatbotConfig = () => {
  if (typeof window === 'undefined') {
    return {
      systemPrompt: DEFAULT_SECURITY_SYSTEM_PROMPT,
      model: 'kr/auto',
      temperature: 0.7,
      maxTokens: 2000,
      botName: 'Topdoo Cyber Copilot',
      welcomeMessage: 'Xin chào! Tôi là Topdoo Cyber Copilot. Hãy gửi cho tôi đường link, số tài khoản, số điện thoại hoặc mô tả tình huống nghi vấn để tôi phân tích an ninh ngay lập tức.',
      enabled: true,
      emergencyHotline: '113 / 069.234.3640 (Cục An ninh mạng)'
    };
  }

  try {
    const raw = localStorage.getItem(CONFIG_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        systemPrompt: parsed.systemPrompt || DEFAULT_SECURITY_SYSTEM_PROMPT,
        model: parsed.model || 'kr/auto',
        temperature: parsed.temperature !== undefined ? parsed.temperature : 0.7,
        maxTokens: parsed.maxTokens || 2000,
        botName: parsed.botName || 'Topdoo Cyber Copilot',
        welcomeMessage: parsed.welcomeMessage || 'Xin chào! Tôi là Topdoo Cyber Copilot. Hãy gửi cho tôi đường link, số tài khoản, số điện thoại hoặc mô tả tình huống nghi vấn để tôi phân tích an ninh ngay lập tức.',
        enabled: parsed.enabled !== undefined ? parsed.enabled : true,
        emergencyHotline: parsed.emergencyHotline || '113 / 069.234.3640 (Cục An ninh mạng)'
      };
    }
  } catch (err) {
    console.warn('Failed to parse chatbot config from localStorage:', err);
  }

  return {
    systemPrompt: DEFAULT_SECURITY_SYSTEM_PROMPT,
    model: 'kr/auto',
    temperature: 0.7,
    maxTokens: 2000,
    botName: 'Topdoo Cyber Copilot',
    welcomeMessage: 'Xin chào! Tôi là Topdoo Cyber Copilot. Hãy gửi cho tôi đường link, số tài khoản, số điện thoại hoặc mô tả tình huống nghi vấn để tôi phân tích an ninh ngay lập tức.',
    enabled: true,
    emergencyHotline: '113 / 069.234.3640 (Cục An ninh mạng)'
  };
};

/**
 * Lưu cấu hình Chatbot (Dành cho Admin)
 */
export const saveChatbotConfig = (newConfig) => {
  if (typeof window === 'undefined') return;
  const current = getChatbotConfig();
  const merged = { ...current, ...newConfig, updatedAt: new Date().toISOString() };
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(merged));

  // Phát event đồng bộ cho các component đang mở
  window.dispatchEvent(new CustomEvent('topdoo_chatbot_config_updated', { detail: merged }));
  return merged;
};

/**
 * Khôi phục cấu hình mặc định ban đầu
 */
export const resetChatbotConfig = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONFIG_STORAGE_KEY);
  const defaultConfig = getChatbotConfig();
  window.dispatchEvent(new CustomEvent('topdoo_chatbot_config_updated', { detail: defaultConfig }));
  return defaultConfig;
};

/**
 * Gửi tin nhắn và stream phản hồi từ 9Router
 */
export const streamSecurityChat = async ({
  messages,
  systemPrompt,
  model,
  temperature,
  onChunk,
  onDone,
  onError,
  signal
}) => {
  const config = getChatbotConfig();
  const activeSystemPrompt = systemPrompt || config.systemPrompt || DEFAULT_SECURITY_SYSTEM_PROMPT;
  const activeModel = model || config.model || 'kr/auto';
  const activeTemp = temperature !== undefined ? temperature : config.temperature;

  const formattedMessages = [
    { role: 'system', content: activeSystemPrompt },
    ...messages.map(m => ({
      role: m.role === 'assistant' ? 'assistant' : (m.role === 'system' ? 'system' : 'user'),
      content: m.content
    }))
  ];

  // Base URL: /api/9router/v1 được proxy trực tiếp trên Nginx tới 127.0.0.1:20128
  const endpoint = '/api/9router/v1/chat/completions';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-tiodev-chatbot-secret'
      },
      body: JSON.stringify({
        model: activeModel,
        messages: formattedMessages,
        temperature: activeTemp,
        max_tokens: config.maxTokens || 2000,
        stream: true
      }),
      signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMsg = `Lỗi máy chủ AI 9Router (${response.status})`;
      try {
        const parsed = JSON.parse(errorText);
        if (parsed.error?.message) errorMsg = parsed.error.message;
      } catch (e) {
        if (errorText) errorMsg += `: ${errorText.slice(0, 150)}`;
      }
      throw new Error(errorMsg);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let accumulatedText = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || trimmed === 'data: [DONE]') continue;

        if (trimmed.startsWith('data: ')) {
          const jsonStr = trimmed.slice(6);
          try {
            const data = JSON.parse(jsonStr);
            const delta = data.choices?.[0]?.delta?.content || '';
            if (delta) {
              accumulatedText += delta;
              if (onChunk) onChunk(delta, accumulatedText);
            }
          } catch (e) {
            // Ignore non-json chunks
          }
        }
      }
    }

    if (onDone) onDone(accumulatedText);
    return accumulatedText;

  } catch (err) {
    if (err.name === 'AbortError') {
      if (onDone) onDone('');
      return '';
    }
    console.error('9Router Chatbot Error:', err);
    if (onError) onError(err);
    throw err;
  }
};
