export const soporteRemoto = {
  id: 'soporte-remoto',
  slug: 'soporte-remoto',
  title: 'Soporte Remoto',
  icon: 'bi-headset',
  short:
    'Resolvemos tu problema de PC o software desde tu casa, sin esperar visita técnica.',
  long: `
    Conectamos de forma segura a tu computadora y resolvemos el problema en el momento.
    Ideal para errores de Windows, configuración de programas, virus, problemas de correo
    o dudas de uso. El 80% de los problemas se resuelven en la primera sesión.
  `,
  features: [
    'Conexión segura y supervisada',
    'Resolución el mismo día',
    'No requiere traslados',
    'Reporte de lo realizado',
  ],
  price: { from: '15.000', currency: '$', unit: 'por sesión' },
  featured: true,
};

export default soporteRemoto;
