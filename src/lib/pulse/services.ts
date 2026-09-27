/**
 * Mock service layer.
 * Each function simulates an async call so a real FastAPI backend can be
 * swapped in later without touching the UI components.
 */
import type { ExtractedValue, MedicalReport } from "./types";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
export const uid = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 8)}`;

export const mockAuthService = {
  async signIn(email: string, _password: string) {
    await wait(900);
    return { ok: true, email };
  },
  async register(name: string, email: string) {
    await wait(1100);
    return { ok: true, name, email };
  },
  async requestReset(email: string) {
    await wait(800);
    return { ok: true, email };
  },
};

export interface AiTurn {
  question: string;
  quickReplies: string[];
  category: string;
}

export const mockAIService = {
  script: [
    {
      question:
        "Thanks for sharing. Where exactly do you feel it, and how long has it been going on?",
      quickReplies: ["Center of my chest", "About three weeks", "In my throat"],
      category: "Location & duration",
    },
    {
      question:
        "Does it become worse during walking, exercise or physical effort?",
      quickReplies: ["Yes, when walking", "No change", "Only at night"],
      category: "Triggers",
    },
    {
      question:
        "How would you describe the intensity on a scale from mild to severe?",
      quickReplies: ["Mild", "Moderate", "Severe"],
      category: "Severity",
    },
    {
      question:
        "Have you also noticed fever, shortness of breath or unusual tiredness?",
      quickReplies: ["Occasional fever", "Shortness of breath", "None of these"],
      category: "Associated symptoms",
    },
    {
      question:
        "I can see two related records in your history. Has anything similar happened before?",
      quickReplies: ["Yes, last winter", "No, first time", "Not sure"],
      category: "Relevant history",
    },
    {
      question:
        "One last thing — how often does it occur during a typical day?",
      quickReplies: ["Several times a day", "Once or twice", "Constantly"],
      category: "Frequency",
    },
  ] as AiTurn[],

  async reply(step: number) {
    await wait(1200);
    return this.script[step] ?? null;
  },

  async assess() {
    await wait(1800);
    return {
      indicator: "Respiratory condition indicator",
      level: "Moderate",
      supporting: [
        "Persistent cough reported for 3 weeks",
        "Occasional fever",
        "Symptom duration beyond typical short-term illness",
      ],
      factors: [
        "Symptom duration",
        "Severity",
        "Associated symptoms",
        "Historical context",
      ],
      urgency:
        "Consider professional evaluation if symptoms are severe, worsening or persistent.",
    };
  },

  async assistant(prompt: string) {
    await wait(1000);
    const map: Record<string, string> = {
      "Analyze recent trend":
        "Your glucose records moved 95 → 99 → 105 → 111 mg/dL between January and September. That is a gradual upward pattern across four records — a useful thing to raise with a healthcare professional.",
      "Explain my report":
        "Your September panel shows glucose 111 mg/dL and hemoglobin 11.2 g/dL. Both moved in the same direction as your June report. Values should always be verified against the original document.",
      "Review my timeline":
        "Your timeline has 10 events across nine months: 4 reports, 2 symptom entries, 2 measurements, 1 medication entry and 1 AI-assisted assessment.",
      "Prepare doctor brief":
        "I can assemble a one-page brief covering your main concern, symptom history, recent reports and questions to discuss. Open Doctor Brief to generate it.",
    };
    return (
      map[prompt] ??
      "Here is what I can see in your stored records: four blood reports, a gradual glucose increase and a resting heart rate close to your personal baseline. This is an AI-assisted summary, not medical advice."
    );
  },
};

export const mockReportService = {
  steps: ["Uploading", "Processing", "Extracting", "Complete"],
  async process(fileName: string): Promise<MedicalReport> {
    await wait(600);
    const values: ExtractedValue[] = [
      {
        name: "Glucose (fasting)",
        value: 118,
        unit: "mg/dL",
        reference: "70–99 mg/dL",
        status: "above",
      },
      {
        name: "Hemoglobin",
        value: 11.2,
        unit: "g/dL",
        reference: "13.0–17.0 g/dL",
        status: "below",
      },
      {
        name: "HbA1c",
        value: 5.9,
        unit: "%",
        reference: "< 5.7 %",
        status: "above",
      },
    ];
    return {
      id: uid("rep"),
      title: fileName.replace(/\.[a-z]+$/i, "") || "Uploaded Report",
      type: "Blood report",
      date: new Date().toISOString().slice(0, 10),
      lab: "Uploaded by you",
      status: "processed",
      pages: 2,
      values,
    };
  },
};

export const mockImageService = {
  steps: [
    "Preparing image",
    "Preprocessing",
    "Running model",
    "Generating explanation",
  ],
  async analyse() {
    await wait(700);
    return {
      classification: "Example finding indicator",
      confidence: 87,
      note: "Prototype result — not a clinical diagnosis.",
      regions: "Lower-left lung field",
    };
  },
};

export const mockMedicationService = {
  async checkInteraction(a: string, b: string) {
    await wait(1200);
    if (!a || !b || a === b) return null;
    return {
      severity: "Moderate",
      title: "Potential interaction identified",
      description: `Known interaction information is available for ${a} and ${b}.`,
      guidance:
        "Discuss medication combinations with a qualified doctor or pharmacist.",
    };
  },
};

export const mockTimelineService = {
  async refresh() {
    await wait(500);
    return true;
  },
};

export const mockNotificationService = {
  async sync() {
    await wait(400);
    return true;
  },
};

export const mockAnalyticsService = {
  async load() {
    await wait(600);
    return true;
  },
};
