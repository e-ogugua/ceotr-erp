import { getPriceRange } from '../config/currency.js';

export const DEMO_SERVICES = [
  {
    id: 'general-contracting',
    title: 'General Contracting',
    description: 'CEOTR Ltd delivers top-quality construction and contracting services with a focus on durability, efficiency, and transparency. From residential builds to commercial projects, we integrate modern methods with practical expertise to ensure timely and cost-effective execution. Our contracting team is committed to meeting client specifications while upholding industry standards.',
    icon: 'Building',
    priceRanges: {
      NGN: getPriceRange(10000000, 500000000),
      USD: getPriceRange(12000, 600000),
      GBP: getPriceRange(10000, 480000)
    },
    features: [
      'Full project planning and supervision',
      'Quality control and compliance',
      'Transparent budgeting and cost reports',
      'Skilled workforce and trusted subcontractors',
      'Post-completion support and maintenance'
    ],
    image: '/images/services/general-contracting.png'
  },
  {
    id: 'it-solutions',
    title: 'IT Solutions',
    description: 'Our IT services help businesses streamline operations, secure data, and harness digital transformation. CEOTR Ltd provides software development, system integration, and IT support tailored to each client\'s unique challenges. We bridge the gap between technology and business goals.',
    icon: 'Server',
    priceRanges: {
      NGN: getPriceRange(1500000, 50000000),
      USD: getPriceRange(2000, 65000),
      GBP: getPriceRange(1800, 50000)
    },
    features: [
      'Custom software and web apps',
      'ERP and business management solutions',
      'IT support and maintenance',
      'Data security and backup systems',
      'Cloud migration and integration'
    ],
    image: '/images/services/it-services.png'
  },
  {
    id: 'business-consulting',
    title: 'Business Development & Consulting',
    description: 'We partner with entrepreneurs and organizations to design strategies that fuel growth and sustainability. Our consulting covers finance, operations, branding, and market entry. CEOTR Ltd helps businesses sharpen their edge and execute with clarity.',
    icon: 'Briefcase',
    priceRanges: {
      NGN: getPriceRange(500000, 20000000),
      USD: getPriceRange(700, 25000),
      GBP: getPriceRange(600, 20000)
    },
    features: [
      'Strategic business planning',
      'Market analysis and entry strategy',
      'Branding and positioning',
      'Financial modeling and advisory',
      'Process optimization'
    ],
    image: '/images/services/adminServices.PNG'
  },
  {
    id: 'software-development',
    title: 'Software Development',
    description: 'Websites, apps, and custom digital tools tailored to your business needs.',
    icon: 'Code',
    priceRanges: {
      NGN: getPriceRange(300000, 8000000),
      USD: getPriceRange(360, 9600),
      GBP: getPriceRange(300, 8000)
    },
    features: [
      'Custom web applications',
      'Mobile app development',
      'E-commerce solutions',
      'API integrations',
      'Cloud-based systems'
    ],
    image: '/images/services/software-development.png'
  }
];

export const DEMO_PROJECTS = [
  {
    id: 'roka-rebrand',
    title: 'Roka Pure Water Rebrand',
    description: 'Revitalized a family water brand with modern production systems, branding, and distribution expansion.',
    image: '/images/portfolio/rokafactory.png',
    gallery: [
      '/images/portfolio/rokaProject-delivery.webp',
      '/images/portfolio/rokaTableWater.webp',
      '/images/portfolio/roka1.webp',
      '/images/portfolio/roka.webp',
      '/images/portfolio/rokaProject-delivery.HEIC',
      '/images/portfolio/rokaTableWater.HEIC'
    ],
    technologies: ['Branding', 'Supply Chain Management', 'Business Systems'],
    completionDate: '2025',
    client: 'Roka Family Business',
    type: 'business-development'
  },
  {
    id: 'poshpoule-farm',
    title: 'PoshPOULE® Organic Farm Expansion',
    description: 'Built and scaled a poultry and crop farm operation with organic farming methods, creating a sustainable agribusiness model.',
    image: '/images/portfolio/rokafarm.JPG',
    gallery: [
      '/images/portfolio/poshpoulefarms.webp',
      '/images/portfolio/poshpoulefarm2.webp',
      '/images/portfolio/poshpoulefarms.HEIC',
      '/images/portfolio/poshpoulefarm2.HEIC'
    ],
    technologies: ['AgriTech', 'Organic Systems', 'Farm Management Software'],
    completionDate: '2019',
    client: 'PoshPOULE® Farms',
    type: 'construction'
  },
  {
    id: 'ceotr-erp',
    title: 'CEOTR ERP Prototype',
    description: 'Designed and tested a lightweight ERP dashboard to manage leads, proposals, and project workflows internally at CEOTR Ltd.',
    image: '/images/portfolio/project-2-main.png',
    gallery: [
      '/images/services/it-services.png',
      '/images/portfolio/project-1-main.png',
      '/images/services/software-development.png'
    ],
    technologies: ['React', 'Node.js', 'Tailwind', 'PostgreSQL'],
    completionDate: '2024',
    client: 'CEOTR Ltd (Internal)',
    type: 'software'
  },
  {
    id: 'jesus-power-arena',
    title: 'Jesus Power Arena Construction',
    description: 'Complete construction of a modern worship and community center with state-of-the-art facilities.',
    image: '/images/portfolio/JesusPowerArenaProject.PNG',
    gallery: [
      '/images/portfolio/JesusPowerArena.webp',
      '/images/portfolio/JepliggomProject.webp',
      '/images/portfolio/JesusPowerArena.HEIC',
      '/images/portfolio/JepliggomProject.HEIC'
    ],
    technologies: ['Modern Architecture', 'Sustainable Building', 'Community Facilities'],
    completionDate: '2023',
    client: 'Jesus Power Arena Ministry',
    type: 'construction'
  },
  {
    id: 'organic-farm-project',
    title: 'Organic Farm Technology Integration',
    description: 'Implemented modern farming technology and sustainable practices for an organic farm operation.',
    image: '/images/portfolio/organicFarm.webp',
    gallery: [
      '/images/portfolio/organicFarm.webp',
      '/images/portfolio/organicFarm.HEIC'
    ],
    technologies: ['AgriTech', 'Sustainable Farming', 'IoT Monitoring'],
    completionDate: '2024',
    client: 'Green Valley Organics',
    type: 'it'
  },
];

export const DEMO_TEAM = [
  {
    id: 'emmanuel-ogugua',
    name: 'Chukwuka Emmanuel Ogugua',
    position: 'Executive Director',
    bio: 'Emmanuel is an IT enthusiast, entrepreneur, and farmer with over a decade of experience in contracting, technology, and business development. He founded CEOTR Ltd to merge smart business strategies with solid execution.',
    photo: '/images/team/CEO.png',
    linkedin: 'https://linkedin.com/in/emmanuelogugua'
  },
  {
    id: 'chidera-ogugua',
    name: 'Chidera L. Ogugua',
    position: 'Operations Lead',
    bio: 'Chidera brings expertise in administration and operations, ensuring smooth project execution and client satisfaction. She drives efficiency across business and contracting units.',
    photo: '/images/team/team3.JPG',
    linkedin: 'https://linkedin.com/in/chideraogugua'
  }
];

export const DEMO_TESTIMONIALS = [
  {
    id: 'testimonial-1',
    name: 'Paul Okeke',
    company: 'Okeke Realty',
    content: 'CEOTR Ltd transformed our project execution. From planning to delivery, everything was transparent and professional. Their IT dashboard kept us updated at every step.',
    rating: 5,
    photo: '/images/testimonials/testimonial1.jpg'
  },
  {
    id: 'testimonial-2',
    name: 'Ngozi Eze',
    company: 'Nkpala Agro Ventures',
    content: 'Working with CEOTR Ltd was a turning point for our agribusiness. Their team brought structure, technology, and growth strategies that took us to the next level.',
    rating: 5,
    photo: '/images/testimonials/testimonial3.jpg'
  }
];

export const COMPANY_INFO = {
  name: 'CEOTR Ltd',
  fullName: 'CEO Transnational Resources Limited',
  tagline: 'Discover Excellence!',
  founded: '2015',
  headquarters: 'Enugu, Nigeria',
  phone: ['+234 806 450 8595', '+234 812 239 437'],
  email: ['ceotrltd@gmail.com', 'support@ceotr.com'],
  businessHours: 'Mon–Fri, 9:00 AM – 6:00 PM',
  socialLinks: {
    linkedin: 'https://linkedin.com/company/ceotr',
    instagram: 'https://instagram.com/ceotr_ltd',
    facebook: 'https://facebook.com/CeotrLtd',
    twitter: 'https://twitter.com/CeotrLtd'
  }
};
