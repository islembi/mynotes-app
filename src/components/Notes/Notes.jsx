import React from "react"
import "bootstrap/dist/css/bootstrap.css"
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
    </div>
  )
}
