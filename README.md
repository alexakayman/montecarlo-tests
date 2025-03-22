# Monte Carlo Philanthropic Simulator

A Next.js application for simulating the long-term impact of philanthropic investment strategies.

## Overview

This application provides an interface for configuring and running Monte Carlo simulations on philanthropic investments. Users can input details about:

- Assets
- Charitable vehicles (foundations, DAFs, trusts)
- Family members
- Legacy plans
- Investment strategies
- Asset correlations

The application then generates projections for both philanthropic impact and family wealth preservation.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Bun](https://bun.sh/) - JavaScript runtime and package manager

## Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/monte-carlo-simulator.git
cd monte-carlo-simulator
```

2. **Install dependencies**

Make sure you have Bun installed, then run:

```bash
bun install
```

3. **Run the development server**

```bash
bun dev
```

4. **Access the application**

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
monte-carlo-simulator/
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── page.tsx    # Main page
│   │   └── globals.css # Global styles
│   ├── components/     # UI components
│   │   ├── forms/      # Form components
│   │   └── ui/         # Reusable UI components
│   └── types/          # TypeScript type definitions
├── public/             # Static assets
└── .next/              # Next.js build output
```

## Backend Integration

This frontend is designed to work with a separate backend that handles the actual Monte Carlo simulations. The simulation logic is expected to be imported from a `legacy.ts` file.

To connect the frontend to your backend:

1. Implement an API endpoint that accepts the configuration and returns the simulation results
2. Update the `handleSubmit` function in `src/app/page.tsx` to call your API

## Features

- Multi-tab form for organized input
- Real-time validation
- Responsive design
- Support for multiple charitable vehicles
- Asset correlation matrix
- Investment strategy configuration
- Family succession planning

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
