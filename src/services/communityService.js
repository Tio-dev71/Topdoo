/**
 * TOPDOO COMMUNITY SERVICE (Module M8)
 * Quản lý diễn đàn cộng đồng, chia sẻ cảnh báo lừa đảo, thảo luận an ninh số và mẹo AI
 */

export const INITIAL_COMMUNITY_POSTS = [
  {
    id: 'post-01',
    title: '🚨 Cảnh báo thủ đoạn mạo danh VssID & Cổng Dịch vụ công gửi file APK mã độc',
    content: 'Thời gian gần đây xuất hiện tin nhắn SMS mạo danh BHXH Việt Nam yêu cầu người dân cài đặt app VssID cập nhật CCCD. File APK đính kèm chứa mã độc thu thập mã OTP ngân hàng và cấp quyền trợ năng (Accessibility Service). Mọi người tuyệt đối không tải file apk ngoài Google Play / App Store!',
    authorName: 'Đặng Tuấn Anh',
    authorRole: 'Security Researcher',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop',
    category: 'THREAT_ALERT',
    categoryLabel: 'Cảnh báo lừa đảo',
    likesCount: 148,
    commentsCount: 32,
    isLiked: false,
    tags: ['Cảnh báo APK', 'Mạo danh VssID', 'Trojan Ngân hàng'],
    isPinned: true,
    createdAt: '2026-10-04T08:15:00Z',
    comments: [
      {
        id: 'c-1',
        authorName: 'Trần Bách',
        content: 'Bác ở cơ quan mình vừa suýt bị lừa tuần trước, may dùng Topdoo URL scanner quét link ra cảnh báo đỏ rực!',
        createdAt: '2026-10-04T09:00:00Z'
      },
      {
        id: 'c-2',
        authorName: 'Thanh Hà',
        content: 'Cảm ơn bạn đã cảnh báo, mình đã share bài này về nhóm gia đình.',
        createdAt: '2026-10-04T10:12:00Z'
      }
    ]
  },
  {
    id: 'post-02',
    title: '💡 Hướng dẫn tích hợp Topdoo Threat API vào Bot Telegram cảnh báo nhóm',
    content: 'Mình vừa viết xong một đoạn script Python nhỏ để bot tự động đọc tin nhắn chứa link trong group Telegram, gọi vào API Topdoo để check xem tên miền có trong Scam DB không. Nếu rủi ro cao thì bot tự xoá tin nhắn và kick thành viên spam luôn.',
    authorName: 'Nguyễn Duy Long',
    authorRole: 'DevOps Engineer',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop',
    category: 'TUTORIAL',
    categoryLabel: 'Hướng dẫn kỹ thuật',
    likesCount: 95,
    commentsCount: 18,
    isLiked: true,
    tags: ['API Integration', 'Telegram Bot', 'Python'],
    isPinned: false,
    createdAt: '2026-10-04T16:40:00Z',
    comments: [
      {
        id: 'c-3',
        authorName: 'Quốc Đạt',
        content: 'Tuyệt vời quá bác ơi, bác có share repo github không ạ?',
        createdAt: '2026-10-04T17:00:00Z'
      }
    ]
  },
  {
    id: 'post-03',
    title: '🤖 Thảo luận: Khi nào nên dùng Claude 3.7 Sonnet thay vì GPT-5?',
    content: 'Sau 1 tuần trải nghiệm Model Matrix trên Topdoo AI Gateway, mình thấy Claude 3.7 trả lời về code và phân tích log bảo mật chi tiết và ít ảo giác hơn hẳn. Ngược lại GPT-5 vẫn dẫn đầu về tốc độ và dịch thuật. Mọi người hay dùng model nào nhất?',
    authorName: 'Vũ Minh Trí',
    authorRole: 'AI Enthusiast',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop',
    category: 'AI_DISCUSSION',
    categoryLabel: 'Thảo luận AI',
    likesCount: 84,
    commentsCount: 24,
    isLiked: false,
    tags: ['Model Matrix', 'Claude 3.7', 'GPT-5'],
    isPinned: false,
    createdAt: '2026-10-05T11:20:00Z',
    comments: [
      {
        id: 'c-4',
        authorName: 'Phạm Ngọc Mai',
        content: 'Mình đồng ý, Claude 3.7 viết prompt và đọc tài liệu PDF dài đỉnh thật sự!',
        createdAt: '2026-10-05T12:05:00Z'
      }
    ]
  }
];
