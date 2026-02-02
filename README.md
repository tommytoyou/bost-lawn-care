# Bost Lawn Care

Professional lawn care business website for Bost Lawn Care, serving Lawrence, KS.

## Tech Stack

- **React 18** — UI library
- **Vite** — Build tool and dev server
- **Tailwind CSS 4** — Utility-first CSS framework
- **React Router v6** — Client-side routing
- **Framer Motion** — Animations and transitions
- **Stripe Elements** — Payment processing (test mode)
- **React Icons** — Icon library

## Features

- Responsive design (mobile, tablet, desktop)
- Multi-step booking form wizard
- Stripe payment integration
- Image gallery with lightbox and category filters
- Before/after comparison sliders
- Auto-rotating testimonials carousel
- Contact form with validation
- Admin dashboard for content management
- LocalStorage persistence for bookings and admin edits
- SEO meta tags and Open Graph support
- Smooth page transitions and scroll animations

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`.

## Environment Variables

Create a `.env` file based on `.env.example`:

```
VITE_STRIPE_PUBLIC_KEY=pk_test_your_key_here
```

The app includes a fallback test key for development. Replace with your own Stripe publishable key for production.

## Admin Access

Navigate to `/admin` and enter the password: `bost2024`

## Build for Production

```bash
npm run build
```

Output is generated in the `dist/` directory.

## Deployment (Vercel)

1. Connect your repository to Vercel
2. Set the **Build Command** to `npm run build`
3. Set the **Output Directory** to `dist`
4. Add environment variables in the Vercel dashboard
5. Deploy

For client-side routing to work, add a `vercel.json` in the project root:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
