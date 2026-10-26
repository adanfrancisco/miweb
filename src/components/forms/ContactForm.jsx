import { useState } from 'react';
import { site } from '../../config/site';

const initialValues = { name: '', email: '', phone: '', service: '', message: '' };

export default function ContactForm({ services = [] }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const validate = (form) => {
    const next = {};
    if (!form.name.trim()) next.name = 'Ingresá tu nombre';
    if (!form.email.trim()) next.email = 'Ingresá tu email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Email inválido';
    if (!form.message.trim()) next.message = 'Contanos qué necesitás';
    return next;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const text = [
      `Hola ${site.name}, soy ${values.name}.`,
      values.service ? `Me interesa: ${values.service}.` : '',
      `Email: ${values.email}`,
      values.phone ? `Teléfono: ${values.phone}` : '',
      `Mensaje: ${values.message}`,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    setSent(true);
    setValues(initialValues);
  };

  if (sent) {
    return (
      <div className="alert alert-success rounded-4 d-flex align-items-center gap-2">
        <i className="bi bi-check-circle-fill fs-4" />
        <div>
          <strong>¡Gracias!</strong> Se abrió WhatsApp con tu consulta pre-armada.
        </div>
      </div>
    );
  }

  const field = (name) => ({
    name,
    value: values[name],
    onChange: handleChange,
    isInvalid: Boolean(errors[name]),
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="needs-validation">
      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="name" className="form-label">Nombre *</label>
          <input id="name" type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} placeholder="Tu nombre" {...field('name')} />
          <div className="invalid-feedback">{errors.name}</div>
        </div>

        <div className="col-md-6">
          <label htmlFor="email" className="form-label">Email *</label>
          <input id="email" type="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder="tu@email.com" {...field('email')} />
          <div className="invalid-feedback">{errors.email}</div>
        </div>

        <div className="col-md-6">
          <label htmlFor="phone" className="form-label">Teléfono</label>
          <input id="phone" type="tel" className="form-control" placeholder="Opcional" {...field('phone')} />
        </div>

        <div className="col-md-6">
          <label htmlFor="service" className="form-label">Servicio de interés</label>
          <select id="service" className="form-select" {...field('service')}>
            <option value="">Seleccioná un servicio</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>{s.title}</option>
            ))}
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="message" className="form-label">Mensaje *</label>
          <textarea id="message" rows={4} className={`form-control ${errors.message ? 'is-invalid' : ''}`} placeholder="Describí tu problema o consulta" {...field('message')} />
          <div className="invalid-feedback">{errors.message}</div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary btn-lg px-4">
            <i className="bi bi-send me-2" />
            Enviar consulta
          </button>
          <span className="ms-3 small text-body-secondary">
            Respondemos por WhatsApp o email a la brevedad.
          </span>
        </div>
      </div>
    </form>
  );
}
