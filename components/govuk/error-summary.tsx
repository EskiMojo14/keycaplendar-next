"use client";
import type {
  ComponentPropsWithoutRef,
  ForwardedRef,
  RefCallback,
} from "react";
import { forwardRef, useCallback } from "react";
import { mergeRefs } from "react-merge-refs";
import type { LinkProps } from "./link";
import Link from "./link";
import List from "./list";
import { govukBem } from ".";
import { forwardGenericRef } from "@/logic/lib/react";

const useErrorMessage = (disableAutoFocus?: boolean) => {
  return useCallback<RefCallback<HTMLDivElement>>((ref) => {
    if (!ref || disableAutoFocus) return;
    ref.setAttribute("tabindex", "-1");
    ref.addEventListener(
      "blur",
      () => {
        ref.removeAttribute("tabindex");
      },
      { once: true },
    );
    ref.focus();
  }, []);
};

interface ErrorMessageProps extends ComponentPropsWithoutRef<"div"> {
  disableAutoFocus?: boolean;
}

export const errorSummaryClasses = govukBem("error-summary");

export default forwardRef<HTMLDivElement, ErrorMessageProps>(
  function ErrorSummary(
    { disableAutoFocus, className, children, ...props },
    ref,
  ) {
    const ownRef = useErrorMessage(disableAutoFocus);
    return (
      <div
        {...props}
        ref={mergeRefs([ref, ownRef])}
        className={errorSummaryClasses({ extra: className })}
      >
        <div role="alert">
          <h2 className={errorSummaryClasses("title")}>There is a problem</h2>
          <div className={errorSummaryClasses("body")}>
            <List className={errorSummaryClasses("list")}>{children}</List>
          </div>
        </div>
      </div>
    );
  },
);

export function getFragmentFromUrl(url: string) {
  if (!url.includes("#")) {
    return undefined;
  }

  return url.split("#").pop();
}

/**
 * Focus the target element
 *
 * By default, the browser will scroll the target into view. Because our
 * labels or legends appear above the input, this means the user will be
 * presented with an input without any context, as the label or legend will be
 * off the top of the screen.
 *
 * Manually handling the click event, scrolling the question into view and
 * then focussing the element solves this.
 *
 * This also results in the label and/or legend being announced correctly in
 * NVDA (as tested in 2018.3.2) - without this only the field type is
 * announced (e.g. "Edit, has autocomplete").
 *
 *
 */
function focusTarget($target: EventTarget): boolean {
  // If the element that was clicked was not a link, return early
  if (!($target instanceof HTMLAnchorElement)) {
    return false;
  }

  const inputId = getFragmentFromUrl($target.href);
  if (!inputId) {
    return false;
  }

  const $input = document.getElementById(inputId);
  if (!$input) {
    return false;
  }

  const $legendOrLabel = getAssociatedLegendOrLabel($input);
  if (!$legendOrLabel) {
    return false;
  }

  // Scroll the legend or label into view *before* calling focus on the input
  // to avoid extra scrolling in browsers that don't support `preventScroll`
  // (which at time of writing is most of them...)
  $legendOrLabel.scrollIntoView();
  $input.focus({ preventScroll: true });

  return true;
}

function getAssociatedLegendOrLabel($input: HTMLElement) {
  const $fieldset = $input.closest("fieldset");

  if ($fieldset) {
    const $legends = $fieldset.getElementsByTagName("legend");

    if ($legends.length) {
      const $candidateLegend = $legends[0]!;

      // If the input type is radio or checkbox, always use the legend if
      // there is one.
      if (
        $input instanceof HTMLInputElement &&
        ($input.type === "checkbox" || $input.type === "radio")
      ) {
        return $candidateLegend;
      }

      // For other input types, only scroll to the fieldset’s legend (instead
      // of the label associated with the input) if the input would end up in
      // the top half of the screen.
      //
      // This should avoid situations where the input either ends up off the
      // screen, or obscured by a software keyboard.
      const legendTop = $candidateLegend.getBoundingClientRect().top;
      const inputRect = $input.getBoundingClientRect();

      // If the browser doesn't support Element.getBoundingClientRect().height
      // or window.innerHeight (like IE8), bail and just link to the label.
      if (inputRect.height && window.innerHeight) {
        const inputBottom = inputRect.top + inputRect.height;

        if (inputBottom - legendTop < window.innerHeight / 2) {
          return $candidateLegend;
        }
      }
    }
  }

  return (
    document.querySelector(`label[for='${$input.getAttribute("id")}']`) ||
    $input.closest("label")
  );
}

export const ErrorSummaryLink = forwardGenericRef(function ErrorSummaryLink<T>(
  props: LinkProps<T>,
  ref: ForwardedRef<HTMLAnchorElement>,
) {
  return (
    <Link
      {...props}
      ref={ref}
      onClick={(e) => {
        const { target } = e;
        if (target && focusTarget(target)) {
          e.preventDefault();
        }
      }}
    />
  );
});
