import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import Mail from "nodemailer/lib/mailer";

//! SEND EMAIL
const transport = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE !== "development", // true
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
} as SMTPTransport.Options);

type SendEmailData = {
  sender: Mail.Address;
  recipient: Mail.Address[];
  subject: string;
  message: string;
};

export const sendEmail = async (dto: SendEmailData) => {
  const { sender, recipient, subject, message } = dto;

  return await transport.sendMail({
    from: sender,
    to: recipient,
    subject: subject,
    html: message,
    text: message,
  });
};
