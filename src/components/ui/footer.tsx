'use client';

import { Linkedin, Github, Send, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useTheme } from 'next-themes';

const Footer = () => {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <>
        <div className={`border-b mx-10 my-2`}></div>
        <div className={`flex justify-between p-10 text-muted-foreground`}>
 
            <div className="flex space-x-4 items-center">
            <Link href="https://www.linkedin.com/in/pederbrennum" >
                <Linkedin className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </Link>
            <Link href="https://www.github.com/pederbr" >
                <Github className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </Link>
            <Link href="mailto:peder.brennum@gmail.com" >
                <Send className="w-6 h-6 hover:scale-110 transition-transform duration-200" />
            </Link>
            </div>
            <div>
                &copy; 2024 Peder Brennum. All rights reserved
            </div>
            <button 
                onClick={toggleTheme} 
                className={`p-2 rounded flex items-center border hover:bg-primary-foreground`}
            >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
        </div>
        </>
    );
};

export default Footer;