import { useCallback, useLayoutEffect, useRef, useState } from 'react'

let anchor: HTMLAnchorElement | null
let cleanupDom: HTMLElement | null
let isMounted = false

const useCapture = true

export const useAnimation = (
  base: string,
  classes: [string, string?],
  exit?: number
) => {
  const ref = useRef(classes)
  const [hasDelay, setHasDelay] = useState(false)

  const getClientClassElement = useCallback(() => {
    const oneClassElement = document.getElementsByClassName(base)[0]
    if (oneClassElement instanceof HTMLElement) return oneClassElement
    else return null
  }, [base])

  const eventTargetHTMLElement = (e: MouseEvent) => {
    const clickTarget = e.target
    if (clickTarget instanceof HTMLElement) return clickTarget
    else return null
  }

  const clickHandler = useCallback(
    (e: MouseEvent) => {
      const target = eventTargetHTMLElement(e)
      if (target == null) return

      const anchorElement = target.closest('a')
      if (anchorElement == null) return
      if (window.location.href === anchorElement.href) return

      const classElement = getClientClassElement()
      if (classElement == null) return

      if (!ref.current[1]) return
      // To the exit state class and end animation.
      classElement.className = ref.current[1]
      e.preventDefault()
      if (typeof exit != 'undefined')
        setTimeout(() => {
          setHasDelay(true)
        }, exit * 1000)
      anchor = anchorElement
      cleanupDom = classElement
    },
    [exit, getClientClassElement]
  )

  const innerEffect = useCallback(() => {
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    })
    if (!hasDelay) return
    if (anchor == null) return

    anchor.dispatchEvent(clickEvent)
    anchor = null
  }, [hasDelay])

  // ---------- Initial effect - //
  useLayoutEffect(() => {
    if (!isMounted) {
      isMounted = true
      return
    }
    const classElement = getClientClassElement()
    if (classElement == null) return

    // To the initial state class.
    classElement.className = ref.current[0]
    const animateId = requestAnimationFrame(() => {
      // To the base class and start animation
      classElement.className = base
    })

    return () => {
      cancelAnimationFrame(animateId)
    }
  }, [base, getClientClassElement])

  // ---------- Exit effect - //
  useLayoutEffect(() => {
    innerEffect()
    const cleanup = ref.current[0] // Initial class.
    document.body.addEventListener('click', clickHandler, useCapture)

    return () => {
      document.body.removeEventListener('click', clickHandler, useCapture)
      if (cleanupDom == null) return

      // cleanup to the initial state class and end the animation.
      cleanupDom.className = cleanup
      cleanupDom = null
    }
  }, [clickHandler, innerEffect])

  return base
}
