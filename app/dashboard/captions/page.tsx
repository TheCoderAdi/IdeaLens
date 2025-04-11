"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface CaptionsResponse {
  emotional: string;
  witty: string;
  trending: string;
  hashtags: string[];
}

export default function CaptionsPage() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [captions, setCaptions] = useState<CaptionsResponse | null>(null);

  const handleGenerate = async () => {
    if (!idea.trim()) return toast.error("Please enter an idea");
    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/captions`,
        { idea },
        {
          withCredentials: true,
        }
      );
      setCaptions(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate captions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "space-y-6",
        !captions && "flex flex-col w-full h-full justify-center items-center"
      )}
    >
      <h1 className="text-2xl font-bold text-center">
        Generate Captions for Your Video Idea
      </h1>
      <Textarea
        rows={4}
        placeholder="Enter your video idea..."
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        className={cn("rounded-lg  text-lg", !captions && "w-1/2")}
      />
      <Button
        onClick={handleGenerate}
        disabled={loading}
        className="text-md cursor-pointer hover:opacity-80 hover:shadow-lg transition-all duration-200"
        size={"lg"}
        variant={"secondary"}
      >
        {loading ? "Generating..." : "Generate Captions"}
      </Button>

      {captions && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold">Emotional</h2>
              <p>{captions.emotional}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold">Witty</h2>
              <p>{captions.witty}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold">Trending</h2>
              <p>{captions.trending}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h2 className="font-semibold">Hashtags</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {captions.hashtags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 rounded-full px-3 py-1 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
