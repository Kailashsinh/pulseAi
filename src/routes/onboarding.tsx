import { useState, useEffect } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  User,
  Target,
  HeartPulse,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { PulseLogo } from "@/components/brand/PulseLogo";
import { BackgroundDecor } from "@/components/layout/BackgroundDecor";
import { usePulse } from "@/lib/pulse/store";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  const { completeOnboarding, signedIn, onboarded } = usePulse();

  // --------------------------------------------------
  // State
  // IMPORTANT: All hooks must be declared before
  // any conditional return.
  // --------------------------------------------------

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 2: Basic profile
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  // Step 3: Health goals
  const [goals, setGoals] = useState<string[]>([]);

  // Step 4: Existing health information
  const [conditions, setConditions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [medications, setMedications] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  // Step 5: Privacy consent
  const [consentData, setConsentData] = useState(false);
  const [consentAI, setConsentAI] = useState(false);

  // --------------------------------------------------
  // Redirect if already onboarded or not signed in
  // --------------------------------------------------

  useEffect(() => {
    if (!signedIn) {
      navigate({ to: "/login" });
      return;
    }

    if (onboarded) {
      navigate({ to: "/app/dashboard" });
    }
  }, [signedIn, onboarded, navigate]);

  // --------------------------------------------------
  // Options
  // --------------------------------------------------

  const healthGoalsOptions = [
    "Track overall health",
    "Understand health trends",
    "Manage medications",
    "Prepare for doctor visits",
    "Organize medical reports",
    "Monitor chronic conditions",
  ];

  // --------------------------------------------------
  // Steps
  // --------------------------------------------------

  const steps = [
    {
      title: "Welcome to PulseAI",
      icon: Sparkles,
      content: (
        <div className="space-y-6">
          <div className="glass-subtle rounded-2xl p-6">
            <p className="text-lg">
              Your personal health intelligence assistant is ready to help you
              understand your health over time.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">What you'll get:</h3>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>
                  AI-powered health insights and pattern detection
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>
                  Unified health timeline of reports, symptoms, and
                  measurements
                </span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>Doctor Brief generation for consultations</span>
              </li>

              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                <span>Medication interaction checking</span>
              </li>
            </ul>
          </div>
        </div>
      ),
    },

    {
      title: "Basic profile",
      icon: User,
      content: (
        <div className="space-y-5">
          <div>
            <Label htmlFor="onboarding-name">Full name *</Label>

            <Input
              id="onboarding-name"
              placeholder="Aarav Sharma"
              className="mt-1.5 rounded-xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="onboarding-age">Age *</Label>

              <Input
                id="onboarding-age"
                type="number"
                min="1"
                max="120"
                placeholder="28"
                className="mt-1.5 rounded-xl"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="onboarding-gender">Gender *</Label>

              <select
                id="onboarding-gender"
                className="mt-1.5 flex h-10 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="onboarding-height">
                Height (cm)
              </Label>

              <Input
                id="onboarding-height"
                type="number"
                min="1"
                placeholder="175"
                className="mt-1.5 rounded-xl"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="onboarding-weight">
                Weight (kg)
              </Label>

              <Input
                id="onboarding-weight"
                type="number"
                min="1"
                placeholder="70"
                className="mt-1.5 rounded-xl"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Health goals",
      icon: Target,
      content: (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select what matters most to you. This helps PulseAI focus on
            relevant insights.
          </p>

          <div className="space-y-2">
            {healthGoalsOptions.map((goal) => {
              const selected = goals.includes(goal);

              return (
                <button
                  key={goal}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    setGoals((prev) =>
                      prev.includes(goal)
                        ? prev.filter((g) => g !== goal)
                        : [...prev, goal]
                    );
                  }}
                  className={`flex w-full cursor-pointer items-center gap-3 rounded-xl border p-4 text-left transition-colors ${
                    selected
                      ? "border-primary bg-primary-soft"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border"
                    }`}
                  >
                    {selected && (
                      <CheckCircle2 className="h-3 w-3" />
                    )}
                  </div>

                  <span className="text-sm">{goal}</span>
                </button>
              );
            })}
          </div>
        </div>
      ),
    },

    {
      title: "Health information",
      icon: HeartPulse,
      content: (
        <div className="space-y-5">
          <p className="text-sm text-muted-foreground">
            This information is optional but helps provide more personalized
            insights.
          </p>

          <div>
            <Label htmlFor="onboarding-conditions">
              Existing conditions
            </Label>

            <Textarea
              id="onboarding-conditions"
              placeholder="e.g., Type 2 diabetes, hypertension"
              className="mt-1.5 rounded-xl"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="onboarding-allergies">
              Allergies
            </Label>

            <Textarea
              id="onboarding-allergies"
              placeholder="e.g., Penicillin, peanuts"
              className="mt-1.5 rounded-xl"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="onboarding-medications">
              Current medications
            </Label>

            <Textarea
              id="onboarding-medications"
              placeholder="e.g., Metformin 500mg, Lisinopril 10mg"
              className="mt-1.5 rounded-xl"
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="onboarding-emergency">
              Emergency contact
            </Label>

            <Input
              id="onboarding-emergency"
              placeholder="Name and phone number"
              className="mt-1.5 rounded-xl"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
            />
          </div>
        </div>
      ),
    },

    {
      title: "Privacy & consent",
      icon: ShieldCheck,
      content: (
        <div className="space-y-5">
          <div className="glass-subtle rounded-2xl p-6">
            <h3 className="font-semibold">
              Important information
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              PulseAI is a demo application that stores information locally in
              your browser. All AI-generated insights are informational only
              and should not replace professional medical advice.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Checkbox
                id="consent-data"
                checked={consentData}
                onCheckedChange={(value) =>
                  setConsentData(value === true)
                }
              />

              <Label
                htmlFor="consent-data"
                className="cursor-pointer text-sm font-normal leading-tight"
              >
                I understand that my health data is stored locally and that I
                am responsible for its security
              </Label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="consent-ai"
                checked={consentAI}
                onCheckedChange={(value) =>
                  setConsentAI(value === true)
                }
              />

              <Label
                htmlFor="consent-ai"
                className="cursor-pointer text-sm font-normal leading-tight"
              >
                I understand that AI insights are informational only and do not
                replace professional medical diagnosis or treatment
              </Label>
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "You're all set!",
      icon: CheckCircle2,
      content: (
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className="grid h-20 w-20 place-items-center rounded-full bg-success/12 text-success">
              <CheckCircle2 className="h-10 w-10" />
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-xl font-semibold">
              Setup complete
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              Your PulseAI dashboard is ready. You can now start tracking your
              health journey.
            </p>
          </div>

          <div className="glass-subtle rounded-2xl p-6">
            <h4 className="font-semibold">What's next?</h4>

            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>• Upload your first medical report</li>
              <li>• Start an AI Health Chat about your symptoms</li>
              <li>• Explore your health timeline</li>
              <li>• Generate a Doctor Brief for your next visit</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const currentStep = steps[step - 1];
  const totalSteps = steps.length;

  // --------------------------------------------------
  // Navigation
  // --------------------------------------------------

  const handleNext = () => {
    // Step 2 = Basic profile
    if (step === 2) {
      if (!name.trim() || !age || !gender) {
        toast.error("Please fill in required fields");
        return;
      }

      const numericAge = Number(age);

      if (
        !Number.isFinite(numericAge) ||
        numericAge < 1 ||
        numericAge > 120
      ) {
        toast.error("Please enter a valid age");
        return;
      }
    }

    // Step 3 = Health goals
    if (step === 3) {
      if (goals.length === 0) {
        toast.error("Please select at least one health goal");
        return;
      }
    }

    // Step 5 = Privacy & consent
    if (step === 5) {
      if (!consentData || !consentAI) {
        toast.error("Please accept the consent terms");
        return;
      }
    }

    if (step < totalSteps) {
      setStep((current) => current + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((current) => current - 1);
    }
  };

  // --------------------------------------------------
  // Complete onboarding
  // --------------------------------------------------

  const handleComplete = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const focusAreas = goals.slice(0, 3);

      /*
       * Keep this call compatible with your current store.
       *
       * NOTE:
       * Your current store signature appears to accept:
       * completeOnboarding(focusAreas, goals)
       *
       * If you want to persist name, age, height, weight,
       * conditions, allergies, medications, etc., update the
       * store to accept those values too.
       */
      completeOnboarding(focusAreas, goals);

      toast.success("Setup complete!");

      await navigate({
        to: "/app/dashboard",
      });
    } catch (error) {
      console.error("Failed to complete onboarding:", error);

      toast.error(
        "Something went wrong while completing setup. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // Don't render while redirecting
  // --------------------------------------------------

  if (!signedIn || onboarded) {
    return null;
  }

  // Safety check
  if (!currentStep) {
    return null;
  }

  // --------------------------------------------------
  // Render
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-background">
      <BackgroundDecor />

      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-2xl">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link
              to="/"
              className="mx-auto inline-block"
            >
              <PulseLogo size="lg" />
            </Link>
          </div>

          {/* Card */}
          <div className="glass rounded-3xl p-8 sm:p-12">
            {/* Progress indicator */}
            <div
              className="mb-8 flex items-center justify-between"
              aria-label={`Step ${step} of ${totalSteps}`}
            >
              {steps.map((_, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber <= step;

                return (
                  <div
                    key={stepNumber}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                      isActive
                        ? "gradient-brand text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                    aria-current={
                      stepNumber === step ? "step" : undefined
                    }
                  >
                    {stepNumber}
                  </div>
                );
              })}
            </div>

            {/* Step heading */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                  <currentStep.icon className="h-6 w-6" />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold">
                    {currentStep.title}
                  </h2>

                  <p className="text-sm text-muted-foreground">
                    Step {step} of {totalSteps}
                  </p>
                </div>
              </div>
            </div>

            {/* Current step */}
            <div className="mb-8">
              {currentStep.content}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl"
                  onClick={handleBack}
                  disabled={loading}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <Button
                  type="button"
                  className="rounded-xl"
                  onClick={handleNext}
                  disabled={loading}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  className="rounded-xl"
                  onClick={handleComplete}
                  disabled={loading}
                >
                  {loading ? "Completing..." : "Go to Dashboard"}

                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Back to login */}
          <p className="mt-6 text-center text-xs text-muted-foreground">
            <button
              type="button"
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
