let rendering = false;
let renderAgain = false;
let themeObserver: MutationObserver | undefined;

function prepareDiagrams() {
  const codeBlocks = document.querySelectorAll<HTMLElement>(
    'pre[data-language="mermaid"] > code'
  );

  for (const code of codeBlocks) {
    const originalPre = code.parentElement;
    if (!originalPre) continue;

    const source = code.textContent?.trim() ?? "";
    const figure = document.createElement("figure");
    figure.className = "paper-diagram";

    const diagram = document.createElement("pre");
    diagram.className = "mermaid";
    diagram.dataset.mermaidSource = source;
    diagram.textContent = source;

    originalPre.replaceWith(figure);
    figure.appendChild(diagram);

    const possibleCaption = figure.nextElementSibling;
    if (
      possibleCaption instanceof HTMLParagraphElement &&
      possibleCaption.textContent?.trim().startsWith("Figure ")
    ) {
      const caption = document.createElement("figcaption");
      caption.innerHTML = possibleCaption.innerHTML;
      diagram.setAttribute(
        "aria-label",
        possibleCaption.textContent?.trim() ?? "Technical diagram"
      );
      possibleCaption.remove();
      figure.appendChild(caption);
    }
  }
}

async function renderDiagrams() {
  if (rendering) {
    renderAgain = true;
    return;
  }

  prepareDiagrams();
  const diagrams = Array.from(
    document.querySelectorAll<HTMLElement>(".paper-diagram .mermaid")
  );
  if (diagrams.length === 0) return;

  rendering = true;
  const isPrint = new URLSearchParams(window.location.search).has("print");
  if (isPrint && document.documentElement.dataset.theme !== "light") {
    document.documentElement.dataset.theme = "light";
    document.documentElement.classList.remove("dark");
  }

  const isDark = !isPrint && document.documentElement.dataset.theme === "dark";
  const { default: mermaid } = await import("mermaid");

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: "strict",
    theme: isDark ? "dark" : "base",
    fontFamily: "IBM Plex Mono, monospace",
    flowchart: {
      htmlLabels: true,
      useMaxWidth: true,
      curve: "basis",
    },
    themeVariables: isDark
      ? {
          primaryColor: "#272e33",
          primaryTextColor: "#cbd0cd",
          primaryBorderColor: "#c98968",
          lineColor: "#98a3a8",
          clusterBkg: "#1b2024",
          clusterBorder: "#3a444a",
        }
      : {
          primaryColor: "#dedad1",
          primaryTextColor: "#34393a",
          primaryBorderColor: "#006b78",
          lineColor: "#667075",
          clusterBkg: "#ebe8e1",
          clusterBorder: "#cbc6bb",
        },
  });

  for (const diagram of diagrams) {
    diagram.textContent = diagram.dataset.mermaidSource ?? "";
    diagram.removeAttribute("data-processed");
  }

  try {
    await mermaid.run({ nodes: diagrams });
    document.documentElement.dataset.paperDiagrams = "ready";
    document.dispatchEvent(new CustomEvent("paper:diagrams-ready"));
  } finally {
    rendering = false;
    if (renderAgain) {
      renderAgain = false;
      void renderDiagrams();
    }
  }
}

function setupPaperDiagrams() {
  void renderDiagrams();

  themeObserver?.disconnect();
  themeObserver = new MutationObserver(mutations => {
    if (
      mutations.some(
        mutation =>
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
      )
    ) {
      void renderDiagrams();
    }
  });
  themeObserver.observe(document.documentElement, { attributes: true });
}

setupPaperDiagrams();
document.addEventListener("astro:page-load", setupPaperDiagrams);
