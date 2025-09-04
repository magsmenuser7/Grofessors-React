import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Eye, Lightbulb, Zap, TrendingUp, Users, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Lightbulb,
      title: 'Creativity',
      description: 'Ideas that inspire.',
      hoverText: 'See how we spark ideas'
    },
    {
      icon: Target,
      title: 'Strategy',
      description: 'Frameworks that deliver.',
      hoverText: 'Our frameworks in action'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Solutions that scale.',
      hoverText: 'Pushing boundaries daily'
    },
    {
      icon: TrendingUp,
      title: 'Impact',
      description: 'Outcomes that matter.',
      hoverText: 'Outcomes that speak'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#5A514F] mb-8 leading-tight">
                Who We Are
              </h1>
              <p className="text-xl md:text-2xl text-[#6C6765] mb-12 leading-relaxed text-justify ">
                At <span className="text-[#F15A29] font-semibold">Grofessors Innovations Pvt Ltd</span>, we are more than an organization. We are a hub of <span className="text-[#F15A29] font-semibold">strategy</span>, <span className="text-[#F15A29] font-semibold">creativity</span>, and <span className="text-[#F15A29] font-semibold">innovation</span> redefining what's possible and building the future of ideas.
              </p>
              <Link
                to="/ecosystem"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-[#F15A29] text-white font-bold rounded-full hover:bg-[#F15A29]/90 transition-all duration-300 group text-lg"
              >
                <span>Explore Our Ecosystem</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative w-full h-96 lg:h-[500px]">
                {/* Abstract shapes */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#F15A29]/20 to-[#5A514F]/20 rounded-full"
                />
                
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-[#5A514F]/30 to-[#F15A29]/30 rounded-lg transform rotate-12"
                />
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-[#F15A29]/10 to-[#5A514F]/10 rounded-full"
                />
                
                {/* Central icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#F15A29] rounded-2xl flex items-center justify-center">
                  <Lightbulb className="w-10 h-10 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-8">
                More Than a <span className="text-[#F15A29]">Company</span>
              </h2>
              <p className="text-[#6C6765] text-lg leading-relaxed text-justify">
                Grofessors was founded with one belief that <span className="text-[#F15A29] font-semibold">creativity</span> and <span className="text-[#F15A29] font-semibold">strategy</span> are not opposites, but partners in shaping the future. What began as a vision has become a launchpad of ventures, each challenging conventions and delivering impact.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-full h-80 bg-gradient-to-br from-[#F15A29]/10 to-[#5A514F]/10 rounded-3xl flex items-center justify-center">
                <div className="grid grid-cols-2 gap-6">
                  <div className="w-16 h-16 bg-[#F15A29] rounded-2xl flex items-center justify-center">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-16 h-16 bg-[#5A514F] rounded-2xl flex items-center justify-center">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-16 h-16 bg-[#5A514F] rounded-2xl flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <div className="w-16 h-16 bg-[#F15A29] rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-32 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#F15A29]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F15A29] transition-all duration-300">
                <Target className="w-8 h-8 text-[#F15A29] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-[#5A514F] mb-4">Mission</h3>
              <p className="text-[#6C6765] leading-relaxed">
                To create ventures that push boundaries, inspire <span className="text-[#F15A29] font-semibold">innovation</span>, and deliver measurable impact.
              </p>
              <div className="mt-4 text-sm text-[#F15A29] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Purpose in action
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group p-8 bg-white rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#F15A29]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#F15A29] transition-all duration-300">
                <Eye className="w-8 h-8 text-[#F15A29] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-[#5A514F] mb-4">Vision</h3>
              <p className="text-[#6C6765] leading-relaxed">
                To become the most dynamic hub of <span className="text-[#F15A29] font-semibold">creativity</span> and <span className="text-[#F15A29] font-semibold">strategy</span> in India.
              </p>
              <div className="mt-4 text-sm text-[#F15A29] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                A future we are building
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Values */}
      {/* <section className="py-20 lg:py-32 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-6">
              What We <span className="text-[#F15A29]">Stand For</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#F15A29] transition-all duration-300 shadow-sm">
                  <value.icon className="w-10 h-10 text-[#5A514F] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#5A514F] mb-3 group-hover:text-[#F15A29] transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-[#6C6765] leading-relaxed mb-2">
                  {value.description}
                </p>
                <div className="text-sm text-[#F15A29] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {value.hoverText}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}



{/* Founder Section */}
<section className="py-20 lg:py-28 bg-black">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    
    {/* Title */}
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
      Meet the  <span className="text-[#F15A29]">Founder</span>
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      {/* Founder Left Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex justify-center"
      >
        <div className="relative w-80 h-80 rounded-xl border-2 border-white-600 hover:border-[#F15A29] bg-[#1a202c] flex items-center justify-center shadow-xl">
          <span className="text-7xl font-extrabold text-white">SN</span>
        </div>
      </motion.div>

      {/* Founder Right Content */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h3 className="text-2xl font-semibold text-white mb-6">
          Sandeep N
        </h3>

        <p className="text-gray-300 mb-6">
          Founder of Magsmen and visionary behind India’s most strategic brand transformations.
        </p>

        {/* Achievements */}
        <ul className="space-y-4 text-gray-300 mb-6">
                <li className="flex items-center space-x-3">
                  <span className="text-white-500">★</span>
                  <span>Founder of <strong>Magsmen</strong> Strategy led brand consulting for Indian businesses.</span>
                </li>
          <li className="flex items-center space-x-3">
            <span className="text-white-500">★</span>
            <span>Creator of <strong>InTalks Podcast</strong> & <strong>SanStrategies</strong></span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-white-500">★</span>
            <span>Built India’s first <strong>Brand Budgeting System – MlBbs</strong></span>
          </li>
          {/* <li className="flex items-center space-x-3">
            <span className="text-white-500">★</span>
            <span>Consultant to IPL sponsors & Fortune 25 brands</span>
          </li> */}
          <li className="flex items-center space-x-3">
            <span className="text-white-500">★</span>
            <span>Recognized as <strong>Consultant of the Year 2023</strong></span>
          </li>
          <li className="flex items-center space-x-3">
            <span className="text-white-500">★</span>
            <span>8+ years of research in brand strategy</span>
          </li>
        </ul>

        {/* Quote */}
        <blockquote className="border-l-4 border-white-500 pl-4 italic text-gray-400 mb-6">
          "Branding is about trust, identity, and connection. It's about building something that lives beyond you."
        </blockquote>

        {/* CTA */}
        <a
          href="https://www.linkedin.com/in/itsnsandeep/?trk=public-profile-badge-profile-badge-view-profile-cta&originalSubdomain=in"
          className="inline-block bg-white hover:bg-[#F15A29] hover:text-white text-black px-6 py-3 rounded-xl font-semibold transition-colors"
        >
          Connect with Sandeep
        </a>
      </motion.div>
    </div>
  </div>
</section>



      {/* Philosophy */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-8">
              Our <span className="text-[#F15A29]">Philosophy</span>
            </h2>
            <p className="text-[#6C6765] text-lg max-w-4xl mx-auto leading-relaxed">
              <span className="text-[#F15A29] font-semibold">Innovation</span> is not about doing different things it's about seeing differently, thinking boldly, and building fearlessly. At Grofessors, every idea is a seed, every venture is a movement.
            </p>
          </motion.div>
        </div>
      </section>




    </div>
  );
};

export default About;