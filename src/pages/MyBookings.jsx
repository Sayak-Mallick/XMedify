import { useState, useEffect } from 'react'

function MyBookings() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const loadBookings = () => {
      try {
        const storedBookings = localStorage.getItem('bookings')
        if (storedBookings) {
          const parsedBookings = JSON.parse(storedBookings)
          setBookings(Array.isArray(parsedBookings) ? parsedBookings : [])
        }
      } catch (error) {
        console.error('Error loading bookings:', error)
        setBookings([])
      }
    }

    loadBookings()
    // Add event listener for storage changes
    window.addEventListener('storage', loadBookings)
    return () => window.removeEventListener('storage', loadBookings)
  }, [])

  return (
    <div className="my-bookings">
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-card">
              <h3>{booking.hospitalName}</h3>
              <p>Date: {booking.date}</p>
              <p>Time: {booking.time}</p>
              <p>Address: {booking.address}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyBookings