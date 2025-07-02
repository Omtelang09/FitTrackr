import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/logworkout.module.css';
import Link from 'next/link';

export default function LogWorkout() {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const router = useRouter();
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("user")) : null;

  const handleSubmit = async () => {
    if (!user) return alert("Please log in");
    if (!type || !duration || !date) return alert("Please fill all fields");

    try {
      const res = await fetch('http://localhost:5000/api/workouts/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user._id,
          type,
          duration: Number(duration),
          date
        })
      });

      if (res.ok) {
        alert("Workout logged!");
        router.push("/dashboard");
      } else {
        alert("Error logging workout.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
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
        <div className={styles.card}>
          <h2 className={styles.title}>Log a Workout</h2>
          <input
            type="text"
            placeholder="Workout Type (e.g. Cardio, Yoga)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Duration (minutes)"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className={styles.input}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSubmit} className={styles.button}>Submit</button>
          <p style={{ textAlign: "center" }}>
            <a href="/dashboard">Back</a>
          </p>

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
