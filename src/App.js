import styled from "styled-components";
import Footer from "./assets/components/Footer";
import Header from "./assets/components/Header";
import CreatePoll from "./assets/components/Pages/CreatePoll/CreatePoll";
import Home from "./assets/components/Pages/Home/Home";
import { AnimatePresence } from "framer-motion/dist/framer-motion";
import Poll from "./assets/components/Pages/Poll/Poll";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Devices } from "./assets/Theme";
import Loading from "./assets/components/commong/Loading";
import { useReducer, useState } from "react";
import GlobalContext from "./contexts/GlobalContext";
import PA from "./Helper/PollAccess";
require("dotenv").config();

const LOCAL_PROVIDER = process.env.REACT_APP_LOCAL_PROVIDER;
const POLL_STATION_ADRESS = process.env.REACT_APP_POLL_STATION_ADRESS;

const AppEl = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

const Content = styled.section`
  margin-top: 2rem;
  flex: 1;
  padding: 0.7rem 5vw;
  position: relative;
  @media ${Devices.Laptop} {
    margin-top: 3.5rem;
    padding: 0.7rem 20vw;
  }
`;

function reducer(state, action) {
  switch (action.type) {
    case "changeWallet":
      localStorage.setItem("Wallet", action.newWallet);
      return { ...state, CurrentWallet: action.newWallet };
    case "changeConnection":
      const _locIsConnected = localStorage.setItem(
        "IsConnected",
        action.newState
      );
      localStorage.setItem("Wallet", action.newAccount);
      return {
        ...state,
        IsConnected: action.newState,
        CurrentWallet: action.newAccount,
      };
    default:
      throw new Error();
  }
}

function App() {
  const _locIsConnected = localStorage.getItem("IsConnected");
  const _locWallet = localStorage.getItem("Wallet");
  const [DataAccess, dispatchDA] = useReducer(reducer, {
    IsConnected: _locIsConnected,
    PSCAdress: POLL_STATION_ADRESS,
    Provider: LOCAL_PROVIDER,
    CurrentWallet: _locWallet,
  });
  const [IsLoading, SetIsLoading] = useState({ isLoading: false, text: "" });

  const pollAccess = new PA(
    DataAccess.Provider,
    DataAccess.PSCAdress,
    DataAccess.CurrentWallet
  );

  useState(() => {
    console.log("USEFFECT", pollAccess.CurrentWallet);
    window.ethereum.on("accountsChanged", function (accounts) {
      if (
        !DataAccess.CurrentWallet ||
        DataAccess.CurrentWallet !== accounts[0]
      ) {
        dispatchDA({
          type: "changeWallet",
          newWallet: accounts[0],
        });
        console.log("Active wallet changed to: ", accounts[0]);
        window.location.reload();
      }
    });
    return () => {
      window.ethereum.off("accountsChanged");
    };
  }, []);

  const setIsLoading = (newState, text = undefined) => {
    if (text) SetIsLoading({ isLoading: newState, text: text });
    else SetIsLoading({ isLoading: newState, text: "" });
  };

  return (
    <Router>
      <AppEl>
        <GlobalContext.Provider
          value={{
            DataAccess,
            dispatchDA,
            setIsLoading,
            PollAccess: pollAccess,
          }}
        >
          <Header />
          <Content>
            <AnimatePresence>
              {IsLoading.isLoading ? (
                <Loading text={IsLoading?.text ? IsLoading.text : undefined} />
              ) : (
                ""
              )}
            </AnimatePresence>
            <Routes>
              <Route excat path="/create" element={<CreatePoll />} />
              <Route excat path="/poll/:pollId" element={<Poll />} />
              <Route excat path="/" element={<Home />} />
            </Routes>
          </Content>
          <Footer />
        </GlobalContext.Provider>
      </AppEl>
    </Router>
  );
}

export default App;
