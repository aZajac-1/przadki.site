# React 19 + TypeScript Event App

A modern, responsive event management application built with React 19 and TypeScript.

## Features

- 🎨 Beautiful, modern UI with gradient designs
- 📱 Fully responsive for mobile and desktop
- 🌓 Dark mode support
- 🎯 Two-page application with routing
- ✨ Smooth animations and transitions
- 📋 Event information display with hero image
- ✅ Confirmation form with validation

## Pages

1. **Main Page (`/`)**: Features a hero section with a beautiful image and detailed event information including date, time, location, program, and catering details.

2. **Confirmation Page (`/potwierdz`)**: Interactive form for attendees to confirm their participation with success feedback.

## Tech Stack

- **React 19** - Latest version of React
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Modern styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── pages/
│   ├── MainPage.tsx       # Main event page
│   ├── MainPage.css
│   ├── ConfirmPage.tsx    # Confirmation form page
│   └── ConfirmPage.css
├── App.tsx                # Main app component with routing
├── App.css
├── main.tsx              # App entry point
└── index.css             # Global styles
```

## Customization

You can easily customize:
- Event details in `MainPage.tsx`
- Hero image (currently using Unsplash)
- Color scheme in CSS files
- Form fields in `ConfirmPage.tsx`

## License

This project is open source and available under the MIT License.

