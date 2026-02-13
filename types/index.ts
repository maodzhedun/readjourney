// ============ User ============
export interface User {
  _id: string;
  name: string;
  email: string;
  token?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends AuthCredentials {
  name: string;
}

// ============ Books ============
export interface Book {
  _id: string;
  title: string;
  author: string;
  imageUrl: string;
  totalPages: number;
  status?: BookStatus;
  owner?: string;
  progress?: ReadingProgress[];
  timeLeftToRead?: TimeLeftToRead;
}

export type BookStatus = 'unread' | 'in-progress' | 'done';

export interface TimeLeftToRead {
  hours: number;
  minutes: number;
  seconds: number;
}

// ============ Reading ============
export interface ReadingProgress {
  _id: string;
  startPage: number;
  finishPage: number;
  startReading: string;
  finishReading: string;
  speed: number;
  status: 'active' | 'inactive';
}

export interface StartReadingPayload {
  id: string;
  page: number;
}

export interface FinishReadingPayload {
  id: string;
  page: number;
}

// ============ API Responses ============
export interface RecommendedBooksResponse {
  results: Book[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface OwnBooksResponse {
  results: Book[];
}

export interface BookByIdResponse extends Book {
  progress: ReadingProgress[];
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

// ============ Filters ============
export interface BooksFilters {
  title?: string;
  author?: string;
  page?: number;
  limit?: number;
}

export interface OwnBooksFilters {
  status?: BookStatus | 'all';
}
