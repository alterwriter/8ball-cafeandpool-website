function Footer({ contact }) {
  return (
    <footer className="bg-charcoal text-latte mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-heading text-2xl">8Ball Café &amp; Pool House</h3>
          <p className="text-latte/70 mt-3 max-w-lg">
            Kami hadir sebagai destinasi hangout premium dengan ambience modern, pelayanan ramah, dan kurasi menu berkualitas.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold/70">Kontak</p>
            <ul className="mt-3 space-y-2 text-latte/80">
              <li>WhatsApp: {contact?.whatsapp}</li>
              <li>Instagram: {contact?.instagram}</li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold/70">Lokasi</p>
            <p className="mt-3 text-latte/80">
              {contact?.address}
              <br />
              {contact?.openHours}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-latte/60">
        © {new Date().getFullYear()} 8Ball Hospitality Group
      </div>
    </footer>
  );
}

export default Footer;
