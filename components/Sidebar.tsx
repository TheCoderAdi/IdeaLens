"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { routes } from "@/lib/routes";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r p-4 flex flex-col text-white">
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
    </aside>
  );
}
