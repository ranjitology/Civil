function evaluateFunction(expression, x) {
    try {
        let func = expression.replace(/x/g, `(${x})`);
        return Function(`"use strict"; return (${func})`)();
    } catch (error) {
        console.error("Invalid function input:", error);
        return NaN;
    }
}

function bisectionMethod(expression, a, b, tol, maxIter) {
    let f_a = evaluateFunction(expression, a);
    let f_b = evaluateFunction(expression, b);

    if (isNaN(f_a) || isNaN(f_b)) {
        return "Error: Invalid function. Check syntax!";
    }
    if (f_a * f_b > 0) {
        return "Error: Function values at a and b must have opposite signs!";
    }

    let output = "Iteration | a | b | c | f(c)\n";
    output += "-----------------------------------\n";

    let c;
    for (let i = 0; i < maxIter; i++) {
        c = (a + b) / 2;
        let f_c = evaluateFunction(expression, c);

        output += `${i + 1} | ${a.toFixed(6)} | ${b.toFixed(6)} | ${c.toFixed(6)} | ${f_c.toFixed(6)}\n`;

        if (Math.abs(f_c) < tol) {
            return output + `\nRoot found at: ${c.toFixed(6)}`;
        }

        if (f_a * f_c < 0) {
            b = c;
        } else {
            a = c;
            f_a = f_c;
        }
    }
    return output + `\nMax iterations reached. Approximate root: ${c.toFixed(6)}`;
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
            return "Error: Division by zero detected!";
        }

        let x_new = x1 - f_x1 * (x1 - x0) / (f_x1 - f_x0);
        let f_new = evaluateFunction(expression, x_new);

        output += `${i + 1} | ${x0.toFixed(6)} | ${x1.toFixed(6)} | ${x_new.toFixed(6)} | ${f_new.toFixed(6)}\n`;

        if (Math.abs(f_new) < tol) {
            return output + `\nRoot found at: ${x_new.toFixed(6)}`;
        }

        x0 = x1;
        x1 = x_new;
    }
    return output + `\nMax iterations reached. Approximate root: ${x1.toFixed(6)}`;
}

function solve() {
    let func = document.getElementById("function").value.trim();
    let tol = parseFloat(document.getElementById("tol").value);
    let maxIter = parseInt(document.getElementById("maxIter").value);
    let method = document.getElementById("method").value;
    let result;

    if (!func || isNaN(tol) || isNaN(maxIter)) {
        document.getElementById("output").innerText = "Error: Please enter valid inputs!";
        return;
    }

    if (method === "bisection") {
        let a = parseFloat(document.getElementById("a").value);
        let b = parseFloat(document.getElementById("b").value);
        if (isNaN(a) || isNaN(b)) {
            document.getElementById("output").innerText = "Error: Enter valid bounds for bisection!";
            return;
        }
        result = bisectionMethod(func, a, b, tol, maxIter);
    } else if (method === "secant") {
        let x0 = parseFloat(document.getElementById("a").value);
        let x1 = parseFloat(document.getElementById("b").value);
        if (isNaN(x0) || isNaN(x1)) {
            document.getElementById("output").innerText = "Error: Enter valid initial guesses for secant!";
            return;
        }
        result = secantMethod(func, x0, x1, tol, maxIter);
    }

    document.getElementById("output").innerText = result;
}
