import { useCallback, useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import ReactCanvasConfetti from "react-canvas-confetti"
import { PiDownloadSimpleThin } from "react-icons/pi";

// Styles for the canvas used by ReactCanvasConfetti
const canvasStyles: any = {
  position: "absolute",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  zIndex: 1,
  overflow: "hidden",
  top: 0,
  left: 0,
}
// Animation variants for the container
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
}

export function ConfettiOne( {buttonClassName, label}: {buttonClassName: string, label?: string} ) {
  const [mounted, setMounted] = useState(false)
  // Reference to hold the confetti animation instance
  const refAnimationInstance = useRef<any>(null)

  // Callback to get the instance of the confetti animation
  const getInstance = useCallback((instance: any) => {
    refAnimationInstance.current = instance
  }, [])

  // Function to create a confetti shot with specified options
  const makeShot = useCallback((opts: any, originX: any, originY: any, angle: any) =>  {
    if (refAnimationInstance.current) {
      refAnimationInstance.current({
        ...opts,
        origin: { x: originX, y: originY },
        angle: angle,
        particleCount: 500,
        //colors: ["#00FF00", "#008000"],
      })
    }
  }, [])

  // Function to trigger confetti shots from different positions
  const fire = useCallback(() => {

    makeShot({ spread: 130, startVelocity: 60 }, 1.1, -0.2, -140)
    makeShot({ spread: 130, startVelocity: 60 }, -0.2, -0.1, 315)
    makeShot({ spread: 300, startVelocity: 50 }, 1.1, 1, 160)
    makeShot({ spread: 300, startVelocity: 50 }, -0.1, 1, 160)

  }, [makeShot])

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted ? (
    <>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <motion.button
        onClick={fire}
        //initial="hidden"
        //animate="visible"
        transition={{ type: "spring", stiffness: 80, delay: 0.4 }}
        //variants={containerVariants}
        className={buttonClassName}
      >
        {label ? label : <PiDownloadSimpleThin className="w-6 h-6" />}
      </motion.button>
    </>
  ) : (
    <div />
  )
}