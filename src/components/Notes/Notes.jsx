import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import "./Notes.css"
import ModalNotes from "./../ModalNotes/ModalNotes"
import { Markdown } from "react-showdown"
import { Form } from "react-bootstrap"
import { sortBy } from "lodash"

export default function Notes({ carnet, carnets, setCarnet, deleteNote }) {
  const [sear, setSearshing] = useState("")
  const [search, setSearch] = useState("")
  const [listCard, setListCard] = useState("Card")
  // const tmp = carnet.notes

  // Fonction Modifier Note
  const modifierNote = (id, inputTitreNote, categorie, inputMarkdown) => {
    const findNote = carnet.notes.find((x) => x.id === id)
    findNote.titre = inputTitreNote
    findNote.categorie = categorie
    findNote.text = inputMarkdown
    findNote.id = id
    setCarnet({ notes: findNote, ...carnet })
    localStorage.setItem("carnets", JSON.stringify(carnets))
  }

  // Fonction recherche
  function searching(strSear, strMysearch, list) {
    let res = [...list]
    if (strMysearch !== "") {
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
  let data = sortBy(carnet.notes, [
    function (o) {
      return o.titre.toLowerCase()
    },
  ])
  let ligneNotes = searching(sear, search, data).map((note) => {
    return (
      <div key={note.id}>
        <ul className="note-title">
          <li>
            <h2>
              <em>{note.titre}</em>
            </h2>
          </li>
        </ul>
        <h5>{note.categorie}</h5>

        <Markdown className="markdown" markup={note.text} />

        <ModalNotes
          titreButtonSecondaire="Modifier"
          titreButtonPrincipal="Modifier"
          note={note}
          carnet={carnet}
          carnets={carnets}
          modifierNote={modifierNote}
        />
        <button
          onClick={() => deleteNote(carnet.id, note.id)}
          className="btn btn-sm btn-danger bmodal buttonajout"
        >
          Supprimer
        </button>
        <hr className="dashed"></hr>
      </div>
    )
  })

  //recuperation de ligneNotes catégorie
  return (
    <div>
      <h2 className="text-center mt-2">
        {carnet.titre.charAt(0).toUpperCase() +
          carnet.titre.substring(1).toLowerCase()}
      </h2>
      <div className="button-add-note">
        {carnet.notes.length ? (
          <button
            style={{
              color: "white",
            }}
            className="btn buttonNote mx-2"
            onClick={
              listCard === "Card"
                ? () => setListCard("List")
                : () => setListCard("Card")
            }
          >
            {listCard === "Card"
              ? "Afficher en mode List"
              : "Afficher en mode Card"}
          </button>
        ) : null}
        <ModalNotes
          titreButtonPrincipal="Ajouter Note"
          titreButtonSecondaire="Ajouter"
          carnet={carnet}
          carnets={carnets}
          setCarnet={setCarnet}
        />
      </div>
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
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Default select example"
          className="select-note"
        >
          <option value="">recherche par catégorie</option>
          <option value="Secondaire">Secondaire</option>
          <option value="Important">Important</option>
          <option value="Urgent">Urgent</option>
        </Form.Select>
      </div>
      {/* mode card */}

      {listCard === "Card" && (
        <div className="container bootstrap snippets bootdeys">
          <div className="row">
            {searching(sear, search, data).map((note) => {
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
                      <button
                        onClick={() => deleteNote(carnet.id, note.id)}
                        className="btn btn-sm btn-danger bmodal "
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* mode list */}

      {listCard === "List" && <div className="block-list">{ligneNotes}</div>}
    </div>
  )
}
