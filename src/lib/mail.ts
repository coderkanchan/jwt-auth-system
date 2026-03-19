import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const domain = process.env.NEXTAUTH_URL || "http://localhost:3000";

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/new-verification?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm email.</p>`,
  });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject: "2FA Code",
    html: `<p>Your 2FA code: <b>${token}</b></p>`,
  });
};
