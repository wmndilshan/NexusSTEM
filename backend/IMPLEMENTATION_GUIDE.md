# Backend Implementation Guide

## Phase Summary

### ✅ Completed
- [x] Database schema (Prisma) with 14 entities and comprehensive enums
- [x] Core NestJS structure (main.ts, app.module.ts)
- [x] Prisma service for database connection
- [x] Auth infrastructure (JWT guard, role-based access)
- [x] Categories module (CRUD)
- [x] Products module (CRUD, search, pricing)
- [x] Shopping cart module (add/remove/update items)
- [x] Orders module (create from cart, status tracking, inventory deduction)
- [x] Payments module (bank transfer submissions and verification)
- [x] Custom decorators (@CurrentUser, @Roles)
- [x] Exception handling (BusinessException)
- [x] Swagger documentation setup
- [x] Development configuration (.env.example, docker-compose.yml)
- [x] Prisma seed file with sample data

### 🟡 Partial Implementation
- [ ] B2B module (stub created, needs implementation)
- [ ] Admin module (stub created, needs implementation)
- [ ] Inventory module (stub created, needs implementation)

### ⏳ Not Started
- [ ] PayHere payment gateway integration
- [ ] Koko payment gateway integration
- [ ] File upload handling (Supabase Storage)
- [ ] Email notifications
- [ ] Advanced search/filtering
- [ ] User authentication endpoints
- [ ] Product image management

---

## File Structure

```
backend/
├── src/
│   ├── main.ts                     ✅ Entry point with Swagger setup
│   ├── app.module.ts               ✅ Root module with all imports
│   ├── auth/
│   │   ├── auth.service.ts         ✅ JWT token verification
│   │   ├── auth.module.ts          ✅ Auth module
│   │   └── interfaces/
│   │       └── jwt-payload.interface.ts  ✅ JWT payload type
│   ├── common/
│   │   ├── guards/
│   │   │   ├── jwt.guard.ts        ✅ JWT authentication guard
│   │   │   └── roles.guard.ts      ✅ Role-based access control
│   │   ├── decorators/
│   │   │   ├── roles.decorator.ts  ✅ @Roles decorator
│   │   │   └── current-user.decorator.ts  ✅ @CurrentUser decorator
│   │   └── exceptions/
│   │       └── business.exception.ts ✅ Custom business exception
│   ├── database/
│   │   └── prisma.service.ts       ✅ Prisma client wrapper
│   ├── categories/                 ✅ Category management
│   │   ├── categories.service.ts
│   │   ├── categories.controller.ts
│   │   ├── categories.module.ts
│   │   └── dto/
│   │       ├── create-category.dto.ts
│   │       └── update-category.dto.ts
│   ├── products/                   ✅ Product catalog
│   │   ├── products.service.ts
│   │   ├── products.controller.ts
│   │   ├── products.module.ts
│   │   └── dto/
│   │       ├── create-product.dto.ts
│   │       └── update-product.dto.ts
│   ├── cart/                       ✅ Shopping cart
│   │   ├── cart.service.ts
│   │   ├── cart.controller.ts
│   │   ├── cart.module.ts
│   │   └── dto/
│   │       ├── add-to-cart.dto.ts
│   │       └── update-cart-item.dto.ts
│   ├── orders/                     ✅ Order management
│   │   ├── orders.service.ts
│   │   ├── orders.controller.ts
│   │   ├── orders.module.ts
│   │   └── dto/
│   │       ├── create-order.dto.ts
│   │       └── update-order-status.dto.ts
│   ├── payments/                   ✅ Payment processing
│   │   ├── payments.service.ts
│   │   ├── payments.controller.ts
│   │   ├── payments.module.ts
│   │   └── dto/
│   │       ├── submit-bank-transfer.dto.ts
│   │       └── verify-bank-transfer.dto.ts
│   ├── b2b/                        🟡 Stub only
│   │   └── b2b.module.ts
│   ├── admin/                      🟡 Stub only
│   │   └── admin.module.ts
│   └── inventory/                  🟡 Stub only
│       └── inventory.module.ts
├── prisma/
│   ├── schema.prisma               ✅ Complete data model
│   └── seed.ts                     ✅ Development seed data
├── package.json                    ✅ Dependencies
├── tsconfig.json                   ✅ TypeScript config
├── .env.example                    ✅ Environment variables template
├── .gitignore                      ✅ Git ignore rules
├── Dockerfile                      ✅ Container image
├── docker-compose.yml              ✅ Local development setup
└── README.md                       ✅ Documentation
```

---

## Key Implementation Details

### Database Connection
The backend connects to Supabase PostgreSQL via Prisma. Connection is established in `PrismaService`:
- Connects on module initialization
- Disconnects on module destruction
- Prisma client extends with `$connect()` and `$disconnect()`

### Authentication Flow
1. User authenticates via Supabase Auth
2. Supabase returns JWT token
3. Token sent in `Authorization: Bearer <token>` header
4. `JwtAuthGuard` verifies token and extracts user info
5. User info injected via `@CurrentUser()` decorator
6. `RolesGuard` checks user role against `@Roles()` decorator

### Order Lifecycle
```
Cart Items
    ↓
POST /orders (Create Order)
    ↓
Order created with status:
  - paymentStatus: PENDING
  - fulfillmentStatus: PENDING
    ↓
User selects payment method:
  - BANK_TRANSFER → User submits proof
  - PAYHERE → Redirected to PayHere
  - KOKO → Redirected to Koko
    ↓
Payment Processing:
  - BANK_TRANSFER: Admin verification → PAID or FAILED
  - PAYHERE: Webhook callback → PAID
  - KOKO: Webhook callback → PAID
    ↓
On paymentStatus = PAID:
  - Inventory decremented automatically
  - InventoryAdjustment recorded
    ↓
Admin updates fulfillmentStatus:
  PENDING → PROCESSING → SHIPPED → DELIVERED
    ↓
Customer receives order tracking updates
```

### Cart Totals Calculation
- Subtotal = Sum of (item quantity × unit price)
- Tax = 5% of subtotal (VAT)
- Total = Subtotal + Tax
- Pricing is based on PricingType (RETAIL or B2B)

### Inventory Management
- Inventory only decremented when `paymentStatus = PAID`
- Each adjustment recorded in `InventoryAdjustment` table
- Tracks adjuster (SYSTEM, admin user ID, or manual entry)
- Supports ORDER, MANUAL, STOCK_CORRECTION types

---

## Next Steps & Remaining Tasks

### 1. **Environment Setup**
```bash
cd backend
cp .env.example .env
# Edit .env with your Supabase credentials
```

### 2. **Database Initialization**
```bash
npm install
npm run db:push           # Create tables in Supabase
npm run db:seed           # Populate sample data
npm run db:studio         # Open Prisma Studio to browse data
```

### 3. **Start Development Server**
```bash
npm run start:dev
# Server runs on http://localhost:3333
# Swagger docs on http://localhost:3333/api/docs
```

### 4. **Implement Missing B2B Module**
Location: `src/b2b/`

**Needs:**
- `b2b.service.ts` – B2B application and approval logic
- `b2b.controller.ts` – B2B endpoints
- DTOs for B2B application, approval, tier management
- Service methods:
  - `createApplication(userId, businessDetails)`
  - `approveApplication(applicationId)`
  - `rejectApplication(applicationId)`
  - `updatePricingTier(userId, tier)`
  - `getUserBusiness(userId)`

**Example Endpoints:**
```
POST /api/v1/b2b/apply                    - User applies for B2B
GET /api/v1/b2b/my-account                - Get B2B account details
GET /api/v1/b2b/applications              - Admin: List applications
PATCH /api/v1/b2b/applications/:id/approve - Admin: Approve
PATCH /api/v1/b2b/applications/:id/reject  - Admin: Reject
PATCH /api/v1/b2b/users/:id/tier          - Admin: Update tier
```

### 5. **Implement Admin Module**
Location: `src/admin/`

**Needs:**
- `admin.service.ts` – Admin operations (product, order, user management)
- `admin.controller.ts` – Admin endpoints
- DTOs for admin operations
- Service methods for:
  - Dashboard statistics (sales, orders, inventory)
  - Advanced order filtering and reporting
  - User management
  - System configuration

**Example Endpoints:**
```
GET /api/v1/admin/dashboard               - Dashboard stats
GET /api/v1/admin/orders?status=&date=    - Filtered orders
GET /api/v1/admin/products/low-stock      - Low stock alerts
GET /api/v1/admin/users                   - User management
POST /api/v1/admin/inventory/adjust       - Manual inventory adjustment
```

### 6. **Implement Inventory Module**
Location: `src/inventory/`

**Needs:**
- `inventory.service.ts` – Stock management logic
- `inventory.controller.ts` – Inventory endpoints
- DTOs for adjustments and reports
- Service methods:
  - `adjustStock(productId, quantity, reason)`
  - `getAdjustmentHistory(productId)`
  - `getLowStockProducts(threshold)`
  - `getInventoryReport()`

**Example Endpoints:**
```
POST /api/v1/inventory/adjust             - Adjust stock (admin only)
GET /api/v1/inventory/adjustments         - View adjustment history
GET /api/v1/inventory/low-stock           - Low stock alerts
GET /api/v1/inventory/report              - Inventory report
```

### 7. **Payment Gateway Integration**

#### PayHere Integration
- `src/payments/payhere.service.ts`
- Initiate payment → PayHere gateway → Callback webhook
- Webhook endpoint: `POST /api/v1/payments/payhere/callback`
- Update order payment status based on callback

#### Koko Integration
- `src/payments/koko.service.ts`
- Initiate payment → Koko gateway → Callback webhook
- Webhook endpoint: `POST /api/v1/payments/koko/callback`
- Update order payment status based on callback

**Reference structure:**
```typescript
// payhere.service.ts
async initiatePayment(orderId: string) {
  const order = await this.prisma.order.findUnique({where: {id: orderId}});
  // 1. Build PayHere request
  // 2. Call PayHere API
  // 3. Return payment URL for redirect
}

async handleCallback(payload: any) {
  // 1. Verify payload signature
  // 2. Extract order and payment info
  // 3. Update order status
  // 4. Decrement inventory if PAID
}

// payments.controller.ts
@Post('payhere/callback')
@HttpCode(HttpStatus.OK)
async payHereCallback(@Body() payload: any) {
  return this.payHereService.handleCallback(payload);
}
```

### 8. **File Upload (Supabase Storage)**
- Create `src/common/services/file-upload.service.ts`
- Integrate Supabase Storage for:
  - Product images
  - Bank transfer proof documents
- Generate signed URLs for secure access
- Implement cleanup for deleted items

### 9. **Email Notifications**
- Create `src/common/services/email.service.ts`
- Send emails for:
  - Order confirmation
  - Payment received
  - Shipment tracking
  - Bank transfer verification requests
  - B2B application updates
- Use nodemailer or AWS SES

### 10. **Testing**
- Create unit tests for services
- Create e2e tests for API endpoints
- Aim for >80% code coverage
- Test payment flows with mocks

---

## Development Workflow

### 1. **Add New Feature**
```bash
# Create module directory
mkdir src/myfeature

# Create files: service, controller, module, DTOs
# Import in app.module.ts

npm run start:dev
```

### 2. **Database Changes**
```bash
# Edit prisma/schema.prisma
# Generate migration
npx prisma migrate dev --name descriptive_name

# Sync with Supabase
npm run db:push
```

### 3. **Testing**
```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Coverage
npm run test:cov
```

### 4. **Build & Deploy**
```bash
# Build
npm run build

# Run production
npm run start:prod

# Docker
docker build -t nexusstem-backend .
docker push your-registry/nexusstem-backend:latest
```

---

## Common Issues & Solutions

### Issue: "Cannot find module '@/...'"
**Solution:** Check `tsconfig.json` path alias configuration and ensure `npm run start:dev` rebuilds.

### Issue: "Database connection refused"
**Solution:** Verify DATABASE_URL in `.env` and ensure Supabase project is active.

### Issue: "JWT validation fails"
**Solution:** Verify token comes from same Supabase project as SUPABASE_URL/ANON_KEY.

### Issue: "Port 3333 already in use"
**Solution:** `lsof -i :3333` to find process, kill it or use different PORT.

---

## Deployment Checklist

- [ ] Environment variables set in production
- [ ] DATABASE_URL points to production Supabase
- [ ] JWT_SECRET is strong and unique
- [ ] CORS origins updated to production domains
- [ ] Payment gateway credentials configured
- [ ] Email service credentials configured
- [ ] File storage paths configured
- [ ] Rate limiting implemented
- [ ] Error logging configured
- [ ] Database backups scheduled
- [ ] SSL/TLS certificates configured
- [ ] Health check endpoint verified

---

## Additional Resources

- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Swagger/OpenAPI](https://swagger.io)

---

**Backend Ready for Integration!** 🚀

The core infrastructure is in place. Begin with:
1. Set up `.env` with Supabase credentials
2. Run database migrations
3. Start dev server
4. Test API with Swagger
5. Implement remaining modules as needed
