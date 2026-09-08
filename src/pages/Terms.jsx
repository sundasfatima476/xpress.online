import Breadcrumb from "../components/Breadcrumb";

export default function Terms() {
  return (
    <div className="container-app py-8 md:py-10">
      <Breadcrumb items={[{ label: "Terms & Conditions" }]} />
      <div className="max-w-2xl mt-6">
        <h1 className="font-serif text-3xl md:text-4xl mb-6">Terms & Conditions</h1>
        <div className="prose-sm text-charcoal/70 space-y-4 text-sm leading-relaxed">
          <p>
            By accessing and using this website, you agree to be bound by these Terms &
            Conditions. All content, designs, and imagery are the property of Maison Noir
            and may not be reproduced without permission.
          </p>
          <p>
            Prices and availability are subject to change without notice. We reserve the right
            to refuse service, cancel orders, or limit quantities at our discretion.
          </p>
          <p>
            Continued use of this site constitutes acceptance of any updates made to these terms.
          </p>
        </div>
      </div>
    </div>
  );
}
