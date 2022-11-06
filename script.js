const defaultState = {
    displayValue: "",
    newValue: null,
    operation: "=",
    previousValue: 0,
}

let state = {...defaultState};


function compute() {
    const {previousValue, operation, newValue} = state;
    const result = operate(previousValue, newValue, operation);

    if (typeof result === "string") {
        // Error
        state = {
            ...defaultState,
            displayValue: result,
        }
        return;
    } else {
        state = {
            displayValue: result.toString(),
            newValue: null,
            previousValue: result,
        }
    }
}

function operate(n1,n2,op) {
    if (op === "/") {
        if (n2 === 0) return "Division by 0.";
        return n1 / n2;
    } else if (op === "*") {
        return n1 * n2;
    } else if (op === "-") {
        return n1 - n2;
    } else if (op === "+") {
        return n1 + n2;
    } else if (op === "=") {
        return n2;
    }
}

function enterOperator(op) {
    if (state.newValue !== null) {
        if (state.operation !== "") compute();
    }
    
    state.operation = op;
    refreshLayout();
}

function enterDigit(digit) {
    const value = (state.newValue||0)*10 + digit;
    state.newValue = value
    state.displayValue = state.newValue.toString();
    refreshLayout();
}

function refreshLayout() {
    const eDisplay = document.getElementById("display");
    eDisplay.textContent = state.displayValue;
}

function reset() {
    state = {...defaultState};
    refreshLayout();
}
