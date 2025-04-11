"use client";

import { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [result, setResult] = useState<{
    transcription: string;
    summary: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  const handleUpload = async (input: File | Blob) => {
    const formData = new FormData();
    formData.append("file", input);

    try {
      setLoading(true);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload-media`,
        formData,
        {
          withCredentials: true,
        }
      );
      setResult(res.data);
      toast.success("Analyzed successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to analyze file");
    } finally {
      setLoading(false);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunks.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) recordedChunks.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks.current, { type: "audio/webm" });
        setAudioBlob(blob);
        const audioURL = URL.createObjectURL(blob);
        setAudioURL(audioURL);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setRecording(true);
      toast.success("🎙️ Voice recording started");
    } catch (error) {
      console.log(error);
      toast.error("Microphone access denied!");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    toast.success("Recording stopped");
  };

  return (
    <div
      className={cn(
        "space-y-6",
        !result && "flex flex-col items-center justify-center h-full"
      )}
    >
      <h1 className="text-2xl font-bold text-center">
        Upload or Record Audio for Analysis
      </h1>
      <div className="space-y-4 w-full">
        <div className="flex gap-4 items-center justify-center">
          <Input
            type="file"
            accept="audio/*"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              setFile(selectedFile || null);
              setResult(null);
              setAudioBlob(null);
            }}
            className={cn("bg-white text-gray-700", !result && "w-1/2")}
          />
          <Button
            onClick={() => file && handleUpload(file)}
            disabled={loading || !file}
            className="text-md cursor-pointer hover:opacity-80 hover:shadow-lg transition-all duration-200"
            size={"lg"}
            variant={"secondary"}
          >
            {loading ? "Uploading..." : "Upload"}
          </Button>
        </div>

        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex w-full gap-4 items-center justify-center">
            {audioBlob && (
              <div className="w-1/2">
                <h3 className="font-semibold mb-2">🔊 Preview Recording:</h3>
                <audio src={audioURL as string} controls className="w-full" />
              </div>
            )}
            <div className={cn(!result && "mt-8")}>
              {!recording ? (
                <Button
                  onClick={startRecording}
                  variant="secondary"
                  className="text-md cursor-pointer hover:opacity-80 hover:shadow-lg transition-all duration-200"
                  size={"lg"}
                >
                  🎙️ Start Recording
                </Button>
              ) : (
                <Button
                  onClick={stopRecording}
                  variant="destructive"
                  className="text-md cursor-pointer hover:opacity-80 hover:shadow-lg transition-all duration-200"
                  size={"lg"}
                >
                  ⏹️ Stop Recording
                </Button>
              )}
            </div>
          </div>

          {audioBlob && (
            <Button
              onClick={() => handleUpload(audioBlob)}
              variant="secondary"
              className="text-md cursor-pointer hover:opacity-80 hover:shadow-lg transition-all duration-200"
              size={"lg"}
            >
              🚀 Analyze Recording
            </Button>
          )}
        </div>
      </div>

      {result && (
        <Card className="mt-6 w-full">
          <CardContent className="space-y-4 py-6">
            <div>
              <h3 className="text-lg font-semibold">🎙️ Transcription:</h3>
              <p className="text-gray-700">{result.transcription}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">🧠 Summary:</h3>
              <p className="text-gray-700 whitespace-pre-line">
                {result.summary}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
