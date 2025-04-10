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
    <aside className="h-full w-64 bg-muted/40 border-r p-4 flex flex-col">
      <h2 className="text-xl font-bold mb-6">🎬 Creative Agent</h2>
      <ScrollArea className="flex-1">
        <nav className="space-y-1">
          {routes.map(({ label, path, icon: Icon }) => (
            <Link href={path} key={label}>
              <Button
                variant={pathname === path ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === path && "bg-primary text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  );
}
