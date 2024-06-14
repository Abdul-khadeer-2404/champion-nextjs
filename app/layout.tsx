import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollTop } from "primereact/scrolltop";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
const inter = Inter({ subsets: ["latin"] });
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export const metadata: Metadata = {
  title: "Champion",
  description:
    "Where talent meets opportunity in a dynamic online marketplace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {" "}
            <Header />
            {children}
            <Footer />
            <ScrollTop
              className="h-10 w-9 text-white bg-red-600/90 rounded-lg "
              icon={<FontAwesomeIcon icon={faArrowUp} className="h-6" />}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
