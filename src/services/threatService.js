// TOPDOO THREAT INTELLIGENCE & SCORING SERVICE (M4, M5)

export const RISK_LEVELS = {
  SAFE: { label: 'An toàn (Safe)', min: 0, max: 20, color: '#10B981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)' },
  LOW: { label: 'Rủi ro thấp (Low Risk)', min: 21, max: 40, color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)' },
  MODERATE: { label: 'Rủi ro trung bình (Medium)', min: 41, max: 60, color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)' },
  HIGH: { label: 'Nguy cơ cao (High Risk)', min: 61, max: 80, color: '#F97316', bg: 'rgba(249, 115, 22, 0.12)', border: 'rgba(249, 115, 22, 0.3)' },
  CRITICAL: { label: 'Lừa đảo nghiêm trọng (Critical)', min: 81, max: 100, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.3)' }
};

export const getRiskMeta = (score) => {
  if (score >= 81) return RISK_LEVELS.CRITICAL;
  if (score >= 61) return RISK_LEVELS.HIGH;
  if (score >= 41) return RISK_LEVELS.MODERATE;
  if (score >= 21) return RISK_LEVELS.LOW;
  return RISK_LEVELS.SAFE;
};

/**
 * 5-Factor Risk Score Weighting Algorithm
 * - Report History (35%)
 * - Phishing Indicators & Spoofing (30%)
 * - Network Infrastructure & ASNs (20%)
 * - Domain Age & WHOIS (15%)
 */
export const calculateMultiFactorRisk = (factors) => {
  const {
    reportCount = 0,
    hasBrandSpoofing = false,
    hasKeylogger = false,
    isNewlyRegisteredDomain = false,
    isBulletproofHost = false,
    evidenceConfidence = 50
  } = factors;

  let reportScore = Math.min(35, reportCount * 3.5);
  let phishingScore = 0;
  if (hasBrandSpoofing) phishingScore += 18;
  if (hasKeylogger) phishingScore += 12;

  let networkScore = isBulletproofHost ? 20 : 5;
  let domainScore = isNewlyRegisteredDomain ? 15 : 2;

  let totalRawScore = reportScore + phishingScore + networkScore + domainScore;
  
  // Adjust with evidence confidence
  const confidenceMultiplier = evidenceConfidence / 100;
  const finalScore = Math.min(100, Math.round(totalRawScore * (0.8 + 0.2 * confidenceMultiplier)));

  return {
    score: finalScore,
    breakdown: [
      { name: 'Lịch sử báo cáo (Report History)', score: Math.round(reportScore), max: 35 },
      { name: 'Dấu hiệu Phishing & Mạo danh', score: Math.round(phishingScore), max: 30 },
      { name: 'Hạ tầng mạng & Máy chủ liên kết', score: Math.round(networkScore), max: 20 },
      { name: 'Danh tiếng tên miền & Tuổi đời', score: Math.round(domainScore), max: 15 }
    ],
    riskMeta: getRiskMeta(finalScore)
  };
};

/**
 * Real-time Target Analysis Engine
 */
export const analyzeTargetInput = (query, existingEntities = []) => {
  const clean = (query || '').trim().toLowerCase();
  
  // 1. Kiểm tra nếu đã có trong CSDL
  const matched = existingEntities.find(
    e => e.identifier.toLowerCase() === clean || clean.includes(e.identifier.toLowerCase())
  );

  if (matched) {
    return {
      isKnownThreat: true,
      entity: matched,
      score: matched.riskScore,
      verdict: matched.status,
      riskMeta: getRiskMeta(matched.riskScore)
    };
  }

  // 2. Heuristics cho domain hoặc URL mới
  const isSuspiciousKeyword = clean.includes('airdrop') || 
                              clean.includes('claim') || 
                              clean.includes('free-gift') || 
                              clean.includes('verify-login') || 
                              clean.includes('secure-update');

  const isWallet = /^0x[a-fA-F0-9]{40}$/.test(clean);

  const score = isSuspiciousKeyword ? 88 : (isWallet ? 45 : 15);
  const verdict = score >= 80 ? 'Khả nghi lừa đảo cao (Suspicious Domain)' : (score >= 40 ? 'Cần kiểm tra thêm (Moderate)' : 'Chưa ghi nhận dấu hiệu độc hại (Safe)');

  return {
    isKnownThreat: false,
    score,
    verdict,
    riskMeta: getRiskMeta(score),
    recommendation: score >= 80 ? 'Không đăng nhập hoặc cung cấp mật khẩu/khóa cá nhân cho website này.' : 'Trang web an toàn để truy cập.'
  };
};
