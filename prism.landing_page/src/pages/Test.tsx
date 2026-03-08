import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { TestWizard } from '../components/TestWizard';
import { testItems } from '../data/testData';
import type { TestResult } from '../types';
import './Test.css';

const Test = () => {
  const location = useLocation();
  
  // Check if auto-start from HomePage
  const shouldAutoStart = (location.state as { autoStart?: boolean } | null)?.autoStart || false;
  
  const [started, setStarted] = useState(shouldAutoStart);
  const [result, setResult] = useState<TestResult | null>(null);

  const handleStart = () => {
    setStarted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleComplete = (testResult: TestResult) => {
    setResult(testResult);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setResult(null);
    setStarted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        <section className="test-wizard-section">
          <div className="test-wizard-container">
            {!result ? (
              <>
                <div className="test-wizard-header">
                  <h1 className="test-wizard-title">BÀI TEST: MỨC ĐỘ "BÁO ĐỘNG" CỦA DẠ DÀY</h1>
                  <p className="test-wizard-subtitle">
                    <strong>Thời gian:</strong> 3–5 phút | <strong>Mục tiêu:</strong> Sàng lọc nhanh nguy cơ vấn đề dạ dày
                  </p>
                </div>
                <TestWizard items={testItems} onComplete={handleComplete} />
              </>
            ) : (
              <div className="test-result-container">
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
                    <h3 className="test-result-section-title">Gợi ý hành động:</h3>
                    <p className="test-result-section-text">{result.resultTip}</p>
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
                      <strong>Thông điệp quan trọng:</strong> Kết quả chỉ mang tính tham khảo sức khỏe ban đầu. 
                      Nếu bạn có triệu chứng nặng, kéo dài, hoặc lo lắng — hãy đi khám bác sĩ.
                    </p>
                  </div>
                </div>

                <div className="test-result-info">
                  <h2 className="test-result-info-title">Phân nhóm G-Type</h2>
                  <p className="test-result-info-subtitle">Kết quả quy chiếu dựa trên mức độ nguy cơ vấn đề dạ dày.</p>
                  
                  <div className="test-result-info-grid">
                    <div className="test-result-info-card">
                      <h3>🟢 Balanced (0–7)</h3>
                      <p>Dạ dày ổn định. Duy trì giờ ăn đều, giảm stress, hạn chế chất kích thích.</p>
                    </div>
                    <div className="test-result-info-card">
                      <h3>🟠 Warning (8–22)</h3>
                      <p>Dạ dày nhạy cảm hoặc có rối loạn nhẹ–trung bình. Điều chỉnh chế độ ăn, theo dõi 2–4 tuần.</p>
                    </div>
                    <div className="test-result-info-card">
                      <h3>🔴 Critical (23–30)</h3>
                      <p>Có dấu hiệu cảnh báo nghiêm trọng. Nên khám chuyên khoa tiêu hoá càng sớm càng tốt.</p>
                    </div>
                  </div>
                </div>
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
