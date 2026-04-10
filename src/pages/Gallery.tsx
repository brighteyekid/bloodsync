import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Maximize2 } from 'lucide-react';

interface GalleryItem {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: 'Process',
    title: 'Precision Donation',
    description: 'A donor giving blood at one of our state-of-the-art facilities.',
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    category: 'Screening',
    title: 'Safety First',
    description: 'Our medical staff conducting pre-donation health checks.',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    category: 'Community',
    title: 'Youth Drive',
    description: 'Students participating in our campus blood drive initiative.',
    image: 'https://images.unsplash.com/photo-1559024094-4a1e4495c3c1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    category: 'Laboratory',
    title: 'Advanced Processing',
    description: 'Our advanced lab where donated blood is processed and tested.',
    image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    category: 'Corporate',
    title: 'Business for Good',
    description: 'Employees from local businesses participating in our mobile donation drive.',
    image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    category: 'ImpactStories',
    title: 'United by Blood',
    description: 'A heartwarming moment between a blood donor and a recipient.',
    image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 7,
    category: 'Logistics',
    title: 'Safe Transit',
    description: 'Specialized vehicles ensuring safe and timely delivery of blood.',
    image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 8,
    category: 'Emergency',
    title: 'Life Response',
    description: 'Our dedicated team providing blood supplies during disasters.',
    image: 'https://images.unsplash.com/photo-1599045118108-bf9954418b76?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 9,
    category: 'Campaign',
    title: 'Awareness Glow',
    description: 'Volunteers distributing informational materials.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'
  }
];

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['All', ...Array.from(new Set(galleryItems.map(item => item.category)))];

  const filteredItems = galleryItems.filter(item => 
    (filter === 'All' || item.category === filter) &&
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="gallery-page bg-[#fcfafa] min-h-screen py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-red-50/50 -z-10 rounded-bl-[20rem]" />
      
      <div className="container mx-auto px-8 max-w-7xl relative z-10">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-black text-gray-900 tracking-tight mb-6"
          >
            Visual <span className="text-red-600">Sync</span>
          </motion.h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            Witness the impact of our community through a collection of moments that define our mission to save lives.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                className={`px-8 py-3 rounded-2xl text-sm font-black tracking-widest uppercase transition-all duration-500 ${
                  filter === category 
                    ? 'bg-red-600 text-white shadow-[0_10px_20px_rgba(220,38,38,0.2)]' 
                    : 'bg-white text-gray-400 hover:text-gray-900 border border-gray-100 shadow-sm'
                }`}
                onClick={() => setFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80 group">
            <input
              type="text"
              placeholder="Refine search..."
              className="w-full pl-12 pr-6 py-4 bg-white/50 backdrop-blur-md rounded-2xl border border-gray-100 focus:border-red-500 focus:ring-4 focus:ring-red-500/5 outline-none transition-all font-medium text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-red-500 transition-colors" />
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group relative bg-white rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.03)] border border-white hover:shadow-red-500/10 transition-all duration-700 hover:-translate-y-4"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <button 
                      onClick={() => setSelectedImage(item)}
                      className="w-16 h-16 bg-white/10 backdrop-blur rounded-full flex items-center justify-center text-white transition-all mb-6 self-start hover:bg-white/20"
                    >
                      <Maximize2 size={24} />
                    </button>
                    <span className="text-red-500 text-xs font-black tracking-widest uppercase mb-2">{item.category}</span>
                    <h3 className="text-2xl font-black text-white">{item.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-40">
             <div className="text-6xl text-gray-100 mb-6 font-black uppercase tracking-tighter">No Match Found</div>
             <button onClick={() => {setFilter('All'); setSearchTerm('');}} className="text-red-600 font-black hover:underline underline-offset-8">Reset filters</button>
          </div>
        )}

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-900/95 backdrop-blur-xl flex items-center justify-center z-[200] p-4 md:p-12 cursor-zoom-out"
              onClick={() => setSelectedImage(null)}
            >
              <div className="max-w-6xl w-full flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10"
                >
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-[80vh] object-contain"
                  />
                </motion.div>
                <div className="mt-12 text-center text-white max-w-2xl px-4">
                  <span className="text-red-500 text-sm font-black tracking-widest uppercase mb-4 block">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-4xl font-black mb-4">{selectedImage.title}</h3>
                  <p className="text-lg text-gray-400 font-medium">{selectedImage.description}</p>
                </div>
                <button
                  className="absolute top-12 right-12 w-16 h-16 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={32} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
