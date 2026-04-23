import React from "react";
import { motion } from "framer-motion";
import { User, Shield, Briefcase } from "lucide-react";
import "./Features.css";
import uiImg from "../../../assets/images/ui.png";

const cards = [
  {
    title: "Citizens",
    description: "Report civic issues easily, track their progress in real-time, and hold local authorities accountable with full transparency. Your voice matters in shaping a better, more responsive community for everyone.",
    icon: <User className="w-10 h-10" />,
    gradient: "from-pink-500/20 to-transparent",
    tag: "Citizen App",
    tagClass: "bg-pink-500/10 text-pink-400",
  },
  {
    title: "Admins",
    description: "Manage the entire platform, assign tasks, monitor officer performance, and generate comprehensive reports at scale. Gain deep data-driven insights into community needs and resolution efficiency.",
    icon: <Shield className="w-10 h-10" />,
    gradient: "from-purple-500/20 to-transparent",
    tag: "Admin Dashboard",
    tagClass: "bg-purple-500/10 text-purple-400",
  },
  {
    title: "Officers",
    description: "Receive assignments directly, update complaint status in the field, and communicate seamlessly with citizens and admins. Streamline your workflow and deliver faster, more effective resolutions.",
    icon: <Briefcase className="w-10 h-10" />,
    gradient: "from-blue-500/20 to-transparent",
    tag: "Officer Portal",
    tagClass: "bg-blue-500/10 text-blue-400",
  },
];

const Features = () => (
  <section id="features" className="relative" style={{ padding: '50px 0' }}>
    {/* Background accent */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/[0.015] to-transparent pointer-events-none" />

    <div className="px-6 w-full" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      {/* Heading */}
      <div className="text-center" style={{ marginBottom: '80px' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-pink-500 text-sm font-bold uppercase tracking-[0.2em] mb-5"
        >
          Who it's for
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-7"
        >
          One Platform,{" "}
          <span className="text-pink-500">Everyone</span> Connected
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed text-center"
        >
          Empowering every stakeholder with specialised tools to drive community progress — faster.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12 }}
            className="glass-card p-8 group relative overflow-hidden flex flex-col min-h-[360px]"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
            />
            <div className="relative z-10 flex flex-col items-center text-center h-full">
              <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${card.tagClass}`}>
                {card.tag}
              </span>
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-pink-500/20 transition-all duration-500 text-white/50 group-hover:text-white">
                {card.icon}
              </div>
              <h3 className="text-3xl font-black text-white mb-3">{card.title}</h3>
              <p className="text-white/40 text-base leading-relaxed flex-grow">{card.description}</p>
              <div className="h-[2px] w-0 bg-pink-500 group-hover:w-3/4 transition-all duration-500 rounded-full mt-6 mx-auto" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Photo Area */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-20 w-full rounded-[2rem] border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute inset-0 bg-pink-500/[0.03] group-hover:bg-pink-500/[0.06] transition-colors duration-500" />
        <img src={uiImg} alt="ResolveHub App Preview" className="w-full h-auto relative z-10" />
      </motion.div>
    </div>
  </section>
);

export default Features;