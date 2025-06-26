const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const addBtn = $(".add-btn")
const addTaskModal = $(".modal-overlay")
const closeModal = $(".modal-close")
const cancelModal = $(".btn-cancel")
const taskTitle = $("#taskTitle")
const todoAppForm = $(".todo-app-form")
const todoList = $("#todoList")
const searchInput = $(".search-input")
const activeTask = $(".active-task")
const completeTask = $(".complete-task")
const allTask = $(".all-task")

let editIndex = null

// Tìm kiếm dựa vào dữ liệu nhập: oninput
searchInput.addEventListener("input", function (e) {
    const valueInput = e.target.value.trim().toLowerCase()

    const taskFit = todoTask.filter((task) => {
        return (
            task.title.toLowerCase().includes(valueInput) ||
            task.description.toLowerCase().includes(valueInput)
        )
    })

    allTask.classList.add("active")
    activeTask.classList.remove("active")
    completeTask.classList.remove("active")
    renderTask(taskFit)
})

// Mờ form
function openForm() {
    addTaskModal.classList.add("show")

    // Tự động focus ô input đầu tiên
    setTimeout(() => {
        taskTitle.focus()
    }, 1000)
}

addBtn.addEventListener("click", openForm)

// Thoát form
function closeForm() {
    // Sử dụng toggle để bật tắt form
    addTaskModal.classList.toggle("show")

    const formTitle = addTaskModal.querySelector(".modal-title")
    if (formTitle) {
        formTitle.textContent =
            formTitle.dataset.original || formTitle.textContent
        delete formTitle.dataset.original
    }

    const submitBtn = addTaskModal.querySelector(".btn-submit")
    if (submitBtn) {
        submitBtn.textContent =
            submitBtn.dataset.original || submitBtn.textContent
        delete submitBtn.dataset.original
    }

    // Cuộn lên đầu form
    addTaskModal.querySelector(".modal").scrollTop = 0

    // reset form về giá trị mặc định
    todoAppForm.reset()

    editIndex = null
}

closeModal.addEventListener("click", closeForm)
cancelModal.addEventListener("click", closeForm)

const todoTask = JSON.parse(localStorage.getItem("todoTasks")) || []
console.log(todoTask)

todoAppForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Lấy ra toàn bộ dữ liệu của form và lưu vào formData
    const formData = Object.fromEntries(new FormData(todoAppForm))

    // Nếu có index thực hiện mở modal sửa
    // Thực hiện logic sửa
    if (editIndex) {
        const currentTitle = taskTitle.value
        const result = todoTask.filter((task, index) => {
            return (
                currentTitle.toLowerCase() === task.title.toLowerCase() &&
                String(index) !== editIndex
            )
        })
        console.log(result)
        if (result.length !== 0) {
            showErrorToast()
            return
        } else {
            todoTask[editIndex] = formData
        }

        // Nếu không có index, thực hiện mở modal thêm mới
        // Thực hiện logic thêm phần tử vào mảng và render ra giao diện
    } else {
        // Mặc định là task chưa hoàn thành
        formData.isComplete = false
        const result = todoTask.filter((task, index) => {
            return (
                taskTitle.value === task.title.toLowerCase() &&
                String(index) !== editIndex
            )
        })
        console.log(result)
        if (result.length !== 0) {
            showErrorToast()
            return
        }

        todoTask.unshift(formData)
    }

    saveTask()
    showSuccessToastAddNew()

    // ẩn modal đi, khi ẩn sẽ reset form ở trong hàm closeForm
    closeForm()
    //render
    renderTask(todoTask)
})

function saveTask() {
    // Lưu dữ liệu vào LocalStorage
    localStorage.setItem("todoTasks", JSON.stringify(todoTask))
}

todoList.addEventListener("click", function (e) {
    const editBtn = e.target.closest(".edit-btn")
    const deleteBtn = e.target.closest(".delete-btn")
    const completeBtn = e.target.closest(".complete-btn")

    if (editBtn) {
        const taskIndex = editBtn.dataset.index
        const task = todoTask[taskIndex]

        editIndex = taskIndex

        // edit
        for (const key in task) {
            const value = task[key]
            const input = $(`[name="${key}"]`)

            if (input) {
                input.value = value
            }
        }

        const formTitle = addTaskModal.querySelector(".modal-title")
        formTitle.dataset.original = formTitle.textContent
        formTitle.textContent = "Edit Task"

        const submitBtn = addTaskModal.querySelector(".btn-submit")
        submitBtn.dataset.original = submitBtn.textContent
        submitBtn.textContent = "Save Task"

        openForm()
    }
    // Xóa task
    if (deleteBtn) {
        const taskIndex = deleteBtn.dataset.index
        const task = todoTask[taskIndex]

        showSuccessToastDelete()
        todoTask.splice(taskIndex, 1)

        saveTask()
        renderTask(todoTask)
    }

    // Đánh dấu hoàn thành
    if (completeBtn) {
        const taskIndex = completeBtn.dataset.index
        const task = todoTask[taskIndex]

        task.isComplete = !task.isComplete

        allTask.classList.add("active")
        activeTask.classList.remove("active")
        completeTask.classList.remove("active")

        saveTask()
        renderTask(todoTask)
    }
})

// Phân loại task

allTask.addEventListener("click", function (e) {
    allTask.classList.add("active")
    activeTask.classList.remove("active")
    completeTask.classList.remove("active")

    renderTask(todoTask)
})

activeTask.addEventListener("click", function (e) {
    const activeTasks = todoTask.filter((task) => task.isComplete === false)

    allTask.classList.remove("active")
    activeTask.classList.add("active")
    completeTask.classList.remove("active")
    renderTask(activeTasks)
})

completeTask.addEventListener("click", function (e) {
    const completeTasks = todoTask.filter((task) => task.isComplete === true)

    // Tô sáng tab hiện tại
    allTask.classList.remove("active")
    activeTask.classList.remove("active")
    completeTask.classList.add("active")
    renderTask(completeTasks)
})

function renderTask(taskList) {
    const html = taskList
        .map(
            (task, index) =>
                `<div class="task-card ${escapeHTML(task.color)} ${
                    task.isComplete ? "completed" : ""
                }">
                <div class="task-header">
                    <h3 class="task-title">${escapeHTML(task.title)}</h3>
                    <button class="task-menu">
                        <i class="fa-solid fa-ellipsis fa-icon"></i>
                        <div class="dropdown-menu">
                            <div class="dropdown-item edit-btn" data-index="${index}">
                                <i
                                    class="fa-solid fa-pen-to-square fa-icon" 
                                ></i>
                                Edit
                            </div>
                            <div class="dropdown-item complete complete-btn" data-index=${index}>
                                <i class="fa-solid fa-check fa-icon"></i>
                                ${
                                    task.isComplete
                                        ? "Mark as Active"
                                        : "Mark as Complete"
                                }
                            </div>
                            <div class="dropdown-item delete delete-btn" data-index="${index}">
                                <i class="fa-solid fa-trash fa-icon"></i>
                                Delete
                            </div>
                        </div>
                    </button>
                </div>
                <p class="task-description">
                    ${escapeHTML(task.description)}
                </p>
                <div class="task-time">${escapeHTML(
                    task.startTime
                )} - ${escapeHTML(task.endTime)} PM</div>
            </div>`
        )
        .join("")
    todoList.innerHTML = html
}
// render lần đầu, để lấy dữ liệu hiển thị ra giao diện
renderTask(todoTask)

function escapeHTML(html) {
    const div = document.createElement("div")
    div.textContent = html
    return div.innerHTML
}

// Toast Message

function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const toastElement = document.querySelector("#toast")
    console.log(toastElement)
    if (toastElement) {
        const toast = document.createElement("div")

        // Auto remove toast
        const autoRemoveId = setTimeout(function () {
            toastElement.removeChild(toast)
        }, duration + 1000)

        // Remove toast when clicked
        toast.onclick = function (e) {
            if (e.target.closest(".toast__close")) {
                toastElement.removeChild(toast)
                clearTimeout(autoRemoveId)
            }
        }

        const icons = {
            success: "fas fa-check-circle",
            info: "fas fa-info-circle",
            warning: "fas fa-exclamation-circle",
            error: "fas fa-exclamation-circle",
        }
        const icon = icons[type]
        const delay = (duration / 1000).toFixed(2)

        toast.classList.add("toast", `toast--${type}`)
        toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`

        toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `
        toastElement.appendChild(toast)
    }
}

// Hàm show success và Error
function showSuccessToastEdit() {
    toast({
        title: "Sửa một công việc",
        message: "Bạn đã sửa thành công một công việc.",
        type: "success",
        duration: 5000,
    })
}

function showErrorToast() {
    toast({
        title: "Trùng công việc",
        message: "Công việc này đã có trong danh sách.",
        type: "error",
        duration: 5000,
    })
}

function showSuccessToastAddNew() {
    toast({
        title: "Thêm công việc mới",
        message: "Đã thêm một công việc vào danh sách.",
        type: "success",
        duration: 5000,
    })
}

function showSuccessToastDelete() {
    toast({
        title: "Xóa một công việc",
        message: "Đã xóa một công việc khỏi danh sách.",
        type: "success",
        duration: 5000,
    })
}
