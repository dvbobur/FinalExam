export function saveLocal(title, content) {
  if (typeof window !== "undefined") {
    localStorage.setItem("unsaved_title", title);
    localStorage.setItem("unsaved_content", content);
  }
}

export function getLocal() {
  if (typeof window !== "undefined") {
    return {
      title: localStorage.getItem("unsaved_title") || "",
      content: localStorage.getItem("unsaved_content") || "",
    };
  }
  return { title: "", content: "" };
}

export function clearLocal() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("unsaved_title");
    localStorage.removeItem("unsaved_content");
  }
}
