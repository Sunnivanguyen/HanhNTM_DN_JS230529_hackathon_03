"use strict";
const inputContent = document.getElementById("input__content");
const outputContainer = document.getElementById("output__field");
const lableContent = document.getElementById("note__content");
const btnAddNote = document.getElementById("btn_add");
const btnDeleteNote = document.getElementById("btn_delete");
class Note {
    constructor(id, content) {
        this.id = id;
        this.content = content;
    }
}
const notes = [];
function displayNotes() {
    inputContent.textContent = "";
    outputContainer.textContent = "";
    const notes = JSON.parse(localStorage.getItem("notesData") || "[]");
    notes.forEach(function (item) {
        const html = `<div class="note--card">
      <ion-icon
        name="trash-outline"
        class="delete--note"
        id="btn_delete"
        onclick="deleteNote(${item.id})"
      ></ion-icon>
      <p class="note--content" id="note__content">${item.content}</p>
    </div>`;
        outputContainer.insertAdjacentHTML("afterbegin", html);
        console.log(outputContainer);
    });
}
displayNotes();
btnAddNote.addEventListener("click", function () {
    const id = new Date().getTime();
    const note = new Note(id, inputContent.value);
    localStorage.setItem("currentNoteData", JSON.stringify(note));
    if ((notes.length = 0)) {
        notes.push(note);
        localStorage.setItem("notesData", JSON.stringify(notes));
        console.log(notes);
        displayNotes();
    }
    else {
        const notes = JSON.parse(localStorage.getItem("notesData") || "[]");
        notes.push(note);
        localStorage.setItem("notesData", JSON.stringify(notes));
        console.log(notes);
        displayNotes();
    }
});
function deleteNote(id) {
    let notes = JSON.parse(localStorage.getItem("notesData") || "[]");
    notes = notes.filter((item) => item.id !== id);
    localStorage.setItem("notesData", JSON.stringify(notes));
    displayNotes();
}
