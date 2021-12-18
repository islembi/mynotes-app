import React, { useState } from "react"
import Carnet from "../Carnet/Carnet"
import ModalComp from "../Modal/ModalComp"
import uuid from "react-uuid"
import "./Navbar.css"
export default function Navbar() {
  const [titre, setTitre] = useState("")
  const [carnets, setCarnets] = useState([])

  const ajout = (inputTitre) => {
    const tmp = [...carnets]
    tmp.push({ id: uuid(), titre: inputTitre, date: Date.now() })
    setCarnets(tmp)
    setTitre("")
  }
  const modifierTitre = (id) => {
    const carnet = carnets.find((carnet) => carnet.id === id)
    carnet.id = id
    carnet.titre = titre
    carnet.date = Date.now()
    setTitre("")
    console.log(carnets)
  }

  return (
    <div>
      <div className="sidebar-container">
        <div className="sidebar-logo">Projet NOTES</div>
        <ModalComp
          titreButton="Ajouter un Carnet"
          titre={titre}
          setTitre={setTitre}
          ajout={ajout}
        />
        <ul className="sidebar-navigation">
          {carnets.map((carnet) => {
            return (
              <Carnet
                key={carnet.id}
                carnet={carnet}
                titre={titre}
                setTitre={setTitre}
                modifierTitre={modifierTitre}
              />
            )
          })}
          <li></li>
        </ul>
      </div>
    </div>
  )
}
