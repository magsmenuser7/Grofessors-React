import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Venture } from '../../types';

interface VentureCardProps {
  venture: Venture;
  index: number;
}

const VentureCard: React.FC<VentureCardProps> = ({ venture, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group relative overflow-hidden rounded-2xl bg-black border border-[#675F5D]/20 hover:border-[#F15A29]/50 transition-all duration-500"
    >
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={venture.heroImage}
          alt={venture.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all duration-500" />
        
        {/* Logo overlay */}
        <div className="absolute top-6 left-6">
          <div className="w-12 h-12 bg-white/90 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <span className="text-black font-bold text-lg">{venture.name.charAt(0)}</span>
          </div>
        </div>

        {/* Hover overlay with CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-start p-6"
        >
          <Link
            to={`/ventures/${venture.id}`}
            className="flex items-center space-x-2 px-4 py-2 bg-[#F15A29] text-black font-medium rounded-full hover:bg-[#F15A29]/90 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          >
            <span>Explore</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>

      <div className="p-6">
        <h3 className="text-white text-xl font-bold mb-3 group-hover:text-[#F15A29] transition-colors duration-300">
          {venture.name}
        </h3>
        <p className="text-[#675F5D] text-sm leading-relaxed mb-4">
          {venture.tagline}
        </p>
        
        {/* KPIs preview */}
        <div className="flex flex-wrap gap-3">
          {venture.kpis.slice(0, 2).map((kpi, kpiIndex) => (
            <div key={kpiIndex} className="text-xs">
              <span className="text-white font-semibold">{kpi.value}</span>
              <span className="text-[#675F5D] ml-1">{kpi.label}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VentureCard;