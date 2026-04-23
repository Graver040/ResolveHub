import React from "react";
import "./Footer.css";
import logoImg from "../../../assets/images/logo.png";

const Footer = () => (
  <footer className="border-t border-white/[0.06] bg-black/50" style={{ padding: '50px 0' }}>
    <div className="px-6 w-full" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
      <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-16 mb-24">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <img src={logoImg} alt="ResolveHub Logo" className="w-11 h-11 object-contain" />
            <span className="font-black text-2xl tracking-tighter text-white">ResolveHub</span>
          </div>
          <p className="text-white/35 text-lg leading-relaxed max-w-xs">
            Empowering communities through transparent and efficient civic problem resolution.
            Together, we build better neighbourhoods.
          </p>
        </div>

        {/* Product */}
        <div>
          <h4 className="text-white font-bold mb-8 uppercase tracking-[0.15em] text-sm">Product</h4>
          <ul className="space-y-5 text-white/40 text-base">
            {["Features", "How It Works", "Mobile App"].map((l) => (
              <li key={l} className="hover:text-pink-400 cursor-pointer transition-colors">{l}</li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-white font-bold mb-8 uppercase tracking-[0.15em] text-sm">Company</h4>
          <ul className="space-y-5 text-white/40 text-base">
            {["About Us", "Privacy Policy", "Terms of Service"].map((l) => (
              <li key={l} className="hover:text-pink-400 cursor-pointer transition-colors">{l}</li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-bold mb-8 uppercase tracking-[0.15em] text-sm">Support</h4>
          <p className="text-white/40 text-base mb-3 leading-relaxed">support@resolvehub.com</p>
          <p className="text-white/40 text-base">+91 XXXXX XXXXX</p>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="pt-10 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-white/20 text-sm">© 2026 ResolveHub. All rights reserved.</p>
        <div className="flex gap-10 text-white/25 text-sm font-medium">
          {["Twitter", "LinkedIn", "Instagram"].map((s) => (
            <span key={s} className="hover:text-white cursor-pointer transition-colors">{s}</span>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;