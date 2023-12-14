document.getElementById("myLink").addEventListener("click", () => location.href = "https://www.bcit.ca");

document.getElementsByClassName("alert").addEventListener("click", function (event) {
    event.target.style.display = "none"
})

const total = 10;

for (index = 0; index < total; index++) {
    const elem = document.createElement("p");
    elem.textContent = index
    elem.addEventListener("click", function (event) { alert("You clicked box ${index}") })
    document.getElementById("output").appendChild(elem)
}
