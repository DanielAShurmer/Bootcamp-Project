let bugIDNumber = 0;
let BugData = [];
const TAGLIST = ['User Interface','AI','Graphical','Crashes Program','Ability'];

function swapToSearch() {
    window.location = "Search.html";
}

function swapToAddNew() {
    window.location = "AddNew.html";
}

function swapToInfo() {
    window.location = "displayAll.html";
}

function loadTagLists() {
    for (let tag in TAGLIST) {
        tag = TAGLIST[tag];
        console.log("Adding tag '" + tag + "' to taglist");
        let thisTag = document.createElement("option");
        thisTag.text = tag;
        document.getElementById("js_tag_one").add(thisTag);
        thisTag = document.createElement("option");
        thisTag.text = tag;
        document.getElementById("js_tag_two").add(thisTag);
        thisTag = document.createElement("option");
        thisTag.text = tag;
        document.getElementById("js_tag_three").add(thisTag);
    }
}

function generateNewBugID() {
    let validIDFound = false;
    let proposedNewID = 0;
    let uniqueIDGenerationAttempt = 1;
    while (validIDFound == false) {
        proposedNewID = Math.floor(Math.random() * 100000);
        validIDFound = true;
        console.log("Unique ID Generation Attempt " + uniqueIDGenerationAttempt + " | Attempting The New ID " + proposedNewID);

        for (let SingleBugReport in BugData) {
            SingleBugReport = BugData[SingleBugReport];
            if (SingleBugReport["bugNumber"] == proposedNewID){
                validIDFound = false;
            }
        }
        uniqueIDGenerationAttempt++;
        if (uniqueIDGenerationAttempt == 10000) {break};
    }

    if (validIDFound == true) {
        bugIDNumber = proposedNewID;
        document.getElementById("js_bug_ID_display").removeChild(document.getElementById("js_bug_ID_placeholder"));
        let thisDetail = document.createElement("p");
        thisDetail.innerText = "Bug ID Number: " + bugIDNumber;
        document.getElementById("js_bug_ID_display").appendChild(thisDetail);
    }
    else {
        document.getElementById("js_bug_ID_display").removeChild(document.getElementById("js_bug_ID_placeholder"));
        let thisDetail = document.createElement("p");
        thisDetail.innerText = "Error: No Unique Bug ID Could Be Found After 10,000 Attempts, Please Contact The System Administrator";
        document.getElementById("js_error_display").appendChild(thisDetail);
    }
}

function addNew(formData) {
    let bugToAddDetails = {};
    bugToAddDetails["bugNumber"] = bugIDNumber;
    bugToAddDetails["description"] = formData[0].value;
    bugToAddDetails["status"] = "Open";

    if (formData[1].checked == true) { bugToAddDetails["priority"] = formData[1].value; }
    else if (formData[2].checked == true) { bugToAddDetails["priority"] = formData[2].value; }
    else if (formData[3].checked == true) { bugToAddDetails["priority"] = formData[3].value; }
    else { bugToAddDetails["priority"] = formData[4].value; }

    bugToAddDetails["tagOne"] = formData[5].value;
    bugToAddDetails["tagTwo"] = formData[6].value;
    bugToAddDetails["tagThree"] = formData[7].value;

    bugToAddDetails["image"] = formData[8].value;

    bugToAddDetails["closeReason"] = "-";
    bugToAddDetails["openReason"] = "-";

    const InputDataRequest = new XMLHttpRequest();

    InputDataRequest.onloadend = function () {
        console.log("Bug Report Successfully Added!");
        swapToSearch();
    }

    InputDataRequest.open("POST", "http://localhost:3000/bugs");
    InputDataRequest.setRequestHeader("Content-Type", "application/json");
    InputDataRequest.send(JSON.stringify(bugToAddDetails));

    return false;
}

function loadAPI() {
    const DataRequest = new XMLHttpRequest();

    DataRequest.onload = function () {
        console.log("Data Received!");
        BugData = JSON.parse(DataRequest.responseText);
        generateNewBugID();
        loadTagLists();
    }

    DataRequest.onerror = function () {
        let thisDetail = document.createElement("p");
        thisDetail.className = "errorMessage";
        thisDetail.innerText = "Oops! The server seems to be down.";
        document.getElementById("js_error_display").appendChild(thisDetail);
    }

    DataRequest.open("GET", "http://localhost:3000/bugs");
    DataRequest.send();
}