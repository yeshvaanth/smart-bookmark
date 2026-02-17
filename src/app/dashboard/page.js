import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";



export default function Dashboard() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-3xl font-bold text-center">
          🚀 Smart Bookmark
        </h1>
        <AddBookmarkForm />
        <BookmarkList />
      </div>
    </main>
  );
}

