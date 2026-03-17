import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track } from "@vercel/analytics";

export default function useTrackRoute(): void {
  const location = useLocation();

  useEffect(() => {
    track("pageview", {
      url: location.pathname,
    });
  }, [location]);
}