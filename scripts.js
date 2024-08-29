let numberList = [];
let operatorList = [];
let lastNumber = "result";

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
    if (operator == "+") {
        return add(firstNumber, secondNumber);
    } else if (operator == "-") {
        return substract(firstNumber, secondNumber);
    } else if (operator == "*") {
        return multiply(firstNumber, secondNumber);
    } else if (operator == "/") {
        if (secondNumber == 0) {
            return NaN
        } else {
            return divide(firstNumber, secondNumber);
        }
    }
    return "Unknown operator";
};



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

const clearLastValue = () => {
    if (lastNumber == "+" || lastNumber == "*" || lastNumber == "/" || lastNumber == "-") {
        eraseDisplay();
        operatorList.pop()
        addToDisplay(numberList[numberList.length - 1]);
        lastNumber = numberList[numberList.length - 1].slice(length - 1);
    } else {
        let tempNumber = String(numberList.pop());
        newNumber = tempNumber.split('').slice(0, tempNumber.length - 1).join();
        lastNumber = newNumber.slice(length - 1);
        numberList.push(newNumber + lastNumber);
        eraseDisplay();
        addToDisplay(newNumber);
    }
};

const isDecimal = (numberToCheck) => {
    return numberToCheck.split('').includes(".")
};

const addFloatingPoint = () => {
    if (lastNumber == "+" || lastNumber == "*" || lastNumber == "/" || lastNumber == "-" || lastNumber == "result") {
        numberList.push("0.");
        lastNumber = ".";
        eraseDisplay();
        addToDisplay("0.");
    } else {
        if (isDecimal(numberList[numberList.length - 1])) {
            eraseDisplay();
            addToDisplay("lmao");
            lastNumber = "result";
        } else {
            numberList[numberList.length - 1] = numberList[numberList.length - 1] + ".";
            addToDisplay(".");
        }
    }
};

eraseButton = document.querySelector(".eraseButton");
eraseButton.addEventListener("click", () => eraseDisplay());

backspaceButton = document.querySelector(".backspaceButton");
backspaceButton.addEventListener("click", () => clearLastValue())

touchButtons = document.querySelectorAll(".numberTouch, .operatorTouch");

touchButtons.forEach((touchButton) => {
    touchButton.addEventListener("click", () => {
        if (touchButton.querySelector(".touchText").textContent != "=" && touchButton.querySelector(".touchText").textContent != ".") {
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
        }
    });
});

const operateTouch = document.querySelector("#operateTouch");
operateTouch.addEventListener("click", () => {
    if (numberList.length < 2 && operatorList.length < 1) {
        window.alert("Error, please enter an operation before pressing =")
    } else {
        result = operate(operatorList[0], numberList[0], numberList[1]);
        if (isNaN(result)) {
            eraseDisplay();
            addToDisplay("lmao");
            lastNumber = "result";
        } else {
            roundedResult = Math.round(result * 100000) / 100000;
            eraseDisplay();
            addToDisplay(roundedResult);
            numberList = numberList.slice(2);
            operatorList = operatorList.slice(1);
            numberList.unshift(roundedResult);
            lastNumber = "result";
        }
    }
});

floatingPointTouch = document.querySelector("#floatingPointTouch");
floatingPointTouch.addEventListener("click", () => {
    addFloatingPoint();
});