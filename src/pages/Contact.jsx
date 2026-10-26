import SectionTitle from '../components/common/SectionTitle';
import ContactForm from '../components/forms/ContactForm';
import { useServices } from '../hooks/useServices';
import { site } from '../config/site';

export default function Contact() {
  const services = useServices();

  return (
    <div className="container py-5">
      <SectionTitle
        eyebrow="Contacto"
        title="Estamos para ayudarte"
        subtitle="Completá el formulario o escribinos directo por WhatsApp."
        center
      />

      <div className="row g-4 justify-content-center">
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <ContactForm services={services} />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm rounded-4 p-4 h-100">
            <h5 className="fw-bold mb-3">Datos de contacto</h5>
            <ul className="list-unstyled small text-body-secondary">
              <li className="mb-3 d-flex gap-2">
                <i className="bi bi-telephone fs-5 text-primary" />
                <div><strong>Teléfono</strong><br />{site.phone}</div>
              </li>
              <li className="mb-3 d-flex gap-2">
                <i className="bi bi-envelope fs-5 text-primary" />
                <div><strong>Email</strong><br />{site.email}</div>
              </li>
              <li className="mb-3 d-flex gap-2">
                <i className="bi bi-geo-alt fs-5 text-primary" />
                <div><strong>Dirección</strong><br />{site.address}</div>
              </li>
              <li className="mb-3 d-flex gap-2">
                <i className="bi bi-clock fs-5 text-primary" />
                <div><strong>Horarios</strong><br />{site.hours}</div>
              </li>
            </ul>
            <a
              href={`https://wa.me/${site.whatsapp}`}
              className="btn btn-primary w-100 mt-auto"
              target="_blank"
              rel="noreferrer"
            >
              <i className="bi bi-whatsapp me-2" />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
