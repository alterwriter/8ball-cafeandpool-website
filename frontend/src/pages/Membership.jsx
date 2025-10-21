import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function Membership() {
  const { isAuthenticated, profile } = useAuth();
  const navigate = useNavigate();

  return (
    <section className="container page">
      <header>
        <h1>Membership 8Ball Society</h1>
        <p className="muted">Nikmati akses prioritas booking, lounge event, dan promo seasonal.</p>
      </header>
      <div className="grid two-col">
        <div className="card">
          <h2>Benefit Utama</h2>
          <ul className="bullet-list">
            <li>Prioritas reservasi meja premium dan VIP.</li>
            <li>Diskon 10% untuk menu coffee &amp; dessert tertentu.</li>
            <li>Undangan event private coaching &amp; mini tournament.</li>
            <li>Bonus poin loyalty untuk setiap jam bermain.</li>
          </ul>
        </div>
        <div className="card">
          <h2>Langkah Bergabung</h2>
          <ol className="step-list">
            <li>Buat akun member melalui tombol Sign Up di kanan atas.</li>
            <li>Verifikasi email dan lengkapi data kontak.</li>
            <li>Lakukan booking meja atau order menu favoritmu.</li>
            <li>Tunjukkan Member ID di kasir saat melakukan pembayaran.</li>
          </ol>
          {isAuthenticated && profile ? (
            <div className="alert success">
              Kamu sudah login sebagai {profile.fullName}. Member ID: <strong>{profile.memberId}</strong>
              <div>
                <button type="button" className="button primary" onClick={() => navigate('/member')}>
                  Buka Dashboard Member
                </button>
              </div>
            </div>
          ) : (
            <p className="muted">Klik tombol "Login / Sign Up" di pojok kanan atas untuk bergabung sekarang.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Membership;
