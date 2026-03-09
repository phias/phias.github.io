# Sophia's Magic Corner - UI/UX Portfolio

This is a personal portfolio and case study display website for Sophia (阿泥). It features a modern, clean, and interactive UI/UX design (incorporating soft "glass-card" aesthetics and custom typography).

## Core Pages

- `index.html`: Landing and introduction.
- `portfolio.html`: Showcase of the complete portfolio.
- `casestudy.html`: Display of design cases and side projects logically grouped with responsive cards.
- `blog.html`: Bento grid layout for articles and life updates.

## Style Structure

- `style.css`: Main styling file containing global tokens, layouts, component stylings, and page-specific blocks. Contains all UI/UX redesigns.
- `spec.md`: Detailed specifications for layout, UI tweaks, and refactoring guidelines.

1. **Maintenance Guidelines**
   Currently, the styling is being consolidated into a single `style.css` file to prevent duplicate classes and maintain namespace scopes correctly (e.g. scoping `.project-title` and `.project-desc` to `.page-casestudy`). See `spec.md` for refactoring specifications.

2. **Git Configuration**
   The `.gitignore` has been updated to exclude any personal AI skill (`.agent/`) and MCP config (`mcp_config.json`) files. See `spec.md` for more details.
