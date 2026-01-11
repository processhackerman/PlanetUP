import { motion } from "motion/react";

const variants = {
  initial: {
    y: "100%",
    opacity: 0,
  },
  animate: {
    y: "0%",
    opacity: 1,
  },
  exit: {
    y: "-20%",
    opacity: 0,
  },
};

function PageWrapper({ children }) {
  return (
    <motion.div
      className="page"
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1], // iOS-like
      }}
    >
      {children}
    </motion.div>
  );
}

export default PageWrapper;
