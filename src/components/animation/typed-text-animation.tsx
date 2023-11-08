import { HTMLMotionProps, Variant, Variants } from "framer-motion";
import * as motion from "../../lib/motion";

interface TypedTextAnimationProps extends HTMLMotionProps<"p"> {
  text: string;
  animationVariant?: Variant;
}

export default function TypedTextAnimation({ text, animationVariant, ...props }: TypedTextAnimationProps): JSX.Element {
  const captionVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.005,
      },
      ...animationVariant,
    },
  };

  const captionCharacterVariants: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };

  return (
    <motion.p variants={captionVariants} initial={"hidden"} whileInView={"visible"} viewport={{ once: true }} {...props}>
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={captionCharacterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}
