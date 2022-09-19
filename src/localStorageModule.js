export function addNewlocalStorage() {
    localStorage.setItem("countsNumber", "[]");
}

export function addItem(item) {
    let counts = localStorage.getItem("countsNumber")
    counts = JSON.parse(counts);
    counts.push(item);
    localStorage.setItem("countsNumber", JSON.stringify(counts))
}

export function clearStorage() {
    localStorage.clear()
}


// clearStorage()
// addNewlocalStorage()
// addItem(2);
// console.log(localStorage)