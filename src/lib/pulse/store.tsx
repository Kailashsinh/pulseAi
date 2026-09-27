import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  anomalies as seedAnomalies,
  correlationData,
  demoUser,
  insights as seedInsights,
  medications as seedMeds,
  metrics as seedMetrics,
  notifications as seedNotifications,
  patterns,
  reports as seedReports,
  timeline as seedTimeline,
} from "./demo-data";
import type {
  AppNotification,
  DemoUser,
  Insight,
  MedicalReport,
  Medication,
  TimelineEvent,
} from "./types";

const STORAGE_KEY = "pulseai-demo-state-v1";

interface Prefs {
  aiAnalysis: boolean;
  historicalInsights: boolean;
  alerts: boolean;
  trendInsights: boolean;
  reportProcessing: boolean;
  appointmentReminders: boolean;
  shareAnonymised: boolean;
}

interface PersistedState {
  signedIn: boolean;
  onboarded: boolean;
  user: DemoUser;
  reports: MedicalReport[];
  medications: Medication[];
  insights: Insight[];
  timeline: TimelineEvent[];
  notifications: AppNotification[];
  prefs: Prefs;
  briefGenerated: boolean;
}

const defaultState: PersistedState = {
  signedIn: false,
  onboarded: false,
  user: demoUser,
  reports: seedReports,
  medications: seedMeds,
  insights: seedInsights,
  timeline: seedTimeline,
  notifications: seedNotifications,
  prefs: {
    aiAnalysis: true,
    historicalInsights: true,
    alerts: true,
    trendInsights: true,
    reportProcessing: true,
    appointmentReminders: false,
    shareAnonymised: false,
  },
  briefGenerated: false,
};

interface StoreValue extends PersistedState {
  metrics: typeof seedMetrics;
  anomalies: typeof seedAnomalies;
  patterns: typeof patterns;
  correlationData: typeof correlationData;
  unreadCount: number;
  signIn: (name?: string) => void;
  signOut: () => void;
  completeOnboarding: (focus: string[], goals: string[]) => void;
  addReport: (report: MedicalReport) => void;
  addMedication: (med: Medication) => void;
  removeMedication: (id: string) => void;
  markInsightReviewed: (id: string) => void;
  addTimelineEvent: (event: TimelineEvent) => void;
  pushNotification: (n: AppNotification) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  setPref: (key: keyof Prefs, value: boolean) => void;
  updateUser: (patch: Partial<DemoUser>) => void;
  setBriefGenerated: (v: boolean) => void;
  resetDemo: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

export function PulseStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...defaultState, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }, [state, hydrated]);

  const patch = useCallback(
    (fn: (s: PersistedState) => PersistedState) => setState(fn),
    [],
  );

  const value = useMemo<StoreValue>(
    () => ({
      ...state,
      metrics: seedMetrics,
      anomalies: seedAnomalies,
      patterns,
      correlationData,
      unreadCount: state.notifications.filter((n) => !n.read).length,
      signIn: (name) =>
        patch((s) => ({
          ...s,
          signedIn: true,
          user: name ? { ...s.user, name } : s.user,
        })),
      signOut: () => patch((s) => ({ ...s, signedIn: false })),
      completeOnboarding: (focusAreas, goals) =>
        patch((s) => ({
          ...s,
          onboarded: true,
          signedIn: true,
          user: { ...s.user, focusAreas, goals },
        })),
      addReport: (report) =>
        patch((s) => ({ ...s, reports: [report, ...s.reports] })),
      addMedication: (med) =>
        patch((s) => ({ ...s, medications: [med, ...s.medications] })),
      removeMedication: (id) =>
        patch((s) => ({
          ...s,
          medications: s.medications.filter((m) => m.id !== id),
        })),
      markInsightReviewed: (id) =>
        patch((s) => ({
          ...s,
          insights: s.insights.map((i) =>
            i.id === id ? { ...i, reviewed: true } : i,
          ),
        })),
      addTimelineEvent: (event) =>
        patch((s) => ({ ...s, timeline: [...s.timeline, event] })),
      pushNotification: (n) =>
        patch((s) => ({ ...s, notifications: [n, ...s.notifications] })),
      markAllRead: () =>
        patch((s) => ({
          ...s,
          notifications: s.notifications.map((n) => ({ ...n, read: true })),
        })),
      markRead: (id) =>
        patch((s) => ({
          ...s,
          notifications: s.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),
      setPref: (key, v) =>
        patch((s) => ({ ...s, prefs: { ...s.prefs, [key]: v } })),
      updateUser: (p) => patch((s) => ({ ...s, user: { ...s.user, ...p } })),
      setBriefGenerated: (v) => patch((s) => ({ ...s, briefGenerated: v })),
      resetDemo: () => setState(defaultState),
    }),
    [state, patch],
  );

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function usePulse() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("usePulse must be used inside PulseStoreProvider");
  return ctx;
}
