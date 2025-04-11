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
- **Styling**: Styled Components, fluid responsive design (dynamic spacing), CSS variables
- **Monorepo**: Yarn v4, Turborepo
- **Testing**: Playwright for E2E, Storybook for UI components
- **Analysis**: Biome, TypeScript
- **CI/CD**: Turbo, `render.yaml`

---

## Project Structure

```
demo-shop/
├── apps/ # Server and web apps
│ ├── apps-server/ # Backend server logic
│ └── apps-web/ # Next.js frontend
│    └── tests/ # E2E tests with Playwright
├── packages/ # Shared packages
│ ├── domain/ # Business logic (@demo-shop/domain)
│ │ └── src/
│ ├── repositories/ # Data access layer (@demo-shop/repos)
│ │ └── src/
│ ├── ui/ # UI-related packages
│ │ ├── components/ # Reusable UI components (@demo-shop/ui-components)
│ │ │ └── src/
│ ├── utils/ # Utility packages
│ │ ├── env/ # Environment utils (@demo-shop/utils-env)
│ │ │ └── src/
│ │ ├── logging/ # Logging utils (@demo-shop/utils-logging)
│ │ │ └── src/
│ │ └── typescript-config/ # TypeScript config (e.g., base.json)
├── package.json # Root config
├── turbo.json # Turborepo config
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
- **Paths**: `yarn generate-paths` (only when creating packages)

---

## Building the Application

- **Production**: `yarn build` (minified assets via Turborepo)

---

## Testing and Static Analysis

### UI Component Testing with Storybook

Storybook provides an isolated environment to develop, test, and document UI components. Each component in the UI library has its own set of stories that showcase different states and variations, making it easier to develop and test components in isolation.

> **Note:** The Storybook implementation for UI components is mostly complete, with stories for all major components in the UI library. The script to run it is still broken.

### End-to-End Testing

The application uses Playwright for visual regression and end-to-end testing:

- **Run E2E tests**: `yarn test:e2e`
- **Update baseline screenshots**: `yarn test:e2e:update`
- **Debug tests with UI**: `yarn test:e2e:ui`

To run E2E tests, both the web and server applications need to be running. The tests will automatically capture screenshots of key pages (homepage, product details, and checkout) and compare them against the baseline images.

### Static Analysis

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

- **Checkout**: Better responsiveness for small screens in card item and bottom section
- **Bag Icon**: Better styling
- **Logo**: Better styling
- **Accessibility**: Image `alt`, VoiceOver support of all elements
- **Similar Items**: Scrollbar style, add the right overflow
- **Borders**: Consistent thickness of grid borders
- **Search**: Close button animation
- **Loading**: Add it to the header bar

### Improvements

- **Images**: Faster loading
- **Not Found**: Better styling
- **Tooltip**: For interactive elements
- **Localization**: Multi-language support
- **Animations**: Enhance actions
- **Design**: Material Design 3-inspired system
- **Cart**: Show duplicated items with quantities
