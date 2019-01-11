// Assigning variables using the jQuery selector, $().
// $() fetches an item from the page (.HTML), specified by a class, id, or tag of the element(s) requested.
var myLiTemplate = $('#myListTemplate .myLi')
var myUL = $('#myUnorderedList') //the list of our page
var userInputBox = $('#userInputID') 
var listFromServer = [];

// Append a li submission to our list, myUnorderedList, which is the list of our page.
// All functions in addTasktoPage are jQuery functions.
var addTasktoPage = function(liData) {
    // create a li by using the template defined in .HTML so we can append to our list
    var myLi = myLiTemplate.clone();   

    // populate our new li with liData received from user input
    myLi.attr('id', liData._id); // _id is from mongoDB. liData is from mongoDB. 
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
    url: "http://localhost:3000/list/" 
})


// When the pull is successful, update our page with the data from the DB.
pullRequest.done(function(dataFromServer) { 
    listFromServer = dataFromServer;
    console.log("listFromServer: " + listFromServer);

    // forEach() executes a provided function once for each array element
    listFromServer.forEach(function(liData) { 
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
    e.preventDefault();
  
    // get the value of userInput from the event (submitting in myForm)  
    var myUserInput = e.target.userInput.value;



    //console.log('TEST: ' + testvar2);

    
    //$('#myListTemplate .myLi .delete-button') = &#10008; 

    // Push the user input onto the server
    var pushRequest = $.ajax({
        type: 'POST',
        url: "http://localhost:3000/list/",
        data: { description: myUserInput }
    })

    // When the push is successful, update our page with the newly received data
    pushRequest.done(function(itemDataFromServer) {
        addTasktoPage(itemDataFromServer)
    })
    
})


// When a task is clicked, it will be marked as complete.
$('#myUnorderedList').on('click', '.description', function(event) { 
        
    // Retrieve the li that has been clicked.                                                                
    let myLi = $(event.target).parent()

    console.log(event.target);

    // Retrieve the completion status of the li.
    let isItemCompleted = myLi.hasClass('completed')
    
    // Retrieve the id # of the li (which was assigned when we push a task to the DB).
    let itemId = myLi.attr('id') // myLi's id is defined in the HTML 
        
    // Update the task's completion status onto the DB.
    let updateRequest = $.ajax({
        type: 'PUT',
        url: "http://localhost:3000/list/" + itemId,  
        data: { completed: !isItemCompleted }
     }) 
    
    console.log('itemId: ' + itemId),
    
    // When the update is successful, check the newly received data from the DB
    updateRequest.done(function(itemData) {
        if (itemData.completed) {
          myLi.addClass('completed')
        } 
        else {
          myLi.removeClass('completed')
        }
    })

})



// Remove a task from the list
$('#myUnorderedList').on('click', '.delete-button', function(e) {

       // Retrieve the li that has been clicked.                                                                
    let myLi = $(e.target).parent();
   
     // Retrieve the id # of the li (which was assigned when we push a task to the DB).
    let itemId = myLi.attr('id');

    // Update the task's completion status onto the DB.
    let updateRequest = $.ajax({
        type: 'DELETE',
        //url: "https://listalous.herokuapp.com/lists/listOnServer/items/" + itemId,
        url: "http://localhost:3000/list/" + itemId 

   })

   updateRequest.done(function(dataFromServer) {
        let pullRequest = $.ajax({
                type: 'GET',
                url: "http://localhost:3000/list/"    
        })
            
        pullRequest.done(function(dataFromServer) { 
                
                // clear tasks from local page first
                clearPage(dataFromServer);

                // get tasks located on DB (missing the deleted task now) 
                listFromServer = dataFromServer;
                
                // for each task, draw onto local page
                listFromServer.forEach(function(liData) { // liData is also an event object
                     addTasktoPage(liData);
                })
               //alert("redrew list");
        })
    }) 
})

// Check's keyboard input for enter. 
document.body.onkeyup = function(e) {
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


