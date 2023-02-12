
export default class noteAPI{
   static getNotes(){
        const allNotes=JSON.parse(localStorage.getItem('notes')) || [];
        return allNotes.sort((a,b)=>{
            return new Date(a.updated)>new Date(b.updated)?-1:1;
        })
    }
    static saveNote(sendNote){
        const allNotes=noteAPI.getNotes();
        const isInLocal=allNotes.find((e)=>e.id==sendNote.id);
        if (isInLocal) {
            isInLocal.updated=new Date().toISOString();
            isInLocal.title=sendNote.title;
            isInLocal.body=sendNote.body;
        } else {
            sendNote.id=new Date().getTime();
            sendNote.updated=new Date().toISOString();
            allNotes.push(sendNote);
        };
        localStorage.setItem("notes",JSON.stringify(allNotes));
    }
    static delet(id){
        const allNotes=noteAPI.getNotes();
        const notesFilter=allNotes.filter(e=>e.id!=id) ;
        localStorage.setItem("notes",JSON.stringify(notesFilter));
    }
};