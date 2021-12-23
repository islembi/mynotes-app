import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import "./Notes.css"
import ModalNotes from "./../ModalNotes/ModalNotes"
import { Markdown } from "react-showdown"

export default function Notes({ setCarnet, carnet, carnets }) {
  const modifierNote = (id, inputTitreNote, categorie, inputMarkdown) => {
    const findNote = carnet.notes.find((x) => x.id === id)
    findNote.titre = inputTitreNote
    findNote.categorie = categorie
    findNote.text = inputMarkdown
    findNote.id = id
    setCarnet({ notes: findNote, ...carnet })
    localStorage.setItem("carnets", JSON.stringify(carnets))
  }
  return (
    <div>
      <h2>{carnet.titre}</h2>
      <ModalNotes
        titreButtonPrincipal="Ajouter Note"
        titreButtonSecondaire="Ajouter"
        carnet={carnet}
        carnets={carnets}
        setCarnet={setCarnet}
      />
      <div className="container bootstrap snippets bootdeys">
        <div className="row">
          {carnet.notes.map((note) => {
            return (
              <div key={note.id} className="col-md-4 col-sm-6 content-card">
                <div className="card-big-shadow">
                  <div
                    className="card card-just-text"
                    data-background="color"
                    data-color={
                      note.categorie === "Secondaire"
                        ? "green"
                        : note.categorie === "Important"
                        ? "yellow"
                        : "orange"
                    }
                    data-radius="none"
                  >
                    <div className="content">
                      <h6 className="category">{note.titre}</h6>
                      <h4 className="title">{note.categorie}</h4>
                      <Markdown
                        className="description text-center"
                        markup={note.text}
                      />
                    </div>
                    <ModalNotes
                      titreButtonSecondaire="Modifier"
                      titreButtonPrincipal="Modifier"
                      note={note}
                      carnet={carnet}
                      carnets={carnets}
                      modifierNote={modifierNote}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
