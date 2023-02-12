export default class notesView {
  constructor(app, handlers) {
    this.root = app;
    const { addNote, value, selected, delet } = handlers;
    this.addNote = addNote;
    this.value = value;
    this.selected = selected;
    this.delet = delet;

    this.root.innerHTML = ` <nav class="nav">
        <div class="nav__logo">note app</div>
        <div class="nav__note"></div>
        <button class="nav__add">add note</button>
       </nav>
        <div class="nots">
        <input type="text" class="input-title" placeholder="متن را وارد کنید">
        <textarea class="input-body" placeholder="متن خودرا وارد کنید ..."></textarea>
      </div>`;

    const navAdd = this.root.querySelector(".nav__add");
    const inputTitle = this.root.querySelector(".input-title");
    const inputBody = this.root.querySelector(".input-body");

    navAdd.addEventListener("click", () => {
      this.addNote();
    });

    [inputTitle, inputBody].forEach((item) => {
      item.addEventListener("blur", () => {
        const title = inputTitle.value.trim();
        const body = inputBody.value.trim();
        this.value(title, body);
      });
    });
    this.updatedNotevosobility(false);
  }

  _innerHtmlNote(id, title, body, updated) {
    const max_body = 20;
    const max_Title = 7;
    return `<div class="nav__note-text" data-id=${id}>
        <div class="nav-header">
        <div class="nav__small-note">  
        ${title.substring(0, max_Title)}
        ${title.length > max_body ? "..." : ""}
        </div>
        <span class="nav-trash" data-id=${id}><i class="fa-solid fa-trash"></i></span>
        </div>
        <div class="nav__small-body">
         ${body.substring(0, max_body)}
         ${body.length > max_body ? "..." : ""}
        </div>
        <div class="nav__time">${new Date(updated).toLocaleString("en", {
          dateStyle: "full",
          timeStyle: "short",
        })}</div>
        </div>`;
  }
  displayNote(notes) {
    const navNote = this.root.querySelector(".nav__note");

    navNote.innerHTML = "";
    let result = "";

    for (const note of notes) {
      const { id, title, body, updated } = note;
      const Html = this._innerHtmlNote(id, title, body, updated);
      result += Html;
    }
    navNote.innerHTML = result;
    navNote.querySelectorAll(".nav__note-text").forEach((item) => {
      item.addEventListener("click", () => {
        this.selected(item.dataset.id);
      });
    });
    navNote.querySelectorAll(".nav-trash").forEach((item) => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        this.delet(item.dataset.id);
      });
    });
  }
  selectedNote(note) {
    this.root.querySelector(".input-title").value = note.title;
    this.root.querySelector(".input-body").value = note.body;
    this.root.querySelectorAll(".nav__note-text").forEach((item) => {
      item.classList.remove("nav__note-text-selected");
    });
    this.root
      .querySelector(`.nav__note-text[data-id='${note.id}']`)
      .classList.add("nav__note-text-selected");
  }
  updatedNotevosobility(visible) {
    this.root.querySelector(".nots").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
