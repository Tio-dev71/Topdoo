import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  initialEntities,
  initialReports,
  initialEvidence,
  initialAlerts,
  initialMonitoringEvents,
  initialNetwork,
  initialWatchlistRules,
  initialApiKeys,
  statsOverview,
  getRiskMeta
} from '../data/securityData';
import { ROLES, PERMISSIONS, hasPermission, getRoleMeta } from '../services/rbacService';
import { initialWorkspaces, createNewProject } from '../services/workspaceService';
import {
  AI_MODELS,
  FALLBACK_CHAIN,
  calculatePromptCredits,
  executeAiPrompt,
  get9RouterConfig,
  save9RouterConfig,
  check9RouterHealth
} from '../services/aiService';
import { BILLING_PLANS, initialTransactions, processCreditDeduction, processCreditTopUp } from '../services/billingService';
import { initialAppeals, initialSloMetrics, processAppealResolution } from '../services/adminService';
import { initialStudioProjects } from '../services/studioService';
import { INITIAL_AI_TOOLS } from '../services/toolsCatalogService';
import { INITIAL_ACADEMY_COURSES } from '../services/academyService';
import { INITIAL_COMMUNITY_POSTS } from '../services/communityService';
import { runRedTeamAudit } from '../services/redTeamAuditService';
import { runLoadTestBenchmark } from '../services/loadTestService';
import {
  getStoredSession,
  storeSession,
  removeStoredSession,
  localSignIn,
  localSignUp,
  localSocialSignIn,
  getRegisteredUsers
} from '../services/authService';
import {
  getVoiceboxConfig,
  saveVoiceboxConfig,
  checkVoiceboxHealth,
  getVoiceProfiles,
  synthesizeSpeech,
  cloneVoiceProfile,
  stopAllSpeech
} from '../services/voiceService';
import {
  scanLiveWebsite,
  scanLiveCheckScam,
  scanLiveIpServer,
  scanLiveBreachEmail
} from '../services/realSecurityScanner';

const SecurityContext = createContext(null);

export function SecurityProvider({ children }) {
  // Navigation & Mode
  const [mode, setMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/\/$/, '');
      const hash = window.location.hash;
      const search = new URLSearchParams(window.location.search);
      if (
        path === '/app' ||
        path === '/dashboard' ||
        path === '/console' ||
        hash === '#app' ||
        hash === '#dashboard' ||
        hash === '#console' ||
        search.get('mode') === 'app'
      ) {
        return 'app';
      }
    }
    return 'marketing';
  });
  const [marketingRoute, setMarketingRoute] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/\/$/, '');
      if (path === '/topdoo-ai' || window.location.hash === '#topdoo-ai') {
        return 'topdoo-ai';
      }
      if (path === '/topdoo-studio' || window.location.hash === '#topdoo-studio') {
        return 'topdoo-studio';
      }
      if (path === '/topdoo-tools' || window.location.hash === '#topdoo-tools') {
        return 'topdoo-tools';
      }
      if (path === '/topdoo-explore-tools' || path === '/explore-tools' || window.location.hash === '#topdoo-explore-tools') {
        return 'topdoo-explore-tools';
      }
      if (
        path === '/topdoo-pricing' ||
        path === '/pricing' ||
        path === '/bang-gia' ||
        window.location.hash === '#topdoo-pricing' ||
        window.location.hash === '#pricing' ||
        window.location.hash === '#bang-gia'
      ) {
        return 'topdoo-pricing';
      }
      if (
        path === '/topdoo-explore' ||
        path === '/kham-pha' ||
        path === '/explore' ||
        window.location.hash === '#topdoo-explore' ||
        window.location.hash === '#kham-pha' ||
        window.location.hash === '#explore'
      ) {
        return 'topdoo-explore';
      }
      if (
        path === '/topdoo-business' ||
        path === '/business' ||
        path === '/doanh-nghiep' ||
        window.location.hash === '#topdoo-business' ||
        window.location.hash === '#business' ||
        window.location.hash === '#doanh-nghiep'
      ) {
        return 'topdoo-business';
      }
      if (
        path === '/topdoo-contact' ||
        path === '/contact' ||
        path === '/lien-he' ||
        path === '/tu-van' ||
        window.location.hash === '#topdoo-contact' ||
        window.location.hash === '#contact' ||
        window.location.hash === '#lien-he' ||
        window.location.hash === '#tu-van'
      ) {
        return 'topdoo-contact';
      }
      if (
        path === '/topdoo-solutions' ||
        path === '/solutions' ||
        path === '/giai-phap' ||
        path === '/xem-giai-phap' ||
        path === '/business-solutions' ||
        window.location.hash === '#topdoo-solutions' ||
        window.location.hash === '#solutions' ||
        window.location.hash === '#giai-phap' ||
        window.location.hash === '#xem-giai-phap'
      ) {
        return 'topdoo-solutions';
      }
      if (
        path === '/topdoo-url-scanner' ||
        path === '/url-scanner' ||
        path === '/domain-scanner' ||
        path === '/topdoo-tools-security' ||
        path === '/kiem-tra-link' ||
        window.location.hash === '#topdoo-url-scanner' ||
        window.location.hash === '#url-scanner' ||
        window.location.hash === '#domain-scanner' ||
        window.location.hash === '#kiem-tra-link'
      ) {
        return 'topdoo-url-scanner';
      }
      if (
        path === '/topdoo-security' ||
        path === '/security' ||
        path === '/bao-mat' ||
        window.location.hash === '#topdoo-security' ||
        window.location.hash === '#security' ||
        window.location.hash === '#bao-mat'
      ) {
        return 'topdoo-security';
      }
      if (
        path === '/topdoo-get-protect' ||
        path === '/get-protect' ||
        path === '/bat-dau-bao-ve-ngay' ||
        path === '/bao-ve-ngay' ||
        window.location.hash === '#topdoo-get-protect' ||
        window.location.hash === '#get-protect' ||
        window.location.hash === '#bat-dau-bao-ve-ngay'
      ) {
        return 'topdoo-get-protect';
      }
      if (
        path === '/topdoo-plan-security' ||
        path === '/topdoo-security-plans' ||
        path === '/security-plans' ||
        path === '/chon-goi' ||
        path === '/chon-goi-bao-mat' ||
        window.location.hash === '#topdoo-plan-security' ||
        window.location.hash === '#security-plans' ||
        window.location.hash === '#chon-goi'
      ) {
        return 'topdoo-plan-security';
      }
      if (
        path === '/topdoo-activate-security' ||
        path === '/topdoo-security-activation' ||
        path === '/activate-security' ||
        path === '/kich-hoat' ||
        path === '/kich-hoat-bao-ve' ||
        window.location.hash === '#topdoo-activate-security' ||
        window.location.hash === '#activate-security' ||
        window.location.hash === '#kich-hoat'
      ) {
        return 'topdoo-activate-security';
      }
      if (
        path === '/topdoo-company' ||
        path === '/company' ||
        path === '/ve-chung-toi' ||
        path === '/gioi-thieu' ||
        window.location.hash === '#topdoo-company' ||
        window.location.hash === '#company'
      ) {
        return 'topdoo-company';
      }
      if (
        path === '/topdoo-developer-login' ||
        path === '/developer-login' ||
        path === '/dev-login' ||
        path === '/dang-nhap-developer' ||
        path === '/dang-ky-developer' ||
        window.location.hash === '#topdoo-developer-login' ||
        window.location.hash === '#developer-login'
      ) {
        return 'topdoo-developer-login';
      }
      if (
        path === '/topdoo-developer' ||
        path === '/developer' ||
        path === '/nha-phat-trien' ||
        path === '/dev' ||
        window.location.hash === '#topdoo-developer' ||
        window.location.hash === '#developer'
      ) {
        return 'topdoo-developer';
      }
      if (
        path === '/topdoo-trial-welcome' ||
        path === '/trial-welcome' ||
        path === '/topdoo-hello' ||
        path === '/dung-thu-thanh-cong' ||
        window.location.hash === '#topdoo-trial-welcome' ||
        window.location.hash === '#trial-welcome' ||
        window.location.hash === '#topdoo-hello'
      ) {
        return 'topdoo-trial-welcome';
      }
      if (
        path === '/topdoo-developer-dashboard' ||
        path === '/developer-dashboard' ||
        path === '/dev-dashboard' ||
        window.location.hash === '#topdoo-developer-dashboard' ||
        window.location.hash === '#developer-dashboard' ||
        window.location.hash === '#dev-dashboard'
      ) {
        return 'topdoo-developer-dashboard';
      }
      if (
        path === '/topdoo-developer-projects' ||
        path === '/developer-projects' ||
        path === '/my-projects' ||
        path === '/du-an-cua-toi' ||
        window.location.hash === '#topdoo-developer-projects' ||
        window.location.hash === '#developer-projects' ||
        window.location.hash === '#du-an-cua-toi'
      ) {
        return 'topdoo-developer-projects';
      }
      if (
        path === '/topdoo-developer-api-sdk' ||
        path === '/developer-api-sdk' ||
        path === '/topdoo-developer-api' ||
        path === '/developer-api' ||
        path === '/topdoo-developer-sdk' ||
        path === '/developer-sdk' ||
        path === '/api-sdk' ||
        path === '/api-va-sdk' ||
        window.location.hash === '#topdoo-developer-api-sdk' ||
        window.location.hash === '#developer-api-sdk' ||
        window.location.hash === '#api-sdk'
      ) {
        return 'topdoo-developer-api-sdk';
      }
      if (
        path === '/topdoo-developer-playground' ||
        path === '/developer-playground' ||
        path === '/topdoo-playground' ||
        path === '/playground' ||
        window.location.hash === '#topdoo-developer-playground' ||
        window.location.hash === '#developer-playground' ||
        window.location.hash === '#playground'
      ) {
        return 'topdoo-developer-playground';
      }
      if (
        path === '/topdoo-developer-docs' ||
        path === '/developer-docs' ||
        path === '/topdoo-docs' ||
        path === '/developer-tai-lieu' ||
        path === '/tai-lieu' ||
        path === '/docs' ||
        window.location.hash === '#topdoo-developer-docs' ||
        window.location.hash === '#developer-docs' ||
        window.location.hash === '#topdoo-docs' ||
        window.location.hash === '#docs' ||
        window.location.hash === '#tai-lieu'
      ) {
        return 'topdoo-developer-docs';
      }
      if (
        path === '/topdoo-developer-api-keys' ||
        path === '/developer-api-keys' ||
        path === '/topdoo-api-keys' ||
        path === '/quan-ly-api-key' ||
        path === '/api-keys' ||
        path === '/keys' ||
        window.location.hash === '#topdoo-developer-api-keys' ||
        window.location.hash === '#developer-api-keys' ||
        window.location.hash === '#topdoo-api-keys' ||
        window.location.hash === '#quan-ly-api-key' ||
        window.location.hash === '#api-keys'
      ) {
        return 'topdoo-developer-api-keys';
      }
      if (
        path === '/topdoo-developer-billing' ||
        path === '/developer-billing' ||
        path === '/topdoo-billing' ||
        path === '/thanh-toan' ||
        path === '/developer-thanh-toan' ||
        path === '/billing' ||
        window.location.hash === '#topdoo-developer-billing' ||
        window.location.hash === '#developer-billing' ||
        window.location.hash === '#topdoo-billing' ||
        window.location.hash === '#thanh-toan' ||
        window.location.hash === '#billing'
      ) {
        return 'topdoo-developer-billing';
      }
      if (
        path === '/topdoo-developer-support' ||
        path === '/developer-support' ||
        path === '/topdoo-support' ||
        path === '/ho-tro' ||
        path === '/developer-ho-tro' ||
        path === '/support' ||
        window.location.hash === '#topdoo-developer-support' ||
        window.location.hash === '#developer-support' ||
        window.location.hash === '#topdoo-support' ||
        window.location.hash === '#ho-tro' ||
        window.location.hash === '#support'
      ) {
        return 'topdoo-developer-support';
      }
      if (
        path === '/topdoo-developer-notifications' ||
        path === '/developer-notifications' ||
        path === '/topdoo-notifications' ||
        path === '/thong-bao' ||
        path === '/developer-thong-bao' ||
        path === '/notifications' ||
        window.location.hash === '#topdoo-developer-notifications' ||
        window.location.hash === '#developer-notifications' ||
        window.location.hash === '#topdoo-notifications' ||
        window.location.hash === '#thong-bao' ||
        window.location.hash === '#notifications'
      ) {
        return 'topdoo-developer-notifications';
      }
      if (
        path === '/topdoo-developer-appearance' ||
        path === '/developer-appearance' ||
        path === '/topdoo-appearance' ||
        path === '/cai-dat-giao-dien' ||
        path === '/giao-dien' ||
        path === '/developer-giao-dien' ||
        path === '/appearance' ||
        window.location.hash === '#topdoo-developer-appearance' ||
        window.location.hash === '#developer-appearance' ||
        window.location.hash === '#cai-dat-giao-dien' ||
        window.location.hash === '#giao-dien' ||
        window.location.hash === '#appearance'
      ) {
        return 'topdoo-developer-appearance';
      }
      if (
        path === '/topdoo-developer-integrations' ||
        path === '/developer-integrations' ||
        path === '/cai-dat-tich-hop' ||
        path === '/tich-hop' ||
        path === '/integrations' ||
        window.location.hash === '#topdoo-developer-integrations' ||
        window.location.hash === '#developer-integrations' ||
        window.location.hash === '#cai-dat-tich-hop' ||
        window.location.hash === '#tich-hop' ||
        window.location.hash === '#integrations'
      ) {
        return 'topdoo-developer-integrations';
      }
      if (
        path === '/topdoo-developer-language' ||
        path === '/developer-language' ||
        path === '/cai-dat-ngon-ngu' ||
        path === '/ngon-ngu' ||
        path === '/language' ||
        window.location.hash === '#topdoo-developer-language' ||
        window.location.hash === '#developer-language' ||
        window.location.hash === '#cai-dat-ngon-ngu' ||
        window.location.hash === '#ngon-ngu' ||
        window.location.hash === '#language'
      ) {
        return 'topdoo-developer-language';
      }
      if (
        path === '/topdoo-developer-security' ||
        path === '/developer-security' ||
        path === '/topdoo-security-settings' ||
        path === '/cai-dat-bao-mat' ||
        path === '/bao-mat' ||
        window.location.hash === '#topdoo-developer-security' ||
        window.location.hash === '#developer-security' ||
        window.location.hash === '#cai-dat-bao-mat' ||
        window.location.hash === '#bao-mat'
      ) {
        return 'topdoo-developer-security';
      }
      if (
        path === '/topdoo-developer-settings' ||
        path === '/developer-settings' ||
        path === '/topdoo-settings' ||
        path === '/cai-dat' ||
        path === '/developer-cai-dat' ||
        path === '/settings' ||
        window.location.hash === '#topdoo-developer-settings' ||
        window.location.hash === '#developer-settings' ||
        window.location.hash === '#topdoo-settings' ||
        window.location.hash === '#cai-dat' ||
        window.location.hash === '#settings'
      ) {
        return 'topdoo-developer-settings';
      }
    }
    return 'home';
  });

  const [activeSecurityPlan, setActiveSecurityPlan] = useState({
    id: 'pro',
    name: 'Topdoo Security Pro',
    badge: 'Đã chọn',
    subtitle: 'Bảo vệ toàn diện cho cá nhân và đội nhóm nhỏ',
    price: '299.000đ/tháng',
    priceNumber: 299000,
    cycle: 'tháng'
  });

  const navigateMarketing = (route) => {
    let finalRoute = route;
    if (route === 'pricing' || route === 'bang-gia' || route === 'topdoo-pricing') {
      finalRoute = 'topdoo-pricing';
    } else if (route === 'kham-pha' || route === 'explore' || route === 'topdoo-explore') {
      finalRoute = 'topdoo-explore';
    } else if (route === 'business' || route === 'doanh-nghiep' || route === 'topdoo-business') {
      finalRoute = 'topdoo-business';
    } else if (route === 'contact' || route === 'lien-he' || route === 'tu-van' || route === 'topdoo-contact') {
      finalRoute = 'topdoo-contact';
    } else if (route === 'solutions' || route === 'giai-phap' || route === 'xem-giai-phap' || route === 'topdoo-solutions') {
      finalRoute = 'topdoo-solutions';
    } else if (route === 'academy' || route === 'hoc-vien' || route === 'topdoo-academy') {
      finalRoute = 'topdoo-academy';
    } else if (route === 'community' || route === 'cong-dong' || route === 'topdoo-community') {
      finalRoute = 'topdoo-community';
    } else if (
      route === 'url-scanner' ||
      route === 'topdoo-url-scanner' ||
      route === 'domain-scanner' ||
      route === 'kiem-tra-link' ||
      route === 'topdoo-tools-security'
    ) {
      finalRoute = 'topdoo-url-scanner';
    } else if (route === 'security' || route === 'bao-mat' || route === 'topdoo-security') {
      finalRoute = 'topdoo-security';
    } else if (route === 'get-protect' || route === 'bat-dau-bao-ve-ngay' || route === 'bao-ve-ngay' || route === 'topdoo-get-protect') {
      finalRoute = 'topdoo-get-protect';
    } else if (
      route === 'plan-security' ||
      route === 'security-plans' ||
      route === 'topdoo-security-plans' ||
      route === 'chon-goi' ||
      route === 'chon-goi-bao-mat' ||
      route === 'topdoo-plan-security'
    ) {
      finalRoute = 'topdoo-plan-security';
    } else if (
      route === 'activate-security' ||
      route === 'topdoo-security-activation' ||
      route === 'kich-hoat' ||
      route === 'kich-hoat-bao-ve' ||
      route === 'topdoo-activate-security'
    ) {
      finalRoute = 'topdoo-activate-security';
    } else if (
      route === 'company' ||
      route === 've-chung-toi' ||
      route === 'gioi-thieu' ||
      route === 'topdoo-company'
    ) {
      finalRoute = 'topdoo-company';
    } else if (
      route === 'developer-login' ||
      route === 'topdoo-developer-login' ||
      route === 'dev-login' ||
      route === 'dang-nhap-developer' ||
      route === 'dang-ky-developer'
    ) {
      finalRoute = 'topdoo-developer-login';
    } else if (
      route === 'developer' ||
      route === 'nha-phat-trien' ||
      route === 'dev' ||
      route === 'topdoo-developer'
    ) {
      finalRoute = 'topdoo-developer';
    } else if (
      route === 'trial-welcome' ||
      route === 'topdoo-trial-welcome' ||
      route === 'topdoo-hello' ||
      route === 'dung-thu-thanh-cong'
    ) {
      finalRoute = 'topdoo-trial-welcome';
    } else if (
      route === 'developer-dashboard' ||
      route === 'topdoo-developer-dashboard' ||
      route === 'dev-dashboard'
    ) {
      finalRoute = 'topdoo-developer-dashboard';
    } else if (
      route === 'developer-projects' ||
      route === 'topdoo-developer-projects' ||
      route === 'my-projects' ||
      route === 'du-an-cua-toi'
    ) {
      finalRoute = 'topdoo-developer-projects';
    } else if (
      route === 'developer-api-sdk' ||
      route === 'topdoo-developer-api-sdk' ||
      route === 'topdoo-developer-api' ||
      route === 'developer-api' ||
      route === 'topdoo-developer-sdk' ||
      route === 'developer-sdk' ||
      route === 'api-sdk' ||
      route === 'topdoo-api-sdk' ||
      route === 'api-va-sdk'
    ) {
      finalRoute = 'topdoo-developer-api-sdk';
    } else if (
      route === 'developer-playground' ||
      route === 'topdoo-developer-playground' ||
      route === 'topdoo-playground' ||
      route === 'playground'
    ) {
      finalRoute = 'topdoo-developer-playground';
    } else if (
      route === 'developer-docs' ||
      route === 'topdoo-developer-docs' ||
      route === 'topdoo-docs' ||
      route === 'developer-tai-lieu' ||
      route === 'tai-lieu' ||
      route === 'docs'
    ) {
      finalRoute = 'topdoo-developer-docs';
    } else if (
      route === 'developer-api-keys' ||
      route === 'topdoo-developer-api-keys' ||
      route === 'topdoo-api-keys' ||
      route === 'quan-ly-api-key' ||
      route === 'api-keys' ||
      route === 'keys'
    ) {
      finalRoute = 'topdoo-developer-api-keys';
    } else if (
      route === 'developer-billing' ||
      route === 'topdoo-developer-billing' ||
      route === 'topdoo-billing' ||
      route === 'thanh-toan' ||
      route === 'developer-thanh-toan' ||
      route === 'billing'
    ) {
      finalRoute = 'topdoo-developer-billing';
    } else if (
      route === 'developer-support' ||
      route === 'topdoo-developer-support' ||
      route === 'topdoo-support' ||
      route === 'ho-tro' ||
      route === 'developer-ho-tro' ||
      route === 'support'
    ) {
      finalRoute = 'topdoo-developer-support';
    } else if (
      route === 'topdoo-developer-notifications' ||
      route === 'developer-notifications' ||
      route === 'topdoo-notifications' ||
      route === 'thong-bao' ||
      route === 'developer-thong-bao' ||
      route === 'notifications'
    ) {
      finalRoute = 'topdoo-developer-notifications';
    } else if (
      route === 'topdoo-developer-appearance' ||
      route === 'developer-appearance' ||
      route === 'topdoo-appearance' ||
      route === 'cai-dat-giao-dien' ||
      route === 'giao-dien' ||
      route === 'developer-giao-dien' ||
      route === 'appearance'
    ) {
      finalRoute = 'topdoo-developer-appearance';
    } else if (
      route === 'topdoo-developer-integrations' ||
      route === 'developer-integrations' ||
      route === 'cai-dat-tich-hop' ||
      route === 'tich-hop' ||
      route === 'integrations'
    ) {
      finalRoute = 'topdoo-developer-integrations';
    } else if (
      route === 'topdoo-developer-language' ||
      route === 'developer-language' ||
      route === 'cai-dat-ngon-ngu' ||
      route === 'ngon-ngu' ||
      route === 'language'
    ) {
      finalRoute = 'topdoo-developer-language';
    } else if (
      route === 'topdoo-developer-security' ||
      route === 'developer-security' ||
      route === 'topdoo-security-settings' ||
      route === 'cai-dat-bao-mat' ||
      route === 'bao-mat'
    ) {
      finalRoute = 'topdoo-developer-security';
    } else if (
      route === 'developer-settings' ||
      route === 'topdoo-developer-settings' ||
      route === 'topdoo-settings' ||
      route === 'cai-dat' ||
      route === 'developer-cai-dat' ||
      route === 'settings'
    ) {
      finalRoute = 'topdoo-developer-settings';
    }
    setMarketingRoute(finalRoute);
    setMode('marketing');
    if (typeof window !== 'undefined') {
      const targetPath = finalRoute === 'home' ? '/' : `/${finalRoute}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace(/\/$/, '');
      if (path === '/topdoo-ai' || window.location.hash === '#topdoo-ai') {
        setMarketingRoute('topdoo-ai');
      } else if (path === '/topdoo-studio' || window.location.hash === '#topdoo-studio') {
        setMarketingRoute('topdoo-studio');
      } else if (path === '/topdoo-tools' || window.location.hash === '#topdoo-tools') {
        setMarketingRoute('topdoo-tools');
      } else if (path === '/topdoo-explore-tools' || path === '/explore-tools' || window.location.hash === '#topdoo-explore-tools') {
        setMarketingRoute('topdoo-explore-tools');
      } else if (
        path === '/topdoo-pricing' ||
        path === '/pricing' ||
        path === '/bang-gia' ||
        window.location.hash === '#topdoo-pricing' ||
        window.location.hash === '#pricing' ||
        window.location.hash === '#bang-gia'
      ) {
        setMarketingRoute('topdoo-pricing');
      } else if (
        path === '/topdoo-explore' ||
        path === '/kham-pha' ||
        path === '/explore' ||
        window.location.hash === '#topdoo-explore' ||
        window.location.hash === '#kham-pha' ||
        window.location.hash === '#explore'
      ) {
        setMarketingRoute('topdoo-explore');
      } else if (
        path === '/topdoo-business' ||
        path === '/business' ||
        path === '/doanh-nghiep' ||
        window.location.hash === '#topdoo-business' ||
        window.location.hash === '#business' ||
        window.location.hash === '#doanh-nghiep'
      ) {
        setMarketingRoute('topdoo-business');
      } else if (
        path === '/topdoo-contact' ||
        path === '/contact' ||
        path === '/lien-he' ||
        path === '/tu-van' ||
        window.location.hash === '#topdoo-contact' ||
        window.location.hash === '#contact' ||
        window.location.hash === '#lien-he' ||
        window.location.hash === '#tu-van'
      ) {
        setMarketingRoute('topdoo-contact');
      } else if (
        path === '/topdoo-solutions' ||
        path === '/solutions' ||
        path === '/giai-phap' ||
        path === '/xem-giai-phap' ||
        path === '/business-solutions' ||
        window.location.hash === '#topdoo-solutions' ||
        window.location.hash === '#solutions' ||
        window.location.hash === '#giai-phap' ||
        window.location.hash === '#xem-giai-phap'
      ) {
        setMarketingRoute('topdoo-solutions');
      } else if (
        path === '/topdoo-security' ||
        path === '/security' ||
        path === '/bao-mat' ||
        window.location.hash === '#topdoo-security' ||
        window.location.hash === '#security' ||
        window.location.hash === '#bao-mat'
      ) {
        setMarketingRoute('topdoo-security');
      } else if (
        path === '/topdoo-get-protect' ||
        path === '/get-protect' ||
        path === '/bat-dau-bao-ve-ngay' ||
        path === '/bao-ve-ngay' ||
        window.location.hash === '#topdoo-get-protect' ||
        window.location.hash === '#get-protect' ||
        window.location.hash === '#bat-dau-bao-ve-ngay'
      ) {
        setMarketingRoute('topdoo-get-protect');
      } else if (
        path === '/topdoo-plan-security' ||
        path === '/topdoo-security-plans' ||
        path === '/security-plans' ||
        path === '/chon-goi' ||
        path === '/chon-goi-bao-mat' ||
        window.location.hash === '#topdoo-plan-security' ||
        window.location.hash === '#security-plans' ||
        window.location.hash === '#chon-goi'
      ) {
        setMarketingRoute('topdoo-plan-security');
      } else if (
        path === '/topdoo-activate-security' ||
        path === '/topdoo-security-activation' ||
        path === '/activate-security' ||
        path === '/kich-hoat' ||
        path === '/kich-hoat-bao-ve' ||
        window.location.hash === '#topdoo-activate-security' ||
        window.location.hash === '#activate-security' ||
        window.location.hash === '#kich-hoat'
      ) {
        setMarketingRoute('topdoo-activate-security');
      } else if (
        path === '/topdoo-company' ||
        path === '/company' ||
        path === '/ve-chung-toi' ||
        path === '/gioi-thieu' ||
        window.location.hash === '#topdoo-company' ||
        window.location.hash === '#company'
      ) {
        setMarketingRoute('topdoo-company');
      } else if (
        path === '/topdoo-developer-login' ||
        path === '/developer-login' ||
        path === '/dev-login' ||
        path === '/dang-nhap-developer' ||
        path === '/dang-ky-developer' ||
        window.location.hash === '#topdoo-developer-login' ||
        window.location.hash === '#developer-login'
      ) {
        setMarketingRoute('topdoo-developer-login');
      } else if (
        path === '/topdoo-developer' ||
        path === '/developer' ||
        path === '/nha-phat-trien' ||
        path === '/dev' ||
        window.location.hash === '#topdoo-developer' ||
        window.location.hash === '#developer'
      ) {
        setMarketingRoute('topdoo-developer');
      } else if (
        path === '/topdoo-trial-welcome' ||
        path === '/trial-welcome' ||
        path === '/topdoo-hello' ||
        path === '/dung-thu-thanh-cong' ||
        window.location.hash === '#topdoo-trial-welcome' ||
        window.location.hash === '#trial-welcome' ||
        window.location.hash === '#topdoo-hello'
      ) {
        setMarketingRoute('topdoo-trial-welcome');
      } else if (
        path === '/topdoo-developer-dashboard' ||
        path === '/developer-dashboard' ||
        path === '/dev-dashboard' ||
        window.location.hash === '#topdoo-developer-dashboard' ||
        window.location.hash === '#developer-dashboard' ||
        window.location.hash === '#dev-dashboard'
      ) {
        setMarketingRoute('topdoo-developer-dashboard');
      } else if (
        path === '/topdoo-developer-projects' ||
        path === '/developer-projects' ||
        path === '/my-projects' ||
        path === '/du-an-cua-toi' ||
        window.location.hash === '#topdoo-developer-projects' ||
        window.location.hash === '#developer-projects' ||
        window.location.hash === '#du-an-cua-toi'
      ) {
        setMarketingRoute('topdoo-developer-projects');
      } else if (
        path === '/topdoo-developer-api-sdk' ||
        path === '/developer-api-sdk' ||
        path === '/topdoo-developer-api' ||
        path === '/developer-api' ||
        path === '/topdoo-developer-sdk' ||
        path === '/developer-sdk' ||
        path === '/api-sdk' ||
        path === '/api-va-sdk' ||
        window.location.hash === '#topdoo-developer-api-sdk' ||
        window.location.hash === '#developer-api-sdk' ||
        window.location.hash === '#api-sdk'
      ) {
        setMarketingRoute('topdoo-developer-api-sdk');
      } else if (
        path === '/topdoo-developer-playground' ||
        path === '/developer-playground' ||
        path === '/topdoo-playground' ||
        path === '/playground' ||
        window.location.hash === '#topdoo-developer-playground' ||
        window.location.hash === '#developer-playground' ||
        window.location.hash === '#playground'
      ) {
        setMarketingRoute('topdoo-developer-playground');
      } else if (
        path === '/topdoo-developer-docs' ||
        path === '/developer-docs' ||
        path === '/topdoo-docs' ||
        path === '/developer-tai-lieu' ||
        path === '/tai-lieu' ||
        path === '/docs' ||
        window.location.hash === '#topdoo-developer-docs' ||
        window.location.hash === '#developer-docs' ||
        window.location.hash === '#topdoo-docs' ||
        window.location.hash === '#docs' ||
        window.location.hash === '#tai-lieu'
      ) {
        setMarketingRoute('topdoo-developer-docs');
      } else if (
        path === '/topdoo-developer-api-keys' ||
        path === '/developer-api-keys' ||
        path === '/topdoo-api-keys' ||
        path === '/quan-ly-api-key' ||
        path === '/api-keys' ||
        path === '/keys' ||
        window.location.hash === '#topdoo-developer-api-keys' ||
        window.location.hash === '#developer-api-keys' ||
        window.location.hash === '#topdoo-api-keys' ||
        window.location.hash === '#quan-ly-api-key' ||
        window.location.hash === '#api-keys'
      ) {
        setMarketingRoute('topdoo-developer-api-keys');
      } else if (
        path === '/topdoo-developer-billing' ||
        path === '/developer-billing' ||
        path === '/topdoo-billing' ||
        path === '/thanh-toan' ||
        path === '/developer-thanh-toan' ||
        path === '/billing' ||
        window.location.hash === '#topdoo-developer-billing' ||
        window.location.hash === '#developer-billing' ||
        window.location.hash === '#topdoo-billing' ||
        window.location.hash === '#thanh-toan' ||
        window.location.hash === '#billing'
      ) {
        setMarketingRoute('topdoo-developer-billing');
      } else if (
        path === '/topdoo-developer-support' ||
        path === '/developer-support' ||
        path === '/topdoo-support' ||
        path === '/ho-tro' ||
        path === '/developer-ho-tro' ||
        path === '/support' ||
        window.location.hash === '#topdoo-developer-support' ||
        window.location.hash === '#developer-support' ||
        window.location.hash === '#topdoo-support' ||
        window.location.hash === '#ho-tro' ||
        window.location.hash === '#support'
      ) {
        setMarketingRoute('topdoo-developer-support');
      } else if (
        path === '/topdoo-developer-notifications' ||
        path === '/developer-notifications' ||
        path === '/topdoo-notifications' ||
        path === '/thong-bao' ||
        path === '/developer-thong-bao' ||
        path === '/notifications' ||
        window.location.hash === '#topdoo-developer-notifications' ||
        window.location.hash === '#developer-notifications' ||
        window.location.hash === '#topdoo-notifications' ||
        window.location.hash === '#thong-bao' ||
        window.location.hash === '#notifications'
      ) {
        setMarketingRoute('topdoo-developer-notifications');
      } else if (
        path === '/topdoo-developer-appearance' ||
        path === '/developer-appearance' ||
        path === '/topdoo-appearance' ||
        path === '/cai-dat-giao-dien' ||
        path === '/giao-dien' ||
        path === '/developer-giao-dien' ||
        path === '/appearance' ||
        window.location.hash === '#topdoo-developer-appearance' ||
        window.location.hash === '#developer-appearance' ||
        window.location.hash === '#cai-dat-giao-dien' ||
        window.location.hash === '#giao-dien' ||
        window.location.hash === '#appearance'
      ) {
        setMarketingRoute('topdoo-developer-appearance');
      } else if (
        path === '/topdoo-developer-integrations' ||
        path === '/developer-integrations' ||
        path === '/cai-dat-tich-hop' ||
        path === '/tich-hop' ||
        path === '/integrations' ||
        window.location.hash === '#topdoo-developer-integrations' ||
        window.location.hash === '#developer-integrations' ||
        window.location.hash === '#cai-dat-tich-hop' ||
        window.location.hash === '#tich-hop' ||
        window.location.hash === '#integrations'
      ) {
        setMarketingRoute('topdoo-developer-integrations');
      } else if (
        path === '/topdoo-developer-language' ||
        path === '/developer-language' ||
        path === '/cai-dat-ngon-ngu' ||
        path === '/ngon-ngu' ||
        path === '/language' ||
        window.location.hash === '#topdoo-developer-language' ||
        window.location.hash === '#developer-language' ||
        window.location.hash === '#cai-dat-ngon-ngu' ||
        window.location.hash === '#ngon-ngu' ||
        window.location.hash === '#language'
      ) {
        setMarketingRoute('topdoo-developer-language');
      } else if (
        path === '/topdoo-developer-security' ||
        path === '/developer-security' ||
        path === '/topdoo-security-settings' ||
        path === '/cai-dat-bao-mat' ||
        path === '/bao-mat' ||
        window.location.hash === '#topdoo-developer-security' ||
        window.location.hash === '#developer-security' ||
        window.location.hash === '#cai-dat-bao-mat' ||
        window.location.hash === '#bao-mat'
      ) {
        setMarketingRoute('topdoo-developer-security');
      } else if (
        path === '/topdoo-developer-settings' ||
        path === '/developer-settings' ||
        path === '/topdoo-settings' ||
        path === '/cai-dat' ||
        path === '/developer-cai-dat' ||
        path === '/settings' ||
        window.location.hash === '#topdoo-developer-settings' ||
        window.location.hash === '#developer-settings' ||
        window.location.hash === '#topdoo-settings' ||
        window.location.hash === '#cai-dat' ||
        window.location.hash === '#settings'
      ) {
        setMarketingRoute('topdoo-developer-settings');
      } else {
        setMarketingRoute('home');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const search = new URLSearchParams(window.location.search);
      const v = search.get('view');
      if (v) return v;
    }
    return 'overview';
  });
  const [activeEntityId, setActiveEntityId] = useState('ent-1'); // Default to a high-profile entity
  const [selectedReportId, setSelectedReportId] = useState('REP-2026-8921');
  const [selectedEvidenceId, setSelectedEvidenceId] = useState('evi-1');

  // Sidebar expanded / collapsed
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ─── Toast Notifications ──────────────────────────────────────
  const [toast, setToast] = useState(null);
  const showToast = useCallback((title, message, type = 'info') => {
    setToast({ title, message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  }, []);

  // ─── Hybrid Auth & RBAC (M10) ──────────────────────────────────
  const [user, setUser] = useState(() => getStoredSession());
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [userRole, setUserRole] = useState(() => {
    const sess = getStoredSession();
    if (!sess) return null;
    return (sess?.role && Object.values(ROLES).includes(sess.role)) ? sess.role : ROLES.USER;
  });

  // Marketing Auth Modal state (Login / Register popup)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'register'

  const openAuthModal = useCallback((modalMode = 'login') => {
    if (user) {
      showToast('Đã đăng nhập', `Bạn đang đăng nhập với tài khoản ${user.fullName || user.email}!`, 'info');
      return;
    }
    setAuthModalMode(modalMode);
    setIsAuthModalOpen(true);
  }, [user, showToast]);

  const closeAuthModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  // Credit & Top-up Modal state
  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const openCreditModal = useCallback(() => setIsCreditModalOpen(true), []);
  const closeCreditModal = useCallback(() => setIsCreditModalOpen(false), []);

  // ─── Multi-tenant Workspace & Projects (M9) ───────────────────
  const [workspaces, setWorkspaces] = useState(initialWorkspaces);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState('ws-1');

  const currentWorkspace = useMemo(() => {
    return workspaces.find(w => w.id === currentWorkspaceId) || workspaces[0];
  }, [workspaces, currentWorkspaceId]);

  const switchWorkspace = (wsId) => {
    setCurrentWorkspaceId(wsId);
    const ws = workspaces.find(w => w.id === wsId);
    showToast('Chuyển đổi Không gian làm việc', `Đã chuyển sang: ${ws?.name || wsId}`, 'info');
  };

  const addProjectToCurrentWorkspace = (projectData) => {
    const newProj = createNewProject(currentWorkspaceId, projectData);
    setWorkspaces(prev => prev.map(w => {
      if (w.id === currentWorkspaceId) {
        return { ...w, projects: [newProj, ...w.projects] };
      }
      return w;
    }));
    showToast('Tạo dự án mới thành công', `Dự án "${newProj.name}" đã được thêm vào Workspace.`, 'success');
    return newProj;
  };

  const canPerform = useCallback((permission) => {
    if (!user || !userRole) return false;
    return hasPermission(userRole, permission);
  }, [user, userRole]);

  // ─── Phase 2: AI Gateway, Billing & Admin Operations (M1, M11, M12) ──
  const [creditBalance, setCreditBalance] = useState(() => {
    if (typeof window !== 'undefined') {
      const sess = getStoredSession();
      if (!sess) return 0; // Chưa đăng nhập thì 0 credit
      
      const saved = localStorage.getItem(`topdoo_credit_balance_${sess.id}`);
      if (saved && !isNaN(Number(saved))) return Number(saved);

      // Cấp credit mặc định dựa theo role
      if (sess.role === ROLES.OWNER || sess.role === ROLES.ADMIN) return 50000;
      if (sess.role === ROLES.SECURITY_ANALYST || sess.role === ROLES.DEVELOPER) return 5000;
      return 1000;
    }
    return 0;
  });
  const [creditTransactions, setCreditTransactions] = useState(initialTransactions);
  const [activeSubscription, setActiveSubscription] = useState(() => {
    const sess = getStoredSession();
    if (!sess) return 'free';
    if (sess.role === ROLES.OWNER || sess.role === ROLES.ADMIN) return 'enterprise';
    if (sess.role === ROLES.SECURITY_ANALYST || sess.role === ROLES.DEVELOPER) return 'pro';
    return 'free';
  });

  const [appeals, setAppeals] = useState(initialAppeals);
  const [sloMetrics, setSloMetrics] = useState(initialSloMetrics);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!user) {
        setCreditBalance(0);
        setActiveSubscription('free');
      } else {
        // Cập nhật subscription tương ứng với role
        if (userRole === ROLES.OWNER || userRole === ROLES.ADMIN) {
          setActiveSubscription('enterprise');
        } else if (userRole === ROLES.SECURITY_ANALYST || userRole === ROLES.DEVELOPER) {
          setActiveSubscription('pro');
        } else {
          setActiveSubscription('free');
        }

        const saved = localStorage.getItem(`topdoo_credit_balance_${user.id}`);
        if (saved !== null && !isNaN(Number(saved))) {
          setCreditBalance(Number(saved));
        } else {
          // Chưa có balance lưu, cấp mặc định theo role
          let initialBalance = 1000;
          if (userRole === ROLES.OWNER || userRole === ROLES.ADMIN) {
            initialBalance = 50000;
          } else if (userRole === ROLES.SECURITY_ANALYST || userRole === ROLES.DEVELOPER) {
            initialBalance = 5000;
          }
          setCreditBalance(initialBalance);
          localStorage.setItem(`topdoo_credit_balance_${user.id}`, String(initialBalance));
        }
      }
    }
  }, [user, userRole]);

  useEffect(() => {
    if (user && typeof window !== 'undefined') {
      localStorage.setItem(`topdoo_credit_balance_${user.id}`, String(creditBalance));
    }
  }, [creditBalance, user]);

  // 9Router Gateway Integration State
  const [nineRouterConfig, setNineRouterConfig] = useState(get9RouterConfig);
  const [nineRouterHealth, setNineRouterHealth] = useState({ isOnline: false, checking: true });

  const refresh9RouterHealth = useCallback(async () => {
    setNineRouterHealth(prev => ({ ...prev, checking: true }));
    const health = await check9RouterHealth();
    setNineRouterHealth({ ...health, checking: false });
    return health;
  }, []);

  useEffect(() => {
    refresh9RouterHealth();
    const interval = setInterval(refresh9RouterHealth, 30000);
    return () => clearInterval(interval);
  }, [refresh9RouterHealth]);

  const update9RouterSettings = (newConfig) => {
    save9RouterConfig(newConfig);
    setNineRouterConfig(get9RouterConfig());
    refresh9RouterHealth();
    showToast('Cấu hình 9Router', 'Đã lưu cài đặt 9Router Gateway thành công.', 'success');
  };

  // ─── Voicebox AI Studio Gateway State (Voice Cloning & TTS) ───
  const [voiceboxConfig, setVoiceboxConfig] = useState(getVoiceboxConfig);
  const [voiceboxHealth, setVoiceboxHealth] = useState({ isOnline: false, checking: true });
  const [voiceProfiles, setVoiceProfiles] = useState(getVoiceProfiles);
  const [activeVoiceProfile, setActiveVoiceProfile] = useState(() => getVoiceProfiles()[0]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const refreshVoiceboxHealth = useCallback(async () => {
    setVoiceboxHealth(prev => ({ ...prev, checking: true }));
    const health = await checkVoiceboxHealth();
    setVoiceboxHealth({ ...health, checking: false });
    return health;
  }, []);

  useEffect(() => {
    refreshVoiceboxHealth();
    const interval = setInterval(refreshVoiceboxHealth, 30000);
    return () => clearInterval(interval);
  }, [refreshVoiceboxHealth]);

  const updateVoiceboxSettings = (newConfig) => {
    saveVoiceboxConfig(newConfig);
    setVoiceboxConfig(getVoiceboxConfig());
    refreshVoiceboxHealth();
    showToast('Cấu hình Voicebox', 'Đã lưu cấu hình Voicebox Gateway thành công.', 'success');
  };

  const generateVoiceSpeech = async ({ text, profileId, speed = 1.0, pitch = 1.0 }) => {
    const cost = 5;
    if (creditBalance < cost) {
      showToast('Hết Credit', `Bạn cần tối thiểu ${cost} credits để sinh giọng đọc Voicebox.`, 'danger');
      return { success: false, error: 'Insufficient credits' };
    }

    setIsSpeaking(true);
    const result = await synthesizeSpeech({
      text,
      profileId: profileId || activeVoiceProfile?.id || 'kokoro-vi-huyen',
      speed,
      pitch
    });

    if (result.success) {
      deductCredits(cost, 'STUDIO_GENERATION', `Sinh giọng đọc Topdoo AI (${result.profile?.name})`);
      showToast('Topdoo AI Voice', `Đã sinh giọng thành công cho ${result.profile?.name}! (-${cost} credits)`, 'success');

      if (typeof window !== 'undefined' && window.__topdooCurrentAudio) {
        window.__topdooCurrentAudio.onended = () => setIsSpeaking(false);
        window.__topdooCurrentAudio.onpause = () => setIsSpeaking(false);
      } else {
        setTimeout(() => setIsSpeaking(false), (result.durationSec || 3) * 1000);
      }
    } else {
      setIsSpeaking(false);
      showToast('Lỗi âm thanh', result.error || 'Không thể tạo âm thanh.', 'warning');
    }
    return result;
  };

  const cloneVoice = async ({ voiceName, sampleAudioBlob, description, gender }) => {
    const cost = 20;
    if (creditBalance < cost) {
      showToast('Hết Credit', `Bạn cần tối thiểu ${cost} credits để nhân bản giọng mới.`, 'danger');
      return { success: false, error: 'Insufficient credits' };
    }

    showToast('Voicebox Cloning', 'Đang phân tích âm sắc và nhân bản giọng nói AI...', 'info');
    const result = await cloneVoiceProfile({ voiceName, sampleAudioBlobOrFile: sampleAudioBlob, description, gender });
    if (result.success) {
      const updated = getVoiceProfiles();
      setVoiceProfiles(updated);
      setActiveVoiceProfile(result.profile);
      deductCredits(cost, 'STUDIO_GENERATION', `Zero-shot Voice Clone: ${result.profile.name}`);
      showToast('Thành công', `Đã nhân bản giọng "${result.profile.name}"! (-${cost} credits)`, 'success');
    }
    return result;
  };

  const stopVoiceSpeech = () => {
    stopAllSpeech();
    setIsSpeaking(false);
  };

  const sendAiPrompt = async (prompt, requestedModelId, options = {}) => {
    const estCredits = calculatePromptCredits(requestedModelId, prompt);
    if (creditBalance < estCredits) {
      showToast(
        'Số dư Credit không đủ',
        `Bạn cần ít nhất ${estCredits} credits để thực thi prompt với mô hình này. Vui lòng nạp thêm credit!`,
        'danger'
      );
      return {
        error: true,
        message: 'Insufficient credits',
        content: '⚠️ Số dư AI Credit của bạn hiện không đủ để chạy truy vấn này. Vui lòng nạp thêm credit để tiếp tục sử dụng!'
      };
    }

    const result = await executeAiPrompt(prompt, requestedModelId, options);

    const deduction = processCreditDeduction(
      creditBalance,
      creditTransactions,
      result.metrics.creditsDeducted,
      'AI_PROMPT',
      `Thực thi truy vấn ${result.model.name}`,
      result.model.name
    );

    setCreditBalance(deduction.newBalance);
    setCreditTransactions(deduction.newTransactions);

    if (result.isFallback) {
      showToast(
        'Tự động Fallback Model',
        result.fallbackReason || 'Hệ thống đã tự động định tuyến sang model dự phòng để đảm bảo độ trễ tối ưu.',
        'warning'
      );
    }

    return result;
  };

  const deductCredits = (amount, type = 'USAGE', description = '') => {
    const deduction = processCreditDeduction(creditBalance, creditTransactions, amount, type, description);
    setCreditBalance(deduction.newBalance);
    setCreditTransactions(deduction.newTransactions);
    return deduction;
  };

  const addCredits = (amount, packageName = 'Nạp gói bổ sung') => {
    const topUp = processCreditTopUp(creditBalance, creditTransactions, amount, packageName);
    setCreditBalance(topUp.newBalance);
    setCreditTransactions(topUp.newTransactions);
    showToast('Nạp Credit thành công', `Đã cộng thêm +${amount.toLocaleString()} credits vào tài khoản.`, 'success');
  };

  const handleAppealDecision = (appealId, decision, notes = '') => {
    if (!canPerform(PERMISSIONS.REVIEW_REPORTS)) {
      showToast(
        'Từ chối truy cập',
        `Vai trò "${getRoleMeta(userRole).label}" không có quyền duyệt kháng nghị lừa đảo. Cần quyền Security Analyst, Admin hoặc Owner.`,
        'danger'
      );
      return false;
    }

    const reviewerLabel = `You (${getRoleMeta(userRole).label})`;
    const updated = processAppealResolution(appeals, appealId, decision, reviewerLabel, notes);
    setAppeals(updated);

    const isApprove = decision === 'approve';
    showToast(
      isApprove ? 'Chấp thuận kháng nghị' : 'Từ chối kháng nghị',
      `Đã cập nhật trạng thái đơn ${appealId} thành ${isApprove ? 'APPROVED (Đã gỡ nhãn)' : 'REJECTED (Bác bỏ)'}.`,
      isApprove ? 'success' : 'info'
    );
    return true;
  };

  // ─── Phase 3: Studio, Tools, Academy & Community (M2, M3, M7, M8) ───
  const [studioProjects, setStudioProjects] = useState(initialStudioProjects);
  const [aiTools, setAiTools] = useState(INITIAL_AI_TOOLS);
  const [academyCourses, setAcademyCourses] = useState(INITIAL_ACADEMY_COURSES);
  const [communityPosts, setCommunityPosts] = useState(INITIAL_COMMUNITY_POSTS);

  const enrollCourse = (courseId) => {
    setAcademyCourses(prev => prev.map(c => c.id === courseId ? { ...c, isEnrolled: true, progressPercent: 10 } : c));
    showToast('Ghi danh thành công', 'Bạn đã ghi danh vào khóa học mới.', 'success');
  };

  const createCommunityPost = (postData) => {
    setCommunityPosts(prev => [postData, ...prev]);
    showToast('Đăng bài thành công', 'Bài viết của bạn đã được chia sẻ đến cộng đồng Topdoo.', 'success');
  };

  // Entities & Intelligence Data
  const [entities, setEntities] = useState(initialEntities);
  const [reports, setReports] = useState(initialReports);
  const [evidenceList, setEvidenceList] = useState(initialEvidence);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [monitoringEvents, setMonitoringEvents] = useState(initialMonitoringEvents);
  const [watchlistRules, setWatchlistRules] = useState(initialWatchlistRules);
  const [apiKeys, setApiKeys] = useState(initialApiKeys);
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);


  // Quick Check state
  const [quickCheckQuery, setQuickCheckQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [quickCheckResult, setQuickCheckResult] = useState(null);

  const scanStages = [
    { title: 'Initializing heuristic engines', desc: 'Validating payload syntax and structure...' },
    { title: 'Checking centralized scam database', desc: 'Querying 1.4M+ flagged malicious entities...' },
    { title: 'Analyzing reputation & age', desc: 'Examining WHOIS, ASN ownership, and historical telemetry...' },
    { title: 'Checking phishing indicators', desc: 'Running brand impersonation & credential interception checks...' },
    { title: 'Checking scam network graph', desc: 'Correlating shared IPs, wallets, registrar IDs and servers...' },
    { title: 'Calculating multi-factor risk score', desc: 'Weighting report history and evidence confidence...' },
    { title: 'Generating security intelligence report', desc: 'Finalizing actionable remediation guidelines...' }
  ];

  // Record Live Scan Result into Console Entities, Monitoring & Alerts
  const recordScanToConsole = useCallback((scanResult) => {
    if (!scanResult || !scanResult.target) return;
    const cleanTarget = scanResult.target.trim();

    setEntities(prev => {
      const exists = prev.find(e => e.identifier.toLowerCase() === cleanTarget.toLowerCase());
      if (exists) {
        return prev.map(e => e.id === exists.id ? { ...e, lastSeen: 'Vừa xong' } : e);
      }

      const riskScore = scanResult.score !== undefined ? (100 - scanResult.score) : 80;
      const isDangerous = scanResult.status === 'danger';
      const isBank = cleanTarget.replace(/[^0-9]/g, '').length >= 8;
      const isPhone = /^0[0-9]{9}$/.test(cleanTarget.replace(/[^0-9]/g, ''));

      let entityType = 'domain';
      if (scanResult.type === 'checkscam') {
        entityType = isPhone ? 'phone' : 'bank';
      } else if (scanResult.type === 'ip') {
        entityType = 'server';
      } else if (scanResult.type === 'breach') {
        entityType = 'email';
      }

      const newEntity = {
        id: `ent-scan-${Date.now()}`,
        identifier: cleanTarget,
        type: entityType,
        name: scanResult.statusLabel || `${cleanTarget} (Mục tiêu quét)`,
        riskScore: riskScore,
        status: isDangerous ? 'Đã xác nhận Nguy hiểm / Cảnh báo' : (scanResult.status === 'warning' ? 'Cần cảnh giác / Rủi ro vừa' : 'An toàn / Đã kiểm tra'),
        targetBrand: scanResult.scamData?.bankName || scanResult.scamData?.carrier || scanResult.detectedEntity || 'Hạ tầng kiểm tra',
        category: scanResult.scamData?.scamType || (scanResult.type === 'checkscam' ? 'Tra cứu CheckScam' : 'Kiểm tra an ninh trực tiếp'),
        createdAt: new Date().toISOString().split('T')[0],
        lastSeen: 'Vừa xong',
        reportsCount: scanResult.scamData?.reportCount || (isDangerous ? 6 : 0),
        evidenceCount: isDangerous ? 2 : 1,
        watchlist: isDangerous,
        country: 'VN',
        summary: scanResult.summary || 'Đối tượng được phân tích qua bộ công cụ quét thời gian thực Topdoo Security.',
        riskFactors: [
          { name: 'Đánh giá AI Engine', score: Math.round(riskScore * 0.4), max: 40, status: isDangerous ? 'Critical' : 'Clean', desc: scanResult.summary || 'Đã phân tích kỹ thuật' },
          { name: 'Cơ sở dữ liệu Đen', score: Math.round(riskScore * 0.3), max: 30, status: isDangerous ? 'High' : 'Clean', desc: scanResult.statusLabel || 'Chỉ số tín nhiệm' }
        ],
        relatedEntityIds: []
      };

      return [newEntity, ...prev];
    });

    // Add Live Monitoring Event
    setMonitoringEvents(prev => [
      {
        id: `MON-${Date.now()}`,
        timestamp: 'Vừa xong',
        entityId: `ent-scan-${Date.now()}`,
        entityIdentifier: cleanTarget,
        entityType: scanResult.type,
        event: 'Phiên quét an ninh thời gian thực',
        change: `Điểm an toàn: ${scanResult.score}/100 (${scanResult.statusLabel})`,
        severity: scanResult.status === 'danger' ? 'Critical' : (scanResult.status === 'warning' ? 'High' : 'Safe'),
        rule: 'Giám sát trực tiếp người dùng'
      },
      ...prev
    ]);

    // If danger, add Alert
    if (scanResult.status === 'danger') {
      setAlerts(prev => [
        {
          id: `ALT-${Date.now().toString().slice(-4)}`,
          severity: 'Critical',
          title: `Cảnh báo đối tượng độc hại: ${cleanTarget}`,
          entityId: `ent-scan-${Date.now()}`,
          entityIdentifier: cleanTarget,
          entityType: scanResult.type,
          reason: scanResult.summary || 'Phát hiện dấu hiệu lừa đảo qua công cụ quét an ninh Topdoo.',
          timestamp: 'Vừa xong',
          status: 'Unresolved',
          category: 'Phát hiện Trực tiếp',
          details: scanResult.recommendation || 'Đã ghi nhận vào danh sách cảnh báo cần xử lý khẩn cấp.'
        },
        ...prev
      ]);
    }
  }, []);

  // Quick Check runner with Real Security Engine
  const runQuickCheck = async (query) => {
    const cleanQuery = (query || '').trim();
    if (!cleanQuery) return;

    setQuickCheckQuery(cleanQuery);
    setIsScanning(true);
    setScanStepIndex(0);
    setQuickCheckResult(null);

    // Switch view to quick-check in app mode
    setMode('app');
    setCurrentView('quick-check');

    // Progressive scanner animation
    const intervalTime = 300;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep < scanStages.length - 1) {
        setScanStepIndex(currentStep);
      }
    }, intervalTime);

    try {
      // Determine target type and call real scanner
      const cleanDigits = cleanQuery.replace(/[^0-9]/g, '');
      const isBankOrPhone = (cleanDigits.length >= 8 && cleanDigits.length <= 16 && !cleanQuery.includes('.')) || (/^0[0-9]{9}$/.test(cleanDigits));
      const isIp = /^(\d{1,3}\.){3}\d{1,3}$/.test(cleanQuery);
      const isEmail = cleanQuery.includes('@');

      let scanRes = null;
      if (isBankOrPhone) {
        scanRes = await scanLiveCheckScam(cleanQuery);
      } else if (isIp) {
        scanRes = await scanLiveIpServer(cleanQuery);
      } else if (isEmail) {
        scanRes = await scanLiveBreachEmail(cleanQuery);
      } else {
        scanRes = await scanLiveWebsite(cleanQuery);
      }

      clearInterval(timer);
      setIsScanning(false);
      setScanStepIndex(scanStages.length - 1);

      // Record result into console
      recordScanToConsole(scanRes);

      // Map scanRes to active entity for display in QuickCheckView
      const riskScore = scanRes.score !== undefined ? (100 - scanRes.score) : 80;
      const isDangerous = scanRes.status === 'danger';
      const entityResult = {
        id: `ent-synth-${Date.now()}`,
        identifier: cleanQuery,
        type: isBankOrPhone ? 'bank' : (isIp ? 'server' : (isEmail ? 'email' : 'domain')),
        name: scanRes.statusLabel || cleanQuery,
        riskScore: riskScore,
        status: isDangerous ? 'Đã xác nhận Nguy hiểm / Cảnh báo' : (scanRes.status === 'warning' ? 'Cần cảnh giác / Rủi ro vừa' : 'An toàn / Đã kiểm tra'),
        targetBrand: scanRes.scamData?.bankName || scanRes.scamData?.carrier || scanRes.detectedEntity || 'Hạ tầng kiểm tra',
        category: scanRes.scamData?.scamType || (isBankOrPhone ? 'Tra cứu CheckScam' : 'Kiểm tra an ninh trực tiếp'),
        createdAt: new Date().toISOString().split('T')[0],
        lastSeen: 'Vừa xong',
        reportsCount: scanRes.scamData?.reportCount || (isDangerous ? 6 : 0),
        evidenceCount: isDangerous ? 2 : 1,
        watchlist: isDangerous,
        country: 'VN',
        summary: scanRes.summary || 'Đối tượng được phân tích qua bộ công cụ quét thời gian thực Topdoo Security.',
        riskFactors: [
          { name: 'Đánh giá AI Engine', score: Math.round(riskScore * 0.4), max: 40, status: isDangerous ? 'Critical' : 'Clean', desc: scanRes.summary || 'Đã phân tích kỹ thuật' },
          { name: 'Cơ sở dữ liệu Đen', score: Math.round(riskScore * 0.3), max: 30, status: isDangerous ? 'High' : 'Clean', desc: scanRes.statusLabel || 'Chỉ số tín nhiệm' }
        ],
        relatedEntityIds: ['ent-1'],
        rawScanResult: scanRes
      };

      setQuickCheckResult(entityResult);
      setActiveEntityId(entityResult.id);
    } catch (err) {
      clearInterval(timer);
      setIsScanning(false);
      showToast('Lỗi phân tích', err.message || 'Không thể quét đối tượng này', 'error');
    }
  };

  // Entity navigation helper
  const navigateToEntity = (entityId, targetTab = 'overview') => {
    setActiveEntityId(entityId);
    setMode('app');
    setCurrentView('entity-profile');
  };

  // Toggle Watchlist
  const toggleWatchlist = (entityId) => {
    setEntities(prev =>
      prev.map(e => {
        if (e.id === entityId) {
          const newState = !e.watchlist;
          showToast(
            newState ? 'Added to Watchlist' : 'Removed from Watchlist',
            `${e.identifier} is ${newState ? 'now actively monitored for risk changes.' : 'no longer being tracked in your watchlist.'}`,
            newState ? 'success' : 'info'
          );
          return { ...e, watchlist: newState };
        }
        return e;
      })
    );
  };

  // Submit new scam report
  const submitNewReport = (formData) => {
    const newReportId = `REP-2026-${Math.floor(Math.random() * 8999 + 1000)}`;
    const newEntityId = `ent-usr-${Date.now()}`;

    // Create entity if not existing
    let targetEntity = entities.find(e => e.identifier.toLowerCase() === formData.identifier.toLowerCase());

    if (!targetEntity) {
      targetEntity = {
        id: newEntityId,
        identifier: formData.identifier,
        type: formData.type || 'url',
        name: `${formData.identifier} (Community Reported)`,
        riskScore: 78,
        status: 'Under Investigation',
        targetBrand: formData.targetBrand || 'Target Impersonated Brand',
        category: formData.category || 'Phishing / Fraud',
        createdAt: new Date().toISOString().split('T')[0],
        lastSeen: 'Just now',
        reportsCount: 1,
        evidenceCount: formData.evidenceFiles?.length || 1,
        watchlist: true,
        country: 'US',
        ip: '198.51.100.12',
        asn: 'AS-Pending Lookup',
        summary: formData.description || 'Community scam report filed via Topdoo Security Wizard.',
        riskFactors: [
          { name: 'Report History', score: 26, max: 35, status: 'High', desc: 'Direct victim report with evidence uploaded.' },
          { name: 'Phishing Indicators', score: 24, max: 30, status: 'High', desc: 'Reported brand impersonation and fake claims.' },
          { name: 'Network Connections', score: 14, max: 20, status: 'Moderate', desc: 'Preliminary cluster clustering in progress.' },
          { name: 'Domain Reputation', score: 14, max: 15, status: 'High', desc: 'Unverified source.' }
        ],
        relatedEntityIds: ['ent-1']
      };
      setEntities(prev => [targetEntity, ...prev]);
    } else {
      setEntities(prev =>
        prev.map(e => e.id === targetEntity.id ? { ...e, reportsCount: e.reportsCount + 1 } : e)
      );
    }

    const newReport = {
      id: newReportId,
      entityId: targetEntity.id,
      entityIdentifier: targetEntity.identifier,
      entityType: targetEntity.type,
      category: formData.category || 'Phishing',
      riskLevel: 'High',
      riskScore: targetEntity.riskScore,
      status: 'Submitted',
      submittedBy: formData.email || 'investigator@topdoo-community.io',
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      lossReported: formData.lossAmount || '$0.00 USD',
      title: formData.title || `Report on ${formData.identifier}`,
      description: formData.description || 'Scam description provided during report intake.',
      evidenceIds: [],
      reviewer: 'Unassigned (In Triage)',
      reviewedAt: null,
      reviewerNotes: 'New community submission queued for automated sandbox and analyst verification.',
      timeline: [
        { date: 'Just now', event: 'Report successfully submitted to TOPDOO intake queue' }
      ]
    };

    setReports(prev => [newReport, ...prev]);

    // Create an alert
    const newAlert = {
      id: `ALT-${Math.floor(Math.random() * 899 + 1100)}`,
      severity: 'High',
      title: `New Scam Report Filed: ${targetEntity.identifier}`,
      entityId: targetEntity.id,
      entityIdentifier: targetEntity.identifier,
      entityType: targetEntity.type,
      reason: `User report submitted for ${formData.category || 'Suspicious Activity'}.`,
      timestamp: 'Just now',
      status: 'Unresolved',
      category: 'User Report',
      details: formData.description || 'Review pending in verification center.'
    };
    setAlerts(prev => [newAlert, ...prev]);

    // Add monitoring event
    const newEvent = {
      id: `MON-${Math.floor(Math.random() * 899 + 910)}`,
      timestamp: 'Just now',
      entityId: targetEntity.id,
      entityIdentifier: targetEntity.identifier,
      entityType: targetEntity.type,
      event: 'New Incident Report Intake',
      change: `Report ${newReportId} registered`,
      severity: 'High',
      rule: 'Community Intake Hook'
    };
    setMonitoringEvents(prev => [newEvent, ...prev]);

    showToast(
      'Report Submitted Successfully',
      `Report ${newReportId} has been created and assigned to the verification queue.`,
      'success'
    );

    return newReportId;
  };

  // Verification actions (Gated by RBAC)
  const verifyReport = (reportId, approved = true, notes = '') => {
    if (!canPerform(PERMISSIONS.VERIFY_REPORT)) {
      showToast(
        'Từ chối quyền truy cập (RBAC)',
        `Vai trò "${getRoleMeta(userRole).label}" không có quyền duyệt báo cáo rủi ro. Chỉ Security Analyst, Admin hoặc Owner mới có quyền.`,
        'warning'
      );
      return;
    }

    setReports(prev =>
      prev.map(r => {
        if (r.id === reportId) {
          const updatedStatus = approved ? 'Verified' : 'Rejected';
          return {
            ...r,
            status: updatedStatus,
            reviewer: `You (${getRoleMeta(userRole).label})`,
            reviewedAt: 'Just now',
            reviewerNotes: notes || (approved ? 'Verified against cryptographic and network evidence.' : 'Insufficient proof provided; rejected upon manual audit.')
          };
        }
        return r;
      })
    );
    showToast(
      approved ? 'Report Verified' : 'Report Rejected',
      `Report ${reportId} has been marked as ${approved ? 'VERIFIED' : 'REJECTED'} by ${getRoleMeta(userRole).label}.`,
      approved ? 'success' : 'warning'
    );
  };

  // Alerts actions
  const resolveAlert = (alertId) => {
    setAlerts(prev =>
      prev.map(a => a.id === alertId ? { ...a, status: 'Resolved' } : a)
    );
    showToast('Alert Resolved', `Alert ${alertId} has been marked as resolved.`, 'info');
  };

  // API Key generation
  const createApiKey = (name, permissions) => {
    const newKey = {
      id: `key-${Date.now()}`,
      name: name || 'Custom Integration Key',
      key: `topdoo_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 10)}`,
      created: new Date().toISOString().split('T')[0],
      lastUsed: 'Never',
      permissions: permissions || 'query:quickcheck, read:intelligence',
      status: 'Active',
      requestsToday: 0
    };
    setApiKeys(prev => [newKey, ...prev]);
    showToast('API Key Generated', 'New credential has been created and active.', 'success');
  };

  // Revoke API Key
  const revokeApiKey = (keyId) => {
    setApiKeys(prev => prev.filter(k => k.id !== keyId));
    showToast('API Key Revoked', 'The selected API key has been deleted.', 'warning');
  };

  // Global search calculations
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  // ─── Hybrid Auth (Local Engine + Supabase Cloud) ───────────

  useEffect(() => {
    // 1. Kiểm tra Supabase session nếu có kết nối
    if (supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const u = {
            id: session.user.id,
            email: session.user.email,
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            role: session.user.user_metadata?.role || 'USER',
            avatarUrl: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            authProvider: 'supabase'
          };
          setUser(u);
          storeSession(u);
          if (u.role && Object.values(ROLES).includes(u.role)) {
            setUserRole(u.role);
          }
        }
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          const u = {
            id: session.user.id,
            email: session.user.email,
            fullName: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            role: session.user.user_metadata?.role || 'USER',
            avatarUrl: session.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            authProvider: 'supabase'
          };
          setUser(u);
          storeSession(u);
          if (u.role && Object.values(ROLES).includes(u.role)) {
            setUserRole(u.role);
          }
        } else if (_event === 'SIGNED_OUT') {
          setUser(null);
          removeStoredSession();
        }
      });
      return () => subscription.unsubscribe();
    } else {
      // 2. Local Session Recovery
      const localSess = getStoredSession();
      if (localSess) {
        setUser(localSess);
        if (localSess.role && Object.values(ROLES).includes(localSess.role)) {
          setUserRole(localSess.role);
        }
      }
    }
  }, [ROLES]);

  const signUp = useCallback(async (email, password, fullName = '') => {
    setAuthError(null);
    setAuthLoading(true);

    // Lưu dự phòng cục bộ để người dùng luôn có thể đăng nhập ngay lập tức
    const localResult = localSignUp(email, password, fullName);

    // Thử qua Supabase nếu có cấu hình
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, role: 'USER' } }
        });
        if (!error && data?.user) {
          const sessionUser = {
            id: data.user.id,
            email: data.user.email,
            fullName: fullName || data.user.email?.split('@')[0],
            role: 'USER',
            avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${data.user.email}`,
            authProvider: 'supabase'
          };
          setUser(sessionUser);
          storeSession(sessionUser);
          if (!data.session) {
            showToast('Đăng ký thành công', 'Chào mừng bạn! (Mẹo: Có thể tắt "Confirm email" trong Supabase Auth để đăng nhập ngay mà không cần chờ mail xác thực).', 'success');
          } else {
            showToast('Đăng ký thành công', 'Chào mừng bạn đến với Topdoo!', 'success');
          }
          closeAuthModal();
          setAuthLoading(false);
          return { data };
        }
        if (error) {
          console.warn('Supabase sign up notice:', error.message);
        }
      } catch (err) {
        console.warn('Supabase connection error:', err.message);
      }
    }

    setAuthLoading(false);
    if (localResult.error) {
      setAuthError(localResult.error.message);
      showToast('Đăng ký không thành công', localResult.error.message, 'warning');
      return localResult;
    }

    setUser(localResult.data.user);
    if (localResult.data.user.role && Object.values(ROLES).includes(localResult.data.user.role)) {
      setUserRole(localResult.data.user.role);
    }
    showToast('Đăng ký tài khoản thành công', `Chào mừng ${localResult.data.user.fullName} gia nhập Topdoo!`, 'success');
    closeAuthModal();
    return localResult;
  }, [ROLES, closeAuthModal, showToast]);

  const signIn = useCallback(async (email, password) => {
    setAuthError(null);
    setAuthLoading(true);

    // Thử qua Supabase trước nếu có cấu hình
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && data?.user) {
          const sessionUser = {
            id: data.user.id,
            email: data.user.email,
            fullName: data.user.user_metadata?.full_name || data.user.email?.split('@')[0],
            role: data.user.user_metadata?.role || 'USER',
            avatarUrl: data.user.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
            authProvider: 'supabase'
          };
          setUser(sessionUser);
          storeSession(sessionUser);
          if (sessionUser.role && Object.values(ROLES).includes(sessionUser.role)) {
            setUserRole(sessionUser.role);
          }
          showToast('Đăng nhập thành công', `Chào mừng trở lại, ${sessionUser.fullName}!`, 'success');
          closeAuthModal();
          setAuthLoading(false);
          return { data };
        }
        if (error) {
          console.warn('Supabase sign in notice:', error.message);
        }
      } catch (err) {
        console.warn('Supabase connection error, checking local credentials:', err.message);
      }
    }

    // Local Auth Engine fallback
    const result = localSignIn(email, password);
    setAuthLoading(false);
    if (result.error) {
      setAuthError(result.error.message);
      showToast('Đăng nhập không thành công', result.error.message, 'warning');
      return result;
    }

    setUser(result.data.user);
    if (result.data.user.role && Object.values(ROLES).includes(result.data.user.role)) {
      setUserRole(result.data.user.role);
    }
    showToast('Đăng nhập thành công', `Chào mừng trở lại, ${result.data.user.fullName}!`, 'success');
    closeAuthModal();
    return result;
  }, [ROLES, closeAuthModal, showToast]);

  const socialSignIn = useCallback(async (provider) => {
    setAuthLoading(true);
    setAuthError(null);
    const provLower = (provider || 'google').toLowerCase();
    const supabaseProvider = provLower === 'microsoft' ? 'azure' : provLower;

    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: supabaseProvider,
          options: {
            redirectTo: window.location.origin
          }
        });
        if (!error && data?.url) {
          // Chuyển hướng trình duyệt tới cổng OAuth của Google / Microsoft
          window.location.href = data.url;
          return { data };
        }
        if (error) {
          console.warn(`Supabase OAuth ${provider} notice:`, error.message);
        }
      } catch (err) {
        console.warn(`Supabase OAuth error:`, err.message);
      }
    }

    // Nếu Provider chưa kích hoạt trên Supabase Cloud thì dùng cơ chế thử nghiệm cục bộ
    const result = localSocialSignIn(provider);
    setAuthLoading(false);
    setUser(result.data.user);
    showToast(
      'Đăng nhập thử nghiệm',
      `Đã kết nối tài khoản demo ${provider.toUpperCase()} (Cần bật Provider trên Supabase Dashboard để liên kết tài khoản thực)!`,
      'info'
    );
    closeAuthModal();
    return result;
  }, [closeAuthModal, showToast]);

  const signOut = useCallback(async () => {
    if (supabase) {
      try { await supabase.auth.signOut(); } catch (_) {}
    }
    removeStoredSession();
    setUser(null);
    setUserRole(ROLES.USER);
    showToast('Đã đăng xuất', 'Hẹn gặp lại bạn sớm trên Topdoo!', 'info');
  }, [ROLES, showToast]);


  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase().trim();

    const matchedEntities = entities.filter(e =>
      e.identifier.toLowerCase().includes(q) ||
      e.name.toLowerCase().includes(q) ||
      (e.targetBrand && e.targetBrand.toLowerCase().includes(q)) ||
      (e.ip && e.ip.includes(q))
    );

    const matchedReports = reports.filter(r =>
      r.id.toLowerCase().includes(q) ||
      r.title.toLowerCase().includes(q) ||
      r.entityIdentifier.toLowerCase().includes(q)
    );

    const matchedEvidence = evidenceList.filter(ev =>
      ev.id.toLowerCase().includes(q) ||
      ev.title.toLowerCase().includes(q) ||
      ev.entityIdentifier.toLowerCase().includes(q)
    );

    const matchedAlerts = alerts.filter(a =>
      a.id.toLowerCase().includes(q) ||
      a.title.toLowerCase().includes(q) ||
      a.entityIdentifier.toLowerCase().includes(q)
    );

    return {
      entities: matchedEntities,
      reports: matchedReports,
      evidence: matchedEvidence,
      alerts: matchedAlerts,
      totalCount: matchedEntities.length + matchedReports.length + matchedEvidence.length + matchedAlerts.length
    };
  }, [searchQuery, entities, reports, evidenceList, alerts]);

  // Active Entity Object
  const activeEntity = useMemo(() => {
    return entities.find(e => e.id === activeEntityId) || entities[0];
  }, [entities, activeEntityId]);

  return (
    <SecurityContext.Provider
      value={{
        mode,
        setMode,
        marketingRoute,
        setMarketingRoute,
        navigateMarketing,
        currentView,
        setCurrentView,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileMenuOpen,
        setMobileMenuOpen,
        toast,
        showToast,

        // Data
        entities,
        activeEntityId,
        setActiveEntityId,
        activeEntity,
        navigateToEntity,
        toggleWatchlist,

        reports,
        selectedReportId,
        setSelectedReportId,
        submitNewReport,
        verifyReport,

        evidenceList,
        selectedEvidenceId,
        setSelectedEvidenceId,

        alerts,
        resolveAlert,

        monitoringEvents,
        isMonitoringActive,
        setIsMonitoringActive,
        watchlistRules,
        setWatchlistRules,

        apiKeys,
        createApiKey,
        revokeApiKey,

        statsOverview,

        // Quick Check
        quickCheckQuery,
        setQuickCheckQuery,
        isScanning,
        scanStepIndex,
        scanStages,
        quickCheckResult,
        runQuickCheck,
        recordScanToConsole,

        // Global Search
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        searchResults,

        // Marketing Auth Modal
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        openAuthModal,
        closeAuthModal,

        // Credit & Top-up Modal
        isCreditModalOpen,
        setIsCreditModalOpen,
        openCreditModal,
        closeCreditModal,

        // Security Plan Selection
        activeSecurityPlan,
        setActiveSecurityPlan,

        // RBAC & Workspace (Phase 1)
        userRole,
        setUserRole,
        ROLES,
        PERMISSIONS,
        canPerform,
        getRoleMeta,
        workspaces,
        currentWorkspace,
        switchWorkspace,
        addProjectToCurrentWorkspace,

        // AI Gateway, Billing & Operations (Phase 2)
        AI_MODELS,
        FALLBACK_CHAIN,
        creditBalance,
        setCreditBalance,
        creditTransactions,
        activeSubscription,
        setActiveSubscription,
        BILLING_PLANS,
        sendAiPrompt,
        deductCredits,
        addCredits,
        appeals,
        sloMetrics,
        handleAppealDecision,

        // 9Router AI Gateway Integration
        nineRouterConfig,
        nineRouterHealth,
        refresh9RouterHealth,
        update9RouterSettings,

        // Voicebox AI Studio Gateway Integration (Voice Cloning & TTS)
        voiceboxConfig,
        voiceboxHealth,
        voiceProfiles,
        activeVoiceProfile,
        setActiveVoiceProfile,
        isSpeaking,
        refreshVoiceboxHealth,
        updateVoiceboxSettings,
        generateVoiceSpeech,
        cloneVoice,
        stopVoiceSpeech,

        // Studio & Ecosystem Expansion (Phase 3)
        studioProjects,
        setStudioProjects,
        aiTools,
        setAiTools,
        academyCourses,
        enrollCourse,
        communityPosts,
        createCommunityPost,

        // Production Hardening & Release Gate (Phase 4)
        runRedTeamAudit,
        runLoadTestBenchmark,

        // Hybrid Auth (Local & Supabase)
        user,
        authLoading,
        authError,
        signUp,
        signIn,
        socialSignIn,
        signOut,
        getRegisteredUsers,
        isSupabaseConfigured: isSupabaseConfigured()
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}
