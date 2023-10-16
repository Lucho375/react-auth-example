import { type ReactNode } from 'react'

interface ButtonProps {
  type: 'button' | 'submit' | 'reset' // Tipo de botón permitido
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: ReactNode
}

function Button({ type, onClick, children }: ButtonProps): JSX.Element {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
    >
      {children}
    </button>
  )
}

export default Button
