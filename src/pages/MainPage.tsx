//import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './MainPage.css'

gsap.registerPlugin(ScrollTrigger)

const MainPage = () => {
  const invitationRef = useRef<HTMLElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const invitation = invitationRef.current
    const info = infoRef.current
    const mainPage = document.querySelector('.main-page')
    const hero = document.querySelector('.hero')
    const heroImage = heroImageRef.current
    if (!mainPage || !info || !invitation || !hero || !heroImage) return
    
    // Pinowanie obrazka hero podczas scrollowania sekcji start
    ScrollTrigger.create({
      trigger: mainPage,
      start: 'top top',
      end: 'bottom bottom',
      pin: heroImage,
      pinSpacing: false,
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
      <div className="main-page">
          <section className="hero">
            <img ref={heroImageRef} src="/przadki_hero.png" alt="Ola i Piotr" className="hero-main-image" />
          </section>
          <section className="invitation" ref={invitationRef}>
            <div className="invitation-background">
              {/* <img src="/save_the_date_my.png" alt="Ola i Pioter się hajtają" className="hero-image" /> */}
            </div>
            <div className="invitation-overlay">
              <div className="invitation-box  margin-bottom-3">
                <h1 className="invitation-title orange-text ">Bierzemy ślub!</h1>
              </div>
              
              <p className="invitation-subtitle pink-text">
                Serdecznie zapraszamy na 
                nasz ślub<br />
                i wesele, które odbędzie się <br />
              </p>
              <h2 className="invitation-title pink-text">4 lipca 2026</h2>
              <p className="invitation-subtitle pink-text margin-bottom-3">o godzinie <span className="invitation-title"><b>17:00</b></span> </p>
              <a href="https://maps.app.goo.gl/rLbWcTQit4psTALL6" target="_blank" className="info-card">
                <div className="info-icon">📍</div>
                <h3 className="pink-text">W Szczerym Polu</h3>
                <p className="address">Popów 19, 99-235 Popów</p>
              </a>
              <p className="invitation-subtitle pink-text">
                <b>Ola i Piotr</b></p>
            </div>
          </section>
        <div className="info" ref={infoRef}>
          <div className="info-grid">
          <div className="info-box">
              <div className="info-box-icon"></div>
              <h3 className="info-box-title">Posiłki</h3>
              <p className="info-box-text">
                Jeśli macie jakiekolwiek ograniczenia żywieniowe, dajcie znać. Z&nbsp;przyjemnością ovnie zadbamy. 
              </p>
            </div>
            <div className="info-box">
              <div className="info-box-icon">💍</div>
              <h3 className="info-box-title">Ślub cywilny</h3>
              <p className="info-box-text">
                Ceremonia ślubu cywilnego jest krótka. Prosimy o&nbsp;punktualność, abyście nie przegapili ceremonii.
              </p>
            </div>
              <div className="info-box">
                <div className="info-box-icon">👠</div>
                <h3 className="info-box-title">Buty</h3>
              <p className="info-box-text">
                W&nbsp;miejscu przyjęcia czeka na Was trawa i&nbsp;kocie łby. Fankom szpilek sugerujemy zostawić je w domu lub zabrać buty na zmianę.
              </p>
            </div>
            <div className="info-box">
              <div className="info-box-icon"></div>
              <h3 className="info-box-title">Dress code</h3>
              <p className="info-box-text">
                Czeka nas gorący, letni wieczór. Zachecamy do wyboru kolorowego stroju z&nbsp;lekkich materiałów.
              </p>
            </div>
            <div className="info-box">
              <div className="info-box-icon">☕</div>
              <h3 className="info-box-title">Prezenty</h3>
              <p className="info-box-text">
                Naszego ulubionego napoju nigdy za wiele. Zamiast kwiatów i&nbsp;wina, chcielibyśmy otrzymać od Was kawę!
              </p>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MainPage

