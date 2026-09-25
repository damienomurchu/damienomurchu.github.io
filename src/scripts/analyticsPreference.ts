export const ANALYTICS_PREFERENCE_KEY = "umami.disabled";
export const ANALYTICS_PREFERENCE_EVENT = "analytics-preference-change";

export type AnalyticsPreference = {
  disabled: boolean;
};

export function analyticsDisabled(): boolean {
  return localStorage.getItem(ANALYTICS_PREFERENCE_KEY) === "1";
}

function notifyAnalyticsPreference(disabled: boolean): void {
  window.dispatchEvent(
    new CustomEvent<AnalyticsPreference>(ANALYTICS_PREFERENCE_EVENT, {
      detail: { disabled },
    })
  );
}

export function disableAnalytics(): void {
  localStorage.setItem(ANALYTICS_PREFERENCE_KEY, "1");
  notifyAnalyticsPreference(true);
}

export function enableAnalytics(): void {
  localStorage.removeItem(ANALYTICS_PREFERENCE_KEY);
  notifyAnalyticsPreference(false);
}

export function toggleAnalytics(): boolean {
  const disabled = !analyticsDisabled();

  if (disabled) {
    disableAnalytics();
  } else {
    enableAnalytics();
  }

  return disabled;
}

// Keep open tabs in sync when the preference changes in another tab.
window.addEventListener("storage", event => {
  if (event.key === ANALYTICS_PREFERENCE_KEY) {
    notifyAnalyticsPreference(event.newValue === "1");
  }
});
