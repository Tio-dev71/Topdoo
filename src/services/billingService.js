// TOPDOO BILLING, USAGE METER & SUBSCRIPTION SERVICE (M11)

export const BILLING_PLANS = [
  {
    id: 'free',
    name: 'Topdoo Khởi Đầu (Free)',
    price: '0đ/tháng',
    priceNumber: 0,
    monthlyCredits: 1000,
    features: [
      '1.000 AI Credits mỗi tháng',
      'Tra cứu Scam Database cơ bản',
      'Quét tối đa 20 URL / ngày',
      '1 thành viên Workspace'
    ]
  },
  {
    id: 'pro',
    name: 'Topdoo Chuyên Nghiệp (Pro)',
    price: '299.000đ/tháng',
    priceNumber: 299000,
    monthlyCredits: 5000,
    badge: 'Phổ biến nhất',
    features: [
      '5.000 AI Credits mỗi tháng',
      'Toàn quyền truy cập GPT-5, Claude, Gemini',
      'Quét URL & Phishing không giới hạn',
      'Truy xuất kho bằng chứng & API Key',
      'Tối đa 5 thành viên Workspace'
    ]
  },
  {
    id: 'enterprise',
    name: 'Topdoo Doanh Nghiệp (Enterprise)',
    price: '1.490.000đ/tháng',
    priceNumber: 1490000,
    monthlyCredits: 50000,
    features: [
      '50.000 AI Credits mỗi tháng',
      'Hạn mức API 10.000 yêu cầu / phút',
      'Định tuyến Model Private & SLAs 99.99%',
      'Cụm máy chủ chuyên dụng & hỗ trợ 24/7',
      'Không giới hạn thành viên Workspace'
    ]
  }
];

export const initialTransactions = [
  {
    id: 'tx-101',
    type: 'MONTHLY_ALLOWANCE',
    amount: 5000,
    description: 'Cấp hạn mức hàng tháng - Gói Pro',
    modelUsed: null,
    timestamp: 'Hôm nay, 00:00'
  },
  {
    id: 'tx-102',
    type: 'AI_PROMPT',
    amount: -15,
    description: 'Thực thi Prompt phân tích chiến lược',
    modelUsed: 'GPT-5 (Omni Thinking)',
    timestamp: '15 phút trước'
  },
  {
    id: 'tx-103',
    type: 'SECURITY_SCAN',
    amount: -5,
    description: 'Quét tự động tên miền metamask-claim-airdrop.xyz',
    modelUsed: null,
    timestamp: '45 phút trước'
  },
  {
    id: 'tx-104',
    type: 'AI_PROMPT',
    amount: -8,
    description: 'Truy vấn giải thuật suy luận logic',
    modelUsed: 'DeepSeek R1',
    timestamp: '2 giờ trước'
  }
];

export const processCreditDeduction = (currentBalance, currentTransactions, amount, type, description, modelUsed = null) => {
  const newBalance = Math.max(0, currentBalance - amount);
  const newTx = {
    id: `tx-${Date.now()}`,
    type,
    amount: -amount,
    description,
    modelUsed,
    timestamp: 'Vừa xong'
  };

  return {
    newBalance,
    newTransactions: [newTx, ...currentTransactions],
    success: currentBalance >= amount
  };
};

export const processCreditTopUp = (currentBalance, currentTransactions, amount, packageName = 'Nạp gói bổ sung') => {
  const newBalance = currentBalance + amount;
  const newTx = {
    id: `tx-${Date.now()}`,
    type: 'TOP_UP',
    amount: +amount,
    description: `Nạp thêm credit (${packageName})`,
    modelUsed: null,
    timestamp: 'Vừa xong'
  };

  return {
    newBalance,
    newTransactions: [newTx, ...currentTransactions]
  };
};
