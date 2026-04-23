import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Award, BarChart3 } from "lucide-react";
import api from "../../../services/api";

const Impact = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await api.get("/analytics/public");
        if (data) setData(data);
      } catch (err) {
        console.error("Error fetching impact data:", err);
      }
    };
    fetchData();
  }, []);

  const stats = data
    ? [
        {
          label: "Total Complaints Filed",
          value: data.overview.total,
          icon: <BarChart3 className="w-9 h-9" />,
          color: "text-pink-500",
          bg: "group-hover:bg-pink-500/10",
        },
        {
          label: "Successfully Resolved",
          value: data.overview.resolved,
          icon: <Award className="w-9 h-9" />,
          color: "text-green-400",
          bg: "group-hover:bg-green-500/10",
        },
        {
          label: "Resolution Rate",
          value: `${data.overview.resolutionRate}%`,
          icon: <TrendingUp className="w-9 h-9" />,
          color: "text-blue-400",
          bg: "group-hover:bg-blue-500/10",
        },
        {
          label: "Avg Response Time",
          value: data.overview.avgResponseTime,
          icon: <Clock className="w-9 h-9" />,
          color: "text-purple-400",
          bg: "group-hover:bg-purple-500/10",
        },
      ]
    : [];

  return (
    <section id="impact" className="relative overflow-hidden" style={{ padding: '50px 0' }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-500/[0.018] to-transparent pointer-events-none" />

      <div className="px-6 w-full relative z-10" style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        {/* Heading */}
        <div className="text-center" style={{ marginBottom: '80px' }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-pink-500 text-sm font-bold uppercase tracking-[0.2em] mb-5"
          >
            By the numbers
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-7"
          >
            Our <span className="text-pink-500">Impact</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/40 max-w-xl mx-auto leading-relaxed text-center"
          >
            Real results, pulled live from our database right now.
          </motion.p>
        </div>

        {/* Stat cards */}
        {data ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-12 text-center group hover:bg-white/[0.04] min-h-[300px] flex flex-col items-center justify-center"
              >
                <div
                  className={`w-24 h-24 rounded-3xl bg-white/5 flex items-center justify-center mx-auto mb-8 ${stat.color} ${stat.bg} group-hover:scale-110 transition-all duration-500`}
                >
                  {stat.icon}
                </div>
                <p className="text-6xl font-black text-white mb-4 tracking-tighter">{stat.value}</p>
                <p className="text-white/40 text-base font-semibold uppercase tracking-wider leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="glass-card p-12 text-center animate-pulse min-h-[300px]">
                <div className="w-24 h-24 rounded-3xl bg-white/5 mx-auto mb-8" />
                <div className="h-14 bg-white/5 rounded-xl mb-4 mx-6" />
                <div className="h-4 bg-white/5 rounded mx-10" />
              </div>
            ))}
          </div>
        )}

        {/* Category breakdown */}
        {data?.categoryDistribution?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-14 flex flex-col justify-center"
            style={{ marginTop: '80px', minHeight: '320px' }}
          >
            <h3 className="text-4xl font-black text-white mb-12 tracking-tighter text-center">
              Complaints by Category
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {data.categoryDistribution.map((cat, i) => (
                <div
                  key={i}
                  className="text-center p-8 rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
                >
                  <p className="text-4xl font-black text-pink-500 mb-3">{cat.value}</p>
                  <p className="text-sm text-white/40 font-semibold">{cat.name}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Impact;
