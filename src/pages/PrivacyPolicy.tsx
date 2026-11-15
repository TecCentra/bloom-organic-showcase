import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Organic Bloom</p>
        <h1 className="mt-2 text-4xl font-heading font-bold text-foreground">Privacy Policy</h1>
        <p className="mt-4 text-muted-foreground">
          This notice explains how information may be handled when you browse or shop with Organic Bloom.
        </p>
      </header>

      <div className="space-y-8 text-foreground">
        <section>
          <h2 className="mb-3 text-2xl font-heading font-semibold">Information you provide</h2>
          <p className="leading-7 text-muted-foreground">
            Depending on how you use the site, we may receive details such as your name, email address,
            phone number, delivery information, account details, product reviews, and messages you send
            to us. Order and payment-related details are used to process and support your purchase.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-heading font-semibold">Website and device information</h2>
          <p className="leading-7 text-muted-foreground">
            The site uses analytics and advertising measurement tools, including Microsoft Clarity,
            TikTok Pixel, and Vercel Analytics. These tools may collect information about your device,
            browser, and interactions with the site. Their collection and use of information are also
            governed by their own privacy notices and settings.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-heading font-semibold">How information is used</h2>
          <ul className="list-disc space-y-2 pl-6 leading-7 text-muted-foreground">
            <li>To manage accounts, orders, delivery, payments, and customer support.</li>
            <li>To maintain, protect, and improve the website and shopping experience.</li>
            <li>To understand site usage and measure advertising and product performance.</li>
            <li>To send service-related messages and, where applicable, promotional communications.</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-heading font-semibold">Sharing and storage</h2>
          <p className="leading-7 text-muted-foreground">
            Information may be handled by service providers that support website hosting, payments,
            analytics, advertising measurement, and delivery. We do not include full payment-card
            details in this policy because payment handling depends on the payment method selected at
            checkout; the applicable payment service may process information under its own privacy
            terms. Information is kept only as needed for the purposes described here, subject to
            applicable legal and operational requirements.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-heading font-semibold">Your choices and requests</h2>
          <p className="leading-7 text-muted-foreground">
            You can manage cookies and similar technologies through your browser and available
            third-party settings. You may contact us to ask about, correct, or request deletion of
            personal information, subject to records we are required or permitted to retain.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-heading font-semibold">Contact us</h2>
          <p className="leading-7 text-muted-foreground">
            For privacy questions or requests, email{" "}
            <a className="font-medium text-primary hover:underline" href="mailto:purebloomhavenke@gmail.com">
              purebloomhavenke@gmail.com
            </a>{" "}
            or call{" "}
            <a className="font-medium text-primary hover:underline" href="tel:+254704086080">
              +254 704 086 080
            </a>.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default PrivacyPolicy;
