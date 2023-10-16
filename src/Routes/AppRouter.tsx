import { Route, Routes } from 'react-router-dom'
import Register from '../components/Register'
import Login from '../components/Login'
import ProtectedRoute from './ProtectedRoute'
import Private from '../components/Private'

function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/private" element={<Private />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
