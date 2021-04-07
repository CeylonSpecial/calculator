function add(...nums) {
    
    return nums.reduce((total, num) => {
        return total + num;
    });
}

function subtract(...nums) {

    return nums.reduce((total, num) => {
        return total - num;
    });
}

function multiply(...nums) {

    return nums.reduce((total, num) => {
        return total * num;
    });
}

function divide(...nums) {
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] === 0) {
            return "Lol, nice try.";
        };
    }

    return nums.reduce((total, num) => {
        return total / num;
    });
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

function populateDisplay(newSelection) {

    const display = document.querySelector('#display');

    display.textContent += newSelection;
    return;
}

function clearDisplay() {
    const display = document.querySelector('#display');

    display.textContent = '';
    toggleClearButton();
    return;
}

function clearLastEntry() {
    const display = document.querySelector('#display');

    if (display.textContent !== '') {
        display.textContent = display.textContent.substring(0, display.textContent.length - 1);
        return;
    }
    toggleClearButton();
    return;    
}

function toggleClearButton() {
    const clearButton = document.querySelector('#button-clear');
    const display = document.querySelector('#display');

    if (display.textContent === '' || (display.textContent === selected.solution.toString() && !selected.getLastOp())) {
        clearButton.textContent = 'AC';
    }
    else {
        clearButton.textContent = 'CE';
    }
    return;
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
    button.setAttribute('style', 'filter: brightness(120%)');
    return;
}

function resetButtonColor() {

    let button = '';
    
    switch (selected.operator) {
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
    return;
}

function parseClearButton(newSelection) {
    
    if (newSelection === 'AC') {
        clearDisplay();
        resetButtonColor();
        selected.clearSelections();
        selected.clearSolution();
    }
    else {
        if (selected.getLastOp()) {
            resetButtonColor();
        }
        else {
            clearLastEntry();
        }
        selected.clearEntry();
    }
    toggleClearButton();
    return;
}

function storeNumber(newSelection) {

    if (selected.solution === '') {
        if (selected.operator === '') {
            if (newSelection === '.' && selected.num1.search(/\./) >= 0) {
                return;
            }
            selected.num1Cat(newSelection);
        }
        else {
            if (newSelection === '.' && selected.num2.search(/\./) >= 0) {
                return;
            }
            if (selected.num2 === '') {
                clearDisplay();
            }
            selected.num2Cat(newSelection);
        }
    }
    else {
        if (selected.operator === '') {
            clearDisplay();
            selected.clearSelections();
            selected.clearSolution();
            selected.num1Cat(newSelection);
        }
        else {
            if (newSelection === '.' && selected.num2.search(/\./) >= 0) {
                return;
            }
            if (selected.num2 === '') {
                clearDisplay();
            }
            selected.num2Cat(newSelection);
        }
    }
    populateDisplay(newSelection);
    return;
}

function storeOperator(newSelection) {
    if (newSelection === '-' && selected.num1 === '') {
        selected.num1Cat(newSelection);
        populateDisplay(newSelection);
    }
    else if (newSelection === '-' && selected.operator !== '' && selected.num2 === '') {
        selected.num2Cat(newSelection);
        clearDisplay();
        populateDisplay(newSelection);
    }
    else if (selected.num1 !== '' && selected.operator === '') {
        selected.changeOperator(newSelection);
        changeButtonColor(newSelection);
    }
    else if (selected.isReady()) {
        selected.convertSelections();
        selected.solution = operate(selected.num1, selected.num2, selected.operator);
        resetButtonColor();
        selected.clearSelections();
        selected.num1Cat(selected.solution);
        selected.changeOperator(newSelection);
        clearDisplay();
        populateDisplay(selected.roundSolution());
        changeButtonColor(newSelection);
    }
    return;
}

function parseEquals() {
    if (selected.isReady()) {
        selected.convertSelections();
        selected.solution = operate(selected.num1, selected.num2, selected.operator);
        resetButtonColor();
        selected.clearSelections();
        selected.num1Cat(selected.solution);
        clearDisplay();
        populateDisplay(selected.roundSolution());
    }
    return;
}

function parseSelection(newSelection) {
    
    const operators = ['+','-','x','/'];
    const numbers = ['.','0','1','2','3','4','5','6','7','8','9'];
    const clearButtons = ['AC','CE'];
    
    if (clearButtons.includes(newSelection)) {
        parseClearButton(newSelection);
    }
    else if (numbers.includes(newSelection)) {
        storeNumber(newSelection);
    }
    else if (operators.includes(newSelection)) {
        storeOperator(newSelection);
    }
    else if (newSelection === '=') {
        parseEquals(newSelection);
    }
    toggleClearButton();
    return;
}

var selected = {
    num1: '',
    num2: '',
    operator: '',
    solution: '',
    num1Cat(selection) {
        this.num1 += selection;
    },
    changeOperator(selection) {
        this.operator = selection;
    },
    num2Cat(selection) {
        this.num2 += selection;
    },
    clearSelections() {
        this.num1 = '';
        this.num2 = '';
        this.operator = '';
    },
    convertSelections() {
        this.num1 = parseFloat(this.num1);
        this.num2 = parseFloat(this.num2);
    },
    clearSolution() {
        this.solution = '';
    },
    clearEntry() {
        if (this.num2 != '') {
            this.num2 = this.num2.substring(0, this.num2.length - 1);
        }
        else if (this.operator != '') {
            this.operator = '';
        }  
        else if (this.num1 != '') {
            this.num1 = this.num1.substring(0, this.num1.length - 1);
        }
    },
    isReady() {
        return this.num1 !== '' && this.num2 !== '' && this.operator !== '';
    },
    roundSolution() {
        if (this.solution.toString().length > 14) {
            this.solution = parseFloat(this.solution).toPrecision(10);
        }
        return this.solution;
    },
    getLastOp() {
        if (this.num2 != '') {
            return;
        }
        else if (this.operator != '') {
            return this.operator;
        }  
        else if (this.num1 != '') {
            return;
        }
    }
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => button.addEventListener('click', () => {
    parseSelection(button.textContent);
}))