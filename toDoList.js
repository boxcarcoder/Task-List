// Assigning variables using the jQuery selector, $()
// $() fetches an item from the page (.HTML), specified by a class, id, or tag of the element(s) requested 
var myLiTemplate = $('#myListTemplate .myLi')
var myUL = $('#myUnorderedList') //the list of our page

// Append a li submission to our list, myUnorderedList, which is the list of our page
// all functions in addTasktoPage are jQuery functions
var addTasktoPage = function(liData) {
    // create a li by using the template defined in .HTML so we can append to our list
    var myLi = myLiTemplate.clone();   

    // populate our new li with liData received from user input
    myLi.attr('data-id', liData.id); 
    myLi.find('.description').text(liData.description);

    if(liData.completed) {
        myLi.addClass('completed');
    }

    myUL.append(myLi);
}

// Retrieve data (listOnServer) from the DB 
var pullRequest = $.ajax({
    type: 'GET',
    url: "https://listalous.herokuapp.com/lists/listOnServer/" //the server: https://listalous.herokuapp.com/
})


// When the pull is successful, update our page with the received data
pullRequest.done(function(dataFromServer) { // dataFromServer is an Event object: represents the event that triggers this function
    var listFromServer = dataFromServer.items;

    // forEach() executes a provided function once for each array element
    // For each item (liData) in listFromServer, we run addTasktoPage to add each item to our page 
    listFromServer.forEach(function(liData) { // liData is also an event object
        addTasktoPage(liData);
    })
})

// Add task to DB. 
$('#myForm').on('submit', function(e) { // Add an event listener

    // preventDefault() stops the default action of an element from happening
    // prevents the page from refreshing until a li submission
    e.preventDefault()

    // just to make .on() more clear to understand
    alert("myForm had a submission");
  
    // get the value of userInput from the event (submitting in myForm)  
    var myUserInput = e.target.userInput.value

    // Push the user input onto the server
    var pushRequest = $.ajax({
        type: 'POST',
        url: "https://listalous.herokuapp.com/lists/listOnServer/items",
        data: { description: myUserInput, completed: false }
    })

    // When the push is successful, update our page with the newly received data
    pushRequest.done(function(itemDataFromServer) {
        addTasktoPage(itemDataFromServer)
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
        addTasktoPage();
    }
};

// Add a task to a list
function addTasktoPage() {
                
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
