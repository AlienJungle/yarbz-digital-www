import { Variant, Variants, motion } from "framer-motion";

interface TypedTextAnimationProps {
  text: string;
  animationVariant?: Variant;
}

export default function TypedTextAnimation({ text, animationVariant }: TypedTextAnimationProps): JSX.Element {
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
    <motion.p variants={captionVariants} initial={"hidden"} whileInView={"visible"} viewport={{ once: true }}>
      {text.split("").map((char, i) => (
        <motion.span key={i} variants={captionCharacterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.p>
  );
}
