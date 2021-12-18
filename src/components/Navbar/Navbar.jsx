import React, { useState, useEffect} from "react"
import Carnet from "../Carnet/Carnet"
import ModalComp from "../Modal/ModalComp"
import uuid from "react-uuid"
import "./Navbar.css"
export default function Navbar() {
  const [titre, setTitre] = useState("")
  const [carnets, setCarnets] = useState(
    localStorage.carnets ? JSON.parse(localStorage.carnets) : [])

  useEffect(() => {
    localStorage.setItem("carnets", JSON.stringify(carnets));
  }, [carnets]);

  const ajout = (inputTitre) => {
    const tmp = [...carnets]
    tmp.push({ id: uuid(), titre: inputTitre, date: Date.now() })
    setCarnets(tmp)
    setTitre("") 
  }
  function deleteCarnet(id){
    //confirm("Etes vous sure de vouloir supprtmer")
    let rep = window.confirm("vous voulez supprimer?" );
    if(rep === false) return;
    const tmp = carnets.filter(function(el) { return el.id != id; });
    setCarnets(tmp);
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
                id={carnet.id}
                titreCarnet={carnet.titre}
                dateCarnet={carnet.date}
                deleteCarnet={deleteCarnet}
              />
            )
          })}
          <li></li>
        </ul>
      </div>
    </div>
  )
}
