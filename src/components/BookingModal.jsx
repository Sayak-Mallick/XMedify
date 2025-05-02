import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function BookingModal({ hospital, onClose }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const navigate = useNavigate()

  const handleBooking = () => {
    const booking = {
      id: Date.now(),
      hospitalName: hospital['Hospital Name'],
      address: hospital['Address'],
      date: selectedDate,
      time: selectedTime
    }

    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, booking]))
    
    navigate('/my-bookings')
  }

  return (
    <div className="booking-modal">
      <h3>{hospital['Hospital Name']}</h3>
      <div className="time-slots">
        <p>Today</p>
        <div className="slots">
          <p>Morning</p>
          <p>Afternoon</p>
          <p>Evening</p>
        </div>
      </div>
      <button onClick={handleBooking}>Confirm Booking</button>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default BookingModal