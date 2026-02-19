// ─────────────────────────────────────────
// seed.js
// Run this file ONCE to add sample data
// to your MongoDB database
// Command: node seed.js
// ─────────────────────────────────────────

const mongoose = require("mongoose");
require("dotenv").config();

const Job  = require("./models/Job");
const Blog = require("./models/Blog");

const jobs = [
  {
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    type: "Full-time",
    salary: "$80k–$100k",
    description: "We are looking for a skilled Frontend Developer with React experience.",
    email: "hr@techcorp.com",
    tags: ["React", "CSS", "JavaScript"],
  },
  {
    title: "UI/UX Designer",
    company: "DesignHub",
    location: "Mumbai",
    type: "Contract",
    salary: "$60k–$75k",
    description: "Looking for a creative UI/UX Designer to join our product team.",
    email: "hire@designhub.com",
    tags: ["Figma", "Sketch", "Prototyping"],
  },
  {
    title: "Node.js Backend Dev",
    company: "StartupX",
    location: "Bangalore",
    type: "Full-time",
    salary: "$90k–$120k",
    description: "Join our backend team to build scalable REST APIs using Node.js.",
    email: "jobs@startupx.com",
    tags: ["Node", "MongoDB", "REST API"],
  },
  {
    title: "Product Manager",
    company: "ScaleUp Inc",
    location: "Delhi",
    type: "Full-time",
    salary: "$100k–$130k",
    description: "Lead product strategy and work with cross functional teams.",
    email: "pm@scaleup.com",
    tags: ["Agile", "Roadmap", "Analytics"],
  },
  {
    title: "Data Analyst",
    company: "DataViz Co",
    location: "Remote",
    type: "Part-time",
    salary: "$50k–$65k",
    description: "Analyze large datasets and create visualizations for business insights.",
    email: "data@dataviz.com",
    tags: ["Python", "SQL", "Tableau"],
  },
  {
    title: "DevOps Engineer",
    company: "CloudBase",
    location: "Hyderabad",
    type: "Full-time",
    salary: "$95k–$115k",
    description: "Manage cloud infrastructure and CI/CD pipelines.",
    email: "devops@cloudbase.com",
    tags: ["AWS", "Docker", "CI/CD"],
  },
];

const blogs = [
  {
    title: "How to Nail Your Tech Interview in 2025",
    author: "Priya Sharma",
    category: "Career Tips",
    readTime: "5 min",
    excerpt: "Preparing for a technical interview can be daunting. Here is a battle-tested strategy to help you land your dream job.",
    content: "Start by understanding the job description thoroughly. Research the company, its tech stack, and recent news. Practice coding problems on platforms like LeetCode daily. Focus on data structures, algorithms, and system design. Do at least 3 mock interviews with friends or online tools. On the day, communicate your thought process clearly.",
  },
  {
    title: "Remote Work: Tools Every Developer Needs",
    author: "Arjun Mehta",
    category: "Remote Work",
    readTime: "4 min",
    excerpt: "Working from home is the new norm. These tools will keep you productive and connected with your team.",
    content: "Use Slack or Discord for team communication. Notion or Confluence for documentation. GitHub for version control. Figma for design collaboration. Zoom or Google Meet for video calls. A good noise cancelling headset and a stable internet connection are non negotiable.",
  },
  {
    title: "Top 10 In-Demand Skills for 2025",
    author: "Sneha Rao",
    category: "Skills",
    readTime: "6 min",
    excerpt: "The job market evolves fast. Stay ahead of the curve with these highly sought after skills employers want right now.",
    content: "1. AI and Machine Learning basics. 2. Cloud computing with AWS or Azure. 3. React or Next.js for frontend. 4. Node.js or Python for backend. 5. DevOps and CI/CD pipelines. 6. Cybersecurity fundamentals. 7. Data analysis with SQL and Python. 8. Communication and remote collaboration.",
  },
  {
    title: "Building Your Portfolio as a Fresher",
    author: "Karan Patel",
    category: "Career Tips",
    readTime: "7 min",
    excerpt: "No experience? No problem. Here is how to build a compelling portfolio that gets you noticed as a beginner.",
    content: "Start with 3 solid projects that solve real problems. Host them on GitHub and deploy them live using Vercel or Netlify. Write a clean README for each project. Build a personal portfolio website showcasing your projects, skills, and contact info. Contribute to open source even in small ways.",
  },
];

// Connect and seed
async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
        tls: true,
        tlsAllowInvalidCertificates: true,
        });
    console.log("✅ MongoDB Connected");

    // Clear existing data first
    await Job.deleteMany();
    await Blog.deleteMany();
    console.log("🗑️  Cleared existing data");

    // Insert new data
    await Job.insertMany(jobs);
    await Blog.insertMany(blogs);
    console.log("✅ Sample data inserted successfully!");

    process.exit(0); // Exit after seeding
  } catch (error) {
    console.log("❌ Error:", error);
    process.exit(1);
  }
}

seedDB();