import React, { useState } from "react"
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap"

export default function ModalComp({
  titreButton,
  titre,
  setTitre,
  ajout,
  modifierTitre,
  id,
}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {titreButton}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Saisir un titre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Titre
            </InputGroup.Text>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={titre}
              onChange={(e) => setTitre(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={
              titreButton === "Ajouter un Carnet"
                ? () => [handleClose(), ajout(titre)]
                : () => [handleClose(), modifierTitre(id)]
            }
          >
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
