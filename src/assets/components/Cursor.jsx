import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef = useRef(null);
  const trailRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      // 🔥 메인 커서
      gsap.to(dotRef.current, {
        x,
        y,
        duration: 0.15,
        ease: "power3.out",
      });

      // ✨ 트레일
      gsap.to(trailRef.current, {
        x,
        y,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dotRef}></div>
      <div className="cursor-trail" ref={trailRef}></div>
    </>
  );
}