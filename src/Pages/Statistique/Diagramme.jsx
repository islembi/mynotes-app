import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import { scaleOrdinal } from "d3-scale"
import { schemeCategory10 } from "d3-scale-chromatic"

export default function Diagramme() {
  const [carnets, setCarnets] = useState([])
  useEffect(() => {
    const donnees = JSON.parse(localStorage.carnets)
    setCarnets(donnees)
  }, [])

  const colors = scaleOrdinal(schemeCategory10).range()

  function data1(tab) {
    let tab1 = []
    for (let i = 0; i < tab.length; i++) {
      tab1.push({
        name: tab[i].titre,
        value: tab[i].notes.length,
      })
    }
    return tab1
  }
  const data = data1(carnets)

  const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${
    x + width / 2
  }, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
    y + height
  } ${x + width}, ${y + height}
          Z`

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
  }

  TriangleBar.propTypes = {
    fill: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number,
  }

  return (
    <ResponsiveContainer width="100%" aspect={3}>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Bar
          dataKey="value"
          fill="#8884d8"
          shape={<TriangleBar />}
          label={{ position: "top" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
