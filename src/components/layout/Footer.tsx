import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin, Youtube, Instagram, Music } from 'lucide-react';
import Logo from "../assets/logos/grofessors-logo.png";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const ecosystemLinks = [
    { name: 'Magsmen', path: 'https://magsmen.com/' },
    { name: 'InTalks', path: 'https://intalks.in/' },
    { name: 'MIbbs', path: 'https://mibbs.ai/' },
    { name: 'School of Strategy', path: '' },
    { name: 'SanStrategies', path: 'https://sanstrategies.com/' },
    { name: 'Gamanam', path: 'https://youtube.com/@gamanambyrs?si=XO77nsVmDygwZreP' }
  ];

  const socialLinks = [
    { icon: Linkedin, url: 'https://www.linkedin.com/company/grofessors/', label: 'LinkedIn' },
    // { icon: Youtube, url: '#', label: 'YouTube' },
    { icon: Instagram, url: 'https://www.instagram.com/grofessors/', label: 'Instagram' },
    // { icon: Music, url: '#', label: 'Spotify' }
  ];

  return (
    <footer className="bg-black border-t border-[#675F5D]/20">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-white text-2xl lg:text-3xl font-bold mb-4">
            Strategy Insights, Delivered
          </h3>
          <p className="text-white mb-8 max-w-2xl mx-auto "> 
            {/* text-[#675F5D] */}
            Get the latest thinking on brands, innovation, and strategy straight to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 bg-transparent border border-[#675F5D] rounded-lg text-white placeholder-[#675F5D] focus:border-[#F15A29] focus:outline-none transition-colors duration-300"
            />
            <button className="px-6 py-3 bg-[#F15A29] text-black font-medium rounded-lg hover:bg-[#F15A29]/90 transition-all duration-300 flex items-center justify-center space-x-2">
              <span>Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6">
            <img
              src={Logo}
              alt="Grofessorslogo"
              className="w-48 h-12 object-contain rounded-lg"
            />
              {/* <div className="w-10 h-10 bg-[#F15A29] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">Grofessors</span> */}
            </Link>
            <p className="text-[#675F5D] mb-6 leading-relaxed text-justify ">
              Grofessors Innovations Pvt Ltd, we’re more than a company. we’re a dynamic hub of creativity and innovation. With our world-class strategies in brand consulting, we’re not just pushing boundaries, we’re redefining them. 
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  className="w-10 h-10 bg-[#675F5D]/20 rounded-lg flex items-center justify-center text-[#675F5D] hover:bg-[#F15A29] hover:text-black transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { name: 'About', path: '/about' },
                { name: 'Ecosystem', path: '/ecosystem' },
                { name: 'Insights', path: '/insights' },
                { name: 'Contact', path: '/contact' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#675F5D] hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ecosystem */}
          <div>
            <h4 className="text-white font-semibold mb-6">Our Ventures</h4>
            <ul className="space-y-3">
              {ecosystemLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#675F5D] hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-3">
              {[
                { name: 'Privacy Policy', path: '#' },
                { name: 'Terms of Service', path: '#' },
                { name: 'Press', path: '#' },
                { name: 'Careers', path: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#675F5D] hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


  <div>
    <h4 className="text-white font-semibold mb-6">Contact</h4>
    <ul className="space-y-3 text-[#675F5D]">
      <li className="hover:text-white transition-colors duration-300">
        4th Floor, Icon Spaces, 6th Lane,
        Brodipet, Guntur,
        Andhra Pradesh 522002
      </li>
      <li className="hover:text-white transition-colors duration-300">
        <a href="tel:9044910449" className="underline">+91 9044910449</a>
      </li>
      <li className="hover:text-white transition-colors duration-300">
        <a href="https://mail.google.com/mail/?view=cm&fs=1&to=connect@magsmen.com" className="underline">connect@magsmen.com</a>
      </li>
    </ul>
  </div>

          
         
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#675F5D]/20 mt-12 pt-8 text-center">
          <p className="text-[#675F5D]">
            © {currentYear} Grofessors Innovations Pvt Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;