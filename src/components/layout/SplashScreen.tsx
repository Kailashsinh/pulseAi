import { useEffect, useState } from "react";
import { PulseLogo } from "@/components/brand/PulseLogo";
import { BackgroundDecor } from "./BackgroundDecor";

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        onComplete();
      }, 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background transition-opacity duration-700 ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <BackgroundDecor />
      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <div className="rise-in">
          <PulseLogo size="lg" showTagline />
        </div>
        <div className="rise-in" style={{ animationDelay: "200ms" }}>
          <p className="text-sm text-muted-foreground">
            Personal Health Intelligence
          </p>
        </div>
        <div className="rise-in" style={{ animationDelay: "400ms" }}>
          <div className="mt-4 h-1 w-32 overflow-hidden rounded-full bg-muted">
            <div className="h-full w-full gradient-brand animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      </div>
    </div>
  );
}
