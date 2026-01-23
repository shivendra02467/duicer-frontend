import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Videos", path: "/videos" },
        { name: "Projects", path: "/projects" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="fixed top-0 w-full z-50 bg-black border-b border-white/10">
            <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
                <Link to="/" className="transition-transform duration-300 flex items-center">
                    <img
                        src="/duicer.svg"
                        alt="Duicer Logo"
                        className="h-8 md:h-10 w-auto"
                    />
                </Link>

                <div className="hidden md:flex items-center gap-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className={`px-4 py-1 text-[1.5vh] font-black uppercase tracking-[0.2em] transition-all
                ${isActive(link.path)
                                    ? "bg-[#ffde59] text-black"
                                    : "text-white hover:text-[#ffde59]"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <button
                    className="md:hidden p-2 text-white"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            <div
                className={`absolute top-20 left-0 w-full bg-black border-b border-white/10 transition-all duration-300 overflow-hidden md:hidden ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="flex flex-col p-6 gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`text-[20px] font-bold uppercase tracking-tighter ${isActive(link.path) ? "text-[#ffde59]" : "text-white"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;