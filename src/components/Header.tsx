import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { type IUserState, logOut } from '../redux/auth/authSlice'
import Button from './Button'
import { Api } from '../api/api'

function Header(): JSX.Element {
  const auth = useSelector((state: { auth: IUserState }) => state.auth)
  const dispatch = useDispatch()

  const handleLogout = async (): Promise<void> => {
    try {
      const response = await Api.logout()
      if (response.success === true) {
        dispatch(logOut({ user: null, token: null }))
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <header className="absolute top-0 left-0 right-0">
      <nav className="flex justify-end">
        <ul className="p-6 flex w-[480px] justify-around">
          {auth.user !== null ? (
            <li className="bg-slate-800 p-3 rounded-md absolute right-20">
              <Button type="button" onClick={handleLogout}>
                Logout
              </Button>
            </li>
          ) : (
            <>
              <li className="bg-slate-800 p-3 rounded-md">
                <Link to="/register" className="text-blue-500 hover:text-blue-600">
                  Sign up
                </Link>
              </li>
              <li className="bg-slate-800 p-3 rounded-md">
                <Link to="/login" className="text-blue-500 hover:text-blue-600">
                  Sign in
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
