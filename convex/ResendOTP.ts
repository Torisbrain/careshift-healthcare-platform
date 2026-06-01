import { Email } from "@convex-dev/auth/providers/Email";
import { Resend as ResendAPI } from "resend";

export const ResendOTP = Email({
  id: "resend-otp",
  apiKey: process.env.RESEND_API_KEY,
  maxAge: 60 * 15, // 15 minutes
  async generateVerificationToken() {
    const bytes = crypto.getRandomValues(new Uint8Array(8));
    return Array.from(bytes, (b) => (b % 10).toString()).join("");
  },
  async sendVerificationRequest({ identifier: email, provider, token }) {
    const resend = new ResendAPI(provider.apiKey);
    const { error } = await resend.emails.send({
      from: "CareShift <auth@app.cto.new>",
      to: [email],
      subject: "Your CareShift sign-in code",
      text: `Your CareShift verification code is: ${token}\n\nThis code expires in 15 minutes.\n\nIf you didn't request this, please ignore this email.`,
    });
    if (error) {
      throw new Error(JSON.stringify(error));
    }
  },
});
