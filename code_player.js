var buttonIds = ["#html_button", "#css_button", "#js_button", "#output_button"];
$("#choices").buttonset();

function updateOutput() {
    $("iframe").contents().find("html").html("<html><head><style type='text/css'>" + $("#css_area").val() + "</style></head><body>" + $("#html_area").val() + "</body></html>");

    document.getElementById("output_area").contentWindow.eval($("#js_area").val()); 
    //Beware, eval() is dangerous to use in actual production!
}

function resizeTextAreas(checkedButtons, percentage) {
    for (var i = 0; i < checkedButtons.length; i++) {
        //$(checkedButtons[i]).css("width", "50%"); //Watch out, it's the INPUT ID you wanna select, not the button id!!
        var button = checkedButtons[i].slice(0, checkedButtons[i].indexOf("_"));
        $(button + "_area").css("width", percentage);
    }
}

function textAreaSizesPress(checkedButtons, inputId) {
    if (checkedButtons.length == 0) {
        //If no other buttons are checked, make the width of the textarea corresponding to the button 
        //just pressed 100% of the available screen
        $(inputId).css("width", "100%");
    }
    else if (checkedButtons.length == 1) {
        //If one other button is checked, then make the width of the textarea corresponding to the button
        //just pressed 1/2 of the available screen. Next, loop through the other inputs and make the width 
        //of the one that is checked 1/2 also     
        $(inputId).css("width", "50%");
        resizeTextAreas(checkedButtons, "50%");
    }
    else if (checkedButtons.length == 2) {
        //If two other buttons are checked, then make the width of the textarea corresponding to the button
        //just pressed 1/3 of the available screen. Next, loop through the other inputs and make the width of 
        //the one that is checked 1/3 also.
        $(inputId).css("width", "33.33%");
        resizeTextAreas(checkedButtons, "33.33%");
    }
    else if (checkedButtons.length == 3) {
        //If three other buttons are checked, then make the width of the textarea corresponding to the button
        //just pressed 1/4 of the available screen. Next, loop through the other inputs and make the width of 
        //the one that is checked 1/4 also.
        $(inputId).css("width", "25%");
        resizeTextAreas(checkedButtons, "25%");
    }
}

function textAreaSizesUnpress(checkedButtons, inputId) {
    if (checkedButtons.length == 1) {
        resizeTextAreas(checkedButtons, "100%");
    }
    else if (checkedButtons.length == 2) {
        resizeTextAreas(checkedButtons, "50%");
    }
    else if (checkedButtons.length == 3) {
        resizeTextAreas(checkedButtons, "33.33%");
    }
}

function handleCheck(buttonId, inputId) {
    var checkedButtons = [];
    if ($(buttonId).prop("checked")) {  //Occurs right when this button is checked     
        $(inputId).css("display", "block");
        for (var i = 0; i < buttonIds.length; i++) {
            if (buttonIds[i] != buttonId && $(buttonIds[i]).prop("checked")) {
                checkedButtons.push(buttonIds[i]);
            }
        }                    
        textAreaSizesPress(checkedButtons, inputId);
    }                
    else {
        $(inputId).css("display", "none");
        for (var i = 0; i < buttonIds.length; i++) {
            if (buttonIds[i] != buttonId && $(buttonIds[i]).prop("checked")) {
                checkedButtons.push(buttonIds[i]);
            }
        }  

        textAreaSizesUnpress(checkedButtons, inputId);                    
    } 
}

$("#html_button").click(function() { handleCheck("#html_button", "#html_area"); });
$("#css_button").click(function() { handleCheck("#css_button", "#css_area"); });
$("#js_button").click(function() { handleCheck("#js_button", "#js_area"); });
$("#output_button").click(function() { handleCheck("#output_button", "#output_area"); });

updateOutput(); //Call updateOutput() here so that our initial code in the panels show up
$("textarea").on('change keyup paste', function() {
    updateOutput(); 
});