# Hướng dẫn cấu hình Email Template cho Q&A

## File template đã tạo
- **File**: `email-template-qa.html`
- **Mục đích**: Template email nhận câu hỏi từ khách hàng qua form Q&A

## Cách cấu hình trên EmailJS

### 1. Đăng nhập EmailJS
Truy cập: https://www.emailjs.com/

### 2. Tạo Email Template mới
1. Vào mục **Email Templates**
2. Click **Create New Template**
3. Đặt tên template: `Q&A Questions Template`
4. Template ID: Sử dụng ID đã có trong `.env` là `template_v8z2qbo`

### 3. Cấu hình Template

#### Subject (Tiêu đề email):
```
🔔 Câu hỏi mới từ {{from_email}} - Êm Dạ Mode
```

#### Content (Nội dung):
Copy toàn bộ nội dung từ file `email-template-qa.html` vào phần **Content** của template

#### Settings (Cài đặt):
- **From name**: Êm Dạ Mode - Q&A System
- **From email**: Sử dụng email đã verify với EmailJS
- **Reply to**: `{{reply_to}}` (để có thể reply trực tiếp cho khách hàng)

### 4. Các biến (Variables) được sử dụng

Template này sử dụng các biến sau:

| Biến | Mô tả | Ví dụ |
|------|-------|-------|
| `{{from_email}}` | Email của khách hàng | customer@example.com |
| `{{question}}` | Nội dung câu hỏi | Đau thượng vị về đêm có nguy hiểm không? |
| `{{receive_time}}` | Thời gian nhận câu hỏi | 09/03/2026, 14:30:25 |
| `{{reply_to}}` | Email để reply (giống from_email) | customer@example.com |

### 5. Cấu hình Email nhận

Để nhận email khi có câu hỏi mới:
1. Trong EmailJS, vào **Email Services**
2. Chọn service đang dùng (`service_0afr9m9`)
3. Cấu hình **To Email** thành email của team (ví dụ: `prismproject.fptu@gmail.com`)

### 6. Test Template

1. Vào template vừa tạo trên EmailJS
2. Click **Test it**
3. Điền các giá trị test:
   - `from_email`: test@example.com
   - `question`: Đây là câu hỏi test
   - `receive_time`: 09/03/2026, 14:30:25
   - `reply_to`: test@example.com
4. Click **Send Test** để gửi email test

### 7. Cấu hình trong code

File `.env` đã được cấu hình:
```env
VITE_EMAILJS_SERVICE_ID=service_0afr9m9
VITE_EMAILJS_QA_TEMPLATE_ID=template_v8z2qbo
VITE_EMAILJS_PUBLIC_KEY=Ub8pAycDtqKiziI93
```

**Lưu ý**: Đảm bảo `VITE_EMAILJS_QA_TEMPLATE_ID` khớp với Template ID trên EmailJS

## Đặc điểmnổi bật của template

✅ **Thiết kế chuyên nghiệp**
- Header gradient màu cam nổi bật
- Layout rõ ràng, dễ đọc
- Responsive trên mọi thiết bị

✅ **Thông tin đầy đủ**
- Email khách hàng
- Nội dung câu hỏi chi tiết
- Thời gian nhận câu hỏi

✅ **Hướng dẫn xử lý**
- Quy trình xử lý rõ ràng từng bước
- Nhắc nhở thời gian phản hồi (24h)
- Gợi ý thêm vào FAQ

✅ **Dễ dàng reply**
- Cấu hình `reply_to` để trả lời trực tiếp
- Có đầy đủ thông tin liên hệ
- Footer thương hiệu đầy đủ

## Cách hoạt động

1. Khách hàng điền email và câu hỏi trên website
2. Form validate email và câu hỏi
3. Gửi qua EmailJS với template `template_v8z2qbo`
4. Email được gửi tới team với đầy đủ thông tin
5. Team reply trực tiếp email để phản hồi khách hàng

## Troubleshooting

### Email không được gửi
- Kiểm tra các biến env đã đúng chưa
- Verify email service trên EmailJS
- Kiểm tra console log để xem lỗi

### Template hiển thị không đúng
- Đảm bảo copy đúng HTML từ file template
- Kiểm tra các biến `{{variable}}` đã đúng tên chưa
- Test trên EmailJS dashboard trước

### Reply không hoạt động
- Đảm bảo đã cấu hình `reply_to` trong template settings
- Verify email của EmailJS service

## Liên hệ hỗ trợ

Nếu cần hỗ trợ:
- Email: prismproject.fptu@gmail.com
- Phone: 0815 398 633
