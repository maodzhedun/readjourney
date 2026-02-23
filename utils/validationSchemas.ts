import * as yup from 'yup';

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
const emailError = 'Email must be in format name@gmail.com (no dots before @)';

export const registerSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, emailError),
  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, emailError),
  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters'),
});

export const addBookSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .min(1, 'Title cannot be empty')
    .trim(),
  author: yup
    .string()
    .required('Author is required')
    .min(2, 'Author name must be at least 2 characters')
    .trim(),
  totalPages: yup
    .number()
    .typeError('Must be a number')
    .required('Number of pages is required')
    .positive('Must be positive')
    .integer('Must be an integer')
    .min(1, 'Book must have at least 1 page')
    .max(10000, 'Seems too many pages'),
});

export const filtersSchema = yup.object({
  title: yup.string().trim().default(''),
  author: yup.string().trim().default(''),
});

export const readingSchema = yup.object({
  page: yup
    .number()
    .typeError('Must be a number')
    .required('Page number is required')
    .positive('Must be positive')
    .integer('Must be an integer')
    .min(1, 'Page must be at least 1'),
});
