import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Bắt đầu khởi tạo dữ liệu mẫu cho Topdoo Database...');

  // 1. Tạo Users với đầy đủ RBAC Roles
  console.log('👤 Đang tạo Users & Roles (RBAC)...');
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@topdoo.com' },
    update: {},
    create: {
      email: 'admin@topdoo.com',
      fullName: 'Topdoo SecOps SuperAdmin',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      role: 'ADMIN'
    }
  });

  const analystUser = await prisma.user.upsert({
    where: { email: 'analyst@topdoo.com' },
    update: {},
    create: {
      email: 'analyst@topdoo.com',
      fullName: 'Alex Vance (Lead SecOps Analyst)',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
      role: 'SECURITY_ANALYST'
    }
  });

  const devUser = await prisma.user.upsert({
    where: { email: 'dev@topdoo.com' },
    update: {},
    create: {
      email: 'dev@topdoo.com',
      fullName: 'David Tran (Senior Core Engineer)',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
      role: 'DEVELOPER'
    }
  });

  const standardUser = await prisma.user.upsert({
    where: { email: 'user@topdoo.com' },
    update: {},
    create: {
      email: 'user@topdoo.com',
      fullName: 'Nguyen Van A',
      avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
      role: 'USER'
    }
  });

  // 2. Tạo Workspace & Projects (M9)
  console.log('🏢 Đang tạo Workspace & Projects (M9)...');
  const mainWorkspace = await prisma.workspace.upsert({
    where: { slug: 'secops-lab' },
    update: {},
    create: {
      name: 'Topdoo Security SecOps Lab',
      slug: 'secops-lab',
      plan: 'PRO',
      ownerId: adminUser.id,
      members: {
        create: [
          { userId: adminUser.id, role: 'OWNER' },
          { userId: analystUser.id, role: 'SECURITY_ANALYST' },
          { userId: devUser.id, role: 'DEVELOPER' },
          { userId: standardUser.id, role: 'USER' }
        ]
      },
      projects: {
        create: [
          {
            name: 'Hệ Thống Chống Lừa Đảo Crypto 2026',
            description: 'Phát hiện & ngăn chặn sớm các hợp đồng Permit2 Drainer và ví rửa tiền',
            status: 'ACTIVE'
          },
          {
            name: 'Ngân Hàng & Ví Điện Tử Anti-Phishing',
            description: 'Giám sát các tên miền mạo danh SMS OTP và cổng thanh toán ngân hàng',
            status: 'ACTIVE'
          }
        ]
      }
    }
  });

  // 3. Tạo Threat Entities (M4, M5)
  console.log('🛡️ Đang nạp Threat Intelligence Entities (M4, M5)...');
  const entity1 = await prisma.threatEntity.upsert({
    where: { identifier: 'metamask-claim-airdrop.xyz' },
    update: {},
    create: {
      identifier: 'metamask-claim-airdrop.xyz',
      type: 'DOMAIN',
      name: 'MetaMask Claim Phishing Gateway',
      riskScore: 94,
      status: 'CONFIRMED_MALICIOUS',
      targetBrand: 'MetaMask',
      category: 'Crypto Phishing',
      country: 'RU',
      ip: '185.220.101.44',
      asn: 'AS200052 (BadHost Ltd)',
      registrar: 'NameCheap Privacy Protect',
      summary: 'Chiến dịch phishing Web3 nghiêm trọng mạo danh nhận thưởng token MetaMask. Tự động rút cạn tài sản ví qua Permit2.',
      reportsCount: 38,
      evidenceCount: 14,
      watchlist: true,
      riskFactors: {
        create: [
          { name: 'Report History', score: 32, maxScore: 35, status: 'Critical', desc: '38 báo cáo nạn nhân xác thực trong 72 giờ qua.' },
          { name: 'Phishing Indicators', score: 28, maxScore: 30, status: 'Critical', desc: 'Sử dụng logo MetaMask trái phép và kịch bản bắt phím gõ seed phrase.' },
          { name: 'Network Connections', score: 18, maxScore: 20, status: 'High', desc: 'Chung dải IP với 7 website rút cạn ví crypto khác.' },
          { name: 'Domain Reputation', score: 12, maxScore: 15, status: 'High', desc: 'Tên miền mới đăng ký dưới 7 ngày với WHOIS ẩn danh.' },
          { name: 'Evidence Quality', score: 4, maxScore: 5, status: 'Verified', desc: 'Giao dịch blockchain và HTTP dump đã được xác thực.' }
        ]
      }
    }
  });

  const entity2 = await prisma.threatEntity.upsert({
    where: { identifier: '0x71C8564E3b82928374dC8187e59b20755AA9B829' },
    update: {},
    create: {
      identifier: '0x71C8564E3b82928374dC8187e59b20755AA9B829',
      type: 'WALLET',
      name: 'Inferno Drainer Deposit Vault #4',
      riskScore: 98,
      status: 'SANCTIONED',
      targetBrand: 'Ethereum Ecosystem',
      category: 'Crypto Drainer',
      country: 'Global',
      summary: 'Ví nhận tiền của hợp đồng drainer tự động. Đã chuyển tài sản qua Tornado.Cash.',
      reportsCount: 52,
      evidenceCount: 26,
      watchlist: true,
      riskFactors: {
        create: [
          { name: 'Report History', score: 35, maxScore: 35, status: 'Critical', desc: '52 giao dịch trộm cắp tài sản với tổng số tiền hơn 450.000 USD.' },
          { name: 'Phishing Indicators', score: 25, maxScore: 30, status: 'Critical', desc: 'Khớp chữ ký bytecode hợp đồng Inferno Drainer.' }
        ]
      }
    }
  });

  const entity3 = await prisma.threatEntity.upsert({
    where: { identifier: 'chase-security-verify.net' },
    update: {},
    create: {
      identifier: 'chase-security-verify.net',
      type: 'DOMAIN',
      name: 'Chase Online Spoofing Gateway',
      riskScore: 92,
      status: 'CONFIRMED_MALICIOUS',
      targetBrand: 'Chase Bank',
      category: 'Banking Phishing',
      country: 'US',
      ip: '198.51.100.89',
      asn: 'AS16276 (OVH SAS)',
      registrar: 'Tucows Domains Inc.',
      summary: 'Trang web mạo danh ngân hàng Chase gửi qua SMS. Thu thập tên đăng nhập, mật khẩu và mã OTP 2FA trực tiếp.',
      reportsCount: 27,
      evidenceCount: 11,
      watchlist: true
    }
  });

  // 4. Tạo Scan Reports & Evidence Items (M4)
  console.log('📋 Đang tạo Báo cáo & Kho bằng chứng (Evidence Workspace)...');
  const report1 = await prisma.scanReport.upsert({
    where: { reportCode: 'REP-2026-8921' },
    update: {},
    create: {
      reportCode: 'REP-2026-8921',
      entityId: entity1.id,
      reporterId: standardUser.id,
      reporterName: 'Nguyen Van A',
      reporterEmail: 'user@topdoo.com',
      targetIdentifier: 'metamask-claim-airdrop.xyz',
      category: 'Crypto Phishing / Token Scam',
      description: 'Nhận được email giả mạo MetaMask thông báo airdrop token. Khi bấm vào liên kết, trang yêu cầu nhập 12 ký tự recovery phrase.',
      lossAmount: '$1,200 USD',
      status: 'VERIFIED',
      verifierId: analystUser.id,
      verificationNotes: 'Đã xác minh: Mã độc Javascript bắt keylogger và smart contract drainer hoạt động.',
      evidenceItems: {
        create: [
          {
            entityId: entity1.id,
            title: 'Ảnh chụp màn hình cổng đăng nhập lừa đảo',
            type: 'SCREENSHOT',
            contentUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80',
            hashSha256: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
            confidenceScore: 98,
            verified: true
          },
          {
            entityId: entity1.id,
            title: 'File HAR dump request gửi dữ liệu đến IP lạ',
            type: 'HTTP_DUMP',
            hashSha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
            confidenceScore: 95,
            verified: true
          }
        ]
      }
    }
  });

  const report2 = await prisma.scanReport.upsert({
    where: { reportCode: 'REP-2026-9044' },
    update: {},
    create: {
      reportCode: 'REP-2026-9044',
      entityId: entity3.id,
      reporterId: standardUser.id,
      reporterName: 'Tran Thi B',
      reporterEmail: 'b.tran@gmail.com',
      targetIdentifier: 'chase-security-verify.net',
      category: 'Banking Smishing',
      description: 'Tin nhắn SMS từ đầu số lạ thông báo tài khoản bị tạm khóa, yêu cầu click link để xác thực lại thông tin cá nhân.',
      status: 'UNDER_REVIEW',
      lossAmount: '$0',
      evidenceItems: {
        create: [
          {
            entityId: entity3.id,
            title: 'Ảnh chụp tin nhắn SMS lừa đảo',
            type: 'SCREENSHOT',
            contentUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?auto=format&fit=crop&w=600&q=80',
            hashSha256: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
            confidenceScore: 90,
            verified: false
          }
        ]
      }
    }
  });

  // 5. Tạo Watchlist Item
  await prisma.watchlistItem.upsert({
    where: {
      workspaceId_entityId: {
        workspaceId: mainWorkspace.id,
        entityId: entity1.id
      }
    },
    update: {},
    create: {
      workspaceId: mainWorkspace.id,
      entityId: entity1.id,
      alertThreshold: 80,
      notes: 'Theo dõi sát diễn biến chiến dịch Phishing MetaMask này'
    }
  });

  // 6. Tạo API Key (M6)
  await prisma.apiKey.upsert({
    where: { keyHash: 'topdoo_live_secops_prod_89a7f3e2b1c4' },
    update: {},
    create: {
      userId: devUser.id,
      name: 'SecOps Production API Key',
      keyHash: 'topdoo_live_secops_prod_89a7f3e2b1c4',
      prefix: 'topdoo_live_89a7...',
      environment: 'live',
      rateLimit: 5000
    }
  });

  console.log('✅ Khởi tạo dữ liệu thành công! 100% Entities, Reports, Evidence, Workspaces và RBAC Users đã sẵn sàng.');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi khi khởi tạo dữ liệu:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
