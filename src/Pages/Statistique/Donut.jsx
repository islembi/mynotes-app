import DonutChart from "react-donut-chart"
import "./Donut.css"
import React, { useState, useEffect } from "react"

export default function Donut() {
  const [carnets, setCarnets] = useState([])

  useEffect(() => {
    const donnees = JSON.parse(localStorage.carnets)

    setCarnets(donnees)
  }, [])

  function getRandomColor() {
    var letters = "0123456789ABCDEF"
    var color = "#"
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
  function data(tab) {
    let tab1 = []
    for (let i = 0; i < tab.length; i++) {
      tab1.push({
        label: tab[i].titre,
        value: tab[i].notes.length,
        color: getRandomColor(),
      })
    }
    return tab1
  }

  const reactDonutChartdata = data(carnets)
  console.log(reactDonutChartdata)
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
