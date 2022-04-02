import styled from "styled-components";
import { Colors, Devices } from "../../Theme";
const Button = styled.button`
  all: unset;
  cursor: pointer;
  background-color: ${Colors.Primary};
  padding: 0.3rem 1rem;
  border-radius: ${(p) => (p.borderRadius ? p.borderRadius : "10px")};
  color: ${Colors.White};
  font-size: 3vw;
  width: ${(p) => (p.width ? p.width : "fit-content")};

  @media ${Devices.Tablet} {
    font-size: 2.5vw;
  }
  @media ${Devices.Laptop} {
    font-size: 1.1vw;
  }
`;

export default Button;
