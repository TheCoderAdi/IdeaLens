import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen text-white px-6 py-10 space-y-20">
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          🚀 Your Personal Creative Director
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Upload your ideas, audio, or video — get stunning captions, content
          directions, mood analysis, and viral song picks for social media.
        </p>
        <Link href="/auth">
          <Button size="lg" className="text-lg cursor-pointer">
            Get Started
          </Button>
        </Link>
      </section>

      <Separator className="bg-slate-700" />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6 flex flex-col justify-evenly gap-3">
            <div>
              <h2 className="text-2xl font-semibold mb-2 text-white">
                🎬 Video/Audio Analysis
              </h2>
            </div>
            <p className="text-gray-300">
              Upload media to generate mood, captions, story concepts, and
              short-form directions.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6 flex flex-col justify-evenly gap-3">
            <h2 className="text-2xl font-semibold text-white">
              🎵 Music & Caption Generator
            </h2>
            <p className="text-gray-300">
              Instantly get trending songs, platform-wise suggestions, and
              multiple caption styles.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6 flex flex-col justify-evenly gap-3">
            <h2 className="text-2xl font-semibold mb-2 text-white">
              🤖 Chat with the Creative Agent
            </h2>
            <p className="text-gray-300">
              Interact with an AI agent to refine, reimagine, or brainstorm new
              content styles and ideas.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="max-w-5xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-medium text-white mb-3">
                1. Upload or Type Your Idea
              </h3>
              <p className="text-gray-300">
                Whether it’s a clip, voice note, or written concept — our agent
                understands your vibe.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-medium text-white mb-3">
                2. Get Multi-Dimensional Suggestions
              </h3>
              <p className="text-gray-300">
                From mood detection to cinematic storyboarding, let the agent do
                the heavy lifting.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-medium text-white mb-3">
                3. Fine-tune with Chat
              </h3>
              <p className="text-gray-300">
                Talk to the AI to refine ideas, add effects, or make it more
                suitable for a specific vibe/platform.
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6 space-y-2">
              <h3 className="text-xl font-medium text-white mb-3">
                4. Post Like a Pro
              </h3>
              <p className="text-gray-300">
                Copy-paste captions, attach song suggestions, and upload to
                TikTok, Reels, or Shorts.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center pt-12">
        <h2 className="text-2xl font-semibold mb-4">
          Start creating content that connects 🌟
        </h2>
        <Link href="/auth">
          <Button size="lg" variant="secondary" className="cursor-pointer">
            Sign up — It's Free
          </Button>
        </Link>
      </section>
    </div>
  );
}
