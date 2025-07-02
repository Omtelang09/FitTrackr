import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import Link from "next/link";
import styles from "../styles/dashboard.module.css";

const EXERCISE_PRESETS = {
  Chest: ["Barbell Bench Press", "Cable Crossover", "Chest Dips", "Incline Dumbbell Press"],
  Abs: ["Abdominal 4 Point Drawing In", "Barbell Ab Rollout", "Bent-Knee Hip Raise", "Crunches"],
  Biceps: ["Alternate Hammer Curl", "Concentration Curls", "One Arm Dumbbell Preacher Curl", "Spider Curl"],
  Legs: ["Leg Press", "Barbell Squat", "Seated Leg Curl", "Smith Machine Squat"],
  Back: ["Seated Cable Rows", "Barbell Rear Delt Row", "Back Flys With Resistance Bands", "Hyperextensions (Back Extensions)"]
};

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState("Chest");
  const [selectedExercise, setSelectedExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [customExercises, setCustomExercises] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      fetch(`http://localhost:5000/api/workouts/${parsedUser._id}`)
        .then(res => res.json())
        .then(data => setWorkouts(data));

      fetch(`http://localhost:5000/api/exercises/${parsedUser._id}`)
        .then(res => res.json())
        .then(data => setCustomExercises(data));
    }
  }, []);

  useEffect(() => {
    if (user && workouts.length > 0) {
      const ctx = document.getElementById("progressChart")?.getContext("2d");
      if (ctx) {
        new Chart(ctx, {
          type: "line",
          data: {
            labels: workouts.map(w => new Date(w.date).toLocaleDateString()),
            datasets: [{
              label: "Workout Duration (mins)",
              data: workouts.map(w => w.duration),
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)"
            }]
          }
        });
      }
    }
  }, [user, workouts]);

  const handleAddPresetExercise = async () => {
    if (!selectedExercise || !sets || !reps) {
      alert("Please select an exercise and enter sets and reps.");
      return;
    }

    const newExercise = {
      userId: user._id,
      group: selectedGroup,
      name: selectedExercise,
      sets: Number(sets),
      reps: Number(reps)
    };

    const res = await fetch("http://localhost:5000/api/exercises/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExercise)
    });

    if (res.ok) {
      const savedExercise = await res.json();
      setCustomExercises(prev => [...prev, savedExercise]);
      setSelectedExercise("");
      setSets("");
      setReps("");
    } else {
      alert("Failed to save exercise.");
    }
  };

  const handleDeleteExercise = async (exerciseId) => {
    const res = await fetch(`http://localhost:5000/api/exercises/delete/${exerciseId}`, {
      method: "DELETE"
    });

    if (res.ok) {
      setCustomExercises(prev => prev.filter(ex => ex._id !== exerciseId));
    } else {
      alert("Failed to delete exercise.");
    }
  };

  const handleResetWorkouts = async () => {
    const confirmReset = confirm("Are you sure you want to delete all workouts?");
    if (!confirmReset) return;

    const res = await fetch(`http://localhost:5000/api/workouts/reset/${user._id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      alert("Workout data reset.");
      window.location.reload(); // 🔁 Reloads the page
    } else {
      alert("Failed to reset workouts.");
    }
  };

  if (!user) return <div className={styles.loading}>Loading user...</div>;

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

          </ul>
        </nav>
      </header>

      <div className={styles.dashboardWrapper}>
        <div className={styles.topBar}>
          <h2>Welcome, {user.username}</h2>
          <div className={styles.buttonGroup}>
            <Link href="/logworkout">
              <button className={styles.logBtn}>Log New Workout</button>
            </Link>
            <button
              className={styles.logoutBtn}
              onClick={() => {
                localStorage.removeItem("user");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <div className={styles.customExerciseSection}>
          <h3>Select and Add Preset Exercise</h3>
          <div className={styles.form}>
            <select
              value={selectedGroup}
              onChange={(e) => {
                setSelectedGroup(e.target.value);
                setSelectedExercise("");
              }}
            >
              {Object.keys(EXERCISE_PRESETS).map((group) => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>

            <select
              value={selectedExercise}
              onChange={(e) => setSelectedExercise(e.target.value)}
            >
              <option value="">Select exercise</option>
              {EXERCISE_PRESETS[selectedGroup].map((ex) => (
                <option key={ex} value={ex}>{ex}</option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Sets"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
            />
            <input
              type="number"
              placeholder="Reps"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
            />
            <button onClick={handleAddPresetExercise}>Add Exercise</button>
          </div>

          {customExercises.length > 0 && (
            <div className={styles.exerciseList}>
              <h4>Workout Routine:</h4>
              <ul>
                {customExercises.map((ex) => (
                  <li key={ex._id} className={styles.exerciseItem}>
                    <span><strong>{ex.group}:</strong> {ex.name} — {ex.sets} sets x {ex.reps} reps</span>
                    <button className={styles.deleteBtn} onClick={() => handleDeleteExercise(ex._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.chartCard}>
          <h3>Your Progress</h3>
          <canvas id="progressChart" width="400" height="200"></canvas>
          <button className={styles.resetBtn} onClick={handleResetWorkouts}>Reset Workouts</button>
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
