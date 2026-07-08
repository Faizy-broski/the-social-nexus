import { MessageCircle } from 'lucide-react'
import React from 'react'

const WhatsappButton = () => {
  return (
    <div>
      {/* WhatsApp floating button */}
      <a
        href="https://wa.me/447462254013"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-xl transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6 fill-white text-white" />
      </a>
    </div>
  )
}

export default WhatsappButton
