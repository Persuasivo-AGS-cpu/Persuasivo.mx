/**
 * CENTRALIZED SERVICES DATA
 * Source of truth for service information across the site.
 * Used by: ExpertiseHub, Home MagneticCards, Schema.org Service markup, Footer
 */

export const services = [
  {
    id: 'branding',
    slug: 'branding',
    title: 'Branding',
    subtitle: 'Identidad y Narrativa de Marca',
    icon: '✦',
    navTarget: 'service_branding',
    routePath: '/servicios/branding',
    desc: 'Identidad, posicionamiento y narrativa para que tu empresa cuente quién es con claridad y se distinga de su competencia.',
    businessTrans: 'Una marca coherente justifica tus precios y hace que te elijan antes de comparar.',
    longDesc: 'Definimos quién eres, a quién le hablas y cómo suenas y te ves en cada punto de contacto: logo, sistema visual, voz, manual y aplicaciones.',
    capabilities: [
      'Diagnóstico y posicionamiento',
      'Narrativa y manifiesto de marca',
      'Logotipo y sistema visual',
      'Voz y tono',
      'Manual de identidad',
      'Aplicaciones en papelería, redes y web'
    ],
    metrics: [],
    faq: []
  },
  {
    id: 'trafico',
    slug: 'trafico',
    title: 'Google Ads y Meta Ads',
    subtitle: 'Pauta Digital Quirúrgica',
    icon: '📡',
    navTarget: 'service_traffic',
    routePath: '/servicios/trafico',
    desc: 'Campañas de adquisición en Google Ads y Meta Ads, de extremo a extremo. Analizamos tu mercado y dirigimos tu mensaje al cliente que ya te está buscando y al que todavía no.',
    businessTrans: 'Sistematizamos tus ventas. Dejas de depender de la suerte para tener un flujo predecible de clientes nuevos cada mes.',
    longDesc: 'Mientras tu competencia sube videos bailando, nosotros entrenamos el algoritmo de Meta con conversiones de alto nivel. Usamos píxeles maduros y datos demográficos cerrados para mostrar tus ofertas únicamente a quienes ya tienen la tarjeta de crédito en la mano.',
    capabilities: [
      'Campañas de búsqueda en Google Ads: palabras clave, anuncios y páginas de destino',
      'Arquitectura de campañas por etapa de awareness',
      'Embudos de calificación de leads',
      'Retargeting inteligente y lookalike audiences',
      'Optimización por conversiones, no por clicks',
      'Dashboard de métricas en tiempo real',
      'A/B testing de creativos y copy'
    ],
    metrics: [
      { value: '12X', label: 'ROI promedio documentado' },
      { value: '-40%', label: 'Reducción de CAC típica' },
      { value: '150+', label: 'Citas/mes para clínicas' }
    ],
    faq: [
      {
        question: '¿Cuánto cuesta contratar Meta Ads con Persuasivo?',
        answer: 'La inversión en gestión de pauta comienza desde $15,000 MXN mensuales más el presupuesto publicitario. El monto del presupuesto depende de tus objetivos de volumen y se define en conjunto durante el diagnóstico inicial. Google Ads se cotiza en el diagnóstico, según el mercado y las palabras clave.'
      },
      {
        question: '¿En cuánto tiempo veo resultados con Meta Ads?',
        answer: 'Los primeros leads calificados suelen llegar entre la semana 2 y 3. La optimización completa del algoritmo toma entre 30 y 60 días, momento en el cual el costo por lead se estabiliza y comienza la fase de escalamiento.'
      },
      {
        question: '¿Qué diferencia a Persuasivo de otras agencias de Meta Ads?',
        answer: 'No optimizamos por likes ni alcance. Entrenamos el algoritmo para conversiones reales: citas, demos, ventas. Además, construimos embudos de calificación que filtran prospectos antes de que lleguen a tu equipo comercial.'
      },
      {
        question: '¿También manejan Google Ads?',
        answer: 'Sí. Armamos campañas de búsqueda en Google para aparecer cuando alguien ya busca lo que vendes, y las combinamos con Meta Ads para llegar también a quien todavía no te busca. La inversión de Google Ads se define en el diagnóstico.'
      }
    ]
  },
  {
    id: 'autoridad',
    slug: 'autoridad',
    title: 'Copywriting & Redes',
    subtitle: 'Autoridad de Marca',
    icon: '🎯',
    navTarget: 'service_authority',
    routePath: '/servicios/autoridad',
    desc: 'Escribimos textos persuasivos y diseñamos una identidad visual que transmite tu verdadera experiencia profesional.',
    businessTrans: 'Generamos confianza real. Educamos a tu prospecto para que, cuando toque a tu puerta, ya esté convencido del valor de lo que ofreces.',
    longDesc: 'La mayoría de las marcas hablan de sí mismas. "Somos líderes", "Tenemos experiencia". Nosotros escribimos sobre el dolor de tu cliente y posicionamos tu solución como la única opción lógica. Eso es copywriting de conversión.',
    capabilities: [
      'Desarrollo de manifiesto y voz de marca',
      'Copywriting de ventas y neuro-persuasión',
      'Gestión integral de redes sociales',
      'Diseño de identidad visual para feeds',
      'Estrategia de thought leadership (LinkedIn)',
      'Calendarios editoriales con contenido de valor'
    ],
    metrics: [
      { value: '+300%', label: 'Engagement orgánico promedio' },
      { value: '-75%', label: 'Objeciones por precio' },
      { value: 'Top Voice', label: 'Posicionamiento LinkedIn' }
    ],
    faq: [
      {
        question: '¿Cuánto cuesta la gestión de redes sociales con Persuasivo?',
        answer: 'Los paquetes de gestión de redes comienzan desde $12,000 MXN mensuales e incluyen estrategia, diseño, copywriting y publicación. El alcance se define según el número de plataformas y frecuencia de publicación requerida.'
      },
      {
        question: '¿Persuasivo escribe el contenido o necesito proporcionarlo?',
        answer: 'Nosotros creamos todo el contenido: copy, diseño visual y estrategia editorial. Solo necesitamos una sesión inicial de onboarding para entender tu negocio, tu voz y tus objetivos. A partir de ahí, todo es producción interna.'
      },
      {
        question: '¿Qué tipo de resultados puedo esperar del copywriting?',
        answer: 'Nuestros clientes reportan un aumento promedio del 85% en solicitudes de cotización y una reducción del 75% en objeciones por precio. El copywriting estratégico educa al prospecto antes de la venta, eliminando la negociación desgastante.'
      }
    ]
  },
  {
    id: 'ecosistemas',
    slug: 'ecosistemas',
    title: 'Desarrollo Web',
    subtitle: 'Ecosistemas Digitales',
    icon: '⚡',
    navTarget: 'service_ecosystems',
    routePath: '/servicios/ecosistemas',
    desc: 'Creamos plataformas de alto rendimiento visual y tecnológico con React y estética de Silicon Valley.',
    businessTrans: 'El componente donde se consolida la venta. Un sitio tan profesional que automáticamente justifica tus precios, blindando tu credibilidad 24/7.',
    longDesc: 'Tu sitio web es tu vendedor más importante: trabaja 24/7, nunca se enferma y da la primera impresión a cada prospecto. Si esa primera impresión es una plantilla de WordPress que tarda 8 segundos en cargar, estás perdiendo clientes antes de que lean una sola palabra.',
    capabilities: [
      'Desarrollo con React, Next.js y Vite',
      'Diseño UI/UX de nivel Silicon Valley',
      'Animaciones cinemáticas con Framer Motion',
      'Optimización de rendimiento (Core Web Vitals)',
      'Integración con CRM, pagos y analítica',
      'SEO técnico y posicionamiento orgánico'
    ],
    metrics: [
      { value: '+215%', label: 'Leads calificados promedio' },
      { value: '<1s', label: 'Tiempo de carga' },
      { value: '100%', label: 'Score de rendimiento' }
    ],
    faq: [
      {
        question: '¿Cuánto cuesta un sitio web profesional con Persuasivo?',
        answer: 'Los proyectos de desarrollo web comienzan desde $35,000 MXN para landing pages de alta conversión y desde $75,000 MXN para sitios web corporativos multipágina. El precio final depende de la complejidad, número de páginas e integraciones requeridas.'
      },
      {
        question: '¿Cuánto tiempo tarda el desarrollo de un sitio web?',
        answer: 'Una landing page de alta conversión se entrega en 2-3 semanas. Un sitio web corporativo completo toma entre 4-6 semanas. Esto incluye estrategia, diseño, desarrollo, copywriting y optimización SEO.'
      },
      {
        question: '¿Qué tecnología utiliza Persuasivo para el desarrollo web?',
        answer: 'Utilizamos React, Next.js y Vite — las mismas tecnologías que usan empresas como Netflix, Airbnb y Shopify. No usamos WordPress ni plantillas. Cada proyecto se construye desde cero para garantizar velocidad, seguridad y rendimiento óptimo.'
      }
    ]
  },
  {
    id: 'contenido',
    slug: 'contenido',
    title: 'Contenido en video',
    subtitle: 'CEO Content Studio',
    icon: '🎬',
    navTarget: 'service_content',
    routePath: '/contenido',
    desc: 'Campañas de video mensuales para empresas B2B: explican tu producto, muestran cómo trabajas y posicionan a tus líderes.',
    businessTrans: 'Tus clientes entienden qué vendes y por qué elegirte, sin depender de visitas ni catálogos.',
    longDesc: 'Diseñamos, coordinamos el rodaje y entregamos cada mes piezas de video listas para tu calendario: entrevistas al líder, recorridos de la empresa y demostraciones de producto.',
    capabilities: [
      'Diagnóstico y calendario mensual de piezas',
      'Guiones y guías de entrevista',
      'Coordinación de rodaje por bloques',
      'Edición con subtítulos y formatos por canal',
      'Entrega mensual y revisión de aprendizajes'
    ],
    metrics: [],
    faq: []
  }
];

export const getServiceBySlug = (slug) => services.find(s => s.slug === slug);
export const getServiceById = (id) => services.find(s => s.id === id);
