# qBTC: Quantum-Safe Bitcoin Sidechain

## Overview

qBTC is a quantum-resistant Bitcoin sidechain application built as a full-stack web platform. The project consists of a marketing website showcasing qBTC's quantum-safe technology, along with backend infrastructure for user interactions and potential wallet functionality. The application serves as both an educational platform about quantum threats to Bitcoin and a demonstration of post-quantum cryptography implementation.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with pages for Home, Technology, Whitepaper, Docs, Roadmap, Team, Blog, Contact, and Wallet functionality
- **Styling**: Tailwind CSS with custom design system featuring Bitcoin orange (`#FF9500`) as primary color and dark-first theming
- **Component Library**: shadcn/ui components with Radix UI primitives for accessibility
- **Animation**: Framer Motion for smooth transitions and interactive effects
- **State Management**: TanStack Query for server state management

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Development**: tsx for development server with hot reloading
- **Build**: esbuild for production bundling

### Design System
- **Color Scheme**: Dark-first design with Bitcoin orange accents
- **Typography**: Space Grotesk for headings, Inter for body text, JetBrains Mono for code
- **Components**: Glass morphism cards, gradient backgrounds, and quantum-themed visual elements
- **Responsive**: Mobile-first responsive design with 12-column grid system

## Key Components

### Frontend Pages
1. **Home**: Hero section with quantum countdown, benefits showcase, and migration path visualization
2. **Technology**: Deep dive into consensus mechanisms, signature schemes, and bridge security
3. **Q-Day**: Educational page about quantum threat timeline with expert opinion carousel
4. **Whitepaper**: Full whitepaper content with downloadable PDF option
5. **Docs**: API documentation and quick-start guides
6. **Roadmap**: Timeline of development milestones and future plans
7. **Team**: Team member profiles with expertise and social links
8. **Blog**: Technical articles and research updates
9. **Contact**: Contact form with backend integration
10. **Wallet**: Quantum-safe wallet interface and setup flows

### Interactive Features
- **Quantum Countdown**: Real-time countdown to estimated quantum threat timeline (2028)
- **Code Blocks**: Animated typewriter effect for displaying code examples
- **Mouse Trail**: Subtle interactive effects for enhanced user experience
- **Theme Toggle**: Dark/light mode switching with persistence

### Backend Services
- **Contact API**: Form submission handling with validation using Zod schemas
- **Storage Layer**: Abstracted storage interface supporting both in-memory and database persistence
- **Static Serving**: Vite integration for development with static file serving in production

## Data Flow

### Client-Side Data Flow
1. **User Interaction**: User navigates between pages or interacts with components
2. **State Management**: TanStack Query manages server state and caching
3. **Form Submission**: Contact forms and other user inputs are validated client-side then sent to API
4. **Theme Persistence**: Theme preferences are stored in localStorage
5. **Animation Triggers**: Framer Motion handles scroll-based animations and page transitions

### Server-Side Data Flow
1. **Request Handling**: Express.js routes handle API requests
2. **Validation**: Zod schemas validate incoming data
3. **Storage Operations**: Abstracted storage layer handles data persistence
4. **Response**: JSON responses sent back to client with appropriate status codes

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, Framer Motion for animations
- **Component Library**: Radix UI primitives, Lucide React icons
- **Styling**: Tailwind CSS, class-variance-authority for component variants
- **State Management**: TanStack Query for server state
- **Form Handling**: React Hook Form with Hookform resolvers
- **Utilities**: clsx, date-fns, tailwind-merge

### Backend Dependencies
- **Server**: Express.js, tsx for TypeScript execution
- **Database**: Drizzle ORM with PostgreSQL dialect, Neon Database serverless driver
- **Validation**: Zod for schema validation, drizzle-zod for integration
- **Build Tools**: esbuild for production builds, Vite for development

### Development Tools
- **TypeScript**: Full TypeScript support across frontend and backend
- **Build Tools**: Vite with React plugin, PostCSS with Tailwind
- **Database Tools**: Drizzle Kit for migrations and schema management

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR and Express.js backend
- **Database**: Uses DATABASE_URL environment variable for PostgreSQL connection
- **Hot Reloading**: Full-stack hot reloading with tsx and Vite integration

### Production Build
- **Frontend**: Vite builds React application to `dist/public`
- **Backend**: esbuild bundles Express.js server to `dist/index.js`
- **Static Assets**: Served from build output directory
- **Database**: Production PostgreSQL database via Neon Database
- **Hostinger Deployment**: Requires flattening build structure from `dist/public/` to `dist/` to avoid 403 errors

### Architecture Decisions
1. **Full-Stack TypeScript**: Chosen for type safety across the entire application stack
2. **Vite over Create React App**: Better performance, modern tooling, and ES modules support
3. **Drizzle ORM**: Type-safe database access with excellent TypeScript integration
4. **Express.js**: Simple, well-established server framework for API routes
5. **shadcn/ui**: High-quality, accessible components with full customization control
6. **Dark-First Design**: Aligns with crypto/technical audience preferences

## Changelog
- June 27, 2025: Initial setup
- July 6, 2025: Updated team page with real team members and advisory board
- July 6, 2025: Fixed deployment issue - removed old build files from root directory that were being served instead of dist/public
- July 6, 2025: Fixed 403 forbidden error - simplified .htaccess file to be compatible with shared hosting providers, removed restrictive directives, added comprehensive troubleshooting guide
- July 6, 2025: Fixed home page benefit cards alignment - implemented fixed heights for title (h-16) and description (h-28) containers to ensure perfect horizontal alignment of code blocks across all three cards
- July 9, 2025: Added Q-Day page with quantum threat awareness content and expert tweet carousel

## User Preferences

Preferred communication style: Simple, everyday language.

