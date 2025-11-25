import './styles.css'
import { useEffect } from 'react'

export default function Overlay() {
  useEffect(() => {
    const audio = document.getElementById('backgroundMusic')
    const musicButton = document.getElementById('musicButton')
    let isPlaying = false

    if (!audio || !musicButton) return

    const toggleMusic = () => {
      if (!isPlaying) {
        audio.play().then(() => {
          musicButton.textContent = 'PAUSE'
          isPlaying = true
        }).catch((err) => {
          console.error('Audio play error:', err)
        })
      } else {
        audio.pause()
        musicButton.textContent = 'PLAY'
        isPlaying = false
      }
    }

    musicButton.addEventListener('click', toggleMusic)

    return () => {
      musicButton.removeEventListener('click', toggleMusic)
    }
  }, [])

  return (
    <div className="container">
      <div className="line line1" />
      <div className="line line2" />
      <div className="line line3" />
      <div className="line line4" />
      <div className="line line5" />

      <header>
        <div className="brand">
          <p>
            SPIDERMAN <strong>BLACK</strong>
          </p>
        </div>

        <div className='header-nav'>
          <ul>
            <li>Origins</li>
            <li>Powers</li>
            <li>Legacy</li>
          </ul>
        </div>

        {/* Musiqa tugmasi va audio tag'i */}
        <button id='musicButton'>SOUND</button>
        <audio id="backgroundMusic" src="/music.mp3" preload="auto" loop></audio>
      </header>

      <div className="main-wrapper">
        <section className="section section-1">
          {/* <video width="380" height="280" autoPlay muted loop>
            <source src="1.mp4" type="video/mp4" />
          </video>
          <video width="380" height="280" autoPlay muted loop>
            <source src="3.mp4" type="video/mp4" />
          </video>
          <video width="380" height="280" autoPlay muted loop>
            <source src="2.mp4" type="video/mp4" />
          </video> */}
        </section>

        <section className="section section-2">
          {/* <div className="wrapper">
            <h2>The Symbiote Bond</h2>
            <p>
              Discovered during the Secret Wars, the alien symbiote latched onto Peter Parker, 
              creating the iconic black suit. Initially enhancing his abilities, it soon revealed 
              its sinister nature, amplifying aggression while providing unprecedented power.
            </p>
            <h2>Enhanced Abilities</h2>
            <p>
              The black suit grants unlimited webbing, increased strength, night vision, 
              and adaptive camouflage. It heals wounds rapidly and can shapeshift into civilian 
              clothing, making it the ultimate stealth weapon for Spider-Man.
            </p>
            <h2>Psychological Toll</h2>
            <p>
              The suit's true danger lies in its mental influence - feeding on adrenaline 
              and negative emotions. Peter's internal struggle with the symbiote's darkness 
              became one of Marvel's most compelling character arcs.
            </p>
          </div> */}
        </section>

        <section className="section section-3">
          {/* <div className="card-wrapper">
            <div className="card">
              <h2>1984</h2>
              <p>
                The year Spider-Man first acquired the black suit in Marvel Comics, 
                revolutionizing the character and spawning one of his most iconic looks.
              </p>
            </div>
            <div className="card">
              <h2>3X</h2>
              <p>
                The symbiote triples Spider-Man's strength, reflexes, and durability 
                while eliminating his need for mechanical web-shooters.
              </p>
            </div>
          </div>
          <div className="numbers-title">
            <h2>
              SYMBIOTE <strong>POTENTIAL</strong>
            </h2>
            <p>
              The black suit represents both Spider-Man's greatest power upgrade and 
              most dangerous temptation. Its legacy continues through Venom, Carnage, 
              and the entire symbiote saga that reshaped Marvel Comics forever.
            </p>
          </div> */}
        </section>

        <section className="section section-4"></section>
        <section className="section section-5"></section>
        <section className="section section-6"></section>
        <section className="section section-7"></section>
        <section className="section section-8"></section>
        <section className="section section-9"></section>
        <section className="section section-10"></section>
        <section className="section section-11"></section>
        <section className="section section-12"></section>
        <section className="section section-13"></section>

      </div>

      <footer>
        <div className="footer-left">
          <h3>The suit makes the hero</h3>
          <p>But at what cost?</p>
          <p className="copyright">All rights reserved © 2025 by Unfor</p>
        </div>
      </footer>
    </div>
  )
}
