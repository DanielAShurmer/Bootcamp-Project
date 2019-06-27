let bugIDNumber = 0;

function swapToDisplayAll() {
    window.location = "displayAll.html";
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
        swapToDisplayAll();
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
        console.log(BugData);
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