document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submit").addEventListener("submit", function (event) {
        event.preventDefault();
    })
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("generate").addEventListener("click", function () {
        let maximum = document.getElementById("Maximum").value;
        let randomNumber = Math.floor(Math.random() * maximum);
        document.getElementById("answer").textContent = randomNumber;
        console.log(randomNumber);
    }
    );
});

function randomNum(idElement = "Maximum") {
    let maximum = document.getElementById("Maximum").value;
    let randomNumber = Math.floor(Math.random() * maximum);
    document.getElementById("answer").textContent = randomNumber;
    return randomNumber;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("Maximum").addEventListener("change", function () {
        document.getElementById("Maximum").setAttribute("disabled", true);
    })
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("Minimum").addEventListener("change", function () {
        let minGuesses = document.getElementById("Minimum").value;
        console.log(minGuesses);
        document.getElementById("Minimum").setAttribute("disabled", true);

    });
});

function minGuesses(idElement = "Minimum") {
    let minGuesses = document.getElementById(idElement).value;
    console.log(minGuesses);
    return minGuesses;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("yourGuess").addEventListener("change", function () {
        let yourGuess = document.getElementById("yourGuess").value;
        let randomNum = randomNum();
        let guesses = 0;
        if (guesses === minGuesses() || guesses > minGuesses())
            document.getElementById("guesses").textContent = "You ran out of guesses!";

        if (yourGuess === randomNum)
            document.getElementById("answer").textContent = "You guessed correctly!";
        else if (yourGuess > randomNum) {
            document.getElementById("answer").textContent = "Your guess is too high!";
            guesses++;
        }
        else if (yourGuess < randomNum) {
            document.getElementById("answer").textContent = "Your guess is too low!";
            guesses++;
        }

    });
});
