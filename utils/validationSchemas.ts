import * as yup from 'yup';

const emailRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const registerSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters'),
});

export const addBookSchema = yup.object({
  title: yup.string().required('Title is required'),
  author: yup.string().required('Author is required'),
  totalPages: yup
    .number()
    .typeError('Must be a number')
    .required('Number of pages is required')
    .positive('Must be positive')
    .integer('Must be an integer'),
});

export const filtersSchema = yup.object({
  title: yup.string(),
  author: yup.string(),
});

export const readingSchema = yup.object({
  page: yup
    .number()
    .typeError('Must be a number')
    .required('Page number is required')
    .positive('Must be positive')
    .integer('Must be an integer'),
});
