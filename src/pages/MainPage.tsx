//import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TABLE_PLAN, formatGuestName, splitTableSides } from '../data/tablePlan'
import './MainPage.css'

gsap.registerPlugin(ScrollTrigger)

const DAY_PLAN = [
  { time: '17:00', event: 'Ceremonia ślubu' },
  { time: '17:15', event: 'Powitanie i życzenia' },
  { time: '18:00', event: 'Kolacja serwowana' },
  { time: '22:00', event: 'Tort' },
  { time: '21:00–23:30', event: 'Drugi ciepły posiłek' },
  { time: '24:00', event: 'Finał gry Bingo' },
  { time: '24:00–2:30', event: 'Trzeci ciepły posiłek' },
] as const

const MainPage = () => {
  const invitationRef = useRef<HTMLElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const invitation = invitationRef.current
    const info = infoRef.current
    const mainPage = document.querySelector('.main-page')
    const hero = heroRef.current
    if (!mainPage || !info || !invitation || !hero) return

    const isMobile = window.innerWidth <= 768

    let scrollTrigger: ScrollTrigger | undefined

    if (!isMobile) {
      scrollTrigger = ScrollTrigger.create({
        trigger: mainPage,
        start: 'top top',
        end: 'bottom bottom',
        pin: hero,
        pinSpacing: false,
        invalidateOnRefresh: true,
      })
    }

    const refreshScrollTrigger = () => ScrollTrigger.refresh()

    const heroImage = hero.querySelector('.hero-main-image')
    if (heroImage instanceof HTMLImageElement) {
      if (heroImage.complete) {
        refreshScrollTrigger()
      } else {
        heroImage.addEventListener('load', refreshScrollTrigger)
      }
    }

    window.addEventListener('resize', refreshScrollTrigger)
    requestAnimationFrame(refreshScrollTrigger)

    return () => {
      window.removeEventListener('resize', refreshScrollTrigger)
      heroImage?.removeEventListener('load', refreshScrollTrigger)
      scrollTrigger?.kill()
    }
  }, [])

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    event.preventDefault()
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className="main-nav" aria-label="Nawigacja">
        <a href="#informacje" className="main-nav-link" onClick={(e) => handleNavClick(e, 'informacje')}>Informacje</a>
        <a href="#plan-stolow" className="main-nav-link" onClick={(e) => handleNavClick(e, 'plan-stolow')}>Plan stołów</a>
        <a href="#plan-przyjecia" className="main-nav-link" onClick={(e) => handleNavClick(e, 'plan-przyjecia')}>Plan przyjęcia</a>
      </nav>
      <div className="main-page">
          <section className="hero" ref={heroRef}>
            <div className="hero-media">
              <img src="/przadki_hero.jpg" alt="Ola i Piotr się hajtają" className="hero-main-image" />
              <h1 className="hero-title">
                <span className="hero-title-part">Bierzemy</span>
                <span className="hero-title-part">ślub!</span>
              </h1>
            </div>
          </section>
          <section id="informacje" className="invitation" ref={invitationRef}>
            <div className="invitation-overlay">
              <p className="invitation-subtitle pink-text">
                Serdecznie zapraszamy na <br />
                nasz ślub i wesele, <br />
                które odbędzie się <br />
              </p>
              <h2 className="invitation-title orange-text">4 lipca 2026</h2>
              <p className="invitation-subtitle orange-text margin-bottom-3">o godzinie <span className="invitation-title"><b>17:00</b></span> </p>
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
              <div className="info-box-icon">
                <img src="/5.svg" alt="Ślub cywilny" />
              </div>
              <h3 className="info-box-title">Ślub cywilny</h3>
              <p className="info-box-text">
                Ceremonia ślubu cywilnego jest krótka. Prosimy o&nbsp;punktualność, abyście jej nie przegapili.
              </p>
            </div>
              <div className="info-box">
                <div className="info-box-icon">
                  <img src="/1.svg" alt="Buty" />
                </div>
                <h3 className="info-box-title">Buty</h3>
              <p className="info-box-text">
                W&nbsp;miejscu przyjęcia czeka na Was trawa i&nbsp;kocie łby. Fankom szpilek sugerujemy zostawić je w domu lub zabrać buty na zmianę.
              </p>
            </div>
            <div className="info-box">
              <div className="info-box-icon">
                <img src="/2.svg" alt="Dress code" />
              </div>
              <h3 className="info-box-title">Dress code</h3>
              <p className="info-box-text">
                Czeka nas gorący, letni wieczór. Zachęcamy do wyboru kolorowego stroju z&nbsp;lekkich materiałów. Garnitury i krawaty nie są obowiązkowe.
              </p>
            </div>
            <div className="info-box">
              <div className="info-box-icon">
                <img src="/4.svg" alt="Prezenty" />
              </div>
              <h3 className="info-box-title">Prezenty</h3>
              <p className="info-box-text">
                <span>Kwiatów i wina będzie pod dostatkiem. Jeśli chcesz nam coś kupić, </span>
                <a href="https://www.coffeedesk.pl/kawa/metoda-parzenia/przelewowe-metody-parzenia/?filter=opakowanie:250-g,200-g,252-g,10-saszetek&order=topseller"
                target="_blank" className="pink-text" style={{textDecoration: 'underline', display: 'inline'}}>kup nam kawę!</a>
              </p>
            </div>
          </div>
        </div>
        <section id="plan-stolow" className="plan-section">
          <div className="plan-content plan-content-wide">
            <h2 className="plan-title orange-text">Plan stołów</h2>
            <div className="table-plan">
              {TABLE_PLAN.map((table) => {
                const [sideA, sideB] = splitTableSides(table.guests)

                return (
                <article key={table.number} className="table-card">
                  <h3 className="table-card-title pink-text">Stół {table.number}</h3>
                  <div className="table-sides">
                    {[sideA, sideB].map((side, index) => (
                      <ul key={index} className="table-guest-list">
                        {side.map((guest) => (
                          <li key={guest} className="table-guest">{formatGuestName(guest)}</li>
                        ))}
                      </ul>
                    ))}
                  </div>
                </article>
                )
              })}
            </div>
          </div>
        </section>
        <section id="plan-przyjecia" className="plan-section">
          <div className="plan-content">
            <h2 className="plan-title orange-text">Plan przyjęcia</h2>
            <ol className="day-plan">
              {DAY_PLAN.map((item) => (
                <li key={`${item.time}-${item.event}`} className="day-plan-item">
                  <time className="day-plan-time pink-text">{item.time}</time>
                  <span className="day-plan-event">{item.event}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </>
  )
}

export default MainPage
