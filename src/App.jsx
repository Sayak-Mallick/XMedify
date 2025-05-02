import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState } from 'react'
import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import MyBookings from './pages/MyBookings'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="top-nav">
          <Link to="/">Home</Link>
          <Link to="/my-bookings">My Bookings</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
