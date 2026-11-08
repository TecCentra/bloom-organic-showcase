import { InstagramEmbed } from "react-social-media-embed";

// Color tokens: warm gold / deep teal / black
const COLORS = {
  ink: "#141615",
  navy: "#114238", // deep teal
  gold: "#EFBF04", // warm gold
};

const StayConnected = () => {
  return (
    <div className="w-full flex flex-col items-center gap-6 py-10 px-4 sm:px-8 md:px-16 lg:px-40">

      <div className="w-full px-4 sm:px-0">
        <span
          className="block text-xs font-medium uppercase tracking-[0.25em] mb-2"
          style={{ color: COLORS.gold }}
        >
          Follow along
        </span>

        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light tracking-wide text-left"
          style={{ color: COLORS.ink }}
        >
          STAY CONNECTED
        </h2>

        <div
          className="mt-4 h-px w-16"
          style={{ backgroundColor: COLORS.navy }}
        />
      </div>

      <div className="w-full flex justify-center overflow-hidden">
        <InstagramEmbed
          url="https://www.instagram.com/organicpurebloomke?dlrf=MXRucHhuNDR5YzMybA=="
          width="100%"
        />
      </div>
    </div>
  );
};

export default StayConnected;