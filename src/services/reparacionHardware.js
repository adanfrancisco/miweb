export const reparacionHardware = {
  id: 'reparacion-hardware',
  slug: 'reparacion-hardware',
  title: 'Reparación de Hardware',
  icon: 'bi-tools',
  short:
    'Diagnóstico y reparación de PCs, notebooks y periféricos con repuestos de calidad.',
  long: `
    Diagnosticamos fallas de hardware y realizamos reparaciones con repuestos garantizados.
    Cambio de placas, fuentes, memorias, discos, teclados, baterías de notebooks y limpieza
    profunda con cambio de pasta térmica.
  `,
  features: [
    'Diagnóstico sin costo',
    'Garantía sobre repuestos',
    'Servicio a domicilio disponible',
    'Presupuesto previo aprobado',
  ],
  price: { from: '25.000', currency: '$', unit: 'desde' },
  featured: true,
};

export default reparacionHardware;
