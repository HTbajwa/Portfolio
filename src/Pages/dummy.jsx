import { useState, useEffect, useRef } from "react";

// ── STYLES ──────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  :root {
    --bg: #0b1527; --bg2: #0f1e36; --bg3: #152340; --surface: #1a2d4a;
    --border: rgba(74,158,255,0.15); --accent: #4a9eff; --accent2: #7bbfff;
    --text: #e8f1fc; --muted: #7a9bbf; --white: #ffffff;
    --card-r: 14px; --nav-h: 68px;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: var(--bg); color: var(--text);
    font-family: 'DM Sans', sans-serif; font-size: 16px;
    line-height: 1.7; overflow-x: hidden;
  }
  body::before {
    content: ''; position: fixed; inset: 0;
    background-image:
      linear-gradient(rgba(74,158,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(74,158,255,0.03) 1px, transparent 1px);
    background-size: 48px 48px; pointer-events: none; z-index: 0;
  }
  @keyframes pulse {
    0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)}
  }
  @keyframes spin-slow {
    from{transform:rotate(0deg)} to{transform:rotate(360deg)}
  }
  .reveal { opacity:0; transform:translateY(30px); transition:opacity .6s ease,transform .6s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }
  .orb { position:fixed; border-radius:50%; filter:blur(90px); pointer-events:none; z-index:0; opacity:.18; }
  .orb1 { width:480px;height:480px;background:#1d5fa8;top:-120px;left:-100px; }
  .orb2 { width:360px;height:360px;background:#0a3d7a;bottom:10%;right:-80px; }
  section,nav,footer{position:relative;z-index:1;}
`;

// ── SVG ICONS ────────────────────────────────────────────────────────────────
const ExternalIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
    <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const WhatsappIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const ChatIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="#031228">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10h5v-2h-5c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8v1.5c0 .83-.67 1.5-1.5 1.5S17 14.33 17 13.5V12c0-2.76-2.24-5-5-5s-5 2.24-5 5 2.24 5 5 5c1.38 0 2.63-.56 3.54-1.47.65.89 1.77 1.47 2.96 1.47 1.93 0 3.5-1.57 3.5-3.5V12c0-5.52-4.48-10-10-10zm0 13c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
  </svg>
);

// ── SCROLL REVEAL HOOK ───────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ── DATA ─────────────────────────────────────────────────────────────────────
const SKILLS = [
  { title: "Backend", tags: ["Laravel", "PHP", "Node.js", "Express.js", "REST API", "JWT Auth"] },
  { title: "Frontend", tags: ["React.js", "Tailwind CSS", "JavaScript", "HTML5 / CSS3", "Bootstrap", "GSAP"] },
  { title: "Database & Tools", tags: ["MySQL", "MongoDB", "Git / GitHub", "Postman", "Netlify", "Vercel"] },
  { title: "CMS & Other", tags: ["WordPress", "Elementor", "WooCommerce", "Figma", "Linux CLI"] },
];

const PROJECTS = [
  {
    id: 1, cat: "laravel", featured: true,
    title: "Learning Management System (LMS)",
    desc: "A full-featured LMS built for a real client — course creation, enrollment, progress tracking, video lectures, quizzes, and a student dashboard. Laravel 10 backend with a React frontend and role-based auth (admin, instructor, student).",
    stack: ["Laravel 10", "React", "MySQL", "JWT", "Tailwind", "REST API"],
    badge: "Featured · Live Project", badgeClass: "badge-featured",
    videoId: "YOUR_YOUTUBE_VIDEO_ID",
    live: "#", github: "#",
  },
  {
    id: 2, cat: "laravel", featured: true,
    title: "Home Service Booking App",
    desc: "A full-stack service marketplace — customers book home services, providers manage bookings and availability. Admin panel with analytics, payout management, and live status tracking via Pusher.",
    stack: ["Laravel", "React", "MySQL", "Pusher", "Stripe", "REST API"],
    badge: "Featured", badgeClass: "badge-featured",
    videoId: "YOUR_SERVICE_APP_VIDEO_ID",
    live: "#", github: "#",
  },
  {
    id: 3, cat: "react", featured: false,
    title: "E-Commerce Store — Client Dashboard",
    desc: "Client-side of a MERN e-commerce store with authentication, shopping cart, product listing, and order management.",
    stack: ["React", "MongoDB", "Express", "Redux"],
    label: "Ecom Store", badge: "React", badgeClass: "badge-react",
    live: "#", github: "#",
  },
  {
    id: 4, cat: "mern", featured: false,
    title: "E-Commerce Admin Dashboard",
    desc: "Full admin panel for managing products, orders, and users. Secure routes, dynamic charts, and Tailwind-driven UI components.",
    stack: ["React", "Node.js", "MongoDB", "Chart.js"],
    label: "Admin", badge: "MERN", badgeClass: "badge-mern",
    live: "#", github: "#",
  },
  {
    id: 5, cat: "react", featured: false,
    title: "Movie Discovery App",
    desc: "React app using the TMDB public API. Search movies, browse by genre, and view detailed info with a clean responsive UI.",
    stack: ["React", "TMDB API", "Tailwind", "Netlify"],
    label: "Movies", badge: "React", badgeClass: "badge-react",
    live: "#", github: "#",
  },
  {
    id: 6, cat: "wp", featured: false,
    title: "WordPress Business Website",
    desc: "Custom WordPress website with Elementor — responsive design, contact forms, SEO optimization, and WooCommerce integration.",
    stack: ["WordPress", "Elementor", "WooCommerce", "CSS3"],
    label: "WP Site", badge: "WordPress", badgeClass: "badge-wp",
    live: "#",
  },
];

const PORTFOLIO_CONTEXT = `You are a portfolio assistant for a junior Laravel and React developer.
Skills: Laravel, PHP, React.js, JavaScript, MySQL, MongoDB, Node.js, Express, Tailwind CSS, WordPress, REST APIs, Git.
Projects: LMS (Laravel+React, live client project), Home Service Booking App (Laravel+React), E-Commerce Store (MERN), Admin Dashboard (MERN), Movie App (React), WordPress sites.
Certifications: ReactJS Mastery, Envato Web Development, SimpliLearn Database, WordPress Website Completion.
Available: Open to junior developer roles, internships, and freelance work.
Contact: via the form, WhatsApp, or email on this page.
Keep answers short, friendly, and to the point. If asked about salary/rates say "open to discuss based on role/project."`;

// ── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, height:"var(--nav-h)",
      display:"flex", alignItems:"center", justifyContent:"space-between",
      padding:"0 5%", background:"rgba(11,21,39,0.82)", backdropFilter:"blur(14px)",
      borderBottom:"1px solid var(--border)", zIndex:999,
    }}>
      <a href="#hero" style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:800,color:"var(--white)",textDecoration:"none",letterSpacing:"-0.5px"}}>
        Y<span style={{color:"var(--accent)"}}>.</span>dev
      </a>
      <ul style={{display:"flex",gap:32,listStyle:"none"}}>
        {["about","skills","projects","reviews","contact"].map(s => (
          <li key={s}><a href={`#${s}`} style={{color:"var(--muted)",textDecoration:"none",fontSize:14,fontWeight:500,transition:"color .2s",letterSpacing:"0.3px"}}
            onMouseOver={e=>e.target.style.color="var(--accent)"} onMouseOut={e=>e.target.style.color="var(--muted)"}>{s.charAt(0).toUpperCase()+s.slice(1)}</a></li>
        ))}
      </ul>
      <a href="#" download style={{background:"var(--accent)",color:"#031228",fontWeight:600,fontSize:13,padding:"8px 20px",borderRadius:8,textDecoration:"none"}}>Download CV</a>
    </nav>
  );
}

function Hero() {
  const ref = useReveal();
  return (
    <section id="hero" style={{display:"grid",gridTemplateColumns:"1fr 1fr",alignItems:"center",gap:60,minHeight:"100vh",padding:"calc(var(--nav-h) + 40px) 8% 100px"}}>
      <div ref={ref} className="reveal">
        <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(74,158,255,0.1)",border:"1px solid rgba(74,158,255,0.25)",color:"var(--accent2)",fontSize:13,fontWeight:500,padding:"6px 14px",borderRadius:20,marginBottom:24}}>
          <span style={{width:7,height:7,background:"var(--accent)",borderRadius:"50%",display:"inline-block",animation:"pulse 2s infinite"}}/>
          Available for work
        </div>
        <h1 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(40px,5.5vw,72px)",fontWeight:800,color:"var(--white)",lineHeight:1.05,marginBottom:10,letterSpacing:"-1.5px"}}>
          Hi, I'm<br/><span style={{color:"var(--accent)"}}>Your Name</span>
        </h1>
        <p style={{fontSize:18,color:"var(--muted)",marginBottom:20,fontWeight:400}}>Laravel + React Developer</p>
        <p style={{color:"var(--text)",fontSize:15.5,lineHeight:1.8,maxWidth:520,marginBottom:36,opacity:.85}}>
          I build fast, full-stack web applications — clean Laravel APIs on the back, polished React interfaces on the front. Turning complex problems into simple, beautiful products.
        </p>
        <div style={{display:"flex",gap:14,flexWrap:"wrap",marginBottom:48}}>
          <a href="#projects" style={{background:"var(--accent)",color:"#031228",fontWeight:700,fontSize:14,padding:"13px 28px",borderRadius:10,textDecoration:"none",boxShadow:"0 4px 20px rgba(74,158,255,0.25)"}}>View Projects</a>
          <a href="#contact" style={{border:"1.5px solid rgba(74,158,255,0.4)",color:"var(--accent2)",fontWeight:600,fontSize:14,padding:"12px 28px",borderRadius:10,textDecoration:"none"}}>Hire Me</a>
          <a href="https://fiverr.com" target="_blank" rel="noreferrer" style={{color:"var(--muted)",fontWeight:500,fontSize:14,padding:"12px 20px",borderRadius:10,textDecoration:"none",display:"flex",alignItems:"center",gap:6}}>
            <ExternalIcon/> Fiverr Profile
          </a>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          <span style={{fontSize:12,color:"var(--muted)",marginRight:8}}>Find me on</span>
          {[
            {href:"https://github.com",icon:<GithubIcon/>,title:"GitHub"},
            {href:"https://linkedin.com",icon:<LinkedinIcon/>,title:"LinkedIn"},
            {href:"https://wa.me/YOUR_NUMBER",icon:<WhatsappIcon/>,title:"WhatsApp"},
          ].map(({href,icon,title}) => (
            <a key={title} href={href} target="_blank" rel="noreferrer" title={title}
              style={{width:36,height:36,border:"1px solid var(--border)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"var(--muted)",textDecoration:"none",transition:"all .2s"}}
              onMouseOver={e=>{e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.color="var(--accent)";}}
              onMouseOut={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.color="var(--muted)";}}>
              {icon}
            </a>
          ))}
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"center",alignItems:"center",position:"relative"}}>
        <div style={{width:340,height:340,borderRadius:"50%",border:"2px solid rgba(74,158,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",animation:"spin-slow 18s linear infinite"}}>
          <div style={{position:"absolute",width:10,height:10,background:"var(--accent)",borderRadius:"50%",top:12,left:"50%",transform:"translateX(-50%)",boxShadow:"0 0 12px var(--accent)"}}/>
          <div style={{width:280,height:280,borderRadius:"50%",overflow:"hidden",border:"3px solid rgba(74,158,255,0.4)",position:"absolute",animation:"spin-slow 18s linear infinite reverse",background:"var(--surface)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            {/* Replace with: <img src="your-photo.jpg" alt="Your Name" style={{width:"100%",height:"100%",objectFit:"cover"}}/> */}
            <span style={{fontFamily:"Syne,sans-serif",fontSize:72,fontWeight:800,color:"var(--accent)",opacity:.4}}>YN</span>
          </div>
        </div>
        <div style={{position:"absolute",display:"flex",flexDirection:"column",gap:10,right:-30,top:"50%",transform:"translateY(-50%)"}}>
          {[["10+","Projects Built"],["5★","Fiverr Rating"]].map(([num,label]) => (
            <div key={label} style={{background:"rgba(15,30,54,0.9)",border:"1px solid var(--border)",borderRadius:10,padding:"10px 16px",backdropFilter:"blur(10px)",minWidth:140}}>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:800,color:"var(--accent)"}}>{num}</div>
              <div style={{fontSize:11,color:"var(--muted)",marginTop:1}}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [["10+","Projects Delivered"],["2+","Years Learning"],["5★","Client Rating"],["4+","Certifications"]];
  return (
    <div style={{background:"var(--bg2)",borderTop:"1px solid var(--border)",borderBottom:"1px solid var(--border)",padding:"32px 8%",display:"flex",justifyContent:"space-around",gap:24,flexWrap:"wrap",position:"relative",zIndex:1}}>
      {stats.map(([num,desc]) => (
        <div key={desc} style={{textAlign:"center"}}>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:36,fontWeight:800,color:"var(--accent)",lineHeight:1}}>{num}</div>
          <div style={{fontSize:13,color:"var(--muted)",marginTop:4}}>{desc}</div>
        </div>
      ))}
    </div>
  );
}

function Skills() {
  const r1 = useReveal(), r2 = useReveal();
  return (
    <section id="skills" style={{padding:"100px 8%",background:"var(--bg2)"}}>
      <div ref={r1} className="reveal">
        <p style={{fontSize:11,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--accent)",marginBottom:12}}>What I work with</p>
        <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(32px,4vw,48px)",fontWeight:700,color:"var(--white)",lineHeight:1.15,marginBottom:20}}>Skills & Technologies</h2>
        <p style={{color:"var(--muted)",fontSize:16,maxWidth:560,lineHeight:1.75}}>A full-stack toolkit — from database design to polished UI, covering the MERN and LAMP worlds.</p>
      </div>
      <div ref={r2} className="reveal" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:20,marginTop:48}}>
        {SKILLS.map(({title,tags}) => (
          <div key={title} style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--card-r)",padding:24}}>
            <p style={{fontSize:11,fontWeight:600,letterSpacing:"1.8px",textTransform:"uppercase",color:"var(--accent)",marginBottom:16}}>{title}</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {tags.map(tag => (
                <span key={tag} style={{background:"rgba(74,158,255,0.08)",border:"1px solid rgba(74,158,255,0.2)",color:"var(--accent2)",fontSize:13,fontWeight:500,padding:"5px 12px",borderRadius:6,cursor:"default"}}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function VideoPlaceholder({ videoId, label, onLoad }) {
  return (
    <div onClick={() => onLoad(videoId)}
      style={{width:"100%",aspectRatio:"16/9",background:"var(--bg3)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:10,color:"var(--muted)",fontSize:13,cursor:"pointer"}}>
      <div style={{width:56,height:56,background:"rgba(74,158,255,0.15)",border:"2px solid var(--accent)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{width:0,height:0,borderStyle:"solid",borderWidth:"9px 0 9px 18px",borderColor:"transparent transparent transparent var(--accent)",marginLeft:4}}/>
      </div>
      <span>{label}</span>
    </div>
  );
}

function ProjectCard({ project }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const badgeColors = {
    "badge-featured":{bg:"var(--accent)",color:"#031228"},
    "badge-react":{bg:"#0d3a5c",color:"#61dafb",border:"1px solid #0e5a8a"},
    "badge-laravel":{bg:"#3d1515",color:"#f87171",border:"1px solid #6b2020"},
    "badge-mern":{bg:"#0a3d28",color:"#4ade80",border:"1px solid #0f6040"},
    "badge-wp":{bg:"#1a2f44",color:"#7bbfff",border:"1px solid #1e4265"},
  };
  const bc = badgeColors[project.badgeClass] || {};

  return (
    <div style={{
      background:"var(--surface)", border:`1px solid ${project.featured ? "rgba(74,158,255,0.4)" : "var(--border)"}`,
      borderRadius:"var(--card-r)", overflow:"hidden", display:"flex", flexDirection:"column",
      gridColumn: project.featured ? "span 2" : "span 1",
      transition:"transform .25s,box-shadow .25s,border-color .25s",
    }}
      onMouseOver={e=>{e.currentTarget.style.transform="translateY(-5px)";e.currentTarget.style.boxShadow="0 16px 50px rgba(0,0,0,0.35)";e.currentTarget.style.borderColor="rgba(74,158,255,0.4)";}}
      onMouseOut={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow="";e.currentTarget.style.borderColor=project.featured?"rgba(74,158,255,0.4)":"var(--border)";}}>

      <div style={{position:"relative"}}>
        {project.videoId ? (
          videoLoaded
            ? <div style={{aspectRatio:"16/9",background:"#000",overflow:"hidden"}}>
                <iframe src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1`} style={{width:"100%",height:"100%",border:0}} allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowFullScreen/>
              </div>
            : <VideoPlaceholder videoId={project.videoId} label={`Watch ${project.title} Demo`} onLoad={() => setVideoLoaded(true)}/>
        ) : (
          <div style={{width:"100%",aspectRatio:"16/9",background:"linear-gradient(135deg,var(--bg3) 0%,rgba(74,158,255,0.08) 100%)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Syne,sans-serif",fontSize:40,fontWeight:800,color:"rgba(74,158,255,0.25)",letterSpacing:"-2px",position:"relative",overflow:"hidden"}}>
            {project.label}
            <div style={{position:"absolute",bottom:0,left:0,right:0,height:3,background:"linear-gradient(90deg,var(--accent),transparent)"}}/>
          </div>
        )}
        <span style={{position:"absolute",top:12,left:12,fontSize:10,fontWeight:700,letterSpacing:"1px",textTransform:"uppercase",padding:"4px 10px",borderRadius:20,...bc}}>{project.badge}</span>
      </div>

      <div style={{padding:22,flex:1,display:"flex",flexDirection:"column"}}>
        <h3 style={{fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:700,color:"var(--white)",marginBottom:8}}>{project.title}</h3>
        <p style={{fontSize:14,color:"var(--muted)",lineHeight:1.7,flex:1,marginBottom:18}}>{project.desc}</p>
        <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:18}}>
          {project.stack.map(t => <span key={t} style={{fontSize:11,fontWeight:500,padding:"3px 9px",borderRadius:4,background:"rgba(74,158,255,0.07)",border:"1px solid rgba(74,158,255,0.15)",color:"var(--muted)"}}>{t}</span>)}
        </div>
        <div style={{display:"flex",gap:10}}>
          {project.live && <a href={project.live} target="_blank" rel="noreferrer" style={{fontSize:13,fontWeight:600,textDecoration:"none",color:"var(--accent)",display:"flex",alignItems:"center",gap:5,border:"1px solid rgba(74,158,255,0.25)",padding:"6px 14px",borderRadius:7,background:"rgba(74,158,255,0.05)"}}>
            <ExternalIcon/> Live Demo
          </a>}
          {project.github && <a href={project.github} target="_blank" rel="noreferrer" style={{fontSize:13,fontWeight:600,textDecoration:"none",color:"var(--accent)",display:"flex",alignItems:"center",gap:5,border:"1px solid rgba(74,158,255,0.25)",padding:"6px 14px",borderRadius:7,background:"rgba(74,158,255,0.05)"}}>
            <GithubIcon size={13}/> GitHub
          </a>}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState("all");
  const r1 = useReveal(), r2 = useReveal(), r3 = useReveal();
  const filters = ["all","laravel","react","mern","wp"];
  const labels = {all:"All",laravel:"Laravel",react:"React",mern:"MERN Stack",wp:"WordPress"};
  const visible = PROJECTS.filter(p => filter === "all" || p.cat === filter);

  return (
    <section id="projects" style={{padding:"100px 8%"}}>
      <div ref={r1} className="reveal">
        <p style={{fontSize:11,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--accent)",marginBottom:12}}>What I've built</p>
        <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(32px,4vw,48px)",fontWeight:700,color:"var(--white)",lineHeight:1.15,marginBottom:20}}>My Projects</h2>
        <p style={{color:"var(--muted)",fontSize:16,maxWidth:560,lineHeight:1.75}}>Real-world apps built from scratch — some for clients, some to push my limits.</p>
      </div>
      <div ref={r2} className="reveal" style={{display:"flex",gap:10,marginTop:40,marginBottom:36,flexWrap:"wrap"}}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{background: filter===f ? "var(--accent)" : "transparent", color: filter===f ? "#031228" : "var(--muted)", border:`1px solid ${filter===f ? "var(--accent)" : "var(--border)"}`, fontSize:13, fontWeight:500, padding:"7px 18px", borderRadius:20, cursor:"pointer", fontFamily:"inherit", transition:"all .2s"}}>
            {labels[f]}
          </button>
        ))}
      </div>
      <div ref={r3} className="reveal" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:24}}>
        {visible.map(p => <ProjectCard key={p.id} project={p}/>)}
      </div>
    </section>
  );
}

function Reviews() {
  const r1 = useReveal(), r2 = useReveal();
  return (
    <section id="reviews" style={{padding:"100px 8%",background:"var(--bg2)"}}>
      <div ref={r1} className="reveal">
        <p style={{fontSize:11,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--accent)",marginBottom:12}}>What clients say</p>
        <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(32px,4vw,48px)",fontWeight:700,color:"var(--white)",lineHeight:1.15}}>Client Review</h2>
      </div>
      <div ref={r2} className="reveal" style={{maxWidth:680,margin:"48px auto 0",background:"var(--surface)",border:"1px solid rgba(74,158,255,0.3)",borderRadius:18,padding:40,position:"relative"}}>
        <div style={{fontFamily:"Syne,sans-serif",fontSize:80,fontWeight:800,color:"var(--accent)",opacity:.15,position:"absolute",top:10,left:28,lineHeight:1}}>"</div>
        <div style={{color:"#f59e0b",fontSize:18,marginBottom:16}}>★★★★★</div>
        <p style={{fontSize:17,lineHeight:1.8,color:"var(--text)",fontStyle:"italic",marginBottom:28,position:"relative",zIndex:1}}>
          "Working with [Your Name] on our LMS was an excellent experience. He understood our requirements from day one, delivered clean and well-structured code, and was always available to address feedback. The platform runs flawlessly — I'd hire him again without hesitation."
        </p>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{width:48,height:48,borderRadius:"50%",background:"rgba(74,158,255,0.2)",border:"2px solid rgba(74,158,255,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:17,color:"var(--accent)"}}>AK</div>
          <div>
            <p style={{fontWeight:600,color:"var(--white)",fontSize:15}}>Ahmed Khan</p>
            <p style={{fontSize:13,color:"var(--muted)"}}>CEO, EduPlatform (LMS Client)</p>
          </div>
          <div style={{marginLeft:"auto",fontSize:12,color:"var(--muted)",border:"1px solid var(--border)",padding:"4px 10px",borderRadius:6}}>Verified Client</div>
        </div>
      </div>
    </section>
  );
}

function Freelance() {
  const r1 = useReveal(), r2 = useReveal();
  return (
    <section id="freelance" style={{padding:"100px 8%"}}>
      <div ref={r1} className="reveal">
        <p style={{fontSize:11,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--accent)",marginBottom:12}}>Freelance & Hire</p>
        <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(32px,4vw,48px)",fontWeight:700,color:"var(--white)",lineHeight:1.15,marginBottom:20}}>Available on Fiverr</h2>
      </div>
      <div ref={r2} className="reveal" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,marginTop:48,alignItems:"center"}}>
        <div>
          <h3 style={{fontFamily:"Syne,sans-serif",fontSize:26,fontWeight:700,color:"var(--white)",marginBottom:14}}>Let's build something together</h3>
          <p style={{color:"var(--muted)",fontSize:15,lineHeight:1.8,marginBottom:24}}>
            I'm available for freelance projects on Fiverr — Laravel APIs, React frontends, MERN stack apps, and WordPress sites. Fast delivery, clean code, and clear communication throughout.
          </p>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <a href="https://fiverr.com" target="_blank" rel="noreferrer" style={{background:"var(--accent)",color:"#031228",fontWeight:700,fontSize:14,padding:"13px 28px",borderRadius:10,textDecoration:"none"}}>View Fiverr Gig</a>
            <a href="https://wa.me/YOUR_NUMBER" target="_blank" rel="noreferrer" style={{border:"1.5px solid rgba(74,158,255,0.4)",color:"var(--accent2)",fontWeight:600,fontSize:14,padding:"12px 28px",borderRadius:10,textDecoration:"none"}}>WhatsApp Me</a>
          </div>
        </div>
        <div style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:"var(--card-r)",overflow:"hidden"}}>
          <div style={{width:"100%",aspectRatio:"16/9",background:"var(--bg3)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:12,color:"var(--muted)",fontSize:14}}>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:28,fontWeight:800,color:"#1dbf73"}}>fiverr</div>
            <p style={{color:"var(--muted)",fontSize:13}}>Paste your Fiverr gig video embed here</p>
            <span style={{fontSize:12,color:"var(--muted)"}}>or add a screenshot of your gig</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const r1 = useReveal(), r2 = useReveal();
  const [btnState, setBtnState] = useState("idle");

  function handleSubmit(e) {
    e.preventDefault();
    setBtnState("sending");
    setTimeout(() => {
      setBtnState("sent");
      setTimeout(() => { setBtnState("idle"); e.target.reset(); }, 3000);
    }, 1200);
  }

  const btnText = { idle:"Send Message", sending:"Sending...", sent:"Message Sent! ✓" };
  const btnBg = { idle:"var(--accent)", sending:"var(--accent)", sent:"#1a7a3c" };

  return (
    <section id="contact" style={{padding:"100px 8%",background:"var(--bg2)"}}>
      <div ref={r1} className="reveal">
        <p style={{fontSize:11,fontWeight:600,letterSpacing:"2.5px",textTransform:"uppercase",color:"var(--accent)",marginBottom:12}}>Get in touch</p>
        <h2 style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(32px,4vw,48px)",fontWeight:700,color:"var(--white)",lineHeight:1.15,marginBottom:20}}>Let's Work Together</h2>
        <p style={{color:"var(--muted)",fontSize:16,maxWidth:560,lineHeight:1.75}}>I'm open to junior developer roles, internships, and freelance projects. Drop me a message.</p>
      </div>
      <div ref={r2} className="reveal" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:60,marginTop:48}}>
        <div>
          <h3 style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:700,color:"var(--white)",marginBottom:14}}>Reach me directly</h3>
          <p style={{color:"var(--muted)",fontSize:15,lineHeight:1.8,marginBottom:28}}>Whether you have a project in mind or want to discuss an opportunity — I'll get back within 24 hours.</p>
          <div style={{display:"flex",flexDirection:"column",gap:12}}>
            {[
              {href:"mailto:your@email.com",icon:"✉",label:"your@email.com",sub:"Email me anytime"},
              {href:"https://wa.me/YOUR_NUMBER",icon:"💬",label:"WhatsApp",sub:"+92 XXX XXXXXXX"},
              {href:"https://linkedin.com",icon:"in",label:"LinkedIn",sub:"Connect professionally"},
              {href:"https://github.com",icon:<GithubIcon size={14}/>,label:"GitHub",sub:"See my code"},
            ].map(({href,icon,label,sub}) => (
              <a key={label} href={href} target="_blank" rel="noreferrer"
                style={{display:"flex",alignItems:"center",gap:12,color:"var(--text)",textDecoration:"none",fontSize:14,padding:"12px 16px",background:"var(--surface)",border:"1px solid var(--border)",borderRadius:10,transition:"all .2s"}}
                onMouseOver={e=>{e.currentTarget.style.borderColor="var(--accent)";e.currentTarget.style.background="rgba(74,158,255,0.05)";}}
                onMouseOut={e=>{e.currentTarget.style.borderColor="var(--border)";e.currentTarget.style.background="var(--surface)";}}>
                <div style={{width:36,height:36,background:"rgba(74,158,255,0.1)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{icon}</div>
                <div>
                  <div style={{fontWeight:500,fontSize:14}}>{label}</div>
                  <div style={{fontSize:12,color:"var(--muted)"}}>{sub}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
            {[["Name","text","Your name"],["Email","email","your@email.com"]].map(([label,type,ph]) => (
              <div key={label} style={{display:"flex",flexDirection:"column",gap:6}}>
                <label style={{fontSize:12,fontWeight:500,color:"var(--muted)",letterSpacing:"0.5px"}}>{label}</label>
                <input type={type} placeholder={ph} required style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:9,padding:"12px 14px",color:"var(--text)",fontFamily:"inherit",fontSize:14,outline:"none"}}/>
              </div>
            ))}
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={{fontSize:12,fontWeight:500,color:"var(--muted)",letterSpacing:"0.5px"}}>Subject</label>
            <input type="text" placeholder="Job opportunity / Project inquiry" style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:9,padding:"12px 14px",color:"var(--text)",fontFamily:"inherit",fontSize:14,outline:"none"}}/>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <label style={{fontSize:12,fontWeight:500,color:"var(--muted)",letterSpacing:"0.5px"}}>Message</label>
            <textarea placeholder="Tell me about the role or project..." style={{background:"var(--surface)",border:"1px solid var(--border)",borderRadius:9,padding:"12px 14px",color:"var(--text)",fontFamily:"inherit",fontSize:14,outline:"none",resize:"none",height:110}}/>
          </div>
          <button type="submit" disabled={btnState==="sending"} style={{background:btnBg[btnState],color:"#031228",fontWeight:700,fontSize:14,padding:14,borderRadius:10,border:"none",cursor:"pointer",fontFamily:"inherit",transition:"background .2s"}}>
            {btnText[btnState]}
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{background:"var(--bg)",borderTop:"1px solid var(--border)",padding:"32px 8%",display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,flexWrap:"wrap",position:"relative",zIndex:1}}>
      <p style={{fontSize:13,color:"var(--muted)"}}>© 2025 Your Name · Laravel & React Developer · Built with ❤️</p>
      <a href="#" download style={{background:"rgba(74,158,255,0.1)",border:"1px solid rgba(74,158,255,0.3)",color:"var(--accent)",padding:"10px 24px",borderRadius:8,textDecoration:"none",fontSize:14,fontWeight:600}}>Download CV</a>
    </footer>
  );
}

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role:"bot", text:"Hi! 👋 I'm an AI assistant for this portfolio. Ask me anything — skills, projects, availability, or how to get in touch!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const msgsRef = useRef(null);

  useEffect(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; }, [messages]);

  async function send() {
    const msg = input.trim();
    if (!msg || loading) return;
    setInput("");
    setMessages(m => [...m, {role:"user",text:msg}, {role:"bot",text:"Thinking..."}]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:300, system:PORTFOLIO_CONTEXT, messages:[{role:"user",content:msg}] }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, couldn't get a response right now.";
      setMessages(m => [...m.slice(0,-1), {role:"bot",text:reply}]);
    } catch {
      setMessages(m => [...m.slice(0,-1), {role:"bot",text:"Couldn't connect. Please use the contact form instead!"}]);
    }
    setLoading(false);
  }

  return (
    <>
      <button onClick={() => setOpen(o => !o)}
        style={{position:"fixed",bottom:28,right:28,width:56,height:56,background:"var(--accent)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:9999,boxShadow:"0 4px 24px rgba(74,158,255,0.4)",border:"none",transition:"transform .2s"}}>
        <ChatIcon/>
      </button>
      {open && (
        <div style={{position:"fixed",bottom:96,right:28,width:360,maxHeight:480,background:"var(--bg2)",border:"1px solid rgba(74,158,255,0.3)",borderRadius:18,display:"flex",flexDirection:"column",zIndex:9998,overflow:"hidden",boxShadow:"0 16px 60px rgba(0,0,0,0.5)"}}>
          <div style={{background:"var(--accent)",padding:"14px 18px",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:32,height:32,background:"rgba(3,18,40,0.3)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,color:"var(--accent2)"}}>AI</div>
            <div>
              <p style={{fontSize:14,fontWeight:600,color:"#031228",lineHeight:1.2}}>Portfolio Assistant</p>
              <span style={{fontSize:11,color:"rgba(3,18,40,0.6)"}}>Ask about skills, projects, or availability</span>
            </div>
          </div>
          <div ref={msgsRef} style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:10}}>
            {messages.map((m,i) => (
              <div key={i} style={{maxWidth:"80%",padding:"10px 14px",borderRadius: m.role==="user" ? "12px 4px 12px 12px" : "4px 12px 12px 12px",fontSize:13,lineHeight:1.6,background: m.role==="user" ? "var(--accent)" : "var(--surface)",color: m.role==="user" ? "#031228" : "var(--text)",alignSelf: m.role==="user" ? "flex-end" : "flex-start",border: m.role==="bot" ? "1px solid var(--border)" : "none",fontWeight: m.role==="user" ? 500 : 400}}>
                {m.text}
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:8,padding:"12px 14px",borderTop:"1px solid var(--border)"}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask something..."
              style={{flex:1,background:"var(--surface)",border:"1px solid var(--border)",borderRadius:8,padding:"9px 12px",color:"var(--text)",fontFamily:"inherit",fontSize:13,outline:"none"}}/>
            <button onClick={send} disabled={loading} style={{background:"var(--accent)",border:"none",color:"#031228",fontWeight:700,fontSize:13,padding:"9px 16px",borderRadius:8,cursor:"pointer",fontFamily:"inherit"}}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

// ── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <>
      <style>{css}</style>
      <div className="orb orb1"/>
      <div className="orb orb2"/>
      <Navbar/>
      <Hero/>
      <StatsBar/>
      <Skills/>
      <Projects/>
      <Reviews/>
      <Freelance/>
      <Contact/>
      <Footer/>
      <Chatbot/>
    </>
  );
}