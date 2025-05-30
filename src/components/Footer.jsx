import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section footer-about">
          <h3>Haber Sitesi</h3>
          <p>
            Bu haber sitesi resmi bir kaynak değildir.
          </p>
          <div className="footer-nav">
            <Link to="/about">Hakkında</Link>
            <Link to="/contact">İletişim</Link>
          </div>
        </div>
        <div className="footer-section footer-contact">
          <h3>İletişim</h3>
          <p><i className="fas fa-envelope"></i> info@habersitesi.com</p>
          <p><i className="fas fa-phone"></i> +90 555 123 45 67</p>
          <p><i className="fas fa-map-marker-alt"></i> İstanbul, Türkiye</p>
          <div className="footer-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3010.3230136321286!2d28.97514731543164!3d41.00823797930094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9c08c8b8e55%3A0x1f2e6f6f6f6f6f6f!2sIstanbul%2C%20Turkey!5e0!3m2!1sen!2str!4v1634567890123"
              allowFullScreen=""
              loading="lazy"
              title="Konumumuz"
            ></iframe>
          </div>
        </div>
        <div className="footer-section footer-social">
          <h3>Bizi Takip Edin</h3>
          <div className="social-links">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          <h3>Haber Bülteni</h3>
          <form className="newsletter-form">
            <input type="email" placeholder="E-posta adresiniz" />
            <button type="submit">Abone Ol</button>
          </form>
        </div>
      </div>
      <p className="copyright">
        © 2025 <span>Haber Sitesi</span>. LoL severim
      </p>
    </footer>
  );
}

export default Footer;
