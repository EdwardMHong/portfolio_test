// Edward Hong — Portfolio (VS Code / Vite + React + Tailwind + Framer Motion)
// This file contains a full, VSCode-ready project scaffold and a detailed App.jsx that
// uses content from the uploaded files: "Edward Hong Portfolio - 2025.pptx" and
// "Edward Hong Resume - 2025.pdf".  
//
// NOTE: The actual media (slide PNGs / photos) are not embedded here. Please copy any
// images you want to include from the uploaded files in /mnt/data into `src/assets/`
// (e.g. `src/assets/portfolio-slide1.png`) and the site will reference them.
//
// Files below (copy/paste into your project):

---- package.json ----
{
  "name": "edward-hong-portfolio",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "framer-motion": "^10.12.5"
  },
  "devDependencies": {
    "vite": "^5.1.0",
    "tailwindcss": "^3.4.2",
    "postcss": "^8.4.21",
    "autoprefixer": "^10.4.13",
    "@vitejs/plugin-react": "^3.1.0"
  }
}

---- vite.config.js ----
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})

---- index.html ----
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Edward Hong — Engineering Portfolio</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

---- postcss.config.cjs ----
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

---- tailwind.config.cjs ----
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'ed-indigo': '#4f46e5'
      }
    },
  },
  plugins: [],
}

---- src/main.jsx ----
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

---- src/index.css ----
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root { height: 100%; }
body { font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; }

/* droplet animation used for prototype preview */
@keyframes bob {
  0% { transform: translateY(0); }
 50% { transform: translateY(-6px); }
 100% { transform: translateY(0); }
}

.droplet {
  animation: bob 1.5s ease-in-out infinite;
}

---- README.md ----
# Edward Hong — Engineering Portfolio

This is a Vite + React + Tailwind + Framer Motion portfolio scaffold populated with content from:
- `Edward Hong Portfolio - 2025.pptx` (uploaded)
- `Edward Hong Resume - 2025.pdf` (uploaded)

Quick start:
1. Copy this project into a folder and open in VS Code.
2. Move any images you want from the uploaded files into `src/assets/` (e.g. slides or sample photos).
3. In terminal: `npm install` then `npm run dev`.

If you see errors, copy the terminal output and paste here and I will fix it.

---- .vscode/settings.json ----
{
  "editor.formatOnSave": true,
  "files.eol": "
"
}

---- src/App.jsx ----
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Content taken from your uploaded files (resume + PPTX)
const CONTACT = {
  name: 'Edward Hong',
  email: 'e4hong@uwaterloo.ca',
  phone: '+1 905 962 9873',
  linkedin: 'https://www.linkedin.com/in/edward-hong-1062a4250/'
}

const EDUCATION = [
  {
    id: 1,
    degree: "Honours Nanotechnology Engineering",
    school: "University of Waterloo",
    years: '09/2022 — Present',
    bullets: [
      "Lab work: AFM, DSC, Raman, TGA, SEM",
      "COMSOL simulations, circuit work, characterization methods"
    ]
  }
]

const EXPERIENCE = [
  {
    id: 'h2nano',
    title: 'Material Science Specialist',
    org: 'H2nano',
    years: '09/2024 – 04/2025',
    bullets: [
      'Led synthesis of hydrophilic coatings for photocatalysts',
      'Designed & printed 3D CAD models for instrumentation (contact angle goniometer)',
      'Run characterization (UV-Vis, SEM, FTIR) and processed project datasets'
    ]
  },
  {
    id: 'smartlab',
    title: 'Lab Assistant',
    org: 'SMART - Lab, University of Waterloo',
    years: '01/2024 – 04/2024',
    bullets: [
      'Co-authored published research',
      'Synthesized and characterized hydrogels & nanocomposites',
      'Designed fixtures for 3D printing and programmed shape-change gradients'
    ]
  },
  {
    id: 'avanade',
    title: 'Concept Designer (Azure Engineering)',
    org: 'Avanade',
    years: '06/2023 – 08/2023',
    bullets: [
      'Built prototype AI/ML solutions on Azure for fraud detection',
      'Earned Azure certifications and implemented data pipelines'
    ]
  },
  {
    id: 'amazon',
    title: 'Warehouse Associate',
    org: 'Amazon',
    years: '06/2022 – 09/2022',
    bullets: [
      'Operational discipline: processed 150+ items/hour',
      'Inventory and logistics at scale'
    ]
  }
]

const PROTOTYPES = [
  {
    id: 'goniometer',
    title: 'Optical Contact Angle Goniometer',
    short: 'Sessile-drop contact angle measurement — hardware + automated Python processing',
    details: `Designed and 3D‑printed goniometer fixtures, captured droplet images, and wrote Python to automatically measure contact angles from images. Built with low-cost parts and campus resources to keep the rig reproducible and extensible.`,
    img: '/assets/goniometer-sample.png' // copy a sample image from the uploaded PPTX into src/assets
  }
]

// Animation variants
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeUp = { hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } } }

function SectionHeader({ title, subtitle }){
  return (
    <div className="mb-6">
      <h2 className="text-2xl md:text-3xl font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
    </div>
  )
}

export default function App(){
  const [selected, setSelected] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 text-gray-900">
      {/* Header with animated background elements inspired by PPTX slides */}
      <header className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto p-6 flex items-center justify-between">
          <div>
            <div className="text-xl font-bold">{CONTACT.name}</div>
            <div className="text-sm text-gray-600">Nanotechnology Engineer — prototyping & materials R&amp;D</div>
          </div>
          <div className="space-x-4 text-sm text-gray-700 hidden md:flex">
            <a href="#education" className="hover:underline">Education</a>
            <a href="#experience" className="hover:underline">Experience</a>
            <a href="#prototypes" className="hover:underline">Prototypes</a>
            <a href="#contact" className="bg-ed-indigo text-white px-3 py-1 rounded-md">Contact</a>
          </div>
        </div>

        {/* Moving shapes — extracted from PPTX visual language: translucent rounded shapes that move slowly */}
        <motion.div initial={{ x: -200, y: -40, opacity: 0.08 }} animate={{ x: 0, y: -80, opacity: 0.12 }} transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }} className="pointer-events-none absolute -left-10 -top-6 w-80 h-64 bg-gradient-to-tr from-ed-indigo/30 to-indigo-200 rounded-3xl blur-3xl" />
        <motion.div initial={{ x: 200, y: 40, opacity: 0.06 }} animate={{ x: 0, y: 80, opacity: 0.1 }} transition={{ duration: 7, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }} className="pointer-events-none absolute right-6 top-12 w-64 h-48 bg-gradient-to-tr from-indigo-100 to-white rounded-2xl blur-2xl" />
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        {/* Hero */}
        <section className="grid md:grid-cols-2 gap-8 items-center py-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Hi — I’m {CONTACT.name}.
              <span className="text-ed-indigo"> I build practical materials & prototypes.</span>
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">Hands-on materials R&amp;D, CAD-driven prototyping, and automated measurement tools. Comfortable across bench work (SEM, AFM, DSC), CAD, COMSOL simulation, and Python data pipelines.</p>
            <div className="mt-6 flex gap-3">
              <a href="#prototypes" className="inline-flex items-center px-4 py-2 bg-ed-indigo text-white rounded-md">See prototype</a>
              <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-md">Email</a>
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <div>Phone: {CONTACT.phone}</div>
              <div className="mt-1">LinkedIn: <a href={CONTACT.linkedin} className="text-ed-indigo underline">Profile</a></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative">
            <div className="w-full h-64 md:h-56 rounded-2xl bg-gradient-to-tr from-indigo-50 to-indigo-100 flex items-center justify-center">
              {/* Optionally replace the placeholder with a portrait or the PPTX slide exported image: src/assets/portrait.png */}
              <div className="text-center p-4">
                <div className="text-gray-700 text-lg font-medium">Engineering Portfolio</div>
                <div className="text-sm text-gray-500 mt-2">Download full portfolio or resume below.</div>
                <div className="mt-4 flex gap-2 justify-center">
                  <a className="px-3 py-2 border rounded-md text-sm" href="/assets/Edward_Hong_Resume_2025.pdf" download>Resume (PDF)</a>
                  <a className="px-3 py-2 border rounded-md text-sm" href="/assets/Edward_Hong_Portfolio_2025.pptx" download>Portfolio (PPTX)</a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Education */}
        <section id="education" className="mt-12">
          <SectionHeader title="Education" subtitle="Academic highlights" />

          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
            {EDUCATION.map((edu) => (
              <motion.div key={edu.id} variants={fadeUp} className="relative pl-6">
                <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-ed-indigo shadow" />
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{edu.degree}</div>
                      <div className="text-sm text-gray-600">{edu.school}</div>
                    </div>
                    <div className="text-sm text-gray-500">{edu.years}</div>
                  </div>
                  <ul className="mt-3 text-sm text-gray-600 list-disc list-inside">
                    {edu.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Experience */}
        <section id="experience" className="mt-16">
          <SectionHeader title="Experience" subtitle="Roles & impact" />

          <motion.div className="grid md:grid-cols-2 gap-6" initial="rest" whileTap="rest">
            {EXPERIENCE.map((e) => (
              <motion.div key={e.id} whileHover={{ scale: 1.02 }} className="bg-white rounded-2xl p-5 border border-gray-100 cursor-pointer">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{e.title}</div>
                    <div className="text-sm text-gray-600">{e.org}</div>
                  </div>
                  <div className="text-sm text-gray-500">{e.years}</div>
                </div>
                <ul className="mt-3 list-disc list-inside text-sm text-gray-600">
                  {e.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Prototypes - includes an animated droplet to show contact angle concept (inspired by PPTX) */}
        <section id="prototypes" className="mt-16">
          <SectionHeader title="Prototype: Optical Contact Angle Goniometer" subtitle="Hardware + automatic image processing" />

          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="text-lg font-semibold">Contact Angle Goniometer</div>
              <p className="text-sm text-gray-600 mt-2">{PROTOTYPES[0].details}</p>

              <ul className="mt-3 text-sm text-gray-600 list-disc list-inside">
                <li>Design: 3D-printed mounts & fixtures for imaging</li>
                <li>Method: Sessile drop imaging + Python analysis pipeline</li>
                <li>Constraints: Low-cost parts, reproducible on campus resources</li>
              </ul>

              <div className="mt-4 flex gap-3">
                <button onClick={() => setSelected(PROTOTYPES[0])} className="px-4 py-2 bg-ed-indigo text-white rounded-md">Open demo</button>
                <a href="#contact" className="px-4 py-2 border rounded-md">Contact</a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col items-center">
              {/* Animated SVG droplet — visual nod to PPTX animated elements */}
              <svg width="180" height="160" viewBox="0 0 180 160" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(90,40)">
                  {/* substrate baseline */}
                  <rect x="-85" y="40" width="170" height="6" fill="#e6e7ef" rx="3" />
                  {/* droplet shadow */}
                  <ellipse cx="0" cy="47" rx="26" ry="6" fill="#000" opacity="0.06" />
                  {/* droplet path using motion for gentle bob (class droplet) */}
                  <motion.g className="droplet" animate={{ translateY: [0, -8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <path d="M -18 12 C -18 -18 18 -18 18 12 C 18 28 -18 28 -18 12 Z" fill="#4f46e5" opacity="0.95" />
                    {/* contact angle lines */}
                    <line x1="-5" y1="12" x2="-30" y2="40" stroke="#fff" strokeWidth="1" opacity="0.5" strokeDasharray="4 3" />
                    <line x1="5" y1="12" x2="30" y2="40" stroke="#fff" strokeWidth="1" opacity="0.5" strokeDasharray="4 3" />
                  </motion.g>
                </g>
              </svg>

              <div className="mt-4 text-sm text-gray-600 text-center">Animated droplet — demonstrates the sessile drop concept. Replace with real image from portfolio PPTX in <code>src/assets</code>.</div>
            </div>
          </div>
        </section>

        {/* Modal / preview for selected prototype */}
        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <motion.div initial={{ y: 20, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 10, scale: 0.98 }} className="bg-white rounded-2xl p-6 w-11/12 max-w-3xl">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-bold text-lg">{selected.title}</div>
                    <div className="text-sm text-gray-600">{selected.short}</div>
                  </div>
                  <button className="ml-4 text-gray-600" onClick={() => setSelected(null)}>Close</button>
                </div>

                <div className="mt-4">
                  <div className="h-56 rounded-md bg-gray-50 flex items-center justify-center">
                    {/* If you copied PPTX sample image to src/assets/goniometer-sample.png it will appear here */}
                    <img src={selected.img} alt={selected.title} className="h-full object-contain" onError={(e)=>{ e.target.style.display='none' }} />
                    <div className="text-sm text-gray-400">(Preview image not found — copy from uploaded PPTX to src/assets/goniometer-sample.png)</div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <a className="px-4 py-2 bg-ed-indigo text-white rounded-md" href={selected.img} target="_blank" rel="noreferrer">Open image</a>
                    <button className="px-4 py-2 border rounded-md" onClick={() => setSelected(null)}>Back</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact */}
        <section id="contact" className="mt-20 mb-8">
          <SectionHeader title="Contact" subtitle="Let’s build something together" />
          <div className="bg-white rounded-2xl p-6 border border-gray-100 max-w-2xl">
            <p className="text-sm text-gray-700">Email: <a className="text-ed-indigo" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
            <p className="text-sm text-gray-700 mt-2">Phone: {CONTACT.phone}</p>
            <p className="text-sm text-gray-700 mt-2">LinkedIn: <a className="text-ed-indigo" href={CONTACT.linkedin}>{CONTACT.linkedin}</a></p>
          </div>
        </section>

        <footer className="mt-12 py-8 text-center text-sm text-gray-500">Built from your Resume & PPTX — contact me to customize visuals further.</footer>
      </main>
    </div>
  )
}

---- Optional: helper to copy files from uploads into src/assets ----
// If you're working in the same environment where the uploads are present at /mnt/data,
// run these shell commands (in VS Code terminal) to copy the uploaded resume and PPTX into the public assets folder:
// mkdir -p src/assets
// cp /mnt/data/Edward\ Hong\ Portfolio\ -\ 2025.pptx src/assets/Edward_Hong_Portfolio_2025.pptx
// cp /mnt/data/Edward\ Hong\ Resume\ -\ 2025.pdf src/assets/Edward_Hong_Resume_2025.pdf

// To get sample PNGs of slides quickly (if you have imagemagick installed):
// mkdir -p src/assets/slides
// convert /mnt/data/Edward\ Hong\ Portfolio\ -\ 2025.pptx[0] src/assets/slides/slide0.png


---- End of scaffold ----

// -------------------------------------------------------------------------
// What I did:
// - Filled the website with the resume and portfolio PPTX content: education, experience, prototype description.
// - Implemented animated background shapes and a small animated droplet SVG that nods to the "contact angle" prototype and PPTX slides.
// - Added clear instructions to copy PPTX/PDF into src/assets for download links and previews.
//
// What I need from you (if you want the site to include the actual images/slides):
// - Copy the images/slide screenshots from the uploaded files into src/assets as instructed above (or tell me and I can extract them for you).
//
// If anything errors in VS Code, paste the exact terminal/browser console message here and I'll patch it.
