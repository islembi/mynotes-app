import { Button } from "bootstrap"
import "./Navbar.css"
export default function Navbar() {
  return (
    <div>
      <div className="sidebar-container">
        <div className="sidebar-logo">Projet NOTES</div>
        <button type="button" className="btn btn-success">
          ajouter un carnet
        </button>
        <ul className="sidebar-navigation">
          <li>
            <a href="#">
              <i className="fa fa-home" aria-hidden="true"></i> Mes Carnets
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
