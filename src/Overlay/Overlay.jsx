import { useState, useEffect, useRef } from 'react'
import './styles.css'
import Nav from './Nav'
import Anim from './Anim'

export default function Overlay() {
  const locationTagRef = useRef(null)
  const workTitleRef = useRef(null)
  const scrollIndicatorRef = useRef(null)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Scroll indicator - 50% scroll bo'lsa fade out, yuqoriga qaytsa fade in
  useEffect(() => {
    const handleScroll = () => {
      if (scrollIndicatorRef.current) {
        const scrollPercent = (window.scrollY / window.innerHeight) * 100

        if (scrollPercent > 50) {
          scrollIndicatorRef.current.classList.add('hidden')
        } else {
          scrollIndicatorRef.current.classList.remove('hidden')
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll animatsiyalarini ishga tushirish
  useEffect(() => {
    const sections = document.querySelectorAll('.section-2, .section-3')

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active')
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach(section => {
      observer.observe(section)
    })

    return () => {
      sections.forEach(section => {
        observer.unobserve(section)
      })
    }
  }, [])

  // Vaqtni formatlash
  const formatTime = (date) => {
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')
    const seconds = date.getSeconds().toString().padStart(2, '0')
    
    return `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`
  }

  return (
    <div className="container">
      {/* Nav componenti (logo + burger menu + music button) */}
      <Nav />
      
      {/* Text animatsiyalari */}
      <Anim locationTagRef={locationTagRef} workTitleRef={workTitleRef} />

      <div className="main-wrapper">
        {/* Home Section */}
        <section id="home" className="section section-1">
          <div className='header-h1-wrapper'>
            <h1 className="header-h1">Unfor Dev</h1>
          </div>
          <div className='header-info-wrapper'>
            <p className="header-info-1">Creating<br />Memorable</p>
            <p className="header-info-2">
              <span className="time-label">Local time</span>
              <span className="time-value">{formatTime(time)}</span>
            </p>
          </div>

          {/* Scroll Indicator */}
          <div ref={scrollIndicatorRef} className="section-1-scroll-indicator">
            <span className="scroll-text">Scroll to explore</span>
            <div className="scroll-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section section-2">
          <div className="about-content">
            <h2 ref={locationTagRef} className="location-tag">Based in <br /><strong>Uzb</strong></h2>
          </div>
          <div className="work-content">
            <h2 ref={workTitleRef} className="work-title">Working <br /><strong>Worldwide</strong></h2>
          </div>
        </section>

        {/* About Me Section */}
        <section className="section section-3">
          <div className="section-3-content">
            <h2 className="section-3-title">About Me</h2>
            <div className="section-3-text">
              <p className="section-3-paragraph">
                Hi, I'm Unfor — a Creative Frontend Developer specializing in immersive,
                WebGL-driven 3D experiences for the web. I focus on crafting interactive
                interfaces where real-time visuals, motion, and performance are carefully
                balanced to create engaging, high-impact digital experiences.
              </p>
              <p className="section-3-paragraph">
                I work primarily with modern frontend technologies such as React, Three.js,
                and React Three Fiber to create visually rich, high-performance interfaces
                and real-time 3D experiences directly in the browser.
              </p>
              <p className="section-3-paragraph">
                I approach frontend development as experience design rather than simple
                code implementation. Performance, responsiveness, and visual clarity are
                always central to my workflow, especially when working with complex
                animations and interactive scenes.
              </p>
              <p className="section-3-paragraph">
                I enjoy collaborating on long-term projects with product teams and creative
                studios where storytelling, motion, and technical quality play a key role
                in shaping meaningful digital products.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section section-4">
          <div className="section-4-content">
            <h2 className="section-4-title">Skills</h2>
            <div className="skills-grid">
                <div className="skill-item">
                  <div className="skill-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="256" height="228" viewBox="0 0 256 228"><path fill="#00d8ff" d="M210.483 73.824a172 172 0 0 0-8.24-2.597c.465-1.9.893-3.777 1.273-5.621c6.238-30.281 2.16-54.676-11.769-62.708c-13.355-7.7-35.196.329-57.254 19.526a171 171 0 0 0-6.375 5.848a156 156 0 0 0-4.241-3.917C100.759 3.829 77.587-4.822 63.673 3.233C50.33 10.957 46.379 33.89 51.995 62.588a171 171 0 0 0 1.892 8.48c-3.28.932-6.445 1.924-9.474 2.98C17.309 83.498 0 98.307 0 113.668c0 15.865 18.582 31.778 46.812 41.427a146 146 0 0 0 6.921 2.165a168 168 0 0 0-2.01 9.138c-5.354 28.2-1.173 50.591 12.134 58.266c13.744 7.926 36.812-.22 59.273-19.855a146 146 0 0 0 5.342-4.923a168 168 0 0 0 6.92 6.314c21.758 18.722 43.246 26.282 56.54 18.586c13.731-7.949 18.194-32.003 12.4-61.268a145 145 0 0 0-1.535-6.842c1.62-.48 3.21-.974 4.76-1.488c29.348-9.723 48.443-25.443 48.443-41.52c0-15.417-17.868-30.326-45.517-39.844m-6.365 70.984q-2.102.694-4.3 1.345c-3.24-10.257-7.612-21.163-12.963-32.432c5.106-11 9.31-21.767 12.459-31.957c2.619.758 5.16 1.557 7.61 2.4c23.69 8.156 38.14 20.213 38.14 29.504c0 9.896-15.606 22.743-40.946 31.14m-10.514 20.834c2.562 12.94 2.927 24.64 1.23 33.787c-1.524 8.219-4.59 13.698-8.382 15.893c-8.067 4.67-25.32-1.4-43.927-17.412a157 157 0 0 1-6.437-5.87c7.214-7.889 14.423-17.06 21.459-27.246c12.376-1.098 24.068-2.894 34.671-5.345q.785 3.162 1.386 6.193M87.276 214.515c-7.882 2.783-14.16 2.863-17.955.675c-8.075-4.657-11.432-22.636-6.853-46.752a157 157 0 0 1 1.869-8.499c10.486 2.32 22.093 3.988 34.498 4.994c7.084 9.967 14.501 19.128 21.976 27.15a135 135 0 0 1-4.877 4.492c-9.933 8.682-19.886 14.842-28.658 17.94M50.35 144.747c-12.483-4.267-22.792-9.812-29.858-15.863c-6.35-5.437-9.555-10.836-9.555-15.216c0-9.322 13.897-21.212 37.076-29.293c2.813-.98 5.757-1.905 8.812-2.773c3.204 10.42 7.406 21.315 12.477 32.332c-5.137 11.18-9.399 22.249-12.634 32.792a135 135 0 0 1-6.318-1.979m12.378-84.26c-4.811-24.587-1.616-43.134 6.425-47.789c8.564-4.958 27.502 2.111 47.463 19.835a144 144 0 0 1 3.841 3.545c-7.438 7.987-14.787 17.08-21.808 26.988c-12.04 1.116-23.565 2.908-34.161 5.309a160 160 0 0 1-1.76-7.887m110.427 27.268a348 348 0 0 0-7.785-12.803c8.168 1.033 15.994 2.404 23.343 4.08c-2.206 7.072-4.956 14.465-8.193 22.045a381 381 0 0 0-7.365-13.322m-45.032-43.861c5.044 5.465 10.096 11.566 15.065 18.186a322 322 0 0 0-30.257-.006c4.974-6.559 10.069-12.652 15.192-18.18M82.802 87.83a323 323 0 0 0-7.227 13.238c-3.184-7.553-5.909-14.98-8.134-22.152c7.304-1.634 15.093-2.97 23.209-3.984a322 322 0 0 0-7.848 12.897m8.081 65.352c-8.385-.936-16.291-2.203-23.593-3.793c2.26-7.3 5.045-14.885 8.298-22.6a321 321 0 0 0 7.257 13.246c2.594 4.48 5.28 8.868 8.038 13.147m37.542 31.03c-5.184-5.592-10.354-11.779-15.403-18.433c4.902.192 9.899.29 14.978.29c5.218 0 10.376-.117 15.453-.343c-4.985 6.774-10.018 12.97-15.028 18.486m52.198-57.817c3.422 7.8 6.306 15.345 8.596 22.52c-7.422 1.694-15.436 3.058-23.88 4.071a382 382 0 0 0 7.859-13.026a347 347 0 0 0 7.425-13.565m-16.898 8.101a359 359 0 0 1-12.281 19.815a329 329 0 0 1-23.444.823c-7.967 0-15.716-.248-23.178-.732a310 310 0 0 1-12.513-19.846h.001a307 307 0 0 1-10.923-20.627a310 310 0 0 1 10.89-20.637l-.001.001a307 307 0 0 1 12.413-19.761c7.613-.576 15.42-.876 23.31-.876H128c7.926 0 15.743.303 23.354.883a329 329 0 0 1 12.335 19.695a359 359 0 0 1 11.036 20.54a330 330 0 0 1-11 20.722m22.56-122.124c8.572 4.944 11.906 24.881 6.52 51.026q-.518 2.504-1.15 5.09c-10.622-2.452-22.155-4.275-34.23-5.408c-7.034-10.017-14.323-19.124-21.64-27.008a161 161 0 0 1 5.888-5.4c18.9-16.447 36.564-22.941 44.612-18.3M128 90.808c12.625 0 22.86 10.235 22.86 22.86s-10.235 22.86-22.86 22.86s-22.86-10.235-22.86-22.86s10.235-22.86 22.86-22.86"/></svg>
                  </div>
                  <div className="skill-name">React</div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#f5de19" d="M2 2h28v28H2z"/><path d="M20.809 23.875a2.87 2.87 0 0 0 2.6 1.6c1.09 0 1.787-.545 1.787-1.3c0-.9-.716-1.222-1.916-1.747l-.658-.282c-1.9-.809-3.16-1.822-3.16-3.964c0-1.973 1.5-3.476 3.853-3.476a3.89 3.89 0 0 1 3.742 2.107L25 18.128A1.79 1.79 0 0 0 23.311 17a1.145 1.145 0 0 0-1.259 1.128c0 .789.489 1.109 1.618 1.6l.658.282c2.236.959 3.5 1.936 3.5 4.133c0 2.369-1.861 3.667-4.36 3.667a5.06 5.06 0 0 1-4.795-2.691Zm-9.295.228c.413.733.789 1.353 1.693 1.353c.864 0 1.41-.338 1.41-1.653v-8.947h2.631v8.982c0 2.724-1.6 3.964-3.929 3.964a4.085 4.085 0 0 1-3.947-2.4Z"/></svg>
                  </div>
                  <div className="skill-name">JavaScript</div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#fff" rx="60"/><path stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="4" d="M93.213 222.94L50 48l173.23 49.874z" clipRule="evenodd"/><path stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="4" d="m136.583 72.942l21.591 87.496l-86.567-24.945z" clipRule="evenodd"/><path stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="4" d="m115.103 147.36l-10.724-43.465l43.008 12.346zM93.65 60.483l10.725 43.465l-43.008-12.346zm86.013 24.777l10.724 43.465l-43.008-12.346zm-64.555 62.13l10.724 43.465l-43.008-12.346z" clipRule="evenodd"/></g></svg>
                  </div>
                  <div className="skill-name">Three.js & R3F</div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#131210" rx="60"/><path fill="#fff" d="M105.552 137.283c.775-13.88 7.539-26.109 17.744-34.778c10.008-8.514 23.479-13.718 38.177-13.718c14.683 0 28.154 5.204 38.169 13.718c10.198 8.669 16.962 20.898 17.744 34.763c.774 14.262-4.931 27.511-14.939 37.332c-10.205 9.99-24.72 16.259-40.974 16.259s-30.798-6.269-40.996-16.259c-10.016-9.821-15.706-23.07-14.925-37.317"/><path fill="#265787" d="M132.782 138.529c.397-7.122 3.868-13.397 9.104-17.845c5.135-4.369 12.047-7.039 19.589-7.039c7.534 0 14.446 2.67 19.584 7.039c5.233 4.448 8.704 10.723 9.105 17.837c.397 7.318-2.53 14.116-7.665 19.156c-5.237 5.126-12.684 8.342-21.024 8.342s-15.803-3.216-21.036-8.342c-5.138-5.04-8.058-11.838-7.657-19.148"/><path fill="#ea7600" d="M87.09 152.92c.049 2.787.933 8.203 2.26 12.433c2.79 8.952 7.52 17.234 14.101 24.533c6.755 7.503 15.072 13.529 24.679 17.807c10.098 4.493 21.039 6.783 32.404 6.764c11.346-.015 22.287-2.35 32.385-6.877c9.607-4.32 17.917-10.372 24.66-17.878c6.578-7.33 11.301-15.627 14.097-24.579a62.4 62.4 0 0 0 2.65-13.721a62.8 62.8 0 0 0-.438-13.626c-1.252-8.851-4.3-17.156-8.993-24.726c-4.291-6.956-9.824-13.046-16.402-18.172l.015-.012l-66.386-51.217c-.06-.046-.108-.095-.172-.136c-4.356-3.36-11.68-3.348-16.47.019c-4.843 3.405-5.397 9.035-1.087 12.587l-.019.019l27.689 22.624l-84.393.09h-.112c-6.976.008-13.681 4.606-15.008 10.418c-1.364 5.92 3.373 10.831 10.626 10.858l-.011.026l42.775-.083l-76.33 58.871c-.097.072-.202.147-.292.219c-7.2 5.54-9.528 14.752-4.993 20.582c4.603 5.929 14.39 5.94 21.665.034l41.659-34.258s-.608 4.625-.559 7.401m107.047 15.487c-8.583 8.787-20.6 13.77-33.603 13.796c-13.022.023-25.039-4.915-33.622-13.687c-4.194-4.275-7.276-9.193-9.176-14.432a37.6 37.6 0 0 1-2.106-16.128c.453-5.389 2.05-10.53 4.599-15.181c2.504-4.573 5.952-8.704 10.21-12.199c8.344-6.832 18.966-10.531 30.076-10.546c11.121-.015 21.736 3.649 30.088 10.459c4.25 3.48 7.695 7.597 10.199 12.161a38.2 38.2 0 0 1 4.617 15.175a37.7 37.7 0 0 1-2.114 16.116c-1.904 5.254-4.974 10.172-9.168 14.466"/></g></svg>
                  </div>
                  <div className="skill-name">3D-Modeling</div>
                </div>
                <div className="skill-item">
                  <div className="skill-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#639" d="M0 0h107.52C118.831 0 128 9.168 128 20.48v87.04c0 11.312-9.168 20.48-20.48 20.48H20.48C9.169 128 0 118.832 0 107.52Z"/><path fill="#fff" d="M45.836 117.762c-8.219-.008-13.293-4.64-13.195-13.16V83.05q0-6.481 3.793-9.852c4.543-4.379 15.082-4.644 19.53.067c2.743 2.417 3.778 7.355 3.532 11.964H50.06c.074-1.808-.024-4.554-1.09-5.586c-1.383-1.87-5.035-1.652-6.004.297c-.594 1.059-.89 2.621-.89 4.696v18.71q0 5.884 4.09 5.95q1.914-.001 2.905-1.39c.918-1.099 1.063-3.528.989-5.29h9.437c.645 8.969-4.652 15.254-13.66 15.144Zm29.957 0c-9.11.125-13.184-6.36-12.934-15.145h8.91c-.25 3.832 1.067 7.32 4.223 7.078q2.11 0 2.969-1.324c1.086-1.613 1.293-6.265-.266-8.066c-1.085-1.735-4.996-3.266-7.058-4.297q-4.423-2.115-6.367-5.027c-2.93-4.305-2.657-13.754 1.449-17.586c3.992-4.727 14.414-4.942 18.41-.098c2.465 2.496 3.54 7.41 3.332 11.934h-8.578c.074-1.86-.102-4.86-.824-5.95q-.762-1.39-2.871-1.39q-3.762.001-3.762 4.496c.027 3.18 1.27 4.488 4.16 5.816c3.742 1.453 8.5 3.938 10.227 6.942c5.144 9.16 1.613 23.148-11.02 22.613Zm28.77 0c-9.11.125-13.184-6.36-12.934-15.145h8.91c-.25 3.832 1.066 7.32 4.223 7.078q2.108 0 2.969-1.324c1.085-1.613 1.289-6.265-.266-8.066c-1.086-1.735-4.996-3.266-7.059-4.297q-4.423-2.115-6.367-5.027c-2.93-4.305-2.656-13.754 1.45-17.586c3.992-4.727 14.413-4.942 18.41-.098c2.464 2.496 3.539 7.41 3.332 11.934h-8.579c.07-1.86-.101-4.86-.824-5.95q-.762-1.39-2.87-1.39q-3.763.001-3.763 4.496c.028 3.18 1.27 4.488 4.16 5.816c3.743 1.453 8.5 3.938 10.227 6.942c5.145 9.16 1.614 23.148-11.02 22.613Z"/></svg>
                  </div>
                  <div className="skill-name">Designs</div>
                </div>
            </div>

            {/* <div className="skill-tags">
              <span className="skill-tag">HTML</span>
              <span className="skill-tag">CSS</span>
              <span className="skill-tag">Scss</span>
              <span className="skill-tag">React</span>
              <span className="skill-tag">JavaScript</span>
              <span className="skill-tag">Three.js</span>
              <span className="skill-tag">R3F</span>
              <span className="skill-tag">WebGL</span>
              <span className="skill-tag">Tailwind CSS</span>
              <span className="skill-tag">Next.js</span>
              <span className="skill-tag">Typescript</span>
              <span className="skill-tag">Bootstrap</span>
              <span className="skill-tag">Postprocessing</span>
              <span className="skill-tag">Shader</span>
              <span className="skill-tag">Gsap (Animation, Camera animation, Scroll animation)</span>
              <span className="skill-tag">Framer Motion</span>
              <span className="skill-tag">Blender (3D Modeling, Animation, Rendering)</span>
              <span className="skill-tag">Spline</span>
              <span className="skill-tag">Rive</span>
              <span className="skill-tag">Dora</span>
              <span className="skill-tag">Unicorn Studio</span>
              <span className="skill-tag">NodeToy</span>
              <span className="skill-tag">OGL</span>
              <span className="skill-tag">Figma (UI/UX Design)</span>
              <span className="skill-tag">Pixso</span>
              <span className="skill-tag">Sketchfab</span>
              <span className="skill-tag">Polyhaven</span>
              <span className="skill-tag">Prismic</span>
              <span className="skill-tag">Bem</span>
              <span className="skill-tag">Git</span>
              <span className="skill-tag">GitHub</span>
              <span className="skill-tag">CapCut, VN, Canva,(Video Editing)</span>
              <span className="skill-tag">Performance Optimization</span>
              <span className="skill-tag">Responsive Design</span>
              <span className="skill-tag">SEO</span>
              <span className="skill-tag">Vite</span>
              <span className="skill-tag">Vercel</span>
            </div> */}

            {/* SKILLS GROUPS GRID */}
          <div className="skills-groups-wrapper">
            {/* CORE SKILLS */}
            <div className="skills-group skills-core">
              <h3 className="skills-group-title">Core Expertise</h3>
              <div className="skills-tags">
                <span className="skill-tag core">Three.js</span>
                <span className="skill-tag core">React Three Fiber</span>
                <span className="skill-tag core">WebGL</span>
                <span className="skill-tag core">Shaders</span>
                <span className="skill-tag core">Postprocessing</span>
                <span className="skill-tag core">Performance Optimization</span>
              </div>
            </div>

            {/* SUPPORT SKILLS */}
            <div className="skills-group skills-support">
              <h3 className="skills-group-title">Supporting Tech</h3>
              <div className="skills-tags">
                <span className="skill-tag support">React</span>
                <span className="skill-tag support">JavaScript</span>
                <span className="skill-tag support">TypeScript</span>
                <span className="skill-tag support">GSAP</span>
                <span className="skill-tag support">Framer Motion</span>
                <span className="skill-tag support">Modern CSS</span>
              </div>
            </div>

            {/* TOOLS */}
            <div className="skills-group skills-tools">
              <h3 className="skills-group-title">Tools & Workflow</h3>
              <div className="skills-tags">
                <span className="skill-tag tool">Blender</span>
                <span className="skill-tag tool">Figma</span>
                <span className="skill-tag tool">Git</span>
                <span className="skill-tag tool">Vite</span>
                <span className="skill-tag tool">Vercel</span>
                <span className="skill-tag tool">Spline</span>
                <span className="skill-tag tool">Rive</span>
                <span className="skill-tag tool">Sketchfab</span>
                <span className="skill-tag tool">Polyhaven</span>
              </div>
            </div>
          </div>

          </div>
        </section>

        <section className="section section-5">
          <div className="section-5-content">
            <div className="section-5-text">
              <p className="section-5-paragraph">
                My core expertise lies in modern frontend development using JavaScript, React, and component-based architectures with a strong focus on
                scalability, reusability, and performance-oriented rendering strategies.
              </p>
              <p className="section-5-paragraph">
                On the creative side, I build interactive 3D experiences using Three.js and
                React Three Fiber, working with Models, Textures, Lighting, Postprocessing and Shaders effects
                to deliver optimized real-time visuals in the browser.
              </p>
              <p className="section-5-paragraph">
                I am comfortable translating design concepts into responsive, animated
                interfaces using CSS, modern layout systems, and motion principles that
                enhance user engagement without compromising clarity or performance.
              </p>
              <p className="section-5-paragraph">
                My workflow emphasizes clean architecture, maintainable code, Git-based
                version control, and close collaboration with designers to ensure visual
                consistency and technical reliability across all devices.
              </p>
            </div>
          </div>
        </section>
        {/* <section className="section"></section> */}

        <section id="work" className="section section-6">
          <div className="section-6-wrapper">
            <div className="section-6-content">
              <h2 className="section-6-title" data-effect26>
                <span className="section-6-word section-6-word-1">Welcome to</span>
                <span className="section-6-word section-6-word-2">My Works</span>
              </h2>
            </div>
          </div>
        </section>
        
        <section className="section section-7"><h1>H</h1></section>
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
