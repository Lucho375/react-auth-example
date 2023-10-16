import { useSelector } from 'react-redux'
import { type IUserState } from '../redux/auth/authSlice'
import Button from './Button'
import { Api } from '../api/api'

export default function Private(): JSX.Element {
  const { user, token } = useSelector((state: { auth: IUserState }) => state.auth)

  const authRequest = async (): Promise<any> => {
    try {
      if (token !== null) {
        await Api.getPrivateData(token)
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section>
      <h1 className="text-2xl">
        Bienvenido{' '}
        <span className="text-gray-400">
          {user?.firstname} {user?.lastname}
        </span>
      </h1>
      <Button type="button" onClick={authRequest}>
        Fetch data
      </Button>
    </section>
  )
}
