import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="container contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p style={{ color: 'var(--text-light)', marginTop: '10px' }}>We'd love to hear from you. Send us your feedback or questions.</p>
      </div>

      <div className="contact-form-container glass">
        {status === 'success' && (
          <div className="alert success">Message sent successfully! We will get back to you soon.</div>
        )}
        {status === 'error' && (
          <div className="alert error">Failed to send message. Please try again.</div>
        )}
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your Email" />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Your Phone Number" />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required placeholder="Your Message" rows="5"></textarea>
          </div>
          <button type="submit" className="btn hover-lift" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
