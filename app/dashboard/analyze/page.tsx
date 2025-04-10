"use client";

import { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";

interface AnalyzeResult {
  Mood: string;
  Genre: string;
  "Suggested Platforms": string[];
  "Content Hook": string;
  "Short Video Direction": {
    Duration: string;
    Description: string;
  };
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
      const response = await axios.post("/api/analyze", { idea });
      setResult(response.data);
      toast.success("Analysis complete!");
    } catch (error) {
      toast.error("Failed to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analyze Your Creative Idea</h1>
      <Textarea
        rows={4}
        placeholder="Describe your video idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
      />
      <Button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </Button>

      {result && (
        <Card className="mt-6">
          <CardContent className="space-y-4 p-4">
            <div>
              <strong>Mood:</strong> {result.Mood}
            </div>
            <div>
              <strong>Genre:</strong> {result.Genre}
            </div>
            <div>
              <strong>Suggested Platforms:</strong>{" "}
              {result["Suggested Platforms"].join(", ")}
            </div>
            <div>
              <strong>Content Hook:</strong> {result["Content Hook"]}
            </div>
            <div>
              <strong>Short Video Direction:</strong>
              <div className="ml-4">
                <p>
                  <strong>Duration:</strong>{" "}
                  {result["Short Video Direction"].Duration}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {result["Short Video Direction"].Description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
