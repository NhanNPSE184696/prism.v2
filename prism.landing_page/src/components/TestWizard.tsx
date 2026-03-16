import { useEffect, useState } from 'react';
import type { TestItem, TestState, TestResult } from '../types';
import { Toast } from './Toast';
import './TestWizard.css';

interface TestWizardProps {
  items: TestItem[];
  onComplete: (result: TestResult) => void;
  onScoreChange?: (score: number) => void;
}

export const TestWizard = ({ items, onComplete, onScoreChange }: TestWizardProps) => {
  const [state, setState] = useState<TestState>({ idx: 0, answers: {} });
  const [showToast, setShowToast] = useState(false);

  // Derive values from state
  const currentItem = items[state.idx];
  const selectedOption = state.answers[currentItem?.id] ?? null;
  const score = Object.values(state.answers).reduce((sum, val) => sum + val, 0);
  const tone: 'low' | 'mid' | 'high' = score >= 18 ? 'high' : score >= 9 ? 'mid' : 'low';

  useEffect(() => {
    onScoreChange?.(score);
  }, [score, onScoreChange]);

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
      const result = calculateResult(score, state.answers);
      onComplete(result);
    } else {
      setState({ ...state, idx: state.idx + 1 });
    }
  };

  const calculateResult = (totalScore: number, answers: Record<string, number>): TestResult => {
    let resultTitle = "";
    let resultDesc = "";
    let resultTip = "";
    let cls: 'low' | 'mid' | 'high' = "low";
    const hasRedFlag = (answers.q10 ?? 0) >= 2;

    if (hasRedFlag || totalScore >= 18) {
      resultTitle = "🔴 NGUY HIỂM";
      resultDesc = "Nguy cơ cao có vấn đề dạ dày cần được thăm khám sớm. Không nên tiếp tục chỉ tự theo dõi tại nhà.";
      resultTip = "Nên đi khám chuyên khoa tiêu hoá. \nKhông nên tiếp tục chỉ tự theo dõi tại nhà. \nĐi khám sớm hơn nếu có phân đen, nôn ra máu, sụt cân hoặc đau ảnh hưởng giấc ngủ.";
      cls = "high";
    } else if (totalScore >= 9) {
      resultTitle = "🟠 CÓ NGUY CƠ CAO";
      resultDesc = "Bạn có dấu hiệu nguy cơ rõ rệt liên quan đến triệu chứng hoặc thói quen sinh hoạt ảnh hưởng dạ dày.";
      resultTip = "Theo dõi triệu chứng trong 2–4 tuần. \nChủ động thay đổi thói quen sống: ăn đúng bữa, giảm thức khuya, giảm cà phê/rượu bia/đồ cay.\nNếu không cải thiện, nên đi khám.";
      cls = "mid";
    } else {
      resultTitle = "🟢 ỔN ĐỊNH";
      resultDesc = "Mức độ ảnh hưởng hiện tại thấp, dạ dày tương đối ổn định trong giai đoạn gần đây.";
      resultTip = "Tiếp tục duy trì thói quen tốt. \nĂn đúng giờ, ngủ đủ, hạn chế stress và chất kích thích.\nTheo dõi nếu triệu chứng xuất hiện thường hơn.";
      cls = "low";
    }

    return { score: totalScore, resultTitle, resultDesc, resultTip, cls };
  };

  const progress = Math.round(((state.idx + 1) / items.length) * 100);
  const meterProgress = Math.round((score / 30) * 100);

  return (
    <div className={`test-wizard test-wizard-${tone}`}>
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
