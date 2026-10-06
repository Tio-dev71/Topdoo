import React, { useState } from 'react';
import {
  Users,
  ChevronRight,
  MessageSquare,
  Heart,
  Share2,
  AlertTriangle,
  Lightbulb,
  Bot,
  Plus,
  Search,
  Filter,
  Pin,
  Send,
  CheckCircle,
  X
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import { INITIAL_COMMUNITY_POSTS } from '../../services/communityService';

export function TopdooCommunityView() {
  const { navigateMarketing, showToast } = useSecurity();

  const [activeCategory, setActiveCategory] = useState('all');
  const [postsList, setPostsList] = useState(INITIAL_COMMUNITY_POSTS);
  const [searchQuery, setSearchQuery] = useState('');

  // Modal tạo bài viết mới
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('THREAT_ALERT');
  const [newTags, setNewTags] = useState('Cảnh báo mới, Lừa đảo mạng');

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState({});

  const filteredPosts = postsList.filter((post) => {
    const matchCat =
      activeCategory === 'all' || post.category.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleLikePost = (postId) => {
    setPostsList((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1
          };
        }
        return p;
      })
    );
  };

  const handleAddComment = (postId) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    setPostsList((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `c-${Date.now()}`,
            authorName: 'Bạn (Người dùng xác minh)',
            content: text.trim(),
            createdAt: new Date().toISOString()
          };
          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...(p.comments || []), newComment]
          };
        }
        return p;
      })
    );

    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    showToast('Bình luận thành công', 'Bình luận của bạn đã được xuất bản.', 'success');
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Cảnh báo', 'Vui lòng nhập đầy đủ tiêu đề và nội dung bài viết.', 'warning');
      return;
    }

    const createdPost = {
      id: `post-${Date.now()}`,
      title: newTitle,
      content: newContent,
      authorName: 'Bạn (Thành viên cộng đồng)',
      authorRole: 'Cộng tác viên An ninh mạng',
      authorAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop',
      category: newCategory,
      categoryLabel: newCategory === 'THREAT_ALERT' ? 'Cảnh báo lừa đảo' : (newCategory === 'TUTORIAL' ? 'Hướng dẫn' : 'Thảo luận AI'),
      likesCount: 1,
      commentsCount: 0,
      isLiked: true,
      tags: newTags.split(',').map((t) => t.trim()),
      isPinned: false,
      createdAt: new Date().toISOString(),
      comments: []
    };

    setPostsList((prev) => [createdPost, ...prev]);
    setIsCreateModalOpen(false);
    setNewTitle('');
    setNewContent('');
    showToast('Đăng bài thành công', 'Bài viết của bạn đã được chia sẻ đến cộng đồng Topdoo!', 'success');
  };

  return (
    <div className="topdoo-landing topdoo-community-page">
      <MarketingHeader />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #F0FDF4 0%, #FFFFFF 100%)',
        padding: '50px 0 60px 0',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <div className="landing-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B', marginBottom: 20 }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigateMarketing('home')}>Trang chủ</span>
            <ChevronRight size={14} />
            <span style={{ cursor: 'pointer' }} onClick={() => navigateMarketing('topdoo-explore')}>Cộng đồng</span>
            <ChevronRight size={14} />
            <span style={{ color: '#10B981', fontWeight: 600 }}>Topdoo Community</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 320 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 20,
                backgroundColor: '#DCFCE7',
                color: '#15803D',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: 16
              }}>
                <Users size={16} />
                <span>TOPDOO COMMUNITY • 1.250.000+ THÀNH VIÊN</span>
              </div>

              <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0F172A', lineHeight: 1.25, margin: '0 0 16px 0' }}>
                Cùng Nhau Xây Dựng <br />
                <span style={{ color: '#10B981' }}>Không Gian Số An Toàn & Đột Phá</span>
              </h1>

              <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.6, margin: '0 0 24px 0', maxWidth: 640 }}>
                Nơi hội tụ các chuyên gia an ninh mạng, kỹ sư AI, lập trình viên và hàng triệu người dùng cùng chia sẻ cảnh báo lừa đảo thời gian thực, kinh nghiệm thực chiến và mẫu tự động hóa an toàn.
              </p>

              <button
                type="button"
                onClick={() => setIsCreateModalOpen(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '12px 24px',
                  backgroundColor: '#10B981',
                  color: '#FFFFFF',
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                }}
              >
                <Plus size={18} />
                <span>Đăng bài chia sẻ ngay</span>
              </button>
            </div>

            <div style={{ width: 360, maxWidth: '100%' }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.15)',
                border: '1px solid #BBF7D0'
              }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: 17, fontWeight: 700, color: '#0F172A' }}>
                  Tìm kiếm thảo luận
                </h3>
                <div style={{ position: 'relative', marginBottom: 16 }}>
                  <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: 12, top: 12 }} />
                  <input
                    type="text"
                    placeholder="Tìm theo chủ đề, mã độc..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px 10px 38px',
                      borderRadius: 8,
                      border: '1px solid #CBD5E1',
                      fontSize: 13,
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {[
                    { id: 'all', label: 'Tất cả' },
                    { id: 'threat_alert', label: '🚨 Cảnh báo lừa đảo' },
                    { id: 'tutorial', label: '💡 Hướng dẫn' },
                    { id: 'ai_discussion', label: '🤖 Thảo luận AI' }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 20,
                        border: activeCategory === cat.id ? 'none' : '1px solid #CBD5E1',
                        backgroundColor: activeCategory === cat.id ? '#10B981' : '#F8FAFC',
                        color: activeCategory === cat.id ? '#FFFFFF' : '#475569',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Feed Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#F8FAFC' }}>
        <div className="landing-container" style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  padding: 24,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  border: '1px solid #E2E8F0'
                }}
              >
                {/* Post Author Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img
                      src={post.authorAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120'}
                      alt={post.authorName}
                      style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>{post.authorName}</div>
                      <div style={{ fontSize: 12, color: '#64748B' }}>{post.authorRole}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {post.isPinned && (
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4,
                        padding: '4px 10px',
                        borderRadius: 12,
                        backgroundColor: '#FEF3C7',
                        color: '#B45309',
                        fontSize: 11,
                        fontWeight: 700
                      }}>
                        <Pin size={12} />
                        <span>Ghim</span>
                      </span>
                    )}

                    <span style={{
                      padding: '4px 10px',
                      borderRadius: 12,
                      backgroundColor: post.category === 'THREAT_ALERT' ? '#FEE2E2' : '#E0F2FE',
                      color: post.category === 'THREAT_ALERT' ? '#EF4444' : '#0284C7',
                      fontSize: 11,
                      fontWeight: 700
                    }}>
                      {post.categoryLabel || post.category}
                    </span>
                  </div>
                </div>

                {/* Post Title & Content */}
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0', lineHeight: 1.4 }}>
                  {post.title}
                </h2>

                <p style={{ fontSize: 14, color: '#334155', lineHeight: 1.7, margin: '0 0 16px 0', whiteSpace: 'pre-line' }}>
                  {post.content}
                </p>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    {post.tags.map((t, idx) => (
                      <span key={idx} style={{
                        padding: '3px 8px',
                        backgroundColor: '#F1F5F9',
                        borderRadius: 6,
                        fontSize: 11,
                        color: '#475569',
                        fontWeight: 600
                      }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Interaction Actions Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 20,
                  borderTop: '1px solid #F1F5F9',
                  paddingTop: 14,
                  fontSize: 13,
                  color: '#64748B'
                }}>
                  <button
                    type="button"
                    onClick={() => handleLikePost(post.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: post.isLiked ? '#EF4444' : '#64748B',
                      fontWeight: post.isLiked ? 700 : 500
                    }}
                  >
                    <Heart size={16} fill={post.isLiked ? '#EF4444' : 'none'} />
                    <span>{post.likesCount} Thích</span>
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <MessageSquare size={16} />
                    <span>{post.commentsCount} Bình luận</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(`${window.location.origin}/#${post.id}`);
                        showToast('Đã sao chép link', 'Đã lưu đường dẫn bài viết vào clipboard.', 'info');
                      }
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6,
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#64748B'
                    }}
                  >
                    <Share2 size={16} />
                    <span>Chia sẻ</span>
                  </button>
                </div>

                {/* Comments List */}
                {post.comments && post.comments.length > 0 && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px dashed #E2E8F0', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {post.comments.map((cm) => (
                      <div key={cm.id} style={{
                        backgroundColor: '#F8FAFC',
                        borderRadius: 8,
                        padding: '10px 14px',
                        fontSize: 13,
                        color: '#334155'
                      }}>
                        <div style={{ fontWeight: 700, fontSize: 12, color: '#0F172A', marginBottom: 2 }}>
                          {cm.authorName}
                        </div>
                        <div>{cm.content}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Comment Input */}
                <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                  <input
                    type="text"
                    placeholder="Viết câu trả lời hoặc thảo luận..."
                    value={commentInputs[post.id] || ''}
                    onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddComment(post.id);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: '1px solid #CBD5E1',
                      fontSize: 13,
                      boxSizing: 'border-box'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddComment(post.id)}
                    style={{
                      padding: '10px 16px',
                      backgroundColor: '#10B981',
                      color: '#FFFFFF',
                      borderRadius: 8,
                      border: 'none',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 6
                    }}
                  >
                    <Send size={14} />
                    <span>Gửi</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Create Post Modal */}
      {isCreateModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.7)',
          backdropFilter: 'blur(6px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 20
        }}>
          <div style={{
            width: '100%',
            maxWidth: 600,
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 28,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                Đăng bài viết mới lên Topdoo Community
              </h3>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                style={{ border: 'none', background: '#F1F5F9', borderRadius: 8, width: 32, height: 32, cursor: 'pointer' }}
              >
                <X size={18} color="#64748B" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Chủ đề bài viết:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #CBD5E1',
                    fontSize: 13
                  }}
                >
                  <option value="THREAT_ALERT">🚨 Cảnh báo lừa đảo (Threat Alert)</option>
                  <option value="TUTORIAL">💡 Hướng dẫn kỹ thuật & Tự động hóa</option>
                  <option value="AI_DISCUSSION">🤖 Thảo luận mô hình AI & Prompt</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Tiêu đề bài viết:
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Cảnh báo tên miền giả mạo ngân hàng ABC..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #CBD5E1',
                    fontSize: 13,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Nội dung chi tiết:
                </label>
                <textarea
                  rows={6}
                  placeholder="Mô tả cụ thể thủ đoạn, dấu hiệu nhận biết hoặc cách giải quyết..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 8,
                    border: '1px solid #CBD5E1',
                    fontSize: 13,
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#334155', marginBottom: 6 }}>
                  Thẻ tags (ngăn cách bằng dấu phẩy):
                </label>
                <input
                  type="text"
                  placeholder="APK, Lừa đảo, Cảnh báo"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #CBD5E1',
                    fontSize: 13,
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', cursor: 'pointer' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{
                    padding: '10px 22px',
                    borderRadius: 8,
                    border: 'none',
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  Xuất bản ngay
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <MarketingFooter />
    </div>
  );
}
