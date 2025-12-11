"use client";
import './styles.css'
import { useEffect } from 'react'
import React from "react";

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
    <div className="container"> {/* Absolute UI */}

      <header>
        <div className="brand">
          <p>
            Unfor <strong>Dev</strong>
          </p>
          <button className='music-button' id='musicButton'>SOUND</button>
          <audio id="backgroundMusic" src="/music.mp3" preload="auto" loop></audio>
        </div>

        <div className='header-nav'>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>My Works</li>
            <li>Contact</li>
          </ul>
        </div>

      </header>

      <div className="main-wrapper"> {/* Main Container 1200px */}

        <section className="section section-1">
          <h1 className='header-h1'>
            Unfor Dev
          </h1>
        </section>

        <section className="section section-2"></section>

        <section className="section section-3"></section>

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
