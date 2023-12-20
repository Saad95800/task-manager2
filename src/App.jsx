import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Tables from './component/Tables'
import {Routes, Route} from 'react-router-dom'
import HomePage from './component/HomePage'
import Login from './component/Login'

function App() {

  return (
    <div className="gradient-background container-app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App