import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../assets/Images/LogoV2.png';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleNavClick = (path: string, sectionId?: string) => {
    return (e: React.MouseEvent<HTMLAnchorElement>) => {
      // If already on the same path, scroll to the target
      if (location.pathname === path) {
        e.preventDefault();
        
        // Dispatch event to notify HomePage about programmatic scroll
        window.dispatchEvent(new CustomEvent('headerNavClick', { 
          detail: { path, sectionId } 
        }));
        
        if (sectionId) {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
      // Otherwise, let the Link navigate normally
    };
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo" onClick={handleNavClick('/')}>
            <img src={Logo} alt="Êm Dạ Mode Logo" className="logo-icon" />
            {/* <span className="logo-text">ÊM DẠ MODE</span> */}
          </Link>
          <nav className="nav">
            <Link 
              className={`nav-link ${isActive('/') ? 'active' : ''}`} 
              to="/"
              onClick={handleNavClick('/')}
            >
              Trang chủ
            </Link>
            <Link 
              className={`nav-link ${isActive('/aboutus') ? 'active' : ''}`} 
              to="/aboutus"
              onClick={handleNavClick('/aboutus', 'about')}
            >
              About us
            </Link>
            <Link 
              className={`nav-link ${isActive('/qa') ? 'active' : ''}`} 
              to="/qa"
              onClick={handleNavClick('/qa', 'qa')}
            >
              Q&A
            </Link>
            <Link 
              className={`nav-link ${isActive('/test') ? 'active' : ''}`} 
              to="/test"
              onClick={handleNavClick('/test', 'test')}
            >
              Test
            </Link>
            <Link 
              className={`nav-link ${isActive('/contact') ? 'active' : ''}`} 
              to="/contact"
              onClick={handleNavClick('/contact', 'contact')}
            >
              Liên hệ
            </Link>
          </nav>
          <div className="header-actions">
            <Link 
              className="btn-cta" 
              to="/test"
              onClick={handleNavClick('/test', 'test')}
            >
              <span className="material-symbols-outlined">bolt</span>
              LÀM TEST NGAY
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
