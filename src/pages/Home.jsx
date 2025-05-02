import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Home() {
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [selectedCity, setSelectedCity] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('https://meddata-backend.onrender.com/states')
        setStates(response.data)
      } catch (error) {
        console.error('Error fetching states:', error)
      }
    }
    fetchStates()
  }, [])

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedState) {
        try {
          const response = await axios.get(`https://meddata-backend.onrender.com/cities/${selectedState}`)
          setCities(response.data)
        } catch (error) {
          console.error('Error fetching cities:', error)
        }
      }
    }
    fetchCities()
  }, [selectedState])

  const handleSearch = (e) => {
    e.preventDefault()
    if (selectedState && selectedCity) {
      navigate('/search', { state: { state: selectedState, city: selectedCity } })
    }
  }

  return (
    <div className="home">
      <h1>Find Medical Centers</h1>
      <form onSubmit={handleSearch}>
        <div id="state">
          <select 
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div id="city">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <button type="submit" id="searchBtn">Search</button>
      </form>
    </div>
  )
}

export default Home