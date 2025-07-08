import React, { useState } from 'react';
import { HelpCircle, Mail, Smartphone, MessageCircle } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import './Help.css';

const faqs = [
  {
    q: 'How do I create an account?',
    a: 'Click "Create Account" on the homepage, fill in the form, and confirm via email.',
  },
  {
    q: 'Forgot password?',
    a: 'Use the "Forgot Password" link on the login page and follow the reset instructions.',
  },
  {
    q: 'How do I monitor farm sensors?',
    a: 'Once logged in, go to Dashboard to view live data from your sensors.',
  },
];

const HelpPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="help-page">
      <Header />

      <header>
        <div className="header-content">
          <div className="header-icon"><HelpCircle /></div>
          <div className="header-text">
            <h1>Help & Support</h1>
            <p>We're here for you!</p>
          </div>
        </div>
      </header>

      <main>
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((item, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? 'open' : ''}`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <h3>{item.q}</h3>
              {openIndex === i && <p>{item.a}</p>}
            </div>
          ))}
        </section>

        <section className="contact-section">
          <h2>Need More Help?</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon"><Mail /></div>
              <div className="contact-text">
                <h4>Email Us</h4>
                <p>
                  <a href="mailto:fondzenyuycecile@gmail.com" className="contact-link">
                    fondzenyuycecile@gmail.com
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-card">
              <div className="contact-icon"><Smartphone /></div>
              <div className="contact-text">
                <h4>Call Us</h4>
                <p>
                  <a href="tel:+237679568569" className="contact-link">
                    +237 679 568 569
                  </a>
                </p>
              </div>
            </div>
          </div>

          <button className="chat-button">
            <MessageCircle className="chat-icon" /> Chat with Support
          </button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HelpPage;
