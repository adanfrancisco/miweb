export default function SectionTitle({ eyebrow, title, subtitle, center = false }) {
  return (
    <div className={`mb-5 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className="text-uppercase small fw-bold text-primary">{eyebrow}</span>
      )}
      <h2 className="fw-bold mt-1">{title}</h2>
      {subtitle && <p className="text-body-secondary mb-0">{subtitle}</p>}
    </div>
  );
}
