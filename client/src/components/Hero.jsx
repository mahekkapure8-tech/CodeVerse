
// 

import "./Hero.css";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">

      <h1>🚀 Welcome to CodeVerse</h1>

      <p>
        Practice coding problems, take quizzes and improve your programming
        skills.
      </p>

      <div className="hero-stats">

        <div>
          <h2>4+</h2>
          <span>Questions</span>
        </div>

        <div>
          <h2>3+</h2>
          <span>Quizzes</span>
        </div>

        <div>
          <h2>∞</h2>
          <span>Learning</span>
        </div>

      </div>

      <div className="hero-buttons">

        <Link to="/">
          <button className="primary-btn">
            💻 Start Practice
          </button>
        </Link>

        <Link to="/quiz">
          <button className="secondary-btn">
            🧠 Take Quiz
          </button>
        </Link>

      </div>

    </section>
  );
}

export default Hero;  