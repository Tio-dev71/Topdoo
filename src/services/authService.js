/**
 * TOPDOO AUTHENTICATION SERVICE (Hybrid: Local Engine + Supabase Cloud)
 * Hỗ trợ xác thực đầy đủ cả môi trường Local Development lẫn Supabase Production
 */

export const DEFAULT_LOCAL_USERS = [
  {
    id: 'usr-admin-01',
    email: 'admin@topdoo.com',
    fullName: 'Topdoo SecOps SuperAdmin',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    role: 'ADMIN',
    password: 'Topmediacto!!!'
  },
  {
    id: 'usr-analyst-02',
    email: 'analyst@topdoo.com',
    fullName: 'Alex Vance (Lead SecOps Analyst)',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    role: 'SECURITY_ANALYST',
    password: 'Topmediacto!!!'
  },
  {
    id: 'usr-dev-03',
    email: 'dev@topdoo.com',
    fullName: 'David Tran (Senior Core Engineer)',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    role: 'DEVELOPER',
    password: 'Topmediacto!!!'
  },
  {
    id: 'usr-user-04',
    email: 'user@topdoo.com',
    fullName: 'Nguyễn Văn A',
    avatarUrl: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
    role: 'USER',
    password: 'Topmediacto!!!'
  }
];

const LOCAL_USERS_KEY = 'topdoo_local_users';
const LOCAL_SESSION_KEY = 'topdoo_auth_session';

/**
 * Lấy danh sách users cục bộ (bao gồm cả tài khoản mặc định và tài khoản mới đăng ký)
 */
export function getRegisteredUsers() {
  if (typeof window === 'undefined') return DEFAULT_LOCAL_USERS;
  try {
    const raw = localStorage.getItem(LOCAL_USERS_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(DEFAULT_LOCAL_USERS));
      return DEFAULT_LOCAL_USERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_LOCAL_USERS;
  } catch (_) {
    return DEFAULT_LOCAL_USERS;
  }
}

/**
 * Lấy phiên đăng nhập hiện tại từ LocalStorage
 */
export function getStoredSession() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(LOCAL_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_) {
    return null;
  }
}

/**
 * Lưu phiên đăng nhập
 */
export function storeSession(user) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(user));
  } catch (_) {}
}

/**
 * Xóa phiên đăng nhập
 */
export function removeStoredSession() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(LOCAL_SESSION_KEY);
  } catch (_) {}
}

/**
 * Đăng nhập cục bộ (Local Sign In)
 */
export function localSignIn(email, password) {
  const users = getRegisteredUsers();
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  const found = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (!found) {
    return {
      error: { message: `Tài khoản email "${cleanEmail}" không tồn tại. Vui lòng kiểm tra lại hoặc Đăng ký mới!` }
    };
  }

  // Cho phép đăng nhập với mật khẩu đúng hoặc mật khẩu mặc định (123456 / Topmediacto!!!) để tiện kiểm thử
  if (found.password && cleanPass !== found.password && cleanPass !== '123456' && cleanPass !== 'Topmediacto!!!') {
    return {
      error: { message: 'Mật khẩu không chính xác. Mẹo kiểm thử: dùng "123456" hoặc "Topmediacto!!!"' }
    };
  }

  const sessionUser = {
    id: found.id,
    email: found.email,
    fullName: found.fullName || found.email.split('@')[0],
    role: found.role || 'USER',
    avatarUrl: found.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    authProvider: 'local'
  };

  storeSession(sessionUser);
  return { data: { user: sessionUser } };
}

/**
 * Đăng ký tài khoản cục bộ mới (Local Sign Up)
 */
export function localSignUp(email, password, fullName = '') {
  const cleanEmail = (email || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  if (!cleanEmail || !cleanEmail.includes('@')) {
    return { error: { message: 'Địa chỉ email không hợp lệ.' } };
  }
  if (!cleanPass || cleanPass.length < 6) {
    return { error: { message: 'Mật khẩu phải có độ dài tối thiểu 6 ký tự.' } };
  }

  const users = getRegisteredUsers();
  const existing = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (existing) {
    return { error: { message: `Email "${cleanEmail}" đã được đăng ký trên hệ thống. Vui lòng Đăng nhập!` } };
  }

  const newUser = {
    id: `usr-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    email: cleanEmail,
    fullName: fullName.trim() || cleanEmail.split('@')[0],
    role: 'USER',
    avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${cleanEmail}`,
    password: cleanPass,
    createdAt: new Date().toISOString()
  };

  const updatedUsers = [...users, newUser];
  try {
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(updatedUsers));
  } catch (_) {}

  const sessionUser = {
    id: newUser.id,
    email: newUser.email,
    fullName: newUser.fullName,
    role: newUser.role,
    avatarUrl: newUser.avatarUrl,
    authProvider: 'local'
  };

  storeSession(sessionUser);
  return { data: { user: sessionUser } };
}

/**
 * Đăng nhập qua mạng xã hội (Google, Microsoft, Apple)
 */
export function localSocialSignIn(provider) {
  const providerLower = (provider || 'google').toLowerCase();
  const socialUser = {
    id: `usr-sso-${Date.now()}`,
    email: `user.${providerLower}@example.com`,
    fullName: `Người Dùng (${provider.toUpperCase()})`,
    role: 'USER',
    avatarUrl: providerLower === 'google'
      ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80'
      : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80',
    authProvider: providerLower
  };

  storeSession(socialUser);
  return { data: { user: socialUser } };
}
