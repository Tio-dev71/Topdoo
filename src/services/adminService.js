// TOPDOO ADMIN, APPEALS & SYSTEM SLO SERVICE (M12)

export const initialAppeals = [
  {
    id: 'APP-2026-0042',
    targetIdentifier: 'metamask-support-portal.info',
    requesterEmail: 'webmaster@metamask-support-portal.info',
    reason: 'Tên miền của chúng tôi là trang blog hướng dẫn người dùng sử dụng ví phi lợi nhuận, không thu thập private key hay có ý đồ lừa đảo.',
    evidenceUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600&q=80',
    status: 'PENDING',
    submittedAt: 'Hôm qua, 14:20',
    reviewedBy: null,
    reviewerNotes: null
  },
  {
    id: 'APP-2026-0038',
    targetIdentifier: 'airdrop-claim-community.io',
    requesterEmail: 'admin@airdrop-claim-community.io',
    reason: 'Đã gỡ bỏ liên kết quảng cáo bên thứ ba bị khiếu nại, xin kiểm tra lại hệ thống và gỡ nhãn cảnh báo đỏ.',
    evidenceUrl: null,
    status: 'REJECTED',
    submittedAt: '3 ngày trước',
    reviewedBy: 'Alex Vance (Lead SecOps)',
    reviewerNotes: 'Hợp đồng thông minh liên kết vẫn còn quyền truy cập cấp phép (allowance) trái phép; bác bỏ khiếu nại.'
  }
];

export const initialSloMetrics = [
  {
    id: 'slo-1',
    name: 'Topdoo AI Model Gateway',
    uptime: 99.98,
    targetUptime: 99.95,
    p95Latency: '420ms',
    errorRate: 0.012,
    status: 'HEALTHY'
  },
  {
    id: 'slo-2',
    name: 'Real-time Scam Database Query Engine',
    uptime: 99.99,
    targetUptime: 99.99,
    p95Latency: '48ms',
    errorRate: 0.004,
    status: 'HEALTHY'
  },
  {
    id: 'slo-3',
    name: 'Phishing URL & DOM Inspection Worker',
    uptime: 99.92,
    targetUptime: 99.90,
    p95Latency: '820ms',
    errorRate: 0.038,
    status: 'HEALTHY'
  },
  {
    id: 'slo-4',
    name: 'Developer Webhook & API Key Gateway',
    uptime: 100.0,
    targetUptime: 99.95,
    p95Latency: '65ms',
    errorRate: 0.001,
    status: 'HEALTHY'
  }
];

export const processAppealResolution = (appeals, appealId, decision, reviewerName, reviewerNotes) => {
  const isApproved = decision === 'approve';
  const newStatus = isApproved ? 'APPROVED' : 'REJECTED';

  return appeals.map(app => {
    if (app.id === appealId) {
      return {
        ...app,
        status: newStatus,
        reviewedBy: reviewerName || 'SecOps Admin',
        reviewerNotes: reviewerNotes || (isApproved ? 'Đã xem xét và chấp thuận gỡ nhãn cảnh báo.' : 'Không đủ căn cứ gỡ bỏ; nhãn cảnh báo được giữ nguyên.')
      };
    }
    return app;
  });
};
