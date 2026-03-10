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
              Chiến dịch truyền thông gia tăng nhận thức về mức độ nghiêm trọng của bệnh lý dạ dày cho người trẻ từ 18 đến 24 tuổi tại TP. Hồ Chí Minh.
            </p>
          </div>
          <div>
            <h4 className="footer-title">Điều hướng</h4>
            <ul className="footer-links">
              <li><a href="#">Trang chủ</a></li>
              <li><a href="#about">Về chúng tôi</a></li>
              <li><a href="#qa">Hỏi đáp (Q&A)</a></li>
              <li><a href="#test">Bài kiểm tra</a></li>
              <li><a href="#contact">Liên hệ</a></li>
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
              <a href="https://www.facebook.com/share/1KsGXpacyw/" className="social-link" title="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://www.tiktok.com/@emda_mode?_r=1&_t=ZS-94Yvzljq3Sn" className="social-link" title="TikTok" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="https://www.instagram.com/emda_mode?igsh=MWt1eDAwOXI1MHJp" className="social-link" title="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
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
            Được phát triển với ❤️ bởi đội ngũ sinh viên IT FPT University.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
