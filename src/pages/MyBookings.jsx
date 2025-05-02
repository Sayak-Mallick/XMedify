import { useState, useEffect } from 'react'

function MyBookings() {
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    try {
      const storedBookings = localStorage.getItem('bookings')
      if (storedBookings) {
        const parsedBookings = JSON.parse(storedBookings)
        setBookings(parsedBookings)
      }
    } catch (error) {
      console.error('Error loading bookings:', error)
      setBookings([])
    }
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