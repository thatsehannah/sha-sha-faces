# 💄 Sha Sha Faces – Makeup Artist Portfolio & Booking Site

A modern, responsive portfolio and booking platform for a professional makeup artist, built with **Next.js 13 App Router**, **Tailwind CSS**, **TypeScript**, and **ShadCN UI**. This full-stack site features a sleek client-facing UI, an integrated appointment form, secure deposit payments via Stripe, and dynamic form gating logic powered by Supabase.

## 🌐 Live Site

🔗 [www.shashafaces.com](https://www.shashafaces.com)

## ✨ Features

- 🎨 Responsive portfolio with smooth animations and mobile-first design
- 📅 Appointment booking form with date, time, location, and service selection
- ✅ Conditional form logic
- 🔒 Secure authentication and backend access via Clerk and Supabase
- 📊 Dashboard for artist to manage booked appointments, graphical insights, services offered, etc.
- 📸 Client gallery with styled image grids and smooth transitions

## 🛠 Tech Stack

- **Next.js 13 App Router** – frontend and routing framework
- **TypeScript** – static type safety
- **Tailwind CSS** – styling
- **ShadCN UI** – accessible component system
- **Framer Motion** – for smooth animations and transitions
- **Supabase** – backend service for data and form logic
- **Clerk** – authentication (admin-only access)
- **Vercel** – deployment platform
- **Sentry** - for site error reporting

## 🗂 Project Structure

```
/app
├── (dashboard)           # Dashboard related pages and layout files (for authorized user)
├── (public)              # Client-facing pages and layout files
```

```
├── components            # Reusable components
├── prisma                # Prisma-related files, such as database seeding files
├── supabase              # Supabase-related files
├── utils                 # Server actions, zod schemas, constants, etc.
├── lib                   # Contains email sending functions and data manipulation functions
├── public                # Icons and images
```

## 📄 License

This code is part of a client project and is not intended for commerical reuse without permission.

## ✅ To-do

- Add Stripe integration for deposits

---

Crafted with care and clarity by @thatsehannah

```

```
