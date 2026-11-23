import { useEffect } from "react";
import { initializeMetaPixel } from "@/lib/metaPixel";

const MetaPixelPageView = () => {
  useEffect(() => {
    initializeMetaPixel()?.("track", "PageView");
  }, []);

  return null;
};

export default MetaPixelPageView;
