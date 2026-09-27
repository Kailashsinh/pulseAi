import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Lock, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PulseLogo } from "@/components/brand/PulseLogo";
import { BackgroundDecor } from "@/components/layout/BackgroundDecor";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    toast.success("Password reset successfully");
  };

  return (
    <div className="min-h-screen bg-background">
      <BackgroundDecor />

      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <div className="glass rounded-3xl p-8 sm:p-12">
            <div className="mb-8 text-center">
              <Link to="/" className="mx-auto inline-block">
                <PulseLogo size="lg" />
              </Link>
              <h1 className="mt-6 text-2xl font-semibold tracking-tight">
                {success ? "Password reset" : "Set new password"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {success
                  ? "Your password has been successfully reset"
                  : "Enter your new password below"}
              </p>
            </div>

            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="password">New password</Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="rounded-xl pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Must be at least 8 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm new password</Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      className="rounded-xl pl-10"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl"
                  disabled={loading}
                >
                  {loading ? "Resetting..." : "Reset password"}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            ) : (
              <div className="space-y-5">
                <div className="flex justify-center">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-success/12 text-success">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    You can now sign in with your new password
                  </p>
                </div>
                <Button
                  type="button"
                  className="w-full rounded-xl"
                  onClick={() => navigate({ to: "/login" })}
                >
                  Go to sign in
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            <button
              onClick={() => navigate({ to: "/login" })}
              className="hover:text-foreground"
            >
              <ArrowLeft className="mr-1 inline h-3 w-3" />
              Back to sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
