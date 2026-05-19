import { useEffect, useState } from "react";

export default function Splash({ onFinish }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let count = 0;

    const loading = setInterval(() => {
      count++;
      setProgress(count);

      if (count >= 100) {
        clearInterval(loading);

        setTimeout(() => {
          onFinish?.();
        }, 300); // 살짝 딜레이
      }
    }, 30);

    return () => clearInterval(loading);
  }, []);

  return (
    <section className="splash">
      <div className="loading-wrap">
        <div className="loading-boxes">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className={`box ${
                progress >= (index + 1) * 10 ? "active" : ""
              }`}
            />
          ))}
        </div>

        <div className="loading-percent">{progress}%</div>
      </div>
    </section>
  );
}