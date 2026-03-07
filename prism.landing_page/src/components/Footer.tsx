import Logo from '../assets/Images/Logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-about">
            <div className="footer-logo">
              <img src={Logo} alt="Êm Dạ Mode Logo" className="footer-logo-icon" />
              <span className="footer-logo-text">ÊM DẠ MODE</span>
            </div>
            <p className="footer-description">
              Bật mode "Êm Dạ", nhịp sống mượt mà! Chiến dịch nâng cao nhận thức về sức khỏe dạ dày dành cho giới trẻ.
            </p>
          </div>
          <div>
            <h4 className="footer-title">Điều hướng</h4>
            <ul className="footer-links">
              <li><a href="#">Trang chủ</a></li>
              <li><a href="#about">Về chúng tôi</a></li>
              <li><a href="#qa">Hỏi đáp (Q&A)</a></li>
              <li><a href="#test">Bài kiểm tra</a></li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Thông tin liên hệ</h4>
            <ul className="footer-contact">
              <li>
                <span className="material-symbols-outlined">phone</span>
                0815398633
              </li>
              <li>
                <span className="material-symbols-outlined">mail</span>
                prismproject.fptu@gmail.com
              </li>
              <li>
                <span className="material-symbols-outlined">person</span>
                hanhndmss180820@fpt.edu.vn
              </li>
            </ul>
          </div>
          <div>
            <h4 className="footer-title">Kết nối với chúng tôi</h4>
            <div className="footer-team">
              <div className="footer-social">
              <a href="#" className="social-link">
                <span className="material-symbols-outlined">public</span>
              </a>
              <a href="#" className="social-link">
                <span className="material-symbols-outlined">photo_camera</span>
              </a>
              <a href="#" className="social-link">
                <span className="material-symbols-outlined">mail</span>
              </a>
            </div>
              <p className="footer-team-subtitle">
                Dự án tốt nghiệp
              </p>
              <p className="footer-team-subtitle">
                Đại học FPT
              </p>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            © 2026 ÊM DẠ MODE. All Rights Reserved. <br />
            Được phát triển với ❤️ bởi đội ngũ sinh viên FPT University.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
