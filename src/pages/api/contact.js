import { transporter } from 'utils/email';

const AUTH_EMAIL_USER = process.env.AUTH_EMAIL_USER ?? '';
export const config = {
  runtime: 'edge',
};

const mailOptions = {
  to: AUTH_EMAIL_USER,
  subject: 'Contact Form Submission',
};

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
const handler = (req, res) => {
  if (req.method == 'POST') {
    const { email, message } = req.body;

    transporter.sendMail(
      {
        ...mailOptions,
        from: email,
        html: `
        <p>You have a new contact form submission</p>
        <h3>Contact Details</h3>
        <ul>
          <li>Email: ${email}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
        `,
      },
      function (error, info) {
        if (error) {
          console.log(error);
          res.status(400).json({ status: 400, error: 'Error forwarding email' });
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({
            status: 200,
            message: 'Email succesfully sent',
            data: info.response,
          });
        }
      }
    );
  } else {
    res.status(404).json({ status: 404, error: 'Not Found' });
  }
};

export default handler;
