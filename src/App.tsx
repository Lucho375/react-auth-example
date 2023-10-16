import { useEffect } from 'react'
import AppRouter from './Routes/AppRouter'
import Header from './components/Header'
import { useDispatch } from 'react-redux'
import { setCredentials } from './redux/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { Api } from './api/api'

function App(): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const checkAuthentication = async (): Promise<void> => {
      try {
        const response = await Api.getCurrentUser()
        console.log(response)
        if (response.success === true) {
          dispatch(setCredentials(response))
          navigate('/private')
        }
      } catch (error) {
        console.log(error)
      }
    }
    checkAuthentication()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <Header />
      <AppRouter />
    </main>
  )
}

export default App
