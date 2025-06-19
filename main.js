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

console.log(allTask)

let editIndex = null

// Tìm kiếm dựa vào dữ liệu nhập: oninput
searchInput.oninput = function (e) {
    const valueInput = e.target.value.trim().toLowerCase()

    const taskFit = todoTask.filter((task) => {
        return (
            task.title.toLowerCase().includes(valueInput) ||
            task.description.toLowerCase().includes(valueInput)
        )
    })

    allTask.className = "tab-button active all-task"
    activeTask.className = "tab-button active-task"
    completeTask.className = "tab-button complete-task"
    renderTask(taskFit)
}

// Mờ form
function openForm() {
    addTaskModal.className = "modal-overlay show"

    // Tự động focus ô input đầu tiên
    setTimeout(() => {
        taskTitle.focus()
    }, 1000)
}

addBtn.onclick = openForm

// Thoát form
function closeForm() {
    addTaskModal.className = "modal-overlay"

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

closeModal.onclick = closeForm
cancelModal.onclick = closeForm

const todoTask = JSON.parse(localStorage.getItem("todoTasks")) || []
console.log(todoTask)

todoAppForm.onsubmit = function (e) {
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
            alert("Trùng công việc")
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
            alert("Trùng công việc")
            return
        }

        todoTask.unshift(formData)
    }

    saveTask()

    // ẩn modal đi, khi ẩn sẽ reset form ở trong hàm closeForm
    closeForm()
    //render
    renderTask(todoTask)
}

function saveTask() {
    // Lưu dữ liệu vào LocalStorage
    localStorage.setItem("todoTasks", JSON.stringify(todoTask))
}

function completeTick(element) {}

todoList.onclick = function (e) {
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

        todoTask.splice(taskIndex, 1)

        saveTask()
        renderTask(todoTask)
    }

    // Đánh dấu hoàn thành
    if (completeBtn) {
        const taskIndex = completeBtn.dataset.index
        const task = todoTask[taskIndex]

        task.isComplete = !task.isComplete

        allTask.className = "tab-button active all-task"
        activeTask.className = "tab-button active-task"
        completeTask.className = "tab-button complete-task"

        saveTask()
        renderTask(todoTask)
    }
}

// Phân loại task

activeTask.onclick = function (e) {
    const activeTasks = todoTask.filter((task) => task.isComplete === false)

    allTask.className = "tab-button all-task"
    activeTask.className = "tab-button active active-task"
    completeTask.className = "tab-button complete-task"

    renderTask(activeTasks)
}

completeTask.onclick = function (e) {
    todoList.onclick = function (e) {
        const completeBtn = e.target.closest(".complete-btn")
        if (completeBtn) {
            completeTick(completeBtn)
        }
    }
    const completeTasks = todoTask.filter((task) => task.isComplete === true)

    // Tô sáng tab hiện tại
    allTask.className = "tab-button all-task"
    activeTask.className = "tab-button active-task"
    completeTask.className = "tab-button active complete-task"
    renderTask(completeTasks)
}

function renderTask(taskList) {
    const html = taskList
        .map(
            (task, index) =>
                `<div class="task-card ${task.color} ${
                    task.isComplete ? "completed" : ""
                }">
                <div class="task-header">
                    <h3 class="task-title">${task.title}</h3>
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
                    ${task.description}
                </p>
                <div class="task-time">${task.startTime} - ${
                    task.endTime
                } PM</div>
            </div>`
        )
        .join("")
    todoList.innerHTML = html
}
// render lần đầu, để lấy dữ liệu hiển thị ra giao diện
renderTask(todoTask)
