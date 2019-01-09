// Assigning variables using the jQuery selector, $().
// $() fetches an item from the page (.HTML), specified by a class, id, or tag of the element(s) requested.
var myLiTemplate = $('#myListTemplate .myLi')
var myUL = $('#myUnorderedList') //the list of our page
var userInputBox = $('#userInputID') 

// Append a li submission to our list, myUnorderedList, which is the list of our page.
// All functions in addTasktoPage are jQuery functions.
var addTasktoPage = function(liData) {
    // create a li by using the template defined in .HTML so we can append to our list
    var myLi = myLiTemplate.clone();   

    // populate our new li with liData received from user input
    myLi.attr('data-id', liData._id); // _id is from mongoDB. liData is from mongoDB. 
    myLi.find('.description').text(liData.description);

    if(liData.completed) {
        myLi.addClass('completed');
    }

    console.log("myLi: " + myLi);
    myUL.append(myLi);
}

// Retrieve data (listOnServer) from the DB. 
var pullRequest = $.ajax({
    type: 'GET',
    //url: "https://listalous.herokuapp.com/lists/listOnServer/" //the server: https://listalous.herokuapp.com/
    url: "http://localhost:3000/list/" 
})


// When the pull is successful, update our page with the data from the DB.
pullRequest.done(function(dataFromServer) { // dataFromServer is an Event object: represents the event that triggers this function
    var listFromServer = dataFromServer;
    console.log("listFromServer: " + listFromServer);

    // forEach() executes a provided function once for each array element
    // For each item (liData) in listFromServer, we run addTasktoPage to add each item to our page 
    listFromServer.forEach(function(liData) { // liData is also an event object
        addTasktoPage(liData);
        console.log("liData: " + liData.description);
    })
})


// Clear page of tasks.
var clearPage = function(e) {
    myUL.empty();
}



// Add task to DB. 
$('#myForm').on('submit', function(e) { // Add an event listener

    // preventDefault() stops the default action of an element from happening
    // prevents the page from refreshing until a li submission
    e.preventDefault()

    // just to make .on() more clear to understand
    // alert("myForm had a submission");
  
    // get the value of userInput from the event (submitting in myForm)  
    var myUserInput = e.target.userInput.value

    // Push the user input onto the server
    var pushRequest = $.ajax({
        type: 'POST',
        //url: "https://listalous.herokuapp.com/lists/listOnServer/items",
        url: "http://localhost:3000/list/",
        data: { description: myUserInput }
    })

    // When the push is successful, update our page with the newly received data
    pushRequest.done(function(itemDataFromServer) {
        addTasktoPage(itemDataFromServer)
    })
})


// When a task is clicked, it will be marked as complete.
$('#myUnorderedList').on('click', '.description', function(event) { // 2nd argument of jQuery's .on() specifies that the event handler
                                                                    // should only be attached to the specified child element.
    // Retrieve the li that has been clicked.                                                                
    let myLi = $(event.target).parent()

    console.log(event.target);

    // Retrieve the completion status of the li.
    let isItemCompleted = myLi.hasClass('completed')
    
    // Retrieve the id # of the li (which was assigned when we push a task to the DB).
    let itemId = myLi.attr('data-id') //data-id is defined in the HTML 
        
    // Update the task's completion status onto the DB.
    let updateRequest = $.ajax({
        type: 'PUT',
        //url: "https://listalous.herokuapp.com/lists/listOnServer/items/" + itemId,
        url: "http://localhost:3000/list/" + itemId,  
        data: { completed: !isItemCompleted }
     }) 
    
    console.log('itemId: ' + itemId),
    
    // When the update is successful, check the newly received data from the DB
    updateRequest.done(function(itemData) {
        if (itemData.completed) {
          myLi.addClass('completed')
          //alert(itemId + ": completed" )
        } 
        else {
          myLi.removeClass('completed')
          //alert(itemId + ": not completed" )
        }
    })

})



// Remove a task from the list
$('#myUnorderedList').on('click', '.delete-button', function(e) {

       // Retrieve the li that has been clicked.                                                                
    let myLi = $(e.target).parent();
   
     // Retrieve the id # of the li (which was assigned when we push a task to the DB).
    let itemId = myLi.attr('data-id');

    // Update the task's completion status onto the DB.
    let updateRequest = $.ajax({
        type: 'DELETE',
        //url: "https://listalous.herokuapp.com/lists/listOnServer/items/" + itemId,
        url: "http://localhost:3000/list/" + itemId 

        //success: function(result) {
                //alert ("deleted");
               
        //}
    })

 /*   updateRequest.done(function(dataFromServer) {
        
        
        let pullRequest = $.ajax({
                type: 'GET',
                //url: "https://listalous.herokuapp.com/lists/listOnServer/" //the server: https://listalous.herokuapp.com/
                url: "http://localhost:3000/list/"    
        })
        
            
        pullRequest.done(function(dataFromServer) { 
                
                // clear tasks from local page first
                clearPage(dataFromServer);


                // get tasks located on DB (missing the deleted task now) 
                let listFromServer = dataFromServer.items;

                // for each task, draw onto local page
                listFromServer.forEach(function(liData) { // liData is also an event object
                     addTasktoPage(liData);
                })
               //alert("redrew list");
        })
    }) */
})

// Check's keyboard input for enter. 
document.body.onkeyup = function(e) {
    // e is an Event object that represents the event being executed which causes this function to execute
    // In this case, e is a key press. 
    // When there is a keypress, this function will execute.
    if (e.keyCode == 13) { //the keyCode of our event. 13 is spacebar in ascii.
       document.getElementById('userInputID').value=''; 
    }
};












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
