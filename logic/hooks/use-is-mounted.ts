import { useState, useEffect } from "react";

export const useIsMounted = () => {
  const [mounted, _setMounted] = useState(false);
  useEffect(() => {
    _setMounted(true);
  }, []);
  return mounted;
};
