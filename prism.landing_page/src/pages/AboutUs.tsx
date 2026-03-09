import Header from '../components/Header';
import Footer from '../components/Footer';
import './AboutUs.css';
import myHanhImg from '../assets/Images/MyHanh.jpeg';
import anhHaoImg from '../assets/Images/AnhHao.jpg';
import maiThaoImg from '../assets/Images/MaiThao.jpg';
import thanhThaoImg from '../assets/Images/ThanhThao.jpg';
import traMyImg from '../assets/Images/TraMy.jpg';

const AboutUs = () => {
  return (
    <>
      <Header />
      <main className="about-us-page">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-container">
            <h1 className="about-hero-title">VỀ ÊM DẠ MODE</h1>
            <p className="about-hero-subtitle">
              Một dự án tốt nghiệp đầy tâm huyết từ sinh viên Đại học FPT
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="about-intro-section">
          <div className="section-container">
            <div className="about-card">
              <h2 className="about-card-title">
                <span className="title-bar"></span>
                Giới thiệu dự án
              </h2>
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
                <img src={myHanhImg} alt="Nguyễn Đặng Mỹ Hạnh" className="team-avatar" />
                <h3 className="team-name">Nguyễn Đặng Mỹ Hạnh</h3>
                <p className="team-role">Project Leader</p>
              </div>
              <div className="team-card">
                <img src={anhHaoImg} alt="Đặng Anh Hào" className="team-avatar" />
                <h3 className="team-name">Đặng Anh Hào</h3>
                <p className="team-role">Planning Leader</p>
              </div>
              <div className="team-card">
                <img src={maiThaoImg} alt="Lê Nguyễn Mai Thảo" className="team-avatar" />
                <h3 className="team-name">Lê Nguyễn Mai Thảo</h3>
                <p className="team-role">Communications Leader</p>
              </div>
            </div>
            <div className="team-grid team-grid-secondary">
              <div className="team-card">
                <img src={thanhThaoImg} alt="Nguyễn Thị Thanh Thảo" className="team-avatar" />
                <h3 className="team-name">Nguyễn Thị Thanh Thảo</h3>
                <p className="team-role">Production Leader</p>
              </div>
              <div className="team-card">
                <img src={traMyImg} alt="Phan Thị Trà My" className="team-avatar" />
                <h3 className="team-name">Phan Thị Trà My</h3>
                <p className="team-role">Event Leader</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default AboutUs;
