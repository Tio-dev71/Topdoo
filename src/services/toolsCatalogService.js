/**
 * TOPDOO TOOLS CATALOG SERVICE (Module M3)
 * Quản lý danh mục công cụ AI, tìm kiếm, đánh giá và bookmark
 */

export const INITIAL_AI_TOOLS = [
  {
    id: 'tool-chatgpt',
    name: 'ChatGPT / GPT-5',
    slug: 'chatgpt',
    category: 'writing',
    categoryLabel: 'Viết nội dung',
    pricingType: 'FREEMIUM',
    pricingLabel: 'Miễn phí & Plus $20/tháng',
    rating: 4.9,
    reviewCount: 3420,
    verified: true,
    description: 'Mô hình ngôn ngữ tiên tiến nhất từ OpenAI cho sáng tạo nội dung, lập trình và suy luận logic sâu.',
    websiteUrl: 'https://chat.openai.com',
    iconBg: '#EBF5FF',
    iconColor: '#0084FF',
    tags: ['AI Chat', 'Viết lách', 'OpenAI', 'GPT-5']
  },
  {
    id: 'tool-claude',
    name: 'Claude 3.7 Sonnet',
    slug: 'claude',
    category: 'coding',
    categoryLabel: 'Lập trình',
    pricingType: 'FREEMIUM',
    pricingLabel: 'Miễn phí & Pro $20/tháng',
    rating: 4.9,
    reviewCount: 2850,
    verified: true,
    description: 'Trợ lý AI với khả năng phân tích ngữ cảnh lớn (200k tokens), xuất sắc về lập trình và lập kế hoạch kỹ thuật.',
    websiteUrl: 'https://claude.ai',
    iconBg: '#FAF5FF',
    iconColor: '#9333EA',
    tags: ['Lập trình', 'Anthropic', 'Phân tích code', 'Reasoning']
  },
  {
    id: 'tool-midjourney',
    name: 'Midjourney v7',
    slug: 'midjourney',
    category: 'image',
    categoryLabel: 'Tạo hình ảnh',
    pricingType: 'PAID',
    pricingLabel: 'Từ $10/tháng',
    rating: 4.8,
    reviewCount: 4120,
    verified: true,
    description: 'Trình tạo ảnh AI nghệ thuật số số 1 thế giới với chất lượng kết xuất siêu thực và thẩm mỹ tinh tế.',
    websiteUrl: 'https://midjourney.com',
    iconBg: '#F0F9FF',
    iconColor: '#0284C7',
    tags: ['Thiết kế ảnh', 'Art', 'Chất lượng cao', 'Text to Image']
  },
  {
    id: 'tool-topdoo-shield',
    name: 'Topdoo Security Shield',
    slug: 'topdoo-shield',
    category: 'security',
    categoryLabel: 'An ninh mạng',
    pricingType: 'FREEMIUM',
    pricingLabel: 'Miễn phí & Gói Doanh nghiệp',
    rating: 5.0,
    reviewCount: 1540,
    verified: true,
    description: 'Nền tảng kiểm tra lừa đảo, quét mã độc URL/Domain, xác thực hồ sơ và bóc gỡ drainer ví tiền mã hóa thời gian thực.',
    websiteUrl: 'https://topdoo.com',
    iconBg: '#DCFCE7',
    iconColor: '#10B981',
    tags: ['Chống lừa đảo', 'Web3 Phishing', 'An ninh số', 'Scam DB']
  },
  {
    id: 'tool-runway',
    name: 'Runway Gen-3 Alpha',
    slug: 'runway',
    category: 'video',
    categoryLabel: 'Tạo video',
    pricingType: 'PAID',
    pricingLabel: 'Từ $15/tháng',
    rating: 4.7,
    reviewCount: 1890,
    verified: true,
    description: 'Công cụ chuyển văn bản thành video và biên tập kỹ xảo điện ảnh tiên phong với chuyển động chân thực.',
    websiteUrl: 'https://runwayml.com',
    iconBg: '#FDF2F8',
    iconColor: '#DB2777',
    tags: ['Video AI', 'Điện ảnh', 'Gen-3', 'Văn bản thành Video']
  },
  {
    id: 'tool-elevenlabs',
    name: 'ElevenLabs Prime Voice',
    slug: 'elevenlabs',
    category: 'audio',
    categoryLabel: 'Âm thanh',
    pricingType: 'FREEMIUM',
    pricingLabel: 'Miễn phí & Từ $5/tháng',
    rating: 4.8,
    reviewCount: 2210,
    verified: true,
    description: 'Hệ thống nhân bản giọng nói và tổng hợp giọng đọc AI đa ngôn ngữ biểu cảm và cảm xúc tự nhiên nhất.',
    websiteUrl: 'https://elevenlabs.io',
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
    tags: ['Giọng nói AI', 'Voice Cloning', 'Podcast', 'Audiobook']
  },
  {
    id: 'tool-cursor',
    name: 'Cursor IDE',
    slug: 'cursor',
    category: 'coding',
    categoryLabel: 'Lập trình',
    pricingType: 'FREEMIUM',
    pricingLabel: 'Miễn phí & Pro $20/tháng',
    rating: 4.9,
    reviewCount: 3100,
    verified: true,
    description: 'Trình biên tập mã nguồn tích hợp AI sâu sắc, cho phép hiểu toàn bộ codebase và tự động sửa lỗi theo ý muốn.',
    websiteUrl: 'https://cursor.com',
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
    tags: ['IDE', 'Lập trình', 'Codebase AI', 'Fullstack']
  },
  {
    id: 'tool-notion-ai',
    name: 'Notion AI Workspace',
    slug: 'notion-ai',
    category: 'productivity',
    categoryLabel: 'Năng suất',
    pricingType: 'PAID',
    pricingLabel: 'Từ $10/tháng/người',
    rating: 4.7,
    reviewCount: 2750,
    verified: true,
    description: 'Trợ lý quản lý công việc, ghi chú thông minh, tóm tắt tài liệu và tự động trích xuất kế hoạch hành động.',
    websiteUrl: 'https://notion.so',
    iconBg: '#F8FAFC',
    iconColor: '#475569',
    tags: ['Quản lý dự án', 'Ghi chú', 'Team Work', 'Tóm tắt tài liệu']
  }
];

export const INITIAL_TOOL_REVIEWS = [
  {
    id: 'rev-01',
    toolId: 'tool-topdoo-shield',
    userName: 'Lê Hoàng Nam',
    userRole: 'CISO, FinTech VietNam',
    rating: 5,
    comment: 'Topdoo Security Shield phát hiện trang web lừa đảo thẻ tín dụng trước cả khi trình duyệt cảnh báo! Cơ sở dữ liệu scam rất chính xác.',
    helpfulCount: 42,
    createdAt: '2026-10-02T09:30:00Z'
  },
  {
    id: 'rev-02',
    toolId: 'tool-claude',
    userName: 'Nguyễn Minh Tuấn',
    userRole: 'Senior Fullstack Engineer',
    rating: 5,
    comment: 'Claude 3.7 lập trình cực tốt, hiểu logic bảo mật và kiến trúc microservices tốt hơn nhiều so với các model cũ.',
    helpfulCount: 38,
    createdAt: '2026-10-03T11:20:00Z'
  },
  {
    id: 'rev-03',
    toolId: 'tool-chatgpt',
    userName: 'Trần Thị Thu Trang',
    userRole: 'Content Creator',
    rating: 4,
    comment: 'Tốc độ phản hồi cực nhanh, hỗ trợ viết kịch bản rất đa dạng và mạch lạc.',
    helpfulCount: 29,
    createdAt: '2026-10-04T15:40:00Z'
  }
];

/**
 * Lọc danh mục công cụ theo từ khóa và danh mục
 */
export function filterToolsCatalog(tools, { search = '', category = 'all', pricing = 'all' } = {}) {
  return tools.filter((tool) => {
    const matchSearch =
      !search ||
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.description.toLowerCase().includes(search.toLowerCase()) ||
      (tool.tags && tool.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())));

    const matchCategory =
      !category || category === 'all' || tool.category.toLowerCase() === category.toLowerCase();

    const matchPricing =
      !pricing || pricing === 'all' || tool.pricingType.toLowerCase() === pricing.toLowerCase();

    return matchSearch && matchCategory && matchPricing;
  });
}
