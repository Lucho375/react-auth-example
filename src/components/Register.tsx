import { type FormEvent, useState } from 'react'
import Input from './Input'
import Button from './Button'
import { Api } from '../api/api'

const inputFields = [
  { label: 'First Name', name: 'firstname', type: 'text' },
  { label: 'Last Name', name: 'lastname', type: 'text' },
  { label: 'Email', name: 'email', type: 'email' },
  { label: 'Password', name: 'password', type: 'password' },
  { label: 'Confirm password', name: 'confirmPassword', type: 'password' },
  { label: 'Age', name: 'age', type: 'number' }
]

export default function Register(): JSX.Element {
  const [errors, setErrors] = useState<null | string>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const handleRegister = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const data: Record<string, string> = {}
    formData.forEach((value, key) => {
      data[key] = value as string
    })

    const response = await Api.register({ ...data, age: Number(data.age) })

    if (response.success === false) {
      setErrors(response.message)
    } else {
      setErrors(null)
      setSuccess(true)
    }
  }

  return (
    <section>
      {!Array.isArray(errors) && errors !== null && <span className="text-red-700">{errors}</span>}
      {success && <span className="text-green-700 text-xl">Usuario creado con exito!</span>}

      <form className="flex flex-col items-center max-w-xs" onSubmit={handleRegister}>
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
        <Button type="submit">Register</Button>
      </form>
    </section>
  )
}
