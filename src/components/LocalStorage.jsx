import { toast } from "react-hot-toast";

export function saveLocal(title, content) {
  if (typeof window == "undefined") return;
  localStorage.setItem("title", title);
  localStorage.setItem("content", content);
}

export function getLocal() {
  if (typeof window == "undefined") return { title: "", content: "" };

  const title = localStorage.getItem("title") || "";
  const content = localStorage.getItem("content") || "";

  if (content) setTimeout(() => toast.success("New note added"), 3000);

  return { title, content };
}

export function clearLocal() {
  if (typeof window == "undefined") return;
  localStorage.removeItem("title");
  localStorage.removeItem("content");
}
