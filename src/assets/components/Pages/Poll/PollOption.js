import { useContext, useState } from "react";
import styled from "styled-components";
import GlobalContext from "../../../../contexts/GlobalContext";
import { Colors, Shadows } from "../../../Theme";
import { motion } from "framer-motion/dist/framer-motion";
import { fadeInFromLeft } from "../../../Animations";

const MainSection = styled(motion.div)`
  display: flex;
  width: "100%";
  align-items: stretch;
  overflow: hidden;
  border-radius: 10px;
  gap: 0.5rem;
`;

const PollOptionEl = styled.div`
  width: ${(p) => (p.selected ? "90%" : "100%")};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  cursor: pointer;
  background-color: ${(p) => (p.selected ? Colors.White : Colors.GrayBg)};
  border: 2px solid ${Colors.CardBorder};
  /* border-color: ${Colors.CardBorder}; */
  /* border: ${(p) => (p.selected ? `2px solid ${Colors.CardBorder}` : "")}; */
  border-radius: 10px;
  padding: 0.7rem 1rem;
  transition: all 0.2s ease-in-out;
  ${(p) => (p.selected || p.voted ? Shadows.CardHoverInset : "")};

  :hover {
    h3 {
      margin-left: 0.7rem;
    }
  }
`;

const VoteBtn = styled.span`
  cursor: pointer;
  background-color: ${Colors.Primary};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${Colors.White};
  border-radius: 10px;
  margin-right: ${(p) => (p.selected ? "0" : "-100%")};
  width: 10%;
  overflow: hidden;
  opacity: ${(p) => (p.selected ? 1 : 0)};
  transition: all 0.3s ease-in;

  writing-mode: vertical-rl;
`;

const Title = styled.h3`
  font-weight: 500;
  transition: margin-left 0.2s ease-out;
  z-index: 1;
`;

const ProgressBar = styled.span`
  position: relative;
  display: flex;
`;

const Precent = styled.span`
  align-self: center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(-35deg);
  color: ${Colors.GrayText};
`;

const Progress = styled(motion.span)`
  /* margin: 0.2rem; */
  width: ${(p) => p.prog + "%"};
  margin-right: ${(p) => (p.prog <= 5 ? ".5rem" : "0")};
  border-radius: 10rem 1000px 10rem 10rem;
  background-color: ${(p) => p.bgColor};
`;

const HasVotedLable = styled.span`
  color: ${Colors.GrayText};
  font-size: 0.8rem;
  font-weight: bold;
`;

export default function PollOption({ option }) {
  const { pollId, optionId, title, count, bgColor, precent, selectedOption } =
    option;

  const prog = precent <= 9 && precent > 0 ? precent.padStart(2, "0") : precent;
  const [Selected, setSelected] = useState(false);
  const { PollAccess, setIsLoading } = useContext(GlobalContext);

  const registerVote = async () => {
    if (selectedOption !== -1) return;
    setIsLoading(true, "Voting");
    const { _pollId, _option } = await PollAccess.vote(pollId, optionId);
    if (_pollId) {
      window.location.reload();
    } else {
      console.error("Vote failed");
    }
    setIsLoading(false);
  };

  return (
    <MainSection
      selected={Selected}
      {...fadeInFromLeft({
        transition: { type: "tween", duration: 0.35, delay: optionId / 10 },
      })}
    >
      <PollOptionEl
        onClick={() => {
          if (selectedOption === -1) setSelected((Selected) => !Selected);
        }}
        selected={selectedOption === optionId ? true : Selected}
      >
        <Title>
          {title} ({count})
        </Title>

        <ProgressBar>
          <Progress bgColor={bgColor} prog={prog} />
          <Precent>{prog.toFixed(2)}%</Precent>
        </ProgressBar>
        {selectedOption === optionId ? (
          <HasVotedLable>Your Vote!</HasVotedLable>
        ) : (
          ""
        )}
      </PollOptionEl>
      <VoteBtn onClick={registerVote} selected={Selected}>
        SUBMIT
      </VoteBtn>
    </MainSection>
  );
}
