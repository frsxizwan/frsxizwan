import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[80svh] flex-col items-start justify-center">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 text-5xl font-medium tracking-[-0.04em] md:text-7xl">Nothing here.</h1>
      <p className="mt-6 max-w-md text-lg text-muted">That page does not exist, or the project was renamed.</p>
      <Link
        href="/"
        className="mt-10 inline-flex items-center rounded-full bg-fg px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-white"
      >
        Back to home
      </Link>
    </div>
  );
}
