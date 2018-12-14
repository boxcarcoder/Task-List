// Assigning variables using the jQuery selector, $()
// $() fetches an item from the page (.HTML), specified by a class, id, or tag of the element(s) requested 
var myLiTemplate = $('#myListTemplate .myLi')
var myUL = $('#myUnorderedList')

// Append a li submission to our list, myUnorderedList
// all functions in enterNewTask are jQuery functions
var enterNewTask = function(liData) {
    // create a li by using the template defined in .HTML so we can append to our list
    var myLi = myLiTemplate.clone();   

    // populate our new li with liData received from user input
    myLi.attr('data-id', liData.id); 
    myLi.find('.myLiDescription').text(liData.myLiDescription);

    if(liData.completed) {
        myLi.addClass('completed');
    }

    myUL.append(myLi);
}

// Fetch the list, listOnServer, from a server. 
// Every time toDoList.js is loaded, e.g. refreshed, the browser will run the Javascript in this file.
// So every time we refresh the page, our Javascript makes a request to the server, which responds with myTaskList 
var loadRequest = $.ajax({
        type: 'GET',
        url: "https://listalous.herokuapp.com/lists/listOnServer/" //the server: https://listalous.herokuapp.com/
})


// Add data from the server (listOnServer) to our own list (myUnorderedList)
loadRequest.done(function(dataFromServer) { // dataFromServer is an Event object that represents the event being executed which causes this function to execute
        var listFromServer = dataFromServer.items;

        // forEach() executes a provided function once for each array element
        // For each item in listFromServer (liData), we run enterNewTask to add each item to our list
        listFromServer.forEach(function(liData) { // liData is also an event object
                enterNewTask(liData);
        })
})

// Ask the server to save a li submission into the DB
$('#myForm').on('submit', function(e) { // attach a submit event to the myForm element

  // preventDefault() stops the default action of an element from happening
  // prevents the page from refreshing until a li submission
  e.preventDefault()

  // just to make .on() more clear to understand
  alert("myForm had a submission");
  
  var myUserInputLi = e.target.userInputLi.value

  var creationRequest = $.ajax({
     type: 'POST',
     url: "https://listalous.herokuapp.com/lists/listOnServer/items",
     data: { description: liDescription, completed: false }
   })

  creationRequest.done(function(itemDataFromServer) {
    enterNewTask(itemDataFromServer)
  })
})




















/* Reference for study 
 *
 * https://stackoverflow.com/questions/35936365/what-exactly-is-the-parameter-e-event-and-why-pass-it-to-javascript-functions?newreg=4286f21587cc4428ba5a5a7b5a2db0c0
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
 *
 *
 */


/*

Old, pure JS, code that creates tasks locally. 
Discarded to use jQuery library to talk to a server and DB.

// Check's keyboard input for space bar. 
document.body.onkeyup = function(e) {
    // e is an Event object that represents the event being executed which causes this function to execute
    // In this case, e is a key press. 
    // When there is a keypress, this function will execute.
    if (e.keyCode == 13) { //the keyCode of our event. 13 is spacebar in ascii.
        enterNewTask();
    }
};

// Add a task to a list
function enterNewTask() {
                
    //get the value of the input id, myInput, from the HTML file
    var myTask = document.getElementById("userInput").value;

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
    document.getElementById("userInput").value = "";

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
*/
