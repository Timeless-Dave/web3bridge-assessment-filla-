export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: { duration: 0.3 }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
  transition: { duration: 0.3 }
};

export const bounceIn = {
  initial: { opacity: 0, scale: 0.3 },
  animate: { 
    opacity: 1, 
    scale: [0.3, 1.1, 1],
    transition: { 
      duration: 0.6,
      times: [0, 0.5, 1],
      ease: "easeOut"
    }
  },
  exit: { opacity: 0, scale: 0.3, transition: { duration: 0.2 } }
};

export const gemCollect = {
  initial: { scale: 1, y: 0 },
  animate: { 
    scale: [1, 1.5, 1], 
    y: [0, -20, 0],
    transition: { duration: 0.5 }
  }
};

export const celebration = {
  initial: { scale: 0, rotate: 0 },
  animate: { 
    scale: [0, 1.2, 1], 
    rotate: [0, 360],
    transition: { 
      duration: 0.8,
      times: [0, 0.6, 1],
      ease: "easeOut"
    }
  }
};

export const shakeError = {
  animate: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 }
  }
};

export const progressFill = {
  initial: { width: 0 },
  animate: { width: "100%" },
  transition: { duration: 1, ease: "easeInOut" }
};

export const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

