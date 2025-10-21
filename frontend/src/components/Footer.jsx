function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4>8Ball Cafe &amp; Pool</h4>
          <p className="muted">Lifestyle cafe &amp; billiard lounge di jantung Jakarta Selatan.</p>
        </div>
        <div>
          <h5>Kontak</h5>
          <ul>
            <li>WA: +62 812-8000-888</li>
            <li>IG: @8ballcafe.id</li>
            <li>Jl. Antasari Raya No. 88</li>
          </ul>
        </div>
        <div>
          <h5>Jam Operasional</h5>
          <ul>
            <li>Senin - Kamis: 10.00 - 23.00</li>
            <li>Jumat - Sabtu: 10.00 - 24.00</li>
            <li>Minggu: 09.00 - 22.00</li>
          </ul>
        </div>
      </div>
      <p className="footer-note">© {new Date().getFullYear()} 8Ball Cafe &amp; Pool. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
