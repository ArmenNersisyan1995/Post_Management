import * as yup from 'yup';

export const signInSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
});

export const signUpSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  name: yup
    .string()
    .required('Email is required'),
  surname: yup
    .string()
    .required('Surname is required'),
  password: yup
    .string()
    .required('Password is required'),
});

export const updatePostSchema = yup.object({
  title: yup
    .string()
    .required('Title is required'),
  description: yup
    .string()
    .required('Description is required'),
});

export const profileSchema = yup.object({
  title: yup
    .string()
    .required('Title is required'),
  description: yup
    .string()
    .required('Description is required'),
});
