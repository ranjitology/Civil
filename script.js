function evaluateFunction(expression, x) {
    try {
        let func = expression.replace(/x/g, `(${x})`);
        return Function(`"use strict"; return (${func})`)();
    } catch (error) {
        return NaN;
    }
}

function bisectionMethod(expression, a, b, tol, maxIter) {
    let f_a = evaluateFunction(expression, a);
    let f_b = evaluateFunction(expression, b);

    if (f_a * f_b > 0) return "Error: Function values at a and b must have opposite signs!";

    let output = "Iteration | a | b | c | f(c)\n";
    let c;
    for (let i = 0; i < maxIter; i++) {
        c = (a + b) / 2;
        let f_c = evaluateFunction(expression, c);
        output += `${i + 1} | ${a.toFixed(6)} | ${b.toFixed(6)} | ${c.toFixed(6)} | ${f_c.toFixed(6)}\n`;
        if (Math.abs(f_c) < tol) return output + `\nRoot found at: ${c.toFixed(6)}`;
        f_a * f_c < 0 ? (b = c) : (a = c);
    }
    return output;
}

function secantMethod(expression, x0, x1, tol, maxIter) {
    let output = "Iteration | x0 | x1 | x_new | f(x_new)\n";
    for (let i = 0; i < maxIter; i++) {
        let f_x0 = evaluateFunction(expression, x0);
        let f_x1 = evaluateFunction(expression, x1);
        let x_new = x1 - f_x1 * (x1 - x0) / (f_x1 - f_x0);
        let f_new = evaluateFunction(expression, x_new);
        output += `${i + 1} | ${x0.toFixed(6)} | ${x1.toFixed(6)} | ${x_new.toFixed(6)} | ${f_new.toFixed(6)}\n`;
        if (Math.abs(f_new) < tol) return output + `\nRoot found at: ${x_new.toFixed(6)}`;
        x0 = x1;
        x1 = x_new;
    }
    return output;
}

function newtonRaphsonMethod(expression, x0, tol, maxIter) {
    let output = "Iteration | x0 | f(x0) | f'(x0) | x_new\n";
    let derivative = expression.replace(/x/g, `(${x0})`);
    for (let i = 0; i < maxIter; i++) {
        let f_x = evaluateFunction(expression, x0);
        let df_x = evaluateFunction(derivative, x0 + 0.00001) - evaluateFunction(derivative, x0);
        let x_new = x0 - f_x / df_x;
        output += `${i + 1} | ${x0.toFixed(6)} | ${f_x.toFixed(6)} | ${df_x.toFixed(6)} | ${x_new.toFixed(6)}\n`;
        if (Math.abs(f_x) < tol) return output + `\nRoot found at: ${x_new.toFixed(6)}`;
        x0 = x_new;
    }
    return output;
}

function solve() {
    let func = document.getElementById("function").value.trim();
    let tol = parseFloat(document.getElementById("tol").value);
    let maxIter = parseInt(document.getElementById("maxIter").value);
    let method = document.getElementById("method").value;
    let result;

    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);

    if (method === "bisection") result = bisectionMethod(func, a, b, tol, maxIter);
    else if (method === "secant") result = secantMethod(func, a, b, tol, maxIter);
    else if (method === "newton") result = newtonRaphsonMethod(func, a, tol, maxIter);

    document.getElementById("output").innerText = result;
}
