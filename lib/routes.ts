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
  { label: "Analyze", path: "/analyze", icon: Search },
  { label: "Captions", path: "/captions", icon: Type },
  { label: "Songs", path: "/songs", icon: Music },
  { label: "Upload", path: "/upload", icon: Upload },
  { label: "Chat", path: "/chat", icon: MessageCircle },
  { label: "Creative Chat", path: "/creative-chat", icon: Sparkles },
  { label: "Refine", path: "/refine", icon: Wand2 },
];
