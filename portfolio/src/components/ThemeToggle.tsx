import { useEffect, useState } from 'react'
import { PiMoonStarsLight, PiSunDimLight } from "react-icons/pi";

const themes = ['light', 'dark']

export default function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false)
  const [theme, setTheme] = useState(() => {
    if (import.meta.env.SSR) {
      return undefined
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })
  const toggleTheme = () => {
    const t = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', t)
    setTheme(t)
  }

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      root.classList.add('dark')
    }
  }, [theme])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? (
    <div className="inline-flex items-center p-[1px] rounded-3xl bg-orange-300 dark:bg-zinc-600">
      {themes.map(t => {
        const checked = t === theme
        return (
          <button
            key={t}
            className={`${
              checked ? 'bg-white text-black' : ''
            } cursor-pointer rounded-3xl p-2`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {t === 'light' ? <PiSunDimLight className='w-4 h-w md:h-5 md:w-5' /> : <PiMoonStarsLight className='w-4 h-w md:h-5 md:w-5'/>}
          </button>
        )
      })}
    </div>
  ) : (
    <div className="mx-6"/>
  )
}
