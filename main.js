const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const addBtn = $(".add-btn")
const addTaskModal = $(".modal-overlay")
const closeModal = $(".modal-close")
const cancelModal = $(".btn-cancel")
const taskTitle = $("#taskTitle")
const todoAppForm = $(".todo-app-form")

console.log(todoList)

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
}

closeModal.onclick = closeForm
cancelModal.onclick = closeForm

const todoTask = []

todoAppForm.onsubmit = function (e) {
    e.preventDefault()

    // Lấy ra toàn bộ dữ liệu của form và lưu vào newTask
    const newTask = Object.fromEntries(new FormData(todoAppForm))
    newTask.isComplete = false

    todoTask.unshift(newTask)

    // reset form
    todoAppForm.reset()

    // ẩn modal đi
    closeForm()
    //render
    renderTask(todoTask)
}

function renderTask(tasks) {
    const html = tasks
        .map(
            (task) =>
                `<div class="task-card ${task.color} ${
                    task.isComplete ? "completed" : ""
                }">
                <div class="task-header">
                    <h3 class="task-title">${task.title}</h3>
                    <button class="task-menu">
                        <i class="fa-solid fa-ellipsis fa-icon"></i>
                        <div class="dropdown-menu">
                            <div class="dropdown-item">
                                <i
                                    class="fa-solid fa-pen-to-square fa-icon"
                                ></i>
                                Edit
                            </div>
                            <div class="dropdown-item complete">
                                <i class="fa-solid fa-check fa-icon"></i>
                                Mark as Active
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
    const todoList = $("#todoList")
    todoList.innerHTML = html
}

renderTask()
