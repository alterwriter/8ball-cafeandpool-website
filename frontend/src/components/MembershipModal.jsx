import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginMember, registerMember } from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';

function MembershipModal({ open, onClose }) {
  const { isAuthenticated, updateSession } = useAuth();
  const [mode, setMode] = useState('login');
  const [feedback, setFeedback] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '', fullName: '', phone: '' } });

  useEffect(() => {
    if (open) {
      setMode('login');
      reset();
      setFeedback(null);
    }
  }, [open, reset]);

  useEffect(() => {
    if (isAuthenticated && open) {
      onClose();
    }
  }, [isAuthenticated, open, onClose]);

  const onSubmit = handleSubmit(async (values) => {
    setFeedback(null);
    try {
      const payload = {
        email: values.email,
        password: values.password,
        ...(mode === 'register' ? { fullName: values.fullName, phone: values.phone } : {}),
      };
      const response = mode === 'register' ? await registerMember(payload) : await loginMember(payload);
      updateSession(response);
      setFeedback({ type: 'success', message: mode === 'register' ? 'Membership berhasil dibuat!' : 'Selamat datang kembali!' });
    } catch (error) {
      const message = error.response?.data?.message || 'Terjadi kesalahan. Coba lagi.';
      setFeedback({ type: 'error', message });
    }
  });

  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-card">
        <header>
          <h2>{mode === 'login' ? 'Masuk Member' : 'Daftar Member Baru'}</h2>
          <button type="button" className="button ghost" onClick={onClose}>
            Tutup
          </button>
        </header>
        <div className="mode-toggle">
          <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => setMode('login')}>
            Login
          </button>
          <button type="button" className={mode === 'register' ? 'active' : ''} onClick={() => setMode('register')}>
            Sign Up
          </button>
        </div>
        <form onSubmit={onSubmit} className="form-grid">
          <label className="full">
            Email
            <input type="email" {...register('email', { required: 'Email wajib diisi' })} />
            {errors.email && <span className="error">{errors.email.message}</span>}
          </label>
          <label className="full">
            Password
            <input type="password" {...register('password', { required: 'Password wajib diisi', minLength: 8 })} />
            {errors.password && <span className="error">Min. 8 karakter</span>}
          </label>
          {mode === 'register' ? (
            <>
              <label className="full">
                Nama Lengkap
                <input type="text" {...register('fullName', { required: 'Nama wajib diisi' })} />
                {errors.fullName && <span className="error">{errors.fullName.message}</span>}
              </label>
              <label className="full">
                Nomor WhatsApp
                <input type="tel" {...register('phone', { required: 'Nomor wajib diisi' })} />
                {errors.phone && <span className="error">{errors.phone.message}</span>}
              </label>
            </>
          ) : null}
          <button type="submit" className="button primary" disabled={isSubmitting}>
            {isSubmitting ? 'Memproses…' : mode === 'login' ? 'Masuk' : 'Daftar'}
          </button>
        </form>
        {feedback ? <p className={`alert ${feedback.type}`}>{feedback.message}</p> : null}
      </div>
    </div>
  );
}

export default MembershipModal;
