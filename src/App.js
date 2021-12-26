import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap.js"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage/HomePage"
import Statistique from "./Pages/Statistique/Statistique"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/statistique" element={<Statistique />} />
        </Routes>
      </header>
    </div>
  )
}

export default App
