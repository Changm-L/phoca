import { styled } from "styletron-react";

export const MainButtonHoverWrapper = styled(
  "div",
  (props: { $guide?: Boolean }) => ({
    gridRowStart: props.$guide && 1,
    gridRowEnd: props.$guide && 3,
    ":hover > div": {
      opacity: 1,
      border: "calc(2px + .85vw) solid rgba(255, 255, 255, .5)",
      transition: ".2s border ease",
      borderRadius:
        "calc(var(--x) / var(--size) * 100%) calc(var(--dx) / var(--size) * 100%) calc(var(--dx) / var(--size) * 100%)  calc(var(--x) / var(--size) * 100%) / calc(var(--y) / var(--size) * 100%) calc(var(--y) / var(--size) * 100%) calc(var(--dy) / var(--size) * 100%) calc(var(--dy) / var(--size) * 100%)",
      ":after": {
        content: "''",
        backgroundRepeat: "round",
        position: "absolute",
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
        opacity: "0.7",
      },
    },
  }),
);
export const MainButton = styled("div", (props: { $guide?: Boolean }) => ({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "30px",
  width: "300px",
  height: props.$guide ? "100%" : "300px",
  margin: "0 auto",
  cursor: "pointer",
  fontFamily: "Nanum Gothic Coding, monospace",
  fontWeight: "bold",
  fontSize: "1.5rem",
  backgroundColor: props.$guide && "#88C72E",
  "--dx": "calc(var(--size) - var(--x))",
  "--dy": "calc(var(--size) - var(--y))",
  ":hover": {},
  ":after": {
    content: "''",
    backgroundImage: "url(/well_done.svg)",
    backgroundRepeat: "round",
    position: "absolute",
    top: "0px",
    right: "0px",
    bottom: "0px",
    left: "0px",
    opacity: "0.7",
  },
}));

export const MainButtonWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "repeat(3, 300px)",
  gridTemplateRows: "repeat(2, 1fr)",
  justifyContent: "center",
  gap: "50px 50px",
});

export const MainPhrase = styled("p", (props: { $subTitle?: Boolean }) => ({
  fontSize: props.$subTitle ? "1.5rem" : "2rem",
  textAlign: "center",
  padding: "20px",
  marginTop: props.$subTitle ? "" : "20px",
  marginBottom: "20px",
}));

export const MainWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
});

export const PhraseWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  flexDirection: "column",
});
