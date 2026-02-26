<h1 align="center">
  <br>
  🌐 Ahad's Developer Portfolio
  <br>
</h1>

<p align="center">
  A modern, full-stack personal portfolio with a built-in content management admin dashboard.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-336791?logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vercel_Blob-Storage-000000?logo=vercel&logoColor=white" alt="Vercel Blob" />
</p>

---

## ✨ Overview

This is a **full-stack personal portfolio website** built with Next.js 16 and React 19. It features a polished public-facing portfolio and a **secure, password-protected admin dashboard** that allows full content management — no code changes required to update portfolio content.

All content (bio, skills, experiences, certifications, achievements, sports, resume, and profile image) is stored in a **PostgreSQL database** via **Prisma ORM**, and media files are hosted on **Vercel Blob** storage.

---

## 🚀 Features

### Public Portfolio

| Section | Description |
|---|---|
| **Hero** | Animated introduction with name, title, and call-to-action |
| **About** | Bio section pulled dynamically from the database |
| **Skills** | Categorized skills grid with proficiency indicators |
| **Experience** | Timeline of work experience with company, role, and dates |
| **Certifications** | Certification cards with issuer, date, and credential links |
| **Achievements** | Image-rich achievement showcase |
| **Sports** | Personal sports highlights (Badminton, Cricket, Football) |
| **Footer** | Contact links and social handles |

### 🔐 Admin Dashboard (`/admin`)

A fully-featured content management interface protected by **NextAuth.js** authentication:

- **Profile Image** — Upload or update your profile photo via Vercel Blob
- **Bio Manager** — Edit your personal bio and title
- **Skills Manager** — Add, edit, and delete skills with categories
- **Experience Manager** — Manage work history with current-role support
- **Certifications Manager** — Manage certifications with images and credential URLs
- **Achievements Manager** — Add achievements with image uploads and dates
- **Sports Manager** — Manage sports highlights with categories and images
- **Resume Manager** — Upload and replace your PDF resume

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **Database** | PostgreSQL |
| **ORM** | Prisma 7 |
| **Authentication** | NextAuth.js v4 |
| **File Storage** | Vercel Blob |
| **Deployment** | Vercel (recommended) |

---

## 📁 Project Structure

```
ahad-portfolio/
├── app/
│   ├── admin/              # Protected admin dashboard page
│   ├── api/                # REST API routes (Next.js Route Handlers)
│   │   ├── auth/           # NextAuth configuration
│   │   ├── bio/            # Bio CRUD endpoints
│   │   ├── skills/         # Skills CRUD endpoints
│   │   ├── experiences/    # Experience CRUD endpoints
│   │   ├── certifications/ # Certifications CRUD endpoints
│   │   ├── achievements/   # Achievements CRUD endpoints
│   │   ├── sports/         # Sports CRUD endpoints
│   │   ├── resume/         # Resume upload endpoint
│   │   ├── profile-image/  # Profile image endpoint
│   │   ├── blob/           # Vercel Blob utility endpoint
│   │   └── upload/         # General file upload handler
│   ├── auth/               # Sign-in page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Public portfolio page
├── components/
│   ├── admin/              # Admin dashboard section components
│   │   ├── BiosManager.tsx
│   │   ├── SkillsManager.tsx
│   │   ├── ExperiencesManager.tsx
│   │   ├── CertificationsManager.tsx
│   │   ├── AchievementsManager.tsx
│   │   ├── SportsManager.tsx
│   │   ├── ResumeManager.tsx
│   │   └── ImageUpload.tsx
│   ├── portfolio/          # Public-facing portfolio section components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── CertificationsSection.tsx
│   │   ├── AchievementsSection.tsx
│   │   ├── SportsSection.tsx
│   │   └── Footer.tsx
│   ├── Loader.tsx          # Animated page loader
│   └── Providers.tsx       # Context providers (session, etc.)
├── lib/                    # Shared utilities and Prisma client
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migration history
├── types/                  # Shared TypeScript interfaces
├── public/                 # Static assets
└── next.config.ts          # Next.js configuration
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [npm](https://www.npmjs.com/) or `pnpm` / `yarn`
- A running **PostgreSQL** database
- A **Vercel Blob** store (for media uploads)
- A **Vercel** account (if deploying to Vercel)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ahad-portfolio.git
cd ahad-portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root by copying the example below and filling in your values:

```env
# PostgreSQL Database URL
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

# NextAuth – used for admin authentication
NEXTAUTH_SECRET="your-random-secret-string"
NEXTAUTH_URL="http://localhost:3000"

# Admin credentials for the dashboard
ADMIN_EMAIL="your-admin@email.com"
ADMIN_PASSWORD="your-secure-password"

# Vercel Blob – for image and file storage
BLOB_READ_WRITE_TOKEN="your-vercel-blob-token"
```

> **Tip:** Generate a strong `NEXTAUTH_SECRET` with:
> ```bash
> openssl rand -base64 32
> ```

### 4. Set Up the Database

Run Prisma migrations to create all required tables:

```bash
npx prisma migrate deploy
```

To open Prisma Studio (a visual DB browser) at any time:

```bash
npx prisma studio
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.
Open [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin dashboard.

---

## 🗄️ Database Schema

The following models are defined in `prisma/schema.prisma`:

| Model | Key Fields |
|---|---|
| `ProfileImage` | `imageUrl` (Vercel Blob URL) |
| `Bio` | `title`, `content` |
| `Skill` | `name`, `category` |
| `Experience` | `title`, `company`, `location`, `startDate`, `endDate`, `current`, `description` |
| `Achievement` | `title`, `description`, `date`, `imageUrl` |
| `Certification` | `title`, `issuer`, `date`, `credentialUrl`, `imageUrl` |
| `Resume` | `fileName`, `fileUrl` |
| `Sport` | `title`, `description`, `date`, `category`, `imageUrl` |

---

## 🔐 Admin Dashboard

Navigate to `/admin` and sign in with the credentials configured in your `.env` file.

The dashboard provides full **CRUD** (Create, Read, Update, Delete) capabilities for every section of the portfolio. All uploaded media is stored securely in **Vercel Blob** and URLs are persisted in PostgreSQL.

> 📄 See [ADMIN_DASHBOARD.md](./ADMIN_DASHBOARD.md) for detailed admin usage documentation.

---

## 🚢 Deployment (Vercel)

This project is optimized for deployment on [Vercel](https://vercel.com).

1. Push your repository to GitHub.
2. Import the project in your Vercel dashboard.
3. Add all environment variables from your `.env` file in **Vercel → Settings → Environment Variables**.
4. Deploy. Vercel will automatically run `prisma generate && next build` on each deploy.

> **Database:** Use a managed PostgreSQL provider such as [Neon](https://neon.tech), [Supabase](https://supabase.com), or [Vercel Postgres](https://vercel.com/storage/postgres).

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Generate Prisma client and build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## 📄 License

This project is licensed under the terms of the [LICENSE](./LICENSE) file.

---

<p align="center">
  Built with ❤️ using Next.js, Prisma & Vercel
</p>
