import { createClient } from "@/lib/supabase/server";
import LoginButton from "@/components/LoginButton";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="flex min-h-screen items-center justify-center flex-col gap-4">
      {user ? (
        <>
          <h1 className="text-2xl font-bold">
            Welcome {user.email}
          </h1>
          <a
          href="/dashboard"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Go to Dashboard
        </a>

        </>
      ) : (
        <LoginButton />
      )}
    </main>
  );
}
