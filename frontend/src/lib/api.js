const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: 'Unknown error' }));
    throw new Error(errorBody.message || 'Request failed');
  }

  return response.json();
}

export const api = {
  login: (payload) => request('/auth/login', { method: 'POST', body: JSON.stringify(payload) }),
  overview: () => request('/info/overview'),
  booking: (payload) => request('/bookings', { method: 'POST', body: JSON.stringify(payload) }),
  menu: () => request('/food/menu'),
  orderFood: (payload) => request('/food/orders', { method: 'POST', body: JSON.stringify(payload) }),
  membershipTiers: () => request('/membership/tiers'),
  profile: (token) => request('/membership/me', { token }),
};
