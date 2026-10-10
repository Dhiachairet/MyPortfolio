# Mohamed Dhia Chairet · Portfolio

Personal portfolio built with Next.js 15, Tailwind CSS 4 and Motion. Projects are pulled from the GitHub API and refresh every 12 hours, so new public repositories show up on their own.

## Run it locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To preview the production build:

```bash
npm run build
npm start
```

## Contact form setup

The contact page has a form that emails messages to you through [Resend](https://resend.com) (free tier: 3,000 emails a month).

1. Sign up at resend.com **with the email address you want messages delivered to** (mohameddhia.chairet@gmail.com).
2. Create an API key at [resend.com/api-keys](https://resend.com/api-keys).
3. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` to that key.
4. Restart `npm run dev` and send yourself a test message from `/contact`.

When you deploy (for example on Vercel), add `RESEND_API_KEY` under **Project Settings > Environment Variables** and redeploy.

Messages arrive with the visitor's address as Reply-To, so you can answer straight from your inbox. Without a verified domain, Resend's test sender can only deliver to the email you signed up with, which is all a portfolio needs. To send from your own domain, verify it in Resend and set `CONTACT_FROM_EMAIL`, for example `Portfolio <contact@yourdomain.com>`.

## Where things live

| What | File |
| --- | --- |
| Name, links, resume path, pinned repos | `lib/site.ts` |
| About page text, experience, skills, education | `lib/content.ts` |
| Extra details per repo (live URL, demo video, tech list) | `lib/github.ts` |
| Technology logos | `lib/tech-icons.ts` |
| Contact form email sending | `app/contact/actions.ts` |

## Credits

- Technology logos: [Simple Icons](https://simpleicons.org) (CC0), plus Java, VS Code, MySQL and .NET from [Devicon](https://devicon.dev) (MIT) and OpenAI from [Lobe Icons](https://github.com/lobehub/lobe-icons) (MIT). Logos are trademarks of their owners.
- Several interactions are adapted from [Watermelon UI](https://ui.watermelon.sh) (MIT).
