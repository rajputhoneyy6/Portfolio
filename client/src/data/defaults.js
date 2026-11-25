export const DEFAULT_PROFILE = {
  firstName: 'Ayush',
  brandName: 'Ayush Kumar',
  initials: 'AK',
  roleTitle: 'Full Stack Developer',
  location: 'India',
  email: 'rajput.honeyy6@gmail.com',
  heroSubtitle: 'I build scalable full-stack web applications, e-commerce stores, and real estate portals using React, Node.js, Express, and MongoDB',
  footerWordmark: 'AYUSH'
};

export const DEFAULT_PROJECTS = [
  {
    id: 'proj-1',
    title: 'Real Estate Portal',
    category: 'Full Stack Web',
    year: '2026',
    image: '/assets/project-1.jpg',
    description: 'Full-stack property listing and discovery portal with interactive search filters, property detail views, and buyer inquiry APIs. Code walkthrough & live demo available on request.',
    role: 'Full Stack Developer',
    scope: 'Frontend, REST API, DB',
    stack: 'React, Node, Express, MongoDB'
  },
  {
    id: 'proj-2',
    title: 'Online E-Commerce Store',
    category: 'E-Commerce',
    year: '2026',
    image: '/assets/project-2.jpg',
    description: 'End-to-end online retail storefront featuring dynamic product catalogs, shopping cart state, order checkout APIs, and responsive storefront pages. Code walkthrough & live demo available on request.',
    role: 'Full Stack Developer',
    scope: 'Storefront, Cart, APIs',
    stack: 'React, Vite, Express, MongoDB'
  },
  {
    id: 'proj-3',
    title: 'Custom Web & Java Apps',
    category: 'Backend & Java',
    year: '2025',
    image: '/assets/project-3.jpg',
    description: 'Collection of full-stack web tools, Postman-verified RESTful services, and Core Java Swing + JDBC desktop applications built in NetBeans IDE. Code walkthrough available on request.',
    role: 'Full Stack & Java Dev',
    scope: 'APIs, Desktop & Web',
    stack: 'Java, Swing, JDBC, Node.js'
  }
];

export const SKILLS = [
  { name: 'React & Vite', detail: 'React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, and fast Vite builds.' },
  { name: 'Node & MongoDB', detail: 'Node.js, Express.js, RESTful APIs, MongoDB, and Postman API testing.' },
  { name: 'Java & JDBC', detail: 'Core Java, Swing desktop apps, JDBC database connectivity, and NetBeans IDE.' },
  { name: 'Python / C++', detail: 'Python, C, C++, problem solving, and AI-Assisted Development workflows.' }
];

export const EXPERIENCE = [
  { role: 'Full Stack Developer', company: 'Fujitsu India Private Limited', period: 'Present' },
  { role: 'Software Intern', company: 'MongoDB ( Cyberhub Gurugram , Building, 10C)', period: '6 Months' },
  { role: 'Full Stack Developer', company: 'Independent Builds', period: 'Ongoing' }
];

export const SERVICES_CARDS = [
  { title: 'Full Stack Web Apps', image: '/assets/project-1.jpg' },
  { title: 'Frontend Engineering', image: '/assets/project-2.jpg' },
  { title: 'Backend & REST APIs', image: '/assets/workspace-banner.jpg', grayscale: true },
  { title: 'E-Commerce & Portals', image: '/assets/project-3.jpg' }
];

export const SERVICE_CHIPS = [
  'React.js', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript (ES6+)', 'Vite',
  'Bootstrap', 'RESTful APIs', 'Core Java & JDBC', 'Python / C / C++', 'Postman', 'AI-Assisted Dev'
];

export const HIGHLIGHTS = [
  {
    kicker: 'Frontend',
    title: 'React.js, Vite & ES6+',
    desc: 'Responsive, component-driven interfaces using React.js, HTML5, CSS3, Bootstrap, and fast Vite builds.'
  },
  {
    kicker: 'Backend & Database',
    title: 'Node.js, Express & MongoDB',
    desc: 'Structured RESTful APIs, MongoDB schemas, and thorough endpoint testing with Postman.'
  },
  {
    kicker: 'Core Languages',
    title: 'Java, Python, C & C++',
    desc: 'Strong computer science fundamentals including Core Java, Swing, JDBC, and NetBeans IDE.'
  },
  {
    kicker: 'Workflow',
    title: 'AI-Assisted Development',
    desc: 'Rapid prototyping, debugging, and clean shipping backed by 8 months of hands-on industry internships.'
  }
];

export const FAQS = [
  {
    q: 'What technologies do you specialize in?',
    a: 'I work across the full stack: React.js, JavaScript (ES6+), HTML5, CSS3, Bootstrap, and Vite on the frontend; Node.js, Express.js, RESTful APIs, and MongoDB on the backend; plus Core Java (Swing/JDBC), Python, C/C++, and Postman API testing.'
  },
  {
    q: 'Can I see demos of your past projects?',
    a: 'Yes! I have built real estate portals, online e-commerce stores, and custom web apps. Reach out via the contact form or book a quick call and I will gladly walk you through live demos and source code.'
  },
  {
    q: 'How do I start working with you?',
    a: 'Fill out the contact form below with your project details and budget range, or click "Book a call anytime" to schedule a quick intro chat.'
  },
  {
    q: 'Do you handle both frontend and backend?',
    a: 'Yes — I build complete applications end-to-end, from responsive React frontends to Express APIs, MongoDB data models, and Postman-tested routes.'
  },
  {
    q: 'How long does a project take?',
    a: 'Focused websites and portfolios typically take 1–2 weeks, while full-stack portals and e-commerce applications take 3–6 weeks depending on scope.'
  }
];
