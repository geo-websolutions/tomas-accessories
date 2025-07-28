'use client'
import { useEffect, useState, useCallback } from 'react'

export default function CustomModal({
  isOpen = false,
  title = 'Modal Title',
  content = 'Modal content goes here',
  timerDuration = 0,
  showCloseButton = true,
  onClose = () => {},
  onConfirm = null
}) {
  const [isVisible, setIsVisible] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Define handleClose first using useCallback
  const handleClose = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => onClose(), 300)
  }, [onClose])

  // Define handleConfirm after handleClose
  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm()
    }
    handleClose()
  }, [onConfirm, handleClose])

  // Auto-close after timerDuration if set
  useEffect(() => {
    let timer
    if (isOpen && timerDuration > 0) {
      timer = setTimeout(() => {
        handleClose()
      }, timerDuration)
    }
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [isOpen, timerDuration, handleClose])

  // Handle mount/unmount and animations
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
      const timer = setTimeout(() => setIsMounted(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Close modal when clicking outside or pressing Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, handleClose])

  if (!isMounted) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isVisible ? 'bg-black/50 opacity-100' : 'bg-black/0 opacity-0'
      }`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div 
        className={`bg-gray-800 rounded-lg shadow-xl w-full max-w-md overflow-hidden transition-all duration-300 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
      >
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            {title}
          </h2>
          <div className="text-gray-300 mb-6">
            {content}
          </div>
          
          <div className="flex justify-end space-x-3 space-x-reverse">
            {showCloseButton && (
              <button
                onClick={handleClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                إغلاق
              </button>
            )}
            {onConfirm && (
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                تأكيد
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}