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

    document.querySelector('#payout').addEventListener('click', payout);

    function checkAnswer(event) {
        let clickedAnswer = event.srcElement.id.substr(7,7);
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
                scores.forEach(element => element.classList.remove('active'));
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
                resetScores();
            } else {
                alert('Game Over!');
                resetScores();
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

    function payout() {
        if (score !== "") {
            alert("Score: " + score);
            resetScores();
        } else {
            alert('Game Over!');
            resetScores();
        }
    }

    function resetScores() {
        limit = "";
        score = "";
        currentScoreNumber = 0;
        scores.forEach(el => el.classList.remove('active'));
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

