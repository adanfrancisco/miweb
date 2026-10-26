import { Link } from 'react-router-dom';
import { site } from '../../config/site';

export default function Hero() {
  return (
    <section className="hero-section text-white py-5">
      <div className="container py-5">
        <div className="row align-items-center gy-4">
          <div className="col-lg-7">
            <span className="badge text-bg-primary mb-3 px-3 py-2 rounded-pill">
              <i className="bi bi-lightning-charge me-1" />
              Atención el mismo día
            </span>
            <h1 className="display-4 fw-bold mb-3">
              Tu soporte técnico, <span className="text-primary">cuándo lo necesitás</span>
            </h1>
            <p className="lead mb-4 opacity-75">{site.tagline}</p>
            <div className="d-flex flex-wrap gap-2">
              <Link to="/servicios" className="btn btn-primary btn-lg px-4">
                Ver servicios
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                className="btn btn-outline-light btn-lg px-4"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-whatsapp me-2" />
                Consultar por WhatsApp
              </a>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="row g-3">
              {[
                { icon: 'bi-headset', label: 'Soporte remoto', value: '80% resuelto en 1er contacto' },
                { icon: 'bi-tools', label: 'Reparaciones', value: 'Garantía sobre repuestos' },
                { icon: 'bi-shield-check', label: 'Confianza', value: 'Diagnóstico sin cargo' },
                { icon: 'bi-people', label: 'Clientes', value: '+500 asistencias' },
              ].map((item) => (
                <div className="col-6" key={item.label}>
                  <div className="card h-100 bg-white bg-opacity-10 border-0 rounded-4 backdrop-blur">
                    <div className="card-body p-3">
                      <i className={`bi ${item.icon} fs-3 text-primary`} />
                      <div className="fw-bold mt-2 small">{item.label}</div>
                      <div className="small opacity-75">{item.value}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
