import React, { useState } from 'react';
import {
  BookOpen,
  ChevronRight,
  Clock,
  Award,
  Users,
  Play,
  CheckCircle,
  Sparkles,
  Shield,
  ArrowRight,
  Search,
  Filter,
  GraduationCap,
  Star,
  Layers,
  X
} from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';
import { MarketingHeader } from '../../components/layout/MarketingHeader';
import { MarketingFooter } from '../../components/layout/MarketingFooter';
import {
  INITIAL_ACADEMY_COURSES,
  CERTIFICATE_TRACKS
} from '../../services/academyService';

export function TopdooAcademyView() {
  const { navigateMarketing, showToast } = useSecurity();

  const [activeCategory, setActiveCategory] = useState('all');
  const [coursesList, setCoursesList] = useState(INITIAL_ACADEMY_COURSES);
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = coursesList.filter((course) => {
    const matchCategory =
      activeCategory === 'all' || course.category.toLowerCase() === activeCategory.toLowerCase();
    const matchSearch =
      !searchQuery ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleEnroll = (courseId, title) => {
    setCoursesList((prev) =>
      prev.map((c) =>
        c.id === courseId ? { ...c, isEnrolled: true, progressPercent: 10 } : c
      )
    );
    showToast('Ghi danh thành công', `Chào mừng bạn đến với khóa học "${title}"!`, 'success');
  };

  return (
    <div className="topdoo-landing topdoo-academy-page">
      <MarketingHeader />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(180deg, #EFF6FF 0%, #FFFFFF 100%)',
        padding: '50px 0 60px 0',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <div className="landing-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#64748B', marginBottom: 20 }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigateMarketing('home')}>Trang chủ</span>
            <ChevronRight size={14} />
            <span style={{ cursor: 'pointer' }} onClick={() => navigateMarketing('topdoo-explore')}>Hệ sinh thái</span>
            <ChevronRight size={14} />
            <span style={{ color: '#0084FF', fontWeight: 600 }}>Topdoo Academy</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 320 }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 20,
                backgroundColor: '#DBEAFE',
                color: '#1D4ED8',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.04em',
                marginBottom: 16
              }}>
                <GraduationCap size={16} />
                <span>TOPDOO ACADEMY • HỌC VIỆN THỰC CHIẾN</span>
              </div>

              <h1 style={{ fontSize: 36, fontWeight: 800, color: '#0F172A', lineHeight: 1.25, margin: '0 0 16px 0' }}>
                Nâng Tầm Kỹ Năng An Ninh Số & <br />
                <span style={{ color: '#0084FF' }}>Làm Chủ Trí Tuệ Nhân Tạo</span>
              </h1>

              <p style={{ fontSize: 16, color: '#475569', lineHeight: 1.6, margin: '0 0 24px 0', maxWidth: 620 }}>
                Chương trình đào tạo chuẩn quốc tế từ các chuyên gia phòng chống tội phạm công nghệ cao và kỹ sư AI hàng đầu. Học thực hành, cấp chứng chỉ định danh blockchain.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  backgroundColor: '#FFFFFF',
                  padding: '10px 16px',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  border: '1px solid #E2E8F0'
                }}>
                  <Users size={18} color="#0084FF" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>15.000+</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>Học viên tốt nghiệp</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  backgroundColor: '#FFFFFF',
                  padding: '10px 16px',
                  borderRadius: 12,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  border: '1px solid #E2E8F0'
                }}>
                  <Award size={18} color="#10B981" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: '#0F172A' }}>100% Thực tế</div>
                    <div style={{ fontSize: 11, color: '#64748B' }}>Cấp chứng chỉ kiểm định</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ width: 380, maxWidth: '100%' }}>
              <div style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: 24,
                boxShadow: '0 10px 25px -5px rgba(0, 132, 255, 0.15)',
                border: '1px solid #BFDBFE'
              }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: 18, fontWeight: 700, color: '#0F172A' }}>
                  Tìm khóa học phù hợp
                </h3>
                <div style={{ position: 'relative', marginBottom: 16 }}>
                  <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: 12, top: 12 }} />
                  <input
                    type="text"
                    placeholder="Tìm theo chủ đề, kỹ năng..."
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
                  {['all', 'Security', 'AI'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 20,
                        border: activeCategory === cat ? 'none' : '1px solid #CBD5E1',
                        backgroundColor: activeCategory === cat ? '#0084FF' : '#F8FAFC',
                        color: activeCategory === cat ? '#FFFFFF' : '#475569',
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {cat === 'all' ? 'Tất cả' : (cat === 'Security' ? '🛡️ An ninh mạng' : '⚡ AI & Agents')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses List Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#F8FAFC' }}>
        <div className="landing-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0' }}>
              Danh Sách Khóa Học Nổi Bật ({filteredCourses.length})
            </h2>
            <p style={{ fontSize: 14, color: '#64748B', margin: 0 }}>
              Cập nhật liên tục theo các thủ đoạn lừa đảo mạng và công nghệ AI mới nhất 2026.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
              >
                <div style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <img
                    src={course.thumbnailUrl}
                    alt={course.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: 12,
                    left: 12,
                    padding: '4px 10px',
                    borderRadius: 20,
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    color: '#FFFFFF',
                    fontSize: 11,
                    fontWeight: 600,
                    backdropFilter: 'blur(4px)'
                  }}>
                    {course.category} • {course.levelLabel}
                  </div>
                  <div style={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    padding: '4px 8px',
                    borderRadius: 6,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    color: '#FFFFFF',
                    fontSize: 11,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4
                  }}>
                    <Clock size={12} />
                    <span>{course.durationMinutes} phút</span>
                  </div>
                </div>

                <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0F172A', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                    {course.title}
                  </h3>

                  <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, margin: '0 0 16px 0', flex: 1 }}>
                    {course.description}
                  </p>

                  <div style={{ fontSize: 12, color: '#475569', marginBottom: 16 }}>
                    <strong>Giảng viên:</strong> {course.instructor}
                  </div>

                  {course.isEnrolled && (
                    <div style={{ marginBottom: 16 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 600, color: '#0084FF', marginBottom: 4 }}>
                        <span>Tiến độ học tập</span>
                        <span>{course.progressPercent}%</span>
                      </div>
                      <div style={{ height: 6, backgroundColor: '#E2E8F0', borderRadius: 10, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${course.progressPercent}%`, backgroundColor: '#0084FF' }} />
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      type="button"
                      onClick={() => setSelectedCourseForDetail(course)}
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 8,
                        border: '1px solid #CBD5E1',
                        backgroundColor: '#FFFFFF',
                        color: '#334155',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Xem lộ trình ({course.lessonsCount} bài)
                    </button>

                    {course.isEnrolled ? (
                      <button
                        type="button"
                        onClick={() => showToast('Vào lớp học', `Tiếp tục bài giảng cho ${course.title}...`, 'info')}
                        style={{
                          padding: '10px 16px',
                          borderRadius: 8,
                          border: 'none',
                          backgroundColor: '#0084FF',
                          color: '#FFFFFF',
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6
                        }}
                      >
                        <Play size={14} fill="#FFFFFF" />
                        <span>Học tiếp</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleEnroll(course.id, course.title)}
                        style={{
                          padding: '10px 16px',
                          borderRadius: 8,
                          border: 'none',
                          backgroundColor: '#10B981',
                          color: '#FFFFFF',
                          fontSize: 13,
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        Ghi danh
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Tracks Section */}
      <section style={{ padding: '60px 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #E2E8F0' }}>
        <div className="landing-container" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0F172A', margin: '0 0 10px 0' }}>
              Lộ Trình Chứng Chỉ Chuyên Nghiệp Topdoo
            </h2>
            <p style={{ fontSize: 15, color: '#64748B', maxWidth: 650, margin: '0 auto' }}>
              Chứng chỉ định danh cá nhân, được xác thực minh bạch giúp bạn gia tăng uy tín nghề nghiệp trong kỷ nguyên số.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {CERTIFICATE_TRACKS.map((track) => (
              <div
                key={track.id}
                style={{
                  padding: 28,
                  borderRadius: 16,
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#F8FAFC',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 12 }}>{track.badge}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0F172A', margin: '0 0 10px 0' }}>
                  {track.title}
                </h3>
                <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.6, margin: '0 0 20px 0' }}>
                  {track.criteria}
                </p>
                <button
                  type="button"
                  onClick={() => showToast('Lộ trình chứng chỉ', `Đã lưu tiêu chuẩn ${track.title}. Hãy hoàn thành các bài học để nhận chứng nhận!`, 'success')}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 8,
                    border: '1px solid #0084FF',
                    backgroundColor: '#EFF6FF',
                    color: '#0084FF',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Xem điều kiện cấp bằng →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Detail Modal */}
      {selectedCourseForDetail && (
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
            maxWidth: 640,
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 28,
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
            maxHeight: '85vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: 12, fontWeight: 700, color: '#0084FF', textTransform: 'uppercase' }}>
                  {selectedCourseForDetail.category} • {selectedCourseForDetail.levelLabel}
                </span>
                <h3 style={{ margin: '4px 0 0 0', fontSize: 20, fontWeight: 800, color: '#0F172A' }}>
                  {selectedCourseForDetail.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCourseForDetail(null)}
                style={{ border: 'none', background: '#F1F5F9', borderRadius: 8, width: 32, height: 32, cursor: 'pointer' }}
              >
                <X size={18} color="#64748B" />
              </button>
            </div>

            <p style={{ fontSize: 14, color: '#475569', lineHeight: 1.6, marginBottom: 20 }}>
              {selectedCourseForDetail.description}
            </p>

            <h4 style={{ fontSize: 15, fontWeight: 700, color: '#1E293B', marginBottom: 12 }}>
              Lộ trình bài học ({selectedCourseForDetail.modules?.length || 0} bài):
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              {selectedCourseForDetail.modules?.map((mod, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 14px',
                    borderRadius: 8,
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    fontSize: 13,
                    color: '#334155'
                  }}
                >
                  <CheckCircle size={16} color="#10B981" />
                  <span>{mod}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
              <button
                type="button"
                onClick={() => setSelectedCourseForDetail(null)}
                style={{ padding: '10px 16px', borderRadius: 8, border: '1px solid #CBD5E1', backgroundColor: '#FFFFFF', cursor: 'pointer' }}
              >
                Đóng
              </button>
              <button
                type="button"
                onClick={() => {
                  handleEnroll(selectedCourseForDetail.id, selectedCourseForDetail.title);
                  setSelectedCourseForDetail(null);
                }}
                style={{ padding: '10px 20px', borderRadius: 8, border: 'none', backgroundColor: '#0084FF', color: '#FFFFFF', fontWeight: 700, cursor: 'pointer' }}
              >
                Bắt đầu học ngay
              </button>
            </div>
          </div>
        </div>
      )}

      <MarketingFooter />
    </div>
  );
}
