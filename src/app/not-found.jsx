import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <section className='flex h-[calc(100vh-7rem)] justify-center items-center'>
        <div className='text-center'>
            <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
            <p>Oops! The page you are looking for does not exist.</p>
            <Link href="/" className='text-slate-400 hover:text-slate-100 text-2xl'>Volver al inicio</Link>
        </div>
    </section>
  )
}

export default NotFound