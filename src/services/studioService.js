/**
 * TOPDOO STUDIO SERVICE (Module M2)
 * Quản lý các dự án thiết kế canvas, tạo nội dung đa phương tiện và trừ AI Credit
 */

export const STUDIO_TEMPLATES = [
  {
    id: 'tmpl-infographic',
    title: 'Infographic Cảnh Báo An Ninh Mạng',
    type: 'DESIGN',
    category: 'Security',
    creditCost: 15,
    previewColor: '#0084FF',
    dimensions: '1200 x 630',
    description: 'Mẫu đồ họa cảnh báo các thủ đoạn lừa đảo và quy trình ứng phó khẩn cấp.'
  },
  {
    id: 'tmpl-social-banner',
    title: 'Social Media Threat Alert Banner',
    type: 'IMAGE',
    category: 'Marketing',
    creditCost: 15,
    previewColor: '#9333EA',
    dimensions: '1080 x 1080',
    description: 'Banner quảng bá truyền thông và nâng cao nhận thức bảo mật cho nhân viên.'
  },
  {
    id: 'tmpl-video-script',
    title: 'Kịch Bản Video Phân Tích Sự Cố (1 Phút)',
    type: 'VIDEO',
    category: 'Video',
    creditCost: 25,
    previewColor: '#EF4444',
    dimensions: '9:16 Short Form',
    description: 'Kịch bản phân cảnh chi tiết, giọng đọc AI và chỉ dẫn hình ảnh trực quan.'
  },
  {
    id: 'tmpl-executive-deck',
    title: 'Slide Báo Cáo Bảo Mật Doanh Nghiệp',
    type: 'PRESENTATION',
    category: 'Enterprise',
    creditCost: 20,
    previewColor: '#10B981',
    dimensions: '16:9 Presentation',
    description: 'Bộ khung slide thuyết trình chuyên nghiệp gửi Ban điều hành và Hội đồng quản trị.'
  },
  {
    id: 'tmpl-whitepaper',
    title: 'Bản Tin Điều Tra Khẩn (Security Advisory)',
    type: 'TEXT',
    category: 'Advisory',
    creditCost: 10,
    previewColor: '#F59E0B',
    dimensions: 'A4 Document',
    description: 'Bản tin khuyến cáo an toàn thông tin chuyên sâu dành cho đội ngũ SOC/DevOps.'
  }
];

export const initialStudioProjects = [
  {
    id: 'proj-01',
    title: 'Cảnh Báo Chiến Dịch Drainer Telegram 2026',
    type: 'DESIGN',
    prompt: 'Tạo infographic cảnh báo các kênh Telegram giả mạo hỗ trợ khách hàng ngân hàng và Web3',
    outputContent: 'Infographic: 5 Dấu hiệu nhận diện bot Telegram lừa đảo chiếm quyền ví tiền mã hóa.',
    creditsUsed: 15,
    isPublished: true,
    createdAt: '2026-10-04T10:30:00Z',
    updatedAt: '2026-10-04T11:15:00Z',
    canvasData: {
      elements: [
        { id: 'el-1', type: 'text', content: 'CẢNH BÁO TỐI KHẨN', fontSize: 24, color: '#EF4444' },
        { id: 'el-2', type: 'text', content: 'Chiến dịch lừa đảo mạo danh CSKH Telegram', fontSize: 16, color: '#1E293B' },
        { id: 'el-3', type: 'badge', content: 'Độ nguy hiểm: Cực cao', color: '#DC2626' }
      ]
    }
  },
  {
    id: 'proj-02',
    title: 'Kịch Bản Video: Cách Phát Hiện Deepfake Voice',
    type: 'VIDEO',
    prompt: 'Kịch bản ngắn 45s giải thích công nghệ giả mạo giọng nói của người thân để tống tiền',
    outputContent: 'Phân cảnh 1: Cuộc gọi bất thường. Phân cảnh 2: Kiểm tra mật khẩu gia đình. Phân cảnh 3: Gọi lại số máy gốc.',
    creditsUsed: 25,
    isPublished: false,
    createdAt: '2026-10-05T14:20:00Z',
    updatedAt: '2026-10-05T14:50:00Z',
    canvasData: {
      scenes: 3,
      durationSeconds: 45
    }
  },
  {
    id: 'proj-03',
    title: 'Slide Thuyết Trình: Zero Trust Phishing Shield',
    type: 'PRESENTATION',
    prompt: 'Slide 8 trang giới thiệu mô hình phòng thủ theo chiều sâu chống tấn công giả mạo',
    outputContent: 'Slide 1: Hiện trạng tấn công 2026. Slide 2: Lỗ hổng xác thực truyền thống. Slide 3: Giải pháp Topdoo Gateway.',
    creditsUsed: 20,
    isPublished: true,
    createdAt: '2026-10-05T18:00:00Z',
    updatedAt: '2026-10-05T18:30:00Z',
    canvasData: {
      slideCount: 8
    }
  }
];

/**
 * Sinh nội dung asset tự động cho Studio
 */
export function generateStudioAsset(prompt, type = 'TEXT', customTitle = '') {
  let creditCost = 10;
  if (type === 'IMAGE' || type === 'DESIGN') creditCost = 15;
  if (type === 'VIDEO') creditCost = 25;
  if (type === 'PRESENTATION') creditCost = 20;

  const generatedId = `proj-${Date.now().toString().slice(-4)}`;
  const title = customTitle || `Dự án Studio ${type} - ${new Date().toLocaleDateString('vi-VN')}`;

  let sampleOutput = '';
  let canvasElements = [];

  switch (type) {
    case 'IMAGE':
    case 'DESIGN':
      sampleOutput = `Đã tạo layout đồ họa dựa trên prompt: "${prompt}". Phong cách: Hiện đại, độ tương phản cao, định dạng chuẩn 1200x630.`;
      canvasElements = [
        { id: 'header', type: 'text', content: title, fontSize: 22, color: '#0084FF' },
        { id: 'summary', type: 'text', content: prompt, fontSize: 14, color: '#475569' },
        { id: 'shield', type: 'shape', content: 'Cyber Shield Badge', color: '#10B981' }
      ];
      break;
    case 'VIDEO':
      sampleOutput = `KỊCH BẢN VIDEO (AI Generated):\n\n[00:00 - 00:10] Mở đầu: Cảnh báo hành vi lừa đảo dựa trên "${prompt}".\n[00:10 - 00:30] Thân bài: Trực quan hóa phương thức kẻ tấn công chiếm quyền kiểm soát.\n[00:30 - 00:50] Khắc phục: 3 bước tự bảo vệ theo chuẩn Topdoo.\n[00:50 - 01:00] Kêu gọi hành động: Truy cập Topdoo Security để quét an toàn.`;
      canvasElements = [
        { id: 'scene-1', title: 'Hook mở đầu', duration: '10s' },
        { id: 'scene-2', title: 'Phân tích thủ đoạn', duration: '20s' },
        { id: 'scene-3', title: 'Quy trình xử lý', duration: '20s' }
      ];
      break;
    case 'PRESENTATION':
      sampleOutput = `BỘ KHUNG BÀI THUYẾT TRÌNH (8 Slides):\n1. Giới thiệu tổng quan đề tài\n2. Phân tích thực trạng và mối đe dọa\n3. Kiến trúc giải pháp Topdoo đề xuất\n4. Lợi ích kinh tế và tối ưu chi phí\n5. Kế hoạch triển khai trong 30 ngày.`;
      canvasElements = [
        { slide: 1, title: 'Trang tiêu đề' },
        { slide: 2, title: 'Bức tranh rủi ro' },
        { slide: 3, title: 'Kiến trúc bảo mật' },
        { slide: 4, title: 'Tổng kết & Khuyến nghị' }
      ];
      break;
    default:
      sampleOutput = `BẢN NỘI DUNG CHUYÊN SÂU:\n\nChủ đề: ${title}\nNội dung chính:\n- Bối cảnh: Phân tích chi tiết rủi ro mạng hiện đại.\n- Hướng dẫn thực hành: Các bước triển khai cho đội ngũ chuyên môn.\n- Kết luận: Các chỉ số an toàn cần theo dõi định kỳ.`;
      canvasElements = [{ id: 'text-block', content: sampleOutput }];
  }

  const newProject = {
    id: generatedId,
    title,
    type,
    prompt,
    outputContent: sampleOutput,
    creditsUsed: creditCost,
    isPublished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    canvasData: {
      elements: canvasElements,
      generatedAt: new Date().toISOString()
    }
  };

  return {
    project: newProject,
    creditCost
  };
}
