import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import { blogPosts } from '../../data/blogData.jsx';

export default function BlogPost({ setView }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  // Find the post matching the slug
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle 404 if post doesn't exist
  if (!post) {
    return (
      <div style={{ padding: '20vh 5vw', textAlign: 'center', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: 'var(--neon)' }}>404</h1>
        <h2 style={{ marginBottom: '2rem' }}>Artículo no encontrado</h2>
        <button onClick={() => navigate('/blog')} style={{ padding: '1rem 2rem', background: 'var(--neon)', color: 'black', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', border: 'none' }}>
          Volver al Blog
        </button>
      </div>
    );
  }

  // Schema.org BlogPosting structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.metaTitle,
    "description": post.description,
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Persuasivo",
      "logo": {
        "@type": "ImageObject",
        "url": "https://persuasivo.com.mx/logo.png" // Update with actual logo URL
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://persuasivo.com.mx/blog/${post.slug}`
    }
  };

  // Find 3 related posts (excluding current one)
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && (p.category === post.category || p.relatedServices.some(s => post.relatedServices.includes(s))))
    .slice(0, 3);
    
  // If not enough related by category, just pad with others
  if (relatedPosts.length < 3) {
    const additional = blogPosts.filter(p => p.id !== post.id && !relatedPosts.find(rp => rp.id === p.id));
    relatedPosts.push(...additional.slice(0, 3 - relatedPosts.length));
  }

  // Format date for display
  const formattedDate = new Date(post.publishDate).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050505' }}
    >
      <Helmet>
        <title>{post.metaTitle} | Persuasivo</title>
        <meta name="description" content={post.description} />
        <meta name="keywords" content={post.keywords?.join(', ')} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishDate} />
        <meta property="article:author" content={post.author} />
        <meta property="article:section" content={post.category} />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Progress Bar (Visual indicator of scroll depth) */}
      <motion.div 
        style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, height: '3px', 
          background: 'var(--neon)', transformOrigin: '0%', zIndex: 10000 
        }} 
        id="scroll-progress"
      />

      {/* Breadcrumbs */}
      <div style={{ padding: '12vh 5vw 2rem 5vw', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color='var(--text-primary)'} onMouseLeave={(e) => e.target.style.color='#888'}>Inicio</Link>
          <span>/</span>
          <Link to="/blog" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color='var(--text-primary)'} onMouseLeave={(e) => e.target.style.color='#888'}>Blog</Link>
          <span>/</span>
          <span style={{ color: 'var(--neon)' }}>{post.category}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section style={{ padding: '0 5vw', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '2rem' }}>
            {post.title}
          </h1>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem', borderBottom: '1px solid var(--border-medium)', paddingBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, #222, #444)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', fontWeight: 'bold' }}>
                {post.author.charAt(0)}
              </div>
              <div>
                <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600 }}>{post.author}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Estratega Digital</div>
              </div>
            </div>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#444' }}></div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{formattedDate}</div>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#444' }}></div>
            <div style={{ color: 'var(--neon)', fontSize: '0.9rem', fontWeight: 500 }}>{post.readTime} de lectura</div>
          </div>
        </div>
      </section>

      {/* Content & Sidebar Layout */}
      <section style={{ padding: '0 5vw 10vh 5vw', maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'flex', gap: '4rem', alignItems: 'flex-start' }}>
        
        {/* Main Content Area */}
        <div className="blog-content" style={{ flex: '1', minWidth: 0, maxWidth: '800px' }}>
          
          {/* Markdown/JSX Content Container */}
          <div style={{ 
            color: '#ddd', 
            fontSize: '1.1rem', 
            lineHeight: 1.8,
          }}>
            {/* Global styles for the blog content injected here */}
            <style>{`
              .blog-content h2 { color: var(--text-primary); font-size: 2rem; margin: 3rem 0 1.5rem 0; letter-spacing: -0.02em; font-weight: 800; font-family: var(--font-display); }
              .blog-content h3 { color: var(--text-primary); font-size: 1.5rem; margin: 2.5rem 0 1rem 0; font-weight: 700; font-family: var(--font-display); }
              .blog-content p { margin-bottom: 1.5rem; color: #bbb; }
              .blog-content strong { color: var(--text-primary); font-weight: 600; }
              .blog-content ul, .blog-content ol { margin: 0 0 2rem 1.5rem; color: #bbb; }
              .blog-content li { margin-bottom: 0.5rem; }
              .blog-content a { color: var(--neon); text-decoration: none; border-bottom: 1px solid rgba(224,255,49,0.3); transition: all 0.2s; }
              .blog-content a:hover { border-bottom-color: var(--neon); background: var(--neon-glow); }
              .blog-content blockquote { border-left: 4px solid #E0FF31; margin: 2rem 0; padding: 1rem 2rem; background: rgba(224,255,49,0.02); border-radius: 0 8px 8px 0; color: var(--text-primary); font-style: italic; font-size: 1.2rem; }
            `}</style>
            
            {/* Lead Intro Paragraph */}
            <p style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 500, marginBottom: '3rem' }}>
              {post.description}
            </p>

            {/* The actual content from data layer */}
            {post.content}
          </div>

          {/* Share & Final CTA Area */}
          <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid var(--border-medium)' }}>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.5rem', marginBottom: '2rem' }}>¿Encontraste valor en este artículo?</h3>
            
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
              <a href={`https://wa.me/?text=Interesante artículo: https://persuasivo.com.mx/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', background: '#25D366', color: 'var(--text-primary)', textDecoration: 'none', borderRadius: '50px', fontWeight: 600, fontSize: '0.9rem' }}>
                Compartir por WhatsApp
              </a>
              <button onClick={() => navigator.clipboard.writeText(`https://persuasivo.com.mx/blog/${post.slug}`)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.5rem', background: 'var(--border-medium)', color: 'var(--text-primary)', border: 'none', borderRadius: '50px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
                Copiar Enlace
              </button>
            </div>

            {/* Negative Friction CTA (Appetizer style) */}
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center' }}>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1.8rem', marginBottom: '1rem', fontWeight: 800 }}>De la teoría a los resultados.</h4>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem auto' }}>
                Ya sabes la teoría. Ahora puedes seguir intentándolo por tu cuenta y perder meses en prueba y error, o dejar que expertos construyan tu ecosistema digital.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                <Link to="/consulta-gratis" style={{ background: 'var(--neon)', color: '#000', textDecoration: 'none', padding: '1.2rem 3rem', borderRadius: '50px', fontWeight: 800, fontSize: '1.1rem', width: '100%', maxWidth: '350px' }}>
                  Agenda Consultoría Gratis →
                </Link>
                {/* We'll route this to /no-gracias later in Sprint 2 */}
                <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', padding: '0.5rem', transition: 'color 0.2s' }} onMouseEnter={(e) => e.target.style.color='var(--text-primary)'} onMouseLeave={(e) => e.target.style.color='#666'}>
                  No, prefiero seguir perdiendo leads
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar (Hidden on mobile via CSS) */}
        <aside className="blog-sidebar" style={{ width: '350px', position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* Sticky CTA */}
          <div style={{ background: 'linear-gradient(135deg, var(--neon-glow) 0%, rgba(224,255,49,0.02) 100%)', border: '1px solid rgba(224,255,49,0.2)', borderRadius: '16px', padding: '2rem' }}>
            <h4 style={{ color: 'var(--neon)', fontSize: '1.2rem', fontWeight: 800, marginBottom: '1rem' }}>Diagnóstico de Marca</h4>
            <p style={{ color: '#ddd', fontSize: '0.95rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
              ¿Sientes que tu sitio web actual no convierte visitantes en ventas? Descubre por qué en 15 minutos.
            </p>
            <Link to="/consulta-gratis" style={{ display: 'block', textAlign: 'center', background: 'var(--neon)', color: '#000', textDecoration: 'none', padding: '1rem', borderRadius: '8px', fontWeight: 700, fontSize: '0.9rem' }}>
              Agendar Diagnóstico Gratuito
            </Link>
          </div>

          {/* Related Articles */}
          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border-medium)' }}>
              Artículos Relacionados
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {relatedPosts.map(rp => (
                <Link key={rp.id} to={`/blog/${rp.slug}`} style={{ textDecoration: 'none', display: 'flex', gap: '1rem', alignItems: 'center', group: 'true' }}>
                  <div style={{ width: '80px', height: '60px', borderRadius: '8px', background: 'var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-medium)' }}>
                    <span style={{ color: 'var(--neon)', fontSize: '0.8rem', fontWeight: 700 }}>P/</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h5 style={{ color: '#ddd', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.3, transition: 'color 0.2s' }} className="related-title">
                      {rp.title.length > 50 ? `${rp.title.substring(0, 50)}...` : rp.title}
                    </h5>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{rp.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        {/* Responsive CSS for Sidebar */}
        <style>{`
          @media (max-width: 1024px) {
            .blog-sidebar { display: none !important; }
          }
          .related-title:hover { color: var(--neon) !important; }
        `}</style>
      </section>

      <Footer setView={setView} />
    </motion.div>
  );
}
