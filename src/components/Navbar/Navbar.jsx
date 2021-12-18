import React, { useState } from "react"
import Carnet from "../Carnet/Carnet"
import ModalComp from "../Modal/ModalComp"
import uuid from "react-uuid"
import "./Navbar.css"
export default function Navbar() {
  const [titre, setTitre] = useState("")
  const [carnets, setCarnets] = useState([])
  const [rech, setRech] = useState("")

  //ajout de carnet
  const ajout = (inputTitre) => {
    const tmp = [...carnets]
    tmp.push({ id: uuid(), titre: inputTitre, date: Date.now() })
    setCarnets(tmp)
    setTitre("")
  }
  //recherche
  function rechercher(strRech, liste) {
    let tmpRech = strRech.toLowerCase()
    let res = liste.filter((carnet) => {
      let lowerCarnet = carnet.titre.toLowerCase()
      if (lowerCarnet.indexOf(tmpRech) > -1) return carnet
    })

    return res
  }

  //recuperation de ligneCarnet
  let ligneCarnet = rechercher(rech, carnets).map((carnet) => {
    return (
      <div>
        <Carnet
          key={carnet.id}
          titreCarnet={carnet.titre}
          dateCarnet={carnet.date}
        />
      </div>
    )
  })

  return (
    <div>
      <div className="sidebar-container">
        <div className="sidebar-logo">Projet NOTES</div>
        <ModalComp titre={titre} setTitre={setTitre} ajout={ajout} />
        <ul className="sidebar-navigation">
          <input
            className=""
            type="search"
            value={rech}
            onChange={(e) => {
              setRech(e.target.value)
            }}
            className="form-control"
            placeholder="Rechercher ..."
          />

          <div> {ligneCarnet}</div>

          <li></li>
        </ul>
      </div>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand">My Notes ✏</a>
      </nav>
    </div>
  )
}
