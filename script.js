function evaluateFunction(expression, x) {
    try {
        let func = expression.replace(/x/g, `(${x})`); // Replace x with actual value
        return Function(`"use strict"; return (${func})`)(); // Secure eval
    } catch (error) {
        console.error("Invalid function input:", error);
        return NaN; // Return NaN if the function is invalid
    }
}

function secantMethod(expression, x0, x1, tol, maxIter) {
    let output = "Iteration | x0 | x1 | x_new | f(x_new)\n";
    output += "-----------------------------------\n";

    for (let i = 0; i < maxIter; i++) {
        let f_x0 = evaluateFunction(expression, x0);
        let f_x1 = evaluateFunction(expression, x1);

        if (isNaN(f_x0) || isNaN(f_x1)) {
            return "Error: Invalid function. Check syntax!";
        }

        if (Math.abs(f_x1 - f_x0) < 1e-10) {
            return "Division by zero detected. Change initial guesses.";
        }

        let x_new = x1 - f_x1 * (x1 - x0) / (f_x1 - f_x0);
        let f_new = evaluateFunction(expression, x_new);

        output += `${i + 1} | ${x0.toFixed(6)} | ${x1.toFixed(6)} | ${x_new.toFixed(6)} | ${f_new.toFixed(6)}\n`;

        if (Math.abs(f_new) < tol) {
            output += `\nRoot found at: ${x_new.toFixed(6)}`;
            return output;
        }

        x0 = x1;
        x1 = x_new;
    }

    return output + `\nMaximum iterations reached. Approximate root: ${x1.toFixed(6)}`;
}

function solveSecant() {
    let func = document.getElementById("function").value.trim();
    let x0 = parseFloat(document.getElementById("x0").value);
    let x1 = parseFloat(document.getElementById("x1").value);
    let tol = parseFloat(document.getElementById("tol").value);
    let maxIter = parseInt(document.getElementById("maxIter").value);

    if (!func || isNaN(x0) || isNaN(x1) || isNaN(tol) || isNaN(maxIter)) {
        document.getElementById("output").innerText = "Error: Please enter valid inputs!";
        return;
    }

    let result = secantMethod(func, x0, x1, tol, maxIter);
    document.getElementById("output").innerText = result;
}
