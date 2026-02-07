//app/api/api.ts

import axios, { AxiosError } from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export type ApiError = AxiosError<{ message?: string; error?: string }>;

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong'
    );
  }
  return 'Something went wrong';
}

export function getErrorStatus(error: unknown): number {
  if (error instanceof AxiosError) {
    return error.response?.status || 500;
  }
  return 500;
}

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
