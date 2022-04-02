import styled from "styled-components";
import { Colors, Devices } from "../Theme";
const FooterEl = styled.footer`
  left: 0;
  bottom: 0;
  width: 100%;
  min-height: 10vh;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${Colors.GrayText};

  a {
    color: ${Colors.GrayDark};
    font-weight: bold;
    margin-left: 0.5rem;
    font-size: 3vw;

    @media ${Devices.Tablet} {
      font-size: 2.5vw;
    }
    @media ${Devices.Laptop} {
      font-size: 1.1vw;
    }
  }
`;

export default function Footer() {
  return (
    <FooterEl>
      developed by
      <a target="_blank" href="https://m-azad.ir">
        TasmeTime
      </a>
    </FooterEl>
  );
}
