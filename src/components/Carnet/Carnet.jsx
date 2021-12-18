import React from "react"

const Carnet = ({id, titreCarnet, dateCarnet, deleteCarnet }) => {
  return (
    <div> 

      <h1>{titreCarnet}</h1>
      <h3>
        {new Date(dateCarnet).toLocaleDateString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h3>
       <p className="card-text">
          <button onClick={()=>
          deleteCarnet(id)} className="btn btn-sm btn-danger">Supprimer</button>
         
      </p>  
      
    </div>
  )
}

export default Carnet
