import { Link, NavLink } from 'react-router-dom';
import strings from '../i18n';
import { useEvent } from '../context/EventContext';

const AppNavbar = () => {
  const { theme, toggleTheme } = useEvent();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top shadow-sm" aria-label="Main navigation">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">{strings.appName}</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {Object.entries(strings.nav).map(([key, label]) => (
              <li key={key} className="nav-item">
                <NavLink className="nav-link" to={key === 'landing' ? '/' : `/${key}`}>{label}</NavLink>
              </li>
            ))}
          </ul>
          <button className="btn btn-outline-light" onClick={toggleTheme}>Theme: {theme}</button>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
