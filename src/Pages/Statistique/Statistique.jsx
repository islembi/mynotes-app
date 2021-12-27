import React from "react"
import { Link } from "react-router-dom"
import Diagramme from "./Diagramme"

export default function Statistique() {
  return (
    <>
      <div>
        <nav className="navbar navbar-light bg-light">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/statistique">Statistique</Link>
          </li>
          <p className="navbar-brand">Statistique ✏</p>
        </nav>
      </div>
      <Diagramme />
    </>
  )
}
