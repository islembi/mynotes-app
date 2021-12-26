import React, { useState, useEffect } from "react"
import Carnet from "../Carnet/Carnet"
import ModalComp from "../Modal/ModalComp"
import uuid from "react-uuid"
import "./Navbar.css"
import Notes from "../Notes/Notes"
import { sortBy } from "lodash"
export default function Navbar() {
  const [switchCarnet, setSwitchCarnet] = useState("Card")
  const [titre, setTitre] = useState("")
  const [rech, setRech] = useState("")
  const [carnet, setCarnet] = useState({})
  const [activeCarnet, setActiveCarnet] = useState(false)
  const [carnets, setCarnets] = useState(
    localStorage.carnets ? JSON.parse(localStorage.carnets) : []
  )

  useEffect(() => {
    localStorage.setItem("carnets", JSON.stringify(carnets))
  }, [carnets])

  // Fonction ajout de carnet
  const ajout = (inputTitre) => {
    const tmp = [...carnets]
    if (!inputTitre.trim()) return alert("Veuillez saisir un titre")
    const existCarnet = carnets.find((carnet) => carnet.titre === inputTitre)
    if (existCarnet)
      return (
        setTitre(""),
        alert("Nom du carnet existe! Veuillez choisir un autre nom")
      )
    tmp.push({ id: uuid(), titre: inputTitre, date: Date.now(), notes: [] })
    setCarnets(tmp)
    setTitre("")
  }
  // Fonction modifier titre carnet
  const modifierTitre = (id) => {
    const carnet = carnets.find((carnet) => carnet.id === id)
    carnet.id = id
    carnet.titre = titre
    carnet.date = Date.now()
    localStorage.setItem("carnets", JSON.stringify(carnets))
    setTitre("")
  }
  // Fonction recherche par titre carnet
  function rechercher(strRech, liste) {
    let tmpRech = strRech.toLowerCase()
    let res = liste.filter((carnet) => {
      let lowerCarnet = carnet.titre.toLowerCase()
      if (lowerCarnet.indexOf(tmpRech) > -1) return carnet
    })

    return res
  }

  // Recuperation de ligneCarnet
  let data = sortBy(carnets, [
    function (o) {
      return o.titre
    },
  ])
  let ligneCarnet = rechercher(rech, data).map((carnet) => {
    return (
      <div
        key={carnet.id}
        onClick={() => [setCarnet(carnet), setActiveCarnet(true)]}
      >
        <Carnet
          carnet={carnet}
          titre={titre}
          setTitre={setTitre}
          modifierTitre={modifierTitre}
          deleteCarnet={deleteCarnet}
        />
      </div>
    )
  })

  // Fonction supprimer carnet
  function deleteCarnet(id) {
    let rep = window.confirm("vous voulez supprimer?")
    if (rep === false) return
    const tmp = carnets.filter(function (el) {
      return el.id !== id
    })
    if (carnet.id === id) {
      setActiveCarnet(false)
      setCarnet({})
    }
    setCarnets(tmp)
  }

  // Fonction supprimer note

  function deleteNote(carnetId, noteId) {
    let rep = window.confirm("vous voulez supprimer cette note ?")

    var tmp = carnets

    tmp.forEach((carnet) => {
      if (carnet.id === carnetId) {
        carnet.notes = carnet.notes.filter((note) => note.id !== noteId)
      }
    })

    setCarnets(tmp)
  }

  // Recuperation carnet en mode liste

  let ligneCarnetListe = rechercher(rech, data).map((carnet) => {
    return (
      <div
        key={carnet.id}
        onClick={() => [setCarnet(carnet), setActiveCarnet(true)]}
      >
        <ul class="list-group mt-3">
          <li class="list-group-item ">{carnet.titre}</li>

          <li class="list-group-item">
            <small>
              {" "}
              Modifié le :
              {new Date(carnet.date).toLocaleDateString("en-GB", {
                hour: "2-digit",

                minute: "2-digit",
              })}
            </small>
          </li>

          <li class="list-group-item">
            <ModalComp
              titreButton="Modifier"
              modifierTitre={modifierTitre}
              id={carnet.id}
              titre={titre}
              setTitre={setTitre}
            />

            <button
              onClick={() => deleteCarnet(carnet.id)}
              className="btn btn-sm btn-danger buttonajout bmodal"
            >
              Supprimer
            </button>
          </li>
        </ul>
      </div>
    )
  })

  return (
    <div className="sidebar">
      <div className="app-sidebar text-center">
        <div className="sidebar-container">
          <div className="sidebar-logo">Projet NOTES</div>
          {/* Modal ajout du carnet */}
          <ModalComp
            titreButton="Ajouter un Carnet"
            titre={titre}
            setTitre={setTitre}
            ajout={ajout}
          />
          <button
            onClick={
              switchCarnet === "Card"
                ? () => setSwitchCarnet("List")
                : () => setSwitchCarnet("Card")
            }
          >
            {switchCarnet === "Card" ? "Mode List" : "Mode Card"}
          </button>
          {/* Input pour la recherche avec titre carnet */}
          <ul className="sidebar-navigation">
            <input
              type="search"
              value={rech}
              onChange={(e) => {
                setRech(e.target.value)
              }}
              className="form-control"
              placeholder="Rechercher ..."
            />
            {/* Display des carnet  */}
            <div className="sidebar-carnet">
              {switchCarnet === "Card" ? ligneCarnet : ligneCarnetListe}
            </div>
          </ul>
        </div>
      </div>
      <div className="app-main">
        <nav className="navbar navbar-light bg-light">
          <p className="navbar-brand">Mes Notes ✏</p>
        </nav>
        <div>
          <div className="container-notes">
            {/* Display des notes */}
            {activeCarnet && (
              <Notes
                setCarnet={setCarnet}
                carnet={carnet}
                carnets={carnets}
                deleteNote={deleteNote}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
