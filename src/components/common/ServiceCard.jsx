import { Link } from 'react-router-dom';

export default function ServiceCard({ service }) {
  return (
    <div className="col-md-6 col-lg-3">
      <div className="card h-100 border-0 shadow-sm rounded-4 hover-lift">
        <div className="card-body p-4 d-flex flex-column">
          <div
            className="icon-box rounded-4 d-inline-flex align-items-center justify-content-center mb-3"
            style={{ width: 56, height: 56 }}
          >
            <i className={`bi ${service.icon} fs-4`} />
          </div>
          <h5 className="fw-bold">{service.title}</h5>
          <p className="text-body-secondary small flex-grow-1">{service.short}</p>
          <Link
            to={`/servicios/${service.slug}`}
            className="btn btn-outline-primary btn-sm align-self-start mt-2"
          >
            Ver detalles <i className="bi bi-arrow-right ms-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
