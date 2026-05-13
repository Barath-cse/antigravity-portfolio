import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <p className="footer-copy">
            © {year} <span className="gradient-text">Manickavasagam S</span> — Engineered in zero gravity.
          </p>
          <div className="footer-links">
            <a href="https://linkedin.com/in/manickavasagam-s-794174291" target="_blank" rel="noreferrer" className="footer-link">
              LinkedIn
            </a>
            <a href="mailto:manickavasagam1359@gmail.com" className="footer-link">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
