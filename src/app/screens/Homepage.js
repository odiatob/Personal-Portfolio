'use client';

import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

// --- SVG Icons (Components) ---
// Using inline SVGs is a best practice in Next.js to avoid extra file imports.
const MenuIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const CloseIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const GithubIcon = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
);

const LinkedinIcon = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor" >
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
);

const EmailIcon = (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-21.518 14v-11.817l10 8.104 10-8.104v11.817h-20z" />
    </svg>
);


// --- Main Homepage Component ---
export default function Homepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // --- Mock Data ---
  // In a real app, you might fetch this from a CMS or API.
  const projects = [
    {
      title: "SafeTag (Emergency Website for DLSL Students)",
      description: "A full-featured online store with Stripe integration, user authentication, and a custom CMS for product management.",
      tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
      imageUrl:"/safe.png",
      link: "https://safetag-h39z.vercel.app/"
    },
    {
      title: "Job Finder from API data (Mobile App)",
      description: "An interactive dashboard for visualizing complex datasets, built with D3.js for custom charts and graphs.",
      tech: ["React", "Expo Dev", "Node.js", "API"],
      imageUrl: "/api.png",
      link: "https://github.com/odiatob/JobFinder-MobApp.git"
    },
    {
      title: "Farmers Market",
      description: "An interactive dashboard for visualizing complex datasets, built with D3.js for custom charts and graphs.",
      tech: ["React", "Next.js", "Node.js", "API"],
      imageUrl: "/LK.png",
      link: "https://farmers-ud6h.vercel.app/"
"
    },
  ];
  
  const skills = ["JavaScript (ES6+)", "React", "Next.js", "Tailwind CSS", "Figma", "Firebase", "UI/UX Design", "Git & GitHub"];


  return (
    <div className="bg-slate-900 text-slate-300 font-sans leading-relaxed">
      <Head>
        <title>Arvin Zoleta | Full-Stack Developer</title>
        <meta name="description" content="Personal portfolio of Arvin Zoleta, a passionate developer creating modern web experiences." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* --- Header & Navigation --- */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors">
            AZ.
          </a>
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6 items-center">
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#contact" className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Contact Me
            </a>
          </div>
          {/* Mobile Nav Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <CloseIcon className="h-6 w-6 text-white" /> : <MenuIcon className="h-6 w-6 text-white" />}
            </button>
          </div>
        </nav>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-800">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
              <a href="#about" className="block px-3 py-2 rounded-md text-base font-medium hover:text-cyan-400" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#projects" className="block px-3 py-2 rounded-md text-base font-medium hover:text-cyan-400" onClick={() => setIsMenuOpen(false)}>Projects</a>
              <a href="#contact" className="block px-3 py-2 rounded-md text-base font-medium hover:text-cyan-400" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </header>
      
      <main className="container mx-auto px-6">
        {/* --- Hero Section --- */}
        <section id="hero" className="min-h-screen flex items-center">
          <div className="max-w-3xl">
            <p className="text-cyan-400 text-lg mb-2">Hi, my name is</p>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">Arvin Zoleta.</h1>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-400 mt-2 tracking-tight">I build things for the web.</h2>
            <p className="mt-6 text-lg text-slate-400">
              I'm a computer science student based in Lipa City, Philippines, specializing in creating (and occasionally designing) exceptional, high-quality websites and applications. I'm passionate about building modern, responsive, and user-friendly digital experiences.
            </p>
            <a href="#projects" className="inline-block mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-medium py-3 px-6 rounded-md transition-all duration-300 transform hover:scale-105">
              Check out my work!
            </a>
          </div>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="py-20 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-16 items-center">
            <div className="md:col-span-3">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                <span className="text-cyan-400 mr-3">01.</span> About Me
              </h2>
              <p className="mb-4">
                Hello! I'm Arvin, a developer who loves crafting elegant solutions to complex problems. My journey into web development started back in university when I decided to build a custom website for a student organization — and I've been hooked ever since.
              </p>
              <p className="mb-4">
                Fast-forward to today, and I've had the privilege of working on a diverse range of projects, from corporate landing pages to large-scale web applications. My main focus is on building accessible, inclusive products and digital experiences for a variety of clients.
              </p>
              <p className="mb-6">
                Here are a few technologies I've been working with recently:
              </p>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-slate-400">
                {skills.map(skill => (
                    <li key={skill} className="relative pl-5 before:content-['▹'] before:absolute before:left-0 before:text-cyan-400">
                      {skill}
                    </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2">
              <div className="w-full max-w-xs mx-auto mb-14 p-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg shadow-2xl transform transition-transform hover:scale-105 duration-500">
                <div className="relative aspect-square bg-slate-800 rounded-md">
                  <Image
                    src="/2x2.png" 
                    alt="A professional headshot of Arvin Zoleta"
                    fill
                    className="rounded-md object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="py-20 md:py-32">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">
             <span className="text-cyan-400">02.</span> Some Things I've Built
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.title} className="bg-slate-800 rounded-lg shadow-lg overflow-hidden group transform hover:-translate-y-2 transition-transform duration-300">
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={project.imageUrl}
                      alt={`Screenshot of ${project.title}`}
                      width={600}
                      height={400}
                      className="object-cover w-full h-48 group-hover:opacity-75 transition-opacity"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                      <p className="text-slate-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span key={tech} className="bg-slate-700 text-cyan-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="py-20 md:py-32 text-center">
            <h2 className="text-2xl font-bold text-white mb-2"><span className="text-cyan-400">03.</span> What's Next?</h2>
            <h3 className="text-5xl font-bold text-white mb-4">Get In Touch</h3>
            <p className="max-w-xl mx-auto text-slate-400 mb-8">
                I'm currently open to new opportunities and my inbox is always open. Whether you have a question, a project proposal, or just want to say hi, I'll get back to you!
            </p>
            <a href="mailto:zoletaarvin661@gmail.com" className="inline-block bg-transparent border-2 border-cyan-500 hover:bg-cyan-500/20 text-cyan-400 font-medium py-3 px-8 rounded-md transition-all duration-300">
                Say Hello
            </a>
            
            <div className="flex justify-center space-x-6 mt-16">
                 <a href="https://github.com/odiatob" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <GithubIcon className="h-8 w-8" />
                </a>
                <a href="https://linkedin.com/in/arvin-zoleta-31775b2a8" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <LinkedinIcon className="h-8 w-8" />
                </a>
                <a href="mailto:zoletaarvin661@gmail.com" className="text-slate-400 hover:text-cyan-400 transition-colors">
                    <EmailIcon className="h-8 w-8" />
                </a>
            </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="py-6 text-center text-slate-500">
        <p>Designed & Built by Arvin Zoleta</p>
        <p>&copy; 2025 Lipa City, Philippines. All Rights Reserved.</p>
      </footer>

    </div>
  );
}
