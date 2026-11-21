const META_PIXEL_ID = "2937091883333719";

type MetaEventName = "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase";
type MetaEventParameters = Record<string, unknown>;

type MetaPixelFunction = (
  command: string,
  eventName: string,
  parameters?: MetaEventParameters,
  options?: { eventID: string }
) => void;

type MetaWindow = Window & {
  fbq?: MetaPixelFunction;
  dataLayer?: Array<Record<string, unknown>>;
};

export function initializeMetaPixel() {
  const pixelWindow = window as MetaWindow;
  if (pixelWindow.fbq) return pixelWindow.fbq;

  const script = document.createElement("script");
  script.textContent = `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window,document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${META_PIXEL_ID}');
  `;
  document.head.appendChild(script);

  return (window as MetaWindow).fbq;
}

export function trackMetaEvent(eventName: MetaEventName, parameters: MetaEventParameters) {
  const eventId = window.crypto?.randomUUID
    ? window.crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const pixelWindow = window as MetaWindow;
  const fbq = initializeMetaPixel();

  fbq?.("track", eventName, parameters, { eventID: eventId });

  pixelWindow.dataLayer = pixelWindow.dataLayer || [];
  pixelWindow.dataLayer.push({
    event: eventName,
    event_name: eventName,
    event_id: eventId,
    ...parameters,
  });

  return eventId;
}
