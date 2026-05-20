import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // INTRO
      gsap.from(".hero-title", {
        opacity: 0,
        y: 60,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
      });

      gsap.from(".hero-sub", {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 0.2,
      });

      gsap.from(".hero-desc", {
        opacity: 0,
        y: 30,
        duration: 1.2,
        delay: 0.8,
      });

      gsap.from(".hero-buttons", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.1,
      });

      gsap.from(".scroll-down", {
        opacity: 0,
        y: 20,
        delay: 1.5,
      });

      // HERO PIN
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      // BG EFFECT
      gsap.to(".hero-bg", {
        scale: 1.2,
        filter: "blur(0px)",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={heroRef}>

      <div className="hero-bg" />

      <div className="overlay" />

      <div className="hero-inner">

        <span className="hero-sub">
          THE ROYAL COURT OF ELDORIA
        </span>

        <h1 className="hero-title">
          BLACK THRONE
        </h1>

        <p className="hero-desc">
          THE KING NEVER LOST.
          <br />
          HE ONLY MOVED DIFFERENT PIECES.
        </p>

        {/* BUTTONS */}
        <div className="hero-buttons">

          <button className="hero-btn gold">
            ENTER THE GAME
          </button>

          <button className="hero-btn dark">
            READ THE STORY
          </button>

        </div>

      </div>

      <div className="scroll-down">

        <span>SCROLL TO ENTER</span>

        <div className="line"></div>

      </div>

    </section>
  );
}