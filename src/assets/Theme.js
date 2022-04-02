//use the following file to define your colors, breakpoints, and your Theme in general across the project

export const Colors = {
  Primary: "#35abff",
  PrimaryFade: "#35abff38",
  // Secondary: "#1D3557",
  Secondary: "#1D35579c",
  White: "#FFFFFF",
  LoadingBg: "#ffffffed",
  Black: "#212121",
  GrayBg: "#FAFAFA",
  GrayDark: "#686868",
  GrayText: "#B1B1B1",
  Red: "#FF5253",
  CardBorder: "#00000014",
  random: () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  },
};

export const Shadows = {
  Header: "box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
  PrimaryFade: "box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
  CardHover:
    "box-shadow: rgba(17, 17, 26, 0.05) 0px 4px 16px,rgba(17, 17, 26, 0.05) 0px 8px 32px",
  // CardHoverInset:
  //   "box-shadow: inset rgba(17, 17, 26, 0.05) 0px 4px 16px,inset rgba(17, 17, 26, 0.05) 0px 8px 32px",
  CardHoverInset:
    "box-shadow: inset rgba(17, 17, 26, 0.05) 0px 4px 0,inset rgba(17, 17, 26, 0.05) 0px 8px 0",
};

const BreakPoints = {
  MobileS: "320px",
  MobileM: "375px",
  MobileL: "425px",
  Tablet: "768px",
  Laptop: "1024px",
  LaptopL: "1440px",
  Desktop: "2560px",
};

export const Devices = {
  MobileS: `(min-width: ${BreakPoints.MobileS})`,
  MobileM: `(min-width: ${BreakPoints.MobileM})`,
  MobileL: `(min-width: ${BreakPoints.MobileL})`,
  Tablet: `(min-width: ${BreakPoints.Tablet})`,
  Laptop: `(min-width: ${BreakPoints.Laptop})`,
  LaptopL: `(min-width: ${BreakPoints.LaptopL})`,
  Desktop: `(min-width: ${BreakPoints.Desktop})`,
};
