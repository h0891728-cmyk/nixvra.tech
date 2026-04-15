import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Activity, Clock, BookOpen, ArrowLeft } from 'lucide-react';

interface ArticleDetail {
  title: string;
  body_html: string;
  cover_image: string | null;
  readable_publish_date: string;
  reading_time_minutes: number;
  description: string;
}

export default function InsightDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Fetch specifically by ID
    const fetchArticle = async () => {
      try {
        const response = await fetch(`https://dev.to/api/articles/${id}`);
        if (response.ok) {
          const data = await response.json();
          setArticle(data);
          
          // DYNAMIC SEO TAGS UPDATE
          document.title = `${data.title} - Nixvra Technical Architecture`;
          
          let metaDesc = document.querySelector('meta[name="description"]');
          if (metaDesc) {
            metaDesc.setAttribute("content", data.description);
          } else {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            metaDesc.setAttribute('content', data.description);
            document.head.appendChild(metaDesc);
          }
          
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    
    return () => {
        // Reset title on unmount
        document.title = "Nixvra Technical Platform";
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-transparent relative z-10 px-6">
        <Activity className="w-12 h-12 text-[#00B077] animate-spin mb-4" />
        <p className="text-[14px] text-[#111111] font-black uppercase tracking-widest">Compiling SEO Layout...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-transparent relative z-10 px-6 text-center">
        <p className="text-xl font-bold text-gray-500 mb-6">Failed to retrieve architecture document.</p>
        <button onClick={() => navigate(-1)} className="px-6 py-3 bg-[#111111] text-white rounded-xl font-bold uppercase tracking-widest text-[13px] hover:bg-[#00B077] transition-colors">
            Return to Core Index
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 relative z-10 flex justify-center bg-transparent">
      <div className="bg-white border border-gray-200 w-full max-w-4xl rounded-[2rem] shadow-2xl flex flex-col overflow-hidden">
        
        {/* Navigation Head */}
        <div className="p-6 md:px-10 border-b border-gray-100 bg-white flex items-center justify-between shrink-0 sticky top-20 md:top-0 z-20">
           <div>
             <div className="text-[12px] text-[#00B077] font-black uppercase tracking-widest mb-1 flex items-center cursor-pointer hover:text-[#008E60]" onClick={() => navigate('/')}>
                <ArrowLeft className="w-4 h-4 mr-2"/> Back to Main Hub
             </div>
           </div>
           <div className="text-[11px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 flex items-center hidden sm:flex">
               <BookOpen className="w-3.5 h-3.5 mr-2" /> Native Blog Engine Route
           </div>
        </div>
        
        {/* Content Body */}
        <div className="p-8 md:p-14 flex-grow bg-white">
           {article.cover_image && (
             <img src={article.cover_image} alt="Cover" className="w-full h-64 md:h-[400px] object-cover rounded-[1.5rem] mb-10 border border-gray-100 shadow-sm" />
           )}
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] mb-8 tracking-tight leading-tight">{article.title}</h1>
           <div className="flex items-center text-gray-500 text-[13px] font-bold uppercase tracking-widest mb-10 pb-8 border-b-[2px] border-gray-100 space-x-6">
              <span className="flex items-center text-[#00B077]"><Clock className="w-4 h-4 mr-2"/> {article.reading_time_minutes} min digest</span>
              <span className="hidden sm:inline-block">Published Array: {article.readable_publish_date}</span>
           </div>
           
           <div 
             className="article-content-native text-[#111111] leading-relaxed"
             dangerouslySetInnerHTML={{ __html: article.body_html }}
           />
        </div>

        {/* Dynamic CTA */}
        <div className="p-8 md:p-10 bg-gray-50 border-t-4 border-[#00B077] text-center flex flex-col items-center">
            <h4 className="text-2xl font-black text-[#111111] mb-3 tracking-tight">Need custom architecture like this?</h4>
            <p className="text-gray-500 font-medium mb-6 max-w-lg mx-auto">Skip the generic templates and inject high-end performance natively into your enterprise system right now.</p>
            <button onClick={() => window.open(`https://wa.me/917078524164?text=I'm%20interested%20in%20your%20services`)} className="px-8 py-4 bg-[#111111] text-white rounded-2xl text-[13px] font-black uppercase tracking-widest hover:bg-[#00B077] transition-all shadow-xl hover:-translate-y-1">
              Initiate Contact Strategy
            </button>
        </div>
      </div>
    </div>
  );
}
