import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PulseLogo } from "@/components/brand/PulseLogo";
import { BackgroundDecor } from "@/components/layout/BackgroundDecor";
import { toast } from "sonner";

export const Route = createFileRoute("/verify")({
  component: VerifyPage,
});

function VerifyPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      toast.error("Please enter the complete verification code");
      return;
    }

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSuccess(true);
    toast.success("Email verified successfully");
  };

  const handleResend = async () => {
    toast.success("New code sent to your email");
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
                {success ? "Verified" : "Verify your email"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {success
                  ? "Your email has been successfully verified"
                  : "Enter the 6-digit code sent to your email"}
              </p>
            </div>

            {!success ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex justify-center gap-2">
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="h-12 w-12 rounded-xl text-center text-lg"
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      required
                    />
                  ))}
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-xl"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify email"}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>

                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    Didn't receive the code?{" "}
                    <button
                      type="button"
                      onClick={handleResend}
                      className="font-medium text-primary hover:underline"
                    >
                      Resend
                    </button>
                  </p>
                </div>
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
                    Your account is now ready to use
                  </p>
                </div>
                <Button
                  type="button"
                  className="w-full rounded-xl"
                  onClick={() => navigate({ to: "/onboarding" })}
                >
                  Continue to onboarding
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
