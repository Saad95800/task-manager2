import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Tables from './component/Tables'
import {Routes, Route} from 'react-router-dom'
import HomePage from './component/HomePage'
import Login from './component/Login'
import { useState } from 'react'
import Message from './component/Message'

function App() {

  const [viewMessage, setViewMessage] = useState(false)
  const [texte, setTexte] = useState('')
  const [typeMessage, setTypeMessage] = useState('')

  const displayMessage = (texte, typeMessage) => {
    setViewMessage(true)
    setTexte(texte)
    setTypeMessage(typeMessage)
  }

  const hideMessage = () => {
    setViewMessage(false)
    setTexte('')
    setTypeMessage('')
  }

  return (
    <div className="gradient-background container-app">
      {viewMessage && <Message texte={texte} typeMessage={typeMessage} hideMessage={hideMessage} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tables" element={<Tables displayMessage={displayMessage} />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App