import React from "react";
import { motion } from "framer-motion";
import { Zap, Shield, Users, LineChart } from "lucide-react";
import communityImg from "../../../assets/images/Community.jpeg";

const benefits = [
  {
    label: "Faster Issue Resolution",
    value: "Average resolution time reduced by 85%",
    icon: <Zap className="w-10 h-10 text-pink-400" />,
  },
  {
    label: "Increased Transparency",
    value: "Full visibility into every step of the process",
    icon: <Shield className="w-10 h-10 text-blue-400" />,
  },
  {
    label: "Better Communication",
    value: "Seamless interaction between all parties",
    icon: <Users className="w-10 h-10 text-purple-400" />,
  },
  {
    label: "Data-Driven Decisions",
    value: "Actionable insights from comprehensive analytics",
    icon: <LineChart className="w-10 h-10 text-yellow-400" />,
  },
];

const WhyChoose = () => (
  <section id="why-choose" style={{ padding: '50px 0' }}>
    <div className="px-6 w-full" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      {/* Heading */}
      <div className="text-center" style={{ marginBottom: '80px' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-pink-500 text-sm font-bold uppercase tracking-[0.2em] mb-5"
        >
          The benefits
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-7"
        >
          Why Choose <span className="text-pink-500">ResolveHub</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed"
        >
          Purpose-built benefits for every member of your community.
        </motion.p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {benefits.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-12 flex flex-col items-center text-center gap-8 group hover:bg-white/[0.04] min-h-[360px] justify-center"
          >
            <div className="w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-pink-500/10 transition-all duration-500">
              {b.icon}
            </div>
            <div>
              <h5 className="text-2xl font-black text-white mb-4 leading-tight">{b.label}</h5>
              <p className="text-lg text-white/40 leading-relaxed">{b.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Photo area */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="mt-20 w-full h-[500px] rounded-[2.5rem] overflow-hidden group"
      >
        <img src={communityImg} alt="Community" className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" />
      </motion.div>
    </div>
  </section>
);

export default WhyChoose;
