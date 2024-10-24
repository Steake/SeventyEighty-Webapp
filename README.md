# Seventy Eighty

A luxury streetwear e-commerce platform built with SvelteKit.

## Features

- Responsive design optimized for all devices
- Dynamic product catalog with filtering and sorting
- Shopping cart with persistent state
- Product detail pages with size selection
- Modern, minimalist UI with custom branding

## Tech Stack

- SvelteKit - Full-stack web framework
- Svelte Stores - State management
- CSS Custom Properties - Theming and styling
- Custom Components - Modular UI architecture

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── lib/
│   ├── components/    # Reusable UI components
│   └── stores/        # Svelte stores for state management
├── routes/            # SvelteKit routes and pages
└── app.css           # Global styles and CSS variables
```

## Components

- `Cart.svelte` - Shopping cart sidebar
- `Logo.svelte` - Brand logo with variants
- `ProductCard.svelte` - Product display card
- `ProductFilter.svelte` - Category and sort filters

## Styling

The project uses CSS custom properties for consistent theming:

- Brand colors
- Typography
- Layout measurements
- Component-specific variables

## License

All rights reserved © Seventy Eighty