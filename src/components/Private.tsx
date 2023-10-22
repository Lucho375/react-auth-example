import { useSelector } from 'react-redux'
import { type IUserState } from '../redux/auth/authSlice'
import Button from './Button'
import { Api } from '../api/api'
import { useState } from 'react'

interface IUserData {
  id: string
  firstname: string
  email: string
  lastname: string
  iat: number
  exp: number
}

export default function Private(): JSX.Element {
  const { user, token } = useSelector((state: { auth: IUserState }) => state.auth)
  const [userData, setUserData] = useState<IUserData | null>(null)

  const authRequest = async (): Promise<void> => {
    try {
      if (token !== null && userData === null) {
        const response = await Api.getPrivateData(token)
        if (response.success === true) {
          setUserData(response.currentUser)
        } else {
          setUserData(null)
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section className="flex flex-col">
      <h1 className="text-2xl mb-5">
        Welcome{' '}
        <span className="text-gray-400">
          {user?.firstname} {user?.lastname}
        </span>
      </h1>
      <Button type="button" onClick={authRequest}>
        Get profile data
      </Button>
      <section className="min-h-[150px] mt-5">
        {userData !== null ? (
          <>
            <p className="text-gray-400">
              ID : <span className="text-blue-500">{userData?.id}</span>
            </p>
            <p className="text-gray-400">
              Firstname : <span className="text-blue-500">{userData?.firstname}</span>
            </p>
            <p className="text-gray-400">
              Lastname : <span className="text-blue-500">{userData?.lastname}</span>
            </p>
            <p className="text-gray-400">
              Email : <span className="text-blue-500">{userData?.email}</span>
            </p>
          </>
        ) : null}
      </section>
    </section>
  )
}
