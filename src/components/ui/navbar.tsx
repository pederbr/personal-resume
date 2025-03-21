'use client';

import { useState } from 'react';
import { Linkedin, Github, Send, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent 
} from '@/components/ui/dropdown-menu';
import { H1 } from './typography';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdown = (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button onClick={toggleDropdown}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      <Link
          href="/about"
          className={`min-w-28 flex items-center px-2 py-2 rounded-md ${pathname === '/about' ? 'bg-primary-foreground': ''}  `}
        >
        About Me
        </Link>
        <Link
          href="/projects"
          className={`min-w-28 flex items-center px-2 py-2 rounded-md ${pathname === '/projects' ? 'bg-primary-foreground': ''}  `}
        >
          My Projects
        </Link>
        <Link
          href="/blog"
          className={`min-w-28 flex items-center px-2 py-2 rounded-md ${pathname === '/blog' ? 'bg-primary-foreground':''}  `}
        >
        My blog
        </Link>
        <div className={`border-b  my-2 `}></div>

        <div className='flex items-center'>
        <Link
          href="https://www.linkedin.com/in/pederbrennum"
          className={`flex items-center px-3 py-2 rounded-md hover:text-muted-foreground`}
        >
          <Linkedin className="w-6 h-6" />
        </Link>
        <Link
          href="https://www.github.com/pederbr"
          className={`flex items-center px-3 py-2 rounded-md hover:text-muted-foreground`}
        >
          <Github className="w-6 h-6" />
        </Link>
        <Link
          href="mailto:peder.brennum@gmail.com"
          className={`flex items-center px-3 py-2 rounded-md hover:text-muted-foreground`}
        >
          <Send className="w-6 h-6" />
        </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <>
    <div className={`flex justify-between p-10`}>
      <div className="flex items-center p-4">
        <Link href="/">
          <H1>Peder Brennum</H1>
        </Link>
      </div>

      <div className="flex items-center lg:hidden">
        {dropdown}
      </div>
    
      <div className={`flex-col lg:flex-row lg:flex space-x-4 items-center ${isOpen ? 'flex' : 'hidden'} lg:flex`}>
        <Link
          href="/about"
          className={`min-w-28 flex items-center px-2 py-2 rounded-md ${pathname === '/about' ? 'bg-primary-foreground': ''}  `}
        >
          About Me
        </Link>
        <Link
          href="/projects"
          className={`min-w-28 flex items-center px-2 py-2 rounded-md ${pathname === '/projects' ? 'bg-primary-foreground': ''}  `}
        >
           My Projects
        </Link>
        <Link
          href="/blog"
          className={`min-w-28 flex items-center px-2 py-2 rounded-md ${pathname === '/blog' ? 'bg-primary-foreground':''}  `}
        >
          My blog
        </Link>
        <div className={`border-l mx-4 h-8`}></div>

        <div className="flex space-x-4 items-center">
          <Link href="https://www.linkedin.com/in/pederbrennum" className='hover:text-muted-foreground'>
            <Linkedin className="w-6 h-6" />
          </Link>
          <Link href="https://www.github.com/pederbr" className='hover:text-muted-foreground'>
            <Github className="w-6 h-6" />
          </Link>
          <Link href="mailto:peder.brennum@gmail.com" className='hover:text-muted-foreground'>
            <Send className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </div>
    <div className='border-b mx-10'></div>
    </>

  );
};

export default Navbar;