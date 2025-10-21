import { useState } from 'react';

const initialState = {
  email: 'delia@8ballclub.id',
  password: 'playhard123',
};

function LoginCard({ onLogin, isLoading, error, auth, onLogout, profile, refetchProfile }) {
  const [credentials, setCredentials] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="bg-white/80 border border-white/60 rounded-3xl shadow-soft p-8">
      <h3 className="font-heading text-2xl text-charcoal">Login Member</h3>
      <p className="text-slate-600 mt-2">
        Member bisa mengakses benefit digital seperti priority queue dan promo pairing terbaru.
      </p>

      {!auth?.token ? (
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:border-teal focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 bg-white focus:border-teal focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 bg-teal text-white px-6 py-3 rounded-2xl font-semibold hover:bg-teal/80 transition disabled:opacity-60"
          >
            {isLoading ? 'Memverifikasi...' : 'Masuk Member'}
          </button>
          {error && <p className="text-sm text-rose-500">{error}</p>}
        </form>
      ) : (
        <div className="mt-6 space-y-4">
          <div className="rounded-2xl border border-teal/30 bg-teal/10 p-4">
            <p className="text-sm text-teal/80">Berhasil login sebagai</p>
            <p className="font-heading text-xl text-charcoal">{profile?.fullName ?? credentials.email}</p>
            <p className="text-sm text-slate-600">Tier: {profile?.membershipTier ?? 'Loading...'}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => refetchProfile()}
              className="px-4 py-2 rounded-2xl border border-teal/40 text-teal text-sm font-medium hover:bg-teal/10 transition"
            >
              Refresh Profil
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-2xl bg-charcoal text-white text-sm font-medium hover:bg-black transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginCard;
