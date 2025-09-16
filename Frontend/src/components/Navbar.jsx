import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import authService from "../services/authService";
import { clearProfile } from "../store/userSlice";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(clearProfile());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  
  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="brand">SaaS Notes</h2>

        <NavLink
          to="/notes"
          className={({ isActive }) => (isActive ? "navlink active" : "navlink")}
        >
          My Notes
        </NavLink>

        {user.role === "admin" && (
          <NavLink
            to="/invites"
            className={({ isActive }) =>
              isActive ? "navlink active" : "navlink"
            }
          >
            Invites
          </NavLink>
        )}

        {user.role === "admin" && user.plan === "free" && (
          <NavLink
            to="/upgrade"
            className={({ isActive }) =>
              isActive ? "navlink active" : "navlink"
            }
          >
            Upgrade Plan
          </NavLink>
        )}

        
      </div>

      <div className="navbar-right">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
              isActive ? "navlink active" : "navlink"
          }
        >
          My Profile
        </NavLink>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;