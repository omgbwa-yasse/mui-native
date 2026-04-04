/** Base URL for the backend API. Override via env in the Metro / build config. */
// @ts-ignore – RN Metro exposes __DEV__ globally
const isDev = typeof __DEV__ !== 'undefined' ? __DEV__ : true;

export const API_BASE = isDev
  ? 'http://localhost:3000/api/v1'
  : process.env['API_BASE_URL'] ?? 'https://api.example.com/api/v1';
