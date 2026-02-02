import axios from 'axios';

// For use Next.js API Routes (server-side)
export const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || 'https://readjourney.b.goit.study/api',
  withCredentials: true,
});
