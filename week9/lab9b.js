let myBox = document.getElementById("box"); 
myBox.classList.add("green") 
myBox.classList.remove("red") 
myBox.innerHTML = "<p>Contents</p>" 
myBox.textContent = "Hello world!"

document.addEventListener("DOMContentLoaded", function() {
    function changeColor() {
        if (myBox.classList.contains("green")) {
            console.log("green");
            myBox.classList.remove("green");
            myBox.classList.add("red");
        } 
        else if (myBox.classList.contains("red")) { 
            console.log("red");
            myBox.classList.remove("red");
            myBox.classList.add("green");
        }
    }
    document.getElementById("box").addEventListener("click", changeColor);
});
