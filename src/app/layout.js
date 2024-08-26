import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from './provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "workwise assesment"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <ReduxProvider>
        {children}
        </ReduxProvider>
        </body>
    </html>
  );
}
