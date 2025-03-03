from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)

def evaluate_function(expression, x):
    """Safely evaluate the function at x."""
    return eval(expression, {"x": x, "np": np, "math": np})

def bisection_method(expression, a, b, tol, max_iter):
    """Solves f(x) = 0 using the Bisection Method."""
    if evaluate_function(expression, a) * evaluate_function(expression, b) >= 0:
        return "Invalid interval. f(a) and f(b) must have opposite signs."

    result = "Iteration | a | b | c | f(c)\n"
    result += "--------------------------------\n"

    for i in range(max_iter):
        c = (a + b) / 2
        fc = evaluate_function(expression, c)

        result += f"{i+1:>9} | {a:.6f} | {b:.6f} | {c:.6f} | {fc:.6f}\n"

        if abs(fc) < tol:
            result += f"\nRoot found at: {c:.6f}"
            return result

        if evaluate_function(expression, a) * fc < 0:
            b = c
        else:
            a = c

    return result + f"\nMaximum iterations reached. Approximate root: {c:.6f}"

@app.route("/solve", methods=["POST"])
def solve():
    data = request.get_json()
    function = data["function"]
    a = float(data["a"])
    b = float(data["b"])
    tol = float(data["tol"])
    max_iter = int(data["maxIter"])

    result = bisection_method(function, a, b, tol, max_iter)
    return jsonify({"result": result})

if __name__ == "__main__":
    app.run(debug=True)
