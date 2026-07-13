'use client'

// import { FaWhatsapp } from 'react-icons/fa'

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/447462254013"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-4 right-4 z-50 flex h-12 w-12 animate-pulse items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform hover:animate-none hover:scale-110 sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
    >
      {/* <FaWhatsapp className="text-2xl text-white sm:text-3xl" /> */}
    </a>
  )
}

export default WhatsappButton