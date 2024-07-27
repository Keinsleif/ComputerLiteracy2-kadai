document.addEventListener('DOMContentLoaded', ()=> {
    const numberList = [];
    const numberHistory = document.querySelector("#number_history");

    document.querySelector("#pick_number").addEventListener("click", (e)=>{
        const button = e.target;
        if (button.dataset.func == "pick") {
            let pickedNumber;
            do {
                pickedNumber = Math.floor(Math.random() * 75) + 1;
            } while (numberList.includes(pickedNumber));
            document.querySelector("#picked_number").innerHTML = pickedNumber.toString();
            numberList.push(pickedNumber);
            const element = document.createElement("div");
            element.innerHTML = `<span>${pickedNumber}</span>`;
            numberHistory.prepend(element);
            if (numberList.length == 75) {
                button.dataset.func = "reset";
                button.innerHTML = "Reset the Picks"
            }
        } else if (button.dataset.func == "reset") {
            numberList.splice(0)
            while( numberHistory.firstChild ){
                numberHistory.removeChild( numberHistory.firstChild );
            }
            button.dataset.func = "pick";
            button.innerHTML = "Pick a Number"
    }
    });
});