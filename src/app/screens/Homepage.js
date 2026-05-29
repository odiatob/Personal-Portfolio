'use client';

import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import emailjs from '@emailjs/browser';

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
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // --- Mouse Tracker ---
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // --- Smooth Scrolling (Lenis) ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
       lenis.destroy();
    };
  }, []);

  // --- Contact Form State ---
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle'); // idle, sending, success, error
  const formRef = useRef();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // EmailJS configurations
    const serviceID = 'service_o5buunn';
    const templateID = 'template_91n3tw8'; 
    const publicKey = '6zUxxpUGs9dDk27Zj'; 

    const templateParams = {
        name: formData.name,
        email: formData.email,
        message: `Sender Email: ${formData.email}\n\nMessage:\n${formData.message}`,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setFormStatus('success');
        
        // Reset form after 2 seconds or close
        setTimeout(() => {
            setFormStatus('idle');
            setFormData({ name: '', email: '', message: '' });
            setIsContactOpen(false);
        }, 2000);
      }, (err) => {
        console.log('FAILED...', err);
        setFormStatus('error');
        // Reset status to allow retrying
        setTimeout(() => {
            setFormStatus('idle');
        }, 3000);
      });
  };

  const projects = [
    {
      title: "SafeTag (Emergency Website for DLSL Students)",
      description: "A real-time emergency alert and redirection system for De La Salle Lipa Rescue Department(ICESSO) that notifies of ongoing emergencies, offering escalating information and contact links for location-specific assistance.",
      tech: ["Next.js", "React", "Tailwind CSS", "Supabase"],
      imageUrl:"/ST.png",
      link: "https://safetag-rose.vercel.app/"
    },
    {
      title: "LifeStyle Routine",
      description: "A website that helps users create, track, and personalize daily habits and routines through an interactive onboarding process and behavior tracking system",
      tech: ["React", "Expo Dev", "Node.js", "API"],
      imageUrl: "/LR.png",
      link: "https://lifestyle-routine.vercel.app/"
    },
    {
      title: "Farmers Market",
      description: "A direct farm-to-consumer online marketplace for Filipino farmers, built with an emphasis on empowering sellers and ensuring fair profit by facilitating the sale of the freshest local produce.",
      tech: ["React", "Next.js", "Node.js", "Supabase", "Vercel"],
      imageUrl: "/LK.png",
      link: "https://farmers-ud6h.vercel.app/"
    },
    {
      title: "Bites and Bao Website",
      description: "A direct online marketplace for xiao lang bao lovers in Lipa City, Batangas.",
      tech: ["React", "Next.js", "Tailwind CSS", "Vercel", "Supabase"],
      imageUrl: "/bnb.png",
      link: "https://bitesandbao.vercel.app/"
    },
    {
      title: "Date Invitation Website",
      description: "A romantic and interactive website designed to invite a special someone on a date, featuring personalized messages, multimedia content, and a memorable user experience.",
      tech: ["Next.js", "React", "Tailwind CSS", "Vercel"],
      imageUrl: "/date.png",
      link: "https://date-invitation-chi.vercel.app/"
    }
  ];

  const leadership = [
    {
      role: "Intern",
      organization: "Knowles Training Institute",
      period: "February 2026- April 2026",
      description: "Interned at Knowles Training Institute, assisting training operations and gaining hands‑on professional experience using WordPress(Elementor)."
    },
    {
      role: "Member / Web Developer",
      organization: "Final Thesis",
      period: "2025",
      description: "Spearheaded the development of 'SafeTag', a real-time emergency alert system, improving response coordination."
    },
    {
      role: "Quality Assurance Tester",
      organization: "DevSoc - De La Salle Lipa Developers Society",
      period: "2025 - Present",
      description: "Helped on organizing events activities, fostering a collaborative learning environment for aspiring developers."
    },
    {
      role: "2nd-3rd Year Representative for Computer Science",
      organization: "Junior Philippine Computer Society", 
      period: "2023 - 2024",
      description: "Active member contributing to peer mentoring and tech workshops."
    },
    {
      role: "Member",
      organization: "Junior Philippine Computer Society", // Placeholder
      period: "2022 - Present",
    },
    {
      role: "Class Mayor",
      organization: "De La Salle Lipa", // Placeholder
      period: "2022 - 2023",
    }
  ];
  
  const skills = ["JavaScript", "HTML", "CSS", "React", "Next.js", "Tailwind CSS", "Figma", "Supabase", "Firebase", "UI/UX Design", "Git & GitHub", "Python ", "Node.js", "Machine Learning", "Vercel", "WordPress"];


  return (
    <div className="bg-[#0a192f] text-slate-400 font-sans leading-relaxed selection:bg-cyan-300 selection:text-cyan-900 relative">
      <Head>
        <title>Arvin Zoleta | Full-Stack Developer</title>
        <meta name="description" content="Personal portfolio of Arvin Zoleta, a passionate developer creating modern web experiences." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* --- Cursor Follower Spotlight --- */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-3000"
        style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`,
        }}
      ></div>

      {/* --- Header & Navigation --- */}
      <header className="sticky top-0 z-50 bg-[#0a192f]/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative z-50">
          <a href="#" className="text-2xl font-bold text-cyan-400 hover:text-cyan-300 transition-colors">
            AZ.
          </a>
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center text-sm font-medium">
            <a href="#about" className="hover:text-cyan-400 transition-colors"><span className="text-cyan-400 mr-1">01.</span>About</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors"><span className="text-cyan-400 mr-1">02.</span>Projects</a>
            <a href="#leadership" className="hover:text-cyan-400 transition-colors"><span className="text-cyan-400 mr-1">03.</span>Leadership</a>
            <a href="#contact" className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 px-4 py-2 rounded rounded-sm transition-all duration-300">
              Contact Me
            </a>
          </div>
          {/* Mobile Nav Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="focus:outline-none">
              {isMenuOpen ? <CloseIcon className="h-8 w-8 text-cyan-400" /> : <MenuIcon className="h-8 w-8 text-cyan-400" />}
            </button>
          </div>
        </nav>
        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-[#0a192f]/95 backdrop-blur-xl z-40 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} flex items-center justify-center`}>
            <div className="flex flex-col items-center space-y-8 text-center p-8">
              <a href="#about" className="text-2xl font-medium text-slate-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}><span className="block text-sm text-cyan-400 mb-1 font-mono">01.</span> About</a>
              <a href="#projects" className="text-2xl font-medium text-slate-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}><span className="block text-sm text-cyan-400 mb-1 font-mono">02.</span> Projects</a>
              <a href="#leadership" className="text-2xl font-medium text-slate-300 hover:text-cyan-400 transition-colors" onClick={() => setIsMenuOpen(false)}><span className="block text-sm text-cyan-400 mb-1 font-mono">03.</span> Leadership</a>
              <a href="#contact" className="text-xl font-medium text-cyan-400 border border-cyan-400 px-8 py-3 rounded hover:bg-cyan-400/10 transition-all" onClick={() => setIsMenuOpen(false)}>Say Hello</a>
            </div>
        </div>
      </header>
      
      <main className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* --- Hero Section --- */}
        <section id="hero" className="min-h-screen flex items-center justify-start pt-0 pb-20 md:pb-0">
          <div className="max-w-4xl space-y-6">
            <p className="text-cyan-400 text-lg font-mono">Hi, my name is</p>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-slate-100 tracking-tight">
              Arvin Zoleta.
            </h1>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-slate-400 tracking-tight">
              I build websites and applications for fun and corporate purposes.
            </h2>
            <p className="max-w-xl text-base md:text-lg text-slate-400 leading-relaxed">
              I'm a computer science student based in Lipa City, Batangas in Philippines, specializing in creating (and occasionally designing) exceptional, high-quality websites and applications. I'm passionate about building modern, responsive, and user-friendly digital experiences.
            </p>
            <div className="pt-8">
                <a href="#projects" className="inline-block border-2 border-cyan-400 text-cyan-400 font-mono text-sm px-8 py-4 rounded hover:bg-cyan-400/10 transition-all duration-300 shadow-[0_0_15px_-3px_rgba(6,182,212,0.2)] hover:shadow-[0_0_20px_-3px_rgba(6,182,212,0.4)]">
                Check out my work!
                </a>
            </div>
          </div>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="py-16 md:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-8 flex items-center">
                <span className="text-cyan-400 font-mono text-xl mr-2">01.</span> 
                <span className="whitespace-nowrap">About Me</span>
                <span className="h-px w-64 bg-slate-700 ml-4 hidden sm:block"></span>
              </h2>
              <div className="text-slate-400 space-y-4 text-base md:text-lg">
                <p>
                  Hello! I'm Arvin, a developer who loves crafting elegant solutions to complex problems. My journey into programming started back on my junior year as a computer science where we practice and execute different type of software that started from simple <span className="text-cyan-400">machine learning</span> into web and mobile app development and training models using <span className="text-cyan-400">Python</span> programming language and <span className="text-cyan-400">Jupyter Notebook</span> — and I've been hooked ever since.
                </p>
                <p>
                  Fast-forward to today, and I've had the privilege of working on a diverse range of projects, from corporate landing pages to large-scale web applications. My main focus is on building <span className="text-cyan-400">accessible, inclusive products</span> and digital experiences for a variety of clients.
                </p>
                <p>
                   Here are a few technologies I've been working with recently:
                </p>
              </div>

              <div className="mt-8">
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                         <span key={skill} className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 hover:border-cyan-400/50 transition-colors cursor-default hover:bg-cyan-400/20">
                          {skill}
                        </span>
                    ))}
                  </div>
              </div>
            </div>
            <div className="flex justify-center md:justify-end md:mt-16">
              <div className="w-full max-w-xs mx-auto mb-14 p-1 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg shadow-2xl transform transition-transform hover:scale-105 duration-500">
                <div className="relative aspect-square bg-slate-800 rounded-md">
                  <Image
                    src="/22222X22222.jpg"
                    alt="Arvin Zoleta"
                    fill
                    className="rounded-md object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="py-16 md:py-32">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-12 flex items-center">
             <span className="text-cyan-400 font-mono text-xl mr-2">02.</span> 
             <span className="whitespace-nowrap">Some Things I've Built</span>
             <span className="h-px w-64 bg-slate-700 ml-4 hidden sm:block"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.title} className="bg-[#112240] rounded-lg overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 flex flex-col h-full">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex flex-col h-full">
                    <div className="relative overflow-hidden h-48 w-full">
                         <div className="absolute inset-0 bg-cyan-500/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-300 z-10"></div>
                        <Image
                        src={project.imageUrl}
                        alt={`Screenshot of ${project.title}`}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full grayscale group-hover:grayscale-0 transform group-hover:scale-105 transition-all duration-500"
                        />
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-center mb-4">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                           </svg>
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400 hover:text-cyan-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                           </svg>
                      </div>
                      
                      <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                      <p className="text-slate-400 mb-6 text-sm leading-relaxed flex-grow">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-auto">
                        {project.tech.map((tech) => (
                          <span key={tech} className="text-slate-500 text-xs font-mono">
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

        {/* --- Leadership Section --- */}
        <section id="leadership" className="py-16 md:py-32 max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-12 flex items-center justify-center md:justify-start">
             <span className="text-cyan-400 font-mono text-xl mr-2">03.</span> 
             <span className="whitespace-nowrap">Leadership & Organizations</span>
             <span className="h-px w-64 bg-slate-700 ml-4 hidden sm:block"></span>
          </h2>
          <div className="relative border-l border-slate-700 ml-4 md:ml-6 space-y-12">
            {leadership.map((item, index) => (
              <div key={index} className="relative pl-8 md:pl-12 group">
                {/* Timeline Dot */}
                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-slate-600 group-hover:bg-cyan-400 transition-colors ring-4 ring-[#0a192f]"></span>
                
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                   <h3 className="text-xl font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">{item.role}</h3>
                   <span className="font-mono text-xs text-slate-500 bg-[#112240] px-2 py-1 rounded inline-block w-fit mt-1 sm:mt-0">{item.period}</span>
                </div>
                <h4 className="text-lg text-cyan-400 font-medium mb-3">{item.organization}</h4>
                {item.description && (
                     <p className="text-slate-400 max-w-2xl text-base">{item.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="py-16 md:py-32 text-center max-w-2xl mx-auto">
            <p className="text-cyan-400 font-mono mb-4 text-sm md:text-base">04. What's Next?</p>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6">Get In Touch</h3>
            <p className="text-slate-400 mb-12 text-base md:text-lg leading-relaxed">
                I'm currently open to new opportunities and my inbox is always open. Whether you have a question, a project proposal, or just want to say hi, I'll get back to you!
            </p>
            <button onClick={() => setIsContactOpen(true)} className="inline-block border border-cyan-400 text-cyan-400 font-mono px-8 py-4 rounded hover:bg-cyan-400/10 transition-all duration-300">
                Say Hello
            </button>
            
            <div className="flex justify-center space-x-8 mt-20">
                 <a href="https://github.com/odiatob" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300">
                    <GithubIcon className="h-6 w-6" />
                </a>
                <a href="https://linkedin.com/in/arvin-zoleta-31775b2a8" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300">
                    <LinkedinIcon className="h-6 w-6" />
                </a>
                <a href="mailto:zoletaarvini661@gmail.com" className="text-slate-400 hover:text-cyan-400 hover:-translate-y-1 transition-all duration-300">
                    <EmailIcon className="h-6 w-6" />
                </a>
            </div>
        </section>

      </main>

      {/* --- Footer --- */}
      <footer className="py-6 text-center text-slate-500 text-sm font-mono hover:text-cyan-400 transition-colors">
        <p className="mb-1">Designed & Built by Arvin Zoleta</p>
      </footer>

      {/* --- Contact Modal --- */}
      {isContactOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setIsContactOpen(false)}>
          <div className="bg-[#112240] w-full max-w-lg rounded-lg shadow-2xl border border-cyan-400/30 p-8 transform transition-all relative" onClick={e => e.stopPropagation()}>
            <button 
                onClick={() => setIsContactOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-cyan-400 transition-colors"
            >
                <CloseIcon className="h-6 w-6" />
            </button>
            
            <h3 className="text-2xl font-bold text-slate-100 mb-2">Get In Touch</h3>
            <p className="text-slate-400 mb-6 text-sm">
                Have a project in mind or just want to say hi? Fill out the form below.
            </p>

            {formStatus === 'success' ? (
                <div className="text-center py-10">
                    <div className="inline-block p-4 rounded-full bg-cyan-400/10 mb-4 text-cyan-400">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                    <p className="text-slate-400">Thanks for reaching out. I'll get back to you soon.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-1" htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-[#0a192f] border border-cyan-400/30 rounded focus:outline-none focus:border-cyan-400 text-slate-100 px-4 py-3 placeholder-slate-600 transition-colors"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-[#0a192f] border border-cyan-400/30 rounded focus:outline-none focus:border-cyan-400 text-slate-100 px-4 py-3 placeholder-slate-600 transition-colors"
                            placeholder="your.email@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-300 text-sm font-medium mb-1" htmlFor="message">Message</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            required
                            rows="4"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full bg-[#0a192f] border border-cyan-400/30 rounded focus:outline-none focus:border-cyan-400 text-slate-100 px-4 py-3 placeholder-slate-600 transition-colors resize-none"
                            placeholder="Hello, I'd like to talk about..."
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        disabled={formStatus === 'sending'}
                        className="w-full bg-cyan-500/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-500/20 font-bold py-3 px-4 rounded transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {formStatus === 'sending' ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </>
                        ) : 'Send Message'}
                    </button>
                    <p className="text-xs text-center text-slate-500 mt-4">
                        {formStatus === 'error' ? (
                            <span className="text-red-400">Failed to send message. Please check your connection or EmailJS config.</span>
                        ) : (
                            <span>* Securely powered by EmailJS</span>
                        )}
                    </p>
                </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
