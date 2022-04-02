import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion/dist/framer-motion";
import { Colors } from "../../Theme";

const LoadingEl = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  width: 100%;
  height: 100%;
  background-color: ${Colors.LoadingBg};
`;

const LoadingWrapper = styled.div`
  display: grid;
  gap: 0.7rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
`;

const Text = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  filter: drop-shadow(0px 3px 1px #21212121);
`;

const Box = styled(motion.div)`
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0;
  border-radius: 6px;
  background-color: ${Colors.Primary};
  border: 1px solid ${Colors.White};
`;

export default function Loading({ text = undefined }) {
  return (
    <LoadingEl
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <LoadingWrapper>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
          return (
            <Box
              animate={{ opacity: [0, 1, 0], scale: [0.9, 1.3, 0] }}
              transition={{
                repeat: Infinity,
                repeatDelay: 1,
                type: "spring",
                duration: 0.7,
                delay: i / 15,
              }}
              key={i}
            />
          );
        })}
      </LoadingWrapper>
      {text ? <Text>{text}</Text> : ""}
    </LoadingEl>
  );
}
