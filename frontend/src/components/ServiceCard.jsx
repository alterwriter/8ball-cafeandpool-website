function ServiceCard({ service }) {
  return (
    <article className="card service-card">
      <h3>{service.name}</h3>
      <p className="muted">{service.description}</p>
      <p className="price">IDR {service.ratePerHour.toLocaleString('id-ID')} / jam</p>
      <ul>
        {service.perks.map((perk) => (
          <li key={perk}>{perk}</li>
        ))}
      </ul>
    </article>
  );
}

export default ServiceCard;
