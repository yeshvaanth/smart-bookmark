"use client";

import { createClient } from "@/lib/supabase/client";

export default function DeleteButton({ id }) {
  const handleDelete = async () => {
    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("bookmarks")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Delete failed:", error.message);
        return;
      }

      window.dispatchEvent(
        new CustomEvent("bookmark-deleted", { detail: id })
      );
    } catch (err) {
      console.error("Unexpected delete error:", err);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  );
}
