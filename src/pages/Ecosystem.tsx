import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ventures } from '../data/ventures';

const Ecosystem: React.FC = () => {
  const sortedVentures = ventures.sort((a, b) => a.order - b.order);

  return (
    <div className="bg-white pt-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#5A514F] mb-8 leading-tight">
              Our Ecosystem
            </h1>
            <p className="text-xl md:text-2xl text-[#6C6765] max-w-4xl mx-auto leading-relaxed">
              Grofessors thrives through a diverse set of ventures, each unique in its mission yet united by the same DNA{' '}
              <span className="text-[#F15A29] font-semibold">strategy</span>,{' '}
              <span className="text-[#F15A29] font-semibold">creativity</span>, and{' '}
              <span className="text-[#F15A29] font-semibold">innovation</span>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ventures Grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedVentures.map((venture, index) => (
              <motion.div
                key={venture.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group"
              >
                <a
                  href={venture.primaryCTA.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-8 bg-white rounded-2xl hover:shadow-xl hover:border-[#F15A29] border-2 border-gray-100 transition-all duration-300 transform hover:-translate-y-2 h-full"
                >
                  <div className="flex flex-col items-center text-center h-full">
                    {/* Logo */}
                    <div className="w-20 h-20 bg-[#F7F6F5] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F15A29] transition-all duration-300">
                      <img src={venture.logo} alt={venture.name} className="w-12 h-12 object-contain" />
                    </div>

                    <h3 className="text-xl font-bold text-[#5A514F] mb-4 group-hover:text-[#F15A29] transition-colors duration-300">
                      {venture.name}
                    </h3>

                    {/* Hover CTA */}
                    <div className="mt-auto">
                      <div className="inline-flex items-center space-x-2 text-[#6C6765] group-hover:text-[#F15A29] transition-colors duration-300">
                        <span className="text-sm font-medium">Step Inside</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-20 lg:py-32 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-6">
              Collective <span className="text-[#F15A29]">Impact</span>
            </h2>
            <p className="text-[#6C6765] text-lg max-w-3xl mx-auto leading-relaxed">
              Together, our ventures create a powerful ecosystem that drives{' '}
              <span className="text-[#F15A29] font-semibold">innovation</span> across industries, builds meaningful communities, and shapes the future of business in India.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-2">6</div>
              <div className="text-[#6C6765] font-medium">Active Ventures</div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-0.5 bg-[#F15A29] mx-auto max-w-16 mt-3"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-2">15+</div>
              <div className="text-[#6C6765] font-medium">Industries Served</div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-0.5 bg-[#F15A29] mx-auto max-w-16 mt-3"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-2">1000+</div>
              <div className="text-[#6C6765] font-medium">Clients & Community</div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="h-0.5 bg-[#F15A29] mx-auto max-w-16 mt-3"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-2">35M+</div>
              <div className="text-[#6C6765] font-medium">Total Reach</div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="h-0.5 bg-[#F15A29] mx-auto max-w-16 mt-3"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-[#F15A29] to-[#F15A29]/80 relative overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Together, We're Shaping Tomorrow</h2>

            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-[#5A514F] font-bold rounded-full hover:bg-[#5A514F] hover:text-white border-2 border-transparent hover:border-white transition-all duration-300 group text-lg"
            >
              <span>Discover More</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Ecosystem;




// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { ArrowRight } from 'lucide-react';
// import { ventures } from '../data/ventures';

// const Ecosystem: React.FC = () => {
//   const sortedVentures = ventures.sort((a, b) => a.order - b.order);

//   return (
//     <div className="bg-white pt-20">
//       {/* Hero Section */}
//       <section className="py-20 lg:py-32 bg-[#F7F6F5]">
//         <div className="max-w-7xl mx-auto px-6 lg:px-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8 }}
//             className="text-center mb-16"
//           >
//             <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#5A514F] mb-8 leading-tight">
//               Our Ecosystem
//             </h1>
//             <p className="text-xl md:text-2xl text-[#6C6765] max-w-4xl mx-auto leading-relaxed">
//               Grofessors thrives through a diverse set of ventures, each unique in its mission yet united by the same DNA <span className="text-[#F15A29] font-semibold">strategy</span>, <span className="text-[#F15A29] font-semibold">creativity</span>, and <span className="text-[#F15A29] font-semibold">innovation</span>.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* Ventures Grid */}
//       <section className="py-20 lg:py-32 bg-white">
//         <div className="max-w-7xl mx-auto px-6 lg:px-12">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {sortedVentures.map((venture, index) => (
//               <motion.div
//                 key={venture.id}
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: index * 0.1, duration: 0.6 }}
//                 className="group"
//               >
//                 <Link
//                   // to={`/ventures/${venture.id}`}
//                   to={``}
//                   className="block p-8 bg-white rounded-2xl hover:shadow-xl hover:border-[#F15A29] border-2 border-gray-100 transition-all duration-300 transform hover:-translate-y-2 h-full"
//                 >
//                   <div className="flex flex-col items-center text-center h-full">
//                     {/* Logo placeholder */}
//                     <div className="w-20 h-20 bg-[#F7F6F5] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F15A29] transition-all duration-300">
//                       <span className="text-[#5A514F] group-hover:text-white font-bold text-2xl transition-colors duration-300">
//                         {venture.name.charAt(0)}
//                       </span>
//                     </div>
                    
//                     <h3 className="text-xl font-bold text-[#5A514F] mb-4 group-hover:text-[#F15A29] transition-colors duration-300">
//                       {venture.name}
//                     </h3>
                    
//                     {/* Hover CTA */}
//                     <div className="mt-auto">
//                       <div className="inline-flex items-center space-x-2 text-[#6C6765] group-hover:text-[#F15A29] transition-colors duration-300">
//                         <span className="text-sm font-medium">Step Inside</span>
//                         <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//                       </div>
//                     </div>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Impact Metrics */}
//       <section className="py-20 lg:py-32 bg-[#F7F6F5]">
//         <div className="max-w-7xl mx-auto px-6 lg:px-12">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             className="text-center mb-16"
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-6">
//               Collective <span className="text-[#F15A29]">Impact</span>
//             </h2>
//             <p className="text-[#6C6765] text-lg max-w-3xl mx-auto leading-relaxed">
//               Together, our ventures create a powerful ecosystem that drives <span className="text-[#F15A29] font-semibold">innovation</span> across industries, builds meaningful communities, and shapes the future of business in India.
//             </p>
//           </motion.div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               className="text-center"
//             >
//               <div className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-2">6</div>
//               <div className="text-[#6C6765] font-medium">Active Ventures</div>
//               <motion.div
//                 initial={{ width: 0 }}
//                 whileInView={{ width: '100%' }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.5, duration: 0.8 }}
//                 className="h-0.5 bg-[#F15A29] mx-auto max-w-16 mt-3"
//               />
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.1 }}
//               className="text-center"
//             >
//               <div className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-2">15+</div>
//               <div className="text-[#6C6765] font-medium">Industries Served</div>
//               <motion.div
//                 initial={{ width: 0 }}
//                 whileInView={{ width: '100%' }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.6, duration: 0.8 }}
//                 className="h-0.5 bg-[#F15A29] mx-auto max-w-16 mt-3"
//               />
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.2 }}
//               className="text-center"
//             >
//               <div className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-2">1000+</div>
//               <div className="text-[#6C6765] font-medium">Clients & Community</div>
//               <motion.div
//                 initial={{ width: 0 }}
//                 whileInView={{ width: '100%' }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.7, duration: 0.8 }}
//                 className="h-0.5 bg-[#F15A29] mx-auto max-w-16 mt-3"
//               />
//             </motion.div>
            
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: 0.3 }}
//               className="text-center"
//             >
//               <div className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-2">35M+</div>
//               <div className="text-[#6C6765] font-medium">Total Reach</div>
//               <motion.div
//                 initial={{ width: 0 }}
//                 whileInView={{ width: '100%' }}
//                 viewport={{ once: true }}
//                 transition={{ delay: 0.8, duration: 0.8 }}
//                 className="h-0.5 bg-[#F15A29] mx-auto max-w-16 mt-3"
//               />
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* Closing CTA */}
//       <section className="py-20 lg:py-32 bg-gradient-to-r from-[#F15A29] to-[#F15A29]/80 relative overflow-hidden">
//         {/* Background animation */}
//         <div className="absolute inset-0">
//           <motion.div
//             animate={{
//               x: ['-100%', '100%'],
//             }}
//             transition={{
//               duration: 15,
//               repeat: Infinity,
//               ease: 'linear',
//             }}
//             className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent"
//           />
//         </div>

//         <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//               Together, We're Shaping Tomorrow
//             </h2>
            
//             <Link
//               to="/contact"
//               className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-[#5A514F] font-bold rounded-full hover:bg-[#5A514F] hover:text-white border-2 border-transparent hover:border-white transition-all duration-300 group text-lg"
//             >
//               <span>Discover More</span>
//               <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
//             </Link>
//           </motion.div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Ecosystem;