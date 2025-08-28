import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';

const Insights: React.FC = () => {
  // Sample blog posts - in production this would come from CMS
  const samplePosts = [
    {
      id: 1,
      title: 'Redefining Strategy in the Age of Innovation',
      slug: 'redefining-strategy-age-innovation',
      teaserSummary: 'How modern businesses are reshaping strategic thinking to stay ahead in an innovation-driven world.',
      heroImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Strategy' as const,
      author: 'Sandeep N',
      date: '2024-01-15',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Why Creativity is the New Currency of Business',
      slug: 'creativity-new-currency-business',
      teaserSummary: 'Exploring how creative thinking has become the most valuable asset for sustainable business growth.',
      heroImage: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Innovation' as const,
      author: 'Sandeep N',
      date: '2024-01-12',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'Building Ecosystems, Not Just Companies',
      slug: 'building-ecosystems-not-companies',
      teaserSummary: 'The shift from traditional business models to interconnected ecosystem approaches that drive collective growth.',
      heroImage: 'https://images.pexels.com/photos/7971016/pexels-photo-7971016.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Ecosystem' as const,
      author: 'Sandeep N',
      date: '2024-01-10',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'Culture as a Catalyst for Change',
      slug: 'culture-catalyst-for-change',
      teaserSummary: 'Understanding how organizational culture becomes the driving force behind transformational business outcomes.',
      heroImage: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Culture' as const,
      author: 'Sandeep N',
      date: '2024-01-08',
      readTime: '7 min read'
    }
  ];

  const categories = ['All', 'Strategy', 'Innovation', 'Ecosystem', 'Culture'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredPosts = selectedCategory === 'All' 
    ? samplePosts 
    : samplePosts.filter(post => post.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Innovation': return 'bg-blue-500/10 text-blue-600';
      case 'Strategy': return 'bg-green-500/10 text-green-600';
      case 'Ecosystem': return 'bg-purple-500/10 text-purple-600';
      case 'Culture': return 'bg-[#F15A29]/10 text-[#F15A29]';
      default: return 'bg-[#6C6765]/10 text-[#6C6765]';
    }
  };

  const featuredPost = samplePosts[0];

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
              Ideas That Inspire
            </h1>
            <p className="text-xl md:text-2xl text-[#6C6765] max-w-4xl mx-auto leading-relaxed">
              Insights from the world of Grofessors — where <span className="text-[#F15A29] font-semibold">creativity</span>, <span className="text-[#F15A29] font-semibold">strategy</span>, and <span className="text-[#F15A29] font-semibold">innovation</span> meet to spark new possibilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article Strip */}
      <section className="py-20 bg-[#5A514F]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4">
                <span className="px-3 py-1 bg-[#F15A29]/20 text-[#F15A29] rounded-full text-sm font-medium">
                  Featured Insight
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {featuredPost.teaserSummary}
              </p>
              <button className="inline-flex items-center space-x-2 px-6 py-3 bg-[#F15A29] text-white font-bold rounded-full hover:bg-[#F15A29]/90 transition-all duration-300 group">
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src={featuredPost.heroImage}
                alt={featuredPost.title}
                className="w-full h-80 object-cover rounded-2xl filter grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#F15A29] text-white'
                    : 'bg-[#F7F6F5] text-[#6C6765] hover:bg-[#F15A29]/10 hover:text-[#F15A29]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group cursor-pointer bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.heroImage}
                    alt={post.title}
                    className="w-full aspect-[16/10] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500" />
                  
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#5A514F] group-hover:text-[#F15A29] transition-colors duration-300 leading-tight mb-3">
                    {post.title}
                  </h3>
                  
                  <p className="text-[#6C6765] leading-relaxed mb-4">
                    {post.teaserSummary}
                  </p>

                  <div className="flex items-center justify-between text-sm text-[#6C6765]">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-[#F15A29] font-medium group-hover:underline">
                      <span>Read More</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-[#F7F6F5]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#5A514F] mb-6">
              Subscribe to <span className="text-[#F15A29]">Brand Insights</span>
            </h2>
            <p className="text-[#6C6765] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Get strategy insights in your inbox — where <span className="text-[#F15A29] font-semibold">creativity</span> meets business clarity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email to get strategy insights"
                className="flex-1 px-4 py-3 bg-white border border-[#6C6765]/20 rounded-lg text-[#5A514F] placeholder-[#6C6765] focus:border-[#F15A29] focus:outline-none transition-colors duration-300"
              />
              <button className="px-6 py-3 bg-[#F15A29] text-white font-medium rounded-lg hover:bg-[#F15A29]/90 transition-all duration-300 flex items-center justify-center space-x-2">
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Venture CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-[#F7F6F5] to-transparent rounded-3xl p-8 lg:p-12 text-center border border-[#6C6765]/10"
          >
            <h3 className="text-2xl lg:text-3xl font-bold text-[#5A514F] mb-4">
              Like These <span className="text-[#F15A29]">Ideas?</span>
            </h3>
            <p className="text-[#6C6765] mb-8 max-w-2xl mx-auto">
              Explore our ventures to see how we turn strategic thinking into actionable solutions.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              {['Magsmen', 'InTalks', 'MIbbs', 'School of Strategy'].map((venture, index) => (
                <motion.div
                  key={venture}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="w-12 h-12 bg-[#F15A29]/10 rounded-xl flex items-center justify-center hover:bg-[#F15A29] hover:text-white transition-all duration-300 cursor-pointer group"
                >
                  <span className="text-[#F15A29] group-hover:text-white font-bold group-hover:scale-110 transition-all duration-300">
                    {venture.charAt(0)}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Insights;