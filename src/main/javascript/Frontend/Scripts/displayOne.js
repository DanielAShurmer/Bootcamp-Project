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

function updateBug(formData) {

    let bugToEditDetails = {};
    bugToEditDetails["_id"] = BugData["_id"];
    bugToEditDetails["bugNumber"] = BugData["bugNumber"];
    bugToEditDetails["description"] = formData[0].value;

    bugToEditDetails["status"] = BugData["status"];
    bugToEditDetails["priority"] = BugData["priority"];

    bugToEditDetails["tagOne"] = BugData["tagOne"];
    bugToEditDetails["tagTwo"] = BugData["tagTwo"];
    bugToEditDetails["tagThree"] = BugData["tagThree"];

    bugToEditDetails["image"] = BugData["image"];

    bugToEditDetails["closeReason"] = BugData["closeReason"];
    bugToEditDetails["openReason"] = BugData["openReason"];
    bugToEditDetails["__v"] = BugData["__v"];

    console.log(bugToEditDetails);

    const DeleteDataRequest = new XMLHttpRequest();

    DeleteDataRequest.onloadend = function () {

        const InputDataRequest = new XMLHttpRequest();

        InputDataRequest.onloadend = function () {
            console.log("Bug Report Successfully Readded!");
            swapToSearch();
        }

        InputDataRequest.open("POST", "http://localhost:3000/bugs");
        InputDataRequest.setRequestHeader("Content-Type", "application/json");
        InputDataRequest.send(JSON.stringify(bugToEditDetails));

        console.log("Bug Report Successfully Deleted!");
    }

    DeleteDataRequest.open("DELETE", "http://localhost:3000/bugs/" + BugData["_id"]);
    DeleteDataRequest.send();

    return true;
}

function updateDetails() {

    let bugContainerDisplay = document.createElement("form");
    bugContainerDisplay.className = "singleBugContainerDisplay row";

    let bugContainerDisplayMain = document.createElement("div");
    bugContainerDisplayMain.className = "singleBugContainerDisplayMain col";

    let bugContainerDisplaySideColumn = document.createElement("div");
    bugContainerDisplaySideColumn.className = "singleBugContainerDisplaySideColumn col";

    let bugContainerDisplaySideStatus = document.createElement("div");
    bugContainerDisplaySideStatus.className = "singleBugContainerDisplaySideStatus col";

    let bugContainerDisplaySideOthers = document.createElement("div");
    bugContainerDisplaySideOthers.className = "singleBugContainerDisplaySideOthers col";

    for (let element in BugData) {

        if (element == "bugNumber") {
            let thisDetail = document.createElement("h1");
            thisDetail.className = "bugContainerHeading";
            thisDetail.innerText = "ID: " + BugData[element];
            bugContainerDisplayMain.appendChild(thisDetail);
        }

        if (element == "description") {
            let thisDetail = document.createElement("p");
            thisDetail.className = "bugContainerDescription";
            thisDetail.innerText = "Description:";
            bugContainerDisplayMain.appendChild(thisDetail);

            thisDetail = document.createElement("textarea");
            thisDetail.className = "bugContainerDescriptionInput";
            thisDetail.setAttribute("rows", 5);
            thisDetail.value = BugData[element];
            bugContainerDisplayMain.appendChild(thisDetail);
        }

        if (element == "image") {
            let thisDetail = document.createElement("p");
            thisDetail.className = "bugContainerImage";
            thisDetail.innerText = "Image: \n" + BugData[element];
            bugContainerDisplayMain.appendChild(thisDetail);
        }

        if (element == "closeReason") {
            let thisDetail = document.createElement("p");
            thisDetail.className = "bugContainerCloseReason";
            thisDetail.innerText = "Reason For Closing: \n" + BugData[element];
            bugContainerDisplayMain.appendChild(thisDetail);
        }

        if (element == "openReason") {
            let thisDetail = document.createElement("p");
            thisDetail.className = "bugContainerOpenReason";
            thisDetail.innerText = "Reason For Reopening: \n" + BugData[element];
            bugContainerDisplayMain.appendChild(thisDetail);
        }

        if (element == "status") {
            let thisDetail = document.createElement("p");
            thisDetail.className = "bugContainerStatus";
            thisDetail.innerText = BugData[element];

            if (BugData[element] == "Open") {
                bugContainerDisplaySideStatus.style.cssText = "background-color: red;"
            }
            else if (BugData[element] == "Closed") {
                bugContainerDisplaySideStatus.style.cssText = "background-color: green;"
            }
            else if (BugData[element] == "Being Worked On") {
                bugContainerDisplaySideStatus.style.cssText = "background-color: orange;"
            }
            else if (BugData[element] == "Reopened") {
                bugContainerDisplaySideStatus.style.cssText = "background-color: yellow;"
            }

            bugContainerDisplaySideStatus.appendChild(thisDetail);
        }

        if (element == "priority") {
            let thisDetail = document.createElement("p");
            thisDetail.className = "bugContainerPriority";
            thisDetail.innerText = "Priority: \n" + BugData[element];
            bugContainerDisplaySideOthers.appendChild(thisDetail);
        }

        if (element == "tagOne") {
            let thisDetail = document.createElement("p");
            thisDetail.className = "bugContainerTagOne";
            thisDetail.innerText = "Tags: \n" + BugData[element];
            bugContainerDisplaySideOthers.appendChild(thisDetail);
        }

        if (element == "tagTwo") {
            let thisDetail = document.createElement("p");
            thisDetail.className = "bugContainerTagTwo";
            thisDetail.innerText = BugData[element];
            bugContainerDisplaySideOthers.appendChild(thisDetail);
        }

        if (element == "tagThree") {
            let thisDetail = document.createElement("p");
            thisDetail.className = "bugContainerTagThree";
            thisDetail.innerText = BugData[element];
            bugContainerDisplaySideOthers.appendChild(thisDetail);
        }
    }

    let bugSubmitButton = document.createElement("button");
    bugSubmitButton.innerText = "Save Changes";
    bugSubmitButton.className = "js_bug_update bugUpdateButton btn btn-primary";
    bugSubmitButton.addEventListener("click", function () { updateBug(bugContainerDisplay) });

    bugContainerDisplaySideColumn.appendChild(bugContainerDisplaySideStatus);
    bugContainerDisplaySideColumn.appendChild(bugContainerDisplaySideOthers);
    bugContainerDisplaySideColumn.appendChild(bugSubmitButton);
    bugContainerDisplay.appendChild(bugContainerDisplayMain);
    bugContainerDisplay.appendChild(bugContainerDisplaySideColumn);

    document.getElementById("js_bug_details").appendChild(bugContainerDisplay);

}

function loadAPI() {
    loadIDNumber = sessionStorage.getItem("IDToLoad");
    console.log("Loading Bug With ID Number: " + loadIDNumber);

    if (loadIDNumber != null) {
        const DataRequest = new XMLHttpRequest();

        DataRequest.onload = function () {
            console.log("Data Received!");
            BugData = JSON.parse(DataRequest.responseText);
            console.log(BugData);

            if (BugData["message"] != null){
                swapToSearch();
            }
            updateDetails();
        }

        DataRequest.onerror = function () {
            let thisDetail = document.createElement("p");
            thisDetail.className = "errorMessage";
            thisDetail.innerText = "Oops! The server seems to be down.";
            document.getElementById("js_bug_details").appendChild(thisDetail);
        }

        DataRequest.open("GET", "http://localhost:3000/bugs/" + loadIDNumber);
        DataRequest.send();
    }
    else {
        let thisDetail = document.createElement("p");
        thisDetail.className = "errorMessage";
        thisDetail.innerText = "No bug has been selected to load.";
        document.getElementById("js_bug_details").appendChild(thisDetail);
    }
}