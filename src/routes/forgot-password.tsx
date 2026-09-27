import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PulseLogo } from "@/components/brand/PulseLogo";
import { BackgroundDecor } from "@/components/layout/BackgroundDecor";
import { toast } from "sonner";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setEmailSent(true);
    toast.success("Reset link sent to your email");
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
                Forgot your password?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {emailSent
                  ? "Check your email for a reset link"
                  : "Enter your email to receive a reset link"}
              </p>
            </div>

            {!emailSent ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative mt-1.5">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="rounded-xl pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send reset link"}
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
                    We've sent a password reset link to{" "}
                    <span className="font-medium text-foreground">{email}</span>
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    The link will expire in 24 hours
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full rounded-xl"
                  onClick={() => setEmailSent(false)}
                >
                  Try another email
                </Button>
              </div>
            )}

            <p className="mt-8 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
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
