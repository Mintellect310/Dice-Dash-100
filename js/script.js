document.addEventListener("DOMContentLoaded", () => {
    let turn = 0;
    const dice = document.getElementById("dice-throw");
    const p1Score = document.getElementById("player-1").getElementsByClassName("score")[0];
    const p2Score = document.getElementById("player-2").getElementsByClassName("score")[0];
    const scores = [p1Score, p2Score];

    const result = document.getElementById("result");
    const logContainer = document.getElementsByClassName("log-container")[0];
    const log = document.getElementById("log");

    const winningScore = 20;
    const curPlayer = () => turn%2;

    scores[turn].style.fontWeight = "bold";

    const roll = () => {
        const diceRoll = Math.floor(Math.random()*6) + 1;
        dice.innerHTML = String(diceRoll);

        logContainer.style.display = "block";
        log.innerHTML = `${turn+1}: Player ${curPlayer()+1} rolled ${dice.innerHTML}<br/>`+log.innerHTML;

        const currentPlayerScoreElement = scores[curPlayer()];
        const currentPlayerScore = Number(currentPlayerScoreElement.innerHTML)+diceRoll;

        currentPlayerScoreElement.innerHTML = String(currentPlayerScore);
        scores[curPlayer()].style.fontWeight = "normal";
        scores[(curPlayer()+1)%2].style.fontWeight = "bold";

        if(currentPlayerScore >= winningScore) {
            result.innerHTML = `Player ${curPlayer()+1} wins!`;
            log.innerHTML = `Player ${curPlayer()+1} wins!<br/>`+log.innerHTML;
            rollBtn.removeEventListener("click", roll);

            scores[curPlayer()].style.color = "green";
            scores[curPlayer()].style.fontWeight = "bold";
        }

        turn++;
    }
    const rollBtn = document.getElementById("roll");
    rollBtn.addEventListener("click", roll);

    const reset = () => {
        turn = 0;
        dice.innerHTML = "0";
        for(let score of scores) {
            score.innerHTML = "0";
            score.style.fontWeight = "normal";
            score.style.color = null;
        }
        scores[0].style.fontWeight = "bold";
        result.innerHTML = "";
        log.innerHTML = "";
        logContainer.style.display = "none";
        rollBtn.addEventListener("click", roll);
    }
    const newGameBtn = document.getElementById("new-game");
    newGameBtn.addEventListener("click", reset);
});
