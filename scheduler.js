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
        timeRowTH.attr("scope", "row")
        //console.log(t);
        let hour = t;
        if (hour > 12) {
            hour = hour - 12;
            console.log(hour);
            timeRowTH.text(hour + " PM");
        } else {
            console.log(hour);
            timeRowTH.text(hour + " AM");
        }

        timeRowTDContent.text("content placeholder");
        timeRowTDSaveButton.text("button placeholder");
        let timeRowTR = $("<tr>").append(timeRowTH);
        timeRowTR.append(timeRowTDContent);
        timeRowTR.append(timeRowTDSaveButton);
        $("tbody").append(timeRowTR);
    }

})