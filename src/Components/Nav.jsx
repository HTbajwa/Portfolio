import { useState } from "react";
import { FiMenu } from "react-icons/fi"; // optional, for mobile toggle

const navItems = [
  "Home",
  "About",
  "Service",
  "Skill",
  "Portfolio",
  "Experience",
  "Testimonials",
  "Contact",
];

export default function Navbar() {
  const [active, setActive] = useState("home");

  return (
    <nav className="fixed top-3 inset-x-0 z-50 flex justify-center">
      {/* outer wrapper = gradient border + glow */}
      <div className="bg-gradient-to-r from-emerald-500/60 to-emerald-500/60 p-[2px] rounded-full shadow-[0_0_18px_1px_rgba(16,255,145,0.35)]">
        {/* inner pill */}
        <div className="flex items-center px-5 py-3 md:px-10 bg-[#071513] rounded-full gap-6">
          {/* logo / name */}
          <a
            href="#home"
            className="text-3xl font-extrabold italic text-emerald-400 font-[Dancing_Script] select-none"
          >
            Hadia
          </a>

          {/* links */}
          <ul className="hidden lg:flex gap-6 uppercase text-xs font-semibold tracking-wider">
            {navItems.map((item) => (
              <li key={item} className="relative">
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setActive(item)}
                  className={`transition-colors ${
                    active === item ? "text-emerald-400" : "text-gray-200"
                  } hover:text-emerald-300`}
                >
                  {item}
                </a>

                {/* tiny dot under the active link */}
                {active === item && (
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-[2px] block w-1 h-1 bg-emerald-400 rounded-full" />
                )}
              </li>
            ))}
          </ul>

          {/* spacer */}
          <div className="flex-1" />

          {/* CTA button */}
          <a
            href="/cv.pdf"
            className="rounded-full bg-emerald-500 px-6 py-2 text-sm font-semibold text-white shadow-[0_0_12px_rgba(16,255,145,0.45)] hover:bg-emerald-600 transition-colors"
          >
            Download CV
          </a>

          {/* mobile menu icon (optional) */}
          <button className="lg:hidden ml-2 text-emerald-400">
            <FiMenu size={22} />
          </button>
        </div>
      </div>
    </nav>
  );
}
