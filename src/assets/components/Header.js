import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GlobalContext from "../../contexts/GlobalContext";
import MetaMaskAPI from "../../MetaMask/MetaMaskAPI";
import { Colors, Devices, Shadows } from "../Theme";
import Button from "./commong/Button";
const HeaderEl = styled.header`
  position: sticky;

  z-index: 3;
  top: 0;
  min-height: 10vh;

  height: fit-content;
  background-color: ${Colors.White};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 2vw;

  @media ${Devices.Laptop} {
    padding: 0.7rem 15vw;
  }

  ${Shadows.Header};
`;

const Title = styled.a`
  font-weight: 500;
  font-size: 4.2vw;

  @media ${Devices.Tablet} {
    font-size: 3vw;
  }
  @media ${Devices.Laptop} {
    font-size: 2vw;
  }
`;
const PrimTitle = styled(Title)`
  color: ${Colors.Primary};
  font-weight: bold;
`;

const ConnectBtn = styled.button`
  all: unset;
  cursor: pointer;
  background-color: ${Colors.Primary};
  padding: 0.3rem 1rem;
  border-radius: 50px;
  color: ${Colors.White};
  margin-left: 1rem;
  font-size: 3vw;

  @media ${Devices.Tablet} {
    font-size: 2.5vw;
  }
  @media ${Devices.Laptop} {
    font-size: 1.1vw;
  }
`;

export default function Header() {
  const { dispatchDA, DataAccess, PollAccess } = useContext(GlobalContext);

  const connectMetaMask = async () => {
    const { success, account } = await MetaMaskAPI.connect();
    console.log("WA", success, account);

    if (success)
      dispatchDA({
        type: "changeConnection",
        newState: success,
        newAccount: account,
      });
  };

  return (
    <HeaderEl>
      <Title href="/">
        Poll <PrimTitle as="span">Station</PrimTitle>
      </Title>
      {DataAccess.IsConnected ? (
        <>
          <span>{DataAccess.CurrentWallet.substring(0, 10)}...</span>
          <Link to="/create">
            <Button>Create Poll</Button>
          </Link>
        </>
      ) : (
        <ConnectBtn
          onClick={() => {
            connectMetaMask();
          }}
        >
          Connect
        </ConnectBtn>
      )}
    </HeaderEl>
  );
}
