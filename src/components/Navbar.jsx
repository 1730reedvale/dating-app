import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";
import { getAuth, signOut } from "firebase/auth";

const NavBar = () => {
  const navigate = useNavigate();
  const { currentUser, userData, logout } = useAuth() || {};
  const isPremium = !!userData?.premium;

  const linkStyle = {
    padding: "0.6rem 0.9rem",
    textDecoration: "none",
    color: "white",
    fontSize: "0.95rem",
  };

  const activeStyle = { textDecoration: "underline" };

  const handleLogout = async () => {
    try {
      if (typeof logout === "function") {
        await logout();
      } else {
        await signOut(getAuth());
      }
      navigate("/login");
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  return (
    <header style={{ width: "100%", position: "sticky", top: 0, zIndex: 50 }}>
      {/* Full-width, reversed ombré navbar */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.6rem 1rem",
          background:
            "linear-gradient(to bottom, #0B1E3A 0%, #0E2A57 60%, #1C3E75 100%)",
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: "1.05rem",
          }}
        >
          <span
            aria-hidden
            style={{
              width: 22,
              height: 22,
              display: "inline-block",
              borderRadius: "50%",
              backgroundColor: "#FF7A00",
            }}
          />
          DateRate
        </Link>

        {/* Main nav tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/matches"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Matches
          </NavLink>

          <NavLink
            to="/mutual-matches"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Mutual&nbsp;Matches
          </NavLink>

          <NavLink
            to="/messages"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Messages
          </NavLink>

          <NavLink
            to="/search"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Search
          </NavLink>

          <NavLink
            to="/faq"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            FAQ
          </NavLink>
        </div>

        {/* Right side: Upgrade OR Premium badge + Profile + Auth */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          {!isPremium ? (
            <Link
              to="/payments/checkout"
              style={{
                ...linkStyle,
                backgroundColor: "#FF7A00",
                borderRadius: 999,
                padding: "0.5rem 0.9rem",
              }}
            >
              Upgrade
            </Link>
          ) : (
            <span
              title="Premium active"
              style={{
                color: "white",
                backgroundColor: "rgba(255,122,0,0.25)",
                border: "1px solid #FF7A00",
                borderRadius: 999,
                padding: "0.35rem 0.7rem",
                fontSize: "0.85rem",
              }}
            >
              Premium
            </span>
          )}

          <NavLink
            to="/profile"
            style={({ isActive }) =>
              isActive ? { ...linkStyle, ...activeStyle } : linkStyle
            }
          >
            Profile
          </NavLink>

          {currentUser ? (
            <button
              onClick={handleLogout}
              style={{
                ...linkStyle,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: 999,
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                style={({ isActive }) =>
                  isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                style={({ isActive }) =>
                  isActive ? { ...linkStyle, ...activeStyle } : linkStyle
                }
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>

      {/* Thin orange line beneath navbar */}
      <div style={{ height: 2, width: "100%", backgroundColor: "#FF7A00" }} />
    </header>
  );
};

export default NavBar;
