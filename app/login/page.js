import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Log in",
};

async function signIn(formData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.log(error.message);
    redirect("/login?error=true");
  }

  redirect("/");
}

export default async function LoginPage({ searchParams }) {
  const { error } = await searchParams;

  return (
    <main className="page">
      <h1>Log In</h1>
      {error && (
        <p className="form-error" role="alert">
          Wrong email or password.
        </p>
      )}
      {/* Sign up form goes here */}
      <form className="auth-form" action={signIn}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Your password"
          autoComplete="current-password"
          minLength={6}
          required
        />
        <button type="submit">Log In</button>
      </form>
      <p>
        No account yet? <Link href="/signup">Sign up</Link>
      </p>
    </main>
  );
}
