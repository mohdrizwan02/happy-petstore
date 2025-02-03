import { NavLink } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { text: "Home", href: "/" },
    { text: "Services", href: "/services" },
    { text: "About Us", href: "/about" },
    { text: "Contact Us", href: "/contact" },
  ];

  return (
    <footer className="px-8 hidden md:block py-8 bg-[#2F0601]">
      <div className="container mx-auto flex flex-col items-center">
        <div className="flex flex-wrap items-center justify-center gap-8 pb-6">
          {footerLinks.map((link) => (
            <ul key={link.href}>
              <li>
                <NavLink
                  key={link.text}
                  to={link.href}
                  className={({ isActive }) =>
                    isActive
                      ? " text-white font-bold underline hover:bg-white hover:text-[#2f0601] px-[10px] py-[6px] rounded-md text-base"
                      : "text-white font-bold hover:text-[#2F0601] hover:bg-white px-[10px] py-[6px] rounded-md text-base"
                  }
                >
                  {link.text}
                </NavLink>
              </li>
            </ul>
          ))}
        </div>
        <p className="mt-4 block antialiased font-sans text-sm font-normal text-gray-400">
          Copyright © {currentYear} Happy-Pets
        </p>
      </div>
    </footer>
  );
}
