"use client";
import { Button } from "@/components/ui/button";

export default function UpdateNote({ onUpdate }) {
  return (
    <Button onClick={onUpdate} className="rounded h-8 cursor-pointer font-bold" variant="secondary" title="Click to update">
      Update
    </Button>
  );
}
