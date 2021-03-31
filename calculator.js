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