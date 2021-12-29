import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Nav } from "react-bootstrap"
import Diagramme from "./Diagramme"
import Donut from "./Donut"

export default function Statistique() {
  const [carnets, setCarnets] = useState([])

  useEffect(() => {
    const donnees = JSON.parse(localStorage.carnets)

    setCarnets(donnees)
  }, [])

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <Nav className="me-auto">
          <ul className="nav-item">
            <Nav.Link
              as={Link}
              to="/"
              className="navbar-brand nav-link"
              style={{
                borderRadius: "100%",
                backgroundColor: "#864747",
                color: "white",
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
                backgroundColor: "#864747",
                color: "white",
              }}
            >
              Statistique
            </Nav.Link>
          </ul>
        </Nav>
        <p className="navbar-brand">Statistique ✏</p>
      </nav>
      <h3 className="mx-4">
        nombre total de carnets{" "}
        <span className="nb-carnets badge rounded-pill bg-info text-dark">
          {carnets.length}
        </span>
      </h3>
      <Diagramme />
      <Donut />
    </div>
  )
}
