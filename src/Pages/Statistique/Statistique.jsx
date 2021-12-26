import React from "react"
import { Link } from "react-router-dom"
export default function Statistique() {
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="statistique">Statistique</Link>
        </li>
        <p className="navbar-brand">Mes Notes ✏</p>
      </nav>
    </div>
  )
}
