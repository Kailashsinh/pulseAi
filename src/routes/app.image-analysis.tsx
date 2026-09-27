import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ScanLine, Upload } from "lucide-react";
import { toast } from "sonner";
import { Disclaimer, GlassCard, PageHeader } from "@/components/common/pulse-ui";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockImageService } from "@/lib/pulse/services";

export const Route = createFileRoute("/app/image-analysis")({
  head: () => ({
    meta: [
      { title: "Medical Image Analysis — PulseAI" },
      {
        name: "description",
        content:
          "A supported chest X-ray screening prototype with an explanation of where the model looked.",
      },
      { property: "og:title", content: "Medical Image Analysis — PulseAI" },
      {
        property: "og:description",
        content: "Prototype chest X-ray screening with attention visualisation.",
      },
    ],
  }),
  component: ImageAnalysisPage,
});

interface Result {
  classification: string;
  confidence: number;
  note: string;
  regions: string;
}

function XrayMock({ overlay }: { overlay: "none" | "heat" | "both" }) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-[oklch(0.22_0.02_260)]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <ellipse cx="50" cy="52" rx="34" ry="42" fill="oklch(0.34 0.02 260)" />
        <ellipse cx="35" cy="50" rx="13" ry="26" fill="oklch(0.28 0.02 260)" />
        <ellipse cx="65" cy="50" rx="13" ry="26" fill="oklch(0.28 0.02 260)" />
        <rect x="47" y="16" width="6" height="66" rx="3" fill="oklch(0.46 0.02 260)" />
        {Array.from({ length: 7 }).map((_, i) => (
          <path
            key={i}
            d={`M22 ${28 + i * 8} Q50 ${20 + i * 8} 78 ${28 + i * 8}`}
            stroke="oklch(0.46 0.02 260)"
            strokeWidth="1.4"
            fill="none"
            opacity="0.7"
          />
        ))}
      </svg>
      {overlay !== "none" && (
        <div
          className="absolute left-[22%] top-[55%] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full blur-xl"
          style={{
            background:
              "radial-gradient(circle, oklch(0.63 0.18 22 / 0.75), oklch(0.78 0.14 75 / 0.4) 55%, transparent 72%)",
            opacity: overlay === "both" ? 0.75 : 1,
          }}
        />
      )}
    </div>
  );
}

function ImageAnalysisPage() {
  const [stage, setStage] = useState(-1);
  const [result, setResult] = useState<Result | null>(null);
  const [uploaded, setUploaded] = useState(false);

  const run = async () => {
    setUploaded(true);
    setResult(null);
    for (let i = 0; i < mockImageService.steps.length; i++) {
      setStage(i);
      await new Promise((r) => setTimeout(r, 950));
    }
    const r = await mockImageService.analyse();
    setStage(-1);
    setResult(r);
    toast.success("Screening result ready");
  };

  return (
    <>
      <PageHeader
        icon={<ScanLine className="h-5 w-5" />}
        title="Medical Image Analysis"
        subtitle="Supported medical-image screening prototype — chest X-ray only."
      />

      {!uploaded && (
        <div className="rounded-2xl border-2 border-dashed border-border bg-card/60 px-6 py-12 text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary float-slow">
            <Upload className="h-6 w-6" />
          </span>
          <p className="mt-3 text-sm font-medium">Upload chest X-ray</p>
          <p className="mt-1 text-xs text-muted-foreground">Supported: PNG, JPG, JPEG</p>
          <Button className="mt-4 rounded-xl" onClick={run}>
            Choose image
          </Button>
        </div>
      )}

      {uploaded && stage >= 0 && (
        <GlassCard className="p-6">
          <div className="mx-auto max-w-md">
            <div className="mx-auto h-24 w-24 rounded-2xl gradient-brand pulse-ring" />
            <div className="mt-6 space-y-3">
              {mockImageService.steps.map((s, i) => (
                <div key={s} className="flex items-center gap-3 text-sm">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      i < stage ? "bg-success" : i === stage ? "bg-primary" : "bg-muted"
                    }`}
                  />
                  <span className={i <= stage ? "" : "text-muted-foreground"}>{s}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full gradient-brand transition-[width] duration-700"
                style={{ width: `${((stage + 1) / mockImageService.steps.length) * 100}%` }}
              />
            </div>
          </div>
        </GlassCard>
      )}

      {result && (
        <div className="grid gap-4 lg:grid-cols-2">
          <GlassCard className="p-5">
            <h2 className="text-sm font-semibold">Image</h2>
            <Tabs defaultValue="original" className="mt-3">
              <TabsList className="rounded-xl bg-muted/70 p-1">
                <TabsTrigger value="original" className="rounded-lg">Original</TabsTrigger>
                <TabsTrigger value="attention" className="rounded-lg">Attention map</TabsTrigger>
                <TabsTrigger value="overlay" className="rounded-lg">Overlay</TabsTrigger>
              </TabsList>
              <TabsContent value="original" className="mt-3">
                <XrayMock overlay="none" />
              </TabsContent>
              <TabsContent value="attention" className="mt-3">
                <XrayMock overlay="heat" />
              </TabsContent>
              <TabsContent value="overlay" className="mt-3">
                <XrayMock overlay="both" />
              </TabsContent>
            </Tabs>
          </GlassCard>

          <div className="space-y-4">
            <GlassCard className="p-5">
              <h2 className="text-sm font-semibold">Screening result</h2>
              <p className="mt-2 text-xl font-semibold">{result.classification}</p>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Confidence</span>
                  <span>{result.confidence}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full gradient-brand transition-[width] duration-1000"
                    style={{ width: `${result.confidence}%` }}
                  />
                </div>
              </div>
              <p className="mt-3 rounded-xl bg-warning/15 px-3 py-2 text-sm">{result.note}</p>
            </GlassCard>

            <GlassCard className="p-5">
              <h2 className="text-sm font-semibold">Why did the model focus here?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                The highlighted area sits in the {result.regions}. Highlighted regions represent
                areas that influenced the model's output. They should not be interpreted as proof
                of disease.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Region intensity", "Texture pattern", "Image contrast", "Model attention"].map((f) => (
                  <span key={f} className="rounded-full bg-primary-soft px-2.5 py-1 text-xs text-primary">
                    {f}
                  </span>
                ))}
              </div>
              <Button variant="outline" className="mt-4 rounded-xl">
                Review guidance
              </Button>
            </GlassCard>

            <div className="flex gap-2">
              <Button variant="outline" className="rounded-xl" onClick={() => { setUploaded(false); setResult(null); }}>
                Analyse another image
              </Button>
            </div>
          </div>
        </div>
      )}

      <Disclaimer text="Prototype screening output — not a clinical diagnosis. Always have medical images reviewed by a qualified professional." />
    </>
  );
}
