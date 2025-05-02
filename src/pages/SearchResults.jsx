import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import BookingModal from '../components/BookingModal'

function SearchResults() {
  const [medicalCenters, setMedicalCenters] = useState([])
  const [selectedHospital, setSelectedHospital] = useState(null)
  const location = useLocation()
  const { state, city } = location.state

  useEffect(() => {
    const fetchMedicalCenters = async () => {
      try {
        const response = await axios.get(
          `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`
        )
        setMedicalCenters(response.data)
      } catch (error) {
        console.error('Error fetching medical centers:', error)
      }
    }
    fetchMedicalCenters()
  }, [state, city])

  return (
    <div className="search-results">
      <h1>{medicalCenters.length} medical centers available in {city.toLowerCase()}</h1>
      <div className="centers-list">
        {medicalCenters.map((center) => (
          <div key={center['Provider ID']} className="center-card">
            <h3>{center['Hospital Name']}</h3>
            <p>{center['Address']}</p>
            <p>{center['City']}, {center['State']} {center['ZIP Code']}</p>
            <p>Rating: {center['Hospital overall rating']}/5</p>
            <button 
              className="book-btn"
              onClick={() => setSelectedHospital(center)}
            >
              Book FREE Center Visit
            </button>
          </div>
        ))}
      </div>

      {selectedHospital && (
        <BookingModal 
          hospital={selectedHospital}
          onClose={() => setSelectedHospital(null)}
        />
      )}
    </div>
  )
}

export default SearchResults