import { useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import QandA from './QandA';
import './HomePage.css';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isScrollingProgrammatically = useRef(false);
  const isNavigatingFromScrollSpy = useRef(false);

  // Listen for header nav clicks (when clicking same page link)
  useEffect(() => {
    const handleHeaderNavClick = () => {
      isScrollingProgrammatically.current = true;
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 1500);
    };

    window.addEventListener('headerNavClick', handleHeaderNavClick);
    return () => window.removeEventListener('headerNavClick', handleHeaderNavClick);
  }, []);

  useEffect(() => {
    // Map pathname to section IDs
    const sectionMap: Record<string, string> = {
      '/aboutus': 'about',
      '/qa': 'qa',
      '/test': 'test'
    };

    const sectionId = sectionMap[location.pathname];
    
    // Don't scroll if navigation came from scroll spy
    if (isNavigatingFromScrollSpy.current) {
      isNavigatingFromScrollSpy.current = false;
      return;
    }
    
    if (sectionId) {
      // Scrolling to a section
      isScrollingProgrammatically.current = true;
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Reset flag after scroll completes (longer timeout for smooth scroll)
          setTimeout(() => {
            isScrollingProgrammatically.current = false;
          }, 1500);
        }
      }, 100);
    } else if (location.pathname === '/') {
      // Only scroll to top if this is from a user click, not from scroll spy
      isScrollingProgrammatically.current = true;
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Reset flag after scroll completes (longer timeout for smooth scroll)
      setTimeout(() => {
        isScrollingProgrammatically.current = false;
      }, 1500);
    }
  }, [location.pathname]);

  // Scroll spy - track visible section and update URL
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingProgrammatically.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'about' && location.pathname !== '/aboutus') {
            isNavigatingFromScrollSpy.current = true;
            navigate('/aboutus', { replace: true });
          } else if (entry.target.id === 'qa' && location.pathname !== '/qa') {
            isNavigatingFromScrollSpy.current = true;
            navigate('/qa', { replace: true });
          } else if (entry.target.id === 'test' && location.pathname !== '/test') {
            isNavigatingFromScrollSpy.current = true;
            navigate('/test', { replace: true });
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe sections
    const aboutSection = document.getElementById('about');
    const qaSection = document.getElementById('qa');
    const testSection = document.getElementById('test');
    
    if (aboutSection) {
      observer.observe(aboutSection);
    }
    if (qaSection) {
      observer.observe(qaSection);
    }
    if (testSection) {
      observer.observe(testSection);
    }

    // Handler for scrolling back to top
    const handleScroll = () => {
      if (isScrollingProgrammatically.current) return;
      
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        // If about section is below viewport (user scrolled above it)
        if (rect.top > window.innerHeight * 0.3 && location.pathname !== '/') {
          isNavigatingFromScrollSpy.current = true;
          navigate('/', { replace: true });
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname, navigate]);

  return (
    <>
      <Header />
      <main>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <h1 className="hero-title">ÊM DẠ MODE</h1>
          <h2 className="hero-subtitle">
            Bật mode "Êm Dạ", nhịp sống mượt mà!
          </h2>
          <p className="hero-description">
            Chiến dịch truyền thông gia tăng nhận thức về mức độ nghiêm trọng của bệnh lý dạ dày cho người trẻ từ 18 đến 24 tuổi tại TP. Hồ Chí Minh.
          </p>
          <div className="hero-actions">
            <Link to="/qa" className="btn-hero btn-orange">
              🧠 Q&A Nhanh
            </Link>
            <Link to="/test" className="btn-hero btn-red">
              🧪 BÀI TEST DẠ DÀY
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Vấn đề dạ dày đang được <span className="text-primary">trẻ hoá</span> một cách rõ rệt
            </h2>
            <p className="section-subtitle">
              Các vấn đề dạ dày đang tăng và xuất hiện nhiều ở nhóm trẻ, ảnh hưởng trực tiếp đến chất lượng cuộc sống hàng ngày.
            </p>
          </div>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <span className="material-symbols-outlined stat-icon">groups</span>
              </div>
              <div className="stat-value">5-10 triệu</div>
              <p className="stat-description">người mắc GERD</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <span className="material-symbols-outlined stat-icon">percent</span>
              </div>
              <div className="stat-value">15-20%</div>
              <p className="stat-description">dân số mắc viêm loét dạ dày</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <span className="material-symbols-outlined stat-icon">coronavirus</span>
              </div>
              <div className="stat-value">Khoảng 70%</div>
              <p className="stat-description">dân số có thể nhiễm vi khuẩn HP</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrapper">
                <span className="material-symbols-outlined stat-icon">trending_up</span>
              </div>
              <div className="stat-value">Top 18/20</div>
              <p className="stat-description">quốc gia tỷ lệ ung thư dạ dày cao nhất</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="features-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">
              Tại sao chọn <span className="text-primary">ÊM DẠ MODE</span>?
            </h2>
            <p className="section-subtitle">
              Chúng tôi mang đến giải pháp toàn diện cho sức khỏe dạ dày của bạn, giúp bạn tận hưởng cuộc sống mượt mà nhất.
            </p>
          </div>
        </div>
      </section>

      {/* About Project Section */}
      <section className="about-project-section" id="about">
        <div className="section-container">
          <div className="about-project-grid">
            <div className="about-project-image">
              <img src="./src/assets/Images/Aboutv2.jpg" alt="Êm Dạ Mode Project" />
            </div>
            <div className="about-project-content">
              <h2 className="about-project-title">
                <span className="title-bar"></span>
                Về dự án</h2>
              <div className="about-card-content">
                <p>
                  <strong className="text-highlight">ÊM DẠ MODE</strong> là chiến dịch truyền thông xã hội được phát triển bởi nhóm sinh viên Đại học FPT như một dự án tốt nghiệp. Dự án ra đời từ nhận thức về tình trạng các vấn đề dạ dày ngày càng phổ biến trong giới trẻ, đặc biệt là sinh viên.
                </p>
                <p>
                  Với sứ mệnh nâng cao nhận thức về sức khỏe dạ dày, chúng tôi mong muốn mang đến cho cộng đồng những kiến thức y khoa chính xác, dễ hiểu và các công cụ hữu ích để tự đánh giá và cải thiện sức khỏe.
                </p>
                <p>
                  Thông qua các hoạt động truyền thông sáng tạo, nội dung giáo dục và công cụ tương tác, <strong className="text-highlight">ÊM DẠ MODE</strong> hướng đến việc tạo ra những thay đổi tích cực trong lối sống và thói quen chăm sóc sức khỏe của người trẻ.
                </p>
              </div>
              {/* <a href="/about" className="btn-about-details">
                Thông tin chi tiết
              </a> */}
            {/* <Link className="btn-about-details" to="/about">Thông tin chi tiết</Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="journey-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Hành trình 3 giai đoạn</h2>
            <p className="section-subtitle">
              Từ nhận thức đến hành động - Cùng bạn xây dựng thói quen chăm sóc dạ dày bền vững
            </p>
          </div>
          <div className="journey-grid">
            <div className="journey-card">
              <div className="journey-icon journey-icon-orange">
                <span className="material-symbols-outlined">visibility</span>
              </div>
              <h3 className="journey-title">Nhận thức</h3>
              <p className="journey-label">AWARENESS</p>
              <p className="journey-description">
                Nâng cao nhận thức về tầm quan trọng của sức khỏe dạ dày, giúp sinh viên và người trẻ hiểu rõ các dấu hiệu cảnh báo và nguyên nhân gây bệnh.
              </p>
            </div>
            <div className="journey-card">
              <div className="journey-icon journey-icon-red">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <h3 className="journey-title">Kiến thức</h3>
              <p className="journey-label">KNOWLEDGE</p>
              <p className="journey-description">
                Cung cấp kiến thức y khoa chính xác, dễ hiểu về các vấn đề dạ dày phổ biến, cách phòng tránh và điều trị hiệu quả từ các chuyên gia.
              </p>
            </div>
            <div className="journey-card">
              <div className="journey-icon journey-icon-primary">
                <span className="material-symbols-outlined">bolt</span>
              </div>
              <h3 className="journey-title">Hành động</h3>
              <p className="journey-label">ACTION</p>
              <p className="journey-description">
                Khuyến khích thay đổi lối sống tích cực, cung cấp công cụ tự đánh giá và hướng dẫn cụ thể để cải thiện sức khỏe dạ dày ngay hôm nay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Idea Section */}
      <section className="creative-section">
        <div className="section-container">
          <div className="about-card">
            <div className="creative-header">
              <div className="creative-icon">
                <span className="material-symbols-outlined">lightbulb</span>
              </div>
              <h2 className="about-card-title">Ý tưởng sáng tạo</h2>
            </div>
            <div className="about-card-content">
              <p className="creative-slogan">
                <strong className="text-highlight">"Bật mode Êm Dạ, nhịp sống mượt mà"</strong> - Đây là thông điệp cốt lõi của chiến dịch, được xây dựng dựa trên insight rằng giới trẻ thường xuyên phải "chuyển đổi mode" trong cuộc sống: mode học tập, mode giải trí, mode làm việc...
              </p>
              <p>
                Chúng tôi muốn tạo ra một "mode" mới - <strong className="text-highlight">ÊM DẠ MODE</strong> - một trạng thái mà ở đó, dạ dày được chăm sóc tốt, cơ thể khỏe mạnh, và cuộc sống trở nên "mượt mà" hơn.
              </p>
              <p>
                Thông qua ngôn ngữ gần gũi, hình ảnh trẻ trung và các hoạt động tương tác, chúng tôi mong muốn biến việc chăm sóc sức khỏe dạ dày từ một "gánh nặng" thành một thói quen tự nhiên, dễ dàng và thú vị.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Đội ngũ thực hiện</h2>
            <p className="section-subtitle">
              Những con người đầy nhiệt huyết đằng sau dự án ÊM DẠ MODE
            </p>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar team-avatar-primary">N</div>
              <h3 className="team-name">Nguyễn Đặng Mỹ Hạnh</h3>
              <p className="team-role">Project Leader</p>
            </div>
            <div className="team-card">
              <div className="team-avatar team-avatar-orange">Đ</div>
              <h3 className="team-name">Đặng Anh Hào</h3>
              <p className="team-role">Planning Leader</p>
            </div>
            <div className="team-card">
              <div className="team-avatar team-avatar-primary">L</div>
              <h3 className="team-name">Lê Nguyễn Mai Thảo</h3>
              <p className="team-role">Communications Leader</p>
            </div>
          </div>
          <div className="team-grid team-grid-secondary">
            <div className="team-card">
              <div className="team-avatar team-avatar-primary">N</div>
              <h3 className="team-name">Nguyễn Thị Thanh Thảo</h3>
              <p className="team-role">Production Leader</p>
            </div>
            <div className="team-card">
              <div className="team-avatar team-avatar-primary">P</div>
              <h3 className="team-name">Phan Thị Trà My</h3>
              <p className="team-role">Event Leader</p>
            </div>
          </div>
        </div>
      </section>

      {/* Q&A Section */}
      <QandA />

      {/* Test Section */}
      <section className="test-section" id="test">
        <div className="test-container">
          <div className="test-card">
            {/* Decorative backgrounds */}
            <div className="test-bg test-bg-1"></div>
            <div className="test-bg test-bg-2"></div>
            
            {/* Content */}
            <div className="test-content">
              <h2 className="test-title">Dạ dày của bạn đang ở Level nào?</h2>
              <p className="test-description">
                Làm bài test 3 phút trước khi cơn đau pop-up lần nữa!
              </p>
              
              <div className="test-benefits">
                <h3 className="test-benefits-title">Bài test này sẽ giúp bạn:</h3>
                <ul className="test-list">
                  <li className="test-item">
                    <div className="test-icon">
                      <span className="material-symbols-outlined">check</span>
                    </div>
                    <p className="test-text">Đánh giá mức độ nghiêm trọng của các triệu chứng dạ dày</p>
                  </li>
                  <li className="test-item">
                    <div className="test-icon">
                      <span className="material-symbols-outlined">check</span>
                    </div>
                    <p className="test-text">Nhận biết các yếu tố nguy cơ từ lối sống</p>
                  </li>
                  <li className="test-item">
                    <div className="test-icon">
                      <span className="material-symbols-outlined">check</span>
                    </div>
                    <p className="test-text">Nhận lời khuyên cụ thể để cải thiện sức khỏe</p>
                  </li>
                </ul>
              </div>

              <div className="test-actions">
                <Link to="/test-start" state={{ autoStart: true }} className="btn-test-start">
                  <span className="material-symbols-outlined">play_arrow</span>
                  Bắt đầu test ngay
                </Link>
                
                <p className="test-disclaimer">
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
};

export default HomePage;
