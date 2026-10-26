export const mantenimiento = {
  id: 'mantenimiento',
  slug: 'mantenimiento',
  title: 'Mantenimiento Preventivo',
  icon: 'bi-gear',
  short:
    'Planes mensuales de mantenimiento para equipos y sistemas, evitando fallas costosas.',
  long: `
    Ofrecemos planes de mantenimiento preventivo y correctivo para hogares y empresas.
    Incluye limpieza, actualizaciones, respaldos, monitoreo de salud de discos y soporte
    prioritario por WhatsApp.
  `,
  features: [
    'Planes mensuales o trimestrales',
    'Soporte prioritario',
    'Respaldos automatizados',
    'Informe mensual de salud',
  ],
  price: { from: '30.000', currency: '$', unit: 'mensual' },
  featured: false,
};

export default mantenimiento;
