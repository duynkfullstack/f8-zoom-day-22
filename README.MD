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
