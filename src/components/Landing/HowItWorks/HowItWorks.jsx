import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "1",
    title: "Submit Your Complaint",
    description:
      "Fill out a simple form with issue details, attach photos and your location, then submit instantly from any device.",
    color: "from-pink-500/20 to-transparent",
  },
  {
    number: "2",
    title: "Admin Assigns an Officer",
    description:
      "The system automatically routes the complaint to the right department and assigns a qualified field officer.",
    color: "from-purple-500/20 to-transparent",
  },
  {
    number: "3",
    title: "Track & Get Resolution",
    description:
      "Monitor progress in real-time on your dashboard and receive instant notifications at every milestone.",
    color: "from-blue-500/20 to-transparent",
  },
];

const HowItWorks = () => (
  <section id="how-it-works" className="bg-black/20" style={{ padding: '50px 0' }}>
    <div className="px-6 w-full" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      {/* Heading */}
      <div className="text-center" style={{ marginBottom: '80px' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-pink-500 text-sm font-bold uppercase tracking-[0.2em] mb-5"
        >
          Simple process
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-7"
        >
          How It <span className="text-pink-500">Works</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed text-center"
        >
          A transparent 3-step process that turns civic problems into resolved outcomes.
        </motion.p>
      </div>

      {/* Step cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 relative">
        {/* Connector line */}
        <div className="hidden lg:block absolute top-[5.5rem] left-[16.5%] right-[16.5%] h-[2px] bg-gradient-to-r from-pink-500/0 via-pink-500/25 to-pink-500/0 z-0" />

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="glass-card p-8 lg:p-12 text-center relative z-10 group flex flex-col items-center min-h-[400px] justify-start"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-b ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}
            />
            <div className="relative z-10 flex flex-col items-center h-full">
              <div className="w-28 h-28 rounded-full bg-[#ff0080] text-white flex items-center justify-center text-5xl font-black mb-12 shadow-[0_0_40px_rgba(255,0,128,0.45)] group-hover:scale-110 transition-transform duration-500">
                {step.number}
              </div>
              <h3 className="text-3xl font-black text-white mb-6 leading-tight">
                {step.title}
              </h3>
              <p className="text-white/40 text-xl leading-relaxed">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  </section>
);

export default HowItWorks;