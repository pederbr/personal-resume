'use client';

import { useEffect, useState } from 'react';
import { Octokit } from "@octokit/rest";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { H2, H3, Muted, P } from "@/components/ui/typography";
import { Briefcase, Bot, Atom, Code, Codepen, Coffee, Cpu, Database } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { LucideProps } from 'lucide-react';

interface Repository {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
}
const icons = [Briefcase, Bot, Atom, Code, Codepen, Coffee, Cpu, Database];
type IconType = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;


export default function AboutPage() {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const octokit = new Octokit({ 
          auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN 
        });
        
        const { data } = await octokit.rest.repos.listForUser({
          username: "pederbr",
          per_page: 100,
          sort: "updated"
        });
        
        setRepos(data as Repository[]);
      } catch (error) {
        console.error('Failed to fetch repos:', error);
      }
    };

    fetchRepos();
  }, []);

  return (
    <>
      <Navbar />
      <div className={`container mx-auto my-20 px-10 lg:px-40 md:px-30 `}>
        <H2>Here are some of my most recent projects imported from GitHub.</H2>
        <P>These are some of the recent porjects from my GitHub page. They are imported directly to this site via the GitHub API. For more info about each project, click the cards.</P>
        <div className="flex flex-wrap -mx-2">
        {repos.map((repo) => {
            const randomIndex = Math.floor(Math.random() * icons.length);
            const Icon: IconType = icons[randomIndex] || Briefcase;
            return (
              repo.description && (
                <div key={repo.id} className="w-full md:w-1/2 lg:w-1/3 px-2 my-2">
                  <div 
                    className={`min-h-[300px] rounded-lg p-4 mb-4 border 
                    flex flex-col justify-between hover:bg-primary-foreground
                    `}>
                    <Link href={repo.html_url}>
                    <div 
                    className={`border w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-primary-foreground`}>
                    <Icon className="w-5 h-5" />
                    </div>
                      <H3>{repo.name}</H3>
                      <P>{repo.description}</P>
                      <Muted>
                        <P>Language: {repo.language}</P>
                      </Muted>
                    </Link>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}