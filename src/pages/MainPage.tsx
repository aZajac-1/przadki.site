import { Link } from 'react-router-dom'
import './MainPage.css'

const MainPage = () => {
  return (
    <div>
      <div className="main-page">
        <section className="hero">
          <div className="hero-overlay">
            <p className="hero-subtitle">
              <img src="/flower_orange.svg" alt="flower" style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginRight: '10px' }} />
              save the date
              <img src="/flower_orange.svg" alt="flower" style={{ width: '50px', height: '50px', verticalAlign: 'middle', marginLeft: '10px' }} />
            </p>
            <h1 className="hero-title">Hajtamy się!</h1>

            <h2 className="hero-title">4 lipiec 2025</h2>
          </div>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>W Szczerym Polu</h3>
              <p className="address">Popów 19, 99-235 Popów</p>
            </div>
          </div>
        </section>
      </div>
      <div className='cta-section-container'>
        <div className="cta-section">
          <h3>Potwierdź swoją obecność</h3>
          <p>Daj znać czy będziesz z nami! </p>
          <Link to="/potwierdz" className="cta-button">
            Potwierdź
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MainPage

