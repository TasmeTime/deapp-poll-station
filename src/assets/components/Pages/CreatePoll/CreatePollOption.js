import styled from "styled-components";
import { Colors, Shadows } from "../../../Theme";
const PollOptionEl = styled.div`
  position: relative;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  background-color: ${Colors.White};
  border-radius: 10px;
  padding: 1.2rem 1rem 1rem 2.5rem;
  font-weight: 600;
  font-size: 1.2rem;
  gap: 0.5rem;
  transition: all 0.2s ease-in;
  ${Shadows.Header};

  :hover {
    ${Shadows.CardHover};
  }
`;

const Id = styled.span`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  height: 100%;
  width: fit-content;
  align-items: center;
  justify-content: center;
  width: 2rem;
  background-color: ${Colors.Secondary};
  border-radius: 10px 50px 50px 10px;
  color: ${Colors.White};
`;

export default function CreatePollOption({ option, removeOption }) {
  const { id, text } = option;
  return (
    <PollOptionEl
      onClick={() => {
        removeOption(text);
      }}
    >
      <Id>{id}</Id>
      {text}
    </PollOptionEl>
  );
}
