//import { Link } from 'react-router-dom'
import './MainPage.css'

const MainPage = () => {
  return (
      <div className="main-page">
        <section className="hero">
          <div className="hero-background">
            <img src="/save_the_date_my.png" alt="Ola i Pioter się hajtają" className="hero-image" />
          </div>
          <div className="hero-overlay">
            <p className="hero-subtitle">
              <img src="/flower_orange.svg" alt="flower" className="flower-icon flower-icon-right" />
              save the date
              <img src="/flower_orange.svg" alt="flower" className="flower-icon flower-icon-left" />
            </p>
            <h1 className="hero-title orange-text margin-bottom-3">Pobieramy się!</h1>
            <p className="hero-subtitle pink-text">
              Serdecznie zapraszamy na 
              nasz ślub<br />
               i wesele, które odbędzie się <br />
            </p>
            <h2 className="hero-title pink-text"><b>4 lipca 2026</b></h2>
            <a href="https://maps.app.goo.gl/rLbWcTQit4psTALL6" target="_blank" className="info-card">
              <div className="info-icon">📍</div>
              <h3 className="pink-text">W Szczerym Polu</h3>
              <p className="address">Popów 19, 99-235 Popów</p>
            </a>
            <p className="hero-subtitle pink-text">
              <b>Ola i Piotr</b></p>
          </div>
        </section>
      {/*<div className="cta">
        <div className="cta-background"></div>
        <h3>Potwierdź swoją obecność</h3>
        <p>Daj znać czy będziesz z nami! </p>
        <Link to="/potwierdz" className="cta-button">
          Potwierdź
        </Link>
      </div>*/}
    </div>
  )
}

export default MainPage

