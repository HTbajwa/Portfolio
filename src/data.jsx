import {
  
    css,
    
    html,
    javascript, 
    react,
    
    tailwindcss,
    wordpress,
    bootstrap,
    nodejs,
    mongodb,
    express,
    github,
    git,

  } from "./assets/icons";
import{
    webdesigner,
    
    Student,
    Freelancer,
    portfolio1,
    portfolio2,
    portfolio3,
    prtfolio4,
    portfolio5,
    potfolio6
} from "./assets/images/index.js"
import certificate4 from "./assets/images/certificate4.png";
import certificate3 from "./assets/images/certificate3.png";
import certificate2 from "./assets/images/certificate2.png";
import certificate1 from "./assets/images/certificate1.png";

  export const Skills = [
    {
      bgColor: '#3297FE',
      text: 'HTML',
      icon: html
    },
    {
      bgColor: '#C8E7F1',
      text: 'CSS',
      icon: css
    },
    {
      bgColor: '#291706',
      text: 'JavaScript',
      icon: javascript
    },
    {
      bgColor: '#2F2FA2',
      text: 'React',
      icon: react
    },
    {
      bgColor: '#B0AEFF',
      text: 'TailwindCSS',
      icon: tailwindcss
    },
    {
      bgColor: '#CAF1DE',
      text: 'WordPress',
      icon: wordpress
    },
    {
      bgColor: '#F9ACB1',
      text: 'Bootstrap',
      icon: bootstrap
    },
    // {
    //   bgColor: '#F9ACB1',
    //   text: 'Node Js',
    //   icon: nodejs
    // },
    // {
    //   bgColor: '#F9ACB1',
    //   text: 'Mongo DB',
    //   icon: mongodb
    // },
    // {
    //   bgColor: '#F9ACB1',
    //   text: 'Express',
    //   icon: express
  
    {
      bgColor: '#ffff',
      text: 'Github',
      icon: github
    },
    {
      bgColor: '#FF6C37',
      text: 'Git',
      icon: git
    },
  ];
  export const Experience=[

    
      {
        image: certificate4,
        text: "ReactJs Mastery Course",
        paragraph:
          "Completed an advanced React.js course focused on component-driven development, hooks, state management, and building scalable web applications.",
      },
      {
        image: certificate3,
        text: "Erozgar Web Development",
        paragraph:
          "Successfully completed the E-Rozgaar web development training program, covering frontend and backend technologies essential for freelance and industry-ready skills.",
      },
      {
        image: certificate2,
        text: "SimpliLearn Database",
        paragraph:
          "Completed a database fundamentals course by SimpliLearn, gaining hands-on experience in SQL, relational databases, and data modeling techniques.",
      },
      {
        image: certificate1,
        text: "WordPress Website Completion",
        paragraph:
          "Developed and deployed a full WordPress website, marking the beginning of my freelancing journey and first practical experience with CMS-based development.",
      },

    
  ];
  export const cards = [
    {
      image: portfolio1,
      title: 'Epic Legion',
      description: 'Contributed to an animated website showcasing Minecraft modpacks. Collaborated with an amazing team of devs from a Discord server.',
      tags: ['Best']
    },
    {
      image: portfolio2,
      title: 'Weather App',
      description: 'Created a minimal weather app for learning APIs and charts. Overcame challenges in fetching images of countries.',
      tags: ['Best']
    },
    {
      image: portfolio3,
      title: 'Guess The Number',
      description: 'Developed a JavaScript game where players guess a randomly generated number between 1 to 20. Inspired by a course and design by.',
      tags: ['Dynamic']
    },
    {
      image: prtfolio4,
      title: 'Pick Game',
      description: 'Created a 2-player JavaScript game where the goal is to reach 100 points by rolling dice. Be cautious, rolling a 1.',
      tags: ['Dynamic']
    },
    {
      image: portfolio5,
      title: 'Pick Game',
      description: 'Created a 2-player JavaScript game where the goal is to reach 100 points by rolling dice. Be cautious, rolling a 1.',
      tags: ['Static']
    },
    {
      image: potfolio6,
      title: 'Pick Game',
      description: 'Created a 2-player JavaScript game where the goal is to reach 100 points by rolling dice. Be cautious, rolling a 1.',
      tags: ['Static']
    }
  ];