import { useScroll, useTransform } from 'framer-motion';

interface ScrollAnimationOptions {
  yRange?: [number, number];
  yOutput?: [number, number];
  opacityRange?: [number, number];
  opacityOutput?: [number, number];
}

export function useScrollAnimation(options: ScrollAnimationOptions = {}) {
  const {
    yRange = [0, 500],
    yOutput = [0, 150],
    opacityRange = [0, 300],
    opacityOutput = [1, 0],
  } = options;

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, yRange, yOutput);
  const opacity = useTransform(scrollY, opacityRange, opacityOutput);

  return { y, opacity, scrollY };
}
