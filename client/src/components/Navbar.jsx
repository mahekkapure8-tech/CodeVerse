import { Link } from "react-router-dom";
import "./Navbar.css";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  return (
    <nav className="navbar">

      <h2 className="logo">💻 CodeVerse</h2>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/practice">Practice</Link>
        </li>
<li>
    <Link to="/profile">Profile</Link>
</li>
        <li>
          <Link to="/quiz">Quiz</Link>
        </li>

        <li>
          <Link to="/bookmarks">⭐ Bookmarks</Link>
        </li>

        <li>
          <Link to="/login">👤 Login</Link>
        </li>

      </ul>
<button onClick={toggleTheme}>
    {darkMode ? "☀️" : "🌙"}
</button>
    </nav>
  );
}

export default Navbar;