/**
 * ProjectModal Component - Skeleton
 * ==================================
 * Lusion.co stiliga o'xshash professional case study
 *
 * TODO: O'zingiz to'ldiring
 * - Hero section animatsiyalar
 * - Scroll-based reveal
 * - Media gallery
 */

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getProjectById } from '../data/projects';
import './ProjectModal.css';

export default function ProjectModal({ projectId, onClose }) {
  const project = projectId ? getProjectById(projectId) : null;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const scrollIndicatorRef = useRef(null);
  const modalScrollRef = useRef(null);

  // onClose ni useCallback bilan wrap qilish - memory leak oldini olish
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Scroll indicator - 50% scroll bo'lsa fade out, qaytsa fade in
  const handleScroll = useCallback((e) => {
    if (scrollIndicatorRef.current && modalScrollRef.current) {
      const scrollHeight = modalScrollRef.current.scrollHeight - modalScrollRef.current.clientHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = (e.target.scrollTop / scrollHeight) * 100;

      if (scrollPercent > 50) {
        scrollIndicatorRef.current.classList.add('hidden');
      } else {
        scrollIndicatorRef.current.classList.remove('hidden');
      }
    }
  }, []);

  // ESC va scroll lock
  useEffect(() => {
    if (!projectId) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    setSelectedImageIndex(0);

    // Scroll indicator ni reset qilish
    if (scrollIndicatorRef.current) {
      scrollIndicatorRef.current.classList.remove('hidden');
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [projectId, handleClose]);

  if (!projectId || !project) return null;

  return (
    <div className="project-modal-overlay" onClick={handleClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>

        {/* Close Button */}
        <button className="modal-close" onClick={handleClose}>
          <span></span>
          <span></span>
        </button>

        {/* Scroll Indicator */}
        <div ref={scrollIndicatorRef} className="modal-scroll-indicator">
          <span className="scroll-text">Scroll to explore</span>
          <div className="scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>

        {/* Scrollable Content */}
        <div ref={modalScrollRef} className="modal-scroll" onScroll={handleScroll}>

          {/* ============================================
              HERO SECTION
              - Katta rasm
              - 3 ta thumbnail pastda
              - Project title overlay
              ============================================ */}
          <section className="modal-hero">
            <div className="hero-media">
              <img
                src={project.images[selectedImageIndex]}
                alt={project.title}
                onError={(e) => {
                  e.target.src = `/img/img/${project.textureIndex + 1}.jpg`;
                }}
              />
            </div>
            <div className="hero-overlay">
              <span className="hero-category">{project.category}</span>
              <h1 className="hero-title">{project.title}</h1>
              <span className="hero-year">{project.year}</span>
            </div>
          </section>

          {/* Thumbnails - katta rasm tagida */}
          <div className="hero-thumbnails">
            {project.images.slice(0, 3).map((image, index) => (
              <div
                key={index}
                className={`hero-thumb ${selectedImageIndex === index ? 'active' : ''}`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image}
                  alt={`${project.title} ${index + 1}`}
                  onError={(e) => {
                    e.target.src = `/img/img/${project.textureIndex + 1}.jpg`;
                  }}
                />
              </div>
            ))}
          </div>

          {/* ============================================
              PROJECT INFO
              - Description
              - Services/Tech
              ============================================ */}
          <section className="modal-info">
            <div className="info-grid">

              {/* Left - Description */}
              <div className="info-main">
                <p className="info-description">{project.description}</p>
              </div>

              {/* Right - Meta */}
              <div className="info-meta">
                <div className="meta-group">
                  <span className="meta-label">Services</span>
                  <ul className="meta-list">
                    {project.techStack.map((tech, i) => (
                      <li key={i}>{tech}</li>
                    ))}
                  </ul>
                </div>

                <div className="meta-group">
                  <span className="meta-label">Year</span>
                  <span className="meta-value">{project.year}</span>
                </div>
              </div>
            </div>
          </section>


          {/* ============================================
              FEATURES (Optional)
              TODO: Kerak bo'lsa qo'shing
              ============================================ */}
          {project.features && project.features.length > 0 && (
            <section className="modal-features">
              <h3 className="section-label">Key Features</h3>
              <ul className="features-list">
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </section>
          )}

          {/* ============================================
              CTA - Action Buttons
              - Launch Project
              - Source Code
              ============================================ */}
          <section className="modal-cta">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-primary"
              >
                <span>Launch Project</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-btn cta-secondary"
              >
                <span>Source Code</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </a>
            )}
          </section>

          {/* ============================================
              NEXT PROJECT (Optional)
              TODO: Keyingi projectga o'tish
              ============================================ */}
          {/*
          <section className="modal-next">
            <span className="next-label">Next Project</span>
            <h2 className="next-title">Project Name</h2>
          </section>
          */}

        </div>
      </div>
    </div>
  );
}
