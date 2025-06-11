const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const modalAddTask = $(".add-btn ")
const modalForm = $(".modal-overlay")
const todoAppForm = $(".todo-app-form")
const submitBtn = $(".btn-primary")
const closeModal = $(".modal-close")
const cancel = $(".btn-secondary")
const todoTitle = $("#taskTitle")
const todoDesc = $("#taskDescription")
const todoCategory = $("#taskCategory")
const todoPriority = $("#taskPriority")
const todoStartTime = $("#startTime")
const todoEndTime = $("#endTime")
const todoTaskDate = $("#taskDate")
const todoTaskColor = $("#taskColor")
const taskCard = $(".task-card")
const completeTask = $$(".complete")
const taskGrid = $(".task-grid")

console.log(completeTask)

const todoTask = []

console.log(todoTask)

// Open modal
modalAddTask.onclick = function (event) {
    modalForm.className = "modal-overlay show"

    setTimeout(() => {
        taskTitle.focus()
    }, 10)
}

// close modal
closeModal.onclick = function (event) {
    modalForm.className = "modal-overlay"
}

cancel.onclick = function (event) {
    modalForm.className = "modal-overlay"
}

todoAppForm.submit = function (event) {
    event.preventDefault()
}

submitBtn.onclick = function (event) {
    const newTask = {
        taskTitle: todoTitle.value,
        taskDesc: todoDesc.value,
        taskCategory: todoCategory.value,
        taskPriority: todoPriority.value,
        taskStartTime: todoStartTime.value,
        taskEndTime: todoEndTime.value,
        taskDate: todoTaskDate.value,
        taskColor: todoTaskColor.value,
        isCompleted: false,
    }

    todoTask.unshift(newTask)

    todoTitle.value = ""
    todoTitle.focus()

    renderTask(todoTask)

    todoAppForm.reset()
    modalForm.className = "modal-overlay"
}

// complete task
taskGrid.onclick = function (e) {
    const completeBtn = e.target.closest(".dropdown-item.complete")

    if (completeBtn) {
        const taskCard = completeBtn.closest(".task-card")
        const isCompleted = taskCard.classList.toggle("completed")

        if (isCompleted) {
            completeBtn.innerHTML = `<i class="fa-solid fa-check fa-icon"></i> Mark as Active `
        } else {
            completeBtn.innerHTML = `<i class="fa-solid fa-check fa-icon"></i> Mark as Complete `
        }
    }
}

// Padding End Time
function padTime(time) {
    let hour = time.split(":")
    if (hour < 12) {
        return time.padEnd(8, " AM")
    } else {
        return time.padEnd(8, " PM")
    }
}

// render
function renderTask(todoTask) {
    const htmlCard = todoTask
        .map(
            (task) => `
            <div class="task-card ${task.taskColor} ${task.isCompleted}">
                <div class="task-header">
                    <h3 class="task-title">${task.taskTitle}</h3>
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
                            </div>
                            <div class="dropdown-item delete">
                                <i class="fa-solid fa-trash fa-icon"></i>
                                Delete
                            </div>
                        </div>
                    </button>
                </div>
                <p class="task-description">
                    ${task.taskDesc}
                </p>
                <div class="task-time">${
                    task.taskStartTime
                        ? padTime(task.taskStartTime)
                        : task.taskStartTime
                } - ${
                task.taskEndTime ? padTime(task.taskEndTime) : task.taskEndTime
            }</div>
            </div>`
        )
        .join("")
    // console.log("hihi")
    console.log(htmlCard)
    const taskCard = $(".task-card")
    taskCard.outerHTML = htmlCard
}

renderTask(todoTask)
