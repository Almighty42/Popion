// Animation
const popInVariant1 = {
    hidden: { opacity: 0, scale: 0.5 }, 
    visible: { opacity: 1, scale: 1 } 
};
// Animations
const popVariant2 = {
    initial: { scale: 1 },
    pop: { scale: [1, 1.2, 1], transition: { duration: 0.3 } },
  };
const animationOptions = {
    duration: 0.2, 
    ease: "easeInOut" 
};

export { popInVariant1, popVariant2, animationOptions }