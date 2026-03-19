import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {

  const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const confirmLink = `${domain}/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    text: `Please verify your email by clicking this link: ${confirmLink}`,
    html: `
      <p>Click <a href="${confirmLink}">here</a> to confirm email.</p>
      <p>If the link above doesn't work, copy and paste this into your browser:</p>
      <p>${confirmLink}</p>
    `
  });
};