"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Markdown from "react-markdown";

type ChatItem = {
  messages: {
    userMessage: string;
    botReply: string;
  };
};
export default function CreativeChatPage() {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState<ChatItem[]>([]);
  const [keyPressed, setKeyPressed] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchChats = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/live-chat/chats`,
        {
          withCredentials: true,
        }
      );
      setChats(res.data.chats || []);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  const handleSubmit = async () => {
    if (!input.trim()) return toast.error("Enter a message.");
    try {
      setLoading(true);
      setKeyPressed(true);
      setInput("");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/creative-chat`,
        { messages: [{ role: "user", content: input }] },
        { withCredentials: true }
      );
      fetchChats();
    } catch (error) {
      console.log(error);
      toast.error("Error chatting with agent.");
    } finally {
      setLoading(false);
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (keyPressed && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [keyPressed]);

  return (
    <div className="flex flex-col max-h-[93vh]">
      <h2 className="text-2xl font-bold mb-4">Creative Chat 🤖</h2>

      <Card className="flex-1 overflow-hidden bg-transparent scroll-area">
        <CardContent className="h-full space-y-4 p-4">
          {chats.length === 0 && (
            <div className="italic text-gray-400 text-2xl">
              No conversations yet. Start chatting!
            </div>
          )}
          <ScrollArea className="h-[70vh] space-y-4 pr-4">
            {chats &&
              chats.map((chat, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex justify-end">
                    <div className="max-w-xl bg-blue-100 p-3 rounded-lg shadow-md">
                      <span className="block text-sm font-semibold">You</span>
                      <span className="text-sm">
                        {chat.messages.userMessage}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-start">
                    <div className="max-w-xl bg-gray-100 text-black p-3 rounded-lg shadow-md">
                      <span className="block text-sm font-semibold">
                        Assistant
                      </span>
                      <Markdown>{chat.messages.botReply}</Markdown>
                    </div>
                  </div>
                </div>
              ))}

            {loading && (
              <div className="italic text-gray-300 mb-3">
                Assistant is thinking...
              </div>
            )}
            <div ref={bottomRef} />
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex gap-2 mt-2">
        <Input
          placeholder="Ask something creative..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          className="flex-1 p-5"
        />
        <Button
          onClick={handleSubmit}
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
