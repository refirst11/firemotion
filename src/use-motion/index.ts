import { useCallback, useEffect, useLayoutEffect, useState } from 'react'

let isMounted = false
const useCapture = true

type OptionsProps = {
  entry?: string
  exit?: string
  delay?: number
}

export const useMotion = (base: string, options: OptionsProps) => {
  const [hasClickDelay, setHasClickDelay] = useState(false)
  const [anchor, setAnchor] = useState<HTMLAnchorElement | undefined>(undefined)

  const getClientClassElement = useCallback(() => {
    const oneClassElement = document.getElementsByClassName(base)[0]
    if (oneClassElement instanceof HTMLElement) return oneClassElement
    else return null
  }, [base])

  const isExternalLink = (href: string) => {
    const url = new URL(href, window.location.origin)
    return url.origin !== window.location.origin
  }

  const isXmlType = (href: string) => {
    return href.endsWith('.xml')
  }

  useEffect(() => {
    if (!options.exit) return
    let timerId: number

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const targetAnchor = target.closest('a') as HTMLAnchorElement
      if (
        isExternalLink(targetAnchor.href) ||
        isXmlType(targetAnchor.href) ||
        targetAnchor.target === '_blank' ||
        window.location.href === targetAnchor.href
      )
        return
      setAnchor(targetAnchor)
      e.preventDefault()
      if (typeof options.delay !== 'undefined')
        timerId = setTimeout(() => {
          setHasClickDelay(true)
        }, options.delay * 1000)
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLAnchorElement
        if (entry.isIntersecting) {
          target.addEventListener('click', handleClick, useCapture)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback)

    const anchors = document.querySelectorAll('a')
    anchors.forEach(anchor => observer.observe(anchor))

    return () => {
      clearTimeout(timerId)
      anchors.forEach(anchor => {
        observer.unobserve(anchor)
        anchor.removeEventListener('click', handleClick, useCapture)
      })
    }
  }, [options.delay, hasClickDelay])

  useLayoutEffect(() => {
    if (!anchor) return

    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    })
    anchor.dispatchEvent(clickEvent)
    return () => {
      if (hasClickDelay) return
      setAnchor(undefined)
      setHasClickDelay(false)
    }
  }, [anchor, hasClickDelay])

  // ---------- Entry effect - //
  useLayoutEffect(() => {
    if (!isMounted) {
      isMounted = true
      return
    }
    const classElement = getClientClassElement()
    if (classElement == null || !options.entry) return

    // To the entry state style.
    classElement.className = base + ' ' + options.entry
    const animateId = requestAnimationFrame(() => {
      // To the base style and start animation
      classElement.className = base
    })

    return () => {
      cancelAnimationFrame(animateId)
    }
  }, [base, getClientClassElement])

  // ---------- Exit effect - //
  useLayoutEffect(() => {
    if (!anchor) return
    const classElement = getClientClassElement()
    if (classElement == null || !options.exit) return

    const cleanup = options.entry // Entry style.
    classElement.className = base + ' ' + options.exit // Set exit style.

    return () => {
      if (cleanup) classElement.className = cleanup // Reset to entry style.
    }
  }, [anchor, base, getClientClassElement])

  return base
}
