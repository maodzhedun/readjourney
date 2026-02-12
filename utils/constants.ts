export const BOOK_STATUSES = {
  UNREAD: 'unread',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
} as const;

export const FILTER_OPTIONS = [
  { value: 'all', label: 'All books' },
  { value: 'unread', label: 'Unread' },
  { value: 'in-progress', label: 'In progress' },
  { value: 'done', label: 'Done' },
];

export const BOOKS_PER_PAGE = {
  mobile: 2,
  tablet: 8,
  desktop: 10,
};

export const BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  desktop: 1440,
} as const;
