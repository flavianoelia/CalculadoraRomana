document.addEventListener('DOMContentLoaded', function() {
    let calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
    };

    function inputDigit(digit) {
        let displayValue = calculator.displayValue;
        let waitingForSecondOperand = calculator.waitingForSecondOperand;

        if (waitingForSecondOperand === true) {
            calculator.displayValue = digit;
            calculator.waitingForSecondOperand = false;
        } else {
            calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
        }
    }

    function inputDecimal(dot) {
        if (calculator.waitingForSecondOperand === true) return;

        if (calculator.displayValue.indexOf(dot) === -1) {
            calculator.displayValue += dot;
        }
    }

    function handleOperator(nextOperator) {
        let firstOperand = calculator.firstOperand;
        let displayValue = calculator.displayValue;
        let operator = calculator.operator;
        let inputValue = parseFloat(displayValue);

        if (operator && calculator.waitingForSecondOperand) {
            calculator.operator = nextOperator;
            return;
        }

        if (firstOperand == null && !isNaN(inputValue)) {
            calculator.firstOperand = inputValue;
        } else if (operator) {
            let result = calculate(firstOperand, inputValue, operator);

            calculator.displayValue = String(parseFloat(result.toFixed(7)));
            calculator.firstOperand = result;
        }

        calculator.waitingForSecondOperand = true;
        calculator.operator = nextOperator;
    }

    function calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                return firstOperand / secondOperand;
            case '^':
                return Math.pow(firstOperand, secondOperand);
            case 'sqrt':
                return Math.sqrt(firstOperand);
            default:
                return secondOperand;
        }
    }

    function resetCalculator() {
        calculator.displayValue = '0';
        calculator.firstOperand = null;
        calculator.waitingForSecondOperand = false;
        calculator.operator = null;
    }

    function updateDisplay() {
        let display = document.querySelector('.calculator-screen');
        display.value = calculator.displayValue;
    }

    updateDisplay();

    let keys = document.querySelector('.calculator-keys');
    keys.addEventListener('click', function(event) {
        let target = event.target;
        let value = target.value;

        if (!target.matches('button')) {
            return;
        }

        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
            case '=':
            case '^':
            case 'sqrt':
                handleOperator(value);
                break;
            case '.':
                inputDecimal(value);
                break;
            case 'all-clear':
                resetCalculator();
                break;
            default:
                if (Number.isInteger(parseFloat(value))) {
                    inputDigit(value);
                }
        }

        updateDisplay();
    });
});
