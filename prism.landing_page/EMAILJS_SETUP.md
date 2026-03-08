# Hướng dẫn cấu hình EmailJS

> 💡 **Tip:** Mở file `preview-email-templates.html` trong browser để xem trước các email templates!

## Bước 1: Đăng ký tài khoản EmailJS

1. Truy cập https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí (Free tier cho phép 200 email/tháng)
3. Xác nhận email đăng ký

## Bước 2: Tạo Email Service

1. Sau khi đăng nhập, vào **Email Services**
2. Click **Add New Service**
3. Chọn Gmail (hoặc email provider khác)
4. Đăng nhập với email của bạn
5. Copy **Service ID** (ví dụ: service_abc123)

## Bước 3: Tạo Email Template

1. Vào **Email Templates**
2. Click **Create New Template**
3. Đặt tên template: "Prism Contact Form"

4. Cấu hình **Settings** tab:
   - **To Email**: email-ban-muon-nhan@gmail.com
   - **From Name**: Êm Dạ Mode - Prism
   - **Subject**: [Liên hệ] {{topic}} | Êm Dạ Mode
   - **Reply To**: {{reply_to}}

5. Chuyển sang **Content** tab, paste template:

**Có 2 phiên bản template để chọn:**

### 📧 Phiên bản 1: Modern Design (Khuyến nghị)
- File: `email-template-contact.html`
- Thiết kế hiện đại với gradient, icon đẹp
- Responsive tốt trên mọi thiết bị
- Màu sắc phù hợp với brand Êm Dạ Mode

**Cách sử dụng:**
1. Mở file `email-template-contact.html`
2. Copy toàn bộ nội dung HTML
3. Paste vào phần **HTML Content** của EmailJS template
4. Click **Save**

### 📨 Phiên bản 2: Simple Design
- File: `email-template-contact-simple.html`
- Thiết kế đơn giản, dùng table layout
- Tương thích tốt với mọi email client
- Nhẹ hơn, load nhanh hơn

**Cách sử dụng:**
1. Mở file `email-template-contact-simple.html`
2. Copy toàn bộ nội dung HTML
3. Paste vào phần **HTML Content** của EmailJS template
4. Click **Save**

### Template Variables được sử dụng:
- `{{from_name}}` - Họ và tên người gửi
- `{{reply_to}}` - Email người gửi
- `{{phone}}` - Số điện thoại
- `{{topic}}` - Chủ đề liên hệ
- `{{message}}` - Nội dung tin nhắn

6. Test template bằng cách click **Test It** và điền các giá trị mẫu:
   - from_name: Nguyễn Văn A
   - reply_to: test@example.com
   - phone: 0123456789
   - topic: Hợp tác chuyên môn
   - message: Xin chào, tôi muốn hợp tác với dự án...

7. Copy **Template ID** (ví dụ: template_xyz789)

## Bước 4: Lấy Public Key

1. Vào **Account** > **General**
2. Copy **Public Key**

## Bước 5: Cập nhật file .env

Tạo file `.env` trong thư mục `prism.landing_page`:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Bước 6: Cài đặt package

```bash
npm install @emailjs/browser
```

## Bước 7: Khởi động lại dev server

```bash
npm run dev
```

## Giới hạn Free Tier

- 200 email/tháng
- 2 email services
- 3 email templates

---

## ✅ Checklist Setup

Đánh dấu khi hoàn thành từng bước:

- [ ] Đăng ký tài khoản EmailJS
- [ ] Tạo Email Service và kết nối Gmail
- [ ] Tạo Email Template (chọn Modern hoặc Simple)
- [ ] Cấu hình Settings cho template (To Email, Subject, Reply To)
- [ ] Paste HTML template vào Content tab
- [ ] Test template với test data
- [ ] Copy Service ID
- [ ] Copy Template ID  
- [ ] Copy Public Key
- [ ] Tạo file `.env` và điền thông tin
- [ ] Cài đặt package `@emailjs/browser`
- [ ] Khởi động lại dev server
- [ ] Test gửi email từ website
- [ ] Kiểm tra email đã nhận được chưa

---

## 🎯 Quick Start

Nếu muốn setup nhanh, copy paste đoạn này:

```bash
# 1. Tạo file .env
echo "VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id  
VITE_EMAILJS_PUBLIC_KEY=your_public_key" > .env

# 2. Cài package (đã cài rồi)
# npm install @emailjs/browser

# 3. Restart dev server
npm run dev
```

Sau đó chỉ cần thay thế `your_service_id`, `your_template_id`, `your_public_key` bằng giá trị thực từ EmailJS.

---

## 📧 Email Templates

**Preview Templates:**
Mở file `preview-email-templates.html` trong browser để xem trước cả 2 templates.

**Files:**
- `email-template-contact.html` - Modern Design (khuyến nghị)
- `email-template-contact-simple.html` - Simple Design (tương thích cao)
- `EMAIL_TEMPLATES_README.md` - Hướng dẫn chi tiết về templates

---

## ❓ Troubleshooting

### Email không được gửi
- ✅ Kiểm tra console log để xem lỗi chi tiết
- ✅ Đảm bảo file `.env` đã được tạo và có giá trị đúng
- ✅ Verify Service ID, Template ID, Public Key chính xác
- ✅ Kiểm tra email service đã kết nối thành công chưa

### Email không nhận được
- ✅ Kiểm tra thư mục Spam/Junk
- ✅ Verify To Email trong template settings
- ✅ Đợi vài phút (đôi khi bị delay)
- ✅ Test lại với template test trong EmailJS dashboard

### Lỗi "Invalid public key"
- ✅ Copy lại Public Key từ Account > General
- ✅ Không có khoảng trắng thừa trong `.env`
- ✅ Restart dev server sau khi update `.env`

### Template hiển thị lỗi
- ✅ Chuyển sang Simple template
- ✅ Kiểm tra console có lỗi syntax không
- ✅ Verify tất cả {{variables}} có khớp không

### Form submit nhưng không có thông báo
- ✅ Kiểm tra Toast component đã import chưa
- ✅ F12 > Console xem có lỗi JavaScript không
- ✅ Verify EmailJS credentials trong `.env`

---

## 📞 Support

Nếu vẫn gặp vấn đề:
1. Đọc kỹ error message trong console
2. Google error message đó
3. Check EmailJS documentation
4. Liên hệ team support

---

## 🔐 Security Notes

- ⚠️ File `.env` đã được thêm vào `.gitignore`
- ⚠️ KHÔNG commit file `.env` lên Git
- ⚠️ Public Key có thể expose (không sao vì nó là public)
- ⚠️ Service ID và Template ID cũng có thể public
- ✅ EmailJS đã có built-in rate limiting và spam protection

---

**Happy Coding! 🚀**
