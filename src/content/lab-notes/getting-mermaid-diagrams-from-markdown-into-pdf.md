---
title: Getting Mermaid Diagrams From Markdown Into PDF
description: Why my Pandoc pipeline needed an explicit diagram-rendering stage.
pubDate: 2026-09-17
tags:
  - Tools & Automation
  - Writing
featured: true
---

I write my technical papers in Markdown and use Mermaid for diagrams. That works until I need a PDF: a Mermaid block contains diagram source, not a rendered diagram, and Pandoc does not execute it automatically.

My first attempts therefore produced PDFs containing either the Mermaid source or no diagram at all. The fix was to stop treating diagram rendering as an incidental part of document conversion and make it an explicit build stage.

## The pipeline

The workflow now has three distinct transformations:

```text
Markdown source
      │
      ▼
Mermaid CLI (mmdc)
      │
      ├── SVG diagrams
      │
      ▼
Rendered Markdown
      │
      ▼
Pandoc + Typst
      │
      ▼
PDF
```

The original Markdown remains the canonical source. Mermaid CLI processes it and produces an intermediate Markdown file in which each Mermaid block has been replaced by a reference to a rendered SVG.

Conceptually, the rendering stage is:

```bash
mmdc \
  -i paper.md \
  -o paper.rendered.md
```

Pandoc then converts the rendered document rather than the source document:

```bash
pandoc \
  paper.rendered.md \
  -f markdown-implicit_figures \
  --pdf-engine=typst \
  -o paper.pdf
```

This creates useful diagnostic boundaries. If a diagram is wrong, I inspect the generated SVG. If the document points to the wrong asset, I inspect the rendered Markdown. If both are correct but the PDF is not, the fault is in the Pandoc or Typst stage.

That is easier to operate than hiding every transformation behind a single Pandoc filter. Each intermediate artifact is inspectable, and each failure can be isolated to one stage.

## Making Mermaid output compatible with Typst

The next problem was more specific. Mermaid can render node labels as HTML inside SVG `foreignObject` elements. Browsers handle these elements, but the SVG-to-Typst path does not always preserve them. In my PDFs, some diagram labels disappeared even though the SVG looked correct in a browser.

I disabled HTML labels in the Mermaid configuration:

```json
{
  "flowchart": {
    "htmlLabels": false
  }
}
```

This makes Mermaid use SVG-native text, which survives the remaining conversion stages.

## Containing the rendering dependencies

`mmdc` depends on Node and a browser runtime. I run it in a Podman container rather than make those dependencies part of my workstation configuration. The writing repository is mounted into the container, and the process runs with my user and group IDs so generated files are not owned by root.

The container invocation is hidden behind a stable repository command:

```bash
just paper papers/unpacking-cicd/cicd-whitepaper-v1.0.md
```

The implementation behind that command can change without changing how I use the workflow locally or in CI. The Justfile is the interface; the rendering script and container are implementation details.

## Result

The useful pattern extends beyond Mermaid. When a document contains source formats that must be rendered or executed, those transformations should be modelled as real build stages with explicit inputs, outputs and failure boundaries.

In this pipeline, Mermaid owns diagram rendering, Pandoc owns document conversion, Typst owns PDF typesetting, and the Justfile provides the operator interface. The result is not the shortest possible command. It is a repeatable workflow that produces a publishable PDF and makes failures straightforward to locate.

