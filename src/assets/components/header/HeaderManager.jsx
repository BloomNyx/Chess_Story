import { useEffect, useState } from "react";

import QueenHeader from "./QueenHeader";
import KnightHeader from "./KnightHeader";
import BishopHeader from "./BishopHeader";
import RookHeader from "./RookHeader";
import PawnHeader from "./PawnHeader";
import KingHeader from "./KingHeader";

import "../../scss/section/Header.scss";

export default function HeaderManager() {

  const [currentHeader, setCurrentHeader] = useState(null);

  useEffect(() => {
    let animationFrame = null;
    let mutationObserver = null;

    const getSections = () => Array.from(document.querySelectorAll("[data-header]"));

    const updateHeader = () => {
      const sections = getSections();
      if (sections.length === 0) return;

      const triggerPoint = window.innerHeight * 0.3;
      let bestSection = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) {
          return;
        }
        const distance = Math.abs(rect.top - triggerPoint);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestSection = section;
        }
      });

      if (!bestSection) {
        setCurrentHeader(null);
        return;
      }

      const headerType = bestSection.dataset.header;
      if (headerType) {
        setCurrentHeader((prev) => (prev === headerType ? prev : headerType));
      }
    };

    const onScroll = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateHeader);
    };

    const startWatching = () => {
      const sections = getSections();
      if (sections.length > 0) {
        updateHeader();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return true;
      }
      return false;
    };

    if (!startWatching()) {
      mutationObserver = new MutationObserver(() => {
        if (startWatching() && mutationObserver) {
          mutationObserver.disconnect();
          mutationObserver = null;
        }
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="headerManager">
      {currentHeader === "queen" && <QueenHeader />}
      {currentHeader === "knight" && <KnightHeader />}
      {currentHeader === "bishop" && <BishopHeader />}
      {currentHeader === "rook" && <RookHeader />}
      {currentHeader === "pawn" && <PawnHeader />}
      {currentHeader === "king" && <KingHeader />}
    </div>
  );

}