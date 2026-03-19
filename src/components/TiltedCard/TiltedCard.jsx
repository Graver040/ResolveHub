import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import "./TiltedCard.css";

const springValues = {
  damping: 30,
  stiffness: 120,
  mass: 2
};
m
export default function TiltedCard({ title, description }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(0, springValues);
  const rotateY = useSpring(0, springValues);

  const scale = useSpring(1, springValues);

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect();

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateYValue = ((mouseX - centerX) / centerX) * 10;
    const rotateXValue = ((mouseY - centerY) / centerY) * -10;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
  }

  function handleEnter() {
    scale.set(1.05);
  }

  function handleLeave() {
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="tilt-container">

      <motion.div
        ref={ref}
        className="tilted-feature-card"
        style={{
          rotateX,
          rotateY,
          scale
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        <h3>{title}</h3>
        <p>{description}</p>
      </motion.div>

    </div>
  );
}