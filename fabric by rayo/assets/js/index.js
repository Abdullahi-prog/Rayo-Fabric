import React from 'https://esm.sh/react@19.2.0';
import ReactDOM from 'https://esm.sh/react-dom@19.2.0/client?deps=react@19.2.0';
import htm from 'https://esm.sh/htm@3.1.1';
import {Menu, X, ArrowRight, Sparkles, Scissors, Layers, Gem, Ruler, MessageCircle, Mail, Phone, MapPin, Star, ChevronRight, CheckCircle2, Image as ImageIcon, Home, Info, Briefcase, Send} from 'https://esm.sh/lucide-react@0.468.0?deps=react@19.2.0';

const html = htm.bind(React.createElement);
const { useEffect, useMemo, useState } = React;

const navItems = [
  { label: 'Home', hash: '#/home', file: 'index.html', icon: Home },
  { label: 'About', hash: '#/about', file: 'about.html', icon: Info },
  { label: 'Services', hash: '#/services', file: 'services.html', icon: Briefcase },
  { label: 'Gallery', hash: '#/gallery', file: 'gallery.html', icon: ImageIcon },
  { label: 'Testimonials', hash: '#/testimonials', file: 'testimonials.html', icon: MessageCircle },
  { label: 'Contact', hash: '#/contact', file: 'contact.html', icon: Send }
];

const fabrics = [
  { title: 'Silk Satin', text: 'Fluid sheen for occasionwear, evening silhouettes, and refined bridal accents.', tone: 'silk' },
  { title: 'Washed Linen', text: 'Breathable natural texture for resort tailoring and relaxed premium separates.', tone: 'linen' },
  { title: 'Fine Cotton', text: 'Crisp, dependable hand-feel for shirting, uniforms, and capsule collections.', tone: 'cotton' },
  { title: 'Soft Wool Blend', text: 'Warm structure for suiting, coats, and elegant seasonal essentials.', tone: 'wool' }
];

const services = [
  { icon: Layers, title: 'Curated Fabric Sourcing', text: 'Seasonal textile selection for designers, boutiques, interiors, and fashion studios.' },
  { icon: Scissors, title: 'Custom Development', text: 'Color, weight, finish, and texture guidance for signature product lines.' },
  { icon: Ruler, title: 'Sampling Support', text: 'Organized swatches and small-batch sampling for confident pre-production decisions.' },
  { icon: Gem, title: 'Premium Collection Supply', text: 'Consistent quality, dependable communication, and careful delivery coordination.' }
];

const gallery = [
  { title: 'Champagne Silk Surface', tone: 'silk' },
  { title: 'Natural Linen Weave', tone: 'linen' },
  { title: 'Soft Cotton Texture', tone: 'cotton' },
  { title: 'Tailoring Wool Mood', tone: 'wool' },
  { title: 'Velvet Evening Depth', tone: 'velvet' },
  { title: 'Atelier Neutral Palette', tone: 'atelier' }
];

const testimonials = [
  { name: 'Mira Voss', role: 'Creative Director, Voss Atelier', text: 'RAYO Fabric brings calm confidence to our sourcing process. Their textile recommendations are elegant, practical, and always aligned with the final garment.' },
  { name: 'Nadia Kareem', role: 'Boutique Owner, Maison Nara', text: 'The fabric quality feels elevated without being excessive. Our customers notice the texture immediately, especially in the linen and silk selections.' },
  { name: 'Elias Marin', role: 'Interior Textile Consultant', text: 'Their team understands tone, weight, and finish with impressive maturity. RAYO has become a trusted partner for refined neutral collections.' }
];

function currentPageFromHash(){
  const fallback = window.RAYO_INITIAL_PAGE || 'home';
  const value = window.location.hash.replace('#/','').replace('#','');
  if(!value) return fallback;
  if(value === 'index') return 'home';
  return ['home','about','services','gallery','testimonials','contact'].includes(value) ? value : fallback;
}

function Header({ page }){
  const [open,setOpen] = useState(false);
  useEffect(()=>{ setOpen(false); },[page]);
  return html`<header className="fixed top-0 left-0 right-0 z-50 nav-blur" style=${{paddingTop:'env(safe-area-inset-top)'}}>
    <div className="container-x h-16 md:h-20 flex items-center justify-between">
      <a href="#/home" className="brand-italic text-2xl md:text-3xl font-bold tracking-tight">RAYO Fabric</a>
      <nav className="desktop-nav hidden md:flex items-center gap-1" aria-label="Primary navigation">
        ${navItems.map(item => html`<a key=${item.label} href=${item.hash} className=${`px-4 py-3 rounded-full text-sm font-semibold transition ${page === item.hash.slice(2) || (page === 'home' && item.label === 'Home') ? 'text-[hsl(var(--primary))] bg-[hsl(var(--primary)/.10)]' : 'text-[hsl(var(--secondary))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))]'}`}>${item.label}</a>`)}
      </nav>
      <a href="#/contact" className="hidden md:inline-flex btn btn-primary">Book a consultation <${ArrowRight} size=${18} /></a>
      <button className="md:hidden btn btn-ghost !p-0 w-11 h-11" aria-label="Open menu" onClick=${()=>setOpen(true)}><${Menu} size=${22} /></button>
    </div>
    ${open ? html`<div className="fixed inset-0 z-50 bg-black/30 md:hidden" onClick=${()=>setOpen(false)}>
      <aside className="ml-auto h-full w-full sm:max-w-sm bg-[hsl(var(--card))] border-l border-[hsl(var(--border))] p-5 shadow-lg" onClick=${e=>e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6"><span className="brand-italic text-2xl font-bold">RAYO Fabric</span><button className="btn btn-ghost !p-0 w-11 h-11" aria-label="Close menu" onClick=${()=>setOpen(false)}><${X} size=${22} /></button></div>
        <div className="grid gap-2">${navItems.map(item => html`<a key=${item.label} href=${item.hash} className="min-h-[48px] flex items-center gap-3 px-4 rounded-2xl border border-[hsl(var(--border))] text-[hsl(var(--foreground))] font-semibold"><${item.icon} size=${19} />${item.label}</a>`)}</div>
      </aside>
    </div>` : null}
  </header>`;
}

function BottomNav({ page }){
  return html`<nav className="mobile-bottom fixed bottom-0 left-0 right-0 z-40 bg-[hsl(var(--card))]/95 border-t border-[hsl(var(--border))] bottom-nav" aria-label="Mobile bottom navigation">
    <div className="grid grid-cols-6 px-1 pt-2">
      ${navItems.map(item => { const Icon = item.icon; const active = page === item.hash.slice(2) || (page === 'home' && item.label === 'Home'); return html`<a key=${item.label} href=${item.hash} className=${`min-h-[54px] flex flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-semibold ${active ? 'text-[hsl(var(--primary))] bg-[hsl(var(--primary)/.10)]' : 'text-[hsl(var(--secondary))]'}`}><${Icon} size=${18} /><span>${item.label}</span></a>`; })}
    </div>
  </nav>`;
}

function WhatsAppFloat(){
  return html`<a className="whatsapp-float" href="https://wa.me/2349046675460" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp">
    <span className="whatsapp-tooltip" aria-hidden="true">Chat with us</span>
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" fill="currentColor"><path d="M16.02 3.2A12.7 12.7 0 0 0 5.25 22.63L3.6 28.8l6.33-1.61a12.66 12.66 0 0 0 6.08 1.55h.01A12.77 12.77 0 0 0 28.8 15.98 12.74 12.74 0 0 0 16.02 3.2Zm0 23.37h-.01a10.53 10.53 0 0 1-5.36-1.47l-.38-.22-3.75.95 1-3.66-.25-.38a10.5 10.5 0 1 1 8.75 4.78Zm5.76-7.87c-.32-.16-1.87-.92-2.16-1.03-.29-.11-.5-.16-.71.16-.21.31-.82 1.03-1 1.24-.18.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.18-.32-.02-.49.14-.65.14-.14.32-.37.47-.55.16-.18.21-.32.32-.53.11-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.32-1.11 1.08-1.11 2.63s1.13 3.05 1.29 3.26c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.52 1.8.66.76.24 1.45.21 1.99.13.61-.09 1.87-.76 2.13-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.61-.37Z" /></svg>
  </a>`;
}

function SectionTitle({ eyebrow, title, text }){
  return html`<div className="max-w-3xl mx-auto text-center mb-10 md:mb-14 reveal">
    <span className="eyebrow"><${Sparkles} size=${15} />${eyebrow}</span>
    <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-5 leading-tight tracking-tight">${title}</h2>
    <p className="text-[hsl(var(--secondary))] mt-5 text-base md:text-lg leading-8">${text}</p>
  </div>`;
}

function Hero(){
  return html`<section className="pt-28 md:pt-36 pb-16 md:pb-24 pattern overflow-hidden">
    <div className="container-x grid lg:grid-cols-[1fr_.92fr] gap-10 lg:gap-16 items-center">
      <div className="reveal in-view">
        <span className="eyebrow"><${Sparkles} size=${15} />Premium textile house</span>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[.98] tracking-tight mt-6">Elegant fabrics for quietly exceptional collections.</h1>
        <p className="text-[hsl(var(--secondary))] text-lg md:text-xl leading-8 mt-6 max-w-2xl">RAYO Fabric curates refined textures, timeless neutrals, and dependable textile quality for fashion labels, ateliers, boutiques, and interiors.</p>
        <div className="flex flex-col sm:flex-row gap-3 mt-8"><a href="#/gallery" className="btn btn-primary">Explore fabrics <${ArrowRight} size=${18} /></a><a href="#/contact" className="btn btn-ghost">Request consultation</a></div>
        <div className="grid grid-cols-3 gap-4 mt-10 max-w-xl">
          ${[['14+','fabric families'],['98%','repeat clients'],['42','seasonal tones']].map(stat => html`<div key=${stat[1]} className="card p-4"><strong className="font-display text-2xl md:text-3xl">${stat[0]}</strong><p className="text-[hsl(var(--secondary))] text-sm mt-1">${stat[1]}</p></div>`)}
        </div>
      </div>
      <div className="hero-art reveal in-view float-soft" aria-label="Premium RAYO Fabric hero image"><div className="fabric-fold fold-1"></div><div className="fabric-fold fold-2"></div><div className="fabric-fold fold-3"></div><div className="model-card"><img className="hero-owner-image" src="./assets/images/hero-image.png" alt="RAYO Fabric brand owner" /></div></div>
    </div>
  </section>`;
}

function AboutSection(){
  return html`<section className="section about-page" id="about-preview"><div className="container-x grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
    <div className="card story-card p-7 md:p-10 reveal"><span className="eyebrow">Our story</span><h2 className="font-display text-4xl md:text-5xl mt-5 leading-tight">Designed around texture, trust, and restraint.</h2><p className="text-[hsl(var(--secondary))] mt-5 leading-8">RAYO Fabric was built for teams who value quiet quality: a precise hand-feel, controlled color stories, thoughtful drape, and sourcing support that feels organized from the first swatch to the final roll.</p><a href="#/about" className="btn btn-primary mt-7">Learn about RAYO <${ChevronRight} size=${18} /></a></div>
    <div className="grid gap-4 reveal">${['Neutral-first collections','Measured quality checks','Clear textile guidance','Small-batch and collection support'].map(item => html`<div key=${item} className="card p-5 flex items-center gap-4"><span className="w-11 h-11 rounded-full bg-[hsl(var(--primary)/.12)] text-[hsl(var(--primary))] flex items-center justify-center"><${CheckCircle2} size=${20} /></span><span className="font-semibold text-lg">${item}</span></div>`)}</div>
  </div></section>`;
}

function FeaturedFabrics(){
  return html`<section className="section bg-[hsl(var(--card))]"><div className="container-x"><${SectionTitle} eyebrow="Featured fabrics" title="A refined foundation for modern collections." text="Explore fabrics selected for touch, drape, versatility, and long-term commercial appeal." />
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">${fabrics.map(f => html`<article key=${f.title} className="card overflow-hidden reveal"><div className=${`h-44 ${f.tone}`}></div><div className="p-6"><h3 className="font-display text-2xl">${f.title}</h3><p className="text-[hsl(var(--secondary))] mt-3 leading-7">${f.text}</p></div></article>`)}</div>
  </div></section>`;
}

function ServicesSection(){
  return html`<section className="section services-page"><div className="container-x"><${SectionTitle} eyebrow="Services" title="Textile support with a polished, practical process." text="From discovery to delivery, RAYO Fabric helps teams make confident material decisions." />
    <div className="grid md:grid-cols-2 service-grid gap-5">${services.map((s,i) => { const Icon=s.icon; return html`<article key=${s.title} className="card p-7 reveal"><div className="flex items-start gap-5"><div className="w-12 h-12 rounded-2xl bg-[hsl(var(--primary)/.12)] text-[hsl(var(--primary))] flex items-center justify-center shrink-0"><${Icon} size=${23} /></div><div><span className="service-number text-xl">0${i+1}</span><h3 className="font-display text-2xl mt-1">${s.title}</h3><p className="text-[hsl(var(--secondary))] mt-3 leading-7">${s.text}</p></div></div></article>`; })}</div>
  </div></section>`;
}

function GallerySection(){
  return html`<section className="section gallery-page bg-[hsl(var(--card))]"><div className="container-x"><${SectionTitle} eyebrow="Gallery" title="Texture studies in a soft neutral language." text="A visual mood board of fabric surfaces, refined tones, and atelier-ready materials." />
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${gallery.map(g => html`<article key=${g.title} className=${`gallery-tile ${g.tone} reveal`}><div className="absolute z-10 left-5 bottom-5 text-white"><h3 className="font-display text-2xl">${g.title}</h3><p className="text-white/80 text-sm mt-1">RAYO Fabric collection mood</p></div></article>`)}</div>
  </div></section>`;
}

function TestimonialsSection(){
  return html`<section className="section testimonials-page"><div className="container-x"><${SectionTitle} eyebrow="Testimonials" title="Trusted by designers who care about every detail." text="RAYO Fabric partners with professionals who expect beautiful materials and dependable service." />
    <div className="grid lg:grid-cols-3 gap-5">${testimonials.map(t => html`<article key=${t.name} className="card p-7 reveal"><div className="quote-mark">“</div><p className="text-[hsl(var(--secondary))] leading-8 -mt-4">${t.text}</p><div className="flex items-center gap-1 text-[hsl(var(--primary))] mt-6">${[1,2,3,4,5].map(n => html`<${Star} key=${n} size=${16} fill="currentColor" />`)}</div><h3 className="font-semibold text-lg mt-5">${t.name}</h3><p className="text-[hsl(var(--secondary))] text-sm mt-1">${t.role}</p></article>`)}</div>
  </div></section>`;
}

function ContactSection(){
  const [sent,setSent] = useState(false);
  const submit = e => { e.preventDefault(); setSent(true); };
  return html`<section className="section contact-page bg-[hsl(var(--card))]"><div className="container-x grid lg:grid-cols-[.9fr_1.1fr] gap-8 lg:gap-14 items-start">
    <div className="contact-panel card p-7 md:p-10 reveal"><span className="eyebrow">Contact</span><h2 className="font-display text-4xl md:text-5xl mt-5 leading-tight">Begin with a fabric conversation.</h2><p className="text-[hsl(var(--secondary))] mt-5 leading-8">Share your collection goals, preferred textures, timeline, and quantity range. The RAYO Fabric team will respond with a focused recommendation path.</p><div className="grid gap-4 mt-7">${[[Mail,'studio@rayofabric.com'],[Phone,'+1 646 782 4190'],[MapPin,'Textile showroom visits by appointment']].map(row => { const Icon=row[0]; return html`<div key=${row[1]} className="flex items-center gap-3 text-[hsl(var(--secondary))]"><span className="w-11 h-11 rounded-full bg-[hsl(var(--primary)/.12)] text-[hsl(var(--primary))] flex items-center justify-center"><${Icon} size=${19} /></span><span>${row[1]}</span></div>`; })}</div></div>
    <form className="card p-6 md:p-8 reveal" onSubmit=${submit}>
      ${sent ? html`<div className="mb-5 rounded-2xl border border-[hsl(var(--primary)/.35)] bg-[hsl(var(--primary)/.10)] p-4 text-[hsl(var(--foreground))]"><strong>Inquiry received.</strong><p className="text-[hsl(var(--secondary))] mt-1">Thank you. RAYO Fabric will prepare a thoughtful response for your project.</p></div>` : null}
      <div className="grid md:grid-cols-2 gap-4"><label>Full name<input className="input mt-2" required type="text" autoComplete="name" enterKeyHint="next" /></label><label>Email<input className="input mt-2" required type="email" inputMode="email" autoComplete="email" enterKeyHint="next" /></label></div>
      <div className="grid md:grid-cols-2 gap-4 mt-4"><label>Phone<input className="input mt-2" type="tel" inputMode="tel" autoComplete="tel" enterKeyHint="next" /></label><label>Project type<select className="input mt-2" required><option value="Fashion collection">Fashion collection</option><option value="Boutique supply">Boutique supply</option><option value="Interior textile">Interior textile</option><option value="Custom development">Custom development</option></select></label></div>
      <label className="block mt-4">Message<textarea className="input textarea mt-2" required enterKeyHint="send" placeholder="Tell us about fabric type, color direction, quantity, and timeline."></textarea></label>
      <button className="btn btn-primary mt-5 w-full sm:w-auto" type="submit">Send inquiry <${ArrowRight} size=${18} /></button>
    </form>
  </div></section>`;
}

function PageIntro({ title, text, eyebrow }){
  return html`<section className="pt-28 md:pt-36 pb-10 pattern"><div className="container-x text-center max-w-4xl"><span className="eyebrow reveal in-view">${eyebrow}</span><h1 className="font-display text-5xl md:text-7xl mt-6 leading-tight tracking-tight reveal in-view">${title}</h1><p className="text-[hsl(var(--secondary))] text-lg md:text-xl leading-8 mt-5 reveal in-view">${text}</p></div></section>`;
}

function Footer(){
  return html`<footer className="bg-[hsl(var(--foreground))] text-white pt-14 pb-10"><div className="container-x grid md:grid-cols-[1.4fr_1fr_1fr] gap-8"><div><div className="brand-italic text-3xl font-bold">RAYO Fabric</div><p className="text-white/65 leading-7 mt-4 max-w-md">Premium fabrics, soft neutral collections, and mature textile guidance for brands building with care.</p></div><div><h3 className="font-semibold mb-4">Pages</h3><div className="grid gap-2 text-white/70">${navItems.map(i => html`<a key=${i.label} href=${i.hash} className="hover:text-white transition">${i.label}</a>`)}</div></div><div><h3 className="font-semibold mb-4">Studio</h3><p className="text-white/70 leading-7">Appointments for fabric review, collection planning, and textile consultation are available Monday through Friday.</p></div></div><div className="container-x border-t border-white/10 mt-10 pt-6 text-white/55 text-sm flex flex-col sm:flex-row gap-2 justify-between"><span>© 2026 RAYO Fabric. All rights reserved.</span><span>Quiet luxury in every thread.</span></div><div className="container-x mt-4 text-center sm:text-right text-[11px] text-white/50 hover:text-white/70 transition">Built by OYETECH</div></footer>`;
}

function App(){
  const [page,setPage] = useState(currentPageFromHash());
  useEffect(()=>{ const onHash=()=>setPage(currentPageFromHash()); window.addEventListener('hashchange',onHash); if(!window.location.hash) window.history.replaceState(null,'','#/home'); return()=>window.removeEventListener('hashchange',onHash); },[]);
  useEffect(()=>{ const io = new IntersectionObserver(entries=>entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('in-view'); }),{threshold:.12}); document.querySelectorAll('.reveal').forEach(el=>io.observe(el)); return()=>io.disconnect(); },[page]);
  const content = useMemo(()=>{
    if(page==='about') return html`<main className="about-page"><${PageIntro} eyebrow="About RAYO" title="A fabric brand built on restraint, feel, and dependable craft." text="RAYO Fabric supports modern teams with refined textile choices, calm communication, and a quality-first sourcing approach." /><${AboutSection} /><${FeaturedFabrics} /><${ContactSection} /></main>`;
    if(page==='services') return html`<main className="services-page"><${PageIntro} eyebrow="Services" title="Premium textile services for thoughtful collections." text="From curated sourcing to custom development, RAYO Fabric brings structure and elegance to fabric selection." /><${ServicesSection} /><${FeaturedFabrics} /><${ContactSection} /></main>`;
    if(page==='gallery') return html`<main className="gallery-page"><${PageIntro} eyebrow="Gallery" title="A quiet gallery of material, texture, and tone." text="Browse textile-inspired visual studies created with refined neutral palettes and premium fabric moods." /><${GallerySection} /><${FeaturedFabrics} /></main>`;
    if(page==='testimonials') return html`<main className="testimonials-page"><${PageIntro} eyebrow="Testimonials" title="Professional partners trust RAYO Fabric for refined results." text="Designers, boutiques, and consultants value the brand for quality, communication, and elegant fabric direction." /><${TestimonialsSection} /><${ContactSection} /></main>`;
    if(page==='contact') return html`<main className="contact-page"><${PageIntro} eyebrow="Contact" title="Tell us what your next collection needs to feel like." text="Request fabric guidance, sampling support, sourcing recommendations, or a private showroom appointment." /><${ContactSection} /></main>`;
    return html`<main><${Hero} /><${AboutSection} /><${FeaturedFabrics} /><${ServicesSection} /><${GallerySection} /><${TestimonialsSection} /><${ContactSection} /></main>`;
  },[page]);
  return html`<div><${Header} page=${page} />${content}<${Footer} /><${BottomNav} page=${page} /><${WhatsAppFloat} /></div>`;
}

ReactDOM.createRoot(document.getElementById('root')).render(html`<${App} />`);