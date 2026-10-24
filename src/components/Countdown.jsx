import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

function pad(n) { return n < 10 ? `0${n}` : `${n}` }

export default function Countdown({ deadline }) {
  const [text, setText] = useState('')

  useEffect(() => {
    if (!deadline) { setText(''); return }
    const tick = () => {
      const end = dayjs(deadline.replace(' ', 'T'))
      if (!end.isValid()) { setText(''); return }
      const diff = end.diff(dayjs(), 'second')
      if (diff <= 0) { setText('Expired'); return }
      const d = Math.floor(diff / 86400)
      const h = Math.floor((diff % 86400) / 3600)
      const m = Math.floor((diff % 3600) / 60)
      const s = diff % 60
      setText(`${pad(d)}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [deadline])

  if (!deadline) return null
  return <span className="badge danger">Ends in: {text}</span>
}
