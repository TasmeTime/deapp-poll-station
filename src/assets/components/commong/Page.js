import styled from "styled-components";
import { Colors, Devices } from "../../Theme";
import { motion } from "framer-motion/dist/framer-motion";
import { fadeInFromBottom } from "../../Animations";
const PageEl = styled.article`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
`;
const Title = styled(motion.h1)`
  font-size: 8vw;
  @media ${Devices.Tablet} {
    font-size: 6vw;
  }
  @media ${Devices.Laptop} {
    font-size: 5vw;
  }

  :focus {
    outline: none;
  }
`;
const SubTitle = styled(motion.h5)`
  font-size: 2.6vw;
  color: ${Colors.GrayText};

  @media ${Devices.Tablet} {
    font-size: 1.5vw;
  }
  @media ${Devices.Laptop} {
    font-size: 1vw;
  }
`;
export default function Page({ children, title, subTitle, editableTitle }) {
  return (
    <PageEl>
      {title ? (
        <Title
          {...fadeInFromBottom({
            transition: { type: "tween", duration: 0.35, delay: 0.2 },
          })}
          onKeyDown={(e) => {
            if (
              e.key === "Enter" &&
              typeof editableTitle?.onEnter === "function"
            ) {
              editableTitle.onEnter();
              e.preventDefault();
            }
          }}
          contentEditable={typeof editableTitle?.event === "function"}
          onInput={(e) => {
            if (typeof editableTitle?.event === "function")
              editableTitle?.event(e.currentTarget.textContent);
          }}
        >
          {title}
        </Title>
      ) : (
        ""
      )}
      {subTitle ? (
        <SubTitle
          {...fadeInFromBottom({
            transition: { type: "tween", duration: 0.35, delay: 0.3 },
          })}
        >
          {subTitle}
        </SubTitle>
      ) : (
        ""
      )}
      {children}
    </PageEl>
  );
}
