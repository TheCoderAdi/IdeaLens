import {
  Search,
  Type,
  Music,
  Upload,
  MessageCircle,
  Sparkles,
  Wand2,
} from "lucide-react";

export const routes = [
  { label: "Analyze", path: "/dashboard/analyze", icon: Search },
  { label: "Captions", path: "/dashboard/captions", icon: Type },
  { label: "Songs", path: "/dashboard/songs", icon: Music },
  { label: "Upload", path: "/dashboard/upload", icon: Upload },
  { label: "Chat", path: "/dashboard/chat", icon: MessageCircle },
  { label: "Creative Chat", path: "/dashboard/creative-chat", icon: Sparkles },
  { label: "Refine", path: "/dashboard/refine", icon: Wand2 },
];
