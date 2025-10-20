import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ConfirmPage.css'

const ConfirmPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '1'
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="confirm-page">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h1>Confirmation Successful!</h1>
          <p>Thank you for confirming your attendance, {formData.name}!</p>
          <p className="success-detail">
            We've sent a confirmation email to <strong>{formData.email}</strong>
          </p>
          <div className="success-info">
            <p>Number of guests: <strong>{formData.guests}</strong></p>
            <p>We look forward to seeing you at the event!</p>
          </div>
          <Link to="/" className="back-button">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="confirm-page">
      <div className="confirm-container">
        <Link to="/" className="back-link">← Back to Event Details</Link>
        
        <div className="confirm-content">
          <h1>Confirm Your Attendance</h1>
          <p className="subtitle">Please fill in your details to confirm your attendance at our event</p>

          <form onSubmit={handleSubmit} className="confirm-form">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+48 123 456 789"
              />
            </div>

            <div className="form-group">
              <label htmlFor="guests">Number of Guests</label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="5">5+ People</option>
              </select>
            </div>

            <button type="submit" className="submit-button">
              Confirm Attendance
            </button>
          </form>

          <div className="event-reminder">
            <h3>Event Quick Details</h3>
            <ul>
              <li>📅 Saturday, November 15, 2025</li>
              <li>🕖 7:00 PM - 11:00 PM</li>
              <li>📍 Grand Event Center, 123 Main Street</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmPage

