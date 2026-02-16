import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <Container className="py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} ClientName. All rights reserved.
          </div>
          <div className="flex gap-5 text-sm text-gray-600">
            <a className="hover:text-gray-900" href="#">Privacy</a>
            <a className="hover:text-gray-900" href="#">Terms</a>
            <a className="hover:text-gray-900" href="#">Security</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}