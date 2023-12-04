const allTasks = [
    {
        title: "First task",
        description: "Just an example task. The description contains text.",
        dueDate: "2024-01-01",
    },
    {
        title: "Task (overdue)",
        description: "This task is overdue (due in the past)",
        dueDate: "2023-11-10",
        completed: false
    },
    {
        title: "Another task (completed)",
        description: "This task has the property completed: true",
        dueDate: "2023-10-10",
        completed: true,
    },
    {
        title: "Another completed task",
        description: "This task is completed but the due date was before the other one",
        dueDate: "2023-06-01",
        completed: true
    }
]


// show / hide modal dialog
const showModal = () => document.getElementById("modal_form").style.display = "block"
const hideModal = () => document.getElementById("modal_form").style.display = "none"

// set modal values
const setModal = (title, description, dueDate, taskId) => {
    document.getElementById("task_title").value = title
    document.getElementById("task_description").value = description
    document.getElementById("task_due_date").value = dueDate
    document.getElementById("task_id").value = taskId
}

// reset modal values to default
const resetModal = () => setModal("", "", "", -1)

// creates a new element and text inside
// myClass is "optional" - we check if it is provided in the function body
const makeElement = (tagName, textContent, myClass = undefined) => {
    const myElem = document.createElement(tagName)
    myElem.textContent = textContent
    if (myClass) {
        myElem.classList.add(myClass)
    }
    return myElem
}

// creates the actions for the task
const makeTaskActions = (taskId) => {
    const pActions = makeElement("p", "", "task_actions")

    // edit button
    const editBtn = makeElement("button", "Edit", "edit_task")
    editBtn.addEventListener("click", (event) => {
        // when we click on the edit button, we want to show the modal
        // and inject the current values of the task into the form
        document.getElementById("modal_form").style.display = "block"

        // we use the event to collect data by navigating up the DOM (.parentNode)
        // .parentNode => <p class="task_actions">
        // .parentNode.parentNode => <li>
        // inside the <li> we have the label, the description, and the due date
        const parentNode = event.target.parentNode.parentNode
        // We only have one label - we take the first one
        const title = parentNode.getElementsByTagName("label")[0].textContent
        // We have 2 paragraphs - the first is the description, the second is the date
        const desc = parentNode.getElementsByTagName("p")[0].textContent
        const dueDate = parentNode.getElementsByTagName("p")[1].textContent
        setModal(title, desc, dueDate, taskId)
    })
    pActions.appendChild(editBtn)

    // delete button
    const delBtn = makeElement("button", "Delete", "delete_task")
    delBtn.addEventListener("click", () => {
        const response = confirm(`Are you sure you want to delete this task?\n${task.title}`)
    })
    pActions.appendChild(delBtn)

    return pActions
}

const makeTask = (task, taskId) => {
    // creates a new li element
    const taskElm = document.createElement("li")
    // creates the checkbox
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"

    // makes sure the checkbox is checked if required
    if (!!task.completed === true) {
        checkbox.setAttribute("checked", true)
    }

    taskElm.appendChild(checkbox)

    // creates the label for the task
    const title = makeElement("label", task.title)
    title.setAttribute("for", "task_".concat(taskId))
    taskElm.appendChild(title)

    // creates the description for the task
    const desc = makeElement("p", task.description)
    taskElm.appendChild(desc)

    // creates the due date for the task
    const dueDate = makeElement("p", task.dueDate)
    taskElm.appendChild(dueDate)

    const pActions = makeTaskActions(taskId)
    taskElm.appendChild(pActions)
    document.getElementById("task_list").appendChild(taskElm)
}

const refreshList = () => {
    // clears the task list
    document.querySelector("ul#task_list").innerHTML = ""

    allTasks.forEach((task, taskId) => makeTask(task, taskId))

    document.getElementById("task_summary").textContent = `${allTasks.length} tasks total`
}

document.addEventListener("DOMContentLoaded", () => {
    // show the tasks
    refreshList()

    // if we click on the modal but outside of the content, close the modal
    document.getElementById("modal_form").addEventListener("click", function (event) {
        if (event.target.id === "modal_form") {
            hideModal()
        }
    })
    // the close button closes the modal too
    document.getElementById("close_modal").addEventListener("click", hideModal)

    document.getElementById("add_task_modal").addEventListener("click", () => {
        resetModal()
        showModal()
    })
})