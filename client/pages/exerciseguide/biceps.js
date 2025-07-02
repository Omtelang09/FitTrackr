// File: client/pages/exercise-guide/abs.js
import styles from '../../styles/ExerciseGuide.module.css';
import Image from 'next/image';
import Link from 'next/link';

const absExercises = [
  {
    name: "Alternate Hammer Curl",
    primary: "Biceps",
    secondary: "Forearms",
    equipment: "Dumbbell",
    image: "/biceps1.png"
  },
  {
    name: "	Concentration Curls",
    primary: "Biceps",
    secondary: "Forearms",
    equipment: "Dumbbell",
    image: "/biceps2.png"
  },
  {
    name: "	One Arm Dumbbell Preacher Curl",
    primary: "Biceps",
    secondary: "Forearms",
    equipment: "Dumbbell",
    image: "/biceps3.png"
  },
  {
    name: "Spider Curl",
    primary: "Biceps",
    secondary: "Forearms",
    equipment: "Dumbbell",
    image: "/biceps4.png"
  }
];

export default function AbsGuide() {
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

      <div className={styles.guideWrapper}>
        <h1 className={styles.title}>Biceps Exercises</h1>

        {/* Use the cardContainer to center the cards and add spacing */}
        <div className={styles.cardContainer}>
          {absExercises.map((exercise, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.imageSection}>
                <Image
                  src={exercise.image}
                  alt={exercise.name}
                  width={80}
                  height={140}
                />
              </div>
              <div className={styles.detailsSection}>
                <p className={styles.exerciseTitle}>{exercise.name}</p>
                <p><strong>Primary Muscle:</strong> <span className={styles.link}>{exercise.primary}</span></p>
                <p><strong>Secondary Muscle:</strong> {exercise.secondary}</p>
                <p><strong>Equipment Type:</strong> <span className={styles.link}>{exercise.equipment}</span></p>
              </div>
            </div>
          ))}
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
