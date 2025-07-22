export function validateNote(title, content) {
  if (!title.trim() || !content.trim()) {
    return { valid: false, message: "Please fill all fields" };
  }
  return { valid: true };
}
