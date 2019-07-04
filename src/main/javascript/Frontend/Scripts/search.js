let BugData = {};
let FilteredData = [];
const TAGLIST = ['User Interface', 'AI', 'Graphical', 'Crashes Program', 'Ability'];
const BUGSTATUSOPTIONS = ["Open", "Closed", "Being Worked On", "Reopened"];
const PRIORITYOPTIONS = ["Low", "Medium", "High", "Critical"];

function swapToSearch() {
    window.location = "Search.html";
}

function swapToAddNew() {
    window.location = "AddNew.html";
}

function swapToSiteInfo() {
    window.location = "SiteInfo.html";
}

function filter(inputBugs, filteringElement, lookingFor) {
    let matchingResults = [];
    for (let data in inputBugs) {
        let ThisBug = inputBugs[data];

        let found = ThisBug[filteringElement];
        if (found == lookingFor) {
            matchingResults[matchingResults.length] = ThisBug;
        }
    }
    return matchingResults;
}

function runSearch(formData) {
    FilteredData = BugData;
    if (formData[0].value != "") {
        FilteredData = filter(FilteredData, "bugNumber", formData[0].value);
    }
    if (formData[1].value != "") {
        let TagOneList = filter(FilteredData, "tagOne", formData[1].value);
        let TagTwoList = filter(FilteredData, "tagTwo", formData[1].value);
        let TagThreeList = filter(FilteredData, "tagThree", formData[1].value);

        FilteredData = [];
        for (let match in TagOneList) { FilteredData[FilteredData.length] = TagOneList[match]; }
        for (let match in TagTwoList) { FilteredData[FilteredData.length] = TagTwoList[match]; }
        for (let match in TagThreeList) { FilteredData[FilteredData.length] = TagThreeList[match]; }

    }
    if (formData[2].value != "") {
        FilteredData = filter(FilteredData, "status", formData[2].value);
    }
    if (formData[3].value != "") {
        FilteredData = filter(FilteredData, "priority", formData[3].value);
    }
    updateDetails(FilteredData);

    return false;
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
    sessionStorage.setItem("IDToLoad", bugID);
    window.location = "DisplayOne.html";
}

function populateDropdowns() {
    for (let tag in TAGLIST) {
        tag = TAGLIST[tag];
        let thisTag = document.createElement("option");
        thisTag.text = tag;
        document.getElementById("js_form_tag").add(thisTag);
    }
    for (let status in BUGSTATUSOPTIONS) {
        status = BUGSTATUSOPTIONS[status];
        let thisStatus = document.createElement("option");
        thisStatus.text = status;
        document.getElementById("js_form_status").add(thisStatus);
    }
    for (let priority in PRIORITYOPTIONS) {
        priority = PRIORITYOPTIONS[priority];
        let thisPriority = document.createElement("option");
        thisPriority.text = priority;
        document.getElementById("js_form_priority").add(thisPriority);
    }
}

function updateDetails(inputBugs) {

    try {
        let Par = document.getElementById("js_bug_details");
        let Chi = document.getElementById("bugListing");
        Par.removeChild(Chi);
    }
    catch {
        console.log("Bug Listing Currently Empty")
    }

    let bugListing = document.createElement("div");
    bugListing.id = "bugListing";

    if (inputBugs.length == 0) {
        let thisDetail = document.createElement("p");
        thisDetail.innerText = "No Bugs Match The Current Search";
        bugListing.appendChild(thisDetail);
    }

    for (let data in inputBugs) {
        let ThisBug = inputBugs[data];

        let bugContainer = document.createElement("button");
        bugContainer.className = "searchBugContainer container";

        let bugContainerDisplay = document.createElement("div");
        bugContainerDisplay.className = "bugContainerDisplay row";

        let bugContainerDisplayNumAndDesc = document.createElement("div");
        bugContainerDisplayNumAndDesc.className = "bugContainerDisplayNumAndDesc col";

        let bugContainerDisplayStat = document.createElement("div");
        bugContainerDisplayStat.className = "bugContainerDisplayStat col";

        for (let element in ThisBug) {

            if (element == "bugNumber") {
                let thisDetail = document.createElement("h1");
                thisDetail.className = "bugContainerHeading";
                thisDetail.innerText = "ID: " + ThisBug[element];
                bugContainerDisplayNumAndDesc.appendChild(thisDetail);
            }

            if (element == "description") {
                let thisDetail = document.createElement("p");
                thisDetail.className = "bugContainerDescription";
                thisDetail.innerText = ThisBug[element];
                bugContainerDisplayNumAndDesc.appendChild(thisDetail);
            }

            if (element == "status") {
                let thisDetail = document.createElement("p");
                thisDetail.className = "bugContainerStatus";
                thisDetail.innerText = ThisBug[element];

                if (ThisBug[element] == "Open") {
                    bugContainerDisplayStat.style.cssText = "background-color: red;"
                }
                else if (ThisBug[element] == "Closed") {
                    bugContainerDisplayStat.style.cssText = "background-color: green;"
                }
                else if (ThisBug[element] == "Being Worked On") {
                    bugContainerDisplayStat.style.cssText = "background-color: orange;"
                }
                else if (ThisBug[element] == "Reopened") {
                    bugContainerDisplayStat.style.cssText = "background-color: yellow;"
                }

                bugContainerDisplayStat.appendChild(thisDetail);
            }
        }
        bugContainerDisplay.appendChild(bugContainerDisplayNumAndDesc);
        bugContainerDisplay.appendChild(bugContainerDisplayStat);

        bugContainer.addEventListener("click", function () { goToBugWithID(ThisBug["_id"]) });
        bugContainer.appendChild(bugContainerDisplay);
        bugListing.appendChild(bugContainer);
    }
    document.getElementById("js_bug_details").appendChild(bugListing);
}

function loadAPI() {
    const DataRequest = new XMLHttpRequest();

    DataRequest.onload = function () {
        console.log("Data Received!");
        BugData = JSON.parse(DataRequest.responseText);
        console.log(BugData);
        populateDropdowns();
        updateDetails(BugData);
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