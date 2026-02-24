import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(var(--border),0.6)] bg-white">
      <Container className="py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-[rgb(var(--muted))]">
            © {new Date().getFullYear()} AI UNITE, Inc. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[rgb(var(--muted))]">
            <a className="hover:text-[rgb(var(--text))]" href="/privacy">
              Privacy
            </a>
            <a className="hover:text-[rgb(var(--text))]" href="/terms">
              Terms
            </a>
            <a className="hover:text-[rgb(var(--text))]" href="/security">
              Security
            </a>
            <a
              className="hover:text-[rgb(var(--text))]"
              href="mailto:soob@aiunite.ai"
            >
              Contact
            </a>
            <a
              className="hover:text-[rgb(var(--text))]"
              href="https://linkedin.com/in/soobpatel"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}