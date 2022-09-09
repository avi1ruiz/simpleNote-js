document.addEventListener("DOMContentLoaded", () => {

    const noteDiv = document.querySelector(".list-notes")
    const noteForm = document.forms["input"];
    const deleteBtn = document.getElementsByClassName("note-delete")
    let noteStorage = window.localStorage;

    // Agregar notas
    noteForm.addEventListener("submit", (e) => {
        let titleForm = document.querySelector(".form-title").value
        let descriptionForm = document.querySelector(".form-description").value

        let note = {
            title: titleForm,
            description: descriptionForm
        }
        
        addNotes(note["title"], note["description"])

        let storageLength = noteStorage.length
        noteStorage.setItem(storageLength++, JSON.stringify(note))
    })

    // Carga notas ya almacenadas
    if(noteStorage != null) {
        for ( let i = 0; i < noteStorage.length; i++) {
            let note = JSON.parse(noteStorage.getItem(localStorage.key(i)))
            addNotes(note["title"], note["description"])
        }
    } 

    // Elimina notas
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', () => {
            
            let index = Array.from(deleteBtn).indexOf(deleteBtn[i])

            if ( noteStorage.length == 1 ) {
                noteStorage.clear();
            } 

            if ( index != noteStorage.key(index) ) {
                noteStorage.removeItem(noteStorage.key(index))
                location.reload()
                return
            }

            noteStorage.removeItem(index)
            location.reload()

        })
    }

    
    function addNotes(title, description) {
        const noteHTML = `
            <div class="note">
                <div class="note-information">
                    <h1 class="note-title">${title}</h1>
                    <p class="note-description">${description}</p>
                    <!--<p class="note-createAt"></p>-->
                </div>
                <div class="note-button">
                    <button class="note-delete btn">
                        <i class="fa-sharp fa-solid fa-trash"></i>
                    </button>
                <button class="note-edit btn">
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                </div>
            </div>
        `;

        noteDiv.insertAdjacentHTML("beforeend", noteHTML);
    }
    

})