# 📧 Email Templates - Êm Dạ Mode

Thư viện email templates cho form liên hệ của dự án Êm Dạ Mode.

## 📁 Danh sách Templates

### 1. Modern Design Template
**File:** `email-template-contact.html`

**Đặc điểm:**
- ✨ Thiết kế hiện đại với gradient background
- 🎨 Màu sắc brand: Cam (#ff6b35) và Vàng cam (#f7931e)
- 📱 Responsive design, hiển thị tốt trên mobile
- 🎯 Icon emoji cho từng trường thông tin
- 💡 Box hướng dẫn phản hồi
- 🔥 Khuyến nghị sử dụng cho hiệu ứng tốt nhất

**Preview:**
- Header gradient cam-vàng với icon email
- Info boxes với border màu cam
- Footer với thông tin liên hệ đầy đủ

---

### 2. Simple Design Template
**File:** `email-template-contact-simple.html`

**Đặc điểm:**
- 📊 Sử dụng table layout (tương thích cao)
- ⚡ Load nhanh, dung lượng nhẹ
- 📧 Tương thích với mọi email client (Gmail, Outlook, Yahoo, etc.)
- 🔄 Fallback tốt cho các email client cũ
- ✅ Khuyến nghị nếu gặp vấn đề hiển thị với template 1

**Preview:**
- Header gradient đơn giản
- Table-based layout
- Minimalist footer

---

## 🔧 Template Variables

Các biến được sử dụng trong templates (được tự động thay thế bởi EmailJS):

| Variable | Mô tả | Ví dụ |
|----------|-------|-------|
| `{{from_name}}` | Họ và tên người gửi | Nguyễn Văn A |
| `{{reply_to}}` | Email người gửi | nguyenvana@example.com |
| `{{phone}}` | Số điện thoại | 0123456789 |
| `{{topic}}` | Chủ đề liên hệ | Hợp tác chuyên môn |
| `{{message}}` | Nội dung tin nhắn | Xin chào, tôi muốn hợp tác... |

---

## 📝 Hướng dẫn sử dụng

### Bước 1: Chọn Template
Chọn template phù hợp với nhu cầu:
- **Modern Design**: Cho trải nghiệm tốt nhất
- **Simple Design**: Cho độ tương thích cao nhất

### Bước 2: Copy Template vào EmailJS

1. Đăng nhập vào [EmailJS](https://www.emailjs.com/)
2. Vào **Email Templates** → Click **Create New Template**
3. Chọn tab **Content**
4. Mở file template đã chọn
5. Copy toàn bộ nội dung HTML
6. Paste vào phần **HTML Content**
7. Click **Save**

### Bước 3: Cấu hình Settings

Trong tab **Settings** của template:
- **To Email**: email-ban-muon-nhan@gmail.com
- **From Name**: Êm Dạ Mode
- **Subject**: [Liên hệ] {{topic}} | Êm Dạ Mode
- **Reply To**: {{reply_to}}

### Bước 4: Test Template

1. Click nút **Test It**
2. Điền test data:
   ```
   from_name: Nguyễn Văn A
   reply_to: test@example.com
   phone: 0123456789
   topic: Hợp tác chuyên môn
   message: Đây là nội dung test...
   ```
3. Click **Send Test Email**
4. Kiểm tra inbox để xem kết quả

---

## 🎨 Customization

### Thay đổi màu sắc

**Modern Template:**
Tìm và thay thế các giá trị gradient:
```css
/* Gradient hiện tại */
background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);

/* Thay đổi thành màu khác */
background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
```

**Border màu:**
```css
border-left: 4px solid #ff6b35; /* Thay #ff6b35 thành màu mong muốn */
```

### Thay đổi font

Thay đổi font-family trong style:
```css
font-family: 'Your Font', 'Segoe UI', sans-serif;
```

### Thêm logo

Thêm logo vào header (thay thế email icon):
```html
<div class="email-icon">
  <img src="https://your-domain.com/logo.png" alt="Logo" style="width: 50px; height: 50px;" />
</div>
```

---

## 📊 So sánh Templates

| Tiêu chí | Modern Design | Simple Design |
|----------|---------------|---------------|
| Thiết kế | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Tương thích | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Performance | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Responsive | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Dễ customize | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## ⚠️ Lưu ý

### Email Client Compatibility

**Modern Template:**
- ✅ Gmail (Web, iOS, Android)
- ✅ Outlook.com
- ✅ Apple Mail
- ⚠️ Outlook Desktop (có thể hiển thị đơn giản hơn)
- ✅ Yahoo Mail
- ✅ ProtonMail

**Simple Template:**
- ✅ Tất cả email clients (100% tương thích)

### Testing

Luôn test template trên nhiều email client trước khi deploy:
1. Gmail
2. Outlook
3. Yahoo Mail
4. Apple Mail (nếu có)

### Image Hosting

Nếu sử dụng hình ảnh trong email:
- ⚠️ KHÔNG sử dụng đường dẫn local (file://)
- ✅ Sử dụng URL public (https://)
- ✅ Host trên CDN hoặc image hosting service
- ✅ Đảm bảo CORS được cấu hình đúng

---

## 🆘 Troubleshooting

### Email hiển thị bị lỗi format
→ Chuyển sang **Simple Template**

### Gradient không hiển thị
→ Some email clients không hỗ trợ gradient, sử dụng solid color fallback

### Font không đúng
→ Một số email client chỉ hỗ trợ web-safe fonts (Arial, Helvetica, Times New Roman, etc.)

### Email vào spam
→ Không phải lỗi template, cần cấu hình SPF/DKIM cho domain

---

## 📞 Support

Nếu gặp vấn đề với templates:
1. Kiểm tra console log khi gửi email
2. Xem lại cấu hình EmailJS
3. Test với template đơn giản trước
4. Liên hệ team qua email hoặc Zalo

---

## 📄 License

Templates này là phần của dự án Êm Dạ Mode - FPT University
© 2026 All Rights Reserved
