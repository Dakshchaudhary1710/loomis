import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HeaderMain.css";


import {
  HiOutlineSearch,
  HiOutlineBell,
  HiChevronDown,
  HiFire,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
} from "react-icons/hi";

export default function HeaderMain({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsMenuOpen(false);
    if (onLogout) onLogout();
  };

  return (
    <header className="header-main">

      {/* Search */}

      <div className="header-search">

        <HiOutlineSearch />

        <input
          type="text"
          placeholder="Search topics, tasks, or roadmap..."
        />

      </div>


      {/* Right Side */}

      <div className="header-right">


        {/* Streak */}

        <div className="header-streak">

          <HiFire />

          <span>14</span>

        </div>


        {/* Notification */}

        <button className="notification-btn">

          <HiOutlineBell />

          <span className="notification-dot"></span>

        </button>


        {/* Profile */}

        <div className="header-profile-wrap" ref={menuRef}>

          <button
            type="button"
            className="header-profile"
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={isMenuOpen}
          >

            <div className="profile-avatar">
              DC
            </div>

            <div className="profile-info">

              <span className="profile-name">
                Daksh
              </span>

              <span className="profile-role">
                Student
              </span>

            </div>

            <HiChevronDown className={`profile-arrow ${isMenuOpen ? "is-open" : ""}`} />

          </button>

          {isMenuOpen && (
            <div className="profile-menu" role="menu">

              <Link
                to="/main/profile"
                className="profile-menu-item"
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
              >
                <HiOutlineUser />
                View profile
              </Link>

              <Link
                to="/main/settings"
                className="profile-menu-item"
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
              >
                <HiOutlineCog />
                Settings
              </Link>

              <div className="profile-menu-divider"></div>

              <button
                type="button"
                className="profile-menu-item profile-menu-item--danger"
                role="menuitem"
                onClick={handleLogout}
              >
                <HiOutlineLogout />
                Log out
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}