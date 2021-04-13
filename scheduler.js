// Displays the current day at the top
$(function() {
    $("#currentDay").text(moment().format("dddd MMMM do, YYYY"));
});

// Renders the rows between 9am and 5pm
$(function() {
    

    // Populates content for each row
    for (let t = 9; t < 18; t++) {
        let timeRowTH = $("<th>");
        let timeRowTDContent = $("<td>");
        let timeRowTDSaveButton = $("<td>");
        timeRowTH.attr("scope", "row");
        timeRowTH.addClass("time-block");
        
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

        let textareaMessage = localStorage.getItem(t);
        if (textareaMessage !== "" || textareaMessage !== undefined) {
            inputElem.val(textareaMessage);
        }

        timeRowTDContent.append(inputElem);
        timeRowTDContent.addClass("past"); // TODO: make this dynamic

        // TODO Add Save Icon Image to the cell
        let saveIconElem = $("<button>");
        saveIconElem.text("Save");
        saveIconElem.attr("id", `buttonID_${t}`);
        timeRowTDSaveButton.append(saveIconElem);
        timeRowTDSaveButton.addClass("saveBtn");

        // Add the content to the row and table body
        let timeRowTR = $("<tr>").append(timeRowTH);
        timeRowTR.append(timeRowTDContent);
        timeRowTR.append(timeRowTDSaveButton);
        timeRowTR.addClass("row");
        $("tbody").append(timeRowTR);
    }

})

$(function() {
    $("button").click(function() {
        //console.log($(this).attr("id"));
        // Gets the id we need to grab the text from the textarea
        let textareaID = $(this).attr("id").split("_")[1];
        let textareaElem = $(`#textareaID_${textareaID}`);
        localStorage.setItem(textareaID, textareaElem.val());
    });
});
