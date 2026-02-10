import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email, token) {
  const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Confirm your email",
      html: `
        <h2>Email confirmation</h2>
        <p>Click the link below to verify your account:</p>
        <a href="${link}">Verify email</a>
        <p>This link is valid for 24 hours.</p>
      `,
    });
  } catch (error) {
    console.error("Resend error:", error);
    throw new Error("EMAIL_SEND_FAILED");
  }
}
