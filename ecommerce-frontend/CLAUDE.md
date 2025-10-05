# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on port 5000 (opens at http://localhost:5000)
- `npm run dev:turbo` - Start development server with Turbopack
- `npm run build` - Build production version
- `npm run build:turbo` - Build production version with Turbopack
- `npm start` - Start production server

## Architecture Overview

This is a luxury perfume e-commerce website built with Next.js 15 App Router, TypeScript, and Tailwind CSS.

### Key Architectural Patterns

**Route Groups**: Uses Next.js route groups to organize layouts:

- `(public-layout)/` - Public-facing pages (home, collections, products, about, contact, etc.)
- `(user-layout)/` - User-specific pages (login, register, profile, orders)
- `(admin-layout)/` - Admin dashboard and management pages
- `(protected-layout)/` - Protected pages requiring authentication (checkout)

**State Management**:

- **Cart**: `contexts/cart-context.tsx` provides server-synchronized cart state
  - Server-side cart persistence via TanStack Query with real-time synchronization
  - Complex product price variant handling with automatic transformations
  - Optimistic updates with rollback on failure
  - Cart items include: id, name, price, size, image, quantity, tags
- **Authentication**: `contexts/auth-context.tsx` provides auth state management
  - Manages user tokens, profile data, and role-based permissions (admin/user)
  - Integrates with localStorage for token persistence
  - Provides login/logout functionality and profile updates
- **Global Data**: `providers/combined-data-provider.tsx` creates unified data layer
  - Aggregates settings, categories, products, and types using `useAppData` hook
  - Provides loading states, error handling, and refetch capabilities
  - Used throughout the app for consistent data access
- **Data Fetching**: TanStack Query (React Query) for server state management
  - Configured in `providers/query-provider.tsx` with 5-minute stale time
  - 20-minute garbage collection time with retry logic
  - Development tools included for debugging
  - Optimistic updates for mutations

**Component Architecture**:

- Shadcn/ui components in `components/ui/` for reusable UI primitives
- Business components in `components/` for specific features (header, footer, cart-drawer, etc.)
- Domain-specific components organized in subdirectories:
  - `components/admin/` - Admin-specific components
  - `components/auth/` - Authentication components
  - `components/orders/` - Order management components
  - `components/user/` - User profile components
- Uses compound component patterns for complex UI like cart drawer

**Styling**: Tailwind CSS with shadcn/ui design system:

- Custom CSS variables for theming in `app/globals.css`
- DM Sans font with variable font support (configured via Next.js font optimization)
- Configured with "new-york" style variant of shadcn/ui
- Consistent product card design patterns used across seasonal selection and product detail pages

**Authentication & Authorization**:

- Client-side route guards instead of middleware for authentication
- `components/auth/admin-route-guard.tsx` - Protects admin routes, redirects to `/admin/login` if not authenticated or not admin
- `components/auth/user-route-guard.tsx` - Protects user routes, provides elegant error pages for admin users trying to access user routes
- `components/auth/protected-route-guard.tsx` - Protects pages requiring any authentication
- Route guards integrated into layout files for seamless protection

### Key Dependencies

- **Next.js 15.5.2** with App Router and Turbopack support
- **React 19.1.0** with modern concurrent features
- **Tailwind CSS v4** with OKLCH color system for luxury aesthetics
- **TanStack Query v5** for advanced server state management with optimistic updates
- **TypeScript 5** with strict configuration
- **shadcn/ui** component library (Radix UI primitives + Tailwind)
- **React Hook Form + Zod** for form validation
- **Lucide React** for icons
- **Cloudinary** for image management and optimization
- **Vercel Analytics** for tracking
- **TypeScript** with strict mode configuration

### File Structure Conventions

- Path aliases configured: `@/` maps to root directory
- Components use TypeScript with strict mode
- Client components explicitly marked with "use client" directive
- Server components by default (App Router pattern)

### Naming Conventions

**File Naming**: Use kebab-case for all file names:

- ✅ `order-card.tsx`, `user-profile.tsx`, `delete-order-modal.tsx`
- ❌ `OrderCard.tsx`, `UserProfile.tsx`, `DeleteOrderModal.tsx`

**Component Names**: Use PascalCase for component names within files:

- ✅ `export default function OrderCard() {}`
- ✅ `export function StatusChangeModal() {}`

**Directory Structure**: Use kebab-case for directory names:

- ✅ `components/orders/`, `api/mutation/`, `types/order.ts`
- ❌ `components/Orders/`, `api/Mutation/`, `types/Order.ts`

**Optional Chaining**: Always use optional chaining (`?.`) to safely access nested properties:

- ✅ `order?.user?.name`, `selectedOrder?._id`, `item?.product?.brand`
- ❌ `order.user.name`, `selectedOrder._id`, `item.product.brand`
- This prevents runtime errors when properties might be undefined or null

### Component Organization

**Component Organization Guidelines**:

- Keep components under 200 lines when possible
- Extract complex functionality into separate components
- Each component should have a single responsibility
- Prefer composition over large monolithic components
- Use props to pass data and callbacks between components

### API Architecture

**Data Layer Structure**:

- `lib/api/endpoints/` - API endpoint definitions and base URLs
- `lib/api/queries/` - Data fetching functions (GET operations)
- `lib/api/mutation/` - Data modification functions (POST, PUT, DELETE operations)
- `lib/api/upload/` - File upload utilities for image management
- `lib/validations.ts` - Zod schemas for API request/response validation
- `utils/image-upload.ts` - Cloudinary integration utilities

**Type Definitions**:

- `types/product.ts` - Product-related interfaces and types
- `types/order.ts` - Order management types
- `types/category.ts` - Product category definitions
- `types/auth/` - Authentication-related types

### API Architecture

**Centralized Authentication**: `lib/api/utils/authorized-fetch.ts`

- Automatic token attachment and refresh
- Global error handling with automatic logout on 401
- Consistent error formatting across all endpoints

**Domain-Specific Endpoints** (`lib/api/endpoints/`):

- `auth.api.ts`, `cart.api.ts`, `category.api.ts`, `order.api.ts`, `product.api.ts`
- Each domain has corresponding query and mutation hooks in `hooks/queries/` and `hooks/mutations/`
- Base URL configuration centralized in `base-url.ts`
- Production API: `https://perfume-backend-pi.vercel.app`

**Query and Mutation Organization**:

- Separate directories for queries (`hooks/queries/`) and mutations (`hooks/mutations/`)
- Proper TypeScript interfaces for API responses
- Error handling with toast notifications using Sonner

**Data Validation**: Zod schemas in `schemas/` directory for consistent type validation:

- `auth.schema.ts` - User registration and authentication validation
- `product.schema.ts` - Product and pricing data validation
- Form data validation integrated with React Hook Form

### Environment Configuration

**Development Server**: Runs on port 5000 (not default 3000)

- Development: `http://localhost:5000`
- Production API: `https://perfume-backend-pi.vercel.app`

**Environment Variables** (`.env.local`):

- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name for image uploads
- `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` - Unsigned upload preset
- `NEXT_PUBLIC_API_URL` - Backend API URL

### Provider Architecture

**Sophisticated Provider Hierarchy**:

1. `QueryProvider` - TanStack Query configuration with 5-minute stale time and dev tools
2. `CombinedDataProvider` - Unified data layer using `useAppData` hook for global app state
3. `AuthProvider` - Authentication state with localStorage persistence
4. `CartProvider` - Server-synchronized cart state with optimistic updates

**CombinedDataProvider Pattern**: Central data hub using `useAppData` hook:

- Aggregates settings, categories, products, and types from API
- Provides loading states, error handling, and refetch capabilities
- Creates unified data layer accessible throughout the app via `useCombinedDataContext`

### Cart System Architecture

**Server-Synchronized Cart**: Unlike typical client-side carts, this uses:

- Server-side cart persistence via TanStack Query with real-time backend synchronization
- Complex product price variant handling with automatic data transformations
- Optimistic updates with rollback on failure for better UX
- Token-based authentication requirement (cart queries disabled when no token present)

**Cart Data Flow**:

- API response contains nested product and productPrices arrays
- `transformCartData()` function converts API format to CartItem interface
- CartItem structure: `{id, name, price, size, image, quantity, tags}`
- Real-time synchronization with server on all cart operations (add/remove/update)

**Key Implementation Details**:

- Cart queries only run when authentication token is available
- Uses `useAuth()` context to get token for cart API calls
- All cart mutations show toast notifications on success/error
- Cart drawer opens automatically after successful item addition

### Development Workflow Notes

**Add to Cart Implementation Pattern**:
When implementing add to cart functionality, always:

1. Import `useAddCartItemMutation` (not `useAddToCartMutation`) from `@/hooks/mutations/use-cart-mutations`
2. Get `openCart` function from `useCart()` context
3. Fetch product prices using `/api/product-prices/product/{productId}` endpoint
4. Use first available price if multiple prices exist
5. Call mutation with: `{product: productId, productPrices: [priceId], quantity: 1}`
6. Open cart drawer with `openCart()` after successful addition
7. Toast notifications are handled automatically by the mutation

**Product Card Design Pattern**:
When creating product cards, follow the established seasonal selection pattern:

1. Use Card component with consistent styling: `group bg-white border-0 shadow-none`
2. Price and volume layout: Price on left, volume dropdown on right with `gap-12`
3. Volume dropdown styling: `border border-primary` with `ChevronDown` icon
4. Auto-select first price when multiple prices available
5. Handle discount prices: Show crossed-out original price, then discounted price
6. Prevent dropdown clicks from navigating to product page with `e.stopPropagation()`
7. Euro currency formatting: `${amount.toFixed(2)} €`

**Authentication Integration**:

- Cart queries require authentication token from `useAuth()` context
- All authenticated API calls use `createAuthorizedFetch` utility
- Tokens are stored in localStorage and automatically attached to requests
- 401 errors trigger automatic logout and redirect to login page

**Common File Patterns**:

- Query hooks: `hooks/queries/use-{domain}-query.ts`
- Mutation hooks: `hooks/mutations/use-{domain}-mutations.ts`
- API endpoints: `lib/api/endpoints/{domain}.api.ts`
- Type definitions: `types/{domain}.ts`
- Validation schemas: `schemas/{domain}.schema.ts`
