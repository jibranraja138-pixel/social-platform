import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <h2>SocialHub</h2>

      <div>
        <Link to="/">Home</Link>

        {user && <Link to="/feed">Feed</Link>}

        {user && <Link to="/profile">Profile</Link>}

        {!user && <Link to="/login">Login</Link>}

        {!user && <Link to="/register">Register</Link>}

        {user && (
          <button onClick={logout}>
            Logout
          </button>
        )}

        <button onClick={toggleTheme}>
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;