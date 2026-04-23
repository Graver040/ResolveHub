import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import problemImg from "../../../assets/images/Challenges.jpeg";
import solutionImg from "../../../assets/images/solution.jpeg";

const challenges = [
  "Issues go unreported and unresolved for months",
  "Zero transparency in the resolution process",
  "No real-time tracking or status updates",
  "Poor communication between citizens and authorities",
];

const solutions = [
  "Easy complaint submission with photos and location",
  "Live status tracking from submission to resolution",
  "Transparent workflow visible to every stakeholder",
  "Automated notifications and seamless communication",
];

const Challenges = () => (
  <section className="bg-black/20" style={{ padding: '50px 0' }}>
    <div className="px-6 w-full" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      {/* Heading */}
      <div className="text-center" style={{ marginBottom: '80px' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-pink-500 text-sm font-bold uppercase tracking-[0.2em] mb-5"
        >
          The problem & our answer
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-black text-white tracking-tighter"
        >
          Why Communities{" "}
          <span className="text-pink-500">Need</span> ResolveHub
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Problem card */}
        <div className="flex flex-col h-full gap-12">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 text-red-400 text-sm font-black mb-6 tracking-widest uppercase w-fit">
              The Problem
            </span>
            <h3 className="text-5xl font-black text-white tracking-tighter">
              Current Challenges
            </h3>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-card p-12 flex flex-col h-full relative overflow-hidden group"
            style={{ padding: '48px' }}
          >
            <div className="absolute top-0 right-0 p-10 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity">
              <XCircle className="w-48 h-48 text-red-500" />
            </div>
            <div className="relative z-10 flex flex-col h-full">
              <ul className="space-y-10 flex-grow" style={{ gap: '40px', display: 'flex', flexDirection: 'column' }}>
              {challenges.map((item, i) => (
                <li key={i} className="flex items-start gap-5 text-white/55 text-xl leading-relaxed">
                  <span className="w-3 h-3 rounded-full bg-red-500 shrink-0 mt-2 shadow-[0_0_12px_rgba(239,68,68,0.6)]" />
                  {item}
                </li>
              ))}
            </ul>
            {/* Photo area */}
            <div className="mt-14 w-full h-[260px] rounded-3xl overflow-hidden group-hover:shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-shadow duration-500">
              <img src={problemImg} alt="Current Challenges" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            </div>
          </div>
        </motion.div>
        </div>

        {/* Solution card */}
        <div className="flex flex-col h-full gap-8">
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <span className="inline-block px-4 py-1.5 rounded-full bg-pink-500/10 text-pink-400 text-sm font-black mb-6 tracking-widest uppercase w-fit">
              Our Solution
            </span>
            <h3 className="text-5xl font-black text-white tracking-tighter">
              How We Help
            </h3>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="glass-card p-12 flex flex-col h-full relative overflow-hidden group"
            style={{ padding: '48px' }}
          >
          <div className="absolute top-0 right-0 p-10 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity">
            <CheckCircle2 className="w-48 h-48 text-pink-500" />
          </div>
          <div className="relative z-10 flex flex-col h-full">
            <ul className="space-y-10 flex-grow" style={{ gap: '40px', display: 'flex', flexDirection: 'column' }}>
              {solutions.map((item, i) => (
                <li key={i} className="flex items-start gap-5 text-white/80 text-xl leading-relaxed">
                  <CheckCircle2 className="w-7 h-7 text-pink-500 shrink-0 mt-1" />
                  {item}
                </li>
              ))}
            </ul>
            {/* Photo area */}
            <div className="mt-14 w-full h-[260px] rounded-3xl overflow-hidden group-hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] transition-shadow duration-500">
              <img src={solutionImg} alt="Our Solution" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
            </div>
          </div>
        </motion.div>
        </div>
      </div>
    </div>
  </section>
);

export default Challenges;
