import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Lightbulb, Target, Zap, TrendingUp, Users, Star, Quote } from 'lucide-react';
import { ventures } from '../data/ventures';
import Counter from '../components/ui/Counter';
import TypewriterText from '../components/ui/TypewriterText';

const Home: React.FC = () => {
  const featuredVentures = ventures.slice(0, 6);

  const pillars = [
    {
      icon: Lightbulb,
      title: 'Creativity',
      description: 'Ideas that inspire.'
    },
    {
      icon: Target,
      title: 'Strategy',
      description: 'Frameworks that deliver.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Solutions that scale.'
    },
    {
      icon: TrendingUp,
      title: 'Impact',
      description: 'Outcomes that matter.'
    }
  ];

  const featuredStories = [
    {
      title: 'Building the Future of Strategy',
      description: 'We create platforms that equip businesses and leaders with clarity, vision, and execution power.',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Innovation Beyond Boundaries',
      description: 'From consulting to culture, our work redefines what\'s possible and inspires new ways of thinking.',
      image: 'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      title: 'Ideas That Leave a Mark',
      description: 'Our ecosystem nurtures ideas that evolve into impactful ventures and meaningful movements.',
      image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const testimonials = [
    {
      quote: "Grofessors is a true launchpad for innovation. It redefines what strategy can achieve.",
      author: "Business Leader",
      role: "Fortune 500 Executive"
    },
    {
      quote: "A rare ecosystem that blends creativity with business clarity.",
      author: "Startup Founder",
      role: "Tech Entrepreneur"
    },
    {
      quote: "The strategic thinking and innovation approach is unmatched in the industry.",
      author: "Brand Manager",
      role: "Leading FMCG Company"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#F15A29] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#675F5D] rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mt-16 md:mt-40 text-5xl md:text-6xl lg:text-7xl font-bold text-[#5A514F] mb-8 leading-tight">
              <TypewriterText text="Where Strategy Meets Innovation." />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
              className="text-xl md:text-lg text-[#6C6765] mb-12 leading-relaxed text-justify "
            >
              At Grofessors Innovations Pvt Ltd, we are more than a company. We are a hub of ideas, a launchpad for creativity, and a force redefining boundaries. With strategy at the core and innovation as our culture, we shape what comes next.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link
                to="/ecosystem"
                className="group px-8 py-4 bg-[#F15A29] text-white font-bold rounded-full hover:bg-[#F15A29]/90 transition-all duration-300 flex items-center justify-center space-x-2 text-lg"
              >
                <span>Explore Our World</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <Link
                to="/contact"
                className="group px-8 py-4 bg-white border-2 border-[#F15A29] text-[#5A514F] font-bold rounded-full hover:bg-[#F15A29] hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 text-lg"
              >
                <span>Connect With Us</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px] md:mt-36">
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
                className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#F15A29]/20 to-[#675F5D]/20 rounded-full"
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
                className="absolute bottom-20 left-10 w-24 h-24 bg-gradient-to-br from-[#675F5D]/30 to-[#F15A29]/30 rounded-lg transform rotate-12"
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
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-[#F15A29]/10 to-[#675F5D]/10 rounded-full"
              />
              
              {/* Central icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#F15A29] rounded-2xl flex items-center justify-center">
                <Lightbulb className="w-10 h-10 text-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Snapshot */}
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
                A Dynamic Hub of <span className="text-[#F15A29]">Creativity</span>
              </h2>
              <p className="text-[#6C6765] text-lg leading-relaxed mb-8 text-justify">
                Grofessors Innovations Pvt Ltd, based in Guntur, Andhra Pradesh, is a company that specializes in nurturing innovation and creativity across various industries. We aim to empower individuals and organizations by providing expert guidance and innovative solutions tailored to their unique needs.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#5A514F] text-white font-medium rounded-full hover:bg-[#F15A29] transition-all duration-300 group"
              >
                <span>Know More About Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative">
                <div className="w-full h-80 bg-gradient-to-br from-[#F15A29]/10 to-[#675F5D]/10 rounded-3xl flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="w-16 h-16 bg-[#F15A29] rounded-2xl flex items-center justify-center">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-16 h-16 bg-[#675F5D] rounded-2xl flex items-center justify-center">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-16 h-16 bg-[#675F5D] rounded-2xl flex items-center justify-center">
                      <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <div className="w-16 h-16 bg-[#F15A29] rounded-2xl flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ecosystem Grid */}
      <section className="py-20 lg:py-32 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 ">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-6">
              The Grofessors <span className="text-[#F15A29]">Ecosystem</span>
            </h2>
            <p className="text-[#6C6765] text-lg max-w-3xl mx-auto leading-relaxed">
              We thrive through diverse ventures, each unique in its purpose yet united by the same DNA strategy, creativity, and innovation.
            </p>
          </motion.div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
  {featuredVentures.map((venture, index) => (
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
        className="block p-8 bg-white rounded-2xl hover:shadow-xl hover:border-[#F15A29] border-2 border-transparent transition-all duration-300 transform hover:-translate-y-2"
      >
        {/* Logo container */}
        <div className="w-30 h-16 rounded-2xl flex items-start justify-start mb-6 transition-all duration-300">
          {/* ✅ Keep logo original color (no hover filter) */}
          <img
            src={venture.logo}
            alt={`${venture.name} logo`}
            className="h-10 object-contain rounded-lg"
          />
        </div>

        {/* Venture Name */}
        <h3 className="text-xl font-bold text-[#5A514F] mb-3 group-hover:text-[#F15A29] transition-colors duration-300">
          {venture.name}
        </h3>

        {/* Venture Tagline */}
        <p className="text-[#6C6765] text-sm leading-relaxed">
          {venture.tagline}
        </p>
      </a>
    </motion.div>
  ))}
</div>




          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              to="/ecosystem"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#F15A29] text-white font-bold rounded-full hover:bg-[#F15A29]/90 transition-all duration-300 group"
            >
              <span>Discover Our Ventures</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* What We Stand For */}
      <section className="py-20 lg:py-32 bg-white">
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
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-[#F7F6F5] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#F15A29] transition-all duration-300">
                  <pillar.icon className="w-10 h-10 text-[#5A514F] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-bold text-[#5A514F] mb-3 group-hover:text-[#F15A29] transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-[#6C6765] leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-20 lg:py-32 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-6">
              Featured <span className="text-[#F15A29]">Stories</span>
            </h2>
          </motion.div>

          <div className="space-y-20">
            {featuredStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <h3 className="text-3xl font-bold text-[#5A514F] mb-6">
                    {story.title}
                  </h3>
                  <p className="text-[#6C6765] text-lg leading-relaxed mb-8">
                    {story.description}
                  </p>
                </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-80 object-cover rounded-2xl filter grayscale hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#F15A29]/20 to-transparent rounded-2xl" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#5A514F] mb-6">
              Voices About <span className="text-[#F15A29]">Grofessors</span>
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Quote className="w-12 h-12 text-[#F15A29] mx-auto mb-8" />
              <blockquote className="text-2xl md:text-3xl font-medium text-[#5A514F] mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>
              <div>
                <div className="font-bold text-[#5A514F] text-lg">
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-[#6C6765]">
                  {testimonials[currentTestimonial].role}
                </div>
              </div>
            </motion.div>

            {/* Testimonial indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-[#F15A29]' : 'bg-[#6C6765]/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Strip */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-[#5A514F] to-[#675F5D] relative overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-[#F15A29]/10 to-transparent"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Redefine Boundaries?
            </h2>
            <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
              Join us on the journey of strategy, creativity, and innovation.
            </p>
            
            <Link
              to="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#F15A29] text-white font-bold rounded-full hover:bg-white hover:text-[#5A514F] hover:border-[#F15A29] border-2 border-transparent transition-all duration-300 group text-lg"
            >
              <span>Connect With Us</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;