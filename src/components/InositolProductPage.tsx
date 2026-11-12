import { useEffect, useRef, useState, type ReactNode } from "react";
import { Activity, ArrowRight, Check, Leaf, LockKeyhole, ShieldCheck, Star, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import "./InositolProductPage.css";

const bundles = [
  {
    bottles: 1 as const,
    duration: "30 days",
    days: 30,
    was: 4200,
    description: "An introductory supply for getting to know the formula.",
    delivery: "Standard delivery across Kenya",
  },
  {
    bottles: 3 as const,
    duration: "90 days",
    days: 90,
    was: 10500,
    badge: "MOST POPULAR",
    description: "A three-month supply for a consistent daily routine.",
    delivery: "Free express delivery across Kenya",
    bonus: "Includes a cycle and ovulation tracking guide",
  },
  {
    bottles: 6 as const,
    duration: "180 days",
    days: 180,
    was: 21000,
    badge: "BEST VALUE",
    description: "A longer supply for ongoing use as part of your wellness routine.",
    delivery: "Free priority delivery and plain, discreet packaging",
    bonus: "Includes a cycle tracking guide and priority WhatsApp consultation access",
  },
];

const formatKes = (amount: number) => `KSh ${amount.toLocaleString("en-KE")}`;

export type InositolBundleProduct = {
  id: string;
  name: string;
  price: number;
  stockQuantity: number;
};

type InositolProductPageProps = {
  name: string;
  images: string[];
  bundleProducts: Partial<Record<1 | 3 | 6, InositolBundleProduct>>;
  bundleProductsLoading: boolean;
  bundleProductsError: boolean;
  selectedBundleBottles: 1 | 3 | 6;
  averageRating: number;
  totalReviews: number;
  reviewRating: number;
  setReviewRating: (rating: number) => void;
  hasReviewed: boolean;
  isSubmittingReview: boolean;
  submitReview: () => void;
  isAuthenticated: boolean;
  showAuthModal: boolean;
  setShowAuthModal: (open: boolean) => void;
  authModalContent: ReactNode;
  onAddToCart: (product: InositolBundleProduct) => void;
};

const InositolProductPage = ({
  name,
  images,
  bundleProducts,
  bundleProductsLoading,
  bundleProductsError,
  selectedBundleBottles,
  averageRating,
  totalReviews,
  reviewRating,
  setReviewRating,
  hasReviewed,
  isSubmittingReview,
  submitReview,
  isAuthenticated,
  showAuthModal,
  setShowAuthModal,
  authModalContent,
  onAddToCart,
}: InositolProductPageProps) => {
  const selectedBundleIndex = bundles.findIndex((option) => option.bottles === selectedBundleBottles);
  const [selectedBundle, setSelectedBundle] = useState(Math.max(0, selectedBundleIndex));
  const [selectedImage, setSelectedImage] = useState(0);
  const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
  const [showStickyBuy, setShowStickyBuy] = useState(false);
  const heroCtaRef = useRef<HTMLButtonElement>(null);
  const packageSelectorRef = useRef<HTMLElement>(null);
  const bundle = bundles[selectedBundle];
  const bundleProduct = bundleProducts[bundle.bottles];
  const activeImageIndex = selectedImage < images.length ? selectedImage : 0;
  const activeImage = images[activeImageIndex];
  const canAddBundle = Boolean(bundleProduct && bundleProduct.stockQuantity > 0);

  useEffect(() => {
    setSelectedBundle(Math.max(0, selectedBundleIndex));
  }, [selectedBundleIndex, setSelectedBundle]);

  useEffect(() => {
    const heroCta = heroCtaRef.current;
    const packageSelector = packageSelectorRef.current;
    if (!heroCta || !packageSelector) return;

    const updateStickyVisibility = () => {
      const isVisible = (element: Element) => {
        const bounds = element.getBoundingClientRect();
        return bounds.bottom > 0 && bounds.top < window.innerHeight;
      };
      setShowStickyBuy(!isVisible(heroCta) && !isVisible(packageSelector));
    };
    const observer = new IntersectionObserver(updateStickyVisibility, { threshold: 0 });
    observer.observe(heroCta);
    observer.observe(packageSelector);
    return () => observer.disconnect();
  }, []);

  const addSelectedBundle = () => {
    if (canAddBundle && bundleProduct) onAddToCart(bundleProduct);
  };

  const scrollToPackages = () => {
    packageSelectorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="ipdp">
      <Header logoOnly />

      <div className="ipdp-trustbar" aria-label="Product highlights">
        <span><Leaf aria-hidden="true" /> 40:1 inositol ratio</span>
        <span><Check aria-hidden="true" /> With folate + vitamin D3</span>
        <span><Truck aria-hidden="true" /> Delivery options at checkout</span>
        <span><ShieldCheck aria-hidden="true" /> Secure checkout</span>
      </div>

      <main>
        <section className="ipdp-hero" id="hero">
          <div className="ipdp-hero-copy">
            <div className="ipdp-hero-meta" aria-label="Product highlights">
              {totalReviews > 0 && (
                <span className="ipdp-hero-rating">
                  <Star aria-hidden="true" /> {averageRating.toFixed(1)}/5 · {totalReviews}+ reviews
                </span>
              )}
              <span>40:1 Ratio</span>
              <span>Easy to follow</span>
              <span>Folate + Vitamin D3</span>
            </div>

            <h1>Still Guessing When Your Period Will Come, Battling Chin Hairs, And Stubborn Belly Fat Won&apos;t Budge?</h1>

            <p className="ipdp-hero-note">
              Unpredictable cycles, breakouts, or unwanted facial hair can have many causes.
              This daily formula combines myo- and D-chiro-inositol with folate and vitamin D3
              to support your wellness routine.
            </p>

            <ul className="ipdp-hero-bullets">
              <li>Made with myo- and D-chiro-inositol in a 40:1 ratio.</li>
              <li>Includes folate and vitamin D3 in one convenient formula.</li>
              <li>A simple daily addition to a broader, clinician-guided wellness plan.</li>
            </ul>

            <p className="ipdp-hero-powered">
              Ask your healthcare professional whether inositol is right for you.
            </p>
          </div>

          <div className="ipdp-product-showcase">
            <div className="ipdp-showcase-card" aria-label="Product image collage">
              <div className="ipdp-showcase-bottle ipdp-showcase-bottle--main">
                {images[0] ? (
                  <button type="button" className="ipdp-image-zoom-trigger" onClick={() => setIsImageZoomOpen(true)} aria-label="Enlarge product image">
                    <img src={images[0]} alt={name} />
                  </button>
                ) : (
                  <div className="ipdp-image-placeholder"><Leaf aria-hidden="true" /></div>
                )}
              </div>

              <div className="ipdp-showcase-steps">
                <div className="ipdp-showcase-step">
                  <span>40:1</span>
                  <small>Myo- to D-chiro-inositol</small>
                </div>
                <div className="ipdp-showcase-step">
                  <span>FOLATE</span>
                  <small>Included in the formula</small>
                </div>
                <div className="ipdp-showcase-step">
                  <span>VITAMIN D3</span>
                  <small>Included in the formula</small>
                </div>
              </div>
            </div>

            <button ref={heroCtaRef} type="button" className="ipdp-showcase-cta" aria-live="polite" onClick={scrollToPackages}>
              <strong>Choose your supply</strong>
            </button>
          </div>
        </section>

        <section className="ipdp-intro ipdp-section" id="headline">
          <div className="ipdp-hero-copy-block">
            <p className="ipdp-eyebrow">WHY WOMEN ARE SWITCHING</p>
            <h2>
              Understanding your cycle can start with understanding what may be affecting it.
            </h2>
            <p>
              Inositol is involved in cellular signaling, and research is exploring its role
              in reproductive health. The 40:1 blend brings myo- and D-chiro-inositol together
              with folate and vitamin D3 in one daily supplement.
            </p>
          </div>
        </section>

        <section className="ipdp-proof ipdp-section" id="proof">
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">A CLOSER LOOK</p>
            <h2>Three things to know about cycle health</h2>
            <p>Learn what may be happening and where a supplement can—and cannot—fit.</p>
          </div>

          <div className="ipdp-discover-grid">
            <article>
              <span>1</span>
              <h3>Many factors can affect cycles</h3>
              <p>Insulin resistance can be associated with PCOS for some people, but irregular cycles have several possible causes.</p>
            </article>
            <article>
              <span>2</span>
              <h3>Look for the stated ratio</h3>
              <p>This formula pairs myo- and D-chiro-inositol in a 40:1 ratio. Check the product label for the exact serving and ingredients.</p>
            </article>
            <article>
              <span>3</span>
              <h3>Build a broader wellness plan</h3>
              <p>Folate and vitamin D3 are included alongside inositol. A supplement is one part of wellbeing, not a guaranteed “ovarian reboot.”</p>
            </article>
          </div>
        </section>

        <section className="ipdp-problem ipdp-section" id="symptoms">
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">DOES THIS SOUND FAMILIAR?</p>
            <h2>It can be hard not knowing what to expect.</h2>
            <p>Changes to your cycle or skin are not a personal failing—and you deserve clear, compassionate care.</p>
          </div>
          <div className="ipdp-context-grid">
            <article><span>01</span><h3>Unpredictable periods</h3><p>Cycles that are late, absent, or unusually long can be stressful to manage.</p></article>
            <article><span>02</span><h3>Painful or heavy periods</h3><p>Persistent heavy bleeding or severe pain should be assessed by a healthcare professional.</p></article>
            <article><span>03</span><h3>Skin and hair changes</h3><p>Acne, oily skin, or facial hair can affect confidence and may have different underlying causes.</p></article>
            <article><span>04</span><h3>Energy and cravings</h3><p>Energy dips and cravings are common experiences, but they are not enough on their own to identify a cause.</p></article>
          </div>
          <p className="ipdp-disclaimer">
            Persistent or heavy bleeding, severe pain, or a sudden change in your cycle deserves medical attention.
            Speak with a qualified healthcare professional for diagnosis and treatment options.
          </p>
        </section>

        <section className="ipdp-formula ipdp-section" id="how-it-works">
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">THE INSULIN–HORMONE CONNECTION</p>
            <h2>A possible pathway—not the whole story</h2>
            <p>For some people with PCOS, insulin resistance may be part of a wider hormonal picture. It is not the only explanation for cycle changes.</p>
          </div>
          <div className="ipdp-root-flow" aria-label="A possible insulin and hormone pathway">
            <article>
              <span className="ipdp-flow-icon"><LockKeyhole aria-hidden="true" /></span>
              <p className="ipdp-flow-step">STEP 1</p>
              <h3>Insulin sensitivity may change</h3>
              <p>When the body responds less effectively to insulin, blood sugar regulation can be affected.</p>
            </article>
            <ArrowRight className="ipdp-flow-arrow" aria-hidden="true" />
            <article>
              <span className="ipdp-flow-icon"><Activity aria-hidden="true" /></span>
              <p className="ipdp-flow-step">STEP 2</p>
              <h3>Insulin levels may rise</h3>
              <p>The body may produce more insulin to help manage blood glucose levels.</p>
            </article>
            <ArrowRight className="ipdp-flow-arrow" aria-hidden="true" />
            <article>
              <span className="ipdp-flow-icon"><Leaf aria-hidden="true" /></span>
              <p className="ipdp-flow-step">STEP 3</p>
              <h3>Hormones can be affected</h3>
              <p>In some people with PCOS, higher insulin levels are associated with changes in ovarian hormones.</p>
            </article>
          </div>
        </section>

        <section className="ipdp-section ipdp-comparison" id="compare">
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">THE SOLUTION</p>
            <h2>Different approaches serve different purposes.</h2>
            <p>This supplement is a nutrition option—not a replacement for prescribed care, contraception, or individualized nutrition advice.</p>
          </div>
          <div className="ipdp-approach-grid">
            <article className="is-featured">
              <p className="ipdp-eyebrow">THIS FORMULA</p>
              <h3>France shGrace 40:1</h3>
              <p>Myo- and D-chiro-inositol in a 40:1 ratio, with folate and vitamin D3 as listed for this product.</p>
            </article>
            <article>
              <p className="ipdp-eyebrow">OTHER SUPPLEMENTS</p>
              <h3>Check the ingredient label</h3>
              <p>Inositol ratios, amounts, and added nutrients vary between products. Compare the full label and serving size.</p>
            </article>
            <article>
              <p className="ipdp-eyebrow">PRESCRIBED OPTIONS</p>
              <h3>Discuss your goals with a clinician</h3>
              <p>Hormonal birth control may be appropriate for some people and has different uses and considerations from a dietary supplement.</p>
            </article>
            <article>
              <p className="ipdp-eyebrow">NUTRITION</p>
              <h3>Avoid one-size-fits-all rules</h3>
              <p>Very restrictive diets are not necessary for everyone. A clinician or dietitian can help you choose a sustainable approach.</p>
            </article>
          </div>
        </section>

        <section className="ipdp-section ipdp-ingredients" id="ingredients">
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">THE FORMULA</p>
            <h2>Inositol, folate, and vitamin D3.</h2>
            <p>Four listed nutrients in one formula, with a 40:1 ratio between the two forms of inositol.</p>
          </div>
          <div className="ipdp-ingredient-grid">
            <article className="ipdp-ingredient ipdp-ratio-card">
              <span className="ipdp-ingredient-number">01</span>
              <h3>Myo-inositol</h3>
              <p className="ipdp-ingredient-amount">2,000 mg</p>
              <p>Involved in cellular signaling, including pathways related to insulin.</p>
            </article>
            <article className="ipdp-ingredient">
              <span className="ipdp-ingredient-number">02</span>
              <h3>D-chiro-inositol</h3>
              <p className="ipdp-ingredient-amount">50 mg</p>
              <p>Paired with myo-inositol to provide the stated 40:1 ratio.</p>
            </article>
            <article className="ipdp-ingredient">
              <span className="ipdp-ingredient-number">03</span>
              <h3>Folate</h3>
              <p className="ipdp-ingredient-amount">340 mcg DFE</p>
              <p>Folate contributes to normal cell division and growth.</p>
            </article>
            <article className="ipdp-ingredient">
              <span className="ipdp-ingredient-number">04</span>
              <h3>Vitamin D3</h3>
              <p className="ipdp-ingredient-amount">10 mcg</p>
              <p>Vitamin D contributes to normal immune function and bone health.</p>
            </article>
          </div>
          <p className="ipdp-disclaimer">
            Ingredient amounts are shown as provided for this product. Check the package for the serving size,
            full ingredient list, directions, and current label information.
          </p>
        </section>

        <section className="ipdp-section ipdp-progress" id="progress">
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">YOUR 90-DAY CHECK-IN PLAN</p>
            <h2>Track how you feel—without expecting a guaranteed timeline.</h2>
            <p>People respond differently to supplements. Use these check-ins to record changes and discuss next steps with your healthcare professional.</p>
          </div>
          <div className="ipdp-timeline">
            <div className="ipdp-timeline-grid">
              <article>
                <span>WEEKS 2–4</span>
                <strong>Build a routine</strong>
                <small>Follow the label directions and note how you feel, including any unwanted effects.</small>
              </article>
              <article>
                <span>WEEKS 5–8</span>
                <strong>Keep a simple record</strong>
                <small>Track cycle dates and symptoms. Contact a clinician with concerns or persistent changes.</small>
              </article>
              <article>
                <span>DAYS 60–90</span>
                <strong>Review cycle changes</strong>
                <small>Record any changes and discuss them with your healthcare professional. Individual results and timelines vary.</small>
              </article>
            </div>
          </div>
          <p className="ipdp-disclaimer">
            This check-in calendar is for planning only; it does not predict when energy, skin, or menstrual cycles will change.
          </p>
          <div className="ipdp-phase-three">
            <p className="ipdp-eyebrow">PHASE 3 · DAYS 60–90</p>
            <h3>Notice patterns and choose your next step</h3>
            <p>
              Keep tracking cycle dates, symptoms, and how you feel. If you have concerns about
              ovulation or cycle changes, a healthcare professional can help assess possible causes
              and discuss appropriate care. This supplement cannot guarantee ovulation or predictable
              cycles.
            </p>
            <button type="button" className="ipdp-showcase-cta" onClick={scrollToPackages}>
              <strong>Start your 90-day routine</strong>
            </button>
          </div>
        </section>

        <section className="ipdp-section ipdp-customer-story" id="customer-story">
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">REAL CUSTOMER PROOF</p>
            <h2>In her own words</h2>
            <p>One customer’s experience—not a promise of typical results.</p>
          </div>
          <blockquote>
            <p>
              “Before I started using Myo-inositol, I was struggling with excessive bleeding,
              a period that rarely went away for weeks on end, and very painful period cramps.
              Facial hair and very oily face were my biggest insecurities.
            </p>
            <p>
              Within the first month, I started noticing my cravings for sugar started to disappear.
              My period came back painless in the second month of taking inositol and it actually
              stopped after four days.
            </p>
            <p>
              Now, after 3 months, I can confidently say that I ovulated just this last month and
              I now remember how it actually feels to ovulate again. I feel more energetic. The
              biggest difference has been being able to feel like myself again. I’m glad I gave it a try.”
            </p>
            <footer>
              <strong>Anne A.</strong>
              <span>Nairobi · Verified Buyer</span>
            </footer>
          </blockquote>
          <p className="ipdp-disclaimer">
            This is an individual customer account. Results vary and are not guaranteed. The
            testimonial does not establish that the supplement caused these changes.
          </p>
        </section>

        <section className="ipdp-section ipdp-skeptic-note" id="expectations">
          <div>
            <p className="ipdp-eyebrow">SKEPTICAL? THAT’S UNDERSTANDABLE.</p>
            <h2>Make an informed choice, without a results promise.</h2>
            <p>
              Supplements affect people differently. Review the ingredients, follow the label,
              and ask your healthcare professional whether this product fits your needs. Our current
              return conditions are available in the Returns and Refunds policy.
            </p>
            <Link to="/return-policy">Read the Returns and Refunds policy <ArrowRight aria-hidden="true" /></Link>
          </div>
        </section>

        <section className="ipdp-section ipdp-care-note" id="care-options">
          <div>
            <p className="ipdp-eyebrow">CARE THAT FITS YOU</p>
            <h2>There is no one-size-fits-all fix.</h2>
            <p>Birth control, nutrition changes, and supplements may each be discussed as part of care depending on your health and goals. Do not stop or change prescribed treatment without talking to your clinician.</p>
          </div>
          <button type="button" className="ipdp-secondary-cta" onClick={scrollToPackages}>
            Explore the formula <ArrowRight aria-hidden="true" />
          </button>
        </section>

        <section className="ipdp-packages ipdp-section" id="package-selector" ref={packageSelectorRef}>
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">SELECT YOUR SUPPLY</p>
            <h2>Choose 30, 90, or 180 days.</h2>
            <p>Compare your options and add the matching pack to your cart. Prices are shown in KSh.</p>
          </div>
          <div className="ipdp-package-grid">
            {bundles.map((option, index) => {
              const product = bundleProducts[option.bottles];
              return (
                <article className={`ipdp-package${selectedBundle === index ? " is-selected" : ""}`} key={option.bottles}>
                  {option.badge && <span className="ipdp-package-badge">{option.badge}</span>}
                  <p className="ipdp-package-size">{option.bottles} {option.bottles === 1 ? "Bottle" : "Bottles"}</p>
                  <p className="ipdp-package-duration">
                    {option.duration}
                    {product && ` · ~${formatKes(Math.round(product.price / option.days))}/day`}
                  </p>
                  <p className="ipdp-package-price">
                    {product ? formatKes(product.price) : bundleProductsLoading ? "Loading..." : "Unavailable"}
                  </p>
                  {product && product.price < option.was && (
                    <p className="ipdp-package-was">
                      <span>{formatKes(option.was)}</span> · Save {formatKes(option.was - product.price)}
                    </p>
                  )}
                  <p className="ipdp-package-description">{option.description}</p>
                  {option.delivery && <p className="ipdp-package-extra"><Truck aria-hidden="true" />{option.delivery}</p>}
                  {option.bonus && <p className="ipdp-package-extra"><Check aria-hidden="true" />{option.bonus}</p>}
                  <button
                    type="button"
                    className={index === 0 ? "ipdp-package-outline" : "ipdp-package-cta"}
                    disabled={!product || product.stockQuantity <= 0}
                    aria-pressed={selectedBundle === index}
                    onClick={() => {
                      setSelectedBundle(index);
                      if (product) onAddToCart(product);
                    }}
                  >
                    {product
                      ? option.bottles === 1
                        ? "Add 1-bottle starter to cart"
                        : option.bottles === 3
                          ? "Add 3-bottle supply to cart"
                          : "Add 6-bottle supply to cart"
                      : bundleProductsLoading
                        ? "Loading bundle..."
                        : "Bundle unavailable"}
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        <section className="ipdp-payment ipdp-section" id="payment">
          <p className="ipdp-eyebrow">LOCAL PAYMENT &amp; DELIVERY</p>
          <h2>Paid your way, delivered quietly.</h2>
          <div className="ipdp-payment-grid">
            <article><ShieldCheck aria-hidden="true" /><h3>M-Pesa Express</h3><p>Use M-Pesa STK Push at checkout. Other available payment methods are shown during checkout.</p></article>
            <article><Truck aria-hidden="true" /><h3>Delivery across Kenya</h3><p>Delivery is available across Kenya, including Nairobi, Mombasa, Kisumu, Nakuru, and all 47 counties. Plain, unbranded packaging is used.</p></article>
          </div>
          <div className="ipdp-payment-methods" aria-label="Payment methods">
            <span>M-Pesa Express</span>
            <span>Card options at checkout</span>
          </div>
          <div className="ipdp-delivery-note">
            <strong>Estimated delivery</strong>
            <span>Within 24 hours in Nairobi Metro · Within 48 hours nationwide</span>
          </div>
          <p className="ipdp-payment-disclaimer">Delivery estimates are subject to location and order confirmation.</p>
        </section>

        <section className="ipdp-reviews ipdp-section" id="reviews">
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">CUSTOMER REVIEWS</p>
            <h2>Real feedback from customers.</h2>
            {totalReviews > 0 ? (
              <div className="ipdp-rating ipdp-review-summary">
                <span className="ipdp-stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className={index < Math.round(averageRating) ? "is-filled" : ""} />
                  ))}
                </span>
                <span>{averageRating.toFixed(1)} average · {totalReviews} {totalReviews === 1 ? "review" : "reviews"}</span>
              </div>
            ) : (
              <p>There are no customer ratings for this product yet.</p>
            )}
          </div>

          {!hasReviewed && (
            <div className="ipdp-review-form">
              <h3>Share your rating</h3>
              {isAuthenticated ? (
                <>
                  <div className="ipdp-rate-picker" aria-label="Choose a rating">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        type="button"
                        key={rating}
                        onClick={() => setReviewRating(rating)}
                        aria-label={`Rate ${rating} star${rating > 1 ? "s" : ""}`}
                      >
                        <Star className={rating <= reviewRating ? "is-filled" : ""} />
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="ipdp-review-submit"
                    disabled={isSubmittingReview || reviewRating === 0}
                    onClick={submitReview}
                  >
                    {isSubmittingReview ? "Submitting…" : "Submit rating"}
                  </button>
                </>
              ) : (
                <p>
                  Please{" "}
                  <button type="button" className="ipdp-inline-button" onClick={() => setShowAuthModal(true)}>
                    log in
                  </button>{" "}
                  to write a review.
                </p>
              )}
            </div>
          )}
        </section>

      </main>

      <div className={`ipdp-sticky-buy${showStickyBuy ? " is-visible" : ""}`}>
        <div><strong>France shGrace Inositol+</strong><small>Save up to 17%</small></div>
        <button type="button" onClick={scrollToPackages}>
          Select bundle
        </button>
      </div>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md bg-card border-border rounded-xl p-0 max-h-[90vh] overflow-y-auto">
          {authModalContent}
        </DialogContent>
      </Dialog>
      <Dialog open={isImageZoomOpen} onOpenChange={setIsImageZoomOpen}>
        <DialogContent className="ipdp-image-dialog">
        {activeImage && <img src={activeImage} alt={name} />}
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default InositolProductPage;
