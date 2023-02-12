import noteAPI from "./noteAPI.js";
import notesView from "./notesView.js";

export default class app {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.root = new notesView(root, this._handlers());
    this._refreshNotes();
  }
  _refreshNotes() {
    const notes = noteAPI.getNotes();
    this.setNote(notes);
    if (notes.length > 0) {
      this.setUpdateNote(notes[0]);
    }
  }
  setUpdateNote(note) {
    this.activeNote = note;
    this.root.selectedNote(note);
  }
  setNote(notes) {
    this.notes = notes;
    this.root.displayNote(notes);
    this.root.updatedNotevosobility(notes.length > 0);
  }
  _handlers() {
    return {
      addNote: () => {
        const newNote = {
          title: "تایتل ",
          body: "بنویسید...",
        };
        noteAPI.saveNote(newNote);
        this._refreshNotes();
      },
      value: (newtitle, newbody) => {
        noteAPI.saveNote({
          id: this.activeNote.id,
          title: newtitle,
          body: newbody,
        });
        this._refreshNotes();
      },
      selected: (id) => {
        const findNote = this.notes.find((e) => e.id == id);
        this.setUpdateNote(findNote);
      },
      delet: (id) => {
        noteAPI.delet(id);
        this._refreshNotes();
      },
    };
  }
}
