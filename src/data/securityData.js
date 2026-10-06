// TOPDOO SECURITY — Centralized Threat Intelligence Data Store
// Interconnected entities, reports, evidence, monitoring events, alerts, and network connections.

export const ENTITY_TYPES = {
  DOMAIN: 'domain',
  URL: 'url',
  WALLET: 'wallet',
  PHONE: 'phone',
  EMAIL: 'email',
  SOCIAL: 'social',
  COMPANY: 'company',
  PERSON: 'person'
};

export const RISK_LEVELS = {
  SAFE: { label: 'Safe', min: 0, max: 20, color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  LOW: { label: 'Low Risk', min: 21, max: 40, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)' },
  MODERATE: { label: 'Medium Risk', min: 41, max: 60, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
  HIGH: { label: 'High Risk', min: 61, max: 80, color: '#F97316', bg: 'rgba(249, 115, 22, 0.12)', border: 'rgba(249, 115, 22, 0.3)' },
  CRITICAL: { label: 'Critical / Scam', min: 81, max: 100, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)' }
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
    identifier: 'metamask-claim-airdrop.xyz',
    type: 'domain',
    name: 'MetaMask Claim Phishing Gateway',
    riskScore: 94,
    status: 'Confirmed Phishing / Malicious',
    targetBrand: 'MetaMask',
    category: 'Crypto Phishing',
    createdAt: '2026-08-14',
    lastSeen: '12 minutes ago',
    reportsCount: 38,
    evidenceCount: 14,
    watchlist: true,
    country: 'RU',
    ip: '185.220.101.44',
    asn: 'AS200052 (BadHost Ltd)',
    registrar: 'NameCheap Privacy Protect',
    ssl: 'Let\'s Encrypt (Issued 4 days ago)',
    domainAge: '6 days',
    redirectCount: 3,
    summary: 'High-severity Web3 phishing campaign mimicking MetaMask token redemption. Collects private keys and executes automated permit2 draining via smart contract.',
    riskFactors: [
      { name: 'Report History', score: 32, max: 35, status: 'Critical', desc: '38 verified community and analyst victim reports filed in the last 72h.' },
      { name: 'Phishing Indicators', score: 28, max: 30, status: 'Critical', desc: 'Direct brand logo spoofing, counterfeit login modal, keystroke logging script.' },
      { name: 'Network Connections', score: 18, max: 20, status: 'High', desc: 'Co-hosted with 7 known crypto drainers on same bulletproof subnet.' },
      { name: 'Domain Reputation', score: 12, max: 15, status: 'High', desc: 'Newly registered domain (< 7 days old) with hidden WHOIS identity.' },
      { name: 'Evidence Quality', score: 4, max: 5, status: 'Verified', desc: 'Cryptographic transaction proof and live HTTP request dumps confirmed.' }
    ],
    relatedEntityIds: ['ent-2', 'ent-3', 'ent-4'],
    dns: {
      a: ['185.220.101.44'],
      mx: ['mail.metamask-claim-airdrop.xyz'],
      ns: ['ns1.bulletproof-dns.is', 'ns2.bulletproof-dns.is'],
      txt: ['v=spf1 -all']
    }
  },
  {
    id: 'ent-2',
    identifier: '0x71C8564E3b82928374dC8187e59b20755AA9B829',
    type: 'wallet',
    name: 'Inferno Drainer Deposit Vault #4',
    riskScore: 98,
    status: 'Sanctioned / Malicious Contract',
    targetBrand: 'Ethereum Ecosystem',
    category: 'Crypto Drainer',
    createdAt: '2026-07-29',
    lastSeen: '3 minutes ago',
    reportsCount: 52,
    evidenceCount: 26,
    watchlist: true,
    country: 'Global',
    balance: '42.84 ETH ($148,200 USD)',
    txCount: '1,490',
    summary: 'Active smart-contract drainer receiver associated with automated permit2 allowance exploitation. Transferred illicit proceeds through Tornado.Cash relayers.',
    riskFactors: [
      { name: 'Report History', score: 35, max: 35, status: 'Critical', desc: '52 documented theft transactions totaling over $450k in drained assets.' },
      { name: 'Phishing Indicators', score: 25, max: 30, status: 'Critical', desc: 'Contract code matches known Inferno drainer bytecode signature.' },
      { name: 'Network Connections', score: 20, max: 20, status: 'Critical', desc: 'Direct inflows from metamask-claim-airdrop.xyz and 4 other landing pages.' },
      { name: 'Domain Reputation', score: 10, max: 15, status: 'Moderate', desc: 'Blockchain address flagged on Chainabuse and Etherscan.' },
      { name: 'Evidence Quality', score: 5, max: 5, status: 'Verified', desc: 'Deterministic blockchain transactions with immutable hash proofs.' }
    ],
    relatedEntityIds: ['ent-1', 'ent-3']
  },
  {
    id: 'ent-3',
    identifier: 't.me/metamask_support_desk_help',
    type: 'social',
    name: 'MetaMask Fake Support Desk',
    riskScore: 89,
    status: 'Social Engineering Impersonator',
    targetBrand: 'MetaMask Support',
    category: 'Impersonation Scam',
    createdAt: '2026-08-01',
    lastSeen: '1 hour ago',
    reportsCount: 19,
    evidenceCount: 8,
    watchlist: false,
    country: 'RU',
    summary: 'Telegram bot and user group impersonating official customer service reps. Distributes phishing links and requests seed phrases under pretense of ticket resolution.',
    riskFactors: [
      { name: 'Report History', score: 28, max: 35, status: 'High', desc: 'Multiple screenshots of deceptive chats soliciting recovery keys.' },
      { name: 'Phishing Indicators', score: 26, max: 30, status: 'High', desc: 'Using trademarked MetaMask fox logo and copied support scripts.' },
      { name: 'Network Connections', score: 17, max: 20, status: 'High', desc: 'Directly distributes metamask-claim-airdrop.xyz in DM replies.' },
      { name: 'Domain Reputation', score: 12, max: 15, status: 'High', desc: 'Unverified Telegram handle created within past 30 days.' },
      { name: 'Evidence Quality', score: 4, max: 5, status: 'Verified', desc: 'Full chat export and user session video captured.' }
    ],
    relatedEntityIds: ['ent-1', 'ent-2']
  },
  {
    id: 'ent-4',
    identifier: 'chase-security-verify.net',
    type: 'domain',
    name: 'Chase Online Spoofing Gateway',
    riskScore: 92,
    status: 'Active Credential Harvester',
    targetBrand: 'Chase Bank',
    category: 'Banking Phishing',
    createdAt: '2026-09-02',
    lastSeen: '25 minutes ago',
    reportsCount: 27,
    evidenceCount: 11,
    watchlist: true,
    country: 'US',
    ip: '198.51.100.89',
    asn: 'AS16276 (OVH SAS)',
    registrar: 'Tucows Domains Inc.',
    ssl: 'Sectigo Trial SSL',
    domainAge: '28 days',
    redirectCount: 2,
    summary: 'Deceptive banking portal targeting Chase customers with SMS phishing (smishing). Captures username, password, SSN, and real-time SMS 2FA tokens.',
    riskFactors: [
      { name: 'Report History', score: 30, max: 35, status: 'Critical', desc: '27 consumer reports verified with smishing message screenshots.' },
      { name: 'Phishing Indicators', score: 29, max: 30, status: 'Critical', desc: 'Identical CSS clone of Chase login page with live reverse-proxy OTP relay.' },
      { name: 'Network Connections', score: 16, max: 20, status: 'High', desc: 'Associated SMS gateway numbers linked to organized wire fraud cell.' },
      { name: 'Domain Reputation', score: 13, max: 15, status: 'High', desc: 'Domain name registered with typosquatting keywords.' },
      { name: 'Evidence Quality', score: 4, max: 5, status: 'Verified', desc: 'Full HAR network archive and intercepted phishing SMS logs.' }
    ],
    relatedEntityIds: ['ent-5', 'ent-6'],
    dns: {
      a: ['198.51.100.89'],
      mx: [],
      ns: ['ns1.chase-security-verify.net', 'ns2.chase-security-verify.net'],
      txt: []
    }
  },
  {
    id: 'ent-5',
    identifier: '+1 (800) 492-0199',
    type: 'phone',
    name: 'Chase Fraud Alert Impersonation IVR',
    riskScore: 86,
    status: 'Spoofed Caller ID / Smishing Sender',
    targetBrand: 'Chase Bank Alerts',
    category: 'Vishing / Smishing',
    createdAt: '2026-08-20',
    lastSeen: '40 minutes ago',
    reportsCount: 21,
    evidenceCount: 9,
    watchlist: true,
    country: 'US',
    carrier: 'Twilio / Bandwidth VOIP',
    summary: 'VOIP telephone line sending automated SMS alerts: "Unusual charge of $842.00 detected. Click chase-security-verify.net to secure account immediately."',
    riskFactors: [
      { name: 'Report History', score: 28, max: 35, status: 'High', desc: 'High volume of spam reports recorded on FCC and community databases.' },
      { name: 'Phishing Indicators', score: 26, max: 30, status: 'High', desc: 'Impersonates 1-800 Chase customer service fraud line.' },
      { name: 'Network Connections', score: 18, max: 20, status: 'High', desc: 'Directly paired with chase-security-verify.net in automated SMS.' },
      { name: 'Domain Reputation', score: 10, max: 15, status: 'Moderate', desc: 'Disposable VOIP number leased via prepaid API account.' },
      { name: 'Evidence Quality', score: 4, max: 5, status: 'Verified', desc: 'Audio recording of fake interactive voice response (IVR) system.' }
    ],
    relatedEntityIds: ['ent-4']
  },
  {
    id: 'ent-6',
    identifier: 'apex-capital-investments.ltd',
    type: 'domain',
    name: 'Apex Capital High-Yield Forex Ponzi',
    riskScore: 81,
    status: 'Unlicensed Investment Fraud',
    targetBrand: 'Fake Financial Institution',
    category: 'Investment Scam',
    createdAt: '2026-05-10',
    lastSeen: '2 hours ago',
    reportsCount: 44,
    evidenceCount: 18,
    watchlist: false,
    country: 'GB',
    ip: '104.21.72.191',
    asn: 'AS13335 (Cloudflare)',
    registrar: 'NameSilo LLC',
    ssl: 'Cloudflare Universal SSL',
    domainAge: '143 days',
    summary: 'Sophisticated boiler-room investment platform promising 4.8% daily returns. Refuses withdrawals and demands additional "liquidity fees" and "tax releases".',
    riskFactors: [
      { name: 'Report History', score: 31, max: 35, status: 'Critical', desc: '44 victims report refusal of capital returns exceeding $1.2M.' },
      { name: 'Phishing Indicators', score: 19, max: 30, status: 'Moderate', desc: 'Uses fake UK Companies House registration certificate and stock photos.' },
      { name: 'Network Connections', score: 16, max: 20, status: 'High', desc: 'Shares payment gateway with 3 previously shuttered scam rings.' },
      { name: 'Domain Reputation', score: 11, max: 15, status: 'Moderate', desc: 'Blacklisted by UK FCA and French AMF warning lists.' },
      { name: 'Evidence Quality', score: 4, max: 5, status: 'Verified', desc: 'Bank wire receipts, contract PDFs, and WhatsApp threat transcripts.' }
    ],
    relatedEntityIds: ['ent-7', 'ent-8']
  },
  {
    id: 'ent-7',
    identifier: 'invest@apex-capital.group',
    type: 'email',
    name: 'Apex Capital Lead Recruiting Email',
    riskScore: 78,
    status: 'Scam Outreach Address',
    targetBrand: 'Apex Capital Investments',
    category: 'Cold Outreach Scam',
    createdAt: '2026-06-12',
    lastSeen: '5 hours ago',
    reportsCount: 16,
    evidenceCount: 7,
    watchlist: false,
    country: 'GB',
    summary: 'Email handle sending unsolicited investment pitches and fake trading statements to high-net-worth individuals on LinkedIn.',
    riskFactors: [
      { name: 'Report History', score: 25, max: 35, status: 'High', desc: 'Multiple spam reports and fraud complaints with corporate security teams.' },
      { name: 'Phishing Indicators', score: 20, max: 30, status: 'Moderate', desc: 'Forged sender headers and deceptive ROI projections.' },
      { name: 'Network Connections', score: 18, max: 20, status: 'High', desc: 'Primary contact listed on apex-capital-investments.ltd.' },
      { name: 'Domain Reputation', score: 11, max: 15, status: 'Moderate', desc: 'Failing DMARC alignment on custom mail domain.' },
      { name: 'Evidence Quality', score: 4, max: 5, status: 'Verified', desc: 'Raw RFC822 email headers and attached fake prospectus.' }
    ],
    relatedEntityIds: ['ent-6', 'ent-8']
  },
  {
    id: 'ent-8',
    identifier: 'Apex Wealth Holdings Ltd',
    type: 'company',
    name: 'Apex Wealth Holdings (Shell Entity)',
    riskScore: 75,
    status: 'Dissolved Shell Corporation',
    targetBrand: 'Fabricated UK Entity',
    category: 'Corporate Impersonation',
    createdAt: '2026-05-01',
    lastSeen: '1 day ago',
    reportsCount: 12,
    evidenceCount: 6,
    watchlist: false,
    country: 'GB',
    summary: 'Stolen company identity using registered address of an accountant in London. Disavowed by legitimate business owner.',
    riskFactors: [
      { name: 'Report History', score: 22, max: 35, status: 'Moderate', desc: 'Multiple formal fraud notices submitted to UK Action Fraud.' },
      { name: 'Phishing Indicators', score: 18, max: 30, status: 'Moderate', desc: 'Fraudulent incorporation filings and hijacked director names.' },
      { name: 'Network Connections', score: 20, max: 20, status: 'Critical', desc: 'Legal umbrella entity claimed by apex-capital-investments.ltd.' },
      { name: 'Domain Reputation', score: 11, max: 15, status: 'Moderate', desc: 'Non-compliant statutory reporting status.' },
      { name: 'Evidence Quality', score: 4, max: 5, status: 'Verified', desc: 'UK Companies House filings and identity theft affidavit.' }
    ],
    relatedEntityIds: ['ent-6', 'ent-7']
  },
  {
    id: 'ent-9',
    identifier: 'luxury-clearance-outlet.shop',
    type: 'domain',
    name: 'Counterfeit Luxury Storefront',
    riskScore: 68,
    status: 'Non-Delivery Marketplace Scam',
    targetBrand: 'Gucci / Prada / Nike',
    category: 'E-commerce Fraud',
    createdAt: '2026-09-11',
    lastSeen: '3 hours ago',
    reportsCount: 18,
    evidenceCount: 8,
    watchlist: false,
    country: 'CN',
    ip: '103.145.12.8',
    asn: 'AS136188 (HongKong Server Co)',
    registrar: 'Alibaba Cloud Computing',
    ssl: 'Free Let\'s Encrypt SSL',
    domainAge: '19 days',
    summary: 'Social media sponsored-ad scam store offering 90% discount on luxury designer goods. Collects credit card payments and either ships cheap counterfeit trinkets or nothing.',
    riskFactors: [
      { name: 'Report History', score: 26, max: 35, status: 'High', desc: '18 buyer dispute claims filed with credit card chargeback processors.' },
      { name: 'Phishing Indicators', score: 20, max: 30, status: 'Moderate', desc: 'Stolen brand imagery and fake customer reviews with AI-generated avatars.' },
      { name: 'Network Connections', score: 12, max: 20, status: 'Moderate', desc: 'Hosted on known affiliate scam server cluster.' },
      { name: 'Domain Reputation', score: 8, max: 15, status: 'Low', desc: 'Unregistered merchant entity with fabricated physical address in London.' },
      { name: 'Evidence Quality', score: 2, max: 5, status: 'Partially Verified', desc: 'Chargeback confirmation and social media ad links.' }
    ],
    relatedEntityIds: ['ent-10']
  },
  {
    id: 'ent-10',
    identifier: 'support@luxury-outlet-service.cc',
    type: 'email',
    name: 'Clearance Storefront Helpdesk (Automated Bot)',
    riskScore: 63,
    status: 'Disposable Support Inbox',
    targetBrand: 'Fake Merchant Support',
    category: 'E-commerce Fraud',
    createdAt: '2026-09-12',
    lastSeen: '8 hours ago',
    reportsCount: 9,
    evidenceCount: 3,
    watchlist: false,
    country: 'CN',
    summary: 'Automated email bot stalling customers requesting refunds by providing fake DHL tracking numbers from non-existent freight forwarders.',
    riskFactors: [
      { name: 'Report History', score: 20, max: 35, status: 'Moderate', desc: 'Reported by consumers for sending counterfeit tracking links.' },
      { name: 'Phishing Indicators', score: 18, max: 30, status: 'Moderate', desc: 'Canned AI stall tactics.' },
      { name: 'Network Connections', score: 14, max: 20, status: 'Moderate', desc: 'Attached to luxury-clearance-outlet.shop payment forms.' },
      { name: 'Domain Reputation', score: 8, max: 15, status: 'Low', desc: 'Recently registered .cc top level domain.' },
      { name: 'Evidence Quality', score: 3, max: 5, status: 'Partially Verified', desc: 'Email bounce logs and delivery deception transcripts.' }
    ],
    relatedEntityIds: ['ent-9']
  },
  {
    id: 'ent-11',
    identifier: 'topdoo.com',
    type: 'domain',
    name: 'TOPDOO Security Official Network',
    riskScore: 2,
    status: 'Verified Official Platform',
    targetBrand: 'TOPDOO Security',
    category: 'Cybersecurity Infrastructure',
    createdAt: '2024-01-15',
    lastSeen: 'Just now',
    reportsCount: 0,
    evidenceCount: 12,
    watchlist: false,
    country: 'US',
    ip: '104.18.28.14',
    asn: 'AS13335 (Cloudflare)',
    registrar: 'MarkMonitor Inc.',
    ssl: 'DigiCert EV Extended Validation TLS (Valid through 2027)',
    domainAge: '988 days',
    summary: 'Official primary production infrastructure for TOPDOO Security threat intelligence, verification nodes, and API clusters.',
    riskFactors: [
      { name: 'Report History', score: 0, max: 35, status: 'Clean', desc: 'Zero reports across all global telemetry and threat databases.' },
      { name: 'Phishing Indicators', score: 0, max: 30, status: 'Clean', desc: 'Full DNSSEC enforcement, strict CAA records, EV TLS certificate.' },
      { name: 'Network Connections', score: 1, max: 20, status: 'Clean', desc: 'Connected only to verified enterprise cloud security partners.' },
      { name: 'Domain Reputation', score: 1, max: 15, status: 'Clean', desc: 'Established enterprise domain with impeccable historical standing.' },
      { name: 'Evidence Quality', score: 0, max: 5, status: 'Clean', desc: 'Certified organization ownership and audited infrastructure.' }
    ],
    relatedEntityIds: [],
    dns: {
      a: ['104.18.28.14', '104.18.29.14'],
      mx: ['aspmx.l.google.com', 'alt1.aspmx.l.google.com'],
      ns: ['ns1.topdoo.com', 'ns2.topdoo.com'],
      txt: ['v=spf1 include:_spf.google.com ~all', 'topdoo-site-verification=2026-auth-09']
    }
  },
  {
    id: 'ent-12',
    identifier: 'apple.com',
    type: 'domain',
    name: 'Apple Inc. Official Domain',
    riskScore: 1,
    status: 'Verified Official Corporate',
    targetBrand: 'Apple Inc.',
    category: 'Technology',
    createdAt: '1987-02-19',
    lastSeen: '1 minute ago',
    reportsCount: 0,
    evidenceCount: 45,
    watchlist: false,
    country: 'US',
    ip: '17.253.144.10',
    asn: 'AS714 (Apple Inc.)',
    registrar: 'CSC Corporate Domains',
    ssl: 'Apple Public EV TLS',
    domainAge: '14,468 days',
    summary: 'Verified authentic corporate domain for Apple Inc. Fully hardened security headers and authoritative DNS.',
    riskFactors: [
      { name: 'Report History', score: 0, max: 35, status: 'Clean', desc: 'No malicious activity.' },
      { name: 'Phishing Indicators', score: 0, max: 30, status: 'Clean', desc: 'Authoritative origin.' },
      { name: 'Network Connections', score: 1, max: 20, status: 'Clean', desc: 'Autonomous system owned and operated directly by Apple.' },
      { name: 'Domain Reputation', score: 0, max: 15, status: 'Clean', desc: 'Top tier global trust score.' },
      { name: 'Evidence Quality', score: 0, max: 5, status: 'Clean', desc: 'Verified trademark registry.' }
    ],
    relatedEntityIds: []
  }
];

export const initialReports = [
  {
    id: 'REP-2026-8921',
    entityId: 'ent-1',
    entityIdentifier: 'metamask-claim-airdrop.xyz',
    entityType: 'domain',
    category: 'Crypto Phishing',
    riskLevel: 'Critical',
    riskScore: 94,
    status: 'Verified',
    submittedBy: 'alex.v@security-labs.io',
    createdAt: '2026-09-29 14:22:10 UTC',
    lossReported: '$14,200 USD',
    title: 'Automated permit2 drainer targeting MetaMask users via fake token claim site',
    description: 'Received a sponsored DM link claiming urgent token governance claim before epoch end. Landing page mimics official MetaMask dashboard, requests wallet connection via WalletConnect, and invokes an unlimited permit2 allowance on USDT & WETH balances before transferring funds to drainer contract 0x71C...b829.',
    evidenceIds: ['evi-1', 'evi-2', 'evi-3'],
    reviewer: 'Marcus Sterling (Senior Threat Intel Analyst)',
    reviewedAt: '2026-09-29 15:45:00 UTC',
    reviewerNotes: 'Verified against Etherscan transaction logs. Malicious permit signature confirmed. Phishing indicators validated.',
    timeline: [
      { date: '2026-09-29 14:22', event: 'Report submitted by Community Investigator' },
      { date: '2026-09-29 14:35', event: 'Automated crawler analyzed DOM and extracted draining payload' },
      { date: '2026-09-29 15:10', event: 'Senior Analyst assigned to verification queue' },
      { date: '2026-09-29 15:45', event: 'Report status elevated to VERIFIED; entity risk adjusted to 94' }
    ]
  },
  {
    id: 'REP-2026-8919',
    entityId: 'ent-4',
    entityIdentifier: 'chase-security-verify.net',
    entityType: 'domain',
    category: 'Banking Phishing',
    riskLevel: 'Critical',
    riskScore: 92,
    status: 'Verified',
    submittedBy: 'fraud-ops@fintech-watch.org',
    createdAt: '2026-09-28 09:15:44 UTC',
    lossReported: '$4,800 USD',
    title: 'Credential harvester with active reverse proxy for live SMS 2FA interception',
    description: 'Victim received SMS from +1 (800) 492-0199 claiming unauthorized debit card transaction. Link directs to chase-security-verify.net which uses Evilginx2 style proxying to capture login credentials and session cookies in real-time.',
    evidenceIds: ['evi-4', 'evi-5'],
    reviewer: 'Elena Rostova (Lead Security Researcher)',
    reviewedAt: '2026-09-28 10:30:12 UTC',
    reviewerNotes: 'Confirmed live interception proxy. Target IP 198.51.100.89 reported to OVH abuse desk.',
    timeline: [
      { date: '2026-09-28 09:15', event: 'Report submitted with SMS screenshot and full HAR log' },
      { date: '2026-09-28 09:40', event: 'Sandbox environment triggered credential verification check' },
      { date: '2026-09-28 10:30', event: 'Verified and syndicated to global DNS blocklists' }
    ]
  },
  {
    id: 'REP-2026-8915',
    entityId: 'ent-6',
    entityIdentifier: 'apex-capital-investments.ltd',
    entityType: 'domain',
    category: 'Investment Scam',
    riskLevel: 'High',
    riskScore: 81,
    status: 'Verified',
    submittedBy: 'david.miller@investor-defense.co.uk',
    createdAt: '2026-09-26 18:02:30 UTC',
    lossReported: '£65,000 GBP',
    title: 'High-yield Forex trading platform refusing capital redemption and demanding tax fees',
    description: 'Invested £65,000 over 3 months after being coached by account managers on WhatsApp. When requesting withdrawal, was told accounts are locked until a 15% statutory UK tax release deposit is wired.',
    evidenceIds: ['evi-6', 'evi-7'],
    reviewer: 'James Chen (Investigative Analyst)',
    reviewedAt: '2026-09-27 11:20:00 UTC',
    reviewerNotes: 'UK FCA warning cross-referenced. Bank accounts used for wire transfers mapped to known money-mule networks.',
    timeline: [
      { date: '2026-09-26 18:02', event: 'Victim complaint received with wire receipts' },
      { date: '2026-09-27 11:20', event: 'Verified as Ponzi scheme and added to High Risk Investment register' }
    ]
  },
  {
    id: 'REP-2026-8910',
    entityId: 'ent-9',
    entityIdentifier: 'luxury-clearance-outlet.shop',
    entityType: 'domain',
    category: 'E-commerce Fraud',
    riskLevel: 'High',
    riskScore: 68,
    status: 'Under Review',
    submittedBy: 'sarah.k@gmail.com',
    createdAt: '2026-09-25 11:40:15 UTC',
    lossReported: '$210 USD',
    title: 'Deceptive Facebook ad store for designer sneakers, shipped plastic sunglasses',
    description: 'Ordered two pairs of limited sneakers after seeing a sponsored ad. Paid via credit card. Received a small parcel from a Chinese freight forwarder with generic plastic sunglasses. Merchant email provides bot responses.',
    evidenceIds: ['evi-8'],
    reviewer: 'Pending Reviewer Assignment',
    reviewedAt: null,
    reviewerNotes: 'Awaiting merchant chargeback records from acquiring bank.',
    timeline: [
      { date: '2026-09-25 11:40', event: 'Report filed by consumer' },
      { date: '2026-09-25 11:42', event: 'Automated crawler flagged domain age < 30 days and mismatched categories' }
    ]
  },
  {
    id: 'REP-2026-8894',
    entityId: 'ent-5',
    entityIdentifier: '+1 (800) 492-0199',
    entityType: 'phone',
    category: 'Vishing / Smishing',
    riskLevel: 'High',
    riskScore: 86,
    status: 'Verified',
    submittedBy: 'telecom-fraud-monitor@net.org',
    createdAt: '2026-09-24 16:30:00 UTC',
    lossReported: 'N/A (Prevented)',
    title: 'Automated robocalling server spoofing Chase card fraud division',
    description: 'Carrier honeypot intercepted 1,400+ outbound automated calls directing consumers to dial back or follow phishing URLs to clear fraudulent hold.',
    evidenceIds: ['evi-9'],
    reviewer: 'Elena Rostova (Lead Security Researcher)',
    reviewedAt: '2026-09-24 17:15:00 UTC',
    reviewerNotes: 'Twilio sub-account identified and reported for immediate upstream termination.',
    timeline: [
      { date: '2026-09-24 16:30', event: 'Honeypot telemetry uploaded' },
      { date: '2026-09-24 17:15', event: 'Verified and carrier abuse notification dispatched' }
    ]
  }
];

export const initialEvidence = [
  {
    id: 'evi-1',
    title: 'MetaMask Phishing DOM Keystroke Logger Payload',
    type: 'Code Script / Dump',
    entityId: 'ent-1',
    entityIdentifier: 'metamask-claim-airdrop.xyz',
    source: 'Headless Chromium Sandbox Telemetry',
    submittedBy: 'System Automated Scanner',
    timestamp: '2026-09-29 14:35:12 UTC',
    verificationStatus: 'Verified',
    hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    size: '142 KB',
    description: 'Extracted JavaScript obfuscated file (claim-bundle.min.js) containing keylogger hooking mnemonic passphrase inputs and triggering Web3 permit approval to contract 0x71C...b829.',
    metadata: {
      serverIp: '185.220.101.44',
      tlsCipher: 'TLS_AES_128_GCM_SHA256',
      httpStatus: 200,
      mimeType: 'application/javascript'
    }
  },
  {
    id: 'evi-2',
    title: 'Ethereum Mainnet Drain Transaction TxHash Proof',
    type: 'Transaction Hash',
    entityId: 'ent-2',
    entityIdentifier: '0x71C8564E3b82928374dC8187e59b20755AA9B829',
    source: 'Etherscan On-chain Ledger',
    submittedBy: 'alex.v@security-labs.io',
    timestamp: '2026-09-29 14:40:02 UTC',
    verificationStatus: 'Verified',
    hash: '0x9a8f273b4010b99818817742cf6f71d5b4a9235e128919f972b94429891001a4',
    size: '2.4 KB',
    description: 'Victim wallet drained of 4.2 WETH ($14,700) using permit transferFrom method invoked by the malicious contract.',
    metadata: {
      blockNumber: '20,841,920',
      gasUsed: '84,120',
      valueTransferred: '4.2 WETH',
      recipient: '0x71C8564E3b82928374dC8187e59b20755AA9B829'
    }
  },
  {
    id: 'evi-3',
    title: 'Telegram Deceptive DM Conversation Screenshot',
    type: 'Screenshot Image',
    entityId: 'ent-3',
    entityIdentifier: 't.me/metamask_support_desk_help',
    source: 'Victim Submission',
    submittedBy: 'victim_support_09@proton.me',
    timestamp: '2026-09-29 13:50:20 UTC',
    verificationStatus: 'Verified',
    hash: '7c4a8d09ca3762af61e59520943dc26494f8941b',
    size: '840 KB',
    description: 'High-resolution screenshot displaying scammer claiming to be official tier 2 MetaMask technical support urging user to visit the claim domain to unlock frozen rewards.',
    metadata: {
      imageResolution: '1170x2532',
      exifStripped: true,
      senderUser: '@metamask_support_desk_help'
    }
  },
  {
    id: 'evi-4',
    title: 'Chase Phishing Smishing SMS Text Intercept',
    type: 'SMS Payload Record',
    entityId: 'ent-5',
    entityIdentifier: '+1 (800) 492-0199',
    source: 'Mobile Carrier Anti-Spam Gate',
    submittedBy: 'fraud-ops@fintech-watch.org',
    timestamp: '2026-09-28 08:50:11 UTC',
    verificationStatus: 'Verified',
    hash: '4d8a1f9e2b0c3d4e5f6a7b8c9d0e1f2a3b4c5d6e',
    size: '12 KB',
    description: 'Text body: "[CHASE ALERT] Unauthorized charge of $842.19 at Walmart Store. If this was NOT you, immediately review at: https://chase-security-verify.net/auth"',
    metadata: {
      originatingNumber: '+18004920199',
      carrierNetwork: 'Twilio Gateway',
      deliveryStatus: 'Delivered'
    }
  },
  {
    id: 'evi-5',
    title: 'Live HTTP Archive (HAR) Reverse Proxy Session Capture',
    type: 'Network HAR File',
    entityId: 'ent-4',
    entityIdentifier: 'chase-security-verify.net',
    source: 'Investigator Browser Debug Session',
    submittedBy: 'Elena Rostova',
    timestamp: '2026-09-28 09:30:45 UTC',
    verificationStatus: 'Verified',
    hash: '91f0a2c3b4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
    size: '1.8 MB',
    description: 'Complete network request and response headers demonstrating active session cookie relaying through Evilginx reverse proxy setup on port 443.',
    metadata: {
      requestsLogged: 64,
      interceptedHeaders: ['Set-Cookie', 'Authorization', 'X-Auth-Token'],
      ipOrigin: '198.51.100.89'
    }
  },
  {
    id: 'evi-6',
    title: 'Apex Capital Bank Wire Transfer Instruction PDF',
    type: 'Document / PDF',
    entityId: 'ent-6',
    entityIdentifier: 'apex-capital-investments.ltd',
    source: 'Victim Banking Documentation',
    submittedBy: 'david.miller@investor-defense.co.uk',
    timestamp: '2026-09-26 17:30:10 UTC',
    verificationStatus: 'Verified',
    hash: '3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e',
    size: '420 KB',
    description: 'Counterfeit company letterhead with fake FCA authorization number directing investors to wire funds to an offshore bank account in Belize.',
    metadata: {
      fcaNumberClaimed: 'FCA-892100 (Belongs to a defunct firm)',
      ibanSpecified: 'BZ44BKBL000100293849182',
      beneficiary: 'Apex Offshore Management Ltd'
    }
  },
  {
    id: 'evi-7',
    title: 'UK Companies House Disavowal Statement',
    type: 'Legal Affidavit',
    entityId: 'ent-8',
    entityIdentifier: 'Apex Wealth Holdings Ltd',
    source: 'UK Companies House Registry',
    submittedBy: 'James Chen',
    timestamp: '2026-09-27 10:15:00 UTC',
    verificationStatus: 'Verified',
    hash: '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9012',
    size: '95 KB',
    description: 'Sworn affidavit from legitimate London solicitor confirming that their registered address was fraudulently hijacked on web portals by Apex scammers.',
    metadata: {
      registryReference: 'UK-CH-DISAVOW-2026',
      courtFiling: 'Central London Civil Justice Centre'
    }
  },
  {
    id: 'evi-8',
    title: 'Fake Tracking Code & Package Photo Evidence',
    type: 'Image & Tracking Log',
    entityId: 'ent-9',
    entityIdentifier: 'luxury-clearance-outlet.shop',
    source: 'Consumer Complaint',
    submittedBy: 'sarah.k@gmail.com',
    timestamp: '2026-09-25 11:22:00 UTC',
    verificationStatus: 'Under Review',
    hash: '5e6f7a8b9c0d1e2f3a4b5c6d7e8f90121a2b3c4d',
    size: '1.2 MB',
    description: 'Photo of delivered parcel weighing 80 grams with cheap plastic toy sunglasses instead of $210 designer footwear ordered.',
    metadata: {
      trackingNumber: 'CN892182019HK',
      customsValueDeclared: '$2.00 USD'
    }
  }
];

export const initialAlerts = [
  {
    id: 'ALT-1092',
    severity: 'Critical',
    title: 'Surge in Phishing Redirects to MetaMask Drainer Cluster',
    entityId: 'ent-1',
    entityIdentifier: 'metamask-claim-airdrop.xyz',
    entityType: 'domain',
    reason: 'Risk score elevated from 76 to 94 following 14 new confirmed victim reports in past 60 minutes.',
    timestamp: '14 minutes ago',
    status: 'Unresolved',
    category: 'Threat Escalation',
    details: 'Automated threat heuristics detected a 320% traffic surge across 4 affiliated Telegram seed groups. Smart contract allowance draining is actively executing.'
  },
  {
    id: 'ALT-1088',
    severity: 'Critical',
    title: 'New Smishing Campaign Active for Chase Banking Impersonation',
    entityId: 'ent-4',
    entityIdentifier: 'chase-security-verify.net',
    entityType: 'domain',
    reason: 'New VOIP sender (+1 800 492-0199) linked directly to credential harvesting proxy endpoint.',
    timestamp: '42 minutes ago',
    status: 'Unresolved',
    category: 'Brand Abuse',
    details: 'Reverse proxy Evilginx deployment detected. Live two-factor auth interception confirmed by automated sandbox test accounts.'
  },
  {
    id: 'ALT-1074',
    severity: 'High',
    title: 'Watchlist Entity Balance Transferred to Tornado.Cash',
    entityId: 'ent-2',
    entityIdentifier: '0x71C8564E3b82928374dC8187e59b20755AA9B829',
    entityType: 'wallet',
    reason: 'Outflow of 28.5 ETH moved through sanctioned relayer network.',
    timestamp: '2 hours ago',
    status: 'Resolved',
    category: 'Asset Movement',
    details: 'Contract triggered multi-hop split transaction to obfuscate illicit drainer proceeds. Monitored wallet flagged on Chainabuse.'
  },
  {
    id: 'ALT-1065',
    severity: 'Medium',
    title: 'DNS Record Mutation Detected on Monitored Domain',
    entityId: 'ent-6',
    entityIdentifier: 'apex-capital-investments.ltd',
    entityType: 'domain',
    reason: 'Name servers changed from Cloudflare to bulletproof provider in Iceland.',
    timestamp: '6 hours ago',
    status: 'Resolved',
    category: 'Infrastructure Change',
    details: 'Scam operators migrated host to avoid Cloudflare trust & safety domain suspension.'
  },
  {
    id: 'ALT-1049',
    severity: 'Informational',
    title: 'Global Scam Database Sync Completed',
    entityId: 'ent-11',
    entityIdentifier: 'topdoo.com',
    entityType: 'domain',
    reason: '42,190 external threat feeds synchronized with local TOPDOO database.',
    timestamp: '12 hours ago',
    status: 'Resolved',
    category: 'System',
    details: 'Feed ingestion completed with 100% integrity validation across 14 global partner feeds.'
  }
];

export const initialMonitoringEvents = [
  {
    id: 'MON-904',
    timestamp: '3 minutes ago',
    entityId: 'ent-2',
    entityIdentifier: '0x71C8564E3b82928374dC8187e59b20755AA9B829',
    entityType: 'wallet',
    event: 'New Inbound Transaction Detected',
    change: '+$14,200 WETH drained from new victim',
    severity: 'Critical',
    rule: 'Wallet Outflow/Inflow > 1 ETH'
  },
  {
    id: 'MON-903',
    timestamp: '14 minutes ago',
    entityId: 'ent-1',
    entityIdentifier: 'metamask-claim-airdrop.xyz',
    entityType: 'domain',
    event: 'Risk Score Elevated',
    change: 'Score increased: 76 → 94',
    severity: 'Critical',
    rule: 'Risk Score Delta > 10 pts'
  },
  {
    id: 'MON-902',
    timestamp: '42 minutes ago',
    entityId: 'ent-4',
    entityIdentifier: 'chase-security-verify.net',
    entityType: 'domain',
    event: 'New Related Entity Connected',
    change: 'Linked to VOIP Phone +1 (800) 492-0199',
    severity: 'High',
    rule: 'Scam Network Cluster Expansion'
  },
  {
    id: 'MON-901',
    timestamp: '1 hour ago',
    entityId: 'ent-3',
    entityIdentifier: 't.me/metamask_support_desk_help',
    entityType: 'social',
    event: 'New Community Report Filed',
    change: 'Report #REP-2026-8921 verified by Senior Analyst',
    severity: 'High',
    rule: 'Verified Report Received'
  },
  {
    id: 'MON-900',
    timestamp: '3 hours ago',
    entityId: 'ent-9',
    entityIdentifier: 'luxury-clearance-outlet.shop',
    entityType: 'domain',
    event: 'SSL Certificate Renewal Observed',
    change: 'Issued Let\'s Encrypt 90-day certificate',
    severity: 'Medium',
    rule: 'SSL / TLS Certificate State Change'
  },
  {
    id: 'MON-899',
    timestamp: '6 hours ago',
    entityId: 'ent-6',
    entityIdentifier: 'apex-capital-investments.ltd',
    entityType: 'domain',
    event: 'DNS Name Server Changed',
    change: 'Nameservers migrated to bulletproof-dns.is',
    severity: 'Medium',
    rule: 'DNS Nameserver Mutation'
  }
];

export const initialNetwork = {
  nodes: [
    { id: 'ent-1', label: 'metamask-claim-airdrop.xyz', type: 'domain', riskScore: 94, category: 'Phishing Host' },
    { id: 'ent-2', label: '0x71C...B829', type: 'wallet', riskScore: 98, category: 'Drainer Contract' },
    { id: 'ent-3', label: '@metamask_support_desk_help', type: 'social', riskScore: 89, category: 'Social Engineering' },
    { id: 'ent-4', label: 'chase-security-verify.net', type: 'domain', riskScore: 92, category: 'Banking Phishing' },
    { id: 'ent-5', label: '+1 (800) 492-0199', type: 'phone', riskScore: 86, category: 'Smishing Caller' },
    { id: 'ent-6', label: 'apex-capital-investments.ltd', type: 'domain', riskScore: 81, category: 'Ponzi Investment' },
    { id: 'ent-7', label: 'invest@apex-capital.group', type: 'email', riskScore: 78, category: 'Scam Email' },
    { id: 'ent-8', label: 'Apex Wealth Holdings Ltd', type: 'company', riskScore: 75, category: 'Shell Corporation' },
    { id: 'ent-9', label: 'luxury-clearance-outlet.shop', type: 'domain', riskScore: 68, category: 'Fake Storefront' },
    { id: 'ent-10', label: 'support@luxury-outlet-service.cc', type: 'email', riskScore: 63, category: 'Scam Support' },
    { id: 'ent-11', label: 'topdoo.com', type: 'domain', riskScore: 2, category: 'Verified Platform' },
    { id: 'node-srv-1', label: '185.220.101.44 (Bulletproof Host)', type: 'server', riskScore: 91, category: 'Hosting Infrastructure' }
  ],
  edges: [
    { source: 'ent-1', target: 'ent-2', relation: 'Transfers Drained Assets To' },
    { source: 'ent-3', target: 'ent-1', relation: 'Distributes Phishing Link' },
    { source: 'ent-1', target: 'node-srv-1', relation: 'Hosted On' },
    { source: 'ent-4', target: 'ent-5', relation: 'Paired in SMS Alerts' },
    { source: 'ent-6', target: 'ent-7', relation: 'Contact Email' },
    { source: 'ent-6', target: 'ent-8', relation: 'Claims Incorporation' },
    { source: 'ent-9', target: 'ent-10', relation: 'Support Channel' },
    { source: 'ent-4', target: 'node-srv-1', relation: 'Shares Co-located Subnet' }
  ]
};

export const initialWatchlistRules = [
  { id: 'rule-1', name: 'Risk Score Spike Threshold', trigger: 'Risk score increases by >= 10 points', enabled: true },
  { id: 'rule-2', name: 'New Verified Reports', trigger: 'Any report marked as Verified by tier 2 analysts', enabled: true },
  { id: 'rule-3', name: 'Network Cluster Expansion', trigger: 'New wallet, domain or phone connected in network graph', enabled: true },
  { id: 'rule-4', name: 'Phishing Brand Spoof Detection', trigger: 'Automated crawler identifies logo impersonation', enabled: true },
  { id: 'rule-5', name: 'DNS / Nameserver Alteration', trigger: 'Any modification to A, MX, NS or TXT records', enabled: true },
  { id: 'rule-6', name: 'Blockchain Fund Movement', trigger: 'Transactions exceeding 5 ETH / $10,000 USD', enabled: false }
];

export const initialApiKeys = [
  {
    id: 'key-1',
    name: 'Production Threat Intelligence Ingestion',
    key: 'topdoo_live_992a81b37c0944e2b9201a4',
    created: '2026-08-01',
    lastUsed: '12 seconds ago',
    permissions: 'read:intelligence, write:reports, query:quickcheck',
    status: 'Active',
    requestsToday: 14820
  },
  {
    id: 'key-2',
    name: 'Staging Discord / Slack SecOps Bot',
    key: 'topdoo_test_551e72c84a1045f9a88310c',
    created: '2026-09-10',
    lastUsed: '4 hours ago',
    permissions: 'query:quickcheck, read:alerts',
    status: 'Active',
    requestsToday: 412
  }
];

export const statsOverview = {
  threatsDetected: '1,428,940',
  threatsChange: '+14.2%',
  highRiskEntities: '48,290',
  highRiskChange: '+8.4%',
  activeWatchlist: '1,840',
  activeWatchlistChange: '+22.5%',
  openReports: '382',
  openReportsChange: '-5.1%',
  verifiedReports: '12,940',
  verifiedReportsChange: '+18.9%',
  activeAlerts: '19',
  activeAlertsChange: '+3'
};
