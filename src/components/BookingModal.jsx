import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function BookingModal({ hospital, onClose }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const navigate = useNavigate()

  const timeSlots = {
    Morning: ['9:00 AM', '10:00 AM', '11:00 AM'],
    Afternoon: ['1:00 PM', '2:00 PM', '3:00 PM'],
    Evening: ['5:00 PM', '6:00 PM', '7:00 PM']
  }

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return

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
        {Object.entries(timeSlots).map(([period, slots]) => (
          <div key={period} className="time-period">
            <p>{period}</p>
            <div className="slots">
              {slots.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={selectedTime === time ? 'selected' : ''}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={handleBooking}
        disabled={!selectedDate || !selectedTime}
      >
        Book FREE Center Visit
      </button>
      <button onClick={onClose}>Close</button>
    </div>
  )
}

export default BookingModal