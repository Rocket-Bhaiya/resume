import type { ParseResumeDataOutput } from '@/ai/flows/parse-resume-data';

export const initialResumeData: ParseResumeDataOutput = {
  name: "Riya Srivastava",
  email: "riya810srivastava@gmail.com",
  phone: "+91 7985042683",
  location: "Shahjahanpur, India",
  github: "https://github.com/riya810sri?tab=repositories",
  linkedin: "https://www.linkedin.com/in/riya-srivastava-5649b72a6/",
  objective:
    "Creative and results-driven Computer Science undergraduate skilled in React.js, JavaScript, and UI/UX. Seeking a front-end internship at a dynamic startup to deliver high-impact, scalable web experiences.",
  education: [
    {
      institution: "Shri Siddhi Vinayak Institute of Technology",
      degree: "B.tech in Computer Science & Engineering",
      graduationYear: "2022–2026",
      cgpa: "8.3",
    },
    {
      institution: "KV No.1, Shahjahanpur",
      degree: "Senior Secondary (XII), CBSE",
      graduationYear: "2022",
      cgpa: "84.6%",
    },
  ],
  skills: [
    "JavaScript", "Python", "java", "HTML", "CSS", "SQL", "MongoDB", "MySQL", "Express.js",
    "React.js", "Node.js", "Chart.js", "Tailwind CSS",
    "Git", "GitHub", "Firebase", "VS Code", "APIs",
    "Responsive Design", "REST APIs", "UI/UX Principles", "Web Security Basics"
  ],
  projects: [
    {
      name: "Techonquer – Cybersecurity Learning Platform (User Portal & admin portal)",
      description: "Built and deployed a responsive web application for Techonquer, a cybersecurity education platform. Implemented secure user authentication, interactive UI for browsing courses and labs, and real-time updates using React.js and Tailwind CSS. Focused on delivering a user-friendly experience to facilitate learning and participation in cybersecurity challenges and events.",
    },
    {
      name: "Library Management System | Python, Tkinter, MySQL",
      description: "GUI app for book issue/return, admin login, and real-time updates with MySQL backend.",
    },
    {
      name: "Zerodha Dashboard Clone | React.js, Node.js",
      description: "Trading dashboard with live charting and simulated orders.",
    },
    {
      name: "Portfolio Website | HTML, CSS, JavaScript",
      description: "Personal site with responsive sections, resume download, contact form.",
    },
    {
      name: "Weather Forecast App | JavaScript, OpenWeather API",
      description: "Mobile-responsive weather forecast with API integration.",
    },
    {
      name: "Samadhaan – Student Help System | React.js, Firebase",
      description: "Chatbot-enabled portal for student queries and issue tracking.",
    },
  ],
  experience: [
    {
      title: "MERN Stack Intern",
      company: "Durbhasi Gurukulam Private Limited",
      dates: "6 Months",
      description: "Gained hands-on experience with the MERN stack (MongoDB, Express.js, React.js, Node.js), Java, and MySQL. Contributed to the development of web applications, focusing on both front-end and back-end tasks.",
    },
    {
      title: "Virtual Technology Intern",
      company: "Deloitte Simulation",
      dates: "Jun 2025",
      description: "Built a client-focused data dashboard during Deloitte's virtual experience.",
    },
    {
      title: "Frontend Intern",
      company: "Code Alpha",
      dates: "Nov 2024",
      description: "Built React components, used Git versioning, worked in Agile.",
    },
    {
      title: "Web Dev Intern",
      company: "Aadi Foundation",
      dates: "Oct–Nov 2024",
      description: "Created mobile-friendly pages and improved site usability.",
    },
    {
      title: 'Wix Website Designer',
      company: 'Tech for Women',
      dates: 'Date Range (Placeholder)',
      description:
        'Designed and developed a website with a “Women in Tech” theme using Wix. Responsibilities included customizing templates, creating layouts and color schemes, and performing market research to enhance website structure and content for a user-centric experience.',
    },
  ],
  certifications: [
    "Frontend Web Development – Reliance Foundation",
    "Ethical Hacking – Internshala",
    "Java – Namsoftech",
    "web development – Aadi foundation",
  ],
  achievements: [
    "Gold Medalist – Academic Topper 2022–23",
    "Mastercard Cybersecurity Program – Mar 2025",
  ],
  languages: ["English (Fluent)", "Hindi (Native)"],
};
