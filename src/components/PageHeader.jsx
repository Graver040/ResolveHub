import { Search, Bell, User } from 'lucide-react';

const PageHeader = ({ title, subtitle, showSearch = true, searchPlaceholder = "Search complaints..." }) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between animate-in fade-in slide-in-from-top-4 duration-700" style={{ gap: '32px', marginBottom: '48px' }}>
      <div className="flex-1">
        <h1 className="text-6xl font-black tracking-tight leading-tight text-white drop-shadow-sm" style={{ marginBottom: '12px' }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/50 text-xl font-medium tracking-wide">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center w-full md:w-auto" style={{ gap: '24px' }}>
        {showSearch && (
          <div className="relative flex-1 md:w-[400px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="text" 
              placeholder={searchPlaceholder} 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-pink-500/50 transition-all font-medium backdrop-blur-sm"
              style={{ padding: '16px 24px 16px 56px' }}
            />
          </div>
        )}
        
        <div className="flex items-center" style={{ gap: '16px' }}>
          <div className="flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-all border border-white/20 backdrop-blur-sm shadow-inner group" style={{ width: '56px', height: '56px' }}>
            <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
