import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="container page">
      <header>
        <h1>Halaman tidak ditemukan</h1>
        <p className="muted">Sepertinya kamu berada di jalur yang salah. Yuk kembali ke home.</p>
      </header>
      <Link to="/" className="button primary">
        Kembali ke Home
      </Link>
    </section>
  );
}

export default NotFound;
