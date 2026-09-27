import { useEffect } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/layout/AppShell";
import { usePulse } from "@/lib/pulse/store";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { signedIn, onboarded } = usePulse();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if not signed in
    if (!signedIn) {
      navigate({ to: "/login" });
      return;
    }

    // Redirect to onboarding if not completed
    if (!onboarded) {
      navigate({ to: "/onboarding" });
      return;
    }
  }, [signedIn, onboarded, navigate]);

  // Don't render if redirecting
  if (!signedIn || !onboarded) {
    return null;
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
