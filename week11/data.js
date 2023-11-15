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

const showModal=() => document.getElementById("modal_form").style.display = "block";
const hideModal=() => document.getElementById("modal_form").style.display = "none";

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("closeModal").addEventListener("click", function() {
        hideModal();
        });
    
     
    document.getElementById("modal_form").addEventListener("click", (event) =>{
        if (event.target.id === document.getElementById("modal_form")) {
            hideModal();
        }});
    
    document.getElementById("save_task").addEventListener("click", event => {
        hideModal();
        });
    
    
    for (let element of document.getElementsByClassName("edit_task"))   
    {
        element.addEventListener("click", function() {
            showModal();
        });
    
    // const makeElement = (tag, text) => {
    //     const element = document.createElement(tag);
    //     element.textContent = text;
    //     return element;
    // }    

    // const title = () => makeElement("Label", task.title);
    // const description = () => makeElement("Label", task.description);
    
    const makeLI = document.createElement("li");
    const makeInput = document.createElement("input");
    const makeLabel = document.createElement("label");
    const makeButton = document.createElement("button");
    const makeButton2 = document.createElement("button");
    const inputText = (text) => document.createTextNode(text);



    document.getElementById("create").addEventListener("click", function() {
        showModal();
        })
        
    
}});
