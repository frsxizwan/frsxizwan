import { site } from "@/content/site";
import { MotionToggle } from "./motion-toggle";

export function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="container-page flex flex-col items-start justify-between gap-6 text-[13px] text-faint sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with Next.js, Three.js and Framer Motion.
        </p>
        <MotionToggle />
      </div>
    </footer>
  );
}
