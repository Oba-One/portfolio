import nodemailer from 'nodemailer';

const AUTH_EMAIL_USER = process.env.AUTH_EMAIL_USER;
const AUTH_EMAIL_PASS = process.env.AUTH_EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: AUTH_EMAIL_USER ?? '',
    pass: AUTH_EMAIL_PASS ?? '',
  },
});
