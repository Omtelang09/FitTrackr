import Link from 'next/link';

export default function Home() {
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

      {/* ✅ Hero Section */}
      <section className="hero hero-white">
        <div>
          <h1>Start Your Fitness Journey Today</h1>
          <ul>
            <li>✔ Set Your Goals</li>
            <li>✔ Track Your Workout</li>
            <li>✔ Log Your Progress</li>
            <li>✔ Get Your Results</li>
          </ul>
          <Link href="/register">
            <button>Join Today</button>
          </Link>
        </div>
        <div>
          <img src="/workout.png" alt="Workout" />
        </div>
      </section>

      {/* ✅ Motivation Strip */}
      <section className="motivation">
        DID YOU KNOW? YOU ARE TWICE AS LIKELY TO REACH YOUR GOALS IF YOU TRACK YOUR PROGRESS!
      </section>

      {/* ✅ Features Section */}
      <section className="features">
        <div className="feature-grid">
          <div>
            <div className="emoji">💪</div>
            <h3>20+ Exercises</h3>
            <p>Our exercise guide has over 20 exercises with photos and descriptions.</p>
          </div>
          <div>
            <div className="emoji">📱</div>
            <h3>Mobile Friendly</h3>
            <p>Optimized for all devices and synced with the cloud.</p>
          </div>
          <div>
            <div className="emoji">📊</div>
            <h3>Beautiful Charts</h3>
            <p>Track progress visually and gain deep insights.</p>
          </div>
        </div>
      </section>

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
