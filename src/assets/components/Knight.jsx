import { useState, useEffect, useRef } from "react";

// ── Scroll Reveal Hook ────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

// ── Progress Hook ─────────────────────────────────────────────
function useProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

// ── Active Section Hook ───────────────────────────────────────
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.3 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

// ── FlowerRoom Component ──────────────────────────────────────
function FlowerRoom() {
  const [hovered, setHovered] = useState(null);
  const flowers = [
    { id: 0, label: "첫 번째 봄", caption: "퀸은 울지 않았다. 울 수가 없었다." },
    { id: 1, label: "두 번째 가을", caption: "이번엔 더 늦게까지 품었다. 그래서 더 많이 잃었다." },
    { id: 2, label: "세 번째 겨울", caption: "처음으로 — 울었다. 소리 없이. 숨을 참고." },
  ];

  return (
    <div className="knight-flower-room reveal">
      <span className="knight-flower-room__label">나이트가 본 것 — 이름 없는 방</span>
      <div className="knight-flower-room__flowers">
        {flowers.map((f) => (
          <div
            key={f.id}
            className={`knight-flower-room__flower${f.id === 2 ? " withered" : ""}`}
            onMouseEnter={() => setHovered(f.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="knight-flower-room__petal" />
            <span className="knight-flower-room__flower-label">{f.label}</span>
          </div>
        ))}
      </div>
      <p className="knight-flower-room__caption">
        {hovered !== null ? flowers[hovered].caption : "꽃이 하나 늘고. 둘이 늘고. 셋이 됐다."}
      </p>
    </div>
  );
}

// ── Chapter sections ─────────────────────────────────────────
const CHAPTERS = ["cover", "prologue", "ch1", "ch2", "ch3", "ch4", "ch5", "ch6", "epilogue"];
const NAV_LABELS = ["♞", "서막", "I", "II", "III", "IV", "V", "VI", "종막"];

// ── Main Component ────────────────────────────────────────────
export default function Knight() {
  useScrollReveal();
  const progress = useProgress();
  const active = useActiveSection(CHAPTERS);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="knight-story" data-header="knight">
      {/* Progress */}
      <div className="knight-progress" style={{ width: `${progress}%` }} />

      {/* ── COVER ── */}
      <section id="cover" className="knight-cover">
        <div className="knight-cover__bg" />
        <div className="knight-cover__slash" />
        <div className="knight-cover__piece">♞</div>
        <span className="knight-cover__eyebrow">The King's Game</span>
        <h1 className="knight-cover__title">
          The <em>Knight's</em><br />Fall
        </h1>
        <p className="knight-cover__subtitle">충동적 전사의 몰락 — 살아남은 자의 후회</p>
        <span className="knight-cover__scroll-hint">Scroll to begin</span>
      </section>

      {/* ── PROLOGUE ── */}
      <section id="prologue">
        <div className="knight-scene knight-scene--centered">
          <div className="knight-chapter reveal">
            <span className="knight-chapter__number">Prologue</span>
            <h2 className="knight-chapter__title">
              말(馬)의 움직임
              <span className="knight-chapter__title--sub">The Movement of a Piece</span>
            </h2>
            <div className="knight-chapter__rule" />
          </div>
          {[
            "체스에서 나이트는 유일하게 꺾인다.",
            "직선으로 가지 않는다.",
            "L자로, 비틀어서, 다른 말들을 넘어서.",
            null,
            "사람들은 그것을 독특하다고 했다.",
            "나이트는 알았다.",
            null,
            "그것은 독특함이 아니었다.",
            "똑바로 가지 못하는 것이었다.",
            null,
            "그리고 살아남은 자는 — 늘 그렇다.",
          ].map((text, i) =>
            text === null ? (
              <span key={i} className="knight-line--space" />
            ) : (
              <span key={i} className={`knight-line reveal${i >= 8 ? " knight-line--blood" : ""}`}>
                {text}
              </span>
            )
          )}
        </div>
        <div className="knight-divider">
          <div className="knight-divider__line" />
          <span className="knight-divider__symbol">✦</span>
          <div className="knight-divider__line" />
        </div>
      </section>

      {/* ── CH I ── */}
      <section id="ch1">
        <div className="knight-scene">
          <div className="knight-chapter reveal">
            <span className="knight-chapter__number">Chapter I</span>
            <h2 className="knight-chapter__title">
              퀸이 오기 전
              <span className="knight-chapter__title--sub">Before the Queen Arrived</span>
            </h2>
            <div className="knight-chapter__rule" />
          </div>

          {[
            { text: "나이트가 왕국에 온 것은 퀸보다 먼저였다.", type: "" },
            { text: null },
            { text: "열다섯. 아버지가 전장에서 죽은 해.", type: "" },
            { text: "그는 킹 앞에 무릎을 꿇었다.", type: "" },
            { text: null },
            { text: "싸우게 해주십시오.", type: "dialogue" },
            { text: null },
            { text: "킹은 그를 오래 봤다.", type: "" },
            { text: "소년의 눈에 두려움이 없었다.", type: "" },
            { text: "슬픔도 없었다.", type: "" },
            { text: "오직 — 움직이고 싶다는 것만 있었다.", type: "em" },
            { text: null },
            { text: "좋소.", type: "dialogue" },
            { text: null },
            { text: "이후 십 년.", type: "blood" },
            { text: "나이트는 싸웠다.", type: "" },
            { text: "동쪽, 서쪽, 북쪽.", type: "" },
            { text: "이기면 다음 전장으로.", type: "" },
            { text: null },
            { text: "그는 생각하지 않았다.", type: "" },
            { text: "생각하면 느려졌다.", type: "" },
            { text: "느리면 죽었다.", type: "" },
            { text: "그래서 — 생각하지 않기로 했다.", type: "em" },
          ].map((item, i) =>
            !item.text ? (
              <span key={i} className="knight-line--space" />
            ) : (
              <span key={i} className={`knight-line reveal${item.type ? ` knight-line--${item.type}` : ""}`}>
                {item.text}
              </span>
            )
          )}
        </div>
        <div className="knight-divider">
          <div className="knight-divider__line" />
          <span className="knight-divider__symbol">✦</span>
          <div className="knight-divider__line" />
        </div>
      </section>

      {/* ── CH II ── */}
      <section id="ch2">
        <div className="knight-scene">
          <div className="knight-chapter reveal">
            <span className="knight-chapter__number">Chapter II</span>
            <h2 className="knight-chapter__title">
              퀸이 온 날
              <span className="knight-chapter__title--sub">The Day the Queen Arrived</span>
            </h2>
            <div className="knight-chapter__rule" />
          </div>

          {[
            { text: "퀸이 왕국에 온 날.", type: "" },
            { text: "나이트는 훈련장에 있었다.", type: "" },
            { text: null },
            { text: "그는 그녀를 봤다.", type: "" },
            { text: "걷는 방식.", type: "pale" },
            { text: "두려워하지 않는 눈.", type: "pale" },
            { text: null },
            { text: "나이트는 처음으로 — 멈췄다.", type: "em" },
            { text: null },
            { text: "전장에서도 멈추지 않는 자가.", type: "" },
            { text: "그녀 앞에서 발이 굳었다.", type: "" },
            { text: null },
            { text: "그날 밤 그는 술을 마셨다.", type: "" },
            { text: "이유를 몰랐다.", type: "" },
            { text: "아니, 알았다.", type: "em" },
            { text: "알기 때문에 마셨다.", type: "" },
            { text: null },
            { text: "퀸은 킹의 사람이었다.", type: "blood" },
            { text: "체스판 위에서.", type: "" },
            { text: "그리고 체스판 밖에서도.", type: "" },
            { text: null },
            { text: "퀸이 전장에서 돌아올 때마다.", type: "" },
            { text: "나이트는 제일 먼저 성문 앞에 있었다.", type: "em" },
            { text: "아무도 시키지 않았다.", type: "" },
            { text: null },
            { text: "퀸은 알아챘을 것이다.", type: "pale" },
            { text: "모른 척했다.", type: "pale" },
            { text: "그것이 그녀의 배려였다.", type: "pale" },
            { text: null },
            { text: "나이트에게는 그 배려가", type: "" },
            { text: "칼보다 날카로웠다.", type: "blood" },
          ].map((item, i) =>
            !item.text ? (
              <span key={i} className="knight-line--space" />
            ) : (
              <span key={i} className={`knight-line reveal${item.type ? ` knight-line--${item.type}` : ""}`}>
                {item.text}
              </span>
            )
          )}
        </div>
        <div className="knight-divider">
          <div className="knight-divider__line" />
          <span className="knight-divider__symbol">✦</span>
          <div className="knight-divider__line" />
        </div>
      </section>

      {/* ── CH III ── */}
      <section id="ch3">
        <div className="knight-scene">
          <div className="knight-chapter reveal">
            <span className="knight-chapter__number">Chapter III</span>
            <h2 className="knight-chapter__title">
              나이트가 본 것
              <span className="knight-chapter__title--sub">What the Knight Saw</span>
            </h2>
            <div className="knight-chapter__rule" />
          </div>

          {[
            { text: "나이트는 퀸을 지켜봤다.", type: "" },
            { text: null },
            { text: "그리고 보았다.", type: "em" },
            { text: null },
            { text: "퀸이 그 작은 방에 드나드는 것을.", type: "" },
            { text: "혼자서, 아무도 없을 때.", type: "" },
            { text: "꽃을 들고 들어가는 것을.", type: "" },
          ].map((item, i) =>
            !item.text ? (
              <span key={i} className="knight-line--space" />
            ) : (
              <span key={i} className={`knight-line reveal${item.type ? ` knight-line--${item.type}` : ""}`}>
                {item.text}
              </span>
            )
          )}

          <FlowerRoom />

          {[
            { text: "나이트는 알았다.", type: "" },
            { text: "묻지 않아도.", type: "pale" },
            { text: null },
            { text: "그는 한 번도 — 퀸에게 다가가지 않았다.", type: "" },
            { text: "그 방 앞에서.", type: "" },
            { text: "그냥 서 있었다가 돌아갔다.", type: "" },
            { text: null },
            { text: "아무것도 할 수 없어서.", type: "pale" },
            { text: "아무것도 하지 않았다.", type: "pale" },
            { text: null },
            { text: "그것이 나이트의 첫 번째 후회였다.", type: "blood" },
            { text: "다만 그때는 — 후회인 줄 몰랐다.", type: "" },
          ].map((item, i) =>
            !item.text ? (
              <span key={i} className="knight-line--space" />
            ) : (
              <span key={i} className={`knight-line reveal${item.type ? ` knight-line--${item.type}` : ""}`}>
                {item.text}
              </span>
            )
          )}
        </div>
        <div className="knight-divider">
          <div className="knight-divider__line" />
          <span className="knight-divider__symbol">✦</span>
          <div className="knight-divider__line" />
        </div>
      </section>

      {/* ── CH IV ── */}
      <section id="ch4">
        <div className="knight-scene">
          <div className="knight-chapter reveal">
            <span className="knight-chapter__number">Chapter IV</span>
            <h2 className="knight-chapter__title">
              퀸의 마지막 출정 전날
              <span className="knight-chapter__title--sub">The Night Before</span>
            </h2>
            <div className="knight-chapter__rule" />
          </div>

          {[
            { text: "퀸이 남쪽으로 간다는 소문이 돌았다.", type: "" },
            { text: "단독으로.", type: "blood" },
            { text: null },
            { text: "나이트는 킹에게 갔다.", type: "" },
            { text: null },
            { text: "제가 함께 가겠습니다.", type: "dialogue" },
            { text: "명령이 아니오.", type: "dialogue" },
            { text: "압니다.", type: "dialogue" },
            { text: "퀸은 혼자여야 하오.", type: "dialogue" },
            { text: "그래서 죽으라는 말씀이십니까.", type: "dialogue" },
            { text: null },
            { text: "처음이었다.", type: "em" },
            { text: "나이트가 킹에게 직접 물은 것이.", type: "" },
            { text: null },
            { text: "킹은 대답하지 않았다.", type: "pale" },
            { text: null },
            { text: "나이트는 퀸의 방으로 갔다.", type: "" },
            { text: "문 앞에서 오래 서 있었다.", type: "" },
            { text: "노크하지 않았다.", type: "" },
            { text: null },
            { text: "할 말이 없었다.", type: "" },
            { text: "아니, 너무 많았다.", type: "em" },
          ].map((item, i) =>
            !item.text ? (
              <span key={i} className="knight-line--space" />
            ) : (
              <span key={i} className={`knight-line reveal${item.type ? ` knight-line--${item.type}` : ""}`}>
                {item.text}
              </span>
            )
          )}

          <div className="knight-sword reveal">
            <div className="knight-sword__blade" />
            <span className="knight-sword__text">그는 문 앞에 칼을 내려놓았다</span>
          </div>

          {[
            { text: "자신이 가진 것 중 유일한 것을.", type: "pale" },
            { text: null },
            { text: "그리고 돌아섰다.", type: "blood" },
          ].map((item, i) =>
            !item.text ? (
              <span key={i} className="knight-line--space" />
            ) : (
              <span key={i} className={`knight-line reveal${item.type ? ` knight-line--${item.type}` : ""}`}>
                {item.text}
              </span>
            )
          )}
        </div>
        <div className="knight-divider">
          <div className="knight-divider__line" />
          <span className="knight-divider__symbol">✦</span>
          <div className="knight-divider__line" />
        </div>
      </section>

      {/* ── CH V ── */}
      <section id="ch5">
        <div className="knight-scene">
          <div className="knight-chapter reveal">
            <span className="knight-chapter__number">Chapter V</span>
            <h2 className="knight-chapter__title">
              나이트의 전쟁
              <span className="knight-chapter__title--sub">The Knight's War</span>
            </h2>
            <div className="knight-chapter__rule" />
          </div>

          {[
            { text: "퀸이 떠난 날.", type: "" },
            { text: "나이트는 성을 나갔다.", type: "" },
            { text: null },
            { text: "명령 없이.", type: "blood" },
            { text: "허락 없이.", type: "blood" },
            { text: null },
            { text: "남쪽으로.", type: "" },
            { text: "퀸과 같은 방향으로.", type: "" },
            { text: "다른 길로.", type: "pale" },
            { text: null },
            { text: "그는 적의 후방을 쳤다.", type: "" },
            { text: "혼자서.", type: "" },
            { text: "L자로. 비틀어서.", type: "" },
            { text: "다른 말들을 넘어서.", type: "" },
            { text: null },
            { text: "전쟁은 끝났다.", type: "" },
            { text: null },
            { text: "나이트는 살아남았다.", type: "em" },
            { text: null },
            { text: "그것이 — 가장 잔인한 결말이었다.", type: "blood" },
            { text: null },
            { text: "퀸은 돌아오지 않았다.", type: "pale" },
            { text: "나이트는 돌아왔다.", type: "pale" },
            { text: null },
            { text: "왜 자신이 살았는지.", type: "" },
            { text: "나이트는 끝내 알지 못했다.", type: "ghost" },
          ].map((item, i) =>
            !item.text ? (
              <span key={i} className="knight-line--space" />
            ) : (
              <span key={i} className={`knight-line reveal${item.type ? ` knight-line--${item.type}` : ""}`}>
                {item.text}
              </span>
            )
          )}
        </div>
        <div className="knight-divider">
          <div className="knight-divider__line" />
          <span className="knight-divider__symbol">✦</span>
          <div className="knight-divider__line" />
        </div>
      </section>

      {/* ── CH VI ── */}
      <section id="ch6">
        <div className="knight-scene">
          <div className="knight-chapter reveal">
            <span className="knight-chapter__number">Chapter VI</span>
            <h2 className="knight-chapter__title">
              살아남은 자
              <span className="knight-chapter__title--sub">The Survivor</span>
            </h2>
            <div className="knight-chapter__rule" />
          </div>

          {[
            { text: "나이트는 왕국으로 돌아왔다.", type: "" },
            { text: null },
            { text: "아무도 그를 기다리지 않았다.", type: "pale" },
            { text: null },
            { text: "수고했소.", type: "dialogue" },
            { text: null },
            { text: "그게 전부였다.", type: "ghost" },
            { text: null },
            { text: "나이트는 퀸의 방으로 갔다.", type: "" },
            { text: null },
            { text: "문이 열려 있었다.", type: "" },
            { text: "아무도 없었다.", type: "" },
            { text: null },
            { text: "꽃 세 송이.", type: "blood" },
            { text: "체스 말 두 개.", type: "blood" },
            { text: "나란히.", type: "blood" },
            { text: null },
            { text: "문 앞에 두고 간 자신의 칼이", type: "" },
            { text: "방 안에 들어와 있었다.", type: "" },
            { text: null },
            { text: "퀸이 가져간 것이다.", type: "em" },
            { text: "떠나기 전에.", type: "" },
            { text: null },
            { text: "나이트는 그 칼을 집어들었다.", type: "" },
            { text: "손잡이가 닳아 있었다.", type: "" },
            { text: "퀸의 손이 쥔 자국이었다.", type: "pale" },
            { text: null },
            { text: "그는 처음으로 — 울었다.", type: "blood" },
            { text: "소리 없이.", type: "" },
            { text: null },
            { text: "전장에서 죽은 동료들 앞에서도", type: "ghost" },
            { text: "울지 않았던 자가.", type: "ghost" },
            { text: null },
            { text: "아무도 없는 방에서.", type: "" },
            { text: "꽃 세 송이 앞에서.", type: "" },
          ].map((item, i) =>
            !item.text ? (
              <span key={i} className="knight-line--space" />
            ) : (
              <span key={i} className={`knight-line reveal${item.type ? ` knight-line--${item.type}` : ""}`}>
                {item.text}
              </span>
            )
          )}
        </div>
      </section>

      {/* ── MAIN COPY ── */}
      <div className="knight-copy">
        <span className="knight-copy__piece">♞</span>
        <p className="knight-copy__text">
          He survived every war.<br />
          <em>He could not survive this.</em>
        </p>
      </div>

      {/* ── EPILOGUE ── */}
      <section id="epilogue">
        <div className="knight-scene knight-scene--centered">
          <div className="knight-chapter reveal">
            <span className="knight-chapter__number">Epilogue</span>
            <h2 className="knight-chapter__title">
              살아있다는 것
              <span className="knight-chapter__title--sub">What It Means to Live</span>
            </h2>
            <div className="knight-chapter__rule" style={{ margin: "24px auto 0" }} />
          </div>

          <div className="knight-epilogue">
            <div className="knight-epilogue__bg" />
            <div className="knight-epilogue__pieces reveal">
              <span>♛</span><span>♔</span><span>♞</span>
            </div>
            {[
              { text: "나이트는 그 후로도 오래 살았다.", type: "" },
              { text: null },
              { text: "전장에 나가지 않았다.", type: "" },
              { text: "누구도 그에게 싸우라 하지 않았다.", type: "" },
              { text: "나이트도 원하지 않았다.", type: "" },
              { text: null },
              { text: "그는 매일 아침 그 방 앞을 지나쳤다.", type: "" },
              { text: "문은 항상 닫혀 있었다.", type: "pale" },
              { text: null },
              { text: "어느 봄날.", type: "" },
              { text: "문틈으로 햇살이 들어오는 것을 봤다.", type: "" },
              { text: null },
              { text: "나이트는 그 앞에 한참 서 있었다.", type: "" },
              { text: null },
              { text: "노크하지 않았다.", type: "blood" },
              { text: "그럴 자격이 없다고 생각했다.", type: "" },
              { text: null },
              { text: "살아있다는 것이 — 때로는 형벌이다.", type: "em" },
            ].map((item, i) =>
              !item.text ? (
                <span key={i} className="knight-line--space" />
              ) : (
                <span key={i} className={`knight-line reveal${item.type ? ` knight-line--${item.type}` : ""}`}>
                  {item.text}
                </span>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}