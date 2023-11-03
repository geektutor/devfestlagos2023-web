import { Inter } from "next/font/google";
import "./globals.css";
import "./nav.css";
import "./form.css";
import "./timer.css";
import "./footer.css";
import "./hero.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevFest Uyo",
  description: "Generate and share your unique Devfest Lagos 2023 DP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
