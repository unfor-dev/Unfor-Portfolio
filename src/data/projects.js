/**
 * Projects Data
 * ============
 * Bu fayl barcha portfolio proyektlar ma'lumotlarini saqlaydi.
 * Har bir proyekt Model3.jsx dagi ekran bilan bog'langan (ekranId orqali).
 *
 * Struktura:
 * - id: Unique identifikator (URL da ishlatiladi)
 * - ekranId: Model3.jsx dagi mesh nomi (ekran1, ekran2, va h.k.)
 * - title: Proyekt nomi
 * - shortDescription: Qisqa tavsif (ekran hover da ko'rinadi)
 * - description: To'liq tavsif (detail sahifada)
 * - techStack: Ishlatilgan texnologiyalar ro'yxati
 * - liveUrl: Live sayt havolasi
 * - sourceUrl: GitHub source code havolasi
 * - thumbnail: Ekranda ko'rinadigan rasm (texture3Img indeksi)
 * - images: Detail sahifadagi rasmlar ro'yxati
 * - year: Proyekt yili
 * - category: Proyekt kategoriyasi
 */

/**
 * O'zgartirildi: images massivlari mavjud /img/img/ rasmlariga yangilandi
 * Har bir proyekt uchun 3 ta rasm (katta + 2 thumbnail)
 */
const projects = [
  {
    id: "project-1",
    ekranId: "ekran1",
    textureIndex: 1,
    title: "E-Commerce Platform",
    shortDescription: "Modern online shopping experience",
    description: "Full-stack e-commerce platform with real-time inventory management, secure payment processing, and responsive design. Features include user authentication, shopping cart, wishlist, and order tracking.",
    techStack: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    liveUrl: "https://example-ecommerce.com",
    sourceUrl: "https://github.com/username/ecommerce",
    images: ["/img/img/2.jpg", "/img/img/3.jpg", "/img/img/4.jpg"],
    year: 2024,
    category: "Full-Stack"
  },
  {
    id: "project-2",
    ekranId: "ekran2",
    textureIndex: 18,
    title: "AI Dashboard",
    shortDescription: "Analytics powered by AI",
    description: "Interactive dashboard for visualizing AI model performance metrics. Real-time data streaming, customizable charts, and automated reporting features.",
    techStack: ["React", "D3.js", "Python", "TensorFlow", "WebSocket"],
    liveUrl: "https://example-ai-dashboard.com",
    sourceUrl: "https://github.com/username/ai-dashboard",
    images: ["/img/img/19.jpg", "/img/img/1.jpg", "/img/img/2.jpg"],
    year: 2024,
    category: "Data Visualization"
  },
  {
    id: "project-3",
    ekranId: "ekran3",
    textureIndex: 3,
    title: "Social Media App",
    shortDescription: "Connect with friends",
    description: "Feature-rich social media application with real-time messaging, post sharing, and story features. Includes advanced privacy controls and content moderation.",
    techStack: ["React Native", "Firebase", "Node.js", "Socket.io"],
    liveUrl: "https://example-social.com",
    sourceUrl: "https://github.com/username/social-app",
    images: ["/img/img/4.jpg", "/img/img/5.jpg", "/img/img/6.jpg"],
    year: 2024,
    category: "Mobile App"
  },
  {
    id: "project-4",
    ekranId: "ekran4",
    textureIndex: 4,
    title: "Task Management",
    shortDescription: "Organize your workflow",
    description: "Comprehensive task management solution with Kanban boards, Gantt charts, team collaboration features, and automated task assignment based on workload.",
    techStack: ["Vue.js", "Vuex", "Express", "PostgreSQL"],
    liveUrl: "https://example-tasks.com",
    sourceUrl: "https://github.com/username/task-manager",
    images: ["/img/img/5.jpg", "/img/img/6.jpg", "/img/img/7.jpg"],
    year: 2023,
    category: "Productivity"
  },
  {
    id: "project-5",
    ekranId: "ekran5",
    textureIndex: 7,
    title: "Weather Application",
    shortDescription: "Real-time weather updates",
    description: "Beautiful weather application with hourly and weekly forecasts, interactive maps, severe weather alerts, and location-based notifications.",
    techStack: ["React", "OpenWeather API", "Mapbox", "PWA"],
    liveUrl: "https://example-weather.com",
    sourceUrl: "https://github.com/username/weather-app",
    images: ["/img/img/8.jpg", "/img/img/9.jpg", "/img/img/10.jpg"],
    year: 2023,
    category: "Web App"
  },
  {
    id: "project-6",
    ekranId: "ekran6",
    textureIndex: 8,
    title: "Fitness Tracker",
    shortDescription: "Track your health goals",
    description: "Comprehensive fitness tracking app with workout plans, nutrition logging, progress analytics, and social challenges with friends.",
    techStack: ["React Native", "GraphQL", "Node.js", "MongoDB"],
    liveUrl: "https://example-fitness.com",
    sourceUrl: "https://github.com/username/fitness-tracker",
    images: ["/img/img/9.jpg", "/img/img/10.jpg", "/img/img/11.jpg"],
    year: 2023,
    category: "Health & Fitness"
  },
  {
    id: "project-7",
    ekranId: "ekran7",
    textureIndex: 5,
    title: "Video Streaming",
    shortDescription: "Watch & share videos",
    description: "Video streaming platform with adaptive bitrate streaming, live broadcasting, content creator tools, and monetization features.",
    techStack: ["Next.js", "AWS", "FFmpeg", "WebRTC"],
    liveUrl: "https://example-stream.com",
    sourceUrl: "https://github.com/username/video-stream",
    images: ["/img/img/6.jpg", "/img/img/7.jpg", "/img/img/8.jpg"],
    year: 2024,
    category: "Streaming"
  },
  {
    id: "project-8",
    ekranId: "ekran8",
    textureIndex: 6,
    title: "Real Estate Portal",
    shortDescription: "Find your dream home",
    description: "Real estate listing platform with advanced search filters, virtual tours, mortgage calculator, and agent connection features.",
    techStack: ["React", "Node.js", "Elasticsearch", "Google Maps API"],
    liveUrl: "https://example-realestate.com",
    sourceUrl: "https://github.com/username/real-estate",
    images: ["/img/img/7.jpg", "/img/img/8.jpg", "/img/img/9.jpg"],
    year: 2023,
    category: "Real Estate"
  },
  {
    id: "project-9",
    ekranId: "ekran9",
    textureIndex: 15,
    title: "Music Player",
    shortDescription: "Your personal DJ",
    description: "Feature-rich music player with playlist management, audio visualization, equalizer, and seamless integration with popular streaming services.",
    techStack: ["Electron", "React", "Web Audio API", "SQLite"],
    liveUrl: "https://example-music.com",
    sourceUrl: "https://github.com/username/music-player",
    images: ["/img/img/16.jpg", "/img/img/17.jpg", "/img/img/18.jpg"],
    year: 2024,
    category: "Desktop App"
  },
  {
    id: "project-10",
    ekranId: "ekran10",
    textureIndex: 16,
    title: "Code Editor",
    shortDescription: "Write code anywhere",
    description: "Online code editor with multi-language support, real-time collaboration, integrated terminal, and cloud storage for projects.",
    techStack: ["Monaco Editor", "WebSocket", "Docker", "Node.js"],
    liveUrl: "https://example-editor.com",
    sourceUrl: "https://github.com/username/code-editor",
    images: ["/img/img/17.jpg", "/img/img/18.jpg", "/img/img/19.jpg"],
    year: 2024,
    category: "Developer Tools"
  },
  {
    id: "project-11",
    ekranId: "ekran11",
    textureIndex: 13,
    title: "Booking System",
    shortDescription: "Schedule appointments",
    description: "Versatile booking system for service businesses with calendar management, automated reminders, payment processing, and customer management.",
    techStack: ["React", "Node.js", "PostgreSQL", "Twilio"],
    liveUrl: "https://example-booking.com",
    sourceUrl: "https://github.com/username/booking-system",
    images: ["/img/img/14.jpg", "/img/img/15.jpg", "/img/img/16.jpg"],
    year: 2023,
    category: "Business"
  },
  {
    id: "project-12",
    ekranId: "ekran12",
    textureIndex: 14,
    title: "Learning Platform",
    shortDescription: "Learn new skills",
    description: "E-learning platform with course creation tools, progress tracking, quizzes, certificates, and discussion forums for students.",
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Stripe"],
    liveUrl: "https://example-learning.com",
    sourceUrl: "https://github.com/username/learning-platform",
    images: ["/img/img/15.jpg", "/img/img/16.jpg", "/img/img/17.jpg"],
    year: 2024,
    category: "Education"
  },
  {
    id: "project-13",
    ekranId: "ekran13",
    textureIndex: 9,
    title: "Recipe Finder",
    shortDescription: "Discover delicious recipes",
    description: "Recipe discovery app with ingredient-based search, meal planning, shopping list generation, and nutrition information.",
    techStack: ["React", "Spoonacular API", "Firebase", "PWA"],
    liveUrl: "https://example-recipes.com",
    sourceUrl: "https://github.com/username/recipe-finder",
    images: ["/img/img/10.jpg", "/img/img/11.jpg", "/img/img/12.jpg"],
    year: 2023,
    category: "Lifestyle"
  },
  {
    id: "project-14",
    ekranId: "ekran14",
    textureIndex: 10,
    title: "Portfolio Generator",
    shortDescription: "Build your portfolio",
    description: "No-code portfolio builder with customizable templates, drag-and-drop editor, custom domains, and SEO optimization tools.",
    techStack: ["React", "Node.js", "MongoDB", "AWS S3"],
    liveUrl: "https://example-portfolio.com",
    sourceUrl: "https://github.com/username/portfolio-generator",
    images: ["/img/img/11.jpg", "/img/img/12.jpg", "/img/img/13.jpg"],
    year: 2024,
    category: "Developer Tools"
  },
  {
    id: "project-15",
    ekranId: "ekran15",
    textureIndex: 11,
    title: "Chat Application",
    shortDescription: "Real-time messaging",
    description: "Secure messaging application with end-to-end encryption, group chats, file sharing, voice/video calls, and message scheduling.",
    techStack: ["React", "Socket.io", "WebRTC", "Redis"],
    liveUrl: "https://example-chat.com",
    sourceUrl: "https://github.com/username/chat-app",
    images: ["/img/img/12.jpg", "/img/img/13.jpg", "/img/img/14.jpg"],
    year: 2024,
    category: "Communication"
  },
  {
    id: "project-16",
    ekranId: "ekran16",
    textureIndex: 12,
    title: "Budget Tracker",
    shortDescription: "Manage your finances",
    description: "Personal finance management app with expense tracking, budget goals, investment portfolio tracking, and financial reports.",
    techStack: ["React", "Chart.js", "Node.js", "PostgreSQL"],
    liveUrl: "https://example-budget.com",
    sourceUrl: "https://github.com/username/budget-tracker",
    images: ["/img/img/13.jpg", "/img/img/14.jpg", "/img/img/15.jpg"],
    year: 2023,
    category: "Finance"
  },
  {
    id: "project-17",
    ekranId: "ekran17",
    textureIndex: 17,
    title: "Event Planner",
    shortDescription: "Plan memorable events",
    description: "Event planning platform with venue search, vendor management, guest list tracking, and collaborative planning tools.",
    techStack: ["Vue.js", "Express", "MongoDB", "Cloudinary"],
    liveUrl: "https://example-events.com",
    sourceUrl: "https://github.com/username/event-planner",
    images: ["/img/img/18.jpg", "/img/img/19.jpg", "/img/img/1.jpg"],
    year: 2024,
    category: "Events"
  },
  {
    id: "project-18",
    ekranId: "ekran18",
    textureIndex: 0,
    title: "3D Portfolio",
    shortDescription: "Interactive portfolio",
    description: "This very portfolio you're viewing! Built with Three.js and React for an immersive 3D experience showcasing creative work.",
    techStack: ["React", "Three.js", "GSAP", "React Three Fiber"],
    liveUrl: "https://myportfolio.com",
    sourceUrl: "https://github.com/username/3d-portfolio",
    images: ["/img/img/1.jpg", "/img/img/2.jpg", "/img/img/3.jpg"],
    year: 2025,
    category: "Portfolio"
  }
];

/**
 * Proyektni id bo'yicha topish
 * @param {string} id - Proyekt ID
 * @returns {Object|undefined} - Topilgan proyekt yoki undefined
 */
export const getProjectById = (id) => {
  return projects.find(project => project.id === id);
};

/**
 * Proyektni ekranId bo'yicha topish
 * @param {string} ekranId - Ekran ID (masalan: "ekran1")
 * @returns {Object|undefined} - Topilgan proyekt yoki undefined
 */
export const getProjectByEkranId = (ekranId) => {
  return projects.find(project => project.ekranId === ekranId);
};

/**
 * Barcha proyektlarni olish
 * @returns {Array} - Barcha proyektlar ro'yxati
 */
export const getAllProjects = () => projects;

/**
 * Kategoriya bo'yicha proyektlarni filtrlash
 * @param {string} category - Kategoriya nomi
 * @returns {Array} - Filtrlangan proyektlar
 */
export const getProjectsByCategory = (category) => {
  return projects.filter(project => project.category === category);
};

export default projects;
