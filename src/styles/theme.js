export const darkTheme = {
  "--bg": "#0c0f1a",
  "--card": "#141829",
  "--card2": "#1a1f36",
  "--border": "#252b45",
  "--text": "#e8eaf0",
  "--text-dim": "#7c829b",
  "--hover": "#1e2440",
  "--accent": "#f97316",
  "--accent2": "#8b5cf6",
  "--shadow": "0 8px 40px rgba(0,0,0,0.4)",
  "--sidebar": "#0f1225",
  "--topbar": "rgba(12,15,26,0.88)",
};

export const lightTheme = {
  "--bg": "#f0f2f5",
  "--card": "#ffffff",
  "--card2": "#f8f9fb",
  "--border": "#e4e7ed",
  "--text": "#111827",
  "--text-dim": "#6b7280",
  "--hover": "#f3f4f6",
  "--accent": "#f97316",
  "--accent2": "#6366f1",
  "--shadow": "0 8px 40px rgba(0,0,0,0.08)",
  "--sidebar": "#111827",
  "--topbar": "rgba(255,255,255,0.88)",
};

export function getTheme(dark) {
  return dark ? darkTheme : lightTheme;
}
