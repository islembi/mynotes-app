import React, { useState, useEffect } from "react"
import Carnet from "../Carnet/Carnet"
import ModalComp from "../Modal/ModalComp"
import uuid from "react-uuid"
import "./Navbar.css"
export default function Navbar() {
  const [titre, setTitre] = useState("")
  const [rech, setRech] = useState("")
  const [carnets, setCarnets] = useState(
    localStorage.carnets ? JSON.parse(localStorage.carnets) : []
  )

  useEffect(() => {
    localStorage.setItem("carnets", JSON.stringify(carnets))
  }, [carnets])

  //ajout de carnet
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
        <div onClick={window["displayNotes"]}></div>
        <Carnet
          key={carnet.id}
          carnet={carnet}
          titre={titre}
          setTitre={setTitre}
          modifierTitre={modifierTitre}
          deleteCarnet={deleteCarnet}
        />
      </div>
    )
  })

  function deleteCarnet(id) {
    let rep = window.confirm("vous voulez supprimer?")
    if (rep === false) return
    const tmp = carnets.filter(function (el) {
      return el.id != id
    })
    setCarnets(tmp)
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
      <div id="myNotes">
        {" "}
        <div className="container-notes">
          {" "}
          <Notes />{" "}
        </div>{" "}
      </div>
    </div>
  )
}
