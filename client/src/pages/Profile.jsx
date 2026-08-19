import "./Profile.css";

function Profile() {

    const user = {
        name: "Mahek",
        level: 1,
        xp: 100,
        solved: 4,
        bookmarks: 2,
        achievements: 4
    };

    return (

        <div className="profile-page">

            <div className="profile-card">

                <div className="avatar">
                    👩🏻‍💻
                </div>

                <h1>{user.name}</h1>

                <h3>Level {user.level}</h3>

                <h2>⭐ XP : {user.xp}</h2>

                <div className="profile-xp-bar">

                    <div
                        className="profile-xp-fill"
                        style={{ width: `${user.xp}%` }}
                    ></div>

                </div>

                <div className="profile-stats">

                    <div>
                        <h2>{user.solved}</h2>
                        <p>Solved</p>
                    </div>

                    <div>
                        <h2>{user.bookmarks}</h2>
                        <p>Bookmarks</p>
                    </div>

                    <div>
                        <h2>{user.achievements}</h2>
                        <p>Achievements</p>
                    </div>

                </div>

                <button className="edit-btn">
                    ✏ Edit Profile
                </button>

            </div>

        </div>

    );

}

export default Profile;