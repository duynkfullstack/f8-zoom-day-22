const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const addBtn = $(".add-btn")
const addTaskModal = $(".modal-overlay")
const closeModal = $(".modal-close")
const cancelModal = $(".btn-cancel")
const taskTitle = $("#taskTitle")
const todoAppForm = $(".todo-app-form")
const todoList = $("#todoList")

let editIndex = null

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

    todoAppForm.reset()

    editIndex = null
}

closeModal.onclick = closeForm
cancelModal.onclick = closeForm

const todoTask = JSON.parse(localStorage.getItem("todoTasks"))
console.log(todoTask)

todoAppForm.onsubmit = function (e) {
    e.preventDefault()

    // Lấy ra toàn bộ dữ liệu của form và lưu vào formData
    const formData = Object.fromEntries(new FormData(todoAppForm))

    // Nếu có index thực hiện mở modal sửa
    // Thực hiện logic sửa
    if (editIndex) {
        todoTask[editIndex] = formData
        // Nếu không có index, thực hiện mở modal thêm mới
        // Thực hiện logic thêm phần tử vào mảng và render ra giao diện
    } else {
        // Mặc định là task chưa hoàn thành
        formData.isComplete = false

        todoTask.unshift(formData)
    }

    // Lưu dữ liệu vào LocalStorage
    localStorage.setItem("todoTasks", JSON.stringify(todoTask))

    // ẩn modal đi, khi ẩn sẽ reset form ở trong hàm closeForm
    closeForm()
    //render
    renderTask(todoTask)
}

todoList.onclick = function (e) {
    const editBtn = e.target.closest(".edit-btn")
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
}
openForm()

function renderTask(tasks) {
    const html = tasks
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
                            <div class="dropdown-item complete">
                                <i class="fa-solid fa-check fa-icon"></i>
                                ${
                                    task.isComplete
                                        ? "Mark as Active"
                                        : "Mark as Complete"
                                }
                            </div>
                            <div class="dropdown-item delete">
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

const taskCard = $(".task-card")
const complete = $(".complete")

console.log(complete)
