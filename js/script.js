// ===== AOS =====
AOS.init({duration:800,once:true,offset:60});

// ===== Year =====
document.getElementById('yr').textContent = new Date().getFullYear();

// ===== Scroll progress + nav =====
const sp = document.getElementById('scrollProgress');
const nav = document.getElementById('mainNav');
window.addEventListener('scroll',()=>{
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  sp.style.width = pct + '%';
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// ===== Typing effect =====
const words = ['Professional Video Editor','Motion Graphics Artist','Content Creator','Color Grading Specialist'];
const typed = document.getElementById('typed');
let wi=0, ci=0, deleting=false;
function tick(){
  const w = words[wi];
  typed.textContent = w.slice(0, ci);
  if(!deleting && ci < w.length){ ci++; setTimeout(tick, 80); }
  else if(deleting && ci > 0){ ci--; setTimeout(tick, 40); }
  else{
    if(!deleting){ deleting=true; setTimeout(tick, 1400); }
    else{ deleting=false; wi=(wi+1)%words.length; setTimeout(tick, 200); }
  }
}
tick();

// ===== Counters =====
const counters = document.querySelectorAll('.counter');
const cObs = new IntersectionObserver(es=>{
  es.forEach(e=>{
    if(e.isIntersecting){
      const el = e.target, target = +el.dataset.target;
      let n=0, step=Math.max(1,target/60);
      const t=setInterval(()=>{ n+=step; if(n>=target){el.textContent=target;clearInterval(t)} else el.textContent=Math.ceil(n); },25);
      cObs.unobserve(el);
    }
  });
},{threshold:.5});
counters.forEach(c=>cObs.observe(c));

// ===== Skills =====
const skills = [
  {name:'Adobe Premiere Pro', icon:'fa-film', val:95},
  {name:'After Effects', icon:'fa-wand-magic-sparkles', val:90},
  {name:'Photoshop', icon:'fa-image', val:92},
  {name:'Illustrator', icon:'fa-pen-nib', val:85},
  {name:'InDesign', icon:'fa-newspaper', val:78},
  {name:'Lightroom', icon:'fa-sliders', val:88},
  {name:'Adobe XD', icon:'fa-display', val:75},
  {name:'Figma', icon:'fa-shapes', val:82},
  {name:'Color Grading', icon:'fa-palette', val:88},
  {name:'Sound Editing', icon:'fa-music', val:80},
  {name:'Social Media Reels', icon:'fa-mobile-screen', val:94},
];
const skillsGrid = document.getElementById('skillsGrid');
skillsGrid.innerHTML = skills.map(s=>`
  <div class="col-sm-6 col-lg-4 col-xl-3" data-aos="fade-up">
    <div class="skill-card">
      <div class="ic"><i class="fa-solid ${s.icon}"></i></div>
      <h6 class="mb-0">${s.name}</h6>
      <div class="d-flex justify-content-between small text-muted-2 mt-2"><span>Proficiency</span><span>${s.val}%</span></div>
      <div class="progress-bar-c"><span data-w="${s.val}"></span></div>
    </div>
  </div>`).join('');
const pObs = new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){ e.target.style.width = e.target.dataset.w + '%'; pObs.unobserve(e.target); }
}),{threshold:.3});
document.querySelectorAll('.progress-bar-c span').forEach(p=>pObs.observe(p));

// ===== Projects =====
const thumb = (q,c1,c2) => `https://images.unsplash.com/${q}?auto=format&fit=crop&w=900&q=70`;
const projects = [
  {t:'Brand Commercial Spot', cat:'ads', img:'photo-1492691527719-9d1e07e534b4', desc:'30-second high-energy commercial with kinetic typography and dynamic transitions.', client:'Local Brand', soft:'Premiere Pro, After Effects', dur:'0:30'},
  {t:'Product Hero Video', cat:'product', img:'photo-1556761175-5973dc0f32e7', desc:'Sleek product showcase with macro footage and smooth color grading.', client:'E-commerce Studio', soft:'Premiere Pro, DaVinci', dur:'1:15'},
  {t:'Cinematic Wedding Film', cat:'wedding', img:'photo-1519741497674-611481863552', desc:'Emotional wedding highlight with color grading & music sync.', client:'Kalakruti Studio', soft:'Premiere Pro, Lightroom', dur:'4:20'},
  {t:'Instagram Reel Pack', cat:'reels', img:'photo-1611162617213-7d7a39e9b1d7', desc:'Trendy vertical reels with text animation, optimized for engagement.', client:'Creator Agency', soft:'After Effects, Premiere', dur:'0:15 ×6'},
  {t:'YouTube Long-form Edit', cat:'youtube', img:'photo-1611162616305-c69b3fa7fbe0', desc:'Engaging long-form edit with b-roll, sound design and graphics.', client:'YouTube Creator', soft:'Premiere Pro', dur:'12:00'},
  {t:'Music Video Cut', cat:'music', img:'photo-1493225457124-a3eb161ffa5f', desc:'Beat-synced music video with rhythmic cuts and color FX.', client:'Indie Artist', soft:'Premiere Pro, AE', dur:'3:45'},
  {t:'Corporate Explainer', cat:'corporate', img:'photo-1552664730-d307ca884978', desc:'Animated explainer for B2B SaaS with kinetic infographics.', client:'Tech Co.', soft:'After Effects, Illustrator', dur:'1:50'},
  {t:'Ad Campaign — Festive', cat:'ads', img:'photo-1542744173-8e7e53415bb0', desc:'Festive ad campaign with vibrant grade and motion typography.', client:'Retail Brand', soft:'Premiere Pro, AE', dur:'0:45'},
  {t:'Reel — Travel Aesthetic', cat:'reels', img:'photo-1469854523086-cc02fe5d8800', desc:'Travel aesthetic reel with smooth transitions and warm grade.', client:'Travel Creator', soft:'Premiere Pro', dur:'0:30'},
];
const pg = document.getElementById('projectsGrid');
function renderProjects(filter){
  pg.innerHTML='';
  projects.filter(p=>filter==='all'||p.cat===filter).forEach((p,i)=>{
    const el = document.createElement('div');
    el.className='col-sm-6 col-lg-4';
    el.setAttribute('data-aos','fade-up');
    el.innerHTML = `
      <div class="project-card" data-i="${projects.indexOf(p)}">
        <img src="${thumb(p.img)}" alt="${p.t}" loading="lazy">
        <div class="play"><i class="fa-solid fa-play"></i></div>
        <div class="overlay">
          <span class="cat">${p.cat}</span>
          <h5 class="mb-0 mt-1">${p.t}</h5>
        </div>
      </div>`;
    pg.appendChild(el);
  });
  AOS.refresh();
}
renderProjects('all');
document.querySelectorAll('.filter-btn').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.filter-btn').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); renderProjects(b.dataset.filter);
}));
const pm = new bootstrap.Modal(document.getElementById('projectModal'));
document.addEventListener('click',e=>{
  const card = e.target.closest('.project-card');
  if(!card) return;
  const p = projects[+card.dataset.i];
  document.getElementById('pmTitle').textContent = p.t;
  document.getElementById('pmImg').src = thumb(p.img);
  document.getElementById('pmDesc').textContent = p.desc;
  document.getElementById('pmClient').textContent = p.client;
  document.getElementById('pmSoft').textContent = p.soft;
  document.getElementById('pmDur').textContent = p.dur;
  pm.show();
});

// ===== Services =====
const services = [
  {t:'Video Editing', d:'End-to-end editing for any narrative with rhythm and emotion.', i:'fa-film'},
  {t:'Motion Graphics', d:'Bold kinetic typography and animated graphics that pop.', i:'fa-wand-magic-sparkles'},
  {t:'Color Grading', d:'Cinematic looks tailored to your brand or mood.', i:'fa-palette'},
  {t:'YouTube Editing', d:'Retention-optimized cuts, b-roll, SFX and overlays.', i:'fa-youtube', brand:true},
  {t:'Social Media Reels', d:'Trend-aware vertical edits made to convert and share.', i:'fa-mobile-screen'},
  {t:'Advertisement Editing', d:'Punchy ads that grab attention in the first 3 seconds.', i:'fa-bullhorn'},
  {t:'Wedding Video Editing', d:'Emotional storytelling for the most important day.', i:'fa-heart'},
  {t:'Corporate Videos', d:'Polished corporate, training and explainer content.', i:'fa-building'},
];
document.getElementById('servicesGrid').innerHTML = services.map(s=>`
  <div class="col-sm-6 col-lg-3" data-aos="fade-up">
    <div class="service-card">
      <div class="ic"><i class="${s.brand?'fa-brands':'fa-solid'} ${s.i}"></i></div>
      <h5>${s.t}</h5>
      <p class="text-muted-2 mb-0 small">${s.d}</p>
    </div>
  </div>`).join('');

// ===== Software circles =====
const sw = [
  {n:'Premiere Pro', v:95}, {n:'After Effects', v:90}, {n:'Photoshop', v:92},
];
const swg = document.getElementById('softwareGrid');
swg.innerHTML = sw.map((s,i)=>{
  const r=58, c=2*Math.PI*r;
  return `<div class="col-6 col-md-4 col-lg-2 circle-wrap" data-aos="zoom-in">
    <div class="circle">
      <svg viewBox="0 0 140 140">
        <defs><linearGradient id="grad${i}" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#7C3AED"/><stop offset="50%" stop-color="#06B6D4"/><stop offset="100%" stop-color="#FF6B35"/>
        </linearGradient></defs>
        <circle class="bg" cx="70" cy="70" r="${r}" stroke-width="10" fill="none"/>
        <circle cx="70" cy="70" r="${r}" stroke="url(#grad${i})" stroke-width="10" fill="none" stroke-linecap="round"
                stroke-dasharray="${c}" stroke-dashoffset="${c}" data-target="${s.v}" data-c="${c}" class="fg-anim"/>
      </svg>
      <div class="val">${s.v}%</div>
    </div>
    <h6 class="mt-3 mb-0">${s.n}</h6>
  </div>`;
}).join('');
const swObs = new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting){
    const el=e.target, c=+el.dataset.c, v=+el.dataset.target;
    el.style.strokeDashoffset = c - (c*v/100);
    swObs.unobserve(el);
  }
}),{threshold:.4});
document.querySelectorAll('.fg-anim').forEach(c=>swObs.observe(c));

// ===== Testimonials =====
const ts = [
  {n:'Rohan Mehta', r:'Adarsh delivered our brand reel ahead of schedule. The cuts, color, and motion graphics were on another level.', img:'https://i.pravatar.cc/120?img=12', s:5},
  {n:'Priya Sharma', r:'Wedding film made us cry happy tears. Beautiful pacing and grading — totally cinematic.', img:'https://i.pravatar.cc/120?img=47', s:5},
  {n:'Studio Lumen', r:'Reliable, creative, and detail-obsessed. Our go-to editor for client deliverables.', img:'https://i.pravatar.cc/120?img=33', s:5},
];
const tt = document.getElementById('tTrack');
tt.innerHTML = ts.map((t,i)=>`
  <div class="t-card ${i===0?'active':''}">
    <img src="${t.img}" alt="${t.n}">
    <p class="lead">"${t.r}"</p>
    <div class="stars">${'★'.repeat(t.s)}</div>
    <h6 class="mb-0">${t.n}</h6>
  </div>`).join('');
let ti=0;
const go = d=>{
  const cards = document.querySelectorAll('.t-card');
  cards[ti].classList.remove('active');
  ti = (ti+d+cards.length)%cards.length;
  cards[ti].classList.add('active');
};
document.getElementById('tNext').onclick=()=>go(1);
document.getElementById('tPrev').onclick=()=>go(-1);
setInterval(()=>go(1), 6000);

// ===== Contact =====
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const b = e.target.querySelector('button');
  const o = b.innerHTML;
  b.innerHTML = '<i class="fa-solid fa-check me-2"></i>Message Sent!';
  b.disabled = true;
  setTimeout(()=>{ b.innerHTML=o; b.disabled=false; e.target.reset(); }, 2400);
});
