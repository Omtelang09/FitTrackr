import { useState } from 'react';
import styles from '../styles/faq.module.css';
import Link from 'next/link';

const faqs = [
  {
    question: "What is FitTrackr?",
    answer: "FitTrackr is a fitness tracking app that allows you to log and monitor your workouts for free."
  },
  {
    question: "How does FitTrackr work?",
    answer: "You can sign up, log your workouts, track progress with charts, and stay on top of your fitness goals."
  },
  {
    question: "Can I track more than one activity?",
    answer: "Yes, you can log multiple types of workouts such as cardio, strength training, yoga, and more."
  },
  {
    question: "How often is FitTrackr updated?",
    answer: "We regularly update our system with new features and improvements based on user feedback."
  },
  {
    question: "Will FitTrackr share my information with other companies?",
    answer: "No, your data is private and secure. We do not share your information with third parties."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="main-wrapper">
      {/* ✅ Navigation Bar */}
      <header className="navbar">
        <nav>
          <div className="logo">
            <img src="/logo.png" alt="Logo" className="logo-img" />
          </div>
          <ul>
            <li><Link href="/">Home</Link></li>

            <li className="dropdown">
              <span>Exercise Guide ▾</span>
              <ul className="dropdown-menu">
                <li><Link href="/exerciseguide/abs">Abs</Link></li>
                <li><Link href="/exerciseguide/back">Back</Link></li>
                <li><Link href="/exerciseguide/biceps">Biceps</Link></li>
                <li><Link href="/exerciseguide/chest">Chest</Link></li>
                <li><Link href="/exerciseguide/legs">Legs</Link></li>

              </ul>
            </li>

            <li><Link href="/faq">FAQ</Link></li>
            <li><Link href="/login">Login</Link></li>
          </ul>
        </nav>
      </header>

      <div className={styles.container}>
        <h1 className={styles.header}>Frequently Asked Questions</h1>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div key={index} className={styles.faqItem}>
              <div className={styles.question} onClick={() => toggleFAQ(index)}>
                {faq.question}
                <span className={styles.symbol}>{openIndex === index ? "-" : "+"}</span>
              </div>
              {openIndex === index && (
                <div className={styles.answer}>{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        <div className={styles.contactBox}>
          <h3>Still can't find the answer?</h3>
          <p>Drop us an Email</p>
          <div className={styles.emailBox}>
            <img src="/logo.png" alt="email" className={styles.icon} />
            <a href="mailto:mail@fittrackr.com">mail@fittrackr.com</a>
          </div>
        </div>
      </div>
      {/* ✅ Footer */}
      <footer>
        <div className="footer-grid">
          <div>
            <h4>Exercise Guide</h4>
            <ul>
              <li><Link href="/exerciseguide/abs">Abs</Link></li>
              <li><Link href="/exerciseguide/back">Back</Link></li>
              <li><Link href="/exerciseguide/biceps">Biceps</Link></li>
              <li><Link href="/exerciseguide/chest">Chest</Link></li>
              <li><Link href="/exerciseguide/legs">Legs</Link></li>

            </ul>
          </div>
          <div>
            <h4>Resources</h4>
            <ul>
              <li>FAQ</li>
              <li>Contact</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
          <div>
            <h4>About FitTrackr</h4>
            <p>
              Track workouts, monitor progress, and stay motivated. Your fitness journey starts here.
            </p>
          </div>
        </div>
      </footer>
    </div>



  );
}
