import React from 'react'
import Link from 'next/link'

const LetsMake = () => {
  const GRADIENT_TEXT =
    'bg-gradient-to-r from-[#0B91A4] via-[#4F9F75] to-[#B3B430] bg-clip-text text-transparent'

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <p className="text-lg font-medium text-[#555555] sm:text-3xl">
          Have a project in mind?
        </p>

        <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-[#121212] sm:text-6xl lg:text-7xl uppercase">
          Let&apos;s make 
          <br />
          <span className={GRADIENT_TEXT}>something</span> great
          <br />
          together!
        </h2>

        <Link
          href="/contact-us"
          className="mt-12 flex h-40 w-40 items-center justify-center rounded-full bg-[#3AB5C0] text-center text-lg font-semibold leading-tight text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#2fa4af]"
        >
          <span>
            Connect
            <br />
            With Us
          </span>
        </Link>
      </div>
    </section>
  )
}

export default LetsMake