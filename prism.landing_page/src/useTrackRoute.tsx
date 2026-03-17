import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track } from "@vercel/analytics";

type RouteEvent = {
  path: string;
};

export default function useTrackRoute(): void {
  const location = useLocation();

  useEffect(() => {
    const data: RouteEvent = {
      path: location.pathname,
    };

    track("route_change", data);
  }, [location]);
}
