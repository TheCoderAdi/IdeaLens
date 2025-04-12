"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

interface SummaryResponse {
  idea: string;
  mood: string;
  genre: string;
  platforms: string[];
  hook: string;
  direction: string;
  duration: string;
  captions: {
    emotional: string;
    witty: string;
    trending: string;
  };
  hashtags: string[];
  songs: {
    title: string;
    artist: string;
    reason: string;
    platforms: string[];
  }[];
}

export default function SummaryPage() {
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [idea, setIdea] = useState(
    "A slow motion video of a girl walking alone on a rainy street at night."
  );
  const [loading, setLoading] = useState(false);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/summary`,
        { idea },
        { withCredentials: true }
      );
      setSummary(res.data);
    } catch (error) {
      toast.error("Failed to fetch summary.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const copyFormattedSummary = () => {
    if (!summary) return;

    const formatted = `
🎬 Idea: ${summary.idea}
🎭 Mood: ${summary.mood}
🎞️ Genre: ${summary.genre}
📱 Platforms: ${summary.platforms?.join(", ")}
🎯 Hook: ${summary.hook}
🎬 Direction: ${summary.direction}
⏱️ Duration: ${summary.duration}

📝 Captions:
• Emotional: ${summary.captions?.emotional}
• Witty: ${summary.captions?.witty}
• Trending: ${summary.captions?.trending}

🏷️ Hashtags:
${summary.hashtags?.map((tag: string) => `#${tag}`).join(" ")}

🎵 Songs:
${summary.songs
  ?.map(
    (song, i) =>
      `${i + 1}. "${song.title}" by ${song.artist}\n   Reason: ${
        song.reason
      }\n   Platforms: ${song.platforms.join(", ")}`
  )
  .join("\n\n")}
    `;

    navigator.clipboard.writeText(formatted.trim());
    toast.success("Summary copied to clipboard!");
  };

  return (
    <div className="w-full p-6">
      <motion.div
        className="mb-6 space-y-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold">📦 Content Summary Bundle</h2>

        <div className="flex items-center gap-4">
          <Input
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Enter your content idea..."
            className="w-full"
          />
          <Button
            onClick={fetchSummary}
            disabled={loading}
            className="text-md cursor-pointer hover:opacity-80 hover:shadow-lg transition-all duration-200"
            size={"lg"}
            variant={"secondary"}
          >
            {loading ? "Generating..." : "Generate"}
          </Button>
          <Button
            onClick={copyFormattedSummary}
            variant="secondary"
            className="text-md cursor-pointer hover:opacity-80 hover:shadow-lg transition-all duration-200"
            size={"lg"}
          >
            Copy Summary
          </Button>
        </div>
      </motion.div>

      {!summary ? (
        <div className="text-center text-gray-500 mt-10">
          Loading summary...
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="idea" className="w-full">
            <TabsList className="overflow-x-auto flex-wrap">
              <TabsTrigger value="idea">Idea</TabsTrigger>
              <TabsTrigger value="mood">Mood</TabsTrigger>
              <TabsTrigger value="genre">Genre</TabsTrigger>
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="hook">Hook</TabsTrigger>
              <TabsTrigger value="direction">Direction</TabsTrigger>
              <TabsTrigger value="duration">Duration</TabsTrigger>
              <TabsTrigger value="captions">Captions</TabsTrigger>
              <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
              <TabsTrigger value="songs">Songs</TabsTrigger>
            </TabsList>

            <TabsContent value="idea">{summary.idea}</TabsContent>
            <TabsContent value="mood">{summary.mood}</TabsContent>
            <TabsContent value="genre">{summary.genre}</TabsContent>
            <TabsContent value="platforms">
              <ul className="list-disc pl-5">
                {summary.platforms?.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="hook">{summary.hook}</TabsContent>
            <TabsContent value="direction">{summary.direction}</TabsContent>
            <TabsContent value="duration">{summary.duration}</TabsContent>
            <TabsContent value="captions">
              <ul className="space-y-2">
                <li>
                  <strong>Emotional:</strong> {summary.captions?.emotional}
                </li>
                <li>
                  <strong>Witty:</strong> {summary.captions?.witty}
                </li>
                <li>
                  <strong>Trending:</strong> {summary.captions?.trending}
                </li>
              </ul>
            </TabsContent>
            <TabsContent value="hashtags">
              <div className="flex flex-wrap gap-2">
                {summary.hashtags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-muted text-black px-2 py-1 rounded text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="songs">
              <div className="space-y-4">
                {summary.songs?.map((song, i) => (
                  <div key={i} className="border p-4 rounded bg-muted/20">
                    <h4 className="font-semibold">
                      {song.title} – {song.artist}
                    </h4>
                    <p className="text-sm mt-1">{song.reason}</p>
                    <p className="text-xs mt-1 text-muted-foreground">
                      Platforms: {song.platforms.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </div>
  );
}
