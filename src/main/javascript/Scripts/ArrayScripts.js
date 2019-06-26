const animals = [
    'elephant', 'tiger', 'zebra', 'dragon', 'dog', 'blue-eyes white dragon'
];

let output = animals
    //.filter(item => item != animals[0] && item != animals[animals.length - 1]) //Filter Out
    .filter(item => item == "tiger" || item == "zebra" || item == "dragon" || item == "dog")
    .reduce((prev,item) => prev += item + ", ", "Animals: "
);

output = output.substr(0, output.length - 2); //Strip Trailing Comma & Whitespace
output = output.replace(/\b\w/g, txt => txt.toUpperCase()); //Capitalize First Letter Of Each Word

document.getElementById("Output").innerText = output;