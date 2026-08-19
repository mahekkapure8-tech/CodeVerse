import "./Achievements.css";

function Achievements({ xp }) {

    return (

        <div className="achievement-box">

            <h2>🏆 Achievements</h2>

            {xp >= 20 && <p>🏅 First Solve ✅</p>}
{xp >= 40 && <p>⭐ Rising Coder ✅</p>}
{xp >= 60 && <p>🔥 Consistent Learner ✅</p>}
{xp >= 100 && <p>💎 XP Master ✅</p>}
        </div>

    );

}

export default Achievements;