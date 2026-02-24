import Section from "../components/Section";

export default function SecurityPage() {
    return (
        <Section className="py-24">
            <div className="mx-auto max-w-4xl">
                <h1 className="font-display text-5xl tracking-tight">
                    Security
                </h1>

                <div className="mt-10 space-y-8 leading-relaxed">
                    <p>
                        AI UNITE is committed to maintaining strong security and data
                        protection standards.
                    </p>

                    <h2 className="font-semibold text-xl">Data Protection</h2>
                    <p>
                        We apply appropriate safeguards to protect information from
                        unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <h2 className="font-semibold text-xl">Infrastructure</h2>
                    <p>
                        Our systems are deployed on secure cloud infrastructure with
                        industry-standard protections.
                    </p>

                    <h2 className="font-semibold text-xl">Responsible Disclosure</h2>
                    <p>
                        To report a security issue, please contact{" "}
                        <a
                            href="mailto:security@aiunite.ai"
                            className="text-[rgb(var(--primary))]"
                        >
                            security@aiunite.ai
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