import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ReturnPolicy = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Organic Bloom</p>
        <h1 className="mt-2 text-4xl font-heading font-bold text-foreground">Returns and Refunds</h1>
        <p className="mt-4 text-muted-foreground">
          We want to help if there is a problem with your order. Please contact us before sending an item back.
        </p>
      </header>

      <div className="space-y-8 text-foreground">
        <section>
          <h2 className="mb-3 text-2xl font-heading font-semibold">Requesting a return</h2>
          <p className="leading-7 text-muted-foreground">
            Contact Organic Bloom within 7 days of delivery to request a return. Change-of-mind returns
            are considered only for unused, unopened products with the original seal intact and in
            their original packaging. A product whose seal has been broken or which has been opened
            cannot be refunded. Please include your order details and the reason for your request so
            we can assist.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-heading font-semibold">Damaged or incorrect orders</h2>
          <p className="leading-7 text-muted-foreground">
            If your order arrives damaged or you receive the wrong item, contact us as soon as possible
            and share your order details and photos of the item and packaging. We will review the issue
            and discuss an appropriate resolution. Refunds are not available for products with a broken
            seal.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-heading font-semibold">Return shipping</h2>
          <p className="leading-7 text-muted-foreground">
            The customer is responsible for all costs associated with returning an item, including
            return shipping. Organic Bloom does not cover return costs for any return, including
            damaged or incorrect orders. Please contact us for instructions before arranging a return.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-heading font-semibold">Refunds and exchanges</h2>
          <p className="leading-7 text-muted-foreground">
            Refunds may be considered for eligible, unopened products with the original seal intact
            after the return has been received and reviewed. Where approved, a refund is made to the
            original payment method where possible. An exchange or store credit may be arranged by
            agreement. Products with a broken seal cannot be refunded.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-2xl font-heading font-semibold">Contact us</h2>
          <p className="leading-7 text-muted-foreground">
            Email{" "}
            <a className="font-medium text-primary hover:underline" href="mailto:purebloomhavenke@gmail.com">
              purebloomhavenke@gmail.com
            </a>{" "}
            or call{" "}
            <a className="font-medium text-primary hover:underline" href="tel:+254704086080">
              +254 704 086 080
            </a>{" "}
            with your order number. You can also use our{" "}
            <Link className="font-medium text-primary hover:underline" to="/contact">contact page</Link>.
          </p>
        </section>
      </div>
    </main>
    <Footer />
  </div>
);

export default ReturnPolicy;
