import { Link } from 'react-router-dom';
import Hero from '../components/common/Hero';
import SectionTitle from '../components/common/SectionTitle';
import ServiceCard from '../components/common/ServiceCard';
import ContactForm from '../components/forms/ContactForm';
import { useServices, useFeaturedServices } from '../hooks/useServices';
import { site } from '../config/site';

const steps = [
  { icon: 'bi-chat-dots', title: '1. Contanos', text: 'Escribinos por WhatsApp o formulario.' },
  { icon: 'bi-search', title: '2. Diagnosticamos', text: 'Identificamos la causa real del problema.' },
  { icon: 'bi-check2-circle', title: '3. Resolvemos', text: 'Ejecutamos la solución con garantía.' },
];

export default function Home() {
  const services = useServices();
  const featured = useFeaturedServices();

  return (
    <>
      <Hero />

      <section className="container py-5">
        <SectionTitle
          eyebrow="Servicios"
          title="¿En qué te ayudamos?"
          subtitle="Soluciones rápidas para hogares y empresas."
          center
        />
        <div className="row g-4">
          {featured.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/servicios" className="btn btn-outline-primary">
            Ver todos los servicios <i className="bi bi-arrow-right ms-1" />
          </Link>
        </div>
      </section>

      <section className="bg-body-tertiary py-5">
        <div className="container py-4">
          <SectionTitle
            eyebrow="Cómo trabajamos"
            title="Tres pasos y listo"
            center
          />
          <div className="row g-4 justify-content-center">
            {steps.map((step) => (
              <div className="col-md-4" key={step.title}>
                <div className="text-center">
                  <div className="icon-box rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: 72, height: 72 }}>
                    <i className={`bi ${step.icon} fs-3`} />
                  </div>
                  <h5 className="fw-bold">{step.title}</h5>
                  <p className="text-body-secondary small mb-0">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-6">
            <SectionTitle
              eyebrow="Contacto"
              title="Pedí tu consulta"
              subtitle="Completá el formulario y te respondemos a la brevedad."
            />
          </div>
          <div className="col-lg-6">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <ContactForm services={services} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-white py-5">
        <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
          <div>
            <h3 className="fw-bold mb-1">¿Urgente? Escribinos ahora</h3>
            <p className="mb-0 opacity-75">{site.hours}</p>
          </div>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            className="btn btn-light btn-lg px-4 fw-semibold"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-whatsapp me-2" />
            {site.phone}
          </a>
        </div>
      </section>
    </>
  );
}
