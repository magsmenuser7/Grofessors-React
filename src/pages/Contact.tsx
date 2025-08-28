import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    reason: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const reasonOptions = [
    'Partnership Opportunity',
    'Media Inquiry',
    'Investment Discussion',
    'Consulting Request',
    'Speaking Engagement',
    'General Inquiry'
  ];

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Please fill out this field.';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Please fill out this field.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "That doesn't look like a valid email.";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Please fill out this field.';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Phone must be at least 10 digits.';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please fill out this field.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitted(true);
        // Reset form after 3 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            reason: '',
            message: ''
          });
        }, 3000);
      }, 1000);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: 'connect@magsmen.com',
      href: 'mailto:connect@magsmen.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 90449 10449',
      href: 'tel:+9190449 10449'
    },
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: 'Chat With Us Instantly',
      href: 'https://wa.me/919044910449'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="bg-white pt-20 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#5A514F] mb-4">
            Thank You!
          </h2>
          <p className="text-[#6C6765] text-lg mb-6 max-w-md mx-auto">
            We'll get back to you within 24 hours.
          </p>
          <div className="w-16 h-1 bg-[#F15A29] mx-auto" />
        </motion.div>
      </div>
    );
  }

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
              Let's Connect
            </h1>
            <p className="text-xl md:text-2xl text-[#6C6765] max-w-4xl mx-auto leading-relaxed">
              Whether it's <span className="text-[#F15A29] font-semibold">collaboration</span>, <span className="text-[#F15A29] font-semibold">partnerships</span>, or new ideas — we'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-[#5A514F] mb-8">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-[#5A514F] font-medium mb-2">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-[#5A514F] placeholder-[#6C6765] focus:outline-none transition-colors duration-300 ${
                        errors.name ? 'border-red-500' : 'border-[#6C6765]/20 focus:border-[#F15A29]'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[#5A514F] font-medium mb-2">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-[#5A514F] placeholder-[#6C6765] focus:outline-none transition-colors duration-300 ${
                        errors.email ? 'border-red-500' : 'border-[#6C6765]/20 focus:border-[#F15A29]'
                      }`}
                      placeholder="Your email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-[#5A514F] font-medium mb-2">
                      Your Contact Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-white border rounded-lg text-[#5A514F] placeholder-[#6C6765] focus:outline-none transition-colors duration-300 ${
                        errors.phone ? 'border-red-500' : 'border-[#6C6765]/20 focus:border-[#F15A29]'
                      }`}
                      placeholder="Your contact number"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-[#5A514F] font-medium mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-[#6C6765]/20 rounded-lg text-[#5A514F] placeholder-[#6C6765] focus:border-[#F15A29] focus:outline-none transition-colors duration-300"
                      placeholder="Your organization"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="reason" className="block text-[#5A514F] font-medium mb-2">
                    Reason for Contact
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-[#6C6765]/20 rounded-lg text-[#5A514F] focus:border-[#F15A29] focus:outline-none transition-colors duration-300"
                  >
                    <option value="">Select a reason</option>
                    {reasonOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[#5A514F] font-medium mb-2">
                    Tell us what's on your mind...
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`w-full px-4 py-3 bg-white border rounded-lg text-[#5A514F] placeholder-[#6C6765] focus:outline-none transition-colors duration-300 resize-none ${
                      errors.message ? 'border-red-500' : 'border-[#6C6765]/20 focus:border-[#F15A29]'
                    }`}
                    placeholder="Tell us about your project, partnership opportunity, or how we can help..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-8 py-4 bg-[#F15A29] text-white font-bold rounded-lg hover:bg-[#F15A29]/90 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Start the Conversation</span>
                  <Send className="w-4 h-4" />
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-[#5A514F] mb-6">Quick Connect</h2>
                <p className="text-[#6C6765] text-lg leading-relaxed mb-8">
                  Ready to start a conversation? Choose the method that works best for you.
                </p>
              </div>

              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.href}
                    target={method.href.startsWith('http') ? '_blank' : undefined}
                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group flex items-center space-x-4 p-6 bg-[#F7F6F5] rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-[#F15A29]/10 rounded-xl flex items-center justify-center group-hover:bg-[#F15A29] transition-all duration-300">
                      <method.icon className="w-6 h-6 text-[#F15A29] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="text-[#5A514F] font-medium group-hover:text-[#F15A29] transition-colors duration-300">
                        {method.label}
                      </div>
                      <div className="text-[#6C6765] text-sm">
                        {method.value}
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Office Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-6 bg-gradient-to-br from-[#F7F6F5] to-white rounded-xl border border-[#6C6765]/10"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-[#F15A29]/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-[#F15A29]" />
                  </div>
                  <div>
                    <div className="text-[#5A514F] font-medium">Our Innovation Hub</div>
                    <div className="text-[#6C6765] text-sm">Hyderabad, India</div>
                  </div>
                </div>
                <p className="text-[#6C6765] text-sm leading-relaxed">
                  Located in the heart of India's innovation ecosystem, we're always open to in-person conversations and collaboration.
                </p>
              </motion.div>

              {/* Response Time */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-[#5A514F] rounded-xl"
              >
                <h3 className="text-lg font-bold text-white mb-2">We Reply Within 24 Hours</h3>
                <p className="text-gray-300 text-sm">
                  Our team is committed to responding quickly and thoughtfully to every inquiry.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Strip */}
      <section className="py-20 bg-[#5A514F] relative overflow-hidden">
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
              The future is built by conversations. Let's start ours today.
            </h2>
            
            <button className="inline-flex items-center space-x-2 px-8 py-4 bg-[#F15A29] text-white font-bold rounded-full hover:bg-white hover:text-[#5A514F] hover:border-[#F15A29] border-2 border-transparent transition-all duration-300 group text-lg">
              <span>Book a Call</span>
              <Phone className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;