# 🏥 Bharat Care - Modern Healthcare Portal

![Bharat Care Banner](./public/banner.png)

Bharat Care is a premium, state-of-the-art healthcare platform designed to bridge the gap between patients and quality medical services. Built with a focus on speed, accessibility, and modern aesthetics, it provides a comprehensive directory of doctors, hospitals, and medical procedures, including a dedicated section for Ayurveda.

## ✨ Key Features

- **🩺 Comprehensive Doctor Directory**: Search and filter through verified medical professionals.
- **🏥 Hospital Listings**: Detailed information about hospitals, facilities, and departments.
- **💉 Procedure Guide**: In-depth information about various medical procedures and standard practices.
- **🌿 Ayurveda Integration**: Special focus on traditional Indian medicine with dedicated categories for Ayurvedic procedures and doctors.
- **📱 Responsive Design**: Fully optimized for mobile, tablet, and desktop experiences.
- **⚡ Performance First**: Powered by Next.js for blazing-fast load times and SEO-friendly pages.

## 🛠️ Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **CMS**: [Prismic](https://prismic.io/) (Headless CMS for dynamic content)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) & [React Query](https://tanstack.com/query/latest)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## 🚀 Getting Started

### Prerequisites

- Node.js (Latest LTS recommended)
- npm or yarn
- A Prismic repository

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/bharat-care.git
   cd bharat-care
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Prismic repository name:
   ```env
   NEXT_PUBLIC_PRISMIC_ENVIRONMENT=your-repo-name
   ```

4. **Launch Slice Machine (Prismic Development):**
   ```bash
   npm run slicemachine
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🏗️ Project Structure

- `app/`: Next.js App Router pages and API routes.
- `components/`: Reusable UI components.
- `slices/`: Prismic Slice components for dynamic page building.
- `lib/`: Utility functions, Prismic client, and core logic.
- `store/`: Zustand state management stores.
- `public/`: Static assets (images, icons, etc.).

## ☁️ Deployment

### Netlify

This project is optimized for deployment on Netlify. A `netlify.toml` file is included for seamless configuration.

1. Connect your repository to Netlify.
2. Set the build command to `npm run build`.
3. Set the publish directory to `.next`.
4. Add your environment variables in the Netlify dashboard.

---

Built with ❤️ for better healthcare.
