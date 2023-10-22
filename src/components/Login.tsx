import { useState, type FormEvent } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Api } from '../api/api'
import { setCredentials } from '../redux/auth/authSlice'
import Button from './Button'
import Input from './Input'

const inputFields = [
  { label: 'Email', name: 'email', type: 'email' },
  { label: 'Password', name: 'password', type: 'password' }
]

export default function Login(): JSX.Element {
  const [errors, setErrors] = useState<null | any[] | string>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    try {
      const formData = new FormData(e.target as HTMLFormElement)
      const data: Record<string, string> = {}

      formData.forEach((value, key) => {
        data[key] = value as string
      })

      const response = await Api.login(data)

      if (response.success === false) {
        setErrors(response.message)
      } else {
        dispatch(setCredentials({ ...response }))
        setErrors(null)
        navigate('/private')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section>
      <h1 className="text-3xl mb-10">Login</h1>
      {errors !== null && <span className="text-red-700">{!Array.isArray(errors) && errors}</span>}
      <form className="flex flex-col items-center" onSubmit={handleLogin} noValidate>
        {inputFields.map(({ name, label, type }) => (
          <Input
            key={name}
            label={label}
            name={name}
            type={type}
            error={
              Array.isArray(errors)
                ? errors.map(err => (err.field === name ? { message: err.message } : null)).filter(err => err !== null)
                : null
            }
          />
        ))}
        <Button type="submit">Login</Button>
      </form>
    </section>
  )
}
