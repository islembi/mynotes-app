import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import ModalNotes from "./../ModalNotes/ModalNotes"
import { Markdown } from "react-showdown" 

export default function Notes({ carnet, carnets, deleteNote}) {

  
  return (
    <div>
      <h2>{carnet.titre}</h2>
      <ModalNotes carnet={carnet}
      id={carnet.id}
      carnets={carnets}
       />
      {carnet.notes.map((note) => {
        return (
          <div key={note.id}>
            <h3>{note.titre}</h3>
            <h5>{note.categorie}</h5>
            <Markdown className="markdown" markup={note.text} />
            <p className="card-text">
            <button
              onClick={() => deleteNote(carnet.id, note.id)} 
              className="btn btn-sm btn-danger "
            >
              Supprimer
            </button>
          </p>

          </div>
        )
      })}
    </div>
  )
}
