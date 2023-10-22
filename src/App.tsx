import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AppRouter from './Routes/AppRouter'
import { Api } from './api/api'
import Header from './components/Header'
import { setCredentials } from './redux/auth/authSlice'

function App(): JSX.Element {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    // eslint-disable-next-line
    ;(async (): Promise<void> => {
      try {
        const response = await Api.getCurrentUser()
        if (response.success === true) {
          dispatch(setCredentials(response))
          navigate('/private')
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <Header />
      <AppRouter />
    </main>
  )
}

export default App
