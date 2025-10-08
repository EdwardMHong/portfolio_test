/*
Portfolio Website (single-file React component)
Technologies: React, Tailwind CSS, Framer Motion

Quick setup (one-time):
1) Create a React app (Vite recommended):
   npm create vite@latest my-portfolio -- --template react
   cd my-portfolio
2) Install dependencies:
   npm install framer-motion
3) Install Tailwind (follow tailwind docs for Create React App / Vite). Example quick steps:
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   // configure tailwind.config.js and include ./src/**/*.{js,jsx,ts,tsx}
   // add tailwind directives to ./src/index.css: @tailwind base; @tailwind components; @tailwind utilities;
4) Replace the contents of src/App.jsx with the component below (or import it from src/components/Portfolio.jsx)
5) Run: npm run dev (vite) or npm start (CRA)
6) To deploy on GitHub Pages: push the repo and enable GitHub Pages (or use Vercel for zero-config deploy)

Notes: Replace the sample data arrays (education, experience, prototypes) with your real content and images.
*/

import React, {useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const education = [
  { id: 1, degree: 'B.Sc. Mechanical Engineering', school: 'University of Example', years: '2019 — 2023', details: 'Specialized in fluid mechanics and thermal systems. GPA: 3.8/4.0' },
  { id: 2, degree: 'Exchange Semester — Robotics', school: 'Tech Institute', years: '2022', details: 'Project: autonomous quad-rotor for mapping.' }
];

const experience = [
  { id: 1, title: 'Software Engineering Intern', company: 'Acme Labs', years: 'Summer 2024', bullets: ['Built internal dashboards', 'Improved build time by 18%'] },
  { id: 2, title: 'Research Assistant', company: 'University Research Group', years: '2021 — 2023', bullets: ['Simulated shear-driven flows', 'Co‑authored a conference poster'] }
];

const prototypes = [
  { id: 1, title: 'Flow Visualizer', desc: 'Interactive CFD visualizer using WebGL', thumb: '', link: '#' },
  { id: 2, title: 'Product Prototype', desc: 'IoT-enabled sensor array and firmware', thumb: '', link: '#' },
  { id: 3, title: 'Mobile Concept', desc: 'UX prototype demonstrating onboarding flow', thumb: '', link: '#' }
];

// Animation variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
};

const cardHover = {
  rest: { scale: 1, boxShadow: '0px 6px 18px rgba(16,24,40,0.06)' },
  hover: { scale: 1.02, boxShadow: '0px 12px 30px rgba(16,24,40,0.10)', transition: { duration: 0.25 } }
};

function SectionHeader({title, subtitle}){
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </div>
  );
}

export default function Portfolio(){
  const [selectedProto, setSelectedProto] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
      <header className="max-w-5xl mx-auto p-6 flex items-center justify-between">
        <div>
          <div className="text-xl font-bold">Your Name</div>
          <div className="text-sm text-gray-600">Engineer • Developer • Designer</div>
        </div>
        <nav className="space-x-4 text-sm text-gray-700 hidden md:flex">
          <a href="#education" className="hover:underline">Education</a>
          <a href="#experience" className="hover:underline">Experience</a>
          <a href="#prototypes" className="hover:underline">Prototypes</a>
          <a href="#contact" className="bg-gray-900 text-white px-3 py-1 rounded-md">Contact</a>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        {/* HERO */}
        <section className="grid md:grid-cols-2 gap-8 items-center py-12">
          <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}} transition={{duration:0.6}}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Hi — I&rsquo;m Your Name.
              <span className="text-indigo-600"> I build useful things.</span>
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">I’m an engineer and developer who loves turning ideas into working prototypes. Below are highlights from my education, experience, and prototype work.</p>
            <div className="mt-6 flex gap-3">
              <a href="#prototypes" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md">See prototypes</a>
              <a href="#contact" className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md">Contact</a>
            </div>
          </motion.div>

          <motion.div initial={{opacity:0, x:20}} animate={{opacity:1, x:0}} transition={{duration:0.6}} className="relative">
            <div className="w-full h-64 md:h-56 rounded-2xl bg-gradient-to-tr from-indigo-50 to-indigo-100 flex items-center justify-center">
              <div className="text-center p-4">
                <div className="text-gray-700 text-lg font-medium">Snapshot</div>
                <div className="text-sm text-gray-500 mt-2">Replace this with a portrait, model snapshot, or an animated canvas.</div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* EDUCATION - animated timeline */}
        <section id="education" className="mt-12">
          <SectionHeader title="Education" subtitle="Academic background and highlights" />

          <motion.div variants={container} initial="hidden" animate="show" className="space-y-4">
            {education.map((edu, i) => (
              <motion.div key={edu.id} variants={fadeUp} className="relative pl-6">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-indigo-600 shadow" />
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{edu.degree}</div>
                      <div className="text-sm text-gray-600">{edu.school}</div>
                    </div>
                    <div className="text-sm text-gray-500">{edu.years}</div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600">{edu.details}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* EXPERIENCE - animated cards with hover */}
        <section id="experience" className="mt-16">
          <SectionHeader title="Experience" subtitle="Roles, impact and highlights" />

          <motion.div className="grid md:grid-cols-2 gap-6" initial="rest" whileTap="rest">
            {experience.map(exp => (
              <motion.div key={exp.id} variants={cardHover} initial="rest" whileHover="hover" className="bg-white rounded-2xl p-5 border border-gray-100 cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{exp.title}</div>
                    <div className="text-sm text-gray-600">{exp.company}</div>
                  </div>
                  <div className="text-sm text-gray-500">{exp.years}</div>
                </div>
                <ul className="mt-3 list-disc list-inside text-sm text-gray-600">
                  {exp.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* PROTOTYPES - animated grid and modal preview */}
        <section id="prototypes" className="mt-16">
          <SectionHeader title="Prototypes" subtitle="Playable demos and quick proofs-of-concept" />

          <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {prototypes.map(proto => (
              <motion.div whileHover={{scale:1.03}} key={proto.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm cursor-pointer" onClick={() => setSelectedProto(proto)}>
                <div className="h-36 rounded-md bg-gray-50 flex items-center justify-center">{proto.thumb ? <img src={proto.thumb} alt={proto.title} className="object-cover h-full w-full rounded-md" /> : <div className="text-sm text-gray-500">Thumbnail</div>}</div>
                <div className="mt-3">
                  <div className="font-medium">{proto.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{proto.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <AnimatePresence>
            {selectedProto && (
              <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
                <motion.div initial={{y:20, scale:0.98}} animate={{y:0, scale:1}} exit={{y:10, scale:0.98}} className="bg-white rounded-2xl p-6 w-11/12 max-w-3xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-bold text-lg">{selectedProto.title}</div>
                      <div className="text-sm text-gray-600">{selectedProto.desc}</div>
                    </div>
                    <button className="ml-4 text-gray-600" onClick={() => setSelectedProto(null)}>Close</button>
                  </div>

                  <div className="mt-4">
                    <div className="h-56 rounded-md bg-gray-50 flex items-center justify-center">Prototype preview area — replace with iframe or gif.</div>
                    <div className="mt-4 flex gap-3">
                      <a href={selectedProto.link} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Open</a>
                      <button className="px-4 py-2 border rounded-md" onClick={() => setSelectedProto(null)}>Back</button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* CONTACT & FOOTER */}
        <section id="contact" className="mt-20 mb-8">
          <SectionHeader title="Contact" subtitle="Let’s build something together" />
          <div className="bg-white rounded-2xl p-6 border border-gray-100 max-w-2xl">
            <p className="text-sm text-gray-700">Email: <a className="text-indigo-600" href="mailto:you@example.com">you@example.com</a></p>
            <p className="text-sm text-gray-700 mt-2">Or connect on <a className="text-indigo-600" href="#">LinkedIn</a> / <a className="text-indigo-600" href="#">GitHub</a>.</p>
          </div>
        </section>

        <footer className="mt-12 py-8 text-center text-sm text-gray-500">Made with ♥ — replace with your own footer.</footer>
      </main>
    </div>
  );
}
