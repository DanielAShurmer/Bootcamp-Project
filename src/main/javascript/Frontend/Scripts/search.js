let BugData = {};

function swapToSearch() {
    window.location = "Search.html";
}

function swapToAddNew() {
    window.location = "AddNew.html";
}

function swapToInfo() {
    window.location = "displayAll.html";
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

function goToBugWithID(bugID) {
    sessionStorage.removeItem("IDToLoad");
    sessionStorage.setItem("IDToLoad",bugID);
    window.location = "DisplayOne.html";
    console.log("Loading Data Of Bug With Identifier " + bugID);
}

function updateDetails() {
    for (let data in BugData) {
        let ThisBug = BugData[data];

        let bugContainer = document.createElement("button");
        bugContainer.className = "bugContainer";

        let bugContainerDisplay = document.createElement("div");
        bugContainerDisplay.className = "bugContainerDisplay";

        for (let element in ThisBug) {

            if (element == "bugNumber") {
                let thisDetail = document.createElement("h1");
                thisDetail.className = "bugContainerHeading";
                thisDetail.innerText = "ID: " + ThisBug[element];
                bugContainerDisplay.appendChild(thisDetail);
            }

            if (element == "description") {
                let thisDetail = document.createElement("p");
                thisDetail.className = "bugContainerDescription";
                thisDetail.innerText = ThisBug[element];
                bugContainerDisplay.appendChild(thisDetail);
            }

            if (element == "status") {
                let thisDetail = document.createElement("p");
                thisDetail.className = "bugContainerDescription";
                thisDetail.innerText = ThisBug[element];
                bugContainerDisplay.appendChild(thisDetail);
            }
        }
        bugContainer.addEventListener("click", function () { goToBugWithID(ThisBug["_id"])});
        bugContainer.appendChild(bugContainerDisplay);
        document.getElementById("js_bug_details").appendChild(bugContainer);
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