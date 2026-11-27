export const Sidebar = () => (
  <aside className="sidebar">
    <a className="workspace-brand" href="#" aria-label="Runforge workspace">
      <svg
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: 48, height: 48 }}
      >
        <rect width="32" height="32" rx="10" fill="#081A33" />
        <path
          d="M9.2 20.7h13.1a4.3 4.3 0 0 0 .3-8.6 6.3 6.3 0 0 0-11.9 1.1A3.9 3.9 0 0 0 9.2 20.7Z"
          fill="#fff"
        />
      </svg>
      <span>RUNFORGE</span>
    </a>

    <div className="sidebar-label">WORKSPACE</div>
    <nav className="side-nav" aria-label="Workspace">
      <a className="nav-item active" href="#">
        <span className="nav-icon">R</span>Runs
      </a>
      <a className="nav-item" href="#">
        <span className="nav-icon">P</span>Projects
      </a>
      <a className="nav-item" href="#">
        <span className="nav-icon">D</span>Devboxes
      </a>
      <a className="nav-item" href="#">
        <span className="nav-icon">V</span>Previews
      </a>
      <a className="nav-item" href="#">
        <span className="nav-icon">S</span>Snapshots
      </a>
    </nav>

    <a className="nav-item settings-link" href="#">
      <span className="nav-icon">⚙</span>
      Settings
      <span className="settings-count">20</span>
    </a>

    <div className="sidebar-footer">
      <span className="avatar">JD</span>
      <span className="user-info">
        <strong>Jordan Davis</strong>
        <small>Personal workspace</small>
      </span>
      <span className="user-menu">···</span>
    </div>
  </aside>
);
