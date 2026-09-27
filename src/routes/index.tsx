import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Brain,
  Clock,
  FileText,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PulseLogo } from "@/components/brand/PulseLogo";
import { BackgroundDecor } from "@/components/layout/BackgroundDecor";

export const Route = createFileRoute("/")({
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <BackgroundDecor />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/" className="min-w-0">
            <PulseLogo />
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="rounded-xl" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button className="rounded-xl" asChild>
              <Link to="/register">Get started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-6">
              <div className="rise-in">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Understand your health.{" "}
                  <span className="gradient-text">Track what changes.</span>
                </h1>
              </div>
              <div className="rise-in" style={{ animationDelay: "100ms" }}>
                <p className="text-lg text-muted-foreground sm:text-xl">
                  PulseAI brings your symptoms, medical reports, and health
                  measurements into one intelligent timeline. Prepare better for
                  your doctor.
                </p>
              </div>
              <div className="rise-in flex flex-wrap gap-3" style={{ animationDelay: "200ms" }}>
                <Button size="lg" className="rounded-xl" asChild>
                  <Link to="/register">
                    Start with PulseAI
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-xl" asChild>
                  <Link to="/login">View demo</Link>
                </Button>
              </div>
              <div className="rise-in" style={{ animationDelay: "300ms" }}>
                <p className="text-sm text-muted-foreground">
                  <ShieldCheck className="mr-1.5 inline h-4 w-4" />
                  Informational health intelligence — not a replacement for
                  professional medical advice
                </p>
              </div>
            </div>
            <div className="rise-in flex items-center justify-center" style={{ animationDelay: "400ms" }}>
              <div className="relative">
                <div className="glass rounded-3xl p-8 sm:p-12">
                  <div className="grid gap-6">
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
                        <Activity className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Health Timeline</p>
                        <p className="text-sm text-muted-foreground">
                          All your records in one place
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">AI Insights</p>
                        <p className="text-sm text-muted-foreground">
                          Patterns you might miss
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary">
                        <Stethoscope className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-semibold">Doctor Brief</p>
                        <p className="text-sm text-muted-foreground">
                          Ready for your consultation
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything you need to understand your health
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Intelligent tools designed to help you track, understand, and
              prepare
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Brain,
                title: "AI Health Chat",
                description:
                  "Adaptive conversations that understand your symptoms and context",
              },
              {
                icon: Clock,
                title: "Health Timeline",
                description:
                  "See your health journey across reports, symptoms, and measurements",
              },
              {
                icon: BarChart3,
                title: "Health Analytics",
                description:
                  "Track trends, baselines, and unusual patterns over time",
              },
              {
                icon: Target,
                title: "Personal Baseline",
                description:
                  "Understand what's normal for you, not just population averages",
              },
              {
                icon: Sparkles,
                title: "Pattern Detection",
                description:
                  "AI-powered analysis to find correlations and early warnings",
              },
              {
                icon: FileText,
                title: "Report Intelligence",
                description:
                  "Upload medical reports and extract key values automatically",
              },
              {
                icon: ScanLine,
                title: "Image Analysis",
                description:
                  "Prototype medical image screening with explanation visualisation",
              },
              {
                icon: Stethoscope,
                title: "Doctor Brief",
                description:
                  "Generate a concise summary for your next consultation",
              },
            ].map((feature, i) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-6 rise-in"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <feature.icon className="mb-4 h-8 w-8 text-primary" />
                <h3 className="mb-2 font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              How PulseAI works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Simple steps to better health understanding
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                step: "1",
                title: "Share your health information",
                description:
                  "Upload reports, log symptoms, and add measurements",
              },
              {
                step: "2",
                title: "PulseAI organizes and analyzes",
                description:
                  "AI extracts values, finds patterns, and builds your timeline",
              },
              {
                step: "3",
                title: "Understand changes and patterns",
                description:
                  "See trends, anomalies, and insights from your data",
              },
              {
                step: "4",
                title: "Prepare for your doctor",
                description:
                  "Generate a Doctor Brief to make consultations more effective",
              },
            ].map((item, i) => (
              <div
                key={item.step}
                className="relative flex flex-col items-center text-center rise-in"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="grid h-16 w-16 place-items-center rounded-full gradient-brand text-2xl font-semibold text-primary-foreground">
                  {item.step}
                </div>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>
                {i < 3 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-1/2 bg-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctor Collaboration */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="glass rounded-3xl p-8 sm:p-12 lg:p-16">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Arrive better prepared
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  PulseAI helps you organize scattered health information into a
                  clear, concise summary for your doctor.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-primary text-xs">
                      ✓
                    </div>
                    <p className="text-sm">
                      Symptom history with timeline visualization
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-primary text-xs">
                      ✓
                    </div>
                    <p className="text-sm">
                      Recent lab reports with extracted values
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-primary text-xs">
                      ✓
                    </div>
                    <p className="text-sm">
                      Medication list and interaction checks
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary-soft text-primary text-xs">
                      ✓
                    </div>
                    <p className="text-sm">
                      Observed trends and questions to discuss
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="glass-subtle rounded-2xl p-6">
                  <div className="flex items-center gap-3 border-b border-border pb-4">
                    <Stethoscope className="h-5 w-5 text-primary" />
                    <span className="font-semibold">Doctor Brief Preview</span>
                  </div>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Patient:</span>
                      <span>Aarav Sharma</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Primary concern:</span>
                      <span>Persistent cough</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reports:</span>
                      <span>4 blood panels</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medications:</span>
                      <span>2 active</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Notable trend:</span>
                      <span>Glucose gradual increase</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="glass rounded-3xl p-8 sm:p-12">
            <ShieldCheck className="mx-auto mb-6 h-12 w-12 text-primary" />
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Safety first
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              PulseAI provides informational and decision-support assistance. It
              does not replace professional medical diagnosis or treatment.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="font-semibold">Not medical advice</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  All AI output is informational only
                </p>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="font-semibold">Doctor collaboration</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Designed to support, not replace, consultations
                </p>
              </div>
              <div className="rounded-xl bg-muted/50 p-4">
                <p className="font-semibold">Privacy focused</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your data stays under your control
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Start understanding your health today
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of people who are taking control of their health
            information
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button size="lg" className="rounded-xl" asChild>
              <Link to="/register">
                Start with PulseAI
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-xl" asChild>
              <Link to="/login">Log in</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <PulseLogo size="sm" />
              <p className="mt-3 text-sm text-muted-foreground">
                Personal Health Intelligence
              </p>
            </div>
            <div>
              <h4 className="font-semibold">Product</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/login" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-foreground">
                    How it works
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Company</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/login" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-foreground">
                    Safety
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold">Legal</h4>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/login" className="hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="hover:text-foreground">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>© 2026 PulseAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
