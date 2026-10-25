import { useEffect } from "react";

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function useFocusTrap(open, containerRef) {
  useEffect(() => {
    if (!open || !containerRef.current) return;
    const node = containerRef.current;
    const previous = document.activeElement;

    const items = () =>
      Array.from(node.querySelectorAll(FOCUSABLE)).filter(
        (element) => element.getClientRects().length > 0,
      );

    const timer = window.setTimeout(() => {
      const first = items()[0];
      (first || node).focus({ preventScroll: true });
    }, 80);

    const onKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const list = items();
      if (!list.length) {
        event.preventDefault();
        node.focus({ preventScroll: true });
        return;
      }
      const first = list[0];
      const last = list[list.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === node)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    node.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      node.removeEventListener("keydown", onKeyDown);
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
    };
  }, [open, containerRef]);
}
