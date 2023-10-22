import { useEffect, useState } from 'react'

interface IUseCountdown {
  startTime: number
  callback: () => void
}

export default function useCountdown({ startTime = 3, callback }: IUseCountdown): { countdown: number } {
  const [countdown, setCountdown] = useState<number>(startTime)

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(prev => prev - 1)
      } else if (countdown === 0 && callback !== undefined) {
        clearInterval(interval)
        callback()
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [countdown])

  return {
    countdown
  }
}
