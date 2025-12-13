import './styles.css'
import Nav from './Nav'

export default function Overlay() {
  return (
    <div className="container">
      {/* Nav componenti (logo + burger menu + music button) */}
      <Nav />

      <div className="main-wrapper">
        {/* Home Section */}
        <section id="home" className="section section-1">
          <h1 className="header-h1">Unfor Dev</h1>
        </section>

        {/* About Section */}
        <section className="section section-2"></section>

        {/* Work Section */}
        <section id="about" className="section section-3"></section>

        {/* Contact Section */}
        <section className="section section-4"></section>

        <section className="section section-5"></section>
        <section id="work" className="section section-6"></section>
        <section className="section section-7"></section>
        <section className="section section-8"></section>
        <section className="section section-9"></section>
        <section className="section section-10"></section>
        <section className="section section-11"></section>
        <section className="section section-12"></section>
        <section className="section section-13"></section>
      </div>

      <footer>
        <div id="contact" className="footer-left">
          <h3>The suit makes the hero</h3>
          <p>But at what cost?</p>
          <p className="copyright">All rights reserved © 2025 by Unfor</p>
        </div>
      </footer>
    </div>
  )
}
