import localFont from "next/font/local";

// Self-hosted Google Fonts so builds never depend on network access.
const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "../fonts/cormorant-upright-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/cormorant-upright-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/cormorant-upright-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/cormorant-upright-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/cormorant-upright-700.woff2", weight: "700", style: "normal" },
  ],
});

const alegreya = localFont({
  variable: "--font-alegreya",
  display: "swap",
  src: [
    { path: "../fonts/alegreya-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/alegreya-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/alegreya-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/alegreya-500-italic.woff2", weight: "500", style: "italic" },
  ],
});

const roboto = localFont({
  variable: "--font-roboto",
  display: "swap",
  src: [
    { path: "../fonts/roboto-300.woff2", weight: "300", style: "normal" },
    { path: "../fonts/roboto-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/roboto-500.woff2", weight: "500", style: "normal" },
  ],
});

export const fontVariables = `${cormorant.variable} ${alegreya.variable} ${roboto.variable}`;
