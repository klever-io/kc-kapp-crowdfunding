import {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useRef,
  useState,
} from 'react'

interface IMobile {
  isMobile: boolean
  isTablet: boolean
  wideScreens: boolean
  mobileMenuOpen: boolean
  handleMenu: () => void
  closeMenu: () => void
  mobileNavbarRef: React.MutableRefObject<HTMLDivElement | null>
}

export const Mobile = createContext({} as IMobile)

interface IMobileProvider {
  children: any
}

export const MobileProvider: React.FC<IMobileProvider> = ({ children }) => {
  const [width, setWidth] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const mobileNavbarRef = useRef<HTMLDivElement>(null)

  const isMobile = width <= 768
  const isTablet = width <= 1025
  const wideScreens = width >= 1920

  const handleResize = useCallback(() => {
    setWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    setWidth(window.innerWidth)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  useEffect(() => {
    if (width > 1025) {
      setMobileMenuOpen(false)
    }
  }, [width])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'visible'
  }, [mobileMenuOpen])

  const handleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    if (mobileNavbarRef.current !== null) {
      mobileNavbarRef.current.style.top = '0'
    }
  }

  const closeMenu = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
    }
  }

  const values: IMobile = {
    isMobile: isMobile,
    isTablet: isTablet,
    wideScreens: wideScreens,
    mobileMenuOpen,
    handleMenu,
    closeMenu,
    mobileNavbarRef,
  }

  return <Mobile.Provider value={values}>{children}</Mobile.Provider>
}

export const useMobile = (): IMobile => useContext(Mobile)
