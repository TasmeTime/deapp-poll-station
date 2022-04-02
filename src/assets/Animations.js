import { Transition } from "framer-motion/dist/framer-motion";

export const fadeInFromBottom = (props) => {
  const { transition } = props;
  return {
    variants: {
      init: {
        opacity: 0,
        y: 50,
      },
      onVis: { opacity: 1, y: 0 },
    },
    initial: "init",
    transition,
    viewport: { once: false },
    whileInView: "onVis",
  };
};

export const fadeInFromLeft = (props) => {
  const { transition } = props;
  return {
    variants: {
      init: { opacity: 0, x: -50 },
      onVis: { opacity: 1, x: 0 },
    },
    initial: "init",
    transition,
    whileInView: "onVis",
    viewport: { once: false },
  };
};

export const fadeInFromRight = (props) => {
  const { transition } = props;
  return {
    variants: {
      init: { opacity: 0, x: 50 },
      onVis: { opacity: 1, x: 0 },
    },
    initial: "init",
    transition,
    whileInView: "onVis",
    viewport: { once: false },
  };
};

export const fadeIn = (props) => {
  const { transition } = props;
  return {
    variants: {
      init: { opacity: 0 },
      onVis: { opacity: 1 },
    },
    initial: "init",
    transition,
    viewport: { once: false },
    whileInView: "onVis",
  };
};

export const strechY = (props) => {
  const { transition } = props;
  return {
    variants: {
      init: {
        height: 0,
      },
      onVis: { height: "100%" },
    },
    initial: "init",
    transition,
    viewport: { once: false },
    whileInView: "onVis",
  };
};

export const customStrechX = (props) => {
  const { transition, from, to } = props;
  return {
    variants: {
      init: {
        width: from ? from : "0",
      },
      onVis: { width: to ? to : "100%" },
    },
    initial: "init",
    transition,
    viewport: { once: false },
    whileInView: "onVis",
  };
};
