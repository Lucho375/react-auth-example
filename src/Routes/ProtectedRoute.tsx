import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { type IUserState } from '../redux/auth/authSlice'

export default function ProtectedRoute(): JSX.Element {
  const location = useLocation()
  const auth = useSelector((state: { auth: IUserState }) => state.auth)
  return auth.user !== null ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />
}
