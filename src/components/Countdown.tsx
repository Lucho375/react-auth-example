import useCountdown from '../hooks/useCountdown'

interface ICountdownProps {
  startTime: number
  message: string
  callback: () => void
}

export default function Countdown({ startTime = 3, message, callback }: ICountdownProps): JSX.Element {
  const { countdown } = useCountdown({ startTime, callback })
  return (
    <span className="text-sm text-gray-400">
      {message} {countdown}
    </span>
  )
}
