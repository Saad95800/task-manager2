import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Tables from './component/Tables'
import {Routes, Route} from 'react-router-dom'
import HomePage from './component/HomePage'
import Login from './component/Login'
import { useState } from 'react'
import Message from './component/Message'
import { useSelector } from 'react-redux'
import SpaceList from './component/SpaceList'

function App() {

  const viewMessage = useSelector((state) => state.message.viewMessage)

  return (
    <div className="gradient-background container-app">
      <Message />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/space/:id/tables" element={<Tables />} />
        <Route path="/login" element={<Login />} />
        <Route path="/spaces" element={<SpaceList />} />
      </Routes>
    </div>
  )
}

export default App