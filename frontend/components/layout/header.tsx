"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const navItems = [
    { name: "События", path: "/" },
    { name: "Видео", path: "/video" },
    { name: "Докладчики", path: "/speakers" },
    { name: "Подать доклад", path: "/submit" },
  ]

  return (
    <header className="flex items-center bg-black text-white">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="bg-yellow-400 h-16 w-16 flex items-center justify-center relative">
            <Image
              src="/logo.png"
              alt="MoscowQA Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold px-4">MoscowQA</h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {navItems.map((item) => (
              <li key={item.path} className="uppercase font-medium">
                <Link
                  href={item.path}
                  className={`hover:text-pink-600 ${
                    pathname === item.path || (item.path === "/" && pathname === "/event/63")
                      ? "bg-pink-600 text-white px-4 py-2"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

