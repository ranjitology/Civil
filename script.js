function solveBisection() {
    let func = document.getElementById("function").value;
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);
    let tol = parseFloat(document.getElementById("tol").value);
    let maxIter = parseInt(document.getElementById("maxIter").value);

    fetch("/solve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ function: func, a: a, b: b, tol: tol, maxIter: maxIter })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("output").innerText = data.result;
    })
    .catch(error => console.error("Error:", error));
}
