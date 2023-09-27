"use client";
import type { AppBarProps } from "@mui/material/AppBar";
import MuiAppBar from "@mui/material/AppBar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import mergeSx from "merge-sx";
import { forwardRef } from "react";
import { castSx } from "@/logic/lib/utils";

export default forwardRef<HTMLElement, AppBarProps>(function AppBar(
  { sx, ...props },
  ref,
) {
  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return (
    <MuiAppBar
      ref={ref}
      {...props}
      sx={mergeSx(
        castSx((theme) => ({
          backgroundImage: "none",
          backgroundColor:
            theme.vars.sys.color[scrolled ? "surfaceContainer" : "surface"],
          color: theme.vars.sys.color.onSurface,
          boxShadow: theme.vars.sys.elevation[scrolled ? 2 : 0],
          transition: theme.transitions.create(
            ["box-shadow", "background-color"],
            {
              duration: theme.vars.sys.motion.duration.medium1,
              easing: theme.vars.sys.motion.easing.standard,
            },
          ),
        })),
        sx,
      )}
    />
  );
}) as typeof MuiAppBar;
