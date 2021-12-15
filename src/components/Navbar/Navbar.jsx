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

  return (
    <div>
      <div className="sidebar-container">
        <div className="sidebar-logo">Projet NOTES</div>
        <ModalComp titre={titre} setTitre={setTitre} ajout={ajout} />
        <ul className="sidebar-navigation">
          {carnets.map((carnet) => {
            return (
              <Carnet
                key={carnet.id}
                titreCarnet={carnet.titre}
                dateCarnet={carnet.date}
              />
            )
          })}
          <li></li>
        </ul>
      </div>
    </div>
  )
}
