"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type RefinedResult = {
  title: string;
  concept: string;
  tone: string;
  visuals: string[];
  format: string[];
  exampleEpisodes: string[];
};

export default function RefinePage() {
  const [original, setOriginal] = useState("");
  const [feedback, setFeedback] = useState("");
  const [refined, setRefined] = useState<RefinedResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRefine = async () => {
    if (!original || !feedback) return toast.error("Enter both fields!");
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/refine`,
        {
          originalSummary: original,
          userFeedback: feedback,
        },
        {
          withCredentials: true,
        }
      );

      setRefined(res.data.refined);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to refine content.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Refine Your Content Idea ✨</h2>

      <div className="space-y-4">
        <Textarea
          placeholder="Paste the original summary..."
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
        />
        <Textarea
          placeholder="Enter your feedback (e.g. make it more mysterious)..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <Button
          onClick={handleRefine}
          disabled={loading}
          className="text-md cursor-pointer hover:opacity-80 hover:shadow-lg transition-all duration-200"
          size={"lg"}
          variant={"secondary"}
        >
          {loading ? "Refining..." : "Refine"}
        </Button>
      </div>

      {refined && (
        <Card className="bg-muted p-4 mt-6">
          <CardContent className="space-y-4">
            <h3 className="text-xl font-semibold">{refined.title}</h3>
            <p className="text-muted-foreground italic">{refined.concept}</p>

            <div>
              <strong>Tone:</strong> {refined.tone}
            </div>

            <div>
              <strong>Visuals:</strong>
              <ul className="list-disc list-inside">
                {refined.visuals.map((v, i) => (
                  <li key={i}>{v}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Format:</strong>
              <ul className="list-disc list-inside">
                {refined.format.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>

            <div>
              <strong>Example Episodes:</strong>
              <ul className="list-disc list-inside">
                {refined.exampleEpisodes.map((ep, i) => (
                  <li key={i}>{ep}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
