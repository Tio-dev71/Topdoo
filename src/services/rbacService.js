// TOPDOO RBAC & ACCESS CONTROL SERVICE (M10)

export const ROLES = {
  OWNER: 'OWNER',
  ADMIN: 'ADMIN',
  SECURITY_ANALYST: 'SECURITY_ANALYST',
  DEVELOPER: 'DEVELOPER',
  USER: 'USER'
};

export const PERMISSIONS = {
  // Threat Intel & View
  VIEW_THREAT_INTEL: 'VIEW_THREAT_INTEL',
  SCAN_URL: 'SCAN_URL',
  SUBMIT_REPORT: 'SUBMIT_REPORT',

  // SecOps & Analyst Verification
  VERIFY_REPORT: 'VERIFY_REPORT',
  MANAGE_ENTITY: 'MANAGE_ENTITY',
  QUARANTINE_ENTITY: 'QUARANTINE_ENTITY',
  VIEW_EVIDENCE_LOGS: 'VIEW_EVIDENCE_LOGS',

  // Developer & Integrations
  MANAGE_API_KEYS: 'MANAGE_API_KEYS',
  MANAGE_WEBHOOKS: 'MANAGE_WEBHOOKS',

  // Workspace & Admin
  MANAGE_WORKSPACE: 'MANAGE_WORKSPACE',
  INVITE_MEMBERS: 'INVITE_MEMBERS',
  MANAGE_ROLES: 'MANAGE_ROLES',
  MANAGE_BILLING: 'MANAGE_BILLING'
};

// Ma trận phân quyền (Role-to-Permission Matrix)
const ROLE_PERMISSIONS = {
  [ROLES.OWNER]: Object.values(PERMISSIONS),
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_THREAT_INTEL,
    PERMISSIONS.SCAN_URL,
    PERMISSIONS.SUBMIT_REPORT,
    PERMISSIONS.VERIFY_REPORT,
    PERMISSIONS.MANAGE_ENTITY,
    PERMISSIONS.QUARANTINE_ENTITY,
    PERMISSIONS.VIEW_EVIDENCE_LOGS,
    PERMISSIONS.MANAGE_API_KEYS,
    PERMISSIONS.MANAGE_WEBHOOKS,
    PERMISSIONS.MANAGE_WORKSPACE,
    PERMISSIONS.INVITE_MEMBERS,
    PERMISSIONS.MANAGE_ROLES
  ],
  [ROLES.SECURITY_ANALYST]: [
    PERMISSIONS.VIEW_THREAT_INTEL,
    PERMISSIONS.SCAN_URL,
    PERMISSIONS.SUBMIT_REPORT,
    PERMISSIONS.VERIFY_REPORT,
    PERMISSIONS.MANAGE_ENTITY,
    PERMISSIONS.QUARANTINE_ENTITY,
    PERMISSIONS.VIEW_EVIDENCE_LOGS
  ],
  [ROLES.DEVELOPER]: [
    PERMISSIONS.VIEW_THREAT_INTEL,
    PERMISSIONS.SCAN_URL,
    PERMISSIONS.SUBMIT_REPORT,
    PERMISSIONS.MANAGE_API_KEYS,
    PERMISSIONS.MANAGE_WEBHOOKS
  ],
  [ROLES.USER]: [
    PERMISSIONS.VIEW_THREAT_INTEL,
    PERMISSIONS.SCAN_URL,
    PERMISSIONS.SUBMIT_REPORT
  ]
};

export const hasPermission = (userRole, permission) => {
  if (!userRole) return false;
  const permissions = ROLE_PERMISSIONS[userRole] || [];
  return permissions.includes(permission);
};

export const getRoleMeta = (role) => {
  switch (role) {
    case ROLES.OWNER:
      return { label: 'Chủ sở hữu (Owner)', color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' };
    case ROLES.ADMIN:
      return { label: 'Quản trị viên (Admin)', color: '#DC2626', bg: '#FEF2F2', border: '#FECACA' };
    case ROLES.SECURITY_ANALYST:
      return { label: 'Chuyên gia Bảo mật (Analyst)', color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' };
    case ROLES.DEVELOPER:
      return { label: 'Kỹ sư Phần mềm (Dev)', color: '#059669', bg: '#ECFDF5', border: '#A7F3D0' };
    case ROLES.USER:
      return { label: 'Người dùng tiêu chuẩn', color: '#4B5563', bg: '#F3F4F6', border: '#E5E7EB' };
    default:
      return { label: 'Khách vãng lai', color: '#6B7280', bg: '#F9FAFB', border: '#E5E7EB' };
  }
};
