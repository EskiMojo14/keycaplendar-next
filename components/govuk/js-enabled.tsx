"use client";
import { useLayoutEffect } from "react";

export default function JSEnabled() {
  useLayoutEffect(() => {
    document.body.classList.add("js-enabled");
  }, []);
  return null;
}
