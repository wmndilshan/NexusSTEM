# NexusSTEM Backend API Reference

## Base URL
```
http://localhost:3333/api/v1
```

## Authentication
Include JWT token in header:
```
Authorization: Bearer {token}
```

---

## 📦 Categories

### Get all categories
```
GET /categories
```
**Response:**
```json
[
  {
    "id": "cat_1",
    "name": "Electronics",
    "slug": "electronics",
    "description": "Electronic components...",
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Get category by slug with products
```
GET /categories/:slug
```

### Create category (Admin/Staff only)
```
POST /categories
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "New Category",
  "description": "Category description"
}
```

### Update category (Admin/Staff only)
```
PATCH /categories/:id
Authorization: Bearer {token}

{
  "name": "Updated name",
  "description": "Updated description"
}
```

### Delete category (Admin only)
```
DELETE /categories/:id
Authorization: Bearer {token}
```

---

## 🛍️ Products

### Get all products (with pagination)
```
GET /products?skip=0&take=20&categoryId=cat_1
```

### Search products
```
GET /products/search?q=arduino
```

### Get product by slug
```
GET /products/:slug

Response includes:
- Base price
- B2B price (only if user is B2B customer or admin)
- Stock quantity
- Images
- Category
```

### Create product (Admin/Staff only)
```
POST /products
Authorization: Bearer {token}

{
  "name": "Arduino Uno",
  "sku": "ARDUINO-001",
  "description": "Microcontroller board",
  "categoryId": "cat_1",
  "basePriceLkr": 2500,
  "b2bPriceLkr": 2000,
  "stockQty": 50,
  "preorderEnabled": false
}
```

### Update product (Admin/Staff only)
```
PATCH /products/:id
Authorization: Bearer {token}

{
  "basePriceLkr": 2700,
  "stockQty": 45
}
```

### Upload product image to Supabase Storage (Admin/Staff only)
```
POST /products/:id/images
Authorization: Bearer {token}
Content-Type: multipart/form-data

form-data:
- file: <image file>
- sortOrder: 0
- setAsFeatured: true

Response:
{
  "id": "img_1",
  "productId": "prod_1",
  "imageUrl": "https://ifpmxqusctlsgrkmuvoc.supabase.co/storage/v1/object/public/uploads/products/prod_1/1710000000000-image.jpg",
  "sortOrder": 0,
  "createdAt": "2026-04-21T00:00:00Z"
}
```

### Delete product (Admin only)
```
DELETE /products/:id
Authorization: Bearer {token}
```

---

## 🛒 Shopping Cart

### Get user's cart
```
GET /cart
Authorization: Bearer {token}

Response:
{
  "id": "cart_1",
  "userId": "user_1",
  "items": [
    {
      "id": "item_1",
      "productId": "prod_1",
      "quantity": 2,
      "unitPriceLkr": 2500,
      "pricingType": "RETAIL"
    }
  ],
  "subtotal": 5000,
  "tax": 250,
  "total": 5250,
  "itemCount": 1
}
```

### Add item to cart
```
POST /cart/items
Authorization: Bearer {token}

{
  "productId": "prod_1",
  "quantity": 2,
  "pricingType": "RETAIL"  // or "B2B"
}
```

### Update cart item quantity
```
PATCH /cart/items/:itemId
Authorization: Bearer {token}

{
  "quantity": 3
}
```

### Remove item from cart
```
DELETE /cart/items/:itemId
Authorization: Bearer {token}
```

### Clear entire cart
```
DELETE /cart
Authorization: Bearer {token}
```

---

## 📋 Orders

### Get user's orders (or all orders for admin)
```
GET /orders?skip=0&take=20
Authorization: Bearer {token}

Response:
{
  "data": [
    {
      "id": "order_1",
      "orderNumber": "ORD-1704067200000-ABC123",
      "userId": "user_1",
      "paymentMethod": "BANK_TRANSFER",
      "paymentStatus": "AWAITING_VERIFICATION",
      "fulfillmentStatus": "PENDING",
      "subtotalLkr": 5000,
      "taxLkr": 250,
      "totalLkr": 5250,
      "items": [...],
      "shippingAddress": {...},
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "total": 10,
    "skip": 0,
    "take": 20,
    "hasMore": false
  }
}
```

### Get order details
```
GET /orders/:orderId
Authorization: Bearer {token}
```

### Get orders by status (Admin/Staff only)
```
GET /orders/admin/by-status/:status
Authorization: Bearer {token}

// status: PENDING, AUTHORIZED, PAID, FAILED, REFUNDED, AWAITING_VERIFICATION, etc.
```

### Create order from cart
```
POST /orders
Authorization: Bearer {token}

{
  "shippingAddress": {
    "fullName": "John Doe",
    "phone": "+94701234567",
    "address_line_1": "123 Main St",
    "address_line_2": "Apt 4B",
    "city": "Colombo",
    "district": "Western",
    "postalCode": "00700"
  }
}

Response:
{
  "id": "order_1",
  "orderNumber": "ORD-1704067200000-ABC123",
  "paymentStatus": "PENDING",
  "fulfillmentStatus": "PENDING",
  "items": [
    {
      "id": "item_1",
      "productId": "prod_1",
      "productNameSnapshot": "Arduino Uno",
      "skuSnapshot": "ARDUINO-001",
      "quantityOrdered": 2,
      "unitPriceLkr": 2500,
      "lineTotalLkr": 5000
    }
  ],
  "shippingAddress": {...},
  "totalLkr": 5250
}
```

### Update order status (Admin/Staff only)
```
PATCH /orders/:orderId/status
Authorization: Bearer {token}

{
  "paymentStatus": "PAID",  // or fulfillmentStatus
  "fulfillmentStatus": "PROCESSING"
}
```

---

## 💳 Payments

### Submit bank transfer proof
```
POST /payments/bank-transfer/submit
Authorization: Bearer {token}

{
  "orderId": "order_1",
  "bankName": "Bank of Ceylon",
  "transferReference": "REF-20240101-001",
  "proofFileUrl": "https://supabase-storage.../proof.pdf"
}

Response:
{
  "id": "submit_1",
  "orderId": "order_1",
  "bankName": "Bank of Ceylon",
  "transferReference": "REF-20240101-001",
  "verificationStatus": "PENDING",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

### Get pending bank transfer verifications (Admin/Staff only)
```
GET /payments/bank-transfer/pending
Authorization: Bearer {token}

Response:
[
  {
    "id": "submit_1",
    "orderId": "order_1",
    "bankName": "Bank of Ceylon",
    "transferReference": "REF-20240101-001",
    "proofFileUrl": "...",
    "verificationStatus": "PENDING",
    "order": {
      "id": "order_1",
      "orderNumber": "ORD-...",
      "user": {...},
      "items": [...],
      "shippingAddress": {...},
      "totalLkr": 5250
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Verify or reject bank transfer (Admin only)
```
PATCH /payments/bank-transfer/:submissionId/verify
Authorization: Bearer {token}

{
  "approved": true  // or false
}

Response:
{
  "submission": {
    "id": "submit_1",
    "verificationStatus": "APPROVED",
    "verifiedBy": "admin_1",
    "verifiedAt": "2024-01-01T12:00:00Z"
  },
  "order": {
    "id": "order_1",
    "paymentStatus": "PAID",
    "fulfillmentStatus": "PENDING"
  }
}
```

---

## 🔐 Authentication States

### No Authentication
- Get categories
- Get products (without B2B prices)
- Search products

### With Authentication (Any User)
- Manage own cart
- Create orders
- View own orders
- Submit bank transfer proof

### Admin/Staff Role
- Create/edit/delete categories
- Create/edit/delete products
- View all orders
- Update order statuses
- Get pending bank transfers
- Verify bank transfers

### Admin Only
- Delete categories
- Delete products
- Approve bank transfers

---

## Error Responses

### 400 - Bad Request
```json
{
  "message": "Product slug already exists",
  "code": "PRODUCT_SLUG_EXISTS"
}
```

### 401 - Unauthorized
```json
{
  "message": "No authentication token provided",
  "error": "Unauthorized"
}
```

### 403 - Forbidden
```json
{
  "message": "User role CUSTOMER does not have permission for this resource",
  "error": "Forbidden"
}
```

### 404 - Not Found
```json
{
  "message": "Product not found",
  "error": "Not Found"
}
```

---

## Testing with cURL

### Get all categories
```bash
curl http://localhost:3333/api/v1/categories
```

### Create category (with auth)
```bash
curl -X POST http://localhost:3333/api/v1/categories \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Category",
    "description": "Test description"
  }'
```

### Create order
```bash
curl -X POST http://localhost:3333/api/v1/orders \
  -H "Authorization: Bearer {token}" \
  -H "Content-Type: application/json" \
  -d '{
    "paymentMethod": "BANK_TRANSFER",
    "shippingAddress": {
      "fullName": "John Doe",
      "phone": "+94701234567",
      "address_line_1": "123 Main St",
      "city": "Colombo",
      "district": "Western",
      "postalCode": "00700"
    }
  }'
```

---

## Swagger Documentation

Interactive API documentation available at:
```
http://localhost:3333/api/docs
```

Try requests directly from the Swagger UI:
1. Click endpoint
2. Click "Try it out"
3. Enter parameters/body
4. Click "Execute"
5. View response

---

## Status Codes for Orders

### Payment Status
- `PENDING` – Awaiting payment initiation
- `AUTHORIZED` – Payment authorized but not yet charged
- `PAID` – Payment confirmed, inventory decremented
- `FAILED` – Payment failed
- `REFUNDED` – Payment refunded to customer
- `AWAITING_VERIFICATION` – Bank transfer proof submitted, awaiting admin verification

### Fulfillment Status
- `PENDING` – Order created, awaiting processing
- `PROCESSING` – Order being picked/packed
- `SHIPPED` – Order shipped to customer
- `DELIVERED` – Order delivered
- `CANCELLED` – Order cancelled

---

## Pricing Rules

### Retail Customers
- See `basePriceLkr` only
- No access to B2B pricing

### B2B Customers
- See both `basePriceLkr` and `b2bPriceLkr`
- Can add to cart with `pricingType: B2B`
- Unit price locks to B2B price at time of cart addition

### Tax
- Fixed 5% VAT added to subtotal
- Calculated server-side
- Included in order total

---

## Inventory Rules

- Stock decremented ONLY when `paymentStatus = PAID`
- For bank transfer: decremented after admin approval
- Preorder items bypass stock check

---

## Development Notes

- All endpoints versioned under `/api/v1`
- All dates in ISO 8601 format (UTC)
- All monetary values in LKR (Sri Lankan Rupees)
- Phone numbers should include country code (+94)
- Pagination uses offset/limit (skip/take) pattern

---

Last Updated: 2024-01-01  
API Version: 1.0.0
