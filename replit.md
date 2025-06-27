# qBTC Marketing Website

## Project Overview
A cutting-edge marketing website for qBTC quantum-safe Bitcoin side-chain, showcasing advanced blockchain technology through interactive and engaging user experiences.

**Purpose**: Marketing and informational website for qBTC (quantum-secure Bitcoin sidechain) 
**Goals**: Educate users about quantum-safe cryptography, provide technical documentation, and offer wallet interface demos
**Current State**: Fully functional marketing site with comprehensive content and mobile-optimized responsive design

## Technology Stack
- React with Framer Motion for advanced animations
- TypeScript for type safety
- Tailwind CSS for responsive styling
- Vite for build tooling
- Express.js backend for API routes
- Custom mouse interaction and particle effects
- Quantum-inspired UI design with interactive elements

## Project Architecture

### Frontend Structure
- **Pages**: Home, Technology, Whitepaper, Docs, Roadmap, Team, Blog, Wallet Setup, Contact
- **Components**: 
  - Navigation with mobile hamburger menu
  - QuantumCountdown with mobile-responsive sizing
  - MouseTrail for background ripple effects
  - CodeBlock with typewriter animation
  - MigrationPath visualization
  - QuantumSecurityWidget for browser compatibility checking

### Key Features
- Responsive mobile-first design optimized for all screen sizes
- Interactive background ripple effects that respond to mouse movement
- Glass-card styling with backdrop blur effects
- qBTC orange color branding (#f79619)
- Comprehensive technical documentation and whitepapers
- Team profiles with expertise showcase
- Development roadmap with milestone tracking

## Recent Changes

### December 27, 2025 - Mobile Responsiveness Optimization
- **QuantumCountdown**: Implemented responsive text sizing (text-xl sm:text-2xl md:text-4xl) and flexible grid layout
- **Home Page**: Updated hero section with progressive text sizing (text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl)
- **Technology Page**: Optimized cards layout and tab navigation for mobile screens
- **Whitepaper Page**: Hidden table of contents on mobile, improved content padding
- **Team Page**: Enhanced team member cards with responsive avatar sizing
- **CodeBlock Component**: Added mobile-friendly padding and text sizing
- **Global CSS**: Added overflow-x: hidden to prevent horizontal scrolling issues
- **Navigation**: Already mobile-optimized with hamburger menu for smaller screens

### Previous Enhancements
- Replaced particle trail effects with subtle background ripple animations
- Enhanced header with gradient mask fade effect for seamless transitions
- Updated Whitepaper page with comprehensive qBTC technical content
- Implemented new favicon using qBTC logo
- Created responsive card layouts throughout the application

## User Preferences
- Prefers subtle background ripple effects over particle trails
- Wants elements to scale properly on mobile without going off screen edges
- Appreciates quantum-themed visual elements with orange branding
- Values comprehensive technical documentation presentation

## Development Guidelines
- Use responsive design patterns: text-sm sm:text-base md:text-lg
- Implement mobile-first approach with progressive enhancement
- Maintain qBTC orange color consistency (#f79619)
- Ensure all components work within glass-card styling
- Test responsive behavior across different screen sizes
- Keep animations subtle and performance-optimized

## Known Issues
- Console warnings about DialogContent accessibility (non-critical)
- Some browser compatibility notices (Browserslist data outdated)

## Next Steps
- Continue monitoring mobile responsiveness across different devices
- Consider adding mobile-specific navigation enhancements
- Potential PWA features for mobile users