// added DOMContentLoaded event listener to check when the element is loaded



document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("myLink").addEventListener("click",(event)=>{
        location.href = "https://www.bcit.ca"
    });
// added a for loop to loop through all the elements with class name alert and added an event listener to each element
    for (let element of document.getElementsByClassName("alert"))
        element.addEventListener("click", function (event) {
            event.target.style.display = "none"
        })

    const total = 10;

    for (index = 0; index < total; index++) {
        let elem = document.createElement("p")
        elem.textContent = index + 1
        elem.addEventListener("click", function (event) { 
            alert(`You clicked box ${elem.textContent}`) 
            // fixed the string to use the other quotes to make hte ${index} work
        })
        document.getElementById("output").prepend(elem) 
        // prepend to match the element order
    }
});