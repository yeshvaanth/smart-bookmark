"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AddBookmarkForm() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    const supabase = createClient();

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("User not found");
        return;
      }

      let title = url;


      try {
        const res = await fetch(
          `/api/fetch-title?url=${encodeURIComponent(url)}`
        );
        const result = await res.json();
        if (result?.title) title = result.title;
      } catch (err) {
        console.log("Title fetch failed");
      }

      const { data, error } = await supabase
        .from("bookmarks")
        .insert([
          {
            url,
            title,
            user_id: user.id,
          },
        ])
        .select();

      if (error) {
        console.error("Insert error:", error.message);
        return;
      }

      if (data?.[0]) {
        window.dispatchEvent(
          new CustomEvent("bookmark-added", { detail: data[0] })
        );
      }

      setUrl("");
    } catch (err) {
      console.error("Unexpected error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleAdd} className="flex gap-2">
      <input
        type="url"
        placeholder="Enter URL..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="border px-3 py-2 rounded w-80"
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
