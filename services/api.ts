import axios from 'axios';

// For use Next.js API Routes (server-side)
export const api = axios.create({
  baseURL: 'https://readjourney.b.goit.study/api',
  withCredentials: true,
});
