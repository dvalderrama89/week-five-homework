// Displays the current day at the top
$(function() {
    $("#currentDay").text(moment().format("dddd MMMM Do, YYYY"));
});

// Renders the rows between 9am and 5pm
$(function() {
    
    // Stores the current day if the user has never visited the page before
    if (!localStorage.getItem("currentDay")) {
        localStorage.setItem("currentDay", moment().format("MM DD YYYY"));
    }

    // Populates content for each row
    for (let t = 9; t < 18; t++) {
        let timeRowTH = $("<th>");
        let timeRowTDContent = $("<td>");
        let timeRowTDSaveButton = $("<td>");
        timeRowTH.attr("scope", "row");
        timeRowTH.addClass("time-block");
        timeRowTH.addClass("col-md");
        
        let hour = t;
        if (hour > 12) {
            hour = hour - 12;
            timeRowTH.text(`${hour} PM`);
            timeRowTH.addClass("indent");
        } else {
            if (hour < 10) {
                timeRowTH.text(`${hour} AM`);
                timeRowTH.addClass("indent");
            } else {
                timeRowTH.text(`${hour} AM`);
            }
        }

        // Add input element to the cell
        let inputElem = $("<textarea>");
        inputElem.attr("id", `textareaID_${t}`);

        // If the day changed then clear out the calendar
        if (hasDayChanged()) {
            clearLocalStorage();
        }

        // If there's something in the localstorage message then stick it in the textarea
        let textareaMessage = localStorage.getItem(t);
        if (textareaMessage !== "" || textareaMessage !== undefined) {
            inputElem.val(textareaMessage);
        }

        timeRowTDContent.append(inputElem);

        addTimeClass(timeRowTDContent, t);
        timeRowTDContent.addClass("col-md-8");

        let saveIconElem = $("<button>");
        //saveIconElem.text("Save");
        saveIconElem.attr("id", `buttonID_${t}`);

        // Add img to go inside the button
        let imgElem = $("<img>");
        imgElem.attr("src", "assets/images/saveIcon.png");
        saveIconElem.append(imgElem);

        timeRowTDSaveButton.append(saveIconElem);
        timeRowTDSaveButton.addClass("saveBtn");
        timeRowTDSaveButton.addClass("col-md");
        timeRowTDSaveButton.addClass("text-center");

        // Add the content to the row and table body
        let timeRowTR = $("<tr>").append(timeRowTH);
        timeRowTR.append(timeRowTDContent);
        timeRowTR.append(timeRowTDSaveButton);
        timeRowTR.addClass("row");
        $("tbody").append(timeRowTR);
    }

});

// Handles adding the class that properly colors the background for the textarea container
function addTimeClass(rowElem, rowIndex) {
    let currentHour = parseInt(moment().format("HH"));

    if (rowIndex < currentHour) {
        rowElem.addClass("past");
    } else if (rowIndex === currentHour) {
        rowElem.addClass("present");
    } else if (rowIndex > currentHour) {
        rowElem.addClass("future");
    }
}

function clearLocalStorage() {
    for (let t = 9; t < 18; t++) {
        localStorage.setItem(t, "");
    }
}

function hasDayChanged() {

    let hasDayChanged = false;
    if (localStorage.getItem("currentDay") !== moment().format("MM DD YYYY")) {
        hasDayChanged = true;
        localStorage.setItem("currentDay", moment().format("MM DD YYYY"));
    }

    return hasDayChanged;
}

$(function() {
    $("button").click(function() {
        // Gets the id we need to grab the text from the textarea
        let textareaID = $(this).attr("id").split("_")[1];
        let textareaElem = $(`#textareaID_${textareaID}`);
        localStorage.setItem(textareaID, textareaElem.val());
    });
});
