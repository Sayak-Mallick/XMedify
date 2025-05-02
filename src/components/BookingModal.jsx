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
      // Get existing bookings
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]')
      // Add new booking
      const updatedBookings = [...existingBookings, booking]
      // Save to localStorage
      localStorage.setItem('bookings', JSON.stringify(updatedBookings))
      // Navigate to bookings page
      navigate('/my-bookings')
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
          <button onClick={() => setSelectedTime('9:00 AM')} className={selectedTime === '9:00 AM' ? 'selected' : ''}>9:00 AM</button>
          <button onClick={() => setSelectedTime('10:00 AM')} className={selectedTime === '10:00 AM' ? 'selected' : ''}>10:00 AM</button>
          <button onClick={() => setSelectedTime('11:00 AM')} className={selectedTime === '11:00 AM' ? 'selected' : ''}>11:00 AM</button>
        </div>
        
        <p>Afternoon</p>
        <div className="slots">
          <button onClick={() => setSelectedTime('2:00 PM')} className={selectedTime === '2:00 PM' ? 'selected' : ''}>2:00 PM</button>
          <button onClick={() => setSelectedTime('3:00 PM')} className={selectedTime === '3:00 PM' ? 'selected' : ''}>3:00 PM</button>
          <button onClick={() => setSelectedTime('4:00 PM')} className={selectedTime === '4:00 PM' ? 'selected' : ''}>4:00 PM</button>
        </div>

        <p>Evening</p>
        <div className="slots">
          <button onClick={() => setSelectedTime('6:00 PM')} className={selectedTime === '6:00 PM' ? 'selected' : ''}>6:00 PM</button>
          <button onClick={() => setSelectedTime('7:00 PM')} className={selectedTime === '7:00 PM' ? 'selected' : ''}>7:00 PM</button>
          <button onClick={() => setSelectedTime('8:00 PM')} className={selectedTime === '8:00 PM' ? 'selected' : ''}>8:00 PM</button>
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