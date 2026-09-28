import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginButtons } from "@/components/login-buttons";
import { createClient } from "@/lib/supabase/server";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/dashboard");

  const { error } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-50 to-teal-100 p-6 dark:from-slate-900 dark:to-slate-950">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Tidepool</CardTitle>
          <CardDescription>
            Sign in to see your profile. Use the account you prefer.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {error && (
            <p role="alert" className="text-sm text-destructive">
              Sign-in didn&apos;t finish. Try again.
            </p>
          )}
          <LoginButtons />
        </CardContent>
      </Card>
    </main>
  );
}
