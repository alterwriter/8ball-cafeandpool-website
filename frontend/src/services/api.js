import axios from 'axios';
import { formatISO } from 'date-fns';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL: `${baseURL}/api`,
  timeout: 8000,
});

apiClient.interceptors.request.use((config) => {
  if (typeof window === 'undefined') return config;
  const stored = window.localStorage.getItem('8ball-member-session');
  if (stored) {
    try {
      const { token } = JSON.parse(stored);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Failed to parse session store', error);
    }
  }
  return config;
});

export async function fetchHomeContent() {
  const [{ data: home }, { data: hours }, { data: contact }] = await Promise.all([
    apiClient.get('/info/home'),
    apiClient.get('/info/hours'),
    apiClient.get('/info/contact'),
  ]);
  return { ...home.content, hours: hours.hours, contact: contact };
}

export async function registerMember(payload) {
  const response = await apiClient.post('/auth/register', payload);
  return response.data;
}

export async function loginMember(payload) {
  const response = await apiClient.post('/auth/login', payload);
  return response.data;
}

export async function fetchServices() {
  const response = await apiClient.get('/bookings/services');
  return response.data.services;
}

export async function createBooking(payload) {
  const response = await apiClient.post('/bookings', {
    ...payload,
    startTime: formatISO(payload.startTime),
  });
  return response.data;
}

export async function listBookings() {
  const response = await apiClient.get('/bookings');
  return response.data.bookings;
}

export async function fetchMenu() {
  const response = await apiClient.get('/orders/menu');
  return response.data.sections;
}

export async function createOrder(payload) {
  const response = await apiClient.post('/orders', payload);
  return response.data;
}

export async function listOrders() {
  const response = await apiClient.get('/orders');
  return response.data.orders;
}
