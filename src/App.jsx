import React from 'react';
import { SecurityProvider, useSecurity } from './context/SecurityContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { MarketingAuthModal } from './components/common/MarketingAuthModal';
import { CreditModal } from './components/common/CreditModal';

// Views
import { PublicWebsite } from './views/marketing/PublicWebsite';
import { TopdooAiView } from './views/marketing/TopdooAiView';
import { TopdooStudioView } from './views/marketing/TopdooStudioView';
import { TopdooToolsView } from './views/marketing/TopdooToolsView';
import { TopdooExploreToolsView } from './views/marketing/TopdooExploreToolsView';
import { TopdooExploreView } from './views/marketing/TopdooExploreView';
import { TopdooPricingView } from './views/marketing/TopdooPricingView';
import { TopdooBusinessView } from './views/marketing/TopdooBusinessView';
import { TopdooContactView } from './views/marketing/TopdooContactView';
import { TopdooSolutionsView } from './views/marketing/TopdooSolutionsView';
import { TopdooAcademyView } from './views/marketing/TopdooAcademyView';
import { TopdooCommunityView } from './views/marketing/TopdooCommunityView';
import { TopdooSecurityView } from './views/marketing/TopdooSecurityView';
import { TopdooGetProtectView } from './views/marketing/TopdooGetProtectView';
import { TopdooPlanSecurityView } from './views/marketing/TopdooPlanSecurityView';
import { TopdooActivateSecurityView } from './views/marketing/TopdooActivateSecurityView';
import { TopdooCompanyView } from './views/marketing/TopdooCompanyView';
import { TopdooDeveloperView } from './views/marketing/TopdooDeveloperView';
import { TopdooDeveloperLoginView } from './views/marketing/TopdooDeveloperLoginView';
import { TopdooTrialWelcomeView } from './views/marketing/TopdooTrialWelcomeView';
import { TopdooDeveloperDashboardView } from './views/marketing/TopdooDeveloperDashboardView';
import { TopdooUrlScannerView } from './views/marketing/TopdooUrlScannerView';
import { DashboardOverview } from './views/app/DashboardOverview';
import { QuickCheckView } from './views/app/QuickCheckView';
import { UrlDomainScannerView } from './views/app/UrlDomainScannerView';
import { PhishingCheckView } from './views/app/PhishingCheckView';
import { ScamDatabaseView } from './views/app/ScamDatabaseView';
import { EntityProfileView } from './views/app/EntityProfileView';
import { ReportScamView } from './views/app/ReportScamView';
import { EvidenceWorkspaceView } from './views/app/EvidenceWorkspaceView';
import { VerificationCenterView } from './views/app/VerificationCenterView';
import { RiskScoreMethodologyView } from './views/app/RiskScoreMethodologyView';
import { ScamNetworkView } from './views/app/ScamNetworkView';
import { WatchlistView } from './views/app/WatchlistView';
import { MonitoringView } from './views/app/MonitoringView';
import { AlertsCenterView } from './views/app/AlertsCenterView';
import { ReportsView } from './views/app/ReportsView';
import { ApiIntegrationsView } from './views/app/ApiIntegrationsView';
import { ReleaseGateView } from './views/app/ReleaseGateView';
import { SettingsView } from './views/app/SettingsView';

function AppContent() {
  const { mode, marketingRoute, currentView, sidebarCollapsed, toast } = useSecurity();

  // If in marketing website mode, show the public-facing platform website or sub-route
  if (mode === 'marketing') {
    return (
      <>
        {marketingRoute === 'topdoo-ai' ? (
          <TopdooAiView />
        ) : marketingRoute === 'topdoo-studio' ? (
          <TopdooStudioView />
        ) : marketingRoute === 'topdoo-tools' ? (
          <TopdooToolsView />
        ) : marketingRoute === 'topdoo-explore-tools' ? (
          <TopdooExploreToolsView />
        ) : marketingRoute === 'topdoo-explore' ? (
          <TopdooExploreView />
        ) : marketingRoute === 'topdoo-pricing' ? (
          <TopdooPricingView />
        ) : marketingRoute === 'topdoo-business' ? (
          <TopdooBusinessView />
        ) : marketingRoute === 'topdoo-contact' ? (
          <TopdooContactView />
        ) : marketingRoute === 'topdoo-solutions' ? (
          <TopdooSolutionsView />
        ) : marketingRoute === 'topdoo-academy' || marketingRoute === 'academy' || marketingRoute === 'hoc-vien' ? (
          <TopdooAcademyView />
        ) : marketingRoute === 'topdoo-community' || marketingRoute === 'community' || marketingRoute === 'cong-dong' ? (
          <TopdooCommunityView />
        ) : marketingRoute === 'topdoo-url-scanner' || marketingRoute === 'url-scanner' || marketingRoute === 'topdoo-tools-security' ? (
          <TopdooUrlScannerView />
        ) : marketingRoute === 'topdoo-security' ? (
          <TopdooSecurityView />
        ) : marketingRoute === 'topdoo-get-protect' ? (
          <TopdooGetProtectView />
        ) : marketingRoute === 'topdoo-plan-security' ? (
          <TopdooPlanSecurityView />
        ) : marketingRoute === 'topdoo-activate-security' ? (
          <TopdooActivateSecurityView />
        ) : marketingRoute === 'topdoo-company' ? (
          <TopdooCompanyView />
        ) : marketingRoute === 'topdoo-developer' ? (
          <TopdooDeveloperView />
        ) : marketingRoute === 'topdoo-developer-login' ? (
          <TopdooDeveloperLoginView />
        ) : marketingRoute === 'topdoo-trial-welcome' || marketingRoute === 'topdoo-hello' ? (
          <TopdooTrialWelcomeView />
        ) : marketingRoute === 'topdoo-developer-dashboard' || marketingRoute === 'developer-dashboard' || marketingRoute === 'dev-dashboard' ? (
          <TopdooDeveloperDashboardView initialTab="home" />
        ) : marketingRoute === 'topdoo-developer-projects' || marketingRoute === 'developer-projects' || marketingRoute === 'my-projects' || marketingRoute === 'du-an-cua-toi' ? (
          <TopdooDeveloperDashboardView initialTab="projects" />
        ) : marketingRoute === 'topdoo-developer-api-sdk' || marketingRoute === 'developer-api-sdk' || marketingRoute === 'topdoo-developer-api' || marketingRoute === 'developer-api' || marketingRoute === 'api-sdk' || marketingRoute === 'topdoo-api-sdk' || marketingRoute === 'api-va-sdk' ? (
          <TopdooDeveloperDashboardView initialTab="api-sdk" />
        ) : marketingRoute === 'topdoo-developer-playground' || marketingRoute === 'developer-playground' || marketingRoute === 'topdoo-playground' || marketingRoute === 'playground' ? (
          <TopdooDeveloperDashboardView initialTab="playground" />
        ) : marketingRoute === 'topdoo-developer-docs' || marketingRoute === 'developer-docs' || marketingRoute === 'topdoo-docs' || marketingRoute === 'developer-tai-lieu' || marketingRoute === 'tai-lieu' || marketingRoute === 'docs' ? (
          <TopdooDeveloperDashboardView initialTab="docs" />
        ) : marketingRoute === 'topdoo-developer-api-keys' || marketingRoute === 'developer-api-keys' || marketingRoute === 'topdoo-api-keys' || marketingRoute === 'quan-ly-api-key' || marketingRoute === 'api-keys' || marketingRoute === 'keys' ? (
          <TopdooDeveloperDashboardView initialTab="api-keys" />
        ) : marketingRoute === 'topdoo-developer-billing' || marketingRoute === 'developer-billing' || marketingRoute === 'topdoo-billing' || marketingRoute === 'thanh-toan' || marketingRoute === 'developer-thanh-toan' || marketingRoute === 'billing' ? (
          <TopdooDeveloperDashboardView initialTab="billing" />
        ) : marketingRoute === 'topdoo-developer-support' || marketingRoute === 'developer-support' || marketingRoute === 'topdoo-support' || marketingRoute === 'ho-tro' || marketingRoute === 'developer-ho-tro' || marketingRoute === 'support' ? (
          <TopdooDeveloperDashboardView initialTab="support" />
        ) : marketingRoute === 'topdoo-developer-notifications' || marketingRoute === 'developer-notifications' || marketingRoute === 'topdoo-notifications' || marketingRoute === 'thong-bao' || marketingRoute === 'developer-thong-bao' || marketingRoute === 'notifications' ? (
          <TopdooDeveloperDashboardView initialTab="notifications" />
        ) : marketingRoute === 'topdoo-developer-security' || marketingRoute === 'developer-security' || marketingRoute === 'topdoo-security-settings' || marketingRoute === 'cai-dat-bao-mat' || marketingRoute === 'bao-mat' ? (
          <TopdooDeveloperDashboardView initialTab="settings" initialSubTab="security" />
        ) : marketingRoute === 'topdoo-developer-appearance' || marketingRoute === 'developer-appearance' || marketingRoute === 'topdoo-appearance' || marketingRoute === 'cai-dat-giao-dien' || marketingRoute === 'giao-dien' || marketingRoute === 'developer-giao-dien' || marketingRoute === 'appearance' ? (
          <TopdooDeveloperDashboardView initialTab="settings" initialSubTab="appearance" />
        ) : marketingRoute === 'topdoo-developer-integrations' || marketingRoute === 'developer-integrations' || marketingRoute === 'cai-dat-tich-hop' || marketingRoute === 'tich-hop' || marketingRoute === 'integrations' ? (
          <TopdooDeveloperDashboardView initialTab="settings" initialSubTab="integrations" />
        ) : marketingRoute === 'topdoo-developer-language' || marketingRoute === 'developer-language' || marketingRoute === 'cai-dat-ngon-ngu' || marketingRoute === 'ngon-ngu' || marketingRoute === 'language' ? (
          <TopdooDeveloperDashboardView initialTab="settings" initialSubTab="language" />
        ) : marketingRoute === 'topdoo-developer-settings' || marketingRoute === 'developer-settings' || marketingRoute === 'topdoo-settings' || marketingRoute === 'cai-dat' || marketingRoute === 'developer-cai-dat' || marketingRoute === 'settings' ? (
          <TopdooDeveloperDashboardView initialTab="settings" />
        ) : (
          <PublicWebsite />
        )}
        <GlobalSearchModal />
        <MarketingAuthModal />
        <CreditModal />
        {toast && (
          <div className="toast-container">
            <div className="toast-box">
              <span style={{ fontSize: 16 }}>{toast.type === 'success' ? '✅' : (toast.type === 'warning' ? '⚠️' : 'ℹ️')}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{toast.title}</div>
                <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{toast.message}</div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // App Console Router
  const renderCurrentView = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardOverview />;
      case 'quick-check':
        return <QuickCheckView />;
      case 'url-scanner':
        return <UrlDomainScannerView />;
      case 'phishing-check':
        return <PhishingCheckView />;
      case 'scam-database':
        return <ScamDatabaseView />;
      case 'entity-profile':
        return <EntityProfileView />;
      case 'report-scam':
        return <ReportScamView />;
      case 'evidence':
        return <EvidenceWorkspaceView />;
      case 'verification':
        return <VerificationCenterView />;
      case 'risk-scores':
        return <RiskScoreMethodologyView />;
      case 'scam-network':
        return <ScamNetworkView />;
      case 'watchlist':
        return <WatchlistView />;
      case 'monitoring':
        return <MonitoringView />;
      case 'alerts':
        return <AlertsCenterView />;
      case 'reports':
        return <ReportsView />;
      case 'api-integrations':
        return <ApiIntegrationsView />;
      case 'release-gate':
        return <ReleaseGateView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="app-container">
      {/* Persistent Left Sidebar */}
      <Sidebar />

      {/* Main Content Pane */}
      <div className={`app-main ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <Header />
        <main className="content-body">
          {renderCurrentView()}
        </main>
      </div>

      {/* Global Search Modal (⌘K) */}
      <GlobalSearchModal />

      {/* Global Auth & Credits Modals */}
      <MarketingAuthModal />
      <CreditModal />

      {/* Global Toast Feedback */}
      {toast && (
        <div className="toast-container">
          <div className="toast-box">
            <span style={{ fontSize: 16 }}>{toast.type === 'success' ? '✅' : (toast.type === 'warning' ? '⚠️' : 'ℹ️')}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{toast.title}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{toast.message}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <SecurityProvider>
      <AppContent />
    </SecurityProvider>
  );
}
