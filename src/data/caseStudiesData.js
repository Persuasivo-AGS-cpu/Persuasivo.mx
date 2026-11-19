/**
 * CENTRALIZED CASE STUDIES DATA
 * Source of truth for all project/portfolio data across the site.
 * Used by: CaseStudy, Home showcase, Schema.org
 */

export const caseStudies = [
  {
    id: 'monterrey-juridico',
    slug: 'monterrey-juridico',
    title: 'Monterrey Jurídico',
    category: 'ecosistemas',
    categoryLabel: 'Desarrollo Web',
    industry: 'Legal / High-Conversion',
    img: '/showcase/monterrey.jpg',
    href: 'https://monterreyjuridico.com/',
    tags: ['React', 'Framer Motion', 'Human-Centered Design'],
    metric: '+215% Leads Calificados',
    metricValue: 215,
    metricUnit: '%',
    metricPrefix: '+',
    quote: 'El protocolo implementado no solo mejoró nuestra imagen, sino que triplicó el volumen de consultas de alto valor en menos de 3 meses.',
    clientName: 'Dirección General',
    challenge: 'Un despacho jurídico con décadas de experiencia pero una presencia digital que no reflejaba su nivel profesional. Su sitio anterior generaba menos de 5 consultas mensuales y los prospectos que llegaban cuestionaban sus tarifas.',
    solution: 'Desarrollamos un ecosistema digital completo con React y Framer Motion que transmite autoridad legal absoluta. Implementamos copywriting especializado que filtra prospectos por valor, no por volumen, y un sistema de captación de leads inteligente conectado a CRM.',
    contentSections: [
      {
        heading: 'El Contexto',
        paragraphs: [
          'Monterrey Jurídico contaba con más de 20 años de experiencia representando a corporativos y perfiles de alto valor en Nuevo León. Sin embargo, su infraestructura digital comunicaba lo opuesto: un sitio web desactualizado, sin jerarquía visual y con un posicionamiento genérico que los hacía competir por precio contra despachos emergentes.',
          'El principal dolor no era la falta total de prospectos, sino la baja calidad de los mismos. La dirección general invertía más del 40% de su tiempo descartando "leads basura" que no tenían la capacidad económica para pagar sus igualas.'
        ]
      },
      {
        heading: 'Arquitectura de Autoridad',
        paragraphs: [
          'Nuestra intervención comenzó desde la estrategia de marca y arquitectura de la información. Redefinimos su propuesta de valor para enfocarnos exclusivamente en servicios legales corporativos de alto nivel. Eliminamos el lenguaje legal denso y lo reemplazamos por un copywriting directo, orientado a resultados y reducción de riesgos empresariales.',
          'A nivel técnico, construimos el ecosistema sobre React y Vite, garantizando tiempos de carga inferiores a 0.8 segundos. Esta velocidad, combinada con animaciones sutiles a través de Framer Motion, proyecta una imagen de sofisticación tecnológica poco común en el sector legal tradicional.'
        ]
      },
      {
        heading: 'Filtrado Psicológico',
        paragraphs: [
          'El diseño no solo debía verse premium, debía actuar como un filtro. Implementamos un sistema de captación escalonado. En lugar de un simple formulario de "Contacto", diseñamos una "Auditoría Legal Inicial". Este proceso obliga al prospecto a calificar su nivel de facturación y urgencia antes de poder agendar una llamada.',
          'El resultado fue inmediato: el volumen total de leads se redujo un 15%, pero la tasa de calificación se disparó. Ahora, los socios del despacho solo hablan con empresas que entienden el valor de su tiempo y expertise.'
        ]
      }
    ],
    results: [
      { label: 'Leads calificados', value: '+215%' },
      { label: 'Tiempo en sitio', value: '+180%' },
      { label: 'Costo por lead', value: '-62%' }
    ],
    featured: true
  },
  {
    id: 'edificio-elypse',
    slug: 'edificio-elypse',
    title: 'Edificio Elypse',
    category: 'ecosistemas',
    categoryLabel: 'Desarrollo Web',
    industry: 'Real Estate / Ultra-Luxury',
    img: '/showcase/elypse.jpg',
    href: 'https://edificio-elypse.vercel.app/',
    tags: ['Next.js', 'WebGL', 'Premium UX'],
    metric: 'Ventas Aceleradas 40%',
    metricValue: 40,
    metricUnit: '%',
    metricPrefix: '',
    quote: 'Una experiencia inmersiva que captura la atención desde el primer segundo. La presentación digital finalmente refleja la magnitud de nuestro desarrollo.',
    clientName: 'Desarrollos Elypse',
    challenge: 'Un proyecto inmobiliario ultra-premium en San Pedro necesitaba una presentación digital que justificara unidades de varios millones de pesos. Los renders 3D existentes no transmitían la experiencia de vivir ahí.',
    solution: 'Creamos una experiencia web inmersiva con Next.js y elementos WebGL que transporta al prospecto al interior del edificio. Cada scroll revela amenidades, vistas y acabados con animaciones cinematográficas que emulan el recorrido físico.',
    results: [
      { label: 'Velocidad de venta', value: '+40%' },
      { label: 'Tasa de agendar visita', value: '28%' },
      { label: 'Bounce rate', value: '-55%' }
    ],
    featured: true
  },
  {
    id: 'renters-mx',
    slug: 'renters-mx',
    title: 'Renters.mx',
    category: 'ecosistemas',
    categoryLabel: 'Desarrollo Web',
    industry: 'Real Estate / PropTech',
    img: '/showcase/renters.jpg',
    href: 'https://renters.mx/',
    tags: ['React', 'Vite', 'Corporate SaaS'],
    metric: 'Operaciones 100% Digitales',
    metricValue: 100,
    metricUnit: '%',
    metricPrefix: '',
    quote: 'Transformamos el arrendamiento tradicional en una experiencia libre de fricción. La interfaz inspira confianza absoluta a propietarios e inquilinos.',
    clientName: 'Renters PropTech',
    challenge: 'Una startup PropTech necesitaba proyectar confianza institucional para convencer tanto a propietarios como inquilinos de digitalizar un proceso tradicionalmente presencial y lleno de desconfianza.',
    solution: 'Diseñamos una plataforma corporativa con estética SaaS que transmite seguridad y profesionalismo. Implementamos flujos de usuario separados para propietarios e inquilinos, con verificación de identidad integrada y contratos digitales.',
    results: [
      { label: 'Digitalización', value: '100%' },
      { label: 'Reducción de fricción', value: '-70%' },
      { label: 'Confianza del usuario', value: '+85%' }
    ],
    featured: true
  },
  {
    id: 'onebell-ai',
    slug: 'onebell-ai',
    title: 'OneBell AI',
    category: 'ecosistemas',
    categoryLabel: 'Desarrollo Web',
    industry: 'Fitness AI / Native App',
    img: '/showcase/onebell.jpg',
    tags: ['Inteligencia Artificial', 'Apple-Native', 'Mobile UX'],
    metric: '10k+ Usuarios Activos',
    metricValue: 10000,
    metricUnit: '+',
    metricPrefix: '',
    quote: 'La interfaz se siente como si Apple hubiera diseñado una app de fitness. La retención de usuarios rompió nuestras métricas proyectadas.',
    clientName: 'Founders OneBell',
    challenge: 'Un equipo de fundadores con un algoritmo de IA para fitness necesitaba una interfaz que compitiera con apps respaldadas por millones de dólares en inversión, pero con una fracción del presupuesto.',
    solution: 'Diseñamos una experiencia mobile-first inspirada en los Human Interface Guidelines de Apple, con micro-animaciones, haptic feedback visual y un onboarding que reduce el time-to-value a menos de 60 segundos.',
    results: [
      { label: 'Usuarios activos', value: '10k+' },
      { label: 'Retención D30', value: '45%' },
      { label: 'App Store rating', value: '4.8★' }
    ],
    featured: false
  },
  {
    id: 'contratos-b2b',
    slug: 'contratos-b2b',
    title: 'Contratos B2B',
    category: 'ecosistemas',
    categoryLabel: 'Desarrollo Web',
    industry: 'Legal Ecommerce',
    img: '/showcase/contratos.jpg',
    tags: ['Ecommerce', 'Stripe API', 'Automatización'],
    metric: 'Facturación Automatizada',
    metricValue: 100,
    metricUnit: '%',
    metricPrefix: '',
    quote: 'Pasamos de procesos manuales tediosos a ventas transaccionales instantáneas. El diseño y el flujo de caja ahora están totalmente sincronizados.',
    clientName: 'Contratos B2B Legal',
    challenge: 'Un marketplace de servicios legales necesitaba automatizar completamente su flujo de ventas, desde la selección del servicio hasta el cobro y entrega del contrato personalizado.',
    solution: 'Construimos un ecommerce legal con Stripe API para pagos instantáneos, generación automática de contratos personalizados y un dashboard de gestión para el equipo administrativo.',
    results: [
      { label: 'Automatización', value: '100%' },
      { label: 'Tiempo de entrega', value: '-90%' },
      { label: 'Ventas recurrentes', value: '+120%' }
    ],
    featured: false
  },
  {
    id: 'manifiesto-marca',
    slug: 'manifiesto-marca',
    title: 'Manifiesto de Marca',
    category: 'autoridad',
    categoryLabel: 'Copywriting & Redes',
    industry: 'Fundación Psicológica / Branding',
    img: '/showcase/auth1.jpg',
    tags: ['Copywriting', 'Psicología de Ventas', 'High-Ticket'],
    metric: 'Aumento de Percepción de Valor',
    metricValue: 100,
    metricUnit: '%',
    metricPrefix: '+',
    quote: 'Finalmente nuestras palabras resuenan con la calidad de nuestro servicio. Los clientes llegan educados y listos para comprar sin regatear.',
    clientName: 'Clínica Estética Premium',
    challenge: 'Una clínica estética premium tenía problemas de percepción: sus precios eran altos pero su comunicación era genérica. Los prospectos comparaban por precio en lugar de por valor.',
    solution: 'Desarrollamos un manifiesto de marca completo con posicionamiento psicológico, guía de voz y tono, y un sistema de contenido que educa al prospecto sobre el valor del servicio antes de hablar de precio.',
    results: [
      { label: 'Percepción de valor', value: '+100%' },
      { label: 'Objeciones por precio', value: '-75%' },
      { label: 'Ticket promedio', value: '+35%' }
    ],
    featured: false
  },
  {
    id: 'arquitectura-visual',
    slug: 'arquitectura-visual',
    title: 'Arquitectura Visual',
    category: 'autoridad',
    categoryLabel: 'Copywriting & Redes',
    industry: 'Dominio en Instagram',
    img: '/showcase/auth2.jpg',
    tags: ['Grid Industrial', 'Zero Fricción', 'Identidad Visual'],
    metric: 'Crecimiento Orgánico Acelerado',
    metricValue: 300,
    metricUnit: '%',
    metricPrefix: '+',
    quote: 'Un rediseño de identidad que nos separó de los amateurs de inmediato. El nivel de prestigio que proyectamos hoy nos permite cerrar tratos más grandes.',
    clientName: 'Agencia de Consultoría',
    challenge: 'Una consultora B2B con excelentes resultados pero un feed de Instagram que parecía hecho por un freelancer. Perdían credibilidad frente a competidores con mejor imagen.',
    solution: 'Diseñamos un sistema visual con grid industrial, paleta cromática premium y plantillas modulares que el equipo interno puede ejecutar sin perder calidad ni coherencia de marca.',
    results: [
      { label: 'Engagement orgánico', value: '+300%' },
      { label: 'Solicitudes de cotización', value: '+85%' },
      { label: 'Percepción profesional', value: 'Premium' }
    ],
    featured: false
  },
  {
    id: 'sistema-liderazgo',
    slug: 'sistema-liderazgo',
    title: 'Sistema de Liderazgo',
    category: 'autoridad',
    categoryLabel: 'Copywriting & Redes',
    industry: 'Adquisición LinkedIn / Thought Leadership',
    img: '/showcase/auth3.jpg',
    tags: ['Autoridad de Nicho', 'LinkedIn Strategy', 'B2B'],
    metric: 'Posicionamiento Top Voice',
    metricValue: 1,
    metricUnit: '',
    metricPrefix: '#',
    quote: 'Nuestro CEO ahora es un líder de opinión reconocido. El embudo de contenido nos trajo oportunidades de negocio corporativo impensables.',
    clientName: 'Startup B2B SaaS',
    challenge: 'El CEO de una startup SaaS tenía profundo conocimiento técnico pero cero presencia digital. Los enterprise leads no confiaban en una empresa "sin cara".',
    solution: 'Implementamos un sistema de thought leadership en LinkedIn con calendario editorial, ghostwriting ejecutivo y estrategia de networking digital que posicionó al CEO como referente de la industria.',
    results: [
      { label: 'Posicionamiento', value: 'Top Voice' },
      { label: 'Leads enterprise', value: '+200%' },
      { label: 'Partnerships', value: '5 nuevos' }
    ],
    featured: false
  },
  {
    id: 'motor-inmobiliario',
    slug: 'motor-inmobiliario',
    title: 'Motor Inmobiliario',
    category: 'trafico',
    categoryLabel: 'Meta Ads',
    industry: 'Real Estate / Performance Marketing',
    img: '/showcase/ads1.jpg',
    tags: ['Embudos', 'Lead Qualification', 'Meta Ads'],
    metric: 'ROI 12X',
    metricValue: 12,
    metricUnit: 'X',
    metricPrefix: '',
    quote: 'Dejamos de gastar en campañas sin rumbo y empezamos a invertir en un sistema de adquisición matemático. Los leads ahora llegan perfilados y listos para visitar desarrollos.',
    clientName: 'Broker Inmobiliario Elite',
    challenge: 'Un broker inmobiliario gastaba $80,000 MXN mensuales en Meta Ads con un equipo externo que le entregaba leads no calificados. De 100 leads, solo 3 tenían capacidad real de compra.',
    solution: 'Reestructuramos la estrategia de pauta con embudos de calificación progresiva: formularios que filtran por presupuesto, zona de interés y urgencia antes de llegar al equipo comercial.',
    results: [
      { label: 'Retorno de inversión', value: '12X' },
      { label: 'Calidad de leads', value: '+400%' },
      { label: 'Costo por lead calificado', value: '-65%' }
    ],
    featured: true
  },
  {
    id: 'infraestructura-saas',
    slug: 'infraestructura-saas',
    title: 'Infraestructura SaaS',
    category: 'trafico',
    categoryLabel: 'Meta Ads',
    industry: 'SaaS / Performance Marketing',
    img: '/showcase/ads2.jpg',
    tags: ['Retargeting', 'Algoritmo Meta', 'B2B SaaS'],
    metric: 'CAC Reducido -40%',
    metricValue: 40,
    metricUnit: '%',
    metricPrefix: '-',
    quote: 'El costo de adquisición bajó drásticamente mientras mantuvimos la calidad de las demos. Una ingeniería de pauta que entiende de software, no solo de likes.',
    clientName: 'SaaS Financiero',
    challenge: 'Un SaaS financiero tenía un costo de adquisición de cliente (CAC) insostenible para su modelo de suscripción. Las campañas genéricas atraían curiosos, no compradores.',
    solution: 'Implementamos una arquitectura de campañas por etapa de awareness con retargeting inteligente y lookalike audiences basadas en los mejores clientes existentes, optimizando por demos agendadas, no por clicks.',
    results: [
      { label: 'CAC', value: '-40%' },
      { label: 'Demos agendadas', value: '+85%' },
      { label: 'Tasa de conversión', value: '+22%' }
    ],
    featured: false
  },
  {
    id: 'escala-clinica',
    slug: 'escala-clinica',
    title: 'Escala Clínica',
    category: 'trafico',
    categoryLabel: 'Meta Ads',
    industry: 'Healthcare / Performance Marketing',
    img: '/showcase/ads3.jpg',
    tags: ['Datos Duros', 'Predecibilidad', 'Healthcare'],
    metric: '150 Citas Nuevas/Mes',
    metricValue: 150,
    metricUnit: '',
    metricPrefix: '',
    quote: 'La agenda llena de manera predecible. Pasamos de depender de recomendaciones boca a boca a un flujo constante de pacientes de alto valor.',
    clientName: 'Clínica Especializada',
    challenge: 'Una clínica especializada dependía 100% de referidos para llenar su agenda. Los meses eran impredecibles y el equipo médico alternaba entre sobrecarga y tiempos muertos.',
    solution: 'Diseñamos un sistema de adquisición de pacientes con Meta Ads que genera un flujo constante y predecible de citas, con filtrado por tipo de procedimiento y capacidad de pago.',
    results: [
      { label: 'Citas nuevas/mes', value: '150' },
      { label: 'Predecibilidad', value: '95%' },
      { label: 'Dependencia de referidos', value: '-80%' }
    ],
    featured: false
  }
];

// Helper functions for filtering
export const getFeaturedProjects = () => caseStudies.filter(p => p.featured);
export const getProjectsByCategory = (cat) => caseStudies.filter(p => p.category === cat);
export const getProjectBySlug = (slug) => caseStudies.find(p => p.slug === slug);

