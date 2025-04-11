"use client";

import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";

interface SongResponse {
  title: string;
  artist: string;
  reason: string;
  platforms: string[];
}

export default function SongsPage() {
  const [idea, setIdea] = useState("");
  const [songs, setSongs] = useState<SongResponse[] | null>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!idea) return toast.error("Please enter an idea");
    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/songs`,
        {
          idea,
        },
        {
          withCredentials: true,
        }
      );
      setSongs(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch songs suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "space-y-6 ",
        songs?.length === 0 &&
          "flex flex-col w-full h-full justify-center items-center"
      )}
    >
      <h1 className="text-2xl font-bold text-center">
        Generate Songs for Your Content Idea
      </h1>
      <div
        className={cn(
          "flex gap-2 items-center ",
          songs?.length === 0 && "w-1/2"
        )}
      >
        <Input
          placeholder="Enter your content idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="rounded-lg p-5"
        />
        <Button
          onClick={handleSubmit}
          disabled={loading}
          className="text-md cursor-pointer hover:opacity-80 hover:shadow-lg transition-all duration-200"
          size={"lg"}
          variant={"secondary"}
        >
          {loading ? "Loading..." : "Suggest Songs"}
        </Button>
      </div>
      {songs?.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No songs suggestions yet. Please enter an idea.
        </p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {songs?.map((song, index) => (
          <Card key={index} className="shadow-md">
            <CardContent className="p-3 space-y-2">
              <h3 className="text-lg font-semibold">{song.title}</h3>
              <p className="text-sm text-muted-foreground">By: {song.artist}</p>
              <p className="text-sm">{song.reason}</p>
              <p className="text-xs text-muted-foreground">
                Platforms: {song.platforms.join(", ")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
