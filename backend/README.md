# NexusSTEM Backend API

Production-grade NestJS backend for the NexusSTEM e-commerce platform serving web storefront, admin CMS, and mobile app.

## Architecture

- **Framework**: NestJS 10.0.0 with TypeScript 5.1.0
- **Database**: PostgreSQL via Supabase with Prisma ORM
- **Auth**: Supabase JWT integration
- **Validation**: class-validator + class-transformer
- **API Documentation**: Swagger/OpenAPI

## Key Features

### Catalog Management
- Category hierarchy
- Product variants with retail + B2B pricing
- Inventory tracking with audit trail
- Preorder support
- Product image upload to Supabase Storage

### Shopping Cart
- User-specific persistent carts
- Automatic pricing based on customer tier (retail vs B2B)
- Tax calculation (5% VAT)

### Order Management
- Complete order lifecycle tracking
- Payment status progression (PENDING → AUTHORIZED → PAID)
- Fulfillment workflow (PENDING → PROCESSING → SHIPPED → DELIVERED)
- Automatic inventory deduction on payment confirmation

### Payment Processing
- **Bank Transfer**: Manual submission with admin verification
- Payment transaction audit trail with provider payloads

### B2B Management
- B2B account applications and approvals
- Tier-based pricing (STANDARD, TIER_1, TIER_2)
- Separate pricing visibility for B2B vs retail customers

### Admin Controls
- Product and category CRUD
- Order status management
- Bank transfer verification workflows
- Inventory adjustments with audit trail

## Project Structure

```
src/
├── main.ts                    # Application entry point
├── app.module.ts              # Root module
├── auth/
│   ├── auth.service.ts        # JWT token verification
│   └── auth.module.ts
├── common/
│   ├── guards/                # JWT auth + role-based guards
│   ├── decorators/            # @CurrentUser, @Roles
│   └── exceptions/            # Business exception handling
├── database/
│   └── prisma.service.ts      # Prisma client wrapper
├── categories/                # Category endpoints
├── products/                  # Product catalog endpoints
├── cart/                      # Shopping cart endpoints
├── orders/                    # Order creation + tracking
├── payments/                  # Bank transfer verification
└── inventory/                 # Inventory management
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase project with PostgreSQL database

### Installation

```bash
# Install dependencies
npm install

# Setup database connection
cp .env.example .env
# Edit .env with your Supabase DATABASE_URL

# Create database tables
npm run db:push

# (Optional) Seed development data
npm run db:seed
```

### Development

```bash
# Start development server with auto-reload
npm run start:dev

# Available at http://localhost:3333
# Swagger docs at http://localhost:3333/api/docs
```

### Production Build

```bash
# Build
npm run build

# Run
npm run start:prod
```

## API Endpoints

### Public (No Auth Required)
- `GET /api/v1/categories` – List all categories
- `GET /api/v1/categories/:slug` – Get category with products
- `GET /api/v1/products` – List products with pagination
- `GET /api/v1/products/search?q=query` – Search products
- `GET /api/v1/products/:slug` – Get product details

### User (Authentication Required)
- `GET /api/v1/cart` – Get user cart
- `POST /api/v1/cart/items` – Add to cart
- `PATCH /api/v1/cart/items/:itemId` – Update quantity
- `DELETE /api/v1/cart/items/:itemId` – Remove item
- `DELETE /api/v1/cart` – Clear cart
- `POST /api/v1/orders` – Create order from cart
- `GET /api/v1/orders` – Get user orders
- `GET /api/v1/orders/:id` – Get order details
- `POST /api/v1/payments/bank-transfer/submit` – Submit bank transfer proof

### Admin (Admin/Staff Role Required)
- `POST /api/v1/categories` – Create category
- `PATCH /api/v1/categories/:id` – Update category
- `DELETE /api/v1/categories/:id` – Delete category
- `POST /api/v1/products` – Create product
- `PATCH /api/v1/products/:id` – Update product
- `DELETE /api/v1/products/:id` – Delete product
- `GET /api/v1/orders` – Get all orders
- `PATCH /api/v1/orders/:id/status` – Update order status
- `GET /api/v1/payments/bank-transfer/pending` – Get pending verifications
- `PATCH /api/v1/payments/bank-transfer/:submissionId/verify` – Verify bank transfer

## Payment Integration

### Bank Transfer Flow
1. User selects bank transfer as payment method
2. Order created with `paymentStatus: AWAITING_VERIFICATION`
3. User submits bank proof via `POST /api/v1/payments/bank-transfer/submit`
4. Admin reviews at `GET /api/v1/payments/bank-transfer/pending`
5. Admin verifies via `PATCH /api/v1/payments/bank-transfer/:submissionId/verify`
6. On approval: payment status → PAID, inventory decremented automatically

### Payment Method Scope
- Bank transfer is the only active payment method in this deployment.

## Database Schema

### Key Models

**User**
- Roles: CUSTOMER, B2B_CUSTOMER, ADMIN, STAFF
- Email-based auth via Supabase

**Product**
- Retail pricing: `basePriceLkr`
- B2B pricing: `b2bPriceLkr` (optional)
- Stock: `stockQty`
- Status: ACTIVE / INACTIVE
- Preorder: `preorderEnabled`

**Order**
- Payment Status: PENDING, AUTHORIZED, PAID, FAILED, REFUNDED, AWAITING_VERIFICATION
- Fulfillment Status: PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED
- Automatic inventory deduction on PAID

**BankTransferSubmission**
- Verification Status: PENDING, APPROVED, REJECTED
- Audit trail: verifiedBy, verifiedAt

**InventoryAdjustment**
- Adjustment Type: ORDER, MANUAL, STOCK_CORRECTION
- Tracks all inventory changes with user audit trail

See [prisma/schema.prisma](./prisma/schema.prisma) for complete schema.

## Validation Rules

- Product SKU must be unique
- Product slug auto-generated from name, must be unique
- B2B users can only see B2B prices
- Inventory deduction only on confirmed payment
- Bank transfer proofs must have valid URLs

## Error Handling

Standard HTTP status codes:
- `200` – Success
- `201` – Created
- `204` – No Content
- `400` – Bad Request (validation, business logic)
- `401` – Unauthorized (missing/invalid token)
- `403` – Forbidden (insufficient permissions)
- `404` – Not Found
- `500` – Server Error

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Coverage report
npm run test:cov
```

## Environment Variables

See `.env.example` for complete list. Critical variables:

- `DATABASE_URL` – Supabase PostgreSQL connection
- `SUPABASE_URL` – Supabase project URL
- `SUPABASE_ANON_KEY` – Public anon key
- `JWT_SECRET` – For token signing
- No gateway credentials are required while operating in bank-deposit-only mode.

## Deployment

### Supabase Setup
1. Create project at https://supabase.com
2. Copy connection string to `DATABASE_URL` in `.env`
3. Run migrations: `npm run db:push`

### Backend Deployment (e.g., Render, Heroku)
1. Set environment variables in host platform
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Start: `npm run start:prod`

## Troubleshooting

**Connection Refused**
- Verify `DATABASE_URL` is correct
- Check Supabase project is active
- Ensure IP is whitelisted in Supabase

**Token Validation Fails**
- Verify `SUPABASE_URL` and `SUPABASE_ANON_KEY`
- Check token is from same Supabase project
- Ensure JWT hasn't expired

**Inventory Not Updating**
- Orders only decrement on `paymentStatus: PAID`
- Verify payment processing completed
- Check `InventoryAdjustment` table for errors

## Next Steps

1. **File Upload** – Integrate with Supabase Storage for proof files
2. **Notifications** – Email/SMS for order updates and bank verification
3. **Admin Reporting** – Sales, inventory, customer dashboards
4. **Advanced Pricing** – Bulk discounts, seasonal pricing, voucher codes
5. **Advanced Search** – Elasticsearch or full-text search
6. **Analytics** – Product views, conversion funnels, user behavior

## Support

For issues or questions, refer to:
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)

---

**Project**: NexusSTEM E-Commerce Platform  
**Language**: TypeScript  
**Region**: Sri Lanka (LKR currency)
