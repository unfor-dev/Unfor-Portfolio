import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Animatsiya variantlari
const menuSlide = {
  initial: { x: 'calc(100% + 100px)' },
  enter: { x: '0', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: { x: 'calc(100% + 100px)', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
}

const linkSlide = {
  initial: { x: 80 },
  enter: (i) => ({ x: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
  exit: (i) => ({ x: 80, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i } }),
}

const indicatorScale = {
  open: { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } },
}

// Nav elementlari
const navItems = [
  { title: 'Home', href: '#home' },
  { title: 'About', href: '#about' },
  { title: 'Work', href: '#work' },
  { title: 'Contact', href: '#contact' },
]

// Music Button - Dumaloq tugma, Y shaklidagi barlar
function MusicButton() {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (!isPlaying) {
      audio.play().then(() => setIsPlaying(true)).catch(console.error)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music.mp3" preload="auto" loop />
      <button
        onClick={toggleMusic}
        className={`music-button ${isPlaying ? 'music-button--playing' : ''}`}
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <span className="music-button__bar" />
        <span className="music-button__bar" />
        <span className="music-button__bar" />
      </button>
    </>
  )
}

// Menu Footer
function MenuFooter() {
  return (
    <div className="menu__footer">
      <a href="#">Awwwards</a>
      <a href="#">Instagram</a>
      <a href="#">Dribble</a>
      <a href="#">LinkedIn</a>
    </div>
  )
}

// Menu Curve
function MenuCurve() {
  const h = typeof window !== 'undefined' ? window.innerHeight : 0
  const initialPath = `M100 0 L200 0 L200 ${h} L100 ${h} Q-100 ${h / 2} 100 0`
  const targetPath = `M100 0 L200 0 L200 ${h} L100 ${h} Q100 ${h / 2} 100 0`

  const curve = {
    initial: { d: initialPath },
    enter: { d: targetPath, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
    exit: { d: initialPath, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  }

  return (
    <svg className="menu__curve">
      <motion.path variants={curve} initial="initial" animate="enter" exit="exit" />
    </svg>
  )
}

// Menu Item
function MenuItem({ data, isActive, setSelected, closeMenu }) {
  const { title, href, index } = data

  const handleClick = (e) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    closeMenu()
  }

  return (
    <motion.div
      className="menu__item"
      onMouseEnter={() => setSelected(href)}
      custom={index}
      variants={linkSlide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        className="menu__item-dot"
        variants={indicatorScale}
        animate={isActive ? 'open' : 'closed'}
      />
      <a href={href} onClick={handleClick}>{title}</a>
    </motion.div>
  )
}

// Menu Panel
function Menu({ closeMenu }) {
  const [selected, setSelected] = useState('#home')

  return (
    <motion.div
      className="menu"
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <div className="menu__body">
        <div className="menu__links">
          <p className="menu__title">Navigation</p>
          {navItems.map((item, i) => (
            <MenuItem
              key={item.href}
              data={{ ...item, index: i }}
              isActive={selected === item.href}
              setSelected={setSelected}
              closeMenu={closeMenu}
            />
          ))}
        </div>
        <MenuFooter />
      </div>
      <MenuCurve />
    </motion.div>
  )
}

// Asosiy Nav Componenti
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="header">
        {/* Logo */}
        <div className="logo">
          <span className="logo__copy">©</span>
          <div className="logo__text">
            <div className="logo__stack">
              <div className="logo__row">
                <span className="logo__code">Code by</span>
                <span className="logo__name">Unfor</span>
              </div>
              <div className="logo__row">
                <span className="logo__name">Unfor</span>
                <span className="logo__surname">Dev</span>
              </div>
            </div>
          </div>
        </div>

        {/* O'ng tomon: Music + Burger */}
        <div className="header__actions">
          <MusicButton />
          <button
            className={`burger ${menuOpen ? 'burger--active' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className="burger__line" />
            <span className="burger__line" />
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {menuOpen && <Menu closeMenu={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
