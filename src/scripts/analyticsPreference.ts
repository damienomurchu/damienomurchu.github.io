export const ANALYTICS_PREFERENCE_KEY = "forged-analytics";
const PRODUCTION_DOMAIN = "forged.damienmurphy.net";

type AnalyticsState = {
  allowed: boolean;
  locked: boolean;
  description: string;
};

export function getAnalyticsState(): AnalyticsState {
  const browser = navigator as Navigator & { globalPrivacyControl?: boolean };
  if (browser.globalPrivacyControl === true || browser.doNotTrack === "1") {
    return {
      allowed: false,
      locked: true,
      description: `Analytics disabled — respecting browser ${browser.globalPrivacyControl ? "Global Privacy Control" : "Do Not Track"}`,
    };
  }
  try {
    // Preserve opt-outs made with the previous control during migration.
    if (localStorage.getItem("umami.disabled") === "1") {
      localStorage.setItem(ANALYTICS_PREFERENCE_KEY, "disabled");
      localStorage.removeItem("umami.disabled");
    }
    const allowed =
      localStorage.getItem(ANALYTICS_PREFERENCE_KEY) !== "disabled";
    return {
      allowed,
      locked: false,
      description: `Analytics ${allowed ? "enabled" : "disabled"}`,
    };
  } catch {
    // Without readable preferences we cannot know whether this browser opted out.
    return {
      allowed: false,
      locked: true,
      description: "Analytics disabled — browser storage unavailable",
    };
  }
}

export function toggleAnalytics(): void {
  const state = getAnalyticsState();
  if (state.locked) return;
  try {
    localStorage.setItem(
      ANALYTICS_PREFERENCE_KEY,
      state.allowed ? "disabled" : "enabled"
    );
    // A full reload tears down the tracker and its listeners when opting out.
    window.location.reload();
  } catch {
    reflectControls(
      "Unable to save analytics preference — browser storage unavailable"
    );
  }
}

function reflectControls(error?: string): void {
  const state = getAnalyticsState();
  const description = error ?? state.description;
  document
    .querySelectorAll<HTMLElement>("[data-analytics-preference-status]")
    .forEach(status => {
      status.textContent = description;
    });
  document
    .querySelectorAll<HTMLButtonElement>(
      "[data-analytics-toggle], [data-analytics-preference-button]"
    )
    .forEach(button => {
      button.disabled = false;
      button.setAttribute("role", "switch");
      button.setAttribute("aria-checked", String(state.allowed));
      button.setAttribute("aria-disabled", String(state.locked));
      button.setAttribute("aria-label", `Forged analytics: ${description}`);
      button.title = state.locked
        ? description
        : `${description} — activate to ${state.allowed ? "disable" : "enable"}`;
      button.dataset.analyticsDisabled = String(!state.allowed);
      if (button.hasAttribute("data-analytics-preference-button")) {
        button.textContent = state.locked
          ? "Analytics disabled by browser"
          : "Forged analytics";
      } else {
        button.classList.toggle("text-accent", !state.allowed);
        button.classList.toggle("text-muted-foreground", state.allowed);
      }
      button.onclick = toggleAnalytics;
    });
}

let initialized = false;
export function setupAnalytics(): void {
  if (initialized) return;
  initialized = true;
  reflectControls();
  document.addEventListener("astro:page-load", () => reflectControls());
  window.addEventListener("storage", event => {
    if (event.key === ANALYTICS_PREFERENCE_KEY || event.key === null)
      window.location.reload();
  });
  if (
    !getAnalyticsState().allowed ||
    window.location.hostname !== PRODUCTION_DOMAIN
  )
    return;
  try {
    const script = document.createElement("script");
    script.src = "https://analytics.damienmurphy.net/script.js";
    script.defer = true;
    script.dataset.websiteId = "c6e51cce-feaa-429f-a2fb-cebabf8d8c08";
    script.dataset.domains = PRODUCTION_DOMAIN;
    script.dataset.doNotTrack = "true";
    script.dataset.excludeSearch = "true";
    script.dataset.excludeHash = "true";
    document.head.appendChild(script);
  } catch {
    // Analytics is optional: never retry or route around browser blocking.
  }
}
