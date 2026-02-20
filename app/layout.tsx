import "./globals.css";
import { DM_Sans, Playfair_Display, Space_Mono } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600"], // add
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "600", "700"], // add
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${spaceMono.variable}`}
    >
      <body className="bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
