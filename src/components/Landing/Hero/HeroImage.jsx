import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardCheck, Search } from 'lucide-react';
import heroImg from '../../../assets/images/hero.jpeg';

const HeroImage = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full"></div>
      
      {/* Main Image with 90deg rotation handle via CSS class */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-[450px] h-[450px] rounded-[40px] overflow-hidden border border-white/10 glass shadow-2xl"
      >
        <img 
          src={heroImg} 
          alt="Hands reaching" 
          className="w-full h-full object-cover rotate-90 scale-125" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-8 left-8">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-1">Community Collaboration</p>
          <h4 className="text-white font-bold text-lg">Working Together</h4>
        </div>
      </motion.div>

      {/* Floating Card 1: Submit Report */}
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="absolute bottom-20 -left-10 z-20 glass-card p-6 w-[280px] shadow-2xl animate-float"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-500">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <h5 className="font-bold text-white">Submit Report</h5>
            <p className="text-white/50 text-xs">Quick & easy submission</p>
          </div>
        </div>
      </motion.div>

      {/* Floating Card 2: Track Status */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute top-20 -right-10 z-20 glass-card p-6 w-[280px] shadow-2xl animate-float [animation-delay:2s]"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <h5 className="font-bold text-white">Track Status</h5>
            <p className="text-white/50 text-xs">Real-time updates</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroImage;
