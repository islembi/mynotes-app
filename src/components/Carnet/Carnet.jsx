import React from "react"
import { Card } from "react-bootstrap"
import ModalComp from "../Modal/ModalComp"
import "./Carnet.css"

const Carnet = ({ carnet, titre, setTitre, modifierTitre, deleteCarnet }) => {
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
            <small>
              Modifié le{" "}
              {new Date(carnet.date).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </Card.Text>
          <ModalComp
            titreButton="Modifier"
            modifierTitre={modifierTitre}
            id={carnet.id}
            titre={titre}
            setTitre={setTitre}
          />
          <p className="card-text">
            <button
              onClick={() => deleteCarnet(carnet.id)}
              className="btn btn-sm btn-danger buttonajout bmodal"
            >
              Supprimer
            </button>
          </p>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Carnet
