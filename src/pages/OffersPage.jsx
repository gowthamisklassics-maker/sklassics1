import { useEffect, useState } from 'react'
import { api } from '../api/client.js'
import OfferCard from '../components/OfferCard.jsx'

export default function OffersPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    api.listOffers({ only_active: 1 })
      .then(res => setItems(res.items || []))
      .catch(err => setError(err.message || 'Failed to load offers'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      <div className="page-head"><h1>Offers</h1></div>
      {loading && <div className="muted">Loading…</div>}
      {error && <div className="alert error">{error}</div>}
      {!loading && !error && (
        <div className="grid">
          {items.map(o => <OfferCard key={o.id} offer={o} />)}
        </div>
      )}
    </div>
  )
}
