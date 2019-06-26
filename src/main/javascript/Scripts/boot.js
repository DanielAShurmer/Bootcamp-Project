let BugData = {};

function cleanString(inputString) {
    // Function Splits Strings Into Words Based On Capitals, Then Ensures Each Word Starts With
    // A Capital Letter (e.g. 'thisSetOfWords' to 'This Set Of Words')
    let SplitString = [];
    SplitString = (inputString).split(/([A-Z])/g);
    inputString = "";
    for (StringPiece of SplitString) {
        if ((/[A-Z]/g).test(StringPiece)) {
            inputString += " " + StringPiece;
        }
        else {
            inputString += StringPiece;
        }
    }
    inputString = inputString.replace(/\b\w/g, txt => txt.toUpperCase());
    return inputString;
}

function updateDetails() {
    for (let data in BugData) {
        let ThisBug = BugData[data];
        for (let element in BugData[data]) {
            console.log(ThisBug[element]);

            if (element != "__v"){

                let thisDetail = document.createElement("p");
                thisDetail.className = "bugDetail";
                thisDetail.innerText = element;
                thisDetail.innerText += ": ";
                thisDetail.innerText += ThisBug[element];
        
                thisDetail.innerText = cleanString(thisDetail.innerText);
        
                document.getElementById("js_bug_details").appendChild(thisDetail);
            }

        }
      
    }

}


function loadAPI() {
    const DataRequest = new XMLHttpRequest();

    DataRequest.onload = function () {
        console.log("Data Received!");
        BugData = JSON.parse(DataRequest.responseText);
        console.log(BugData);
        updateDetails();
    }

    DataRequest.open("GET", "http://localhost:3000/notes");
    DataRequest.send();
}