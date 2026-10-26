import soporteRemoto from './soporteRemoto';
import reparacionHardware from './reparacionHardware';
import redes from './redes';
import mantenimiento from './mantenimiento';

/**
 * Registro central de servicios.
 *
 * Para agregar un nuevo servicio:
 *  1. Crear `src/services/miServicio.js` exportando un objeto con la misma forma.
 *  2. Importarlo acá y agregarlo al array `services`.
 *
 * El resto de la app (Home, Services, ServiceDetail) se actualiza sola.
 */
export const services = [
  soporteRemoto,
  reparacionHardware,
  redes,
  mantenimiento,
];

export const featuredServices = services.filter((s) => s.featured);

export const getServiceBySlug = (slug) =>
  services.find((service) => service.slug === slug);

export { soporteRemoto, reparacionHardware, redes, mantenimiento };
