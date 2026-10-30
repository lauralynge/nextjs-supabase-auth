import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCurrentUser } from "@/lib/auth";

export const metadata = {
  title: "Profile",
};

async function signOut() {
  "use server";

  const supabase = await createClient();
  await supabase.auth.signOut();

  redirect("/");
}

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <main className="profile-page">
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <p>User ID: {user.sub}</p>
      <form action={signOut} className="auth-form">
        <button type="submit">Log out</button>
      </form>
    </main>
  );
}
