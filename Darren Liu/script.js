let x = 0;
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("live_counter").textContent = "x";

    document.getElementById("add_one_button").addEventListener("click", function() {
        let counter = document.getElementById("counter").textContent;
        counter = parseInt(counter);
        counter += 1;
        document.getElementById("counter").textContent = counter;
        writeFile('counter.txt', counter, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        });
    });
});