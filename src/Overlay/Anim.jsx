import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Unique ID generator - har bir Anim instance uchun
let animInstanceId = 0

// ==========================================================
// ANIM.JSX - SCROLL ANIMATSIYALARI KOMPONENTI
// ==========================================================
// Bu komponent barcha scroll-based animatsiyalarni boshqaradi:
// 1. Section-2: "Based in Uzb" text'i char-by-char fade-in va hide animatsiyalari
// 2. Section-4: Skills section animatsiyalari (title, grid, groups, tags)
// 3. Section-6: "My Works" section animatsiyalari (Cosmic Symphony effect)
// ==========================================================

// Text ni char'larga split qilish funksiyasi
// Maqsad: Text elementini har bir harfga (char) ajratish animatsiya uchun
function splitTextToChars(element) {
  if (!element) return []

  const chars = []

  function processTextNodes(node) {
    const walker = document.createTreeWalker(
      node,
      NodeFilter.SHOW_TEXT,
      null,
      false
    )

    const textNodes = []
    let textNode
    while (textNode = walker.nextNode()) {
      if (textNode.textContent.trim()) {
        textNodes.push(textNode)
      }
    }

    textNodes.forEach(textNode => {
      const parent = textNode.parentNode
      const text = textNode.textContent
      const fragment = document.createDocumentFragment()

      text.split('').forEach(char => {
        const span = document.createElement('span')
        span.className = 'split-char'
        span.style.display = 'inline-block'
        span.textContent = char === ' ' ? '\u00A0' : char
        fragment.appendChild(span)
        chars.push(span)
      })

      parent.replaceChild(fragment, textNode)
    })
  }

  processTextNodes(element)
  return chars
}

export default function Anim({ locationTagRef }) {
  // Unique instance ID - bu component uchun
  const instanceIdRef = useRef(null)

  // Ref'lar - har bir animatsiya trigger'ini saqlash uchun
  const triggerRef = useRef(null) // Section-2 da "Based in Uzb" text'ini hide qilish animatsiyasi
  const fadeInTriggerRef = useRef(null) // Section-2 da "Based in Uzb" text'ini fade-in animatsiyasi
  const skillsTriggerRef = useRef(null) // Section-4 Skills section animatsiyasi
  const skillsScrollTriggersRef = useRef([]) // Section-4 da barcha animatsiyalar ro'yxati
  const cosmicTriggerRef = useRef(null) // Section-6 "My Works" animatsiyasi
  const timeoutsRef = useRef([]) // setTimeout'larni saqlash uchun
  const gsapAnimationsRef = useRef([]) // GSAP tween'larni saqlash - to'liq cleanup uchun
  const isCleanedUpRef = useRef(false) // Cleanup holati

  useEffect(() => {
    // Unique ID yaratish - faqat birinchi mount'da
    if (instanceIdRef.current === null) {
      instanceIdRef.current = ++animInstanceId
    }
    const currentInstanceId = instanceIdRef.current
    isCleanedUpRef.current = false

    const locationTag = locationTagRef?.current

    // Section-2 ni topish (About section)
    const section2 = locationTag?.closest('.section-2')

    // ==========================================================
    // CLEANUP FUNKSIYASI
    // ==========================================================
    // Maqsad: Komponent unmount bo'lganda (yoki re-render bo'lganda) barcha animatsiyalarni to'xtatish
    // Bu memory leak'lar va xotira muammolarini oldini oladi

    const cleanup = () => {
      if (isCleanedUpRef.current) return
      isCleanedUpRef.current = true

      // Barcha setTimeout'larni BIRINCHI tozalash
      timeoutsRef.current.forEach(timeout => clearTimeout(timeout))
      timeoutsRef.current = []

      // Barcha GSAP tween'larni kill qilish
      gsapAnimationsRef.current.forEach(anim => {
        if (anim && anim.kill) anim.kill()
      })
      gsapAnimationsRef.current = []

      // Section-2 hide animatsiyasini to'xtatish
      if (triggerRef.current) {
        triggerRef.current.kill()
        triggerRef.current = null
      }
      // Section-2 fade-in animatsiyasini to'xtatish
      if (fadeInTriggerRef.current) {
        fadeInTriggerRef.current.kill()
        fadeInTriggerRef.current = null
      }
      // Section-4 skills groups animatsiyasini to'xtatish
      if (skillsTriggerRef.current) {
        skillsTriggerRef.current.kill()
        skillsTriggerRef.current = null
      }
      // Section-4 da barcha scroll trigger'larni to'xtatish (title, grid, groups, tags)
      skillsScrollTriggersRef.current.forEach(trigger => {
        if (trigger && trigger.kill) trigger.kill()
      })
      skillsScrollTriggersRef.current = []
      // Section-6 animatsiyasini to'xtatish
      if (cosmicTriggerRef.current) {
        cosmicTriggerRef.current.kill()
        cosmicTriggerRef.current = null
      }
    }

    // ==========================================================
    // SECTION-2 ANIMATSIYALARI ("Based in Uzb" text'i uchun)
    // ==========================================================
    
    if (locationTag && section2) {
      // Text'ni har bir harfga (char) ajratish
      const chars = splitTextToChars(locationTag)

      if (chars.length > 0) {
        // ==========================================================
        // 1. BIRINCHI ANIMATSIYA: Harflarni char-by-char fade-in qilish
        // ==========================================================
        // Maqsad: Scroll bo'lganda "Based in Uzb" text'i har bir harfdan sekin-asta paydo bo'ladi
        
        // Dastlab barcha harflarni yashirin holatga o'rnatish (pastga siljigan va ko'rinmas)
        gsap.set(chars, { y: 80, opacity: 0 })

        // Harflarni fade-in animatsiyasi
        const fadeInAnim = gsap.to(chars, {
          scrollTrigger: {
            trigger: locationTag, // locationTag element scroll'da markazga kelganda animatsiya boshlanadi
            start: 'center center', // LocationTag markazga kelganda
            toggleActions: 'play none none reverse', // Yuqoriga scroll qilganda reverse bo'ladi
          },
          duration: 0.46, // Animatsiya davomiyligi
          ease: 'circ.out', // Yumshoq easing
          y: 0, // Pastdan yuqoriga ko'tarish
          opacity: 1, // Ko'rinadigan holatga o'tkazish
          stagger: 0.015, // Har bir harf orasida 0.015s interval (ketma-ket paydo bo'lish)
        })

        fadeInTriggerRef.current = fadeInAnim.scrollTrigger
        gsapAnimationsRef.current.push(fadeInAnim)

        // ==========================================================
        // 2. IKKINCHI ANIMATSIYA: Harflarni ketma-ket yo'q qilish (section pin bilan)
        // ==========================================================
        // Maqsad: Scroll davomida section-2 pin bo'lib qoladi va harflar oxiridan boshiga ketma-ket yo'qoladi
        
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: section2, // Section-2 element trigger
            start: 'top top', // Section-2 tepaga kelganda
            end: () => `+=${chars.length * 50}`, // Char'lar soniga qarab scroll masofasi (har bir char uchun 50px)
            pin: true, // Section-2 ni ekranda pin qilish (scroll davomida bir joyda qoladi)
            scrub: 1, // Scroll'ga bog'liq animatsiya (scroll tezligiga moslashadi)
          }
        })

        // Harflarni teskari tartibda hide qilish (oxiridan boshiga)
        // Masalan: "z" -> "b" -> "u" -> "U" -> " " -> "n" -> "i" -> ...
        chars.reverse().forEach((char, index) => {
          timeline.to(char, {
            opacity: 0, // Ko'rinmas holatga o'tkazish
            y: -50, // Yuqoriga siljish (yo'qolish effekti)
            duration: 0.1, // Har bir harf animatsiyasi davomiyligi
            ease: 'power2.in', // Tezlashtiruvchi easing
          }, index * 0.05) // Har bir char orasida 0.05s interval (ketma-ket yo'qolish)
        })

        triggerRef.current = timeline.scrollTrigger
        gsapAnimationsRef.current.push(timeline)
      }
    }

    // ==========================================================
    // SECTION-4 ANIMATSIYALARI (Skills section)
    // ==========================================================
    // Maqsad: Skills section'ga scroll bo'lganda barcha elementlar ketma-ket fade-in bo'ladi

    const skillsTimeout = setTimeout(() => {
      // Cleanup bo'lgan bo'lsa, hech narsa qilmaymiz
      if (isCleanedUpRef.current) return
      // DOM elementlarini topish
      const section4 = document.querySelector('.section-4') // Skills section
      const section4Title = document.querySelector('.section-4-title') // "My Skills" title
      const skillsGrid = document.querySelector('.skills-grid') // Skills grid (ikonlar)
      const skillsGroupsWrapper = document.querySelector('.skills-groups-wrapper') // Skills groups container
      const skillsGroups = document.querySelectorAll('.skills-group') // Har bir skill group (Core Expertise, Supporting Technologies, Tools & Workflow)

      if (!section4) return

      // ==========================================================
      // 1. SECTION-4 TITLE ANIMATSIYASI ("My Skills" title)
      // ==========================================================
      if (section4Title) {
        // Dastlab yashirin holatga o'rnatish
        gsap.set(section4Title, { opacity: 0, y: 50, scale: 0.95 })

        // Title fade-in animatsiyasi
        const titleAnim = gsap.to(section4Title, {
          scrollTrigger: {
            trigger: section4, // Section-4 trigger
            start: 'top 85%', // Section-4 viewport'ning 85% ga kelganda
            toggleActions: 'play none none reverse', // Yuqoriga scroll qilganda reverse
          },
          duration: 0.8,
          ease: 'power3.out',
          opacity: 1, // Ko'rinadigan holat
          y: 0, // Yuqoriga ko'tarish
          scale: 1, // To'liq o'lchamga keltirish
        })
        skillsScrollTriggersRef.current.push(titleAnim.scrollTrigger)
        gsapAnimationsRef.current.push(titleAnim)
      }

      // ==========================================================
      // 2. SKILLS-GRID ANIMATSIYASI (Skills ikonlari grid'i)
      // ==========================================================
      if (skillsGrid) {
        // Dastlab yashirin holatga o'rnatish
        gsap.set(skillsGrid, { opacity: 0, y: 40 })

        // Grid fade-in animatsiyasi
        const gridAnim = gsap.to(skillsGrid, {
          scrollTrigger: {
            trigger: section4,
            start: 'top 80%', // Title'dan keyin biroz keyin
            toggleActions: 'play none none reverse',
          },
          duration: 0.9,
          ease: 'power3.out',
          opacity: 1,
          y: 0,
          delay: 0.2, // Title'dan 0.2s keyin boshlanadi
        })
        skillsScrollTriggersRef.current.push(gridAnim.scrollTrigger)
        gsapAnimationsRef.current.push(gridAnim)
      }

      // ==========================================================
      // 3. SKILLS-GROUPS ANIMATSIYASI (Core Expertise, Supporting Technologies, Tools & Workflow)
      // ==========================================================
      if (skillsGroupsWrapper && skillsGroups.length > 0) {
        // Dastlab barcha groups'ni yashirin holatga o'rnatish
        gsap.set(skillsGroups, { opacity: 0, y: 60, scale: 0.9 })

        // Groups'lar fade-in animatsiyasi (stagger - ketma-ket)
        const groupsAnim = gsap.to(skillsGroups, {
          scrollTrigger: {
            trigger: skillsGroupsWrapper, // Groups wrapper trigger
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          duration: 0.8,
          ease: 'power3.out',
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.15, // Har bir group orasida 0.15s interval (ketma-ket paydo bo'lish)
        })

        skillsTriggerRef.current = groupsAnim.scrollTrigger
        skillsScrollTriggersRef.current.push(groupsAnim.scrollTrigger)
        gsapAnimationsRef.current.push(groupsAnim)

        // ==========================================================
        // 4. SKILLS-GROUP-TITLE'LAR VA SKILL-TAG'LAR ANIMATSIYASI
        // ==========================================================
        // Har bir group ichidagi title va tag'larni animatsiya qilish

        skillsGroups.forEach((group, index) => {
          // Group title animatsiyasi (masalan: "Core Expertise", "Supporting Technologies")
          const title = group.querySelector('.skills-group-title')
          if (title) {
            gsap.set(title, { opacity: 0, y: 30 })
            const groupTitleAnim = gsap.to(title, {
              scrollTrigger: {
                trigger: group, // Har bir group trigger
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              duration: 0.7,
              ease: 'power3.out',
              opacity: 1,
              y: 0,
              delay: index * 0.1 + 0.2, // Har bir group uchun keyinroq boshlanishi (index * 0.1 + 0.2s)
            })
            skillsScrollTriggersRef.current.push(groupTitleAnim.scrollTrigger)
            gsapAnimationsRef.current.push(groupTitleAnim)
          }

          // Skill-tag'lar animatsiyasi (masalan: HTML5, CSS3, JavaScript, React, va hokazo)
          const tags = group.querySelectorAll('.skill-tag')
          if (tags.length > 0) {
            gsap.set(tags, { opacity: 0, y: 20, scale: 0.9 })
            const tagsAnim = gsap.to(tags, {
              scrollTrigger: {
                trigger: group,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              duration: 0.6,
              ease: 'power2.out',
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.05, // Har bir tag orasida 0.05s interval (ketma-ket paydo bo'lish)
              delay: index * 0.1 + 0.4, // Title'dan keyinroq boshlanadi
            })
            skillsScrollTriggersRef.current.push(tagsAnim.scrollTrigger)
            gsapAnimationsRef.current.push(tagsAnim)
          }
        })
      }

    }, 100) // 100ms kutish - DOM to'liq yuklanguncha kutish
    timeoutsRef.current.push(skillsTimeout)

    // ==========================================================
    // SECTION-6 ANIMATSIYALARI ("My Works" section - Cosmic Symphony effect)
    // ==========================================================
    // Maqsad: Section-6 ga scroll bo'lganda "Welcome to My Works" text'i harflardan scaleY animatsiyasi bilan paydo bo'ladi

    const cosmicTimeout = setTimeout(() => {
      // Cleanup bo'lgan bo'lsa, hech narsa qilmaymiz
      if (isCleanedUpRef.current) return

      // DOM elementlarini topish
      const section6 = document.querySelector('.section-6') // Section-6 container
      const section6Title = document.querySelector('[data-effect26]') // Title element ("Welcome to My Works")
      const section6Words = document.querySelectorAll('.section-6-word') // Har bir word ("Welcome to", "My Works")

      if (!section6 || !section6Title || section6Words.length === 0) return

      // ==========================================================
      // 1. TEXT'NI HAR BIR HARFGA (CHAR) AJRATISH
      // ==========================================================
      const wordsData = []
      section6Words.forEach((word) => {
        const chars = splitTextToChars(word) // Har bir word'ni char'larga ajratish
        if (chars.length > 0) {
          wordsData.push({ word, chars }) // Word va uning char'larini saqlash
        }
      })

      if (wordsData.length === 0) return

      // ==========================================================
      // 2. BACKGROUND OPACITY ANIMATSIYASI (CSS Variable orqali)
      // ==========================================================
      // Maqsad: Section-6 title'ning ::before pseudo-elementi opacity 0 dan 1 ga o'tadi
      // GSAP pseudo-elementlarni to'g'ridan-to'g'ri animatsiya qila olmaydi,
      // shuning uchun CSS variable (--bg-opacity) ishlatamiz

      // Dastlab --bg-opacity: 0 (CSS'da ham shu qiymat)
      gsap.set(section6Title, {
        '--bg-opacity': 0,
      })

      // ==========================================================
      // 3. CHAR'LARNI INITIAL STATE GA O'RNATISH
      // ==========================================================
      // Maqsad: Har bir harfni boshlang'ich holatga o'rnatish (yashirin, kichik, blur)
      
      wordsData.forEach(({ chars }, wordIndex) => {
        // Transform origin: juft word'lar yuqoridan, toq word'lar pastdan scale bo'ladi
        const origin = wordIndex % 2 === 0 ? '50% 0%' : '50% 100%'
        
        gsap.set(chars, {
          scaleY: 0, // Vertikal scale 0 (ko'rinmas)
          scaleX: 0.8, // Gorizontal scale 0.8 (biroz siqilgan)
          opacity: 0, // Ko'rinmas
          y: wordIndex % 2 === 0 ? -30 : 30, // Juft word'lar yuqorida, toq word'lar pastda
          transformOrigin: origin, // Scale qilish markazi
          visibility: 'visible', // Visibility visible (animatsiya uchun kerak)
          filter: 'blur(50px)', // Blur effekti (xira ko'rinish)
        })
      })

      // ==========================================================
      // 4. TIMELINE BILAN SCROLL ANIMATSIYASI
      // ==========================================================
      // Maqsad: Scroll paytida section pin bo'lib qoladi va animatsiyalar ketma-ket ishlaydi
      
      const section6Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section6, // Section-6 trigger
          start: 'top top', // Section-6 tepaga kelganda
          end: '+=110%', // 110% scroll masofasi (section pin bo'lib qoladi)
          scrub: 0.5, // Scroll'ga bog'liq animatsiya (0.5s smooth scrolling)
          pin: true, // Section-6 ni pin qilish (scroll davomida bir joyda qoladi)
          anticipatePin: 1, // Pin'dan oldin 1px kutish (smooth bo'lishi uchun)
        }
      })

      cosmicTriggerRef.current = section6Timeline.scrollTrigger
      gsapAnimationsRef.current.push(section6Timeline)

      // ==========================================================
      // 5. BACKGROUND OPACITY FADE-IN ANIMATSIYASI (::before uchun)
      // ==========================================================
      // Maqsad: Title'ning ::before pseudo-elementi opacity 0 dan 1 ga o'tadi
      // CSS variable orqali animatsiya qilinadi

      section6Timeline.to(
        section6Title,
        {
          '--bg-opacity': 1, // CSS variable orqali ::before opacity 1 ga
          duration: 0.15, // Animatsiya davomiyligi (tezroq)
          ease: 'power2.out', // Yumshoq easing
        },
        0 // Timeline boshidan boshlanadi
      )

      // ==========================================================
      // 6. HAR BIR WORD'NI ALOHIDA ANIMATSIYA QILISH
      // ==========================================================
      // Maqsad: Har bir word ("Welcome to", "My Works") alohida animatsiya qilinadi
      // Har bir word ichidagi harflar markazdan tashqariga scaleY animatsiyasi bilan paydo bo'ladi
      
      wordsData.forEach(({ chars }, wordIndex) => {
        section6Timeline.to(
          chars, // Har bir word'ning char'lari
          {
            scaleY: 1, // Vertikal scale 1 ga (to'liq ko'rinadi)
            scaleX: 1, // Gorizontal scale 1 ga (normal o'lcham)
            opacity: 1, // Ko'rinadigan holat
            y: 0, // Y pozitsiyasi 0 ga (joyiga qaytadi)
            filter: 'blur(0px)', // Blur yo'qoladi (aniq ko'rinadi)
            stagger: {
              amount: 0.2, // Barcha char'lar 0.2s ichida animatsiya qilinadi
              from: 'center', // Markazdan tashqariga (o'rtadan chetga)
            },
            ease: 'back.out(1.5)', // Bounce effekti (orqaga qaytish)
          },
          0.1 + wordIndex * 0.15 // Har bir word orasida 0.15s interval ("Welcome to" 0.1s, "My Works" 0.25s)
        )
      })

      // Faqat cleanup bo'lmagan bo'lsa refresh qilish
      if (!isCleanedUpRef.current) {
        ScrollTrigger.refresh()
      }
    }, 200) // 200ms kutish - DOM to'liq yuklanguncha kutish
    timeoutsRef.current.push(cosmicTimeout)

    return () => {
      cleanup()
    }
  }, [locationTagRef])

  return null
}
