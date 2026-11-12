// import { useEffect, useRef, useState, type ReactNode } from "react";
// import {
//   Activity,
//   CalendarDays,
//   Check,
//   CircleCheck,
//   Clock3,
//   Leaf,
//   LockKeyhole,
//   ShieldCheck,
//   Star,
//   Truck,
// } from "lucide-react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import periodSupportLifestyle from "@/assets/period-support-lifestyle.jpeg";
// import periodSupportMirror from "@/assets/period-support-mirror.jpeg";
// import periodSupportConfidence from "@/assets/period-support-confidence.jpeg";
// import periodSupportDailyRoutine from "@/assets/period-support-daily-routine.jpeg";
// import "./InositolProductPage.css";

// const bundles = [
//   {
//     bottles: 1 as const,
//     duration: "30 days",
//     days: 30,
//     was: 4200,
//     expected: 3499,
//     daily: 117,
//     description: "Ideal for: Initial cellular reset & blood sugar stabilization",
//     delivery: "Standard Delivery Across Kenya",
//     button: "Select 1-Bottle Starter",
//   },
//   {
//     bottles: 3 as const,
//     duration: "90 days",
//     days: 90,
//     was: 10500,
//     expected: 9750,
//     daily: 108,
//     badge: "MOST POPULAR",
//     description: "Ideal for: Complete egg follicle maturation, regular cycle dates & jawline flare-up reduction",
//     delivery: "FREE Express Delivery Across Kenya",
//     bonus: "Bonus: Free Cycle & Ovulation Tracking Guide",
//     button: "Select 3-Bottle Cycle Reset (Save 7%)",
//   },
//   {
//     bottles: 6 as const,
//     duration: "180 days",
//     days: 180,
//     was: 21000,
//     expected: 18000,
//     daily: 100,
//     badge: "BEST VALUE",
//     description: "Ideal for: Women actively trying to conceive (TTC) or long-term androgen maintenance",
//     delivery: "FREE Priority Delivery Across Kenya + Plain Discreet Packaging",
//     bonus: "Bonus: Free Cycle Tracking Guide + Priority WhatsApp Consultation Access",
//     button: "Select 6-Bottle Best Value (Save 14%)",
//   },
// ];

// const formatKes = (amount: number) => `KSh ${amount.toLocaleString("en-KE")}`;

// export type InositolBundleProduct = {
//   id: string;
//   name: string;
//   price: number;
//   stockQuantity: number;
// };

// type InositolProductPageProps = {
//   name: string;
//   images: string[];
//   bundleProducts: Partial<Record<1 | 3 | 6, InositolBundleProduct>>;
//   bundleProductsLoading: boolean;
//   bundleProductsError: boolean;
//   selectedBundleBottles: 1 | 3 | 6;
//   averageRating: number;
//   totalReviews: number;
//   reviewRating: number;
//   setReviewRating: (rating: number) => void;
//   hasReviewed: boolean;
//   isSubmittingReview: boolean;
//   submitReview: () => void;
//   isAuthenticated: boolean;
//   showAuthModal: boolean;
//   setShowAuthModal: (open: boolean) => void;
//   authModalContent: ReactNode;
//   onAddToCart: (product: InositolBundleProduct) => void;
// };

// const InositolProductPage = ({
//   name,
//   images,
//   bundleProducts,
//   bundleProductsLoading,
//   bundleProductsError,
//   selectedBundleBottles,
//   averageRating,
//   totalReviews,
//   reviewRating,
//   setReviewRating,
//   hasReviewed,
//   isSubmittingReview,
//   submitReview,
//   isAuthenticated,
//   showAuthModal,
//   setShowAuthModal,
//   authModalContent,
//   onAddToCart,
// }: InositolProductPageProps) => {
//   const selectedBundleIndex = bundles.findIndex((option) => option.bottles === selectedBundleBottles);
//   const [selectedBundle, setSelectedBundle] = useState(Math.max(0, selectedBundleIndex));
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isImageZoomOpen, setIsImageZoomOpen] = useState(false);
//   const [showStickyBuy, setShowStickyBuy] = useState(false);
//   const heroCtaRef = useRef<HTMLButtonElement>(null);
//   const packageSelectorRef = useRef<HTMLElement>(null);
//   const activeImageIndex = selectedImage < images.length ? selectedImage : 0;
//   const activeImage = images[activeImageIndex];

//   useEffect(() => {
//     setSelectedBundle(Math.max(0, selectedBundleIndex));
//   }, [selectedBundleIndex]);

//   useEffect(() => {
//     const heroCta = heroCtaRef.current;
//     const packageSelector = packageSelectorRef.current;
//     if (!heroCta || !packageSelector) return;

//     const updateStickyVisibility = () => {
//       const isVisible = (element: Element) => {
//         const bounds = element.getBoundingClientRect();
//         return bounds.bottom > 0 && bounds.top < window.innerHeight;
//       };
//       setShowStickyBuy(!isVisible(heroCta) && !isVisible(packageSelector));
//     };
//     const observer = new IntersectionObserver(updateStickyVisibility, { threshold: 0 });
//     observer.observe(heroCta);
//     observer.observe(packageSelector);
//     return () => observer.disconnect();
//   }, []);

//   const scrollToPackages = () => {
//     packageSelectorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
//   };

//   const comparisonRows = [
//     "Exact 40:1 Plasma Match",
//     "Zero Toxic D-Chiro Excess",
//     "Bioactive Folate & Vitamin D3 Included",
//     "Supports Natural Ovulation Without Masking",
//   ];

//   return (
//     <div className="ipdp">
//       <Header logoOnly />

//       <main className="copy-page">
//         <section className="copy-hero" id="hero">
//           <div className="copy-hero-content">
//             <p className="copy-rating">4.8/5 | 103+ Happy Women</p>
//             <h1>Still Guessing When Your Period Will Come, Battling Chin Hairs, And Stubborn Belly Fat Won&apos;t Budge?</h1>
//             <p className="copy-hero-intro">
//               Your hormones have been locked in a traffic jam by high insulin and sluggish ovaries. This natural 40:1 doctor-trusted formula helps reboot your cycle, balance key hormones, and clear out the backlog from within.
//             </p>
//             <ul className="copy-benefits">
//               <li>Bring back predictable, natural monthly cycles without dark calendar fear or endless spotting.</li>
//               <li>Quiet 3 PM sugar cravings and level out your daily energy from morning to night.</li>
//               <li>Clear up stubborn jawline acne and painful hormonal breakouts on your skin.</li>
//               <li>Powered by pure Myo &amp; D-Chiro Inositol, Folate, and Vitamin D3.</li>
//             </ul>
//             <button type="button" className="copy-primary-button" onClick={scrollToPackages}>
//               Reclaim Your Cycle Today🛡️ 90-Day Money-Back Guarantee
//             </button>
//           </div>
//           <div className="copy-product-image">
//             {images[0] ? (
//               <button type="button" onClick={() => setIsImageZoomOpen(true)} aria-label="Enlarge product image">
//                 <img src={images[0]} alt={name} />
//               </button>
//             ) : (
//               <div className="copy-image-placeholder"><Leaf aria-hidden="true" /></div>
//             )}
//             {images.length > 1 && (
//               <div className="copy-image-thumbnails" aria-label="Product images">
//                 {images.map((image, index) => (
//                   <button
//                     type="button"
//                     key={image}
//                     className={index === activeImageIndex ? "is-selected" : ""}
//                     onClick={() => setSelectedImage(index)}
//                     aria-label={`Show product image ${index + 1}`}
//                   >
//                     <img src={image} alt="" />
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>

//         <section className="copy-quick-purchase" aria-label="Select your supply">
//           <h2>Select Your Supply</h2>
//           <div className="copy-quick-bundles">
//             {bundles.map((option, index) => {
//               const product = bundleProducts[option.bottles];
//               return (
//                 <button
//                   type="button"
//                   className={`copy-quick-bundle${selectedBundle === index ? " is-selected" : ""}`}
//                   key={option.bottles}
//                   aria-pressed={selectedBundle === index}
//                   onClick={() => {
//                     setSelectedBundle(index);
//                     scrollToPackages();
//                   }}
//                 >
//                   <strong>{option.bottles} Bottle{option.bottles > 1 ? "s" : ""}</strong>
//                   <span>{option.duration} · ~KSh {option.daily}/day</span>
//                   <span><del>{formatKes(option.was)}</del> {formatKes(product?.price ?? option.expected)}</span>
//                   <small>Save {formatKes(option.was - (product?.price ?? option.expected))}</small>
//                   {option.badge && <b>{option.badge}</b>}
//                 </button>
//               );
//             })}
//           </div>
//           <button type="button" className="copy-primary-button" onClick={scrollToPackages}>
//             Reclaim Your Cycle &amp; Ovarian Harmony Today
//           </button>
//           <p>M-Pesa STK Push / Plain Delivery</p>
//           <p>Select Your 30, 90, or 180-Day Supply | 100% Risk-Free Guarantee</p>
//         </section>

//         <div className="copy-trustbar" aria-label="Product features">
//           <span><CircleCheck aria-hidden="true" />100% Bioavailable</span>
//           <span><ShieldCheck aria-hidden="true" />GMP Certified</span>
//           <span><LockKeyhole aria-hidden="true" />Discreet Packaging</span>
//           <span><Truck aria-hidden="true" />24–48hr Local Delivery</span>
//         </div>

//         <section className="copy-section copy-intro" id="why-women-are-switching">
//           <p className="copy-eyebrow">Why women are switching</p>
//           <h2>How To Go From Feeling Anxious Over Cycles You Can&apos;t Predict, Frustrated By Stubborn Chin Hair, A Very Oily Face &amp; Jawline Bumps, And Exhausted By 3 PM Sugar Crashes…To Experiencing Regular Monthly Cycles, Clear Smooth Skin, And Feeling Like Yourself Again Once And For All—By Rebooting Your Ovarian Insulin Receptors With The Exact 40:1 Plasma Ratio—In 90 Days Or Less.</h2>
//           <p>No synthetic birth control pills that just mask the problem. No dismissive &quot;just lose weight&quot; advice from doctors. No expensive foreign supplements with unbalanced ratios. Just the clean, natural biological key your ovaries need to mature and release eggs predictably.</p>
//           <h3>What you are going to discover on this page today:</h3>
//           <ol className="copy-discover-list">
//             <li><span>1</span><p><strong>The Real Root Cause:</strong> Why elevated insulin signals your ovaries to produce excess testosterone - trapping immature eggs in small cysts, stalling your period, and triggering a very oily face and stubborn jawline acne.</p></li>
//             <li><span>2</span><p><strong>The 40:1 Plasma Ratio Secret:</strong> Why cheaper supplements with excess D-Chiro Inositol actually damage egg quality—and why the exact 40:1 Myo to D-Chiro ratio is the biological &quot;sweet spot&quot; for cell communication.</p></li>
//             <li><span>3</span><p><strong>The Synergistic Ovarian Reboot:</strong> How pairing pure 40:1 Inositol with bioactive Folate and Vitamin D3 reduces internal inflammation, feeds cell growth, and creates the ideal environment for regular cycle dates.</p></li>
//           </ol>
//           <p>When you supply your reproductive system with the exact 40:1 plasma-matched nutrients it has been starved of:</p>
//           <ul className="copy-benefits copy-effects">
//             <li><strong>It will allow</strong> your cell receptors to unlock and process sugar efficiently, levelling off afternoon fatigue and obsessive 3 PM cravings.</li>
//             <li><strong>It will free you</strong> from the calendar anxiety of carrying pads everywhere for months, wondering if or when your period will ever show up.</li>
//             <li><strong>It will give</strong> your ovaries the precise energy required for immature eggs to mature and release naturally every month.</li>
//             <li><strong>It will help</strong> lower excess male hormone levels so stubborn chin strands, a very oily face and painful jawline flare-ups calm down naturally.</li>
//             <li><strong>It will support</strong> a clean, receptive womb environment if you are actively trying to conceive (TTC).</li>
//           </ul>
//         </section>

//         <section className="copy-section copy-problem" id="problem">
//           <p className="copy-eyebrow">02 · Problem &amp; root cause</p>
//           <p className="copy-overline">Does This Sound Like You?</p>
//           <h2>It Was Never Your Fault</h2>
//           <div className="copy-problem-list">
//             <p>Months of staring at a calendar, waiting for a period that never comes on time — or one that starts and simply never stops...</p>
//             <p>Painful, heavy bleeding that lasts weeks on end. Cramps so bad you cancel plans and curl up in bed.</p>
//             <p>Plucking stubborn chin strands every single morning. A very oily face by midday no matter how many times you wash it.</p>
//             <p>Hiding under loose, baggy clothes because of that stubborn upper belly fat that never went away — no matter what you ate or how much you moved.</p>
//             <p>Trying birth control on your doctor&apos;s advice — only for the cramping to get <em>worse</em>. Feeling like you are stuck on an emotional rollercoaster with no way off.</p>
//           </div>
//           <div className="copy-story-collage">
//             <img
//               className="copy-problem-photo"
//               src={periodSupportLifestyle}
//               alt="A woman sits quietly by a window, holding a mug and looking down."
//               loading="lazy"
//             />
//             <img
//               className="copy-mirror-photo"
//               src={periodSupportMirror}
//               alt="A woman looks at her reflection in a mirror, appearing frustrated."
//               loading="lazy"
//             />
//           </div>
//           <img
//             className="copy-confidence-photo"
//             src={periodSupportConfidence}
//             alt="A woman smiles calmly while holding a bottle in natural light."
//             loading="lazy"
//           />
//           <p>It is not because you lack willpower. And it is not because your body is broken. There is a biological reason this keeps happening — and it has a name.</p>
//           <p>For years, women in your position were given the same three dismissive &quot;solutions&quot;:</p>
//           <blockquote className="copy-quotes">
//             <p>&quot;Just go back on birth control until you&apos;re ready to have a baby.&quot;</p>
//             <p>&quot;Just lose 15 pounds and your cycle will fix itself.&quot;</p>
//             <p>&quot;Try extreme keto. Cut out all carbs entirely.&quot;</p>
//           </blockquote>
//           <p>None of them worked. Because none of them address what is <em>actually</em> causing all of it.</p>
//           <p className="copy-overline">The Real Root Cause</p>
//           <h2>The Insulin-Testosterone Trap</h2>
//           <p>Every single symptom you are experiencing — the missing periods, the painful cramps, the chin hair, the oily skin, the belly fat — traces back to one single internal switch.</p>
//           <div className="copy-root-steps">
//             <article><span>STEP 1</span><h3>Locked Cell Receptors</h3><p>Sugar can&apos;t enter cells — energy crashes</p></article>
//             <article><span>STEP 2</span><h3>Insulin Floods Your System</h3><p>Pancreas overworks to clear sugar</p></article>
//             <article><span>STEP 3</span><h3>Testosterone Spikes</h3><p>Cysts form, chin hair, oily face &amp; belly fat lock in</p></article>
//           </div>
//           <div className="copy-root-details">
//             <article><h3>Cell Receptors Lock Up</h3><p>When cells resist insulin, sugar can&apos;t be used for energy. Blood sugar spikes. You crash at 3 PM and reach for something sweet.</p></article>
//             <article><h3>Insulin Floods Your Bloodstream</h3><p>Your pancreas pumps out more and more insulin trying to clear the sugar — sending a direct signal straight to your ovaries.</p></article>
//             <article><h3>Ovaries Flood With Testosterone</h3><p>That flood of insulin tells your ovaries to produce excess male hormones. Eggs stop maturing. Cysts form. Chin hair grows. Your face turns oily. Your belly fat locks in and refuses to leave.</p></article>
//             <article><h3>Your Cycle Goes Missing</h3><p>With eggs trapped and testosterone high, your period either vanishes for months — or never properly stops, lasting weeks on end with heavy bleeding and very painful cramps.</p></article>
//           </div>
//           <div className="copy-placeholder" role="img" aria-label="Supporting image placeholder"><Leaf aria-hidden="true" /></div>
//         </section>

//         <section className="copy-section copy-fixes" id="fixes">
//           <p className="copy-eyebrow">Why Standard &quot;Fixes&quot; Keep Failing You</p>
//           <h2>Three Fixes That Leave You Stuck</h2>
//           <p>They treat the outer symptoms while completely ignoring the internal switch that controls your ovaries.</p>
//           <div className="copy-fix-grid">
//             <p><strong>Synthetic Birth Control Pills:</strong> Forces an artificial withdrawal bleed while switching your ovaries off. The moment you stop, the underlying insulin-testosterone spike comes back — and your symptoms return worse than before.</p>
//             <p><strong>Extreme Calorie Restriction &amp; Fasting:</strong> Skipping meals raises your stress hormone cortisol. High cortisol worsens cellular insulin resistance — making your cycle even more unpredictable.</p>
//             <p><strong>Unbalanced / Generic Inositol Formulas:</strong> High D-Chiro Inositol floods the market. Research shows excess D-Chiro <strong>overwhelms the ovaries and impairs egg quality</strong> — turning the environment toxic instead of supportive.</p>
//           </div>
//           <div className="copy-table-wrap">
//             <table className="copy-comparison-table">
//               <thead><tr><th>Feature</th><th>France shGrace 40:1</th><th>Generic Inositol</th><th>Birth Control</th><th>Extreme Keto</th></tr></thead>
//               <tbody>
//                 {comparisonRows.map((row) => (
//                   <tr key={row}>
//                     <th scope="row">{row}</th>
//                     <td><Check aria-label="Yes" /></td>
//                     <td><span aria-label="No">×</span></td>
//                     <td><span aria-label="No">×</span></td>
//                     <td><span aria-label="No">×</span></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </section>

//         <section className="copy-section copy-solution" id="solution">
//           <p className="copy-eyebrow">The Solution</p>
//           <h2>Re-opening Cell Receptors with the 40:1 Biological Key</h2>
//           <div className="copy-placeholder" role="img" aria-label="Supporting image placeholder"><Leaf aria-hidden="true" /></div>
//           <p>True cycle regularity does not come from forcing artificial hormones or starving yourself.</p>
//           <p>It happens when you give your body the exact <strong>40:1 Myo to D-Chiro Inositol ratio</strong> — the precise proportion found naturally in human blood plasma — alongside bioactive <strong>Folate and Vitamin D3</strong>.</p>
//           <p>When cells unlock, insulin drops. When insulin drops, testosterone drops. When testosterone drops — your cycle comes back.</p>
//           <button type="button" className="copy-primary-button" onClick={() => document.getElementById("mechanism")?.scrollIntoView({ behavior: "smooth" })}>
//             See How the 40:1 Ratio Unlocks Your Cell Receptors
//           </button>
//         </section>

//         <section className="copy-section copy-mechanism" id="mechanism">
//           <p className="copy-eyebrow">03 · 40:1 mechanism &amp; 90-day timeline</p>
//           <p className="copy-overline">The Science of the 40:1 Ratio</p>
//           <h2>Why Plasma-Matching Matters</h2>
//           <p>Not all inositol supplements are created equal.</p>
//           <p>Many generic formulas flood the market with excessive D-Chiro Inositol. Research shows that excess D-Chiro <strong>overwhelms sensitive ovarian tissue</strong> — impeding egg maturation and making cycle delay worse.</p>
//           <p><strong>France shGrace MYO &amp; D-CHIRO INOSITOL+</strong> is formulated with the exact <strong>40:1 ratio of Myo to D-Chiro-Inositol</strong> — the precise proportion found naturally in human blood plasma.</p>
//           <div className="copy-mechanism-steps">
//             <article><span>1</span><strong>Exact 40:1 Plasma Match</strong></article>
//             <article><span>2</span><strong>Supports Cell Receptor Sensitivity</strong></article>
//             <article><span>3</span><strong>Supports Balanced Hormone Levels</strong></article>
//             <article><span>4</span><strong>Supports Healthy Ovarian Function &amp; Egg Maturation</strong></article>
//           </div>
//           <div className="copy-placeholder" role="img" aria-label="Supporting image placeholder"><Leaf aria-hidden="true" /></div>
//           <div className="copy-actives">
//             <article>
//               <h3>Myo-Inositol (The Primary Activator)</h3>
//               <strong className="copy-amount">2,000 mg</strong>
//               <p>Unlocks insulin receptors across your cells so glucose is processed efficiently — removing the signal that tells your body to overproduce male hormones.</p>
//               <ul><li>Sugar cravings start to fade in weeks 2–4</li><li>Steadier afternoon energy — fewer 3 PM crashes</li><li>Lays the groundwork for testosterone to drop naturally</li></ul>
//             </article>
//             <article>
//               <h3>D-Chiro-Inositol (The Specific Messenger)</h3>
//               <strong className="copy-amount">50 mg</strong>
//               <p>Works in micro-doses alongside Myo-Inositol to regulate glycogen synthesis — without damaging fragile egg quality the way high-dose formulas do.</p>
//               <ul><li>Sends a precise signal to quiet excess androgen production</li><li>Supports egg maturation without the toxic ovarian overload</li></ul>
//             </article>
//           </div>
//         </section>

//         <section className="copy-section copy-triple" id="triple-action">
//           <p className="copy-eyebrow">The Synergistic Triple-Action Formula</p>
//           <h2>Three Actives, One Capsule Routine</h2>
//           <p>To ensure full absorption and cellular uptake, we paired the 40:1 Inositol ratio with two non-synthetic, bioavailable micronutrients essential for female reproductive health:</p>
//           <div className="copy-active-grid">
//             <article><span>1</span><h3>Bioactive Folate</h3><strong>340 mcg DFE</strong><p>Unlike synthetic folic acid (which up to 40% of women cannot process), bioactive folate feeds cell division, lowers systemic inflammation, and prepares a receptive womb environment.</p><ul><li>Reduces internal inflammation driving cystic flare-ups</li><li>Supports a receptive environment for healthy egg development</li></ul></article>
//             <article><span>2</span><h3>Vitamin D3 (The Hormone Precursor)</h3><strong>10 mcg</strong><p>Vitamin D3 receptors line the ovary and uterine wall. Replenishing D3 provides the biological energy needed for immature follicles to mature and release naturally during ovulation.</p><ul><li>Directly supports follicle maturation inside the ovaries</li><li>Helps stabilize the mood swings that spike before a period</li></ul></article>
//             <article><span>3</span><h3>100% Bioavailable &amp; Non-Synthetic</h3><p>Manufactured to strict GMP global standards to ensure maximum cellular absorption without stomach distress.</p><ul><li>GMP Certified Manufacturing</li><li>No fillers, no synthetics, gentle on the stomach</li></ul></article>
//           </div>
//           <img
//             className="copy-routine-photo"
//             src={periodSupportDailyRoutine}
//             alt="A woman enjoying her morning routine outdoors, holding capsules in her palm beside the product bottle."
//             loading="lazy"
//           />
//         </section>

//         <section className="copy-section copy-progress" id="progress">
//           <p className="copy-eyebrow">Your 90-Day Ovarian &amp; Cycle Progress Calendar</p>
//           <h2>What Changes, and When</h2>
//           <p>Sustainable biological healing requires consistency. Here is the realistic timeline of what happens as your body absorbs the 40:1 ratio — straight from women who went through it:</p>
//           <blockquote className="copy-progress-quote">
//             <p>&quot;Within the first month, I started noticing my cravings for sugar started to disappear.&quot;</p>
//             <footer>— Real customer, Month 1</footer>
//           </blockquote>
//           <div className="copy-timeline">
//             <article><Clock3 aria-hidden="true" /><strong>Weeks 2–4</strong><span>Stable Energy &amp; Craving Reset</span></article>
//             <article><Activity aria-hidden="true" /><strong>Weeks 5–8</strong><span>Jawline Calm, Less Oily Face</span></article>
//             <article><CalendarDays aria-hidden="true" /><strong>Days 60–90</strong><span>Predictable Cycles Return</span></article>
//           </div>
//           <div className="copy-phases">
//             <article><p className="copy-eyebrow">PHASE 1</p><h3>Weeks 2 to 4 — Cellular Unlocking &amp; Energy Reset</h3><p><strong>Fewer 3 PM Sugar Cravings:</strong> As cells unlock and blood sugar stabilises, the obsessive afternoon cravings and sudden energy crashes begin to ease. Many women notice this in the first two to three weeks.</p><p><strong>Calmer Sleep &amp; Mood Stability:</strong> As internal metabolic stress drops, your nervous system settles — deeper sleep, more stable morning energy, and fewer mood swings through the day.</p></article>
//             <article><p className="copy-eyebrow">PHASE 2</p><h3>Weeks 5 to 8 — Androgen Drop &amp; Surface Calm</h3><p><strong>Clearer Jawline, Less Oily Face &amp; Fewer Flare-Ups:</strong> Lower circulating testosterone means sebaceous glands stop overproducing thick sebum. Deep, painful cystic bumps around the chin begin to shrink and heal.</p><p><strong>Slower Coarse Hair Growth:</strong> Stubborn facial hair strands on the chin and jawline grow back slower, finer, and noticeably softer.</p><p><strong>Easier, More Comfortable Periods:</strong> As hormone signals settle, many women find their period days feel easier and more comfortable — with less of the cramping that used to stop them in their tracks.</p></article>
//           </div>
//           <blockquote className="copy-progress-quote">
//             <p>&quot;My period came back painless in the second month of taking inositol — and it actually stopped after four days.&quot;</p>
//             <footer>— Real customer, Month 2</footer>
//           </blockquote>
//           <article className="copy-phase-three">
//             <p className="copy-eyebrow">PHASE 3</p>
//             <h3>Days 60 to 90 — Ovulation &amp; Predictable Cycle Reset</h3>
//             <p><strong>Predictable Monthly Cycle Dates:</strong> Immature eggs complete their maturation cycle, break free naturally, and release — bringing predictable, manageable period dates back without synthetic birth control.</p>
//             <p><strong>Calm Emotional Balance &amp; Ovulation:</strong> Supports natural ovulation, a lighter feel around that stubborn upper belly fat, and calm, predictable hormone levels throughout the entire month.</p>
//           </article>
//           <blockquote className="copy-progress-quote">
//             <p>&quot;Now, after 3 months, I can confidently say that I ovulated just this last month and I now remember how it actually feels to ovulate again. I feel more energetic. The biggest difference has been being able to feel like myself again.&quot;</p>
//             <footer>— Real customer, Month 3</footer>
//           </blockquote>
//           <button type="button" className="copy-primary-button" onClick={scrollToPackages}>Start Your 90-Day Cycle &amp; Skin Reset Today</button>
//         </section>

//         <section className="copy-section copy-customer-proof" id="customer-proof">
//           <p className="copy-eyebrow">04 · Proof, guarantee &amp; pricing</p>
//           <p className="copy-overline">Real Customer Proof</p>
//           <h2>In Her Own Words</h2>
//           <blockquote className="copy-customer-quote">
//             <p>“…the biggest difference for me has been being able to feel like myself again.”</p>
//             <p>“Before I started using Myo-inositol, I was struggling with excessive bleeding, a period that rarely went away for weeks on end, and very painful period cramps. Facial hair and very oily face were my biggest insecurities.</p>
//             <p>…Within the first month, I started noticing my cravings for sugar started to disappear. …my period came back painless in the second month of taking inositol and it actually stopped after four days.</p>
//             <p>Now, after 3 months, I can confidently say that I ovulated just this last month and I now remember how it actually feels to ovulate again.</p>
//             <p>…I&apos;m glad I gave it a try.”</p>
//             <footer><strong>Anne A. , Nairobi</strong><span>Verified Buyer</span></footer>
//           </blockquote>
//           <p className="copy-small-note">Individual experience. Results vary.</p>
//         </section>

//         <section className="copy-section copy-guarantee" id="guarantee">
//           <p className="copy-overline">Sound familiar?</p>
//           <h2>Another False Hope?</h2>
//           <p>We get it. You have tried the pills, the teas and the “just lose weight” advice, and your cycle is still a guess. So doubt is fair.</p>
//           <p><strong>So don’t take our word for it. Test it.</strong> Take it daily for 90 days. If you don’t see the change, you get your money back.</p>
//           <p>That is what the guarantee below is for.</p>
//           <div className="copy-guarantee-card">
//             <h3>The 90-Day Risk-Free Ovarian &amp; Cycle Guarantee</h3>
//             <p>We know you may have been burned by dismissive medical advice, expensive foreign supplements, or harsh chemical treatments in the past. That is why we want you to try <strong>France shGrace MYO &amp; D-CHIRO INOSITOL+</strong> with zero financial risk.</p>
//             <h3>90-Day 100% Risk-Free Ovarian &amp; Cycle Guarantee</h3>
//             <p>Take France shGrace Inositol+ daily for 90 full days (the exact time required for an immature egg follicle to complete its maturation).</p>
//             <p>If you don&apos;t experience fewer sugar crashes, calmer jawline breakouts, and more predictable monthly cycle dates—simply contact our support team for an immediate, hassle-free refund. <strong>No questions asked.</strong></p>
//           </div>
//           <div className="copy-who">
//             <h3>Who this is for</h3>
//             <p>If you are dealing with a <strong>hormonal imbalance</strong> and looking to <strong>feel like yourself again</strong>, energetic and with fewer sudden mood swings, this is for you.</p>
//             <ul>
//               <li>Cycles you can’t predict, or a period that drags on for weeks</li>
//               <li>Very painful period cramps</li>
//               <li>Stubborn chin hair, a very oily face and jawline bumps</li>
//               <li>Stubborn upper belly fat that never went away</li>
//               <li>Stubborn upper belly fat that never went away</li>
//             </ul>
//           </div>
//           <button type="button" className="copy-primary-button" onClick={scrollToPackages}>Select Your Risk-Free Package Below</button>
//         </section>

//         <section className="copy-section copy-packages" id="package-selector" ref={packageSelectorRef}>
//           <p className="copy-eyebrow">Tiered Value Bundles</p>
//           <h2>Pick Your Package</h2>
//           <p>Since egg maturation and biological hormone balancing require 60 to 90 days, 87% of our Kenyan customers choose the 3-Bottle or 6-Bottle packages for complete cycle reset.</p>
//           <div className="copy-package-grid">
//             {bundles.map((option, index) => {
//               const product = bundleProducts[option.bottles];
//               const displayPrice = product?.price ?? option.expected;
//               return (
//                 <article className={`copy-package${selectedBundle === index ? " is-selected" : ""}`} key={option.bottles}>
//                   {option.badge && <span className="copy-package-badge">{option.badge}</span>}
//                   <p className="copy-package-count">×{option.bottles}</p>
//                   <h3>{option.bottles} {option.bottles === 1 ? "Bottle" : "Bottles"}</h3>
//                   <p className="copy-package-duration">{option.bottles === 1 ? "30-Day Starter Supply" : option.bottles === 3 ? "90-Day Full Cycle Reset" : "180-Day Ovarian Harmony & TTC Bundle"}</p>
//                   <strong className="copy-package-price">{product ? formatKes(product.price) : bundleProductsLoading ? "Loading..." : formatKes(option.expected)}</strong>
//                   <del>{formatKes(option.was)}</del>
//                   <p className="copy-package-save">Save {formatKes(option.was - displayPrice)}</p>
//                   <p className="copy-package-daily">Daily cost: ~KSh {option.daily} / day</p>
//                   <p className="copy-package-copy"><strong>{option.description.split(":")[0]}:</strong>{option.description.slice(option.description.indexOf(":") + 1)}</p>
//                   <p className="copy-package-copy"><strong>Shipping:</strong> {option.delivery}</p>
//                   {option.bonus && <p className="copy-package-copy"><strong>{option.bonus.split(":")[0]}:</strong>{option.bonus.slice(option.bonus.indexOf(":") + 1)}</p>}
//                   <button
//                     type="button"
//                     className="copy-package-button"
//                     disabled={!product || product.stockQuantity <= 0}
//                     aria-pressed={selectedBundle === index}
//                     onClick={() => {
//                       setSelectedBundle(index);
//                       if (product && product.stockQuantity > 0) onAddToCart(product);
//                     }}
//                   >
//                     {product
//                       ? option.button
//                       : bundleProductsLoading
//                         ? "Loading bundle..."
//                         : bundleProductsError
//                           ? "Could not load bundle"
//                           : "Bundle unavailable"}
//                   </button>
//                 </article>
//               );
//             })}
//           </div>
//         </section>

//         <section className="copy-section copy-delivery" id="payment">
//           <p className="copy-eyebrow">Local Kenyan Payment &amp; Delivery</p>
//           <h2>Paid Your Way, Delivered Quietly</h2>
//           <div className="copy-delivery-grid">
//             <article><h3>M-Pesa Express Checkout:</h3><p>Instant 1-click M-Pesa STK Push payment options at checkout.</p></article>
//             <article><h3>100% Plain &amp; Discreet Delivery:</h3><p>Shipped in plain, unbranded boxes directly to your home, office, or local pickup point in Nairobi, Mombasa, Kisumu, Nakuru, and across all 47 counties.</p></article>
//             <article><h3>Fast Delivery Times:</h3><p>24 Hours in Nairobi Metro | 48 Hours Nationwide.</p></article>
//           </div>
//           <div className="copy-payment-strip" aria-label="Payment methods">
//             <span className="copy-mpesa-badge">M-Pesa</span>
//           </div>
//         </section>
//       </main>

//       <div className={`copy-sticky-buy${showStickyBuy ? " is-visible" : ""}`}>
//         <div><strong>France shGrace Inositol+</strong><small>Save up to 17%</small></div>
//         <button type="button" onClick={scrollToPackages}>Select Your Supply</button>
//       </div>

//       <section className="copy-review-section" id="reviews">
//         <h2>Customer Reviews</h2>
//         {totalReviews > 0 && (
//           <p className="copy-review-summary">
//             <span aria-label={`${averageRating.toFixed(1)} out of 5 stars`}>
//               {Array.from({ length: 5 }, (_, index) => (
//                 <Star key={index} className={index < Math.round(averageRating) ? "is-filled" : ""} />
//               ))}
//             </span>
//             {averageRating.toFixed(1)} average · {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
//           </p>
//         )}
//         {!hasReviewed && (
//           <div className="copy-review-form">
//             <h3>Share your rating</h3>
//             {isAuthenticated ? (
//               <>
//                 <div className="copy-rate-picker" aria-label="Choose a rating">
//                   {[1, 2, 3, 4, 5].map((rating) => (
//                     <button type="button" key={rating} onClick={() => setReviewRating(rating)} aria-label={`Rate ${rating} star${rating > 1 ? "s" : ""}`}>
//                       <Star className={rating <= reviewRating ? "is-filled" : ""} />
//                     </button>
//                   ))}
//                 </div>
//                 <button type="button" disabled={isSubmittingReview || reviewRating === 0} onClick={submitReview}>
//                   {isSubmittingReview ? "Submitting…" : "Submit rating"}
//                 </button>
//               </>
//             ) : (
//               <p>Please <button type="button" onClick={() => setShowAuthModal(true)}>log in</button> to write a review.</p>
//             )}
//           </div>
//         )}
//       </section>
//       <Footer />

//       <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
//         <DialogContent className="sm:max-w-md bg-card border-border rounded-xl p-0 max-h-[90vh] overflow-y-auto">
//           {authModalContent}
//         </DialogContent>
//       </Dialog>
//       <Dialog open={isImageZoomOpen} onOpenChange={setIsImageZoomOpen}>
//         <DialogContent className="ipdp-image-dialog">
//           {activeImage && <img src={activeImage} alt={name} />}
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default InositolProductPage;

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Star } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import periodSupportLifestyle from "@/assets/period-support-lifestyle.jpeg";
import periodSupportMirror from "@/assets/period-support-mirror.jpeg";
import periodSupportConfidence from "@/assets/period-support-confidence.jpeg";
import periodSupportDailyRoutine from "@/assets/period-support-daily-routine.jpeg";
import inositolSupplementFacts from "@/assets/inositol-supplement-facts.webp";
import inositolBottleFront from "@/assets/inositol-bottle-front.webp";
import inositolHeroJourney from "@/assets/inositol-hero-journey.png";
import {
  ArrowDownIcon,
  BatteryIcon,
  BoltIcon,
  BoxIcon,
  CalendarCheckIcon,
  CalendarIcon,
  CheckDotIcon,
  CheckIcon,
  ClockIcon,
  CrossIcon,
  DropIcon,
  GiftIcon,
  HairIcon,
  HeartIcon,
  LeafIcon,
  LockIcon,
  MirrorIcon,
  MoonIcon,
  PhoneIcon,
  QuoteIcon,
  ShieldCheckIcon,
  SparkleIcon,
  StarFilledIcon,
  TruckIcon,
  VerifiedIcon,
  WavesIcon,
} from "./InositolIcons";
import "./InositolProductPage.css";

type BundleBottles = 1 | 3 | 6;

const bundles = [
  {
    bottles: 1 as BundleBottles,
    title: "1 Bottle",
    count: "×1",
    was: 4200,
    expected: 3499,
    daily: 117,
    heroSub: "30 days",
    heroSubDesktop: "30-Day Starter",
    packSub: "30-Day Starter Supply",
    ideal: "Initial cellular reset & blood sugar stabilization",
    shipping: "Standard Delivery Across Kenya",
    button: "Select 1-Bottle Starter",
    solid: false,
  },
  {
    bottles: 3 as BundleBottles,
    title: "3 Bottles",
    count: "×3",
    was: 10500,
    expected: 9750,
    daily: 108,
    heroSub: "90 days",
    heroSubDesktop: "90-Day Cycle Reset",
    packSub: "90-Day Full Cycle Reset",
    badge: "MOST POPULAR",
    badgeTone: "sage" as const,
    ideal: "Complete egg follicle maturation, regular cycle dates & jawline flare-up reduction",
    shipping: "FREE Express Delivery Across Kenya",
    bonus: "Free Cycle & Ovulation Tracking Guide",
    button: "Select 3-Bottle Cycle Reset (Save 7%)",
    solid: true,
  },
  {
    bottles: 6 as BundleBottles,
    title: "6 Bottles",
    count: "×6",
    was: 21000,
    expected: 18000,
    daily: 100,
    heroSub: "180 days",
    heroSubDesktop: "180-Day TTC Bundle",
    packSub: "180-Day Ovarian Harmony & TTC Bundle",
    badge: "BEST VALUE",
    badgeTone: "dark" as const,
    ideal: "Women actively trying to conceive (TTC) or long-term androgen maintenance",
    shipping: "FREE Priority Delivery Across Kenya + Plain Discreet Packaging",
    bonus: "Free Cycle Tracking Guide + Priority WhatsApp Consultation Access",
    button: "Select 6-Bottle Best Value (Save 14%)",
    solid: true,
  },
];

const comparisonRows = [
  "Exact 40:1 Plasma Match",
  "Zero Toxic D-Chiro Excess",
  "Bioactive Folate & Vitamin D3 Included",
  "Supports Natural Ovulation Without Masking",
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

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const TickRow = ({ children }: { children: ReactNode }) => (
  <li>
    <CheckIcon className="ipdp-tick" size={18} strokeWidth={2.2} />
    <span>{children}</span>
  </li>
);

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
  const [zoomImage, setZoomImage] = useState<{ src: string; alt: string } | null>(null);
  const [showStickyBuy, setShowStickyBuy] = useState(false);
  const heroCtaRef = useRef<HTMLButtonElement>(null);
  const heroSelectorRef = useRef<HTMLElement>(null);
  const packageSelectorRef = useRef<HTMLElement>(null);

  const bottleImage = images[0] ?? inositolBottleFront;

  useEffect(() => {
    setSelectedBundle(Math.max(0, selectedBundleIndex));
  }, [selectedBundleIndex]);

  // Sticky bar (mobile only, see CSS): hidden while the hero CTA or #package-selector is on screen.
  useEffect(() => {
    const heroCta = heroCtaRef.current;
    const heroSelector = heroSelectorRef.current;
    const packageSelector = packageSelectorRef.current;
    if (!heroCta || !heroSelector || !packageSelector) return;

    const watchedElements = [heroCta, heroSelector, packageSelector];

    const isVisible = (element: Element) => {
      const bounds = element.getBoundingClientRect();
      return bounds.bottom > 0 && bounds.top < window.innerHeight;
    };
    const updateStickyVisibility = () => {
      setShowStickyBuy(!watchedElements.some(isVisible));
    };
    const observer = new IntersectionObserver(updateStickyVisibility, { threshold: 0 });
    watchedElements.forEach((element) => observer.observe(element));
    window.addEventListener("resize", updateStickyVisibility);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateStickyVisibility);
    };
  }, []);

  const scrollTo = (element: HTMLElement | null) => {
    element?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
  };
  const scrollToHeroSelector = () => scrollTo(heroSelectorRef.current);
  const scrollToPackages = () => scrollTo(packageSelectorRef.current);

  const selectedProduct = bundleProducts[bundles[selectedBundle]?.bottles];
  const canCheckout = Boolean(selectedProduct && selectedProduct.stockQuantity > 0);
  const checkoutSelected = () => {
    if (selectedProduct && canCheckout) onAddToCart(selectedProduct);
  };

  return (
    <div className="ipdp">
      <Header logoOnly />

      <div className="ipdp-topbar">
        <span>
          <LockIcon size={13} strokeWidth={2.4} />
          100% Bioavailable &amp; Non-Synthetic Formula
        </span>
        <span className="ipdp-topbar-sep" aria-hidden="true">|</span>
        <span>Exact 40:1 Plasma-Matched Ratio</span>
        <span className="ipdp-topbar-sep" aria-hidden="true">|</span>
        <span>GMP Elite Certified Manufacturing</span>
        <span className="ipdp-topbar-sep" aria-hidden="true">|</span>
        <span>Fast, Discreet Delivery Across Kenya</span>
      </div>

      <main>
        {/* ============ HERO ============ */}
        <section className="ipdp-hero" id="hero">
          <div className="ipdp-wrap ipdp-hero-grid">
            <div className="ipdp-hero-media">
              <img
                src={inositolHeroJourney}
                alt="A cycle journey illustration showing the France shGrace Inositol+ bottle and progress from day one to day ninety."
                width={1024}
                height={1024}
              />
            </div>

            <div className="ipdp-hero-copy">
              <div className="ipdp-rating">
                <span className="ipdp-rating-stars" aria-hidden="true">
                  {Array.from({ length: 5 }, (_, index) => (
                    <StarFilledIcon key={index} />
                  ))}
                </span>
                <span>4.8/5 | 103+ Happy Women</span>
              </div>

              <h1>Still Guessing When Your Period Will Come, Battling Chin Hairs, And Stubborn Belly Fat Won&apos;t Budge?</h1>

              <p className="ipdp-hero-intro">
                Your hormones have been locked in a traffic jam by high insulin and sluggish ovaries. This natural 40:1 doctor-trusted formula helps reboot your cycle, balance key hormones, and clear out the backlog from within.
              </p>

              <ul className="ipdp-checks">
                <li><CheckDotIcon /><span>Bring back predictable, natural monthly cycles without dark calendar fear or endless spotting.</span></li>
                <li><CheckDotIcon /><span>Quiet 3 PM sugar cravings and level out your daily energy from morning to night.</span></li>
                <li><CheckDotIcon /><span>Clear up stubborn jawline acne and painful hormonal breakouts on your skin.</span></li>
                <li><CheckDotIcon /><span>Powered by pure Myo &amp; D-Chiro Inositol, Folate, and Vitamin D3.</span></li>
              </ul>

              <button type="button" className="ipdp-cta ipdp-cta--hero" ref={heroCtaRef} onClick={scrollToHeroSelector}>
                Reclaim Your Cycle Today
              </button>

              <p className="ipdp-guarantee-line">
                <ShieldCheckIcon size={16} />
                <span>🛡️ 90-Day Money-Back Guarantee</span>
              </p>
            </div>
          </div>

          <div className="ipdp-wrap">
            <div className="ipdp-divider" />

            <section className="ipdp-supply" id="select-supply" ref={heroSelectorRef} aria-label="Select your supply">
              <p className="ipdp-supply-title">Select Your Supply</p>

              <div className="ipdp-supply-cards">
                {bundles.map((option, index) => {
                  const product = bundleProducts[option.bottles];
                  const displayPrice = product?.price ?? option.expected;
                  const selected = selectedBundle === index;
                  return (
                    <button
                      type="button"
                      key={option.bottles}
                      className={`ipdp-supply-card${selected ? " is-selected" : ""}`}
                      aria-pressed={selected}
                      onClick={() => setSelectedBundle(index)}
                    >
                      <span className="ipdp-radio" aria-hidden="true" />
                      <span className="ipdp-supply-info">
                        <span className="ipdp-supply-name">{option.title}</span>
                        <span className="ipdp-supply-sub">
                          <span className="ipdp-only-mobile">{option.heroSub} · ~KSh {option.daily}/day</span>
                          <span className="ipdp-only-desktop">{option.heroSubDesktop} · ~KSh {option.daily}/day</span>
                        </span>
                      </span>
                      <span className="ipdp-supply-price">
                        <span className="ipdp-supply-price-line">
                          <del>{option.was.toLocaleString("en-KE")}</del>
                          <strong>{formatKes(displayPrice)}</strong>
                        </span>
                        <span className="ipdp-supply-save">Save {formatKes(option.was - displayPrice)}</span>
                      </span>
                      {option.badge && (
                        <span className={`ipdp-badge ipdp-badge--${option.badgeTone}`}>{option.badge}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                className="ipdp-cta ipdp-cta--upper ipdp-cta--supply"
                disabled={!canCheckout}
                onClick={checkoutSelected}
              >
                Reclaim Your Cycle &amp; Ovarian Harmony Today
              </button>

              <p className="ipdp-pay-line">
                <PhoneIcon size={14} />
                <span>Pay with M-Pesa STK Push</span>
              </p>
              <p className="ipdp-supply-note">Select Your 30, 90, or 180-Day Supply | 100% Risk-Free Guarantee</p>

              <div className="ipdp-trust" aria-label="Product features">
                <div><span className="ipdp-trust-icon"><LeafIcon size={22} strokeWidth={1.8} /></span><span>100% Bioavailable</span></div>
                <div><span className="ipdp-trust-icon"><ShieldCheckIcon size={22} strokeWidth={1.8} /></span><span>GMP Certified</span></div>
                <div><span className="ipdp-trust-icon"><BoxIcon size={22} strokeWidth={1.8} /></span><span>Discreet Packaging</span></div>
                <div><span className="ipdp-trust-icon"><TruckIcon size={22} strokeWidth={1.8} /></span><span>24–48hr Local Delivery</span></div>
              </div>
            </section>
          </div>
        </section>

        {/* ============ HEADLINE + STORY ============ */}
        <section className="ipdp-story" id="headline">
          <div className="ipdp-wrap">
            <div className="ipdp-story-head">
              <p className="ipdp-eyebrow">Why women are switching</p>
              <h2>
                <span className="ipdp-story-pain">How To Go From Feeling Anxious Over Cycles You Can&apos;t Predict, Frustrated By Stubborn Chin Hair, A Very Oily Face &amp; Jawline Bumps, And Exhausted By 3 PM Sugar Crashes…</span>
                <span className="ipdp-story-payoff">To Experiencing Regular Monthly Cycles, Clear Smooth Skin, And Feeling Like Yourself Again Once And For All—By Rebooting Your Ovarian Insulin Receptors With The Exact 40:1 Plasma Ratio—In 90 Days Or Less.</span>
              </h2>
              <p className="ipdp-story-box">No synthetic birth control pills that just mask the problem. No dismissive &quot;just lose weight&quot; advice from doctors. No expensive foreign supplements with unbalanced ratios. Just the clean, natural biological key your ovaries need to mature and release eggs predictably.</p>
              <p className="ipdp-story-hinge">What you are going to discover on this page today:</p>
            </div>

            <ol className="ipdp-discover">
              <li>
                <span className="ipdp-num">1</span>
                <p><strong>The Real Root Cause:</strong> Why elevated insulin signals your ovaries to produce excess testosterone - trapping immature eggs in small cysts, stalling your period, and triggering a very oily face and stubborn jawline acne.</p>
              </li>
              <li>
                <span className="ipdp-num">2</span>
                <p><strong>The 40:1 Plasma Ratio Secret:</strong> Why cheaper supplements with excess D-Chiro Inositol actually damage egg quality—and why the exact 40:1 Myo to D-Chiro ratio is the biological &quot;sweet spot&quot; for cell communication.</p>
              </li>
              <li>
                <span className="ipdp-num">3</span>
                <p><strong>The Synergistic Ovarian Reboot:</strong> How pairing pure 40:1 Inositol with bioactive Folate and Vitamin D3 reduces internal inflammation, feeds cell growth, and creates the ideal environment for regular cycle dates.</p>
              </li>
            </ol>

            <div className="ipdp-story-effects">
              <p className="ipdp-story-lead">When you supply your reproductive system with the exact 40:1 plasma-matched nutrients it has been starved of:</p>
              <ul className="ipdp-effects">
                <li><LeafIcon size={20} /><p><strong>It will allow</strong> your cell receptors to unlock and process sugar efficiently, levelling off afternoon fatigue and obsessive 3 PM cravings.</p></li>
                <li><LeafIcon size={20} /><p><strong>It will free you</strong> from the calendar anxiety of carrying pads everywhere for months, wondering if or when your period will ever show up.</p></li>
                <li><LeafIcon size={20} /><p><strong>It will give</strong> your ovaries the precise energy required for immature eggs to mature and release naturally every month.</p></li>
                <li><LeafIcon size={20} /><p><strong>It will help</strong> lower excess male hormone levels so stubborn chin strands, a very oily face and painful jawline flare-ups calm down naturally.</p></li>
                <li><LeafIcon size={20} /><p><strong>It will support</strong> a clean, receptive womb environment if you are actively trying to conceive (TTC).</p></li>
              </ul>
            </div>
          </div>
        </section>

        {/* ============ 02 PROBLEM & ROOT CAUSE ============ */}
        <section className="ipdp-problem" id="problem">
          <div className="ipdp-wrap">
            <div className="ipdp-head">
              <p className="ipdp-eyebrow">Does This Sound Like You?</p>
              <h2>It Was Never Your Fault</h2>
            </div>

            <div className="ipdp-measure ipdp-prose ipdp-pain-list">
              <p>Months of staring at a calendar, waiting for a period that never comes on time — or one that starts and simply never stops...</p>
              <p>Painful, heavy bleeding that lasts weeks on end. Cramps so bad you cancel plans and curl up in bed.</p>
              <p>Plucking stubborn chin strands every single morning. A very oily face by midday no matter how many times you wash it.</p>
              <p>Hiding under loose, baggy clothes because of that stubborn upper belly fat that never went away — no matter what you ate or how much you moved.</p>
              <p>Trying birth control on your doctor&apos;s advice — only for the cramping to get <em>worse</em>. Feeling like you are stuck on an emotional rollercoaster with no way off.</p>
            </div>

            <div className="ipdp-measure">
              <img
                className="ipdp-photo ipdp-photo--wide"
                src={periodSupportLifestyle}
                alt="A woman sits quietly by a window, holding a mug and looking down."
                loading="lazy"
              />

              <p className="ipdp-callout">It is not because you lack willpower. And it is not because your body is broken. There is a biological reason this keeps happening — and it has a name.</p>

              <p className="ipdp-prose-p ipdp-mt-24">For years, women in your position were given the same three dismissive &quot;solutions&quot;:</p>

              <div className="ipdp-dismissals">
                <div><QuoteIcon /><p>&quot;Just go back on birth control until you&apos;re ready to have a baby.&quot;</p></div>
                <div><QuoteIcon /><p>&quot;Just lose 15 pounds and your cycle will fix itself.&quot;</p></div>
                <div><QuoteIcon /><p>&quot;Try extreme keto. Cut out all carbs entirely.&quot;</p></div>
              </div>

              <p className="ipdp-prose-p ipdp-mt-20">None of them worked. Because none of them address what is <em>actually</em> causing all of it.</p>
            </div>

            <div className="ipdp-head ipdp-head--section">
              <p className="ipdp-eyebrow">The Real Root Cause</p>
              <h2>The Insulin-Testosterone Trap</h2>
              <p className="ipdp-head-intro">Every single symptom you are experiencing — the missing periods, the painful cramps, the chin hair, the oily skin, the belly fat — traces back to one single internal switch.</p>
            </div>

            <div className="ipdp-flow">
              <article className="ipdp-flow-step ipdp-tone-sage">
                <span className="ipdp-flow-icon"><LockIcon size={28} strokeWidth={1.8} /></span>
                <div>
                  <p className="ipdp-flow-label">STEP 1</p>
                  <h3>Locked Cell Receptors</h3>
                  <p className="ipdp-flow-sub">Sugar can&apos;t enter cells — energy crashes</p>
                </div>
              </article>
              <ArrowDownIcon className="ipdp-flow-arrow ipdp-tone-sage" />
              <article className="ipdp-flow-step ipdp-tone-amber">
                <span className="ipdp-flow-icon"><WavesIcon size={28} strokeWidth={1.8} /></span>
                <div>
                  <p className="ipdp-flow-label">STEP 2</p>
                  <h3>Insulin Floods Your System</h3>
                  <p className="ipdp-flow-sub">Pancreas overworks to clear sugar</p>
                </div>
              </article>
              <ArrowDownIcon className="ipdp-flow-arrow ipdp-tone-amber" />
              <article className="ipdp-flow-step ipdp-tone-rust">
                <span className="ipdp-flow-icon"><BoltIcon size={28} strokeWidth={1.8} /></span>
                <div>
                  <p className="ipdp-flow-label">STEP 3</p>
                  <h3>Testosterone Spikes</h3>
                  <p className="ipdp-flow-sub">Cysts form, chin hair, oily face &amp; belly fat lock in</p>
                </div>
              </article>
            </div>

            <div className="ipdp-explainers">
              <article>
                <span className="ipdp-explainer-icon ipdp-tone-sage"><LockIcon size={18} /></span>
                <div>
                  <h3>Cell Receptors Lock Up</h3>
                  <p>When cells resist insulin, sugar can&apos;t be used for energy. Blood sugar spikes. You crash at 3 PM and reach for something sweet.</p>
                </div>
              </article>
              <article>
                <span className="ipdp-explainer-icon ipdp-tone-amber"><WavesIcon size={18} /></span>
                <div>
                  <h3>Insulin Floods Your Bloodstream</h3>
                  <p>Your pancreas pumps out more and more insulin trying to clear the sugar — sending a direct signal straight to your ovaries.</p>
                </div>
              </article>
              <article>
                <span className="ipdp-explainer-icon ipdp-tone-rust"><BoltIcon size={18} /></span>
                <div>
                  <h3>Ovaries Flood With Testosterone</h3>
                  <p>That flood of insulin tells your ovaries to produce excess male hormones. Eggs stop maturing. Cysts form. Chin hair grows. Your face turns oily. Your belly fat locks in and refuses to leave.</p>
                </div>
              </article>
              <article>
                <span className="ipdp-explainer-icon ipdp-tone-red"><CalendarIcon size={18} /></span>
                <div>
                  <h3>Your Cycle Goes Missing</h3>
                  <p>With eggs trapped and testosterone high, your period either vanishes for months — or never properly stops, lasting weeks on end with heavy bleeding and very painful cramps.</p>
                </div>
              </article>
            </div>

            <div className="ipdp-measure">
              <img
                className="ipdp-photo ipdp-photo--mirror"
                src={periodSupportMirror}
                alt="A woman looks at her reflection in a mirror, appearing frustrated."
                loading="lazy"
              />
            </div>

            <div className="ipdp-head ipdp-head--section" id="fixes">
              <p className="ipdp-eyebrow">Why Standard &quot;Fixes&quot; Keep Failing You</p>
              <h2>Three Fixes That Leave You Stuck</h2>
              <p className="ipdp-head-intro">They treat the outer symptoms while completely ignoring the internal switch that controls your ovaries.</p>
            </div>

            <div className="ipdp-fixes">
              <div>
                <span className="ipdp-x"><CrossIcon size={16} strokeWidth={3} /></span>
                <p><strong>Synthetic Birth Control Pills:</strong> Forces an artificial withdrawal bleed while switching your ovaries off. The moment you stop, the underlying insulin-testosterone spike comes back — and your symptoms return worse than before.</p>
              </div>
              <div>
                <span className="ipdp-x"><CrossIcon size={16} strokeWidth={3} /></span>
                <p><strong>Extreme Calorie Restriction &amp; Fasting:</strong> Skipping meals raises your stress hormone cortisol. High cortisol worsens cellular insulin resistance — making your cycle even more unpredictable.</p>
              </div>
              <div>
                <span className="ipdp-x"><CrossIcon size={16} strokeWidth={3} /></span>
                <p><strong>Unbalanced / Generic Inositol Formulas:</strong> High D-Chiro Inositol floods the market. Research shows excess D-Chiro <strong>overwhelms the ovaries and impairs egg quality</strong> — turning the environment toxic instead of supportive.</p>
              </div>
            </div>

            <div className="ipdp-measure">
              <div className="ipdp-matrix">
                <table>
                  <thead>
                    <tr>
                      <th scope="col" className="ipdp-matrix-feature"><span className="ipdp-sr">Feature</span></th>
                      <th scope="col" className="ipdp-matrix-us">France shGrace 40:1</th>
                      <th scope="col">Generic Inositol</th>
                      <th scope="col">Birth Control</th>
                      <th scope="col">Extreme Keto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row}>
                        <th scope="row">{row}</th>
                        <td className="ipdp-matrix-us"><CheckIcon className="ipdp-yes" size={22} strokeWidth={3} /><span className="ipdp-sr">Yes</span></td>
                        <td><CrossIcon className="ipdp-no" size={20} strokeWidth={3} /><span className="ipdp-sr">No</span></td>
                        <td><CrossIcon className="ipdp-no" size={20} strokeWidth={3} /><span className="ipdp-sr">No</span></td>
                        <td><CrossIcon className="ipdp-no" size={20} strokeWidth={3} /><span className="ipdp-sr">No</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="ipdp-head ipdp-head--section" id="solution">
              <p className="ipdp-eyebrow">The Solution</p>
              <h2>Re-opening Cell Receptors with the 40:1 Biological Key</h2>
            </div>

            <div className="ipdp-measure">
              <img
                className="ipdp-photo ipdp-photo--wide ipdp-mt-18"
                src={periodSupportConfidence}
                alt="A woman smiles calmly while holding a bottle in natural light."
                loading="lazy"
              />

              <div className="ipdp-solution-card">
                <p>True cycle regularity does not come from forcing artificial hormones or starving yourself.</p>
                <p>It happens when you give your body the exact <strong>40:1 Myo to D-Chiro Inositol ratio</strong> — the precise proportion found naturally in human blood plasma — alongside bioactive <strong>Folate and Vitamin D3</strong>.</p>
                <p className="ipdp-solution-payoff">When cells unlock, insulin drops. When insulin drops, testosterone drops. When testosterone drops — your cycle comes back.</p>
              </div>

              <button type="button" className="ipdp-cta ipdp-cta--upper ipdp-cta--section" onClick={scrollToPackages}>
                See How the 40:1 Ratio Unlocks Your Cell Receptors
              </button>
            </div>
          </div>
        </section>

        {/* ============ 03 MECHANISM & TIMELINE ============ */}
        <section className="ipdp-mechanism" id="mechanism">
          <div className="ipdp-wrap">
            <div className="ipdp-head">
              <p className="ipdp-eyebrow">The Science of the 40:1 Ratio</p>
              <h2>Why Plasma-Matching Matters</h2>
            </div>

            <div className="ipdp-measure ipdp-prose">
              <p className="ipdp-prose-strong">Not all inositol supplements are created equal.</p>
              <p>Many generic formulas flood the market with excessive D-Chiro Inositol. Research shows that excess D-Chiro <strong>overwhelms sensitive ovarian tissue</strong> — impeding egg maturation and making cycle delay worse.</p>
              <p><strong>France shGrace MYO &amp; D-CHIRO INOSITOL+</strong> is formulated with the exact <strong>40:1 ratio of Myo to D-Chiro-Inositol</strong> — the precise proportion found naturally in human blood plasma.</p>
            </div>

            <ol className="ipdp-chain">
              <li><span className="ipdp-chain-node">1</span><strong>Exact 40:1 Plasma Match</strong></li>
              <li><span className="ipdp-chain-node">2</span><strong>Supports Cell Receptor Sensitivity</strong></li>
              <li><span className="ipdp-chain-node">3</span><strong>Supports Balanced Hormone Levels</strong></li>
              <li><span className="ipdp-chain-node">4</span><strong>Supports Healthy Ovarian Function &amp; Egg Maturation</strong></li>
            </ol>

            <div className="ipdp-measure">
              <img
                className="ipdp-photo ipdp-photo--wide"
                src={periodSupportDailyRoutine}
                alt="A woman enjoying her morning routine outdoors, holding capsules in her palm beside the product bottle."
                loading="lazy"
              />
            </div>

            <div className="ipdp-formula-grid ipdp-formula-grid--two">
              <article className="ipdp-formula-card">
                <div className="ipdp-formula-head">
                  <h3>Myo-Inositol <span>(The Primary Activator)</span></h3>
                  <span className="ipdp-chip">2,000 mg</span>
                </div>
                <p>Unlocks insulin receptors across your cells so glucose is processed efficiently — removing the signal that tells your body to overproduce male hormones.</p>
                <ul className="ipdp-ticks">
                  <TickRow>Sugar cravings start to fade in weeks 2–4</TickRow>
                  <TickRow>Steadier afternoon energy — fewer 3 PM crashes</TickRow>
                  <TickRow>Lays the groundwork for testosterone to drop naturally</TickRow>
                </ul>
              </article>
              <article className="ipdp-formula-card">
                <div className="ipdp-formula-head">
                  <h3>D-Chiro-Inositol <span>(The Specific Messenger)</span></h3>
                  <span className="ipdp-chip">50 mg</span>
                </div>
                <p>Works in micro-doses alongside Myo-Inositol to regulate glycogen synthesis — without damaging fragile egg quality the way high-dose formulas do.</p>
                <ul className="ipdp-ticks">
                  <TickRow>Sends a precise signal to quiet excess androgen production</TickRow>
                  <TickRow>Supports egg maturation without the toxic ovarian overload</TickRow>
                </ul>
              </article>
            </div>

            <div className="ipdp-head ipdp-head--section" id="triple-action">
              <p className="ipdp-eyebrow">The Synergistic Triple-Action Formula</p>
              <h2>Three Actives, One Capsule Routine</h2>
              <p className="ipdp-head-intro">To ensure full absorption and cellular uptake, we paired the 40:1 Inositol ratio with two non-synthetic, bioavailable micronutrients essential for female reproductive health:</p>
            </div>

            <div className="ipdp-formula-grid ipdp-formula-grid--three">
              <article className="ipdp-formula-card">
                <div className="ipdp-formula-head">
                  <div className="ipdp-formula-title">
                    <span className="ipdp-num ipdp-num--sm">1</span>
                    <h3>Bioactive Folate</h3>
                  </div>
                  <span className="ipdp-chip">340 mcg DFE</span>
                </div>
                <p>Unlike synthetic folic acid (which up to 40% of women cannot process), bioactive folate feeds cell division, lowers systemic inflammation, and prepares a receptive womb environment.</p>
                <ul className="ipdp-ticks ipdp-ticks--tight">
                  <TickRow>Reduces internal inflammation driving cystic flare-ups</TickRow>
                  <TickRow>Supports a receptive environment for healthy egg development</TickRow>
                </ul>
              </article>
              <article className="ipdp-formula-card">
                <div className="ipdp-formula-head">
                  <div className="ipdp-formula-title">
                    <span className="ipdp-num ipdp-num--sm">2</span>
                    <h3>Vitamin D3 <span>(The Hormone Precursor)</span></h3>
                  </div>
                  <span className="ipdp-chip">10 mcg</span>
                </div>
                <p>Vitamin D3 receptors line the ovary and uterine wall. Replenishing D3 provides the biological energy needed for immature follicles to mature and release naturally during ovulation.</p>
                <ul className="ipdp-ticks ipdp-ticks--tight">
                  <TickRow>Directly supports follicle maturation inside the ovaries</TickRow>
                  <TickRow>Helps stabilize the mood swings that spike before a period</TickRow>
                </ul>
              </article>
              <article className="ipdp-formula-card">
                <div className="ipdp-formula-head">
                  <div className="ipdp-formula-title">
                    <span className="ipdp-num ipdp-num--sm">3</span>
                    <h3>100% Bioavailable &amp; Non-Synthetic</h3>
                  </div>
                </div>
                <p>Manufactured to strict GMP global standards to ensure maximum cellular absorption without stomach distress.</p>
                <ul className="ipdp-ticks ipdp-ticks--tight">
                  <TickRow>GMP Certified Manufacturing</TickRow>
                  <TickRow>No fillers, no synthetics, gentle on the stomach</TickRow>
                </ul>
              </article>
            </div>

            <figure className="ipdp-label-card">
              <button
                type="button"
                className="ipdp-label-button"
                aria-label="Enlarge supplement facts label"
                onClick={() =>
                  setZoomImage({
                    src: inositolSupplementFacts,
                    alt: "Supplement Facts on the bottle: 4 capsules per serving, 30 servings per container. Vitamin D3 10 mcg, Folate 340 mcg DFE, Myo-Inositol 2000 mg, D-Chiro-Inositol 50 mg",
                  })
                }
              >
                <img
                  src={inositolSupplementFacts}
                  alt="Supplement Facts on the bottle: 4 capsules per serving, 30 servings per container. Vitamin D3 10 mcg, Folate 340 mcg DFE, Myo-Inositol 2000 mg, D-Chiro-Inositol 50 mg"
                  width={210}
                  height={373}
                  loading="lazy"
                />
              </button>
              <figcaption>Real label. 4 capsules per serving, 30 servings per bottle.</figcaption>
            </figure>

            <div className="ipdp-head ipdp-head--section" id="progress">
              <p className="ipdp-eyebrow">Your 90-Day Ovarian &amp; Cycle Progress Calendar</p>
              <h2>What Changes, and When</h2>
              <p className="ipdp-head-intro">Sustainable biological healing requires consistency. Here is the realistic timeline of what happens as your body absorbs the 40:1 ratio — straight from women who went through it:</p>
            </div>

            <div className="ipdp-measure">
              <blockquote className="ipdp-pull ipdp-mt-18">
                <p>&quot;Within the first month, I started noticing my cravings for sugar started to disappear.&quot;</p>
                <footer>— Real customer, Month 1</footer>
              </blockquote>
            </div>

            <div className="ipdp-timeline">
              <article className="ipdp-timeline-block ipdp-timeline-block--1">
                <BatteryIcon size={30} strokeWidth={1.7} />
                <strong>Weeks 2–4</strong>
                <span>Stable Energy &amp; Craving Reset</span>
              </article>
              <article className="ipdp-timeline-block ipdp-timeline-block--2">
                <MirrorIcon size={30} strokeWidth={1.7} />
                <strong>Weeks 5–8</strong>
                <span>Jawline Calm, Less Oily Face</span>
              </article>
              <article className="ipdp-timeline-block ipdp-timeline-block--3">
                <CalendarCheckIcon size={30} strokeWidth={1.7} />
                <strong>Days 60–90</strong>
                <span>Predictable Cycles Return</span>
              </article>
            </div>

            <div className="ipdp-phases">
              <article className="ipdp-phase">
                <p className="ipdp-phase-label">PHASE 1</p>
                <h3>Weeks 2 to 4 — Cellular Unlocking &amp; Energy Reset</h3>
                <div className="ipdp-phase-items">
                  <div><span className="ipdp-phase-icon"><BoltIcon size={18} /></span><p><strong>Fewer 3 PM Sugar Cravings:</strong> As cells unlock and blood sugar stabilises, the obsessive afternoon cravings and sudden energy crashes begin to ease. Many women notice this in the first two to three weeks.</p></div>
                  <div><span className="ipdp-phase-icon"><MoonIcon size={18} /></span><p><strong>Calmer Sleep &amp; Mood Stability:</strong> As internal metabolic stress drops, your nervous system settles — deeper sleep, more stable morning energy, and fewer mood swings through the day.</p></div>
                </div>
              </article>

              <article className="ipdp-phase">
                <p className="ipdp-phase-label">PHASE 2</p>
                <h3>Weeks 5 to 8 — Androgen Drop &amp; Surface Calm</h3>
                <div className="ipdp-phase-items">
                  <div><span className="ipdp-phase-icon"><SparkleIcon size={18} /></span><p><strong>Clearer Jawline, Less Oily Face &amp; Fewer Flare-Ups:</strong> Lower circulating testosterone means sebaceous glands stop overproducing thick sebum. Deep, painful cystic bumps around the chin begin to shrink and heal.</p></div>
                  <div><span className="ipdp-phase-icon"><HairIcon size={18} /></span><p><strong>Slower Coarse Hair Growth:</strong> Stubborn facial hair strands on the chin and jawline grow back slower, finer, and noticeably softer.</p></div>
                  <div><span className="ipdp-phase-icon"><HeartIcon size={18} /></span><p><strong>Easier, More Comfortable Periods:</strong> As hormone signals settle, many women find their period days feel easier and more comfortable — with less of the cramping that used to stop them in their tracks.</p></div>
                </div>
              </article>

              <blockquote className="ipdp-pull ipdp-phases-quote">
                <p>&quot;My period came back painless in the second month of taking inositol — and it actually stopped after four days.&quot;</p>
                <footer>— Real customer, Month 2</footer>
              </blockquote>

              <article className="ipdp-phase">
                <p className="ipdp-phase-label">PHASE 3</p>
                <h3>Days 60 to 90 — Ovulation &amp; Predictable Cycle Reset</h3>
                <div className="ipdp-phase-items">
                  <div><span className="ipdp-phase-icon"><DropIcon size={18} /></span><p><strong>Predictable Monthly Cycle Dates:</strong> Immature eggs complete their maturation cycle, break free naturally, and release — bringing predictable, manageable period dates back without synthetic birth control.</p></div>
                  <div><span className="ipdp-phase-icon"><LeafIcon size={18} /></span><p><strong>Calm Emotional Balance &amp; Ovulation:</strong> Supports natural ovulation, a lighter feel around that stubborn upper belly fat, and calm, predictable hormone levels throughout the entire month.</p></div>
                </div>
              </article>

              <blockquote className="ipdp-pull ipdp-phases-quote">
                <p>&quot;Now, after 3 months, I can confidently say that I ovulated just this last month and I now remember how it actually feels to ovulate again. I feel more energetic. The biggest difference has been being able to feel like myself again.&quot;</p>
                <footer>— Real customer, Month 3</footer>
              </blockquote>
            </div>

            <div className="ipdp-measure">
              <button type="button" className="ipdp-cta ipdp-cta--upper ipdp-cta--section" onClick={scrollToPackages}>
                Start Your 90-Day Cycle &amp; Skin Reset Today
              </button>
            </div>
          </div>
        </section>

        {/* ============ 04 PROOF, GUARANTEE & PRICING ============ */}
        <section className="ipdp-proof" id="proof">
          <div className="ipdp-wrap">
            <div className="ipdp-head ipdp-head--lg">
              <p className="ipdp-eyebrow">Real Customer Proof</p>
              <h2>In Her Own Words</h2>
            </div>

            <div className="ipdp-measure">
              <figure className="ipdp-testimonial">
                <QuoteIcon size={30} />
                <blockquote className="ipdp-testimonial-lead">“…the biggest difference for me has been being able to feel like myself again.”</blockquote>
                <div className="ipdp-testimonial-body">
                  <p>“Before I started using Myo-inositol, I was struggling with excessive bleeding, a period that rarely went away for weeks on end, and very painful period cramps. Facial hair and very oily face were my biggest insecurities.</p>
                  <p>…Within the first month, I started noticing my cravings for sugar started to disappear. …my period came back painless in the second month of taking inositol and it actually stopped after four days.</p>
                  <p>Now, after 3 months, I can confidently say that I ovulated just this last month and I now remember how it actually feels to ovulate again.</p>
                  <p>…I&apos;m glad I gave it a try.”</p>
                </div>
                <figcaption className="ipdp-testimonial-by">
                  <VerifiedIcon size={16} strokeWidth={2.6} />
                  <span className="ipdp-testimonial-name">Anne A. , Nairobi</span>
                  <span className="ipdp-testimonial-verified">Verified Buyer</span>
                </figcaption>
                <p className="ipdp-testimonial-note">Individual experience. Results vary.</p>
              </figure>

              <div className="ipdp-hope" id="guarantee-intro">
                <p className="ipdp-eyebrow ipdp-eyebrow--red">Sound familiar?</p>
                <h2>Another False Hope?</h2>
                <p>We get it. You have tried the pills, the teas and the “just lose weight” advice, and your cycle is still a guess. So doubt is fair.</p>
                <p><strong>So don’t take our word for it. Test it.</strong> Take it daily for 90 days. If you don’t see the change, you get your money back.</p>
                <p className="ipdp-hope-close">That is what the guarantee below is for.</p>
              </div>

              <div className="ipdp-guarantee" id="guarantee">
                <p className="ipdp-eyebrow">The 90-Day Risk-Free Ovarian &amp; Cycle Guarantee</p>
                <p className="ipdp-guarantee-intro">We know you may have been burned by dismissive medical advice, expensive foreign supplements, or harsh chemical treatments in the past. That is why we want you to try <strong>France shGrace MYO &amp; D-CHIRO INOSITOL+</strong> with zero financial risk.</p>
                <div className="ipdp-guarantee-card">
                  <div className="ipdp-guarantee-head">
                    <span className="ipdp-guarantee-icon"><ShieldCheckIcon size={30} strokeWidth={1.8} /></span>
                    <h3>90-Day 100% Risk-Free Ovarian &amp; Cycle Guarantee</h3>
                  </div>
                  <p>Take France shGrace Inositol+ daily for 90 full days (the exact time required for an immature egg follicle to complete its maturation).</p>
                  <p>If you don&apos;t experience fewer sugar crashes, calmer jawline breakouts, and more predictable monthly cycle dates—simply contact our support team for an immediate, hassle-free refund. <strong>No questions asked.</strong></p>
                </div>
              </div>

              <div className="ipdp-who">
                <p className="ipdp-eyebrow ipdp-eyebrow--dark">Who this is for</p>
                <p className="ipdp-who-intro">If you are dealing with a <strong>hormonal imbalance</strong> and looking to <strong>feel like yourself again</strong>, energetic and with fewer sudden mood swings, this is for you.</p>
                <ul>
                  <li><CheckIcon size={20} strokeWidth={2.4} /><span>Cycles you can’t predict, or a period that drags on for weeks</span></li>
                  <li><CheckIcon size={20} strokeWidth={2.4} /><span>Very painful period cramps</span></li>
                  <li><CheckIcon size={20} strokeWidth={2.4} /><span>Stubborn chin hair, a very oily face and jawline bumps</span></li>
                  <li><CheckIcon size={20} strokeWidth={2.4} /><span>Stubborn upper belly fat that never went away</span></li>
                </ul>
              </div>

              <button type="button" className="ipdp-cta ipdp-cta--upper ipdp-cta--section" onClick={scrollToPackages}>
                Select Your Risk-Free Package Below
              </button>
            </div>
          </div>
        </section>

        {/* ============ PRICING ============ */}
        <section className="ipdp-packages" id="package-selector" ref={packageSelectorRef}>
          <div className="ipdp-wrap">
            <div className="ipdp-head">
              <p className="ipdp-eyebrow">Tiered Value Bundles</p>
              <h2>Pick Your Package</h2>
              <p className="ipdp-head-intro ipdp-head-intro--italic">Since egg maturation and biological hormone balancing require 60 to 90 days, 87% of our Kenyan customers choose the 3-Bottle or 6-Bottle packages for complete cycle reset.</p>
            </div>

            <div className="ipdp-package-grid">
              {bundles.map((option, index) => {
                const product = bundleProducts[option.bottles];
                const displayPrice = product?.price ?? option.expected;
                const selected = selectedBundle === index;
                return (
                  <article className={`ipdp-package${selected ? " is-selected" : ""}`} key={option.bottles}>
                    {option.badge && (
                      <span className={`ipdp-badge ipdp-badge--pack ipdp-badge--${option.badgeTone}`}>{option.badge}</span>
                    )}

                    <div className="ipdp-package-head">
                      <div className="ipdp-package-thumb">
                        <img src={bottleImage} alt="" width={64} height={86} loading="lazy" />
                        <span>{option.count}</span>
                      </div>
                      <div>
                        <h3>{option.title}</h3>
                        <p>{option.packSub}</p>
                      </div>
                    </div>

                    <div className="ipdp-package-price">
                      <strong>
                        {product ? formatKes(product.price) : bundleProductsLoading ? "Loading..." : formatKes(option.expected)}
                      </strong>
                      <del>{formatKes(option.was)}</del>
                      <span className="ipdp-save-chip">Save {formatKes(option.was - displayPrice)}</span>
                    </div>
                    <p className="ipdp-package-daily">Daily cost: ~KSh {option.daily} / day</p>

                    <div className="ipdp-package-details">
                      <p><strong>Ideal for:</strong> {option.ideal}</p>
                      <p className="ipdp-package-detail">
                        <TruckIcon size={20} strokeWidth={1.9} />
                        <span><strong>Shipping:</strong> {option.shipping}</span>
                      </p>
                      {option.bonus && (
                        <p className="ipdp-package-detail">
                          <GiftIcon size={20} strokeWidth={1.9} />
                          <span><strong>Bonus:</strong> {option.bonus}</span>
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      className={`ipdp-package-button${option.solid ? " is-solid" : ""}`}
                      disabled={!product || product.stockQuantity <= 0}
                      aria-pressed={selected}
                      onClick={() => {
                        setSelectedBundle(index);
                        if (product && product.stockQuantity > 0) onAddToCart(product);
                      }}
                    >
                      {product
                        ? option.button
                        : bundleProductsLoading
                          ? "Loading bundle..."
                          : bundleProductsError
                            ? "Could not load bundle"
                            : "Bundle unavailable"}
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ============ PAYMENT & DELIVERY ============ */}
        <section className="ipdp-payment" id="payment">
          <div className="ipdp-wrap">
            <div className="ipdp-head">
              <p className="ipdp-eyebrow">Local Kenyan Payment &amp; Delivery</p>
              <h2>Paid Your Way, Delivered Quietly</h2>
            </div>

            <div className="ipdp-payment-rows">
              <div>
                <span className="ipdp-payment-icon"><PhoneIcon size={22} strokeWidth={1.8} /></span>
                <p><strong>M-Pesa Express Checkout:</strong> Instant 1-click M-Pesa STK Push payment options at checkout.</p>
              </div>
              <div>
                <span className="ipdp-payment-icon"><BoxIcon size={22} strokeWidth={1.8} /></span>
                <p><strong>100% Plain &amp; Discreet Delivery:</strong> Shipped in plain, unbranded boxes directly to your home, office, or local pickup point in Nairobi, Mombasa, Kisumu, Nakuru, and across all 47 counties.</p>
              </div>
              <div>
                <span className="ipdp-payment-icon"><ClockIcon size={22} strokeWidth={1.8} /></span>
                <p><strong>Fast Delivery Times:</strong> 24 Hours in Nairobi Metro | 48 Hours Nationwide.</p>
              </div>
            </div>

            <div className="ipdp-payment-strip" aria-label="Payment methods">
              <span className="ipdp-mpesa-badge">M-Pesa</span>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky buy bar: mobile only (hidden at 900px+ in CSS) */}
      <div className={`ipdp-sticky${showStickyBuy ? " is-visible" : ""}`}>
        <div>
          <strong>France shGrace Inositol+</strong>
          <small>(Save up to 17%)</small>
        </div>
        <button type="button" onClick={scrollToPackages}>Select Bundle</button>
      </div>

      <section className="ipdp-reviews" id="reviews">
        <h2>Customer Reviews</h2>
        {totalReviews > 0 && (
          <p className="ipdp-review-summary">
            <span aria-label={`${averageRating.toFixed(1)} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} className={index < Math.round(averageRating) ? "is-filled" : ""} />
              ))}
            </span>
            {averageRating.toFixed(1)} average · {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
          </p>
        )}
        {!hasReviewed && (
          <div className="ipdp-review-form">
            <h3>Share your rating</h3>
            {isAuthenticated ? (
              <>
                <div className="ipdp-rate-picker" aria-label="Choose a rating">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button type="button" key={rating} onClick={() => setReviewRating(rating)} aria-label={`Rate ${rating} star${rating > 1 ? "s" : ""}`}>
                      <Star className={rating <= reviewRating ? "is-filled" : ""} />
                    </button>
                  ))}
                </div>
                <button type="button" disabled={isSubmittingReview || reviewRating === 0} onClick={submitReview}>
                  {isSubmittingReview ? "Submitting…" : "Submit rating"}
                </button>
              </>
            ) : (
              <p>Please <button type="button" onClick={() => setShowAuthModal(true)}>log in</button> to write a review.</p>
            )}
          </div>
        )}
      </section>
      <Footer />

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-md bg-card border-border rounded-xl p-0 max-h-[90vh] overflow-y-auto">
          {authModalContent}
        </DialogContent>
      </Dialog>
      <Dialog open={zoomImage !== null} onOpenChange={(open) => !open && setZoomImage(null)}>
        <DialogContent className="ipdp-image-dialog">
          {zoomImage && <img src={zoomImage.src} alt={zoomImage.alt || name} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InositolProductPage;