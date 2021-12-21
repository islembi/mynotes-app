import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import ModalNotes from "./../ModalNotes/ModalNotes"
import { Markdown } from "react-showdown"

export default function Notes({ carnet, carnets}) {
  return (
    <div>
      <h2>{carnet.titre}</h2>
      <ModalNotes carnet={carnet} carnets={carnets} />
      {carnet.notes.map((note) => {
        return (
          <div key={note.id}>
            <h3>{note.titre}</h3>
            <h5>{note.categorie}</h5>
            <Markdown className="markdown" markup={note.text} />
          </div>
        )
      })}
    </div>
  )
}
