// const taskData = [
//     {
//         title: "First task",
//         description: "Just an example task. The description contains text.",
//         dueDate: "2024-01-01",
//     },
//     {
//         title: "Task (overdue)",
//         description: "This task is overdue (due in the past)",
//         dueDate: "2023-11-10",
//         completed: false
//     },
//     {
//         title: "Another task (completed)",
//         description: "This task has the property completed: true",
//         dueDate: "2023-10-10",
//         completed: true,
//     },
//     {
//         title: "Another completed task",
//         description: "This task is completed but the due date was before the other one",
//         dueDate: "2023-06-01",
//         completed: true
//     }
// ]
// localStorage.setItem("taskData", JSON.stringify(taskData));

const allTasks = JSON.parse(localStorage.getItem("taskData"));

document.addEventListener("DOMContentLoaded", () => {
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


    document.getElementById("hw_tracker").textContent = number_completed + " completed" + "," + index + " total";

    document.getElementById("close_modal").addEventListener("click", (event) => {
        document.getElementById("modal_form").style.display = "none";
    });

    for (let element of document.getElementsByClassName("edit_task")) {
        let index = element.id.split("_")[2] - 1;
        element.addEventListener("click", function () {
            document.getElementById("modal_form").style.display = "block";
            document.getElementById("modal_name").innerHTML = "Edit Task";
            document.getElementById("new_task_title").value = allTasks[index]["title"];
            document.getElementById("new_task_description").value = allTasks[index]["description"];
            document.getElementById("new_task_due_date").value = allTasks[index]["dueDate"];
            document.getElementById("save_task").addEventListener("click", (event) => {
                // let index = element.id.split("_")[2] - 1;
                // let newTitle = MakeTitle();
                // let newDescription = MakeDescription();
                // let newDueDate = MakeDueDate();
                allTasks[index]["title"] = MakeTitle();
                allTasks[index]["description"] = MakeDescription();
                allTasks[index]["dueDate"] = MakeDueDate();
                console.log(allTasks[index - 1])
                loadData();

            });
        });
    };

    document.getElementById("modal_form").addEventListener("click", (event) => {
        if (event.target.id === "modal_form") {
            document.getElementById("modal_form").style.display = "none";

        }
    });


    document.getElementById("create_new").addEventListener("click", (event) => {
        document.getElementById("modal_form").style.display = "block";
        document.getElementById("modal_name").innerHTML = "Create New Task";
        document.getElementById("new_task_title").value = "";
        document.getElementById("new_task_description").value = "";
        document.getElementById("save_task").addEventListener("click", (event) => {
            // let title = newTitle();
            // let description = newDescription();
            // let dueDate = newDueDate();
            let newTask = {
                title: MakeTitle(),
                description: MakeDescription(),
                dueDate: MakeDueDate(),
            };
            allTasks.push(newTask);
            loadData();
        });
    });


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
        var input = document.getElementById("new_task_due_date").value;
        localStorage.setItem("new_task_due_date", input);
        let newDueDate = (localStorage.getItem("new_task_due_date"));
        return newDueDate;
    };

    function loadData() {
        localStorage.setItem("taskData", JSON.stringify(allTasks));
        location.reload();
    };

    for (let element of document.getElementsByClassName("delete_task")) {
        element.addEventListener("click", function () {
            let index = element.id.split("_")[2];
            allTasks.splice(index - 1, 1);
            loadData();
            location.reload();
        });
    };

    for (let element of document.getElementsByClassName("task_checkbox")) {
        let index = element.id.split("_")[2]-1;
        let TBindex = element.id.split("_")[2] ;
        
        document.getElementById("task_checkbox_" + TBindex).addEventListener("click", function () {
            
            if (element.checked === true) {
                element.parentElement.style.backgroundColor = "green";
                allTasks[index].completed = true;
                localStorage.setItem("taskData", JSON.stringify(allTasks));
            }
            if (element.checked === false) {
                console.log(index)
                console.log(allTasks[index])
            // allTasks[index].completed = false
            console.log(allTasks)
            

            if (element.checked === false && overdue(index) === true && allTasks[index].completed === false) {
                element.parentElement.style.backgroundColor = "red";
                localStorage.setItem("taskData", JSON.stringify(allTasks));
            }
            else {console.log("not overdue")}
                // console.log(document.getElementById(element.parentElement.id).id)}
                // console.log(element.parentElement.overdue)
                // console.log(element.parentElement.id)
                // console.log(element.id)
                // console.log(element.parentElement.id.overdue)
                // // console.log(element.getElementById("task_" +index))
                // // console.log(element.parentElement.overdue)
                // console.log(element.parentElement)
                ;

    }}); 

    function overdue(index) {
        let index2 = element.id.split("_")[2];
        var d1 = new Date(((document.getElementById("task_dueDate_" + index2)).innerHTML));
        var d2 = new Date();

        if (d2 > d1) {
            return true;
        }
        else {
            return false;
        }
    }

        // try {
        //     if (element.checked === false && completed === true) {
        //         element.checked = true;
        //     }
        // }
        // catch (err) {
        //     element.parentElement.addAttribute(completed, false)
        // }
    };
    // for (let element of document.getElementsByClassName("task_checkbox")) {
    //     let d1 = new Date(element.parentElement.children[3].innerHTML)
    //     let d2 = new Date()
    //     if (element.checked === true) {
    //         element.parentElement.style.backgroundColor = "red"};
    //     if (d2>d1) {
    //         element.parentElement.style.backgroundColor = "red"};
    //     addEventListener("click", function () {
    //         if (element.checked === true) {
    //             console.log("checked", element.checked);
    //             if  (d1>d2) {
    //                 element.parentElement.style.backgroundColor = "red"}}
    //             else {element.parentElement.style.backgroundColor = "white"};
    //     });
    // };

});