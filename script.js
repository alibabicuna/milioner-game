'use strict'

fetch('fragen.json') 
.then(res => res.json())
.then(data => startGame(data));

function startGame(data) {
    let score = "";
    let scores = document.querySelectorAll('.scoreList div');
    let currentScoreNumber = 0;
    let limit = "";
    
    let answer = loadQuestion(data);

    document.querySelectorAll('.antwort').forEach(antwort => {
        antwort.addEventListener('click', checkAnswer);
    });

    function checkAnswer(event) {
        let clickedAnswer = event.srcElement.innerHTML.substr(0, 1);
        if (clickedAnswer == answer) {
            console.log('Ok');
            let currentScoreElement = scores[currentScoreNumber];
            if(currentScoreNumber !== 0){
                let previousElement = scores[currentScoreNumber - 1];
                if(!previousElement.classList.contains('limit'))
                previousElement.classList.remove('active');
            }
            
            currentScoreElement.classList.add('active');
            score = currentScoreElement.innerHTML
            
            if (currentScoreElement.classList.contains('limit')) {
                limit = score;
                currentScoreElement.classList.add('active');
                console.log('limit reached');
            }

            if (currentScoreElement.innerHTML == '1000000€') {
                alert("Congratulations!! You won 1.000.000€!");
                return;
            }

            currentScoreNumber++;
            answer = loadQuestion(data);
        } else {
            if (limit !== "") {
                alert("Score: " + limit);
            } else {
                alert('Game Over!');
            }
        }
    }

    function loadQuestion(data) {
        let combination = data[getRandomInt(data.length)];

        document.querySelector("#frage").innerHTML = combination['question'];
        document.querySelector("#antwortA").innerHTML = 'A) ' + combination['A'];
        document.querySelector("#antwortB").innerHTML = 'B) ' + combination['B'];
        document.querySelector("#antwortC").innerHTML = 'C) ' + combination['C'];
        document.querySelector("#antwortD").innerHTML = 'D) ' + combination['D'];
        
        let answer = combination['answer'];
        console.log(answer);

        return answer;
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

