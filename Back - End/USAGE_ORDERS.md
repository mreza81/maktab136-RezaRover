# راهنمای استفاده از API سفارش‌ها

## ایجاد سفارش از سبد خرید

### مراحل:

1. **ابتدا محصولات را به سبد خرید اضافه کنید:**
```bash
POST /api/cart/add
Headers: Authorization: Bearer {token}
Body:
{
  "productId": "product_id_here",
  "quantity": 2
}
```

2. **سپس سفارش را ایجاد کنید:**
```bash
POST /api/orders
Headers: 
  - Authorization: Bearer {token}
  - Content-Type: application/json

Body:
{
  "shippingAddress": {
    "name": "علی احمدی",
    "phone": "09123456789",
    "address": "تهران، خیابان ولیعصر، پلاک 123"
  },
  "paymentMethod": "cash"
}
```

### نکات مهم:

- ✅ قبل از ایجاد سفارش، باید سبد خرید شما دارای آیتم باشد
- ✅ موجودی محصولات به صورت خودکار کم می‌شود
- ✅ بعد از ثبت سفارش، سبد خرید خالی می‌شود
- ✅ اگر موجودی کافی نباشد، سفارش ثبت نمی‌شود

### پاسخ موفق:
```json
{
  "success": true,
  "message": "سفارش با موفقیت ثبت شد",
  "data": {
    "_id": "order_id",
    "user": {...},
    "orderItems": [...],
    "shippingAddress": {...},
    "status": "pending",
    "totalPrice": 500000
  }
}
```

### خطاهای ممکن:

1. **سبد خرید خالی:**
```json
{
  "success": false,
  "message": "سبد خرید خالی است"
}
```

2. **موجودی کافی نیست:**
```json
{
  "success": false,
  "message": "موجودی کافی نیست برای محصول ... موجودی: 5, درخواستی: 10"
}
```

3. **خطا در اعتبارسنجی:**
```json
{
  "success": false,
  "message": "خطا در اعتبارسنجی",
  "errors": [...]
}
```

