
/*
 * Check's keyboard input for space bar. 
 * 13 is spacebar in ascii
 */

document.body.onkeyup = function(e) {
    // e is an Event object that represents the event being executed which
    // caused this function to be executed.
    // In this case, e is a key press.
    if (e.keyCode == 13) {
        enterNewTask();
    }
};

/*
 * Add a task to a list
 *
 */

function enterNewTask() {
                
    //get the value of the input id, myInput, from the HTML file
    var myTask = document.getElementById("myInput").value;

    //create an element of type li
    //li is an object of a list ( number/bullet of a list ) 
    var myLi = document.createElement("li");
    
    //assign myTask to myLi
    myLi.appendChild(document.createTextNode("- " + myTask));
    
    //get the ul id, myList, from the HTML file
    var myUL = document.getElementById("myUnorderedList");

    //add myLi (with myTask) to myUL    
    myUL.appendChild(myLi);

    //-----------------------------------------------------------
    
    //after adding a task to the list, clear the task from the input id
    document.getElementById("myInput").value = "";

    //to remove a task, click on the task
    //removeTask is a callback function for the JS engine to execute when there is a click on myLi
    //e is an event object used by the JS engine, not an argument of our callback function
    myLi.onclick = removeTask;

}

function removeTask(e) {
    // e is an Event object that represents the event being executed which
    // caused this function to be executed.
    // In this case, e is a mouse click.
    
    // we use the event object so we have access to its details
    // in this case, to remove the event's child
    e.target.parentElement.removeChild(e.target);

}


// Fetch the list, myTaskList, from the server 
var loadRequest = $.ajax({
        type: 'GET',
        url: "https://listalous.herokuapp.com/lists/myTaskList/" //the server: https://listalous.herokuapp.com/
})

l

loadRequest.done(function(dataFromServer) {
        var itemsData = dataFromServer.items

        itemsData.forEach(function(itemData) {
                enterNewTask();
            })
})

/* Reference for study 
 *
 * https://stackoverflow.com/questions/35936365/what-exactly-is-the-parameter-e-event-and-why-pass-it-to-javascript-functions?newreg=4286f21587cc4428ba5a5a7b5a2db0c0
 *
 *
 *
 */

