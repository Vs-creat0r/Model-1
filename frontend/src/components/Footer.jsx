import './Footer.css';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          Made with <Heart size={16} color="var(--primary-color)" className="heart-icon" /> for Indian Food Lovers
        </p>
        <p className="copyright">&copy; {new Date().getFullYear()} Indian Recipes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
