function asdfghdjfsdghkjhasdfgfjkhhdfgkjsdfghkljsdfghsldfkj() {

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
    localStorage.setItem("taskData", JSON.stringify(taskData));
}


const allTasks = JSON.parse(localStorage.getItem("taskData"));
const showModal = () => document.getElementById("modal_form").style.display = "block"
function hideModal() {
    document.getElementById("modal_form").style.display = "none";
    document.getElementById("new_task_title").value = "";
    document.getElementById("new_task_description").value = "";
    document.getElementById("new_task_due_date").value = "";
}


function reload(condition) {
    document.getElementById("task_list").innerHTML = "";
    document.getElementById("hw_tracker").innerHTML = "";
    document.getElementById("hiddenId").value = -1;
    makeTasks();
    recall();
    if (condition === "Pending") {
        for (let element of allTasks) {
            if (element.completed === true) {
                document.getElementById("task_" + (allTasks.indexOf(element) + 1)).style.display = "none";
            }
            else {
                document.getElementById("task_" + (allTasks.indexOf(element) + 1)).style.display = "";
            }
        }
    } else if (condition === "Completed") {
        for (let element of allTasks) {
            if (element.completed === true) {
                document.getElementById("task_" + (allTasks.indexOf(element) + 1)).style.display = "";
            }
            else {
                document.getElementById("task_" + (allTasks.indexOf(element) + 1)).style.display = "none";
            }
        }
    } else if (condition === "Everything") {
        for (let element of allTasks) {
            document.getElementById("task_" + (allTasks.indexOf(element) + 1)).style.display = "";
        }
    }
};

function makeTasks() {
    let index = 0;
    let number_completed = 0;
    for (let i of allTasks) {
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

        if (d2 > d1) {
            newTask.style.backgroundColor = "red";
            newTask.setAttribute("overdue", "false");
        }
        if (i.completed === true) {
            newTask.style.backgroundColor = "green";

            number_completed++;
        }
    }
    updateTitle(number_completed, index);
};

function updateTitle(number_completed, index) {
    document.getElementById("hw_tracker").textContent = number_completed + " completed" + "," + index + " total";
};

function editTask(element) {
    if (element === undefined) {
        return null;
    }
    console.log(element)
    let index = element.id.split("_")[2] - 1;

    showModal();
    if (document.getElementById("modal_name").innerHTML !== "Edit Task") {
        document.getElementById("modal_name").innerHTML = "Edit Task";
        document.getElementById("new_task_title").value = allTasks[index]["title"];
        document.getElementById("new_task_description").value = allTasks[index]["description"];
        document.getElementById("new_task_due_date").value = allTasks[index]["dueDate"];
        // document.getElementById("modal_form").addEventListener("click", (event) => {
        //     if (event.target.id !== "save_task") {
        //         allTasks[index]["title"] = allTasks[index]["title"];
        //         allTasks[index]["description"] = allTasks[index]["description"];
        //         allTasks[index]["dueDate"] = allTasks[index]["dueDate"];
        //         return null
        //     }
        // });
        document.getElementById("modal_form").addEventListener("click", (event) => {
            if (event.target.id === "save_task" && document.getElementById("hiddenId").value === "1") {
                // let index = element.id.split("_")[2] - 1;
                // let newTitle = MakeTitle();
                // let newDescription = MakeDescription();
                // let newDueDate = MakeDueDate();
                allTasks[index]["title"] = MakeTitle();
                allTasks[index]["description"] = MakeDescription();
                allTasks[index]["dueDate"] = MakeDueDate();
                loadData();
                return null
            } else if (event.target.id === "close_modal") {hideModal();
                console.log(allTasks[index]);
                localStorage.setItem("taskData", JSON.stringify(allTasks));
                return null
            }
            else { hideModal();
            return null}    
        });
        return null
    }
};

function MakeTitle() {
    var input = document.getElementById("new_task_title").value;
    localStorage.setItem("new_task_title", JSON.stringify(input));
    let newTitle = JSON.parse(localStorage.getItem("new_task_title"));
    return newTitle;
};

function MakeDescription() {
    var input = document.getElementById("new_task_description").value;
    localStorage.setItem("new_task_description", JSON.stringify(input));
    let newDescription = JSON.parse(localStorage.getItem("new_task_description"));
    return newDescription;
};

function MakeDueDate() {
    let input = new Date();
    input = document.getElementById("new_task_due_date").value;
    localStorage.setItem("new_task_due_date", input);
    let newDueDate = (localStorage.getItem("new_task_due_date"));
    return newDueDate;
};

function loadData() {
    localStorage.setItem("taskData", JSON.stringify(allTasks));
    hideModal();
    reload();
};

function deleteTask(element) {
    if (element === undefined) {
        return null;
    }
    let index = element.id.split("_")[2];
    allTasks.splice(index - 1, 1);
    loadData();

};

function checkOverdue(x) {
    let condition = "Everything";
    if (x) {
        document.getElementById("hiddenId2").value = x;
        condition = x}
    if (!x) {condition = document.getElementById("hiddenId2").value}
        
    for (let element of document.getElementsByClassName("task_checkbox")) {
        let index = element.id.split("_")[2] - 1;
        let TBindex = element.id.split("_")[2];

        document.getElementById("task_checkbox_" + TBindex).addEventListener("click", function () {

            if (element.checked === true) {
                element.parentElement.style.backgroundColor = "green";
                allTasks[index].completed = true;
                localStorage.setItem("taskData", JSON.stringify(allTasks));
                if (condition === "Pending") 
                    reload("Pending");
            }
            if (element.checked === false) {
                allTasks[index].completed = false
                localStorage.setItem("taskData", JSON.stringify(allTasks));
                if (condition === "Completed")
                    reload("Completed");   
            }

            if (element.checked === false && overdue(TBindex) === true) {
                element.parentElement.style.backgroundColor = "red";
                localStorage.setItem("taskData", JSON.stringify(allTasks));
                if (condition === "Pending")
                    reload("Completed");
            }

            if (element.checked === false && overdue(TBindex) === false ) {
                element.parentElement.style.backgroundColor = "";
                localStorage.setItem("taskData", JSON.stringify(allTasks));
                if (condition === "Pending")
                    reload("Completed");
            }

            // console.log(document.getElementById(element.parentElement.id).id)}
            // console.log(element.parentElement.overdue)
            // console.log(element.parentElement.id)
            // console.log(element.id)
            // console.log(element.parentElement.id.overdue)
            // // console.log(element.getElementById("task_" +index))
            // // console.log(element.parentElement.overdue)
            // console.log(element.parentElement)
            ;


        });
    };

    function overdue(index) {
        var d1 = new Date((document.getElementById("task_dueDate_" + index)).innerHTML);
        var d2 = new Date();

        if (d2 > d1) {
            return true;
        }
        else {
            return false;
        }
    }
};

function createNewTask() {
    showModal()
    if (document.getElementById("modal_name").innerHTML !== "Create New Task") {
        document.getElementById("modal_name").innerHTML = "Create New Task";
        document.getElementById("new_task_title").value = null;
        document.getElementById("new_task_description").value = null;
        document.getElementById("new_task_due_date").value = null;
        document.getElementById("save_task").addEventListener("click", (event) => {
            if (event.target.id === "save_task" && document.getElementById("modal_name").innerHTML === "Create New Task" && document.getElementById("hiddenId").value === "0") {
                let newTask = {
                    title: MakeTitle(),
                    description: MakeDescription(),
                    dueDate: MakeDueDate(),
                };
                allTasks.push(newTask);
                loadData();
            } else {
                console.log(event.target.id, document.getElementById("modal_name").innerHTML, document.getElementById("hiddenId").value);
                hideModal();
            }
        });
    };
};

function recall() {
    editTask();
    deleteTask();
    checkOverdue();
};

document.addEventListener("DOMContentLoaded", () => {
    reload();

    document.getElementById("close_modal").addEventListener("click", hideModal())

    document.getElementById("modal_form").addEventListener("click", (event) => {
        if (event.target.id === "modal_form") {
            document.getElementById("modal_form").style.display = "none";

        }
    });

    document.getElementById("modal_contents").addEventListener("click", (event) => {
        for (let element of document.getElementsByClassName("delete_task")) {
            if (element.id === event.target.id) {
                deleteTask(element);
            }
        };

        for (let element of document.getElementsByClassName("edit_task")) {
            if (element.id === event.target.id) {
                document.getElementById("hiddenId").value = 1
                editTask(element)
            }
        };
    });

    document.getElementById("create_new").addEventListener("click", function () {
        console.log("create new task")
        document.getElementById("hiddenId").value = 0;
        console.log(document.getElementById("hiddenId").value)
        createNewTask();
    });


    document.getElementById("Everything").addEventListener("click", function () {
        checkOverdue("Everything")
        reload("Everything");
    });

    document.getElementById("Pending").addEventListener("click", function () {
        checkOverdue("Pending")
       reload("Pending");
    });

    document.getElementById("Completed").addEventListener("click", function () {
        checkOverdue("Completed")
        reload("Completed");
    });

    

    document.getElementById("Refresh").addEventListener("click", function () {
        asdfghdjfsdghkjhasdfgfjkhhdfgkjsdfghkljsdfghsldfkj();
        location.reload();
    });
});