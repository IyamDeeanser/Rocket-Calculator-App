var target = document.getElementById("results")

export function print(string) {
    target.innerHTML += string + "<br>";
}

export function clear() {
    target.innerHTML = "";
}