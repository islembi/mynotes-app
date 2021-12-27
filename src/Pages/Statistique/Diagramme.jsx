import React, { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function Diagramme() {
  const [carnets, setCarnets] = useState([])
  useEffect(() => {
    const donnees = JSON.parse(localStorage.carnets)
    setCarnets(donnees)
  }, [])

  function nbrCategorie(tab, text) {
    let nbr = 0
    for (let i = 0; i < tab.length; i++) {
      if (tab[i].categorie === text) nbr = nbr + 1
    }
    return nbr
  }

  function dataModified(tab) {
    const tab1 = []
    for (let i = 0; i < tab.length; i++) {
      tab1.push({
        name: tab[i].titre.toUpperCase(),
        Secondaire: nbrCategorie(tab[i].notes, "Secondaire"),
        Important: nbrCategorie(tab[i].notes, "Important"),
        Urgent: nbrCategorie(tab[i].notes, "Urgent"),
      })
    }
    return tab1
  }
  const data = dataModified(carnets)

  return (
    <ResponsiveContainer width="90%" aspect={3}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Secondaire" fill="#92ac56" />
        <Bar dataKey="Important" fill="#ffe28c" />
        <Bar dataKey="Urgent" fill="#ff8f5e" />
      </BarChart>
    </ResponsiveContainer>
  )
}
