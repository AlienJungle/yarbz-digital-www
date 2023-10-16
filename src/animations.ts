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
  },
};
