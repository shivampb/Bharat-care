"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ArrowRight, 
  Clock, 
  User, 
  ChevronRight, 
  Calendar,
  Filter,
  TrendingUp,
  Sparkles,
  BookOpen
} from "lucide-react";
import Link from "next/link";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const ALL_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Why India is Becoming the Global Hub for Cardiac Surgeries",
    excerpt: "Discover the combination of world-class infrastructure and highly skilled surgeons that make India a top choice for heart patients worldwide.",
    category: "Medical Travel",
    author: "Dr. Vikram Singh",
    date: "March 10, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800",
    featured: true
  },
  {
    id: "2",
    title: "10 Essential Health Tips for International Patients",
    excerpt: "Everything you need to know about preparing for your medical journey, from medical records to post-operative care.",
    category: "Health Tips",
    author: "Sanya Kapoor",
    date: "March 8, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1505751172157-c728583b927e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "3",
    title: "Understanding Ayurveda: A Modern Approach to Ancient Healing",
    excerpt: "How traditional Ayurvedic treatments are being integrated with modern medicine for holistic recovery and wellness.",
    category: "Ayurveda",
    author: "Dr. Ananya Roy",
    date: "March 5, 2026",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "4",
    title: "From UAE to India: Ahmed's Successful Recovery Story",
    excerpt: "Read about Ahmed's journey from a complex knee injury to walking again with the help of leading Indian orthopedics.",
    category: "Success Stories",
    author: "Patient Story",
    date: "March 2, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "5",
    title: "Top 5 Destination Cities in India for Medical Tourism",
    excerpt: "Exploring the best cities that offer a perfect blend of world-class healthcare and rich cultural experiences.",
    category: "India Guide",
    author: "Rahul Mukherjee",
    date: "Feb 28, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1524492707949-5f885740dd99?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "6",
    title: "Post-Operative Recovery: Making the Most of Your Stay",
    excerpt: "A guide to the best wellness resorts and recovery centers in India that prioritize patient comfort and healing.",
    category: "Health Tips",
    author: "Sanya Kapoor",
    date: "Feb 25, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
  }
];

const CATEGORIES = ["All", "Medical Travel", "Health Tips", "Ayurveda", "Success Stories", "India Guide"];

export default function BlogClientFallback() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return ALL_POSTS.filter(post => {
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = ALL_POSTS.find(p => p.featured);
  const regularPosts = filteredPosts.filter(p => !p.featured || (selectedCategory !== "All" || searchQuery !== ""));

  return (
    <div className="min-h-screen bg-slate-50/50">
      {/* Blog Hero section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
            alt="Medical background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-linear-to-r from-slate-900 via-slate-900/80 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-bold tracking-wider uppercase mb-4 border border-white/10 backdrop-blur-md"
              >
                <BookOpen className="w-3 h-3" />
                <span>Knowledge Hub</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl lg:text-7xl font-display font-bold tracking-tight text-white mb-6"
              >
                Expert Insights & <br />
                <span className="text-primary">Patient Stories</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-300 leading-relaxed"
              >
                Stay informed with the latest medical advancements, helpful health tips, 
                and inspiring recovery journeys from our global patient community.
              </motion.p>
            </div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="relative w-full md:w-80"
            >
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 pl-12 pr-4 py-3.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-900 shadow-sm"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories & Filter Bar */}
      <section className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm shadow-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar lg:justify-center">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-lg shadow-primary/25"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Featured Post (Only show when 'All' is selected and no search) */}
        {selectedCategory === "All" && !searchQuery && featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 lg:mb-24"
          >
            <Link 
              href={`/blog/${featuredPost.id}`}
              className="group relative flex flex-col lg:flex-row bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-100 hover:shadow-2xl transition-all duration-500 min-h-[450px]"
            >
              <div className="w-full lg:w-1/2 relative overflow-hidden h-64 lg:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent lg:hidden" />
                <div className="absolute top-6 left-6 inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-primary text-xs font-bold uppercase tracking-wider">
                  <TrendingUp className="w-3 h-3" />
                  <span>Featured Post</span>
                </div>
              </div>
              <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-secondary font-bold text-sm tracking-widest uppercase">{featuredPost.category}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="text-slate-500 text-sm">{featuredPost.date}</span>
                </div>
                <h2 className="text-3xl lg:text-4xl font-display font-bold text-slate-900 mb-6 group-hover:text-primary transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-600 text-lg mb-8 line-clamp-3 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{featuredPost.author}</p>
                      <p className="text-xs text-slate-500">{featuredPost.readTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-primary font-bold group">
                    <span>Read Article</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          <AnimatePresence mode="popLayout">
            {regularPosts.map((post, idx) => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <Link 
                  href={`/blog/${post.id}`}
                  className="group flex flex-col bg-white rounded-4xl overflow-hidden shadow-lg shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 h-full"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-7 flex flex-col grow">
                    <div className="flex items-center text-slate-400 text-xs mb-4 space-x-3">
                      <div className="flex items-center">
                        <Calendar className="w-3.5 h-3.5 mr-1.5" />
                        {post.date}
                      </div>
                      <div className="w-1 h-1 rounded-full bg-slate-300" />
                      <div className="flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1.5" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-display font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-3 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="mt-auto pt-5 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-slate-700">{post.author}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-500">Try adjusting your search or category filters.</p>
            <button 
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-6 text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
          </motion.div>
        )}

        {/* Newsletter / CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 bg-slate-900 rounded-[3rem] p-10 lg:p-20 relative overflow-hidden shadow-2xl shadow-slate-900/20"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(173,80,40,0.1),transparent)] pointer-events-none" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider uppercase mb-6">
                <Sparkles className="w-3 h-3 text-primary" />
                <span>Stay Informed</span>
              </div>
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
                Ready to transform your health perspective?
              </h2>
              <p className="text-slate-400 text-lg mb-0">
                Join our newsletter to receive the latest medical updates and patient success stories directly in your inbox.
              </p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10">
              <h4 className="text-white font-bold mb-4">Subscribe to Bharat Care Insights</h4>
              <form className="flex flex-col gap-4">
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  className="bg-white border border-slate-200 px-5 py-4 rounded-2xl focus:ring-2 focus:ring-primary/50 text-slate-900 outline-none transition-all"
                  required
                />
                <button 
                  type="submit" 
                  className="bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  Join 10,000+ Readers
                </button>
              </form>
              <p className="text-[10px] text-slate-500 mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
