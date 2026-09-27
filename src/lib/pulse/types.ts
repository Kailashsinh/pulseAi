export type Severity = "info" | "low" | "moderate" | "high";

export interface DemoUser {
  name: string;
  email: string;
  age: number;
  dob: string;
  avatarInitials: string;
  focusAreas: string[];
  goals: string[];
}

export interface MetricPoint {
  date: string; // ISO
  label: string; // short display, e.g. "Jan"
  value: number;
}

export interface MetricSeries {
  id: string;
  name: string;
  unit: string;
  points: MetricPoint[];
  baselineLow: number;
  baselineHigh: number;
  trend: "up" | "down" | "stable";
  trendNote: string;
}

export interface ExtractedValue {
  name: string;
  value: number;
  unit: string;
  reference: string;
  status: "within" | "above" | "below";
}

export interface MedicalReport {
  id: string;
  title: string;
  type: string;
  date: string;
  lab: string;
  status: "processed" | "processing" | "failed";
  values: ExtractedValue[];
  pages: number;
}

export interface Insight {
  id: string;
  title: string;
  description: string;
  evidence: string;
  category: "trends" | "anomalies" | "reports" | "symptoms" | "risk";
  severity: Severity;
  date: string;
  reviewed: boolean;
  metricId?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: "symptom" | "report" | "vital" | "medication" | "insight" | "assessment";
  title: string;
  description: string;
  detail: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  notes: string;
  status: "active" | "paused";
}

export interface AppNotification {
  id: string;
  type: "trend" | "report" | "anomaly" | "assessment" | "system" | "reminder";
  title: string;
  body: string;
  date: string;
  read: boolean;
}

export interface Anomaly {
  id: string;
  metric: string;
  value: string;
  usualRange: string;
  date: string;
  note: string;
}

export interface DetectedPattern {
  id: string;
  title: string;
  evidence: string;
  range: string;
  confidence: number;
  nextStep: string;
  severity: Severity;
}
