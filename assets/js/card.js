document.addEventListener('DOMContentLoaded', ()=> {
    const bingoStatusNum = document.querySelector("span#bingo_num");
    const reachStatusNum = document.querySelector("span#reach_num");
    let cardMatrix = [];
    let cardStatus = initCardsStatus();
    const cardContainer = document.querySelector("#cards");
    document.querySelector("button#renew").addEventListener("click",()=> {
        initCards();
    });

    function initCards() {
        cardMatrix = [];
        cardStatus = initCardsStatus();
        const appearedNumbers = [];
        for (let i=0; i< 5; i++) {
            let cardRow = []
            for (let j=0; j<5; j++) {
                if (i==2 && j==2) {
                    cardRow.push(0)
                    continue;
                }
                let genNum;
                do {
                    genNum = Math.floor(Math.random() * 15) + 1 + (j*15);
                } while (appearedNumbers.includes(genNum));
                cardRow.push(genNum)
                appearedNumbers.push(genNum)
            }
            cardMatrix.push(cardRow)
        }

        for (let row of cardContainer.children) {
            if (!row.dataset.row) {
                continue;
            }
            for (let card of row.children) {
                if (cardMatrix[parseInt(row.dataset.row)][parseInt(card.dataset.column)] == 0) {
                    continue;
                }
                card.addEventListener("click", onCardClicked);
                card.innerHTML = cardMatrix[parseInt(row.dataset.row)][parseInt(card.dataset.column)].toString();
                card.dataset.bingo="false";
                card.disabled = false;
                bingoStatusNum.innerText="0";
                reachStatusNum.innerText="0";
            }
        }
    }

    function onCardClicked(e) {
        const rowNum = parseInt(e.target.parentNode.dataset.row);
        const columnNum = parseInt(e.target.dataset.column);
        e.target.disabled = true;
        e.target.removeEventListener("click",onCardClicked);
        cardStatus[rowNum][columnNum] = true;
        let bingo = parseInt(bingoStatusNum.innerText), reach = parseInt(reachStatusNum.innerText);
        let trueCount = 0;
        for (let i=0;i<5;i++) {
            if (cardStatus[rowNum][i]) {
                trueCount++
            }
        }
        console.log(trueCount);
        if (trueCount == 4) {
            reach++;
        } else if (trueCount == 5) {
            reach--;
            bingo++;
            document.querySelectorAll(`div.card_row[data-row="${rowNum}"] > button`).forEach((c)=>{c.dataset.bingo = "true"});
        }
        trueCount = 0;
        for (let i=0;i<5;i++) {
            if (cardStatus[i][columnNum]) {
                trueCount++
            }
        }
        if (trueCount == 4) {
            reach++;
        } else if (trueCount == 5) {
            reach--;
            bingo++;
            document.querySelectorAll(`div.card_row > button[data-column="${columnNum}"]`).forEach((c)=>{c.dataset.bingo = "true"});
        }
        if (rowNum == columnNum) {
            trueCount = 0;
            for (let i=0;i<5;i++) {
                if (cardStatus[i][i]) {
                    trueCount++
                }
            }
            if (trueCount == 4) {
                reach++;
            } else if (trueCount == 5) {
                reach--;
                bingo++;
                for (let i=0;i<5;i++) {
                    document.querySelector(`div.card_row[data-row="${i}"] > button[data-column="${i}"]`).dataset.bingo = "true";
                }
            }
        } else if (rowNum + columnNum == 4) {
            trueCount = 0;
            for (let i=0;i<5;i++) {
                if (cardStatus[i][4-i]) {
                    trueCount++
                }
            }
            if (trueCount == 4) {
                reach++;
            } else if (trueCount == 5) {
                reach--;
                bingo++;
                for (let i=0;i<5;i++) {
                    document.querySelector(`div.card_row[data-row="${i}"] > button[data-column="${4-i}"]`).dataset.bingo = "true";
                }
            }
        }
        bingoStatusNum.innerText = bingo.toString();
        reachStatusNum.innerText = reach.toString();
    }
});

function initCardsStatus() {
    return [...Array(5)].map((_, i)=> [...Array(5)].map((_, j)=>{
        if (i==2 && j==2) {
            return true;
        }
        return false;
    }))
}