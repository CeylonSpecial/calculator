var calcMem = {
    num1: '',
    num2: '',
    operator: '',
    solution: '',
    clearSelections() {
        this.num1 = '';
        this.num2 = '';
        this.operator = '';
    },
    clearEntry() {
        if (this.num2 !== '') {
            this.num2 = this.num2.substring(0, this.num2.length - 1);
        } else if (this.operator !== '') {
            this.operator = '';
        } else if (this.num1 !== '') {
            this.num1 = this.num1.substring(0, this.num1.length - 1);
        }
    },
    readyToOperate() {
        return this.num1 !== '' && this.num1 !== '-' && this.num2 !== '' && this.num2 !== '-' && this.operator !== '';
    },
    roundSolution() {
        if (this.solution.toString().length > 14) {
            this.solution = parseFloat(this.solution).toPrecision(10);
        }
        return this.solution;
    },
    operatorWasLast() {
        if (this.num2 === '') {
            return this.operator !== '';
        }
    },
}

function add(num1, num2) {
    return parseFloat(num1) + parseFloat(num2);
}

function subtract(num1, num2) {
    return parseFloat(num1) - parseFloat(num2);
}

function multiply(num1, num2) {
    return parseFloat(num1) * parseFloat(num2);
}

function divide(num1, num2) {
    if (parseFloat(num2) === 0) {
        return "Lol, nice try.";
    }
    return parseFloat(num1) / parseFloat(num2);
}

function operate(num1, num2, operator) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

function toggleClearButton() {
    const clearButton = document.querySelector('#button-clear');

    clearButton.textContent = whichClear();
}

function changeButtonColor(selection) {
    let button = '';
    
    switch (selection) {
        case '+':
            button = document.querySelector('#button-plus');
            break;
        case '-':
            button = document.querySelector('#button-minus');
            break;
        case 'x':
            button = document.querySelector('#button-multiply');
            break;
        case '/':
            button = document.querySelector('#button-divide');
            break;
    }
    if (button !== '') {
        button.setAttribute('style', 'filter: brightness(120%)');
    }
}

function resetButtonColor() {
    let button = '';
    
    switch (calcMem.operator) {
        case '+':
            button = document.querySelector('#button-plus');
            break;
        case '-':
            button = document.querySelector('#button-minus');
            break;
        case 'x':
            button = document.querySelector('#button-multiply');
            break;
        case '/':
            button = document.querySelector('#button-divide');
            break;
    }
    if (button !== '') {
        button.removeAttribute('style', 'filter: brightness(120%)');
    }
}

function populateDisplay(newSelection) {
    const display = document.querySelector('#display');
    
    display.textContent += newSelection;
}

function clearDisplay() {
    const display = document.querySelector('#display');
    
    display.textContent = '';
    toggleClearButton();
}

function clearLastEntry() {
    const display = document.querySelector('#display');

    if (display.textContent !== '') {
        display.textContent = display.textContent.substring(0, display.textContent.length - 1);
    }
    toggleClearButton(); 
}

function whichClear() {
    if (calcMem.operator !== '') {
        return 'CE'
    } else {
        return 'AC';
    }
}

function parseEquals() {
    if (calcMem.readyToOperate()) {
        calcMem.solution = operate(calcMem.num1, calcMem.num2, calcMem.operator);
        resetButtonColor();
        calcMem.clearSelections();
        calcMem.num1 += calcMem.solution;
        clearDisplay();
        populateDisplay(calcMem.roundSolution());
    }
}

function storeOperator(newSelection) {
    if (newSelection === '-' && calcMem.num1 === '') {
        calcMem.num1 += newSelection;
        populateDisplay(newSelection);
    } else if (newSelection === '-' && calcMem.operator !== '' && calcMem.num2 === '') {
        calcMem.num2 += newSelection;
        clearDisplay();
        populateDisplay(newSelection);
    } else if (calcMem.num1 !== '' && calcMem.num1 !== '-' && calcMem.operator === '') {
        calcMem.operator = newSelection;
        changeButtonColor(newSelection);
    } else if (calcMem.readyToOperate()) {
        calcMem.solution = operate(calcMem.num1, calcMem.num2, calcMem.operator);
        resetButtonColor();
        calcMem.clearSelections();
        calcMem.num1 += calcMem.solution;
        calcMem.operator = newSelection;
        clearDisplay();
        populateDisplay(calcMem.roundSolution());
        changeButtonColor(newSelection);
    }
}

function storeNumber(newSelection) {
    if (calcMem.solution === '') {
        if (calcMem.operator === '') {
            if (newSelection === '.' && calcMem.num1.search(/\./) >= 0) {
                return;
            }
            calcMem.num1 += newSelection;
        } else {
            if (newSelection === '.' && calcMem.num2.search(/\./) >= 0) {
                return;
            }
            if (calcMem.num2 === '') {
                clearDisplay();
            }
            calcMem.num2 += newSelection;
        }
    } else {
        if (calcMem.operator === '') {
            clearDisplay();
            calcMem.clearSelections();
            calcMem.solution = '';
            calcMem.num1 += newSelection;
        } else {
            if (newSelection === '.' && calcMem.num2.search(/\./) >= 0) {
                return;
            }
            if (calcMem.num2 === '') {
                clearDisplay();
            }
            calcMem.num2 += newSelection;
        }
    }
    populateDisplay(newSelection);
}

function parseClearButton(newSelection) {
    if (newSelection === 'AC') {
        clearDisplay();
        resetButtonColor();
        calcMem.clearSelections();
        calcMem.solution = '';
    } else {
        if (calcMem.operatorWasLast()) {
            resetButtonColor();
        }
        else {
            clearLastEntry();
        }
        calcMem.clearEntry();
    }
    toggleClearButton();
}

function parseSelection(newSelection) {
    const operators = ['+','-','x','/'];
    const numbers = ['.','0','1','2','3','4','5','6','7','8','9'];
    const clearButtons = ['AC','CE'];
    
    if (clearButtons.includes(newSelection) || newSelection === 'Backspace') {
        parseClearButton(whichClear());
    } else if (numbers.includes(newSelection)) {
        storeNumber(newSelection);
    } else if (operators.includes(newSelection)) {
        storeOperator(newSelection);
    } else if (newSelection === '=' || newSelection === 'Enter') {
        parseEquals(newSelection);
    }
    toggleClearButton();
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => button.addEventListener('click', () => {
    parseSelection(button.textContent);
}));

document.addEventListener('keydown', function(e){
    const key = document.querySelector(`button[key="${e.key}"]`);
    
    if (key) {
        key.classList.add('pressed');
        document.addEventListener('keyup', function (){
            key.classList.remove('pressed');
        });
    }
    parseSelection(e.key);
});