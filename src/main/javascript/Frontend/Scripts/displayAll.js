let BugData = {};

function swapToSearch() {
    window.location = "Search.html";
}

function swapToAddNew() {
    window.location = "AddNew.html";
}

function swapToSiteInfo() {
    window.location = "SiteInfo.html";
}

function cleanString(inputString) {
    inputString = inputString.replace(/_/g, "");
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

            if (element != "__v") {

                let thisDetail = document.createElement("p");
                thisDetail.className = "bugDetail";
                thisDetail.innerText = cleanString(element);
                thisDetail.innerText += ": ";
                thisDetail.innerText += ThisBug[element];

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

    DataRequest.onerror = function () {
        let thisDetail = document.createElement("p");
        thisDetail.className = "errorMessage";
        thisDetail.innerText = "Oops! The server seems to be down.";
        document.getElementById("js_bug_details").appendChild(thisDetail);
    }

    DataRequest.open("GET", "http://localhost:3000/bugs");
    DataRequest.send();
}