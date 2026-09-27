import { Project, SkillCategory, ExperienceItem, Certification, RoleResume } from '../types/portfolio';

// Local generated image assets
import upiAnalyticsImg from '../assets/images/upi_analytics_dash_1790257867699.jpg';
import fertilizerErpImg from '../assets/images/fertilizer_erp_ui_1790257888631.jpg';
import weatherAppImg from '../assets/images/project_weather_devops_1790230494855.jpg';
import trafficSimImg from '../assets/images/traffic_sim_ai_1790257910865.jpg';
import emergencyVoiceImg from '../assets/images/project_drone_vision_1790230514453.jpg';
import collegeBotImg from '../assets/images/project_neural_rag_1790230537286.jpg';
import kavachRakshakImg from '../assets/images/kavach_rakshak_ui_1790517518586.jpg';
import avatarImg from '../assets/images/avatar_akash_cse_1790230552887.jpg';

export const PERSONAL_INFO = {
  name: 'Akash Darapuneni',
  tagline: 'Computer Science Engineer · Data · Software · AI',
  subTagline: 'I build data-driven applications, intelligent systems, and reliable software.',
  supportingLine: 'Computer Science Engineering student with hands-on experience in Python, SQL, Java, Spring Boot, Power BI, cloud technologies, data analysis, and AI/ML projects.',
  email: 'akashdarapuneni7@gmail.com',
  phone: '+91 93902 44113',
  location: 'Hyderabad, India',
  education: 'KL University · B.Tech Computer Science Engineering (2023–2027) · CGPA: 8.5 / 10',
  avatar: avatarImg,
  github: 'https://github.com/akashdarapuneni',
  linkedin: 'https://linkedin.com/in/akash-darapuneni',
  leetcode: 'https://leetcode.com/akashdarapuneni',
  portfolioMetrics: [
    { value: '2027', label: 'Graduation Year', sublabel: 'B.Tech CSE' },
    { value: '8.5 / 10', label: 'Academic CGPA', sublabel: 'KL University' },
    { value: '6+', label: 'Core Projects Built', sublabel: 'Data, Software & AI' },
    { value: '5+', label: 'Technology Areas', sublabel: 'Python, Java, Cloud, Data, Web' },
  ],
  techStrip: ['Python', 'SQL', 'Java', 'Spring Boot', 'Power BI', 'Tableau', 'React', 'Docker', 'Kubernetes'],
};

export const HOW_I_WORK_STEPS = [
  {
    step: '01',
    title: 'Understand',
    subtitle: 'Problem & Constraints',
    points: ['Requirement gathering', 'Business problem clarity', 'Data profiling & user needs', 'Constraint identification'],
  },
  {
    step: '02',
    title: 'Build',
    subtitle: 'Implementation & Logic',
    points: ['Data cleaning & schema design', 'Solution architecture', 'Clean, modular code', 'APIs, dashboards & services'],
  },
  {
    step: '03',
    title: 'Validate',
    subtitle: 'Quality & Correctness',
    points: ['Functional testing', 'Data accuracy validation', 'Edge case debugging', 'Performance profiling'],
  },
  {
    step: '04',
    title: 'Improve',
    subtitle: 'Scale & Reliability',
    points: ['Automated workflows', 'Clear documentation', 'Containerized deployment', 'Continuous iteration'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'upi-transaction-analytics',
    title: 'UPI Transaction & Sales Analytics Dashboard',
    subtitle: 'Interactive Analytics & Business Intelligence Solution',
    category: 'Data Analytics',
    description: 'An interactive analytics solution for cleaning, analyzing and visualizing transaction and sales data to identify trends, transaction outcomes and operational insights.',
    longDescription: 'Designed and deployed an end-to-end analytics workflow for digital transaction records. Handled real-world dirty datasets through Python Pandas data wrangling pipelines, executed complex SQL aggregate queries for merchant and hourly trend discovery, and synthesized actionable business metrics in interactive Tableau and Power BI visual dashboards.',
    problemSolved: 'Financial datasets often contain corrupt timestamps, redundant transaction retry attempts, and ambiguous failure status codes that mislead revenue forecasting.',
    keyTechnicalWork: [
      'Engineered automated data cleaning pipeline addressing missing values and duplicate retry records',
      'Calculated crucial business KPIs: Transaction Success Ratio, Peak Load Windows, Merchant Settlement Volumes',
      'Built multi-tier SQL queries with window functions for period-over-period growth comparison',
      'Designed executive visual dashboards with dynamic drill-downs by bank network and category',
    ],
    architectureHighlights: [
      'Data Ingestion: CSV & SQL relational transaction logs',
      'Processing: Python, Pandas, NumPy for outlier removal and datetime standardization',
      'Database: MySQL / PostgreSQL analytical views',
      'Visualization: Tableau / Power BI interactive executive dashboard',
    ],
    metrics: [
      { label: 'Dataset Cleaned', value: '150,000+ rows' },
      { label: 'Success Rate Tracking', value: '98.4%' },
      { label: 'Query Speedup', value: '4.2x' },
    ],
    tags: ['Python', 'Pandas', 'SQL', 'Tableau', 'Power BI', 'Excel', 'Data Cleaning', 'EDA', 'Data Visualization'],
    image: upiAnalyticsImg,
    githubUrl: 'https://github.com/akashdarapuneni/upi-transaction-analytics',
    demoUrl: 'https://public.tableau.com/profile/akashdarapuneni',
    featured: true,
    pipeline: [
      { step: 'RAW DATA', description: 'Transaction logs, merchant codes, timestamps & payment status' },
      { step: 'CLEANING', description: 'Imputing missing values, removing retry duplicates & normalising timestamps' },
      { step: 'ANALYSIS', description: 'SQL window queries, hourly volume surges & bank failure categorization' },
      { step: 'DASHBOARD', description: 'Tableau & Power BI visual reporting with interactive KPI slicers' },
      { step: 'INSIGHTS', description: 'Operational recommendations for merchant routing and retry mitigation' },
    ],
  },
  {
    id: 'kavach-rakshak-ai-insurance',
    title: 'Kavach — Rakshak AI Insurance System',
    subtitle: 'Dual-Portal Autonomous Claim Adjudication & Fraud Risk Assessment Engine',
    category: 'AI / ML',
    description: 'An end-to-end intelligent insurance platform with dual operational portals: an advanced Admin Underwriting & Risk Dashboard and a streamlined Policyholder User Dashboard.',
    longDescription: 'Engineered an intelligent insurance operations platform resolving claim processing bottlenecks and fraudulent filing patterns. Deployed with dual segregated operational environments: a high-security Admin Underwriting & Risk Analytics Portal for claims adjusters and fraud analysts, paired with a modern User Dashboard for policyholders to file claims, track coverage, and monitor policy status in real time.',
    problemSolved: 'Legacy insurance claim processing requires weeks of manual document verification and lacks instant fraud detection, resulting in delayed payouts for legitimate claimants and high operational overhead.',
    keyTechnicalWork: [
      'Developed segregated Admin and User Dashboards deployed on production Vercel environments',
      'Engineered automated risk assessment scoring model analyzing historical claim loss metrics',
      'Built interactive policy tracking and claim status timeline with instant user feedback',
      'Configured real-time fraud anomaly flagging based on behavioral and claim pattern signals',
      'Integrated role-based routing and secure authorization flow between policyholders and administrators',
    ],
    architectureHighlights: [
      'Admin Portal: Underwriting metrics, fraud detection radar, queue adjudication',
      'User Dashboard: Policy management, instant claim submission, real-time status tracker',
      'Risk Engine: Algorithmic claim scoring and anomaly pattern detection',
      'Deployment: High-availability edge hosting on Vercel with automated CI/CD pipeline',
    ],
    metrics: [
      { label: 'Evaluation Speed', value: '< 2 mins' },
      { label: 'Fraud Detection', value: '96.8%' },
      { label: 'Dual Portals', value: 'Admin + User' },
    ],
    tags: ['AI / ML', 'React', 'Next.js', 'Risk Analytics', 'Insurance Tech', 'Vercel', 'TypeScript', 'Tailwind CSS'],
    image: kavachRakshakImg,
    githubUrl: 'https://github.com/akashdarapuneni/rakshak-ai-insurance',
    demoUrl: 'https://rakshak-ai-insurance-atzh.vercel.app/dashboard',
    adminDemoUrl: 'https://rakshak-ai-insurance-qwna-five.vercel.app/dashboard',
    userDemoUrl: 'https://rakshak-ai-insurance-atzh.vercel.app/dashboard',
    extraLinks: [
      { label: 'Admin Portal', url: 'https://rakshak-ai-insurance-qwna-five.vercel.app/dashboard', badge: 'Admin Console' },
      { label: 'User Dashboard', url: 'https://rakshak-ai-insurance-atzh.vercel.app/dashboard', badge: 'Policyholder' },
    ],
    featured: false,
    pipeline: [
      { step: 'CLAIM FILING', description: 'User submits claim telemetry and loss documentation' },
      { step: 'FRAUD CHECK', description: 'AI evaluates anomaly score and verifies historical policy records' },
      { step: 'RISK SCORING', description: 'Algorithmic assessment of payout liability and risk threshold' },
      { step: 'ADMIN REVIEW', description: 'Adjuster reviews flagged metrics via Admin Risk Portal' },
      { step: 'SETTLEMENT', description: 'Automated claim approval notification dispatched to user dashboard' },
    ],
  },
  {
    id: 'weatherly-application',
    title: 'Weatherly — Full Stack Weather Application',
    subtitle: 'Spring Boot Backend, React Frontend & Containerized DevOps Deployment',
    category: 'Software',
    description: 'A full-stack weather application built with a Spring Boot backend and React frontend, containerized and deployed using Docker and Kubernetes.',
    longDescription: 'Engineered a resilient weather forecasting web platform connecting to external meteorological APIs, caching forecasts in MySQL, and serving reactive updates to a responsive React frontend. Automated the build and deployment lifecycle using Docker containers, Kubernetes manifests, and continuous integration workflows.',
    problemSolved: 'Ensured high availability and fast client responses for external weather API requests while eliminating rate-limit lockouts through server-side caching.',
    keyTechnicalWork: [
      'Developed Spring Boot REST API layer with DTO validation and error handling',
      'Configured MySQL persistence with Spring Data JPA for location forecast caching',
      'Packaged services into multi-stage Docker container images for minimal footprint',
      'Authored Kubernetes deployment and service manifests for localized cluster orchestration',
    ],
    architectureHighlights: [
      'Frontend: React, Tailwind CSS, Responsive weather cards',
      'Backend: Java, Spring Boot REST API, Jackson serializer',
      'Database: MySQL relational persistence layer',
      'DevOps: Docker, Kubernetes, GitHub Actions CI/CD pipeline',
    ],
    metrics: [
      { label: 'Avg API Latency', value: '<45 ms' },
      { label: 'Container Size', value: '112 MB' },
      { label: 'Cache Hit Ratio', value: '88%' },
    ],
    tags: ['Java', 'Spring Boot', 'React', 'REST API', 'MySQL', 'Docker', 'Kubernetes', 'GitHub Actions', 'Jenkins'],
    image: weatherAppImg,
    githubUrl: 'https://github.com/akashdarapuneni/weatherly-app',
    demoUrl: 'https://weatherly-demo.internal',
    featured: false,
  },
  {
    id: 'fertilizer-shop-erp',
    title: 'Fertilizer Shop ERP',
    subtitle: 'Centralized Agricultural Retail & Inventory Management Platform',
    category: 'Software',
    description: 'A shop-management application designed to manage farmers, products, inventory, billing, payments and purchase history through a centralized system.',
    longDescription: 'Created a specialized enterprise resource planning web system tailored for rural agro-retail stores. Enables store operators to record farmer accounts, maintain live seed and fertilizer inventory stock with low-stock alerts, print itemized GST invoices, and calculate accrued interest on credit ledger purchases.',
    problemSolved: 'Replaced error-prone manual paper ledger entries with a reliable digital database that tracks credit payment status and inventory levels in real-time.',
    keyTechnicalWork: [
      'Implemented farmer credit ledger with automated balance recalculation and payment history logs',
      'Built automated billing module with tax breakdown and printable PDF receipt generation',
      'Configured role-based access for store operators and administrative auditing',
      'Integrated inventory threshold triggers to warn store managers of impending stock shortages',
    ],
    architectureHighlights: [
      'Farmer Management: Ledger tracking, contact directory, debt status',
      'Product & Inventory: SKU barcode tracking, quantity threshold warnings',
      'Billing Engine: Real-time item subtotal, discount, and tax calculation',
      'History & Interest: Timestamped ledger with credit interest computation',
    ],
    metrics: [
      { label: 'Ledger Audit Time', value: '-80%' },
      { label: 'Billing Speed', value: '<30 sec' },
      { label: 'Zero-Stock Errors', value: '0' },
    ],
    tags: ['React', 'Java', 'Spring Boot', 'MySQL', 'REST API', 'Tailwind CSS'],
    image: fertilizerErpImg,
    githubUrl: 'https://github.com/akashdarapuneni/fertilizer-shop-erp',
    demoUrl: 'https://fertilizer-erp-demo.internal',
    featured: false,
  },
  {
    id: 'ai-traffic-simulation',
    title: 'AI Traffic Flow Simulation',
    subtitle: 'Intersection Modeling & Congestion Analytics Engine',
    category: 'AI / ML',
    description: 'A Python-based traffic simulation exploring how traffic conditions can be modeled and analyzed using four-way intersection scenarios.',
    longDescription: 'Constructed an algorithmic simulation framework that models vehicle arrival densities, deceleration physics, and queue accumulation across a 4-way urban intersection. Analyzed wait times under fixed vs dynamic adaptive signal scheduling algorithms.',
    problemSolved: 'Provides a computational testbed to observe how slight changes in traffic light phase durations mitigate gridlock during peak vehicle flow periods.',
    keyTechnicalWork: [
      'Programmed kinematic vehicle movement models with safe headway braking calculations',
      'Generated synthetic traffic wave variations to evaluate bottleneck buildup',
      'Aggregated queue delay statistics to compare algorithmic signal timing strategies',
      'Plotted flow rate curves and congestion heatmaps using Matplotlib and NumPy',
    ],
    architectureHighlights: [
      'Input: Configurable traffic arrival volume & turn probability distribution',
      'Simulation: Time-stepped vehicle physics and lane queue propagation',
      'Analysis: Bottleneck identification and throughput evaluation',
      'Output: Visual velocity curves and congestion optimization suggestions',
    ],
    metrics: [
      { label: 'Queue Reduction', value: '23%' },
      { label: 'Throughput Lift', value: '+18%' },
      { label: 'Simulated Cars', value: '10,000+' },
    ],
    tags: ['Python', 'AI/ML', 'Simulation', 'Data Analysis', 'NumPy', 'Matplotlib'],
    image: trafficSimImg,
    githubUrl: 'https://github.com/akashdarapuneni/ai-traffic-simulation',
    demoUrl: 'https://traffic-sim-demo.internal',
    featured: false,
  },
  {
    id: 'emergency-voice-override',
    title: 'Emergency Voice Override System',
    subtitle: 'Raspberry Pi Embedded Speech Recognition & Hardware Actuation',
    category: 'AI / ML',
    description: 'A Raspberry Pi-based voice-controlled emergency override system combining speech recognition with hardware control for real-time response scenarios.',
    longDescription: 'Engineered an offline voice-controlled failsafe trigger combining the lightweight Vosk neural speech recognition model with Raspberry Pi General Purpose Input/Output (GPIO) pins. Allows operators to initiate critical overrides hands-free in emergency situations without internet connectivity.',
    problemSolved: 'Enables instant hands-free equipment shutdown or emergency protocol activation in industrial settings where network outages could disable cloud-based voice assistants.',
    keyTechnicalWork: [
      'Configured Vosk offline acoustic model for low-latency keyword detection on edge hardware',
      'Interfaced Python GPIO drivers with hardware relay modules and indicator status LEDs',
      'Created multi-threaded audio buffer listener avoiding CPU throttling on single-board computer',
      'Implemented acoustic confidence filtering to prevent false positive keyword triggering',
    ],
    architectureHighlights: [
      'Edge Compute: Raspberry Pi 4 Model B running Linux',
      'Voice Engine: Offline Vosk acoustic speech-to-text parser',
      'Actuation: Python RPi.GPIO driving safety relay switches',
      'Latency: Sub-350ms keyword-to-actuation response time',
    ],
    metrics: [
      { label: 'Edge Response', value: '<350 ms' },
      { label: 'Keyword Accuracy', value: '94.2%' },
      { label: 'Internet Needed', value: '0% (Offline)' },
    ],
    tags: ['Python', 'Raspberry Pi', 'Vosk', 'GPIO', 'Voice Recognition', 'Automation', 'Embedded Systems'],
    image: emergencyVoiceImg,
    githubUrl: 'https://github.com/akashdarapuneni/emergency-voice-override',
    demoUrl: 'https://voice-override-demo.internal',
    featured: false,
  },
  {
    id: 'college-documents-automation-bot',
    title: 'College Documents Automation Bot',
    subtitle: 'Telegram Bot API with OCR & Administrator Access Control',
    category: 'Automation',
    description: 'An automated Telegram bot for managing college documents with administrator-controlled access and OCR-based document processing.',
    longDescription: 'Automated campus administrative paperwork distribution for students. Integrated the Telegram Bot API with Python optical character recognition (OCR) and Poppler PDF libraries to parse course materials, syllabus files, and student certificates while verifying student identity and administrative permission tiers.',
    problemSolved: 'Eliminated manual staff effort in locating and sending academic records, timetables, and verification letters to hundreds of daily student requests.',
    keyTechnicalWork: [
      'Developed Telegram Bot asynchronous command handlers with stateful user conversation flow',
      'Integrated OCR text extraction from uploaded scanned images and documents',
      'Implemented role-based authorization ensuring sensitive documents remain admin-restricted',
      'Optimized document retrieval latency through local directory indexing and caching',
    ],
    architectureHighlights: [
      'Bot Core: Python Telegram Bot API with async event loop',
      'Document Parsing: Tesseract OCR & Poppler PDF conversion tools',
      'Storage: Categorized document repository with metadata index',
      'Security: Administrator authorization verification on restricted files',
    ],
    metrics: [
      { label: 'Requests Handled', value: '1,200+' },
      { label: 'Retrieval Time', value: '<2 sec' },
      { label: 'Admin Work Saved', value: '15 hrs/wk' },
    ],
    tags: ['Python', 'Telegram Bot API', 'OCR', 'Poppler', 'Automation', 'Document Processing'],
    image: collegeBotImg,
    githubUrl: 'https://github.com/akashdarapuneni/college-docs-bot',
    demoUrl: 'https://t.me/CollegeDocsBot_demo',
    featured: false,
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Data & Analytics',
    description: 'Extracting clean intelligence, building dashboards, and statistical EDA.',
    skills: [
      { name: 'Python (Pandas, NumPy)', highlight: 'Data cleaning, outlier removal, missing value handling' },
      { name: 'SQL (MySQL, PostgreSQL)', highlight: 'Complex joins, window functions, CTEs, aggregation queries' },
      { name: 'Power BI & Tableau', highlight: 'Interactive visual dashboards, drill-downs, KPI cards' },
      { name: 'Excel & Data Modeling', highlight: 'Pivot tables, VLOOKUP/XLOOKUP, summary reporting' },
      { name: 'Exploratory Data Analysis (EDA)', highlight: 'Trend analysis, correlation discovery, visualization' },
    ],
  },
  {
    title: 'Software Engineering',
    description: 'Object-oriented application development, backend APIs, and web systems.',
    skills: [
      { name: 'Java & Spring Boot', highlight: 'RESTful API endpoints, Spring Data JPA, MVC architecture' },
      { name: 'Python', highlight: 'Scripting, backend logic, data processing, automation' },
      { name: 'JavaScript & React', highlight: 'Responsive component design, state management, modern UI' },
      { name: 'MySQL Database', highlight: 'Schema design, foreign key constraints, indexing' },
      { name: 'Git & Version Control', highlight: 'Branching strategies, pull requests, collaboration' },
    ],
  },
  {
    title: 'AI & Machine Learning',
    description: 'Practical machine learning modeling, computer vision, and edge automation.',
    skills: [
      { name: 'Machine Learning Fundamentals', highlight: 'Supervised/unsupervised models, regression, classification' },
      { name: 'Scikit-learn', highlight: 'Model training, hyperparameter tuning, evaluation metrics' },
      { name: 'Computer Vision & OpenCV', highlight: 'Image preprocessing, contouring, feature extraction' },
      { name: 'Voice & Speech Processing', highlight: 'Offline speech recognition (Vosk), audio filtering' },
      { name: 'AI Automation & Agents', highlight: 'Workflow automation, script-driven intelligence' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    description: 'Containerization, deployment automation, and cloud fundamentals.',
    skills: [
      { name: 'Docker & Containerization', highlight: 'Dockerfile authoring, image optimization, multi-container setups' },
      { name: 'Kubernetes (K8s)', highlight: 'Pods, services, deployments, basic cluster manifests' },
      { name: 'CI/CD Pipelines', highlight: 'GitHub Actions and Jenkins automated build & test runs' },
      { name: 'Cloud Infrastructure', highlight: 'AWS Cloud Practitioner concepts, GCP & OCI foundational training' },
      { name: 'Linux / Bash Scripting', highlight: 'Shell commands, cron jobs, server administration' },
    ],
  },
];

export const ROLE_FIT_CARDS = [
  {
    role: 'DATA ANALYST',
    tagline: 'Turning raw datasets into clean analysis, dashboards and actionable insights.',
    skills: ['Python', 'SQL', 'Power BI', 'Tableau', 'Excel', 'EDA', 'Data Cleaning'],
    color: '#00D9FF',
    filterCategory: 'Data Analytics',
    cta: 'Explore Data Work →',
    sampleCompanies: 'CGI, Blinkit, Analytics Fresher Roles',
  },
  {
    role: 'SOFTWARE ENGINEER',
    tagline: 'Building practical applications, APIs, business ERPs and backend services.',
    skills: ['Java', 'Spring Boot', 'React', 'REST APIs', 'MySQL', 'Git'],
    color: '#6677FF',
    filterCategory: 'Software',
    cta: 'Explore Software Work →',
    sampleCompanies: 'Kotak, LTM GET, Revature, Java Fresher',
  },
  {
    role: 'AI / ML ENGINEER',
    tagline: 'Experimenting with machine learning, computer vision, simulations and voice.',
    skills: ['Python', 'Scikit-learn', 'OpenCV', 'Vosk', 'Simulation', 'Edge AI'],
    color: '#00E5A0',
    filterCategory: 'AI / ML',
    cta: 'Explore AI Work →',
    sampleCompanies: 'Cyncly AI/ML, Intelligent Automation',
  },
  {
    role: 'CLOUD & DEVOPS / QA',
    tagline: 'Containerizing, deploying, validating and automating software pipelines.',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Testing', 'Linux'],
    color: '#F59E0B',
    filterCategory: 'Software',
    cta: 'Explore DevOps Work →',
    sampleCompanies: '3M QA/Testing, CloudScale, DevOps Fresher',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: 'Jan 2026 – Mar 2026',
    role: 'Data Analyst / Developer',
    organization: 'Analytics & Systems Division',
    location: 'Hybrid',
    description: 'Worked with structured datasets, database workflows, and analytical dashboards.',
    bullets: [
      'Worked with structured datasets using Python and SQL to extract actionable operational metrics.',
      'Performed rigorous data cleaning, missing value transformation, and outlier analysis.',
      'Developed analytical solutions and documented technical findings for team reviews.',
      'Supported application and data workflows, identifying and debugging data anomalies.',
    ],
    skills: ['Python', 'SQL', 'Pandas', 'Data Cleaning', 'Tableau'],
  },
  {
    period: 'Mar 2026 – Apr 2026',
    role: 'Full Stack Developer',
    organization: 'Kavach Initiative',
    location: 'Campus / Remote',
    description: 'Contributed to full-stack web modules, backend services, and application workflows.',
    bullets: [
      'Developed frontend and backend application components with clean modular architecture.',
      'Worked with RESTful APIs, data validation, and responsive interface workflows.',
      'Collaborated on full-stack development, integration testing, and bug resolution.',
    ],
    skills: ['React', 'Java', 'Spring Boot', 'REST APIs', 'MySQL'],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services (AWS)',
    issueDate: '2025',
    credentialId: 'AWS-CCP-AKASH',
  },
  {
    title: 'Oracle Cloud Infrastructure (OCI) Training',
    issuer: 'Oracle University',
    issueDate: '2024',
    credentialId: 'OCI-FOUNDATIONS-AKASH',
  },
];

export const EDUCATION_INFO = {
  institution: 'KL University',
  degree: 'B.Tech — Computer Science and Engineering',
  period: '2023 – 2027',
  cgpa: '8.5 / 10',
  coursework: [
    'Data Structures & Algorithms',
    'Database Management Systems (DBMS)',
    'Object-Oriented Programming (Java/Python)',
    'Operating Systems',
    'Computer Networks',
    'Software Engineering Methodologies',
  ],
};

export const ROLE_RESUMES: RoleResume[] = [
  {
    id: 'data-analyst',
    roleTitle: 'Data Analyst Resume',
    subtitle: 'Data Analytics · SQL · Power BI · Python · EDA',
    skillsFocus: ['Python (Pandas, NumPy)', 'SQL (Joins, Window Functions, Views)', 'Power BI & Tableau', 'Excel (Pivots, Formulas)', 'Data Cleaning & EDA', 'Business Insights & Reporting'],
    summary: 'Computer Science Engineering student at KL University (CGPA 8.5/10) with hands-on experience transforming dirty, unstructured datasets into reliable business insights. Proficient in automated data cleaning with Python, complex SQL aggregation queries, and designing interactive executive dashboards in Tableau and Power BI.',
    keyProjects: [
      'UPI Transaction & Sales Analytics: Cleaned 150k+ rows, tracked 98.4% success rate, generated failure reduction recommendations.',
      'AI Traffic Flow Simulation: Quantified intersection wait times and bottleneck delays using data modeling.',
    ],
    highlights: [
      'Strong SQL querying capabilities (Window functions, CTEs, Aggregation)',
      'Data cleaning pipeline architecture (imputation, deduplication, datetime formatting)',
      'Translating raw metrics into executive-ready visual KPI charts',
    ],
  },
  {
    id: 'software-engineer',
    roleTitle: 'Software Engineer Resume',
    subtitle: 'Java · Spring Boot · React · MySQL · REST APIs',
    skillsFocus: ['Java (Core, OOP, Collections)', 'Spring Boot (REST APIs, JPA, Security)', 'React & JavaScript', 'MySQL Relational Database', 'Docker & Kubernetes', 'Git & CI/CD'],
    summary: 'CSE student at KL University (CGPA 8.5/10) with strong foundation in Object-Oriented Programming, Data Structures, and full-stack web engineering. Experienced in architecting robust Spring Boot backend microservices, building responsive React frontends, and containerizing services with Docker and Kubernetes.',
    keyProjects: [
      'Weatherly Full Stack App: Spring Boot REST API + React with MySQL caching and Docker/K8s deployment.',
      'Fertilizer Shop ERP: Comprehensive shop billing, farmer ledger management, and inventory tracking system.',
    ],
    highlights: [
      'Clean architectural separation of concern (Controller-Service-Repository pattern)',
      'Reliable relational schema design with ACID compliance and indexing',
      'Containerized deployment and automated build pipelines',
    ],
  },
  {
    id: 'ai-ml',
    roleTitle: 'AI / ML Engineer Resume',
    subtitle: 'Python · Scikit-learn · OpenCV · Edge AI · Voice',
    skillsFocus: ['Python (Data Science & AI)', 'Scikit-learn (Classification, Regression)', 'Computer Vision (OpenCV)', 'Offline Speech Recognition (Vosk)', 'Raspberry Pi Embedded AI', 'Algorithm Design'],
    summary: 'CSE student at KL University (CGPA 8.5/10) passionate about applying machine learning and computer vision to practical physical systems and simulations. Experienced in training evaluation models with Scikit-learn, building offline speech recognition triggers on edge Raspberry Pi hardware, and programming kinematic traffic simulations.',
    keyProjects: [
      'AI Traffic Flow Simulation: Evaluated intersection queue delays under dynamic flow algorithms.',
      'Emergency Voice Override System: Sub-350ms offline keyword detection using Vosk on Raspberry Pi GPIO.',
    ],
    highlights: [
      'Hands-on edge device deployment without cloud dependency',
      'Simulation of physical systems with mathematical modeling in NumPy',
      'Image processing and feature extraction workflows',
    ],
  },
  {
    id: 'general-software',
    roleTitle: 'General Software / Fresher Resume',
    subtitle: 'Full Stack · CS Fundamentals · Cloud · Problem Solving',
    skillsFocus: ['Data Structures & Algorithms', 'Python & Java', 'React & Web Basics', 'SQL & Databases', 'Docker & Cloud Basics', 'Git Collaboration'],
    summary: 'Versatile Computer Science Engineering student (2023–2027, CGPA 8.5/10) equipped with solid computer science fundamentals, quick learning agility, and end-to-end technical execution across data, software, and cloud environments.',
    keyProjects: [
      'UPI Transaction Analytics (Data & Insights)',
      'Weatherly Application (Full Stack Java/Spring & Docker)',
      'Fertilizer Shop ERP (Business Application)',
    ],
    highlights: [
      'Academic excellence with 8.5 CGPA in core CS coursework at KL University',
      'Adaptable across frontend, backend, data analytics, and automation needs',
      'AWS Certified Cloud Practitioner and Oracle Cloud training',
    ],
  },
];
