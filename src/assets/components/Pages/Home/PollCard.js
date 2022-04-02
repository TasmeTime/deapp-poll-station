import { Link } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";
import { Colors, Devices, Shadows } from "../../../Theme";
import { motion } from "framer-motion/dist/framer-motion";
import {
  fadeIn,
  fadeInFromBottom,
  fadeInFromLeft,
  fadeInFromRight,
} from "../../../Animations";

const PollCardEl = styled(motion.article)`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: ${Colors.White};
  border-radius: 10px;
  padding: 1.2rem 1rem 1rem 1rem;
  gap: 0.5rem;
  transition: all 0.2s ease-in;
  ${Shadows.Header};

  :hover {
    ${Shadows.CardHover};
  }
`;
const CreatedBy = styled(motion.span)`
  background-color: ${Colors.Secondary};
  width: fit-content;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  color: ${Colors.White};
  border-radius: 50px;
`;
const Title = styled(motion.h3)``;
const Time = styled(motion.span)`
  font-size: 1rem;
  font-weight: 500;
  color: ${Colors.GrayText};
`;
const VotesCount = styled(motion.span)`
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-10%, -50%);
  border: 3px solid ${Colors.Primary};
  background-color: ${Colors.PrimaryFade};
  font-weight: 600;
  color: ${Colors.GrayDark};
  width: fit-content;
  padding: 0.3rem 0.5rem;
  border-radius: 50px;
  font-size: 0.8rem;
  ${Shadows.PrimaryFade};

  @media ${Devices.Laptop} {
    transform: translate(10%, -50%);
  }
`;

export default function PollCard({ poll }) {
  const {
    id,
    owner = "",
    title,
    expireDate,
    insertionDate,
    votesCount = 85,
  } = poll;
  return (
    <Link to={`/poll/${id}`}>
      <PollCardEl
        {...fadeIn({
          transition: { type: "tween", duration: 0.3, delay: 0.1 },
        })}
      >
        <CreatedBy
          {...fadeInFromBottom({
            transition: { type: "tween", duration: 0.35, delay: 0.2 },
          })}
        >
          {owner.substring(0, 6) +
            "..." +
            owner.substring(owner.length - 5, owner.length)}
        </CreatedBy>
        <Title
          {...fadeInFromBottom({
            transition: { type: "tween", duration: 0.35, delay: 0.3 },
          })}
        >
          {title}
        </Title>
        <Time
          {...fadeInFromBottom({
            transition: { type: "tween", duration: 0.35, delay: 0.4 },
          })}
        >
          {moment().from(insertionDate)}
        </Time>
        <VotesCount
          {...fadeInFromRight({
            transition: { type: "tween", duration: 0.35, delay: 0.5 },
          })}
        >
          {votesCount} Votes
        </VotesCount>
      </PollCardEl>
    </Link>
  );
}
