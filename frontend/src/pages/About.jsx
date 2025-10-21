import { useHomeContent } from '../hooks/useHomeContent.js';

function About() {
  const { data } = useHomeContent();

  return (
    <section className="container page about">
      <header>
        <h1>Cerita Kami</h1>
        <p className="muted">{data.story?.description}</p>
      </header>
      <div className="card">
        <h2>Hospitality Signature 8Ball</h2>
        <p>
          Kami percaya bahwa billiard bukan hanya soal permainan, tetapi juga tentang komunitas dan pengalaman. 8Ball Cafe &amp;
          Pool menghadirkan lounge modern dengan pencahayaan warm, seating yang nyaman, dan barista champion di balik mesin espresso.
        </p>
        <p>
          Setiap anggota tim melewati pelatihan intensif seputar keamanan, sanitasi, dan pelayanan personal. Kami juga
          mengimplementasikan standar keamanan digital untuk menjaga data membership dan transaksi kamu.
        </p>
      </div>
      <div className="card">
        <h2>Keamanan &amp; Privasi</h2>
        <ul className="bullet-list">
          <li>Pembayaran dilakukan langsung di kasir untuk meminimalkan risiko fraud online.</li>
          <li>Seluruh data membership disimpan terenkripsi di server produksi dan dilindungi dengan akses terkontrol.</li>
          <li>Seluruh koneksi frontend-backend menggunakan HTTPS ketika di-deploy.</li>
          <li>Tim melakukan audit keamanan triwulanan untuk memastikan perlindungan data pelanggan.</li>
        </ul>
      </div>
    </section>
  );
}

export default About;
