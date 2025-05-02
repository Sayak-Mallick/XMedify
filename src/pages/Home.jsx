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
          <ul>
            {states.map((state) => (
              <li 
                key={state}
                onClick={() => setSelectedState(state)}
                className={selectedState === state ? 'selected' : ''}
              >
                {state}
              </li>
            ))}
          </ul>
        </div>

        <div id="city">
          <ul>
            {cities.map((city) => (
              <li
                key={city}
                onClick={() => setSelectedCity(city)}
                className={selectedCity === city ? 'selected' : ''}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>

        <button type="submit" id="searchBtn" disabled={!selectedState || !selectedCity}>Search</button>
      </form>
    </div>
  )
}

export default Home