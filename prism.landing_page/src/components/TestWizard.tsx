import { useState } from 'react';
import type { TestItem, TestState, TestResult } from '../types';
import { Toast } from './Toast';
import './TestWizard.css';

interface TestWizardProps {
  items: TestItem[];
  onComplete: (result: TestResult) => void;
}

export const TestWizard = ({ items, onComplete }: TestWizardProps) => {
  const [state, setState] = useState<TestState>({ idx: 0, answers: {} });
  const [showToast, setShowToast] = useState(false);

  // Derive values from state
  const currentItem = items[state.idx];
  const selectedOption = state.answers[currentItem?.id] ?? null;
  const score = Object.values(state.answers).reduce((sum, val) => sum + val, 0);

  const handleOptionSelect = (value: number) => {
    setState({
      ...state,
      answers: { ...state.answers, [currentItem.id]: value }
    });
  };

  const handleBack = () => {
    if (state.idx > 0) {
      setState({ ...state, idx: state.idx - 1 });
    }
  };

  const handleNext = () => {
    if (selectedOption === null) {
      setShowToast(true);
      return;
    }
    
    if (state.idx === items.length - 1) {
      // Calculate and show result
      const result = calculateResult(score);
      onComplete(result);
    } else {
      setState({ ...state, idx: state.idx + 1 });
    }
  };

  const calculateResult = (totalScore: number): TestResult => {
    let resultTitle = "";
    let resultDesc = "";
    let resultTip = "";
    let cls: 'low' | 'mid' | 'high' = "low";

    if (totalScore >= 23) {
      resultTitle = "🔴 G-TYPE CRITICAL";
      resultDesc = "Có dấu hiệu cảnh báo bệnh lý dạ dày hoặc nguy cơ biến chứng. Không nên chỉ tự theo dõi tại nhà.";
      resultTip = "Khuyến nghị hành động: Nên khám chuyên khoa tiêu hoá. Đi khám sớm nếu đau nhiều, sụt cân, nôn, hoặc triệu chứng kéo dài. Không tự ý dùng thuốc kéo dài.";
      cls = "high";
    } else if (totalScore >= 8) {
      resultTitle = "🟠 G-TYPE WARNING";
      resultDesc = "Dạ dày đang nhạy cảm hoặc có dấu hiệu rối loạn chức năng tiêu hoá mức nhẹ–trung bình.";
      resultTip = "Gợi ý hành động: Điều chỉnh chế độ ăn (ít cay, ít dầu, đúng giờ). Giảm stress và thức khuya. Theo dõi triệu chứng trong 2–4 tuần. Nếu không cải thiện → nên đi khám.";
      cls = "mid";
    } else {
      resultTitle = "🟢 G-TYPE BALANCED";
      resultDesc = "Dạ dày đang trong trạng thái tương đối ổn định. Có thể có khó chịu nhẹ do lối sống hoặc ăn uống thất thường.";
      resultTip = "Gợi ý hành động: Duy trì giờ ăn đều. Hạn chế chất kích thích (cà phê, rượu, thuốc lá). Ngủ đủ và giảm stress. Theo dõi nếu triệu chứng tăng lên.";
      cls = "low";
    }

    return { score: totalScore, resultTitle, resultDesc, resultTip, cls };
  };

  const progress = Math.round(((state.idx + 1) / items.length) * 100);
  const meterProgress = Math.round((score / 30) * 100);

  return (
    <div className="test-wizard">
      <Toast 
        show={showToast} 
        title="Vui lòng chọn một câu trả lời" 
        message="Bạn cần chọn đáp án trước khi tiếp tục."
        onClose={() => setShowToast(false)}
      />
      
      <div className="test-progress-bar" aria-label="Tiến độ bài test">
        <div className="test-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      
      <div className="test-info">
        <span className="test-question-number">Câu {state.idx + 1}/{items.length}</span>
        <span className="test-separator">•</span>
        <span className="test-tag">{currentItem.tag}</span>
      </div>

      <div className="test-score-meter" aria-label="Thang đánh giá (0-30 điểm)">
        <div className="test-score-header">
          <span className="test-score-label">Điểm nguy cơ:</span>
          <span className="test-score-value">{score}/30</span>
        </div>
        <div className="test-score-bar">
          <div className="test-score-bar-fill" style={{ width: `${meterProgress}%` }}></div>
        </div>
      </div>

      <div className="test-step">
        <h2 className="test-question-title">{currentItem.q}</h2>
        <p className="test-question-hint">
          Chọn đáp án giống bạn nhất trong 2 tuần gần đây.
        </p>
        
        <div className="test-options">
          {currentItem.opts.map(([label, value], idx) => (
            <label key={idx} className={`test-option ${selectedOption === value ? 'selected' : ''}`}>
              <input 
                type="radio" 
                name="opt" 
                value={value}
                checked={selectedOption === value}
                onChange={() => handleOptionSelect(value)}
              />
              <span className="test-option-label">{label}</span>
            </label>
          ))}
        </div>
        
        <div className="test-navigation">
          <button 
            className="test-btn test-btn-back" 
            onClick={handleBack} 
            disabled={state.idx === 0} 
            type="button"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Quay lại
          </button>
          <button 
            className="test-btn test-btn-next" 
            onClick={handleNext} 
            type="button"
          >
            {state.idx === items.length - 1 ? 'Xem kết quả' : 'Tiếp'}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
