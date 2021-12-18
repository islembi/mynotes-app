import React from "react"
import { Card } from "react-bootstrap"
import ModalComp from "../Modal/ModalComp"
import "./Carnet.css"

const Carnet = ({ carnet, titre, setTitre, modifierTitre }) => {
  return (
    <div className="text-center">
      <Card>
        <Card.Title>{carnet.titre}</Card.Title>
        <Card.Img
          variant="top"
          src={window.location.origin + "/img/carnet.jpg"}
        />
        <Card.Body>
          <Card.Text>
            Modifié le{" "}
            {new Date(carnet.date).toLocaleDateString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Card.Text>
          <ModalComp
            titreButton="Modifier"
            modifierTitre={modifierTitre}
            id={carnet.id}
            titre={titre}
            setTitre={setTitre}
          />
        </Card.Body>
      </Card>
    </div>
  )
}

export default Carnet
