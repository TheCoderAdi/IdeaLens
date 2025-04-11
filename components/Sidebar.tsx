"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogOut = async () => {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
        withCredentials: true,
      });

      toast.success("Logged out successfully");
      router.push("/auth");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <aside className="fixed inset-0 w-64 border-r p-4 flex flex-col text-white">
      <h2 className="text-xl font-bold mb-6 text-center">🎬 IdeaLens</h2>
      <ScrollArea className="flex-1">
        <nav className="space-y-1">
          {routes.map(({ label, path, icon: Icon }) => (
            <Link href={path} key={label}>
              <Button
                variant={pathname === path ? "default" : "ghost"}
                size={"lg"}
                className={cn(
                  "w-full justify-start gap-2 cursor-pointer mb-3",
                  pathname === path &&
                    "bg-gray-300 text-black hover:bg-gray-200"
                )}
              >
                <Icon className="w-7 h-7" />
                <span className="text-lg font-medium">{label}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
      <Button
        variant="destructive"
        className="mt-5 cursor-pointer"
        onClick={() => handleLogOut()}
      >
        Logout
      </Button>
    </aside>
  );
}
