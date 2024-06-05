import { Link } from "react-router-dom";
import "./dashboard.css";
export const SidbarDashboard = () => {
  const linkStyle = {
    textDecoration: "none",
    color: "#9799ab",
  };
  return (
    <aside id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <span className="material-icons-outlined">inventory</span> Dashboard
        </div>
        {/* <!-- <span className="material-icons-outlined" onclick="closeSidebar()">close</span> --> */}
        <span className="material-icons-outlined">close</span>
      </div>

      <ul className="sidebar-list">
        <Link to="/dashboard" style={linkStyle}>
          <li className="sidebar-list-item">
            <span className="material-icons-outlined">dashboard</span>
            Dashboard
          </li>
        </Link>
        <li className="sidebar-list-item">
          <span className="material-icons-outlined">settings</span> Settings
        </li>
      </ul>
    </aside>
  );
};
