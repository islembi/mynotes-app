import DonutChart from "react-donut-chart"
import "./Donut.css"
import React, { useState, useEffect } from "react"

export default function Donut() {
  const [carnets, setCarnets] = useState([])

  useEffect(() => {
    const donnees = JSON.parse(localStorage.carnets)

    setCarnets(donnees)
  }, [])
  function nbrNote(tab, text) {
    let nbr = 0
    for (let i = 0; i < tab.length; i++) {
      for (let j = 0; j < tab[i].notes.length; j++) {
        if (tab[i].notes[j].categorie === text) nbr = nbr + 1
      }
    }
    return nbr
  }
  const reactDonutChartdata = [
    {
      label: "secondaire",
      value: nbrNote(carnets, "Secondaire"),
      color: "#00E396",
    },
    {
      label: "important",
      value: nbrNote(carnets, "Important"),
      color: "#FEB019",
    },
    {
      label: "urgent",
      value: nbrNote(carnets, "Urgent"),
      color: "#FF4560",
    },
  ]
  const reactDonutChartBackgroundColor = ["#00E396", "#FEB019", "#FF4560"]
  const reactDonutChartInnerRadius = 0.5
  const reactDonutChartSelectedOffset = 0.04
  const reactDonutChartHandleClick = (item, toggled) => {
    if (toggled) {
      console.log(item)
    }
  }
  let reactDonutChartStrokeColor = "#FFFFFF"
  const reactDonutChartOnMouseEnter = (item) => {
    let color = reactDonutChartdata.find((q) => q.label === item.label).color
    reactDonutChartStrokeColor = color
  }
  return (
    <div className="Appli">
      <h6>pourcentage catégorie</h6>
      <DonutChart
        width={500}
        onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
        strokeColor={reactDonutChartStrokeColor}
        data={reactDonutChartdata}
        colors={reactDonutChartBackgroundColor}
        innerRadius={reactDonutChartInnerRadius}
        selectedOffset={reactDonutChartSelectedOffset}
        onClick={(item, toggled) => reactDonutChartHandleClick(item, toggled)}
      />
    </div>
  )
}
