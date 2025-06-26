Day 22: Bài tập về nhà

Cập nhật tháng 6 năm 2025

#Yêu cầu chung

#Triển khai chức năng thêm task mới
#1. Xử lý mở/đóng modal
#2. Tự động focus input
#3. Xử lý form submission
#4. Tạo và lưu trữ task mới
#5. Hiển thị task trên giao diện
#6. Hoàn tất quá trình thêm task

#Lưu ý

#Yêu cầu chung

-   Tạo dự án mới với tên f8-zoom-day-22

-   Tạo hai file: index.html và styles.css

-   Sao chép H-TML và CSS từ nguồn: https://jsfiddle.net/w6p3vfu4/8/

#Triển khai chức năng thêm task mới

#1. Xử lý mở/đóng modal

-   Khi click vào .add-btn, hiển thị modal
    thêm mới bằng cách thêm class show vào element #addTaskModal

-   Sử dụng addTaskModal.className = "modal-overlay show" để hiển thị modal

-   Sử dụng addTaskModal.className = "modal-overlay" để ẩn modal

#2. Tự động focus input

-   Khi modal “Add New Task” được mở, tự động focus vào input đầu tiên sử dụng inputElement.focus()
    #3. Xử lý form submission

-   Bắt sự kiện submit trên form element (.todo-app-form) - Ngăn chặn hành vi submit mặc định của form

#4. Tạo và lưu trữ task mới

-   Khi form được submit, thu thập dữ liệu từ các trường input

-   Tạo object newTask bao gồm các thuộc tính:

title

description

category

priority

startTime

endTime

DueDate

cardColor

isCompleted (mặc định là false) - Khởi tạo mảng todoTasks = []

-   Thêm newTask vào đầu mảng todoTasks

-   Gọi hàm renderTasks() để cập nhật giao diện

#5. Hiển thị task trên giao diện

-   Quan sát cấu trúc HTML có sẵn của .task-card để hiểu cách hiển thị từng todo item

-   Sử dụng các class màu tương ứng để hiển thị theo màu đã được chọn

-   Áp dụng class completed để thể hiện trạng thái đã hoàn thành công việc

#6. Hoàn tất quá trình thêm task

-   Sau khi thêm task thành công:

-   Reset form sử dụng formElement.reset()

-   Ẩn modal đi - Gọi hàm renderTasks() để cập nhật giao diện

#Lưu ý

-   Khi refresh trang (F5), dữ liệu sẽ bị mất do biến todoTasks chỉ tồn tại trong memory của tab hiện tại (biến toàn cục)

. Hiện tại chưa cần xử lý các trường hợp lưu trữ khác, chúng ta sẽ hoàn thiện tính năng này trong các bài học tiếp theo.

-   Day 23:

Yêu cầu chung:

-   Vẫn sửa vào Git repo buổi học trước, commit thêm và push.
-   Xem lại video record: https://youtu.be/GeUdpEyQZqY

Bài 1: Tự học chương 34 từ bài 34.34 - 34-45
Bài 2: Phát triển tiếp dự án Todo App

-   Triển khai chức năng lọc theo: Tất cả tasks, tasks chưa hoàn thành, tasks đã hoàn thành (UI cho sẵn buttons rồi). ✅
    Note: Đang ở tab đang hoàn thành mà đánh dấu chưa hoàn thành đang bị lỗi
-   Triển khai chức năng tìm kiếm: Khi gõ vào ô search thì lọc ra các tasks có title hoặc description chứa từ khóa, lọc ngay trên danh sách chính. Nếu không có tasks khớp với từ khóa, hiển thị message không tìm thấy. Khi xóa từ khóa khỏi ô search, hiển thị lại danh sách gốc. Khi tìm, tự động chuyển về chế độ lọc "Tất cả tasks" (VD đang lọc ở "các tasks đã xong", thì khi bắt đầu tìm tự chuyển về tất cả).
-   Check trùng tiêu đề (title) và đưa ra cảnh báo khi thêm task và sửa task.

Deadline: Trước buổi học sau, phần học trên hệ thống (chương 34) có thể ưu tiên sau. Link nộp bài: https://short.f8team.dev/q5e2xjvd

Day 24:

Yêu cầu chung:

-   Làm tiếp vào repo bài tập buổi trước.
-   Commit và push code lên sau đó nộp bài bằng Github Repo & Pages.

Yêu cầu bài tập:

1. Hoàn thành từ bài 34.37 - 34.69 (Lưu ý rất nhiều nội dung đã học, bạn có thể next nếu đã nắm chắc).
2. Phòng tránXSS cho bàih tập todo bằng 1 trong 2 cách: createElement + textContent (1) hoặc viết hàm escapeHTML (2).
3. Sửa lại code Todo App sử dụng các kiến thức mới học. VD: đóng mở modal bằng classList.toggle(), ...
4. Tham khảo video này (https://youtu.be/7c7ABhaQJGM) và áp dụng Toast Message vào Todo App (thêm, sửa, xóa... thành công).
5. Hoàn thành các flashcards mới (nếu có).

Deadline: Trước buổi học sau.
Nộp bài tại: https://short.f8team.dev/bfny3h8c
