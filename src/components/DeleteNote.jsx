"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function DeleteNote({ noteId, onDelete }) {
  async function handleDelete() {
    await onDelete(noteId);
    toast.success("Note deleted");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="rounded h-8 cursor-pointer font-bold" variant="secondary" title="Click to delete">
          <FaTrash />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded p-3">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone, Delete this note?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black rounded">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="rounded">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
