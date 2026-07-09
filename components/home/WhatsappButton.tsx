'use client'

import { FaWhatsapp } from 'react-icons/fa'

const WhatsappButton = () => {
  return (
    <a
      href="https://wa.me/447462254013"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-[#25D366] shadow-lg hover:animate-none hover:scale-110"
    >
      <FaWhatsapp className="text-3xl text-white" />
    </a>
  )
}

export default WhatsappButton