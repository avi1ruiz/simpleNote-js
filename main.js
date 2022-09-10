document.addEventListener("DOMContentLoaded", () => {
   //---------------------------------------------------------------------------

   // Elementos del fomulario
   const descriptionForm = document.querySelector(".form-description");
   const titleForm = document.querySelector(".form-title");
   const indexHTML = document.querySelector(".index");
   //Sección de notas
   const noteDiv = document.querySelector(".list-notes");
   //Botones
   const noteForm = document.querySelector(".submit-note");
   const updateForm = document.querySelector(".update-note");
   const deleteBtn = document.getElementsByClassName("note-delete");
   const updateBtn = document.getElementsByClassName("note-edit");
   //Almacenamiento local
   let noteStorage = window.localStorage;

   //----------------------------------------------------------------------------

   // Carga notas ya almacenadas
   if (noteStorage != null) {
      for (let i = 0; i < noteStorage.length; i++) {
         let note = JSON.parse(noteStorage.getItem(localStorage.key(i)));
         addNotes(note["title"], note["description"]);
      }
   }
   // Agregar notas
   noteForm.addEventListener("click", () => {
      let note = {
         title: titleForm.value,
         description: descriptionForm.value,
      };

      addNotes(note["title"], note["description"]);

      let storageLength = noteStorage.length;
      noteStorage.setItem(storageLength++, JSON.stringify(note));
      location.reload();
   });
   // Actualizar notas
   updateForm.addEventListener("click", () => {
      let note = {
         title: titleForm.value,
         description: descriptionForm.value,
      };

      noteStorage.setItem(indexHTML.innerHTML, JSON.stringify(note));
      location.reload();
   });
   // Elimina notas
   for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].addEventListener("click", () => {
         deleteNotes(deleteBtn[i]);
         location.reload();
      });
   }

   // Selecciona nota a editar
   for (let i = 0; i < updateBtn.length; i++) {
      updateBtn[i].addEventListener("click", () => {
         updateNote(updateBtn[i]);
      });
   }

   //----------------------------------------------------------------------------

   // Funciones principales
   function updateNote(i) {
      let index = Array.from(updateBtn).indexOf(i);
      let noteIndex = noteStorage.key(index);
      let note = JSON.parse(noteStorage.getItem(noteIndex));

      titleForm.value = note.title;
      descriptionForm.innerHTML = note.description;
      indexHTML.innerHTML = noteIndex;
   }

   function deleteNotes(i) {
      let index = Array.from(deleteBtn).indexOf(i);
      noteStorage.removeItem(noteStorage.key(index));
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
});
