import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Activity } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string | null;
  readable_publish_date: string;
  reading_time_minutes: number;
  tag_list: string[];
}

export default function Insights() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching from a free news/dev API for dynamic insights.
    const fetchArticles = async () => {
      try {
        const response = await fetch('https://dev.to/api/articles?tag=webdev&state=fresh&per_page=8');
        if (response.ok) {
          const data = await response.json();
          setArticles(data);
        }
      } catch (error) {
        console.error('Failed to load insights', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-white border-y border-gray-200 flex flex-col justify-center snap-start relative">
         <div className="max-w-7xl mx-auto w-full text-center">
            <Activity className="w-10 h-10 text-[#00B077] animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[12px]">Pulling Live SEO Insights...</p>
         </div>
      </section>
    );
  }

  if (articles.length === 0) return null;

  return (
    <section id="insights" className="py-20 px-6 bg-gray-50 border-y border-gray-200 flex flex-col justify-center snap-start relative overflow-hidden">
        <div className="max-w-7xl mx-auto w-full relative z-10">
            <div className="mb-14 border-l-[6px] border-[#00B077] pl-6 flex justify-between items-end flex-wrap gap-6">
               <div>
                  <h2 className="text-4xl md:text-6xl font-black mb-3 tracking-tight text-[#111111]">Technical Insights</h2>
                  <p className="text-gray-500 text-[15px] md:text-lg font-bold">Live synchronized intelligence on UI/UX, Architecture, and Digital Scaling.</p>
               </div>
            </div>
            
            {/* Carousel Container */}
            <div className="flex w-max space-x-8 animate-marquee hover:[animation-play-state:paused] pb-10">
               {[...articles, ...articles].map((article, idx) => (
                  <div key={`${article.id}-${idx}`} onClick={() => navigate(`/insight/${article.id}`)} className="w-[85vw] sm:w-[320px] md:w-[380px] flex flex-col group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#00B077]/50 transition-all duration-300 hover:-translate-y-3 cursor-pointer shrink-0">
                     <div className="h-48 bg-gray-100 overflow-hidden relative">
                        {article.cover_image ? (
                           <img src={article.cover_image} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        ) : (
                           <div className="w-full h-full bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center border-b border-gray-100">
                               <BookOpen className="w-12 h-12 text-gray-300" />
                           </div>
                        )}
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black uppercase text-[#111111] tracking-widest border border-white/20 shadow-sm">
                           {article.tag_list && article.tag_list[0] ? article.tag_list[0] : 'Insight'}
                        </div>
                     </div>
                     <div className="p-6 md:p-8 flex flex-col flex-grow">
                        <div className="flex items-center text-gray-400 text-[12px] font-bold uppercase tracking-widest mb-4 space-x-4">
                           <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5"/> {article.reading_time_minutes} min read</span>
                        </div>
                        <h4 className="text-xl md:text-2xl font-black text-[#111111] mb-3 leading-snug group-hover:text-[#00B077] transition-colors line-clamp-2">
                           {article.title}
                        </h4>
                        <p className="text-gray-500 text-[14px] leading-relaxed font-medium line-clamp-3 mb-6 flex-grow">
                           {article.description}
                        </p>
                        <div className="mt-auto border-t border-gray-100 pt-5 flex items-center justify-between text-[12px] uppercase font-black tracking-widest text-[#00B077]">
                           <span>Read Document</span>
                           <div className="w-8 h-8 rounded-full bg-[#00B077]/10 flex items-center justify-center group-hover:bg-[#00B077] group-hover:text-white transition-all duration-300 shadow-sm">
                               <ArrowRight className="w-4 h-4" />
                           </div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            
        </div>
    </section>
  );
}
