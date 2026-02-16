import Container from "./Container";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <div className="text-sm font-semibold tracking-tight">ClientName</div>

        <nav className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
          <a className="hover:text-gray-900" href="#platform">Platform</a>
          <a className="hover:text-gray-900" href="#use-cases">Use cases</a>
          <a className="hover:text-gray-900" href="#about">About</a>
          <a className="hover:text-gray-900" href="#contact">Contact</a>
        </nav>

        <button className="rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white">
          Request demo
        </button>
      </Container>
    </header>
  );
}