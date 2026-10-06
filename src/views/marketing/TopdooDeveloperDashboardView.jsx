import React, { useState, useEffect } from 'react';
import {
  Home,
  Calendar,
  Code2,
  Tv,
  BookOpen,
  Key,
  CreditCard,
  Headphones,
  Settings,
  LogOut,
  Search,
  Bell,
  LayoutGrid,
  ChevronDown,
  ChevronRight,
  TrendingUp,
  Package,
  Users,
  User,
  UserCog,
  HelpCircle,
  Info,
  MoreVertical,
  MessageSquare,
  FileText,
  Image as ImageIcon,
  GraduationCap,
  Mic,
  Compass,
  Phone,
  Crown,
  Check,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Menu,
  X,
  Folder,
  Plus,
  Play,
  Clock,
  Trophy,
  List,
  Star,
  Copy,
  BarChart3,
  Receipt,
  Share2,
  Download,
  Bookmark,
  Paperclip,
  Globe,
  SlidersHorizontal,
  Languages,
  Mail,
  PenTool,
  GitBranch,
  FolderPlus,
  Sliders,
  Send,
  Cloud,
  Cpu,
  Layers,
  Shield,
  Ban,
  MoreHorizontal,
  Filter,
  Trash2,
  Eye,
  EyeOff,
  Wallet,
  Database,
  Gift,
  Tag,
  Zap,
  Building2,
  ShieldCheck,
  Lock,
  Rocket,
  AlertTriangle,
  LifeBuoy,
  Bot,
  Camera,
  Sun,
  Moon,
  Monitor,
  Smartphone,
  Laptop,
  Palette,
  Puzzle,
  CheckCircle2,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export function TopdooDeveloperDashboardView({ initialTab, initialSubTab }) {
  const {
    navigateMarketing,
    showToast,
    setIsGlobalSearchOpen,
    marketingRoute,
    creditBalance,
    creditTransactions,
    addCredits,
    AI_MODELS,
    sendAiPrompt
  } = useSecurity();

  // Navigation state: 'home' | 'projects' | 'api-sdk' | etc.
  const defaultTab = initialTab || (
    (marketingRoute === 'topdoo-developer-projects' ||
     marketingRoute === 'developer-projects' ||
     marketingRoute === 'my-projects' ||
     marketingRoute === 'du-an-cua-toi') ? 'projects' :
    (marketingRoute === 'topdoo-developer-api-sdk' ||
     marketingRoute === 'developer-api-sdk' ||
     marketingRoute === 'topdoo-developer-api' ||
     marketingRoute === 'developer-api' ||
     marketingRoute === 'topdoo-developer-sdk' ||
     marketingRoute === 'developer-sdk' ||
     marketingRoute === 'api-sdk' ||
     marketingRoute === 'topdoo-api-sdk' ||
     marketingRoute === 'api-va-sdk') ? 'api-sdk' :
    (marketingRoute === 'topdoo-developer-playground' ||
     marketingRoute === 'developer-playground' ||
     marketingRoute === 'topdoo-playground' ||
     marketingRoute === 'playground') ? 'playground' :
    (marketingRoute === 'topdoo-developer-docs' ||
     marketingRoute === 'developer-docs' ||
     marketingRoute === 'topdoo-docs' ||
     marketingRoute === 'developer-tai-lieu' ||
     marketingRoute === 'tai-lieu' ||
     marketingRoute === 'docs') ? 'docs' :
    (marketingRoute === 'topdoo-developer-api-keys' ||
     marketingRoute === 'developer-api-keys' ||
     marketingRoute === 'topdoo-api-keys' ||
     marketingRoute === 'quan-ly-api-key' ||
     marketingRoute === 'api-keys' ||
     marketingRoute === 'keys') ? 'api-keys' :
    (marketingRoute === 'topdoo-developer-billing' ||
     marketingRoute === 'developer-billing' ||
     marketingRoute === 'topdoo-billing' ||
     marketingRoute === 'thanh-toan' ||
     marketingRoute === 'developer-thanh-toan' ||
     marketingRoute === 'billing') ? 'billing' :
     (marketingRoute === 'topdoo-developer-support' ||
      marketingRoute === 'developer-support' ||
      marketingRoute === 'topdoo-support' ||
      marketingRoute === 'ho-tro' ||
      marketingRoute === 'developer-ho-tro' ||
      marketingRoute === 'support') ? 'support' :
      (marketingRoute === 'topdoo-developer-notifications' ||
       marketingRoute === 'developer-notifications' ||
       marketingRoute === 'topdoo-notifications' ||
       marketingRoute === 'thong-bao' ||
       marketingRoute === 'developer-thong-bao' ||
       marketingRoute === 'notifications') ? 'notifications' :
     (marketingRoute === 'topdoo-developer-security' ||
      marketingRoute === 'developer-security' ||
      marketingRoute === 'topdoo-security-settings' ||
      marketingRoute === 'cai-dat-bao-mat' ||
      marketingRoute === 'bao-mat' ||
      marketingRoute === 'topdoo-developer-appearance' ||
      marketingRoute === 'developer-appearance' ||
      marketingRoute === 'topdoo-appearance' ||
      marketingRoute === 'cai-dat-giao-dien' ||
      marketingRoute === 'giao-dien' ||
      marketingRoute === 'developer-giao-dien' ||
      marketingRoute === 'appearance' ||
      marketingRoute === 'topdoo-developer-integrations' ||
      marketingRoute === 'developer-integrations' ||
      marketingRoute === 'cai-dat-tich-hop' ||
      marketingRoute === 'tich-hop' ||
      marketingRoute === 'integrations' ||
      marketingRoute === 'topdoo-developer-language' ||
      marketingRoute === 'developer-language' ||
      marketingRoute === 'cai-dat-ngon-ngu' ||
      marketingRoute === 'ngon-ngu' ||
      marketingRoute === 'language' ||
      marketingRoute === 'topdoo-developer-settings' ||
      marketingRoute === 'developer-settings' ||
      marketingRoute === 'topdoo-settings' ||
      marketingRoute === 'cai-dat' ||
      marketingRoute === 'developer-cai-dat' ||
      marketingRoute === 'settings') ? 'settings' : 'home'
  );
  const [activeNav, setActiveNav] = useState(defaultTab);
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveNav(initialTab);
    } else if (
      marketingRoute === 'topdoo-developer-projects' ||
      marketingRoute === 'developer-projects' ||
      marketingRoute === 'my-projects' ||
      marketingRoute === 'du-an-cua-toi'
    ) {
      setActiveNav('projects');
    } else if (
      marketingRoute === 'topdoo-developer-api-sdk' ||
      marketingRoute === 'developer-api-sdk' ||
      marketingRoute === 'topdoo-developer-api' ||
      marketingRoute === 'developer-api' ||
      marketingRoute === 'topdoo-developer-sdk' ||
      marketingRoute === 'developer-sdk' ||
      marketingRoute === 'api-sdk' ||
      marketingRoute === 'topdoo-api-sdk' ||
      marketingRoute === 'api-va-sdk'
    ) {
      setActiveNav('api-sdk');
    } else if (
      marketingRoute === 'topdoo-developer-playground' ||
      marketingRoute === 'developer-playground' ||
      marketingRoute === 'topdoo-playground' ||
      marketingRoute === 'playground'
    ) {
      setActiveNav('playground');
    } else if (
      marketingRoute === 'topdoo-developer-docs' ||
      marketingRoute === 'developer-docs' ||
      marketingRoute === 'topdoo-docs' ||
      marketingRoute === 'developer-tai-lieu' ||
      marketingRoute === 'tai-lieu' ||
      marketingRoute === 'docs'
    ) {
      setActiveNav('docs');
    } else if (
      marketingRoute === 'topdoo-developer-api-keys' ||
      marketingRoute === 'developer-api-keys' ||
      marketingRoute === 'topdoo-api-keys' ||
      marketingRoute === 'quan-ly-api-key' ||
      marketingRoute === 'api-keys' ||
      marketingRoute === 'keys'
    ) {
      setActiveNav('api-keys');
    } else if (
      marketingRoute === 'topdoo-developer-billing' ||
      marketingRoute === 'developer-billing' ||
      marketingRoute === 'topdoo-billing' ||
      marketingRoute === 'thanh-toan' ||
      marketingRoute === 'developer-thanh-toan' ||
      marketingRoute === 'billing'
    ) {
      setActiveNav('billing');
    } else if (
      marketingRoute === 'topdoo-developer-support' ||
      marketingRoute === 'developer-support' ||
      marketingRoute === 'topdoo-support' ||
      marketingRoute === 'ho-tro' ||
      marketingRoute === 'developer-ho-tro' ||
      marketingRoute === 'support'
    ) {
      setActiveNav('support');
    } else if (
      marketingRoute === 'topdoo-developer-notifications' ||
      marketingRoute === 'developer-notifications' ||
      marketingRoute === 'topdoo-notifications' ||
      marketingRoute === 'thong-bao' ||
      marketingRoute === 'developer-thong-bao' ||
      marketingRoute === 'notifications'
    ) {
      setActiveNav('notifications');
    } else if (
      marketingRoute === 'topdoo-developer-security' ||
      marketingRoute === 'developer-security' ||
      marketingRoute === 'topdoo-security-settings' ||
      marketingRoute === 'cai-dat-bao-mat' ||
      marketingRoute === 'bao-mat'
    ) {
      setActiveNav('settings');
      setSettingsSubTab('security');
    } else if (
      marketingRoute === 'topdoo-developer-appearance' ||
      marketingRoute === 'developer-appearance' ||
      marketingRoute === 'topdoo-appearance' ||
      marketingRoute === 'cai-dat-giao-dien' ||
      marketingRoute === 'giao-dien' ||
      marketingRoute === 'developer-giao-dien' ||
      marketingRoute === 'appearance'
    ) {
      setActiveNav('settings');
      setSettingsSubTab('appearance');
    } else if (
      marketingRoute === 'topdoo-developer-integrations' ||
      marketingRoute === 'developer-integrations' ||
      marketingRoute === 'cai-dat-tich-hop' ||
      marketingRoute === 'tich-hop' ||
      marketingRoute === 'integrations'
    ) {
      setActiveNav('settings');
      setSettingsSubTab('integrations');
    } else if (
      marketingRoute === 'topdoo-developer-language' ||
      marketingRoute === 'developer-language' ||
      marketingRoute === 'cai-dat-ngon-ngu' ||
      marketingRoute === 'ngon-ngu' ||
      marketingRoute === 'language'
    ) {
      setActiveNav('settings');
      setSettingsSubTab('language');
    } else if (
      marketingRoute === 'topdoo-developer-settings' ||
      marketingRoute === 'developer-settings' ||
      marketingRoute === 'topdoo-settings' ||
      marketingRoute === 'cai-dat' ||
      marketingRoute === 'developer-cai-dat' ||
      marketingRoute === 'settings'
    ) {
      setActiveNav('settings');
    } else if (
      marketingRoute === 'topdoo-developer-dashboard' ||
      marketingRoute === 'developer-dashboard' ||
      marketingRoute === 'dev-dashboard'
    ) {
      setActiveNav('home');
    }
  }, [initialTab, marketingRoute]);

  // Time filter state for API chart: '7d' | '30d' | '3m' | '1y'
  const [timeRange, setTimeRange] = useState('7d');

  // User menu & notification dropdowns
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(6); // default to 24/04

  // Projects View State
  const [projectsSearch, setProjectsSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [serviceFilter, setServiceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'grid'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeProjectMenu, setActiveProjectMenu] = useState(null);

  // New project modal form state
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectService, setNewProjectService] = useState('topdoo-ai');
  const [newProjectEnv, setNewProjectEnv] = useState('development');

  // API & SDK View State
  const [apiCategoryFilter, setApiCategoryFilter] = useState('all');
  const [copiedApiKey, setCopiedApiKey] = useState(false);
  const [isIntegrationModalOpen, setIsIntegrationModalOpen] = useState(false);
  const [isCreateKeyModalOpen, setIsCreateKeyModalOpen] = useState(false);
  const [integrationCodeTab, setIntegrationCodeTab] = useState('curl');
  const [newKeyName, setNewKeyName] = useState('');
  const [newKeyExpiry, setNewKeyExpiry] = useState('never');

  const realApiKey = 'sk-live-topdoo-9f82k3m1x7q4a1b2';

  const handleCopyApiKey = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(realApiKey);
    }
    setCopiedApiKey(true);
    showToast('Đã sao chép!', 'API Key bí mật đã được lưu vào bộ nhớ tạm.', 'success');
    setTimeout(() => setCopiedApiKey(false), 2500);
  };

  const handleCreateNewApiKey = (e) => {
    e.preventDefault();
    if (!newKeyName.trim()) {
      showToast('Lỗi', 'Vui lòng nhập tên nhận diện cho khóa API', 'warning');
      return;
    }
    setIsCreateKeyModalOpen(false);
    setNewKeyName('');
    showToast('Tạo API Key thành công', `Khóa "${newKeyName.trim()}" đã được kích hoạt thành công!`, 'success');
  };

  const apiCategories = [
    { id: 'all', label: 'Tất cả' },
    { id: 'chat', label: 'AI Chat' },
    { id: 'image', label: 'Tạo ảnh' },
    { id: 'text', label: 'Xử lý văn bản' },
    { id: 'speech', label: 'Giọng nói' },
    { id: 'data', label: 'Phân tích dữ liệu' },
    { id: 'other', label: 'Khác' }
  ];

  const apiServicesList = [
    {
      id: 'topdoo-ai-chat',
      name: 'Topdoo AI Chat',
      badge: { text: 'Phổ biến', type: 'popular' },
      desc: 'Trò chuyện với mô hình ngôn ngữ mạnh mẽ, hỗ trợ đa ngôn ngữ và nhiều ngữ cảnh.',
      category: 'chat',
      iconType: 'chat',
      tags: ['Text Generation', 'Chat Completion', 'Function Calling'],
      version: 'v1.2.0',
      status: 'active',
      statusLabel: 'Hoạt động'
    },
    {
      id: 'topdoo-vision',
      name: 'Topdoo Vision',
      badge: { text: 'Mới', type: 'new' },
      desc: 'Phân tích hình ảnh, nhận diện đối tượng, mô tả hình ảnh với độ chính xác cao.',
      category: 'image',
      iconType: 'image',
      tags: ['Image Understanding', 'Object Detection', 'OCR'],
      version: 'v1.0.0',
      status: 'active',
      statusLabel: 'Hoạt động'
    },
    {
      id: 'topdoo-doc-ai',
      name: 'Topdoo Document AI',
      badge: null,
      desc: 'Trích xuất thông tin, tóm tắt và phân tích tài liệu (PDF, DOCX, ...) bằng AI.',
      category: 'text',
      iconType: 'doc',
      tags: ['Document Processing', 'Summarization', 'RAG'],
      version: 'v1.1.0',
      status: 'active',
      statusLabel: 'Hoạt động'
    },
    {
      id: 'topdoo-speech',
      name: 'Topdoo Speech',
      badge: { text: 'Sắp ra mắt', type: 'upcoming' },
      desc: 'Chuyển đổi giọng nói thành văn bản và ngược lại với chất lượng cao.',
      category: 'speech',
      iconType: 'speech',
      tags: ['Speech-to-Text', 'Text-to-Speech', 'Voice Clone'],
      version: 'v0.9.0',
      status: 'beta',
      statusLabel: 'Beta'
    },
    {
      id: 'topdoo-data-analysis',
      name: 'Topdoo Data Analysis',
      badge: null,
      desc: 'Phân tích dữ liệu, tạo biểu đồ và rút ra insight từ dữ liệu của bạn.',
      category: 'data',
      iconType: 'chart',
      tags: ['Data Analysis', 'Visualization', 'Natural Language to SQL'],
      version: 'v1.0.0',
      status: 'active',
      statusLabel: 'Hoạt động'
    },
    {
      id: 'topdoo-sdk',
      name: 'Topdoo SDK',
      badge: null,
      desc: 'Bộ thư viện chính thức hỗ trợ tích hợp nhanh trên nhiều nền tảng.',
      category: 'other',
      iconType: 'sdk',
      tags: ['Python', 'JavaScript', 'Java', 'REST API'],
      version: 'v2.0.0',
      status: 'active',
      statusLabel: 'Hoạt động'
    }
  ];

  const filteredApiServices = apiServicesList.filter((s) => {
    if (apiCategoryFilter === 'all') return true;
    return s.category === apiCategoryFilter;
  });

  // =========================================================================
  // PLAYGROUND VIEW STATE
  // =========================================================================
  const playgroundModels = [
    {
      id: 'topdoo-chat-1.0',
      name: 'Topdoo AI Chat',
      code: 'topdoo-chat-1.0',
      desc: 'Mô hình ngôn ngữ mạnh mẽ, hỗ trợ tiếng Việt, phù hợp cho chatbot, trợ lý ảo và xử lý văn bản.',
      iconType: 'chat'
    },
    {
      id: 'topdoo-vision-1.0',
      name: 'Topdoo Vision',
      code: 'topdoo-vision-1.0',
      desc: 'Phân tích hình ảnh, nhận diện đối tượng và mô tả ảnh với độ chính xác cao.',
      iconType: 'image'
    },
    {
      id: 'topdoo-doc-1.1',
      name: 'Topdoo Document AI',
      code: 'topdoo-doc-1.1',
      desc: 'Trích xuất thông tin, tóm tắt và phân tích tài liệu (PDF, DOCX, ...).',
      iconType: 'doc'
    },
    {
      id: 'topdoo-data-1.0',
      name: 'Topdoo Data Analysis',
      code: 'topdoo-data-1.0',
      desc: 'Phân tích dữ liệu, tạo biểu đồ và rút ra insight từ dữ liệu của bạn.',
      iconType: 'chart'
    }
  ];

  const [selectedModelId, setSelectedModelId] = useState('topdoo-chat-1.0');
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [topP, setTopP] = useState(0.9);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0.0);
  const [presencePenalty, setPresencePenalty] = useState(0.0);

  const initialPromptText = 'Hãy viết một kế hoạch phát triển ứng dụng AI trợ lý học tập dành cho sinh viên, bao gồm các tính năng chính, công nghệ đề xuất và lộ trình triển khai.';
  const [promptInput, setPromptInput] = useState(initialPromptText);
  const [isWebSearchEnabled, setIsWebSearchEnabled] = useState(false);
  const [isPlaygroundRunning, setIsPlaygroundRunning] = useState(false);
  const [copiedPlaygroundResult, setCopiedPlaygroundResult] = useState(false);
  const [historySearchQuery, setHistorySearchQuery] = useState('');
  const [activeHistoryId, setActiveHistoryId] = useState(1);

  const defaultResultContent = {
    title: 'Kế hoạch phát triển ứng dụng AI trợ lý học tập cho sinh viên',
    goal: 'Xây dựng một ứng dụng AI giúp sinh viên học tập hiệu quả hơn, cá nhân hóa lộ trình học, tiết kiệm thời gian và nâng cao chất lượng tiếp thu kiến thức.',
    features: [
      { id: 1, title: 'Hỏi đáp thông minh', desc: 'Giải đáp câu hỏi về bài học, tài liệu, khái niệm chuyên ngành.' },
      { id: 2, title: 'Tóm tắt tài liệu', desc: 'Tự động tóm tắt sách, tài liệu, bài giảng (PDF, video, link).' },
      { id: 3, title: 'Lộ trình học cá nhân hóa', desc: 'Đề xuất kế hoạch học tập dựa trên mục tiêu và năng lực.' },
      { id: 4, title: 'Tạo flashcard & quiz', desc: 'Hỗ trợ ôn tập bằng thẻ ghi nhớ và bài kiểm tra trắc nghiệm.' },
      { id: 5, title: 'Hỗ trợ đa dạng môn học', desc: 'Toán, Lập trình, Ngoại ngữ, Kinh tế, v.v.' },
      { id: 6, title: 'Quản lý tiến độ học tập', desc: 'Thống kê thời gian học, mức độ hoàn thành, gợi ý cải thiện.' },
      { id: 7, title: 'Cộng đồng học tập', desc: 'Kết nối, chia sẻ tài liệu và kinh nghiệm giữa sinh viên.' }
    ],
    techStack: [
      { label: 'Frontend', val: 'React Native (đa nền tảng), TailwindCSS' },
      { label: 'Backend', val: 'Node.js (NestJS), Python (FastAPI)' },
      { label: 'AI Model', val: 'Topdoo LLM / OpenAI API / RAG với tài liệu học thuật' },
      { label: 'Cơ sở dữ liệu', val: 'PostgreSQL, Redis (cache)' },
      { label: 'Lưu trữ dữ liệu', val: 'AWS S3 / Firebase Storage' }
    ]
  };

  const [playgroundResult, setPlaygroundResult] = useState(defaultResultContent);

  const promptTemplatesList = [
    {
      id: 'email',
      title: 'Viết email chuyên nghiệp',
      sub: 'Soạn email lịch sự, rõ ràng',
      iconType: 'email',
      prompt: 'Hãy soạn một email chuyên nghiệp và lịch sự gửi đến giảng viên hướng dẫn để xin gia hạn nộp báo cáo đồ án môn học thêm 3 ngày, nêu rõ lý do chính đáng và kế hoạch hoàn thành.'
    },
    {
      id: 'summarize',
      title: 'Tóm tắt nội dung',
      sub: 'Tóm tắt văn bản dài',
      iconType: 'doc',
      prompt: 'Hãy đọc và tóm tắt văn bản sau đây thành 5 gạch đầu dòng súc tích, làm nổi bật các luận điểm chính và số liệu thực nghiệm quan trọng nhất.'
    },
    {
      id: 'translate',
      title: 'Dịch ngôn ngữ',
      sub: 'Dịch sang nhiều ngôn ngữ',
      iconType: 'translate',
      prompt: 'Dịch đoạn văn bản chuyên ngành Khoa học Máy tính sau từ tiếng Anh sang tiếng Việt chuẩn xác, giữ nguyên các thuật ngữ kỹ thuật phổ biến.'
    },
    {
      id: 'idea',
      title: 'Tạo ý tưởng',
      sub: 'Gợi ý ý tưởng sáng tạo',
      iconType: 'sparkle',
      prompt: 'Đề xuất 5 ý tưởng tính năng đột phá cho nền tảng thương mại điện tử ứng dụng Trí tuệ nhân tạo để tăng tỷ lệ chuyển đổi khách hàng trẻ.'
    },
    {
      id: 'code',
      title: 'Viết mã code',
      sub: 'Sinh code theo yêu cầu',
      iconType: 'code',
      prompt: 'Hãy viết mã nguồn React hook tùy chỉnh useDebounce bằng TypeScript, có xử lý cleanup timer và kiểu dữ liệu generic rõ ràng.'
    }
  ];

  const promptHistoryList = [
    {
      id: 1,
      title: 'Kế hoạch phát triển ứng dụng AI trợ lý...',
      time: 'Hôm nay, 10:24',
      prompt: 'Hãy viết một kế hoạch phát triển ứng dụng AI trợ lý học tập dành cho sinh viên, bao gồm các tính năng chính, công nghệ đề xuất và lộ trình triển khai.'
    },
    {
      id: 2,
      title: 'Tóm tắt tài liệu nghiên cứu AI',
      time: 'Hôm nay, 09:15',
      prompt: 'Tóm tắt những điểm cốt lõi trong báo cáo nghiên cứu kiến trúc Mixture of Experts (MoE) và tối ưu hóa bộ nhớ GPU.'
    },
    {
      id: 3,
      title: 'Viết email xin thực tập',
      time: 'Hôm qua, 16:42',
      prompt: 'Viết email ứng tuyển vị trí Thực tập sinh AI Engineer tại một công ty công nghệ hàng đầu.'
    },
    {
      id: 4,
      title: 'Giải thích khái niệm RAG',
      time: 'Hôm qua, 14:30',
      prompt: 'Giải thích cơ chế Retrieval-Augmented Generation (RAG) và so sánh ưu nhược điểm với Fine-tuning.'
    },
    {
      id: 5,
      title: 'Tạo ý tưởng startup EdTech',
      time: '22/04/2025',
      prompt: 'Gợi ý các ý tưởng khởi nghiệp công nghệ giáo dục EdTech kết hợp AI tại thị trường Đông Nam Á.'
    }
  ];

  const currentSelectedModel = playgroundModels.find(m => m.id === selectedModelId) || playgroundModels[0];

  const handleRunPlayground = async () => {
    if (!promptInput.trim()) {
      showToast('Cảnh báo', 'Vui lòng nhập nội dung prompt trước khi chạy!', 'warning');
      return;
    }
    setIsPlaygroundRunning(true);
    showToast('Đang xử lý', 'Mô hình Topdoo AI đang suy luận kết quả...', 'info');

    try {
      if (typeof sendAiPrompt === 'function') {
        const aiRes = await sendAiPrompt(promptInput, selectedModelId || 'gpt-5');
        if (aiRes && aiRes.metrics) {
          setPlaygroundResult(prev => ({
            ...prev,
            title: `Kết quả từ ${aiRes.model?.name || 'Topdoo AI Model Gateway'}`,
            goal: aiRes.content,
            executionTime: `${aiRes.metrics.latencyMs}ms`,
            tokensUsed: `${aiRes.metrics.totalTokens} tokens`,
            cost: `${aiRes.metrics.creditsDeducted} credits`
          }));
        }
      }
      showToast('Hoàn thành', 'Kết quả đã được tạo và trừ credit thành công!', 'success');
    } catch (e) {
      showToast('Lỗi AI Gateway', 'Không thể hoàn tất truy vấn lúc này.', 'danger');
    } finally {
      setIsPlaygroundRunning(false);
    }
  };

  const handleCopyPlaygroundResult = () => {
    const textToCopy = `# ${playgroundResult.title}\n\n## 1. Mục tiêu\n${playgroundResult.goal}\n\n## 2. Các tính năng chính\n` +
      playgroundResult.features.map(f => `${f.id}. ${f.title}: ${f.desc}`).join('\n') +
      `\n\n## 3. Công nghệ đề xuất\n` +
      playgroundResult.techStack.map(t => `- ${t.label}: ${t.val}`).join('\n');

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
    }
    setCopiedPlaygroundResult(true);
    showToast('Đã sao chép!', 'Nội dung kết quả đã được sao chép vào bộ nhớ tạm.', 'success');
    setTimeout(() => setCopiedPlaygroundResult(false), 2000);
  };

  const handleDownloadPlaygroundResult = () => {
    const textToDownload = `# ${playgroundResult.title}\n\n## 1. Mục tiêu\n${playgroundResult.goal}\n\n## 2. Các tính năng chính\n` +
      playgroundResult.features.map(f => `${f.id}. ${f.title}: ${f.desc}`).join('\n') +
      `\n\n## 3. Công nghệ đề xuất\n` +
      playgroundResult.techStack.map(t => `- ${t.label}: ${t.val}`).join('\n');

    const blob = new Blob([textToDownload], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `topdoo-playground-${Date.now()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Tải xuống thành công', 'File markdown đã được lưu về máy!', 'success');
  };

  const handleSelectTemplate = (template) => {
    setPromptInput(template.prompt);
    showToast('Đã nạp mẫu', `Mẫu prompt "${template.title}" đã được nạp vào trình soạn thảo.`, 'info');
  };

  const handleSelectHistory = (item) => {
    setActiveHistoryId(item.id);
    setPromptInput(item.prompt);
    showToast('Đã tải lịch sử', `Nội dung từ phiên "${item.title}" đã sẵn sàng.`, 'info');
  };

  // =========================================================================
  // DOCUMENTATION (TÀI LIỆU) STATE & DATA
  // =========================================================================
  const [docSearchQuery, setDocSearchQuery] = useState('');
  const [selectedDocProduct, setSelectedDocProduct] = useState('all');
  const [selectedDocTopic, setSelectedDocTopic] = useState('all');
  const [docSortBy, setDocSortBy] = useState('popular');
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [activeTocItem, setActiveTocItem] = useState('intro');
  const [isSubscribedUpdates, setIsSubscribedUpdates] = useState(false);
  const [activeDocModal, setActiveDocModal] = useState(null);

  const docProductOptions = [
    { id: 'all', label: 'Tất cả sản phẩm' },
    { id: 'chat', label: 'AI Chat' },
    { id: 'image', label: 'Tạo ảnh AI' },
    { id: 'ocr', label: 'Xử lý văn bản' },
    { id: 'voice', label: 'Giọng nói' },
    { id: 'sdk', label: 'SDK & Thư viện' },
    { id: 'examples', label: 'Ví dụ & Hướng dẫn' }
  ];

  const docTopicOptions = [
    { id: 'all', label: 'Tất cả chủ đề' },
    { id: 'quickstart', label: 'Bắt đầu nhanh' },
    { id: 'integration', label: 'Tích hợp API' },
    { id: 'auth', label: 'Xác thực & Bảo mật' },
    { id: 'errors', label: 'Xử lý lỗi' },
    { id: 'best-practices', label: 'Best Practices' }
  ];

  const docSortOptions = [
    { id: 'popular', label: 'Sắp xếp: Phổ biến nhất' },
    { id: 'latest', label: 'Sắp xếp: Mới nhất' },
    { id: 'rating', label: 'Sắp xếp: Đánh giá cao' }
  ];

  const docCategories = [
    {
      id: 'chat',
      title: 'AI Chat',
      sub: 'Tài liệu tích hợp Chat AI',
      count: '32 bài viết',
      icon: 'chat'
    },
    {
      id: 'image',
      title: 'Tạo ảnh AI',
      sub: 'Tài liệu sinh ảnh',
      count: '18 bài viết',
      icon: 'image'
    },
    {
      id: 'ocr',
      title: 'Xử lý văn bản',
      sub: 'OCR, tóm tắt, trích xuất',
      count: '24 bài viết',
      icon: 'ocr'
    },
    {
      id: 'voice',
      title: 'Giọng nói',
      sub: 'Speech-to-Text, TTS',
      count: '16 bài viết',
      icon: 'voice'
    },
    {
      id: 'sdk',
      title: 'SDK & Thư viện',
      sub: 'Python, JavaScript, ...',
      count: '28 bài viết',
      icon: 'sdk'
    },
    {
      id: 'examples',
      title: 'Ví dụ & Hướng dẫn',
      sub: 'Demo, use case thực tế',
      count: '20 bài viết',
      icon: 'examples'
    }
  ];

  const quickstartGuides = [
    {
      id: 1,
      title: '1. Giới thiệu về Topdoo Developer',
      desc: 'Tổng quan nền tảng, các tính năng chính và cách bắt đầu.',
      time: '5 phút',
      icon: 'doc',
      content: 'Chào mừng bạn đến với Topdoo Developer Portal. Hướng dẫn này sẽ giúp bạn làm quen với các khái niệm cốt lõi, kiến trúc hệ sinh thái AI của Topdoo và lộ trình tích hợp vào sản phẩm của bạn trong 5 phút.'
    },
    {
      id: 2,
      title: '2. Tạo API Key và xác thực',
      desc: 'Hướng dẫn tạo API Key và cách xác thực khi gọi API.',
      time: '7 phút',
      icon: 'key',
      content: 'Để tương tác an toàn với Topdoo API, bạn cần tạo khóa API Key từ Dashboard. Khi gửi request, đính kèm Authorization header: Bearer YOUR_API_KEY để được cấp quyền truy cập.'
    },
    {
      id: 3,
      title: '3. Gọi API đầu tiên',
      desc: 'Thực hành gọi API với ví dụ đơn giản bằng cURL, Python, JavaScript.',
      time: '10 phút',
      icon: 'code',
      content: 'Thực hiện request đầu tiên tới endpoint /v1/chat/completions bằng Python, Node.js hoặc cURL. Nhận phản hồi dạng JSON có cấu trúc trong thời gian phản hồi sub-second.'
    },
    {
      id: 4,
      title: '4. Xử lý phản hồi và lỗi',
      desc: 'Hiểu cấu trúc response và cách xử lý lỗi.',
      time: '8 phút',
      icon: 'alert',
      content: 'Topdoo API sử dụng mã lỗi HTTP tiêu chuẩn (400, 401, 429, 500) kèm trường error chi tiết (code, message, type) giúp bạn xây dựng cơ chế retry logic tối ưu.'
    },
    {
      id: 5,
      title: '5. Best Practices',
      desc: 'Các lưu ý bảo mật, tối ưu hiệu suất và chi phí.',
      time: '6 phút',
      icon: 'check',
      content: 'Tổng hợp các nguyên tắc vàng khi phát triển ứng dụng AI: Quản lý biến môi trường, cơ chế cache câu trả lời, streaming response và kiểm soát token budget hiệu quả.'
    }
  ];

  const featuredDocArticles = [
    {
      id: 'f1',
      productId: 'chat',
      title: 'Hướng dẫn tích hợp AI Chat',
      desc: 'Tích hợp mô hình ngôn ngữ mạnh mẽ vào ứng dụng của bạn.',
      icon: 'chat',
      color: '#0084FF'
    },
    {
      id: 'f2',
      productId: 'image',
      title: 'Tạo ảnh từ mô tả',
      desc: 'Hướng dẫn sử dụng API tạo ảnh AI (Text-to-Image).',
      icon: 'image',
      color: '#8B5CF6'
    },
    {
      id: 'f3',
      productId: 'ocr',
      title: 'Trích xuất dữ liệu từ tài liệu',
      desc: 'OCR và phân tích tài liệu PDF, ảnh, ...',
      icon: 'ocr',
      color: '#10B981'
    },
    {
      id: 'f4',
      productId: 'voice',
      title: 'Chuyển đổi giọng nói thành văn bản',
      desc: 'Hướng dẫn sử dụng Speech-to-Text API.',
      icon: 'voice',
      color: '#F97316'
    },
    {
      id: 'f5',
      productId: 'sdk',
      title: 'SDK Python',
      desc: 'Cài đặt và sử dụng SDK Python cho Topdoo.',
      icon: 'sdk',
      color: '#0284C7'
    },
    {
      id: 'f6',
      productId: 'examples',
      title: 'Ví dụ dự án thực tế',
      desc: 'Các use case và mẫu code ứng dụng.',
      icon: 'examples',
      color: '#EC4899'
    }
  ];

  const tableOfContents = [
    { id: 'intro', label: 'Giới thiệu' },
    { id: 'quickstart', label: 'Bắt đầu nhanh' },
    { id: 'chat', label: 'AI Chat' },
    { id: 'image', label: 'Tạo ảnh AI' },
    { id: 'ocr', label: 'Xử lý văn bản' },
    { id: 'voice', label: 'Giọng nói' },
    { id: 'sdk', label: 'SDK & Thư viện' },
    { id: 'examples', label: 'Ví dụ & Use Case' },
    { id: 'deploy', label: 'Hướng dẫn triển khai' },
    { id: 'faq', label: 'FAQ' }
  ];

  // =========================================================================
  // API KEYS STATE & MOCK DATA (QUẢN LÝ API KEY)
  // =========================================================================
  const [apiKeysList, setApiKeysList] = useState([
    {
      id: 'key-1',
      name: 'Web App Production',
      desc: 'Sử dụng cho ứng dụng web chính thức',
      prefix: 'sk-8f3d',
      suffix: 'a1b2',
      rawKey: 'sk-8f3d9941a87b41e289f64a1b2',
      project: 'Chatbot EduTech',
      permissions: ['Chat', 'RAG'],
      createdAtDate: '24/04/2025',
      createdAtTime: '10:24',
      expiresAt: '24/04/2026',
      status: 'active',
      statusLabel: 'Đang hoạt động',
      subStatus: null
    },
    {
      id: 'key-2',
      name: 'Mobile App',
      desc: 'Ứng dụng di động (iOS/Android)',
      prefix: 'sk-1a9c',
      suffix: '7d4e',
      rawKey: 'sk-1a9c82f0714b38d924e17d4e',
      project: 'Topdoo Studio',
      permissions: ['Chat', 'TTS'],
      createdAtDate: '18/04/2025',
      createdAtTime: '09:15',
      expiresAt: '18/04/2026',
      status: 'active',
      statusLabel: 'Đang hoạt động',
      subStatus: null
    },
    {
      id: 'key-3',
      name: 'Data Processing',
      desc: 'Xử lý tài liệu, OCR, phân tích dữ liệu',
      prefix: 'sk-4b7e',
      suffix: '9c3f',
      rawKey: 'sk-4b7e5124c98a21f837d09c3f',
      project: 'Document AI',
      permissions: ['OCR', 'RAG'],
      createdAtDate: '10/04/2025',
      createdAtTime: '14:32',
      expiresAt: '10/07/2025',
      status: 'expiring',
      statusLabel: 'Sắp hết hạn',
      subStatus: 'Còn 15 ngày'
    },
    {
      id: 'key-4',
      name: 'Testing Key',
      desc: 'Dùng cho môi trường test',
      prefix: 'sk-6d2a',
      suffix: '3f9b',
      rawKey: 'sk-6d2a1984d72b53f619e43f9b',
      project: 'Playground',
      permissions: ['Chat', 'Image'],
      createdAtDate: '05/04/2025',
      createdAtTime: '16:10',
      expiresAt: '-',
      status: 'revoked',
      statusLabel: 'Đã thu hồi',
      subStatus: 'Thu hồi ngày 20/04/2025'
    },
    {
      id: 'key-5',
      name: 'Internal Tool',
      desc: 'Công cụ nội bộ',
      prefix: 'sk-9c1f',
      suffix: '6e8d',
      rawKey: 'sk-9c1fe018a47d28c341b56e8d',
      project: 'Internal',
      permissions: ['All'],
      createdAtDate: '01/04/2025',
      createdAtTime: '11:20',
      expiresAt: '01/04/2026',
      status: 'active',
      statusLabel: 'Đang hoạt động',
      subStatus: null
    }
  ]);

  const [keyActiveTab, setKeyActiveTab] = useState('all'); // 'all' | 'active' | 'expiring' | 'revoked'
  const [keySearchQuery, setKeySearchQuery] = useState('');
  const [selectedKeyIds, setSelectedKeyIds] = useState([]);
  const [activeActionMenuKeyId, setActiveActionMenuKeyId] = useState(null);
  const [revealedKeyIds, setRevealedKeyIds] = useState([]);
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [keyProjectFilter, setKeyProjectFilter] = useState('all');
  const [keyPermissionFilter, setKeyPermissionFilter] = useState('all');

  // Form State for Creating New Key
  const [createKeyFormName, setCreateKeyFormName] = useState('');
  const [createKeyFormDesc, setCreateKeyFormDesc] = useState('');
  const [createKeyFormProject, setCreateKeyFormProject] = useState('Chatbot EduTech');
  const [createKeyFormExpiry, setCreateKeyFormExpiry] = useState('1y');
  const [createKeyFormPermissions, setCreateKeyFormPermissions] = useState(['Chat', 'RAG']);
  const [createdNewKeySuccess, setCreatedNewKeySuccess] = useState(null);

  // Handlers for API Keys
  const handleToggleSelectAllKeys = (filteredKeys) => {
    if (selectedKeyIds.length === filteredKeys.length) {
      setSelectedKeyIds([]);
    } else {
      setSelectedKeyIds(filteredKeys.map(k => k.id));
    }
  };

  const handleToggleSelectKey = (id) => {
    setSelectedKeyIds(prev =>
      prev.includes(id) ? prev.filter(kId => kId !== id) : [...prev, id]
    );
  };

  const handleCopySingleKey = (keyItem) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(keyItem.rawKey);
    }
    showToast('Đã sao chép API Key', `Khóa "${keyItem.name}" (${keyItem.prefix}...${keyItem.suffix}) đã được lưu vào clipboard!`, 'success');
  };

  const handleToggleRevealKey = (id) => {
    setRevealedKeyIds(prev =>
      prev.includes(id) ? prev.filter(kId => kId !== id) : [...prev, id]
    );
  };

  const handleRevokeSingleKey = (id) => {
    setApiKeysList(prev => prev.map(k => {
      if (k.id === id) {
        return {
          ...k,
          status: 'revoked',
          statusLabel: 'Đã thu hồi',
          subStatus: 'Vừa thu hồi'
        };
      }
      return k;
    }));
    setActiveActionMenuKeyId(null);
    showToast('Đã thu hồi API Key', 'Khóa đã được vô hiệu hóa ngay lập tức. Các request sử dụng khóa này sẽ bị từ chối.', 'warning');
  };

  const handleDeleteSingleKey = (id) => {
    const keyToDelete = apiKeysList.find(k => k.id === id);
    setApiKeysList(prev => prev.filter(k => k.id !== id));
    setSelectedKeyIds(prev => prev.filter(kId => kId !== id));
    setActiveActionMenuKeyId(null);
    showToast('Đã xóa API Key', `Khóa "${keyToDelete?.name || ''}" đã bị xóa hoàn toàn khỏi hệ thống.`, 'info');
  };

  const handleCreateKeyModalSubmit = (e) => {
    e.preventDefault();
    if (!createKeyFormName.trim()) {
      showToast('Thiếu thông tin', 'Vui lòng nhập tên cho khóa API mới!', 'warning');
      return;
    }

    const randomHex = Math.random().toString(16).substring(2, 6);
    const randomHexEnd = Math.random().toString(16).substring(2, 6);
    const newRawKey = `sk-${randomHex}${Math.random().toString(36).substring(2, 12)}${randomHexEnd}`;

    const newKeyObj = {
      id: `key-${Date.now()}`,
      name: createKeyFormName.trim(),
      desc: createKeyFormDesc.trim() || 'Khóa API tùy chỉnh',
      prefix: `sk-${randomHex}`,
      suffix: randomHexEnd,
      rawKey: newRawKey,
      project: createKeyFormProject,
      permissions: createKeyFormPermissions.length > 0 ? createKeyFormPermissions : ['Chat'],
      createdAtDate: 'Hôm nay',
      createdAtTime: 'Vừa tạo',
      expiresAt: createKeyFormExpiry === 'never' ? '-' : (createKeyFormExpiry === '1m' ? '1 tháng' : '1 năm'),
      status: 'active',
      statusLabel: 'Đang hoạt động',
      subStatus: null
    };

    setApiKeysList(prev => [newKeyObj, ...prev]);
    setCreatedNewKeySuccess(newKeyObj);
    showToast('Tạo API Key thành công', `Khóa "${newKeyObj.name}" đã được kích hoạt thành công!`, 'success');
  };

  const handleResetCreateKeyModal = () => {
    setCreateKeyFormName('');
    setCreateKeyFormDesc('');
    setCreateKeyFormProject('Chatbot EduTech');
    setCreateKeyFormExpiry('1y');
    setCreateKeyFormPermissions(['Chat', 'RAG']);
    setCreatedNewKeySuccess(null);
    setIsCreateKeyModalOpen(false);
  };

  // =========================================================================
  // BILLING & PAYMENTS STATE & HANDLERS (THANH TOÁN)
  // =========================================================================
  const [billingActiveSubTab, setBillingActiveSubTab] = useState('overview'); // 'overview' | 'plans' | 'invoices' | 'methods' | 'discounts'
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' | 'yearly'
  const [currentPlanId, setCurrentPlanId] = useState('free');

  const plansData = [
    {
      id: 'free',
      name: 'Free',
      subtitle: 'Dành cho người mới bắt đầu',
      monthlyPrice: '0 đ/tháng',
      yearlyPrice: '0 đ/tháng',
      priceRaw: 0,
      iconColor: '#10B981',
      iconBg: '#ECFDF5',
      features: [
        '100K tokens/tháng',
        'Truy cập các mô hình cơ bản',
        'Sử dụng Playground',
        'Hỗ trợ cộng đồng'
      ],
      popular: false
    },
    {
      id: 'plus',
      name: 'Plus',
      subtitle: 'Dành cho cá nhân, nhà phát triển',
      monthlyPrice: '199.000 đ/tháng',
      yearlyPrice: '159.000 đ/tháng',
      priceRaw: 199000,
      iconColor: '#0084FF',
      iconBg: '#EFF6FF',
      features: [
        '2M tokens/tháng',
        'Truy cập tất cả mô hình AI',
        'Tạo nhiều dự án',
        'Ưu tiên xử lý',
        'Hỗ trợ qua email'
      ],
      popular: true,
      popularLabel: 'Phổ biến'
    },
    {
      id: 'pro',
      name: 'Pro',
      subtitle: 'Dành cho đội nhóm, doanh nghiệp',
      monthlyPrice: '499.000 đ/tháng',
      yearlyPrice: '399.000 đ/tháng',
      priceRaw: 499000,
      iconColor: '#9333EA',
      iconBg: '#FAF5FF',
      features: [
        '10M tokens/tháng',
        'Tính năng nâng cao (RAG, Fine-tune)',
        'Quản lý thành viên nhóm',
        'Phân tích và báo cáo chi tiết',
        'Hỗ trợ ưu tiên 24/7'
      ],
      popular: false
    },
    {
      id: 'business',
      name: 'Business',
      subtitle: 'Cho tổ chức lớn',
      monthlyPrice: 'Liên hệ',
      yearlyPrice: 'Liên hệ',
      priceRaw: null,
      iconColor: '#0084FF',
      iconBg: '#EFF6FF',
      features: [
        'Tùy chỉnh theo nhu cầu',
        'Hạn mức tokens lớn',
        'Triển khai riêng (on-premise)',
        'Hỗ trợ kỹ thuật chuyên sâu',
        'Thỏa thuận SLA'
      ],
      popular: false
    }
  ];

  const [paymentMethodsList, setPaymentMethodsList] = useState([
    {
      id: 'pm-1',
      type: 'visa',
      brand: 'VISA',
      last4: '4242',
      expiry: '12/2027',
      isDefault: true
    },
    {
      id: 'pm-2',
      type: 'momo',
      name: 'MoMo Wallet',
      phone: '0123 456 789',
      isDefault: false
    }
  ]);

  const [paymentHistoryList, setPaymentHistoryList] = useState([
    {
      id: 'inv-1',
      title: 'Gói Plus (Tháng 4/2025)',
      date: '24/04/2025',
      amount: '199.000 đ',
      status: 'success',
      statusLabel: 'Thành công'
    },
    {
      id: 'inv-2',
      title: 'Nạp credits',
      date: '10/04/2025',
      amount: '100.000 đ',
      status: 'success',
      statusLabel: 'Thành công'
    },
    {
      id: 'inv-3',
      title: 'Gói Pro (Tháng 3/2025)',
      date: '01/03/2025',
      amount: '499.000 đ',
      status: 'failed',
      statusLabel: 'Thất bại'
    },
    {
      id: 'inv-4',
      title: 'Nạp credits',
      date: '15/02/2025',
      amount: '200.000 đ',
      status: 'success',
      statusLabel: 'Thành công'
    }
  ]);

  // Modals state for billing
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [selectedPlanToUpgrade, setSelectedPlanToUpgrade] = useState(null);
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardExpiry, setNewCardExpiry] = useState('');
  const [newCardCvc, setNewCardCvc] = useState('');
  const [newCardHolder, setNewCardHolder] = useState('');
  const [paymentMethodType, setPaymentMethodType] = useState('card'); // 'card' | 'momo'
  const [newMomoPhone, setNewMomoPhone] = useState('');
  const [isDiscountsModalOpen, setIsDiscountsModalOpen] = useState(false);
  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [activePaymentMenuId, setActivePaymentMenuId] = useState(null);

  const handleOpenUpgradePlan = (plan) => {
    if (plan.id === currentPlanId) {
      showToast('Gói hiện tại', 'Bạn đang sử dụng gói này.', 'info');
      return;
    }
    if (plan.id === 'business') {
      showToast('Liên hệ tư vấn', 'Đang chuyển đến kênh hỗ trợ doanh nghiệp Topdoo Enterprise...', 'info');
      return;
    }
    setSelectedPlanToUpgrade(plan);
    setIsUpgradeModalOpen(true);
  };

  const handleConfirmPlanUpgrade = () => {
    if (!selectedPlanToUpgrade) return;
    setCurrentPlanId(selectedPlanToUpgrade.id);
    setIsUpgradeModalOpen(false);
    showToast(
      'Nâng cấp gói thành công!',
      `Tài khoản của bạn đã được nâng cấp lên gói ${selectedPlanToUpgrade.name}. Hóa đơn mới đã được cập nhật.`,
      'success'
    );
  };

  const handleAddPaymentSubmit = (e) => {
    e.preventDefault();
    if (paymentMethodType === 'card') {
      if (!newCardNumber.trim() || !newCardExpiry.trim()) {
        showToast('Lỗi nhập liệu', 'Vui lòng điền đủ thông tin thẻ tín dụng/ghi nợ.', 'warning');
        return;
      }
      const last4 = newCardNumber.replace(/\s+/g, '').slice(-4) || '8888';
      const newMethod = {
        id: `pm-${Date.now()}`,
        type: 'visa',
        brand: 'VISA',
        last4,
        expiry: newCardExpiry.trim() || '12/2028',
        isDefault: paymentMethodsList.length === 0
      };
      setPaymentMethodsList(prev => [...prev, newMethod]);
    } else {
      if (!newMomoPhone.trim()) {
        showToast('Lỗi nhập liệu', 'Vui lòng nhập số điện thoại ví MoMo.', 'warning');
        return;
      }
      const newMethod = {
        id: `pm-${Date.now()}`,
        type: 'momo',
        name: 'MoMo Wallet',
        phone: newMomoPhone.trim(),
        isDefault: paymentMethodsList.length === 0
      };
      setPaymentMethodsList(prev => [...prev, newMethod]);
    }

    setNewCardNumber('');
    setNewCardExpiry('');
    setNewCardCvc('');
    setNewCardHolder('');
    setNewMomoPhone('');
    setIsAddPaymentModalOpen(false);
    showToast('Thêm phương thức thành công', 'Phương thức thanh toán mới đã sẵn sàng sử dụng.', 'success');
  };

  const handleSetDefaultPayment = (id) => {
    setPaymentMethodsList(prev =>
      prev.map(p => ({
        ...p,
        isDefault: p.id === id
      }))
    );
    showToast('Đã đổi mặc định', 'Đã đặt phương thức thanh toán này làm mặc định cho các hóa đơn tiếp theo.', 'success');
    setActivePaymentMenuId(null);
  };

  const handleDeletePayment = (id) => {
    setPaymentMethodsList(prev => prev.filter(p => p.id !== id));
    showToast('Đã xóa phương thức', 'Phương thức thanh toán đã được gỡ khỏi tài khoản.', 'info');
    setActivePaymentMenuId(null);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    showToast('Áp dụng mã giảm giá', `Mã "${couponCodeInput.toUpperCase()}" giảm 20% đã được áp dụng vào tài khoản của bạn!`, 'success');
    setCouponCodeInput('');
    setIsDiscountsModalOpen(false);
  };

  // =========================================================================
  // SUPPORT (TRUNG TÂM HỖ TRỢ) STATE & DATA
  // =========================================================================
  const [supportSearchQuery, setSupportSearchQuery] = useState('');
  const [isLiveChatModalOpen, setIsLiveChatModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [activeFaqItem, setActiveFaqItem] = useState(null);
  const [activeTopicModal, setActiveTopicModal] = useState(null);

  // Live chat messages
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      name: 'Topdoo AI Support',
      time: '12:30',
      text: 'Xin chào Nguyễn Văn A! Tôi là trợ lý ảo hỗ trợ kỹ thuật Topdoo. Bạn cần hỗ trợ về API Key, tích hợp mô hình AI, xử lý lỗi hay hóa đơn?'
    }
  ]);
  const [chatInputText, setChatInputText] = useState('');

  // Ticket form
  const [ticketName, setTicketName] = useState('Nguyễn Văn A');
  const [ticketEmail, setTicketEmail] = useState('developer@topdoo.vn');
  const [ticketCategory, setTicketCategory] = useState('api');
  const [ticketPriority, setTicketPriority] = useState('medium');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketContent, setTicketContent] = useState('');

  const supportTopics = [
    {
      id: 'quickstart',
      title: 'Bắt đầu nhanh',
      desc: 'Hướng dẫn tạo tài khoản, làm quen với Topdoo.',
      count: '12 bài viết',
      iconType: 'rocket',
      iconColor: '#0084FF',
      iconBg: '#EFF6FF'
    },
    {
      id: 'api-sdk',
      title: 'API & SDK',
      desc: 'Hướng dẫn tích hợp, ví dụ và tài liệu lập trình.',
      count: '28 bài viết',
      iconType: 'code',
      iconColor: '#7C3AED',
      iconBg: '#F5F3FF'
    },
    {
      id: 'billing',
      title: 'Thanh toán',
      desc: 'Gói dịch vụ, hóa đơn, phương thức thanh toán.',
      count: '16 bài viết',
      iconType: 'card',
      iconColor: '#C026D3',
      iconBg: '#FDF4FF'
    },
    {
      id: 'troubleshoot',
      title: 'Xử lý lỗi',
      desc: 'Các lỗi thường gặp và cách khắc phục.',
      count: '24 bài viết',
      iconType: 'alert',
      iconColor: '#EF4444',
      iconBg: '#FEF2F2'
    },
    {
      id: 'ai-features',
      title: 'Tính năng AI',
      desc: 'Hướng dẫn sử dụng các mô hình AI của Topdoo.',
      count: '18 bài viết',
      iconType: 'sparkles',
      iconColor: '#8B5CF6',
      iconBg: '#F5F3FF'
    },
    {
      id: 'projects',
      title: 'Quản lý dự án',
      desc: 'Quản lý ứng dụng và tài nguyên.',
      count: '10 bài viết',
      iconType: 'folder',
      iconColor: '#0284C7',
      iconBg: '#F0F9FF'
    },
    {
      id: 'security',
      title: 'Bảo mật & Quyền riêng tư',
      desc: 'Chính sách bảo mật, quyền truy cập, dữ liệu.',
      count: '8 bài viết',
      iconType: 'security',
      iconColor: '#10B981',
      iconBg: '#ECFDF5'
    },
    {
      id: 'community',
      title: 'Cộng đồng',
      desc: 'Hỏi đáp, chia sẻ kinh nghiệm từ cộng đồng developer.',
      count: '36 bài viết',
      iconType: 'users',
      iconColor: '#0084FF',
      iconBg: '#EFF6FF'
    }
  ];

  const supportFaqs = [
    {
      id: 'faq-1',
      q: 'Làm thế nào để tạo API Key?',
      a: 'Bạn vào trang "Quản lý API Key" trên thanh điều hướng bên trái, bấm "Tạo API Key mới", điền tên nhận diện và chọn quyền hạn, sau đó bấm xác nhận để tạo khóa bí mật (sk-live-...).'
    },
    {
      id: 'faq-2',
      q: 'Tôi có thể dùng thử miễn phí bao lâu?',
      a: 'Mọi tài khoản Topdoo Developer mới đăng ký được dùng thử miễn phí 14 ngày gói Free với 100K tokens và truy cập các mô hình AI cơ bản.'
    },
    {
      id: 'faq-3',
      q: 'Làm sao để tích hợp API vào ứng dụng?',
      a: 'Bạn có thể gửi HTTP request tới endpoint https://api.topdoo.ai/v1 hoặc cài đặt thư viện SDK cho Python (`pip install topdoo`) hoặc Node.js (`npm install @topdoo/sdk`).'
    },
    {
      id: 'faq-4',
      q: 'Các phương thức thanh toán nào được hỗ trợ?',
      a: 'Topdoo hỗ trợ Thẻ quốc tế Visa/Mastercard/JCB, Ví MoMo, ZaloPay và Chuyển khoản QR ngân hàng tự động 24/7.'
    },
    {
      id: 'faq-5',
      q: 'Tôi gặp lỗi 401, phải làm sao?',
      a: 'Lỗi 401 Unauthorized có nghĩa là API Key không chính xác, đã bị vô hiệu hóa hoặc chưa được truyền trong Header `Authorization: Bearer <API_KEY>`. Hãy kiểm tra lại key tại trang Quản lý API Key.'
    },
    {
      id: 'faq-6',
      q: 'Làm cách nào để nâng cấp gói dịch vụ?',
      a: 'Bạn chỉ cần truy cập trang "Thanh toán", chọn gói Plus hoặc Pro rồi bấm nút "Nâng cấp", chọn chu kỳ theo tháng hoặc theo năm để tiết kiệm 20%.'
    },
    {
      id: 'faq-7',
      q: 'Dữ liệu của tôi có được bảo mật không?',
      a: 'Tất cả dữ liệu API và dự án của bạn được mã hóa chuẩn TLS 1.3 và lưu trữ theo tiêu chuẩn bảo mật PCI-DSS, ISO 27001. Topdoo cam kết không sử dụng dữ liệu người dùng để huấn luyện mô hình.'
    },
    {
      id: 'faq-8',
      q: 'Liên hệ hỗ trợ như thế nào?',
      a: 'Bạn có thể bắt đầu chat trực tiếp 24/7 với kỹ sư Topdoo, gửi ticket hỗ trợ hoặc gọi hotline 1900 1234 từ 8:00 đến 22:00 hàng ngày.'
    }
  ];

  const handleSupportSearch = (e) => {
    if (e) e.preventDefault();
    if (!supportSearchQuery.trim()) {
      showToast('Tìm kiếm', 'Vui lòng nhập từ khóa tìm kiếm tài liệu hoặc hướng dẫn.', 'info');
      return;
    }
    showToast('Kết quả tìm kiếm', `Đã tìm thấy 14 bài viết hướng dẫn phù hợp với "${supportSearchQuery}".`, 'success');
  };

  const handleSendChatMessage = (e) => {
    if (e) e.preventDefault();
    if (!chatInputText.trim()) return;
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      name: 'Nguyễn Văn A',
      time: '12:35',
      text: chatInputText.trim()
    };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInputText('');
    
    // Auto bot reply simulation
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          name: 'Kỹ sư hỗ trợ Topdoo',
          time: '12:35',
          text: 'Cảm ơn bạn đã liên hệ! Đội ngũ kỹ thuật Topdoo đã ghi nhận thông tin và sẵn sàng hỗ trợ bạn ngay lập tức.'
        }
      ]);
    }, 700);
  };

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketContent.trim()) {
      showToast('Thiếu thông tin', 'Vui lòng nhập tiêu đề và nội dung chi tiết cần hỗ trợ.', 'warning');
      return;
    }
    showToast('Gửi yêu cầu thành công', `Ticket #${Math.floor(100000 + Math.random() * 900000)} đã được tạo. Chúng tôi sẽ phản hồi qua email trong 24 giờ tới.`, 'success');
    setIsTicketModalOpen(false);
    setTicketSubject('');
    setTicketContent('');
  };

  const handleCallHotline = () => {
    showToast('Tổng đài hỗ trợ', 'Đang kết nối tới hotline Topdoo: 1900 1234 (8:00 - 22:00, cước phí 1.000đ/phút).', 'info');
  };

  // Projects list
  const [projectsList, setProjectsList] = useState([
    {
      id: 'proj-1',
      name: 'Chatbot Tư vấn Khách hàng',
      starred: true,
      desc: 'Xây dựng chatbot AI hỗ trợ tư vấn sản phẩm, giải đáp thắc mắc cho khách hàng 24/7.',
      iconType: 'chat',
      tags: [
        { label: 'Topdoo AI', type: 'tech' },
        { label: 'NLP', type: 'tech' },
        { label: 'Webhook', type: 'tech' },
        { label: 'Production', type: 'status-green', prefix: '↓' }
      ],
      service: 'topdoo-ai',
      status: 'active',
      statusLabel: 'Đang hoạt động',
      progress: 80,
      updatedAt: '24/04/2025',
      updatedTimestamp: 1745452800000,
      members: 3,
      apiCallsNum: 12500,
      apiCalls: '12.5K',
      actionText: 'Mở dự án',
      actionType: 'primary'
    },
    {
      id: 'proj-2',
      name: 'Phân tích hình ảnh AI',
      starred: false,
      desc: 'Ứng dụng AI để phân tích, nhận diện đối tượng trong hình ảnh, phục vụ cho dự án giáo dục.',
      iconType: 'image',
      tags: [
        { label: 'Topdoo Vision', type: 'tech' },
        { label: 'Python', type: 'tech' },
        { label: 'Image AI', type: 'tech' },
        { label: 'Testing', type: 'status-purple', prefix: '↳' }
      ],
      service: 'topdoo-vision',
      status: 'paused',
      statusLabel: 'Tạm dừng',
      progress: 45,
      updatedAt: '18/04/2025',
      updatedTimestamp: 1744934400000,
      members: 2,
      apiCallsNum: 3200,
      apiCalls: '3.2K',
      actionText: 'Tiếp tục',
      actionType: 'outline'
    },
    {
      id: 'proj-3',
      name: 'Tự động tóm tắt văn bản',
      starred: false,
      desc: 'Ứng dụng AI tóm tắt nội dung tài liệu, bài viết dài thành các ý chính ngắn gọn.',
      iconType: 'doc',
      tags: [
        { label: 'Topdoo AI', type: 'tech' },
        { label: 'LLM', type: 'tech' },
        { label: 'Summarize', type: 'tech' },
        { label: 'Development', type: 'status-green', prefix: '↓' }
      ],
      service: 'topdoo-ai',
      status: 'active',
      statusLabel: 'Đang hoạt động',
      progress: 30,
      updatedAt: '10/04/2025',
      updatedTimestamp: 1744243200000,
      members: 1,
      apiCallsNum: 1800,
      apiCalls: '1.8K',
      actionText: 'Mở dự án',
      actionType: 'primary'
    }
  ]);

  const handleToggleStar = (id, name, e) => {
    e.stopPropagation();
    setProjectsList(prev =>
      prev.map(p => {
        if (p.id === id) {
          const nextStarred = !p.starred;
          showToast(
            nextStarred ? 'Đã thêm vào yêu thích' : 'Đã bỏ yêu thích',
            `Dự án "${name}" ${nextStarred ? 'được ghim vào mục ưu tiên.' : 'đã bỏ khỏi mục ưu tiên.'}`,
            'info'
          );
          return { ...p, starred: nextStarred };
        }
        return p;
      })
    );
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) {
      showToast('Lỗi nhập liệu', 'Vui lòng nhập tên dự án của bạn', 'warning');
      return;
    }

    const newProj = {
      id: `proj-${Date.now()}`,
      name: newProjectName.trim(),
      starred: false,
      desc: newProjectDesc.trim() || 'Dự án AI vừa được khởi tạo trên nền tảng Topdoo Developer.',
      iconType: newProjectService === 'topdoo-vision' ? 'image' : 'chat',
      tags: [
        { label: newProjectService === 'topdoo-vision' ? 'Topdoo Vision' : 'Topdoo AI', type: 'tech' },
        { label: 'REST API', type: 'tech' },
        {
          label: newProjectEnv === 'production' ? 'Production' : (newProjectEnv === 'testing' ? 'Testing' : 'Development'),
          type: newProjectEnv === 'testing' ? 'status-purple' : 'status-green',
          prefix: newProjectEnv === 'testing' ? '↳' : '↓'
        }
      ],
      service: newProjectService,
      status: 'active',
      statusLabel: 'Đang hoạt động',
      progress: 10,
      updatedAt: 'Vừa xong',
      updatedTimestamp: Date.now(),
      members: 1,
      apiCallsNum: 0,
      apiCalls: '0',
      actionText: 'Mở dự án',
      actionType: 'primary'
    };

    setProjectsList([newProj, ...projectsList]);
    setIsCreateModalOpen(false);
    setNewProjectName('');
    setNewProjectDesc('');
    showToast('Tạo dự án thành công', `Dự án "${newProj.name}" đã sẵn sàng phát triển!`, 'success');
  };

  const filteredProjects = projectsList
    .filter(p => {
      if (projectsSearch.trim()) {
        const query = projectsSearch.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = p.desc.toLowerCase().includes(query);
        const matchTag = p.tags.some(t => t.label.toLowerCase().includes(query));
        if (!matchName && !matchDesc && !matchTag) return false;
      }
      if (statusFilter !== 'all') {
        if (p.status !== statusFilter) return false;
      }
      if (serviceFilter !== 'all') {
        if (p.service !== serviceFilter) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.updatedTimestamp - a.updatedTimestamp;
      if (sortBy === 'oldest') return a.updatedTimestamp - b.updatedTimestamp;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'api') return b.apiCallsNum - a.apiCallsNum;
      return 0;
    });

  // Chart data based on selected filter
  const chartDatasets = {
    '7d': {
      labels: ['18/04', '19/04', '20/04', '21/04', '22/04', '23/04', '24/04'],
      values: [480, 560, 920, 1100, 1540, 1050, 1842],
      activeLabel: '24/04/2025',
      activeVal: '1.842 lượt gọi',
      max: 2000
    },
    '30d': {
      labels: ['01/04', '05/04', '10/04', '15/04', '20/04', '25/04', '30/04'],
      values: [2200, 3100, 2800, 4200, 5600, 6800, 8400],
      activeLabel: '30/04/2025',
      activeVal: '8.400 lượt gọi',
      max: 10000
    },
    '3m': {
      labels: ['Tháng 2', 'Tháng 3', 'Tháng 4'],
      values: [12400, 28600, 48200],
      activeLabel: 'Tháng 4/2025',
      activeVal: '48.200 lượt gọi',
      max: 60000
    },
    '1y': {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      values: [45000, 82000, 115000, 168000],
      activeLabel: 'Năm 2025',
      activeVal: '168.000 lượt gọi',
      max: 200000
    }
  };

  const currentChart = chartDatasets[timeRange] || chartDatasets['7d'];

  // Calculate SVG curve points
  const svgWidth = 620;
  const svgHeight = 220;
  const paddingX = 40;
  const paddingY = 24;

  const points = currentChart.values.map((val, idx) => {
    const x = paddingX + (idx / (currentChart.values.length - 1)) * (svgWidth - paddingX * 2);
    const y = svgHeight - paddingY - (val / currentChart.max) * (svgHeight - paddingY * 2);
    return { x, y, val, label: currentChart.labels[idx] };
  });

  // Construct SVG path (smooth bezier curve)
  const pathD = points.reduce((acc, pt, i, arr) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = arr[i - 1];
    const cx1 = prev.x + (pt.x - prev.x) / 2;
    const cy1 = prev.y;
    const cx2 = prev.x + (pt.x - prev.x) / 2;
    const cy2 = pt.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${pt.x} ${pt.y}`;
  }, '');

  // Fill area path under curve
  const areaD = `${pathD} L ${points[points.length - 1].x} ${svgHeight - paddingY} L ${points[0].x} ${svgHeight - paddingY} Z`;

  // =========================================================================
  // SETTINGS VIEW STATE
  // =========================================================================
  const [settingsSubTab, setSettingsSubTab] = useState(
    initialSubTab || (
      marketingRoute === 'topdoo-developer-security' || marketingRoute === 'developer-security' || marketingRoute === 'topdoo-security-settings' || marketingRoute === 'cai-dat-bao-mat' || marketingRoute === 'bao-mat' ? 'security' :
      marketingRoute === 'topdoo-developer-appearance' || marketingRoute === 'developer-appearance' || marketingRoute === 'topdoo-appearance' || marketingRoute === 'cai-dat-giao-dien' || marketingRoute === 'giao-dien' || marketingRoute === 'developer-giao-dien' || marketingRoute === 'appearance' ? 'appearance' :
      marketingRoute === 'topdoo-developer-integrations' || marketingRoute === 'developer-integrations' || marketingRoute === 'cai-dat-tich-hop' || marketingRoute === 'tich-hop' || marketingRoute === 'integrations' ? 'integrations' :
      marketingRoute === 'topdoo-developer-language' || marketingRoute === 'developer-language' || marketingRoute === 'cai-dat-ngon-ngu' || marketingRoute === 'ngon-ngu' || marketingRoute === 'language' ? 'language' :
      'account'
    )
  ); // 'account' | 'security' | 'notifications' | 'appearance' | 'integrations' | 'language'
  const [profileName, setProfileName] = useState('Nguyễn Văn A');
  const [profileEmail, setProfileEmail] = useState('nguyenvana@gmail.com');
  const [profileRole, setProfileRole] = useState('Developer');
  const [profileAvatar, setProfileAvatar] = useState('/developer_avatar.jpg');
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [editNameInput, setEditNameInput] = useState('Nguyễn Văn A');
  const [editEmailInput, setEditEmailInput] = useState('nguyenvana@gmail.com');
  const [editRoleInput, setEditRoleInput] = useState('Developer');

  // Display / Appearance preferences
  const [themeMode, setThemeMode] = useState('light'); // 'light' | 'dark' | 'system'
  const [appearanceLayout, setAppearanceLayout] = useState('fixed'); // 'fixed' | 'compact' | 'full'
  const [appearanceDensity, setAppearanceDensity] = useState('balanced'); // 'spacious' | 'balanced' | 'compact'
  const [appearanceMotion, setAppearanceMotion] = useState(true);
  const [appearanceRounded, setAppearanceRounded] = useState(true);
  const [appearanceIllustrations, setAppearanceIllustrations] = useState(true);
  const [appearanceAccentColor, setAppearanceAccentColor] = useState('#0084FF');
  const [appearanceIconStyle, setAppearanceIconStyle] = useState('modern'); // 'modern' | 'classic'

  // Integrations state
  const [integrationsList, setIntegrationsList] = useState([
    { id: 'slack', name: 'Slack', desc: 'Nhận thông báo và tương tác qua Slack.', connected: true, date: '20/04/2025, 09:15', icon: 'slack' },
    { id: 'drive', name: 'Google Drive', desc: 'Lưu trữ và đồng bộ tài liệu.', connected: true, date: '18/04/2025, 14:32', icon: 'drive' },
    { id: 'github', name: 'GitHub', desc: 'Đồng bộ mã nguồn và dự án.', connected: false, date: '-', icon: 'github' }
  ]);

  // Language state
  const [selectedLanguage, setSelectedLanguage] = useState('vi'); // 'vi' | 'en' | 'ja' | 'zh' | 'ko' | 'other'
  const [emailLanguage, setEmailLanguage] = useState('vi');
  const [selectedTimezone, setSelectedTimezone] = useState('(GMT+07:00) Bangkok, Hà Nội, Jakarta');

  // Notification / privacy toggles
  const [emailProductUpdates, setEmailProductUpdates] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [anonymousDataSharing, setAnonymousDataSharing] = useState(false);

  // =========================================================================
  // NOTIFICATIONS VIEW STATE & LOGIC
  // =========================================================================
  const [activeNotifFilter, setActiveNotifFilter] = useState('all'); // 'all' | 'system' | 'project' | 'billing' | 'other'
  const [notifPage, setNotifPage] = useState(1);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isNotifConfigModalOpen, setIsNotifConfigModalOpen] = useState(false);
  const [notifChannelPrefs, setNotifChannelPrefs] = useState({
    email: true,
    push: true,
    webhook: true,
    telegram: false,
    systemAlerts: true,
    projectStatus: true,
    billingAlerts: true,
    supportUpdates: true,
    productNews: false,
    digestFreq: 'instant' // 'instant' | 'daily' | 'weekly'
  });

  const [notificationsList, setNotificationsList] = useState([
    {
      id: 'notif-1',
      category: 'system',
      iconType: 'bell',
      title: 'Bạn có 1 thông báo mới từ hệ thống',
      desc: 'Tính năng mới: Hỗ trợ tạo project nhanh với AI đã được cập nhật. Khám phá ngay!',
      time: '2 phút trước',
      isUnread: true,
      tagText: null,
      tagType: null,
      fullDate: '24/04/2025 15:42 (GMT+7)',
      detailContent: 'Hệ sinh thái Topdoo vừa ra mắt bộ công cụ "AI Project Assistant" thế hệ mới, cho phép lập trình viên khởi tạo dự án nhanh chóng chỉ bằng một prompt mô tả. Tự động sinh cấu trúc source code, API keys và cấu hình triển khai.',
      actionLabel: 'Trải nghiệm AI Project Builder',
      actionTarget: 'topdoo-ai'
    },
    {
      id: 'notif-2',
      category: 'project',
      iconType: 'folder',
      title: 'Dự án "Website AI" đã được tạo thành công',
      desc: 'Dự án của bạn đã được tạo thành công. Bạn có thể bắt đầu phát triển ngay bây giờ.',
      time: '15 phút trước',
      isUnread: true,
      tagText: 'Dự án',
      tagType: 'project',
      fullDate: '24/04/2025 15:29 (GMT+7)',
      detailContent: 'Dự án "Website AI" (ID: prj-984210) đã hoàn tất quá trình khởi tạo container và phân bổ tài nguyên trên cụm máy chủ khu vực Đông Nam Á. Khóa API môi trường Development đã sẵn sàng.',
      actionLabel: 'Mở chi tiết dự án',
      actionNav: 'projects'
    },
    {
      id: 'notif-3',
      category: 'billing',
      iconType: 'card',
      title: 'Thanh toán thành công',
      desc: 'Gói Pro tháng (24/04/2025 - 24/05/2025) đã được thanh toán thành công.',
      time: '1 giờ trước',
      isUnread: true,
      tagText: 'Thanh toán',
      tagType: 'billing',
      fullDate: '24/04/2025 14:44 (GMT+7)',
      detailContent: 'Giao dịch gia hạn định kỳ gói cước Topdoo Developer Pro (Mã giao dịch: INV-20250424-9182) với số tiền 499.000 VNĐ đã được xử lý thành công qua cổng thanh toán VNPay/Thẻ quốc tế. Hóa đơn VAT điện tử đã được phát hành.',
      actionLabel: 'Xem lịch sử thanh toán & hóa đơn',
      actionNav: 'billing'
    },
    {
      id: 'notif-4',
      category: 'system',
      iconType: 'settings',
      title: 'Cập nhật hệ thống',
      desc: 'Topdoo đã nâng cấp API v2.1 với nhiều cải tiến về hiệu suất và bảo mật.',
      time: '3 giờ trước',
      isUnread: false,
      tagText: 'Hệ thống',
      tagType: 'system',
      fullDate: '24/04/2025 12:44 (GMT+7)',
      detailContent: 'Phiên bản API v2.1 bổ sung hỗ trợ streaming HTTP SSE độ trễ thấp (<120ms), chuẩn hóa định dạng lỗi RFC 7807 và tăng giới hạn context token cho các tác vụ suy luận AI phức tạp.',
      actionLabel: 'Đọc tài liệu API v2.1',
      actionNav: 'docs'
    },
    {
      id: 'notif-5',
      category: 'other',
      iconType: 'message',
      title: 'Yêu cầu hỗ trợ đã được phản hồi',
      desc: 'Vấn đề của bạn (#TK-1234) đã được đội ngũ kỹ thuật giải quyết. Vui lòng kiểm tra lại.',
      time: '5 giờ trước',
      isUnread: false,
      tagText: 'Hỗ trợ',
      tagType: 'support',
      fullDate: '24/04/2025 10:44 (GMT+7)',
      detailContent: 'Đội ngũ kỹ thuật Topdoo Cloud đã phân tích log và giải quyết lỗi cấu hình Webhook timeout trên tài khoản của bạn (#TK-1234). Vui lòng thử gửi lại một request webhook test.',
      actionLabel: 'Xem phản hồi vé hỗ trợ',
      actionNav: 'support'
    },
    {
      id: 'notif-6',
      category: 'system',
      iconType: 'file',
      title: 'Tài liệu mới được cập nhật',
      desc: 'Tài liệu "Hướng dẫn sử dụng Playground" đã được cập nhật phiên bản mới.',
      time: '1 ngày trước',
      isUnread: false,
      tagText: 'Tài liệu',
      tagType: 'docs',
      fullDate: '23/04/2025 15:00 (GMT+7)',
      detailContent: 'Tài liệu hướng dẫn trực quan cho Playground đã bổ sung các hướng dẫn từng bước về tùy chỉnh tham số Temperature, Top_p và tích hợp Function Calling trực tiếp vào ứng dụng web.',
      actionLabel: 'Mở tài liệu Playground',
      actionNav: 'playground'
    },
    {
      id: 'notif-7',
      category: 'system',
      iconType: 'alert',
      title: 'Thông báo bảo trì hệ thống',
      desc: 'Topdoo sẽ tiến hành bảo trì hệ thống từ 02:00 - 04:00 ngày 25/04/2025 (giờ VN).',
      time: '1 ngày trước',
      isUnread: false,
      tagText: 'Hệ thống',
      tagType: 'system-warn',
      fullDate: '23/04/2025 09:30 (GMT+7)',
      detailContent: 'Nhằm nâng cấp thiết bị mạng trục chính và vá bảo mật định kỳ, cụm hạ tầng khu vực Đông Nam Á sẽ tiến hành bảo trì từ 02:00 đến 04:00 sáng ngày 25/04/2025. Kết nối API có thể có độ trễ nhẹ trong thời gian này.',
      actionLabel: 'Theo dõi trang trạng thái',
      actionNav: 'support'
    },
    {
      id: 'notif-8',
      category: 'other',
      iconType: 'bell',
      title: 'Chúc mừng! Bạn đã đạt 100.000 token sử dụng',
      desc: 'Cảm ơn bạn đã tin tưởng và sử dụng Topdoo. Tiếp tục khám phá những tính năng mới nhé!',
      time: '2 ngày trước',
      isUnread: false,
      tagText: 'Khác',
      tagType: 'other',
      fullDate: '22/04/2025 16:20 (GMT+7)',
      detailContent: 'Bạn đã đạt mốc 100.000 tokens xử lý thành công! Nhằm tri ân các nhà phát triển tích cực, Topdoo đã cộng thêm 20.000 tokens miễn phí vào hạn mức tháng này của bạn.',
      actionLabel: 'Kiểm tra hạn mức & API Key',
      actionNav: 'api-keys'
    },
    {
      id: 'notif-9',
      category: 'project',
      iconType: 'folder',
      title: 'Dự án "Chatbot Support" đã vượt ngưỡng 80% quota',
      desc: 'Lượng truy cập tăng đột biến trong hôm nay. Khuyến nghị nâng giới hạn tốc độ.',
      time: '3 ngày trước',
      isUnread: false,
      tagText: 'Dự án',
      tagType: 'project',
      fullDate: '21/04/2025 11:15 (GMT+7)',
      detailContent: 'Hệ thống phát hiện dự án "Chatbot Support" đã sử dụng 82% hạn mức truy vấn API hàng tháng. Hãy kiểm tra cài đặt rate-limiting hoặc nâng cấp gói dịch vụ để tránh gián đoạn trải nghiệm người dùng.',
      actionLabel: 'Quản lý dự án',
      actionNav: 'projects'
    },
    {
      id: 'notif-10',
      category: 'billing',
      iconType: 'card',
      title: 'Hóa đơn GTGT tháng 03/2025 đã sẵn sàng tải về',
      desc: 'Hóa đơn điện tử hợp lệ đã được phát hành và ký số bởi Topdoo Corporation.',
      time: '4 ngày trước',
      isUnread: false,
      tagText: 'Thanh toán',
      tagType: 'billing',
      fullDate: '20/04/2025 08:00 (GMT+7)',
      detailContent: 'Hóa đơn giá trị gia tăng điện tử mã số HD-2025-0391 cho kỳ cước tháng 03/2025 đã được phát hành với đầy đủ chữ ký số điện tử hợp chuẩn.',
      actionLabel: 'Tải hóa đơn',
      actionNav: 'billing'
    },
    {
      id: 'notif-11',
      category: 'system',
      iconType: 'settings',
      title: 'Bảo mật: Phát hiện đăng nhập từ IP mới tại Đà Nẵng',
      desc: 'Phiên làm việc trên thiết bị MacBook Pro (Chrome) đã được xác thực thành công.',
      time: '5 ngày trước',
      isUnread: false,
      tagText: 'Hệ thống',
      tagType: 'system',
      fullDate: '19/04/2025 19:40 (GMT+7)',
      detailContent: 'Tài khoản của bạn vừa ghi nhận một lượt đăng nhập thành công từ địa chỉ IP 14.162.180.25 (Đà Nẵng, Việt Nam). Nếu hành động này không phải do bạn thực hiện, vui lòng đổi mật khẩu ngay.',
      actionLabel: 'Kiểm tra bảo mật tài khoản',
      actionNav: 'settings',
      actionSubTab: 'security'
    },
    {
      id: 'notif-12',
      category: 'project',
      iconType: 'folder',
      title: 'Dự án "Smart Analytics" vừa hoàn tất bài kiểm thử API',
      desc: 'Tất cả 48 kịch bản kiểm thử API SDK đã vượt qua với tỷ lệ thành công 100%.',
      time: '6 ngày trước',
      isUnread: false,
      tagText: 'Dự án',
      tagType: 'project',
      fullDate: '18/04/2025 14:10 (GMT+7)',
      detailContent: 'Quy trình kiểm thử tự động (CI/CD Automated Test) cho dự án Smart Analytics đã chạy xong với 48/48 test suite pass, thời gian phản hồi trung bình 94ms.',
      actionLabel: 'Xem kết quả kiểm thử',
      actionNav: 'projects'
    }
  ]);

  const filteredNotifications = notificationsList.filter(n => {
    if (activeNotifFilter === 'all') return true;
    return n.category === activeNotifFilter;
  });

  const notifPageSize = 8;
  const totalNotifPages = Math.max(1, Math.ceil(filteredNotifications.length / notifPageSize));
  const currentDisplayedNotifs = filteredNotifications.slice((notifPage - 1) * notifPageSize, notifPage * notifPageSize);

  const notifCounts = {
    all: notificationsList.length,
    system: notificationsList.filter(n => n.category === 'system').length,
    project: notificationsList.filter(n => n.category === 'project').length,
    billing: notificationsList.filter(n => n.category === 'billing').length,
    other: notificationsList.filter(n => n.category === 'other').length,
    unread: notificationsList.filter(n => n.isUnread).length,
    read: notificationsList.filter(n => !n.isUnread).length
  };

  const handleOpenNotificationDetail = (item) => {
    setNotificationsList(prev => prev.map(n => n.id === item.id ? { ...n, isUnread: false } : n));
    setSelectedNotification(item);
  };

  const handleToggleNotificationRead = (id) => {
    setNotificationsList(prev => prev.map(n => {
      if (n.id === id) {
        const nextState = !n.isUnread;
        showToast(nextState ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc', 'Đã cập nhật trạng thái thông báo.', 'info');
        return { ...n, isUnread: nextState };
      }
      return n;
    }));
    if (selectedNotification && selectedNotification.id === id) {
      setSelectedNotification(prev => ({ ...prev, isUnread: !prev.isUnread }));
    }
  };

  const handleMarkAllNotifsAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, isUnread: false })));
    showToast('Hoàn tất', 'Tất cả 12 thông báo đã được đánh dấu là đã đọc.', 'success');
  };

  const handleSaveNotifPreferences = (e) => {
    e.preventDefault();
    setIsNotifConfigModalOpen(false);
    showToast('Lưu cấu hình thành công', 'Các tùy chọn nhận thông báo qua Email, Webhook và Telegram đã được cập nhật.', 'success');
  };

  // Security Subtab State & Modals
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [isDevicesModalOpen, setIsDevicesModalOpen] = useState(false);
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const [isAllLoginLogsModalOpen, setIsAllLoginLogsModalOpen] = useState(false);
  const [activeDeviceMenuId, setActiveDeviceMenuId] = useState(null);

  // Security form states
  const [pwdCurrent, setPwdCurrent] = useState('');
  const [pwdNew, setPwdNew] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [sessionTimeout, setSessionTimeout] = useState('24h');
  const [autoLockEnabled, setAutoLockEnabled] = useState(true);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState('');

  // 8 Backup recovery codes
  const [backupCodes, setBackupCodes] = useState([
    '8F2A-4B9C', '7D1E-3F5A', '9C4B-1A8E', '2E5F-6A7B',
    '3C8D-9E1F', '5A2B-7C4D', '1E6F-8A3B', '4D7E-2F9C'
  ]);

  // Login devices & activity list matching screenshot
  const [loginActivities, setLoginActivities] = useState([
    {
      id: 1,
      device: 'Chrome - Windows',
      location: 'Hà Nội, Việt Nam',
      ip: '113.190.234.82',
      time: 'Hôm nay, 10:24',
      isCurrent: true,
      browserType: 'chrome'
    },
    {
      id: 2,
      device: 'iPhone 15 - iOS',
      location: 'Hà Nội, Việt Nam',
      ip: '14.161.42.19',
      time: '24/04/2025, 14:32',
      isCurrent: false,
      browserType: 'mobile'
    },
    {
      id: 3,
      device: 'Chrome - macOS',
      location: 'Hồ Chí Minh, Việt Nam',
      ip: '118.69.182.55',
      time: '20/04/2025, 09:15',
      isCurrent: false,
      browserType: 'chrome'
    },
    {
      id: 4,
      device: 'Edge - Windows',
      location: 'Đà Nẵng, Việt Nam',
      ip: '171.244.33.104',
      time: '15/04/2025, 16:20',
      isCurrent: false,
      browserType: 'edge'
    },
    {
      id: 5,
      device: 'Android - Samsung',
      location: 'Hà Nội, Việt Nam',
      ip: '42.112.88.201',
      time: '10/04/2025, 11:03',
      isCurrent: false,
      browserType: 'android'
    }
  ]);

  // Activity Log modal state
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // Recent activity list matching screenshot
  const recentActivities = [
    {
      id: 'act-1',
      title: 'Đăng nhập thành công',
      desc: 'Chrome • Hà Nội, Việt Nam',
      time: 'Hôm nay, 10:24',
      type: 'login',
      status: 'success'
    },
    {
      id: 'act-2',
      title: 'Tạo API Key mới',
      desc: 'Web App Production',
      time: '24/04/2025, 14:32',
      type: 'key',
      status: 'info'
    },
    {
      id: 'act-3',
      title: 'Cập nhật thông tin tài khoản',
      desc: 'Thay đổi ảnh đại diện',
      time: '20/04/2025, 09:15',
      type: 'profile',
      status: 'info'
    },
    {
      id: 'act-4',
      title: 'Thanh toán thành công',
      desc: 'Gói Plus (tháng 4/2025)',
      time: '15/04/2025, 16:20',
      type: 'payment',
      status: 'success'
    },
    {
      id: 'act-5',
      title: 'Đăng xuất',
      desc: 'Chrome • Hà Nội, Việt Nam',
      time: '10/04/2025, 11:03',
      type: 'logout',
      status: 'danger'
    }
  ];

  const handleOpenEditProfile = () => {
    setEditNameInput(profileName);
    setEditEmailInput(profileEmail);
    setEditRoleInput(profileRole);
    setIsEditProfileModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileName(editNameInput);
    setProfileEmail(editEmailInput);
    setProfileRole(editRoleInput);
    setIsEditProfileModalOpen(false);
    showToast('Cập nhật thành công', 'Thông tin cá nhân đã được lưu.', 'success');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileAvatar(url);
      showToast('Đã đổi ảnh đại diện', 'Ảnh đại diện mới đã được cập nhật thành công!', 'success');
    }
  };

  // Security action handlers
  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!pwdCurrent) {
      showToast('Lỗi nhập liệu', 'Vui lòng nhập mật khẩu hiện tại.', 'warning');
      return;
    }
    if (pwdNew.length < 8) {
      showToast('Mật khẩu yếu', 'Mật khẩu mới phải có tối thiểu 8 ký tự.', 'warning');
      return;
    }
    if (pwdNew !== pwdConfirm) {
      showToast('Không khớp', 'Mật khẩu xác nhận không trùng khớp.', 'warning');
      return;
    }
    setPwdCurrent('');
    setPwdNew('');
    setPwdConfirm('');
    setIsChangePasswordModalOpen(false);
    showToast('Đổi mật khẩu thành công', 'Mật khẩu mới của bạn đã được cập nhật an toàn.', 'success');
  };

  const handleSaveSessionConfig = (e) => {
    e.preventDefault();
    setIsSessionModalOpen(false);
    showToast('Cập nhật phiên làm việc', `Thời gian hết hạn phiên làm việc được đặt thành ${sessionTimeout === '15m' ? '15 phút' : sessionTimeout === '30m' ? '30 phút' : sessionTimeout === '1h' ? '1 giờ' : sessionTimeout === '4h' ? '4 giờ' : sessionTimeout === '24h' ? '24 giờ' : '7 ngày'}.`, 'success');
  };

  const handleLogoutOtherDevices = () => {
    setLoginActivities(prev => prev.filter(item => item.isCurrent));
    setIsDevicesModalOpen(false);
    showToast('Đã đăng xuất', 'Đã đăng xuất khỏi tất cả các thiết bị khác thành công.', 'success');
  };

  const handleDeleteAccountSubmit = (e) => {
    e.preventDefault();
    if (deleteConfirmationText.trim().toUpperCase() !== 'XOA TAI KHOAN') {
      showToast('Xác nhận không hợp lệ', 'Vui lòng nhập chính xác "XOA TAI KHOAN" để xác nhận.', 'warning');
      return;
    }
    setIsDeleteAccountModalOpen(false);
    setDeleteConfirmationText('');
    showToast('Đã gửi yêu cầu', 'Yêu cầu xóa tài khoản đã được ghi nhận. Email xác thực đã được gửi tới hộp thư của bạn.', 'warning');
  };

  const handleCopyBackupCodes = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(backupCodes.join('\n'));
    }
    showToast('Đã sao chép', '8 mã khôi phục dự phòng đã được lưu vào bộ nhớ tạm.', 'success');
  };

  const handleRegenerateBackupCodes = () => {
    const chars = '0123456789ABCDEF';
    const newCodes = Array.from({ length: 8 }, () => {
      const part1 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      const part2 = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      return `${part1}-${part2}`;
    });
    setBackupCodes(newCodes);
    showToast('Tạo mới mã thành công', 'Bộ mã khôi phục mới đã được tạo và kích hoạt.', 'success');
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    setIs2FAModalOpen(false);
    showToast(
      twoFactorEnabled ? 'Đã tắt 2FA' : 'Đã bật 2FA',
      twoFactorEnabled ? 'Xác thực 2 lớp đã được tạm thời tắt.' : 'Xác thực 2 lớp (2FA) đã được kích hoạt bảo vệ tài khoản.',
      twoFactorEnabled ? 'warning' : 'success'
    );
  };

  const handleNavClick = (key, label) => {
    setActiveNav(key);
    setSidebarMobileOpen(false);
    if (key === 'home') {
      navigateMarketing('topdoo-developer-dashboard');
    } else if (key === 'projects') {
      navigateMarketing('topdoo-developer-projects');
    } else if (key === 'api-sdk') {
      navigateMarketing('topdoo-developer-api-sdk');
    } else if (key === 'playground') {
      navigateMarketing('topdoo-developer-playground');
    } else if (key === 'docs') {
      navigateMarketing('topdoo-developer-docs');
    } else if (key === 'api-keys') {
      navigateMarketing('topdoo-developer-api-keys');
    } else if (key === 'billing') {
      navigateMarketing('topdoo-developer-billing');
    } else if (key === 'support') {
      navigateMarketing('topdoo-developer-support');
    } else if (key === 'notifications') {
      navigateMarketing('topdoo-developer-notifications');
    } else if (key === 'settings') {
      navigateMarketing('topdoo-developer-settings');
    } else if (key === 'upgrade') {
      setActiveNav('billing');
      navigateMarketing('topdoo-developer-billing');
    } else {
      showToast(label, `Bạn đã chọn mục ${label}. Đang tải dữ liệu...`, 'info');
    }
  };

  const handleLogout = () => {
    showToast('Đăng xuất thành công', 'Hẹn gặp lại bạn tại Topdoo Developer!', 'success');
    navigateMarketing('home');
  };

  return (
    <div className="dev-dash-layout">
      {/* =========================================================================
          TOP HEADER NAVBAR
          ========================================================================= */}
      <header className="dev-dash-header">
        <div className="dev-dash-header-left">
          {/* Mobile hamburger menu toggle */}
          <button
            type="button"
            className="dev-dash-mobile-toggle"
            onClick={() => setSidebarMobileOpen(!sidebarMobileOpen)}
            aria-label="Toggle navigation"
          >
            {sidebarMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Topdoo Brand Logo */}
          <div
            className="dev-dash-brand"
            onClick={() => navigateMarketing('home')}
            role="button"
            tabIndex={0}
          >
            <div className="dev-dash-logo-icon">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="#0084FF" />
                <path
                  d="M10 16L14 20L22 12"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="dev-dash-brand-title">TOPDOO</span>
          </div>

          {/* Breadcrumb pill: </> Topdoo Developer */}
          <button
            type="button"
            className="dev-dash-portal-pill"
            onClick={() => navigateMarketing('topdoo-developer')}
          >
            <Code2 size={15} />
            <span>Topdoo Developer</span>
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="dev-dash-search-container">
          <div
            className="dev-dash-search-box"
            onClick={() => setIsGlobalSearchOpen && setIsGlobalSearchOpen(true)}
          >
            <Search size={16} className="dev-dash-search-icon" />
            <input
              type="text"
              readOnly
              placeholder="Tìm kiếm tài liệu, API, cài đặt, ..."
              className="dev-dash-search-input"
            />
            <kbd className="dev-dash-kbd-badge">⌘ K</kbd>
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="dev-dash-header-right">
          {/* Notification bell */}
          <button
            type="button"
            className="dev-dash-icon-btn"
            onClick={() => {
              setShowNotifications(!showNotifications);
              showToast('Thông báo', 'Bạn có 3 thông báo hệ thống mới nhất.', 'info');
            }}
            aria-label="Thông báo"
          >
            <Bell size={19} />
            <span className="dev-dash-bell-dot"></span>
          </button>

          {/* App grid icon */}
          <button
            type="button"
            className="dev-dash-icon-btn"
            onClick={() => {
              showToast('Hệ sinh thái Topdoo', 'Mở danh mục ứng dụng thuộc TOP Ecosystem.', 'info');
            }}
            aria-label="Ứng dụng"
          >
            <LayoutGrid size={19} />
          </button>

          {/* User profile dropdown trigger */}
          <div className="dev-dash-user-menu-wrap">
            <button
              type="button"
              className="dev-dash-user-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <img
                src={profileAvatar}
                alt={profileName}
                className="dev-dash-avatar"
              />
              <div className="dev-dash-user-info">
                <span className="dev-dash-user-name">{profileName}</span>
                <span className="dev-dash-user-role">{profileRole}</span>
              </div>
              <ChevronDown size={14} className="dev-dash-user-caret" />
            </button>

            {/* Dropdown popup */}
            {showUserMenu && (
              <>
                <div
                  className="dev-dash-dropdown-backdrop"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="dev-dash-dropdown-panel dev-dash-account-menu">
                  {/* Account Header */}
                  <div
                    className="dev-dash-account-header"
                    onClick={() => {
                      setShowUserMenu(false);
                      handleNavClick('profile', 'Thông tin cá nhân');
                    }}
                  >
                    <img
                      src={profileAvatar}
                      alt={profileName}
                      className="dev-dash-account-avatar"
                    />
                    <div className="dev-dash-account-details">
                      <div className="dev-dash-account-name">{profileName}</div>
                      <div className="dev-dash-account-email">{profileEmail}</div>
                      <div className="dev-dash-account-tags">
                        <span className="dev-dash-tag-pro">
                          <Crown size={11} fill="#FFFFFF" color="#FFFFFF" />
                          <span>Pro</span>
                        </span>
                        <span className="dev-dash-tag-role">Developer</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="dev-dash-account-arrow" />
                  </div>

                  <div className="dev-dash-dropdown-divider"></div>

                  {/* 1. Thông tin cá nhân */}
                  <button
                    type="button"
                    className="dev-dash-account-item"
                    onClick={() => {
                      setShowUserMenu(false);
                      handleNavClick('profile', 'Thông tin cá nhân');
                    }}
                  >
                    <div className="dev-dash-account-item-icon">
                      <User size={18} />
                    </div>
                    <div className="dev-dash-account-item-text">
                      <div className="dev-dash-account-item-title">Thông tin cá nhân</div>
                      <div className="dev-dash-account-item-sub">Quản lý hồ sơ, thông tin liên hệ</div>
                    </div>
                  </button>

                  {/* 2. Quản lý tài khoản */}
                  <button
                    type="button"
                    className="dev-dash-account-item"
                    onClick={() => {
                      setShowUserMenu(false);
                      handleNavClick('account-security', 'Quản lý tài khoản');
                    }}
                  >
                    <div className="dev-dash-account-item-icon">
                      <UserCog size={18} />
                    </div>
                    <div className="dev-dash-account-item-text">
                      <div className="dev-dash-account-item-title">Quản lý tài khoản</div>
                      <div className="dev-dash-account-item-sub">Bảo mật, đổi mật khẩu, xác thực 2 lớp</div>
                    </div>
                  </button>

                  {/* 3. Gói dịch vụ */}
                  <button
                    type="button"
                    className="dev-dash-account-item"
                    onClick={() => {
                      setShowUserMenu(false);
                      handleNavClick('billing', 'Gói dịch vụ');
                    }}
                  >
                    <div className="dev-dash-account-item-icon">
                      <CreditCard size={18} />
                    </div>
                    <div className="dev-dash-account-item-text">
                      <div className="dev-dash-account-item-title">Gói dịch vụ</div>
                      <div className="dev-dash-account-item-sub">Xem và nâng cấp gói sử dụng</div>
                    </div>
                  </button>

                  {/* 4. Cài đặt */}
                  <button
                    type="button"
                    className="dev-dash-account-item"
                    onClick={() => {
                      setShowUserMenu(false);
                      handleNavClick('settings', 'Cài đặt');
                    }}
                  >
                    <div className="dev-dash-account-item-icon">
                      <Settings size={18} />
                    </div>
                    <div className="dev-dash-account-item-text">
                      <div className="dev-dash-account-item-title">Cài đặt</div>
                      <div className="dev-dash-account-item-sub">Tùy chỉnh giao diện, thông báo</div>
                    </div>
                  </button>

                  {/* 5. Trung tâm trợ giúp */}
                  <button
                    type="button"
                    className="dev-dash-account-item"
                    onClick={() => {
                      setShowUserMenu(false);
                      handleNavClick('support', 'Trung tâm trợ giúp');
                    }}
                  >
                    <div className="dev-dash-account-item-icon">
                      <HelpCircle size={18} />
                    </div>
                    <div className="dev-dash-account-item-text">
                      <div className="dev-dash-account-item-title">Trung tâm trợ giúp</div>
                      <div className="dev-dash-account-item-sub">Hướng dẫn, tài liệu, liên hệ hỗ trợ</div>
                    </div>
                  </button>

                  <div className="dev-dash-dropdown-divider"></div>

                  {/* 6. Đăng xuất */}
                  <button
                    type="button"
                    className="dev-dash-account-item logout"
                    onClick={() => {
                      setShowUserMenu(false);
                      handleLogout();
                    }}
                  >
                    <div className="dev-dash-account-item-icon logout">
                      <LogOut size={18} />
                    </div>
                    <div className="dev-dash-account-item-text">
                      <div className="dev-dash-account-item-title logout">Đăng xuất</div>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
          MAIN LAYOUT: SIDEBAR + CONTENT
          ========================================================================= */}
      <div className="dev-dash-body">
        {/* Left Sidebar */}
        <aside className={`dev-dash-sidebar ${sidebarMobileOpen ? 'open' : ''}`}>
          <div className="dev-dash-sidebar-inner">
            {/* Top Navigation Links */}
            <nav className="dev-dash-nav-group">
              <button
                type="button"
                className={`dev-dash-nav-item ${activeNav === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home', 'Trang chủ')}
              >
                <Home size={18} />
                <span>Trang chủ</span>
              </button>

              <button
                type="button"
                className={`dev-dash-nav-item ${activeNav === 'projects' ? 'active' : ''}`}
                onClick={() => handleNavClick('projects', 'Dự án của tôi')}
              >
                <Folder size={18} />
                <span>Dự án của tôi</span>
              </button>

              <button
                type="button"
                className={`dev-dash-nav-item ${activeNav === 'api-sdk' ? 'active' : ''}`}
                onClick={() => handleNavClick('api-sdk', 'API & SDK')}
              >
                <Code2 size={18} />
                <span>API & SDK</span>
              </button>

              <button
                type="button"
                className={`dev-dash-nav-item ${activeNav === 'playground' ? 'active' : ''}`}
                onClick={() => handleNavClick('playground', 'Playground')}
              >
                <Tv size={18} />
                <span>Playground</span>
              </button>

              <button
                type="button"
                className={`dev-dash-nav-item ${activeNav === 'docs' ? 'active' : ''}`}
                onClick={() => handleNavClick('docs', 'Tài liệu')}
              >
                <BookOpen size={18} />
                <span>Tài liệu</span>
              </button>

              <button
                type="button"
                className={`dev-dash-nav-item ${activeNav === 'api-keys' ? 'active' : ''}`}
                onClick={() => handleNavClick('api-keys', 'Quản lý API Key')}
              >
                <Key size={18} />
                <span>Quản lý API Key</span>
              </button>

              <button
                type="button"
                className={`dev-dash-nav-item ${activeNav === 'billing' ? 'active' : ''}`}
                onClick={() => handleNavClick('billing', 'Thanh toán')}
              >
                <CreditCard size={18} />
                <span>Thanh toán</span>
              </button>

              <button
                type="button"
                className={`dev-dash-nav-item ${activeNav === 'support' ? 'active' : ''}`}
                onClick={() => handleNavClick('support', 'Hỗ trợ')}
              >
                <Headphones size={18} />
                <span>Hỗ trợ</span>
              </button>

              <button
                type="button"
                className={`dev-dash-nav-item ${activeNav === 'settings' ? 'active' : ''}`}
                onClick={() => handleNavClick('settings', 'Cài đặt')}
              >
                <Settings size={18} />
                <span>Cài đặt</span>
              </button>

              {activeNav === 'settings' && (
                <div className="dev-dash-subnav-group">
                  <button
                    type="button"
                    className={`dev-dash-subnav-item ${settingsSubTab === 'account' ? 'active' : ''}`}
                    onClick={() => setSettingsSubTab('account')}
                  >
                    <User size={16} />
                    <span>Tài khoản</span>
                  </button>
                  <button
                    type="button"
                    className={`dev-dash-subnav-item ${settingsSubTab === 'security' ? 'active' : ''}`}
                    onClick={() => setSettingsSubTab('security')}
                  >
                    <Lock size={16} />
                    <span>Bảo mật</span>
                  </button>
                  <button
                    type="button"
                    className={`dev-dash-subnav-item ${settingsSubTab === 'notifications' ? 'active' : ''}`}
                    onClick={() => setSettingsSubTab('notifications')}
                  >
                    <Bell size={16} />
                    <span>Thông báo</span>
                  </button>
                  <button
                    type="button"
                    className={`dev-dash-subnav-item ${settingsSubTab === 'appearance' ? 'active' : ''}`}
                    onClick={() => setSettingsSubTab('appearance')}
                  >
                    <Palette size={16} />
                    <span>Giao diện</span>
                  </button>
                  <button
                    type="button"
                    className={`dev-dash-subnav-item ${settingsSubTab === 'integrations' ? 'active' : ''}`}
                    onClick={() => setSettingsSubTab('integrations')}
                  >
                    <Puzzle size={16} />
                    <span>Tích hợp</span>
                  </button>
                  <button
                    type="button"
                    className={`dev-dash-subnav-item ${settingsSubTab === 'language' ? 'active' : ''}`}
                    onClick={() => setSettingsSubTab('language')}
                  >
                    <Globe size={16} />
                    <span>Ngôn ngữ</span>
                  </button>
                </div>
              )}
            </nav>

            {/* Upgrade Pro Card in Sidebar */}
            <div className="dev-dash-pro-card">
              <div className="dev-dash-pro-crown">
                <Crown size={18} color="#D97706" />
              </div>
              <h4 className="dev-dash-pro-title">Nâng cấp Pro</h4>
              <p className="dev-dash-pro-desc">
                Mở rộng giới hạn, nhiều tính năng mạnh mẽ hơn.
              </p>
              <button
                type="button"
                className="dev-dash-pro-btn"
                onClick={() => {
                  showToast('Nâng cấp Pro', 'Chuyển đến bảng giá gói Pro & Enterprise...', 'info');
                  navigateMarketing('topdoo-pricing');
                }}
              >
                <span>Nâng cấp ngay</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="dev-dash-sidebar-bottom">

              <button
                type="button"
                className="dev-dash-nav-item logout-link"
                onClick={handleLogout}
              >
                <LogOut size={18} />
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        </aside>

        {/* =========================================================================
            DASHBOARD MAIN VIEWPORT CONTENT
            ========================================================================= */}
        <main className="dev-dash-main">
          <div className={`dev-dash-content-container ${activeNav === 'docs' ? 'dev-dash-docs-container' : ''} ${activeNav === 'api-keys' ? 'dev-dash-keys-container' : ''} ${activeNav === 'billing' ? 'dev-dash-billing-container' : ''} ${activeNav === 'support' ? 'dev-dash-support-container' : ''} ${activeNav === 'playground' ? 'dev-dash-pg-container' : ''} ${activeNav === 'settings' ? 'dev-dash-settings-container' : ''} ${activeNav === 'notifications' ? 'dev-dash-notif-container' : ''}`}>
            {activeNav === 'home' && (
              <>
                {/* 1. GREETING HERO BANNER */}
                <div className="dev-dash-hero-card">
              {/* Left Column: Greeting */}
              <div className="dev-dash-hero-left">
                <h1 className="dev-dash-greeting-title">
                  Xin chào, Nguyễn Văn A! <span className="dev-dash-wave">👋</span>
                </h1>
                <p className="dev-dash-greeting-sub1">
                  Chào mừng bạn trở lại Topdoo Developer.
                </p>
                <p className="dev-dash-greeting-sub2">
                  Cùng tiếp tục xây dựng những sản phẩm tuyệt vời với AI!
                </p>
              </div>

              {/* Center Column: Robot Artwork with Badge */}
              <div className="dev-dash-hero-center">
                <div className="dev-dash-bubble-badge">
                  <span>Sáng tạo</span>
                  <br />
                  <strong>Không giới hạn</strong>
                  <br />
                  <span>cùng Topdoo!</span>
                </div>
                <img
                  src="/dev_robot_dashboard.png"
                  alt="Topdoo AI Developer Robot"
                  className="dev-dash-robot-img"
                />
              </div>

              {/* Right Column: Quotes Card */}
              <div className="dev-dash-hero-right">
                <div className="dev-dash-quote-card">
                  <span className="dev-dash-quote-mark">“</span>
                  <p className="dev-dash-quote-text">
                    Công nghệ mở ra cơ hội. Bạn tạo nên giá trị.”
                  </p>
                  <div className="dev-dash-quote-brand">TOPDOO</div>
                </div>
              </div>
            </div>

            {/* 2. OVERVIEW METRICS (4 CARDS) */}
            <div className="dev-dash-metrics-grid">
              {/* Metric 1: Tổng dự án */}
              <div
                className="dev-dash-metric-card"
                onClick={() => handleNavClick('projects', 'Tổng dự án')}
              >
                <div className="dev-dash-metric-icon-wrap blue">
                  <Package size={22} color="#0084FF" />
                </div>
                <span className="dev-dash-metric-label">Tổng dự án</span>
                <div className="dev-dash-metric-val">3</div>
                <div className="dev-dash-metric-trend green">
                  <TrendingUp size={13} />
                  <span>+1 dự án</span>
                </div>
                <div className="dev-dash-metric-link">
                  <span>Xem chi tiết</span>
                  <ArrowRight size={13} />
                </div>
              </div>

              {/* Metric 2: API Key */}
              <div
                className="dev-dash-metric-card"
                onClick={() => handleNavClick('api-keys', 'Quản lý API Key')}
              >
                <div className="dev-dash-metric-icon-wrap purple">
                  <Key size={22} color="#8B5CF6" />
                </div>
                <span className="dev-dash-metric-label">API Key</span>
                <div className="dev-dash-metric-val">5</div>
                <div className="dev-dash-metric-trend gray">
                  <span>2 đang hoạt động</span>
                </div>
                <div className="dev-dash-metric-link">
                  <span>Quản lý API Key</span>
                  <ArrowRight size={13} />
                </div>
              </div>

              {/* Metric 3: Lượt sử dụng API */}
              <div
                className="dev-dash-metric-card"
                onClick={() => handleNavClick('analytics', 'Thống kê API')}
              >
                <div className="dev-dash-metric-icon-wrap emerald">
                  <Users size={22} color="#10B981" />
                </div>
                <span className="dev-dash-metric-label">Lượt sử dụng API</span>
                <div className="dev-dash-metric-val">12.8K</div>
                <div className="dev-dash-metric-trend green">
                  <TrendingUp size={13} />
                  <span>+18% so với tháng trước</span>
                </div>
                <div className="dev-dash-metric-link">
                  <span>Xem thống kê</span>
                  <ArrowRight size={13} />
                </div>
              </div>

              {/* Metric 4: Gói dịch vụ */}
              <div
                className="dev-dash-metric-card"
                onClick={() => handleNavClick('upgrade', 'Gói dịch vụ')}
              >
                <div className="dev-dash-metric-icon-wrap orange">
                  <CreditCard size={22} color="#F97316" />
                </div>
                <span className="dev-dash-metric-label">Gói dịch vụ</span>
                <div className="dev-dash-metric-val">Free</div>
                <div className="dev-dash-metric-trend gray">
                  <span>Còn 14 ngày dùng thử</span>
                </div>
                <div className="dev-dash-metric-link">
                  <span>Nâng cấp ngay</span>
                  <ArrowRight size={13} />
                </div>
              </div>
            </div>

            {/* 3. MIDDLE ROW: CHART + RECENT PROJECTS */}
            <div className="dev-dash-split-row">
              {/* Left Column: API Usage Chart */}
              <div className="dev-dash-card dev-dash-chart-card">
                <div className="dev-dash-card-header">
                  <div className="dev-dash-card-title-group">
                    <h3 className="dev-dash-card-title">Thống kê lượt sử dụng API</h3>
                    <button
                      type="button"
                      className="dev-dash-info-trigger"
                      onClick={() =>
                        showToast(
                          'Thống kê API',
                          'Biểu đồ thể hiện tổng số request API hợp lệ gửi lên Topdoo AI Gateway.',
                          'info'
                        )
                      }
                      title="Thông tin biểu đồ"
                    >
                      <Info size={15} />
                    </button>
                  </div>

                  {/* Filter Pills */}
                  <div className="dev-dash-time-pills">
                    {[
                      { key: '7d', label: '7 ngày' },
                      { key: '30d', label: '30 ngày' },
                      { key: '3m', label: '3 tháng' },
                      { key: '1y', label: '1 năm' }
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        className={`dev-dash-time-pill ${timeRange === tab.key ? 'active' : ''}`}
                        onClick={() => {
                          setTimeRange(tab.key);
                          setHoveredPoint(chartDatasets[tab.key].values.length - 1);
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interactive SVG Chart Container */}
                <div className="dev-dash-chart-area">
                  <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="dev-dash-chart-svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="apiAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0084FF" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#0084FF" stopOpacity="0.01" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
                      const yVal = svgHeight - paddingY - pct * (svgHeight - paddingY * 2);
                      const displayNum = Math.round(pct * currentChart.max).toLocaleString('vi-VN');
                      return (
                        <g key={i} className="dev-dash-grid-row">
                          <line
                            x1={paddingX}
                            y1={yVal}
                            x2={svgWidth - paddingX}
                            y2={yVal}
                            stroke="#F1F5F9"
                            strokeWidth="1"
                          />
                          <text
                            x={paddingX - 10}
                            y={yVal + 4}
                            textAnchor="end"
                            className="dev-dash-axis-text"
                          >
                            {displayNum}
                          </text>
                        </g>
                      );
                    })}

                    {/* Area fill under curve */}
                    <path d={areaD} fill="url(#apiAreaGradient)" />

                    {/* Smooth curve line */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#0084FF"
                      strokeWidth="2.75"
                      strokeLinecap="round"
                    />

                    {/* Data dots on curve */}
                    {points.map((pt, idx) => (
                      <circle
                        key={idx}
                        cx={pt.x}
                        cy={pt.y}
                        r={hoveredPoint === idx ? 6 : 4}
                        fill="#0084FF"
                        stroke="#FFFFFF"
                        strokeWidth={hoveredPoint === idx ? 3 : 2}
                        className="dev-dash-data-dot"
                        onMouseEnter={() => setHoveredPoint(idx)}
                      />
                    ))}

                    {/* X-axis date labels */}
                    {points.map((pt, idx) => (
                      <text
                        key={idx}
                        x={pt.x}
                        y={svgHeight - 4}
                        textAnchor="middle"
                        className="dev-dash-axis-text"
                      >
                        {pt.label}
                      </text>
                    ))}
                  </svg>

                  {/* Tooltip callout (24/04/2025: 1.842 lượt gọi) */}
                  {points[hoveredPoint] && (
                    <div
                      className="dev-dash-chart-tooltip"
                      style={{
                        left: `${(points[hoveredPoint].x / svgWidth) * 100}%`,
                        top: `${(points[hoveredPoint].y / svgHeight) * 100}%`
                      }}
                    >
                      <div className="dev-dash-tooltip-date">{currentChart.activeLabel}</div>
                      <div className="dev-dash-tooltip-val">
                        <span className="dev-dash-tooltip-dot"></span>
                        <strong>{points[hoveredPoint].val.toLocaleString('vi-VN')} lượt gọi</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Recent Projects */}
              <div className="dev-dash-card dev-dash-recent-card">
                <div className="dev-dash-card-header">
                  <h3 className="dev-dash-card-title">Dự án gần đây</h3>
                  <button
                    type="button"
                    className="dev-dash-view-all-link"
                    onClick={() => handleNavClick('projects', 'Tất cả dự án')}
                  >
                    <span>Xem tất cả</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="dev-dash-project-list">
                  {/* Project 1 */}
                  <div className="dev-dash-project-item">
                    <div className="dev-dash-project-icon emerald">
                      <MessageSquare size={17} color="#FFFFFF" />
                    </div>
                    <div className="dev-dash-project-info">
                      <h4 className="dev-dash-project-name">Chatbot tư vấn khách hàng</h4>
                      <span className="dev-dash-project-time">Cập nhật 2 giờ trước</span>
                    </div>
                    <span className="dev-dash-status-pill active">Đang hoạt động</span>
                    <button
                      type="button"
                      className="dev-dash-item-menu"
                      onClick={() => showToast('Dự án', 'Mở tùy chọn cấu hình Chatbot.', 'info')}
                      aria-label="Tùy chọn"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {/* Project 2 */}
                  <div className="dev-dash-project-item">
                    <div className="dev-dash-project-icon purple">
                      <FileText size={17} color="#FFFFFF" />
                    </div>
                    <div className="dev-dash-project-info">
                      <h4 className="dev-dash-project-name">Phân tích văn bản AI</h4>
                      <span className="dev-dash-project-time">Cập nhật 1 ngày trước</span>
                    </div>
                    <span className="dev-dash-status-pill paused">Tạm dừng</span>
                    <button
                      type="button"
                      className="dev-dash-item-menu"
                      onClick={() => showToast('Dự án', 'Mở tùy chọn cấu hình Phân tích văn bản.', 'info')}
                      aria-label="Tùy chọn"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {/* Project 3 */}
                  <div className="dev-dash-project-item">
                    <div className="dev-dash-project-icon pink">
                      <ImageIcon size={17} color="#FFFFFF" />
                    </div>
                    <div className="dev-dash-project-info">
                      <h4 className="dev-dash-project-name">Tạo ảnh từ mô tả</h4>
                      <span className="dev-dash-project-time">Cập nhật 3 ngày trước</span>
                    </div>
                    <span className="dev-dash-status-pill active">Đang hoạt động</span>
                    <button
                      type="button"
                      className="dev-dash-item-menu"
                      onClick={() => showToast('Dự án', 'Mở tùy chọn cấu hình Tạo ảnh.', 'info')}
                      aria-label="Tùy chọn"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {/* Project 4 */}
                  <div className="dev-dash-project-item">
                    <div className="dev-dash-project-icon blue">
                      <GraduationCap size={17} color="#FFFFFF" />
                    </div>
                    <div className="dev-dash-project-info">
                      <h4 className="dev-dash-project-name">Trợ lý học tập</h4>
                      <span className="dev-dash-project-time">Cập nhật 5 ngày trước</span>
                    </div>
                    <span className="dev-dash-status-pill paused">Tạm dừng</span>
                    <button
                      type="button"
                      className="dev-dash-item-menu"
                      onClick={() => showToast('Dự án', 'Mở tùy chọn cấu hình Trợ lý học tập.', 'info')}
                      aria-label="Tùy chọn"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. BOTTOM ROW: FEATURED PRODUCTS + DOCS/SUPPORT */}
            <div className="dev-dash-split-row">
              {/* Left Column: Sản phẩm nổi bật */}
              <div className="dev-dash-card dev-dash-products-card">
                <div className="dev-dash-card-header">
                  <h3 className="dev-dash-card-title">Sản phẩm nổi bật</h3>
                  <button
                    type="button"
                    className="dev-dash-view-all-link"
                    onClick={() => handleNavClick('api-sdk', 'Khám phá tất cả sản phẩm')}
                  >
                    <span>Khám phá tất cả</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                <div className="dev-dash-prod-grid">
                  {/* Card 1: API Chat AI */}
                  <div className="dev-dash-prod-item">
                    <div className="dev-dash-prod-top-icon blue">
                      <MessageSquare size={20} color="#FFFFFF" />
                    </div>
                    <h4 className="dev-dash-prod-title">API Chat AI</h4>
                    <p className="dev-dash-prod-desc">
                      Tích hợp trí tuệ nhân tạo vào ứng dụng của bạn.
                    </p>
                    <button
                      type="button"
                      className="dev-dash-prod-action-btn blue"
                      onClick={() => {
                        showToast('API Chat AI', 'Khởi động tài liệu và Sandbox API Chat...', 'info');
                        navigateMarketing('topdoo-ai');
                      }}
                    >
                      <span>Bắt đầu</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Card 2: Tạo ảnh AI */}
                  <div className="dev-dash-prod-item">
                    <div className="dev-dash-prod-top-icon purple">
                      <ImageIcon size={20} color="#FFFFFF" />
                    </div>
                    <h4 className="dev-dash-prod-title">Tạo ảnh AI</h4>
                    <p className="dev-dash-prod-desc">
                      Biến ý tưởng thành hình ảnh chỉ với một dòng mô tả.
                    </p>
                    <button
                      type="button"
                      className="dev-dash-prod-action-btn purple"
                      onClick={() => {
                        showToast('Tạo ảnh AI', 'Mở Studio tạo ảnh Generative AI...', 'info');
                        navigateMarketing('topdoo-studio');
                      }}
                    >
                      <span>Thử ngay</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Card 3: Nhận dạng văn bản */}
                  <div className="dev-dash-prod-item">
                    <div className="dev-dash-prod-top-icon emerald">
                      <FileText size={20} color="#FFFFFF" />
                    </div>
                    <h4 className="dev-dash-prod-title">Nhận dạng văn bản</h4>
                    <p className="dev-dash-prod-desc">
                      Trích xuất dữ liệu từ tài liệu, hình ảnh (PDF, ảnh, ...)
                    </p>
                    <button
                      type="button"
                      className="dev-dash-prod-action-btn emerald"
                      onClick={() => {
                        showToast('OCR & Nhận dạng văn bản', 'Mở tài liệu API Document OCR...', 'info');
                        navigateMarketing('topdoo-tools');
                      }}
                    >
                      <span>Khám phá</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Card 4: Chuyển đổi giọng nói */}
                  <div className="dev-dash-prod-item">
                    <div className="dev-dash-prod-top-icon orange">
                      <Mic size={20} color="#FFFFFF" />
                    </div>
                    <h4 className="dev-dash-prod-title">Chuyển đổi giọng nói</h4>
                    <p className="dev-dash-prod-desc">
                      Chuyển văn bản thành giọng nói tự nhiên và đa ngôn ngữ.
                    </p>
                    <button
                      type="button"
                      className="dev-dash-prod-action-btn orange"
                      onClick={() => {
                        showToast('Voice TTS API', 'Mở tài liệu Text-to-Speech API...', 'info');
                        navigateMarketing('topdoo-ai');
                      }}
                    >
                      <span>Dùng thử</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Tài liệu & hỗ trợ */}
              <div className="dev-dash-card dev-dash-support-card">
                <div className="dev-dash-card-header">
                  <h3 className="dev-dash-card-title">Tài liệu & hỗ trợ</h3>
                </div>

                <div className="dev-dash-docs-list">
                  {/* Doc 1 */}
                  <div
                    className="dev-dash-doc-item"
                    onClick={() => {
                      showToast('Hướng dẫn bắt đầu', 'Mở cẩm nang làm quen Topdoo Developer...', 'info');
                      navigateMarketing('topdoo-developer');
                    }}
                  >
                    <div className="dev-dash-doc-icon">
                      <BookOpen size={18} color="#2563EB" />
                    </div>
                    <div className="dev-dash-doc-info">
                      <h4 className="dev-dash-doc-title">Hướng dẫn bắt đầu</h4>
                      <p className="dev-dash-doc-desc">Làm quen với Topdoo Developer</p>
                    </div>
                    <ChevronRight size={16} className="dev-dash-doc-arrow" />
                  </div>

                  {/* Doc 2 */}
                  <div
                    className="dev-dash-doc-item"
                    onClick={() => {
                      showToast('Tài liệu API', 'Mở tài liệu API Reference chi tiết...', 'info');
                      navigateMarketing('topdoo-developer');
                    }}
                  >
                    <div className="dev-dash-doc-icon">
                      <FileText size={18} color="#2563EB" />
                    </div>
                    <div className="dev-dash-doc-info">
                      <h4 className="dev-dash-doc-title">Tài liệu API</h4>
                      <p className="dev-dash-doc-desc">Tham khảo tài liệu chi tiết</p>
                    </div>
                    <ChevronRight size={16} className="dev-dash-doc-arrow" />
                  </div>

                  {/* Doc 3 */}
                  <div
                    className="dev-dash-doc-item"
                    onClick={() => {
                      showToast('Ví dụ & Playground', 'Khởi chạy code examples trực tiếp...', 'info');
                      navigateMarketing('topdoo-ai');
                    }}
                  >
                    <div className="dev-dash-doc-icon">
                      <Compass size={18} color="#2563EB" />
                    </div>
                    <div className="dev-dash-doc-info">
                      <h4 className="dev-dash-doc-title">Ví dụ & Playground</h4>
                      <p className="dev-dash-doc-desc">Trải nghiệm trực tiếp trong trình duyệt</p>
                    </div>
                    <ChevronRight size={16} className="dev-dash-doc-arrow" />
                  </div>

                  {/* Doc 4 */}
                  <div
                    className="dev-dash-doc-item"
                    onClick={() => {
                      showToast('Cộng đồng Developer', 'Mở kênh Discord / GitHub Topdoo Developer...', 'info');
                    }}
                  >
                    <div className="dev-dash-doc-icon">
                      <Users size={18} color="#2563EB" />
                    </div>
                    <div className="dev-dash-doc-info">
                      <h4 className="dev-dash-doc-title">Cộng đồng Developer</h4>
                      <p className="dev-dash-doc-desc">Kết nối, trao đổi và nhận hỗ trợ</p>
                    </div>
                    <ChevronRight size={16} className="dev-dash-doc-arrow" />
                  </div>
                </div>
              </div>
            </div>

            {/* 5. BOTTOM HELP / ASSISTANCE BANNER */}
            <div className="dev-dash-help-banner">
              <div className="dev-dash-help-left">
                <div className="dev-dash-help-icon-circle">
                  <Headphones size={22} color="#059669" />
                </div>
                <div className="dev-dash-help-info">
                  <h4 className="dev-dash-help-title">Cần hỗ trợ? Chúng tôi luôn sẵn sàng giúp bạn!</h4>
                  <p className="dev-dash-help-sub">
                    Liên hệ đội ngũ chuyên gia để được tư vấn nhanh chóng.
                  </p>
                </div>
              </div>

              <div className="dev-dash-help-actions">
                <button
                  type="button"
                  className="dev-dash-help-btn"
                  onClick={() =>
                    showToast('Tư vấn kỹ thuật', 'Kỹ sư giải pháp Topdoo đang kết nối...', 'info')
                  }
                >
                  <MessageSquare size={16} color="#2563EB" />
                  <span>Chat với chuyên gia</span>
                </button>

                <a
                  href="tel:19001234"
                  className="dev-dash-help-btn phone"
                  onClick={(e) => {
                    e.preventDefault();
                    showToast('Hotline hỗ trợ', 'Tổng đài Topdoo: 1900 1234 (miễn phí cuộc gọi)', 'info');
                  }}
                >
                  <Phone size={16} color="#2563EB" />
                  <span>1900 1234</span>
                </a>
              </div>
            </div>
          </>
        )}

        {/* =========================================================================
            PROJECTS TAB CONTENT (DỰ ÁN CỦA TÔI)
            ========================================================================= */}
        {activeNav === 'projects' && (
          <div className="dev-proj-wrapper">
            {/* 1. Header Row */}
            <div className="dev-proj-header-row">
              <div className="dev-proj-header-left">
                <h1 className="dev-proj-title">Dự án của tôi</h1>
                <p className="dev-proj-subtitle">
                  Quản lý, theo dõi và phát triển các dự án AI của bạn trên Topdoo.
                </p>
              </div>
              <button
                type="button"
                className="dev-proj-create-btn"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus size={18} strokeWidth={2.5} />
                <span>Tạo dự án mới</span>
              </button>
            </div>

            {/* 2. 4 KPI Metric Cards */}
            <div className="dev-proj-kpi-grid">
              {/* Card 1: Tổng dự án */}
              <div className="dev-proj-kpi-card">
                <div className="dev-proj-kpi-icon-wrap blue">
                  <Package size={22} color="#0084FF" />
                </div>
                <div className="dev-proj-kpi-body">
                  <span className="dev-proj-kpi-label">Tổng dự án</span>
                  <div className="dev-proj-kpi-num">{projectsList.length}</div>
                  <div className="dev-proj-kpi-sub">
                    <span className="dev-proj-kpi-trend green">↑ +1 dự án</span>
                    <span className="dev-proj-kpi-subtext">so với tháng trước</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Đang hoạt động */}
              <div className="dev-proj-kpi-card">
                <div className="dev-proj-kpi-icon-wrap green">
                  <Play size={20} color="#10B981" fill="#10B981" />
                </div>
                <div className="dev-proj-kpi-body">
                  <span className="dev-proj-kpi-label">Đang hoạt động</span>
                  <div className="dev-proj-kpi-num">
                    {projectsList.filter((p) => p.status === 'active').length}
                  </div>
                  <div className="dev-proj-kpi-sub">
                    <span className="dev-proj-kpi-pct green">66.7%</span>
                    <span className="dev-proj-kpi-subtext">tổng dự án</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Tạm dừng */}
              <div className="dev-proj-kpi-card">
                <div className="dev-proj-kpi-icon-wrap amber">
                  <Clock size={20} color="#F59E0B" />
                </div>
                <div className="dev-proj-kpi-body">
                  <span className="dev-proj-kpi-label">Tạm dừng</span>
                  <div className="dev-proj-kpi-num">
                    {projectsList.filter((p) => p.status === 'paused').length}
                  </div>
                  <div className="dev-proj-kpi-sub">
                    <span className="dev-proj-kpi-pct amber">33.3%</span>
                    <span className="dev-proj-kpi-subtext">tổng dự án</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Dự án hoàn thành */}
              <div className="dev-proj-kpi-card">
                <div className="dev-proj-kpi-icon-wrap purple">
                  <Trophy size={20} color="#8B5CF6" />
                </div>
                <div className="dev-proj-kpi-body">
                  <span className="dev-proj-kpi-label">Dự án hoàn thành</span>
                  <div className="dev-proj-kpi-num">
                    {projectsList.filter((p) => p.status === 'completed').length}
                  </div>
                  <div className="dev-proj-kpi-sub">
                    <span className="dev-proj-kpi-subtext encouragement">Tiếp tục cố gắng!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Toolbar: Search + 3 Dropdowns + View Mode Toggle */}
            <div className="dev-proj-toolbar">
              {/* Search box */}
              <div className="dev-proj-search-box">
                <Search size={18} className="dev-proj-search-icon" />
                <input
                  type="text"
                  className="dev-proj-search-input"
                  placeholder="Tìm kiếm dự án theo tên, mô tả..."
                  value={projectsSearch}
                  onChange={(e) => setProjectsSearch(e.target.value)}
                />
                {projectsSearch && (
                  <button
                    type="button"
                    className="dev-proj-search-clear"
                    onClick={() => setProjectsSearch('')}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Dropdowns */}
              <div className="dev-proj-select-wrap">
                <select
                  className="dev-proj-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="active">Đang hoạt động</option>
                  <option value="paused">Tạm dừng</option>
                  <option value="completed">Đã hoàn thành</option>
                </select>
                <ChevronDown size={14} className="dev-proj-select-arrow" />
              </div>

              <div className="dev-proj-select-wrap">
                <select
                  className="dev-proj-select"
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                >
                  <option value="all">Tất cả dịch vụ</option>
                  <option value="topdoo-ai">Topdoo AI</option>
                  <option value="topdoo-vision">Topdoo Vision</option>
                  <option value="topdoo-speech">Topdoo Speech</option>
                </select>
                <ChevronDown size={14} className="dev-proj-select-arrow" />
              </div>

              <div className="dev-proj-select-wrap">
                <select
                  className="dev-proj-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="newest">Sắp xếp: Mới nhất</option>
                  <option value="oldest">Sắp xếp: Cũ nhất</option>
                  <option value="name">Sắp xếp: Tên A-Z</option>
                  <option value="api">Sắp xếp: Lượt gọi API</option>
                </select>
                <ChevronDown size={14} className="dev-proj-select-arrow" />
              </div>

              {/* View Toggle */}
              <div className="dev-proj-view-toggle">
                <button
                  type="button"
                  className={`dev-proj-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="Xem dạng danh sách"
                >
                  <List size={18} />
                </button>
                <button
                  type="button"
                  className={`dev-proj-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Xem dạng lưới"
                >
                  <LayoutGrid size={18} />
                </button>
              </div>
            </div>

            {/* 4. Projects Cards List */}
            <div className={`dev-proj-cards-container ${viewMode === 'grid' ? 'grid-layout' : 'list-layout'}`}>
              {filteredProjects.length === 0 ? (
                <div className="dev-proj-empty-state">
                  <div className="dev-proj-empty-icon">
                    <Folder size={44} color="#94A3B8" />
                  </div>
                  <h3 className="dev-proj-empty-title">Không tìm thấy dự án phù hợp</h3>
                  <p className="dev-proj-empty-desc">
                    Hãy thử thay đổi từ khóa tìm kiếm hoặc đặt lại các bộ lọc trạng thái và dịch vụ.
                  </p>
                  <button
                    type="button"
                    className="dev-proj-create-btn"
                    onClick={() => {
                      setProjectsSearch('');
                      setStatusFilter('all');
                      setServiceFilter('all');
                    }}
                  >
                    <span>Đặt lại bộ lọc</span>
                  </button>
                </div>
              ) : (
                filteredProjects.map((proj) => {
                  const renderAppIcon = () => {
                    if (proj.iconType === 'image') {
                      return (
                        <div className="dev-proj-app-icon purple">
                          <ImageIcon size={26} color="#FFFFFF" />
                        </div>
                      );
                    }
                    if (proj.iconType === 'doc') {
                      return (
                        <div className="dev-proj-app-icon green">
                          <FileText size={26} color="#FFFFFF" />
                        </div>
                      );
                    }
                    return (
                      <div className="dev-proj-app-icon blue">
                        <MessageSquare size={26} color="#FFFFFF" />
                      </div>
                    );
                  };

                  return (
                    <div key={proj.id} className="dev-proj-card">
                      {/* Left: Icon + Title / Desc / Tags */}
                      <div className="dev-proj-card-left">
                        {renderAppIcon()}

                        <div className="dev-proj-card-main-info">
                          <div className="dev-proj-card-title-row">
                            <h3 className="dev-proj-card-title">{proj.name}</h3>
                            <button
                              type="button"
                              className="dev-proj-star-btn"
                              onClick={(e) => handleToggleStar(proj.id, proj.name, e)}
                              title={proj.starred ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
                            >
                              <Star
                                size={16}
                                color={proj.starred ? '#F59E0B' : '#94A3B8'}
                                fill={proj.starred ? '#F59E0B' : 'none'}
                              />
                            </button>
                          </div>

                          <p className="dev-proj-card-desc">{proj.desc}</p>

                          <div className="dev-proj-tags-row">
                            {proj.tags.map((tag, idx) => (
                              <span key={idx} className={`dev-proj-tag ${tag.type}`}>
                                {tag.prefix && <span className="dev-proj-tag-prefix">{tag.prefix} </span>}
                                {tag.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Middle: Status badge + Progress bar + Meta */}
                      <div className="dev-proj-card-mid">
                        <div className="dev-proj-status-row">
                          <div className={`dev-proj-status-pill ${proj.status}`}>
                            <span className="dev-proj-status-dot"></span>
                            <span>{proj.statusLabel}</span>
                          </div>
                        </div>

                        <div className="dev-proj-progress-row">
                          <div className="dev-proj-progress-track">
                            <div
                              className={`dev-proj-progress-bar ${proj.service === 'topdoo-vision' ? 'purple' : 'blue'}`}
                              style={{ width: `${proj.progress}%` }}
                            ></div>
                          </div>
                          <span className="dev-proj-progress-val">{proj.progress}%</span>
                        </div>

                        <div className="dev-proj-meta-row">
                          <div className="dev-proj-meta-item">
                            <Calendar size={15} className="dev-proj-meta-icon" />
                            <div className="dev-proj-meta-text-col">
                              <span className="dev-proj-meta-label">Cập nhật</span>
                              <span className="dev-proj-meta-val">{proj.updatedAt}</span>
                            </div>
                          </div>

                          <div className="dev-proj-meta-item">
                            <Users size={15} className="dev-proj-meta-icon" />
                            <div className="dev-proj-meta-text-col">
                              <span className="dev-proj-meta-label">Thành viên</span>
                              <span className="dev-proj-meta-val">{proj.members} người</span>
                            </div>
                          </div>

                          <div className="dev-proj-meta-item">
                            <Code2 size={15} className="dev-proj-meta-icon" />
                            <div className="dev-proj-meta-text-col">
                              <span className="dev-proj-meta-label">API đã dùng</span>
                              <span className="dev-proj-meta-val">{proj.apiCalls}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="dev-proj-card-right">
                        <button
                          type="button"
                          className={`dev-proj-action-btn ${proj.actionType}`}
                          onClick={() => {
                            if (proj.actionType === 'outline') {
                              setProjectsList((prev) =>
                                prev.map((p) =>
                                  p.id === proj.id
                                    ? {
                                        ...p,
                                        status: 'active',
                                        statusLabel: 'Đang hoạt động',
                                        actionText: 'Mở dự án',
                                        actionType: 'primary'
                                      }
                                    : p
                                )
                              );
                              showToast(
                                'Tiếp tục dự án',
                                `Dự án "${proj.name}" đã được kích hoạt lại thành công.`,
                                'success'
                              );
                            } else {
                              showToast(
                                'Mở dự án',
                                `Đang kết nối Workspace của "${proj.name}"...`,
                                'info'
                              );
                              navigateMarketing('developer-playground');
                            }
                          }}
                        >
                          <span>{proj.actionText}</span>
                          {proj.actionType === 'primary' && <ArrowRight size={14} />}
                        </button>

                        <div className="dev-proj-more-wrap">
                          <button
                            type="button"
                            className="dev-proj-more-btn"
                            onClick={() =>
                              setActiveProjectMenu(activeProjectMenu === proj.id ? null : proj.id)
                            }
                            title="Tùy chọn khác"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {activeProjectMenu === proj.id && (
                            <>
                              <div
                                className="dev-proj-menu-backdrop"
                                onClick={() => setActiveProjectMenu(null)}
                              ></div>
                              <div className="dev-proj-menu-dropdown">
                                <button
                                  type="button"
                                  className="dev-proj-menu-item"
                                  onClick={() => {
                                    setActiveProjectMenu(null);
                                    showToast('Cài đặt dự án', `Cấu hình dự án "${proj.name}"`, 'info');
                                  }}
                                >
                                  <Settings size={14} />
                                  <span>Cài đặt dự án</span>
                                </button>
                                <button
                                  type="button"
                                  className="dev-proj-menu-item"
                                  onClick={() => {
                                    setActiveProjectMenu(null);
                                    showToast(
                                      'Quản lý thành viên',
                                      `Dự án "${proj.name}" có ${proj.members} thành viên.`,
                                      'info'
                                    );
                                  }}
                                >
                                  <Users size={14} />
                                  <span>Quản lý thành viên</span>
                                </button>
                                <button
                                  type="button"
                                  className="dev-proj-menu-item"
                                  onClick={() => {
                                    setActiveProjectMenu(null);
                                    showToast('Nhật ký API', `Lịch sử gọi API của "${proj.name}"`, 'info');
                                  }}
                                >
                                  <Code2 size={14} />
                                  <span>Xem logs API</span>
                                </button>
                                <div className="dev-proj-menu-divider"></div>
                                <button
                                  type="button"
                                  className="dev-proj-menu-item"
                                  onClick={() => {
                                    setActiveProjectMenu(null);
                                    const nextStatus = proj.status === 'active' ? 'paused' : 'active';
                                    setProjectsList((prev) =>
                                      prev.map((p) =>
                                        p.id === proj.id
                                          ? {
                                              ...p,
                                              status: nextStatus,
                                              statusLabel:
                                                nextStatus === 'active' ? 'Đang hoạt động' : 'Tạm dừng',
                                              actionText:
                                                nextStatus === 'active' ? 'Mở dự án' : 'Tiếp tục',
                                              actionType: nextStatus === 'active' ? 'primary' : 'outline'
                                            }
                                          : p
                                      )
                                    );
                                    showToast(
                                      nextStatus === 'active' ? 'Đã kích hoạt' : 'Đã tạm dừng',
                                      `Dự án "${proj.name}" đã ${
                                        nextStatus === 'active' ? 'hoạt động trở lại.' : 'tạm dừng.'
                                      }`,
                                      'info'
                                    );
                                  }}
                                >
                                  {proj.status === 'active' ? <Clock size={14} /> : <Play size={14} />}
                                  <span>
                                    {proj.status === 'active' ? 'Tạm dừng dự án' : 'Tiếp tục dự án'}
                                  </span>
                                </button>
                                <button
                                  type="button"
                                  className="dev-proj-menu-item delete"
                                  onClick={() => {
                                    setActiveProjectMenu(null);
                                    setProjectsList((prev) => prev.filter((p) => p.id !== proj.id));
                                    showToast(
                                      'Xóa dự án',
                                      `Đã xóa dự án "${proj.name}" khỏi danh sách.`,
                                      'warning'
                                    );
                                  }}
                                >
                                  <X size={14} />
                                  <span>Xóa dự án</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* 5. Guide / Documentation Banner at Bottom */}
            <div className="dev-proj-guide-banner">
              <div className="dev-proj-guide-left">
                <div className="dev-proj-guide-icon-box">
                  <BookOpen size={20} color="#0084FF" />
                </div>
                <div className="dev-proj-guide-info">
                  <h4 className="dev-proj-guide-title">Hướng dẫn quản lý dự án</h4>
                  <p className="dev-proj-guide-desc">
                    Xem hướng dẫn chi tiết về cách tạo, cấu hình và triển khai dự án trên Topdoo Developer.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="dev-proj-guide-btn"
                onClick={() => {
                  showToast(
                    'Tài liệu hướng dẫn',
                    'Đang mở tài liệu Hướng dẫn Quản lý dự án Topdoo...',
                    'info'
                  );
                  navigateMarketing('developer-docs');
                }}
              >
                <span>Xem tài liệu</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            API & SDK TAB CONTENT
            ========================================================================= */}
        {activeNav === 'api-sdk' && (
          <div className="dev-apisdk-wrapper">
            <div className="dev-apisdk-layout-grid">
              {/* LEFT COLUMN: Services Catalog */}
              <div className="dev-apisdk-main-col">
                {/* 1. Header Row */}
                <div className="dev-apisdk-header-row">
                  <div className="dev-apisdk-header-left">
                    <h1 className="dev-apisdk-title">API &amp; SDK</h1>
                    <p className="dev-apisdk-subtitle">
                      Truy cập các mô hình AI mạnh mẽ của Topdoo, tích hợp nhanh chóng vào ứng dụng của bạn.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="dev-apisdk-guide-btn"
                    onClick={() => setIsIntegrationModalOpen(true)}
                  >
                    <BookOpen size={16} strokeWidth={2.2} />
                    <span>Hướng dẫn tích hợp</span>
                  </button>
                </div>

                {/* 2. Category Filter Pills */}
                <div className="dev-apisdk-cat-tabs" role="tablist">
                  {apiCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={apiCategoryFilter === cat.id}
                      className={`dev-apisdk-cat-tab ${apiCategoryFilter === cat.id ? 'active' : ''}`}
                      onClick={() => setApiCategoryFilter(cat.id)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* 3. Services List */}
                <div className="dev-apisdk-services-list">
                  {filteredApiServices.map((service) => (
                    <div key={service.id} className="dev-apisdk-service-card">
                      {/* Icon */}
                      <div className={`dev-apisdk-service-icon-box ${service.iconType}`}>
                        {service.iconType === 'chat' && <MessageSquare size={24} color="#FFFFFF" />}
                        {service.iconType === 'image' && <ImageIcon size={24} color="#FFFFFF" />}
                        {service.iconType === 'doc' && <FileText size={24} color="#FFFFFF" />}
                        {service.iconType === 'speech' && <Mic size={24} color="#FFFFFF" />}
                        {service.iconType === 'chart' && <BarChart3 size={24} color="#FFFFFF" />}
                        {service.iconType === 'sdk' && <Package size={24} color="#FFFFFF" />}
                      </div>

                      {/* Middle Body */}
                      <div className="dev-apisdk-service-body">
                        <div className="dev-apisdk-service-title-row">
                          <h3 className="dev-apisdk-service-name">{service.name}</h3>
                          {service.badge && (
                            <span className={`dev-apisdk-badge ${service.badge.type}`}>
                              {service.badge.text}
                            </span>
                          )}
                        </div>
                        <p className="dev-apisdk-service-desc">{service.desc}</p>
                        <div className="dev-apisdk-service-tags">
                          {service.tags.map((tag, i) => (
                            <span key={i} className="dev-apisdk-tag-chip">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right Meta & Actions */}
                      <div className="dev-apisdk-service-right">
                        <div className="dev-apisdk-service-meta-grid">
                          <div className="dev-apisdk-meta-col">
                            <span className="dev-apisdk-meta-label">Phiên bản</span>
                            <span className="dev-apisdk-meta-val version">{service.version}</span>
                          </div>
                          <div className="dev-apisdk-meta-col">
                            <span className="dev-apisdk-meta-label">Trạng thái</span>
                            <span className={`dev-apisdk-meta-val status ${service.status}`}>
                              <span className="dev-apisdk-status-dot" />
                              {service.statusLabel}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="dev-apisdk-doc-btn"
                          onClick={() => {
                            showToast('Tài liệu ' + service.name, `Đang mở tài liệu chi tiết cho ${service.name}...`, 'info');
                            setIsIntegrationModalOpen(true);
                          }}
                        >
                          <BookOpen size={14} />
                          <span>Xem tài liệu</span>
                        </button>
                      </div>

                      {/* Trailing Chevron arrow */}
                      <div
                        className="dev-apisdk-service-chevron"
                        onClick={() => {
                          showToast(service.name, `Xem chi tiết cấu hình và API reference của ${service.name}`, 'info');
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label="Xem chi tiết dịch vụ"
                      >
                        <ChevronRight size={18} color="#94A3B8" />
                      </div>
                    </div>
                  ))}

                  {filteredApiServices.length === 0 && (
                    <div className="dev-apisdk-empty-state">
                      <Package size={40} color="#94A3B8" />
                      <p className="dev-apisdk-empty-title">Không tìm thấy dịch vụ phù hợp</p>
                      <button
                        type="button"
                        className="dev-apisdk-reset-btn"
                        onClick={() => setApiCategoryFilter('all')}
                      >
                        Hiển thị tất cả dịch vụ
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: Sidebar Cards */}
              <div className="dev-apisdk-side-col">
                {/* 1. API Key của bạn */}
                <div className="dev-apisdk-side-card">
                  <div className="dev-apisdk-side-header">
                    <div className="dev-apisdk-side-title-wrap">
                      <div className="dev-apisdk-side-icon-circle blue">
                        <Key size={16} color="#0084FF" />
                      </div>
                      <h3 className="dev-apisdk-side-title">API Key của bạn</h3>
                    </div>
                    <button
                      type="button"
                      className="dev-apisdk-side-link-btn"
                      onClick={() => {
                        showToast('Quản lý API Key', 'Chuyển đến trang quản lý khóa bí mật...', 'info');
                        setActiveNav('api-keys');
                      }}
                    >
                      Quản lý
                    </button>
                  </div>

                  {/* Key display container */}
                  <div className="dev-apisdk-key-box">
                    <code className="dev-apisdk-key-code">
                      sk-••••••••••••••••••••••••a1b2
                    </code>
                    <button
                      type="button"
                      className={`dev-apisdk-copy-btn ${copiedApiKey ? 'copied' : ''}`}
                      onClick={handleCopyApiKey}
                      title="Sao chép API Key"
                      aria-label="Sao chép API Key"
                    >
                      {copiedApiKey ? <Check size={16} color="#059669" /> : <Copy size={16} />}
                    </button>
                  </div>

                  {/* Status & limits info */}
                  <div className="dev-apisdk-key-meta-list">
                    <div className="dev-apisdk-key-status">
                      <span className="dev-apisdk-status-dot green" />
                      <span className="dev-apisdk-key-status-text">Đang hoạt động</span>
                    </div>
                    <div className="dev-apisdk-key-meta-item">
                      <span>Tạo ngày: <strong>24/04/2025</strong></span>
                    </div>
                    <div className="dev-apisdk-key-meta-item">
                      <span>Hạn mức: <strong>100,000 requests/tháng</strong></span>
                    </div>
                  </div>

                  {/* Button + Tạo API Key mới */}
                  <button
                    type="button"
                    className="dev-apisdk-side-action-btn"
                    onClick={() => setIsCreateKeyModalOpen(true)}
                  >
                    <Plus size={16} strokeWidth={2.5} />
                    <span>Tạo API Key mới</span>
                  </button>
                </div>

                {/* 2. Thống kê sử dụng (Tháng này) */}
                <div className="dev-apisdk-side-card">
                  <div className="dev-apisdk-side-header">
                    <h3 className="dev-apisdk-side-title">Thống kê sử dụng (Tháng này)</h3>
                    <button
                      type="button"
                      className="dev-apisdk-side-link-btn"
                      onClick={() => {
                        showToast('Báo cáo thống kê', 'Đang chuyển đến trang thống kê lưu lượng chi tiết...', 'info');
                      }}
                    >
                      <span>Xem chi tiết</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="dev-apisdk-usage-numbers">
                    <span className="dev-apisdk-usage-req">
                      <strong>12,534</strong> / 100,000 requests
                    </span>
                    <span className="dev-apisdk-usage-percent">12.5%</span>
                  </div>

                  <div className="dev-apisdk-usage-progress-track">
                    <div
                      className="dev-apisdk-usage-progress-bar"
                      style={{ width: '12.5%' }}
                    />
                  </div>

                  <div className="dev-apisdk-mini-stat-grid">
                    {/* Box 1: Chi phí */}
                    <div className="dev-apisdk-mini-box">
                      <div className="dev-apisdk-mini-icon-circle green">
                        <Receipt size={16} color="#059669" />
                      </div>
                      <div className="dev-apisdk-mini-info">
                        <span className="dev-apisdk-mini-label">Chi phí</span>
                        <span className="dev-apisdk-mini-val">0 đ</span>
                      </div>
                    </div>

                    {/* Box 2: Gói hiện tại */}
                    <div className="dev-apisdk-mini-box">
                      <div className="dev-apisdk-mini-icon-circle amber">
                        <Crown size={16} color="#D97706" />
                      </div>
                      <div className="dev-apisdk-mini-info">
                        <div className="dev-apisdk-mini-header-row">
                          <span className="dev-apisdk-mini-label">Gói hiện tại</span>
                        </div>
                        <div className="dev-apisdk-mini-val-row">
                          <span className="dev-apisdk-mini-val">Free</span>
                          <button
                            type="button"
                            className="dev-apisdk-upgrade-link"
                            onClick={() => {
                              showToast('Nâng cấp gói', 'Chuyển đến trang bảng giá gói Developer Pro...', 'info');
                              navigateMarketing('topdoo-pricing');
                            }}
                          >
                            Nâng cấp
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Tài liệu & hỗ trợ */}
                <div className="dev-apisdk-side-card">
                  <div className="dev-apisdk-side-header">
                    <h3 className="dev-apisdk-side-title">Tài liệu &amp; hỗ trợ</h3>
                  </div>

                  <div className="dev-apisdk-docs-list">
                    <div
                      className="dev-apisdk-doc-item"
                      onClick={() => {
                        showToast('Tài liệu API', 'Đang mở cẩm nang tài liệu API endpoints chi tiết...', 'info');
                        setIsIntegrationModalOpen(true);
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="dev-apisdk-doc-item-icon">
                        <FileText size={18} color="#0084FF" />
                      </div>
                      <div className="dev-apisdk-doc-item-text">
                        <h4 className="dev-apisdk-doc-item-title">Tài liệu API</h4>
                        <p className="dev-apisdk-doc-item-desc">Hướng dẫn chi tiết từng endpoint</p>
                      </div>
                      <ChevronRight size={16} className="dev-apisdk-doc-item-arrow" />
                    </div>

                    <div
                      className="dev-apisdk-doc-item"
                      onClick={() => {
                        showToast('SDK & Thư viện', 'Tải SDK Topdoo cho Python, Node.js, Java, Go...', 'info');
                        setIsIntegrationModalOpen(true);
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="dev-apisdk-doc-item-icon">
                        <Code2 size={18} color="#0084FF" />
                      </div>
                      <div className="dev-apisdk-doc-item-text">
                        <h4 className="dev-apisdk-doc-item-title">SDK &amp; Thư viện</h4>
                        <p className="dev-apisdk-doc-item-desc">Tải SDK cho các ngôn ngữ phổ biến</p>
                      </div>
                      <ChevronRight size={16} className="dev-apisdk-doc-item-arrow" />
                    </div>

                    <div
                      className="dev-apisdk-doc-item"
                      onClick={() => {
                        showToast('Ví dụ & Playground', 'Khởi chạy môi trường trải nghiệm Playground trực tuyến...', 'info');
                        setActiveNav('playground');
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="dev-apisdk-doc-item-icon">
                        <Tv size={18} color="#0084FF" />
                      </div>
                      <div className="dev-apisdk-doc-item-text">
                        <h4 className="dev-apisdk-doc-item-title">Ví dụ &amp; Playground</h4>
                        <p className="dev-apisdk-doc-item-desc">Thử nghiệm trực tiếp trên trình duyệt</p>
                      </div>
                      <ChevronRight size={16} className="dev-apisdk-doc-item-arrow" />
                    </div>

                    <div
                      className="dev-apisdk-doc-item"
                      onClick={() => {
                        showToast('Câu hỏi thường gặp (FAQ)', 'Các câu hỏi thường gặp về tích hợp Topdoo API', 'info');
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="dev-apisdk-doc-item-icon">
                        <HelpCircle size={18} color="#0084FF" />
                      </div>
                      <div className="dev-apisdk-doc-item-text">
                        <h4 className="dev-apisdk-doc-item-title">Câu hỏi thường gặp</h4>
                        <p className="dev-apisdk-doc-item-desc">Những thắc mắc phổ biến</p>
                      </div>
                      <ChevronRight size={16} className="dev-apisdk-doc-item-arrow" />
                    </div>
                  </div>

                  <button
                    type="button"
                    className="dev-apisdk-support-btn"
                    onClick={() => {
                      showToast('Bộ phận hỗ trợ kỹ thuật', 'Kênh hỗ trợ kỹ thuật 24/7 của Topdoo đang sẵn sàng!', 'info');
                    }}
                  >
                    <Headphones size={18} />
                    <span>Liên hệ hỗ trợ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            PLAYGROUND TAB CONTENT
            ========================================================================= */}
        {activeNav === 'playground' && (
          <div className="dev-pg-wrapper">
            {/* Top Banner Row */}
            <div className="dev-pg-top-row">
              <div className="dev-pg-top-left">
                <h1 className="dev-pg-title">Playground</h1>
                <p className="dev-pg-subtitle">
                  Thử nghiệm và khám phá sức mạnh của các mô hình AI từ Topdoo. Viết prompt, tùy chỉnh tham số và nhận kết quả ngay lập tức.
                </p>
              </div>

              {/* Top Right: AI Robot Banner */}
              <div className="dev-pg-banner-card">
                <div className="dev-pg-banner-content">
                  <div className="dev-pg-banner-left">
                    <span className="dev-pg-banner-script">Build Without Limits</span>
                    <div className="dev-pg-robot-wrap">
                      <div className="dev-pg-robot-figure">
                        {/* Robot Head */}
                        <div className="dev-pg-robot-head">
                          <div className="dev-pg-robot-ear left" />
                          <div className="dev-pg-robot-ear right" />
                          <div className="dev-pg-robot-face">
                            <div className="dev-pg-robot-visor">
                              <div className="dev-pg-robot-eye left" />
                              <div className="dev-pg-robot-eye right" />
                            </div>
                          </div>
                        </div>
                        {/* Robot Torso */}
                        <div className="dev-pg-robot-torso">
                          <div className="dev-pg-robot-arm left" />
                          <div className="dev-pg-robot-badge">
                            <Code2 size={13} strokeWidth={2.5} color="#0084FF" />
                          </div>
                          <div className="dev-pg-robot-arm right" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dev-pg-banner-quote-box">
                    <p className="dev-pg-banner-quote">
                      “ Ý tưởng của bạn có thể tạo nên những điều tuyệt vời!! ”
                    </p>
                    <div className="dev-pg-banner-brand">
                      <strong>TOPDOO</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main 3-Column Layout Grid */}
            <div className="dev-pg-layout-grid">
              {/* =========================================================================
                  COLUMN 1 (LEFT): Model Settings & Prompt Templates
                  ========================================================================= */}
              <div className="dev-pg-col-left">
                {/* 1. Chọn mô hình Card */}
                <div className="dev-pg-card">
                  <div className="dev-pg-card-header">
                    <h3 className="dev-pg-card-title">Chọn mô hình</h3>
                    <button
                      type="button"
                      className="dev-pg-card-link-btn"
                      onClick={() => setActiveNav('api-sdk')}
                    >
                      <span>Xem tất cả</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  {/* Model Selector Dropdown Box */}
                  <div className="dev-pg-model-select-wrap">
                    <div
                      className="dev-pg-model-selected-box"
                      onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className={`dev-pg-model-icon-box ${currentSelectedModel.iconType}`}>
                        {currentSelectedModel.iconType === 'chat' && <MessageSquare size={18} color="#FFFFFF" />}
                        {currentSelectedModel.iconType === 'image' && <ImageIcon size={18} color="#FFFFFF" />}
                        {currentSelectedModel.iconType === 'doc' && <FileText size={18} color="#FFFFFF" />}
                        {currentSelectedModel.iconType === 'chart' && <BarChart3 size={18} color="#FFFFFF" />}
                      </div>
                      <div className="dev-pg-model-info">
                        <span className="dev-pg-model-name">{currentSelectedModel.name}</span>
                        <span className="dev-pg-model-code">{currentSelectedModel.code}</span>
                      </div>
                      <ChevronDown size={16} className={`dev-pg-dropdown-arrow ${isModelDropdownOpen ? 'open' : ''}`} />
                    </div>

                    {isModelDropdownOpen && (
                      <div className="dev-pg-model-dropdown-menu">
                        {playgroundModels.map((m) => (
                          <div
                            key={m.id}
                            className={`dev-pg-model-dropdown-item ${selectedModelId === m.id ? 'active' : ''}`}
                            onClick={() => {
                              setSelectedModelId(m.id);
                              setIsModelDropdownOpen(false);
                              showToast('Đã chọn mô hình', `Đã chuyển sang mô hình ${m.name}`, 'info');
                            }}
                          >
                            <div className={`dev-pg-model-icon-box mini ${m.iconType}`}>
                              {m.iconType === 'chat' && <MessageSquare size={13} color="#FFFFFF" />}
                              {m.iconType === 'image' && <ImageIcon size={13} color="#FFFFFF" />}
                              {m.iconType === 'doc' && <FileText size={13} color="#FFFFFF" />}
                              {m.iconType === 'chart' && <BarChart3 size={13} color="#FFFFFF" />}
                            </div>
                            <div className="dev-pg-model-item-text">
                              <strong>{m.name}</strong>
                              <span>{m.code}</span>
                            </div>
                            {selectedModelId === m.id && <Check size={14} color="#0084FF" />}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="dev-pg-model-desc">
                    {currentSelectedModel.desc}
                  </p>

                  {/* Slider 1: Temperature */}
                  <div className="dev-pg-param-control">
                    <div className="dev-pg-param-header">
                      <label className="dev-pg-param-label">Nhiệt độ (Temperature)</label>
                      <span className="dev-pg-param-val-badge">{temperature}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={temperature}
                      onChange={(e) => setTemperature(parseFloat(e.target.value))}
                      className="dev-pg-range-input"
                    />
                  </div>

                  {/* Slider 2: Max tokens */}
                  <div className="dev-pg-param-control">
                    <div className="dev-pg-param-header">
                      <label className="dev-pg-param-label">Độ dài tối đa (Max tokens)</label>
                      <span className="dev-pg-param-val-badge">{maxTokens}</span>
                    </div>
                    <input
                      type="range"
                      min="256"
                      max="4096"
                      step="128"
                      value={maxTokens}
                      onChange={(e) => setMaxTokens(parseInt(e.target.value, 10))}
                      className="dev-pg-range-input"
                    />
                  </div>

                  {/* Collapsible Advanced Options */}
                  <button
                    type="button"
                    className="dev-pg-advanced-btn"
                    onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  >
                    <div className="dev-pg-advanced-btn-left">
                      <Sliders size={14} />
                      <span>Tùy chọn nâng cao</span>
                    </div>
                    <ChevronDown size={14} className={showAdvancedOptions ? 'rotate' : ''} />
                  </button>

                  {showAdvancedOptions && (
                    <div className="dev-pg-advanced-fields">
                      <div className="dev-pg-param-control">
                        <div className="dev-pg-param-header">
                          <label className="dev-pg-param-label">Top P</label>
                          <span className="dev-pg-param-val-badge">{topP}</span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={topP}
                          onChange={(e) => setTopP(parseFloat(e.target.value))}
                          className="dev-pg-range-input"
                        />
                      </div>

                      <div className="dev-pg-param-control">
                        <div className="dev-pg-param-header">
                          <label className="dev-pg-param-label">Frequency Penalty</label>
                          <span className="dev-pg-param-val-badge">{frequencyPenalty}</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="2"
                          step="0.1"
                          value={frequencyPenalty}
                          onChange={(e) => setFrequencyPenalty(parseFloat(e.target.value))}
                          className="dev-pg-range-input"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Prompt mẫu Card */}
                <div className="dev-pg-card">
                  <div className="dev-pg-card-header">
                    <h3 className="dev-pg-card-title">Prompt mẫu</h3>
                    <button
                      type="button"
                      className="dev-pg-card-link-btn"
                      onClick={() => showToast('Mẫu Prompt AI', 'Đang tải thêm 40+ mẫu prompt chuyên sâu...', 'info')}
                    >
                      <span>Xem thêm</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  <div className="dev-pg-templates-list">
                    {promptTemplatesList.map((tpl) => (
                      <div
                        key={tpl.id}
                        className="dev-pg-template-item"
                        onClick={() => handleSelectTemplate(tpl)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className={`dev-pg-template-icon-circle ${tpl.iconType}`}>
                          {tpl.iconType === 'email' && <Mail size={15} color="#0284C7" />}
                          {tpl.iconType === 'doc' && <FileText size={15} color="#059669" />}
                          {tpl.iconType === 'translate' && <Languages size={15} color="#DB2777" />}
                          {tpl.iconType === 'sparkle' && <Sparkles size={15} color="#7C3AED" />}
                          {tpl.iconType === 'code' && <Code2 size={15} color="#0084FF" />}
                        </div>
                        <div className="dev-pg-template-info">
                          <strong className="dev-pg-template-title">{tpl.title}</strong>
                          <span className="dev-pg-template-sub">{tpl.sub}</span>
                        </div>
                        <ChevronRight size={15} className="dev-pg-template-arrow" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* =========================================================================
                  COLUMN 2 (CENTER): Prompt Editor & Result Output
                  ========================================================================= */}
              <div className="dev-pg-col-center">
                {/* 1. Nhập prompt Card */}
                <div className="dev-pg-card prompt-editor-card">
                  <div className="dev-pg-card-header">
                    <h3 className="dev-pg-card-title">Nhập prompt</h3>
                    <div className="dev-pg-header-actions">
                      <button
                        type="button"
                        className="dev-pg-action-icon-btn"
                        onClick={() => showToast('Đã lưu', 'Prompt đã được lưu vào bộ sưu tập cá nhân!', 'success')}
                        title="Lưu prompt"
                      >
                        <Bookmark size={14} />
                        <span>Lưu prompt</span>
                      </button>
                      <button
                        type="button"
                        className="dev-pg-action-icon-btn"
                        onClick={() => showToast('Chia sẻ', 'Liên kết chia sẻ prompt đã sẵn sàng!', 'info')}
                        title="Chia sẻ prompt"
                      >
                        <Share2 size={14} />
                        <span>Chia sẻ</span>
                      </button>
                      <button
                        type="button"
                        className="dev-pg-action-icon-btn"
                        onClick={() => showToast('Mẫu prompt', 'Đã mở danh mục mẫu câu hỏi...', 'info')}
                        title="Mẫu prompt"
                      >
                        <FileText size={14} />
                        <span>Mẫu prompt</span>
                      </button>
                    </div>
                  </div>

                  {/* Textarea Input */}
                  <div className="dev-pg-textarea-wrap">
                    <textarea
                      className="dev-pg-prompt-textarea"
                      rows={4}
                      value={promptInput}
                      onChange={(e) => setPromptInput(e.target.value)}
                      placeholder="Nhập yêu cầu hoặc câu hỏi cho Topdoo AI tại đây..."
                    />
                  </div>

                  {/* Bottom bar inside prompt card */}
                  <div className="dev-pg-editor-footer">
                    <div className="dev-pg-editor-tools">
                      <button
                        type="button"
                        className="dev-pg-tool-pill-btn"
                        onClick={() => showToast('Đính kèm tệp', 'Hỗ trợ tệp TXT, PDF, DOCX, CSV...', 'info')}
                      >
                        <Paperclip size={14} />
                        <span>Đính kèm</span>
                      </button>

                      <button
                        type="button"
                        className={`dev-pg-tool-pill-btn web-search ${isWebSearchEnabled ? 'active' : ''}`}
                        onClick={() => setIsWebSearchEnabled(!isWebSearchEnabled)}
                      >
                        <Globe size={14} />
                        <span>Web Search</span>
                        <span className="dev-pg-beta-badge">Beta</span>
                      </button>
                    </div>

                    <div className="dev-pg-editor-right-tools">
                      <span className="dev-pg-char-count">{promptInput.length}/10000</span>
                      <div className="dev-pg-run-btn-group">
                        <button
                          type="button"
                          className={`dev-pg-run-btn ${isPlaygroundRunning ? 'running' : ''}`}
                          onClick={handleRunPlayground}
                          disabled={isPlaygroundRunning}
                        >
                          <Play size={14} fill="#FFFFFF" />
                          <span>{isPlaygroundRunning ? 'Đang chạy...' : 'Chạy'}</span>
                        </button>
                        <button
                          type="button"
                          className="dev-pg-run-dropdown-btn"
                          onClick={() => showToast('Tùy chọn chạy', 'Chạy chế độ Streaming / Batching...', 'info')}
                          title="Tùy chọn thực thi"
                        >
                          <SlidersHorizontal size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Kết quả Card */}
                <div className="dev-pg-card result-card">
                  <div className="dev-pg-card-header">
                    <div className="dev-pg-result-title-row">
                      <h3 className="dev-pg-card-title">Kết quả</h3>
                      <span className="dev-pg-result-status-badge">
                        <span className="dev-pg-status-dot green" />
                        <span>Đã hoàn thành • 3.2s</span>
                      </span>
                    </div>

                    <div className="dev-pg-header-actions">
                      <button
                        type="button"
                        className={`dev-pg-action-icon-btn ${copiedPlaygroundResult ? 'copied' : ''}`}
                        onClick={handleCopyPlaygroundResult}
                        title="Sao chép kết quả"
                      >
                        {copiedPlaygroundResult ? <Check size={14} color="#059669" /> : <Copy size={14} />}
                        <span>{copiedPlaygroundResult ? 'Đã sao chép' : 'Sao chép'}</span>
                      </button>
                      <button
                        type="button"
                        className="dev-pg-action-icon-btn"
                        onClick={handleDownloadPlaygroundResult}
                        title="Tải xuống tệp Markdown"
                      >
                        <Download size={14} />
                        <span>Tải xuống</span>
                      </button>
                      <button
                        type="button"
                        className="dev-pg-action-icon-btn"
                        onClick={() => showToast('Chia sẻ kết quả', 'Đã tạo liên kết chia sẻ công khai!', 'info')}
                        title="Chia sẻ"
                      >
                        <Share2 size={14} />
                        <span>Chia sẻ</span>
                      </button>
                    </div>
                  </div>

                  {/* Formatted Markdown Preview */}
                  <div className="dev-pg-result-body">
                    <h2 className="dev-pg-result-h1"># {playgroundResult.title}</h2>

                    <h3 className="dev-pg-result-h2">## 1. Mục tiêu</h3>
                    <p className="dev-pg-result-p">{playgroundResult.goal}</p>

                    <h3 className="dev-pg-result-h2">## 2. Các tính năng chính</h3>
                    <ol className="dev-pg-result-numbered-list">
                      {playgroundResult.features.map((feat) => (
                        <li key={feat.id}>
                          <strong>{feat.id}. {feat.title}:</strong> {feat.desc}
                        </li>
                      ))}
                    </ol>

                    <h3 className="dev-pg-result-h2">## 3. Công nghệ đề xuất</h3>
                    <ul className="dev-pg-result-bullet-list">
                      {playgroundResult.techStack.map((tech, i) => (
                        <li key={i}>
                          <strong>- {tech.label}:</strong> {tech.val}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* =========================================================================
                  COLUMN 3 (RIGHT): Prompt History & Next Steps
                  ========================================================================= */}
              <div className="dev-pg-col-right">
                {/* 1. Lịch sử prompt Card */}
                <div className="dev-pg-card">
                  <div className="dev-pg-card-header">
                    <h3 className="dev-pg-card-title">Lịch sử prompt</h3>
                    <button
                      type="button"
                      className="dev-pg-card-link-btn"
                      onClick={() => showToast('Lịch sử truy vấn', 'Đang mở toàn bộ 120+ phiên thử nghiệm trước...', 'info')}
                    >
                      <span>Xem tất cả</span>
                      <ArrowRight size={12} />
                    </button>
                  </div>

                  {/* Search input */}
                  <div className="dev-pg-history-search">
                    <Search size={14} className="dev-pg-search-icon" />
                    <input
                      type="text"
                      className="dev-pg-history-search-input"
                      placeholder="Tìm kiếm lịch sử..."
                      value={historySearchQuery}
                      onChange={(e) => setHistorySearchQuery(e.target.value)}
                    />
                  </div>

                  {/* History List */}
                  <div className="dev-pg-history-list">
                    {promptHistoryList
                      .filter((item) =>
                        item.title.toLowerCase().includes(historySearchQuery.toLowerCase())
                      )
                      .map((item) => (
                        <div
                          key={item.id}
                          className={`dev-pg-history-item ${activeHistoryId === item.id ? 'active' : ''}`}
                          onClick={() => handleSelectHistory(item)}
                          role="button"
                          tabIndex={0}
                        >
                          <div className="dev-pg-history-icon-box">
                            {item.id === 1 ? <FileText size={15} color="#0084FF" /> :
                             item.id === 2 ? <FileText size={15} color="#64748B" /> :
                             item.id === 3 ? <Mail size={15} color="#64748B" /> :
                             item.id === 4 ? <BookOpen size={15} color="#64748B" /> :
                             <Sparkles size={15} color="#64748B" />}
                          </div>
                          <div className="dev-pg-history-info">
                            <span className="dev-pg-history-title">{item.title}</span>
                            <span className="dev-pg-history-time">{item.time}</span>
                          </div>
                          {item.id !== 1 && (
                            <button
                              type="button"
                              className="dev-pg-history-more-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                showToast(item.title, 'Đã mở menu tùy chọn phiên lịch sử', 'info');
                              }}
                              aria-label="Tùy chọn"
                            >
                              <MoreVertical size={13} />
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                </div>

                {/* 2. Gợi ý tiếp theo Card */}
                <div className="dev-pg-card">
                  <div className="dev-pg-card-header">
                    <h3 className="dev-pg-card-title">Gợi ý tiếp theo</h3>
                  </div>

                  <div className="dev-pg-next-steps-list">
                    <div
                      className="dev-pg-next-step-item"
                      onClick={() => {
                        setPromptInput(prev => prev + '\nHãy bổ sung thêm phần phân tích rủi ro và các giải pháp phòng ngừa.');
                        showToast('Chỉnh sửa kết quả', 'Đã thêm yêu cầu mở rộng vào prompt.', 'info');
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="dev-pg-next-step-icon">
                        <PenTool size={16} color="#0084FF" />
                      </div>
                      <div className="dev-pg-next-step-info">
                        <strong>Chỉnh sửa kết quả</strong>
                        <span>Yêu cầu tinh chỉnh hoặc mở rộng</span>
                      </div>
                    </div>

                    <div
                      className="dev-pg-next-step-item"
                      onClick={() => {
                        setTemperature(prev => prev === 0.7 ? 0.9 : 0.7);
                        showToast('Phiên bản khác', 'Đã điều chỉnh nhiệt độ sáng tạo của mô hình!', 'info');
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="dev-pg-next-step-icon">
                        <GitBranch size={16} color="#0084FF" />
                      </div>
                      <div className="dev-pg-next-step-info">
                        <strong>Tạo phiên bản khác</strong>
                        <span>Thử với tham số khác</span>
                      </div>
                    </div>

                    <div
                      className="dev-pg-next-step-item"
                      onClick={handleDownloadPlaygroundResult}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="dev-pg-next-step-icon">
                        <FileText size={16} color="#0084FF" />
                      </div>
                      <div className="dev-pg-next-step-info">
                        <strong>Chuyển thành tài liệu</strong>
                        <span>Xuất kết quả thành file PDF/Doc</span>
                      </div>
                    </div>

                    <div
                      className="dev-pg-next-step-item"
                      onClick={() => {
                        setActiveNav('projects');
                        showToast('Lưu vào dự án', 'Đã lưu cấu hình prompt vào Dự án của bạn!', 'success');
                      }}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="dev-pg-next-step-icon">
                        <FolderPlus size={16} color="#0084FF" />
                      </div>
                      <div className="dev-pg-next-step-info">
                        <strong>Lưu vào dự án</strong>
                        <span>Thêm vào dự án của bạn</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            DOCUMENTATION (TÀI LIỆU) TAB CONTENT
            ========================================================================= */}
        {activeNav === 'docs' && (
          <div className="dev-docs-wrapper">
            {/* Top Banner Row */}
            <div className="dev-docs-top-row">
              <div className="dev-docs-top-left">
                <h1 className="dev-docs-title">Tài liệu</h1>
                <p className="dev-docs-subtitle">
                  Khám phá tài liệu hướng dẫn chi tiết để xây dựng ứng dụng AI mạnh mẽ với Topdoo.
                </p>
              </div>

              {/* Top Right: Docs Banner Illustration */}
              <div className="dev-docs-banner-card">
                <div className="dev-docs-banner-content">
                  <div className="dev-docs-banner-illustration">
                    {/* Layered Document Sheets */}
                    <div className="dev-docs-sheet sheet-3" />
                    <div className="dev-docs-sheet sheet-2" />
                    <div className="dev-docs-sheet sheet-1">
                      <div className="dev-docs-sheet-stripe" />
                      <div className="dev-docs-sheet-line line-1" />
                      <div className="dev-docs-sheet-line line-2" />
                      <div className="dev-docs-sheet-line line-3" />
                    </div>

                    {/* Cloud Sync Badge */}
                    <div className="dev-docs-cloud-badge">
                      <Cloud size={16} color="#0084FF" fill="#E0F2FE" />
                    </div>

                    {/* AI Microchip */}
                    <div className="dev-docs-ai-chip">
                      <div className="dev-docs-chip-pins top" />
                      <div className="dev-docs-chip-pins bottom" />
                      <div className="dev-docs-chip-pins left" />
                      <div className="dev-docs-chip-pins right" />
                      <div className="dev-docs-chip-core">
                        <span>AI</span>
                      </div>
                    </div>
                  </div>

                  <span className="dev-docs-banner-script">Build Without Limits</span>
                </div>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="dev-docs-filter-bar">
              <div className="dev-docs-search-wrap">
                <Search size={16} className="dev-docs-search-icon" />
                <input
                  type="text"
                  className="dev-docs-search-input"
                  placeholder="Tìm kiếm tài liệu (ví dụ: API, Chat, RAG, ...)"
                  value={docSearchQuery}
                  onChange={(e) => setDocSearchQuery(e.target.value)}
                />
                {docSearchQuery && (
                  <button
                    type="button"
                    className="dev-docs-search-clear"
                    onClick={() => setDocSearchQuery('')}
                    aria-label="Xóa tìm kiếm"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Dropdown 1: Tất cả sản phẩm */}
              <div className="dev-docs-dropdown-wrap">
                <button
                  type="button"
                  className={`dev-docs-dropdown-btn ${isProductDropdownOpen ? 'open' : ''}`}
                  onClick={() => {
                    setIsProductDropdownOpen(!isProductDropdownOpen);
                    setIsTopicDropdownOpen(false);
                    setIsSortDropdownOpen(false);
                  }}
                >
                  <span>{docProductOptions.find(p => p.id === selectedDocProduct)?.label || 'Tất cả sản phẩm'}</span>
                  <ChevronDown size={14} className={isProductDropdownOpen ? 'rotate' : ''} />
                </button>
                {isProductDropdownOpen && (
                  <div className="dev-docs-dropdown-menu">
                    {docProductOptions.map(opt => (
                      <div
                        key={opt.id}
                        className={`dev-docs-dropdown-item ${selectedDocProduct === opt.id ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedDocProduct(opt.id);
                          setIsProductDropdownOpen(false);
                          showToast('Lọc sản phẩm', `Đã chọn: ${opt.label}`, 'info');
                        }}
                      >
                        <span>{opt.label}</span>
                        {selectedDocProduct === opt.id && <Check size={14} color="#0084FF" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown 2: Tất cả chủ đề */}
              <div className="dev-docs-dropdown-wrap">
                <button
                  type="button"
                  className={`dev-docs-dropdown-btn ${isTopicDropdownOpen ? 'open' : ''}`}
                  onClick={() => {
                    setIsTopicDropdownOpen(!isTopicDropdownOpen);
                    setIsProductDropdownOpen(false);
                    setIsSortDropdownOpen(false);
                  }}
                >
                  <span>{docTopicOptions.find(t => t.id === selectedDocTopic)?.label || 'Tất cả chủ đề'}</span>
                  <ChevronDown size={14} className={isTopicDropdownOpen ? 'rotate' : ''} />
                </button>
                {isTopicDropdownOpen && (
                  <div className="dev-docs-dropdown-menu">
                    {docTopicOptions.map(opt => (
                      <div
                        key={opt.id}
                        className={`dev-docs-dropdown-item ${selectedDocTopic === opt.id ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedDocTopic(opt.id);
                          setIsTopicDropdownOpen(false);
                          showToast('Lọc chủ đề', `Đã chọn: ${opt.label}`, 'info');
                        }}
                      >
                        <span>{opt.label}</span>
                        {selectedDocTopic === opt.id && <Check size={14} color="#0084FF" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dropdown 3: Sắp xếp */}
              <div className="dev-docs-dropdown-wrap">
                <button
                  type="button"
                  className={`dev-docs-dropdown-btn ${isSortDropdownOpen ? 'open' : ''}`}
                  onClick={() => {
                    setIsSortDropdownOpen(!isSortDropdownOpen);
                    setIsProductDropdownOpen(false);
                    setIsTopicDropdownOpen(false);
                  }}
                >
                  <span>{docSortOptions.find(s => s.id === docSortBy)?.label || 'Sắp xếp: Phổ biến nhất'}</span>
                  <ChevronDown size={14} className={isSortDropdownOpen ? 'rotate' : ''} />
                </button>
                {isSortDropdownOpen && (
                  <div className="dev-docs-dropdown-menu right">
                    {docSortOptions.map(opt => (
                      <div
                        key={opt.id}
                        className={`dev-docs-dropdown-item ${docSortBy === opt.id ? 'active' : ''}`}
                        onClick={() => {
                          setDocSortBy(opt.id);
                          setIsSortDropdownOpen(false);
                          showToast('Sắp xếp', `Đã chuyển sang: ${opt.label}`, 'info');
                        }}
                      >
                        <span>{opt.label}</span>
                        {docSortBy === opt.id && <Check size={14} color="#0084FF" />}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 6 Category Cards (Horizontal Row) */}
            <div className="dev-docs-categories-grid">
              {docCategories.map(cat => (
                <div
                  key={cat.id}
                  className={`dev-docs-category-card ${selectedDocProduct === cat.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedDocProduct(selectedDocProduct === cat.id ? 'all' : cat.id);
                    showToast(cat.title, `Đang lọc tài liệu theo: ${cat.title}`, 'info');
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className={`dev-docs-category-icon-box ${cat.id}`}>
                    {cat.icon === 'chat' && <MessageSquare size={18} color="#FFFFFF" />}
                    {cat.icon === 'image' && <ImageIcon size={18} color="#FFFFFF" />}
                    {cat.icon === 'ocr' && <FileText size={18} color="#FFFFFF" />}
                    {cat.icon === 'voice' && <Mic size={18} color="#FFFFFF" />}
                    {cat.icon === 'sdk' && <Package size={18} color="#FFFFFF" />}
                    {cat.icon === 'examples' && <Sparkles size={18} color="#FFFFFF" />}
                  </div>
                  <div className="dev-docs-category-body">
                    <strong className="dev-docs-category-title">{cat.title}</strong>
                    <span className="dev-docs-category-sub">{cat.sub}</span>
                    <span className="dev-docs-category-count">{cat.count}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Main 3-Column Layout Grid */}
            <div className="dev-docs-main-grid">
              {/* =========================================================================
                  COLUMN 1: Bắt đầu nhanh
                  ========================================================================= */}
              <div className="dev-docs-card dev-docs-col-quickstart">
                <div className="dev-docs-card-header">
                  <h3 className="dev-docs-card-title">Bắt đầu nhanh</h3>
                  <button
                    type="button"
                    className="dev-docs-card-link-btn"
                    onClick={() => showToast('Bắt đầu nhanh', 'Đang tải toàn bộ 15 bài hướng dẫn nhập môn...', 'info')}
                  >
                    <span>Xem tất cả</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

                <div className="dev-docs-quickstart-list">
                  {quickstartGuides
                    .filter(g =>
                      docSearchQuery === '' ||
                      g.title.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                      g.desc.toLowerCase().includes(docSearchQuery.toLowerCase())
                    )
                    .map((guide) => (
                      <div
                        key={guide.id}
                        className="dev-docs-quickstart-item"
                        onClick={() => setActiveDocModal(guide)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className="dev-docs-quickstart-icon">
                          {guide.icon === 'doc' && <FileText size={16} color="#0084FF" />}
                          {guide.icon === 'key' && <Key size={16} color="#0084FF" />}
                          {guide.icon === 'code' && <Code2 size={16} color="#0084FF" />}
                          {guide.icon === 'alert' && <HelpCircle size={16} color="#0084FF" />}
                          {guide.icon === 'check' && <Check size={16} color="#0084FF" />}
                        </div>
                        <div className="dev-docs-quickstart-info">
                          <strong className="dev-docs-quickstart-title">{guide.title}</strong>
                          <p className="dev-docs-quickstart-desc">{guide.desc}</p>
                        </div>
                        <div className="dev-docs-quickstart-time">
                          <Clock size={12} />
                          <span>{guide.time}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* =========================================================================
                  COLUMN 2: Tài liệu nổi bật
                  ========================================================================= */}
              <div className="dev-docs-card dev-docs-col-featured">
                <div className="dev-docs-card-header">
                  <h3 className="dev-docs-card-title">Tài liệu nổi bật</h3>
                </div>

                <div className="dev-docs-featured-list">
                  {featuredDocArticles
                    .filter(a =>
                      (selectedDocProduct === 'all' || a.productId === selectedDocProduct) &&
                      (docSearchQuery === '' ||
                       a.title.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                       a.desc.toLowerCase().includes(docSearchQuery.toLowerCase()))
                    )
                    .map((art) => (
                      <div
                        key={art.id}
                        className="dev-docs-featured-item"
                        onClick={() => setActiveDocModal(art)}
                        role="button"
                        tabIndex={0}
                      >
                        <div className={`dev-docs-featured-icon ${art.icon}`}>
                          {art.icon === 'chat' && <MessageSquare size={16} color="#FFFFFF" />}
                          {art.icon === 'image' && <ImageIcon size={16} color="#FFFFFF" />}
                          {art.icon === 'ocr' && <FileText size={16} color="#FFFFFF" />}
                          {art.icon === 'voice' && <Mic size={16} color="#FFFFFF" />}
                          {art.icon === 'sdk' && <Package size={16} color="#FFFFFF" />}
                          {art.icon === 'examples' && <Sparkles size={16} color="#FFFFFF" />}
                        </div>
                        <div className="dev-docs-featured-info">
                          <strong className="dev-docs-featured-title">{art.title}</strong>
                          <p className="dev-docs-featured-desc">{art.desc}</p>
                        </div>
                        <ChevronRight size={16} className="dev-docs-featured-arrow" />
                      </div>
                    ))}
                </div>
              </div>

              {/* =========================================================================
                  COLUMN 3: Mục lục & Cần hỗ trợ?
                  ========================================================================= */}
              <div className="dev-docs-col-right">
                {/* 1. Mục lục Card */}
                <div className="dev-docs-card dev-docs-toc-card">
                  <div className="dev-docs-card-header">
                    <h3 className="dev-docs-card-title">Mục lục</h3>
                  </div>

                  <nav className="dev-docs-toc-list" aria-label="Mục lục tài liệu">
                    {tableOfContents.map((item) => (
                      <div
                        key={item.id}
                        className={`dev-docs-toc-item ${activeTocItem === item.id ? 'active' : ''}`}
                        onClick={() => {
                          setActiveTocItem(item.id);
                          showToast(item.label, `Chuyển nhanh đến phân mục: ${item.label}`, 'info');
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <span className="dev-docs-toc-bullet">
                          {activeTocItem === item.id ? '|' : '•'}
                        </span>
                        <span className="dev-docs-toc-label">{item.label}</span>
                      </div>
                    ))}
                  </nav>
                </div>

                {/* 2. Cần hỗ trợ Card */}
                <div className="dev-docs-card dev-docs-support-card">
                  <div className="dev-docs-support-top">
                    <div className="dev-docs-support-icon">
                      <Headphones size={20} color="#0084FF" />
                    </div>
                    <div className="dev-docs-support-text">
                      <strong className="dev-docs-support-title">Cần hỗ trợ?</strong>
                      <p className="dev-docs-support-desc">
                        Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="dev-docs-support-btn"
                    onClick={() => {
                      showToast('Hỗ trợ kỹ thuật', 'Đang kết nối đội ngũ kỹ thuật Topdoo...', 'info');
                    }}
                  >
                    <span>Liên hệ hỗ trợ</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Banner */}
            <div className="dev-docs-bottom-banner">
              <div className="dev-docs-bottom-left">
                <div className="dev-docs-bottom-icon">
                  <BookOpen size={22} color="#0084FF" />
                </div>
                <div className="dev-docs-bottom-text">
                  <strong className="dev-docs-bottom-title">Tài liệu luôn được cập nhật</strong>
                  <p className="dev-docs-bottom-desc">
                    Chúng tôi liên tục bổ sung hướng dẫn mới, ví dụ thực tế và các tính năng mới nhất.
                  </p>
                </div>
              </div>

              <button
                type="button"
                className={`dev-docs-subscribe-btn ${isSubscribedUpdates ? 'subscribed' : ''}`}
                onClick={() => {
                  setIsSubscribedUpdates(!isSubscribedUpdates);
                  showToast(
                    isSubscribedUpdates ? 'Đã hủy theo dõi' : 'Đã đăng ký theo dõi',
                    isSubscribedUpdates
                      ? 'Bạn đã tắt nhận thông báo cập nhật tài liệu.'
                      : 'Bạn sẽ nhận thông báo khi có hướng dẫn hoặc SDK mới!',
                    'success'
                  );
                }}
              >
                <Bell size={15} />
                <span>{isSubscribedUpdates ? 'Đang theo dõi' : 'Theo dõi cập nhật'}</span>
              </button>
            </div>

            {/* Interactive Doc Reader Modal */}
            {activeDocModal && (
              <div
                className="dev-docs-modal-overlay"
                onClick={() => setActiveDocModal(null)}
              >
                <div
                  className="dev-docs-modal-card"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="dev-docs-modal-header">
                    <div className="dev-docs-modal-title-row">
                      <div className="dev-docs-modal-icon-badge">
                        <BookOpen size={18} color="#0084FF" />
                      </div>
                      <div>
                        <h3 className="dev-docs-modal-title">{activeDocModal.title}</h3>
                        <span className="dev-docs-modal-sub">
                          Tài liệu chính thức Topdoo Developer • Cập nhật hôm nay
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-docs-modal-close"
                      onClick={() => setActiveDocModal(null)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="dev-docs-modal-body">
                    <p className="dev-docs-modal-intro">
                      {activeDocModal.desc || activeDocModal.content}
                    </p>

                    <h4 className="dev-docs-modal-h4">Ví dụ gọi API thực tế (Python SDK)</h4>
                    <pre className="dev-docs-code-block">
                      <code>{`import topdoo

client = topdoo.Client(api_key="your_api_key_here")

response = client.chat.create(
    model="topdoo-chat-1.0",
    messages=[
        {"role": "user", "content": "Tóm tắt tài liệu này trong 3 ý chính"}
    ]
)
print(response.choices[0].message.content)`}</code>
                    </pre>

                    <div className="dev-docs-modal-tips">
                      <Sparkles size={16} color="#0084FF" />
                      <p>
                        <strong>Mẹo tối ưu:</strong> Bạn có thể bật tính năng streaming response bằng cách truyền <code>stream=True</code> để giảm độ trễ hiển thị từ phản hồi đầu tiên.
                      </p>
                    </div>
                  </div>

                  <div className="dev-docs-modal-footer">
                    <button
                      type="button"
                      className="dev-docs-modal-btn outline"
                      onClick={() => {
                        navigator.clipboard?.writeText(`import topdoo\nclient = topdoo.Client(api_key="your_api_key")`);
                        showToast('Đã sao chép mã nguồn', 'Mẫu code đã được lưu vào clipboard!', 'success');
                      }}
                    >
                      <Copy size={14} />
                      <span>Sao chép mã nguồn</span>
                    </button>
                    <button
                      type="button"
                      className="dev-docs-modal-btn primary"
                      onClick={() => {
                        setActiveNav('playground');
                        setActiveDocModal(null);
                        showToast('Mở Playground', 'Đã chuyển sang môi trường thử nghiệm với mã mẫu.', 'info');
                      }}
                    >
                      <span>Thử trong Playground</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            API KEYS VIEW (QUẢN LÝ API KEY)
            ========================================================================= */}
        {activeNav === 'api-keys' && (
          <div className="dev-keys-wrapper">
            {/* 1. Header Row & Top Right Shield Banner */}
            <div className="dev-keys-top-row">
              <div className="dev-keys-top-left">
                <h1 className="dev-keys-title">Quản lý API Key</h1>
                <p className="dev-keys-subtitle">
                  Tạo, quản lý và bảo mật API Key để truy cập các dịch vụ của Topdoo.
                </p>
              </div>

              {/* Right Visual Shield Banner */}
              <div className="dev-keys-banner-card">
                <div className="dev-keys-banner-content">
                  <div className="dev-keys-banner-shield-box">
                    <div className="dev-keys-shield-badge">
                      <Shield size={32} className="dev-keys-shield-icon" />
                      <Key size={16} className="dev-keys-shield-key-icon" />
                    </div>
                    <div className="dev-keys-shield-ring" />
                    <div className="dev-keys-shield-dot dot-1" />
                    <div className="dev-keys-shield-dot dot-2" />
                  </div>
                  <div className="dev-keys-banner-text">
                    <strong className="dev-keys-banner-heading">API an toàn</strong>
                    <span className="dev-keys-banner-subheading">Ứng dụng mạnh mẽ</span>
                    <span className="dev-keys-banner-tagline">Cùng Topdoo kiến tạo tương lai</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Stat Metrics & Action Button Row */}
            <div className="dev-keys-stats-row">
              {/* Card 1: Tổng API Key */}
              <div className="dev-keys-stat-card">
                <div className="dev-keys-stat-icon-box total">
                  <Key size={20} color="#0084FF" />
                </div>
                <div className="dev-keys-stat-info">
                  <span className="dev-keys-stat-label">Tổng API Key</span>
                  <div className="dev-keys-stat-val-row">
                    <strong className="dev-keys-stat-value">{apiKeysList.length}</strong>
                  </div>
                  <span className="dev-keys-stat-trend green">
                    <TrendingUp size={12} />
                    <span>+2 so với tháng trước</span>
                  </span>
                </div>
              </div>

              {/* Card 2: Đang hoạt động */}
              <div className="dev-keys-stat-card">
                <div className="dev-keys-stat-icon-box active">
                  <Check size={20} color="#10B981" />
                </div>
                <div className="dev-keys-stat-info">
                  <span className="dev-keys-stat-label">Đang hoạt động</span>
                  <div className="dev-keys-stat-val-row">
                    <strong className="dev-keys-stat-value">
                      {apiKeysList.filter(k => k.status === 'active').length}
                    </strong>
                  </div>
                  <span className="dev-keys-stat-trend green">
                    <span>{Math.round((apiKeysList.filter(k => k.status === 'active').length / Math.max(apiKeysList.length, 1)) * 100)}% tổng số</span>
                  </span>
                </div>
              </div>

              {/* Card 3: Đã hết hạn / Sắp hết hạn */}
              <div className="dev-keys-stat-card">
                <div className="dev-keys-stat-icon-box expired">
                  <Clock size={20} color="#F59E0B" />
                </div>
                <div className="dev-keys-stat-info">
                  <span className="dev-keys-stat-label">Đã hết hạn</span>
                  <div className="dev-keys-stat-val-row">
                    <strong className="dev-keys-stat-value">
                      {apiKeysList.filter(k => k.status === 'expiring').length}
                    </strong>
                  </div>
                  <span className="dev-keys-stat-trend orange">
                    <span>{Math.round((apiKeysList.filter(k => k.status === 'expiring').length / Math.max(apiKeysList.length, 1)) * 100)}% tổng số</span>
                  </span>
                </div>
              </div>

              {/* Card 4: Đã thu hồi */}
              <div className="dev-keys-stat-card">
                <div className="dev-keys-stat-icon-box revoked">
                  <Ban size={20} color="#EF4444" />
                </div>
                <div className="dev-keys-stat-info">
                  <span className="dev-keys-stat-label">Đã thu hồi</span>
                  <div className="dev-keys-stat-val-row">
                    <strong className="dev-keys-stat-value">
                      {apiKeysList.filter(k => k.status === 'revoked').length}
                    </strong>
                  </div>
                  <span className="dev-keys-stat-trend red">
                    <span>{Math.round((apiKeysList.filter(k => k.status === 'revoked').length / Math.max(apiKeysList.length, 1)) * 100)}% tổng số</span>
                  </span>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="button"
                className="dev-keys-btn-create-primary"
                onClick={() => {
                  setCreatedNewKeySuccess(null);
                  setIsCreateKeyModalOpen(true);
                }}
              >
                <Plus size={16} />
                <span>Tạo API Key mới</span>
              </button>
            </div>

            {/* 3. Filter Tabs, Search & Filter Bar */}
            <div className="dev-keys-control-bar">
              {/* Left Tabs */}
              <div className="dev-keys-tabs">
                <button
                  type="button"
                  className={`dev-keys-tab-btn ${keyActiveTab === 'all' ? 'active' : ''}`}
                  onClick={() => setKeyActiveTab('all')}
                >
                  <span>Tất cả ({apiKeysList.length})</span>
                </button>
                <button
                  type="button"
                  className={`dev-keys-tab-btn ${keyActiveTab === 'active' ? 'active' : ''}`}
                  onClick={() => setKeyActiveTab('active')}
                >
                  <span>Đang hoạt động ({apiKeysList.filter(k => k.status === 'active').length})</span>
                </button>
                <button
                  type="button"
                  className={`dev-keys-tab-btn ${keyActiveTab === 'expiring' ? 'active' : ''}`}
                  onClick={() => setKeyActiveTab('expiring')}
                >
                  <span>Đã hết hạn ({apiKeysList.filter(k => k.status === 'expiring').length})</span>
                </button>
                <button
                  type="button"
                  className={`dev-keys-tab-btn ${keyActiveTab === 'revoked' ? 'active' : ''}`}
                  onClick={() => setKeyActiveTab('revoked')}
                >
                  <span>Đã thu hồi ({apiKeysList.filter(k => k.status === 'revoked').length})</span>
                </button>
              </div>

              {/* Right Search & Filter Button */}
              <div className="dev-keys-filter-actions">
                <div className="dev-keys-search-wrap">
                  <Search size={15} className="dev-keys-search-icon" />
                  <input
                    type="text"
                    className="dev-keys-search-input"
                    placeholder="Tìm kiếm theo tên, mô tả, key ID..."
                    value={keySearchQuery}
                    onChange={(e) => setKeySearchQuery(e.target.value)}
                  />
                  {keySearchQuery && (
                    <button
                      type="button"
                      className="dev-keys-search-clear"
                      onClick={() => setKeySearchQuery('')}
                      aria-label="Xóa tìm kiếm"
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>

                <div className="dev-keys-dropdown-wrap">
                  <button
                    type="button"
                    className={`dev-keys-btn-filter ${isFilterDropdownOpen ? 'active' : ''}`}
                    onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                  >
                    <SlidersHorizontal size={15} />
                    <span>Bộ lọc</span>
                  </button>

                  {isFilterDropdownOpen && (
                    <div className="dev-keys-filter-dropdown-menu">
                      <div className="dev-keys-filter-group">
                        <label className="dev-keys-filter-label">Theo Dự án:</label>
                        <select
                          className="dev-keys-filter-select"
                          value={keyProjectFilter}
                          onChange={(e) => setKeyProjectFilter(e.target.value)}
                        >
                          <option value="all">Tất cả dự án</option>
                          <option value="Chatbot EduTech">Chatbot EduTech</option>
                          <option value="Topdoo Studio">Topdoo Studio</option>
                          <option value="Document AI">Document AI</option>
                          <option value="Playground">Playground</option>
                          <option value="Internal">Internal</option>
                        </select>
                      </div>

                      <div className="dev-keys-filter-group">
                        <label className="dev-keys-filter-label">Theo Quyền hạn:</label>
                        <select
                          className="dev-keys-filter-select"
                          value={keyPermissionFilter}
                          onChange={(e) => setKeyPermissionFilter(e.target.value)}
                        >
                          <option value="all">Tất cả quyền hạn</option>
                          <option value="Chat">Chat</option>
                          <option value="RAG">RAG</option>
                          <option value="TTS">TTS</option>
                          <option value="OCR">OCR</option>
                          <option value="Image">Image</option>
                          <option value="All">All</option>
                        </select>
                      </div>

                      <button
                        type="button"
                        className="dev-keys-filter-reset-btn"
                        onClick={() => {
                          setKeyProjectFilter('all');
                          setKeyPermissionFilter('all');
                          setIsFilterDropdownOpen(false);
                          showToast('Đã làm mới bộ lọc', 'Hiển thị toàn bộ API Key.', 'info');
                        }}
                      >
                        Đặt lại bộ lọc
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 4. API Keys Table */}
            <div className="dev-keys-table-card">
              <div className="dev-keys-table-responsive">
                <table className="dev-keys-table">
                  <thead>
                    <tr>
                      <th className="th-checkbox">
                        <input
                          type="checkbox"
                          className="dev-keys-checkbox"
                          checked={
                            apiKeysList.length > 0 &&
                            selectedKeyIds.length === apiKeysList.length
                          }
                          onChange={() => handleToggleSelectAllKeys(apiKeysList)}
                          aria-label="Chọn tất cả khóa"
                        />
                      </th>
                      <th className="th-name">Tên API Key</th>
                      <th className="th-key">Key (hiển thị một phần)</th>
                      <th className="th-project">Dự án</th>
                      <th className="th-permissions">Quyền hạn</th>
                      <th className="th-created">Ngày tạo</th>
                      <th className="th-expiry">Hết hạn</th>
                      <th className="th-status">Trạng thái</th>
                      <th className="th-actions">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeysList
                      .filter(k => {
                        // Tab Filter
                        if (keyActiveTab === 'active' && k.status !== 'active') return false;
                        if (keyActiveTab === 'expiring' && k.status !== 'expiring') return false;
                        if (keyActiveTab === 'revoked' && k.status !== 'revoked') return false;

                        // Project Filter
                        if (keyProjectFilter !== 'all' && k.project !== keyProjectFilter) return false;

                        // Permission Filter
                        if (keyPermissionFilter !== 'all' && !k.permissions.includes(keyPermissionFilter) && !k.permissions.includes('All')) return false;

                        // Search Query
                        if (keySearchQuery.trim()) {
                          const query = keySearchQuery.toLowerCase();
                          return (
                            k.name.toLowerCase().includes(query) ||
                            k.desc.toLowerCase().includes(query) ||
                            k.project.toLowerCase().includes(query) ||
                            k.prefix.toLowerCase().includes(query) ||
                            k.suffix.toLowerCase().includes(query)
                          );
                        }
                        return true;
                      })
                      .map((keyItem) => {
                        const isSelected = selectedKeyIds.includes(keyItem.id);
                        const isRevealed = revealedKeyIds.includes(keyItem.id);
                        const isMenuOpen = activeActionMenuKeyId === keyItem.id;

                        return (
                          <tr key={keyItem.id} className={`dev-keys-row ${isSelected ? 'selected' : ''}`}>
                            <td className="td-checkbox">
                              <input
                                type="checkbox"
                                className="dev-keys-checkbox"
                                checked={isSelected}
                                onChange={() => handleToggleSelectKey(keyItem.id)}
                                aria-label={`Chọn ${keyItem.name}`}
                              />
                            </td>

                            <td className="td-name">
                              <div className="dev-keys-name-cell">
                                <strong className="dev-keys-name-title">{keyItem.name}</strong>
                                <span className="dev-keys-name-desc">{keyItem.desc}</span>
                              </div>
                            </td>

                            <td className="td-key">
                              <div className="dev-keys-code-cell">
                                <code className="dev-keys-code-text">
                                  {isRevealed
                                    ? keyItem.rawKey
                                    : `${keyItem.prefix}****************${keyItem.suffix}`}
                                </code>
                                <button
                                  type="button"
                                  className="dev-keys-btn-copy"
                                  onClick={() => handleCopySingleKey(keyItem)}
                                  title="Sao chép API Key"
                                  aria-label="Sao chép"
                                >
                                  <Copy size={13} />
                                </button>
                              </div>
                            </td>

                            <td className="td-project">
                              <span className="dev-keys-project-name">{keyItem.project}</span>
                            </td>

                            <td className="td-permissions">
                              <div className="dev-keys-perm-badges">
                                {keyItem.permissions.map((perm) => (
                                  <span key={perm} className="dev-keys-perm-badge">
                                    {perm}
                                  </span>
                                ))}
                              </div>
                            </td>

                            <td className="td-created">
                              <div className="dev-keys-date-cell">
                                <span className="dev-keys-date-main">{keyItem.createdAtDate}</span>
                                <span className="dev-keys-date-sub">{keyItem.createdAtTime}</span>
                              </div>
                            </td>

                            <td className="td-expiry">
                              <span className="dev-keys-expiry-text">{keyItem.expiresAt}</span>
                            </td>

                            <td className="td-status">
                              <div className="dev-keys-status-cell">
                                <span className={`dev-keys-status-pill ${keyItem.status}`}>
                                  <span className="dev-keys-status-dot" />
                                  <span>{keyItem.statusLabel}</span>
                                </span>
                                {keyItem.subStatus && (
                                  <span className={`dev-keys-substatus ${keyItem.status}`}>
                                    {keyItem.subStatus}
                                  </span>
                                )}
                              </div>
                            </td>

                            <td className="td-actions">
                              <div className="dev-keys-action-cell">
                                <button
                                  type="button"
                                  className="dev-keys-btn-more"
                                  onClick={() =>
                                    setActiveActionMenuKeyId(isMenuOpen ? null : keyItem.id)
                                  }
                                  aria-label="Tùy chọn thao tác"
                                >
                                  <MoreHorizontal size={18} />
                                </button>

                                {isMenuOpen && (
                                  <div className="dev-keys-action-menu">
                                    <button
                                      type="button"
                                      className="dev-keys-action-item"
                                      onClick={() => {
                                        handleCopySingleKey(keyItem);
                                        setActiveActionMenuKeyId(null);
                                      }}
                                    >
                                      <Copy size={13} />
                                      <span>Sao chép Key</span>
                                    </button>

                                    <button
                                      type="button"
                                      className="dev-keys-action-item"
                                      onClick={() => {
                                        handleToggleRevealKey(keyItem.id);
                                        setActiveActionMenuKeyId(null);
                                      }}
                                    >
                                      {isRevealed ? <EyeOff size={13} /> : <Eye size={13} />}
                                      <span>{isRevealed ? 'Ẩn mã đầy đủ' : 'Xem mã đầy đủ'}</span>
                                    </button>

                                    {keyItem.status !== 'revoked' && (
                                      <button
                                        type="button"
                                        className="dev-keys-action-item warning"
                                        onClick={() => handleRevokeSingleKey(keyItem.id)}
                                      >
                                        <Ban size={13} />
                                        <span>Thu hồi Key</span>
                                      </button>
                                    )}

                                    <button
                                      type="button"
                                      className="dev-keys-action-item danger"
                                      onClick={() => handleDeleteSingleKey(keyItem.id)}
                                    >
                                      <Trash2 size={13} />
                                      <span>Xóa Key</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 5. Bottom 3 Guide & Best Practices Cards */}
            <div className="dev-keys-bottom-grid">
              {/* Card 1: Hướng dẫn sử dụng API Key */}
              <div className="dev-keys-bottom-card">
                <div className="dev-keys-bottom-icon-box blue">
                  <FileText size={22} color="#0084FF" />
                </div>
                <div className="dev-keys-bottom-info">
                  <strong className="dev-keys-bottom-title">Hướng dẫn sử dụng API Key</strong>
                  <p className="dev-keys-bottom-desc">
                    Tìm hiểu cách tạo, cấu hình và bảo mật API Key để tích hợp nhanh chóng.
                  </p>
                  <button
                    type="button"
                    className="dev-keys-bottom-btn"
                    onClick={() => {
                      setActiveNav('docs');
                      navigateMarketing('topdoo-developer-docs');
                      showToast('Tài liệu API', 'Chuyển đến tài liệu hướng dẫn API Key...', 'info');
                    }}
                  >
                    <span>Xem tài liệu</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Card 2: Best Practices */}
              <div className="dev-keys-bottom-card">
                <div className="dev-keys-bottom-icon-box green">
                  <Check size={22} color="#10B981" />
                </div>
                <div className="dev-keys-bottom-info">
                  <strong className="dev-keys-bottom-title">Best Practices</strong>
                  <ul className="dev-keys-practices-list">
                    <li>
                      <Check size={13} className="dev-keys-practice-check" />
                      <span>Không chia sẻ API Key công khai</span>
                    </li>
                    <li>
                      <Check size={13} className="dev-keys-practice-check" />
                      <span>Sử dụng biến môi trường</span>
                    </li>
                    <li>
                      <Check size={13} className="dev-keys-practice-check" />
                      <span>Thiết lập quyền hạn phù hợp</span>
                    </li>
                    <li>
                      <Check size={13} className="dev-keys-practice-check" />
                      <span>Thu hồi Key không sử dụng</span>
                    </li>
                  </ul>
                  <button
                    type="button"
                    className="dev-keys-bottom-link-btn"
                    onClick={() => {
                      showToast('Best Practices', 'Đang mở cẩm nang bảo mật hệ thống API Topdoo...', 'info');
                    }}
                  >
                    <span>Xem hướng dẫn</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>

              {/* Card 3: Cần hỗ trợ? */}
              <div className="dev-keys-bottom-card">
                <div className="dev-keys-bottom-icon-box blue-circle">
                  <Headphones size={22} color="#0084FF" />
                </div>
                <div className="dev-keys-bottom-info">
                  <strong className="dev-keys-bottom-title">Cần hỗ trợ?</strong>
                  <p className="dev-keys-bottom-desc">
                    Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn.
                  </p>
                  <button
                    type="button"
                    className="dev-keys-bottom-btn"
                    onClick={() => {
                      showToast('Hỗ trợ kỹ thuật', 'Đang kết nối đội ngũ hỗ trợ API Topdoo...', 'info');
                    }}
                  >
                    <span>Liên hệ hỗ trợ</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>

            {/* 6. Modal Tạo API Key Mới */}
            {isCreateKeyModalOpen && (
              <div className="dev-keys-modal-overlay" onClick={handleResetCreateKeyModal}>
                <div className="dev-keys-modal-card" onClick={(e) => e.stopPropagation()}>
                  <div className="dev-keys-modal-header">
                    <div className="dev-keys-modal-title-row">
                      <div className="dev-keys-modal-icon-badge">
                        <Key size={18} color="#0084FF" />
                      </div>
                      <div>
                        <h3 className="dev-keys-modal-title">Tạo API Key mới</h3>
                        <span className="dev-keys-modal-sub">
                          Thiết lập thông tin xác thực và phạm vi quyền truy cập
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-keys-modal-close"
                      onClick={handleResetCreateKeyModal}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {createdNewKeySuccess ? (
                    <div className="dev-keys-modal-body success-state">
                      <div className="dev-keys-success-badge">
                        <Check size={28} color="#10B981" />
                      </div>
                      <h4 className="dev-keys-success-title">Khóa API đã được tạo thành công!</h4>
                      <p className="dev-keys-success-desc">
                        Vui lòng sao chép và lưu trữ mã khóa này cẩn thận. Bạn sẽ không thể xem lại toàn bộ mã này sau khi đóng hộp thoại.
                      </p>

                      <div className="dev-keys-created-key-box">
                        <code className="dev-keys-created-code">{createdNewKeySuccess.rawKey}</code>
                        <button
                          type="button"
                          className="dev-keys-btn-copy-success"
                          onClick={() => handleCopySingleKey(createdNewKeySuccess)}
                        >
                          <Copy size={14} />
                          <span>Sao chép</span>
                        </button>
                      </div>

                      <div className="dev-keys-success-alert">
                        <Shield size={16} color="#0084FF" />
                        <span>Không bao giờ commit API Key vào git hoặc chia sẻ công khai phía client.</span>
                      </div>

                      <div className="dev-keys-modal-footer">
                        <button
                          type="button"
                          className="dev-keys-modal-btn primary"
                          onClick={handleResetCreateKeyModal}
                        >
                          Đã lưu khóa, hoàn tất
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleCreateKeyModalSubmit}>
                      <div className="dev-keys-modal-body">
                        <div className="dev-keys-form-group">
                          <label className="dev-keys-form-label">
                            Tên API Key <span className="req">*</span>
                          </label>
                          <input
                            type="text"
                            className="dev-keys-form-input"
                            placeholder="Ví dụ: Backend Microservice Prod, Mobile App Staging..."
                            value={createKeyFormName}
                            onChange={(e) => setCreateKeyFormName(e.target.value)}
                            required
                          />
                        </div>

                        <div className="dev-keys-form-group">
                          <label className="dev-keys-form-label">Mô tả mục đích sử dụng</label>
                          <input
                            type="text"
                            className="dev-keys-form-input"
                            placeholder="Ví dụ: Kết nối chatbot chăm sóc khách hàng trên web chính thức"
                            value={createKeyFormDesc}
                            onChange={(e) => setCreateKeyFormDesc(e.target.value)}
                          />
                        </div>

                        <div className="dev-keys-form-row">
                          <div className="dev-keys-form-group half">
                            <label className="dev-keys-form-label">Dự án liên kết</label>
                            <select
                              className="dev-keys-form-select"
                              value={createKeyFormProject}
                              onChange={(e) => setCreateKeyFormProject(e.target.value)}
                            >
                              <option value="Chatbot EduTech">Chatbot EduTech</option>
                              <option value="Topdoo Studio">Topdoo Studio</option>
                              <option value="Document AI">Document AI</option>
                              <option value="Playground">Playground</option>
                              <option value="Internal">Internal</option>
                            </select>
                          </div>

                          <div className="dev-keys-form-group half">
                            <label className="dev-keys-form-label">Thời hạn hiệu lực</label>
                            <select
                              className="dev-keys-form-select"
                              value={createKeyFormExpiry}
                              onChange={(e) => setCreateKeyFormExpiry(e.target.value)}
                            >
                              <option value="1m">1 tháng</option>
                              <option value="3m">3 tháng</option>
                              <option value="6m">6 tháng</option>
                              <option value="1y">1 năm (Khuyến nghị)</option>
                              <option value="never">Vĩnh viễn (Không hết hạn)</option>
                            </select>
                          </div>
                        </div>

                        <div className="dev-keys-form-group">
                          <label className="dev-keys-form-label">Quyền hạn truy cập API (Scopes)</label>
                          <div className="dev-keys-scopes-grid">
                            {['Chat', 'Image', 'OCR', 'TTS', 'RAG', 'All'].map((perm) => {
                              const isChecked = createKeyFormPermissions.includes(perm);
                              return (
                                <label key={perm} className={`dev-keys-scope-chip ${isChecked ? 'checked' : ''}`}>
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                      if (perm === 'All') {
                                        setCreateKeyFormPermissions(isChecked ? [] : ['All']);
                                      } else {
                                        setCreateKeyFormPermissions(prev => {
                                          const filtered = prev.filter(p => p !== 'All');
                                          return filtered.includes(perm)
                                            ? filtered.filter(p => p !== perm)
                                            : [...filtered, perm];
                                        });
                                      }
                                    }}
                                  />
                                  <span>{perm}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="dev-keys-modal-footer">
                        <button
                          type="button"
                          className="dev-keys-modal-btn outline"
                          onClick={handleResetCreateKeyModal}
                        >
                          Hủy bỏ
                        </button>
                        <button
                          type="submit"
                          className="dev-keys-modal-btn primary"
                        >
                          <Plus size={14} />
                          <span>Tạo khóa API</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            BILLING VIEW (THANH TOÁN)
            ========================================================================= */}
        {activeNav === 'billing' && (
          <div className="dev-billing-wrapper">
            {/* 1. Top Header Row & Credit Card Illustration Banner */}
            <div className="dev-billing-top-row">
              <div className="dev-billing-top-left">
                <h1 className="dev-billing-title">Thanh toán</h1>
                <p className="dev-billing-subtitle">
                  Quản lý gói dịch vụ, hóa đơn và phương thức thanh toán của bạn trên Topdoo.
                </p>
              </div>

              {/* Right Visual Card Banner */}
              <div className="dev-billing-banner-card">
                <div className="dev-billing-banner-content">
                  {/* Card Art */}
                  <div className="dev-billing-card-art">
                    <div className="dev-billing-card-chip" />
                    <div className="dev-billing-card-stripes">
                      <span className="stripe" />
                      <span className="stripe short" />
                    </div>
                    <div className="dev-billing-card-hologram">
                      <Check size={14} color="#FFFFFF" strokeWidth={3} />
                    </div>
                  </div>

                  <div className="dev-billing-banner-text">
                    <span className="dev-billing-banner-heading">Đầu tư cho AI hôm nay</span>
                    <span className="dev-billing-banner-subheading">kiến tạo giá trị ngày mai</span>
                    <strong className="dev-billing-banner-brand">TOPDOO</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Sub-Navigation Tabs */}
            <div className="dev-billing-tabs">
              <button
                type="button"
                className={`dev-billing-tab-btn ${billingActiveSubTab === 'overview' ? 'active' : ''}`}
                onClick={() => setBillingActiveSubTab('overview')}
              >
                <span>Tổng quan</span>
              </button>
              <button
                type="button"
                className={`dev-billing-tab-btn ${billingActiveSubTab === 'plans' ? 'active' : ''}`}
                onClick={() => setBillingActiveSubTab('plans')}
              >
                <span>Gói dịch vụ</span>
              </button>
              <button
                type="button"
                className={`dev-billing-tab-btn ${billingActiveSubTab === 'invoices' ? 'active' : ''}`}
                onClick={() => setBillingActiveSubTab('invoices')}
              >
                <span>Hóa đơn</span>
              </button>
              <button
                type="button"
                className={`dev-billing-tab-btn ${billingActiveSubTab === 'methods' ? 'active' : ''}`}
                onClick={() => setBillingActiveSubTab('methods')}
              >
                <span>Phương thức thanh toán</span>
              </button>
              <button
                type="button"
                className={`dev-billing-tab-btn ${billingActiveSubTab === 'discounts' ? 'active' : ''}`}
                onClick={() => setBillingActiveSubTab('discounts')}
              >
                <span>Ưu đãi &amp; Mã giảm giá</span>
              </button>
            </div>

            {/* 3. Overview 4 Stat Metric Cards */}
            <div className="dev-billing-overview-grid">
              {/* Card 1: Gói hiện tại */}
              <div className="dev-billing-stat-card">
                <div className="dev-billing-stat-icon blue">
                  <Wallet size={20} color="#0084FF" />
                </div>
                <div className="dev-billing-stat-content">
                  <span className="dev-billing-stat-label">Gói hiện tại</span>
                  <strong className="dev-billing-stat-value">
                    {currentPlanId === 'free' ? 'Free' : (currentPlanId === 'plus' ? 'Plus' : 'Pro')}
                  </strong>
                  <span className="dev-billing-stat-sub">Còn 14 ngày dùng thử</span>
                </div>
                <button
                  type="button"
                  className="dev-billing-stat-link-btn"
                  onClick={() => handleOpenUpgradePlan(plansData[1])}
                >
                  <span>Nâng cấp ngay</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              {/* Card 2: Số dư AI Credit (M11 Ledger) */}
              <div className="dev-billing-stat-card">
                <div className="dev-billing-stat-icon green">
                  <Zap size={20} color="#10B981" />
                </div>
                <div className="dev-billing-stat-content">
                  <span className="dev-billing-stat-label">Số dư AI Credit</span>
                  <strong className="dev-billing-stat-value">{creditBalance !== undefined ? creditBalance.toLocaleString() : '5,000'} cr</strong>
                  <span className="dev-billing-stat-sub green">
                    <span>🪙 Quản lý bởi Topdoo Ledger</span>
                  </span>
                </div>
                <button
                  type="button"
                  className="dev-billing-stat-outline-btn"
                  onClick={() => addCredits(2000, 'Nạp qua Developer Console')}
                  title="Click để nạp nhanh +2,000 credits"
                >
                  <span>Nạp +2,000 cr</span>
                </button>
              </div>

              {/* Card 3: Hóa đơn chưa thanh toán */}
              <div className="dev-billing-stat-card">
                <div className="dev-billing-stat-icon purple">
                  <Receipt size={20} color="#8B5CF6" />
                </div>
                <div className="dev-billing-stat-content">
                  <span className="dev-billing-stat-label">Hóa đơn chưa thanh toán</span>
                  <strong className="dev-billing-stat-value">0</strong>
                  <span className="dev-billing-stat-sub">Tất cả đã thanh toán</span>
                </div>
                <button
                  type="button"
                  className="dev-billing-stat-outline-btn"
                  onClick={() => {
                    setBillingActiveSubTab('invoices');
                    showToast('Hóa đơn', 'Tất cả các hóa đơn của bạn đều đã được thanh toán đầy đủ.', 'info');
                  }}
                >
                  <span>Xem hóa đơn</span>
                </button>
              </div>

              {/* Card 4: Ưu đãi của bạn */}
              <div className="dev-billing-stat-card">
                <div className="dev-billing-stat-icon orange">
                  <Gift size={20} color="#F97316" />
                </div>
                <div className="dev-billing-stat-content">
                  <span className="dev-billing-stat-label">Ưu đãi của bạn</span>
                  <strong className="dev-billing-stat-value">3</strong>
                  <span className="dev-billing-stat-sub">Mã giảm giá khả dụng</span>
                </div>
                <button
                  type="button"
                  className="dev-billing-stat-outline-btn"
                  onClick={() => setIsDiscountsModalOpen(true)}
                >
                  <span>Xem ưu đãi</span>
                </button>
              </div>
            </div>

            {/* 4. Split Layout: Left Plans (70%) + Right Payment Info (30%) */}
            <div className="dev-billing-main-split">
              {/* Left Column: Các gói dịch vụ */}
              <div className="dev-billing-plans-section">
                <div className="dev-billing-plans-header">
                  <div>
                    <h2 className="dev-billing-section-title">Các gói dịch vụ</h2>
                    <p className="dev-billing-section-subtitle">
                      Chọn gói phù hợp với nhu cầu của bạn
                    </p>
                  </div>

                  {/* Monthly / Yearly Switch */}
                  <div className="dev-billing-cycle-switch">
                    <button
                      type="button"
                      className={`dev-billing-cycle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                      onClick={() => setBillingCycle('monthly')}
                    >
                      Thanh toán theo tháng
                    </button>
                    <button
                      type="button"
                      className={`dev-billing-cycle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
                      onClick={() => setBillingCycle('yearly')}
                    >
                      Thanh toán theo năm
                    </button>
                    <span className="dev-billing-save-badge">Tiết kiệm 20%</span>
                  </div>
                </div>

                {/* 4 Plan Cards */}
                <div className="dev-billing-plans-grid">
                  {plansData.map((plan) => {
                    const isCurrent = currentPlanId === plan.id;
                    const priceDisplay = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;

                    return (
                      <div
                        key={plan.id}
                        className={`dev-billing-plan-card ${plan.popular ? 'popular' : ''} ${plan.id === 'pro' ? 'pro-highlight' : ''}`}
                      >
                        {plan.popular && (
                          <div className="dev-billing-plan-badge">{plan.popularLabel}</div>
                        )}

                        <div className="dev-billing-plan-top">
                          <div
                            className="dev-billing-plan-icon-wrap"
                            style={{ backgroundColor: plan.iconBg }}
                          >
                            {plan.id === 'free' && <Sparkles size={20} color={plan.iconColor} />}
                            {plan.id === 'plus' && <Zap size={20} color={plan.iconColor} />}
                            {plan.id === 'pro' && <Crown size={20} color={plan.iconColor} />}
                            {plan.id === 'business' && <Building2 size={20} color={plan.iconColor} />}
                          </div>

                          <h3 className="dev-billing-plan-title">{plan.name}</h3>
                          <span className="dev-billing-plan-subtitle">{plan.subtitle}</span>

                          <div className="dev-billing-plan-price-row">
                            <strong className="dev-billing-plan-price">{priceDisplay}</strong>
                          </div>
                        </div>

                        <ul className="dev-billing-plan-features">
                          {plan.features.map((feat, idx) => (
                            <li key={idx}>
                              <Check size={14} className="dev-billing-feat-check" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="dev-billing-plan-footer">
                          {isCurrent ? (
                            <button type="button" className="dev-billing-btn-plan current" disabled>
                              Gói hiện tại
                            </button>
                          ) : plan.id === 'plus' ? (
                            <button
                              type="button"
                              className="dev-billing-btn-plan primary"
                              onClick={() => handleOpenUpgradePlan(plan)}
                            >
                              Nâng cấp lên Plus
                            </button>
                          ) : plan.id === 'pro' ? (
                            <button
                              type="button"
                              className="dev-billing-btn-plan pro"
                              onClick={() => handleOpenUpgradePlan(plan)}
                            >
                              Nâng cấp lên Pro
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="dev-billing-btn-plan outline"
                              onClick={() => handleOpenUpgradePlan(plan)}
                            >
                              Liên hệ tư vấn
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Payment Methods & Payment History */}
              <div className="dev-billing-right-col">
                {/* 1. Phương thức thanh toán Card */}
                <div className="dev-billing-side-card">
                  <div className="dev-billing-side-header">
                    <h3 className="dev-billing-side-title">Phương thức thanh toán</h3>
                    <button
                      type="button"
                      className="dev-billing-side-link"
                      onClick={() => setIsAddPaymentModalOpen(true)}
                    >
                      <span>Quản lý</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  {/* Add Method Action Bar */}
                  <div
                    className="dev-billing-add-method-box"
                    onClick={() => setIsAddPaymentModalOpen(true)}
                  >
                    <div className="dev-billing-add-plus">
                      <Plus size={16} />
                    </div>
                    <div className="dev-billing-add-info">
                      <strong className="dev-billing-add-title">Thêm phương thức thanh toán</strong>
                      <span className="dev-billing-add-sub">Thẻ tín dụng, thẻ ghi nợ, ví điện tử...</span>
                    </div>
                  </div>

                  {/* Payment Methods List */}
                  <div className="dev-billing-methods-list">
                    {paymentMethodsList.map((pm) => (
                      <div key={pm.id} className="dev-billing-method-item">
                        <div className="dev-billing-method-left">
                          {pm.type === 'visa' ? (
                            <div className="dev-billing-card-badge visa">
                              <span>VISA</span>
                            </div>
                          ) : (
                            <div className="dev-billing-card-badge momo">
                              <span>mo</span>
                              <span>mo</span>
                            </div>
                          )}

                          <div className="dev-billing-method-details">
                            <div className="dev-billing-method-title-row">
                              <strong className="dev-billing-method-title">
                                {pm.type === 'visa' ? `•••• ${pm.last4}` : pm.name}
                              </strong>
                              {pm.isDefault && (
                                <span className="dev-billing-badge-default">Mặc định</span>
                              )}
                            </div>
                            <span className="dev-billing-method-sub">
                              {pm.type === 'visa' ? `Hết hạn ${pm.expiry}` : pm.phone}
                            </span>
                          </div>
                        </div>

                        <div className="dev-billing-method-actions">
                          <button
                            type="button"
                            className="dev-billing-method-more-btn"
                            onClick={() =>
                              setActivePaymentMenuId(activePaymentMenuId === pm.id ? null : pm.id)
                            }
                            aria-label="Tùy chọn phương thức"
                          >
                            <MoreVertical size={16} />
                          </button>

                          {activePaymentMenuId === pm.id && (
                            <div className="dev-billing-menu-dropdown">
                              {!pm.isDefault && (
                                <button
                                  type="button"
                                  className="dev-billing-menu-item"
                                  onClick={() => handleSetDefaultPayment(pm.id)}
                                >
                                  <Check size={13} />
                                  <span>Đặt làm mặc định</span>
                                </button>
                              )}
                              <button
                                type="button"
                                className="dev-billing-menu-item danger"
                                onClick={() => handleDeletePayment(pm.id)}
                              >
                                <Trash2 size={13} />
                                <span>Xóa phương thức</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Lịch sử thanh toán Card */}
                <div className="dev-billing-side-card">
                  <div className="dev-billing-side-header">
                    <h3 className="dev-billing-side-title">Lịch sử thanh toán</h3>
                    <button
                      type="button"
                      className="dev-billing-side-link"
                      onClick={() => {
                        setBillingActiveSubTab('invoices');
                        showToast('Lịch sử thanh toán', 'Hiển thị tất cả lịch sử giao dịch hóa đơn.', 'info');
                      }}
                    >
                      <span>Xem tất cả</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="dev-billing-history-list">
                    {paymentHistoryList.map((item) => (
                      <div key={item.id} className="dev-billing-history-item">
                        <div className="dev-billing-history-left">
                          <div className={`dev-billing-history-icon ${item.status}`}>
                            {item.status === 'success' ? (
                              <Check size={14} color="#10B981" />
                            ) : (
                              <X size={14} color="#EF4444" />
                            )}
                          </div>
                          <div className="dev-billing-history-details">
                            <strong className="dev-billing-history-title">{item.title}</strong>
                            <span className="dev-billing-history-date">{item.date}</span>
                          </div>
                        </div>

                        <div className="dev-billing-history-right">
                          <strong className="dev-billing-history-amount">{item.amount}</strong>
                          <span className={`dev-billing-history-status ${item.status}`}>
                            {item.statusLabel}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. Bottom Security & Compliance Banner */}
            <div className="dev-billing-security-banner">
              <div className="dev-billing-security-left">
                <div className="dev-billing-security-icon-box">
                  <ShieldCheck size={24} color="#0084FF" />
                </div>
                <div className="dev-billing-security-text">
                  <strong className="dev-billing-security-title">Thanh toán an toàn và bảo mật</strong>
                  <p className="dev-billing-security-desc">
                    Tất cả giao dịch được mã hóa và bảo vệ bởi tiêu chuẩn bảo mật PCI-DSS.
                  </p>
                </div>
              </div>

              <div className="dev-billing-security-badges">
                <div className="dev-billing-pci-badge">
                  <ShieldCheck size={16} color="#0084FF" />
                  <span>PCI/DSS CERTIFIED</span>
                </div>
                <div className="dev-billing-ssl-badge">
                  <Lock size={14} />
                  <span>SSL SECURE</span>
                </div>
                <span className="dev-billing-brand-visa">VISA</span>
                <div className="dev-billing-brand-mc">
                  <span className="circle red" />
                  <span className="circle orange" />
                </div>
                <div className="dev-billing-brand-momo">
                  <span>mo</span>
                  <span>mo</span>
                </div>
              </div>
            </div>

            {/* Modal 1: Nâng cấp gói dịch vụ */}
            {isUpgradeModalOpen && selectedPlanToUpgrade && (
              <div className="dev-billing-modal-overlay" onClick={() => setIsUpgradeModalOpen(false)}>
                <div className="dev-billing-modal-card" onClick={(e) => e.stopPropagation()}>
                  <div className="dev-billing-modal-header">
                    <div className="dev-billing-modal-title-row">
                      <div className="dev-billing-modal-icon-badge">
                        <Crown size={20} color="#0084FF" />
                      </div>
                      <div>
                        <h3 className="dev-billing-modal-title">Nâng cấp lên gói {selectedPlanToUpgrade.name}</h3>
                        <span className="dev-billing-modal-sub">
                          {selectedPlanToUpgrade.subtitle}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-billing-modal-close"
                      onClick={() => setIsUpgradeModalOpen(false)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="dev-billing-modal-body">
                    <div className="dev-billing-upgrade-summary-box">
                      <div className="dev-billing-upgrade-plan-row">
                        <span className="dev-billing-upgrade-plan-name">Gói đăng ký:</span>
                        <strong className="dev-billing-upgrade-plan-val">{selectedPlanToUpgrade.name}</strong>
                      </div>
                      <div className="dev-billing-upgrade-plan-row">
                        <span className="dev-billing-upgrade-plan-name">Chu kỳ thanh toán:</span>
                        <span className="dev-billing-upgrade-plan-val">
                          {billingCycle === 'yearly' ? 'Theo năm (Tiết kiệm 20%)' : 'Theo tháng'}
                        </span>
                      </div>
                      <div className="dev-billing-upgrade-plan-row total">
                        <span className="dev-billing-upgrade-plan-name">Tổng thanh toán:</span>
                        <strong className="dev-billing-upgrade-total-price">
                          {billingCycle === 'yearly' ? selectedPlanToUpgrade.yearlyPrice : selectedPlanToUpgrade.monthlyPrice}
                        </strong>
                      </div>
                    </div>

                    <div className="dev-billing-modal-features-list">
                      <h4 className="dev-billing-modal-features-title">Tính năng bạn sẽ nhận được:</h4>
                      <ul>
                        {selectedPlanToUpgrade.features.map((f, i) => (
                          <li key={i}>
                            <Check size={14} color="#10B981" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="dev-billing-select-payment-section">
                      <label className="dev-billing-modal-label">Thanh toán bằng:</label>
                      <div className="dev-billing-selected-method-row">
                        <div className="dev-billing-card-badge visa">
                          <span>VISA</span>
                        </div>
                        <span className="dev-billing-method-text">•••• 4242 (Hết hạn 12/2027)</span>
                        <span className="dev-billing-badge-default">Mặc định</span>
                      </div>
                    </div>
                  </div>

                  <div className="dev-billing-modal-footer">
                    <button
                      type="button"
                      className="dev-billing-modal-btn outline"
                      onClick={() => setIsUpgradeModalOpen(false)}
                    >
                      Hủy bỏ
                    </button>
                    <button
                      type="button"
                      className="dev-billing-modal-btn primary"
                      onClick={handleConfirmPlanUpgrade}
                    >
                      <span>Xác nhận nâng cấp</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal 2: Thêm phương thức thanh toán */}
            {isAddPaymentModalOpen && (
              <div className="dev-billing-modal-overlay" onClick={() => setIsAddPaymentModalOpen(false)}>
                <div className="dev-billing-modal-card" onClick={(e) => e.stopPropagation()}>
                  <div className="dev-billing-modal-header">
                    <div className="dev-billing-modal-title-row">
                      <div className="dev-billing-modal-icon-badge">
                        <CreditCard size={20} color="#0084FF" />
                      </div>
                      <div>
                        <h3 className="dev-billing-modal-title">Thêm phương thức thanh toán</h3>
                        <span className="dev-billing-modal-sub">
                          Hỗ trợ thẻ thanh toán quốc tế Visa/Mastercard hoặc Ví MoMo
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-billing-modal-close"
                      onClick={() => setIsAddPaymentModalOpen(false)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleAddPaymentSubmit}>
                    <div className="dev-billing-modal-body">
                      <div className="dev-billing-method-tabs">
                        <button
                          type="button"
                          className={`dev-billing-method-tab-btn ${paymentMethodType === 'card' ? 'active' : ''}`}
                          onClick={() => setPaymentMethodType('card')}
                        >
                          <CreditCard size={15} />
                          <span>Thẻ Visa / Mastercard</span>
                        </button>
                        <button
                          type="button"
                          className={`dev-billing-method-tab-btn ${paymentMethodType === 'momo' ? 'active' : ''}`}
                          onClick={() => setPaymentMethodType('momo')}
                        >
                          <Wallet size={15} />
                          <span>Ví MoMo</span>
                        </button>
                      </div>

                      {paymentMethodType === 'card' ? (
                        <>
                          <div className="dev-billing-form-group">
                            <label className="dev-billing-form-label">
                              Số thẻ <span className="req">*</span>
                            </label>
                            <input
                              type="text"
                              className="dev-billing-form-input"
                              placeholder="4123 4567 8901 4242"
                              value={newCardNumber}
                              onChange={(e) => setNewCardNumber(e.target.value)}
                              required
                            />
                          </div>

                          <div className="dev-billing-form-row">
                            <div className="dev-billing-form-group half">
                              <label className="dev-billing-form-label">
                                Ngày hết hạn (MM/YY) <span className="req">*</span>
                              </label>
                              <input
                                type="text"
                                className="dev-billing-form-input"
                                placeholder="12/28"
                                value={newCardExpiry}
                                onChange={(e) => setNewCardExpiry(e.target.value)}
                                required
                              />
                            </div>
                            <div className="dev-billing-form-group half">
                              <label className="dev-billing-form-label">
                                Mã bảo mật (CVC) <span className="req">*</span>
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                className="dev-billing-form-input"
                                placeholder="•••"
                                value={newCardCvc}
                                onChange={(e) => setNewCardCvc(e.target.value)}
                                required
                              />
                            </div>
                          </div>

                          <div className="dev-billing-form-group">
                            <label className="dev-billing-form-label">Tên chủ thẻ</label>
                            <input
                              type="text"
                              className="dev-billing-form-input"
                              placeholder="NGUYEN VAN A"
                              value={newCardHolder}
                              onChange={(e) => setNewCardHolder(e.target.value)}
                            />
                          </div>
                        </>
                      ) : (
                        <div className="dev-billing-form-group">
                          <label className="dev-billing-form-label">
                            Số điện thoại liên kết Ví MoMo <span className="req">*</span>
                          </label>
                          <input
                            type="tel"
                            className="dev-billing-form-input"
                            placeholder="0987 654 321"
                            value={newMomoPhone}
                            onChange={(e) => setNewMomoPhone(e.target.value)}
                            required
                          />
                        </div>
                      )}
                    </div>

                    <div className="dev-billing-modal-footer">
                      <button
                        type="button"
                        className="dev-billing-modal-btn outline"
                        onClick={() => setIsAddPaymentModalOpen(false)}
                      >
                        Hủy bỏ
                      </button>
                      <button
                        type="submit"
                        className="dev-billing-modal-btn primary"
                      >
                        <Plus size={14} />
                        <span>Lưu phương thức</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal 3: Ưu đãi & Mã giảm giá */}
            {isDiscountsModalOpen && (
              <div className="dev-billing-modal-overlay" onClick={() => setIsDiscountsModalOpen(false)}>
                <div className="dev-billing-modal-card" onClick={(e) => e.stopPropagation()}>
                  <div className="dev-billing-modal-header">
                    <div className="dev-billing-modal-title-row">
                      <div className="dev-billing-modal-icon-badge">
                        <Gift size={20} color="#F97316" />
                      </div>
                      <div>
                        <h3 className="dev-billing-modal-title">Ưu đãi &amp; Mã giảm giá</h3>
                        <span className="dev-billing-modal-sub">
                          Áp dụng mã giảm giá cho tài khoản Topdoo Developer của bạn
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-billing-modal-close"
                      onClick={() => setIsDiscountsModalOpen(false)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleApplyCoupon}>
                    <div className="dev-billing-modal-body">
                      <div className="dev-billing-coupon-input-wrap">
                        <input
                          type="text"
                          className="dev-billing-coupon-input"
                          placeholder="Nhập mã ưu đãi (Ví dụ: TOPDOO2026, AI20)"
                          value={couponCodeInput}
                          onChange={(e) => setCouponCodeInput(e.target.value)}
                        />
                        <button type="submit" className="dev-billing-coupon-btn">
                          Áp dụng
                        </button>
                      </div>

                      <div className="dev-billing-available-coupons">
                        <h4 className="dev-billing-coupons-title">Mã giảm giá khả dụng:</h4>
                        <div className="dev-billing-coupon-card">
                          <div className="dev-billing-coupon-left">
                            <Tag size={16} color="#0084FF" />
                            <div>
                              <strong className="dev-billing-coupon-code">TOPDOOAI20</strong>
                              <span className="dev-billing-coupon-desc">Giảm 20% cho gói Plus hoặc Pro năm đầu</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="dev-billing-coupon-use-btn"
                            onClick={() => {
                              setCouponCodeInput('TOPDOOAI20');
                            }}
                          >
                            Dùng mã
                          </button>
                        </div>

                        <div className="dev-billing-coupon-card">
                          <div className="dev-billing-coupon-left">
                            <Gift size={16} color="#10B981" />
                            <div>
                              <strong className="dev-billing-coupon-code">DEVMONTH100K</strong>
                              <span className="dev-billing-coupon-desc">Tặng thêm 100K tokens dùng thử mô hình AI</span>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="dev-billing-coupon-use-btn"
                            onClick={() => {
                              setCouponCodeInput('DEVMONTH100K');
                            }}
                          >
                            Dùng mã
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="dev-billing-modal-footer">
                      <button
                        type="button"
                        className="dev-billing-modal-btn outline"
                        onClick={() => setIsDiscountsModalOpen(false)}
                      >
                        Đóng
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            SUPPORT VIEW (TRUNG TÂM HỖ TRỢ)
            ========================================================================= */}
        {activeNav === 'support' && (
          <div className="dev-support-wrapper">
            <div className="dev-support-main-layout">
              {/* Left Column: Hero, Topics, Channels, Bottom Callout */}
              <div className="dev-support-left-col">
                {/* 1. Hero Search Banner */}
                <div className="dev-support-hero-card">
                  <div className="dev-support-hero-left">
                    <h1 className="dev-support-hero-title">Trung tâm hỗ trợ</h1>
                    <p className="dev-support-hero-subtitle">
                      Chúng tôi luôn sẵn sàng đồng hành cùng bạn trên hành trình xây dựng những sản phẩm AI tuyệt vời với Topdoo.
                    </p>

                    {/* Big Search Bar */}
                    <form className="dev-support-search-form" onSubmit={handleSupportSearch}>
                      <div className="dev-support-search-input-wrap">
                        <Search size={18} className="dev-support-search-icon" />
                        <input
                          type="text"
                          className="dev-support-search-input"
                          placeholder="Tìm kiếm câu hỏi, hướng dẫn, lỗi thường gặp..."
                          value={supportSearchQuery}
                          onChange={(e) => setSupportSearchQuery(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="dev-support-search-btn">
                        Tìm kiếm
                      </button>
                    </form>

                    {/* Search Suggestions */}
                    <div className="dev-support-search-hints">
                      <span className="dev-support-hint-label">Ví dụ:</span>
                      <button
                        type="button"
                        className="dev-support-hint-link"
                        onClick={() => {
                          setSupportSearchQuery('tạo API Key');
                          showToast('Gợi ý tìm kiếm', 'Đang tìm kiếm hướng dẫn tạo API Key...', 'info');
                        }}
                      >
                        tạo API Key
                      </button>
                      <span className="dot">•</span>
                      <button
                        type="button"
                        className="dev-support-hint-link"
                        onClick={() => {
                          setSupportSearchQuery('lỗi 401');
                          showToast('Gợi ý tìm kiếm', 'Đang tìm cách khắc phục lỗi 401 Unauthorized...', 'info');
                        }}
                      >
                        lỗi 401
                      </button>
                      <span className="dot">•</span>
                      <button
                        type="button"
                        className="dev-support-hint-link"
                        onClick={() => {
                          setSupportSearchQuery('tích hợp chatbot');
                          showToast('Gợi ý tìm kiếm', 'Đang tìm kiếm hướng dẫn tích hợp chatbot AI...', 'info');
                        }}
                      >
                        tích hợp chatbot
                      </button>
                      <span className="dot">•</span>
                      <button
                        type="button"
                        className="dev-support-hint-link"
                        onClick={() => {
                          setSupportSearchQuery('thanh toán');
                          showToast('Gợi ý tìm kiếm', 'Đang tìm hướng dẫn hóa đơn và thanh toán...', 'info');
                        }}
                      >
                        thanh toán, ...
                      </button>
                    </div>
                  </div>

                  {/* Hero Right: 3D Robot AI Mascot & Speech Bubble */}
                  <div className="dev-support-hero-right">
                    <div className="dev-support-speech-bubble">
                      <span>Chúng tôi</span>
                      <br />
                      <strong>luôn ở đây</strong>
                      <br />
                      <span>để hỗ trợ bạn!</span>
                    </div>

                    <div className="dev-support-mascot-container">
                      <div className="dev-support-mascot-img-wrap">
                        <img
                          src="/dev_robot_dashboard.png"
                          alt="Topdoo Support AI Robot"
                          className="dev-support-mascot-img"
                        />
                        <div className="dev-support-mascot-code-badge">
                          <code>&lt;/&gt;</code>
                        </div>
                      </div>
                      <div className="dev-support-mascot-slogan">
                        <span className="slogan-line1">Smarter Together</span>
                        <span className="slogan-line2">Brighter Tomorrow</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Chủ đề phổ biến (8 Cards) */}
                <div className="dev-support-topics-section">
                  <div className="dev-support-section-header">
                    <h2 className="dev-support-section-title">Chủ đề phổ biến</h2>
                    <button
                      type="button"
                      className="dev-support-view-all-btn"
                      onClick={() => showToast('Chủ đề phổ biến', 'Hiển thị tất cả 8 chủ đề hướng dẫn của Topdoo Developer.', 'info')}
                    >
                      <span>Xem tất cả</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="dev-support-topics-grid">
                    {supportTopics.map((topic) => (
                      <div
                        key={topic.id}
                        className="dev-support-topic-card"
                        onClick={() => setActiveTopicModal(topic)}
                      >
                        <div
                          className="dev-support-topic-icon"
                          style={{ backgroundColor: topic.iconBg }}
                        >
                          {topic.iconType === 'rocket' && <Rocket size={18} color={topic.iconColor} />}
                          {topic.iconType === 'code' && <Code2 size={18} color={topic.iconColor} />}
                          {topic.iconType === 'card' && <CreditCard size={18} color={topic.iconColor} />}
                          {topic.iconType === 'alert' && <AlertTriangle size={18} color={topic.iconColor} />}
                          {topic.iconType === 'sparkles' && <Sparkles size={18} color={topic.iconColor} />}
                          {topic.iconType === 'folder' && <Folder size={18} color={topic.iconColor} />}
                          {topic.iconType === 'security' && <ShieldCheck size={18} color={topic.iconColor} />}
                          {topic.iconType === 'users' && <Users size={18} color={topic.iconColor} />}
                        </div>
                        <div className="dev-support-topic-info">
                          <h3 className="dev-support-topic-title">{topic.title}</h3>
                          <p className="dev-support-topic-desc">{topic.desc}</p>
                          <span className="dev-support-topic-count">{topic.count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Các hình thức hỗ trợ (4 Cards) */}
                <div className="dev-support-channels-section">
                  <div className="dev-support-section-header">
                    <h2 className="dev-support-section-title">Các hình thức hỗ trợ</h2>
                  </div>

                  <div className="dev-support-channels-grid">
                    {/* Card 1: Chat với chuyên gia */}
                    <div className="dev-support-channel-card">
                      <div className="dev-support-channel-top">
                        <div className="dev-support-channel-icon green">
                          <MessageSquare size={20} color="#10B981" />
                        </div>
                        <h3 className="dev-support-channel-title">Chat với chuyên gia</h3>
                        <p className="dev-support-channel-desc">
                          Nhận hỗ trợ trực tiếp 24/7 từ đội ngũ Topdoo.
                        </p>
                      </div>
                      <div className="dev-support-channel-bottom">
                        <span className="dev-support-channel-status online">
                          <span className="pulse-dot" />
                          <span>Trực tuyến</span>
                        </span>
                        <button
                          type="button"
                          className="dev-support-channel-btn"
                          onClick={() => setIsLiveChatModalOpen(true)}
                        >
                          <span>Bắt đầu chat</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Card 2: Gửi yêu cầu hỗ trợ */}
                    <div className="dev-support-channel-card">
                      <div className="dev-support-channel-top">
                        <div className="dev-support-channel-icon blue">
                          <Mail size={20} color="#0084FF" />
                        </div>
                        <h3 className="dev-support-channel-title">Gửi yêu cầu hỗ trợ</h3>
                        <p className="dev-support-channel-desc">
                          Tạo ticket để được xử lý và phản hồi qua email.
                        </p>
                      </div>
                      <div className="dev-support-channel-bottom">
                        <span className="dev-support-channel-badge gray">
                          Thời gian phản hồi &lt; 24 giờ
                        </span>
                        <button
                          type="button"
                          className="dev-support-channel-btn"
                          onClick={() => setIsTicketModalOpen(true)}
                        >
                          <span>Gửi yêu cầu</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Card 3: Cộng đồng Developer */}
                    <div className="dev-support-channel-card">
                      <div className="dev-support-channel-top">
                        <div className="dev-support-channel-icon sky">
                          <Users size={20} color="#0284C7" />
                        </div>
                        <h3 className="dev-support-channel-title">Cộng đồng Developer</h3>
                        <p className="dev-support-channel-desc">
                          Thảo luận và nhận hỗ trợ từ cộng đồng.
                        </p>
                      </div>
                      <div className="dev-support-channel-bottom">
                        <span className="dev-support-channel-badge green">
                          Hơn 12K thành viên
                        </span>
                        <button
                          type="button"
                          className="dev-support-channel-btn"
                          onClick={() => setIsCommunityModalOpen(true)}
                        >
                          <span>Tham gia ngay</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Card 4: Liên hệ hotline */}
                    <div className="dev-support-channel-card">
                      <div className="dev-support-channel-top">
                        <div className="dev-support-channel-icon phone">
                          <Phone size={20} color="#0084FF" />
                        </div>
                        <h3 className="dev-support-channel-title">Liên hệ hotline</h3>
                        <div className="dev-support-channel-phone-info">
                          <strong className="phone-num">1900 1234</strong>
                          <span className="phone-time">(8:00 - 22:00, T2 - CN)</span>
                        </div>
                      </div>
                      <div className="dev-support-channel-bottom">
                        <span className="dev-support-channel-badge sky">
                          Hỗ trợ nhanh chóng
                        </span>
                        <button
                          type="button"
                          className="dev-support-channel-btn"
                          onClick={handleCallHotline}
                        >
                          <span>Gọi ngay</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4. Bottom Callout: Vẫn cần hỗ trợ? */}
                <div className="dev-support-bottom-banner">
                  <div className="dev-support-bottom-left">
                    <div className="dev-support-bottom-icon">
                      <Headphones size={22} color="#0084FF" />
                    </div>
                    <div className="dev-support-bottom-text">
                      <h3 className="dev-support-bottom-title">Vẫn cần hỗ trợ?</h3>
                      <p className="dev-support-bottom-desc">
                        Đội ngũ Topdoo luôn sẵn sàng giúp bạn giải đáp mọi thắc mắc.
                      </p>
                    </div>
                  </div>

                  <div className="dev-support-bottom-right">
                    <button
                      type="button"
                      className="dev-support-bottom-contact-btn"
                      onClick={() => setIsTicketModalOpen(true)}
                    >
                      Liên hệ ngay
                    </button>
                    <div className="dev-support-avatar-stack">
                      <img src="/company_team.jpg" alt="Support Agent 1" className="dev-support-avatar" />
                      <img src="/executive_portrait.jpg" alt="Support Agent 2" className="dev-support-avatar" />
                      <img src="/studio_audience_business.jpg" alt="Support Agent 3" className="dev-support-avatar" />
                      <img src="/studio_audience_creator.jpg" alt="Support Agent 4" className="dev-support-avatar" />
                      <span className="dev-support-avatar-more">+5</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: FAQ, System Status, Helpful Resources */}
              <div className="dev-support-right-col">
                {/* 1. Câu hỏi thường gặp */}
                <div className="dev-support-side-card">
                  <div className="dev-support-side-header">
                    <h3 className="dev-support-side-title">Câu hỏi thường gặp</h3>
                    <button
                      type="button"
                      className="dev-support-side-link"
                      onClick={() => showToast('Câu hỏi thường gặp', 'Xem tất cả 24 câu hỏi thường gặp phổ biến nhất.', 'info')}
                    >
                      <span>Xem tất cả</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                  <div className="dev-support-faq-list">
                    {supportFaqs.map((faq) => (
                      <div
                        key={faq.id}
                        className="dev-support-faq-item"
                        onClick={() => setActiveFaqItem(faq)}
                      >
                        <span className="dev-support-faq-question">{faq.q}</span>
                        <ChevronRight size={15} className="dev-support-faq-arrow" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Trạng thái hệ thống */}
                <div
                  className="dev-support-status-card"
                  onClick={() => showToast('Trạng thái hệ thống', '100% dịch vụ API, Chat, Image, Voice và Database đều đang hoạt động bình thường với SLA 99.98%.', 'success')}
                >
                  <div className="dev-support-status-left">
                    <div className="dev-support-status-dot-wrap">
                      <span className="status-ping" />
                      <span className="status-circle" />
                    </div>
                    <div className="dev-support-status-info">
                      <strong className="dev-support-status-title">Hệ thống hoạt động ổn định</strong>
                      <span className="dev-support-status-desc">Tất cả dịch vụ đang hoạt động bình thường.</span>
                    </div>
                  </div>
                  <ChevronRight size={16} className="dev-support-status-arrow" />
                </div>

                {/* 3. Tài nguyên hữu ích */}
                <div className="dev-support-side-card">
                  <div className="dev-support-side-header">
                    <h3 className="dev-support-side-title">Tài nguyên hữu ích</h3>
                  </div>

                  <div className="dev-support-resources-list">
                    <div
                      className="dev-support-resource-item"
                      onClick={() => handleNavClick('docs', 'Tài liệu')}
                    >
                      <div className="dev-support-res-icon">
                        <FileText size={18} color="#0084FF" />
                      </div>
                      <div className="dev-support-res-details">
                        <strong className="dev-support-res-title">Tài liệu API</strong>
                        <span className="dev-support-res-desc">Khám phá tài liệu chi tiết</span>
                      </div>
                      <ChevronRight size={15} className="dev-support-res-arrow" />
                    </div>

                    <div
                      className="dev-support-resource-item"
                      onClick={() => handleNavClick('playground', 'Playground')}
                    >
                      <div className="dev-support-res-icon">
                        <Sliders size={18} color="#0084FF" />
                      </div>
                      <div className="dev-support-res-details">
                        <strong className="dev-support-res-title">Ví dụ &amp; Playground</strong>
                        <span className="dev-support-res-desc">Thử nghiệm trực tiếp</span>
                      </div>
                      <ChevronRight size={15} className="dev-support-res-arrow" />
                    </div>

                    <div
                      className="dev-support-resource-item"
                      onClick={() => handleNavClick('api-sdk', 'API & SDK')}
                    >
                      <div className="dev-support-res-icon">
                        <Compass size={18} color="#0084FF" />
                      </div>
                      <div className="dev-support-res-details">
                        <strong className="dev-support-res-title">Hướng dẫn tích hợp</strong>
                        <span className="dev-support-res-desc">Từng bước xây dựng ứng dụng</span>
                      </div>
                      <ChevronRight size={15} className="dev-support-res-arrow" />
                    </div>

                    <div
                      className="dev-support-resource-item"
                      onClick={() => showToast('Chính sách bảo mật', 'Chính sách bảo vệ dữ liệu và quyền riêng tư cá nhân theo chuẩn quốc tế.', 'info')}
                    >
                      <div className="dev-support-res-icon">
                        <ShieldCheck size={18} color="#0084FF" />
                      </div>
                      <div className="dev-support-res-details">
                        <strong className="dev-support-res-title">Chính sách bảo mật</strong>
                        <span className="dev-support-res-desc">Thông tin về dữ liệu và quyền riêng tư</span>
                      </div>
                      <ChevronRight size={15} className="dev-support-res-arrow" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal 1: Live Chat Modal */}
            {isLiveChatModalOpen && (
              <div className="dev-support-modal-overlay" onClick={() => setIsLiveChatModalOpen(false)}>
                <div className="dev-support-chat-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="dev-support-chat-header">
                    <div className="dev-support-chat-agent-info">
                      <div className="dev-support-chat-agent-avatar">
                        <img src="/dev_robot_dashboard.png" alt="Bot avatar" />
                        <span className="online-indicator" />
                      </div>
                      <div>
                        <h3 className="dev-support-chat-title">Hỗ trợ kỹ thuật Topdoo</h3>
                        <span className="dev-support-chat-status-text">Kỹ sư &amp; AI Trực tuyến 24/7</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setIsLiveChatModalOpen(false)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="dev-support-chat-body">
                    <div className="dev-support-chat-time-divider">Hôm nay</div>
                    {chatMessages.map((msg) => (
                      <div key={msg.id} className={`dev-support-chat-bubble-row ${msg.sender}`}>
                        {msg.sender === 'bot' && (
                          <div className="dev-support-chat-avatar-mini">
                            <Bot size={14} color="#0084FF" />
                          </div>
                        )}
                        <div className="dev-support-chat-bubble">
                          <span className="msg-text">{msg.text}</span>
                          <span className="msg-time">{msg.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick question prompts */}
                  <div className="dev-support-chat-quick-prompts">
                    <button
                      type="button"
                      className="quick-prompt-btn"
                      onClick={() => {
                        setChatInputText('Làm thế nào để tạo API Key?');
                      }}
                    >
                      Tạo API Key
                    </button>
                    <button
                      type="button"
                      className="quick-prompt-btn"
                      onClick={() => {
                        setChatInputText('Tôi bị lỗi 401 Unauthorized khi gọi API.');
                      }}
                    >
                      Lỗi 401
                    </button>
                    <button
                      type="button"
                      className="quick-prompt-btn"
                      onClick={() => {
                        setChatInputText('Tôi muốn tích hợp Python SDK.');
                      }}
                    >
                      Python SDK
                    </button>
                    <button
                      type="button"
                      className="quick-prompt-btn"
                      onClick={() => {
                        setChatInputText('Báo giá gói Pro và thời hạn.');
                      }}
                    >
                      Gói cước
                    </button>
                  </div>

                  <form className="dev-support-chat-footer" onSubmit={handleSendChatMessage}>
                    <input
                      type="text"
                      className="dev-support-chat-input"
                      placeholder="Nhập tin nhắn hỗ trợ của bạn..."
                      value={chatInputText}
                      onChange={(e) => setChatInputText(e.target.value)}
                    />
                    <button type="submit" className="dev-support-chat-send-btn" aria-label="Gửi">
                      <Send size={15} />
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Modal 2: Submit Support Ticket Modal */}
            {isTicketModalOpen && (
              <div className="dev-support-modal-overlay" onClick={() => setIsTicketModalOpen(false)}>
                <div className="dev-support-ticket-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="dev-support-modal-header">
                    <div className="dev-support-modal-title-row">
                      <div className="dev-support-modal-icon-badge">
                        <Mail size={20} color="#0084FF" />
                      </div>
                      <div>
                        <h3 className="dev-support-modal-title">Gửi yêu cầu hỗ trợ (Ticket)</h3>
                        <span className="dev-support-modal-sub">
                          Kỹ sư chuyên môn sẽ xử lý và phản hồi chi tiết qua email trong vòng 24 giờ.
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setIsTicketModalOpen(false)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmitTicket}>
                    <div className="dev-support-modal-body">
                      <div className="dev-support-form-row">
                        <div className="dev-support-form-group half">
                          <label className="dev-support-form-label">Họ và tên</label>
                          <input
                            type="text"
                            className="dev-support-form-input"
                            value={ticketName}
                            onChange={(e) => setTicketName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="dev-support-form-group half">
                          <label className="dev-support-form-label">Email phản hồi</label>
                          <input
                            type="email"
                            className="dev-support-form-input"
                            value={ticketEmail}
                            onChange={(e) => setTicketEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="dev-support-form-row">
                        <div className="dev-support-form-group half">
                          <label className="dev-support-form-label">Danh mục vấn đề</label>
                          <select
                            className="dev-support-form-select"
                            value={ticketCategory}
                            onChange={(e) => setTicketCategory(e.target.value)}
                          >
                            <option value="api">API &amp; SDK tích hợp</option>
                            <option value="billing">Thanh toán &amp; Gói cước</option>
                            <option value="account">Tài khoản &amp; API Key</option>
                            <option value="bug">Báo lỗi hệ thống (Bug report)</option>
                            <option value="feature">Đề xuất tính năng mới</option>
                          </select>
                        </div>
                        <div className="dev-support-form-group half">
                          <label className="dev-support-form-label">Mức độ ưu tiên</label>
                          <select
                            className="dev-support-form-select"
                            value={ticketPriority}
                            onChange={(e) => setTicketPriority(e.target.value)}
                          >
                            <option value="low">Thấp (Không ảnh hưởng tiến độ)</option>
                            <option value="medium">Bình thường (Tiêu chuẩn)</option>
                            <option value="high">Cao (Ứng dụng gặp sự cố)</option>
                            <option value="urgent">Khẩn cấp (Hệ thống ngừng hoạt động)</option>
                          </select>
                        </div>
                      </div>

                      <div className="dev-support-form-group">
                        <label className="dev-support-form-label">
                          Tiêu đề yêu cầu <span className="req">*</span>
                        </label>
                        <input
                          type="text"
                          className="dev-support-form-input"
                          placeholder="Tóm tắt ngắn gọn vấn đề của bạn..."
                          value={ticketSubject}
                          onChange={(e) => setTicketSubject(e.target.value)}
                          required
                        />
                      </div>

                      <div className="dev-support-form-group">
                        <label className="dev-support-form-label">
                          Nội dung mô tả chi tiết <span className="req">*</span>
                        </label>
                        <textarea
                          rows={4}
                          className="dev-support-form-textarea"
                          placeholder="Mô tả cụ thể các bước gây lỗi, mã lỗi, endpoint API hoặc thắc mắc của bạn..."
                          value={ticketContent}
                          onChange={(e) => setTicketContent(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="dev-support-modal-footer">
                      <button
                        type="button"
                        className="dev-support-modal-btn outline"
                        onClick={() => setIsTicketModalOpen(false)}
                      >
                        Hủy bỏ
                      </button>
                      <button type="submit" className="dev-support-modal-btn primary">
                        <Send size={14} />
                        <span>Gửi yêu cầu hỗ trợ</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal 3: FAQ Detail Modal */}
            {activeFaqItem && (
              <div className="dev-support-modal-overlay" onClick={() => setActiveFaqItem(null)}>
                <div className="dev-support-faq-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="dev-support-modal-header">
                    <div className="dev-support-modal-title-row">
                      <div className="dev-support-modal-icon-badge">
                        <HelpCircle size={20} color="#0084FF" />
                      </div>
                      <div>
                        <h3 className="dev-support-modal-title">Chi tiết câu hỏi thường gặp</h3>
                        <span className="dev-support-modal-sub">Giải đáp kỹ thuật từ Topdoo</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setActiveFaqItem(null)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="dev-support-modal-body">
                    <h4 className="dev-support-faq-modal-q">{activeFaqItem.q}</h4>
                    <p className="dev-support-faq-modal-a">{activeFaqItem.a}</p>
                  </div>

                  <div className="dev-support-modal-footer">
                    <button
                      type="button"
                      className="dev-support-modal-btn primary"
                      onClick={() => setActiveFaqItem(null)}
                    >
                      Đã hiểu
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal 4: Topic Articles Modal */}
            {activeTopicModal && (
              <div className="dev-support-modal-overlay" onClick={() => setActiveTopicModal(null)}>
                <div className="dev-support-topic-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="dev-support-modal-header">
                    <div className="dev-support-modal-title-row">
                      <div
                        className="dev-support-modal-icon-badge"
                        style={{ backgroundColor: activeTopicModal.iconBg }}
                      >
                        <Sparkles size={20} color={activeTopicModal.iconColor} />
                      </div>
                      <div>
                        <h3 className="dev-support-modal-title">Chủ đề: {activeTopicModal.title}</h3>
                        <span className="dev-support-modal-sub">{activeTopicModal.desc}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setActiveTopicModal(null)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="dev-support-modal-body">
                    <p className="dev-support-topic-modal-sub">
                      Danh sách các bài viết phổ biến nhất trong chuyên mục ({activeTopicModal.count}):
                    </p>
                    <div className="dev-support-topic-articles-list">
                      <div className="dev-support-topic-article-item">
                        <FileText size={15} color="#0084FF" />
                        <span>1. Hướng dẫn tổng quan và thiết lập ban đầu cho {activeTopicModal.title}</span>
                      </div>
                      <div className="dev-support-topic-article-item">
                        <FileText size={15} color="#0084FF" />
                        <span>2. Các trường hợp sử dụng tiêu chuẩn và mẫu code thực tế</span>
                      </div>
                      <div className="dev-support-topic-article-item">
                        <FileText size={15} color="#0084FF" />
                        <span>3. Xử lý lỗi phổ biến và tối ưu hóa hiệu năng ứng dụng</span>
                      </div>
                      <div className="dev-support-topic-article-item">
                        <FileText size={15} color="#0084FF" />
                        <span>4. Tiêu chuẩn bảo mật dữ liệu và quản lý hạn ngạch API</span>
                      </div>
                    </div>
                  </div>

                  <div className="dev-support-modal-footer">
                    <button
                      type="button"
                      className="dev-support-modal-btn outline"
                      onClick={() => setActiveTopicModal(null)}
                    >
                      Đóng
                    </button>
                    <button
                      type="button"
                      className="dev-support-modal-btn primary"
                      onClick={() => {
                        setActiveTopicModal(null);
                        handleNavClick('docs', 'Tài liệu');
                      }}
                    >
                      <span>Xem toàn bộ tài liệu</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal 5: Community Modal */}
            {isCommunityModalOpen && (
              <div className="dev-support-modal-overlay" onClick={() => setIsCommunityModalOpen(false)}>
                <div className="dev-support-community-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="dev-support-modal-header">
                    <div className="dev-support-modal-title-row">
                      <div className="dev-support-modal-icon-badge">
                        <Users size={20} color="#0084FF" />
                      </div>
                      <div>
                        <h3 className="dev-support-modal-title">Cộng đồng Topdoo Developer</h3>
                        <span className="dev-support-modal-sub">Tham gia kết nối cùng hơn 12.000+ kỹ sư AI</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setIsCommunityModalOpen(false)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="dev-support-modal-body">
                    <div className="dev-support-community-channel-card">
                      <div className="dev-support-comm-left">
                        <MessageSquare size={20} color="#5865F2" />
                        <div>
                          <strong>Discord Server</strong>
                          <span>Kênh thảo luận kỹ thuật trực tiếp, hỏi đáp code thời gian thực.</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="dev-support-comm-btn"
                        onClick={() => showToast('Discord', 'Đang chuyển hướng tới Discord Topdoo...', 'info')}
                      >
                        Tham gia
                      </button>
                    </div>

                    <div className="dev-support-community-channel-card">
                      <div className="dev-support-comm-left">
                        <Globe size={20} color="#1877F2" />
                        <div>
                          <strong>Facebook Community Group</strong>
                          <span>Cộng đồng nhà phát triển chia sẻ dự án và cập nhật tính năng mới.</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="dev-support-comm-btn"
                        onClick={() => showToast('Facebook Group', 'Đang chuyển hướng tới Facebook Group...', 'info')}
                      >
                        Tham gia
                      </button>
                    </div>

                    <div className="dev-support-community-channel-card">
                      <div className="dev-support-comm-left">
                        <GitBranch size={20} color="#0F172A" />
                        <div>
                          <strong>GitHub Discussions</strong>
                          <span>Đóng góp mã nguồn mở, SDK và gửi feedback kỹ thuật.</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="dev-support-comm-btn"
                        onClick={() => showToast('GitHub Discussions', 'Đang chuyển hướng tới GitHub Topdoo...', 'info')}
                      >
                        Tham gia
                      </button>
                    </div>
                  </div>

                  <div className="dev-support-modal-footer">
                    <button
                      type="button"
                      className="dev-support-modal-btn outline"
                      onClick={() => setIsCommunityModalOpen(false)}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            7. SETTINGS VIEW (CÀI ĐẶT)
            ========================================================================= */}
        {activeNav === 'settings' && (
          <div className="dev-settings-view">
            {/* Page Header */}
            <div className={`dev-settings-header ${settingsSubTab === 'security' || settingsSubTab === 'appearance' || settingsSubTab === 'integrations' || settingsSubTab === 'language' ? 'with-banner' : ''}`}>
              <div className="dev-settings-header-left">
                <h1 className="dev-settings-title">
                  {settingsSubTab === 'appearance' ? 'Giao diện' : 'Cài đặt'}
                </h1>
                <p className="dev-settings-subtitle">
                  {settingsSubTab === 'appearance'
                    ? 'Tùy chỉnh giao diện để có trải nghiệm làm việc thoải mái và hiệu quả hơn trên Topdoo.'
                    : 'Quản lý thông tin tài khoản, bảo mật và tùy chỉnh trải nghiệm của bạn trên Topdoo.'}
                </p>
              </div>

              {settingsSubTab === 'security' && (
                <div className="dev-settings-sec-header-banner">
                  <div className="dev-settings-sec-banner-shield">
                    <div className="dev-settings-sec-shield-halo outer" />
                    <div className="dev-settings-sec-shield-halo inner" />
                    <svg className="dev-settings-shield-svg" viewBox="0 0 64 74" fill="none">
                      <defs>
                        <linearGradient id="shieldGrad" x1="0" y1="0" x2="64" y2="74" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#38BDF8" />
                          <stop offset="35%" stopColor="#0084FF" />
                          <stop offset="100%" stopColor="#0055CC" />
                        </linearGradient>
                        <linearGradient id="shieldShine" x1="10" y1="0" x2="35" y2="40" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.45" />
                          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                        </linearGradient>
                        <filter id="shieldShadow" x="-10" y="-5" width="84" height="94" filterUnits="userSpaceOnUse">
                          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0084FF" floodOpacity="0.3" />
                        </filter>
                      </defs>
                      <path
                        d="M32 4 C48 10 58 13 60 16 C60 40 48 62 32 70 C16 62 4 40 4 16 C6 13 16 10 32 4 Z"
                        fill="url(#shieldGrad)"
                        filter="url(#shieldShadow)"
                      />
                      <path
                        d="M32 6 C44 11 52 14 55 17 C55 35 48 50 36 60 C33 46 32 30 32 6 Z"
                        fill="url(#shieldShine)"
                      />
                      <rect x="22" y="32" width="20" height="17" rx="3" fill="#FFFFFF" />
                      <path
                        d="M26 32 V26 C26 22.68 28.68 20 32 20 C35.32 20 38 22.68 38 26 V32"
                        stroke="#FFFFFF"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        fill="none"
                      />
                      <circle cx="32" cy="39" r="1.8" fill="#0084FF" />
                      <path d="M31.2 39.5 L32.8 39.5 L33.2 44 L30.8 44 Z" fill="#0084FF" />
                    </svg>
                  </div>

                  <div className="dev-settings-sec-banner-text">
                    <h3 className="dev-settings-sec-banner-title">Bảo mật tài khoản</h3>
                    <p className="dev-settings-sec-banner-desc">
                      Bảo vệ dữ liệu của bạn<br />là ưu tiên hàng đầu của Topdoo.
                    </p>
                  </div>
                </div>
              )}

              {settingsSubTab === 'appearance' && (
                <div className="dev-appearance-header-banner">
                  <div className="dev-appearance-banner-art">
                    <div className="dev-appearance-art-browser">
                      <div className="dev-appearance-art-browser-bar">
                        <span className="dot dot-red" />
                        <span className="dot dot-yellow" />
                        <span className="dot dot-green" />
                        <div className="dev-appearance-art-address-pill" />
                      </div>
                      <div className="dev-appearance-art-browser-body">
                        <div className="dev-appearance-art-line bar-blue" />
                        <div className="dev-appearance-art-line bar-gray" />
                        <div className="dev-appearance-art-line bar-gray short" />
                      </div>
                    </div>

                    <div className="dev-appearance-art-brush-wrap">
                      <svg className="dev-appearance-art-brush-svg" viewBox="0 0 64 64" fill="none">
                        <path d="M12 18 L13.5 13.5 L18 12 L13.5 10.5 L12 6 L10.5 10.5 L6 12 L10.5 13.5 Z" fill="#38BDF8" />
                        <path d="M48 42 L49 39 L52 38 L49 37 L48 34 L47 37 L44 38 L47 39 Z" fill="#60A5FA" />
                        <g transform="rotate(-35 32 32)">
                          <rect x="29" y="8" width="6" height="26" rx="3" fill="#94A3B8" />
                          <rect x="28" y="30" width="8" height="8" rx="2" fill="#64748B" />
                          <path d="M27 38 C27 38 26 48 29 52 C31 54 33 54 35 52 C38 48 37 38 37 38 Z" fill="#0084FF" />
                          <path d="M29 44 C29 44 28 49 30 51 C31 52 33 52 34 51 C36 49 35 44 35 44 Z" fill="#38BDF8" opacity="0.6" />
                        </g>
                      </svg>
                    </div>
                  </div>

                  <div className="dev-appearance-banner-quote">
                    <p className="dev-appearance-quote-text">
                      <span className="quote-mark">“</span> Giao diện phù hợp<br />
                      Trải nghiệm tuyệt vời <span className="quote-mark">”</span>
                    </p>
                    <span className="dev-appearance-quote-brand">TOPDOO</span>
                  </div>
                </div>
              )}

              {settingsSubTab === 'integrations' && (
                <div className="dev-integrations-header-banner">
                  <div className="dev-integrations-banner-art">
                    <div className="dev-puzzle-3d-box">
                      <Puzzle size={46} color="#0084FF" />
                    </div>
                  </div>
                  <div className="dev-integrations-banner-text">
                    <h3 className="banner-title">Kết nối mạnh mẽ</h3>
                    <p className="banner-desc">Mở rộng khả năng với các công cụ và dịch vụ yêu thích của bạn.</p>
                  </div>
                </div>
              )}

              {settingsSubTab === 'language' && (
                <div className="dev-language-header-banner">
                  <div className="dev-language-banner-art">
                    <div className="lang-globe-card">
                      <Globe size={46} color="#0084FF" />
                      <span className="lang-badge lang-a">A</span>
                      <span className="lang-badge lang-zh">文</span>
                    </div>
                  </div>
                  <div className="dev-language-banner-text">
                    <h3 className="banner-title">Đa ngôn ngữ &bull; Kết nối toàn cầu</h3>
                    <p className="banner-desc">Topdoo hỗ trợ nhiều ngôn ngữ để mang đến trải nghiệm tốt nhất cho developer trên toàn thế giới.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sub-navigation Pill Bar */}
            {settingsSubTab !== 'appearance' && (
            <div className="dev-settings-tabs-bar">
              <button
                type="button"
                className={`dev-settings-tab-btn ${settingsSubTab === 'account' ? 'active' : ''}`}
                onClick={() => setSettingsSubTab('account')}
              >
                <User size={16} />
                <span>Tài khoản</span>
              </button>
              <button
                type="button"
                className={`dev-settings-tab-btn ${settingsSubTab === 'security' ? 'active' : ''}`}
                onClick={() => setSettingsSubTab('security')}
              >
                <Lock size={16} />
                <span>Bảo mật</span>
              </button>
              <button
                type="button"
                className={`dev-settings-tab-btn ${settingsSubTab === 'notifications' ? 'active' : ''}`}
                onClick={() => setSettingsSubTab('notifications')}
              >
                <Bell size={16} />
                <span>Thông báo</span>
              </button>
              <button
                type="button"
                className={`dev-settings-tab-btn ${settingsSubTab === 'appearance' ? 'active' : ''}`}
                onClick={() => setSettingsSubTab('appearance')}
              >
                <Palette size={16} />
                <span>Giao diện</span>
              </button>
              <button
                type="button"
                className={`dev-settings-tab-btn ${settingsSubTab === 'integrations' ? 'active' : ''}`}
                onClick={() => setSettingsSubTab('integrations')}
              >
                <Puzzle size={16} />
                <span>Tích hợp</span>
              </button>
              <button
                type="button"
                className={`dev-settings-tab-btn ${settingsSubTab === 'language' ? 'active' : ''}`}
                onClick={() => setSettingsSubTab('language')}
              >
                <Globe size={16} />
                <span>Ngôn ngữ</span>
              </button>
            </div>
            )}

            {/* Main Content Layout: 2 Columns */}
            {settingsSubTab === 'account' && (
              <div className="dev-settings-main-layout">
                {/* Left Column (Cards) */}
                <div className="dev-settings-left-col">
                  {/* Card 1: Thông tin cá nhân */}
                  <div className="dev-settings-card">
                    <div className="dev-settings-card-header">
                      <div>
                        <h2 className="dev-settings-card-title">Thông tin cá nhân</h2>
                        <p className="dev-settings-card-sub">Cập nhật thông tin hồ sơ của bạn.</p>
                      </div>
                      <button
                        type="button"
                        className="dev-settings-edit-btn"
                        onClick={handleOpenEditProfile}
                      >
                        Chỉnh sửa
                      </button>
                    </div>

                    <div className="dev-settings-profile-content">
                      <div className="dev-settings-avatar-wrap">
                        <img
                          src={profileAvatar}
                          alt={profileName}
                          className="dev-settings-avatar-img"
                        />
                        <label
                          htmlFor="dev-settings-avatar-upload"
                          className="dev-settings-avatar-camera"
                          title="Thay đổi ảnh đại diện"
                        >
                          <Camera size={14} color="#FFFFFF" />
                          <input
                            id="dev-settings-avatar-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleAvatarChange}
                          />
                        </label>
                      </div>

                      <div className="dev-settings-fields-table">
                        <div className="dev-settings-field-row">
                          <span className="dev-settings-field-label">Họ và tên</span>
                          <div className="dev-settings-field-value-box">
                            <span className="dev-settings-field-text">{profileName}</span>
                          </div>
                        </div>

                        <div className="dev-settings-field-row">
                          <span className="dev-settings-field-label">Email</span>
                          <div className="dev-settings-field-value-box has-badge">
                            <span className="dev-settings-field-text">{profileEmail}</span>
                            <span className="dev-settings-verified-badge">
                              <Check size={12} strokeWidth={2.5} />
                              <span>Đã xác minh</span>
                            </span>
                          </div>
                        </div>

                        <div className="dev-settings-field-row">
                          <span className="dev-settings-field-label">Vai trò</span>
                          <div className="dev-settings-field-value-box">
                            <span className="dev-settings-field-text">{profileRole}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Cài đặt hiển thị */}
                  <div className="dev-settings-card">
                    <div className="dev-settings-card-header">
                      <div>
                        <h2 className="dev-settings-card-title">Cài đặt hiển thị</h2>
                        <p className="dev-settings-card-sub">Tùy chỉnh giao diện và trải nghiệm sử dụng.</p>
                      </div>
                    </div>

                    <div className="dev-settings-rows-list">
                      {/* Row 1: Chế độ giao diện */}
                      <div className="dev-settings-item-row">
                        <div className="dev-settings-item-info">
                          <div className="dev-settings-item-icon">
                            <Settings size={18} color="#475569" />
                          </div>
                          <div>
                            <div className="dev-settings-item-title">Chế độ giao diện</div>
                            <div className="dev-settings-item-sub">Chọn giao diện sáng hoặc tối</div>
                          </div>
                        </div>

                        <div className="dev-settings-theme-selector">
                          <button
                            type="button"
                            className={`dev-settings-theme-btn ${themeMode === 'light' ? 'active' : ''}`}
                            onClick={() => {
                              setThemeMode('light');
                              showToast('Giao diện', 'Đã chuyển sang chế độ Sáng.', 'info');
                            }}
                          >
                            <span className="dev-settings-radio-dot"></span>
                            <Sun size={15} />
                            <span>Sáng</span>
                          </button>

                          <button
                            type="button"
                            className={`dev-settings-theme-btn ${themeMode === 'dark' ? 'active' : ''}`}
                            onClick={() => {
                              setThemeMode('dark');
                              showToast('Giao diện', 'Đã chuyển sang chế độ Tối.', 'info');
                            }}
                          >
                            <Moon size={15} />
                            <span>Tối</span>
                          </button>

                          <button
                            type="button"
                            className={`dev-settings-theme-btn ${themeMode === 'system' ? 'active' : ''}`}
                            onClick={() => {
                              setThemeMode('system');
                              showToast('Giao diện', 'Đã đồng bộ theo cài đặt hệ thống.', 'info');
                            }}
                          >
                            <Monitor size={15} />
                            <span>Theo hệ thống</span>
                          </button>
                        </div>
                      </div>

                      {/* Row 2: Ngôn ngữ hiển thị */}
                      <div className="dev-settings-item-row">
                        <div className="dev-settings-item-info">
                          <div className="dev-settings-item-icon">
                            <Tv size={18} color="#475569" />
                          </div>
                          <div>
                            <div className="dev-settings-item-title">Ngôn ngữ hiển thị</div>
                            <div className="dev-settings-item-sub">Chọn ngôn ngữ sử dụng trong hệ thống</div>
                          </div>
                        </div>

                        <div className="dev-settings-select-wrap">
                          <select
                            className="dev-settings-select"
                            value={selectedLanguage}
                            onChange={(e) => {
                              setSelectedLanguage(e.target.value);
                              showToast('Ngôn ngữ', 'Đã cập nhật ngôn ngữ hiển thị.', 'success');
                            }}
                          >
                            <option value="vi">🇻🇳 Tiếng Việt</option>
                            <option value="en">🇺🇸 English</option>
                            <option value="ja">🇯🇵 日本語</option>
                          </select>
                          <ChevronDown size={14} className="dev-settings-select-caret" />
                        </div>
                      </div>

                      {/* Row 3: Múi giờ */}
                      <div className="dev-settings-item-row">
                        <div className="dev-settings-item-info">
                          <div className="dev-settings-item-icon">
                            <Clock size={18} color="#475569" />
                          </div>
                          <div>
                            <div className="dev-settings-item-title">Múi giờ</div>
                            <div className="dev-settings-item-sub">Đây là múi giờ dùng để hiển thị thời gian trong hệ thống</div>
                          </div>
                        </div>

                        <div className="dev-settings-select-wrap timezone">
                          <select
                            className="dev-settings-select"
                            value={selectedTimezone}
                            onChange={(e) => {
                              setSelectedTimezone(e.target.value);
                              showToast('Múi giờ', 'Đã cập nhật múi giờ hệ thống.', 'success');
                            }}
                          >
                            <option value="(GMT+07:00) Bangkok, Hà Nội, Jakarta">
                              (GMT+07:00) Bangkok, Hà Nội, Jakarta
                            </option>
                            <option value="(GMT+08:00) Singapore, Kuala Lumpur">
                              (GMT+08:00) Singapore, Kuala Lumpur
                            </option>
                            <option value="(GMT+09:00) Tokyo, Seoul">
                              (GMT+09:00) Tokyo, Seoul
                            </option>
                            <option value="(GMT+00:00) UTC, London">
                              (GMT+00:00) UTC, London
                            </option>
                          </select>
                          <ChevronDown size={14} className="dev-settings-select-caret" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Tùy chọn */}
                  <div className="dev-settings-card">
                    <div className="dev-settings-card-header">
                      <div>
                        <h2 className="dev-settings-card-title">Tùy chọn</h2>
                        <p className="dev-settings-card-sub">Tùy chỉnh các thiết lập khác theo nhu cầu.</p>
                      </div>
                    </div>

                    <div className="dev-settings-rows-list">
                      {/* Toggle 1: Email updates */}
                      <div className="dev-settings-item-row">
                        <div className="dev-settings-item-info">
                          <div className="dev-settings-item-icon">
                            <Shield size={18} color="#475569" />
                          </div>
                          <div>
                            <div className="dev-settings-item-title">Nhận email cập nhật sản phẩm</div>
                            <div className="dev-settings-item-sub">Nhận thông báo về tính năng mới, sản phẩm và sự kiện từ Topdoo.</div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`dev-settings-toggle-btn ${emailProductUpdates ? 'on' : 'off'}`}
                          onClick={() => {
                            setEmailProductUpdates(!emailProductUpdates);
                            showToast('Thông báo email', !emailProductUpdates ? 'Đã bật nhận email cập nhật sản phẩm.' : 'Đã tắt nhận email cập nhật.', 'info');
                          }}
                          aria-label="Toggle email updates"
                        >
                          <span className="dev-settings-toggle-thumb"></span>
                        </button>
                      </div>

                      {/* Toggle 2: Security alerts */}
                      <div className="dev-settings-item-row">
                        <div className="dev-settings-item-info">
                          <div className="dev-settings-item-icon">
                            <ShieldCheck size={18} color="#475569" />
                          </div>
                          <div>
                            <div className="dev-settings-item-title">Nhận thông báo bảo mật</div>
                            <div className="dev-settings-item-sub">Nhận cảnh báo khi có hoạt động đăng nhập bất thường.</div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`dev-settings-toggle-btn ${securityAlerts ? 'on' : 'off'}`}
                          onClick={() => {
                            setSecurityAlerts(!securityAlerts);
                            showToast('Thông báo bảo mật', !securityAlerts ? 'Đã bật thông báo bảo mật.' : 'Đã tắt thông báo bảo mật.', 'info');
                          }}
                          aria-label="Toggle security alerts"
                        >
                          <span className="dev-settings-toggle-thumb"></span>
                        </button>
                      </div>

                      {/* Toggle 3: Anonymous data sharing */}
                      <div className="dev-settings-item-row">
                        <div className="dev-settings-item-info">
                          <div className="dev-settings-item-icon">
                            <Lock size={18} color="#475569" />
                          </div>
                          <div>
                            <div className="dev-settings-item-title">Chia sẻ dữ liệu sử dụng ẩn danh</div>
                            <div className="dev-settings-item-sub">Giúp chúng tôi cải thiện sản phẩm tốt hơn.</div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`dev-settings-toggle-btn ${anonymousDataSharing ? 'on' : 'off'}`}
                          onClick={() => {
                            setAnonymousDataSharing(!anonymousDataSharing);
                            showToast('Chia sẻ dữ liệu', !anonymousDataSharing ? 'Đã bật chia sẻ dữ liệu ẩn danh.' : 'Đã tắt chia sẻ dữ liệu ẩn danh.', 'info');
                          }}
                          aria-label="Toggle anonymous data sharing"
                        >
                          <span className="dev-settings-toggle-thumb"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="dev-settings-right-col">
                  {/* Card 1: Gói dịch vụ hiện tại */}
                  <div className="dev-settings-card side-card">
                    <div className="dev-settings-card-header">
                      <h2 className="dev-settings-side-title">Gói dịch vụ hiện tại</h2>
                      <button
                        type="button"
                        className="dev-settings-side-link"
                        onClick={() => handleNavClick('billing', 'Thanh toán')}
                      >
                        <span>Nâng cấp</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                    <div className="dev-settings-plan-box">
                      <div className="dev-settings-plan-top">
                        <div className="dev-settings-plan-badge-icon">
                          <CreditCard size={18} color="#D97706" />
                        </div>
                        <div>
                          <div className="dev-settings-plan-name">Free</div>
                          <div className="dev-settings-plan-sub">Dành cho người mới bắt đầu</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="dev-settings-plan-action-btn"
                        onClick={() => handleNavClick('billing', 'Thanh toán')}
                      >
                        <span>Xem chi tiết các gói</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                    <ul className="dev-settings-plan-features">
                      <li>
                        <CheckCircle2 size={16} className="dev-settings-plan-check-icon" />
                        <span>100K tokens/tháng</span>
                      </li>
                      <li>
                        <CheckCircle2 size={16} className="dev-settings-plan-check-icon" />
                        <span>Truy cập Playground</span>
                      </li>
                      <li>
                        <CheckCircle2 size={16} className="dev-settings-plan-check-icon" />
                        <span>Hỗ trợ cộng đồng</span>
                      </li>
                      <li>
                        <CheckCircle2 size={16} className="dev-settings-plan-check-icon" />
                        <span>Nâng cấp để mở rộng giới hạn và tính năng.</span>
                      </li>
                    </ul>
                  </div>

                  {/* Card 2: Hoạt động tài khoản gần đây */}
                  <div className="dev-settings-card side-card">
                    <div className="dev-settings-card-header">
                      <h2 className="dev-settings-side-title">Hoạt động tài khoản gần đây</h2>
                      <button
                        type="button"
                        className="dev-settings-side-link"
                        onClick={() => setIsActivityModalOpen(true)}
                      >
                        <span>Xem tất cả</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                    <div className="dev-settings-activity-list">
                      {recentActivities.map((act) => {
                        return (
                          <div key={act.id} className="dev-settings-activity-item">
                            <div className={`dev-settings-activity-icon ${act.status}`}>
                              {act.type === 'login' && <ShieldCheck size={16} />}
                              {act.type === 'key' && <Key size={16} />}
                              {act.type === 'profile' && <User size={16} />}
                              {act.type === 'payment' && <Receipt size={16} />}
                              {act.type === 'logout' && <LogOut size={16} />}
                            </div>
                            <div className="dev-settings-activity-content">
                              <div className="dev-settings-activity-title">{act.title}</div>
                              <div className="dev-settings-activity-desc">{act.desc}</div>
                            </div>
                            <div className="dev-settings-activity-time">{act.time}</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Card 3: Cần hỗ trợ? */}
                  <div className="dev-settings-card side-card support-box">
                    <div className="dev-settings-need-help-header">
                      <div className="dev-settings-need-help-icon">
                        <Headphones size={22} color="#0084FF" />
                      </div>
                      <div>
                        <div className="dev-settings-need-help-title">Cần hỗ trợ?</div>
                        <div className="dev-settings-need-help-sub">
                          Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng giúp bạn.
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="dev-settings-need-help-btn"
                      onClick={() => handleNavClick('support', 'Hỗ trợ')}
                    >
                      <span>Liên hệ hỗ trợ</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Subtab: Pixel-perfect implementation matching reference */}
            {settingsSubTab === 'security' && (
              <div className="dev-settings-main-layout">
                {/* Left Column: 5 Security Settings Cards */}
                <div className="dev-settings-left-col">
                  {/* Card 1: Xác thực 2 lớp (2FA) */}
                  <div className="dev-settings-sec-card">
                    <div className="dev-settings-sec-card-left">
                      <div className="dev-settings-sec-icon-circle green">
                        <ShieldCheck size={22} color="#16A34A" />
                      </div>
                      <div className="dev-settings-sec-content">
                        <div className="dev-settings-sec-title-row">
                          <h2 className="dev-settings-sec-title">Xác thực 2 lớp (2FA)</h2>
                          {twoFactorEnabled && (
                            <span className="dev-settings-sec-badge active">
                              <Check size={12} strokeWidth={2.5} />
                              <span>Đã bật</span>
                            </span>
                          )}
                        </div>
                        <p className="dev-settings-sec-desc-main">
                          Tăng cường bảo mật cho tài khoản bằng mã xác thực 2 lớp.
                        </p>
                        <p className="dev-settings-sec-desc-sub">
                          Mỗi khi đăng nhập, bạn sẽ cần mã từ ứng dụng xác thực (Google Authenticator, Microsoft Authenticator, v.v.).
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-settings-sec-btn"
                      onClick={() => setIs2FAModalOpen(true)}
                    >
                      Quản lý
                    </button>
                  </div>

                  {/* Card 2: Mật khẩu */}
                  <div className="dev-settings-sec-card">
                    <div className="dev-settings-sec-card-left">
                      <div className="dev-settings-sec-icon-circle blue">
                        <Lock size={20} color="#0084FF" />
                      </div>
                      <div className="dev-settings-sec-content">
                        <h2 className="dev-settings-sec-title">Mật khẩu</h2>
                        <p className="dev-settings-sec-desc-main">
                          Đổi mật khẩu định kỳ để bảo vệ tài khoản của bạn.
                        </p>
                        <p className="dev-settings-sec-desc-sub">
                          Nên sử dụng mật khẩu mạnh với ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-settings-sec-btn"
                      onClick={() => setIsChangePasswordModalOpen(true)}
                    >
                      Đổi mật khẩu
                    </button>
                  </div>

                  {/* Card 3: Thiết bị đăng nhập */}
                  <div className="dev-settings-sec-card">
                    <div className="dev-settings-sec-card-left">
                      <div className="dev-settings-sec-icon-circle blue">
                        <Monitor size={20} color="#0084FF" />
                      </div>
                      <div className="dev-settings-sec-content">
                        <h2 className="dev-settings-sec-title">Thiết bị đăng nhập</h2>
                        <p className="dev-settings-sec-desc-main">
                          Quản lý các thiết bị đã đăng nhập vào tài khoản của bạn.
                        </p>
                        <p className="dev-settings-sec-desc-sub">
                          Kiểm tra và đăng xuất khỏi các thiết bị không còn sử dụng.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-settings-sec-btn"
                      onClick={() => setIsDevicesModalOpen(true)}
                    >
                      Quản lý thiết bị
                    </button>
                  </div>

                  {/* Card 4: Phiên làm việc (Session) */}
                  <div className="dev-settings-sec-card">
                    <div className="dev-settings-sec-card-left">
                      <div className="dev-settings-sec-icon-circle slate">
                        <Clock size={20} color="#0F172A" />
                      </div>
                      <div className="dev-settings-sec-content">
                        <h2 className="dev-settings-sec-title">Phiên làm việc (Session)</h2>
                        <p className="dev-settings-sec-desc-main">
                          Quản lý thời gian phiên đăng nhập.
                        </p>
                        <p className="dev-settings-sec-desc-sub">
                          Tự động đăng xuất khi không hoạt động trong thời gian dài.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-settings-sec-btn"
                      onClick={() => setIsSessionModalOpen(true)}
                    >
                      Cấu hình
                    </button>
                  </div>

                  {/* Card 5: Xóa tài khoản */}
                  <div className="dev-settings-sec-card danger-card">
                    <div className="dev-settings-sec-card-left">
                      <div className="dev-settings-sec-icon-circle red">
                        <Trash2 size={20} color="#EF4444" />
                      </div>
                      <div className="dev-settings-sec-content">
                        <h2 className="dev-settings-sec-title">Xóa tài khoản</h2>
                        <p className="dev-settings-sec-desc-sub" style={{ marginTop: 4 }}>
                          Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-settings-sec-btn danger"
                      onClick={() => setIsDeleteAccountModalOpen(true)}
                    >
                      Xóa tài khoản
                    </button>
                  </div>
                </div>

                {/* Right Column: 3 Security Status Cards */}
                <div className="dev-settings-right-col">
                  {/* Right Card 1: Mức độ bảo mật */}
                  <div className="dev-settings-card side-card dev-sec-level-card">
                    <h2 className="dev-settings-side-title" style={{ marginBottom: 16 }}>
                      Mức độ bảo mật
                    </h2>
                    
                    <div className="dev-sec-level-body">
                      {/* Gauge meter on the left */}
                      <div className="dev-sec-gauge-container">
                        <svg className="dev-sec-gauge-svg" viewBox="0 0 120 70">
                          {/* Background Arc */}
                          <path
                            d="M 15 55 A 45 45 0 0 1 105 55"
                            fill="none"
                            stroke="#E2E8F0"
                            strokeWidth="9"
                            strokeLinecap="round"
                          />
                          {/* Active Green Arc (~85% full) */}
                          <path
                            d="M 15 55 A 45 45 0 0 1 105 55"
                            fill="none"
                            stroke="#10B981"
                            strokeWidth="9"
                            strokeLinecap="round"
                            strokeDasharray="141.4"
                            strokeDashoffset="24"
                          />
                          <text
                            x="60"
                            y="52"
                            textAnchor="middle"
                            fill="#10B981"
                            fontSize="16"
                            fontWeight="700"
                            fontFamily="inherit"
                          >
                            Cao
                          </text>
                        </svg>
                      </div>

                      {/* Checklist on the right */}
                      <ul className="dev-sec-checklist">
                        <li>
                          <span className="dev-sec-check-circle">
                            <Check size={10} color="#FFFFFF" strokeWidth={3} />
                          </span>
                          <span>Đã xác thực 2 lớp</span>
                        </li>
                        <li>
                          <span className="dev-sec-check-circle">
                            <Check size={10} color="#FFFFFF" strokeWidth={3} />
                          </span>
                          <span>Mật khẩu mạnh</span>
                        </li>
                        <li>
                          <span className="dev-sec-check-circle">
                            <Check size={10} color="#FFFFFF" strokeWidth={3} />
                          </span>
                          <span>Không có thiết bị lạ</span>
                        </li>
                        <li>
                          <span className="dev-sec-check-circle">
                            <Check size={10} color="#FFFFFF" strokeWidth={3} />
                          </span>
                          <span>Thông tin cá nhân an toàn</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Card 2: Hoạt động đăng nhập gần đây */}
                  <div className="dev-settings-card side-card">
                    <div className="dev-settings-card-header" style={{ marginBottom: 14 }}>
                      <h2 className="dev-settings-side-title">Hoạt động đăng nhập gần đây</h2>
                      <button
                        type="button"
                        className="dev-settings-side-link"
                        onClick={() => setIsAllLoginLogsModalOpen(true)}
                      >
                        <span>Xem tất cả</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>

                    <div className="dev-sec-login-list">
                      {loginActivities.map((item) => (
                        <div key={item.id} className="dev-sec-login-item">
                          <div className="dev-sec-login-icon">
                            {item.browserType === 'chrome' && (
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="#E2E8F0" strokeWidth="1" />
                                <circle cx="12" cy="12" r="4" fill="#0084FF" />
                                <path d="M12 2 C16.5 2 20.3 5.1 21.6 9.3 L14.7 9.3 C14.1 8 13.1 7.2 12 7.2 L12 2 Z" fill="#EA4335" />
                                <path d="M21.6 9.3 C22.1 10.9 22.1 12.7 21.6 14.3 L15.7 14.3 C16.2 13.5 16.2 12.5 16 11.6 L21.6 9.3 Z" fill="#FBBC05" />
                                <path d="M21.6 14.3 C19.6 19.3 14 22.4 8.7 21.4 L12.2 15.3 C13 15.6 14 15.4 14.7 14.8 L21.6 14.3 Z" fill="#34A853" />
                                <path d="M8.7 21.4 C4.3 20.5 1.4 16.2 2.2 11.7 L8.1 11.7 C8.1 12.8 8.6 13.9 9.5 14.5 L8.7 21.4 Z" fill="#4285F4" />
                              </svg>
                            )}
                            {item.browserType === 'mobile' && (
                              <Smartphone size={20} color="#64748B" />
                            )}
                            {item.browserType === 'edge' && (
                              <Globe size={20} color="#0284C7" />
                            )}
                            {item.browserType === 'android' && (
                              <Bot size={20} color="#16A34A" />
                            )}
                          </div>

                          <div className="dev-sec-login-info">
                            <div className="dev-sec-login-row">
                              <span className="dev-sec-login-device">{item.device}</span>
                              {item.isCurrent && (
                                <span className="dev-sec-active-pill">Đang hoạt động</span>
                              )}
                            </div>
                            <div className="dev-sec-login-row">
                              <span className="dev-sec-login-loc">{item.location}</span>
                              <span className="dev-sec-login-time">{item.time}</span>
                            </div>
                          </div>

                          <div className="dev-sec-menu-wrap">
                            <button
                              type="button"
                              className="dev-sec-more-btn"
                              title="Thao tác"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveDeviceMenuId(activeDeviceMenuId === item.id ? null : item.id);
                              }}
                            >
                              <MoreVertical size={14} color="#94A3B8" />
                            </button>
                            {activeDeviceMenuId === item.id && (
                              <div className="dev-sec-dropdown-menu">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setActiveDeviceMenuId(null);
                                    showToast('Chi tiết thiết bị', `IP: ${item.ip} • ${item.device}`, 'info');
                                  }}
                                >
                                  Xem thông tin
                                </button>
                                {!item.isCurrent && (
                                  <button
                                    type="button"
                                    className="danger"
                                    onClick={() => {
                                      setActiveDeviceMenuId(null);
                                      setLoginActivities(prev => prev.filter(d => d.id !== item.id));
                                      showToast('Đã đăng xuất', `Đã kết thúc phiên trên ${item.device}`, 'success');
                                    }}
                                  >
                                    Đăng xuất thiết bị
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Card 3: Mẹo bảo mật */}
                  <div className="dev-sec-tip-box">
                    <div className="dev-sec-tip-icon">
                      <Shield size={18} fill="#0084FF" color="#0084FF" />
                    </div>
                    <div className="dev-sec-tip-body">
                      <h4 className="dev-sec-tip-title">Mẹo bảo mật</h4>
                      <p className="dev-sec-tip-text">
                        Không chia sẻ API Key, mật khẩu và mã xác thực với bất kỳ ai, kể cả nhân viên Topdoo.
                      </p>
                      <button
                        type="button"
                        className="dev-sec-tip-link"
                        onClick={() => {
                          showToast('Tài liệu bảo mật', 'Đang mở cẩm nang thực hành an toàn thông tin.', 'info');
                        }}
                      >
                        <span>Xem thêm hướng dẫn</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cài đặt Thông báo (Settings Subtab) */}
            {settingsSubTab === 'notifications' && (
              <div className="dev-settings-card" style={{ maxWidth: 880 }}>
                <div className="dev-settings-card-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h2 className="dev-settings-card-title">Cài đặt Thông báo & Kênh liên lạc</h2>
                    <p className="dev-settings-card-sub">
                      Tùy chỉnh các loại thông báo và kênh bạn muốn nhận từ hệ thống Topdoo Developer.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="dev-proj-action-btn primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', fontSize: 13 }}
                    onClick={() => handleNavClick('notifications', 'Thông báo')}
                  >
                    <Bell size={15} />
                    <span>Xem trung tâm thông báo ({notifCounts.all})</span>
                  </button>
                </div>

                <div style={{ padding: '24px 28px' }}>
                  <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em', marginBottom: 14 }}>
                    Kênh nhận thông báo chính thức
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>Email thông báo</div>
                        <div style={{ fontSize: 12.5, color: '#64748B' }}>Gửi thư về hộp thư chính thức {profileEmail}</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifChannelPrefs.email}
                        onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, email: e.target.checked }))}
                        style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#0084FF' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>Thông báo đẩy trình duyệt (Push Web)</div>
                        <div style={{ fontSize: 12.5, color: '#64748B' }}>Nhận thông báo tức thì khi tab trình duyệt đang mở hoặc chạy nền</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifChannelPrefs.push}
                        onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, push: e.target.checked }))}
                        style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#0084FF' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>Webhook Endpoint</div>
                        <div style={{ fontSize: 12.5, color: '#64748B' }}>Tự động bắn payload JSON sang server của bạn (https://api.domain.com/webhook)</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifChannelPrefs.webhook}
                        onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, webhook: e.target.checked }))}
                        style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#0084FF' }}
                      />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 12 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>Telegram Bot (@TopdooBot)</div>
                        <div style={{ fontSize: 12.5, color: '#64748B' }}>Nhận tin nhắn báo cáo khẩn cấp qua bot Telegram riêng</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={notifChannelPrefs.telegram}
                        onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, telegram: e.target.checked }))}
                        style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#0084FF' }}
                      />
                    </div>
                  </div>

                  <h3 style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em', marginBottom: 14 }}>
                    Sự kiện cần kích hoạt thông báo
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 12, marginBottom: 28 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={notifChannelPrefs.systemAlerts}
                        onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, systemAlerts: e.target.checked }))}
                        style={{ width: 16, height: 16, accentColor: '#0084FF' }}
                      />
                      <span style={{ fontSize: 13.5, color: '#334155' }}>Bảo trì hệ thống & Cập nhật API</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={notifChannelPrefs.projectStatus}
                        onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, projectStatus: e.target.checked }))}
                        style={{ width: 16, height: 16, accentColor: '#0084FF' }}
                      />
                      <span style={{ fontSize: 13.5, color: '#334155' }}>Trạng thái triển khai dự án</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={notifChannelPrefs.billingAlerts}
                        onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, billingAlerts: e.target.checked }))}
                        style={{ width: 16, height: 16, accentColor: '#0084FF' }}
                      />
                      <span style={{ fontSize: 13.5, color: '#334155' }}>Giao dịch thanh toán & Hóa đơn</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: '#F8FAFC', borderRadius: 10, border: '1px solid #E2E8F0', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={notifChannelPrefs.supportUpdates}
                        onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, supportUpdates: e.target.checked }))}
                        style={{ width: 16, height: 16, accentColor: '#0084FF' }}
                      />
                      <span style={{ fontSize: 13.5, color: '#334155' }}>Phản hồi ticket hỗ trợ kỹ thuật</span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                    <button
                      type="button"
                      className="dev-proj-action-btn primary"
                      onClick={() => showToast('Thành công', 'Đã lưu cấu hình kênh thông báo!', 'success')}
                    >
                      Lưu thay đổi cấu hình
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. APPEARANCE SUBTAB (GIAO DIỆN) */}
            {settingsSubTab === 'appearance' && (
              <div className="dev-appearance-container">
                {/* LEFT COLUMN: Controls */}
                <div className="dev-appearance-col-left">
                  {/* 1. Chế độ giao diện */}
                  <div className="dev-appearance-section">
                    <h3 className="dev-appearance-section-title">Chế độ giao diện</h3>
                    <p className="dev-appearance-section-sub">
                      Chọn giao diện hiển thị phù hợp với môi trường làm việc của bạn.
                    </p>
                    <div className="dev-appearance-mode-grid">
                      {/* Sáng */}
                      <div
                        className={`dev-appearance-card ${themeMode === 'light' ? 'active' : ''}`}
                        onClick={() => {
                          setThemeMode('light');
                          showToast('Chế độ giao diện', 'Đã chuyển sang giao diện Sáng', 'success');
                        }}
                      >
                        {themeMode === 'light' && (
                          <div className="dev-appearance-check-badge">
                            <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                          </div>
                        )}
                        <div className="dev-appearance-card-icon-box light-icon">
                          <Sun size={24} color="#0084FF" />
                        </div>
                        <h4 className="dev-appearance-card-title">Sáng</h4>
                        <p className="dev-appearance-card-desc">
                          Giao diện sáng, phù hợp sử dụng ban ngày.
                        </p>
                      </div>

                      {/* Tối */}
                      <div
                        className={`dev-appearance-card ${themeMode === 'dark' ? 'active' : ''}`}
                        onClick={() => {
                          setThemeMode('dark');
                          showToast('Chế độ giao diện', 'Đã chuyển sang giao diện Tối', 'success');
                        }}
                      >
                        {themeMode === 'dark' && (
                          <div className="dev-appearance-check-badge">
                            <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                          </div>
                        )}
                        <div className="dev-appearance-card-icon-box dark-icon">
                          <Moon size={24} color="#0F172A" />
                        </div>
                        <h4 className="dev-appearance-card-title">Tối</h4>
                        <p className="dev-appearance-card-desc">
                          Giao diện tối, giảm mỏi mắt khi làm việc ban đêm.
                        </p>
                      </div>

                      {/* Theo hệ thống */}
                      <div
                        className={`dev-appearance-card ${themeMode === 'system' ? 'active' : ''}`}
                        onClick={() => {
                          setThemeMode('system');
                          showToast('Chế độ giao diện', 'Đã đặt theo cài đặt hệ thống', 'info');
                        }}
                      >
                        {themeMode === 'system' && (
                          <div className="dev-appearance-check-badge">
                            <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                          </div>
                        )}
                        <div className="dev-appearance-card-icon-box system-icon">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="9" stroke="#0F172A" strokeWidth="2" />
                            <path d="M12 3 A9 9 0 0 1 12 21 Z" fill="#0F172A" />
                          </svg>
                        </div>
                        <h4 className="dev-appearance-card-title">Theo hệ thống</h4>
                        <p className="dev-appearance-card-desc">
                          Tự động chuyển đổi theo cài đặt của thiết bị.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Bố cục giao diện */}
                  <div className="dev-appearance-section">
                    <h3 className="dev-appearance-section-title">Bố cục giao diện</h3>
                    <p className="dev-appearance-section-sub">
                      Tùy chỉnh bố cục và cách hiển thị các thành phần trên trang.
                    </p>
                    <div className="dev-appearance-layout-grid">
                      {/* Thanh bên cố định */}
                      <div
                        className={`dev-appearance-card ${appearanceLayout === 'fixed' ? 'active' : ''}`}
                        onClick={() => setAppearanceLayout('fixed')}
                      >
                        {appearanceLayout === 'fixed' && (
                          <div className="dev-appearance-check-badge">
                            <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                          </div>
                        )}
                        <div className="dev-appearance-wf-box">
                          <div className="dev-appearance-wf-sidebar fixed" style={{ backgroundColor: appearanceAccentColor }} />
                          <div className="dev-appearance-wf-main">
                            <div className="dev-appearance-wf-header-line" />
                            <div className="dev-appearance-wf-content-line w-75" />
                            <div className="dev-appearance-wf-content-line w-50" />
                          </div>
                        </div>
                        <h4 className="dev-appearance-card-title">Thanh bên cố định</h4>
                        <p className="dev-appearance-card-desc">
                          Thanh điều hướng luôn hiển thị bên trái.
                        </p>
                      </div>

                      {/* Thu gọn thanh bên */}
                      <div
                        className={`dev-appearance-card ${appearanceLayout === 'compact' ? 'active' : ''}`}
                        onClick={() => setAppearanceLayout('compact')}
                      >
                        {appearanceLayout === 'compact' && (
                          <div className="dev-appearance-check-badge">
                            <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                          </div>
                        )}
                        <div className="dev-appearance-wf-box">
                          <div className="dev-appearance-wf-sidebar compact">
                            <span className="wf-dot" />
                            <span className="wf-dot" />
                            <span className="wf-dot" />
                          </div>
                          <div className="dev-appearance-wf-main">
                            <div className="dev-appearance-wf-header-line" />
                            <div className="dev-appearance-wf-content-line w-85" />
                            <div className="dev-appearance-wf-content-line w-60" />
                          </div>
                        </div>
                        <h4 className="dev-appearance-card-title">Thu gọn thanh bên</h4>
                        <p className="dev-appearance-card-desc">
                          Chỉ hiển thị biểu tượng, mở rộng khi di chuột.
                        </p>
                      </div>

                      {/* Toàn màn hình */}
                      <div
                        className={`dev-appearance-card ${appearanceLayout === 'full' ? 'active' : ''}`}
                        onClick={() => setAppearanceLayout('full')}
                      >
                        {appearanceLayout === 'full' && (
                          <div className="dev-appearance-check-badge">
                            <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                          </div>
                        )}
                        <div className="dev-appearance-wf-box">
                          <div className="dev-appearance-wf-main full">
                            <div className="dev-appearance-wf-header-line" />
                            <div className="dev-appearance-wf-content-line w-95" />
                            <div className="dev-appearance-wf-content-line w-70" />
                          </div>
                        </div>
                        <h4 className="dev-appearance-card-title">Toàn màn hình</h4>
                        <p className="dev-appearance-card-desc">
                          Ẩn thanh bên, tối ưu không gian làm việc.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 3. Mật độ hiển thị */}
                  <div className="dev-appearance-section">
                    <h3 className="dev-appearance-section-title">Mật độ hiển thị</h3>
                    <p className="dev-appearance-section-sub">
                      Điều chỉnh khoảng cách và kích thước các thành phần.
                    </p>
                    <div className="dev-appearance-density-grid">
                      {/* Thấp (Rộng rãi) */}
                      <div
                        className={`dev-appearance-card ${appearanceDensity === 'spacious' ? 'active' : ''}`}
                        onClick={() => setAppearanceDensity('spacious')}
                      >
                        {appearanceDensity === 'spacious' && (
                          <div className="dev-appearance-check-badge">
                            <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                          </div>
                        )}
                        <div className="dev-appearance-density-icon spacious">
                          <div className="density-row"><span className="density-bar" /></div>
                          <div className="density-row"><span className="density-bar" /></div>
                          <div className="density-row"><span className="density-bar" /></div>
                        </div>
                        <h4 className="dev-appearance-card-title">Thấp (Rộng rãi)</h4>
                        <p className="dev-appearance-card-desc">Thoáng, dễ nhìn</p>
                      </div>

                      {/* Trung bình */}
                      <div
                        className={`dev-appearance-card ${appearanceDensity === 'balanced' ? 'active' : ''}`}
                        onClick={() => setAppearanceDensity('balanced')}
                      >
                        {appearanceDensity === 'balanced' && (
                          <div className="dev-appearance-check-badge">
                            <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                          </div>
                        )}
                        <div className="dev-appearance-density-icon balanced">
                          <div className="density-row"><span className="density-bar" /></div>
                          <div className="density-row"><span className="density-bar" /></div>
                          <div className="density-row"><span className="density-bar" /></div>
                        </div>
                        <h4 className="dev-appearance-card-title">Trung bình</h4>
                        <p className="dev-appearance-card-desc">Cân bằng (mặc định)</p>
                      </div>

                      {/* Cao (Nhỏ gọn) */}
                      <div
                        className={`dev-appearance-card ${appearanceDensity === 'compact' ? 'active' : ''}`}
                        onClick={() => setAppearanceDensity('compact')}
                      >
                        {appearanceDensity === 'compact' && (
                          <div className="dev-appearance-check-badge">
                            <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                          </div>
                        )}
                        <div className="dev-appearance-density-icon compact">
                          <div className="density-row"><span className="density-bar" /></div>
                          <div className="density-row"><span className="density-bar" /></div>
                          <div className="density-row"><span className="density-bar" /></div>
                        </div>
                        <h4 className="dev-appearance-card-title">Cao (Nhỏ gọn)</h4>
                        <p className="dev-appearance-card-desc">Hiển thị nhiều nội dung hơn</p>
                      </div>
                    </div>
                  </div>

                  {/* 4. Hiệu ứng & hiển thị */}
                  <div className="dev-appearance-section">
                    <h3 className="dev-appearance-section-title">Hiệu ứng & hiển thị</h3>
                    <p className="dev-appearance-section-sub">
                      Tùy chỉnh các hiệu ứng giao diện.
                    </p>
                    <div className="dev-appearance-toggles-row">
                      {/* Motion */}
                      <div className="dev-appearance-toggle-item">
                        <button
                          type="button"
                          className={`dev-appearance-switch ${appearanceMotion ? 'on' : ''}`}
                          style={{ backgroundColor: appearanceMotion ? appearanceAccentColor : '#CBD5E1' }}
                          onClick={() => setAppearanceMotion(!appearanceMotion)}
                        >
                          <span className="dev-appearance-switch-thumb" />
                        </button>
                        <div className="dev-appearance-toggle-text">
                          <span className="dev-appearance-toggle-title">Hiệu ứng chuyển động</span>
                          <span className="dev-appearance-toggle-desc">Hiệu ứng mượt mà khi chuyển trang</span>
                        </div>
                      </div>

                      {/* Rounded */}
                      <div className="dev-appearance-toggle-item">
                        <button
                          type="button"
                          className={`dev-appearance-switch ${appearanceRounded ? 'on' : ''}`}
                          style={{ backgroundColor: appearanceRounded ? appearanceAccentColor : '#CBD5E1' }}
                          onClick={() => setAppearanceRounded(!appearanceRounded)}
                        >
                          <span className="dev-appearance-switch-thumb" />
                        </button>
                        <div className="dev-appearance-toggle-text">
                          <span className="dev-appearance-toggle-title">Bo góc hiện đại</span>
                          <span className="dev-appearance-toggle-desc">Sử dụng thiết kế bo góc cho các thẻ</span>
                        </div>
                      </div>

                      {/* Illustrations */}
                      <div className="dev-appearance-toggle-item">
                        <button
                          type="button"
                          className={`dev-appearance-switch ${appearanceIllustrations ? 'on' : ''}`}
                          style={{ backgroundColor: appearanceIllustrations ? appearanceAccentColor : '#CBD5E1' }}
                          onClick={() => setAppearanceIllustrations(!appearanceIllustrations)}
                        >
                          <span className="dev-appearance-switch-thumb" />
                        </button>
                        <div className="dev-appearance-toggle-text">
                          <span className="dev-appearance-toggle-title">Hiển thị hình minh họa</span>
                          <span className="dev-appearance-toggle-desc">Hiển thị hình minh họa và biểu tượng</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT COLUMN: Live Interactive Preview & Options */}
                <div className="dev-appearance-col-right">
                  {/* 1. Xem trước giao diện */}
                  <div className="dev-appearance-section">
                    <h3 className="dev-appearance-section-title">Xem trước giao diện</h3>
                    <div
                      className={`dev-appearance-preview-window theme-${themeMode} density-${appearanceDensity} ${!appearanceRounded ? 'sharp-corners' : ''}`}
                    >
                      {/* Window Topbar */}
                      <div className="dev-appearance-preview-topbar">
                        <div className="dev-appearance-preview-logo">
                          <div className="preview-logo-icon" style={{ backgroundColor: appearanceAccentColor }}>
                            <div className="preview-logo-inner" />
                          </div>
                          <span className="preview-logo-text">TOPDOO</span>
                        </div>
                        <div className="dev-appearance-preview-dots">
                          <span className="p-dot dot-red" />
                          <span className="p-dot dot-yellow" />
                          <span className="p-dot dot-green" />
                        </div>
                      </div>

                      {/* Window Body */}
                      <div className="dev-appearance-preview-body">
                        {/* Mini Sidebar */}
                        {appearanceLayout !== 'full' && (
                          <div className={`dev-appearance-preview-sidebar ${appearanceLayout === 'compact' ? 'compact' : ''}`}>
                            <div
                              className="preview-sidebar-item active"
                              style={{
                                backgroundColor: `${appearanceAccentColor}18`,
                                color: appearanceAccentColor
                              }}
                            >
                              <Home size={11} strokeWidth={appearanceIconStyle === 'classic' ? 2.6 : 1.8} />
                              {appearanceLayout !== 'compact' && <span>Trang chủ</span>}
                            </div>
                            <div className="preview-sidebar-item">
                              <Calendar size={11} strokeWidth={appearanceIconStyle === 'classic' ? 2.6 : 1.8} />
                              {appearanceLayout !== 'compact' && <span>Dự án</span>}
                            </div>
                            <div className="preview-sidebar-item">
                              <Code2 size={11} strokeWidth={appearanceIconStyle === 'classic' ? 2.6 : 1.8} />
                              {appearanceLayout !== 'compact' && <span>API & SDK</span>}
                            </div>
                            <div className="preview-sidebar-item">
                              <Tv size={11} strokeWidth={appearanceIconStyle === 'classic' ? 2.6 : 1.8} />
                              {appearanceLayout !== 'compact' && <span>Playground</span>}
                            </div>
                            <div className="preview-sidebar-spacer" />
                            <div className="preview-skeleton-pill" />
                            <div className="preview-skeleton-pill short" />
                          </div>
                        )}

                        {/* Mini Main Content Area */}
                        <div className="dev-appearance-preview-main">
                          {/* Greeting Banner */}
                          <div
                            className="dev-appearance-preview-banner"
                            style={{
                              borderColor: `${appearanceAccentColor}40`,
                              background: `linear-gradient(135deg, ${appearanceAccentColor}12 0%, #E0F2FE40 100%)`
                            }}
                          >
                            <h5 className="preview-greeting-title">Xin chào, Developer!</h5>
                            <p className="preview-greeting-sub">Cùng Topdoo kiến tạo ứng dụng AI tuyệt vời.</p>
                          </div>

                          {/* 3 Mini Action Buttons */}
                          <div className="dev-appearance-preview-actions">
                            <div className="preview-action-btn">
                              <div className="preview-btn-icon" style={{ backgroundColor: appearanceAccentColor }}>
                                <Plus size={10} color="#FFFFFF" strokeWidth={3} />
                              </div>
                              <span>Tạo dự án</span>
                            </div>
                            <div className="preview-action-btn">
                              <div className="preview-btn-icon bg-purple">
                                <Code2 size={10} color="#FFFFFF" strokeWidth={2.5} />
                              </div>
                              <span>Khám phá API</span>
                            </div>
                            <div className="preview-action-btn">
                              <div className="preview-btn-icon bg-emerald">
                                <BookOpen size={10} color="#FFFFFF" strokeWidth={2.5} />
                              </div>
                              <span>Xem tài liệu</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Màu chủ đạo */}
                  <div className="dev-appearance-section">
                    <h3 className="dev-appearance-section-title">Màu chủ đạo</h3>
                    <p className="dev-appearance-section-sub">
                      Chọn màu chủ đạo cho giao diện (áp dụng cho các nút, liên kết, biểu tượng).
                    </p>
                    <div className="dev-appearance-colors-row">
                      {[
                        { color: '#0084FF', name: 'Xanh dương' },
                        { color: '#8B5CF6', name: 'Tím' },
                        { color: '#10B981', name: 'Xanh lục' },
                        { color: '#F59E0B', name: 'Cam hổ phách' },
                        { color: '#EF4444', name: 'Đỏ' },
                        { color: '#EC4899', name: 'Hồng' },
                        { color: '#0D9488', name: 'Xanh mòng két' }
                      ].map((item) => (
                        <button
                          key={item.color}
                          type="button"
                          className={`dev-appearance-color-swatch ${appearanceAccentColor === item.color ? 'active' : ''}`}
                          style={{ backgroundColor: item.color }}
                          title={item.name}
                          onClick={() => {
                            setAppearanceAccentColor(item.color);
                            showToast('Màu chủ đạo', `Đã áp dụng màu ${item.name}`, 'success');
                          }}
                        >
                          {appearanceAccentColor === item.color && (
                            <Check size={16} strokeWidth={3.5} color="#FFFFFF" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Kiểu biểu tượng */}
                  <div className="dev-appearance-section">
                    <h3 className="dev-appearance-section-title">Kiểu biểu tượng</h3>
                    <p className="dev-appearance-section-sub">
                      Chọn phong cách biểu tượng hiển thị trong hệ thống.
                    </p>
                    <div className="dev-appearance-icons-grid">
                      {/* Hiện đại (mặc định) */}
                      <div
                        className={`dev-appearance-card icon-card ${appearanceIconStyle === 'modern' ? 'active' : ''}`}
                        onClick={() => setAppearanceIconStyle('modern')}
                      >
                        {appearanceIconStyle === 'modern' && (
                          <div className="dev-appearance-check-badge">
                            <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                          </div>
                        )}
                        <div className="dev-appearance-card-icon-box">
                          <Home size={22} color={appearanceAccentColor} strokeWidth={1.8} />
                        </div>
                        <h4 className="dev-appearance-card-title">Hiện đại (mặc định)</h4>
                        <p className="dev-appearance-card-desc">Biểu tượng nét mảnh, hiện đại</p>
                      </div>

                      {/* Cổ điển */}
                      <div
                        className={`dev-appearance-card icon-card ${appearanceIconStyle === 'classic' ? 'active' : ''}`}
                        onClick={() => setAppearanceIconStyle('classic')}
                      >
                        {appearanceIconStyle === 'classic' && (
                          <div className="dev-appearance-check-badge">
                            <Check size={11} strokeWidth={3.5} color="#FFFFFF" />
                          </div>
                        )}
                        <div className="dev-appearance-card-icon-box">
                          <Home size={22} color="#0F172A" strokeWidth={2.8} />
                        </div>
                        <h4 className="dev-appearance-card-title">Cổ điển</h4>
                        <p className="dev-appearance-card-desc">Biểu tượng nét dày, truyền thống</p>
                      </div>
                    </div>
                  </div>

                  {/* 4. Mẹo giao diện */}
                  <div className="dev-appearance-tip-box">
                    <div className="dev-appearance-tip-icon">
                      <Lightbulb size={24} color="#F59E0B" />
                    </div>
                    <div className="dev-appearance-tip-content">
                      <h4 className="dev-appearance-tip-title">Mẹo giao diện</h4>
                      <p className="dev-appearance-tip-text">
                        Bạn có thể kết hợp chế độ tối và thu gọn thanh bên để tăng không gian làm việc, đặc biệt khi lập trình hoặc đọc tài liệu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. INTEGRATIONS SUBTAB (TÍCH HỢP) */}
            {settingsSubTab === 'integrations' && (
              <div className="dev-settings-main-layout dev-integrations-layout">
                {/* Left Column */}
                <div className="dev-settings-left-col">
                  {/* Quick Integrations Section */}
                  <div className="dev-settings-card">
                    <div className="dev-settings-card-header">
                      <div>
                        <h2 className="dev-settings-card-title">Tích hợp nhanh</h2>
                        <p className="dev-settings-card-sub">
                          Kết nối Topdoo với các dịch vụ phổ biến để tối ưu quy trình làm việc.
                        </p>
                      </div>
                    </div>

                    <div className="dev-integrations-quick-grid">
                      {/* Slack */}
                      <div className="dev-integ-app-card">
                        <div className="dev-integ-app-icon-wrap slack">
                          <svg viewBox="0 0 24 24" width="28" height="28">
                            <path d="M6 15a2 2 0 0 1-2-2 2 2 0 0 1 2-2h2v2a2 2 0 0 1-2 2zm1 0a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-5zm2-8a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5a2 2 0 0 1 2 2 2 2 0 0 1-2 2H9zm0 1a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V8zm8 2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2v-2a2 2 0 0 1 2-2zm-1 0a2 2 0 0 1-2 2 2 2 0 0 1-2-2V5a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5zm-2 8a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h5zm0-1a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2 2 2 0 0 1 2 2v2z" fill="#E01E5A"/>
                          </svg>
                        </div>
                        <h4 className="dev-integ-app-name">Slack</h4>
                        <p className="dev-integ-app-desc">Nhận thông báo và tương tác qua Slack.</p>
                        <button
                          type="button"
                          className="dev-integ-connect-btn outline"
                          onClick={() => showToast('Slack', 'Đang mở cửa sổ xác thực kết nối Slack OAuth...', 'info')}
                        >
                          Kết nối
                        </button>
                      </div>

                      {/* Discord */}
                      <div className="dev-integ-app-card">
                        <div className="dev-integ-app-icon-wrap discord">
                          <svg viewBox="0 0 24 24" width="28" height="28" fill="#5865F2">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                          </svg>
                        </div>
                        <h4 className="dev-integ-app-name">Discord</h4>
                        <p className="dev-integ-app-desc">Cộng đồng và thông báo tới server của bạn.</p>
                        <button
                          type="button"
                          className="dev-integ-connect-btn outline"
                          onClick={() => showToast('Discord', 'Đang chuyển hướng Discord Bot Integration...', 'info')}
                        >
                          Kết nối
                        </button>
                      </div>

                      {/* Google Drive */}
                      <div className="dev-integ-app-card">
                        <div className="dev-integ-app-icon-wrap drive">
                          <svg viewBox="0 0 87.3 78" width="28" height="28">
                            <path d="m6.6 66.85 3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8h-27.5c0 1.55.4 3.1 1.2 4.5z" fill="#0066da"/>
                            <path d="m43.65 25-13.75-23.8c-1.35.8-2.5 1.9-3.3 3.3l-25.4 44a9.06 9.06 0 0 0 -1.2 4.5h27.5z" fill="#00ac47"/>
                            <path d="m73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5h-27.502l5.852 11.5z" fill="#ea4335"/>
                            <path d="m43.65 25 13.75-23.8c-1.35-.8-2.9-1.2-4.5-1.2h-18.5c-1.6 0-3.15.45-4.5 1.2z" fill="#00832d"/>
                            <path d="m59.8 53h-32.3l-13.75 23.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2z" fill="#2684fc"/>
                            <path d="m73.4 26.5-12.7-22c-.8-1.4-1.95-2.5-3.3-3.3l-13.75 23.8 16.15 28h27.45c0-1.55-.4-3.1-1.2-4.5z" fill="#ffba00"/>
                          </svg>
                        </div>
                        <h4 className="dev-integ-app-name">Google Drive</h4>
                        <p className="dev-integ-app-desc">Lưu trữ và đồng bộ tài liệu.</p>
                        <button
                          type="button"
                          className="dev-integ-connect-btn outline"
                          onClick={() => showToast('Google Drive', 'Tài khoản Google Drive đã sẵn sàng cấu hình.', 'success')}
                        >
                          Kết nối
                        </button>
                      </div>

                      {/* Notion */}
                      <div className="dev-integ-app-card">
                        <div className="dev-integ-app-icon-wrap notion">
                          <svg viewBox="0 0 24 24" width="28" height="28" fill="#000000">
                            <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.83a2.6 2.6 0 0 0-1.865-.84L2.78 1.783c-.42.047-.56.28-.373.466zm.84 3.732v13.621c0 .746.373 1.026 1.213.98l14.52-.84c.84-.046.933-.56.933-1.12V6.634c0-.56-.233-.793-.746-.746l-15.174.933c-.56.046-.746.42-.746.98zm13.493 1.353c.093.42 0 .84-.42.887l-.98.187v9.096c-.466.28-.98.42-1.493.42-.84 0-1.12-.28-1.727-1.073l-4.527-7.14v7.093l1.4.327c.42.093.513.56.093.887l-3.36.233c-.093-.327 0-.746.373-.84l1.026-.233V9.754l-1.353-.14c-.42-.047-.466-.466-.093-.746l3.407-.233 4.807 7.42V9.474l-1.213-.14c-.42-.047-.373-.466.046-.653l3.547-.233c.327-.047.513.28.467.653z"/>
                          </svg>
                        </div>
                        <h4 className="dev-integ-app-name">Notion</h4>
                        <p className="dev-integ-app-desc">Tích hợp quản lý tài liệu và tri thức.</p>
                        <button
                          type="button"
                          className="dev-integ-connect-btn outline"
                          onClick={() => showToast('Notion', 'Đang kết nối Notion Workspace API...', 'info')}
                        >
                          Kết nối
                        </button>
                      </div>

                      {/* GitHub */}
                      <div className="dev-integ-app-card">
                        <div className="dev-integ-app-icon-wrap github">
                          <svg viewBox="0 0 24 24" width="28" height="28" fill="#181717">
                            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                          </svg>
                        </div>
                        <h4 className="dev-integ-app-name">GitHub</h4>
                        <p className="dev-integ-app-desc">Đồng bộ mã nguồn và dự án.</p>
                        <button
                          type="button"
                          className="dev-integ-connect-btn outline"
                          onClick={() => showToast('GitHub', 'Đang liên kết GitHub Organization...', 'info')}
                        >
                          Kết nối
                        </button>
                      </div>

                      {/* Zapier */}
                      <div className="dev-integ-app-card">
                        <div className="dev-integ-app-icon-wrap zapier">
                          <svg viewBox="0 0 24 24" width="28" height="28" fill="#FF4A00">
                            <path d="M11.996 0a2.23 2.23 0 0 0-2.228 2.228v6.685H3.083a2.23 2.23 0 0 0-2.228 2.228c0 1.232.997 2.229 2.228 2.229h6.685v6.684a2.23 2.23 0 0 0 2.228 2.23 2.23 2.23 0 0 0 2.23-2.23v-6.684h6.683a2.23 2.23 0 0 0 2.229-2.229 2.23 2.23 0 0 0-2.229-2.228h-6.683V2.228A2.23 2.23 0 0 0 11.996 0z"/>
                          </svg>
                        </div>
                        <h4 className="dev-integ-app-name">Zapier</h4>
                        <p className="dev-integ-app-desc">Tự động hóa workflow với hàng nghìn ứng dụng.</p>
                        <button
                          type="button"
                          className="dev-integ-connect-btn outline"
                          onClick={() => showToast('Zapier', 'Mở Zapier Templates cho Topdoo API...', 'info')}
                        >
                          Kết nối
                        </button>
                      </div>

                      {/* Microsoft Teams */}
                      <div className="dev-integ-app-card">
                        <div className="dev-integ-app-icon-wrap teams">
                          <svg viewBox="0 0 24 24" width="28" height="28" fill="#6264A7">
                            <path d="M19.5 7.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm-3 3h2a2 2 0 0 1 2 2v2.5a.5.5 0 0 1-.5.5h-3.5v-5zm-5-4a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm-4 4h3a2.5 2.5 0 0 1 2.5 2.5v3.5a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-3.5A2.5 2.5 0 0 1 7.5 10.5z"/>
                          </svg>
                        </div>
                        <h4 className="dev-integ-app-name">Microsoft Teams</h4>
                        <p className="dev-integ-app-desc">Nhận thông báo và cộng tác nhóm.</p>
                        <button
                          type="button"
                          className="dev-integ-connect-btn outline"
                          onClick={() => showToast('Microsoft Teams', 'Đang thiết lập Webhook cho Microsoft Teams...', 'info')}
                        >
                          Kết nối
                        </button>
                      </div>

                      {/* Xem thêm */}
                      <div className="dev-integ-app-card more-card">
                        <div className="dev-integ-app-icon-wrap more">
                          <MoreHorizontal size={24} color="#64748B" />
                        </div>
                        <h4 className="dev-integ-app-name">Xem thêm</h4>
                        <p className="dev-integ-app-desc">Khám phá nhiều tích hợp khác.</p>
                        <button
                          type="button"
                          className="dev-integ-connect-btn text-link"
                          onClick={() => showToast('Kho tích hợp', 'Hiện có hơn 50+ tích hợp đang được phát triển.', 'info')}
                        >
                          <span>Xem tất cả</span>
                          <ArrowRight size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Your Integrations Section */}
                  <div className="dev-settings-card" style={{ marginTop: 24 }}>
                    <div className="dev-settings-card-header">
                      <div>
                        <h2 className="dev-settings-card-title">Tích hợp của bạn</h2>
                        <p className="dev-settings-card-sub">
                          Các dịch vụ bạn đã kết nối với tài khoản Topdoo.
                        </p>
                      </div>
                    </div>

                    <div className="dev-integ-table-wrapper">
                      <table className="dev-integ-table">
                        <thead>
                          <tr>
                            <th>Dịch vụ</th>
                            <th>Trạng thái</th>
                            <th>Ngày kết nối</th>
                            <th style={{ textAlign: 'right' }}>Thao tác</th>
                          </tr>
                        </thead>
                        <tbody>
                          {integrationsList.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <div className="dev-integ-row-service">
                                  <div className={`dev-integ-mini-icon ${item.icon}`}>
                                    {item.icon === 'slack' && <span style={{ fontWeight: 800, color: '#E01E5A' }}>#</span>}
                                    {item.icon === 'drive' && <Cloud size={16} color="#00AC47" />}
                                    {item.icon === 'github' && <GitBranch size={16} color="#181717" />}
                                  </div>
                                  <span className="dev-integ-row-name">{item.name}</span>
                                </div>
                              </td>
                              <td>
                                {item.connected ? (
                                  <span className="dev-integ-status connected">
                                    <span className="status-dot green" />
                                    Đã kết nối
                                  </span>
                                ) : (
                                  <span className="dev-integ-status disconnected">
                                    <span className="status-dot gray" />
                                    Chưa kết nối
                                  </span>
                                )}
                              </td>
                              <td className="dev-integ-date">{item.date}</td>
                              <td style={{ textAlign: 'right' }}>
                                <div className="dev-integ-actions-cell">
                                  {item.connected ? (
                                    <button
                                      type="button"
                                      className="dev-integ-btn-config"
                                      onClick={() => showToast(item.name, `Đang mở cấu hình cho ${item.name}`, 'info')}
                                    >
                                      Cấu hình
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="dev-integ-btn-connect-solid"
                                      onClick={() => {
                                        setIntegrationsList(prev => prev.map(x => x.id === item.id ? { ...x, connected: true, date: 'Vừa xong' } : x));
                                        showToast('Kết nối thành công', `Đã kết nối thành công với ${item.name}!`, 'success');
                                      }}
                                    >
                                      Kết nối
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    className="dev-integ-dots-btn"
                                    onClick={() => showToast('Tùy chọn', `Cài đặt nâng cao cho ${item.name}`, 'info')}
                                  >
                                    <MoreHorizontal size={16} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="dev-settings-right-col">
                  {/* Card 1: Tích hợp tùy chỉnh */}
                  <div className="dev-settings-card">
                    <div className="dev-settings-card-header">
                      <div>
                        <h2 className="dev-settings-card-title">Tích hợp tùy chỉnh</h2>
                        <p className="dev-settings-card-sub">
                          Kết nối hệ thống của bạn thông qua API và Webhook.
                        </p>
                      </div>
                    </div>

                    <div className="dev-integ-custom-list">
                      <div
                        className="dev-integ-custom-item"
                        onClick={() => navigateMarketing('topdoo-developer-api-sdk')}
                      >
                        <div className="custom-item-icon blue">
                          <Code2 size={18} />
                        </div>
                        <div className="custom-item-text">
                          <h5>API Integration</h5>
                          <p>Sử dụng REST API để tích hợp với hệ thống của bạn.</p>
                        </div>
                        <ChevronRight size={16} className="item-arrow" />
                      </div>

                      <div
                        className="dev-integ-custom-item"
                        onClick={() => showToast('Webhook', 'Đang chuyển hướng tới giao diện quản lý Webhook...', 'info')}
                      >
                        <div className="custom-item-icon sky">
                          <Zap size={18} />
                        </div>
                        <div className="custom-item-text">
                          <h5>Webhook</h5>
                          <p>Nhận sự kiện theo thời gian real-time về ứng dụng của bạn.</p>
                        </div>
                        <ChevronRight size={16} className="item-arrow" />
                      </div>

                      <div
                        className="dev-integ-custom-item"
                        onClick={() => showToast('OAuth 2.0', 'Tài liệu xác thực OAuth 2.0 Client credentials.', 'info')}
                      >
                        <div className="custom-item-icon primary">
                          <Key size={18} />
                        </div>
                        <div className="custom-item-text">
                          <h5>OAuth 2.0</h5>
                          <p>Tích hợp xác thực an toàn với tài khoản Topdoo.</p>
                        </div>
                        <ChevronRight size={16} className="item-arrow" />
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Cần hỗ trợ? */}
                  <div className="dev-settings-card dev-support-contact-card" style={{ marginTop: 24 }}>
                    <div className="dev-support-card-content">
                      <div className="dev-support-card-icon-box">
                        <Headphones size={22} color="#0084FF" />
                      </div>
                      <div className="dev-support-card-text">
                        <h4 className="dev-support-card-title">Cần hỗ trợ?</h4>
                        <p className="dev-support-card-desc">
                          Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-outline-btn"
                      onClick={() => handleNavClick('support', 'Hỗ trợ')}
                    >
                      <span>Liên hệ hỗ trợ</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Card 3: Mẹo tích hợp */}
                  <div className="dev-appearance-tip-box" style={{ marginTop: 24 }}>
                    <div className="dev-appearance-tip-icon">
                      <Lightbulb size={24} color="#0084FF" />
                    </div>
                    <div className="dev-appearance-tip-content">
                      <h4 className="dev-appearance-tip-title" style={{ color: '#0055CC' }}>Mẹo tích hợp</h4>
                      <p className="dev-appearance-tip-text" style={{ color: '#334155' }}>
                        Sử dụng Webhook để nhận thông báo tức thì khi có sự kiện mới từ Topdoo.
                      </p>
                      <a
                        href="#webhook-guide"
                        className="dev-integ-tip-link"
                        onClick={(e) => {
                          e.preventDefault();
                          navigateMarketing('topdoo-developer-docs');
                        }}
                      >
                        <span>Xem hướng dẫn</span>
                        <ArrowRight size={13} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 6. LANGUAGE SUBTAB (NGÔN NGỮ) */}
            {settingsSubTab === 'language' && (
              <div className="dev-settings-main-layout dev-language-layout">
                {/* Left Column */}
                <div className="dev-settings-left-col">
                  <div className="dev-settings-card">
                    <div className="dev-settings-card-header">
                      <div>
                        <h2 className="dev-settings-card-title">Ngôn ngữ hiển thị</h2>
                        <p className="dev-settings-card-sub">
                          Chọn ngôn ngữ bạn muốn sử dụng trên Topdoo. Giao diện, thông báo và tài liệu sẽ được hiển thị theo ngôn ngữ này.
                        </p>
                      </div>
                    </div>

                    <div className="dev-lang-list">
                      {[
                        { id: 'vi', flag: '🇻🇳', name: 'Tiếng Việt', sub: 'Vietnamese', current: true },
                        { id: 'en', flag: '🇺🇸', name: 'English', sub: 'Tiếng Anh' },
                        { id: 'ja', flag: '🇯🇵', name: '日本語', sub: 'Tiếng Nhật' },
                        { id: 'zh', flag: '🇨🇳', name: '中文', sub: 'Tiếng Trung (Giản thể)' },
                        { id: 'ko', flag: '🇰🇷', name: '한국어', sub: 'Tiếng Hàn' },
                        { id: 'other', flag: '🌐', name: 'Khác', sub: 'Các ngôn ngữ khác (sắp ra mắt)', disabled: true }
                      ].map((item) => (
                        <div
                          key={item.id}
                          className={`dev-lang-row ${selectedLanguage === item.id ? 'active' : ''} ${item.disabled ? 'disabled' : ''}`}
                          onClick={() => {
                            if (!item.disabled) {
                              setSelectedLanguage(item.id);
                              showToast('Ngôn ngữ', `Đã chuyển ngôn ngữ sang ${item.name}`, 'success');
                            }
                          }}
                        >
                          <div className="dev-lang-left">
                            <span className="dev-lang-flag">{item.flag}</span>
                            <div className="dev-lang-info">
                              <div className="dev-lang-name-row">
                                <span className="dev-lang-name">{item.name}</span>
                                {item.current && (
                                  <span className="dev-lang-current-badge">Hiện tại</span>
                                )}
                              </div>
                              <span className="dev-lang-sub">{item.sub}</span>
                            </div>
                          </div>
                          <div className="dev-lang-radio">
                            <span className={`dev-radio-circle ${selectedLanguage === item.id ? 'checked' : ''}`}>
                              {selectedLanguage === item.id && <span className="dev-radio-dot" />}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Info Note */}
                    <div className="dev-lang-info-banner">
                      <div className="info-icon-wrap">
                        <Info size={20} color="#0084FF" />
                      </div>
                      <div className="info-text">
                        <strong>Thay đổi ngôn ngữ sẽ được áp dụng ngay lập tức trên toàn bộ hệ thống.</strong>
                        <p>Một số nội dung như tài liệu cộng đồng có thể chưa được dịch đầy đủ.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="dev-settings-right-col">
                  {/* Card 1: Ngôn ngữ cho email */}
                  <div className="dev-settings-card">
                    <div className="dev-settings-card-header">
                      <div>
                        <h2 className="dev-settings-card-title">Ngôn ngữ cho email</h2>
                        <p className="dev-settings-card-sub">
                          Chọn ngôn ngữ hiển thị trong các email từ Topdoo (thông báo, hóa đơn, cập nhật hệ thống, ...).
                        </p>
                      </div>
                    </div>

                    <div className="dev-lang-email-box">
                      <div className="dev-lang-email-select-wrap">
                        <select
                          className="dev-lang-select"
                          value={emailLanguage}
                          onChange={(e) => {
                            setEmailLanguage(e.target.value);
                            showToast('Email Language', 'Đã lưu cài đặt ngôn ngữ gửi email!', 'success');
                          }}
                        >
                          <option value="vi">🇻🇳 Tiếng Việt</option>
                          <option value="en">🇺🇸 English</option>
                          <option value="ja">🇯🇵 日本語</option>
                          <option value="zh">🇨🇳 中文</option>
                          <option value="ko">🇰🇷 한국어</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Đóng góp bản dịch */}
                  <div className="dev-settings-card" style={{ marginTop: 24 }}>
                    <div className="dev-settings-card-header">
                      <div>
                        <h2 className="dev-settings-card-title">Đóng góp bản dịch</h2>
                        <p className="dev-settings-card-sub">
                          Bạn muốn giúp Topdoo hỗ trợ thêm ngôn ngữ mới? Hãy tham gia cộng đồng và đóng góp bản dịch!
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-outline-btn full-width"
                      onClick={() => showToast('Cộng đồng dịch thuật', 'Cảm ơn bạn! Đang mở cổng thông tin Translation Contributors...', 'success')}
                    >
                      <Users size={16} />
                      <span>Tham gia cộng đồng</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Card 3: Cần hỗ trợ? */}
                  <div className="dev-settings-card dev-support-contact-card" style={{ marginTop: 24 }}>
                    <div className="dev-support-card-content">
                      <div className="dev-support-card-icon-box">
                        <Headphones size={22} color="#0084FF" />
                      </div>
                      <div className="dev-support-card-text">
                        <h4 className="dev-support-card-title">Cần hỗ trợ?</h4>
                        <p className="dev-support-card-desc">
                          Nếu bạn gặp khó khăn với việc hiển thị ngôn ngữ hoặc muốn đề xuất ngôn ngữ mới, chúng tôi luôn sẵn sàng hỗ trợ bạn.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-outline-btn"
                      onClick={() => handleNavClick('support', 'Hỗ trợ')}
                    >
                      <span>Liên hệ hỗ trợ</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Other subtabs view fallback */}
            {settingsSubTab !== 'account' && settingsSubTab !== 'security' && settingsSubTab !== 'notifications' && settingsSubTab !== 'appearance' && settingsSubTab !== 'integrations' && settingsSubTab !== 'language' && (
              <div className="dev-settings-other-tab-card">
                <div className="dev-settings-card">
                  <div className="dev-settings-card-header">
                    <div>
                      <h2 className="dev-settings-card-title">Cài đặt Topdoo Cloud</h2>
                    </div>
                  </div>
                  <div style={{ padding: '36px 24px', textAlign: 'center', color: '#64748B' }}>
                    <p style={{ fontSize: 13, maxWidth: 480, margin: '0 auto 20px', lineHeight: 1.6 }}>
                      Tất cả các tùy chọn trong danh mục này đã được kích hoạt mặc định theo tiêu chuẩn bảo mật Topdoo Cloud.
                    </p>
                    <button
                      type="button"
                      className="dev-proj-action-btn primary"
                      onClick={() => setSettingsSubTab('account')}
                    >
                      Quay lại tab Tài khoản
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal 1: Edit Profile Modal */}
            {isEditProfileModalOpen && (
              <div
                className="dev-support-modal-backdrop"
                onClick={() => setIsEditProfileModalOpen(false)}
              >
                <div
                  className="dev-support-modal-container"
                  onClick={(e) => e.stopPropagation()}
                  style={{ maxWidth: 520 }}
                >
                  <div className="dev-support-modal-header">
                    <div>
                      <h3 className="dev-support-modal-title">Chỉnh sửa thông tin cá nhân</h3>
                      <p className="dev-support-modal-sub">
                        Cập nhật họ tên, email hoặc vai trò của bạn trong tổ chức.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setIsEditProfileModalOpen(false)}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveProfile} className="dev-support-modal-body">
                    <div className="dev-support-field-group">
                      <label className="dev-support-label">Họ và tên *</label>
                      <input
                        type="text"
                        required
                        className="dev-support-input"
                        value={editNameInput}
                        onChange={(e) => setEditNameInput(e.target.value)}
                        placeholder="Nhập họ và tên"
                      />
                    </div>

                    <div className="dev-support-field-group">
                      <label className="dev-support-label">Email tài khoản *</label>
                      <input
                        type="email"
                        required
                        className="dev-support-input"
                        value={editEmailInput}
                        onChange={(e) => setEditEmailInput(e.target.value)}
                        placeholder="name@example.com"
                      />
                    </div>

                    <div className="dev-support-field-group">
                      <label className="dev-support-label">Vai trò chuyên môn</label>
                      <input
                        type="text"
                        className="dev-support-input"
                        value={editRoleInput}
                        onChange={(e) => setEditRoleInput(e.target.value)}
                        placeholder="Developer, Technical Lead, Architect..."
                      />
                    </div>

                    <div className="dev-support-modal-footer" style={{ marginTop: 24 }}>
                      <button
                        type="button"
                        className="dev-support-modal-btn outline"
                        onClick={() => setIsEditProfileModalOpen(false)}
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="dev-support-modal-btn primary"
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal 2: Activity Audit Log Modal */}
            {isActivityModalOpen && (
              <div
                className="dev-support-modal-backdrop"
                onClick={() => setIsActivityModalOpen(false)}
              >
                <div
                  className="dev-support-modal-container"
                  onClick={(e) => e.stopPropagation()}
                  style={{ maxWidth: 680 }}
                >
                  <div className="dev-support-modal-header">
                    <div>
                      <h3 className="dev-support-modal-title">Nhật ký hoạt động tài khoản</h3>
                      <p className="dev-support-modal-sub">
                        Lịch sử đăng nhập, tạo khóa API và các giao dịch gần đây.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setIsActivityModalOpen(false)}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="dev-support-modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                    <div className="dev-settings-activity-list full-modal">
                      {recentActivities.map((act) => (
                        <div key={act.id} className="dev-settings-activity-item" style={{ padding: '12px 14px', borderBottom: '1px solid #F1F5F9' }}>
                          <div className={`dev-settings-activity-icon ${act.status}`}>
                            {act.type === 'login' && <ShieldCheck size={16} />}
                            {act.type === 'key' && <Key size={16} />}
                            {act.type === 'profile' && <User size={16} />}
                            {act.type === 'payment' && <Receipt size={16} />}
                            {act.type === 'logout' && <LogOut size={16} />}
                          </div>
                          <div className="dev-settings-activity-content">
                            <div className="dev-settings-activity-title" style={{ fontSize: 14 }}>{act.title}</div>
                            <div className="dev-settings-activity-desc">{act.desc}</div>
                          </div>
                          <div className="dev-settings-activity-time">{act.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="dev-support-modal-footer">
                    <button
                      type="button"
                      className="dev-support-modal-btn outline"
                      onClick={() => {
                        showToast('Xuất nhật ký', 'Đang tải về file audit_log_2025.csv...', 'info');
                      }}
                    >
                      <Download size={14} style={{ marginRight: 6 }} />
                      <span>Tải file CSV</span>
                    </button>
                    <button
                      type="button"
                      className="dev-support-modal-btn primary"
                      onClick={() => setIsActivityModalOpen(false)}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* =========================================================================
                SECURITY SUBTAB MODALS
                ========================================================================= */}
            {/* Modal 1: Cài đặt xác thực 2 lớp (2FA) */}
            {is2FAModalOpen && (
              <div className="dev-support-modal-overlay" onClick={() => setIs2FAModalOpen(false)}>
                <div className="dev-support-modal-card" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
                  <div className="dev-support-modal-header">
                    <div className="dev-support-modal-title-wrap">
                      <div className="dev-support-modal-icon-badge" style={{ background: '#ECFDF5', color: '#10B981' }}>
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h3 className="dev-support-modal-title">Cài đặt xác thực 2 lớp (2FA)</h3>
                        <p className="dev-support-modal-subtitle">Bảo vệ tài khoản bằng mã TOTP từ Authenticator App.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setIs2FAModalOpen(false)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="dev-support-modal-body">
                    {/* Status Banner */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '14px 16px',
                      background: twoFactorEnabled ? '#F0FDF4' : '#FFFBEB',
                      border: `1px solid ${twoFactorEnabled ? '#BBF7D0' : '#FDE68A'}`,
                      borderRadius: 10,
                      marginBottom: 16
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: twoFactorEnabled ? '#10B981' : '#F59E0B'
                        }} />
                        <div>
                          <div style={{ fontSize: 13.5, fontWeight: 600, color: twoFactorEnabled ? '#166534' : '#92400E' }}>
                            {twoFactorEnabled ? 'Trạng thái: Đang bảo vệ (Đã bật)' : 'Trạng thái: Đang tắt'}
                          </div>
                          <div style={{ fontSize: 12, color: twoFactorEnabled ? '#15803D' : '#B45309' }}>
                            {twoFactorEnabled
                              ? 'Mọi phiên đăng nhập mới đều yêu cầu mã xác thực 6 số.'
                              : 'Tài khoản có nguy cơ bị xâm nhập cao hơn khi chưa kích hoạt 2FA.'}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`dev-settings-sec-btn ${twoFactorEnabled ? 'danger' : 'primary'}`}
                        style={{ padding: '6px 12px', fontSize: 12.5 }}
                        onClick={handleToggle2FA}
                      >
                        {twoFactorEnabled ? 'Tắt 2FA' : 'Kích hoạt ngay'}
                      </button>
                    </div>

                    {/* Secret Setup */}
                    <div style={{
                      padding: 16,
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: 10,
                      marginBottom: 16
                    }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B', marginBottom: 8 }}>
                        Khóa bí mật (Authenticator Secret)
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <code style={{
                          flex: 1,
                          padding: '8px 12px',
                          background: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          borderRadius: 6,
                          fontSize: 13,
                          letterSpacing: '0.05em',
                          color: '#0F172A',
                          fontFamily: 'monospace'
                        }}>
                          TOPD-2025-DEV-SEC-X94B
                        </code>
                        <button
                          type="button"
                          className="dev-settings-sec-btn"
                          style={{ padding: '8px 12px', fontSize: 12.5 }}
                          onClick={() => {
                            if (navigator.clipboard) navigator.clipboard.writeText('TOPD-2025-DEV-SEC-X94B');
                            showToast('Đã sao chép', 'Khóa bí mật 2FA đã được lưu vào bộ nhớ tạm.', 'success');
                          }}
                        >
                          <Copy size={13} style={{ marginRight: 6 }} />
                          <span>Sao chép</span>
                        </button>
                      </div>
                      <p style={{ fontSize: 12, color: '#64748B', marginTop: 8, margin: '8px 0 0 0' }}>
                        Quét mã hoặc nhập khóa trên vào Google Authenticator, Microsoft Authenticator hoặc 1Password.
                      </p>
                    </div>

                    {/* Backup Codes */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>
                          Mã dự phòng (Backup Codes)
                        </div>
                        <div style={{ display: 'flex', gap: 6 }}>
                          <button
                            type="button"
                            className="dev-settings-sec-btn"
                            style={{ padding: '4px 8px', fontSize: 11.5 }}
                            onClick={handleCopyBackupCodes}
                          >
                            <Copy size={12} style={{ marginRight: 4 }} />
                            <span>Sao chép tất cả</span>
                          </button>
                          <button
                            type="button"
                            className="dev-settings-sec-btn"
                            style={{ padding: '4px 8px', fontSize: 11.5 }}
                            onClick={handleRegenerateBackupCodes}
                          >
                            <RefreshCw size={12} style={{ marginRight: 4 }} />
                            <span>Tạo lại</span>
                          </button>
                        </div>
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 8,
                        padding: 12,
                        background: '#F1F5F9',
                        borderRadius: 8
                      }}>
                        {backupCodes.map((code, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '6px 8px',
                              background: '#FFFFFF',
                              border: '1px solid #E2E8F0',
                              borderRadius: 6,
                              textAlign: 'center',
                              fontFamily: 'monospace',
                              fontSize: 12,
                              fontWeight: 600,
                              color: '#334155'
                            }}
                          >
                            {code}
                          </div>
                        ))}
                      </div>
                      <p style={{ fontSize: 11.5, color: '#DC2626', marginTop: 8, margin: '8px 0 0 0' }}>
                        * Mỗi mã chỉ sử dụng được 1 lần. Vui lòng lưu trữ cẩn thận phòng khi bạn mất điện thoại.
                      </p>
                    </div>
                  </div>

                  <div className="dev-support-modal-footer">
                    <button
                      type="button"
                      className="dev-support-modal-btn primary"
                      onClick={() => setIs2FAModalOpen(false)}
                    >
                      Hoàn tất
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal 2: Đổi mật khẩu */}
            {isChangePasswordModalOpen && (
              <div className="dev-support-modal-overlay" onClick={() => setIsChangePasswordModalOpen(false)}>
                <div className="dev-support-modal-card" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
                  <div className="dev-support-modal-header">
                    <div className="dev-support-modal-title-wrap">
                      <div className="dev-support-modal-icon-badge" style={{ background: '#EFF6FF', color: '#0084FF' }}>
                        <Lock size={20} />
                      </div>
                      <div>
                        <h3 className="dev-support-modal-title">Đổi mật khẩu tài khoản</h3>
                        <p className="dev-support-modal-subtitle">Tạo mật khẩu mạnh để bảo vệ tài khoản và API Key.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setIsChangePasswordModalOpen(false)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleSavePassword}>
                    <div className="dev-support-modal-body">
                      <div className="dev-support-modal-field">
                        <label className="dev-support-modal-label">Mật khẩu hiện tại</label>
                        <input
                          type="password"
                          className="dev-support-modal-input"
                          placeholder="Nhập mật khẩu đang dùng"
                          value={pwdCurrent}
                          onChange={(e) => setPwdCurrent(e.target.value)}
                          required
                        />
                      </div>

                      <div className="dev-support-modal-field">
                        <label className="dev-support-modal-label">Mật khẩu mới</label>
                        <input
                          type="password"
                          className="dev-support-modal-input"
                          placeholder="Tối thiểu 8 ký tự"
                          value={pwdNew}
                          onChange={(e) => setPwdNew(e.target.value)}
                          required
                        />
                      </div>

                      {/* Password validation indicators */}
                      <div style={{
                        padding: '10px 14px',
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: 8,
                        marginBottom: 14,
                        fontSize: 12
                      }}>
                        <div style={{ fontWeight: 600, color: '#475569', marginBottom: 6 }}>Yêu cầu độ mạnh mật khẩu:</div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: pwdNew.length >= 8 ? '#10B981' : '#94A3B8' }}>
                            <CheckCircle2 size={13} /> <span>Ít nhất 8 ký tự</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: /[A-Z]/.test(pwdNew) && /[a-z]/.test(pwdNew) ? '#10B981' : '#94A3B8' }}>
                            <CheckCircle2 size={13} /> <span>Chữ hoa & chữ thường</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: /[0-9]/.test(pwdNew) ? '#10B981' : '#94A3B8' }}>
                            <CheckCircle2 size={13} /> <span>Ít nhất 1 số (0-9)</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: /[^A-Za-z0-9]/.test(pwdNew) ? '#10B981' : '#94A3B8' }}>
                            <CheckCircle2 size={13} /> <span>Ký tự đặc biệt (!@#$)</span>
                          </div>
                        </div>
                      </div>

                      <div className="dev-support-modal-field">
                        <label className="dev-support-modal-label">Xác nhận mật khẩu mới</label>
                        <input
                          type="password"
                          className="dev-support-modal-input"
                          placeholder="Nhập lại mật khẩu mới"
                          value={pwdConfirm}
                          onChange={(e) => setPwdConfirm(e.target.value)}
                          required
                        />
                        {pwdConfirm && pwdNew !== pwdConfirm && (
                          <div style={{ color: '#DC2626', fontSize: 12, marginTop: 4 }}>
                            Mật khẩu xác nhận không khớp!
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="dev-support-modal-footer">
                      <button
                        type="button"
                        className="dev-support-modal-btn outline"
                        onClick={() => setIsChangePasswordModalOpen(false)}
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="dev-support-modal-btn primary"
                        disabled={!pwdCurrent || pwdNew.length < 8 || pwdNew !== pwdConfirm}
                      >
                        Lưu thay đổi
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal 3: Quản lý thiết bị đăng nhập */}
            {isDevicesModalOpen && (
              <div className="dev-support-modal-overlay" onClick={() => setIsDevicesModalOpen(false)}>
                <div className="dev-support-modal-card" style={{ maxWidth: 600 }} onClick={(e) => e.stopPropagation()}>
                  <div className="dev-support-modal-header">
                    <div className="dev-support-modal-title-wrap">
                      <div className="dev-support-modal-icon-badge" style={{ background: '#EFF6FF', color: '#0084FF' }}>
                        <Monitor size={20} />
                      </div>
                      <div>
                        <h3 className="dev-support-modal-title">Quản lý thiết bị đăng nhập</h3>
                        <p className="dev-support-modal-subtitle">Danh sách các phiên làm việc và thiết bị đang được cấp quyền.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setIsDevicesModalOpen(false)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="dev-support-modal-body">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {loginActivities.map((act) => (
                        <div
                          key={act.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            background: act.isCurrent ? '#F0FDF4' : '#F8FAFC',
                            border: `1px solid ${act.isCurrent ? '#BBF7D0' : '#E2E8F0'}`,
                            borderRadius: 10
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                            <div style={{
                              width: 38,
                              height: 38,
                              borderRadius: 8,
                              background: '#FFFFFF',
                              border: '1px solid #E2E8F0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#3B82F6'
                            }}>
                              {act.browserType === 'mobile' || act.browserType === 'android' ? (
                                <Smartphone size={20} />
                              ) : (
                                <Monitor size={20} />
                              )}
                            </div>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <span style={{ fontSize: 13.5, fontWeight: 600, color: '#1E293B' }}>{act.device}</span>
                                {act.isCurrent && (
                                  <span style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: '#16A34A',
                                    background: '#DCFCE7',
                                    padding: '2px 8px',
                                    borderRadius: 12
                                  }}>
                                    Thiết bị này
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
                                {act.location} • IP: {act.ip} • {act.time}
                              </div>
                            </div>
                          </div>
                          {!act.isCurrent && (
                            <button
                              type="button"
                              className="dev-settings-sec-btn danger"
                              style={{ padding: '6px 10px', fontSize: 12 }}
                              onClick={() => {
                                setLoginActivities(prev => prev.filter(item => item.id !== act.id));
                                showToast('Đăng xuất thành công', `Đã chấm dứt phiên làm việc trên ${act.device}.`, 'info');
                              }}
                            >
                              Đăng xuất
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div style={{
                      marginTop: 16,
                      padding: '12px 16px',
                      background: '#FEF2F2',
                      border: '1px solid #FECACA',
                      borderRadius: 10,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#991B1B' }}>Đăng xuất khỏi tất cả thiết bị khác</div>
                        <div style={{ fontSize: 12, color: '#B91C1C' }}>Chỉ giữ lại phiên làm việc hiện tại trên trình duyệt này.</div>
                      </div>
                      <button
                        type="button"
                        className="dev-settings-sec-btn danger"
                        style={{ padding: '7px 12px', fontSize: 12.5 }}
                        onClick={handleLogoutOtherDevices}
                      >
                        Đăng xuất tất cả
                      </button>
                    </div>
                  </div>

                  <div className="dev-support-modal-footer">
                    <button
                      type="button"
                      className="dev-support-modal-btn primary"
                      onClick={() => setIsDevicesModalOpen(false)}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Modal 4: Cấu hình phiên làm việc (Session) */}
            {isSessionModalOpen && (
              <div className="dev-support-modal-overlay" onClick={() => setIsSessionModalOpen(false)}>
                <div className="dev-support-modal-card" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
                  <div className="dev-support-modal-header">
                    <div className="dev-support-modal-title-wrap">
                      <div className="dev-support-modal-icon-badge" style={{ background: '#F1F5F9', color: '#475569' }}>
                        <Clock size={20} />
                      </div>
                      <div>
                        <h3 className="dev-support-modal-title">Cấu hình phiên làm việc</h3>
                        <p className="dev-support-modal-subtitle">Tùy chỉnh thời gian tự động đăng xuất để đảm bảo an toàn.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setIsSessionModalOpen(false)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveSessionConfig}>
                    <div className="dev-support-modal-body">
                      <div className="dev-support-modal-field">
                        <label className="dev-support-modal-label">Thời gian chờ không hoạt động (Inactivity Timeout)</label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 6 }}>
                          {[
                            { value: '15m', label: '15 phút', desc: 'Khuyến nghị cho máy tính công cộng hoặc chia sẻ' },
                            { value: '30m', label: '30 phút', desc: 'Mức bảo vệ tiêu chuẩn cao' },
                            { value: '1h', label: '1 giờ', desc: 'Cân bằng giữa an toàn và tiện lợi' },
                            { value: '4h', label: '4 giờ', desc: 'Phù hợp trong giờ làm việc' },
                            { value: '24h', label: '24 giờ (1 ngày)', desc: 'Mặc định cho nhà phát triển' },
                            { value: '7d', label: '7 ngày', desc: 'Chỉ nên dùng trên thiết bị cá nhân tin cậy' }
                          ].map((opt) => (
                            <label
                              key={opt.value}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 10,
                                padding: '10px 12px',
                                background: sessionTimeout === opt.value ? '#EFF6FF' : '#F8FAFC',
                                border: `1px solid ${sessionTimeout === opt.value ? '#93C5FD' : '#E2E8F0'}`,
                                borderRadius: 8,
                                cursor: 'pointer'
                              }}
                            >
                              <input
                                type="radio"
                                name="sessionTimeout"
                                value={opt.value}
                                checked={sessionTimeout === opt.value}
                                onChange={(e) => setSessionTimeout(e.target.value)}
                                style={{ marginTop: 2 }}
                              />
                              <div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>{opt.label}</div>
                                <div style={{ fontSize: 11.5, color: '#64748B' }}>{opt.desc}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div style={{
                        marginTop: 14,
                        padding: 12,
                        background: '#F8FAFC',
                        border: '1px solid #E2E8F0',
                        borderRadius: 8
                      }}>
                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#1E293B' }}>Tự động khóa phiên làm việc</div>
                            <div style={{ fontSize: 11.5, color: '#64748B' }}>Khóa tạm thời khi chuyển tab hoặc máy tính đi vào chế độ ngủ.</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={autoLockEnabled}
                            onChange={(e) => setAutoLockEnabled(e.target.checked)}
                            style={{ width: 16, height: 16 }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="dev-support-modal-footer">
                      <button
                        type="button"
                        className="dev-support-modal-btn outline"
                        onClick={() => setIsSessionModalOpen(false)}
                      >
                        Hủy
                      </button>
                      <button
                        type="submit"
                        className="dev-support-modal-btn primary"
                      >
                        Lưu cấu hình
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal 5: Xóa tài khoản */}
            {isDeleteAccountModalOpen && (
              <div className="dev-support-modal-overlay" onClick={() => setIsDeleteAccountModalOpen(false)}>
                <div className="dev-support-modal-card" style={{ maxWidth: 480 }} onClick={(e) => e.stopPropagation()}>
                  <div className="dev-support-modal-header">
                    <div className="dev-support-modal-title-wrap">
                      <div className="dev-support-modal-icon-badge" style={{ background: '#FEF2F2', color: '#EF4444' }}>
                        <Trash2 size={20} />
                      </div>
                      <div>
                        <h3 className="dev-support-modal-title" style={{ color: '#DC2626' }}>Xóa vĩnh viễn tài khoản</h3>
                        <p className="dev-support-modal-subtitle">Hành động này mang tính phá hủy và không thể khôi phục.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setIsDeleteAccountModalOpen(false)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <form onSubmit={handleDeleteAccountSubmit}>
                    <div className="dev-support-modal-body">
                      <div style={{
                        padding: 14,
                        background: '#FEF2F2',
                        border: '1px solid #FECACA',
                        borderRadius: 8,
                        marginBottom: 16
                      }}>
                        <div style={{ display: 'flex', gap: 10 }}>
                          <AlertTriangle size={20} color="#DC2626" style={{ flexShrink: 0, marginTop: 2 }} />
                          <div style={{ fontSize: 12.5, color: '#991B1B', lineHeight: 1.5 }}>
                            <strong>Cảnh báo quan trọng:</strong> Tất cả các dự án, khóa API đang hoạt động, cấu hình Webhook và số dư tài khoản của bạn sẽ bị hủy vĩnh viễn ngay lập tức.
                          </div>
                        </div>
                      </div>

                      <div className="dev-support-modal-field">
                        <label className="dev-support-modal-label">
                          Để xác nhận, vui lòng gõ chính xác <strong>XOA TAI KHOAN</strong> vào ô bên dưới:
                        </label>
                        <input
                          type="text"
                          className="dev-support-modal-input"
                          placeholder="XOA TAI KHOAN"
                          value={deleteConfirmationText}
                          onChange={(e) => setDeleteConfirmationText(e.target.value)}
                          required
                          style={{ borderColor: '#FECACA' }}
                        />
                      </div>
                    </div>

                    <div className="dev-support-modal-footer">
                      <button
                        type="button"
                        className="dev-support-modal-btn outline"
                        onClick={() => {
                          setIsDeleteAccountModalOpen(false);
                          setDeleteConfirmationText('');
                        }}
                      >
                        Hủy bỏ
                      </button>
                      <button
                        type="submit"
                        className="dev-support-modal-btn danger"
                        disabled={deleteConfirmationText.trim().toUpperCase() !== 'XOA TAI KHOAN'}
                      >
                        Xác nhận xóa tài khoản
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal 6: Xem tất cả hoạt động đăng nhập (Audit Log) */}
            {isAllLoginLogsModalOpen && (
              <div className="dev-support-modal-overlay" onClick={() => setIsAllLoginLogsModalOpen(false)}>
                <div className="dev-support-modal-card" style={{ maxWidth: 760 }} onClick={(e) => e.stopPropagation()}>
                  <div className="dev-support-modal-header">
                    <div className="dev-support-modal-title-wrap">
                      <div className="dev-support-modal-icon-badge" style={{ background: '#EFF6FF', color: '#0084FF' }}>
                        <Clock size={20} />
                      </div>
                      <div>
                        <h3 className="dev-support-modal-title">Nhật ký đăng nhập chi tiết</h3>
                        <p className="dev-support-modal-subtitle">Ghi nhận toàn bộ các sự kiện xác thực và đăng nhập 30 ngày qua.</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="dev-support-modal-close"
                      onClick={() => setIsAllLoginLogsModalOpen(false)}
                      aria-label="Đóng"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="dev-support-modal-body">
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 14
                    }}>
                      <div style={{ fontSize: 13, color: '#64748B' }}>
                        Hiển thị <strong>5/5</strong> phiên đăng nhập gần nhất
                      </div>
                      <button
                        type="button"
                        className="dev-settings-sec-btn"
                        style={{ padding: '6px 12px', fontSize: 12.5 }}
                        onClick={() => {
                          showToast('Xuất tệp CSV', 'Đang kết xuất nhật ký đăng nhập ra file CSV...', 'info');
                        }}
                      >
                        <Download size={13} style={{ marginRight: 6 }} />
                        <span>Tải file CSV</span>
                      </button>
                    </div>

                    <div style={{ overflowX: 'auto', border: '1px solid #E2E8F0', borderRadius: 8 }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, textAlign: 'left' }}>
                        <thead>
                          <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0', color: '#64748B' }}>
                            <th style={{ padding: '10px 14px' }}>Thiết bị & Trình duyệt</th>
                            <th style={{ padding: '10px 14px' }}>Địa chỉ IP</th>
                            <th style={{ padding: '10px 14px' }}>Vị trí địa lý</th>
                            <th style={{ padding: '10px 14px' }}>Thời gian</th>
                            <th style={{ padding: '10px 14px', textAlign: 'right' }}>Trạng thái</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loginActivities.map((act) => (
                            <tr key={act.id} style={{ borderBottom: '1px solid #F1F5F9' }}>
                              <td style={{ padding: '12px 14px', fontWeight: 600, color: '#1E293B' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  {act.browserType === 'mobile' || act.browserType === 'android' ? (
                                    <Smartphone size={16} color="#64748B" />
                                  ) : (
                                    <Monitor size={16} color="#64748B" />
                                  )}
                                  <span>{act.device}</span>
                                </div>
                              </td>
                              <td style={{ padding: '12px 14px', fontFamily: 'monospace', color: '#475569' }}>
                                {act.ip}
                              </td>
                              <td style={{ padding: '12px 14px', color: '#475569' }}>
                                {act.location}
                              </td>
                              <td style={{ padding: '12px 14px', color: '#64748B' }}>
                                {act.time}
                              </td>
                              <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                                {act.isCurrent ? (
                                  <span style={{
                                    fontSize: 11,
                                    fontWeight: 600,
                                    color: '#16A34A',
                                    background: '#DCFCE7',
                                    padding: '3px 8px',
                                    borderRadius: 12
                                  }}>
                                    Đang hoạt động
                                  </span>
                                ) : (
                                  <span style={{
                                    fontSize: 11,
                                    fontWeight: 500,
                                    color: '#475569',
                                    background: '#F1F5F9',
                                    padding: '3px 8px',
                                    borderRadius: 12
                                  }}>
                                    Hợp lệ
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="dev-support-modal-footer">
                    <button
                      type="button"
                      className="dev-support-modal-btn primary"
                      onClick={() => setIsAllLoginLogsModalOpen(false)}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


            {/* =========================================================================
                NOTIFICATIONS VIEW (Thông báo - Reference Screenshot 100% Fidelity)
                ========================================================================= */}
            {activeNav === 'notifications' && (
              <div className="dev-notif-view-wrap">
                {/* Main Two-Column Grid */}
                <div className="dev-notif-main-grid">
                  {/* Left Column: Header + Filters Bar + Notifications List Card */}
                  <div className="dev-notif-left-col">
                    {/* 1. Header */}
                    <div className="dev-notif-header">
                      <div className="dev-notif-header-text">
                        <h1 className="dev-notif-title">Thông báo</h1>
                        <p className="dev-notif-subtitle">
                          Cập nhật mới nhất về tài khoản, dịch vụ và các hoạt động trên Topdoo.
                        </p>
                      </div>
                    </div>

                    {/* 2. Top Filter Pills Bar */}
                    <div className="dev-notif-filters-bar">
                      <button
                        type="button"
                        className={`dev-notif-pill ${activeNotifFilter === 'all' ? 'active' : ''}`}
                        onClick={() => { setActiveNotifFilter('all'); setNotifPage(1); }}
                      >
                        <Bell size={15} />
                        <span>Tất cả ({notifCounts.all})</span>
                      </button>
                      <button
                        type="button"
                        className={`dev-notif-pill ${activeNotifFilter === 'system' ? 'active' : ''}`}
                        onClick={() => { setActiveNotifFilter('system'); setNotifPage(1); }}
                      >
                        <Settings size={15} />
                        <span>Hệ thống ({notifCounts.system})</span>
                      </button>
                      <button
                        type="button"
                        className={`dev-notif-pill ${activeNotifFilter === 'project' ? 'active' : ''}`}
                        onClick={() => { setActiveNotifFilter('project'); setNotifPage(1); }}
                      >
                        <Folder size={15} />
                        <span>Dự án ({notifCounts.project})</span>
                      </button>
                      <button
                        type="button"
                        className={`dev-notif-pill ${activeNotifFilter === 'billing' ? 'active' : ''}`}
                        onClick={() => { setActiveNotifFilter('billing'); setNotifPage(1); }}
                      >
                        <CreditCard size={15} />
                        <span>Thanh toán ({notifCounts.billing})</span>
                      </button>
                      <button
                        type="button"
                        className={`dev-notif-pill ${activeNotifFilter === 'other' ? 'active' : ''}`}
                        onClick={() => { setActiveNotifFilter('other'); setNotifPage(1); }}
                      >
                        <MoreHorizontal size={15} />
                        <span>Khác ({notifCounts.other})</span>
                      </button>
                    </div>

                    {/* 3. Notifications List Card Container */}
                    <div className="dev-notif-list-card">
                    <div className="dev-notif-list">
                      {currentDisplayedNotifs.map((item) => (
                        <div
                          key={item.id}
                          className={`dev-notif-item ${item.isUnread ? 'unread' : ''}`}
                          onClick={() => handleOpenNotificationDetail(item)}
                        >
                          {/* Circular Colored Icon Badge */}
                          <div className={`dev-notif-icon-circle ${item.iconType}`}>
                            {item.iconType === 'bell' && <Bell size={18} />}
                            {item.iconType === 'folder' && <Folder size={18} />}
                            {item.iconType === 'card' && <CreditCard size={18} />}
                            {item.iconType === 'settings' && <Settings size={18} />}
                            {item.iconType === 'message' && <MessageSquare size={18} />}
                            {item.iconType === 'file' && <FileText size={18} />}
                            {item.iconType === 'alert' && <UserCog size={18} />}
                          </div>

                          {/* Content */}
                          <div className="dev-notif-content">
                            <div className="dev-notif-item-top">
                              <h4 className="dev-notif-item-title">{item.title}</h4>
                              <div className="dev-notif-item-meta">
                                <span className="dev-notif-time">{item.time}</span>
                                {item.isUnread && item.tagText === null && (
                                  <span className="dev-notif-unread-dot" title="Chưa đọc" />
                                )}
                                {item.tagText && (
                                  <span className={`dev-notif-tag ${item.tagType}`}>
                                    {item.tagText}
                                  </span>
                                )}
                              </div>
                            </div>
                            <p className="dev-notif-item-desc">{item.desc}</p>
                          </div>

                          {/* Right Chevron */}
                          <div className="dev-notif-chevron">
                            <ChevronRight size={18} />
                          </div>
                        </div>
                      ))}

                      {currentDisplayedNotifs.length === 0 && (
                        <div className="dev-notif-empty">
                          <Bell size={36} color="#94A3B8" />
                          <p>Không có thông báo nào trong mục này.</p>
                        </div>
                      )}
                    </div>

                    {/* Pagination Footer */}
                    <div className="dev-notif-pagination-footer">
                      <span className="dev-notif-pagination-info">
                        Hiển thị {currentDisplayedNotifs.length} trong tổng {filteredNotifications.length} thông báo
                      </span>
                      <div className="dev-notif-pagination-controls">
                        <button
                          type="button"
                          className="dev-notif-page-btn"
                          disabled={notifPage === 1}
                          onClick={() => setNotifPage(prev => Math.max(prev - 1, 1))}
                          aria-label="Trang trước"
                        >
                          <ChevronDown size={14} style={{ transform: 'rotate(90deg)' }} />
                        </button>
                        <button
                          type="button"
                          className={`dev-notif-page-num ${notifPage === 1 ? 'active' : ''}`}
                          onClick={() => setNotifPage(1)}
                        >
                          1
                        </button>
                        {totalNotifPages > 1 && (
                          <button
                            type="button"
                            className={`dev-notif-page-num ${notifPage === 2 ? 'active' : ''}`}
                            onClick={() => setNotifPage(2)}
                          >
                            2
                          </button>
                        )}
                        <button
                          type="button"
                          className="dev-notif-page-btn"
                          disabled={notifPage >= totalNotifPages}
                          onClick={() => setNotifPage(prev => Math.min(prev + 1, totalNotifPages))}
                          aria-label="Trang tiếp"
                        >
                          <ChevronDown size={14} style={{ transform: 'rotate(-90deg)' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                  </div>

                  {/* Right Column: 3 Widgets matching screenshot */}
                  <div className="dev-notif-sidebar-widgets">
                    {/* Widget 1: Bộ lọc thông báo */}
                    <div className="dev-notif-widget-card">
                      <div className="dev-notif-widget-header">
                        <h3 className="dev-notif-widget-title">Bộ lọc thông báo</h3>
                        <SlidersHorizontal size={16} className="dev-notif-widget-icon" />
                      </div>
                      <div className="dev-notif-widget-list">
                        <button
                          type="button"
                          className={`dev-notif-filter-item ${activeNotifFilter === 'all' ? 'active' : ''}`}
                          onClick={() => { setActiveNotifFilter('all'); setNotifPage(1); }}
                        >
                          <div className="dev-notif-filter-item-left">
                            <Bell size={16} />
                            <span>Tất cả</span>
                          </div>
                          <span className="dev-notif-filter-badge">{notifCounts.all}</span>
                        </button>
                        <button
                          type="button"
                          className={`dev-notif-filter-item ${activeNotifFilter === 'system' ? 'active' : ''}`}
                          onClick={() => { setActiveNotifFilter('system'); setNotifPage(1); }}
                        >
                          <div className="dev-notif-filter-item-left">
                            <Settings size={16} />
                            <span>Hệ thống</span>
                          </div>
                          <span className="dev-notif-filter-badge">{notifCounts.system}</span>
                        </button>
                        <button
                          type="button"
                          className={`dev-notif-filter-item ${activeNotifFilter === 'project' ? 'active' : ''}`}
                          onClick={() => { setActiveNotifFilter('project'); setNotifPage(1); }}
                        >
                          <div className="dev-notif-filter-item-left">
                            <Folder size={16} />
                            <span>Dự án</span>
                          </div>
                          <span className="dev-notif-filter-badge">{notifCounts.project}</span>
                        </button>
                        <button
                          type="button"
                          className={`dev-notif-filter-item ${activeNotifFilter === 'billing' ? 'active' : ''}`}
                          onClick={() => { setActiveNotifFilter('billing'); setNotifPage(1); }}
                        >
                          <div className="dev-notif-filter-item-left">
                            <CreditCard size={16} />
                            <span>Thanh toán</span>
                          </div>
                          <span className="dev-notif-filter-badge">{notifCounts.billing}</span>
                        </button>
                        <button
                          type="button"
                          className={`dev-notif-filter-item ${activeNotifFilter === 'other' ? 'active' : ''}`}
                          onClick={() => { setActiveNotifFilter('other'); setNotifPage(1); }}
                        >
                          <div className="dev-notif-filter-item-left">
                            <MoreHorizontal size={16} />
                            <span>Khác</span>
                          </div>
                          <span className="dev-notif-filter-badge">{notifCounts.other}</span>
                        </button>
                      </div>
                    </div>

                    {/* Widget 2: Tóm tắt thông báo */}
                    <div className="dev-notif-widget-card">
                      <div className="dev-notif-widget-header">
                        <h3 className="dev-notif-widget-title" style={{ display: 'flex', alignItems: 'center' }}>
                          <BarChart3 size={16} color="#0084FF" style={{ marginRight: 8 }} />
                          Tóm tắt thông báo
                        </h3>
                      </div>
                      <div className="dev-notif-summary-list">
                        <div className="dev-notif-summary-row">
                          <div className="dev-notif-summary-label">
                            <Bell size={16} color="#64748B" />
                            <span>Tổng thông báo</span>
                          </div>
                          <span className="dev-notif-summary-num primary">{notifCounts.all}</span>
                        </div>
                        <div
                          className="dev-notif-summary-row clickable"
                          onClick={() => {
                            showToast('Chưa đọc', `Đang lọc ${notifCounts.unread} thông báo chưa đọc...`, 'info');
                          }}
                        >
                          <div className="dev-notif-summary-label">
                            <span className="dev-notif-summary-dot green" />
                            <span>Chưa đọc</span>
                          </div>
                          <span className="dev-notif-summary-num">{notifCounts.unread}</span>
                        </div>
                        <div className="dev-notif-summary-row">
                          <div className="dev-notif-summary-label">
                            <span className="dev-notif-summary-dot gray" />
                            <span>Đã đọc</span>
                          </div>
                          <span className="dev-notif-summary-num">{notifCounts.read}</span>
                        </div>
                      </div>
                    </div>

                    {/* Widget 3: Không bỏ lỡ thông tin quan trọng! */}
                    <div className="dev-notif-robot-card">
                      {/* 3D Robot Illustration with Ringing Bell */}
                      <div className="dev-notif-robot-art">
                        <svg width="128" height="96" viewBox="0 0 128 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <defs>
                            <radialGradient id="notifRobotGlow" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
                              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                            </radialGradient>
                            <linearGradient id="notifRobotBody" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#FFFFFF" />
                              <stop offset="60%" stopColor="#F1F5F9" />
                              <stop offset="100%" stopColor="#CBD5E1" />
                            </linearGradient>
                            <linearGradient id="notifRobotVisor" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#0B1329" />
                              <stop offset="100%" stopColor="#0284C7" />
                            </linearGradient>
                            <linearGradient id="notifBellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#60A5FA" />
                              <stop offset="100%" stopColor="#0084FF" />
                            </linearGradient>
                          </defs>

                          {/* Glow */}
                          <ellipse cx="64" cy="56" rx="46" ry="32" fill="url(#notifRobotGlow)" />

                          {/* Floating Ringing Bell */}
                          <g transform="translate(18, 2) scale(0.95)">
                            <circle cx="20" cy="18" r="14" fill="#E0F2FE" opacity="0.6" />
                            <path d="M20 7 C16.5 7 14 9.5 14 13 L14 17 C13 18 11.5 19 11.5 20 C11.5 20.8 12.2 21.5 13 21.5 L27 21.5 C27.8 21.5 28.5 20.8 28.5 20 C28.5 19 27 18 26 17 L26 13 C26 9.5 23.5 7 20 7 Z" fill="url(#notifBellGrad)" />
                            <circle cx="20" cy="23.5" r="2" fill="#0084FF" />
                            <path d="M19 5.5 C19 5 19.5 4.5 20 4.5 C20.5 4.5 21 5 21 5.5" stroke="#0084FF" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M8 12 C7 14 7 17 8 19" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M32 12 C33 14 33 17 32 19" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
                          </g>

                          {/* Robot Antenna */}
                          <path d="M64 26 L64 33" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
                          <circle cx="64" cy="24" r="3.5" fill="#0084FF" />
                          <circle cx="64" cy="24" r="1.5" fill="#E0F2FE" />

                          {/* Robot Ears */}
                          <rect x="36" y="44" width="5" height="12" rx="2.5" fill="#94A3B8" />
                          <rect x="87" y="44" width="5" height="12" rx="2.5" fill="#94A3B8" />

                          {/* Robot Head */}
                          <rect x="39" y="32" width="50" height="36" rx="16" fill="url(#notifRobotBody)" />

                          {/* Visor Screen */}
                          <rect x="44" y="37" width="40" height="22" rx="11" fill="url(#notifRobotVisor)" />

                          {/* Eyes */}
                          <ellipse cx="56" cy="48" rx="4" ry="4.5" fill="#38BDF8" />
                          <circle cx="57.5" cy="46.5" r="1.2" fill="#FFFFFF" />
                          <ellipse cx="72" cy="48" rx="4" ry="4.5" fill="#38BDF8" />
                          <circle cx="73.5" cy="46.5" r="1.2" fill="#FFFFFF" />

                          {/* Robot Body */}
                          <path d="M48 68 C48 66 54 65 64 65 C74 65 80 66 80 68 L82 82 C82 85 78 88 64 88 C50 88 46 85 46 82 Z" fill="url(#notifRobotBody)" />

                          {/* Chest LED light */}
                          <circle cx="64" cy="74" r="3" fill="#0084FF" />
                          <circle cx="64" cy="74" r="1.2" fill="#BAE6FD" />

                          {/* Robot Arms */}
                          <path d="M45 71 C40 73 35 77 36 82 C37 84 40 83 43 79 L46 75" fill="none" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M83 71 C88 73 93 77 92 82 C91 84 88 83 85 79 L82 75" fill="none" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                          {/* Floating Sparkles */}
                          <path d="M102 36 L104 40 L108 42 L104 44 L102 48 L100 44 L96 42 L100 40 Z" fill="#38BDF8" opacity="0.8" />
                          <path d="M30 60 L31.5 63 L34.5 64.5 L31.5 66 L30 69 L28.5 66 L25.5 64.5 L28.5 63 Z" fill="#60A5FA" opacity="0.7" />
                          <circle cx="106" cy="62" r="2" fill="#93C5FD" opacity="0.8" />
                        </svg>
                      </div>

                      <h4 className="dev-notif-robot-title">Không bỏ lỡ thông tin quan trọng!</h4>
                      <p className="dev-notif-robot-desc">
                        Bật thông báo để luôn cập nhật những tin tức mới nhất từ Topdoo.
                      </p>
                      <button
                        type="button"
                        className="dev-notif-robot-link"
                        onClick={() => setIsNotifConfigModalOpen(true)}
                      >
                        <span>Cài đặt thông báo</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Modal 1: Chi tiết thông báo */}
                {selectedNotification && (
                  <div className="dev-support-modal-overlay" onClick={() => setSelectedNotification(null)}>
                    <div className="dev-support-modal-card" style={{ maxWidth: 560 }} onClick={(e) => e.stopPropagation()}>
                      <div className="dev-support-modal-header">
                        <div className="dev-support-modal-title-wrap">
                          <div className={`dev-notif-icon-circle ${selectedNotification.iconType}`}>
                            {selectedNotification.iconType === 'bell' && <Bell size={18} />}
                            {selectedNotification.iconType === 'folder' && <Folder size={18} />}
                            {selectedNotification.iconType === 'card' && <CreditCard size={18} />}
                            {selectedNotification.iconType === 'settings' && <Settings size={18} />}
                            {selectedNotification.iconType === 'message' && <MessageSquare size={18} />}
                            {selectedNotification.iconType === 'file' && <FileText size={18} />}
                            {selectedNotification.iconType === 'alert' && <UserCog size={18} />}
                          </div>
                          <div>
                            <h3 className="dev-support-modal-title">{selectedNotification.title}</h3>
                            <p className="dev-support-modal-subtitle">{selectedNotification.fullDate || selectedNotification.time}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="dev-support-modal-close"
                          onClick={() => setSelectedNotification(null)}
                          aria-label="Đóng"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <div className="dev-support-modal-body">
                        <div style={{
                          padding: '16px 18px',
                          background: '#F8FAFC',
                          borderRadius: 12,
                          border: '1px solid #E2E8F0',
                          marginBottom: 16,
                          fontSize: 13.5,
                          lineHeight: 1.6,
                          color: '#334155'
                        }}>
                          {selectedNotification.detailContent || selectedNotification.desc}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0' }}>
                          <span style={{ fontSize: 13, color: '#64748B' }}>Trạng thái:</span>
                          <button
                            type="button"
                            className="dev-settings-sec-btn"
                            style={{ padding: '6px 12px', fontSize: 12.5 }}
                            onClick={() => handleToggleNotificationRead(selectedNotification.id)}
                          >
                            {selectedNotification.isUnread ? 'Đánh dấu đã đọc' : 'Đánh dấu chưa đọc'}
                          </button>
                        </div>
                      </div>

                      <div className="dev-support-modal-footer">
                        <button
                          type="button"
                          className="dev-support-modal-btn secondary"
                          onClick={() => setSelectedNotification(null)}
                        >
                          Đóng
                        </button>
                        {selectedNotification.actionLabel && (
                          <button
                            type="button"
                            className="dev-support-modal-btn primary"
                            onClick={() => {
                              setSelectedNotification(null);
                              if (selectedNotification.actionNav) {
                                setActiveNav(selectedNotification.actionNav);
                                if (selectedNotification.actionSubTab) {
                                  setSettingsSubTab(selectedNotification.actionSubTab);
                                }
                              } else if (selectedNotification.actionTarget) {
                                navigateMarketing(selectedNotification.actionTarget);
                              }
                            }}
                          >
                            <span>{selectedNotification.actionLabel}</span>
                            <ArrowRight size={14} style={{ marginLeft: 6 }} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal 2: Cài đặt thông báo (Preferences) */}
                {isNotifConfigModalOpen && (
                  <div className="dev-support-modal-overlay" onClick={() => setIsNotifConfigModalOpen(false)}>
                    <div className="dev-support-modal-card" style={{ maxWidth: 540 }} onClick={(e) => e.stopPropagation()}>
                      <div className="dev-support-modal-header">
                        <div className="dev-support-modal-title-wrap">
                          <div className="dev-support-modal-icon-badge" style={{ background: '#EBF5FF', color: '#0084FF' }}>
                            <Bell size={20} />
                          </div>
                          <div>
                            <h3 className="dev-support-modal-title">Cài đặt kênh thông báo</h3>
                            <p className="dev-support-modal-subtitle">Tùy chọn phương thức và loại tin nhắn bạn muốn nhận.</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="dev-support-modal-close"
                          onClick={() => setIsNotifConfigModalOpen(false)}
                          aria-label="Đóng"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      <form onSubmit={handleSaveNotifPreferences}>
                        <div className="dev-support-modal-body">
                          <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#64748B', marginBottom: 12 }}>
                            Kênh nhận thông báo
                          </h4>

                          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10 }}>
                              <div>
                                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A' }}>Email thông báo</div>
                                <div style={{ fontSize: 12, color: '#64748B' }}>nguyenvana@gmail.com</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={notifChannelPrefs.email}
                                onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, email: e.target.checked }))}
                                style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#0084FF' }}
                              />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10 }}>
                              <div>
                                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A' }}>Thông báo đẩy trình duyệt (Push Web)</div>
                                <div style={{ fontSize: 12, color: '#64748B' }}>Nhận thông báo tức thì khi mở tab trình duyệt</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={notifChannelPrefs.push}
                                onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, push: e.target.checked }))}
                                style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#0084FF' }}
                              />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10 }}>
                              <div>
                                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A' }}>Webhook Endpoint</div>
                                <div style={{ fontSize: 12, color: '#64748B' }}>Gửi payload JSON về server của bạn</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={notifChannelPrefs.webhook}
                                onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, webhook: e.target.checked }))}
                                style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#0084FF' }}
                              />
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 10 }}>
                              <div>
                                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#0F172A' }}>Telegram Bot (@TopdooBot)</div>
                                <div style={{ fontSize: 12, color: '#64748B' }}>Nhận tin nhắn báo cáo qua bot Telegram cá nhân</div>
                              </div>
                              <input
                                type="checkbox"
                                checked={notifChannelPrefs.telegram}
                                onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, telegram: e.target.checked }))}
                                style={{ width: 18, height: 18, cursor: 'pointer', accentColor: '#0084FF' }}
                              />
                            </div>
                          </div>

                          <h4 style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: '#64748B', marginBottom: 12 }}>
                            Loại sự kiện quan tâm
                          </h4>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={notifChannelPrefs.systemAlerts}
                                onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, systemAlerts: e.target.checked }))}
                                style={{ accentColor: '#0084FF' }}
                              />
                              <span>Bảo trì & Cập nhật API</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={notifChannelPrefs.projectStatus}
                                onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, projectStatus: e.target.checked }))}
                                style={{ accentColor: '#0084FF' }}
                              />
                              <span>Trạng thái dự án</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={notifChannelPrefs.billingAlerts}
                                onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, billingAlerts: e.target.checked }))}
                                style={{ accentColor: '#0084FF' }}
                              />
                              <span>Thanh toán & Hạn mức</span>
                            </label>
                            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#334155', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={notifChannelPrefs.supportUpdates}
                                onChange={(e) => setNotifChannelPrefs(prev => ({ ...prev, supportUpdates: e.target.checked }))}
                                style={{ accentColor: '#0084FF' }}
                              />
                              <span>Hỗ trợ kỹ thuật</span>
                            </label>
                          </div>
                        </div>

                        <div className="dev-support-modal-footer">
                          <button
                            type="button"
                            className="dev-support-modal-btn secondary"
                            onClick={() => setIsNotifConfigModalOpen(false)}
                          >
                            Hủy
                          </button>
                          <button
                            type="submit"
                            className="dev-support-modal-btn primary"
                          >
                            Lưu cấu hình
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

        {/* =========================================================================
            FALLBACK VIEW FOR OTHER NAV TABS
            ========================================================================= */}
        {activeNav !== 'home' && activeNav !== 'projects' && activeNav !== 'api-sdk' && activeNav !== 'playground' && activeNav !== 'docs' && activeNav !== 'api-keys' && activeNav !== 'billing' && activeNav !== 'support' && activeNav !== 'settings' && activeNav !== 'notifications' && (
          <div className="dev-proj-tab-placeholder">
            <div className="dev-proj-tab-placeholder-icon">
              <Package size={36} color="#0084FF" />
            </div>
            <h2 className="dev-proj-tab-placeholder-title">Khu vực làm việc đang đồng bộ</h2>
            <p className="dev-proj-tab-placeholder-desc">
              Phần tính năng này đang được liên kết với hạ tầng Cloud Topdoo Developer. Bạn có thể quay lại
              danh sách dự án hoặc trở về bảng điều khiển tổng quan.
            </p>
            <div className="dev-proj-tab-placeholder-actions">
              <button
                type="button"
                className="dev-proj-action-btn primary"
                onClick={() => setActiveNav('projects')}
              >
                <span>Quản lý dự án của tôi</span>
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                className="dev-proj-action-btn outline"
                onClick={() => setActiveNav('home')}
              >
                <span>Về trang chủ</span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
            CREATE NEW PROJECT MODAL
            ========================================================================= */}
        {isCreateModalOpen && (
          <div
            className="dev-proj-modal-overlay"
            onClick={() => setIsCreateModalOpen(false)}
          >
            <div
              className="dev-proj-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dev-proj-modal-header">
                <div className="dev-proj-modal-title-wrap">
                  <div className="dev-proj-modal-icon">
                    <Plus size={18} color="#0084FF" />
                  </div>
                  <h3>Tạo dự án AI mới</h3>
                </div>
                <button
                  type="button"
                  className="dev-proj-modal-close"
                  onClick={() => setIsCreateModalOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateProject} className="dev-proj-modal-form">
                <div className="dev-proj-form-group">
                  <label className="dev-proj-form-label">Tên dự án *</label>
                  <input
                    type="text"
                    className="dev-proj-form-input"
                    placeholder="Ví dụ: Chatbot CSKH, AI OCR, Tóm tắt tin tức..."
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    required
                    autoFocus
                  />
                </div>

                <div className="dev-proj-form-group">
                  <label className="dev-proj-form-label">Mô tả dự án</label>
                  <textarea
                    className="dev-proj-form-textarea"
                    rows={3}
                    placeholder="Mô tả mục tiêu, bài toán giải quyết và đối tượng sử dụng..."
                    value={newProjectDesc}
                    onChange={(e) => setNewProjectDesc(e.target.value)}
                  />
                </div>

                <div className="dev-proj-form-row">
                  <div className="dev-proj-form-group flex-1">
                    <label className="dev-proj-form-label">Dịch vụ cốt lõi</label>
                    <div className="dev-proj-select-wrap modal-select">
                      <select
                        className="dev-proj-select"
                        value={newProjectService}
                        onChange={(e) => setNewProjectService(e.target.value)}
                      >
                        <option value="topdoo-ai">Topdoo AI (LLM / Chatbot)</option>
                        <option value="topdoo-vision">Topdoo Vision (Thị giác AI)</option>
                        <option value="topdoo-speech">Topdoo Speech (Giọng nói AI)</option>
                      </select>
                      <ChevronDown size={14} className="dev-proj-select-arrow" />
                    </div>
                  </div>

                  <div className="dev-proj-form-group flex-1">
                    <label className="dev-proj-form-label">Môi trường triển khai</label>
                    <div className="dev-proj-select-wrap modal-select">
                      <select
                        className="dev-proj-select"
                        value={newProjectEnv}
                        onChange={(e) => setNewProjectEnv(e.target.value)}
                      >
                        <option value="development">Development (Phát triển)</option>
                        <option value="testing">Testing (Thử nghiệm)</option>
                        <option value="production">Production (Sản phẩm thực tế)</option>
                      </select>
                      <ChevronDown size={14} className="dev-proj-select-arrow" />
                    </div>
                  </div>
                </div>

                <div className="dev-proj-modal-footer">
                  <button
                    type="button"
                    className="dev-proj-modal-btn cancel"
                    onClick={() => setIsCreateModalOpen(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="dev-proj-modal-btn submit"
                  >
                    <Plus size={16} />
                    <span>Tạo dự án ngay</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* =========================================================================
            INTEGRATION GUIDE MODAL (HƯỚNG DẪN TÍCH HỢP)
            ========================================================================= */}
        {isIntegrationModalOpen && (
          <div
            className="dev-apisdk-modal-overlay"
            onClick={() => setIsIntegrationModalOpen(false)}
          >
            <div
              className="dev-apisdk-modal large"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dev-apisdk-modal-header">
                <div className="dev-apisdk-modal-title-wrap">
                  <div className="dev-apisdk-modal-icon-circle blue">
                    <BookOpen size={20} color="#0084FF" />
                  </div>
                  <div>
                    <h3 className="dev-apisdk-modal-title">Hướng dẫn tích hợp Topdoo AI</h3>
                    <p className="dev-apisdk-modal-desc">
                      Tích hợp nhanh chóng các mô hình ngôn ngữ, thị giác máy tính và xử lý tài liệu vào ứng dụng của bạn.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="dev-apisdk-modal-close"
                  onClick={() => setIsIntegrationModalOpen(false)}
                  aria-label="Đóng cửa sổ"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="dev-apisdk-modal-body">
                {/* Step 1: Install or Auth */}
                <div className="dev-apisdk-guide-step">
                  <div className="dev-apisdk-guide-step-num">1</div>
                  <div className="dev-apisdk-guide-step-content">
                    <h4 className="dev-apisdk-guide-step-title">Xác thực với API Key</h4>
                    <p className="dev-apisdk-guide-step-desc">
                      Truyền API Key vào Authorization Header theo chuẩn Bearer Token trong mỗi lượt gọi:
                    </p>
                    <div className="dev-apisdk-code-box">
                      <code>Authorization: Bearer sk-••••••••••••••••••••••••a1b2</code>
                      <button
                        type="button"
                        className="dev-apisdk-code-copy-btn"
                        onClick={handleCopyApiKey}
                      >
                        <Copy size={14} />
                        <span>{copiedApiKey ? 'Đã chép' : 'Sao chép'}</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 2: Code snippets */}
                <div className="dev-apisdk-guide-step">
                  <div className="dev-apisdk-guide-step-num">2</div>
                  <div className="dev-apisdk-guide-step-content">
                    <div className="dev-apisdk-guide-tabs-header">
                      <h4 className="dev-apisdk-guide-step-title">Mã nguồn mẫu thực thi</h4>
                      <div className="dev-apisdk-code-lang-tabs">
                        <button
                          type="button"
                          className={`dev-apisdk-code-tab ${integrationCodeTab === 'curl' ? 'active' : ''}`}
                          onClick={() => setIntegrationCodeTab('curl')}
                        >
                          cURL
                        </button>
                        <button
                          type="button"
                          className={`dev-apisdk-code-tab ${integrationCodeTab === 'python' ? 'active' : ''}`}
                          onClick={() => setIntegrationCodeTab('python')}
                        >
                          Python
                        </button>
                        <button
                          type="button"
                          className={`dev-apisdk-code-tab ${integrationCodeTab === 'node' ? 'active' : ''}`}
                          onClick={() => setIntegrationCodeTab('node')}
                        >
                          Node.js
                        </button>
                      </div>
                    </div>

                    <div className="dev-apisdk-code-block-wrap">
                      <pre className="dev-apisdk-pre">
                        {integrationCodeTab === 'curl' && (
`curl https://api.topdoo.ai/v1/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${realApiKey}" \\
  -d '{
    "model": "topdoo-ai-chat-v1.2",
    "messages": [
      {"role": "user", "content": "Xin chào Topdoo AI!"}
    ],
    "temperature": 0.7
  }'`
                        )}
                        {integrationCodeTab === 'python' && (
`import requests

url = "https://api.topdoo.ai/v1/chat/completions"
headers = {
    "Authorization": "Bearer ${realApiKey}",
    "Content-Type": "application/json"
}
payload = {
    "model": "topdoo-ai-chat-v1.2",
    "messages": [{"role": "user", "content": "Xin chào Topdoo AI!"}],
    "temperature": 0.7
}

response = requests.post(url, headers=headers, json=payload)
print(response.json())`
                        )}
                        {integrationCodeTab === 'node' && (
`import { TopdooAI } from '@topdoo/sdk';

const client = new TopdooAI({
  apiKey: '${realApiKey}',
});

async function main() {
  const completion = await client.chat.completions.create({
    model: 'topdoo-ai-chat-v1.2',
    messages: [{ role: 'user', content: 'Xin chào Topdoo AI!' }],
  });

  console.log(completion.choices[0].message.content);
}

main();`
                        )}
                      </pre>
                      <button
                        type="button"
                        className="dev-apisdk-code-copy-btn floating"
                        onClick={() => {
                          showToast('Đã sao chép mã nguồn mẫu', 'Bạn có thể dán vào terminal hoặc dự án để chạy ngay!', 'success');
                        }}
                      >
                        <Copy size={14} />
                        <span>Sao chép mã</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dev-apisdk-modal-footer">
                <button
                  type="button"
                  className="dev-apisdk-modal-btn outline"
                  onClick={() => setIsIntegrationModalOpen(false)}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="dev-apisdk-modal-btn primary"
                  onClick={() => {
                    setIsIntegrationModalOpen(false);
                    showToast('Khởi chạy Playground', 'Chuyển đến Playground để thử nghiệm trực tiếp API...', 'info');
                    setActiveNav('playground');
                  }}
                >
                  <Tv size={15} />
                  <span>Mở Playground thử nghiệm</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            CREATE NEW API KEY MODAL
            ========================================================================= */}
        {activeNav === 'api-sdk' && isCreateKeyModalOpen && (
          <div
            className="dev-apisdk-modal-overlay"
            onClick={() => setIsCreateKeyModalOpen(false)}
          >
            <div
              className="dev-apisdk-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="dev-apisdk-modal-header">
                <div className="dev-apisdk-modal-title-wrap">
                  <div className="dev-apisdk-modal-icon-circle blue">
                    <Key size={20} color="#0084FF" />
                  </div>
                  <div>
                    <h3 className="dev-apisdk-modal-title">Tạo API Key mới</h3>
                    <p className="dev-apisdk-modal-desc">
                      Khóa bí mật dùng để xác thực các yêu cầu gửi đến hệ thống Topdoo AI.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="dev-apisdk-modal-close"
                  onClick={() => setIsCreateKeyModalOpen(false)}
                  aria-label="Đóng cửa sổ"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateNewApiKey}>
                <div className="dev-apisdk-modal-body">
                  <div className="dev-apisdk-form-group">
                    <label className="dev-apisdk-form-label">
                      Tên nhận diện khóa <span className="dev-apisdk-required">*</span>
                    </label>
                    <input
                      type="text"
                      className="dev-apisdk-form-input"
                      placeholder="Ví dụ: Chatbot Website, Backend Production..."
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      required
                      autoFocus
                    />
                    <span className="dev-apisdk-form-hint">
                      Đặt tên giúp bạn dễ phân biệt mục đích sử dụng của từng khóa.
                    </span>
                  </div>

                  <div className="dev-apisdk-form-group">
                    <label className="dev-apisdk-form-label">Thời gian hết hạn</label>
                    <select
                      className="dev-apisdk-form-select"
                      value={newKeyExpiry}
                      onChange={(e) => setNewKeyExpiry(e.target.value)}
                    >
                      <option value="never">Không bao giờ hết hạn</option>
                      <option value="30d">30 ngày</option>
                      <option value="60d">60 ngày</option>
                      <option value="90d">90 ngày</option>
                      <option value="1y">1 năm</option>
                    </select>
                  </div>

                  <div className="dev-apisdk-form-group">
                    <label className="dev-apisdk-form-label">Quyền hạn truy cập</label>
                    <div className="dev-apisdk-scope-radio-group">
                      <label className="dev-apisdk-scope-radio active">
                        <input type="radio" name="scope" defaultChecked />
                        <div className="dev-apisdk-scope-info">
                          <strong>Toàn quyền (Full Access)</strong>
                          <span>Cho phép gọi mọi endpoint API &amp; SDK trong gói đăng ký của bạn</span>
                        </div>
                      </label>
                      <label className="dev-apisdk-scope-radio">
                        <input type="radio" name="scope" />
                        <div className="dev-apisdk-scope-info">
                          <strong>Chỉ đọc &amp; suy luận (Read &amp; Inference)</strong>
                          <span>Chỉ cho phép gọi mô hình, không thể quản lý tài khoản hay thanh toán</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="dev-apisdk-modal-footer">
                  <button
                    type="button"
                    className="dev-apisdk-modal-btn outline"
                    onClick={() => setIsCreateKeyModalOpen(false)}
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="dev-apisdk-modal-btn primary"
                  >
                    <Plus size={16} />
                    <span>Tạo khóa ngay</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

            {/* 6. DASHBOARD FOOTER */}
            <footer className="dev-dash-footer">
              <div className="dev-dash-footer-left">
                <span>© 2025 Topdoo. All rights reserved.</span>
              </div>
              <div className="dev-dash-footer-right">
                <a href="#terms" onClick={(e) => e.preventDefault()}>Điều khoản dịch vụ</a>
                <span className="dev-dash-footer-dot">•</span>
                <a href="#privacy" onClick={(e) => e.preventDefault()}>Chính sách bảo mật</a>
                <span className="dev-dash-footer-dot">•</span>
                <a href="#support" onClick={(e) => e.preventDefault()}>Hỗ trợ</a>
                <span className="dev-dash-footer-dot">•</span>
                <button type="button" className="dev-dash-lang-btn">
                  <span>🇻🇳 Tiếng Việt</span>
                  <ChevronDown size={13} />
                </button>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
