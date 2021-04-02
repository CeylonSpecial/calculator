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

var selected = {
    num1: '',
    num2: '',
    operator: '',
    solution: '',
    progress: 0,
    num1Cat(selection) {
        this.num1 += selection;
        this.progress = 1;
    },
    changeOperator(selection) {
        this.operator = selection;
        this.progress = 2;
    },
    num2Cat(selection) {
        this.num2 += selection;
        this.progress = 3;
    },
    roundSolution() {
        let places = 16;
        while (this.solution.length > 16) {
            this.solution = this.solution.toFixed(places);
            places--;
        }
        return this.solution;
    },
    clearSelections() {
        this.num1 = '';
        this.num2 = '';
        this.operator = '';
        this.progress = 0;
    },
    convertSelections() {
        this.num1 = parseFloat(this.num1);
        this.num2 = parseFloat(this.num2);
    },
    clearSolution() {
        this.solution = '';
    },
    clearEntry() {
        if (this.progress === 1) {
            this.num1 = this.num1.substring(0, this.num1.length - 1);
            if (this.num1.length === 0) {
                this.progress = 0;
            }
        }
        else if (this.progress === 2) {
            this.operator = ''
            this.progress = 1;
            }
        else if (this.progress === 3) {
            this.num2 = this.num2.substring(0, this.num2.length - 1);
            if (this.num2.length === 0) {
                this.progress = 2;
            }
        }
    },
}

function populateDisplay(newSelection) {

    const display = document.querySelector('#display');

    display.textContent += newSelection;
    return;
}

function clearDisplay() {
    const display = document.querySelector('#display');

    display.textContent = '';
    return;
}

function clearLastEntry() {
    const display = document.querySelector('#display');

    if (display.textContent !== '') {
        display.textContent = display.textContent.substring(0, display.textContent.length - 1);
        return;
    }
    return;    
}

function toggleClearButton() {
    const clearButton = document.querySelector('#button-clear');
    const display = document.querySelector('#display');

    if (display.textContent === '' || display.textContent === selected.solution.toString()) {
        clearButton.textContent = 'AC';
    }
    else {
        clearButton.textContent = 'CE';
    }
    return;
}

function parseSelection(newSelection) {
    
    const operators = ['+','-','x','/'];
    const numbers = ['.','0','1','2','3','4','5','6','7','8','9'];
    
    if (newSelection === 'AC') {
        clearDisplay();
        selected.clearSelections();
        selected.clearSolution();
        toggleClearButton();
        return;
    }
    else if (newSelection === 'CE') {
        selected.clearEntry();
        clearLastEntry();
        toggleClearButton();
        return;
    }
    else if (selected.solution === '') {
        if (numbers.includes(newSelection) && selected.operator === '') {
            if (newSelection === '.' && selected.num1.search(/\./) >= 0) {
                return;
            }
            selected.num1Cat(newSelection);
        }
        else if (operators.includes(newSelection) && selected.num1 !== '' && selected.operator === '') {
            selected.changeOperator(newSelection);
        }
        else if (numbers.includes(newSelection)) {
            if (newSelection === '.' && selected.num2.search(/\./) >= 0) {
                return;
            }
            selected.num2Cat(newSelection);
        }
        else if ((newSelection === '=' || operators.includes(newSelection)) && selected.num1 !== '' && selected.num2 !== '') {
            selected.convertSelections();
            selected.solution = operate(selected.num1, selected.num2, selected.operator);
            selected.clearSelections();
            if (operators.includes(newSelection)) {
                selected.changeOperator(newSelection);
                populateDisplay(newSelection);
            }
            else {
                clearDisplay();
                populateDisplay(selected.roundSolution());
                toggleClearButton();
            }
            return;
        }
        else {
            return;
        }
    }
    else {
        if (numbers.includes(newSelection) && selected.operator === '') {
            clearDisplay();
            selected.clearSolution();
            selected.num1Cat(newSelection);
        }
        else if (operators.includes(newSelection) && selected.operator === '') {
            selected.changeOperator(newSelection);
        }
        else if (numbers.includes(newSelection)) {
            if (newSelection === '.' && selected.num1.search(/\./) >= 0) {
                return;
            }
            selected.num1Cat(newSelection);
        }
        else if ((newSelection === '=' || operators.includes(newSelection)) && selected.num1 !== '' && selected.operator !== '') {
            selected.convertSelections();
            selected.solution = operate(selected.solution, selected.num1, selected.operator);
            selected.clearSelections();
            if (operators.includes(newSelection)) {
                selected.changeOperator(newSelection);
                populateDisplay(newSelection);
            }
            else {
                clearDisplay();
                populateDisplay(selected.roundSolution());
                toggleClearButton();
            }
            return;
        }
        else {
            return;
        }
    }
    populateDisplay(newSelection);
    toggleClearButton();
    return;
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => button.addEventListener('click', () => {
    parseSelection(button.textContent);
}))