/**
 * TOPDOO ACADEMY SERVICE (Module M7)
 * Quản lý chương trình đào tạo an ninh số và làm chủ AI thực chiến
 */

export const INITIAL_ACADEMY_COURSES = [
  {
    id: 'course-sec-01',
    title: 'Chiến Lược Phòng Chống Phishing & Scam 2026',
    slug: 'phishing-and-scam-defense',
    category: 'Security',
    level: 'BEGINNER',
    levelLabel: 'Cơ bản',
    durationMinutes: 120,
    lessonsCount: 8,
    instructor: 'TS. Nguyễn Huy Dũng - Chuyên gia An toàn thông tin',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop',
    description: 'Trang bị kỹ năng nhận diện chiêu trò lừa đảo qua QR, deepfake video, SMS Brandname và web mạo danh ngân hàng.',
    enrolledCount: 1420,
    isEnrolled: true,
    progressPercent: 65,
    certificateAvailable: true,
    modules: [
      'Bài 1: Toàn cảnh lừa đảo mạng Việt Nam & Đông Nam Á 2026',
      'Bài 2: Kỹ thuật soi xét tên miền (Typosquatting & Punycode)',
      'Bài 3: Phân tích mã QR độc hại và cách phòng ngừa',
      'Bài 4: Nhận diện chiêu thức mạo danh cơ quan công an / ngân hàng',
      'Bài 5: Thực hành kiểm tra link với Topdoo URL Scanner',
      'Bài 6: Xử lý sự cố khi vô tình lộ thông tin thẻ hoặc OTP',
      'Bài 7: Thiết lập tường lửa cá nhân & bảo vệ gia đình',
      'Bài 8: Bài kiểm tra trắc nghiệm cấp chứng chỉ'
    ]
  },
  {
    id: 'course-ai-02',
    title: 'Prompt Engineering & Red Teaming Cho Doanh Nghiệp',
    slug: 'prompt-engineering-red-teaming',
    category: 'AI',
    level: 'INTERMEDIATE',
    levelLabel: 'Trung cấp',
    durationMinutes: 180,
    lessonsCount: 12,
    instructor: 'ThS. Trần Quốc Hùng - Topdoo Lead AI Architect',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop',
    description: 'Học cách thiết kế hệ thống prompt chuẩn doanh nghiệp, kiểm thử xâm nhập LLM chống Jailbreak và rò rỉ dữ liệu nhạy cảm.',
    enrolledCount: 980,
    isEnrolled: false,
    progressPercent: 0,
    certificateAvailable: true,
    modules: [
      'Bài 1: Kiến trúc mô hình ngôn ngữ lớn (LLM) và Context Window',
      'Bài 2: Kỹ thuật Structured Output với JSON Schema',
      'Bài 3: Chain-of-Thought và Few-shot prompting thực tế',
      'Bài 4: Các vector tấn công Prompt Injection phổ biến',
      'Bài 5: Xây dựng Guardrails phòng vệ chống rò rỉ API Key',
      'Bài 6: Đo lường chi phí Token và tối ưu hóa ngân sách Credit'
    ]
  },
  {
    id: 'course-sec-03',
    title: 'Xây Dựng AI Agent Tự Hành Phòng Thủ An Ninh Mạng',
    slug: 'autonomous-ai-security-agents',
    category: 'Security',
    level: 'ADVANCED',
    levelLabel: 'Nâng cao',
    durationMinutes: 240,
    lessonsCount: 15,
    instructor: 'Đội ngũ Kỹ sư Viện An ninh mạng Topdoo',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop',
    description: 'Triển khai hệ thống Multi-Agent tự động quét luồng dữ liệu, đối chiếu Threat Intelligence và chặn đứng drainer ví crypto.',
    enrolledCount: 650,
    isEnrolled: false,
    progressPercent: 0,
    certificateAvailable: true,
    modules: [
      'Bài 1: Thiết kế kiến trúc Agentic SOC với Tool-Calling',
      'Bài 2: Tích hợp Topdoo Threat API vào workflow tự động',
      'Bài 3: Sandbox phân tích mã JavaScript độc hại',
      'Bài 4: Đánh giá bằng chứng và ra quyết định gắn nhãn Scam DB'
    ]
  }
];

export const CERTIFICATE_TRACKS = [
  {
    id: 'cert-cyber-defender',
    title: 'Chứng chỉ Chuyên gia An toàn số Topdoo Certified Cyber Defender',
    criteria: 'Hoàn thành tối thiểu 2 khóa học Bảo mật và vượt qua bài thi thực hành 80% điểm.',
    badge: '🛡️ TCCD Certified'
  },
  {
    id: 'cert-ai-architect',
    title: 'Chứng chỉ Kỹ sư AI Ứng dụng Topdoo Certified AI Architect',
    criteria: 'Xây dựng thành công 1 AI Agent giải quyết bài toán nghiệp vụ doanh nghiệp.',
    badge: '⚡ TCAIA Certified'
  }
];
