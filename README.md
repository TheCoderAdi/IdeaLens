# LeadLens — Frontend

LeadLens is an AI-powered creative assistant that helps you generate, refine, and analyze content ideas. This frontend is built using **Next.js App Router**, **Tailwind CSS**, **shadcn/ui**, and integrates with our custom backend API.

## 🚀 Features

- 🎨 Dynamic content idea analysis with visual suggestions
- 📝 Caption & hashtag generator (Emotional, Witty, Trending)
- 🎵 Song suggestions for videos with reasons and platform support
- 🧠 AI chat for brainstorming creative ideas
- 📤 Upload and analyze audio/video content
- 📊 Summary dashboard with copy/share options
- 🧩 Tabs for each summary category
- 🔐 JWT-based authentication

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS, shadcn/ui
- **State & API:** Axios, React Hooks
- **Notifications:** react-hot-toast
- **Auth:** JWT, protected routes

## 🧪 Setup Instructions

1. Clone the repo:

   ```bash
   git clone https://github.com/TheCoderAdi/IdeaLens.git
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env`:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Run the app:
   ```bash
   npm run dev
   ```
