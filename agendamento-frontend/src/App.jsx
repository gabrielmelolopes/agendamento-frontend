import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Consultas from './pages/Consultas'
import LoginOrRegister from './pages/LoginOrRegister'
import ProtectedRoute from './components/ProtectedRoute'

function App() {

  return (
    <div>
      <h2>Agendamento</h2>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/welcome' element={<LoginOrRegister />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/consultas' element={<Consultas />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
