import { useCallback, useEffect, useState, type FormEvent } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Clock, Flame, Sun, Users, Building2, CalendarDays, MapPin, Phone, Mail, CheckCircle2, AlertCircle, Cross, ArrowUp } from "lucide-react";
import { church, images, scripture, services, officeHours, ministries, events, projects, gallery, history, navLinks, type ChurchEvent, type Project } from "@/content/church";
import { Modal, Reveal, SectionHead, scrollToId } from "./ui";

const serviceIcon = { sun: Sun, flame: Flame, users: Users };

export function Hero() {
  return (
    <section id="home" className="hero">
      <img className="hero-img" src={images.hero} alt="Congregation worshipping inside the church" width={1920} height={1088} fetchPriority="high" />
      <div className="hero-overlay" />
      <div className="container hero-content">
        <p className="eyebrow eyebrow--gold anim-1">A Place to Belong</p>
        <h1 className="anim-2">Welcome to <em>P.C.E.A Geoffrey Gathu</em> Memorial Church</h1>
        <p className="hero-sub anim-3">Growing in faith, sharing God's love, and building a community where everyone belongs.</p>
        <p className="hero-tag anim-3"><span />{church.tagline}</p>
        <div className="hero-ctas anim-4">
          <button className="btn btn--gold" onClick={() => scrollToId("services")}>Plan Your Visit <ArrowRight size={18} /></button>
          <button className="btn btn--ghost" onClick={() => scrollToId("about")}>Explore Our Church</button>
        </div>
      </div>
      <button className="scroll-cue" onClick={() => scrollToId("strip")} aria-label="Scroll to service times">
        <span>Scroll</span><ChevronDown size={18} />
      </button>
    </section>
  );
}

export function ServiceStrip() {
  return (
    <div id="strip" className="strip">
      <div className="container strip-inner">
        {services.map((s) => {
          const Icon = serviceIcon[s.icon];
          return (
            <div key={s.name} className="strip-item">
              <Icon size={22} aria-hidden="true" />
              <div><p className="strip-label">{s.name}</p><p className="strip-time">{s.time}</p></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="section bg-cream">
      <div className="container about">
        <Reveal className="about-media">
          <img src={images.community} alt="Church members greeting one another outside after service" width={1200} height={1408} loading="lazy" />
          <div className="about-badge"><Cross size={18} /> {church.tagline}</div>
        </Reveal>
        <Reveal className="about-copy">
          <p className="eyebrow">Welcome Home</p>
          <span className="gold-rule" />
          <h2>More Than a Church. <em>A Family.</em></h2>
          <p className="lead">At P.C.E.A Geoffrey Gathu Memorial Church, we believe in the transforming power of faith, the strength of community, and the love of Christ.</p>
          <p>We welcome individuals and families to worship, grow spiritually, serve others, and walk together in faith.</p>
          <blockquote className="scripture">“{scripture.text}”<cite>— {scripture.reference}</cite></blockquote>
          <button className="btn btn--navy" onClick={() => scrollToId("history")}>Discover Our Story <ArrowRight size={18} /></button>
        </Reveal>
      </div>
    </section>
  );
}

export function ServiceCards() {
  const [open, setOpen] = useState<number | null>(null);
  const s = open !== null ? services[open] : null;
  return (
    <section id="services" className="section">
      <div className="container">
        <SectionHead eyebrow="Worship With Us" title="Join Us in Worship" intro="Everyone is welcome. Come as you are — we'd love to worship alongside you." />
        <div className="svc-grid">
          {services.map((sv, i) => {
            const Icon = serviceIcon[sv.icon];
            return (
              <Reveal key={sv.name} className="svc-card">
                <span className="svc-icon"><Icon size={24} /></span>
                <h3>{sv.name}</h3>
                <p className="svc-when"><Clock size={15} /> {sv.day} · {sv.time}</p>
                <p>{sv.description}</p>
                {!sv.verified && <p className="note">Day to be confirmed by the church office</p>}
                <button className="link-btn" onClick={() => setOpen(i)}>Learn more <ArrowRight size={16} /></button>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="office">
          <div><p className="eyebrow eyebrow--gold">Church Office</p><h3>Office Hours</h3></div>
          <dl>
            {officeHours.map((o) => (<div key={o.days}><dt>{o.days}</dt><dd>{o.hours}</dd></div>))}
          </dl>
        </Reveal>
      </div>
      <Modal open={!!s} onClose={() => setOpen(null)} title={s?.name ?? ""}>
        {s && (<div className="modal-body"><p className="eyebrow">Service</p><h3>{s.name}</h3><p className="svc-when"><Clock size={15} /> {s.day} · {s.time}</p><p>{s.description}</p>{!s.verified && <p className="note">Some details are awaiting confirmation from the church office.</p>}</div>)}
      </Modal>
    </section>
  );
}

export function Ministries({ selected, onSelect }: { selected: string | null; onSelect: (id: string | null) => void }) {
  const m = ministries.find((x) => x.id === selected);
  return (
    <section id="ministries" className="section bg-navy">
      <div className="container">
        <SectionHead light eyebrow="Ministries" title="Find Your Place to Grow" intro="There's a place for every age and season of life to serve, learn and belong." />
        <div className="min-grid">
          {ministries.map((x, i) => (
            <Reveal key={x.id} className={`min-card ${i === 0 ? "min-card--lg" : ""}`}>
              <button onClick={() => onSelect(x.id)} aria-label={`Discover ${x.name}`}>
                <img src={x.image} alt="" loading="lazy" width={1200} height={912} />
                <span className="min-shade" />
                <span className="min-text">
                  <strong>{x.name}</strong>
                  <span>{x.intro}</span>
                  <em>Discover Ministry <ArrowRight size={15} /></em>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <Modal open={!!m} onClose={() => onSelect(null)} title={m?.name ?? ""} wide>
        {m && (
          <div className="modal-split">
            <img src={m.image} alt={`${m.name} ministry`} />
            <div className="modal-body"><p className="eyebrow">Ministry</p><h3>{m.full}</h3><p className="lead">{m.intro}</p><p>{m.details}</p></div>
          </div>
        )}
      </Modal>
    </section>
  );
}

export function Events() {
  const [ev, setEv] = useState<ChurchEvent | null>(null);
  const [featured, ...rest] = events;
  return (
    <section id="events" className="section bg-cream">
      <div className="container">
        <SectionHead eyebrow="Events" title="Life at Our Church" intro="Gatherings that bring our church family together." />
        {events.some((e) => e.example) && <p className="banner-note"><AlertCircle size={16} /> These are example events and will be replaced with confirmed dates before launch.</p>}
        {!featured ? (
          <div className="empty">No upcoming events right now — check back soon or join us on Sunday.</div>
        ) : (
          <div className="ev-layout">
            <Reveal className="ev-feature">
              <img src={featured.image} alt="" loading="lazy" width={1200} height={1408} />
              <div className="ev-feature-body">
                {featured.status && <span className="chip">{featured.status}</span>}
                <h3>{featured.title}</h3>
                <p className="ev-meta"><CalendarDays size={15} /> {featured.date} · {featured.time}</p>
                <p>{featured.description}</p>
                <button className="btn btn--gold btn--sm" onClick={() => setEv(featured)}>Explore Events <ArrowRight size={16} /></button>
              </div>
            </Reveal>
            <div className="ev-list">
              {rest.map((e) => (
                <Reveal key={e.title} className="ev-item">
                  <button onClick={() => setEv(e)}>
                    <img src={e.image} alt="" loading="lazy" width={1200} height={912} />
                    <div>
                      {e.status && <span className="chip chip--soft">{e.status}</span>}
                      <h4>{e.title}</h4>
                      <p className="ev-meta"><CalendarDays size={14} /> {e.date}</p>
                      <span className="link-btn">View details <ArrowRight size={15} /></span>
                    </div>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
      <Modal open={!!ev} onClose={() => setEv(null)} title={ev?.title ?? ""} wide>
        {ev && (
          <div className="modal-split">
            <img src={ev.image} alt="" />
            <div className="modal-body">
              {ev.status && <span className="chip chip--soft">{ev.status}</span>}
              <h3>{ev.title}</h3>
              <p className="ev-meta"><CalendarDays size={15} /> {ev.date} · {ev.time}</p>
              {ev.location && <p className="ev-meta"><MapPin size={15} /> {ev.location}</p>}
              <p>{ev.description}</p>
              {ev.example && <p className="note">Example event — confirmed details coming soon.</p>}
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

export function Projects() {
  const [p, setP] = useState<Project | null>(null);
  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionHead eyebrow="Church Projects" title="Faith in Action" intro="Building today for the generations who will worship here tomorrow." />
        {projects.map((pr) => (
          <Reveal key={pr.title} className="proj">
            <img src={pr.image} alt={pr.title} loading="lazy" width={1408} height={912} />
            <div className="proj-body">
              <span className="chip chip--soft"><Building2 size={14} /> {pr.status}</span>
              <h3>{pr.title}</h3>
              <p>{pr.description}</p>
              <button className="btn btn--navy" onClick={() => setP(pr)}>Learn About This Project <ArrowRight size={18} /></button>
            </div>
          </Reveal>
        ))}
      </div>
      <Modal open={!!p} onClose={() => setP(null)} title={p?.title ?? ""}>
        {p && (<div className="modal-body"><p className="eyebrow">Project</p><h3>{p.title}</h3><p className="lead">{p.description}</p><p>{p.details}</p><p className="note">Status: {p.status}</p></div>)}
      </Modal>
    </section>
  );
}

export function Gallery() {
  const [idx, setIdx] = useState<number | null>(null);
  const n = gallery.length;
  const prev = useCallback(() => setIdx((i) => (i === null ? i : (i - 1 + n) % n)), [n]);
  const next = useCallback(() => setIdx((i) => (i === null ? i : (i + 1) % n)), [n]);
  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [idx, prev, next]);
  const cur = idx !== null ? gallery[idx] : null;
  return (
    <section id="gallery" className="section bg-cream">
      <div className="container">
        <SectionHead eyebrow="Gallery" title="Moments We Share" />
        <div className="gal">
          {gallery.map((g, i) => (
            <button key={i} className={`gal-item gal-${i}`} onClick={() => setIdx(i)} aria-label={`Open photo: ${g.caption}`}>
              <img src={g.src} alt={g.caption} loading="lazy" />
              <span>{g.caption}</span>
            </button>
          ))}
        </div>
      </div>
      <Modal open={!!cur} onClose={() => setIdx(null)} title="Photo viewer" wide>
        {cur && (
          <figure className="lightbox">
            <img src={cur.src} alt={cur.caption} />
            <figcaption>{cur.caption} <span>{(idx ?? 0) + 1} / {n}</span></figcaption>
            <button className="lb-btn lb-prev" onClick={prev} aria-label="Previous photo"><ChevronLeft /></button>
            <button className="lb-btn lb-next" onClick={next} aria-label="Next photo"><ChevronRight /></button>
          </figure>
        )}
      </Modal>
    </section>
  );
}

export function History() {
  return (
    <section id="history" className="section">
      <div className="container hist">
        <Reveal>
          <SectionHead eyebrow="Our Story" title="Our Journey of Faith" />
          <ol className="timeline">
            {history.milestones.map((m) => (<li key={m.label}><strong>{m.label}</strong><p>{m.text}</p></li>))}
          </ol>
          <div className="mv">
            <div><h4>Our Mission</h4><p>{history.mission}</p></div>
            <div><h4>Our Vision</h4><p>{history.vision}</p></div>
          </div>
        </Reveal>
        <Reveal className="rev">
          <span className="rev-mark"><Cross size={28} /></span>
          <p className="eyebrow eyebrow--gold">From Our Reverend</p>
          <blockquote>{history.reverendMessage}</blockquote>
          <p className="rev-name">Leadership details coming soon</p>
        </Reveal>
      </div>
    </section>
  );
}

type FormState = { name: string; contact: string; message: string };
export function Contact() {
  const [f, setF] = useState<FormState>({ name: "", contact: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const er: Partial<FormState> = {};
    if (f.name.trim().length < 2) er.name = "Please enter your full name.";
    const c = f.contact.trim();
    if (!/^\S+@\S+\.\S+$/.test(c) && !/^\+?[\d\s-]{9,15}$/.test(c)) er.contact = "Enter a valid email or phone number.";
    if (f.message.trim().length < 10) er.message = "Please write a message of at least 10 characters.";
    setErrors(er);
    if (Object.keys(er).length === 0) setDone(true);
  };
  const field = (k: keyof FormState) => ({
    id: `f-${k}`, value: f[k], "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `e-${k}` : undefined,
    onChange: (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value }),
  });
  const contactRows = [
    { icon: MapPin, label: "Address", value: church.address },
    { icon: Phone, label: "Telephone", value: church.phone },
    { icon: Mail, label: "Email", value: church.email },
  ];
  return (
    <section id="contact" className="section bg-cream">
      <div className="container contact">
        <Reveal>
          <SectionHead eyebrow="Contact & Visit" title="We Would Love to Welcome You" intro="Planning your first visit or have a question? Reach out — we're glad you're here." />
          <ul className="contact-list">
            {contactRows.map((r) => (
              <li key={r.label}><r.icon size={18} /><div><strong>{r.label}</strong><span>{r.value || "To be shared soon"}</span></div></li>
            ))}
            <li><Clock size={18} /><div><strong>Sunday Worship</strong><span>{services[0].time}</span></div></li>
          </ul>
        </Reveal>
        <Reveal className="form-card">
          {done ? (
            <div className="form-done" role="status">
              <CheckCircle2 size={36} />
              <h3>Thank you, {f.name.split(" ")[0]}!</h3>
              <p>Your message was checked successfully. This is a preview version of the website, so messages are not sent yet. Please speak to the church office directly for now.</p>
              <button className="btn btn--navy btn--sm" onClick={() => { setDone(false); setF({ name: "", contact: "", message: "" }); }}>Write another message</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <h3>Send us a message</h3>
              <label htmlFor="f-name">Full name *</label>
              <input {...field("name")} autoComplete="name" />
              {errors.name && <p className="err" id="e-name">{errors.name}</p>}
              <label htmlFor="f-contact">Email or telephone *</label>
              <input {...field("contact")} />
              {errors.contact && <p className="err" id="e-contact">{errors.contact}</p>}
              <label htmlFor="f-message">Message *</label>
              <textarea {...field("message")} rows={5} />
              {errors.message && <p className="err" id="e-message">{errors.message}</p>}
              <button className="btn btn--gold" type="submit">Send Message <ArrowRight size={18} /></button>
              <p className="note">Preview mode: messages are not delivered yet.</p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand brand--static"><span className="brand-mark"><Cross size={18} /></span><span className="brand-text"><small>P.C.E.A</small><strong>{church.shortName}</strong></span></div>
          <p className="footer-tag">{church.tagline}</p>
        </div>
        <div>
          <h4>Explore</h4>
          <ul>{navLinks.map((l) => (<li key={l.id}><button onClick={() => scrollToId(l.id)}>{l.label}</button></li>))}</ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul>{services.map((s) => (<li key={s.name}>{s.name}<br /><span>{s.time}</span></li>))}</ul>
        </div>
      </div>
      <div className="container footer-base">
        <span>© {new Date().getFullYear()} {church.name}. All rights reserved.</span>
        <span className="credit">Website design &amp; development</span>
      </div>
    </footer>
  );
}

export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const s = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", s, { passive: true });
    return () => window.removeEventListener("scroll", s);
  }, []);
  if (!show) return null;
  return <button className="to-top" onClick={() => scrollToId("home")} aria-label="Back to top"><ArrowUp size={20} /></button>;
}
