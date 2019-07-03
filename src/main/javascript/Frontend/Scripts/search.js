let BugData = {};
let FilteredData = [];

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
        let TagOneList = filter(FilteredData, "tagOne", cleanString((formData[1].value).toLowerCase()));
        let TagTwoList = filter(FilteredData, "tagTwo", cleanString((formData[1].value).toLowerCase()));
        let TagThreeList = filter(FilteredData, "tagThree", cleanString((formData[1].value).toLowerCase()));

        FilteredData = [];
        for (let match in TagOneList) { FilteredData[FilteredData.length] = TagOneList[match]; }
        for (let match in TagTwoList) { FilteredData[FilteredData.length] = TagTwoList[match]; }
        for (let match in TagThreeList) { FilteredData[FilteredData.length] = TagThreeList[match]; }

    }
    if (formData[2].value != "") {
        FilteredData = filter(FilteredData, "status", cleanString((formData[2].value).toLowerCase()));
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
    console.log("Loading Data Of Bug With Identifier " + bugID);
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
        document.getElementById("js_bug_details").appendChild(bugListing);
    }
}

function loadAPI() {
    const DataRequest = new XMLHttpRequest();

    DataRequest.onload = function () {
        console.log("Data Received!");
        BugData = JSON.parse(DataRequest.responseText);
        console.log(BugData);
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