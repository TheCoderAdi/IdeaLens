"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { SkeletonCard } from "@/components/SkeletonCard";

export default function DashboardPage() {
  const [username, setUsername] = useState<string>("");
  const [totalChats, setTotalChats] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, chatRes] = await Promise.all([
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/current-user`, {
            withCredentials: true,
          }),
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/live-chat/count`, {
            withCredentials: true,
          }),
        ]);

        setUsername(userRes.data.user.name);
        setTotalChats(chatRes.data.chatCount);
      } catch (error) {
        console.log(error);
        toast.error("Couldn't load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">👋 Hello, {username}!</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back to your Creative Agent dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          [1, 2, 3].map((_, index) => <SkeletonCard key={index} />)
        ) : (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Total Chats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{totalChats}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Start Creating</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/bundle">
                  <Button variant="default" className="w-full cursor-pointer">
                    ✨ Generate Content Idea
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>View Past Chats</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/dashboard/creative-chat">
                  <Button variant="default" className="w-full cursor-pointer">
                    💬 Open Creative Chat
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
