import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X, Cross } from "lucide-react";
import { church, navLinks, ministries } from "@/content/church";
import { scrollToId } from "./ui";

export function Navbar({ onMinistry }: { onMinistry: (id: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [active, setActive] = useState("home");
  const dropRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let cur = "home";
      for (const l of navLinks) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top < 140) cur = l.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = (e: MouseEvent) => dropRef.current && !dropRef.current.contains(e.target as Node) && setDrop(false);
    const esc = (e: KeyboardEvent) => e.key === "Escape" && (setDrop(false), setOpen(false));
    document.addEventListener("click", close);
    window.addEventListener("keydown", esc);
    return () => {
      document.removeEventListener("click", close);
      window.removeEventListener("keydown", esc);
    };
  }, []);

  const go = (id: string) => {
    setOpen(false);
    setDrop(false);
    scrollToId(id);
  };
  const pickMinistry = (id: string) => {
    go("ministries");
    onMinistry(id);
  };

  return (
    <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
      <div className="container nav-inner">
        <button className="brand" onClick={() => go("home")} aria-label={`${church.name} — back to top`}>
          <span className="brand-mark" aria-hidden="true"><Cross size={18} /></span>
          <span className="brand-text">
            <small>P.C.E.A</small>
            <strong>{church.shortName}</strong>
          </span>
        </button>

        <nav aria-label="Main" className="nav-desktop">
          <ul>
            {navLinks.map((l) =>
              l.id === "ministries" ? (
                <li key={l.id} ref={dropRef} className="has-drop">
                  <button
                    className={`nav-link ${active === l.id ? "is-active" : ""}`}
                    aria-expanded={drop}
                    aria-haspopup="true"
                    onClick={() => setDrop((d) => !d)}
                  >
                    {l.label} <ChevronDown size={14} className={drop ? "rot" : ""} />
                  </button>
                  {drop && (
                    <ul className="dropdown">
                      {ministries.map((m) => (
                        <li key={m.id}>
                          <button onClick={() => pickMinistry(m.id)}>{m.name}</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={l.id}>
                  <button className={`nav-link ${active === l.id ? "is-active" : ""}`} onClick={() => go(l.id)}>
                    {l.label}
                  </button>
                </li>
              ),
            )}
          </ul>
          <button className="btn btn--gold btn--sm" onClick={() => go("services")}>Plan Your Visit</button>
        </nav>

        <button className="nav-toggle" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="drawer" role="dialog" aria-label="Menu">
          <ul>
            {navLinks.map((l) => (
              <li key={l.id}>
                <button onClick={() => go(l.id)}>{l.label}</button>
                {l.id === "ministries" && (
                  <ul className="drawer-sub">
                    {ministries.map((m) => (
                      <li key={m.id}><button onClick={() => pickMinistry(m.id)}>{m.name}</button></li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <button className="btn btn--gold" onClick={() => go("services")}>Plan Your Visit</button>
        </div>
      )}
    </header>
  );
}
