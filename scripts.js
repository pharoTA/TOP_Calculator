const add = (a, b) => {
    return a + b
}
const substract = (a, b) => {
    return a - b
}
const multiply = (a, b) => {
    return a * b
}
const divide = (a, b) => {
    return a / b
}

const operate = (operator, firstNumber, secondNumber) => {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    console.log(firstNumber);
    if (operator == "+") {
        return add(firstNumber, secondNumber);
    } else if (operator == "-") {
        return substract(firstNumber, secondNumber);
    } else if (operator == "*") {
        return multiply(firstNumber, secondNumber);
    } else if (operator == "/") {
        return divide(firstNumber, secondNumber);
    }
    return "Unknown operator";
};

let numberList = [];
let operatorList = [];
let lastNumber = "1";

const addToDisplay = (textToAdd) => {
    const displaySectionText = document.querySelector(".displaySectionText");
    const currentText = displaySectionText.textContent;
    const newTextToDisplay = currentText + textToAdd;
    displaySectionText.textContent = newTextToDisplay;
    return newTextToDisplay
};

const eraseDisplay = () => {
    const displaySectionText = document.querySelector(".displaySectionText");
    displaySectionText.textContent = ""
};

eraseButton = document.querySelector(".eraseButton");
eraseButton.addEventListener("click", () => eraseDisplay());

touchButtons = document.querySelectorAll(".numberTouch, .operatorTouch");

touchButtons.forEach((touchButton) => {
    touchButton.addEventListener("click", () => {
        if (touchButton.querySelector(".touchText").textContent != "=") {
            if (touchButton.className == "numberTouch") {
                if (lastNumber == "result") {
                    numberList = [];
                    operatorList = [];
                    numberList.push(touchButton.querySelector(".touchText").textContent);
                    eraseDisplay();
                    addToDisplay(touchButton.querySelector(".touchText").textContent);
                    lastNumber = touchButton.querySelector(".touchText").textContent;
                }
                else if ((lastNumber != "+" && lastNumber != "*" && lastNumber != "/" && lastNumber != "-") && numberList.length > 0) {
                    numberList[numberList.length - 1] = numberList[numberList.length - 1] + touchButton.querySelector(".touchText").textContent;
                    addToDisplay(touchButton.querySelector(".touchText").textContent);
                    lastNumber = touchButton.querySelector(".touchText").textContent;
                } else {
                    numberList.push(touchButton.querySelector(".touchText").textContent);
                    eraseDisplay();
                    addToDisplay(touchButton.querySelector(".touchText").textContent);
                    lastNumber = touchButton.querySelector(".touchText").textContent;
                }
            } else if (touchButton.className == "operatorTouch") {
                eraseDisplay();
                addToDisplay(touchButton.querySelector(".touchText").textContent);
                operatorList.push(touchButton.querySelector(".touchText").textContent);
                lastNumber = touchButton.querySelector(".touchText").textContent
            }
            console.log(operatorList, numberList);
        }
    });
});

const operateTouch = document.querySelector("#operateTouch");
operateTouch.addEventListener("click", () => {
    result = operate(operatorList[0], numberList[0], numberList[1]);
    eraseDisplay();
    addToDisplay(result);
    numberList = numberList.slice(2);
    operatorList = operatorList.slice(1);
    numberList.unshift(result);
    lastNumber = "result";
    console.log(numberList);
    console.log(operatorList);
});