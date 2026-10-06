// TOPDOO WORKSPACE & PROJECT SERVICE (M9)

export const initialWorkspaces = [
  {
    id: 'ws-1',
    name: 'Topdoo Security SecOps Lab',
    slug: 'secops-lab',
    plan: 'PRO',
    owner: 'admin@topdoo.com',
    memberCount: 4,
    projects: [
      {
        id: 'proj-1',
        name: 'Hệ Thống Chống Lừa Đảo Crypto 2026',
        description: 'Phát hiện & ngăn chặn sớm các hợp đồng Permit2 Drainer và ví rửa tiền',
        status: 'ACTIVE',
        threatCount: 48,
        createdAt: '2026-08-01'
      },
      {
        id: 'proj-2',
        name: 'Ngân Hàng & Ví Điện Tử Anti-Phishing',
        description: 'Giám sát các tên miền mạo danh SMS OTP và cổng thanh toán ngân hàng',
        status: 'ACTIVE',
        threatCount: 32,
        createdAt: '2026-08-15'
      },
      {
        id: 'proj-3',
        name: 'E-commerce Brand Protection',
        description: 'Bảo vệ thương hiệu trước các trang bán hàng giả mạo ưu đãi giảm giá',
        status: 'PAUSED',
        threatCount: 15,
        createdAt: '2026-09-01'
      }
    ]
  },
  {
    id: 'ws-2',
    name: 'Tổ Chức Cá Nhân (Personal Workspace)',
    slug: 'personal-space',
    plan: 'FREE',
    owner: 'user@topdoo.com',
    memberCount: 1,
    projects: [
      {
        id: 'proj-4',
        name: 'Theo Dõi Cá Nhân',
        description: 'Danh sách các tên miền và ví tiền mã hóa nghi vấn cá nhân theo dõi',
        status: 'ACTIVE',
        threatCount: 4,
        createdAt: '2026-09-10'
      }
    ]
  }
];

export const createNewProject = (workspaceId, projectData) => {
  return {
    id: `proj-${Date.now()}`,
    name: projectData.name || 'Dự án Bảo mật Mới',
    description: projectData.description || 'Không có mô tả',
    status: 'ACTIVE',
    threatCount: 0,
    createdAt: new Date().toISOString().split('T')[0]
  };
};
