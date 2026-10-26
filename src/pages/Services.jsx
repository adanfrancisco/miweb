import SectionTitle from "../components/common/SectionTitle";
import ServiceCard from "../components/common/ServiceCard";
import { useServices } from "../hooks/useServices";

export default function Services() {
  const services = useServices();

  return (
    <div className="container py-5">
      <SectionTitle
        eyebrow="Nuestros servicios"
        title="Soluciones a tu medida"
        subtitle="Todossslos servicios se agregan de forma modular: sumar uno nuevo es agregar un archivo."
        center
      />
      <div className="row g-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
