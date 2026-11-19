import localFont from "next/font/local";

// Self-hosted Google Fonts so builds never depend on network access.
// Every face below is preloaded, so each one listed costs a download on first paint: list only what's used.
// Cormorant ships static files per weight; the site uses 300, 400 and 500 (no 600/700 anywhere).
const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "../fonts/cormorant-upright-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/cormorant-upright-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-upright-500.woff2", weight: "500", style: "normal" },
  ],
});

// Alegreya and Roboto are variable fonts: one file covers the whole weight range, so each is declared
// once with that range (previously the same file was listed per weight and downloaded several times).
const alegreya = localFont({
  variable: "--font-alegreya",
  display: "swap",
  src: [
    { path: "../fonts/alegreya-400.woff2", weight: "400 500", style: "normal" },
    { path: "../fonts/alegreya-400-italic.woff2", weight: "400 500", style: "italic" },
  ],
});

const roboto = localFont({
  variable: "--font-roboto",
  display: "swap",
  src: [{ path: "../fonts/roboto-400.woff2", weight: "300 500", style: "normal" }],
});

export const fontVariables = `${cormorant.variable} ${alegreya.variable} ${roboto.variable}`;
