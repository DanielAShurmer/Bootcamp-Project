function loadAPI() {
    const DataRequest = new XMLHttpRequest();

    DataRequest.onload = function () {
        console.log("Data Received!");
        BugData = JSON.parse(DataRequest.responseText);
        console.log(BugData);
    }

    DataRequest.open("GET", "http://localhost:3000/notes");
    DataRequest.send();
}