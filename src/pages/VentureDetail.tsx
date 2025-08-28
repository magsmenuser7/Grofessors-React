import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, Linkedin, Youtube, Instagram, Music } from 'lucide-react';
import { ventures } from '../data/ventures';
import Counter from '../components/ui/Counter';

const VentureDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const venture = ventures.find(v => v.id === id);

  if (!venture) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Venture Not Found</h1>
          <p className="text-[#675F5D] mb-8">The venture you're looking for doesn't exist.</p>
          <Link
            to="/ecosystem"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-[#F15A29] text-black font-medium rounded-full hover:bg-[#F15A29]/90 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Ecosystem</span>
          </Link>
        </div>
      </div>
    );
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin': return Linkedin;
      case 'youtube': return Youtube;
      case 'instagram': return Instagram;
      case 'spotify': return Music;
      default: return ExternalLink;
    }
  };

  return (
    <div className="bg-black pt-20">
      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-8">
        <Link
          to="/ecosystem"
          className="inline-flex items-center space-x-2 text-[#675F5D] hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Ecosystem</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-[#F15A29] rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">{venture.name.charAt(0)}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {venture.name}
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl text-[#F15A29] font-semibold mb-8 leading-relaxed">
                {venture.tagline}
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={venture.primaryCTA.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-[#F15A29] text-black font-bold rounded-full hover:bg-[#F15A29]/90 transition-all duration-300 group"
                >
                  <span>{venture.primaryCTA.label}</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </a>
                
                {venture.secondaryCTA && (
                  <a
                    href={venture.secondaryCTA.url}
                    className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-[#F15A29] text-[#F15A29] font-medium rounded-full hover:bg-[#F15A29] hover:text-black transition-all duration-300 group"
                  >
                    <span>{venture.secondaryCTA.label}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={venture.heroImage}
                alt={venture.name}
                className="rounded-2xl filter grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Overview</h2>
            <p className="text-[#675F5D] text-lg leading-relaxed">
              {venture.shortDescription}
            </p>
          </motion.div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {venture.kpis.map((kpi, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {kpi.value}
                </div>
                <div className="text-[#675F5D] text-sm font-medium">
                  {kpi.label}
                </div>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="h-0.5 bg-[#F15A29] mx-auto max-w-16 mt-3"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 bg-gradient-to-b from-transparent to-[#675F5D]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              What We Do
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {venture.pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group p-8 rounded-2xl bg-black/50 border border-[#675F5D]/20 hover:border-[#F15A29]/50 hover:bg-[#675F5D]/10 transition-all duration-500"
              >
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#F15A29] transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-[#675F5D] leading-relaxed">
                  {pillar.outcome}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {venture.gallery.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                In Action
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {venture.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <img
                    src={image}
                    alt={`${venture.name} gallery ${index + 1}`}
                    className="w-full aspect-square object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Social Links & Press */}
      {(venture.socialLinks.length > 0 || venture.pressLinks.length > 0) && (
        <section className="py-20 bg-gradient-to-b from-transparent to-[#675F5D]/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Social Links */}
              {venture.socialLinks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Connect</h3>
                  <div className="flex space-x-4">
                    {venture.socialLinks.map((social, index) => {
                      const IconComponent = getSocialIcon(social.platform);
                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-12 h-12 bg-[#675F5D]/20 rounded-xl flex items-center justify-center text-[#675F5D] hover:bg-[#F15A29] hover:text-black transition-all duration-300 group"
                        >
                          <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                        </a>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Press Links */}
              {venture.pressLinks.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6">Press Coverage</h3>
                  <div className="space-y-4">
                    {venture.pressLinks.map((press, index) => (
                      <a
                        key={index}
                        href={press.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-black/50 border border-[#675F5D]/20 rounded-xl hover:border-[#F15A29]/50 hover:bg-[#675F5D]/10 transition-all duration-300 group"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-medium group-hover:text-[#F15A29] transition-colors duration-300">
                              {press.title}
                            </div>
                            <div className="text-[#675F5D] text-sm">
                              {press.outlet}
                            </div>
                          </div>
                          <ExternalLink className="w-4 h-4 text-[#675F5D] group-hover:text-[#F15A29] transition-colors duration-300" />
                        </div>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Connect?
            </h2>
            <p className="text-[#675F5D] text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
              Let's explore how {venture.name} can help transform your vision into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href={venture.primaryCTA.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-[#F15A29] text-black font-bold rounded-full hover:bg-[#F15A29]/90 transition-all duration-300 group"
              >
                <span>{venture.primaryCTA.label}</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>
              
              <Link
                to="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-[#F15A29] text-[#F15A29] font-medium rounded-full hover:bg-[#F15A29] hover:text-black transition-all duration-300 group"
              >
                <span>Get in Touch</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default VentureDetail;