import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SIS Props',
  description: 'Film & TV Props Rental Service',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`} suppressHydrationWarning={true}>
        <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-12">
                <div className="flex-shrink-0">
                  <a href="/" className="text-lg font-light tracking-widest text-gray-900">
                    SIS PROPS
                  </a>
                </div>
                <div className="hidden md:block">
                  <div className="flex items-baseline space-x-8">
                    <a href="/" className="text-sm text-gray-900 hover:text-gray-600 transition-colors duration-200">Home</a>
                    <a href="/props" className="text-sm text-gray-900 hover:text-gray-600 transition-colors duration-200">Browse</a>
                    <a href="/categories" className="text-sm text-gray-900 hover:text-gray-600 transition-colors duration-200">Categories</a>
                    <a href="/about" className="text-sm text-gray-900 hover:text-gray-600 transition-colors duration-200">About</a>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <a 
                  href="mailto:info@sisprops.com" 
                  className="text-sm text-gray-900 hover:text-gray-600 transition-colors duration-200"
                >
                  info@sisprops.com
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main className="pt-16">
          {children}
        </main>

        <footer className="border-t border-gray-100 mt-24">
          <div className="max-w-[2000px] mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-normal tracking-widest text-gray-900 uppercase mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="tel:+1234567890" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                      +1 (234) 567-890
                    </a>
                  </li>
                  <li>
                    <a href="mailto:info@sisprops.com" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                      info@sisprops.com
                    </a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-normal tracking-widest text-gray-900 uppercase mb-4">Information</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/about" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                      Terms & Conditions
                    </a>
                  </li>
                  <li>
                    <a href="/privacy" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-center text-xs text-gray-600">
                © 2024 SIS Props. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
