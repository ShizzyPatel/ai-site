import Section from "../components/Section";

export default function TermsPage() {
    return (
        <Section className="py-24">
            <div className="mx-auto max-w-4xl">
                <h1 className="font-display text-5xl tracking-tight">
                    Terms of Service
                </h1>

                <div className="mt-10 space-y-8 leading-relaxed">
                    <p>
                        By accessing this website, you agree to be bound by these Terms of
                        Service and all applicable laws.
                    </p>

                    <h2 className="font-semibold text-xl">Use of Site</h2>
                    <p>
                        The content on this website is for informational purposes only.
                    </p>

                    <h2 className="font-semibold text-xl">Intellectual Property</h2>
                    <p>
                        All content, branding, and materials are the property of AI UNITE,
                        Inc. unless otherwise noted.
                    </p>

                    <h2 className="font-semibold text-xl">Limitation of Liability</h2>
                    <p>
                        AI UNITE shall not be liable for any damages arising from use of
                        this site.
                    </p>
                </div>
            </div>
            <div className="mt-12 pt-6 border-t border-[rgba(var(--border),0.4)]">
                <a
                    href="/"
                    className="text-sm text-[rgb(var(--muted))] hover:text-[rgb(var(--text))]"
                >
                    ← Back to Home
                </a>
            </div>
        </Section>
    );
}