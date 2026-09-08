import Breadcrumb from "../components/Breadcrumb";

export default function PrivacyPolicy() {
  return (
    <div className="container-app py-8 md:py-10">
      <Breadcrumb items={[{ label: "Privacy Policy" }]} />
      <div className="max-w-2xl mt-6">
        <h1 className="font-serif text-3xl md:text-4xl mb-6">Privacy Policy</h1>
        <div className="prose-sm text-charcoal/70 space-y-4 text-sm leading-relaxed">
          <p>
            Maison Noir respects your privacy. We collect only the information necessary to
            process your orders, improve our services, and communicate with you about products
            and offers you've opted into.
          </p>
          <p>
            We never sell your personal data to third parties. Payment information is processed
            securely through PCI-compliant providers and is never stored on our servers.
          </p>
          <p>
            You may request access to, correction of, or deletion of your personal data at any
            time by contacting our support team.
          </p>
        </div>
      </div>
    </div>
  );
}
