function NumGame(randomNumber,max_guess) {
    // let randomNumber = Math.floor (Math.random() * 100);

    let guesses = 0;
    for (i = 0; i < max_guess; i++){
        let userGuess = prompt("What is your guess?");s 
        console.log("Your guess is " + userGuess);

        if (parseInt(userGuess) > randomNumber) {
            alert("Your guess is too high");
            guesses++;
        } else if (parseInt(userGuess) < randomNumber) {
            alert("Your guess is too low");
            guesses++;
        } else if (parseInt(userGuess) == randomNumber) {
            alert("You guessed correctly!");
            alert("It took you " + guesses + " guesses");
            if (confirm("Do you want to play again?")){
                if (confirm("Do you want more than one guess?")){

                    play();} else { playOne()
            } }else {
                alert("Thanks for playing!");
            }
        }
    }
    alert("You ran out of guesses!");
    if (confirm("Do you want to play again?")){
        if (confirm("Do you want more than one guess?")){

            play();} 
            else { playOne()
        }
     }else {
        alert("Thanks for playing!");
    }
};

function play() {
    NumGame(randomNum(),prompt("How many guesses do you want?"))
};

function playOne() {
    NumGame(randomNum(),0)
};

function randomNum() {
 let guess = (Math.floor(Math.random() * prompt("What is the max number?")))
    console.log(guess)
return guess};

