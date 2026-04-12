import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TestWizard } from '../components/TestWizard';
import { Toast } from '../components/Toast';
import { testItems } from '../data/testData';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import type { TestResult } from '../types';
import './Test.css';

type ThemeTone = 'low' | 'mid' | 'high';

type BlogPost = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageFallbackUrl: string;
  referenceUrl: string;
};

type RawBlogRow = {
  id: number | string;
  title: string | null;
  description: string | null;
  ImageUrl?: string | null;
  imageurl?: string | null;
  ReferenceUrl?: string | null;
  referenceurl?: string | null;
};

const INITIAL_USER_INFO = {
  name: '',
  age: '',
  email: '',
};

const getToneByScore = (score: number): ThemeTone => {
  if (score >= 18) return 'high';
  if (score >= 9) return 'mid';
  return 'low';
};

const trackGaEvent = (eventName: string, params: Record<string, string | number | boolean>) => {
  const { gtag } = window as Window & {
    gtag?: (command: 'event', name: string, parameters?: Record<string, unknown>) => void;
  };

  if (!gtag) return;

  gtag('event', eventName, params);
};

const normalizeExternalUrl = (url: string) => {
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url}`;
};

const normalizeImageUrl = (url: string) => {
  const trimmed = url.trim();
  if (!trimmed) return '';

  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;

  // Convert common Google Drive sharing URL to a direct image endpoint.
  const driveMatch = withProtocol.match(/drive\.google\.com\/file\/d\/([^/]+)/i);
  if (driveMatch?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveMatch[1]}`;
  }

  // Convert common Dropbox sharing URL to direct raw file URL.
  if (/dropbox\.com/i.test(withProtocol)) {
    return withProtocol.replace(/[?&]dl=0/i, '?raw=1').replace(/[?&]dl=1/i, '?raw=1');
  }

  return withProtocol;
};

const extractGoogleDriveId = (url: string) => {
  const filePathMatch = url.match(/drive\.google\.com\/file\/d\/([^/?#]+)/i);
  if (filePathMatch?.[1]) return filePathMatch[1];

  const idQueryMatch = url.match(/[?&]id=([^&]+)/i);
  if (idQueryMatch?.[1]) return idQueryMatch[1];

  return '';
};

const getImageFallbackUrl = (url: string) => {
  if (!/drive\.google\.com/i.test(url)) return '';

  const driveId = extractGoogleDriveId(url);
  if (!driveId) return '';

  return `https://drive.google.com/thumbnail?id=${driveId}&sz=w1600`;
};

const mapBlogRow = (row: RawBlogRow): BlogPost | null => {
  const title = row.title?.trim() ?? '';
  const description = row.description?.trim() ?? '';
  const imageUrl = normalizeImageUrl(row.ImageUrl ?? row.imageurl ?? '');
  const imageFallbackUrl = getImageFallbackUrl(imageUrl);
  const referenceUrl = (row.ReferenceUrl ?? row.referenceurl ?? '').trim();

  if (!title || !description || !referenceUrl) return null;

  return {
    id: String(row.id),
    title,
    description,
    imageUrl,
    imageFallbackUrl,
    referenceUrl,
  };
};

const Test = () => {
  const location = useLocation();
  
  // Check if auto-start from HomePage
  const shouldAutoStart = (location.state as { autoStart?: boolean } | null)?.autoStart || false;
  
  const [started, setStarted] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);
  const [liveScore, setLiveScore] = useState(0);
  const [formError, setFormError] = useState('');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveErrorMessage, setSaveErrorMessage] = useState('');
  const [showSaveSuccessToast, setShowSaveSuccessToast] = useState(false);
  const [showSaveErrorToast, setShowSaveErrorToast] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [isRelatedBlogsLoading, setIsRelatedBlogsLoading] = useState(false);
  const [isRelatedBlogsPaused, setIsRelatedBlogsPaused] = useState(false);
  const [relatedBlogsError, setRelatedBlogsError] = useState('');
  const [userInfo, setUserInfo] = useState(INITIAL_USER_INFO);
  const relatedBlogsMarqueeRef = useRef<HTMLDivElement | null>(null);
  const resumeAutoScrollTimeoutRef = useRef<number | null>(null);

  const trimmedName = userInfo.name.trim();
  const trimmedEmail = userInfo.email.trim();
  const ageValue = Number(userInfo.age);
  const isNameValid = trimmedName.length > 0;
  const isAgeValid = Number.isInteger(ageValue) && ageValue >= 1 && ageValue <= 120;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
  const isFormValid = isNameValid && isAgeValid && isEmailValid;

  const activeTone: ThemeTone = result?.cls ?? getToneByScore(liveScore);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [started, result]);

  useEffect(() => {
    if (!result || !isSupabaseConfigured || !supabase) return;

    let cancelled = false;

    void (async () => {
      setIsRelatedBlogsLoading(true);
      setRelatedBlogsError('');

      const { data, error } = await supabase
        .from('Blog')
        .select('id, title, description, ImageUrl, ReferenceUrl')
        .eq('category', result.cls)
        .order('created_at', { ascending: false })
        .limit(12);

      if (cancelled) return;

      if (error) {
        console.error('Supabase select error (Blog):', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
          category: result.cls,
        });
        setRelatedBlogs([]);
        setRelatedBlogsError('Không tải được bài viết liên quan lúc này.');
        setIsRelatedBlogsLoading(false);
        return;
      }

      const mappedBlogs = ((data ?? []) as RawBlogRow[])
        .map(mapBlogRow)
        .filter((blog): blog is BlogPost => blog !== null);

      setRelatedBlogs(mappedBlogs);
      setRelatedBlogsError('');
      setIsRelatedBlogsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [result]);

  useEffect(() => {
    if (relatedBlogs.length <= 1 || isRelatedBlogsLoading) return;

    const marqueeElement = relatedBlogsMarqueeRef.current;
    if (!marqueeElement) return;

    const intervalId = window.setInterval(() => {
      if (isRelatedBlogsPaused) return;

      const halfTrackWidth = marqueeElement.scrollWidth / 2;
      marqueeElement.scrollLeft += 1;

      if (marqueeElement.scrollLeft >= halfTrackWidth) {
        marqueeElement.scrollLeft = 0;
      }
    }, 24);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [relatedBlogs, isRelatedBlogsLoading, isRelatedBlogsPaused]);

  useEffect(() => {
    return () => {
      if (resumeAutoScrollTimeoutRef.current) {
        window.clearTimeout(resumeAutoScrollTimeoutRef.current);
      }
    };
  }, []);

  const handleManualBlogScroll = (direction: 'prev' | 'next') => {
    const marqueeElement = relatedBlogsMarqueeRef.current;
    if (!marqueeElement) return;

    setIsRelatedBlogsPaused(true);
    marqueeElement.scrollBy({
      left: direction === 'next' ? 320 : -320,
      behavior: 'smooth',
    });

    if (resumeAutoScrollTimeoutRef.current) {
      window.clearTimeout(resumeAutoScrollTimeoutRef.current);
    }

    resumeAutoScrollTimeoutRef.current = window.setTimeout(() => {
      setIsRelatedBlogsPaused(false);
    }, 2200);
  };

  const handleStart = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid) {
      setFormError('Vui lòng nhập đầy đủ Tên, Tuổi và Email hợp lệ để bắt đầu bài test.');
      return;
    }

    setFormError('');
    trackGaEvent('test_start_clicked', {
      button_text: 'Bat dau test ngay',
      page_path: location.pathname,
      auto_start: shouldAutoStart,
      form_completed: true,
    });
    setLiveScore(0);
    setStarted(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserInfo((previous) => ({
      ...previous,
      [name]: value,
    }));
    if (formError) {
      setFormError('');
    }
  };

  const handleComplete = (testResult: TestResult) => {
    const payload = {
      name: trimmedName,
      age: ageValue,
      email: trimmedEmail,
      score: testResult.score,
      result_class: testResult.cls,
      result_title: testResult.resultTitle,
    };

    setResult(testResult);
    setSaveStatus('saving');
    setSaveErrorMessage('');
    setShowSaveSuccessToast(false);
    setShowSaveErrorToast(false);

    if (!isSupabaseConfigured || !supabase) {
      setSaveStatus('error');
      setSaveErrorMessage('Chưa cấu hình Supabase. Vui lòng thêm VITE_SUPABASE_URL và VITE_SUPABASE_ANON_KEY.');
      setShowSaveErrorToast(true);
      return;
    }

    void (async () => {
      try {
        const { error } = await supabase
          .from('test_submissions')
          .insert(payload);

        if (error) {
          const detailedMessage = [error.message, error.details, error.hint]
            .filter(Boolean)
            .join(' | ');

          console.error('Supabase insert error (test_submissions):', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
            payload,
          });

          setSaveStatus('error');
          setSaveErrorMessage(
            detailedMessage
              ? `Không thể lưu kết quả: ${detailedMessage}`
              : 'Không thể lưu kết quả lúc này. Vui lòng kiểm tra cấu hình Supabase/RLS.'
          );
          setShowSaveErrorToast(true);
          return;
        }

        setSaveStatus('success');
        setShowSaveSuccessToast(true);
      } catch {
        const configuredUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
        setSaveStatus('error');
        setSaveErrorMessage(
          configuredUrl
            ? `Không thể kết nối Supabase. Kiểm tra lại VITE_SUPABASE_URL: ${configuredUrl}`
            : 'Không thể kết nối Supabase để lưu kết quả.'
        );
        setShowSaveErrorToast(true);
      }
    })();
  };

  const handleRestart = () => {
    setResult(null);
    setLiveScore(0);
    setStarted(false);
    setFormError('');
    setUserInfo({ ...INITIAL_USER_INFO });
    setSaveStatus('idle');
    setSaveErrorMessage('');
    setShowSaveSuccessToast(false);
    setShowSaveErrorToast(false);
    setRelatedBlogs([]);
    setRelatedBlogsError('');
    setIsRelatedBlogsLoading(false);
    setIsRelatedBlogsPaused(false);
  };

  // Intro Screen
  if (!started && !result) {
    return (
      <>
        <Header />
        <main>
          <section className="test-hero-section">
            <div className="test-hero-container">
              <h1 className="test-hero-title">
                Dạ dày của bạn đang ở Level nào?
              </h1>
              <p className="test-hero-description">
                Làm bài test 3 phút trước khi cơn đau pop-up lần nữa!
              </p>
            </div>
          </section>

          <section className="test-intro-section">
            <div className="test-intro-container">
              <div className="test-intro-card">
                <div className="test-intro-bg test-intro-bg-1"></div>
                <div className="test-intro-bg test-intro-bg-2"></div>
                
                <div className="test-intro-content">
                  <h2 className="test-intro-title">Bài test này sẽ giúp bạn:</h2>
                  
                  <ul className="test-intro-list">
                    <li className="test-intro-item">
                      <div className="test-intro-icon">
                        <span className="material-symbols-outlined">check</span>
                      </div>
                      <p className="test-intro-text">Đánh giá mức độ nghiêm trọng của các triệu chứng dạ dày</p>
                    </li>
                    <li className="test-intro-item">
                      <div className="test-intro-icon">
                        <span className="material-symbols-outlined">check</span>
                      </div>
                      <p className="test-intro-text">Nhận biết các yếu tố nguy cơ từ lối sống</p>
                    </li>
                    <li className="test-intro-item">
                      <div className="test-intro-icon">
                        <span className="material-symbols-outlined">check</span>
                      </div>
                      <p className="test-intro-text">Nhận lời khuyên cụ thể để cải thiện sức khỏe</p>
                    </li>
                  </ul>

                  <div className="test-intro-actions">
                    <form className="test-intro-form" onSubmit={handleStart} noValidate autoComplete="off">
                      <div className="test-intro-form-field">
                        <label htmlFor="test-user-name">Tên</label>
                        <input
                          id="test-user-name"
                          name="name"
                          type="text"
                          placeholder="Nhập tên của bạn"
                          value={userInfo.name}
                          onChange={handleInputChange}
                          autoComplete="off"
                          required
                        />
                      </div>

                      <div className="test-intro-form-field">
                        <label htmlFor="test-user-age">Tuổi</label>
                        <input
                          id="test-user-age"
                          name="age"
                          type="number"
                          min={1}
                          max={120}
                          placeholder="Nhập tuổi của bạn"
                          value={userInfo.age}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="test-intro-form-field">
                        <label htmlFor="test-user-email">Email</label>
                        <input
                          id="test-user-email"
                          name="email"
                          type="email"
                          placeholder="Nhập email của bạn"
                          value={userInfo.email}
                          onChange={handleInputChange}
                          autoComplete="off"
                          required
                        />
                      </div>

                      {formError && (
                        <p className="test-intro-form-error">{formError}</p>
                      )}

                      <button
                        type="submit"
                        className="test-start-btn"
                      >
                        <span className="material-symbols-outlined">play_arrow</span>
                        Bắt đầu test ngay
                      </button>
                    </form>
                    
                    <p className="test-intro-disclaimer">
                      *Kết quả chỉ mang tính chất tham khảo. Vui lòng tham khảo ý kiến bác sĩ để được chẩn đoán và điều trị chính xác.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // Test & Result Screen
  return (
    <>
      <Header />
      <main>
        <section className={`test-wizard-section test-wizard-section-${activeTone}`}>
          <div className="test-wizard-container">
            {!result ? (
              <>
                <div className="test-wizard-header">
                  <h1 className="test-wizard-title">BÀI TEST: MỨC ĐỘ "BÁO ĐỘNG" CỦA DẠ DÀY</h1>
                  <p className="test-wizard-subtitle">
                    <strong>Thời gian:</strong> 3–5 phút | <strong>Mục tiêu:</strong> Sàng lọc nhanh nguy cơ vấn đề dạ dày
                  </p>
                </div>
                <TestWizard
                  items={testItems}
                  onComplete={handleComplete}
                  onScoreChange={setLiveScore}
                />
              </>
            ) : (
              <div className={`test-result-container test-result-container-${result.cls}`}>
                <Toast
                  show={showSaveSuccessToast}
                  title="Đã lưu kết quả"
                  message="Kết quả của bạn đã được lưu thành công."
                  onClose={() => setShowSaveSuccessToast(false)}
                />
                <Toast
                  show={showSaveErrorToast}
                  title="Lưu kết quả thất bại"
                  message={saveErrorMessage}
                  onClose={() => setShowSaveErrorToast(false)}
                />

                <div className="test-result-header">
                  <h1 className="test-result-title">KẾT QUẢ ĐÁNH GIÁ</h1>
                </div>

                <div className="test-result-score">
                  <div className="test-result-score-header">
                    <span>Điểm số:</span>
                    <span className="test-result-score-value">{result.score}/30 điểm</span>
                  </div>
                  <div className="test-result-score-bar">
                    <div 
                      className="test-result-score-bar-fill" 
                      style={{ width: `${Math.round((result.score / 30) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className={`test-result-card test-result-${result.cls}`}>
                  <div className="test-result-type">
                    {result.resultTitle}
                  </div>
                  
                  <div className="test-result-section">
                    <h3 className="test-result-section-title">Đánh giá:</h3>
                    <p className="test-result-section-text">{result.resultDesc}</p>
                  </div>
                  
                  <div className="test-result-section test-result-section-highlight">
                    <h3 className="test-result-section-title">Khuyến nghị:</h3>
                    <p className="test-result-section-text test-result-tip">{result.resultTip}</p>
                  </div>

                  <div className="test-related-blogs">
                    <div className="test-related-blogs-header">
                      <h3 className="test-related-blogs-title">Bài viết phù hợp với kết quả của bạn</h3>
                    </div>

                    {isRelatedBlogsLoading && (
                      <p className="test-related-blogs-message">Đang tải bài viết liên quan...</p>
                    )}

                    {!isRelatedBlogsLoading && relatedBlogsError && (
                      <p className="test-related-blogs-message test-related-blogs-message-error">{relatedBlogsError}</p>
                    )}

                    {!isRelatedBlogsLoading && !relatedBlogsError && relatedBlogs.length === 0 && (
                      <p className="test-related-blogs-message">Hiện chưa có bài viết cho nhóm kết quả này.</p>
                    )}

                    {!isRelatedBlogsLoading && relatedBlogs.length > 0 && (
                      <div className="test-related-blogs-carousel">
                        {relatedBlogs.length > 1 && (
                          <button
                            type="button"
                            className="test-related-blogs-control-btn test-related-blogs-control-btn-left"
                            onClick={() => handleManualBlogScroll('prev')}
                            aria-label="Lùi về bài trước"
                          >
                            <span className="material-symbols-outlined">chevron_left</span>
                          </button>
                        )}

                        <div
                          className="test-related-blogs-marquee"
                          aria-label="Danh sách bài viết liên quan"
                          ref={relatedBlogsMarqueeRef}
                          onMouseEnter={() => setIsRelatedBlogsPaused(true)}
                          onMouseLeave={() => setIsRelatedBlogsPaused(false)}
                        >
                          <div className="test-related-blogs-track">
                            {(relatedBlogs.length > 1 ? [...relatedBlogs, ...relatedBlogs] : relatedBlogs).map((blog, index) => (
                              <a
                                key={`${blog.id}-${index}`}
                                className="test-related-blog-card"
                                href={normalizeExternalUrl(blog.referenceUrl)}
                                target="_blank"
                                rel="noreferrer noopener"
                              >
                                <div className="test-related-blog-media">
                                  {blog.imageUrl ? (
                                    <>
                                      <img
                                        className="test-related-blog-image"
                                        src={blog.imageUrl}
                                        alt={blog.title}
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        data-fallback-src={blog.imageFallbackUrl}
                                        onError={(event) => {
                                          const fallbackSrc = event.currentTarget.dataset.fallbackSrc;

                                          if (fallbackSrc && event.currentTarget.src !== fallbackSrc) {
                                            event.currentTarget.dataset.fallbackSrc = '';
                                            event.currentTarget.src = fallbackSrc;
                                            return;
                                          }

                                          console.error('Blog image load failed:', blog.imageUrl);
                                          event.currentTarget.style.display = 'none';
                                          const fallback = event.currentTarget.nextElementSibling as HTMLDivElement | null;
                                          if (fallback) fallback.style.display = 'flex';
                                        }}
                                      />
                                      <div className="test-related-blog-image-fallback" style={{ display: 'none' }}>
                                        Không có ảnh
                                      </div>
                                    </>
                                  ) : (
                                    <div className="test-related-blog-image-fallback">Không có ảnh</div>
                                  )}
                                </div>

                                <div className="test-related-blog-content">
                                  <p className="test-related-blog-card-title">{blog.title}</p>
                                  <p className="test-related-blog-card-desc">{blog.description}</p>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>

                        {relatedBlogs.length > 1 && (
                          <button
                            type="button"
                            className="test-related-blogs-control-btn test-related-blogs-control-btn-right"
                            onClick={() => handleManualBlogScroll('next')}
                            aria-label="Tới bài tiếp theo"
                          >
                            <span className="material-symbols-outlined">chevron_right</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="test-result-actions">
                    <button className="test-result-btn" onClick={handleRestart}>
                      <span className="material-symbols-outlined">refresh</span>
                      Làm lại
                    </button>
                  </div>

                  <div className="test-result-save-status" role="status" aria-live="polite">
                    {saveStatus === 'saving' && (
                      <p className="test-result-save-status-text">Đang lưu kết quả của bạn...</p>
                    )}
                  </div>

                  <div className="test-result-disclaimer">
                    <span className="material-symbols-outlined">info</span>
                    <p>
                      <strong>Lưu ý quan trọng:</strong> Bài test chỉ mang tính tham khảo để tự đánh giá ban đầu, không thay thế chẩn đoán hoặc điều trị y khoa. Nếu bạn có triệu chứng nặng, kéo dài, hoặc có dấu hiệu như phân đen, nôn ra máu, sụt cân không rõ nguyên nhân, hãy đi khám sớm.

                    </p>
                  </div>
                </div>

                {/* <div className="test-result-info">
                  <h2 className="test-result-info-title">Phân tầng kết quả</h2>
                  <p className="test-result-info-subtitle">Dựa trên tổng điểm.</p>
                  
                  <div className="test-result-info-grid">
                    <div className="test-result-info-card">
                      <h3>🟢 Ổn định (0–8)</h3>
                      <p>Tiếp tục duy trì thói quen tốt và theo dõi nếu triệu chứng xuất hiện thường hơn.</p>
                    </div>
                    <div className="test-result-info-card">
                      <h3>🟠 Có nguy cơ cao (9–17)</h3>
                      <p>Chủ động điều chỉnh lối sống và theo dõi trong 2–4 tuần; không cải thiện thì nên đi khám.</p>
                    </div>
                    <div className="test-result-info-card">
                      <h3>🔴 Nguy hiểm (18–30)</h3>
                      <p>Nên khám chuyên khoa tiêu hoá sớm. Nếu câu 10 chọn C hoặc D thì xếp thẳng mức nguy hiểm.</p>
                    </div>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Test;
