# Heila AI Frontend

## Overview

Heila AI is an advanced AI chatbot platform that provides intelligent conversational experiences for businesses and users. This repository contains the frontend application built with Next.js, designed to deliver a seamless and intuitive user interface for interacting with our AI models.

## Technologies

- Next.js 14 with App Router
- React 18
- TypeScript
- Tailwind CSS
- Vercel AI SDK
- shadcn/ui components
- Radix UI primitives


## Features

- Modern, responsive UI for AI chat interactions
- Multi-modal input support (text, images)
- Code block execution and visualization
- Document previews and attachments
- User profile and subscription management
- Customizable AI model selection
- Real-time streaming responses
- Chat history and session management

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:Skyforge-Solutions/heliaBot_frontend.git
   cd heliaBot_frontend
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` with your configuration values.

4. Start the development server:
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
/app                # Next.js app directory
  /(chat)           # Chat-related pages and components
  /(profile)        # User profile pages
  /api              # API routes
/blocks             # Block-based content components
/components         # Reusable UI components
/hooks              # Custom React hooks
/lib                # Utility functions and shared logic
/public             # Static assets
```

## Environment Variables

The application requires several environment variables to function properly. See `.env.example` for the required variables.

> **Important**: Never commit your `.env.local` file to version control as it may contain sensitive API keys and secrets.

## Deployment

This project is configured for deployment on Vercel:

```bash
pnpm build
```

For production deployment, connect your GitHub repository to Vercel for automatic deployments.

## Testing

```bash
pnpm test           # Run all tests
pnpm test:unit      # Run unit tests
pnpm test:e2e       # Run end-to-end tests
```

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Submit a pull request




## License

This project is proprietary and confidential. Unauthorized copying, distribution, or use is strictly prohibited.

## Contact

For questions or support, please contact the Skyforge Solutions development team at dev@buildwithskyforge.com 
