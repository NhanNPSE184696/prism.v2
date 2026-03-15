import type { TestItem } from '../types';

export const testItems: TestItem[] = [
  {
    id: "q1",
    tag: "PHẦN 1 — THÓI QUEN SINH HOẠT",
    q: "Thói quen ăn uống của bạn trong 2 tuần gần đây như thế nào?",
    opts: [
      ["A. Khá điều độ, ăn đúng bữa", 0],
      ["B. Thỉnh thoảng bỏ bữa hoặc ăn trễ", 1],
      ["C. Hay ăn thất thường, ăn nhanh, ăn không đúng giờ", 2],
      ["D. Rất thất thường, thường xuyên bỏ bữa hoặc ăn khuya", 3]
    ]
  },
  {
    id: "q2",
    tag: "PHẦN 1 — THÓI QUEN SINH HOẠT",
    q: "Mức độ stress và thức khuya gần đây của bạn như thế nào?",
    opts: [
      ["A. Ít hoặc không ảnh hưởng sinh hoạt", 0],
      ["B. Có nhưng vẫn kiểm soát được", 1],
      ["C. Khá cao, bắt đầu ảnh hưởng giấc ngủ/ăn uống", 2],
      ["D. Cao kéo dài, gần như mỗi ngày", 3]
    ]
  },
  {
    id: "q3",
    tag: "PHẦN 1 — THÓI QUEN SINH HOẠT",
    q: "Mức độ sử dụng chất kích thích hoặc đồ dễ làm nặng triệu chứng dạ dày?",
    opts: [
      ["A. Hầu như không", 0],
      ["B. Ít, thỉnh thoảng", 1],
      ["C. Khá thường xuyên", 2],
      ["D. Gần như hằng ngày", 3]
    ]
  },
  {
    id: "q4",
    tag: "PHẦN 2 — TẦN SUẤT TRIỆU CHỨNG",
    q: "Bạn có bị đau hoặc nóng rát vùng thượng vị (trên rốn) không?",
    opts: [
      ["A. Không có", 0],
      ["B. Thỉnh thoảng", 1],
      ["C. Khá thường xuyên", 2],
      ["D. Thường xuyên/gần như hằng ngày", 3]
    ]
  },
  {
    id: "q5",
    tag: "PHẦN 2 — TẦN SUẤT TRIỆU CHỨNG",
    q: "Bạn có bị đầy bụng, chướng bụng hoặc khó chịu sau ăn không?",
    opts: [
      ["A. Không có", 0],
      ["B. Thỉnh thoảng", 1],
      ["C. Khá thường xuyên", 2],
      ["D. Hầu như sau nhiều bữa ăn", 3]
    ]
  },
  {
    id: "q6",
    tag: "PHẦN 2 — TẦN SUẤT TRIỆU CHỨNG",
    q: "Bạn có bị ợ chua, ợ nóng hoặc cảm giác trào ngược không?",
    opts: [
      ["A. Không có", 0],
      ["B. Thỉnh thoảng", 1],
      ["C. Nhiều lần/tuần", 2],
      ["D. Gần như hằng ngày hoặc ảnh hưởng giấc ngủ", 3]
    ]
  },
  {
    id: "q7",
    tag: "PHẦN 2 — TẦN SUẤT TRIỆU CHỨNG",
    q: "Bạn có bị buồn nôn, khó tiêu hoặc cảm giác tiêu hóa chậm không?",
    opts: [
      ["A. Không có", 0],
      ["B. Thỉnh thoảng", 1],
      ["C. Khá thường xuyên", 2],
      ["D. Thường xuyên/gần như hằng ngày", 3]
    ]
  },
  {
    id: "q8",
    tag: "PHẦN 3 — MỨC ĐỘ NGHIÊM TRỌNG",
    q: "Các triệu chứng trên ảnh hưởng đến sinh hoạt của bạn ở mức nào?",
    opts: [
      ["A. Hầu như không ảnh hưởng", 0],
      ["B. Có khó chịu nhưng vẫn sinh hoạt bình thường", 1],
      ["C. Ảnh hưởng việc học/làm việc, ăn uống hoặc giấc ngủ", 2],
      ["D. Ảnh hưởng rõ rệt, phải thay đổi lịch sinh hoạt hoặc nghỉ ngơi vì triệu chứng", 3]
    ]
  },
  {
    id: "q9",
    tag: "PHẦN 3 — MỨC ĐỘ NGHIÊM TRỌNG",
    q: "Bạn có bị cơn đau hoặc khó chịu làm thức giấc ban đêm không?",
    opts: [
      ["A. Không", 0],
      ["B. Hiếm khi", 1],
      ["C. Thỉnh thoảng", 2],
      ["D. Thường xuyên", 3]
    ]
  },
  {
    id: "q10",
    tag: "PHẦN 3 — MỨC ĐỘ NGHIÊM TRỌNG",
    q: "Bạn có gặp dấu hiệu cảnh báo nào sau đây không? (sụt cân không chủ ý, đi ngoài phân đen/có máu, nôn kéo dài/nôn ra máu)",
    opts: [
      ["A. Không có", 0],
      ["B. Không chắc hoặc chỉ thoáng qua", 1],
      ["C. Có 1 dấu hiệu", 2],
      ["D. Có từ 2 dấu hiệu trở lên hoặc lặp lại nhiều lần", 3]
    ]
  }
];
