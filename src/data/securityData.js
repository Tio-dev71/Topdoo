// TOPDOO SECURITY — Centralized Threat Intelligence Data Store
// Interconnected entities, reports, evidence, monitoring events, alerts, and network connections.
// Aligned with authentic Vietnamese & Global threat intelligence (CheckScam.vn, Anti-Phishing VN, VirusTotal, National Cyber Security).

export const ENTITY_TYPES = {
  DOMAIN: 'domain',
  URL: 'url',
  BANK: 'bank',
  WALLET: 'wallet',
  PHONE: 'phone',
  EMAIL: 'email',
  SOCIAL: 'social',
  COMPANY: 'company',
  PERSON: 'person'
};

export const RISK_LEVELS = {
  SAFE: { label: 'An toàn', min: 0, max: 20, color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  LOW: { label: 'Rủi ro thấp', min: 21, max: 40, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)' },
  MODERATE: { label: 'Rủi ro vừa', min: 41, max: 60, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
  HIGH: { label: 'Rủi ro cao', min: 61, max: 80, color: '#F97316', bg: 'rgba(249, 115, 22, 0.12)', border: 'rgba(249, 115, 22, 0.3)' },
  CRITICAL: { label: 'Nguy hiểm / Lừa đảo', min: 81, max: 100, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)' }
};

export const getRiskMeta = (score) => {
  if (score >= 81) return RISK_LEVELS.CRITICAL;
  if (score >= 61) return RISK_LEVELS.HIGH;
  if (score >= 41) return RISK_LEVELS.MODERATE;
  if (score >= 21) return RISK_LEVELS.LOW;
  return RISK_LEVELS.SAFE;
};

export const initialEntities = [
  {
    id: 'ent-1',
    identifier: 'vcb-online-digibank.top',
    type: 'domain',
    name: 'Vietcombank Digibank Giả Mạo (SMS Phishing Gateway)',
    riskScore: 96,
    status: 'Đã xác nhận Phishing / Thu thập OTP',
    targetBrand: 'Vietcombank',
    category: 'Lừa đảo Ngân hàng',
    createdAt: '2026-09-28',
    lastSeen: '8 phút trước',
    reportsCount: 64,
    evidenceCount: 22,
    watchlist: true,
    country: 'VN',
    ip: '103.145.2.88',
    asn: 'AS135905 (VNPT Cloud Hosting)',
    registrar: 'NameCheap / Đăng ký ẩn danh',
    ssl: 'Let\'s Encrypt (Cấp mới 3 ngày trước)',
    domainAge: '4 ngày',
    redirectCount: 2,
    summary: 'Chiến dịch tấn công Phishing ngân hàng Vietcombank qua tin nhắn SMS Brandname giả mạo. Giao diện sao chép y hệt VCB Digibank nhằm đánh cắp tên đăng nhập, mật khẩu và mã OTP thời gian thực.',
    riskFactors: [
      { name: 'Lịch sử báo cáo', score: 34, max: 35, status: 'Critical', desc: '64 báo cáo nạn nhân được xác thực bởi cộng đồng AntiPhishing VN và CheckScam.' },
      { name: 'Dấu hiệu Phishing', score: 30, max: 30, status: 'Critical', desc: 'Sao chép 100% giao diện VCB Digibank, chứa script đảo ngược phiên OTP tự động.' },
      { name: 'Kết nối mạng lưới', score: 18, max: 20, status: 'High', desc: 'Chung cụm hosting với 5 tên miền lừa đảo giả mạo MB Bank và Techcombank.' },
      { name: 'Uy tín tên miền', score: 14, max: 15, status: 'High', desc: 'Tên miền đuôi .top mới kích hoạt dưới 7 ngày, ẩn toàn bộ thông tin chủ thể WHOIS.' }
    ],
    relatedEntityIds: ['ent-2', 'ent-3', 'ent-4'],
    dns: {
      a: ['103.145.2.88'],
      mx: ['mail.vcb-online-digibank.top'],
      ns: ['ns1.dns-bulletproof.top', 'ns2.dns-bulletproof.top'],
      txt: ['v=spf1 -all']
    }
  },
  {
    id: 'ent-2',
    identifier: '0389281726',
    type: 'bank',
    name: 'MB Bank: 0389281726 - LE VAN BINH',
    riskScore: 98,
    status: 'Tài khoản Đen / CheckScam Blacklist',
    targetBrand: 'MB Bank (Quân Đội)',
    category: 'Tài khoản Lừa đảo',
    createdAt: '2026-09-25',
    lastSeen: '15 phút trước',
    reportsCount: 46,
    evidenceCount: 18,
    watchlist: true,
    country: 'VN',
    bankName: 'MB Bank (Quân Đội)',
    accountHolder: 'LE VAN BINH',
    totalDamage: '145.000.000 VNĐ',
    summary: 'Tài khoản đứng tên LE VAN BINH chuyên dùng để nhận tiền lừa đảo nâng hạn mức thẻ tín dụng và phí giải ngân tiền vay online ảo. Đã có 46 biên lai tố giác trên CheckScam.vn.',
    riskFactors: [
      { name: 'Lịch sử tố giác', score: 35, max: 35, status: 'Critical', desc: '46 biên lai chuyển tiền và đơn tố giác được kiểm duyệt trên CheckScam.vn.' },
      { name: 'Mức độ thiệt hại', score: 29, max: 30, status: 'Critical', desc: 'Tổng số tiền chiếm đoạt ước tính vượt 145 triệu đồng.' },
      { name: 'Liên kết thực thể', score: 19, max: 20, status: 'Critical', desc: 'Nhận tiền trực tiếp từ các nạn nhân sập bẫy tên miền vcb-online-digibank.top và hotline mạo danh.' }
    ],
    relatedEntityIds: ['ent-1', 'ent-5']
  },
  {
    id: 'ent-3',
    identifier: 'tra-cuu-thue-dientu.online',
    type: 'domain',
    name: 'Cổng Giả Mạo Tổng Cục Thuế (Trojan APK Stealer)',
    riskScore: 97,
    status: 'Mã độc Android / Chiếm quyền Accessibility',
    targetBrand: 'Tổng cục Thuế Việt Nam',
    category: 'Phần mềm Độc hại (Malware)',
    createdAt: '2026-09-20',
    lastSeen: '25 phút trước',
    reportsCount: 78,
    evidenceCount: 29,
    watchlist: true,
    country: 'VN',
    ip: '45.118.144.92',
    asn: 'AS58941 (Viettel IDC Subnet)',
    ssl: 'Cloudflare SSL',
    domainAge: '12 ngày',
    redirectCount: 1,
    summary: 'Trang web mạo danh Tổng cục Thuế ép nạn nhân cài đặt tệp APK HoaDonDienTu.apk. Ứng dụng chiếm quyền trợ năng Android, tự động vô hiệu hóa sinh trắc học và chuyển tiền từ ứng dụng ngân hàng.',
    riskFactors: [
      { name: 'Mức độ nguy hiểm', score: 35, max: 35, status: 'Critical', desc: 'Chứa trojan gián điệp RAT có khả năng điều khiển thiết bị từ xa.' },
      { name: 'Dấu hiệu giả mạo', score: 30, max: 30, status: 'Critical', desc: 'Sử dụng quốc huy và biểu trưng của cơ quan thuế nhà nước.' }
    ],
    relatedEntityIds: ['ent-2', 'ent-4'],
    dns: {
      a: ['45.118.144.92'],
      mx: [],
      ns: ['ns1.cloudflare.com', 'ns2.cloudflare.com'],
      txt: []
    }
  },
  {
    id: 'ent-4',
    identifier: 'dvc-quocgia-vneid.site',
    type: 'domain',
    name: 'Cổng Dịch Vụ Công Quốc Gia Giả Mạo (Định danh VNeID)',
    riskScore: 95,
    status: 'Chiếm đoạt CCCD & Định danh Số',
    targetBrand: 'Bộ Công An - VNeID',
    category: 'Mạo danh Cơ quan Nhà nước',
    createdAt: '2026-09-18',
    lastSeen: '1 giờ trước',
    reportsCount: 52,
    evidenceCount: 16,
    watchlist: true,
    country: 'VN',
    ip: '103.74.120.15',
    asn: 'AS13335 (Cloudflare Hosting)',
    domainAge: '8 ngày',
    summary: 'Trang web lừa đảo kích hoạt định danh mức 2 VNeID, dụ người dùng nhập số CCCD, hình ảnh chân dung và mật khẩu ngân hàng số.',
    riskFactors: [
      { name: 'Lịch sử báo cáo', score: 31, max: 35, status: 'Critical', desc: '52 báo cáo gửi về từ Cổng Cảnh báo An toàn thông tin Quốc gia.' },
      { name: 'Chỉ số lừa đảo', score: 29, max: 30, status: 'Critical', desc: 'Thu thập thông tin định danh trái phép vi phạm nghiêm trọng Luật An ninh mạng.' }
    ],
    relatedEntityIds: ['ent-1', 'ent-3']
  },
  {
    id: 'ent-5',
    identifier: '0878192837',
    type: 'phone',
    name: 'Đầu số Shipper Lừa Đảo Đơn Hàng 0 Đồng',
    riskScore: 89,
    status: 'Số điện thoại Lừa đảo hàng loạt',
    targetBrand: 'Giao hàng Tiết kiệm / Shopee Express',
    category: 'Lừa đảo Viễn thông',
    createdAt: '2026-09-22',
    lastSeen: '30 phút trước',
    reportsCount: 58,
    evidenceCount: 12,
    watchlist: true,
    country: 'VN',
    carrier: 'I-Telecom',
    summary: 'Thuê bao chuyên gọi điện cho người nội trợ, báo có bưu kiện hàng gia dụng giá rẻ giao đến nhà và yêu cầu chuyển khoản tiền cọc bưu tá qua STK lừa đảo.',
    riskFactors: [
      { name: 'Lịch sử phản ánh', score: 30, max: 35, status: 'High', desc: '58 lượt đánh giá lừa đảo trên ứng dụng Chống Lừa Đảo và Truecaller.' },
      { name: 'Liên kết dòng tiền', score: 25, max: 30, status: 'Critical', desc: 'Yêu cầu nạn nhân chuyển khoản thẳng vào STK MB Bank 0389281726.' }
    ],
    relatedEntityIds: ['ent-2']
  },
  {
    id: 'ent-6',
    identifier: '1029384756',
    type: 'bank',
    name: 'Vietcombank: 1029384756 - TRAN THI THU THAO',
    riskScore: 98,
    status: 'CheckScam Verified / Đường dây giật đơn TMĐT',
    targetBrand: 'Vietcombank',
    category: 'Tài khoản Lừa đảo',
    createdAt: '2026-09-15',
    lastSeen: '1 giờ trước',
    reportsCount: 89,
    evidenceCount: 34,
    watchlist: true,
    country: 'VN',
    bankName: 'Vietcombank',
    accountHolder: 'TRAN THI THU THAO',
    totalDamage: '380.000.000 VNĐ',
    summary: 'Tài khoản thu tiền làm nhiệm vụ CTV Shopee / Lazada lừa đảo. Nhận hàng trăm lượt chuyển tiền từ 500k đến hàng chục triệu đồng, tổng thiệt hại 380 triệu VNĐ.',
    riskFactors: [
      { name: 'Báo cáo nạn nhân', score: 35, max: 35, status: 'Critical', desc: '89 biên lai chuyển tiền xác thực gửi về hệ thống CheckScam.' },
      { name: 'Dấu hiệu tội phạm', score: 28, max: 30, status: 'Critical', desc: 'Tài khoản mở bằng CMND giả mạo, dòng tiền luân chuyển liên tục qua sàn tiền ảo.' }
    ],
    relatedEntityIds: ['ent-7']
  },
  {
    id: 'ent-7',
    identifier: 'shopee-tuyen-dung-vn.cc',
    type: 'domain',
    name: 'Shopee Tuyển Dụng Online Giả Mạo',
    riskScore: 92,
    status: 'Web tuyển dụng lừa đảo chiết khấu cao',
    targetBrand: 'Shopee Việt Nam',
    category: 'Lừa đảo Tuyển dụng',
    createdAt: '2026-09-24',
    lastSeen: '2 giờ trước',
    reportsCount: 41,
    evidenceCount: 15,
    watchlist: false,
    country: 'VN',
    ip: '104.21.55.90',
    summary: 'Trang web hứa hẹn hoa hồng 20% mỗi đơn hàng hoàn thành, chuyển hướng người dùng vào nhóm Telegram độc hại để ép nạp tiền vào STK Vietcombank 1029384756.',
    riskFactors: [
      { name: 'Giả mạo thương hiệu', score: 30, max: 35, status: 'High', desc: 'Mạo danh logo và bộ nhận diện thương hiệu Shopee Việt Nam.' }
    ],
    relatedEntityIds: ['ent-6']
  },
  {
    id: 'ent-8',
    identifier: '0288889999',
    type: 'phone',
    name: 'Đầu số Máy bàn VoIP Giả danh Tổng đài Viễn thông',
    riskScore: 91,
    status: 'Cuộc gọi Rác / Đe dọa khóa SIM',
    targetBrand: 'Bộ Thông tin & Truyền thông / Viettel',
    category: 'Spam Cuộc gọi & Dọa dẫm',
    createdAt: '2026-09-10',
    lastSeen: '45 phút trước',
    reportsCount: 230,
    evidenceCount: 40,
    watchlist: false,
    country: 'VN',
    carrier: 'Đầu số máy bàn ảo VoIP',
    summary: 'Hệ thống gọi tự động phát đoạn ghi âm dọa khóa thuê bao điện thoại trong vòng 2 giờ nếu không thanh toán cước nợ quốc tế.',
    riskFactors: [
      { name: 'Số lượng cuộc gọi', score: 35, max: 35, status: 'Critical', desc: 'Hơn 230 lượt phản ánh số điện thoại rác quấy rối trong tuần qua.' }
    ],
    relatedEntityIds: []
  },
  {
    id: 'ent-9',
    identifier: '19038291029384',
    type: 'bank',
    name: 'Techcombank: 19038291029384 - NGUYEN HOANG PHUC',
    riskScore: 99,
    status: 'Đường dây Giả mạo Công an / Viện Kiểm Sát',
    targetBrand: 'Techcombank',
    category: 'Chiếm đoạt Tài sản Quy mô lớn',
    createdAt: '2026-09-01',
    lastSeen: '3 giờ trước',
    reportsCount: 112,
    evidenceCount: 51,
    watchlist: true,
    country: 'VN',
    bankName: 'Techcombank',
    accountHolder: 'NGUYEN HOANG PHUC',
    totalDamage: '1.200.000.000 VNĐ',
    summary: 'Tài khoản trung gian rửa tiền quy mô lớn chuyên nhận tiền từ các vụ đe dọa lệnh bắt tạm giam giả mạo. Đã chiếm đoạt trên 1,2 tỷ đồng của các nạn nhân cao tuổi.',
    riskFactors: [
      { name: 'Thiệt hại nghiêm trọng', score: 35, max: 35, status: 'Critical', desc: 'Thiệt hại ghi nhận trên 1,2 tỷ đồng với 112 lượt tố giác.' }
    ],
    relatedEntityIds: ['ent-4']
  },
  {
    id: 'ent-10',
    identifier: 'chinhphu.vn',
    type: 'domain',
    name: 'Cổng Thông tin Điện tử Chính phủ Việt Nam',
    riskScore: 0,
    status: 'Cơ quan Nhà nước Xác thực (Chính chủ)',
    targetBrand: 'Chính phủ Nước CHXHCN Việt Nam',
    category: 'Cơ quan Chính phủ',
    createdAt: '2000-01-01',
    lastSeen: 'Vừa xong',
    reportsCount: 0,
    evidenceCount: 50,
    watchlist: false,
    country: 'VN',
    ip: '113.160.224.8',
    summary: 'Hạ tầng cổng thông tin điện tử cơ quan nhà nước uy tín cao nhất. Đạt chuẩn bảo mật mức cao nhất theo quy định Bộ TT&TT.',
    riskFactors: [
      { name: 'Xác thực cơ quan', score: 0, max: 35, status: 'Clean', desc: 'Tên miền quốc gia được bảo hộ và chứng thực tuyệt đối.' }
    ],
    relatedEntityIds: []
  },
  {
    id: 'ent-11',
    identifier: 'topdoo.com',
    type: 'domain',
    name: 'Hạ tầng Nền tảng An ninh & AI TOPDOO',
    riskScore: 0,
    status: 'Hệ sinh thái Chính thức Xác minh',
    targetBrand: 'TOPDOO Platform',
    category: 'Hạ tầng Công nghệ An ninh',
    createdAt: '2026-01-01',
    lastSeen: 'Vừa xong',
    reportsCount: 0,
    evidenceCount: 38,
    watchlist: false,
    country: 'VN',
    ip: '157.66.100.35',
    summary: 'Hệ thống kiểm định an toàn thông tin, bảo vệ người dùng số và doanh nghiệp trước gian lận trực tuyến.',
    riskFactors: [
      { name: 'Độ tin cậy hạ tầng', score: 0, max: 35, status: 'Clean', desc: 'Chứng chỉ TLS bảo mật cao cấp, hệ thống quét mã độc đạt chuẩn Zero-Trust.' }
    ],
    relatedEntityIds: []
  },
  {
    id: 'ent-12',
    identifier: 'vietcombank.com.vn',
    type: 'domain',
    name: 'Ngân hàng TMCP Ngoại thương Việt Nam (Chính thức)',
    riskScore: 0,
    status: 'Cổng Ngân hàng Chính thức Xác minh',
    targetBrand: 'Vietcombank',
    category: 'Ngân hàng & Tài chính',
    createdAt: '2002-05-15',
    lastSeen: 'Vừa xong',
    reportsCount: 0,
    evidenceCount: 60,
    watchlist: false,
    country: 'VN',
    ip: '113.160.240.50',
    summary: 'Cổng giao dịch ngân hàng trực tuyến chính thống của Vietcombank, đầy đủ chứng chỉ bảo mật EV SSL Extended Validation.',
    riskFactors: [
      { name: 'Xác thực thương hiệu', score: 0, max: 35, status: 'Clean', desc: 'Ngân hàng thương mại quốc gia uy tín bậc nhất Việt Nam.' }
    ],
    relatedEntityIds: []
  }
];

export const initialReports = [
  {
    id: 'REP-2026-8921',
    entityId: 'ent-1',
    entityIdentifier: 'vcb-online-digibank.top',
    entityType: 'domain',
    category: 'Lừa đảo Ngân hàng',
    riskLevel: 'Critical',
    riskScore: 96,
    status: 'Verified',
    submittedBy: 'kiem-dinh@antiphishing.vn',
    createdAt: '2026-09-29 14:22:10 UTC',
    lossReported: '45.000.000 VNĐ',
    title: 'Trang web mạo danh Vietcombank Digibank đánh cắp mã OTP rút tiền tài khoản',
    description: 'Nạn nhân nhận được tin nhắn SMS mạo danh tổng đài ngân hàng thông báo tài khoản đang đăng nhập bất thường trên thiết bị lạ, yêu cầu bấm vào liên kết vcb-online-digibank.top để xác nhận. Sau khi nhập số tài khoản và OTP, tài khoản bị trừ 45 triệu đồng.',
    evidenceIds: ['evi-1', 'evi-2', 'evi-3'],
    reviewer: 'Chuyên gia An ninh mạng Topdoo Threat Intel',
    reviewedAt: '2026-09-29 15:45:00 UTC',
    reviewerNotes: 'Đã xác thực mã nguồn lừa đảo Reverse Proxy bắt gói tin OTP thời gian thực. Đã đồng bộ vào cơ sở dữ liệu DNS chặn toàn quốc.',
    timeline: [
      { date: '2026-09-29 14:22', event: 'Tiếp nhận tố giác từ nạn nhân qua CheckScam.vn' },
      { date: '2026-09-29 14:35', event: 'Hệ thống Sandbox Topdoo quét và bóc tách kịch bản thu thập OTP' },
      { date: '2026-09-29 15:10', event: 'Chuyên gia an ninh duyệt báo cáo sang trạng thái XÁC THỰC' },
      { date: '2026-09-29 15:45', event: 'Đồng bộ tên miền vào Blacklist an ninh quốc gia' }
    ]
  },
  {
    id: 'REP-2026-8919',
    entityId: 'ent-2',
    entityIdentifier: '0389281726',
    entityType: 'bank',
    category: 'Tài khoản Lừa đảo',
    riskLevel: 'Critical',
    riskScore: 98,
    status: 'Verified',
    submittedBy: 'nguyenvana.hn@gmail.com',
    createdAt: '2026-09-28 09:15:44 UTC',
    lossReported: '12.500.000 VNĐ',
    title: 'Tài khoản MB Bank 0389281726 lừa tiền phí nâng hạn mức thẻ tín dụng',
    description: 'Đối tượng tự xưng chuyên viên thẩm định hồ sơ MB Bank liên hệ qua Zalo thông báo duyệt hạn mức thẻ 100 triệu, yêu cầu chuyển khoản trước 12.5 triệu đồng vào STK 0389281726 - LE VAN BINH để chứng minh năng lực tài chính rồi khóa máy.',
    evidenceIds: ['evi-4', 'evi-5'],
    reviewer: 'Kiểm duyệt viên CheckScam',
    reviewedAt: '2026-09-28 10:30:12 UTC',
    reviewerNotes: 'Biên lai chuyển tiền ngân hàng đã được đối chiếu khớp lệnh. Tài khoản đã bị 46 người khác tố giác cùng thủ đoạn.',
    timeline: [
      { date: '2026-09-28 09:15', event: 'Gửi biên lai chuyển khoản và lịch sử chat lừa đảo' },
      { date: '2026-09-28 09:40', event: 'Hệ thống kiểm tra số dư và tài khoản trùng khớp danh sách đen' },
      { date: '2026-09-28 10:30', event: 'Xác thực tài khoản lừa đảo và cảnh báo người dùng toàn hệ thống' }
    ]
  },
  {
    id: 'REP-2026-8915',
    entityId: 'ent-3',
    entityIdentifier: 'tra-cuu-thue-dientu.online',
    entityType: 'domain',
    category: 'Mã độc Gián điệp',
    riskLevel: 'Critical',
    riskScore: 97,
    status: 'Verified',
    submittedBy: 'doanhnghiep.hcm@gmail.com',
    createdAt: '2026-09-26 18:02:30 UTC',
    lossReported: '180.000.000 VNĐ',
    title: 'Trang web mạo danh Tổng cục Thuế ép cài đặt tệp APK chiếm quyền điều khiển điện thoại',
    description: 'Nạn nhân được hướng dẫn cài đặt phần mềm Thuế để hưởng ưu đãi giảm 2% thuế GTGT. Sau khi cài đặt tệp APK từ trang tra-cuu-thue-dientu.online, điện thoại bị tối màn hình và tài khoản doanh nghiệp bị tự động chuyển đi 180 triệu đồng.',
    evidenceIds: ['evi-6', 'evi-7'],
    reviewer: 'Đội Phản ứng Sự cố Topdoo CSIRT',
    reviewedAt: '2026-09-27 11:20:00 UTC',
    reviewerNotes: 'Đã phân tích mã độc: APK chứa Trojan RAT gián điệp, lợi dụng Accessibility Service để vượt qua xác thực sinh trắc học khuôn mặt FaceID.',
    timeline: [
      { date: '2026-09-26 18:02', event: 'Tiếp nhận mẫu tệp độc hại từ thiết bị nạn nhân' },
      { date: '2026-09-27 11:20', event: 'Dịch ngược mã nguồn APK, xác định máy chủ điều khiển C&C' }
    ]
  },
  {
    id: 'REP-2026-8910',
    entityId: 'ent-6',
    entityIdentifier: '1029384756',
    entityType: 'bank',
    category: 'Tài khoản Lừa đảo',
    riskLevel: 'Critical',
    riskScore: 98,
    status: 'Verified',
    submittedBy: 'hoangminh.ctv@gmail.com',
    createdAt: '2026-09-25 11:40:15 UTC',
    lossReported: '68.000.000 VNĐ',
    title: 'Tài khoản Vietcombank 1029384756 nhận tiền lừa đảo giật đơn Shopee',
    description: 'Tham gia làm cộng tác viên giật đơn hàng online nhận hoa hồng. Ban đầu nạp 500k được rút về 600k, các vòng sau yêu cầu chuyển các khoản lớn 15 triệu, 53 triệu vào STK 1029384756 - TRAN THI THU THAO rồi báo lỗi hệ thống bắt nạp tiếp.',
    evidenceIds: ['evi-8'],
    reviewer: 'Chuyên viên Tình báo Gian lận',
    reviewedAt: '2026-09-25 14:10:00 UTC',
    reviewerNotes: 'Thủ đoạn lừa đảo việc làm quen thuộc. Đã đưa vào danh mục giám sát tài khoản ngân hàng đen.',
    timeline: [
      { date: '2026-09-25 11:40', event: 'Tiếp nhận hồ sơ tố giác kèm sao kê ngân hàng' },
      { date: '2026-09-25 14:10', event: 'Xác thực và phân loại vào chuỗi lừa đảo việc làm trực tuyến' }
    ]
  },
  {
    id: 'REP-2026-8894',
    entityId: 'ent-5',
    entityIdentifier: '0878192837',
    entityType: 'phone',
    category: 'Lừa đảo Viễn thông',
    riskLevel: 'High',
    riskScore: 89,
    status: 'Verified',
    submittedBy: 'nguoitieu-dung@gmail.com',
    createdAt: '2026-09-24 16:30:00 UTC',
    lossReported: '320.000 VNĐ',
    title: 'Đầu số shipper gọi báo giao đơn hàng 0 đồng lừa chuyển khoản phí cước',
    description: 'Đối tượng gọi liên tục báo có gói quà tặng tri ân khách hàng từ sàn thương mại điện tử, xin chuyển khoản cọc vận chuyển 320.000 VNĐ. Sau khi nhận tiền thì chặn số.',
    evidenceIds: [],
    reviewer: 'Chuyên viên Viễn thông Topdoo',
    reviewedAt: '2026-09-24 17:15:00 UTC',
    reviewerNotes: 'Số điện thoại thuộc mạng ảo I-Telecom, không chính chủ, đã bị cộng đồng gắn cờ lừa đảo hơn 58 lần.',
    timeline: [
      { date: '2026-09-24 16:30', event: 'Ghi nhận phản ánh cuộc gọi rác' },
      { date: '2026-09-24 17:15', event: 'Xác thực và đưa vào danh sách đen chặn cuộc gọi' }
    ]
  }
];

export const initialEvidence = [
  {
    id: 'evi-1',
    title: 'Tệp kịch bản bóc tách gói tin OTP từ trang Phishing Vietcombank',
    type: 'Đoạn mã / Trích xuất Payload',
    entityId: 'ent-1',
    entityIdentifier: 'vcb-online-digibank.top',
    source: 'Hệ thống Sandbox Chromium Topdoo',
    submittedBy: 'Hệ thống Quét Tự Động',
    timestamp: '2026-09-29 14:35:12 UTC',
    verificationStatus: 'Verified',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    size: '142 KB',
    description: 'Đoạn mã JavaScript bị làm rối (vcb-auth-bundle.min.js) chứa hàm lắng nghe sự kiện form submit, tự động gửi tên đăng nhập, mật khẩu và OTP về máy chủ điều khiển qua giao thức WebSocket.',
    metadata: {
      serverIp: '103.145.2.88',
      tlsCipher: 'TLS_AES_128_GCM_SHA256',
      httpStatus: 200,
      mimeType: 'application/javascript'
    }
  },
  {
    id: 'evi-2',
    title: 'Ảnh chụp màn hình tin nhắn SMS Brandname giả mạo Vietcombank',
    type: 'Hình ảnh / Chứng cứ',
    entityId: 'ent-1',
    entityIdentifier: 'vcb-online-digibank.top',
    source: 'Nạn nhân cung cấp',
    submittedBy: 'kiem-dinh@antiphishing.vn',
    timestamp: '2026-09-29 14:40:02 UTC',
    verificationStatus: 'Verified',
    hash: '0x9a8f273b4010b99818817742cf6f71d5b4a9235e128919f972b94429891001a4',
    size: '840 KB',
    description: 'Tin nhắn gửi đến điện thoại nạn nhân từ trạm phát sóng giả IMSI Catcher mạo danh đầu số ngân hàng, chứa liên kết rút gọn điều hướng sang vcb-online-digibank.top.',
    metadata: {
      imageResolution: '1080x2400',
      brandClaimed: 'Vietcombank',
      fakeSmsHeader: 'Vietcombank-TB'
    }
  },
  {
    id: 'evi-3',
    title: 'Bản lưu trữ HAR lưu toàn bộ luồng mạng Reverse Proxy',
    type: 'Tệp lưu trữ mạng HAR',
    entityId: 'ent-1',
    entityIdentifier: 'vcb-online-digibank.top',
    source: 'Phiên kiểm thử chuyên gia an ninh',
    submittedBy: 'Topdoo SecOps Lab',
    timestamp: '2026-09-29 15:00:20 UTC',
    verificationStatus: 'Verified',
    hash: '7c4a8d09ca3762af61e59520943dc26494f8941b',
    size: '1.8 MB',
    description: 'Toàn bộ request và response chứng minh hệ thống lừa đảo đóng vai trò trung gian chuyển tiếp thông tin trực tiếp tới API ngân hàng thật để lấy mã OTP.',
    metadata: {
      requestsLogged: 64,
      targetEndpoint: 'https://vcb-online-digibank.top/api/auth/verify'
    }
  },
  {
    id: 'evi-4',
    title: 'Biên lai chuyển khoản ngân hàng 12.5 triệu vào STK 0389281726',
    type: 'Chứng từ Ngân hàng / PDF',
    entityId: 'ent-2',
    entityIdentifier: '0389281726',
    source: 'Sao kê ứng dụng ngân hàng số',
    submittedBy: 'nguyenvana.hn@gmail.com',
    timestamp: '2026-09-28 09:20:11 UTC',
    verificationStatus: 'Verified',
    hash: '4d8a1f9e2b0c3d4e5f6a7b8c9d0e1f2a3b4c5d6e',
    size: '220 KB',
    description: 'Biên lai thể hiện giao dịch chuyển tiền nhanh NAPAS 24/7 từ tài khoản nạn nhân sang STK MB Bank 0389281726 - LE VAN BINH với nội dung "Phi ho so vay".',
    metadata: {
      bankName: 'MB Bank',
      accountHolder: 'LE VAN BINH',
      amount: '12.500.000 VNĐ'
    }
  },
  {
    id: 'evi-5',
    title: 'Ảnh chụp màn hình đoạn chat Zalo đối tượng lừa đảo giả danh nhân viên tín dụng',
    type: 'Hình ảnh / Chat Log',
    entityId: 'ent-2',
    entityIdentifier: '0389281726',
    source: 'Nạn nhân cung cấp',
    submittedBy: 'nguyenvana.hn@gmail.com',
    timestamp: '2026-09-28 09:25:45 UTC',
    verificationStatus: 'Verified',
    hash: '91f0a2c3b4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
    size: '1.2 MB',
    description: 'Đối tượng sử dụng ảnh đại diện nhân viên ngân hàng đeo thẻ, cam kết giải ngân hồ sơ vay vốn trong vòng 30 phút sau khi nộp phí xác thực.',
    metadata: {
      platform: 'Zalo',
      phoneZalo: '0878192837'
    }
  },
  {
    id: 'evi-6',
    title: 'Mẫu tệp mã độc APK HoaDonDienTu.apk trích xuất từ điện thoại Android',
    type: 'Tệp nhị phân / APK Binary',
    entityId: 'ent-3',
    entityIdentifier: 'tra-cuu-thue-dientu.online',
    source: 'Mẫu trích xuất thực tế từ thiết bị',
    submittedBy: 'Topdoo CSIRT Malware Lab',
    timestamp: '2026-09-26 18:30:10 UTC',
    verificationStatus: 'Verified',
    hash: '3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e',
    size: '8.4 MB',
    description: 'Gói cài đặt Android chứa thư viện chia sẻ độc hại (.so) có khả năng đọc trích xuất mã OTP từ màn hình và kích hoạt chuyển tiền ngầm.',
    metadata: {
      packageName: 'vn.gdt.thuedientu.app',
      targetSdk: 33,
      dangerousPermissions: ['BIND_ACCESSIBILITY_SERVICE', 'RECEIVE_SMS', 'READ_PHONE_STATE']
    }
  },
  {
    id: 'evi-7',
    title: 'Biên bản cảnh báo từ Cục An toàn Thông tin - Bộ TT&TT',
    type: 'Văn bản Cảnh báo Chính thức',
    entityId: 'ent-3',
    entityIdentifier: 'tra-cuu-thue-dientu.online',
    source: 'Cổng khonggianmang.vn',
    submittedBy: 'Cục ATTT',
    timestamp: '2026-09-27 10:15:00 UTC',
    verificationStatus: 'Verified',
    hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9012',
    size: '95 KB',
    description: 'Cảnh báo khẩn cấp về thủ đoạn mạo danh cơ quan thuế cài ứng dụng giả mạo chiếm quyền trợ năng trên điện thoại thông minh.',
    metadata: {
      docId: 'CB-ATTT-2026/09',
      issuingAuthority: 'Cục An toàn thông tin'
    }
  },
  {
    id: 'evi-8',
    title: 'Sao kê ngân hàng chuyển 53 triệu làm nhiệm vụ giật đơn sàn TMĐT',
    type: 'Chứng từ Ngân hàng',
    entityId: 'ent-6',
    entityIdentifier: '1029384756',
    source: 'Nạn nhân tố giác',
    submittedBy: 'hoangminh.ctv@gmail.com',
    timestamp: '2026-09-25 12:00:00 UTC',
    verificationStatus: 'Verified',
    hash: '5e6f7a8b9c0d1e2f3a4b5c6d7e8f90121a2b3c4d',
    size: '340 KB',
    description: 'Giao dịch chuyển tiền đến STK Vietcombank 1029384756 - TRAN THI THU THAO để mở khóa hoa hồng đơn hàng VIP.',
    metadata: {
      bank: 'Vietcombank',
      beneficiary: 'TRAN THI THU THAO'
    }
  }
];

export const initialAlerts = [
  {
    id: 'ALT-1092',
    severity: 'Critical',
    title: 'Cảnh báo chiến dịch Phishing mạo danh Vietcombank Digibank',
    entityId: 'ent-1',
    entityIdentifier: 'vcb-online-digibank.top',
    entityType: 'domain',
    reason: 'Gia tăng đột biến 64 lượt nạn nhân nhận SMS Brandname giả mạo trong 60 phút qua.',
    timestamp: '8 phút trước',
    status: 'Unresolved',
    category: 'Nguy cơ Leo thang',
    details: 'Hệ thống phân tích cú pháp phát hiện kịch bản đảo ngược Reverse Proxy bắt gói tin OTP thời gian thực. Đã phát lệnh chặn trên hệ thống tường lửa DNS Topdoo.'
  },
  {
    id: 'ALT-1088',
    severity: 'Critical',
    title: 'Phát hiện tệp APK độc hại mạo danh Cổng Thuế điện tử ép cài đặt',
    entityId: 'ent-3',
    entityIdentifier: 'tra-cuu-thue-dientu.online',
    entityType: 'domain',
    reason: 'Tên miền điều hướng người dùng Android tải tệp HoaDonDienTu.apk chiếm quyền trợ năng Accessibility.',
    timestamp: '25 phút trước',
    status: 'Unresolved',
    category: 'Mã độc Gián điệp',
    details: 'Phân tích sandbox phát hiện hành vi tự động vô hiệu hóa xác thực sinh trắc học và chụp trộm màn hình ứng dụng ngân hàng số.'
  },
  {
    id: 'ALT-1074',
    severity: 'High',
    title: 'Tài khoản MB Bank nhận tiền cọc xe máy ảo có dấu hiệu tẩu tán dòng tiền',
    entityId: 'ent-2',
    entityIdentifier: '0389281726',
    entityType: 'bank',
    reason: 'CheckScam.vn ghi nhận thêm 12 đơn tố giác lừa đảo, thiệt hại tích lũy đạt 145 triệu VNĐ.',
    timestamp: '1 giờ trước',
    status: 'Resolved',
    category: 'Gian lận Tài chính',
    details: 'Tài khoản bị gắn cờ đỏ trên cổng liên ngân hàng và hệ thống dữ liệu phòng chống rửa tiền quốc gia.'
  },
  {
    id: 'ALT-1065',
    severity: 'Medium',
    title: 'Phát hiện biến thể tên miền mạo danh Cổng Dịch vụ công Quốc gia',
    entityId: 'ent-4',
    entityIdentifier: 'dvc-quocgia-vneid.site',
    entityType: 'domain',
    reason: 'IP máy chủ chuyển dịch sang dải hosting ẩn danh nhằm né tránh kiểm duyệt tên miền quốc gia.',
    timestamp: '3 giờ trước',
    status: 'Resolved',
    category: 'Thay đổi Hạ tầng',
    details: 'Hệ thống Topdoo Radar đã bổ sung tên miền vào Blacklist chặn DNS thời gian thực.'
  },
  {
    id: 'ALT-1049',
    severity: 'Informational',
    title: 'Đồng bộ hoàn tất cơ sở dữ liệu CheckScam.vn & AntiPhishing VN',
    entityId: 'ent-11',
    entityIdentifier: 'topdoo.com',
    entityType: 'domain',
    reason: 'Hơn 85.000 mẫu lừa đảo số, số tài khoản ngân hàng đen và đầu số viễn thông rác đã được đồng bộ.',
    timestamp: '5 giờ trước',
    status: 'Resolved',
    category: 'Hệ thống',
    details: 'Dữ liệu tình báo được kiểm tra tính toàn vẹn 100% với 17 nguồn dữ liệu an ninh số Việt Nam và quốc tế.'
  }
];

export const initialMonitoringEvents = [
  {
    id: 'MON-904',
    timestamp: '3 phút trước',
    entityId: 'ent-1',
    entityIdentifier: 'vcb-online-digibank.top',
    entityType: 'domain',
    event: 'Phát hiện lượt truy cập Phishing mới',
    change: 'Hệ thống ngăn chặn 18 lượt truy cập từ người dùng mạng Viettel & VNPT',
    severity: 'Critical',
    rule: 'Quy tắc ngăn chặn SMS Phishing tự động'
  },
  {
    id: 'MON-903',
    timestamp: '12 phút trước',
    entityId: 'ent-2',
    entityIdentifier: '0389281726',
    entityType: 'bank',
    event: 'Cập nhật điểm rủi ro CheckScam',
    change: 'Điểm tín nhiệm hạ thấp: 92 → 98 (Thêm 4 đơn tố giác mới)',
    severity: 'Critical',
    rule: 'Đánh giá rủi ro tài khoản ngân hàng đen'
  },
  {
    id: 'MON-902',
    timestamp: '25 phút trước',
    entityId: 'ent-3',
    entityIdentifier: 'tra-cuu-thue-dientu.online',
    entityType: 'domain',
    event: 'Phát hiện máy chủ C&C mã độc kích hoạt',
    change: 'Xuất hiện liên kết tải APK mới: HoaDon_Thue_v3.apk',
    severity: 'Critical',
    rule: 'Giám sát mã độc Android RAT'
  },
  {
    id: 'MON-901',
    timestamp: '1 giờ trước',
    entityId: 'ent-5',
    entityIdentifier: '0878192837',
    entityType: 'phone',
    event: 'Cảnh báo cuộc gọi quấy rối viễn thông',
    change: 'Lưu lượng gọi phát tán tăng vọt 340 cuộc trong 1 giờ',
    severity: 'High',
    rule: 'Giám sát số điện thoại Spam / Lừa đảo'
  },
  {
    id: 'MON-900',
    timestamp: '2 giờ trước',
    entityId: 'ent-10',
    entityIdentifier: 'chinhphu.vn',
    entityType: 'domain',
    event: 'Kiểm tra định kỳ hạ tầng chính phủ',
    change: 'Chứng chỉ TLS hợp lệ, chỉ số an toàn 100/100',
    severity: 'Safe',
    rule: 'Giám sát định kỳ hạ tầng uy tín'
  }
];

export const initialNetwork = {
  nodes: [
    { id: 'ent-1', label: 'vcb-online-digibank.top', type: 'domain', riskScore: 96, category: 'Phishing Gateway' },
    { id: 'ent-2', label: 'MB Bank: 0389281726', type: 'bank', riskScore: 98, category: 'Tài khoản Lừa đảo' },
    { id: 'ent-3', label: 'tra-cuu-thue-dientu.online', type: 'domain', riskScore: 97, category: 'Trojan APK C&C' },
    { id: 'ent-4', label: 'dvc-quocgia-vneid.site', type: 'domain', riskScore: 95, category: 'Mạo danh VNeID' },
    { id: 'ent-5', label: 'SĐT: 0878192837', type: 'phone', riskScore: 89, category: 'Shipper Lừa đảo' },
    { id: 'ent-6', label: 'VCB: 1029384756', type: 'bank', riskScore: 98, category: 'Giật đơn TMĐT' },
    { id: 'ent-7', label: 'shopee-tuyen-dung-vn.cc', type: 'domain', riskScore: 92, category: 'Web Tuyển dụng Ảo' },
    { id: 'ent-8', label: 'SĐT VoIP: 0288889999', type: 'phone', riskScore: 91, category: 'Spam Dọa khóa SIM' },
    { id: 'ent-9', label: 'TCB: 19038291029384', type: 'bank', riskScore: 99, category: 'Rửa tiền Giả Công an' },
    { id: 'ent-10', label: 'chinhphu.vn', type: 'domain', riskScore: 0, category: 'Hạ tầng Chính phủ' },
    { id: 'ent-11', label: 'topdoo.com', type: 'domain', riskScore: 0, category: 'Nền tảng Topdoo' },
    { id: 'node-srv-1', label: '103.145.2.88 (Hosting Lừa đảo)', type: 'server', riskScore: 95, category: 'Hạ tầng Hosting Độc hại' }
  ],
  edges: [
    { source: 'ent-1', target: 'ent-2', relation: 'Dẫn dụ nạp tiền vào' },
    { source: 'ent-5', target: 'ent-2', relation: 'Yêu cầu chuyển khoản cọc vào' },
    { source: 'ent-1', target: 'node-srv-1', relation: 'Đặt máy chủ tại' },
    { source: 'ent-3', target: 'node-srv-1', relation: 'Chung dải mạng điều khiển' },
    { source: 'ent-7', target: 'ent-6', relation: 'Dẫn dụ nạn nhân giật đơn vào' },
    { source: 'ent-4', target: 'ent-9', relation: 'Đe dọa chuyển tiền giải trình vào' },
    { source: 'ent-3', target: 'ent-4', relation: 'Cùng nhóm tội phạm phát tán' }
  ]
};

export const initialWatchlistRules = [
  { id: 'rule-1', name: 'Ngưỡng cảnh báo đột biến rủi ro', trigger: 'Điểm rủi ro tăng >= 10 điểm trong 1 giờ', enabled: true },
  { id: 'rule-2', name: 'Báo cáo nạn nhân được xác minh', trigger: 'Báo cáo được CheckScam / AntiPhishing xác thực', enabled: true },
  { id: 'rule-3', name: 'Mở rộng cụm mạng lưới lừa đảo', trigger: 'Phát hiện STK ngân hàng hoặc SĐT mới liên kết', enabled: true },
  { id: 'rule-4', name: 'Nhận diện giả mạo thương hiệu ngân hàng', trigger: 'AI Crawler phát hiện logo và giao diện sao chép', enabled: true },
  { id: 'rule-5', name: 'Thay đổi bản ghi DNS / Máy chủ', trigger: 'Tên miền đổi A, NS sang dải hosting ẩn danh', enabled: true },
  { id: 'rule-6', name: 'Dòng tiền bất thường qua tài khoản đen', trigger: 'Giao dịch chuyển tiền lừa đảo vượt 10 triệu VNĐ', enabled: true }
];

export const initialApiKeys = [
  {
    id: 'key-1',
    name: 'Tích hợp Dữ liệu Tình báo Mối đe dọa (Production)',
    key: 'topdoo_live_992a81b37c0944e2b9201a4',
    created: '2026-08-01',
    lastUsed: '12 giây trước',
    permissions: 'read:intelligence, write:reports, query:quickcheck',
    status: 'Active',
    requestsToday: 14820
  },
  {
    id: 'key-2',
    name: 'Topdoo SecOps Telegram / Discord Bot Webhook',
    key: 'topdoo_test_551e72c84a1045f9a88310c',
    created: '2026-09-10',
    lastUsed: '4 giờ trước',
    permissions: 'query:quickcheck, read:alerts',
    status: 'Active',
    requestsToday: 412
  }
];

export const statsOverview = {
  threatsDetected: '1.428.940',
  threatsChange: '+14.2%',
  highRiskEntities: '48.290',
  highRiskChange: '+8.4%',
  activeWatchlist: '1.840',
  activeWatchlistChange: '+22.5%',
  openReports: '382',
  openReportsChange: '-5.1%',
  verifiedReports: '12.940',
  verifiedReportsChange: '+18.9%',
  activeAlerts: '19',
  activeAlertsChange: '+3'
};
