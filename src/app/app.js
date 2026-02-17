"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  console.log("Supabase:", supabase);

  return (
    <div >
      <h1 >
        Supabase Connected ✅
      </h1>
    </div>
  );
}
