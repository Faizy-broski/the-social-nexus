import React from 'react'
import Link from 'next/link'

const LetsMake = () => {
  const GRADIENT_TEXT =
    'bg-gradient-to-r from-[#0B91A4] via-[#4F9F75] to-[#B3B430] bg-clip-text text-transparent'

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-5 text-center sm:px-6">
        <p className="text-base font-medium text-[#555555] sm:text-2xl lg:text-3xl">
          Have a project in mind?
        </p>

        <h2 className="mt-3 text-3xl font-extrabold uppercase leading-tight tracking-tight text-[#121212] sm:mt-4 sm:text-5xl lg:text-6xl xl:text-7xl">
          Let&apos;s make
          <br />
          <span className={GRADIENT_TEXT}>something</span> great
          <br />
          together!
        </h2>

        <Link
          href="/contact-us"
          className="mt-8 flex h-28 w-28 items-center justify-center rounded-full bg-[#3AB5C0] text-center text-sm font-semibold leading-tight text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-[#2fa4af] sm:mt-12 sm:h-36 sm:w-36 sm:text-base md:h-40 md:w-40 md:text-lg"
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