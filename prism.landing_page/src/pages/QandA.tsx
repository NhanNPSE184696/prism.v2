import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './QandA.css';
import professorImg from '../assets/Images/professor.png';
import stomach1Img from '../assets/Images/stomach1.png';
import stomach2Img from '../assets/Images/stomach2.png';
import stomach3Img from '../assets/Images/stomach3.png';
import stomach4Img from '../assets/Images/stomach4.png';

interface QuestionCardProps {
  question: string;
  index: number;
  mascotVariant: number;
  onClick: () => void;
}

interface AnswerModalProps {
  question: string;
  answer: string;
  onClose: () => void;
}

const QuestionCard = ({ question, mascotVariant, onClick }: QuestionCardProps) => {
  // Mascot emojis and styles for each variant (until images are added)
  const mascotStyles = [
    { emoji: '🤔', rotation: 5 },
    { emoji: '😊', rotation: -5 },
    { emoji: '💭', rotation: 3 },
    { emoji: '😣', rotation: -3 }
  ];
  
  const mascot = mascotStyles[mascotVariant];
  
  return (
    <div className="qa-question-card" onClick={onClick}>
      <h3 className="qa-card-question">{question}</h3>
      <div className="qa-card-mascot">
        <div 
          className="qa-mascot-placeholder" 
          style={{ transform: `rotate(${mascot.rotation}deg)` }}
        >
          <span className="qa-mascot-emoji">{mascot.emoji}</span>
        </div>
      </div>
    </div>
  );
};

const AnswerModal = ({ question, answer, onClose }: AnswerModalProps) => {
  // Convert markdown-like answer to HTML with highlighted links
  const formatAnswer = (text: string) => {
    const parts = text.split(/(\[.+?\]\(.+?\)|https?:\/\/[^\s]+)/g);
    return parts.map((part, index) => {
      // Match markdown links [text](url)
      const markdownMatch = part.match(/\[(.+?)\]\((.+?)\)/);
      if (markdownMatch) {
        return (
          <a key={index} href={markdownMatch[2]} target="_blank" rel="noopener noreferrer" className="qa-answer-link">
            {markdownMatch[1]}
          </a>
        );
      }
      // Match plain URLs
      if (part.match(/^https?:\/\//)) {
        return (
          <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="qa-answer-link">
            {part}
          </a>
        );
      }
      // Regular text - preserve line breaks
      return part.split('\n').map((line, i, arr) => (
        <span key={`${index}-${i}`}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ));
    });
  };

  return (
    <div className="qa-modal-overlay" onClick={onClose}>
      <div className="qa-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="qa-modal-close" onClick={onClose} aria-label="Close">
          <span className="material-symbols-outlined">close</span>
        </button>
        
        <div className="qa-modal-body">
          <div className="qa-modal-text">
            <h2 className="qa-modal-question">{question}</h2>
            <div className="qa-modal-answer">
              {formatAnswer(answer)}
            </div>
          </div>
          
          <div className="qa-modal-professor">
            <img src={professorImg} alt="Professor" className="qa-professor-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

const QandA = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);
  const autoPlayRef = useRef<number | null>(null);
  const [email, setEmail] = useState('');
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const questions = [
    "Đau dạ dày hay trào ngược khác nhau thế nào?",
    "GERD phổ biến tới mức nào ở Việt Nam?",
    "Đau thượng vị, đầy bụng, ợ hơi có phải \"đau dạ dày\" không?",
    "Khi nào cần đi khám ngay, không nên tự chịu?",
    "Trào ngược dạ dày nên kiêng gì để cải thiện triệu chứng?",
    "Stress có thể làm nặng vấn đề dạ dày không?",
    "Vi khuẩn HP lây qua đường nào?",
    "Khi nào nên nội soi dạ dày?",
    "Tự uống thuốc giảm đau có thể làm hại dạ dày không?",
    "Buồn nôn, nôn ra máu, đi ngoài phân đen có nguy hiểm không?"
  ];

  const answers = [
    `Nếu bạn hay ợ nóng, ợ chua, cảm giác nóng rát lan lên ngực, đôi khi kèm ho khan, khàn tiếng, viêm họng mạn tính, có thể liên quan trào ngược dạ dày thực quản (GERD).

Nếu bạn đau âm ỉ, nóng rát vùng thượng vị, liên quan bữa ăn, kèm đầy bụng, khó tiêu, buồn nôn, có thể gợi ý viêm dạ dày hoặc viêm loét dạ dày tá tràng.

Nguồn tham khảo:
https://www.facebook.com/benhviendaihocyduoccoso3/posts/tr%C3%A0o-ng%C6%B0%E1%BB%A3c-d%E1%BA%A1-d%C3%A0y-th%E1%BB%B1c-qu%E1%BA%A3n-v%C3%A0-nh%E1%BB%AFng-%C4%91i%E1%BB%81u-c%E1%BA%A7n-bi%E1%BA%BFth%E1%BB%99i-ch%E1%BB%A9ng-tr%C3%A0o-ng%C6%B0%E1%BB%A3c-d%E1%BA%A1-d%C3%A0y-th/907358211430986/
https://www.vinmec.com/vie/bai-viet/benh-trao-nguoc-da-day-thuc-quan-vi
https://suckhoedoisong.vn/benh-viem-loet-da-day-ta-trang-169210802145239692.htm`,

    `Tỷ lệ mắc GERD ở Việt Nam được ước tính khoảng 10-15% dân số.

Nguồn tham khảo:
https://dantri.com.vn/suc-khoe/10-15-nguoi-viet-mac-benh-trao-nguoc-da-day-thuc-quan-20241208140131585.htm`,

    `Các biểu hiện như ợ chua, ợ hơi, chướng bụng, khó tiêu có thể gặp trong các vấn đề dạ dày. Điều quan trọng là quan sát tần suất, mức độ ảnh hưởng sinh hoạt và các dấu hiệu đi kèm để quyết định đi khám phù hợp.

Nguồn tham khảo:
https://suckhoedoisong.vn/benh-dau-da-day-va-nhung-trieu-chung-dien-hinh-169167923.htm`,

    `Bạn nên đi khám sớm (hoặc khám ngay) nếu có dấu hiệu nghi ngờ xuất huyết tiêu hóa như:
- Nôn ra máu
- Đi ngoài phân đen hoặc có máu
- Sụt cân bất thường
- Thiếu máu không rõ nguyên nhân

Đây là nhóm dấu hiệu thường được khuyến nghị nội soi và xử trí sớm.

Nguồn tham khảo:
https://www.vinmec.com/vie/bai-viet/tim-hieu-phuong-phap-noi-soi-thuc-quan-da-day-ta-trang-chan-doan-cac-benh-ve-da-day-tai-vinmec-vi
https://www.vinmec.com/vie/bai-viet/can-nhin-an-bao-lau-truoc-khi-noi-soi-da-day-vi`,

    `Một số khuyến nghị thường gặp:
- Hạn chế cà phê
- Hạn chế bia rượu
- Tránh thuốc lá
- Giảm thức ăn nhiều dầu mỡ, chất béo
- Tránh một số thực phẩm dễ làm nặng triệu chứng (tùy cơ địa)

Nguồn tham khảo:
https://www.vinmec.com/vie/bai-viet/trao-nguoc-da-day-thuc-quan-nen-an-gi-va-kieng-an-gi-vi`,

    `Stress có thể liên quan đến:
- Tăng tiết acid
- Co thắt thực quản
- Khó tiêu

Điều này có thể làm triệu chứng đường tiêu hóa trầm trọng hơn, đặc biệt khi căng thẳng kéo dài.

Nếu bạn thấy đau dạ dày "bùng phát" vào giai đoạn stress cao, hãy:
- Điều chỉnh giấc ngủ
- Sắp xếp nhịp sinh hoạt hợp lý
- Tìm cách giảm căng thẳng

Nguồn tham khảo:
https://www.vinmec.com/vie/bai-viet/moi-lien-he-giua-stress-va-benh-da-day-vi`,

    `Vi khuẩn Helicobacter pylori (HP) có thể lây qua:
- Đường miệng - miệng
- Dùng chung bát đũa
- Dùng chung đồ cá nhân
- Tiếp xúc gần có nước bọt

Nếu trong nhà có người nhiễm HP, nên chú ý vệ sinh và thói quen ăn uống để giảm nguy cơ lây.

Nguồn tham khảo:
https://www.vinmec.com/vie/bai-viet/cac-con-duong-lay-nhiem-cua-vi-khuan-hp-vi`,

    `Nội soi thường được cân nhắc khi có các triệu chứng kéo dài như:
- Đau thượng vị thường xuyên
- Buồn nôn, nôn
- Sụt cân
- Ăn uống kém
- Nghi ngờ xuất huyết tiêu hóa

Hoặc khi cần:
- Kiểm tra HP
- Tầm soát tổn thương dạ dày

Nguồn tham khảo:
https://www.vinmec.com/vie/bai-viet/tim-hieu-phuong-phap-noi-soi-thuc-quan-da-day-ta-trang-chan-doan-cac-benh-ve-da-day-tai-vinmec-vi`,

    `Một số thuốc giảm đau NSAID như:
- Ibuprofen
- Naproxen

Có thể:
- Gây kích ứng dạ dày
- Tăng nguy cơ viêm loét dạ dày

Nguy cơ cao hơn nếu dùng sai cách hoặc lạm dụng thuốc. Nếu hay đau dạ dày, nên hạn chế tự dùng thuốc và tham khảo ý kiến chuyên môn.

Nguồn tham khảo:
https://suckhoedoisong.vn/viem-loet-da-day-do-tu-y-dung-thuoc-giam-dau-169174763.htm
https://www.yhct.vn/thong-tin-thuoc/danh-cho-nvyt/canh-giac-duoc/cac-thuoc-chong-viem-khong-steroid-nsaid-thoi-gian-su-dung-toi-da
https://suckhoedoisong.vn/vi-sao-thuoc-giam-dau-chong-viem-lai-gay-dau-da-day-169241014162326131.htm`,

    `Đây là nhóm dấu hiệu có thể liên quan xuất huyết tiêu hóa và được khuyến nghị đi khám ngay để đánh giá và xử trí kịp thời.

Nguồn tham khảo:
https://nhathuoclongchau.com.vn/bai-viet/xuat-huyet-da-day-non-ra-mau-co-nguy-hiem-khong.html`
  ];

  // Get mascot variant for each question (rotate through 4 variants)
  const getMascotVariant = (questionIndex: number) => {
    return questionIndex % 4;
  };

  const handleCardClick = (questionIndex: number) => {
    setSelectedQuestion(questionIndex);
    // Pause auto-play when modal is open
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleCloseModal = () => {
    setSelectedQuestion(null);
    // Resume auto-play when modal is closed
    resetAutoPlay();
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? questions.length - 1 : prev - 1));
    resetAutoPlay();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === questions.length - 1 ? 0 : prev + 1));
    resetAutoPlay();
  };

  const resetAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === questions.length - 1 ? 0 : prev + 1));
    }, 2000);
  };

  const handleSubmitQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!email.trim() || !question.trim()) {
      setSubmitMessage({ type: 'error', text: 'Vui lòng nhập đầy đủ email và câu hỏi!' });
      return;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setSubmitMessage({ type: 'error', text: 'Email không hợp lệ!' });
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage(null);
    
    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_QA_TEMPLATE_ID,
        {
          from_email: email,
          question: question,
          to_email: 'support@prism.com', // Email nhận câu hỏi
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      
      if (result.status === 200) {
        setSubmitMessage({ 
          type: 'success', 
          text: 'Câu hỏi của bạn đã được gửi thành công! Chúng tôi sẽ phản hồi trong 24h.' 
        });
        setEmail('');
        setQuestion('');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: 'Có lỗi xảy ra khi gửi câu hỏi. Vui lòng thử lại sau!' 
      });
    } finally {
      setIsSubmitting(false);
      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(null), 5000);
    }
  };

  // Auto-play effect
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === questions.length - 1 ? 0 : prev + 1));
    }, 2000); // Change slide every 2 seconds

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [questions.length]);

  return (
    <section className="qa-section" id="qa">
      {/* Header */}
      <header className="qa-header">
        <h1 className="qa-main-title">
          CÂU HỎI THƯỜNG GẶP
        </h1>
        <p className="qa-main-subtitle">
          Khám phá các câu hỏi phổ biến về sức khỏe dạ dày từ chiến dịch Êm Dạ Mode.
        </p>
      </header>

      {/* Slider Container */}
      <div className="qa-slider-container">
        <div className="qa-slider-wrapper">
          {/* Previous Button */}
          <button 
            className="qa-slider-button qa-slider-button-prev" 
            onClick={handlePrevious}
            aria-label="Previous question"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>

          {/* Cards Slider - Show 4 cards */}
          <div className="qa-slider-track">
            <div 
              className="qa-slider-content"
              style={{
                transform: `translateX(-${(currentIndex * 100) / 4}%)`
              }}
            >
              {/* Duplicate questions for infinite scroll effect */}
              {[...questions, ...questions].map((question, index) => (
                <div key={index} className="qa-slider-item">
                  <QuestionCard 
                    question={question} 
                    index={index % questions.length}
                    mascotVariant={getMascotVariant(index % questions.length)}
                    onClick={() => handleCardClick(index % questions.length)}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button 
            className="qa-slider-button qa-slider-button-next" 
            onClick={handleNext}
            aria-label="Next question"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="qa-slider-dots">
          {questions.map((_, index) => (
            <button
              key={index}
              className={`qa-slider-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                setCurrentIndex(index);
                resetAutoPlay();
              }}
              aria-label={`Go to question ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Submit Question Section */}
      <div className="qa-submit-section">
        <div className="qa-submit-container">
          {/* Left mascots */}
          <div className="qa-submit-mascots-left">
            <img src={stomach1Img} alt="Stomach mascot" className="qa-submit-mascot qa-submit-mascot-top" />
            <img src={stomach2Img} alt="Stomach mascot" className="qa-submit-mascot qa-submit-mascot-bottom" />
          </div>

          {/* Center content */}
          <div className="qa-submit-content">
            <h2 className="qa-submit-title">Bạn không thấy câu hỏi của mình?</h2>
            <p className="qa-submit-subtitle">
              Nhập câu hỏi tại đây, tụi mình sẽ phản hồi qua email hoặc cập nhật lên danh sách nhé!
            </p>
            <form className="qa-submit-form" onSubmit={handleSubmitQuestion}>
              <input
                className="qa-submit-input"
                placeholder="Email của bạn"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              <input
                className="qa-submit-input"
                placeholder="Ví dụ: Đau thượng vị về đêm có nguy hiểm không?"
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={isSubmitting}
              />
              <button 
                className="qa-submit-button" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Đang gửi...' : 'Gửi ngay'} 
                <span className="material-symbols-outlined">send</span>
              </button>
            </form>
            {submitMessage && (
              <div className={`qa-submit-message qa-submit-message-${submitMessage.type}`}>
                {submitMessage.text}
              </div>
            )}
            <p className="qa-submit-note">
              Câu hỏi của bạn sẽ được đội ngũ chuyên gia phản hồi trong 24h.
            </p>
          </div>

          {/* Right mascots */}
          <div className="qa-submit-mascots-right">
            <img src={stomach3Img} alt="Stomach mascot" className="qa-submit-mascot qa-submit-mascot-top" />
            <img src={stomach4Img} alt="Stomach mascot" className="qa-submit-mascot qa-submit-mascot-bottom" />
          </div>
        </div>
      </div>

      {/* Answer Modal */}
      {selectedQuestion !== null && (
        <AnswerModal
          question={questions[selectedQuestion]}
          answer={answers[selectedQuestion]}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default QandA;
