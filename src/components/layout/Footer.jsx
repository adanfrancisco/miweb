import { Link } from 'react-router-dom';
import { site } from '../../config/site';

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-auto" data-bs-theme="dark">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold text-primary d-flex align-items-center gap-2">
              <i className="bi bi-tools" />
              {site.name}
            </h5>
            <p className="text-secondary-light small mb-2">{site.tagline}</p>
            <div className="d-flex gap-3 fs-5">
              <a href={site.social.instagram} className="text-light" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram" />
              </a>
              <a href={site.social.facebook} className="text-light" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook" />
              </a>
              <a href={`https://wa.me/${site.whatsapp}`} className="text-light" target="_blank" rel="noreferrer" aria-label="WhatsApp">
                <i className="bi bi-whatsapp" />
              </a>
            </div>
          </div>

          <div className="col-6 col-md-4">
            <h6 className="text-uppercase small fw-bold text-body-secondary">Servicios</h6>
            <ul className="list-unstyled small">
              <li className="mb-1"><Link to="/servicios/soporte-remoto" className="text-secondary-light text-decoration-none">Soporte Remoto</Link></li>
              <li className="mb-1"><Link to="/servicios/reparacion-hardware" className="text-secondary-light text-decoration-none">Reparación de Hardware</Link></li>
              <li className="mb-1"><Link to="/servicios/redes" className="text-secondary-light text-decoration-none">Redes y Conectividad</Link></li>
              <li className="mb-1"><Link to="/servicios/mantenimiento" className="text-secondary-light text-decoration-none">Mantenimiento</Link></li>
            </ul>
          </div>

          <div className="col-6 col-md-4">
            <h6 className="text-uppercase small fw-bold text-body-secondary">Contacto</h6>
            <ul className="list-unstyled small text-secondary-light">
              <li className="mb-1"><i className="bi bi-telephone me-2" />{site.phone}</li>
              <li className="mb-1"><i className="bi bi-envelope me-2" />{site.email}</li>
              <li className="mb-1"><i className="bi bi-geo-alt me-2" />{site.address}</li>
              <li className="mb-1"><i className="bi bi-clock me-2" />{site.hours}</li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />
        <p className="small text-body-secondary text-center mb-0">
          © {new Date().getFullYear()} {site.name}. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
