import { Link, useParams } from 'react-router-dom';
import { useService } from '../hooks/useServices';
import { site } from '../config/site';

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = useService(slug);

  if (!service) {
    return (
      <div className="container py-5 text-center">
        <h1 className="fw-bold">Servicio no encontrado</h1>
        <p className="text-body-secondary">El servicio que buscás no existe o fue removido.</p>
        <Link to="/servicios" className="btn btn-primary">
          Volver a servicios
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="bg-body-tertiary py-5">
        <div className="container py-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Inicio</Link></li>
              <li className="breadcrumb-item"><Link to="/servicios" className="text-decoration-none">Servicios</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{service.title}</li>
            </ol>
          </nav>
          <div className="d-flex align-items-center gap-3">
            <div className="icon-box rounded-4 d-inline-flex align-items-center justify-content-center" style={{ width: 64, height: 64 }}>
              <i className={`bi ${service.icon} fs-3`} />
            </div>
            <div>
              <h1 className="h2 fw-bold mb-1">{service.title}</h1>
              <p className="text-body-secondary mb-0">{service.short}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-5">
          <div className="col-lg-7">
            <h4 className="fw-bold mb-3">Descripción</h4>
            <p className="text-body-secondary" style={{ whiteSpace: 'pre-line' }}>{service.long}</p>

            <h4 className="fw-bold mt-4 mb-3">Incluye</h4>
            <ul className="list-unstyled">
              {service.features.map((feature) => (
                <li key={feature} className="d-flex align-items-start gap-2 mb-2">
                  <i className="bi bi-check-circle-fill text-primary mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '96px' }}>
              <span className="text-uppercase small fw-bold text-body-secondary">Desde</span>
              <div className="display-6 fw-bold text-primary">
                {service.price.currency}{service.price.from}
              </div>
              <p className="text-body-secondary small">{service.price.unit}</p>
              <a
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(`Hola, quiero consultar por el servicio: ${service.title}`)}`}
                className="btn btn-primary btn-lg w-100 mb-2"
                target="_blank"
                rel="noreferrer"
              >
                <i className="bi bi-whatsapp me-2" />
                Contratar / consultar
              </a>
              <Link to="/contacto" className="btn btn-outline-primary w-100">
                Enviar consulta
              </Link>
              <hr />
              <p className="small text-body-secondary mb-0">
                <i className="bi bi-telephone me-2" />
                {site.phone}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
