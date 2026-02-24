import Section from "../components/Section";

export default function PrivacyPage() {
    return (
        <Section className="py-24">
            <div className="mx-auto max-w-4xl">
                <h1 className="font-display text-5xl tracking-tight">
                    Privacy Policy
                </h1>

                <p className="mt-6 text-[rgb(var(--muted))]">
                    Effective Date: {new Date().getFullYear()}
                </p>

                <div className="mt-10 space-y-8 text-[rgb(var(--text))] leading-relaxed">
                    <p>
                        AI UNITE, Inc. ("AI UNITE," "we," "our," or "us") respects your
                        privacy. This Privacy Policy explains how we collect, use, and
                        safeguard information when you visit our website.
                    </p>

                    <h2 className="font-semibold text-xl">Information We Collect</h2>
                    <p>
                        We may collect contact information you voluntarily provide (such as
                        name and email), as well as standard website usage data (such as
                        browser type and IP address).
                    </p>

                    <h2 className="font-semibold text-xl">How We Use Information</h2>
                    <p>
                        We use collected information to respond to inquiries, improve our
                        services, and communicate with you.
                    </p>

                    <h2 className="font-semibold text-xl">Data Security</h2>
                    <p>
                        We implement reasonable administrative and technical safeguards to
                        protect information.
                    </p>

                    <h2 className="font-semibold text-xl">Contact</h2>
                    <p>
                        For privacy inquiries, contact{" "}
                        <a
                            href="mailto:soob@aiunite.ai"
                            className="text-[rgb(var(--primary))]"
                        >
                            soob@aiunite.ai
                        </a>.
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