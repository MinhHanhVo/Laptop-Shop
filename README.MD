# 💻 Laptop Shop

Ứng dụng web bán laptop với đầy đủ chức năng từ quản lý người dùng, sản phẩm, giỏ hàng đến đặt hàng — được xây dựng bằng **Node.js**, **Prisma**, **MySQL (AWS RDS)** và triển khai trên **Render**.

---

## Tính năng nổi bật

- 🔐 Đăng ký / Đăng nhập / Đăng xuất
- 👤 Quản lý người dùng (User / Admin)
- 🛍️ Quản lý sản phẩm: thêm, sửa, xóa, xem chi tiết
- 🛒 Giỏ hàng: thêm/xoá sản phẩm, tính tổng tiền
- 📦 Đặt hàng với thông tin người nhận & trạng thái đơn hàng
- 🔄 Phân quyền & quản lý phiên người dùng
- ☁️ Triển khai thực tế với **MySQL trên AWS RDS** và **Render**

---

## ⚙️ Công nghệ sử dụng

| Công nghệ         | Mô tả                              |
|-------------------|-------------------------------------|
| **Node.js**        | Backend runtime                    |
| **Prisma ORM**     | Kết nối và thao tác với MySQL      |
| **MySQL RDS**      | Cơ sở dữ liệu chạy trên AWS        |
| **Express.js**     | Framework cho backend Node.js      |
| **Render**         | Deploy API ra môi trường thực tế   |
| **Session/Auth**   | Quản lý đăng nhập người dùng       |

---

## Cách chạy dự án

### 1. Clone & cài đặt phụ thuộc
```bash
git clone https://github.com/MinhHanhVo/Laptop-Shop.git
cd Laptop-Shop
npm install

### 2. Cấu hình .env
```bash
NODE_ENV =
port =
JWT_SECRET=
JWT_EXPIRES_IN=
DATABASE_URL =

### 3. Khởi tạo schema database
```bash
npx prisma migrate deploy

### 4. Chạy ứng dụng local
```bash
npm run dev
