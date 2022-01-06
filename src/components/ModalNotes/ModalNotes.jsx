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
  const [categorie, setCategorie] = useState("")
  const [colorNote, setColorNote] = useState("orange")

  useEffect(() => {
    if (note) {
      setInputTitreNote(note.titre)
      setInputMarkdown(note.text)
      setCategorie(note.categorie)
      setColorNote(note.colorNote)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ajoutNote = () => {
    const tmp = { ...carnet }
    if (!inputTitreNote.trim())
      return (
        setInputTitreNote(""),
        setInputMarkdown(""),
        setCategorie(""),
        alert("Veuillez remplir tous les champs")
      )
    tmp.notes.push({
      id: uuid(),
      titre: inputTitreNote.trim(),
      categorie: categorie,
      colorNote: colorNote,
      text: inputMarkdown,
    })
    setCarnet(tmp)
    localStorage.setItem("carnets", JSON.stringify(carnets))
    setInputTitreNote("")
    setInputMarkdown("")
    setCategorie("")
    setColorNote("orange")
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
            <FormControl
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              aria-label="Saisir un titre de note"
              aria-describedby="inputGroup-sizing-lg"
            />
          </InputGroup>
          <InputGroup size="lg">
            <InputGroup.Text id="inputGroup-sizing-lg">
              Couleur De La Note
            </InputGroup.Text>
            <Form.Select
              value={colorNote}
              onChange={(e) => setColorNote(e.target.value)}
              aria-label="Default select example"
            >
              <option style={{ color: "#ff8f5e" }} value="orange">
                Orange
              </option>
              <option style={{ color: "#baa9ba" }} value="purple">
                Purple
              </option>
              <option style={{ color: "#d5e5a3" }} value="green">
                Green
              </option>
              <option style={{ color: "#ffe28c" }} value="yellow">
                Yellow
              </option>
              <option style={{ color: "#b8d8d8" }} value="blue">
                Blue
              </option>
              <option style={{ color: "#FFC0CB" }} value="pink">
                Pink
              </option>
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
                      inputMarkdown,
                      colorNote
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
