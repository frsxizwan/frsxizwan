import { Hero } from "@/components/hero";
import { About } from "@/components/sections/about";
import { CaseStudies } from "@/components/sections/case-studies";
import { Contact } from "@/components/sections/contact";
import { Resume } from "@/components/sections/resume";
import { Skills } from "@/components/sections/skills";
import { Work } from "@/components/sections/work";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <div className="container-page"><div className="hairline" /></div>
      <Work />
      <div className="container-page"><div className="hairline" /></div>
      <CaseStudies />
      <div className="container-page"><div className="hairline" /></div>
      <Skills />
      <div className="container-page"><div className="hairline" /></div>
      <Resume />
      <Contact />
    </>
  );
}
