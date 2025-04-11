import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IdeaLens – AI-Powered Creative Companion",
  description:
    "IdeaLens is your creative AI companion that transforms ideas into engaging content with mood analysis, captions, hashtags, and video direction. Perfect for creators, marketers, and storytellers.",
  keywords: [
    "IdeaLens",
    "AI Creative Tool",
    "Content Generator",
    "Short Video Assistant",
    "Captions Generator",
    "Hashtag Generator",
    "Creative AI",
    "Social Media AI",
    "Creative Director AI",
    "Content Ideation Tool",
  ],
  openGraph: {
    title: "IdeaLens – AI-Powered Creative Companion",
    description:
      "Transform your content ideas into engaging visuals, captions, hashtags, and more using IdeaLens – your creative AI partner.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IdeaLens – AI-Powered Creative Companion",
    description:
      "Generate powerful content ideas, captions, hashtags, and visuals with IdeaLens – your creative AI sidekick.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-white bg-gradient-to-br from-slate-900 to-black`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
