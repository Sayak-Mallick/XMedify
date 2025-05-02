import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function BookingModal({ hospital, onClose }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const navigate = useNavigate()

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return

    const booking = {
      id: Date.now(),
      hospitalName: hospital['Hospital Name'],
      address: hospital['Address'],
      date: selectedDate,
      time: selectedTime
    }

    try {
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
      const updatedBookings = [...existingBookings, booking]
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))
      window.location.href = '/my-bookings' // Use window.location instead of navigate
    } catch (error) {
      console.error('Error saving booking:', error)
    }
  }

  return (
    <div className="booking-modal">
      <h3>{hospital['Hospital Name']}</h3>
      <div className="date-selection">
        <p>Today</p>
        <input 
          type="date" 
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={new Date().toISOString().split('T')[0]}
          max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
        />
      </div>

      <div className="time-slots">
        <p>Morning</p>
        <div className="slots">
          <button onClick={() => setSelectedTime('10:00 AM')} className={selectedTime === '10:00 AM' ? 'selected' : ''}>10:00 AM</button>
        </div>
        
        <p>Afternoon</p>
        <div className="slots">
          <button onClick={() => setSelectedTime('2:00 PM')} className={selectedTime === '2:00 PM' ? 'selected' : ''}>2:00 PM</button>
        </div>

        <p>Evening</p>
        <div className="slots">
          <button onClick={() => setSelectedTime('6:00 PM')} className={selectedTime === '6:00 PM' ? 'selected' : ''}>6:00 PM</button>
        </div>
      </div>

      <button 
        onClick={handleBooking}
        className="book-btn"
        disabled={!selectedDate || !selectedTime}
      >
        Book FREE Center Visit
      </button>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default BookingModal