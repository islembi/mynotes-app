import React, { useState, useEffect } from "react"
import Carnet from "../Carnet/Carnet"
import ModalComp from "../Modal/ModalComp"
import uuid from "react-uuid"
import "./Navbar.css"
import Notes from "../Notes/Notes"
import { sortBy } from "lodash"
import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"
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
  }, [carnets, carnet])

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
    tmp.push({
      id: uuid(),
      titre: inputTitre.trim(),
      date: Date.now(),
      notes: [],
    })
    setCarnets(tmp)
    setTitre("")
  }
  // Fonction modifier titre carnet
  const modifierTitre = (id) => {
    const carnet = carnets.find((carnet) => carnet.id === id)
    carnet.id = id
    carnet.titre = titre.trim()
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
        className="dashboard-nav-item active sidebar-carnet"
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
    let rep = window.confirm("Vous voulez supprimer cette note ?")
    if (rep === false) return
    const tmp1 = [...carnets]
    const tmp = (carnet.notes = carnet.notes.filter(
      (note) => note.id !== noteId
    ))
    tmp1.forEach((carnet1) => {
      if (carnet1.id === carnetId) {
        carnet1.notes = carnet1.notes.filter((note) => note.id !== noteId)
      }
    })
    setCarnet({ notes: tmp, ...carnet })
    setCarnets(tmp1)
    localStorage.setItem("carnets", JSON.stringify(carnets))
  }

  // Recuperation carnet en mode liste

  let ligneCarnetListe = rechercher(rech, data).map((carnet) => {
    return (
      <div
        className="dashboard-nav-item sidebar-carnet"
        key={carnet.id}
        onClick={() => [setCarnet(carnet), setActiveCarnet(true)]}
      >
        <ul className="list-group mt-3">
          <li className="list-group-item ">
            {carnet.titre.charAt(0).toUpperCase() +
              carnet.titre.substring(1).toLowerCase()}
          </li>

          <li className="list-group-item">
            <small>
              {" "}
              Modifi?? le :
              {new Date(carnet.date).toLocaleDateString("en-GB", {
                hour: "2-digit",

                minute: "2-digit",
              })}
            </small>
          </li>

          <li className="list-group-item">
            <ModalComp
              titreButton="Modifier"
              modifierTitre={modifierTitre}
              id={carnet.id}
              titre={titre}
              setTitre={setTitre}
            />

            <button
              onClick={() => deleteCarnet(carnet.id)}
              className="btn mx-1 btn-danger buttonajout bmodal"
            >
              Supprimer
            </button>
          </li>
        </ul>
      </div>
    )
  })

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-nav">
          <header>
            <div className="menu-toggle">
              <i className="fas fa-bars"></i>
            </div>
            <h2> Mes Notes </h2>
            {/* Input pour la recherche avec titre carnet */}
          </header>
          <nav className="dashboard-nav-list">
            <div className="dashboard-nav-item">
              <ModalComp
                titreButton="Ajouter un Carnet"
                titre={titre}
                setTitre={setTitre}
                ajout={ajout}
              />
              {carnets.length ? (
                <button
                  style={{ color: "white" }}
                  className="btn buttonajout mx-1"
                  onClick={
                    switchCarnet === "Card"
                      ? () => setSwitchCarnet("List")
                      : () => setSwitchCarnet("Card")
                  }
                >
                  {switchCarnet === "Card" ? "Mode List" : "Mode Card"}
                </button>
              ) : null}
            </div>
            <div className="dashboard-nav-item">
              <input
                type="search"
                value={rech}
                onChange={(e) => {
                  setRech(e.target.value)
                }}
                className="form-control"
                placeholder="Rechercher ..."
              />
            </div>

            {switchCarnet === "Card" ? ligneCarnet : ligneCarnetListe}
          </nav>
        </div>
        <div className="dashboard-app">
          <header className="dashboard-toolbar">
            <div className="menu-toggle">
              <i className="fas fa-bars"></i>
            </div>
            <nav className="dashboard-nav-list">
              <div className="dashboard-nav-item">
                <Nav className="me-auto">
                  <ul className="nav-item">
                    <Nav.Link
                      as={Link}
                      to="/"
                      className="navbar-brand nav-link"
                      style={{
                        borderRadius: "100%",
                        color: "black",
                      }}
                    >
                      Home
                    </Nav.Link>
                  </ul>
                  <ul className="nav-item">
                    <Nav.Link
                      as={Link}
                      to="/statistique"
                      className="navbar-brand nav-link"
                      style={{
                        borderRadius: "100%",
                        color: "black",
                      }}
                    >
                      Statistique
                    </Nav.Link>
                  </ul>
                </Nav>
              </div>
            </nav>
          </header>
          <div className="dashboard-content">
            <div className="container">
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
      </div>
      {/* fin */}
    </>
  )
}
