/**
 * Main Entry Point
 * ================
 * O'zgartirildi: React Router olib tashlandi, Modal yondashuvi qo'shildi.
 *
 * Endi sahifa navigate qilmaydi - modal 3D scene ustidan ochiladi.
 * Bu yondashuv ancha yengil va tez ishlaydi:
 * - 3D scene qayta yuklanmaydi
 * - Back button muammosi yo'q
 * - Sayt og'irligi kamaydi
 */

import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import { Loader } from '@react-three/drei'
import Scene from './Scene'
import Overlay from './Overlay/Overlay'
import ProjectModal from './components/ProjectModal'

const root = createRoot(document.getElementById('root'))

/**
 * App Component
 * Modal state ni boshqaradi
 */
function App() {
  // Ochilgan proyekt ID si (null = modal yopiq)
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  // Proyekt tanlanganda modal ochish
  const handleProjectClick = (projectId) => {
    setSelectedProjectId(projectId);
  };

  // Modal yopish
  const handleCloseModal = () => {
    setSelectedProjectId(null);
  };

  return (
    <>
      {/* 3D Scene - onProjectClick prop bilan */}
      <Scene onProjectClick={handleProjectClick} />

      {/* HTML Overlay */}
      <Overlay />

      {/* Loader */}
      <Loader />

      {/* Project Modal - faqat selectedProjectId mavjud bo'lganda ko'rinadi */}
      <ProjectModal
        projectId={selectedProjectId}
        onClose={handleCloseModal}
      />
    </>
  )
}

root.render(<App />)

