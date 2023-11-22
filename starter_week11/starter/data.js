const taskData = [
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



document.addEventListener("DOMContentLoaded", () => {
    let index = 0;
    for (let i of taskData) {
        index++;  
          
        /// create new task
        let newTask = document.createElement("li");
        newTask.setAttribute("id", "task_" + index);
        document.getElementById("task_list").append(newTask);

        /// create new task checkbox
        let newTaskCheckbox = document.createElement("input");
        newTaskCheckbox.setAttribute("type", "checkbox");
        newTaskCheckbox.setAttribute("id", "task_checkbox_" + index);
        newTaskCheckbox.setAttribute("class", "task_checkbox");
        if (i.completed === true) {
            newTaskCheckbox.setAttribute("checked", "checked");
        }
        newTask.appendChild(newTaskCheckbox);

        /// create new task title

        let newTaskTitle = document.createElement("label");
        newTaskTitle.innerHTML = i.title;
        newTaskTitle.setAttribute("id", "task_title_" + index);
        newTask.appendChild(newTaskTitle);

        /// create new task description

        let newTaskDescription = document.createElement("p");
        newTaskDescription.innerHTML = i.description;
        newTaskDescription.setAttribute("id", "task_description_" + index);
        newTask.appendChild(newTaskDescription);

        /// create new task due date
        let newTaskDueDate = document.createElement("p");
        newTaskDueDate.innerHTML = i.dueDate;
        newTaskDueDate.setAttribute("id", "task_dueDate_" + index);
        newTask.appendChild(newTaskDueDate);

        ///create button layout
        let buttons = document.createElement("p");
        buttons.setAttribute("id", "task_buttons_" + index);
        newTask.appendChild(buttons);


        /// create new task edit button
        let newTaskEdit = document.createElement("button");
        newTaskEdit.innerHTML = "Edit";
        newTaskEdit.setAttribute("id", "task_edit_" + index);
        newTaskEdit.setAttribute("class", "edit_task");
        buttons.appendChild(newTaskEdit);

        /// create new task delete button 
        let newTaskDelete = document.createElement("button");
        newTaskDelete.innerHTML = "Delete";
        newTaskDelete.setAttribute("id", "task_delete_" + index);
        newTaskDelete.setAttribute("class", "delete_task");
        buttons.appendChild(newTaskDelete);


        var d1 = new Date(i["dueDate"])
        var d2 = new Date()

        if(d1>d2){
            newTask.style.backgroundColor = "red";
        }
    }


    document.getElementById("close_modal").addEventListener("click", (event) => {
        document.getElementById("modal_form").style.display = "none";
    });

    for (let element of document.getElementsByClassName("edit_task")) {
        element.addEventListener("click", function () {
            document.getElementById("modal_form").style.display = "block";
        });
    };

    document.getElementById("modal_form").addEventListener("click", (event) => {
        if (event.target.id === "modal_form") {
            document.getElementById("modal_form").style.display = "none";
            console.log(event.target);
        }
        console.log(event.target);
    });

    for (let element of document.getElementsByClassName("task_checkbox")) {
        let d1 = new Date(element.parentElement.children[3].innerHTML)
        let d2 = new Date()
        if (element.checked === true) {
            element.parentElement.style.backgroundColor = "red"};
        addEventListener("click", function () {
            if (element.checked === true) {
                if  (d1>d2) {
                    element.parentElement.style.backgroundColor = "red"}}
                else {element.parentElement.style.backgroundColor = "white"};
        });
    };

});

