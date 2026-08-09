import "./HeaderMain.css";

import {
  HiOutlineSearch,
  HiOutlineBell,
  HiChevronDown,
  HiFire,
} from "react-icons/hi";

export default function HeaderMain() {
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

        <div className="header-profile">

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

          <HiChevronDown className="profile-arrow" />

        </div>

      </div>

    </header>
  );
}