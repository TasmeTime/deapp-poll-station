import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createGlobalStyle } from "styled-components";
import { Colors } from "./assets/Theme";

const GlobalStyle = createGlobalStyle`
  body{
    background-color:${Colors.GrayBg};
    overflow-x:hidden;
  }

*{
  padding: 0;
   margin: 0;
   box-sizing: border-box;
   font-family: 'Poppins', sans-serif;
    scrollbar-width: 0;

  ::-webkit-scrollbar {
    display: none;
  }
}

a{
  text-decoration: none;
  color: inherit;
}

a:visited{
  color: inherit;
}
   
`;

ReactDOM.render(
  <React.StrictMode>
    <React.Fragment>
      <GlobalStyle />
      <App />
    </React.Fragment>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
