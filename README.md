# E-commerce Web Application

A modern, responsive e-commerce platform for browsing and managing a smartphone catalog, built as a Yarn v4 monorepo with Next.js v14 (SSR) and Styled Components. Meets the Zara Challenge requirements with added enhancements.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Running the Application](#running-the-application)
- [Building the Application](#building-the-application)
- [Testing and Static Analysis](#testing-and-static-analysis)
- [CI/CD](#cicd)
- [Debugging](#debugging)
- [Fixes and Improvements](#fixes-and-improvements)

---

## Overview

A seamless shopping experience with a grid-based phone listing, real-time search, detailed views with dynamic pricing, and a persistent cart. Features fluid, accessible, theme-ready UI.

---

## Tech Stack

- **Frontend**: Next.js v14 (SSR), React 18, Styled Components
- **Backend**: Node.js 22
- **State**: React Context API
- **Styling**: Styled Components, fluid responsive design, CSS variables
- **Monorepo**: Yarn v4, Turborepo
- **Testing**: React Testing Library
- **Analysis**: Biome, TypeScript
- **CI/CD**: Turbo, `render.yaml`

---

## Project Structure

```
demo-shop/
├── apps/                    # Server and web apps
│   ├── apps-server/         # Backend server logic
│   └── apps-web/            # Next.js frontend
├── packages/                # Shared packages
│   ├── domain/              # Business logic (@demo-shop/domain)
│   │   └── src/
│   ├── repositories/        # Data access layer (@demo-shop/repos)
│   │   └── src/
│   ├── ui/                  # UI-related packages
│   │   ├── components/      # Reusable UI components (@demo-shop/ui-components)
│   │   │   └── src/
│   ├── utils/               # Utility packages
│   │   ├── env/             # Environment utils (@demo-shop/utils-env)
│   │   │   └── src/
│   │   ├── logging/         # Logging utils (@demo-shop/utils-logging)
│   │   │   └── src/
│   │   └── typescript-config/ # TypeScript config (e.g., base.json)
├── package.json             # Root config
├── turbo.json               # Turborepo config
```

---

## Setup Instructions

1. **Prerequisites**: Node.js >= 22, Yarn >= 4.8.1
2. **Clone**: `git clone https://github.com/guillempuche/demo_shop.git && cd demo_shop`
3. **Install**: `yarn install`
4. **Env**: Copy `apps/apps-server/.env.example` to `.env` and configure.
5. **Hooks**: `yarn prepare`

---

## Running the Application

- **Server**: `yarn server`
- **Web**: `yarn web`
- **Paths**: `yarn generate-paths` (if needed)

---

## Building the Application

- **Production**: `yarn build` (minified assets via Turborepo)

---

## Testing and Static Analysis

- **Types**: `yarn check-types`
- **Lint**: `yarn lint` (Biome + Syncpack)
- **Secrets**: `yarn check-secrets`
- **Hooks**: Managed by Lefthook

---

## CI/CD

- **Turborepo**: Efficient builds and caching
- **Render**: Optional deployment via `render.yaml`

---

## Debugging

- **VSCode**: Use Chrome Attacher
- **Chrome**: `yarn chrome` (`--remote-debugging-port=9222`)

---

## Fixes and Improvements

### Fixes

- **Bag Icon**: Dynamic item count
- **Logo**: Add and style
- **Accessibility**: Image `alt`, VoiceOver support
- **Similar Items**: Scrollbar style, overflow fix
- **Not Found**: Better styling
- **Borders**: Consistent grid thickness
- **Search**: Close button animation
- **Loading**: Header bar indicator

### Improvements

- **Tooltip**: For interactive elements
- **Localization**: Multi-language support
- **Animations**: Enhance actions
- **Design**: Material Design 3-inspired system
- **Cart**: Show duplicated items with quantities
