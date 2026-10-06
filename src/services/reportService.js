// TOPDOO REPORT & VERIFICATION WORKFLOW SERVICE (M4)

export const REPORT_STATUS = {
  SUBMITTED: 'Submitted',
  UNDER_REVIEW: 'Under Review',
  VERIFIED: 'Verified',
  REJECTED: 'Rejected'
};

export const generateReportCode = () => {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `REP-2026-${rand}`;
};

export const createReportSubmission = (formData, currentUser) => {
  const code = generateReportCode();
  const dateStr = new Date().toISOString().split('T')[0];

  return {
    id: code,
    reportCode: code,
    title: formData.title || `${formData.category || 'Nghi vấn lừa đảo'}: ${formData.target}`,
    target: formData.target,
    targetIdentifier: formData.target,
    type: formData.type || 'domain',
    category: formData.category || 'Phishing Scam',
    severity: formData.severity || 'High',
    description: formData.description,
    lossAmount: formData.lossAmount ? `${formData.lossAmount} USD` : '$0',
    reporter: currentUser?.fullName || formData.reporterName || 'Cộng đồng nặc danh',
    reporterEmail: currentUser?.email || formData.reporterEmail || 'anonymous@topdoo.com',
    status: REPORT_STATUS.SUBMITTED,
    createdAt: dateStr,
    timestamp: 'Vừa xong',
    evidenceCount: formData.evidenceUrl ? 1 : 0,
    evidenceItems: formData.evidenceUrl ? [
      {
        id: `evi-${Date.now()}`,
        title: 'Bằng chứng cung cấp khi báo cáo',
        type: 'SCREENSHOT',
        contentUrl: formData.evidenceUrl,
        confidenceScore: 85,
        verified: false
      }
    ] : []
  };
};

export const processVerificationDecision = (report, decision, verifierUser, notes) => {
  const isApproved = decision === 'verify';
  const newStatus = isApproved ? REPORT_STATUS.VERIFIED : REPORT_STATUS.REJECTED;

  return {
    ...report,
    status: newStatus,
    verifiedBy: verifierUser?.fullName || 'SecOps Lead Analyst',
    verifierRole: verifierUser?.role || 'SECURITY_ANALYST',
    verifiedAt: new Date().toISOString(),
    verificationNotes: notes || (isApproved ? 'Đã xác minh bằng chứng trùng khớp với chữ ký độc hại.' : 'Bằng chứng chưa đủ căn cứ xác minh.')
  };
};
