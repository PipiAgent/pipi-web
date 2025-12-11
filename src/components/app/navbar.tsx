import Image from "next/image"
import Link from "next/link"

import { ThemeSwitcher } from "@/components/app/theme-switcher"

function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-20 mx-auto flex h-[70px] w-full items-center border-b-4 border-border bg-secondary-background px-5">
      <div className="mx-auto flex w-[1300px] text-foreground max-w-full items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          {/* Logo */}
          <Link
            className="flex items-center gap-2"
            href="/"
          >
            <div className="relative size-10 rounded-base border-2 border-border overflow-hidden bg-main">
              <Image
                src="/pipi-character.png"
                alt="PIPI"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-heading text-xl text-main hidden sm:inline">$PIPI</span>
          </Link>

          {/* Navigation Links */}
          <div className="items-center text-base font-base gap-6 md:gap-8 lg:flex hidden">
            <Link href="#lore" className="hover:text-main transition-colors">
              Lore
            </Link>
            <Link href="#buy" className="hover:text-main transition-colors">
              Buy
            </Link>
            <a
              href="https://twitter.com/PinkPepePig"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-main transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://t.me/pinkpepepig"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-main transition-colors"
            >
              Telegram
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Twitter/X */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://twitter.com/PinkPepePig"
            className="flex items-center justify-center rounded-base border-2 border-border shadow-nav dark:shadow-navDark dark:border-darkBorder size-9 transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none dark:hover:shadow-none"
          >
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                className="fill-foreground"
                d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
              />
            </svg>
          </a>

          {/* Telegram */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://t.me/pinkpepepig"
            className="flex items-center justify-center rounded-base border-2 border-border shadow-nav dark:shadow-navDark dark:border-darkBorder size-9 transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none dark:hover:shadow-none"
          >
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 496 512"
            >
              <path
                className="fill-foreground"
                d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z"
              />
            </svg>
          </a>

          {/* Buy Button (Mobile) */}
          <Link
            href="#buy"
            className="flex items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground shadow-nav px-3 h-9 font-heading text-sm transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none md:hidden"
          >
            Buy
          </Link>

          {/* Buy Button (Desktop) */}
          <Link
            href="#buy"
            className="hidden md:flex items-center justify-center rounded-base border-2 border-border bg-main text-main-foreground shadow-nav px-4 h-9 font-heading text-sm transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none"
          >
            Buy $PIPI
          </Link>

          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
