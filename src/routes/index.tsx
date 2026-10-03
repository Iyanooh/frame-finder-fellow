import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/church/Navbar";
import { Hero, ServiceStrip, About, ServiceCards, Ministries, Events, Projects, Gallery, History, Contact, Footer, BackToTop } from "@/components/church/Sections";
import churchCss from "@/styles/church.css?url";

const title = "P.C.E.A Geoffrey Gathu Memorial Church | Where Faith Meets Love";
const description = "Welcome to P.C.E.A Geoffrey Gathu Memorial Church. Discover our worship services, ministries, church events, projects, and community.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: churchCss }],
  }),
  component: Index,
});

function Index() {
  const [ministry, setMinistry] = useState<string | null>(null);
  return (
    <div className="site">
      <a href="#main" className="skip">Skip to content</a>
      <Navbar onMinistry={setMinistry} />
      <main id="main">
        <Hero />
        <ServiceStrip />
        <About />
        <ServiceCards />
        <Ministries selected={ministry} onSelect={setMinistry} />
        <Events />
        <Projects />
        <Gallery />
        <History />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
