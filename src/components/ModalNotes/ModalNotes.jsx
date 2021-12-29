import React, { useState, useEffect } from "react"
import uuid from "react-uuid"
import { Markdown } from "react-showdown"
import { Modal, Button, InputGroup, Form, FormControl } from "react-bootstrap"
import "./ModalNotes.css"

export default function ModalNotes({
  titreButtonPrincipal,
  titreButtonSecondaire,
  carnet,
  carnets,
  setCarnet,
  note,
  modifierNote,
}) {
  const [lgShow, setLgShow] = useState(false)
  const [inputMarkdown, setInputMarkdown] = useState("")
  const [inputTitreNote, setInputTitreNote] = useState("")
  const [categorie, setCategorie] = useState("Secondaire")

  useEffect(() => {
    if (note) {
      setInputTitreNote(note.titre)
      setInputMarkdown(note.text)
      setCategorie(note.categorie)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ajoutNote = () => {
    const tmp = { ...carnet }
    if (!inputTitreNote.trim())
      return (
        setInputTitreNote(""),
        setInputMarkdown(""),
        setCategorie("Secondaire"),
        alert("Veuillez remplir tous les champs")
      )
    tmp.notes.push({
      id: uuid(),
      titre: inputTitreNote.trim(),
      categorie: categorie,
      text: inputMarkdown,
    })
    setCarnet(tmp)
    localStorage.setItem("carnets", JSON.stringify(carnets))
    setInputTitreNote("")
    setInputMarkdown("")
    setCategorie("Secondaire")
  }

  return (
    <>
      <Button
        className={
          titreButtonPrincipal === "Ajouter Note" ? "buttonajout" : "buttonNote"
        }
        onClick={() => setLgShow(true)}
      >
        {titreButtonPrincipal}
      </Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Titre Note
            </InputGroup.Text>
            <FormControl
              value={inputTitreNote}
              onChange={(e) => setInputTitreNote(e.target.value)}
              aria-label="Saisir un titre de note"
              aria-describedby="inputGroup-sizing-lg"
            />
          </InputGroup>
        </Modal.Header>
        <Modal.Header>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Catégorie
            </InputGroup.Text>
            <Form.Select
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              aria-label="Default select example"
            >
              <option value="Secondaire">Secondaire</option>
              <option value="Important">Important</option>
              <option value="Urgent">Urgent</option>
            </Form.Select>
          </InputGroup>
        </Modal.Header>
        <Modal.Body>
          <div className="modal-body-input">
            <div className="form-group">
              <label>Text Note</label>
              <textarea
                className="form-control form-control-text-markdown"
                id="exampleFormControlTextarea1"
                value={inputMarkdown}
                onChange={(e) => setInputMarkdown(e.target.value)}
                rows="3"
              ></textarea>
            </div>
            <div>
              <label className="label-html">HTML Note</label>
              <Markdown className="markdown" markup={inputMarkdown} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="footer-modal-notes">
          <Button
            variant="primary"
            onClick={
              titreButtonSecondaire === "Ajouter"
                ? () => [ajoutNote(), setLgShow(false)]
                : () => [
                    modifierNote(
                      note.id,
                      inputTitreNote,
                      categorie,
                      inputMarkdown
                    ),
                    setLgShow(false),
                  ]
            }
          >
            {titreButtonSecondaire}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
