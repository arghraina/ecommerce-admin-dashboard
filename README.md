# E-Commerce Admin Dashboard (SSR)

A server-side rendered admin dashboard for managing products in an e-commerce platform. Built with Next.js App Router, MongoDB, and Cloudinary, this application allows administrators to perform full CRUD operations with fast performance and SEO benefits.

---

# Features

- Server-Side Rendering (SSR) using Next.js App Router
- Product Management (Create, Read, Delete)
- Stock Management with Low-Stock Highlight
- Category-based Stock Visualization (Recharts)
- Secure Image Upload using Cloudinary
- MongoDB Atlas Integration
- Server Actions for Mutations
- Production-ready deployment (Vercel)


# Tech Stack

- **Framework:** Next.js (App Router)
- **Database:** MongoDB Atlas + Mongoose
- **Image Storage:** Cloudinary
- **Charts:** Recharts
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

---

# Project Structure

-   src/
    -   app/
    -       page.js # Dashboard
    -       products/
    -           page.js # Product list
    -           new/page.js # Add product
    -           ProductRow.jsx
    -       api/
    -           products/
    -               route.js # GET / POST
    -               [id]/route.js
    -           dashboard/
    -               route.js
    -               products/[id]/route.js
    -           categories/route.js
    -   components/
    -       Sidebar.js
    -   lib/
    -       mongodb.js
    -   models/
    -       Product.js

# Environment Variables

Create a `.env.local` file:

- env:
    MONGODB_URI=your_mongodb_atlas_uri       
    NEXT_PUBLIC_APP_URL=http://localhost:3000
-   <!-- This NEXT_PUBLIC_APP changes while actual deployment of the project. -->



This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
