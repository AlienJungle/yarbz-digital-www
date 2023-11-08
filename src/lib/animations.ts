import { TargetAndTransition, VariantLabels, Variants } from "framer-motion";

// Unsure why using Variant export from framer-motion library doesn't
// work, so recreating it myself here.
type Variant = TargetAndTransition | VariantLabels | undefined;

export const tapVariant: Variant = {
  scale: 0.8,
};

export const hoverVariant: Variant = {
  scale: 1.1,
};

export const introVariants: Variants = {
  hidden: {
    y: "-50px",
    opacity: 0,
  },
  visible: {
    y: "0px",
    opacity: 1,
    transition: {
      delay: 0.4,
    },
  },
};

export const introBurstIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 100,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: "100",
      duration: 0.5,
    },
  },
};

export const introSlideInFromRight: Variants = {
  hidden: {
    transform: "translateX(50vw)",
  },
  visible: {
    transform: "translateX(0)",
  },
};

export const hoverScale: Variant = {
  scale: 1.12,
  transition: {
    type: "spring",
    duration: 0.3,
  },
};

export const tapScale: Variant = {
  scale: 0.9,
  transition: {
    type: "spring",
    duration: 0.3,
  },
};
