import { useState, useEffect, useRef, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────

const CHAPTERS = [
  { id: "prologue",   label: "PROLOGUE" },
  { id: "golden",     label: "I. GOLDEN" },
  { id: "room",       label: "II. THE ROOM" },
  { id: "kgame",      label: "III. GAME" },
  { id: "blackcourt", label: "IV. COURT" },
  { id: "epilogue",   label: "EPILOGUE" },
];

const CHESS_BOARD_LAYOUT = [
  // [piece, cellType, highlight]  cellType: 'd'=dark, 'l'=light, highlight: null | 'blood' | 'gold'
  ["♜","d",null],["♞","l",null],["♝","d",null],["♛","l","blood"],["♚","d",null],["♝","l",null],["♞","d",null],["♜","l",null],
  ["♟","d",null],["♟","l",null],["♟","d",null],["♟","l",null],["","d",null],["♟","l",null],["♟","d",null],["♟","l",null],
  ["","l",null],["","d",null],["","l",null],["","d",null],["♟","l",null],["","d",null],["","l",null],["","d",null],
  ["","d",null],["","l",null],["","d",null],["♙","l","gold"],["","d",null],["","l",null],["","d",null],["","l",null],
  ["","l",null],["","d",null],["","l",null],["","d",null],["♙","l","gold"],["","d",null],["","l",null],["","d",null],
  ["","d",null],["♘","l",null],["","d",null],["","l",null],["","d",null],["♗","l","blood"],["","d",null],["","l",null],
  ["♙","l",null],["♙","d",null],["♙","l",null],["","d",null],["","l",null],["♙","d",null],["♙","l",null],["♙","d",null],
  ["♖","d",null],["","l",null],["♗","d",null],["♕","l",null],["♔","d","gold"],["","l",null],["","d",null],["♖","l",null],
];

const COURT_PIECES = [
  { icon: "♜", name: "ROOK",   role: "충성스러운 성주" },
  { icon: "♞", name: "KNIGHT", role: "야심찬 장군" },
  { icon: "♛", name: "QUEEN",  role: "가장 위험한 자", featured: true },
  { icon: "♝", name: "BISHOP", role: "왕의 귀를 가진 자" },
  { icon: "♟", name: "PAWN",   role: "이름 없는 병사" },
];

const FLOWERS = [
  { icon: "🌸", label: "첫 번째", season: "첫 번째 봄" },
  { icon: "🌺", label: "두 번째", season: "두 번째 가을" },
  { icon: "🌼", label: "세 번째", season: "세 번째 겨울" },
];

const PILLARS = [
  { icon: "🗡", kr: "권력", en: "POWER" },
  { icon: "🕯", kr: "배신", en: "BETRAYAL" },
  { icon: "☠", kr: "암살", en: "ASSASSINATION" },
];

// ─── HOOKS ───────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("reveal--visible");
      }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      }),
      { threshold: 0.45 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

function useProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      setPct((window.scrollY / max) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return pct;
}

function useCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const hoverProps = {
    onMouseEnter: () => setHovering(true),
    onMouseLeave: () => setHovering(false),
  };
  return { pos, hovering, hoverProps };
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────

function ChLabel({ children }) {
  return (
    <p className="ch-label reveal">
      {children}
    </p>
  );
}

function SceneTitle({ children }) {
  return (
    <h2 className="scene-title reveal reveal--d1">
      {children}
    </h2>
  );
}

function Divider({ type = "h" }) {
  return <div className={`divider divider--${type}`} />;
}

function CopyBlock({ lines }) {
  return (
    <div className="copy-block reveal reveal--d4">
      <p className="copy-en">
        {lines.map((line, i) =>
          i === 0
            ? <span key={i} className="u-gold">{line}</span>
            : <span key={i}>{line}</span>
        )}
      </p>
    </div>
  );
}

// ─── SCENE: PROLOGUE ─────────────────────────────────────────

function ScenePrologue() {
  return (
    <section id="prologue" className="section prologue">
      <div className="prologue__bg" aria-hidden />
      <div className="prologue__content">
        <span className="prologue__crown" aria-hidden>♔</span>
        <h1 className="prologue__title">
          THE KING'S<br /><span>GAME</span>
        </h1>
        <p className="prologue__sub">
          A STORY OF POWER · LOVE · LOSS
        </p>
        <div className="prologue__rule" aria-hidden />
        <p className="prologue__intro">
          모든 왕국에는 규칙이 있다.<br />
          모든 규칙에는 만든 자가 있다.<br />
          그 자는 결코 말(馬)이 아니다.<br /><br />
          그리고 가장 강한 말(馬)에게는<br />
          아무도 묻지 않는다.<br />
          <em>당신이 원하는 것이 무엇인지를.</em>
        </p>
      </div>
      <div className="prologue__scroll-cue" aria-hidden>
        <span style={{ fontSize: 14 }}>↓</span>
        <span>SCROLL</span>
      </div>
    </section>
  );
}

// ─── SCENE: THE GOLDEN KING ───────────────────────────────────

function SceneGolden() {
  return (
    <section id="golden" className="section golden">
      <div className="golden__grid">
        {/* LEFT: Story */}
        <div className="golden__left">
          <ChLabel>CHAPTER I</ChLabel>
          <SceneTitle>
            THE{" "}
            <span className="scene-title__gold">GOLDEN</span>
            <br />KING
          </SceneTitle>

          <div className="story-body">
            {[
              { text: "퀸이 왕국에 처음 들어온 날,", cls: "" },
              { text: "킹은 창가에 서 있었다.", cls: "" },
              { text: "그는 그녀를 보지 않았다.", cls: "story-line--em" },
              { text: "정확히는 — 보지 않는 척했다.", cls: "story-line--em" },
            ].map((l, i) => (
              <p key={i} className={`story-line ${l.cls} reveal reveal--d${Math.min(i + 1, 4)}`}>
                {l.text}
              </p>
            ))}

            <br />

            {[
              { text: "그녀가 걷는 방식이 달랐다." },
              { text: "왕좌를 향해 걸으면서도" },
              { text: "왕좌를 두려워하지 않는 눈이었다.", cls: "story-line--accent" },
            ].map((l, i) => (
              <p key={i} className={`story-line ${l.cls || ""} reveal reveal--d3`}>
                {l.text}
              </p>
            ))}

            <br />

            <p className="story-line story-line--thought reveal reveal--d4">
              그날 밤 퀸은 처음으로 생각했다.
            </p>
            <p className="story-line story-line--thought reveal reveal--d4">
              아이가 있다면. 나와 그 사람 사이에 있을, 무언가.
            </p>
            <p className="story-line story-line--thought reveal reveal--d5">
              그 씨앗이 얼마나 긴 시간 동안 자라지 못할 것인지를, 그녀는 아직 몰랐다.
            </p>

            <br />

            <p className="story-line story-line--em reveal reveal--d5">
              왕국의 모든 사건은 왕이 둔 수였다.
            </p>
          </div>

          <div className="copy-block reveal reveal--d5">
            <p className="copy-en">
              <span>HE MOVED MEN</span>
              LIKE PIECES.
            </p>
          </div>
        </div>

        {/* RIGHT: Visual */}
        <div className="golden__right">
          <div className="reveal">
            <span className="piece-icon piece-icon--hero" aria-label="King chess piece">♔</span>
            <div className="pieces-row" style={{ justifyContent: "center", marginTop: 8 }}>
              {["♘","♗","♕","♙","♖"].map((p, i) => (
                <span key={i} className="piece-icon piece-icon--sm" title={["장군","재상","왕비","병사","성주"][i]}>
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="quote-block reveal reveal--d2">
            <p className="quote-block__text">
              왕은 낮에 왕좌에 앉아 미소짓는다.<br />
              그의 눈은 멀리 있다 — 이미 세 수 앞을.<br />
              신하들은 왕의 친절함을 칭송한다.<br />
              <em>그것이 왕이 원하는 것이다.</em>
            </p>
            <p className="quote-block__attr">— 왕국 연대기, 저자 불명</p>
          </div>

          <div className="quote-block reveal reveal--d3" style={{ borderLeftColor: "var(--blood-bright)" }}>
            <p className="quote-block__text" style={{ color: "rgba(237,229,208,0.5)", fontStyle: "italic" }}>
              &quot;저는 왕국을 위해 싸웁니다.&quot;<br />
              잠시 멈추고, 더 낮은 목소리로.<br />
              &quot;당신을 위해서도요.&quot;
            </p>
            <p className="quote-block__attr" style={{ color: "var(--blood-bright)" }}>— 퀸, 첫 번째 겨울의 전날</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SCENE: THE ROOM (봄이 오지 않는 방) ────────────────────

function SceneRoom() {
  const [activeFlower, setActiveFlower] = useState(null);

  return (
    <section id="room" className="section room">
      <div className="room__bg" aria-hidden />
      <div className="room__inner">

        <ChLabel>CHAPTER II — THE ROOM WITHOUT SPRING</ChLabel>
        <SceneTitle>
          봄이 오지 않는{" "}
          <span className="scene-title__blood">방</span>
        </SceneTitle>

        {/* 꽃 세 송이 */}
        <div className="room__flowers reveal reveal--d1">
          {FLOWERS.map((f, i) => (
            <div
              key={i}
              className="room__flower"
              onMouseEnter={() => setActiveFlower(i)}
              onMouseLeave={() => setActiveFlower(null)}
              title={f.season}
            >
              <span
                className="room__flower-icon"
                style={{
                  filter: activeFlower === i ? "none" : "grayscale(0.7) sepia(0.2)",
                  opacity: activeFlower === i ? 1 : 0.45,
                  fontSize: activeFlower === i ? 36 : 28,
                  transition: "all 0.5s ease",
                }}
              >
                {f.icon}
              </span>
              <span className="room__flower-label">{f.label}</span>
            </div>
          ))}
        </div>

        {activeFlower !== null && (
          <p
            className="story-line story-line--blood u-text-center"
            style={{ fontSize: 12, letterSpacing: 4, marginBottom: 24, fontFamily: "var(--font-display)", opacity: 0.7 }}
          >
            {FLOWERS[activeFlower].season}
          </p>
        )}

        <Divider />

        <div className="room__text">
          <p className="room__grief-line reveal reveal--d1">
            퀸에게는 아무도 모르는 방이 있었다.
          </p>
          <p className="room__grief-line reveal reveal--d1">
            왕궁 안쪽, 햇살이 잘 드는 작은 방.
          </p>
          <p className="room__grief-line reveal reveal--d1">
            그녀가 아이를 위해 남겨두었던 방.
          </p>

          <br />

          <p className="room__grief-line reveal reveal--d2">
            첫 번째 봄.
          </p>
          <p className="room__grief-line reveal reveal--d2">
            그녀는 임신을 알았다. 아무에게도 말하지 않았다.
          </p>
          <p
            className="room__grief-line reveal reveal--d2"
            style={{ color: "rgba(237,229,208,0.35)", fontStyle: "italic" }}
          >
            조금만 더. 조금만 더 확실해지면.
          </p>

          <br />

          <p className="room__grief-line reveal reveal--d3">
            하지만 봄이 끝나기 전에, 몸이 먼저 알았다.
          </p>
          <p
            className="room__grief-line room__grief-line--raw reveal reveal--d3"
          >
            퀸은 울지 않았다. 울 수가 없었다.
          </p>
          <p className="room__grief-line reveal reveal--d3">
            퀸은 우는 법을 몰랐다.
          </p>

          <br />

          <p className="room__grief-line reveal reveal--d4">
            킹에게 두 번째 소식을 전했을 때,
          </p>
          <p className="room__grief-line reveal reveal--d4">
            킹이 말했다.
          </p>
          <p
            className="story-line story-line--dialogue reveal reveal--d4"
            style={{ display: "block", marginTop: 8 }}
          >
            좋은 소식이오.
          </p>

          <br />

          <p
            className="room__grief-line reveal reveal--d5"
            style={{ color: "rgba(237,229,208,0.35)", fontStyle: "italic", fontSize: 13 }}
          >
            좋은 소식.
          </p>
          <p
            className="room__grief-line reveal reveal--d5"
            style={{ color: "rgba(237,229,208,0.35)", fontStyle: "italic", fontSize: 13 }}
          >
            왕국에 후계자가 생긴다는 소식.
          </p>
          <p
            className="room__grief-line reveal reveal--d5"
            style={{ color: "rgba(160,48,42,0.7)", fontSize: 13 }}
          >
            &lsquo;우리에게 아이가 생긴다&rsquo;는 말은 킹의 입에서 나오지 않았다.
          </p>

          <br />

          <p className="room__grief-line reveal reveal--d5">
            두 번째 가을, 몸이 다시 — 놓아버렸다.
          </p>
          <p className="room__grief-line reveal reveal--d5">
            세 번째 겨울. 처음으로 퀸은 울었다.
          </p>
          <p
            className="room__grief-line reveal reveal--d5"
            style={{ color: "rgba(237,229,208,0.3)", fontStyle: "italic" }}
          >
            소리 없이. 숨을 참고. 아무도 오지 않는 방에서.
          </p>
        </div>

        <Divider />

        <div className="reveal reveal--d5 u-text-center">
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(14px, 2.5vw, 22px)",
              fontWeight: 900,
              letterSpacing: 3,
              color: "#fff",
              lineHeight: 1.4,
            }}
          >
            SHE PRAYED ON HER KNEES —<br />
            <span style={{ color: "var(--blood-bright)" }}>
              THE FLOOR WHERE QUEENS DO NOT KNEEL.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── SCENE: THE KING'S GAME ───────────────────────────────────

function SceneKgame() {
  const [highlighted, setHighlighted] = useState(null);

  return (
    <section id="kgame" className="section kgame">
      <div className="kgame__inner">

        {/* Board side */}
        <div className="kgame__board-side">
          <div>
            <div className="chess-board reveal">
              {CHESS_BOARD_LAYOUT.map(([piece, type, hl], i) => (
                <div
                  key={i}
                  className={[
                    "chess-board__cell",
                    `chess-board__cell--${type === "d" ? "dark" : "light"}`,
                    hl ? `chess-board__cell--highlight-${hl}` : "",
                    highlighted === i ? "chess-board__cell--highlight-gold" : "",
                  ].join(" ")}
                  onMouseEnter={() => setHighlighted(i)}
                  onMouseLeave={() => setHighlighted(null)}
                >
                  {piece}
                </div>
              ))}
            </div>
            <p className="kgame__board-label">
              THE BOARD IS NEVER JUST A BOARD
            </p>
          </div>
        </div>

        {/* Text side */}
        <div className="kgame__text-side">
          <div className="kgame__tags reveal">
            {["전략 STRATEGY","기만 DECEPTION","희생 SACRIFICE","균열 THE CRACK"].map((t) => (
              <span key={t} className="kgame__tag">{t}</span>
            ))}
          </div>

          <ChLabel>CHAPTER III</ChLabel>
          <SceneTitle>
            THE KING'S{" "}
            <span className="scene-title__gold">GAME</span>
          </SceneTitle>

          <p className="story-line reveal reveal--d1">왕은 전쟁을 즐긴다.</p>
          <p className="story-line reveal reveal--d1">하지만 그는 병사를 움직이지 않는다.</p>
          <p className="story-line story-line--accent reveal reveal--d2">귀족들을 서로 싸우게 만든다.</p>

          <br />

          <p className="story-line reveal reveal--d2">퀸은 달라졌다.</p>
          <p className="story-line reveal reveal--d3">전장에서는 여전히 두려움이 없었다.</p>
          <p className="story-line reveal reveal--d3">하지만 밤이 되면,</p>
          <p className="story-line story-line--thought reveal reveal--d3">
            내가 무엇을 잘못한 것인가.<br />
            내 몸이 문제인가.<br />
            나라는 사람이 — 무언가를 품기에 부족한 것인가.
          </p>

          <br />

          <p className="story-line reveal reveal--d4">연회에 북쪽의 공주가 왔다.</p>
          <p className="story-line reveal reveal--d4">젊고, 건강하고. 눈이 맑았다.</p>
          <p className="story-line reveal reveal--d4">킹이 그 공주에게 말을 건넸다.</p>
          <p className="story-line story-line--blood reveal reveal--d4">외교적 인사였다. 누구나 알 수 있는.</p>
          <p className="story-line story-line--thought reveal reveal--d5">
            퀸은 알았다.<br />
            그러면서도 — 그날 밤 잠을 자지 못했다.
          </p>

          <br />

          <p className="story-line story-line--em reveal reveal--d5">
            승리한 가문조차 깨닫는다 —<br />
            왕은 처음부터 누구도 왕좌에 앉힐 생각이 없었다.
          </p>

          <div className="copy-block reveal reveal--d5">
            <p className="copy-en">
              <span>EVERY WAR</span>
              WAS HIS MOVE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SCENE: THE BLACK COURT ──────────────────────────────────

function SceneBlackcourt() {
  return (
    <section id="blackcourt" className="section blackcourt">
      <div className="blackcourt__bg" aria-hidden />
      <div className="blackcourt__inner">

        {/* Pieces row */}
        <div className="blackcourt__pieces-row reveal">
          {COURT_PIECES.map((p) => (
            <div
              key={p.name}
              className={`blackcourt__piece-item${p.featured ? " blackcourt__piece-item--featured" : ""}`}
            >
              <span className="piece-icon piece-icon--md">{p.icon}</span>
              <span className="blackcourt__piece-name">{p.name}</span>
              <span className="blackcourt__piece-role">{p.role}</span>
            </div>
          ))}
        </div>

        <Divider />

        {/* Text */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 640 }}>
          <ChLabel>CHAPTER IV</ChLabel>
          <SceneTitle>
            THE{" "}
            <span className="scene-title__gold">BLACK</span> COURT
          </SceneTitle>

          <p className="story-line reveal reveal--d1" style={{ textAlign: "center" }}>
            퀸이 진짜 원했던 것은,
          </p>
          <p className="story-line story-line--accent reveal reveal--d1" style={{ textAlign: "center" }}>
            아이가 아니었다.
          </p>

          <br />

          <p className="story-line reveal reveal--d2" style={{ textAlign: "center" }}>
            아니, 아이를 원했다. 간절히.
          </p>
          <p className="story-line reveal reveal--d2" style={{ textAlign: "center" }}>
            하지만 그 간절함의 밑에는 — 더 깊은 것이 있었다.
          </p>

          <br />

          <p className="story-line story-line--thought reveal reveal--d3" style={{ borderLeftColor: "var(--gold)", marginLeft: "auto", marginRight: "auto", maxWidth: 480, textAlign: "left" }}>
            그녀가 원했던 것은,<br />
            킹이 자신을 보는 방식이었다.<br />
            <br />
            전략적 자산으로서가 아니라.<br />
            왕국의 가장 강한 말(馬)로서가 아니라.<br />
            <br />
            <em>당신 때문에 내가 이렇게 된다</em>는 눈빛.<br />
            <em>당신이 아프면 나도 아프다</em>는 눈빛.
          </p>

          {/* Pillars */}
          <div className="blackcourt__pillars reveal reveal--d3">
            {PILLARS.map((p) => (
              <div key={p.en} className="blackcourt__pillar">
                <span className="blackcourt__pillar-icon">{p.icon}</span>
                <span className="blackcourt__pillar-kr">{p.kr}</span>
                <span className="blackcourt__pillar-en">{p.en}</span>
              </div>
            ))}
          </div>

          {/* The Chess Scene */}
          <div className="quote-block reveal reveal--d4" style={{ textAlign: "left", marginTop: 32 }}>
            <p className="quote-block__text">
              &quot;당신은,&quot; 퀸이 말했다.<br />
              &quot;나를 볼 때 무엇이 보입니까.&quot;<br /><br />
              &quot;퀸이 보이오.&quot;<br /><br />
              &quot;퀸이 아닌 나는요.&quot;
            </p>
          </div>

          <div className="quote-block reveal reveal--d4" style={{ borderLeftColor: "var(--blood-bright)", marginTop: 12, textAlign: "left" }}>
            <p className="quote-block__text">
              킹이 잠시 멈췄다.<br />
              퀸은 기다렸다.<br />
              그 대답을 위해 몇 년을 기다렸는지도 모르면서.
            </p>
          </div>

          <div className="copy-block reveal reveal--d5">
            <p className="copy-en u-text-center">
              <span>LOYALTY</span>
              IS THE RAREST PIECE.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── SCENE: EPILOGUE ─────────────────────────────────────────

function SceneEpilogue() {
  return (
    <section id="epilogue" className="section epilogue">
      <div className="epilogue__bg" aria-hidden />
      <div className="epilogue__watermark" aria-hidden>♔</div>

      <div className="epilogue__inner">
        <span className="piece-icon piece-icon--lg reveal" style={{ animation: "floatY 4s ease-in-out infinite" }}>
          ♔
        </span>

        <ChLabel>EPILOGUE — THE KING'S TRUTH</ChLabel>

        {/* Three copies */}
        <div className="epilogue__copy-rows">
          {[
            { piece: "♟", text: "HE MOVED MEN LIKE ", gold: "PIECES.", featured: false },
            { piece: "♔", text: "EVERY WAR WAS ",      gold: "HIS MOVE.", featured: true },
            { piece: "♛", text: "LOYALTY IS THE ",     gold: "RAREST PIECE.", featured: false },
          ].map((row, i) => (
            <div
              key={i}
              className={`epilogue__copy-row${row.featured ? " epilogue__copy-row--featured" : ""} reveal reveal--d${i + 1}`}
            >
              <span className="epilogue__copy-row-piece">{row.piece}</span>
              <p className="epilogue__copy-text">
                {row.text}
                <span className="g">{row.gold}</span>
              </p>
            </div>
          ))}
        </div>

        {/* The Sacrifice */}
        <div className="quote-block reveal reveal--d3" style={{ textAlign: "left", maxWidth: 580, margin: "0 auto 24px" }}>
          <p className="quote-block__text">
            &quot;그래서 저는 항상 당신의 말(馬)이었군요.&quot;<br /><br />
            &quot;아니오.&quot;<br /><br />
            킹이 처음으로 그녀를 똑바로 봤다.<br /><br />
            &quot;당신은 내가 가진 것 중 유일하게 — <strong style={{ color: "var(--cream)" }}>말(馬)로 쓰고 싶지 않았던 것이오.</strong>&quot;<br /><br />
            &quot;그 말을,&quot; 퀸이 조용히 말했다.<br />
            <em>&quot;아이들이 살아 있을 때 들었다면.&quot;</em>
          </p>
        </div>

        {/* Final conclusion */}
        <div className="epilogue__conclusion reveal reveal--d4">
          <p>
            왕은 결코 체스판에 앉지 않는다.<br />
            <strong>왕국이 곧 체스판이기 때문이다.</strong><br /><br />
            퀸은 세 번 잃었다.<br />
            전장이 아니라 — <strong>자신의 몸에서.</strong><br /><br />
            그녀가 원했던 것은 하나였다.<br />
            <strong>단 한 번, 그냥 나를 봐줬으면.</strong><br /><br />
            체스에서 킹이 혼자 남으면 진다.<br />
            <strong>그것을 그는 — 너무 늦게 알았다.</strong>
          </p>
        </div>

        {/* Bottom pieces */}
        <div className="epilogue__pieces-bottom reveal reveal--d5" aria-hidden>
          {["♙","♘","♗","♖","♕","♔"].map((p, i) => (
            <span key={i}>{p}</span>
          ))}
        </div>

        <p className="epilogue__final-tag reveal reveal--d5">
          THE KING'S GAME · A TRAGIC STORY · MMXXV
        </p>

        {/* Final copy */}
        <div className="reveal reveal--d5" style={{ marginTop: 48, textAlign: "center" }}>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(13px, 1.8vw, 17px)", lineHeight: 2.4, color: "rgba(237,229,208,0.45)", fontStyle: "italic" }}>
            ♛ She fought every war.<br />
            She lost every child.<br />
            She wanted only one thing —<br />
            <em style={{ color: "var(--gold-bright)" }}>to be seen.</em><br /><br />
            ♔ He saw everything.<br />
            He calculated everything.<br />
            He understood too late —<br />
            <em style={{ color: "var(--gold-bright)" }}>that she was not a piece.</em><br />
            <em style={{ color: "var(--cream)" }}>She was the game.</em>
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── ROOT COMPONENT ──────────────────────────────────────────

export default function Queen() {
  const sectionIds = CHAPTERS.map((c) => c.id);
  const activeSection = useActiveSection(sectionIds);
  const progress = useProgress();
  const { pos, hovering, hoverProps } = useCursor();

  useScrollReveal();

  return (
    <>
      {/* Cursor */}
      <div
        className={`cursor${hovering ? " cursor--hovering" : ""}`}
        style={{ left: pos.x, top: pos.y }}
        aria-hidden
      />

      {/* Noise */}
      <div className="noise-overlay" aria-hidden />

      {/* Progress */}
      <div className="progress-bar" style={{ width: `${progress}%` }} aria-hidden />

      {/* Nav */}
      <nav className="nav" role="navigation">
        <a className="nav__logo" href="#prologue" {...hoverProps}>
          THE KING'S GAME
        </a>
        <ul className="nav__chapters">
          {CHAPTERS.map((ch) => (
            <li key={ch.id}>
              <a
                href={`#${ch.id}`}
                className={`nav__link${activeSection === ch.id ? " nav__link--active" : ""}`}
                {...hoverProps}
              >
                {ch.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Scenes */}
      <main>
        <ScenePrologue />
        <SceneGolden />
        <SceneRoom />
        <SceneKgame />
        <SceneBlackcourt />
        <SceneEpilogue />
      </main>

      {/* Footer */}
      <footer className="footer">
        <span>THE KING'S GAME</span>
        <span>POWER · LOSS · LOVE</span>
        <span>♔ MMXXV</span>
      </footer>
    </>
  );
}