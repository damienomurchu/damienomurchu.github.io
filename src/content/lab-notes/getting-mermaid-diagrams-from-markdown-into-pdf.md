---
title: Getting Mermaid Diagrams From Markdown Into PDF
description: Why my Pandoc pipeline needed an explicit diagram-rendering stage.
pubDate: 2026-09-17
tags:
  - Tools & Automation
  - Writing
---

I write my technical papers in Markdown.

That works well until the paper contains Mermaid diagrams and I want to publish a PDF.

A Mermaid block such as:

````markdown
```mermaid
flowchart LR
    A[Source] --> B[Build]
    B --> C[Artifact]
```
````

contains the description of a diagram, not the diagram itself.

Pandoc understands the fenced code block, but it does not automatically run Mermaid and turn that block into an image.

My first PDFs therefore contained either Mermaid source or missing diagrams.

The solution I settled on was to make diagram rendering an explicit stage in the publishing pipeline.

The flow is now roughly:

```text
Markdown
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

The source Markdown remains canonical.

I run Mermaid CLI against it to produce an intermediate Markdown document where the Mermaid blocks have been replaced with references to rendered SVG files.

Conceptually, that stage looks like:

```bash
mmdc \
  -i paper.md \
  -o paper.rendered.md
```

Pandoc then receives the rendered version rather than the original source:

```bash
pandoc \
  paper.rendered.md \
  -f markdown-implicit_figures \
  --pdf-engine=typst \
  -o paper.pdf
```

That separation solved more than the immediate problem.

It gives the publishing pipeline a very obvious boundary.

If a diagram is wrong, I can inspect the SVG.

If the rendered Markdown is wrong, I can inspect that.

If both are correct but the PDF is wrong, the problem is somewhere in the Pandoc/Typst stage.

That is considerably easier to reason about than putting everything behind a Pandoc filter and debugging the entire transformation as one opaque operation.

There was one additional complication.

Mermaid can render some node labels using HTML inside SVG `foreignObject` elements. Browsers handle these perfectly well, but the SVG-to-Typst path does not necessarily do the same.

The result was diagrams where some text disappeared from the final PDF.

I fixed that in my Mermaid configuration by disabling HTML labels:

```json
{
  "flowchart": {
    "htmlLabels": false
  }
}
```

That forces Mermaid towards SVG-native text that survives the rest of the rendering pipeline.

I also run `mmdc` in a container rather than making its Node and browser dependencies part of my local machine configuration. My current Podman invocation mounts the writing repository into the container and preserves my user IDs so that generated files do not end up owned by root.

The exact container command is an implementation detail I can now hide behind:

```bash
just paper papers/unpacking-cicd/cicd-whitepaper-v1.0.md
```

That gives the overall workflow a useful property:

```text
source.md
    ↓
deterministic rendering pipeline
    ↓
publishable PDF
```

The lesson for me was broader than Mermaid.

When a document contains executable or renderable source formats, it helps to treat those transformations as real build stages rather than expecting the final document renderer to understand everything.

Mermaid owns diagrams.

Pandoc owns document conversion.

Typst owns PDF typesetting.

The Justfile owns the interface between me and the pipeline.

Each component has one fairly obvious responsibility, and when something breaks I know which boundary to inspect.

That is a much better property for a writing workflow than a clever one-line command.
