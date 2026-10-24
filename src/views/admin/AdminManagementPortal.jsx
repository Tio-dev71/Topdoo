import React, { useState, useEffect } from 'react';
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Bot,
  Settings,
  Sliders,
  Save,
  RotateCcw,
  Sparkles,
  Server,
  Activity,
  Database,
  Globe,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Send,
  Trash2,
  Plus,
  RefreshCw,
  Search,
  Filter,
  Check,
  X,
  Lock,
  Terminal,
  Cpu,
  Layers,
  FileText
} from 'lucide-react';
import {
  getChatbotConfig,
  saveChatbotConfig,
  resetChatbotConfig,
  DEFAULT_SECURITY_SYSTEM_PROMPT,
  AVAILABLE_9ROUTER_MODELS,
  streamSecurityChat
} from '../../services/chatbotService';
import { useSecurity } from '../../context/SecurityContext';

export function AdminManagementPortal() {
  const {
    showToast,
    entities,
    setEntities,
    reports,
    setReports,
    setMode,
    navigateMarketing
  } = useSecurity();

  // Active Tab: 'prompt', 'threats', 'system', 'domain'
  const [activeTab, setActiveTab] = useState('prompt');

  // Chatbot Config State
  const [config, setConfig] = useState(getChatbotConfig);
  const [isSaving, setIsSaving] = useState(false);

  // Live Playground State
  const [testInput, setTestInput] = useState('Kiểm tra giúp tôi website https://vcb-online-digibank.top có an toàn không?');
  const [testResponse, setTestResponse] = useState('');
  const [isTesting, setIsTesting] = useState(false);

  // System Diagnostics State
  const [routerStatus, setRouterStatus] = useState({ checking: true, live: false, latency: null, modelsCount: 0 });
  const [supabaseStatus, setSupabaseStatus] = useState({ connected: true, tables: ['threat_entities', 'scan_reports', 'api_keys'] });

  // Threat Management Search & Filter
  const [searchThreat, setSearchThreat] = useState('');
  const [threatFilter, setThreatFilter] = useState('all');

  // New Threat Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newThreat, setNewThreat] = useState({
    identifier: '',
    type: 'domain',
    name: '',
    riskScore: 90,
    category: 'Phishing',
    targetBrand: ''
  });

  // Check 9Router Health on mount
  useEffect(() => {
    checkHealth();
  }, []);

  const checkHealth = async () => {
    setRouterStatus({ checking: true, live: false, latency: null, modelsCount: 0 });
    const startTime = performance.now();
    try {
      const res = await fetch('/api/9router/v1/models', {
        headers: { 'Authorization': 'Bearer sk-tiodev-chatbot-secret' }
      });
      const duration = Math.round(performance.now() - startTime);
      if (res.ok) {
        const data = await res.json();
        setRouterStatus({
          checking: false,
          live: true,
          latency: `${duration}ms`,
          modelsCount: data.data?.length || 0
        });
      } else {
        setRouterStatus({ checking: false, live: false, latency: `${duration}ms`, error: `HTTP ${res.status}` });
      }
    } catch (e) {
      setRouterStatus({ checking: false, live: false, latency: 'Timeout', error: e.message });
    }
  };

  const handleSaveConfig = () => {
    setIsSaving(true);
    try {
      saveChatbotConfig(config);
      setTimeout(() => {
        setIsSaving(false);
        showToast('Đã lưu cấu hình', 'System Prompt và tham số AI 9Router đã được cập nhật toàn hệ thống.', 'success');
      }, 400);
    } catch (err) {
      setIsSaving(false);
      showToast('Lỗi lưu cấu hình', err.message, 'warning');
    }
  };

  const handleResetDefault = () => {
    if (window.confirm('Bạn có chắc muốn đặt lại System Prompt về phiên bản mặc định của Topdoo?')) {
      const def = resetChatbotConfig();
      setConfig(def);
      showToast('Đã khôi phục mặc định', 'System Prompt đã được hoàn tác về bản gốc.', 'info');
    }
  };

  const handleRunTestPlayground = async () => {
    if (!testInput.trim() || isTesting) return;
    setIsTesting(true);
    setTestResponse('');

    try {
      await streamSecurityChat({
        messages: [{ role: 'user', content: testInput }],
        systemPrompt: config.systemPrompt,
        model: config.model,
        temperature: config.temperature,
        onChunk: (delta, accumulated) => {
          setTestResponse(accumulated);
        },
        onDone: (finalText) => {
          setTestResponse(finalText);
          setIsTesting(false);
          showToast('Kiểm thử hoàn tất', '9Router đã phản hồi thành công.', 'success');
        },
        onError: (err) => {
          setTestResponse(`⚠️ Lỗi 9Router: ${err.message}`);
          setIsTesting(false);
        }
      });
    } catch (e) {
      setIsTesting(false);
    }
  };

  const handleApproveReport = (reportId) => {
    if (setReports) {
      setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'VERIFIED' } : r));
    }
    showToast('Đã phê duyệt', `Báo cáo #${reportId} đã được xác thực và đưa vào Cơ sở dữ liệu lừa đảo.`, 'success');
  };

  const handleRejectReport = (reportId) => {
    if (setReports) {
      setReports(prev => prev.filter(r => r.id !== reportId));
    }
    showToast('Đã từ chối', `Đã loại bỏ báo cáo #${reportId}.`, 'info');
  };

  const handleAddThreat = (e) => {
    e.preventDefault();
    if (!newThreat.identifier.trim()) return;

    const item = {
      id: `ent-${Date.now()}`,
      identifier: newThreat.identifier.trim(),
      type: newThreat.type,
      name: newThreat.name.trim() || newThreat.identifier.trim(),
      riskScore: Number(newThreat.riskScore) || 85,
      status: 'Đã xác nhận Malicious',
      targetBrand: newThreat.targetBrand || 'Cộng đồng',
      category: newThreat.category,
      createdAt: new Date().toISOString().split('T')[0],
      lastSeen: 'Vừa xong',
      reportsCount: 1,
      evidenceCount: 1,
      watchlist: true,
      country: 'VN',
      summary: 'Thực thể được bổ sung trực tiếp từ Cổng Quản trị Viên Topdoo Security.',
      riskFactors: [
        { name: 'Xác minh Quản trị viên', score: 35, max: 35, status: 'Critical', desc: 'Đã được SecOps Admin phê duyệt vào Blacklist.' }
      ],
      relatedEntityIds: []
    };

    if (setEntities) {
      setEntities(prev => [item, ...prev]);
    }
    setShowAddModal(false);
    setNewThreat({ identifier: '', type: 'domain', name: '', riskScore: 90, category: 'Phishing', targetBrand: '' });
    showToast('Đã thêm mối đe dọa', `Đã đưa ${item.identifier} vào Danh sách đen cảnh báo.`, 'success');
  };

  const handleDeleteEntity = (id) => {
    if (window.confirm('Xóa đối tượng này khỏi cơ sở dữ liệu?')) {
      if (setEntities) {
        setEntities(prev => prev.filter(e => e.id !== id));
      }
      showToast('Đã gỡ bỏ', 'Đã xóa thực thể khỏi cơ sở dữ liệu.', 'info');
    }
  };

  const filteredEntities = (entities || []).filter(e => {
    const matchSearch = e.identifier.toLowerCase().includes(searchThreat.toLowerCase()) ||
                        (e.name && e.name.toLowerCase().includes(searchThreat.toLowerCase()));
    if (threatFilter === 'all') return matchSearch;
    return matchSearch && e.type === threatFilter;
  });

  return (
    <div className="admin-portal-container">
      {/* Top Banner */}
      <header className="admin-portal-header">
        <div className="admin-header-left">
          <div className="admin-logo-badge">
            <Shield className="admin-logo-icon" />
            <span className="admin-pulse-dot" />
          </div>
          <div>
            <div className="admin-title-row">
              <h1 className="admin-title">TOPDOO SECURITY ADMIN PORTAL</h1>
              <span className="admin-domain-chip">admin.topdoo.com</span>
              <span className="admin-status-chip">Live v2.5</span>
            </div>
            <p className="admin-subtext">Trung tâm Kiểm soát Prompt AI 9Router, CSDL Tình báo Mối đe dọa & Hạ tầng SecOps</p>
          </div>
        </div>

        <div className="admin-header-right">
          <button
            onClick={() => {
              setMode('marketing');
              navigateMarketing('home');
            }}
            className="admin-nav-btn secondary"
          >
            <Globe size={15} />
            <span>Về Trang chủ</span>
          </button>
          <button
            onClick={() => setMode('app')}
            className="admin-nav-btn primary"
          >
            <Terminal size={15} />
            <span>SecOps Console</span>
          </button>
        </div>
      </header>

      {/* Admin Nav Tabs */}
      <nav className="admin-tabs-bar">
        <button
          onClick={() => setActiveTab('prompt')}
          className={`admin-tab-btn ${activeTab === 'prompt' ? 'active' : ''}`}
        >
          <Bot size={16} />
          <span>Quản lý Prompt & 9Router</span>
        </button>
        <button
          onClick={() => setActiveTab('threats')}
          className={`admin-tab-btn ${activeTab === 'threats' ? 'active' : ''}`}
        >
          <Database size={16} />
          <span>CSDL Lừa đảo & Phê duyệt ({filteredEntities.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`admin-tab-btn ${activeTab === 'system' ? 'active' : ''}`}
        >
          <Server size={16} />
          <span>Hạ tầng & 9Router Telemetry</span>
          {routerStatus.live && <span className="tab-status-dot online" />}
        </button>
        <button
          onClick={() => setActiveTab('domain')}
          className={`admin-tab-btn ${activeTab === 'domain' ? 'active' : ''}`}
        >
          <Globe size={16} />
          <span>Cấu hình Domain (admin.topdoo.com)</span>
        </button>
      </nav>

      {/* Main Content Area */}
      <main className="admin-content-body">
        {/* TAB 1: PROMPT MANAGEMENT & LIVE 9ROUTER TEST */}
        {activeTab === 'prompt' && (
          <div className="admin-tab-pane prompt-pane">
            <div className="prompt-grid">
              {/* Left Column: Form Configuration */}
              <div className="admin-card prompt-editor-card">
                <div className="card-header-row">
                  <div className="card-header-left">
                    <Bot size={18} className="card-header-icon" />
                    <div>
                      <h3 className="card-title">Cấu hình System Prompt (Admin)</h3>
                      <p className="card-desc">Chỉ đạo hành vi, phong cách ứng phó và kiến thức bảo mật cho 9Router</p>
                    </div>
                  </div>
                  <div className="card-header-actions">
                    <button onClick={handleResetDefault} className="card-action-btn secondary">
                      <RotateCcw size={14} />
                      <span>Mặc định</span>
                    </button>
                    <button
                      onClick={handleSaveConfig}
                      disabled={isSaving}
                      className="card-action-btn primary"
                    >
                      <Save size={14} />
                      <span>{isSaving ? 'Đang lưu...' : 'Lưu Prompt'}</span>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span>System Prompt Chỉ Đạo</span>
                    <span className="label-badge">{config.systemPrompt?.length || 0} ký tự</span>
                  </label>
                  <textarea
                    rows={12}
                    value={config.systemPrompt}
                    onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
                    className="admin-textarea code-font"
                    placeholder="Nhập System Prompt bảo mật..."
                  />
                  <div className="form-tip">
                    Gợi ý: Bao gồm hướng dẫn nhận diện SMS Phishing, mã độc APK Android, lừa đảo chuyển tiền và số hotline hỗ trợ.
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Mô hình AI trên 9Router (Cụm VPS Port 20128)</label>
                    <select
                      value={config.model}
                      onChange={(e) => setConfig({ ...config, model: e.target.value })}
                      className="admin-select"
                    >
                      {AVAILABLE_9ROUTER_MODELS.map(m => (
                        <option key={m.id} value={m.id}>
                          {m.name} [{m.speed}]
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span>Nhiệt độ sáng tạo (Temperature): {config.temperature}</span>
                      <span className="label-badge">{config.temperature < 0.4 ? 'Chính xác cao' : 'Cân bằng'}</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={config.temperature}
                      onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                      className="admin-slider"
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Tên hiển thị Copilot</label>
                    <input
                      type="text"
                      value={config.botName}
                      onChange={(e) => setConfig({ ...config, botName: e.target.value })}
                      className="admin-input"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Hotline Ứng phó Khẩn cấp</label>
                    <input
                      type="text"
                      value={config.emergencyHotline}
                      onChange={(e) => setConfig({ ...config, emergencyHotline: e.target.value })}
                      className="admin-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Thông điệp Chào Mừng Đầu Tiên</label>
                  <input
                    type="text"
                    value={config.welcomeMessage}
                    onChange={(e) => setConfig({ ...config, welcomeMessage: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              {/* Right Column: Live Testing Sandbox */}
              <div className="admin-card playground-card">
                <div className="card-header-row">
                  <div className="card-header-left">
                    <Sparkles size={18} className="card-header-icon highlight" />
                    <div>
                      <h3 className="card-title">Sandbox Kiểm Thử Trực Tiếp (9Router Live)</h3>
                      <p className="card-desc">Thử nghiệm phản hồi thực tế từ server với prompt hiện tại</p>
                    </div>
                  </div>
                  <div className="card-header-actions">
                    <span className={`status-pill ${routerStatus.live ? 'online' : 'offline'}`}>
                      {routerStatus.live ? `9Router Online (${routerStatus.latency})` : 'Chưa kết nối'}
                    </span>
                  </div>
                </div>

                <div className="playground-body">
                  <div className="playground-input-box">
                    <label className="form-label">Câu hỏi kiểm thử từ Quản trị viên:</label>
                    <textarea
                      rows={3}
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      className="admin-textarea"
                      placeholder="Nhập câu hỏi bảo mật để test..."
                    />
                    <button
                      onClick={handleRunTestPlayground}
                      disabled={isTesting || !testInput.trim()}
                      className="playground-run-btn"
                    >
                      {isTesting ? <RefreshCw size={15} className="spin" /> : <Send size={15} />}
                      <span>{isTesting ? '9Router đang suy luận...' : 'Chạy Thử Nghiệm'}</span>
                    </button>
                  </div>

                  <div className="playground-output-box">
                    <label className="form-label">Phản hồi thời gian thực từ mô hình ({config.model}):</label>
                    <div className="playground-terminal">
                      {testResponse ? (
                        <div className="terminal-text">{testResponse}</div>
                      ) : (
                        <div className="terminal-placeholder">
                          Chưa có phản hồi. Nhấn &quot;Chạy Thử Nghiệm&quot; để gửi prompt tới cụm 9Router VPS và xem stream kết quả tại đây.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: THREAT DATABASE & SCAM MODERATION */}
        {activeTab === 'threats' && (
          <div className="admin-tab-pane threats-pane">
            <div className="threats-control-bar">
              <div className="search-filter-left">
                <div className="search-box">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    value={searchThreat}
                    onChange={(e) => setSearchThreat(e.target.value)}
                    placeholder="Tìm tên miền, số tài khoản, số điện thoại độc hại..."
                    className="admin-input search-input"
                  />
                </div>

                <select
                  value={threatFilter}
                  onChange={(e) => setThreatFilter(e.target.value)}
                  className="admin-select filter-select"
                >
                  <option value="all">Tất cả định dạng</option>
                  <option value="domain">Tên miền (Domain)</option>
                  <option value="bank">Tài khoản Ngân hàng (Bank)</option>
                  <option value="phone">Số điện thoại (Phone)</option>
                  <option value="app">Mã độc APK (App)</option>
                </select>
              </div>

              <div className="threats-control-right">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="admin-action-btn primary"
                >
                  <Plus size={15} />
                  <span>Bổ sung Mối đe dọa</span>
                </button>
              </div>
            </div>

            {/* Threat Table */}
            <div className="admin-card table-card">
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Loại</th>
                      <th>Định danh / Identifier</th>
                      <th>Mục tiêu giả mạo</th>
                      <th>Điểm rủi ro</th>
                      <th>Tình trạng</th>
                      <th>Ngày phát hiện</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEntities.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="empty-cell">
                          <div className="table-empty-state">
                            <ShieldCheck size={32} color="#10b981" />
                            <p>Không có mối đe dọa nào phù hợp với bộ lọc hiện tại.</p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredEntities.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <span className={`type-tag ${item.type}`}>{item.type?.toUpperCase()}</span>
                          </td>
                          <td>
                            <div className="identifier-cell">
                              <span className="identifier-text">{item.identifier}</span>
                              {item.name && item.name !== item.identifier && (
                                <span className="identifier-sub">{item.name}</span>
                              )}
                            </div>
                          </td>
                          <td>{item.targetBrand || 'Không rõ'}</td>
                          <td>
                            <span className={`risk-tag ${item.riskScore >= 80 ? 'critical' : (item.riskScore >= 50 ? 'warning' : 'safe')}`}>
                              {item.riskScore}/100
                            </span>
                          </td>
                          <td>
                            <span className="status-badge-text">{item.status}</span>
                          </td>
                          <td>{item.createdAt || 'Hôm nay'}</td>
                          <td>
                            <div className="row-actions">
                              <button
                                onClick={() => handleDeleteEntity(item.id)}
                                className="icon-action-btn danger"
                                title="Gỡ bỏ khỏi danh sách"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pending Reports Moderation Section */}
            {reports && reports.length > 0 && (
              <div className="admin-card reports-moderation-card">
                <div className="card-header-row">
                  <div className="card-header-left">
                    <ShieldAlert size={18} className="card-header-icon danger" />
                    <div>
                      <h3 className="card-title">Hàng đợi Phê duyệt Tố giác từ Cộng đồng</h3>
                      <p className="card-desc">Xác minh bằng chứng và đưa vào Blacklist chính thức</p>
                    </div>
                  </div>
                </div>

                <div className="reports-queue-list">
                  {reports.map((rep) => (
                    <div key={rep.id} className="report-queue-item">
                      <div className="report-queue-meta">
                        <span className="report-id">#{rep.id}</span>
                        <span className="report-target">{rep.target}</span>
                        <span className="report-type">{rep.targetType}</span>
                        <span className="report-time">{rep.createdAt}</span>
                      </div>
                      <p className="report-desc">{rep.description}</p>
                      <div className="report-queue-actions">
                        <button
                          onClick={() => handleApproveReport(rep.id)}
                          className="btn-approve"
                        >
                          <Check size={14} />
                          <span>Duyệt & Đưa vào Blacklist</span>
                        </button>
                        <button
                          onClick={() => handleRejectReport(rep.id)}
                          className="btn-reject"
                        >
                          <X size={14} />
                          <span>Từ chối</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SYSTEM & 9ROUTER TELEMETRY */}
        {activeTab === 'system' && (
          <div className="admin-tab-pane system-pane">
            <div className="system-grid">
              <div className="admin-card metric-card">
                <div className="metric-header">
                  <Server size={20} className="metric-icon" />
                  <span className={`status-dot ${routerStatus.live ? 'online' : 'offline'}`} />
                </div>
                <div className="metric-value">{routerStatus.live ? 'Sẵn sàng 100%' : 'Chưa kết nối'}</div>
                <div className="metric-label">Cụm AI 9Router Gateway (Port 20128)</div>
                <div className="metric-footer">
                  <span>Độ trễ ping: {routerStatus.latency || 'N/A'}</span>
                  <span>Mô hình nạp: {routerStatus.modelsCount} models</span>
                </div>
              </div>

              <div className="admin-card metric-card">
                <div className="metric-header">
                  <Database size={20} className="metric-icon" />
                  <span className="status-dot online" />
                </div>
                <div className="metric-value">Connected</div>
                <div className="metric-label">Supabase Cloud PostgreSQL</div>
                <div className="metric-footer">
                  <span>Pooler: Port 6543 (ap-southeast-1)</span>
                  <span>SSL: Bật</span>
                </div>
              </div>

              <div className="admin-card metric-card">
                <div className="metric-header">
                  <Globe size={20} className="metric-icon" />
                  <span className="status-dot online" />
                </div>
                <div className="metric-value">admin.topdoo.com</div>
                <div className="metric-label">Nginx Reverse Proxy & SSL</div>
                <div className="metric-footer">
                  <span>Server IP: 157.66.100.35</span>
                  <span>Port: 443 HTTPS</span>
                </div>
              </div>
            </div>

            {/* Diagnostic Action Bar */}
            <div className="admin-card diagnostics-card">
              <div className="card-header-row">
                <div className="card-header-left">
                  <Activity size={18} className="card-header-icon" />
                  <div>
                    <h3 className="card-title">Kiểm thử Kết nối Hạ tầng Thời Gian Thực</h3>
                    <p className="card-desc">Xác thực các endpoint microservices đang chạy trên VPS</p>
                  </div>
                </div>
                <button onClick={checkHealth} className="card-action-btn secondary">
                  <RefreshCw size={14} className={routerStatus.checking ? 'spin' : ''} />
                  <span>Ping lại</span>
                </button>
              </div>

              <div className="diag-list">
                <div className="diag-item">
                  <div className="diag-status">
                    {routerStatus.live ? <CheckCircle size={16} color="#10b981" /> : <AlertCircle size={16} color="#ef4444" />}
                  </div>
                  <div className="diag-info">
                    <span className="diag-name">9Router OpenAI-Compatible Endpoint (/api/9router/v1)</span>
                    <span className="diag-detail">Proxy chuyển hướng tới http://127.0.0.1:20128/v1</span>
                  </div>
                  <span className="diag-latency">{routerStatus.latency || 'Checking...'}</span>
                </div>

                <div className="diag-item">
                  <div className="diag-status">
                    <CheckCircle size={16} color="#10b981" />
                  </div>
                  <div className="diag-info">
                    <span className="diag-name">Voicebox Speech Synthesis TTS Engine (/api/voicebox/)</span>
                    <span className="diag-detail">Proxy chuyển hướng tới http://127.0.0.1:17493/</span>
                  </div>
                  <span className="diag-latency">Online</span>
                </div>

                <div className="diag-item">
                  <div className="diag-status">
                    <CheckCircle size={16} color="#10b981" />
                  </div>
                  <div className="diag-info">
                    <span className="diag-name">CheckScam VN & VirusTotal Live Scanners</span>
                    <span className="diag-detail">Dịch vụ tra cứu thời gian thực không lưu trữ trung gian</span>
                  </div>
                  <span className="diag-latency">Operational</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: DOMAIN CONFIGURATION */}
        {activeTab === 'domain' && (
          <div className="admin-tab-pane domain-pane">
            <div className="admin-card domain-config-card">
              <div className="card-header-row">
                <div className="card-header-left">
                  <Globe size={18} className="card-header-icon highlight" />
                  <div>
                    <h3 className="card-title">Cấu hình Tên miền Quản trị (admin.topdoo.com)</h3>
                    <p className="card-desc">Thiết lập định tuyến Nginx và DNS cho Cổng Quản Trị Viên</p>
                  </div>
                </div>
              </div>

              <div className="domain-guide-box">
                <div className="guide-step">
                  <div className="step-num">1</div>
                  <div className="step-content">
                    <div className="step-title">Bản ghi DNS (Domain Name Server)</div>
                    <div className="step-desc">
                      Tại nhà quản lý tên miền (Porkbun / Cloudflare), trỏ bản ghi <code>A</code> của subdomain <code>admin</code> về địa chỉ IP của VPS:
                    </div>
                    <div className="dns-snippet">
                      <code>admin.topdoo.com.    A    157.66.100.35</code>
                    </div>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="step-num">2</div>
                  <div className="step-content">
                    <div className="step-title">Cấu hình Nginx Vhost trên VPS</div>
                    <div className="step-desc">
                      File <code>/etc/nginx/sites-available/topdoo</code> đã cấu hình chấp nhận:
                    </div>
                    <div className="dns-snippet">
                      <code>server_name topdoo.com www.topdoo.com admin.topdoo.com 157.66.100.35;</code>
                    </div>
                  </div>
                </div>

                <div className="guide-step">
                  <div className="step-num">3</div>
                  <div className="step-content">
                    <div className="step-title">Định tuyến Client Frontend Tự Động</div>
                    <div className="step-desc">
                      Hệ thống tự động phát hiện <code>window.location.hostname === &apos;admin.topdoo.com&apos;</code> để mở thẳng màn hình Quản Trị Viên này mà không cần đăng nhập lại.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add Threat Entity Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="admin-modal">
            <div className="modal-header">
              <h3>Bổ sung Mối đe dọa vào Blacklist</h3>
              <button onClick={() => setShowAddModal(false)} className="modal-close-btn">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddThreat} className="modal-form">
              <div className="form-group">
                <label className="form-label">Loại đối tượng</label>
                <select
                  value={newThreat.type}
                  onChange={(e) => setNewThreat({ ...newThreat, type: e.target.value })}
                  className="admin-select"
                >
                  <option value="domain">Tên miền lừa đảo (Domain)</option>
                  <option value="bank">Số tài khoản ngân hàng (Bank)</option>
                  <option value="phone">Số điện thoại giả mạo (Phone)</option>
                  <option value="app">Mã độc ứng dụng .APK (Malware)</option>
                  <option value="email">Email lừa đảo / Phishing (Email)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Định danh / Identifier (Domain, STK, SĐT)</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: vcb-digibank.top hoặc 0389281726"
                  value={newThreat.identifier}
                  onChange={(e) => setNewThreat({ ...newThreat, identifier: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tên mô tả / Chiến dịch</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Giả mạo VCB Digibank qua SMS"
                  value={newThreat.name}
                  onChange={(e) => setNewThreat({ ...newThreat, name: e.target.value })}
                  className="admin-input"
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Thương hiệu mục tiêu</label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Vietcombank, MB Bank, Thuế"
                    value={newThreat.targetBrand}
                    onChange={(e) => setNewThreat({ ...newThreat, targetBrand: e.target.value })}
                    className="admin-input"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Điểm rủi ro (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newThreat.riskScore}
                    onChange={(e) => setNewThreat({ ...newThreat, riskScore: e.target.value })}
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="admin-nav-btn secondary"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="admin-nav-btn primary"
                >
                  Thêm vào Blacklist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
