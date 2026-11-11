import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Leaf, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import "./InositolProductPage.css";

const bundles = [
  { bottles: 1 as const, duration: "30 days", days: 30, was: 4200 },
  { bottles: 3 as const, duration: "90 days", days: 90, was: 10500, badge: "MOST POPULAR" },
  { bottles: 6 as const, duration: "180 days", days: 180, was: 21000, badge: "BEST VALUE" },
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
      <Header />

      <div className="ipdp-trustbar" aria-label="Product highlights">
        <span><Leaf aria-hidden="true" /> 40:1 inositol ratio</span>
        <span><Check aria-hidden="true" /> With folate + vitamin D3</span>
        <span><Truck aria-hidden="true" /> Delivery options at checkout</span>
        <span><ShieldCheck aria-hidden="true" /> Secure checkout</span>
      </div>

      <main>
        <section className="ipdp-hero" id="hero">
          <div className="ipdp-gallery">
            <div className="ipdp-product-image">
              {images.length > 0 ? (
                <button
                  type="button"
                  className="ipdp-image-zoom-trigger"
                  onClick={() => setIsImageZoomOpen(true)}
                  aria-label={`Enlarge product image ${activeImageIndex + 1} of ${images.length}`}
                >
                  <img src={activeImage} alt={name} width="900" height="1200" fetchPriority="high" decoding="async" />
                </button>
              ) : (
                <div className="ipdp-image-placeholder"><Leaf aria-hidden="true" /></div>
              )}
              <span className="ipdp-image-caption">France shGrace · Inositol+</span>
            </div>
            {images.length > 1 && (
              <div className="ipdp-gallery-thumbnails" aria-label="Product images">
                {images.map((src, index) => (
                  <button
                    type="button"
                    key={`${src}-${index}`}
                    className={`ipdp-gallery-thumbnail${activeImageIndex === index ? " is-selected" : ""}`}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`Show product image ${index + 1}`}
                    aria-pressed={activeImageIndex === index}
                  >
                    <img src={src} alt="" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="ipdp-buybox">
            <p className="ipdp-eyebrow">MYO + D-CHIRO INOSITOL</p>
            {totalReviews > 0 && (
              <div className="ipdp-rating" aria-label={`${averageRating.toFixed(1)} out of 5 from ${totalReviews} reviews`}>
                <span className="ipdp-stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star key={index} className={index < Math.round(averageRating) ? "is-filled" : ""} />
                  ))}
                </span>
                <span>{averageRating.toFixed(1)} ({totalReviews} {totalReviews === 1 ? "review" : "reviews"})</span>
              </div>
            )}
            <h1>{name}</h1>
            <p className="ipdp-subtitle">A 40:1 myo-inositol and D-chiro-inositol formula with folate and vitamin D3.</p>

            <div className="ipdp-bundles" role="radiogroup" aria-label="Choose a supply">
              {bundles.map((option, index) => (
                <button
                  type="button"
                  key={option.bottles}
                  role="radio"
                  aria-checked={selectedBundle === index}
                  className={`ipdp-bundle${selectedBundle === index ? " is-selected" : ""}`}
                  aria-label={`Select ${option.bottles} ${option.bottles === 1 ? "bottle" : "bottles"} for ${
                    bundleProducts[option.bottles]
                      ? formatKes(bundleProducts[option.bottles]!.price)
                      : "the listed offer price"
                  }`}
                  onClick={() => setSelectedBundle(index)}
                >
                  {option.badge && <span className="ipdp-bundle-badge">{option.badge}</span>}
                  <span className="ipdp-radio" aria-hidden="true">{selectedBundle === index && <span />}</span>
                  <span className="ipdp-bundle-info">
                    <strong>{option.bottles} {option.bottles === 1 ? "Bottle" : "Bottles"}</strong>
                    <small>
                      {option.duration}
                      {bundleProducts[option.bottles] && ` · ~${formatKes(Math.round(bundleProducts[option.bottles]!.price / option.days))}/day`}
                    </small>
                  </span>
                  <span className="ipdp-bundle-price">
                    <strong>
                      {bundleProducts[option.bottles]
                        ? formatKes(bundleProducts[option.bottles]!.price)
                        : bundleProductsLoading
                          ? "Loading..."
                          : "Unavailable"}
                    </strong>
                    {bundleProducts[option.bottles] && <small>{formatKes(option.was)}</small>}
                  </span>
                  {bundleProducts[option.bottles] && bundleProducts[option.bottles]!.price < option.was && (
                    <span className="ipdp-save">
                      Save {formatKes(option.was - bundleProducts[option.bottles]!.price)}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button ref={heroCtaRef} type="button" className="ipdp-cta" disabled={!canAddBundle} onClick={addSelectedBundle}>
              <ShoppingCart aria-hidden="true" />
              {canAddBundle
                ? `Add ${bundle.bottles} ${bundle.bottles === 1 ? "bottle" : "bottles"} to cart`
                : bundleProductsLoading
                  ? "Loading bundle options..."
                  : bundleProduct
                    ? "Out of stock"
                    : "Bundle unavailable"}
            </button>
            {bundleProductsError && (
              <p className="ipdp-checkout-note" role="status">
                Bundle options could not be loaded. Please refresh the page and try again.
              </p>
            )}
            <p className="ipdp-payment-note">M-Pesa and available delivery options are selected at checkout.</p>

            <div className="ipdp-quick-trust">
              <span><Check aria-hidden="true" /> 40:1 ratio</span>
              <span><Check aria-hidden="true" /> Folate + D3</span>
              <span><Check aria-hidden="true" /> Kenya delivery</span>
            </div>
          </div>
        </section>

        <section className="ipdp-intro ipdp-section" id="headline">
          <p className="ipdp-eyebrow">A THOUGHTFUL DAILY FORMULA</p>
          <h2>Find a formula that fits your routine.</h2>
          <p>
            France shGrace MYO &amp; D-CHIRO INOSITOL+ brings together myo-inositol,
            D-chiro-inositol, folate and vitamin D3 in one clearly described formula.
          </p>
          <ul className="ipdp-discover-list">
            <li>Understand the listed 40:1 inositol ratio.</li>
            <li>See the other nutrients included in the formula.</li>
            <li>Compare the available bottle quantities and prices.</li>
          </ul>
          <a className="ipdp-text-link" href="#mechanism">Explore the formula <span aria-hidden="true">↓</span></a>
        </section>

        <section className="ipdp-problem ipdp-section" id="problem">
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">A MORE INFORMED START</p>
            <h2>It can be hard to know what belongs in your routine.</h2>
            <p>
              Hormonal and cycle concerns have many possible causes. A supplement page
              cannot diagnose them or promise an outcome, but it can make the product
              ingredients and available options easier to review.
            </p>
          </div>
          <div className="ipdp-context-grid">
            <article><span>01</span><h3>Check the ingredient list</h3><p>Review the nutrients named on the product and packaging.</p></article>
            <article><span>02</span><h3>Compare the formula</h3><p>See how myo-inositol and D-chiro-inositol are presented together.</p></article>
            <article><span>03</span><h3>Get personal advice</h3><p>Talk to a healthcare professional about your individual needs.</p></article>
          </div>
          <div className="ipdp-solution">
            <div>
              <p className="ipdp-eyebrow">THE FORMULA</p>
              <h3>A 40:1 inositol blend with folate and vitamin D3.</h3>
              <p>Use the product label and professional guidance to decide if it suits you.</p>
            </div>
            <button type="button" className="ipdp-secondary-cta" onClick={scrollToPackages}>
              See supply options
            </button>
          </div>
        </section>

        <section className="ipdp-formula ipdp-section" id="mechanism">
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">THE SCIENCE OF THE 40:1 RATIO</p>
            <h2>Three actives, one clearly listed formula.</h2>
            <p>These are the ingredients named in the product description.</p>
          </div>
          <div className="ipdp-ingredient-grid">
            <article className="ipdp-ingredient ipdp-ratio-card">
              <div className="ipdp-ratio-mark"><span>40</span><i>:</i><span>1</span></div>
              <h3>Myo + D-chiro-inositol</h3>
              <p>Two forms of inositol in a 40:1 ratio.</p>
            </article>
            <article className="ipdp-ingredient">
              <span className="ipdp-ingredient-number">01</span>
              <h3>Myo-inositol</h3>
              <p>Paired with D-chiro-inositol as part of the formula.</p>
            </article>
            <article className="ipdp-ingredient">
              <span className="ipdp-ingredient-number">02</span>
              <h3>D-chiro-inositol</h3>
              <p>Included alongside myo-inositol in a 40:1 ratio.</p>
            </article>
            <article className="ipdp-ingredient">
              <span className="ipdp-ingredient-number">03</span>
              <h3>Folate + vitamin D3</h3>
              <p>Two additional nutrients listed in the product description.</p>
            </article>
          </div>
          <div className="ipdp-timeline">
            <div className="ipdp-section-heading">
              <p className="ipdp-eyebrow">WHAT TO EXPECT</p>
              <h2>Build a routine around the product label.</h2>
              <p>Timelines describe supply sizes only; individual results are not guaranteed.</p>
            </div>
            <div className="ipdp-timeline-grid">
              <article><span>01</span><strong>1 bottle</strong><small>30-day supply as shown in the mockup</small></article>
              <article><span>02</span><strong>3 bottles</strong><small>90-day supply as shown in the mockup</small></article>
              <article><span>03</span><strong>6 bottles</strong><small>180-day supply as shown in the mockup</small></article>
            </div>
          </div>
          <button type="button" className="ipdp-cta ipdp-section-cta" onClick={scrollToPackages}>
            Compare supply options
          </button>
        </section>

        <section className="ipdp-label-details ipdp-section" id="supplement-facts">
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">PRODUCT LABEL DETAILS</p>
            <h2>What’s in each serving?</h2>
            <p>Serving information and amounts shown in the product mockup. Check the package label for the latest details.</p>
          </div>
          <div className="ipdp-label-grid">
            <div className="ipdp-facts-card">
              <h3>Supplement facts</h3>
              <dl className="ipdp-serving-info">
                <div><dt>Serving size</dt><dd>4 capsules</dd></div>
                <div><dt>Servings per container</dt><dd>30</dd></div>
              </dl>
              <table className="ipdp-facts-table">
                <thead>
                  <tr><th scope="col">Amount per serving</th><th scope="col">Amount</th><th scope="col">%DV</th></tr>
                </thead>
                <tbody>
                  <tr><th scope="row">Vitamin D3 <small>(as cholecalciferol)</small></th><td>10 mcg</td><td>50%</td></tr>
                  <tr><th scope="row">Folate <small>(as methylfolate)</small></th><td>340 mcg DFE</td><td>85%</td></tr>
                  <tr><th scope="row">Myo-inositol</th><td>2,000 mg</td><td>**</td></tr>
                  <tr><th scope="row">D-chiro-inositol</th><td>50 mg</td><td>**</td></tr>
                </tbody>
              </table>
              <p className="ipdp-dv-note">** Daily Value (DV) not established.</p>
            </div>
            <div className="ipdp-directions-card">
              <p className="ipdp-eyebrow">DIRECTIONS SHOWN IN THE MOCKUP</p>
              <h3>Follow the serving directions on the package.</h3>
              <ol>
                <li><span>01</span>Take 2 capsules in the morning.</li>
                <li><span>02</span>Take 2 capsules in the evening.</li>
                <li><span>03</span>Preferably take with food.</li>
              </ol>
              <p>Use the actual product label if its directions differ. Ask a qualified healthcare professional if you have questions about taking this supplement.</p>
            </div>
          </div>
        </section>

        <section className="ipdp-routine ipdp-section" id="routine">
          <div className="ipdp-routine-copy">
            <p className="ipdp-eyebrow">A ROUTINE THAT STARTS WITH THE LABEL</p>
            <h2>Use it with care and confidence.</h2>
            <p>
              Follow the serving directions printed on the product packaging. If you have
              questions about whether a supplement is right for you, speak with a qualified
              healthcare professional.
            </p>
          </div>
          <div className="ipdp-routine-steps">
            <div><span>01</span><p><strong>Choose your supply</strong><small>Select the pack that suits your shopping preference.</small></p></div>
            <div><span>02</span><p><strong>Read the label</strong><small>Use the product only as directed on its packaging.</small></p></div>
            <div><span>03</span><p><strong>Ask when unsure</strong><small>Get personalised guidance from your healthcare professional.</small></p></div>
          </div>
        </section>

        <section className="ipdp-proof ipdp-section" id="proof">
          <div className="ipdp-proof-card">
            <div>
              <p className="ipdp-eyebrow">ANOTHER FALSE HOPE?</p>
              <h2>A supplement is not a substitute for medical care.</h2>
              <p>
                No routine or bottle count can guarantee changes to your cycle, skin,
                fertility, or other health outcomes. Choose based on the label, and ask
                a qualified professional if you are unsure.
              </p>
            </div>
            <div className="ipdp-proof-points">
              <span><Check aria-hidden="true" /> M-Pesa at checkout</span>
              <span><Check aria-hidden="true" /> Delivery options shown at checkout</span>
              <span><Check aria-hidden="true" /> Product information from the listing</span>
            </div>
          </div>
          <div className="ipdp-for-who">
            <p className="ipdp-eyebrow">WHO THIS IS FOR</p>
            <h2>For adults considering an inositol supplement as part of their wellness routine.</h2>
            <p>Check with your healthcare professional before use if you are pregnant, trying to conceive, taking medication, or managing a health condition.</p>
          </div>
          <p className="ipdp-disclaimer">
            This product is a food supplement, not a medicine. It is not intended to diagnose,
            treat, cure, or prevent any disease. If you are pregnant, trying to conceive,
            taking medication, or managing a health condition, consult a healthcare professional.
          </p>
        </section>

        <section className="ipdp-packages ipdp-section" id="package-selector" ref={packageSelectorRef}>
          <div className="ipdp-section-heading">
            <p className="ipdp-eyebrow">CHOOSE YOUR SUPPLY</p>
            <h2>Pick your package.</h2>
            <p>Each pack is a separate catalog item. Add your chosen bundle to the cart at the price shown.</p>
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
                    <p className="ipdp-package-was">{formatKes(option.was)} · Save {formatKes(option.was - product.price)}</p>
                  )}
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
                      ? `Add ${option.bottles} ${option.bottles === 1 ? "bottle" : "bottles"} to cart`
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
          <h2>Paid your way, delivered with care.</h2>
          <div className="ipdp-payment-grid">
            <article><ShieldCheck aria-hidden="true" /><h3>Secure checkout</h3><p>Available payment methods appear during checkout.</p></article>
            <article><Truck aria-hidden="true" /><h3>Delivery options</h3><p>Choose an available delivery or pickup option at checkout.</p></article>
          </div>
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
