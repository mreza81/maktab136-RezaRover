# E-Commerce Shop Backend API

بک‌اند کامل برای فروشگاه آنلاین با Node.js و Express

## ویژگی‌ها

- ✅ احراز هویت با JWT و Refresh Token
- ✅ مدیریت محصولات با آپلود چند عکس
- ✅ سبد خرید کامل
- ✅ پروفایل کاربر
- ✅ امنیت و اعتبارسنجی

## نصب و راه‌اندازی

### پیش‌نیازها

- Node.js (v14 یا بالاتر)
- MongoDB (محلی یا Atlas)
- npm یا yarn

### مراحل نصب

1. نصب پکیج‌ها:
```bash
npm install
```

2. ایجاد فایل `.env`:
```bash
cp .env.example .env
```

3. ویرایش فایل `.env` و تنظیم مقادیر:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_super_secret_jwt_key_here
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
JWT_EXPIRE=7d
JWT_REFRESH_EXPIRE=30d
```

4. ایجاد کاربر ادمین:
```bash
# با مقادیر پیش‌فرض
npm run create-admin

# با مقادیر سفارشی (نام، ایمیل، رمز عبور)
npm run create-admin "نام ادمین" "admin@example.com" "password123"
```

5. اجرای سرور:
```bash
# حالت توسعه
npm run dev

# حالت تولید
npm start
```

## API Endpoints

### احراز هویت (Authentication)

- `POST /api/auth/register` - ثبت‌نام کاربر جدید
- `POST /api/auth/login` - ورود کاربر
- `POST /api/auth/refresh-token` - بروزرسانی توکن
- `GET /api/auth/me` - دریافت اطلاعات کاربر فعلی

### محصولات (Products)

- `GET /api/products` - دریافت لیست محصولات (با pagination و فیلتر)
- `GET /api/products/:id` - دریافت یک محصول
- `POST /api/products` - ایجاد محصول جدید (Admin)
- `PUT /api/products/:id` - بروزرسانی محصول (Admin)
- `DELETE /api/products/:id` - حذف محصول (Admin)

### سبد خرید (Cart)

- `GET /api/cart` - دریافت سبد خرید کاربر
- `POST /api/cart/add` - افزودن محصول به سبد خرید
- `PUT /api/cart/update/:itemId` - بروزرسانی تعداد آیتم
- `DELETE /api/cart/remove/:itemId` - حذف آیتم از سبد خرید
- `DELETE /api/cart/clear` - خالی کردن سبد خرید

### پروفایل (Profile)

- `GET /api/profile` - دریافت پروفایل کاربر
- `PUT /api/profile` - بروزرسانی پروفایل
- `PUT /api/profile/password` - تغییر رمز عبور

### سفارش‌ها (Orders)

- `POST /api/orders` - ایجاد سفارش از سبد خرید (کاهش موجودی محصولات)
- `GET /api/orders` - دریافت سفارش‌های کاربر
- `GET /api/orders/:id` - دریافت یک سفارش
- `PUT /api/orders/:id/status` - بروزرسانی وضعیت سفارش (Admin)
- `GET /api/orders/admin/all` - دریافت تمام سفارش‌ها (Admin)

**وضعیت‌های سفارش:**
- `pending` - در انتظار تایید
- `confirmed` - تایید شده
- `shipping` - در حال ارسال
- `delivered` - تحویل داده شده
- `cancelled` - لغو شده (موجودی بازگردانده می‌شود)

## ساختار پروژه

```
Back - End/
├── config/
│   └── db.js              # اتصال به MongoDB
├── middleware/
│   ├── auth.js            # میدلور احراز هویت
│   └── upload.js          # میدلور آپلود فایل
├── models/
│   ├── User.js            # مدل کاربر
│   ├── Product.js         # مدل محصول
│   ├── Cart.js            # مدل سبد خرید
│   └── Order.js           # مدل سفارش
├── routes/
│   ├── auth.js            # مسیرهای احراز هویت
│   ├── products.js        # مسیرهای محصولات
│   ├── cart.js            # مسیرهای سبد خرید
│   ├── profile.js         # مسیرهای پروفایل
│   └── orders.js          # مسیرهای سفارش‌ها
├── uploads/               # فایل‌های آپلود شده
├── server.js              # فایل اصلی سرور
├── package.json
└── README.md
```

## استفاده از Postman

فایل `E-Commerce_API.postman_collection.json` را در Postman import کنید.

### تنظیمات متغیرها در Postman:

- `base_url`: `http://localhost:5000`
- `token`: توکن JWT بعد از لاگین
- `refresh_token`: توکن رفرش بعد از لاگین
- `admin_token`: توکن ادمین

## مثال‌های درخواست

### ثبت‌نام
```json
POST /api/auth/register
{
  "name": "علی احمدی",
  "email": "ali@example.com",
  "password": "123456",
  "phone": "09123456789"
}
```

### لاگین
```json
POST /api/auth/login
{
  "email": "ali@example.com",
  "password": "123456"
}
```

### افزودن به سبد خرید
```json
POST /api/cart/add
Headers: Authorization: Bearer {token}
{
  "productId": "product_id",
  "quantity": 2
}
```

### ایجاد سفارش از سبد خرید
```json
POST /api/orders
Headers: Authorization: Bearer {token}
{
  "shippingAddress": {
    "name": "علی احمدی",
    "phone": "09123456789",
    "address": "تهران، خیابان ولیعصر"
  },
  "paymentMethod": "cash"
}
```
**نکته:** با ثبت سفارش، موجودی محصولات به صورت خودکار کم می‌شود و سبد خرید خالی می‌شود.

## نکات مهم

- تمام مسیرهای محافظت‌شده نیاز به توکن JWT دارند
- عکس‌های محصولات در پوشه `uploads/products` ذخیره می‌شوند
- برای ایجاد محصول نیاز به نقش Admin دارید
- رمز عبور به صورت hash ذخیره می‌شود

## توسعه

برای توسعه، از `npm run dev` استفاده کنید که از nodemon برای reload خودکار استفاده می‌کند.

