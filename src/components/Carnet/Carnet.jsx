import React from "react"

const Carnet = ({ titreCarnet, dateCarnet }) => {
  return (
    <div>
      <h1>{titreCarnet}</h1>
      <h3>
        {new Date(dateCarnet).toLocaleDateString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </h3>
    </div>
  )
}

export default Carnet
