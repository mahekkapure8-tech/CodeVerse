import { Link } from "react-router-dom";
import "./DailyChallenge.css";

function DailyChallenge() {
    return (
        <div className="daily-challenge">

            <h2>🔥 Daily Challenge</h2>

            <h3>Reverse String</h3>

            <span className="challenge-difficulty">
                🟢 Easy
            </span>

            <p>
                Complete today's challenge and earn
                <strong> +20 XP</strong>
            </p>

            <Link to="/question/2">
                <button className="challenge-btn">
                    Solve Now 🚀
                </button>
            </Link>

        </div>
    );
}

export default DailyChallenge;