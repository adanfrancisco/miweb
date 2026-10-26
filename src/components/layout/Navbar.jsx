import { NavLink, Link } from 'react-router-dom';
import { site } from '../../config/site';
import { useTheme } from '../../hooks/useTheme';

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/servicios', label: 'Servicios' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="navbar navbar-expand-lg bg-body border-bottom sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary d-flex align-items-center gap-2" to="/">
          <i className="bi bi-tools fs-4" />
          {site.name}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Alternar navegación"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            {links.map(({ to, label, end }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `nav-link${isActive ? ' active fw-semibold' : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
            <li className="nav-item ms-lg-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="btn btn-outline-secondary btn-sm rounded-circle theme-toggle"
                aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
                title={isDark ? 'Modo claro' : 'Modo oscuro'}
              >
                <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon-stars'}`} />
              </button>
            </li>
            <li className="nav-item ms-lg-2">
              <a
                className="btn btn-primary btn-sm px-3"
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-whatsapp me-1" />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
