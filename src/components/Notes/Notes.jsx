import React from "react"
import "bootstrap/dist/css/bootstrap.css"
import "./Notes.css"
import ModalNotes from "./../ModalNotes/ModalNotes"
import { Markdown } from "react-showdown"
import { useState } from "react"
import { Form } from "react-bootstrap"
import "./Notes.css"
import { sortBy } from "lodash"

export default function Notes({ carnet, carnets }) {
  const [sear, setSearshing] = useState("")
  const [search, setSearsh] = useState("")
  const tmp = carnet.notes

  // Fonction recherche
  function searching(strSear, strMysearch, list) {
    let res = [...list]
    if (strMysearch != "") {
      res = res.filter((note) => {
        if (strMysearch.toLowerCase() === note.categorie.toLowerCase())
          return note
      })
    }

    res = res.filter((mesnote) => {
      let searchMini = strSear.toLowerCase()
      let titre = mesnote.titre

      if (titre.toLowerCase().indexOf(searchMini) > -1) return mesnote
    })

    return res
  }
  //recuperation de ligneNotes
  let data = sortBy(tmp, [
    function (o) {
      return o.titre
    },
  ])
  let ligneNotes = searching(sear, search, data).map((note) => {
    return (
      <div>
        <div key={note.id}>
          <ul className="note-title">
            <li>
              <h2>
                <em>{note.titre}</em>
              </h2>
            </li>
          </ul>
          <h5>{note.categorie}</h5>
          <p>
            <Markdown className="markdown" markup={note.text} />
          </p>
          <hr class="dashed"></hr>
        </div>
      </div>
    )
  })

  //recuperation de ligneNotes catégorie
  return (
    <div>
      <h2 className="titre-carnet">{carnet.titre}</h2>
      <ModalNotes carnet={carnet} carnets={carnets} />
      <div>
        <input
          type="search"
          value={sear}
          onChange={(e) => {
            setSearshing(e.target.value)
          }}
          className="searchbar-note"
          placeholder="cherchez la note par titre ..."
        />

        <Form.Select
          value={search}
          onChange={(e) => setSearsh(e.target.value)}
          aria-label="Default select example"
          className="select-note"
        >
          <option value="">recherche par catégorie</option>
          <option value="Secondaire">Secondaire</option>
          <option value="Important">Important</option>
          <option value="Urgent">Urgent</option>
        </Form.Select>
      </div>
      <div className="block-list">{ligneNotes}</div>

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
