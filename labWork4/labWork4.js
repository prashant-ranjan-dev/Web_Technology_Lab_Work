document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const expressionDisplay =
        document.getElementById("expression");

    const resultDisplay =
        document.getElementById("result");

    const memoryIndicator =
        document.getElementById("memory-indicator");

    const angleIndicator =
        document.getElementById("angle-indicator");

    const trigMode =
        document.getElementById("trig-mode");

    const functionSelect =
        document.getElementById("function-select");

    const applyFunction =
        document.getElementById("apply-function");


    /* =====================================================
       STATE
       ===================================================== */

    let expression = "";

    let memory = 0;

    let lastResult = 0;

    let justCalculated = false;

    let secondFunction = false;


    /* =====================================================
       DISPLAY
       ===================================================== */

    function updateDisplay() {

        expressionDisplay.textContent =
            expression || "";

        if (expression === "") {

            resultDisplay.textContent = "0";

            return;

        }

        const result = evaluateExpression(expression);

        if (result !== "Error") {

            resultDisplay.textContent =
                formatNumber(result);

        } else {

            resultDisplay.textContent = "0";

        }

    }


    function formatNumber(value) {

        if (typeof value !== "number") {

            return String(value);

        }

        if (!Number.isFinite(value)) {

            return "Error";

        }

        if (Number.isInteger(value)) {

            return value.toString();

        }

        return Number(value.toFixed(12)).toString();

    }


    /* =====================================================
       MEMORY
       ===================================================== */

    function updateMemoryIndicator() {

        if (memory !== 0) {

            memoryIndicator.textContent = "M";

        } else {

            memoryIndicator.textContent = "";

        }

    }


    function getCurrentValue() {

        if (expression) {

            const value =
                evaluateExpression(expression);

            if (value !== "Error") {

                return value;

            }

        }

        return lastResult;

    }


    function memoryAction(action) {

        const value = getCurrentValue();

        switch (action) {

            case "MC":

                memory = 0;

                break;


            case "MR":

                expression =
                    String(memory);

                justCalculated = false;

                break;


            case "MS":

                if (value !== "Error") {

                    memory = value;

                }

                break;


            case "M+":

                if (value !== "Error") {

                    memory += value;

                }

                break;


            case "M-":

                if (value !== "Error") {

                    memory -= value;

                }

                break;

        }

        updateMemoryIndicator();

        updateDisplay();

    }


    /* =====================================================
       ANGLE CONVERSION
       ===================================================== */

    function toRadians(value) {

        const mode = trigMode.value;

        if (mode === "deg") {

            return value * Math.PI / 180;

        }

        if (mode === "grad") {

            return value * Math.PI / 200;

        }

        return value;

    }


    function fromRadians(value) {

        const mode = trigMode.value;

        if (mode === "deg") {

            return value * 180 / Math.PI;

        }

        if (mode === "grad") {

            return value * 200 / Math.PI;

        }

        return value;

    }


    /* =====================================================
       FACTORIAL
       ===================================================== */

    function factorial(number) {

        if (
            !Number.isFinite(number) ||
            number < 0 ||
            !Number.isInteger(number)
        ) {

            throw new Error("Invalid factorial");

        }


        if (number > 170) {

            throw new Error("Number too large");

        }


        let result = 1;


        for (
            let i = 2;
            i <= number;
            i++
        ) {

            result *= i;

        }


        return result;

    }


    /* =====================================================
       FUNCTION HELPERS
       ===================================================== */

    function applyUnaryFunction(name) {

        const value = getCurrentValue();

        if (value === "Error") {

            return;

        }


        let result;


        try {

            switch (name) {

                case "sin":

                    result =
                        Math.sin(
                            toRadians(value)
                        );

                    break;


                case "cos":

                    result =
                        Math.cos(
                            toRadians(value)
                        );

                    break;


                case "tan":

                    result =
                        Math.tan(
                            toRadians(value)
                        );

                    break;


                case "asin":

                    result =
                        fromRadians(
                            Math.asin(value)
                        );

                    break;


                case "acos":

                    result =
                        fromRadians(
                            Math.acos(value)
                        );

                    break;


                case "atan":

                    result =
                        fromRadians(
                            Math.atan(value)
                        );

                    break;


                case "sqrt":

                    result =
                        Math.sqrt(value);

                    break;


                case "log":

                    result =
                        Math.log10(value);

                    break;


                case "ln":

                    result =
                        Math.log(value);

                    break;


                case "abs":

                    result =
                        Math.abs(value);

                    break;


                default:

                    return;

            }


            if (!Number.isFinite(result)) {

                resultDisplay.textContent = "Error";

                return;

            }


            expression =
                formatNumber(result);

            lastResult = result;

            justCalculated = true;

            updateDisplay();

        } catch {

            resultDisplay.textContent = "Error";

        }

    }


    /* =====================================================
       EXPRESSION TRANSFORMATION
       ===================================================== */

    function transformExpression(expr) {

        let transformed = expr;


        // Mathematical symbols

        transformed =
            transformed
                .replace(/×/g, "*")
                .replace(/÷/g, "/")
                .replace(/−/g, "-");


        // Constants

        transformed =
            transformed.replace(
                /π/g,
                "Math.PI"
            );


        transformed =
            transformed.replace(
                /(^|[^A-Za-z])e([^A-Za-z]|$)/g,
                "$1Math.E$2"
            );


        // Modulus

        transformed =
            transformed.replace(
                /\bmod\b/g,
                "%"
            );


        // Power

        transformed =
            transformed.replace(
                /\^/g,
                "**"
            );


        // Percentage

        transformed =
            transformed.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );


        // Factorial

        transformed =
            transformed.replace(
                /(\d+(?:\.\d+)?)!/g,
                "factorial($1)"
            );


        // Functions

        transformed =
            transformed.replace(
                /sqrt\(/g,
                "Math.sqrt("
            );


        transformed =
            transformed.replace(
                /log\(/g,
                "Math.log10("
            );


        transformed =
            transformed.replace(
                /ln\(/g,
                "Math.log("
            );


        transformed =
            transformed.replace(
                /exp\(/g,
                "Math.exp("
            );


        transformed =
            transformed.replace(
                /abs\(/g,
                "Math.abs("
            );


        return transformed;

    }


    /* =====================================================
       EXPRESSION EVALUATOR
       ===================================================== */

    function evaluateExpression(expr) {

        if (!expr) {

            return 0;

        }


        try {

            const safeExpression =
                transformExpression(expr);


            const result =
                Function(
                    "factorial",
                    "Math",
                    `"use strict"; return (${safeExpression})`
                )(
                    factorial,
                    Math
                );


            if (
                typeof result !== "number" ||
                !Number.isFinite(result)
            ) {

                return "Error";

            }


            return result;

        } catch {

            return "Error";

        }

    }


    /* =====================================================
       APPENDING TOKENS
       ===================================================== */

    function appendToken(token) {

        if (justCalculated) {

            if (
                !isOperator(token) &&
                token !== ")"
            ) {

                expression = "";

            }

            justCalculated = false;

        }


        expression += token;

        updateDisplay();

    }


    function isOperator(token) {

        return [
            "+",
            "−",
            "×",
            "÷",
            "^",
            "mod"
        ].includes(token);

    }


    /* =====================================================
       CLEAR / BACKSPACE
       ===================================================== */

    function clearAll() {

        expression = "";

        lastResult = 0;

        justCalculated = false;

        updateDisplay();

    }


    function clearEntry() {

        expression = "";

        justCalculated = false;

        updateDisplay();

    }


    function backspace() {

        if (justCalculated) {

            clearAll();

            return;

        }


        expression =
            expression.slice(0, -1);

        updateDisplay();

    }


    /* =====================================================
       CALCULATE
       ===================================================== */

    function calculate() {

        if (!expression) {

            return;

        }


        const result =
            evaluateExpression(expression);


        if (result === "Error") {

            expressionDisplay.textContent =
                expression;

            resultDisplay.textContent =
                "Error";

            expression = "";

            justCalculated = false;

            return;

        }


        expressionDisplay.textContent =
            expression + " =";


        resultDisplay.textContent =
            formatNumber(result);


        expression =
            formatNumber(result);


        lastResult = result;

        justCalculated = true;

    }


    /* =====================================================
       SIGN
       ===================================================== */

    function toggleSign() {

        if (!expression) {

            expression = "-";

            updateDisplay();

            return;

        }


        if (
            /^-?\d+(\.\d+)?$/.test(expression)
        ) {

            expression =
                expression.startsWith("-")
                    ? expression.substring(1)
                    : "-" + expression;

            updateDisplay();

        }

    }


    /* =====================================================
       SCIENTIFIC BUTTONS
       ===================================================== */

    function handleScientific(action) {

        switch (action) {

            case "2nd":

                secondFunction =
                    !secondFunction;

                return;


            case "pi":

                appendToken("π");

                return;


            case "e":

                appendToken("e");

                return;


            case "fact":

                appendToken("!");

                return;


            case "square":

                appendToken("^2");

                return;


            case "power":

                appendToken("^");

                return;


            case "sqrt":

                applyUnaryFunction("sqrt");

                return;


            case "tenpow":

                const value =
                    getCurrentValue();

                if (value !== "Error") {

                    const result =
                        Math.pow(10, value);

                    expression =
                        formatNumber(result);

                    lastResult = result;

                    justCalculated = true;

                    updateDisplay();

                }

                return;


            case "log":

                applyUnaryFunction("log");

                return;


            case "ln":

                applyUnaryFunction("ln");

                return;


            case "exp":

                const expValue =
                    getCurrentValue();

                if (expValue !== "Error") {

                    const expResult =
                        Math.exp(expValue);

                    expression =
                        formatNumber(expResult);

                    lastResult = expResult;

                    justCalculated = true;

                    updateDisplay();

                }

                return;


            case "abs":

                applyUnaryFunction("abs");

                return;


            case "sin":

            case "cos":

            case "tan":

            case "asin":

            case "acos":

            case "atan":

                applyUnaryFunction(action);

                return;

        }

    }


    /* =====================================================
       MAIN ACTION HANDLER
       ===================================================== */

    function handleAction(action) {

        switch (action) {

            /* Memory */

            case "MC":
            case "MR":
            case "M+":
            case "M-":
            case "MS":

                memoryAction(action);

                return;


            /* Clear */

            case "C":

                clearAll();

                return;


            case "CE":

                clearEntry();

                return;


            /* Backspace */

            case "backspace":

                backspace();

                return;


            /* Equals */

            case "equals":

                calculate();

                return;


            /* Operators */

            case "add":

                appendToken("+");

                return;


            case "subtract":

                appendToken("−");

                return;


            case "multiply":

                appendToken("×");

                return;


            case "divide":

                appendToken("÷");

                return;


            case "mod":

                appendToken(" mod ");

                return;


            case "lparen":

                appendToken("(");

                return;


            case "rparen":

                appendToken(")");

                return;


            case "percent":

                appendToken("%");

                return;


            case "toggle-sign":

                toggleSign();

                return;

        }


        /* Scientific functions */

        handleScientific(action);

    }


    /* =====================================================
       NUMBER BUTTONS
       ===================================================== */

    document
        .querySelectorAll(".number-key")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    appendToken(
                        button.dataset.value
                    );

                }
            );

        });


    /* =====================================================
       ALL ACTION BUTTONS
       ===================================================== */

    document
        .querySelectorAll("[data-action]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    handleAction(
                        button.dataset.action
                    );

                }
            );

        });


    /* =====================================================
       FUNCTION SELECT
       ===================================================== */

    applyFunction.addEventListener(
        "click",
        () => {

            const selected =
                functionSelect.value;


            if (
                selected !== "none"
            ) {

                applyUnaryFunction(selected);

            }

        }
    );


    /* =====================================================
       ANGLE MODE
       ===================================================== */

    trigMode.addEventListener(
        "change",
        () => {

            angleIndicator.textContent =
                trigMode.value.toUpperCase();

            updateDisplay();

        }
    );


    /* =====================================================
       KEYBOARD SUPPORT
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const key = event.key;


            /* Numbers */

            if (
                /^[0-9.]$/.test(key)
            ) {

                appendToken(key);

                return;

            }


            /* Operators */

            switch (key) {

                case "+":

                    appendToken("+");

                    break;


                case "-":

                    appendToken("−");

                    break;


                case "*":

                    appendToken("×");

                    break;


                case "/":

                    event.preventDefault();

                    appendToken("÷");

                    break;


                case "^":

                    appendToken("^");

                    break;


                case "%":

                    appendToken("%");

                    break;


                case "(":

                    appendToken("(");

                    break;


                case ")":

                    appendToken(")");

                    break;


                case "Enter":
                case "=":

                    calculate();

                    break;


                case "Backspace":

                    backspace();

                    break;


                case "Escape":

                    clearAll();

                    break;


                case "Delete":

                    clearEntry();

                    break;

            }

        }
    );


    /* =====================================================
       INITIALIZE
       ===================================================== */

    updateMemoryIndicator();

    angleIndicator.textContent =
        trigMode.value.toUpperCase();

    updateDisplay();

});