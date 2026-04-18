// EmberPod palette — mirrors the landing page (black + white + glass).
// Ember-orange lives in the app icon, not in the UI chrome.
const ink950 = '#050505';
const ink900 = '#0a0a0a';
const ink700 = '#171717';
const white = '#FFFFFF';

export default {
  light: {
    // "light" kept for API compat — we render the same dark theme regardless.
    text: white,
    background: ink950,
    tint: white,
    tabIconDefault: 'rgba(255,255,255,0.4)',
    tabIconSelected: white,
  },
  dark: {
    text: white,
    background: ink950,
    tint: white,
    tabIconDefault: 'rgba(255,255,255,0.4)',
    tabIconSelected: white,
  },
};

export const palette = {
  ink950,
  ink900,
  ink700,
  white,
};
