type TError = Array<{ message: string } | null>

interface InputProps {
  label: string
  name: string
  type: string
  error?: TError | null
}

export default function Input({ label, name, type = 'text', error }: InputProps): JSX.Element {
  return (
    <div className="mb-1">
      <label htmlFor={name} className="block text-gray-300 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="w-full px-2 py-1 border rounded-md text-gray-700 focus:outline-0 required:border-4 required:border-red-700"
        placeholder={name === 'confirmPassword' ? 'Confirm password' : `Enter your ${label}`}
      />
      <div className="min-h-[40px] max-w-[250px] overflow-clip">
        {error?.[0] && <span className="text-red-700 text-xs">{error[0].message}</span>}
      </div>
    </div>
  )
}
