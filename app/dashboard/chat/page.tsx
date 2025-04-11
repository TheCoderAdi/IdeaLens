"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";

type Message = {
  sender: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [keyPressed, setKeyPressed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setKeyPressed(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/chat`,
        { message: input },
        { withCredentials: true }
      );

      const assistantReply = res.data.reply;
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", content: assistantReply },
      ]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to get response");
    } finally {
      setLoading(false);
      setKeyPressed(false);
    }
  };
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (keyPressed && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [keyPressed]);
  return (
    <div className="flex flex-col max-h-[93vh]">
      <h1 className="text-2xl font-bold mb-4">Temporary Chat 🤖</h1>
      <Card className="flex-1 overflow-hidden bg-transparent">
        <CardContent className="h-full space-y-4 p-3">
          {messages.length === 0 && (
            <div className="text-gray-500 italic text-2xl">
              Start a conversation with the assistant.
            </div>
          )}
          <ScrollArea className="h-[70vh] space-y-4 pr-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "max-w-[40%] px-4 py-2 rounded-lg mb-3",
                  msg.sender === "user"
                    ? "bg-blue-100 self-end ml-auto text-right "
                    : "bg-gray-100 self-start mr-auto text-left max-w-[80%]"
                )}
              >
                <Markdown>{msg.content}</Markdown>
              </div>
            ))}
            {loading && (
              <div className="text-gray-500 italic animate-pulse">
                Assistant is typing...
              </div>
            )}
            <div ref={bottomRef} />
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex items-center gap-2 mt-4">
        <Input
          placeholder="Type your idea or prompt..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="p-5"
        />
        <Button
          onClick={handleSend}
          disabled={loading}
          className="text-md cursor-pointer hover:opacity-80 hover:shadow-lg transition-all duration-200"
          size={"lg"}
          variant={"secondary"}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
