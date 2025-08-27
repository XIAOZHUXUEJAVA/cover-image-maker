# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev    # Start development server with Turbopack
npm run build  # Build production bundle with Turbopack  
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Project Overview

This is a **Next.js 15.5.2** application for creating customizable cover images. The app uses Turbopack for faster development and includes a comprehensive cover image editor with various customization options.

## Key Technologies
- **Next.js 15.5.2** with App Router
- **React 19.1.0** with TypeScript
- **Zustand** for state management with persistence
- **Tailwind CSS v4** with animations
- **Radix UI** components
- **html-to-image** for export functionality
- **Next Themes** for dark/light mode

## Architecture

The application follows a component-based architecture with:

### State Management (`/src/lib/store/cover-store.ts`)
- Zustand store with localStorage persistence
- Comprehensive cover settings: title, subtitle, colors, positioning, fonts, etc.
- Preset system for saving/loading design configurations

### Core Components (`/src/components/cover/`)
- `CoverEditor`: Main editor interface
- `CoverCanvas`: Preview and export component  
- `ControlsPanel`: Design controls and settings
- `ImagePicker`: Background image upload/selection
- `AvatarPicker`: Avatar management
- `ExportButtons`: PNG/JPEG export functionality

### UI Components (`/src/components/ui/`)
- Comprehensive Radix UI component library
- Form components with react-hook-form integration
- Theme-aware components with dark mode support

### Pages (`/src/app/`)
- `/`: Redirects to `/editor`
- `/editor`: Main cover image editor interface

## Key Features
- Real-time cover image preview with customizable text, colors, and layout
- Background image upload with scaling and positioning controls
- Avatar support with size and position adjustments
- Export to PNG/JPEG formats
- Persistent state management with localStorage
- Dark/light theme support
- Multiple aspect ratio options (16:9, 4:3, etc.)
- Text alignment, font size, and color controls
- Overlay and opacity controls

## Development Notes
- Uses TypeScript with strict mode enabled
- Path aliases configured (`@/*` → `./src/*`)
- ESLint configuration extends Next.js core rules
- All cover state is managed through Zustand store
- Components follow React best practices with proper typing