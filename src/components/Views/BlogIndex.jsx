import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Footer from '../Navigation/Footer';
import { blogPosts } from '../../data/blogData.jsx';

export default function BlogIndex({ setView }) {
  const [activeCategory, setActiveCategory] = useState('Todos');
  
  // Extract unique categories
  const categories = ['Todos', ...new Set(blogPosts.map(post => post.category))];

  // Filter posts based on category
  const filteredPosts = activeCategory === 'Todos' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeCategory);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Schema.org Blog structured data
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Insights de Marketing Digital | Persuasivo",
    "description": "Estrategias de desarrollo web, SEO y performance marketing para empresas en crecimiento.",
    "url": "https://persuasivo.com.mx/blog",
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.metaTitle,
      "url": `https://persuasivo.com.mx/blog/${post.slug}`,
      "datePublished": post.publishDate,
      "author": {
        "@type": "Person",
        "name": post.author
      }
    }))
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-void)' }}
    >
      <Helmet>
        <title>Blog de Marketing Digital y Desarrollo Web | Persuasivo</title>
        <meta name="description" content="Artículos, guías y estrategias sobre desarrollo web de alta conversión, Meta Ads, SEO y branding estratégico. Escrito por los expertos de Persuasivo." />
        <meta name="keywords" content="blog marketing digital, estrategias seo, desarrollo web monterrey, guia meta ads, branding corporativo" />
        <meta property="og:title" content="Blog de Marketing Digital | Persuasivo" />
        <meta property="og:description" content="Estrategias avanzadas para escalar la captación de tu negocio." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section style={{ 
        padding: '15vh 2rem 4rem 2rem', 
        maxWidth: 'var(--container-max)', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <div className="container">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ display: 'inline-block', padding: '0.4rem 1.2rem', border: '1px solid var(--border-medium)', borderRadius: '50px', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '2px', textTransform: 'uppercase' }}>
              INSIGHTS & ESTRATEGIA
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto 1.5rem auto', fontFamily: 'var(--font-display)' }}>
              El playbook para <br/>dominar tu mercado.
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1.1rem, 2vw, 1.4rem)', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
              Desmitificamos el marketing digital. Guías reales, costos transparentes y estrategias probadas que usamos para escalar a nuestros clientes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ flex: 1, padding: '0 2rem 6rem 2rem', maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* Category Filter */}
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                style={{
                  background: activeCategory === category ? 'var(--text-primary)' : 'transparent',
                  color: activeCategory === category ? 'var(--bg-void)' : 'var(--text-muted)',
                  border: `1px solid ${activeCategory === category ? 'var(--text-primary)' : 'var(--border-subtle)'}`,
                  padding: '0.6rem 1.5rem',
                  borderRadius: '50px',
                  fontSize: '0.9rem',
                  fontWeight: activeCategory === category ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Blog Grid */}
          <motion.div layout style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '2rem' 
          }}>
            <AnimatePresence>
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s, border-color 0.3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.borderColor = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                    }}
                    >
                      {/* Fake Thumbnail (since we don't have images yet) */}
                      <div style={{ 
                        height: '200px', 
                        background: 'var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <span style={{ color: 'var(--border-strong)', fontSize: '3rem', fontFamily: 'var(--font-display)', fontWeight: 800 }}>P/</span>
                      </div>
                      
                      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {post.category}
                          </span>
                          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{post.readTime}</span>
                        </div>
                        
                        <h3 style={{ color: 'var(--text-primary)', fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.3, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                          {post.title}
                        </h3>
                        
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>
                          {post.description.substring(0, 120)}...
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 700, marginTop: 'auto', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Leer Artículo <span style={{ marginLeft: '0.5rem' }}>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Fallback if no posts match */}
          {filteredPosts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
              No se encontraron artículos en esta categoría.
            </div>
          )}

        </div>
      </section>

      {/* Embedded Footer */}
      <Footer setView={setView} />
    </motion.div>
  );
}
