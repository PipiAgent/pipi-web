# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Neobrutalism Components - A collection of neobrutalism-styled UI components based on shadcn/ui. This is a Next.js 15 documentation site and component library built with React 19, TypeScript, and Tailwind CSS v4.

## Commands

```bash
pnpm dev              # Start dev server (Velite watches content changes)
pnpm build            # Production build
pnpm lint             # ESLint checking
pnpm format:write     # Format all files with Prettier
pnpm format:check     # Check formatting

# Generation scripts
pnpm generate-stars-ts    # Generate star SVG components from data
pnpm generate-charts-ts   # Generate chart examples from data
pnpm registry:generate    # Generate component registry JSON
pnpm registry:build       # Build shadcn registry with styles
```

## Architecture

### Content Pipeline
- **Velite** processes MDX files from `src/markdown/` into `.velite/` (auto-runs on dev/build)
- Documentation routes use `[[...slug]]` catch-all pattern in `src/app/docs/`
- Syntax highlighting via Shiki with custom theme from `src/data/theme.json`

### Component Structure
- `src/components/ui/` - Base UI components (shadcn/ui derived, 48 components)
- `src/components/app/` - Application components (navbar, sidebar, mdx-components, etc.)
- `src/components/stars/` - Decorative SVG star shapes (40+ components)

### Data-Driven Pattern
- `src/data/components.ts` - Component metadata registry
- `src/data/registry.ts` - Component code registry for examples
- `src/data/colors.ts` - Color palette definitions
- `src/data/sidebar-links.ts` - Navigation structure

### Key Directories
- `src/markdown/docs/` - General documentation MDX
- `src/markdown/components/` - Per-component documentation MDX (47 files)
- `src/examples/ui/` - Example implementations for complex components
- `src/scripts/` - Build/generation scripts

## Neobrutalism Design Conventions

Components follow these visual patterns:
- Bold black borders (2-4px)
- Heavy box shadows with offset (4px, no blur)
- Solid colors without gradients
- High contrast
- Interactive feedback via translate transforms on hover/active

CSS variables in `src/styling/globals.css`:
- `--main`, `--background`, `--foreground` - Core colors
- `--box-shadow-x`, `--box-shadow-y` - Shadow offsets
- `--border-radius` - Consistent 5px radius

## Component Patterns

Components use:
- **Class Variance Authority (CVA)** for variant definitions
- **Radix UI primitives** for accessibility
- **`cn()` utility** (clsx + tailwind-merge) for class merging
- **React Hook Form + Zod** for form handling

## Path Aliases

```
@/*       → ./src/*
@public/* → ./public/*
@docs     → ./.velite (generated content)
```
