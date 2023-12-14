/*

----------
QUESTION 1
----------

We want to move the <script> tag that loads this file to the <head> of the HTML document.
Would you expect your code to work the same way?
- If yes, explain why and how the change will not affect your code.
- If not, explain what changes you would make to keep it working.

YOUR ANSWER:
------------
it will not work because the script is loaded before the html is loaded so it will not find the elements in the html

----------
QUESTION 2
----------

What is one of the most important things you need to do when handling the click on the "Show result" button?
How did you do it, and how can you tell it works?


YOUR ANSWER:
------------

Making sure that the form doesnt clear when you hit the submit button. Using the  event.preventDefault(); built in function.
it works because the inputs dont clear after hitting the submit button.



--------------------------------------------------
WRITE YOUR CODE BELOW AND OUTSIDE OF THIS COMMENT.
--------------------------------------------------

*/


function checkedPlus() {
    if (document.getElementById("plus").checked) {
        
        return true;
    } else { return false }
}

function checkedMinus() {
    if (document.getElementById("minus").checked) {
        
        return true;
    } else { return false }
}

function checkedTimes() {
    if (document.getElementById("times").checked) {
    
        return true;
    } else { return false }
}

function checkedDivide() {
    if (document.getElementById("dividedBy").checked) {
        
        return true;
    } else { return false }
}

function count(x) {
    return x++;

}

document.addEventListener("DOMContentLoaded", function () {
    let x = 0
    let y = 0
    document.getElementById("btn_submit").addEventListener("click", (event) => {
        x++
        event.preventDefault();
        let num1 = parseInt(document.getElementById("num1").value);
        let num2 = parseInt(document.getElementById("num2").value);
        let result = 0;
        if (checkedPlus()) {
            result1 = (num1) + (num2);
            if (isNaN(result1)) {
                y++
                result = "Invalid input"
            } else {
                result = num1 + " plus " + num2 + " equals " + result1
            }
        } else if (checkedMinus()) {
            result1 = (num1) - (num2);
            if (isNaN(result1)) {
                y++
                result = "Invalid input"
            } else {
                result = num1 + " minus " + num2 + " equals " + result1
            }
        } else if (checkedTimes()) {
            result1 = (num1) * (num2);
            if (isNaN(result1)) {
                y++
                result = "Invalid input"
            } else {
                result = num1 + " times " + " " + num2 + " equals " + result1
            }
        } else if (checkedDivide()) {
            result1 = (num1) / (num2);
            if (isNaN(result1)) {
                y++
                result = "Invalid input"
            } else {
                result = num1 + " divided by " + num2 + " equals " + result1
            }
        } else {
            y++
            result = "No operation selected"
        }
        document.getElementById("counter").innerHTML = "You used the calculator " + x + " times. " + y + " operations were invalid or did not return a numeric value."
        let newMath = document.createElement("p")
        newMath.innerHTML = result
        if (result == "Invalid input" || result == "No operation selected") {
            newMath.style.border = "red solid"
        } else if (Math.sign(result1) === -1) {
            newMath.style.border = "red solid"
        } else if (Math.sign(result1) === 1 || Math.sign(result1) === 0) {
            newMath.style.border = "green solid"
        }
        console.log(newMath)
        document.getElementById("results").prepend(newMath)

    });
});