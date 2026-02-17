"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import DeleteButton from "./DeleteButton";

export default function BookmarkList() {
  const supabase = createClient();
  const [bookmarks, setBookmarks] = useState([]);

  const fetchBookmarks = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) setBookmarks(data || []);
  };

  useEffect(() => {
    fetchBookmarks();

    const handleAdded = (e) => {
      setBookmarks((prev) => [e.detail, ...prev]);
    };

    const handleDeleted = (e) => {
      setBookmarks((prev) =>
        prev.filter((b) => b.id !== e.detail)
      );
    };

    window.addEventListener("bookmark-added", handleAdded);
    window.addEventListener("bookmark-deleted", handleDeleted);

    return () => {
      window.removeEventListener("bookmark-added", handleAdded);
      window.removeEventListener("bookmark-deleted", handleDeleted);
    };
  }, []);

  return (
    <div className="w-full max-w-2xl space-y-3">
      {bookmarks.length === 0 && (
        <p className="text-gray-500">No bookmarks yet</p>
      )}

      {bookmarks.map((bookmark) => (
        <div
          key={bookmark.id}
          className="flex items-center justify-between border p-3 rounded"
        >
          <div>
            <a
              href={bookmark.url}
              target="_blank"
              className="font-semibold text-blue-600"
            >
              {bookmark.title}
            </a>
            <p className="text-sm text-gray-500">{bookmark.url}</p>
          </div>

          <DeleteButton id={bookmark.id} />
        </div>
      ))}
    </div>
  );
}
