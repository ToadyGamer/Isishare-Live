import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { mailMail, mailPassword, mailReceiver, mailText } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'Outlook365',
      auth: {
        user: mailMail,
        pass: mailPassword,
      },
    });

    const mailOptions = {
      from: mailMail,
      to: mailReceiver,
      subject: 'Test Email from Outlook',
      html: `<p>${mailText}</p><img src="https://i.imgur.com/chmYFrU.png" alt="Logo">`,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email', error: error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
