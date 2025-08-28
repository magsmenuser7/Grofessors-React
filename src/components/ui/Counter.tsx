import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

interface CounterProps {
  end: number;
  duration?: number;
  label: string;
  suffix?: string;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({ 
  end, 
  duration = 2, 
  label, 
  suffix = '', 
  className = '' 
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeOutQuad * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center ${className}`}
    >
      <div className="relative">
        <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
          {count.toLocaleString()}{suffix}
        </div>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '100%' }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-0.5 bg-[#F15A29] mx-auto max-w-16"
        />
      </div>
      <div className="text-[#675F5D] mt-3 font-medium">
        {label}
      </div>
    </motion.div>
  );
};

export default Counter;