import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';
import { magicLink } from 'better-auth/plugins';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY || 're_placeholder');

// Initialize MongoClient for Better Auth
const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/shario';
const client = new MongoClient(mongoURI);
const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db),
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }) => {
        await resend.emails.send({
          from: 'Shario <onboarding@resend.dev>',
          to: email,
          subject: 'Sign in to Shario',
          html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
        });
      },
    }),
  ],
});
