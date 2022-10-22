var column1 = document.getElementById("results1");
var column2 = document.getElementById("results2");
var column3 = document.getElementById("results3");

export function printC1(string) {
    column1.innerHTML += string + "<br>";
}

export function printC2(string) {
    column2.innerHTML += string + "<br>";
}

export function printC3(string) {
    column3.innerHTML += string + "<br>";
}

export function clear() {
    column1.innerHTML = "";
    column2.innerHTML = "";
    column3.innerHTML = "";
}