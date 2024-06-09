export const featureVariants = {
  offscreen: {
    scale: 0.5,
  },
  onscreen: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 1.2,
    },
  },
};

export const containerVariants = (delay = 0) => ({
  offscreen: {
    opacity: 0,
    y: 10,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      duration: 2,
      delay,
    },
  },
});
