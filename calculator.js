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
    
    return nums.reduce((total, num) => {
        return total / num;
    });
}

function operate(num1, num2, operator) {

    const operators = ['+','-','*','x','/'];

    while (!operators.includes(operator)) {
        operator = prompt('Sorry, that\'s not a valid operator. Please choose +, -, *, /');
    }
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

var selected = {
    all: '',
    num1: 0,
    num2: 0,
    operator: '',
    clearSelections() {
        this.all = '';
        this.num1 = 0;
        this.num2 = 0;
        this.operator = '';
    },
    parseSelections() {
        this.num1 = 1;
    }
};

function calcDisplay(selection) {

    const operators = ['+','-','*','x','/'];
    const numbers = ['1','2','3','4','5','6','7','8','9']
    const display = document.querySelector('#display');

    if (operators.includes(selection) || numbers.includes(selection)) {
        display.textContent += selection;
        selected.all += selection;
        console.log(selected.all);
    }
    else if (selection === 'Clear') {
        display.textContent = '';
        selected.clearSelections();
    }
    else {

    }
    return;
}

const buttons = document.querySelectorAll('button');

buttons.forEach(button => button.addEventListener('click', () => {
    calcDisplay(button.textContent);
}))