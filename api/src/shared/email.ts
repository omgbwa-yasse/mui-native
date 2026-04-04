import nodemailer from 'nodemailer';
import { env } from '../config/env.js';

function createTransport(): nodemailer.Transporter {
  if (env.EMAIL_HOST) {
    return nodemailer.createTransport({
      host: env.EMAIL_HOST,
      port: env.EMAIL_PORT ?? 587,
      secure: (env.EMAIL_PORT ?? 587) === 465,
      auth:
        env.EMAIL_USER && env.EMAIL_PASS
          ? { user: env.EMAIL_USER, pass: env.EMAIL_PASS }
          : undefined,
    });
  }
  // Fallback: JSON Ethereal / test transport
  return nodemailer.createTransport({ jsonTransport: true });
}

let transport: nodemailer.Transporter | null = null;

function getTransport(): nodemailer.Transporter {
  if (!transport) {
    transport = createTransport();
  }
  return transport;
}

/**
 * Sends an invitation email with the 7-digit access code to the recipient.
 */
export async function sendInvitationEmail(to: string, code: string): Promise<void> {
  await send(to, 'Your invitation code', buildInvitationBody(code));
}

/**
 * Generic email send abstraction.
 */
export async function send(to: string, subject: string, body: string): Promise<void> {
  await getTransport().sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    text: body,
    html: `<pre>${body}</pre>`,
  });
}

function buildInvitationBody(code: string): string {
  return [
    `You have been invited to access the platform.`,
    ``,
    `Your 7-digit access code is: ${code}`,
    ``,
    `This code is valid for 30 days and allows up to 10 login sessions.`,
    `After 10 sessions, you will be prompted to create a full account.`,
    ``,
    `If you did not expect this invitation, please ignore this email.`,
  ].join('\n');
}
