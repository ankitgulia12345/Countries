import { useEffect, useState } from "react"

// now function namw is getWindowSize but we change it with useWindowSize
export function useWindowSize(){
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
      //Custom Hooks , To check the width of window 
      useEffect(() => {
        window.addEventListener('resize', () => {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          })
        })
      }, [])
      return windowSize
}