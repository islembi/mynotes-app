import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import { Link } from "react-router-dom"
import Diagramme from "./Diagramme"
import Donut from "./Donut"

export default function Statistique({ carnets }) {
  const stat = useState(
    localStorage.getItem("carnets", JSON.stringify(carnets))
  )

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="statistique">Statistique</Link>
        </li>
        <p className="navbar-brand">Statistique ✏</p>
      </nav>
      <h3>
        nombre total de carnets
        <span className="nb-carnets badge rounded-pill bg-info text-dark">
          {stat.length}
        </span>
      </h3>
      <Diagramme />
      <Donut />
    </div>
  )
}
