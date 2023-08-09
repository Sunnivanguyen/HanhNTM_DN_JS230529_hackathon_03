const inputContent = document.getElementById(
  "input__content"
) as HTMLInputElement;
const outputContainer = document.getElementById("output__field") as HTMLElement;
const lableContent = document.getElementById("note__content") as HTMLElement;
const btnAddNote = document.getElementById("btn_add") as HTMLElement;
const btnDeleteNote = document.getElementById("btn_delete") as HTMLElement;

interface NoteType {
  id: number;
  content: string;
}

class Note implements NoteType {
  content;
  id;
  constructor(id: number, content: string) {
    this.id = id;
    this.content = content;
  }
}

type NoteObject = {
  id: number;
  content: string;
};

const notes: NoteObject[] = [];

function displayNotes() {
  inputContent.textContent = "";
  outputContainer.textContent = "";

  const notes = JSON.parse(localStorage.getItem("notesData") || "[]");
  notes.forEach(function (item: NoteObject) {
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
  } else {
    const notes = JSON.parse(localStorage.getItem("notesData") || "[]");
    notes.push(note);
    localStorage.setItem("notesData", JSON.stringify(notes));
    console.log(notes);
    displayNotes();
  }
});

function deleteNote(id: number) {
  let notes = JSON.parse(localStorage.getItem("notesData") || "[]");
  notes = notes.filter((item: NoteObject) => item.id !== id);
  localStorage.setItem("notesData", JSON.stringify(notes));
  displayNotes();
}
