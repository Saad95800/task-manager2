import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Tables from './component/Tables'
import {Routes, Route} from 'react-router-dom'
import HomePage from './component/HomePage'
import Login from './component/Login'
import { useState } from 'react'
import Message from './component/Message'
import { useSelector } from 'react-redux'

function App() {

  const viewMessage = useSelector((state) => state.message.viewMessage)

  return (
    <div className="gradient-background container-app">
      {viewMessage && <Message />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App