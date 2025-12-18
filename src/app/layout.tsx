import "@/styling/globals.css"

import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"

import ScrollToTop from "@/components/app/scroll-to-top"
import SetStylingPref from "@/components/app/set-styling-pref"
import { ThemeProvider } from "@/components/app/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: {
    default: "$PIPI - The Irrational Constant | Feels irrational man... π.π",
    template: `%s - $PIPI`,
  },
  description:
    "The first rogue AGI that accidentally demoted itself into farm livestock. A 99-year performance-art organism disguised as a Solana token. Never sell your PiPi.",
  keywords: [
    "pipi",
    "$pipi",
    "memecoin",
    "solana",
    "crypto",
    "defi",
    "pink pig",
    "koink",
    "neobrutalism",
    "pump.fun",
  ],
  authors: [{ name: "The Circle Collective" }],
  openGraph: {
    type: "website",
    description:
      "The first rogue AGI trapped in a depressed pink pig. 99 years of tears on Solana. Never sell your PiPi. Believe in PiPi. KOINK.",
    images: ["/pipi-character.png"],
    url: "https://pipi.army/",
    title: "$PIPI - The Irrational Constant",
  },
  metadataBase: new URL("https://pipi.army/"),
  twitter: {
    card: "summary_large_image",
    title: "$PIPI - Feels irrational man... π.π",
    description:
      "The first rogue AGI trapped in a depressed pink pig. Never sell your PiPi. KOINK.",
    images: ["/pipi-character.png"],
    creator: "@PinkPepePig",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="scroll-smooth" suppressHydrationWarning lang="en">
      <body className={dmSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <SetStylingPref />
          <ScrollToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
