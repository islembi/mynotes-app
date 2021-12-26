import React, { useState } from "react"
import uuid from "react-uuid"
import { Markdown } from "react-showdown"
import { Modal, Button, InputGroup, Form, FormControl } from "react-bootstrap"
import "./ModalNotes.css"

export default function ModalNotes({ carnet, carnets,deleteNote}) {
  const [lgShow, setLgShow] = useState(false)
  const [inputMarkdown, setInputMarkdown] = useState("")
  const [inputTitreNote, setInputTitreNote] = useState("")
  const [categorie, setCategorie] = useState("Secondaire")
  

  const ajoutNote = () => {
    const tmp = [...carnet.notes]
    tmp.push({
      id: uuid(),
      titre: inputTitreNote,
      categorie: categorie,
      text: inputMarkdown,
    })
    carnet.notes = tmp
    console.log(carnet)
    localStorage.setItem("carnets", JSON.stringify(carnets))
    setInputTitreNote("")
    setInputMarkdown("")
    setCategorie("Secondaire")
  }


   
  return (
    <>
      <Button onClick={() => setLgShow(true)}>Ajouter Note</Button>
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
            onClick={() => [ajoutNote(), setLgShow(false)]}
          >
            ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
