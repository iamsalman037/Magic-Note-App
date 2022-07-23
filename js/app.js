console.log("Welcome to Notes App");
//Calling shownotes upon page load
showNotes();

// If user adds a note add it to the local storage
// e is the event object
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addTxt = document.getElementById("addTxt");
  // Getting notes if there are any notes already present in the local storage
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    //If notes is null
    notesObj = [];
  } else {
    //If you find any string then parse it.
    notesObj = JSON.parse(notes);
  }
  //Push the text value into Notes element.
  notesObj.push(addTxt.value);
  //Converting the notes to string as arrays cannot be stored in local storage.
  localStorage.setItem("notes", JSON.stringify(notesObj));
  //Updating the value of text area to blank after the notes are added to both the container and the local storage
  addTxt.value = "";
  console.log(notesObj);
  showNotes();
});

//Function used to display the notes card elements upon click of add note button
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    //If notes is null
    notesObj = [];
  } else {
    //If you find any string then parse it.
    notesObj = JSON.parse(notes);
  }

  //Create an empty string
  let html = "";

  notesObj.forEach(function (element, index) {
    // Passing the note card to the notes container
    // Adding a id of index value to the button to identify which delete button was clicked and adding a onclick call
    // to deleteNote function by passing it the id of the button.
    html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onClick = "deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`;
  });
  let notesElem = document.getElementById("notes");
  //Checking the notes length and adding it to the card container
  if (notesObj.length != 0) {
    notesElem.innerHTML = html;
  } else {
    notesElem.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

//function to delete a note card upon clicking on delete note button
function deleteNote(index) {
  //console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    //If notes is null
    notesObj = [];
  } else {
    //If you find any string then parse it.
    notesObj = JSON.parse(notes);
  }
  //Removing array elements using splice
  //1st parameter is index(starting point) and second is the number of elements to be removed.
  notesObj.splice(index, 1);
  //Updating the local storage with the updated notesObj in which the element is removed.
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}

//Getting the element for the search bar
let search = document.getElementById("searchTxt");
//Adding an event listener for the search bar
search.addEventListener("input", function (e) {
  //console.log("Input Event Fired");
  //Getting the value of the search bar
  let inputVal = search.value.toLowerCase();
  //console.log(inputVal);
  //Getting all the elements whose class name is noteCard
  let noteCards = document.getElementsByClassName("noteCard");
  //Traversing through elements and getting the paragraph tag from the element
  Array.from(noteCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText;
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
    //console.log(cardTxt);
  });
});

/* Further Improvements
1. Add Title - Add a title to notes and search by title should also be available
2. Mark a Note as Important - Add a mark important button for note cards and make it red upon click
3. Separate notes by user
4. Sync and host to web server
*/