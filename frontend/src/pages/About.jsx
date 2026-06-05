import { Utensils, Heart, Globe } from 'lucide-react';
import './About.css';

const About = () => {
  return (
    <div className="container about-page">
      <div className="page-header">
        <h1>About Us</h1>
        <p style={{ color: 'var(--text-light)', marginTop: '10px' }}>Discover our mission and love for Indian cuisine.</p>
      </div>

      <div className="about-content">
        <div className="about-text glass">
          <h2>Our Mission</h2>
          <p>
            At Indian Recipes, our mission is to bring the rich, diverse, and authentic flavors of India into your kitchen. We believe that cooking is an art that connects people across cultures, and Indian cuisine, with its vibrant spices and deep history, offers a culinary journey like no other.
          </p>
          <p>
            Whether you are a seasoned chef or a beginner, our carefully curated recipes aim to make traditional Indian cooking accessible, fun, and delicious for everyone.
          </p>
        </div>

        <div className="about-features grid">
          <div className="feature-card glass hover-lift">
            <Utensils size={40} color="var(--primary-color)" />
            <h3>Authentic Recipes</h3>
            <p>Hand-picked recipes from different regions of India, preserving their traditional essence.</p>
          </div>
          <div className="feature-card glass hover-lift">
            <Heart size={40} color="var(--primary-color)" />
            <h3>Made with Love</h3>
            <p>Every recipe is tested and shared with a deep passion for culinary perfection.</p>
          </div>
          <div className="feature-card glass hover-lift">
            <Globe size={40} color="var(--primary-color)" />
            <h3>For Everyone</h3>
            <p>Clear, step-by-step instructions making Indian cooking easy for global food lovers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
