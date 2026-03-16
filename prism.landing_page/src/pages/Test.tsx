import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TestWizard } from '../components/TestWizard';
import { testItems } from '../data/testData';
import type { TestResult } from '../types';
import './Test.css';

type ThemeTone = 'low' | 'mid' | 'high';

const getToneByScore = (score: number): ThemeTone => {
  if (score >= 18) return 'high';
  if (score >= 9) return 'mid';
  return 'low';
};

const Test = () => {
  const location = useLocation();
  
  // Check if auto-start from HomePage
  const shouldAutoStart = (location.state as { autoStart?: boolean } | null)?.autoStart || false;
  
  const [started, setStarted] = useState(shouldAutoStart);
  const [result, setResult] = useState<TestResult | null>(null);
  const [liveScore, setLiveScore] = useState(0);

  const activeTone: ThemeTone = result?.cls ?? getToneByScore(liveScore);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [started, result]);

  const handleStart = () => {
    setLiveScore(0);
    setStarted(true);
  };

  const handleComplete = (testResult: TestResult) => {
    setResult(testResult);
  };

  const handleRestart = () => {
    setResult(null);
    setLiveScore(0);
    setStarted(false);
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
                    <button 
                      className="test-start-btn"
                      onClick={handleStart}
                    >
                      <span className="material-symbols-outlined">play_arrow</span>
                      Bắt đầu test ngay
                    </button>
                    
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

                  <div className="test-result-actions">
                    <button className="test-result-btn" onClick={handleRestart}>
                      <span className="material-symbols-outlined">refresh</span>
                      Làm lại
                    </button>
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
