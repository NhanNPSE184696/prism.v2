import type { TestItem } from '../types';

export const testItems: TestItem[] = [
  {
    id: "q1",
    tag: "PHẦN 1 — TRIỆU CHỨNG CẢM NHẬN",
    q: "Bạn có cảm giác đau hoặc nóng rát vùng thượng vị (trên rốn) không?",
    opts: [
      ["Không bao giờ", 0],
      ["Thỉnh thoảng (1–2 lần/tuần)", 1],
      ["Khá thường xuyên (3–5 lần/tuần)", 2],
      ["Thường xuyên (≥ 5 lần/tuần)", 3]
    ]
  },
  {
    id: "q2",
    tag: "PHẦN 1 — TRIỆU CHỨNG CẢM NHẬN",
    q: "Bạn có bị đầy hơi, chướng bụng sau ăn?",
    opts: [
      ["Hiếm khi (1 lần/2 tuần)", 0],
      ["Thỉnh thoảng (1–2 lần/tuần)", 1],
      ["Thường xuyên (≥ 5 lần/tuần)", 2],
      ["Hầu như sau mọi bữa ăn", 3]
    ]
  },
  {
    id: "q3",
    tag: "PHẦN 1 — TRIỆU CHỨNG CẢM NHẬN",
    q: "Ợ chua hoặc trào ngược xảy ra mức nào?",
    opts: [
      ["Không có", 0],
      ["Thỉnh thoảng (1–2 lần/tuần)", 1],
      ["Nhiều lần/tuần (3–5 lần/tuần)", 2],
      ["Hàng ngày hoặc ảnh hưởng giấc ngủ", 3]
    ]
  },
  {
    id: "q4",
    tag: "PHẦN 1 — TRIỆU CHỨNG CẢM NHẬN",
    q: "Buồn nôn hoặc khó tiêu kéo dài?",
    opts: [
      ["Không", 0],
      ["Thỉnh thoảng (1–2 lần/tuần)", 1],
      ["Khá thường xuyên (3–5 lần/tuần)", 2],
      ["Thường xuyên (≥ 5 lần/tuần)", 3]
    ]
  },
  {
    id: "q5",
    tag: "PHẦN 2 — YẾU TỐ NGUY CƠ LỐI SỐNG",
    q: "Thói quen ăn uống của bạn:",
    opts: [
      ["Điều độ, đúng giờ", 0],
      ["Thỉnh thoảng bỏ bữa (1–2 ngày/tuần)", 1],
      ["Hay ăn thất thường, ăn nhanh (3–5 ngày/tuần)", 2],
      ["Rất thất thường, hay ăn khuya (≥ 5 ngày/tuần)", 3]
    ]
  },
  {
    id: "q6",
    tag: "PHẦN 2 — YẾU TỐ NGUY CƠ LỐI SỐNG",
    q: "Căng thẳng tâm lý gần đây:",
    opts: [
      ["Thấp (ít hoặc không ảnh hưởng sinh hoạt)", 0],
      ["Trung bình (có nhưng vẫn kiểm soát được)", 1],
      ["Cao (ảnh hưởng giấc ngủ/ăn uống 3–5 ngày/tuần)", 2],
      ["Rất cao kéo dài (gần như mỗi ngày)", 3]
    ]
  },
  {
    id: "q7",
    tag: "PHẦN 2 — YẾU TỐ NGUY CƠ LỐI SỐNG",
    q: "Sử dụng chất kích thích (cà phê, rượu, thuốc lá):",
    opts: [
      ["Không", 0],
      ["Ít (1–2 lần/tuần)", 1],
      ["Thường xuyên (≥ 5 lần/tuần)", 2],
      ["Hàng ngày mức cao (≥ 5 lần/tuần)", 3]
    ]
  },
  {
    id: "q8",
    tag: "PHẦN 3 — DẤU HIỆU CẢNH BÁO",
    q: "Bạn có sụt cân không chủ ý?",
    opts: [
      ["Không", 0],
      ["Giảm nhẹ (≤ 2 kg)", 1],
      ["Giảm rõ (2–5 kg)", 2],
      ["Giảm nhanh (> 5 kg)", 3]
    ]
  },
  {
    id: "q9",
    tag: "PHẦN 3 — DẤU HIỆU CẢNH BÁO",
    q: "Đi ngoài phân đen hoặc có máu?",
    opts: [
      ["Không", 0],
      ["Không chắc", 1],
      ["Có 1 lần", 2],
      ["Có nhiều lần", 3]
    ]
  },
  {
    id: "q10",
    tag: "PHẦN 3 — DẤU HIỆU CẢNH BÁO",
    q: "Cơn đau dạ dày có làm bạn thức giấc ban đêm?",
    opts: [
      ["Không", 0],
      ["Hiếm khi (1 lần/2 tuần)", 1],
      ["Thỉnh thoảng (1–2 lần/tuần)", 2],
      ["Thường xuyên (≥ 3 lần/tuần)", 3]
    ]
  }
];
