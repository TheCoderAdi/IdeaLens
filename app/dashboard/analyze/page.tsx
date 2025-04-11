"use client";

import { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface AnalyzeResult {
  direction: string;
  genre: string;
  hook: string;
  mood: string;
  platforms: string[];
  duration: string;
}

export default function AnalyzePage() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!idea.trim()) return toast.error("Please enter your idea");

    setLoading(true);
    setResult(null);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/analyze`,
        { idea },
        {
          withCredentials: true,
        }
      );
      setResult(response.data);
      toast.success("Analysis complete!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "space-y-6",
        !result && "flex flex-col items-center justify-center h-full"
      )}
    >
      <h1 className="text-2xl font-bold">Analyze Your Creative Idea</h1>
      <Textarea
        rows={4}
        placeholder="Describe your video idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        className={cn(!result && "w-1/2")}
      />
      <Button
        onClick={handleAnalyze}
        disabled={loading}
        className="text-md cursor-pointer hover:opacity-80 hover:shadow-lg transition-all duration-200"
        size={"lg"}
        variant={"secondary"}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </Button>

      {result && (
        <Card className="mt-6">
          <CardContent className="space-y-4 p-4">
            <div>
              <strong>Mood:</strong> {result.mood}
            </div>
            <div>
              <strong>Genre:</strong> {result.genre}
            </div>
            <div>
              <strong>Suggested Platforms:</strong>{" "}
              {result.platforms.join(", ")}
            </div>
            <div>
              <strong>Content Hook:</strong> {result.hook}
            </div>
            <div>
              <strong>Short Video Direction:</strong>
              <div className="ml-4">
                <p>
                  <strong>Duration:</strong> {result.duration}
                </p>
                <p>
                  <strong>Description:</strong> {result.direction}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
