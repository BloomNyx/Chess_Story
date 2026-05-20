import { useState, useEffect } from "react";


// ── Hooks ─────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".k-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function useProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const t = document.documentElement.scrollHeight - window.innerHeight;
      setP(t > 0 ? (window.scrollY / t) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return p;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.2 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

// ── Lines Helper ──────────────────────────────────────────────
function Lines({ data }) {
  return (
    <>
      {data.map((item, i) =>
        !item.text ? (
          <span key={i} className="king-line--space" />
        ) : (
          <span key={i} className={`king-line k-reveal${item.t ? ` king-line--${item.t}` : ""}`}>
            {item.text}
          </span>
        )
      )}
    </>
  );
}

// ── Divider ───────────────────────────────────────────────────
function Divider() {
  return (
    <div className="king-divider">
      <div className="king-divider__line" />
      <span className="king-divider__crown">♔</span>
      <div className="king-divider__line" />
    </div>
  );
}

// ── Chapter Header ────────────────────────────────────────────
function ChapterHead({ num, title, sub, center }) {
  return (
    <div className={`king-chapter k-reveal`} style={center ? { textAlign: "center" } : {}}>
      <span className="king-chapter__number">{num}</span>
      <h2 className="king-chapter__title">
        {title}
        {sub && <span className="king-chapter__title--sub">{sub}</span>}
      </h2>
      <div className="king-chapter__rule" style={center ? { justifyContent: "center" } : {}}>
        <div className="king-chapter__rule-line" />
        <div className="king-chapter__rule-diamond" />
        {!center && <div className="king-chapter__rule-line" style={{ background: "linear-gradient(to left, var(--king-gold-dim), transparent)", width: 24 }} />}
      </div>
    </div>
  );
}

// ── Mistake Counter ───────────────────────────────────────────
function MistakeCounter() {
  const mistakes = [
    { num: "첫 번째 실수", text: "감정을 빼면 체스는 수학이었다 — 그리고 감정이 돌아오지 않았다." },
    { num: "두 번째 실수", text: "퀸을 전략적 자산으로 봤다. 처음부터." },
    { num: "세 번째 실수", text: "두려움을 체스판 안에 가뒀다. 감정으로 쓰는 순간 게임은 진다고." },
    { num: "네 번째 실수", text: "비숍의 말을 빌려 결정했다. 자신의 결정이 아닌 것처럼." },
  ];
  return (
    <div className="king-mistakes k-reveal">
      <span className="king-mistakes__label">킹의 실수들 — 너무 늦게 알게 된</span>
      <div className="king-mistakes__list">
        {mistakes.map((m, i) => (
          <div key={i} className="king-mistakes__item">
            <span className="king-mistakes__item-num">{m.num}</span>
            <span className="king-mistakes__item-text">{m.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Piece Memory Widget ───────────────────────────────────────
function PieceMemory() {
  const pieces = [
    { icon: "♛", name: "Queen", status: "돌아오지 않았다", state: "gone" },
    { icon: "♞", name: "Knight", status: "살아남아 후회했다", state: "alive" },
    { icon: "♝", name: "Bishop", status: "처형당했다", state: "gone" },
    { icon: "♜", name: "Rook", status: "성벽으로 남았다", state: "alive" },
    { icon: "♟", name: "Pawn", status: "퀸이 됐다", state: "alive" },
    { icon: "♔", name: "King", status: "혼자 남았다", state: "king" },
  ];
  return (
    <div className="king-memory k-reveal">
      <span className="king-memory__label">체스판 위의 모든 말들</span>
      {pieces.map((p, i) => (
        <div key={i} className={`king-memory__piece king-memory__piece--${p.state}`}>
          <span className="king-memory__piece-icon">{p.icon}</span>
          <span className="king-memory__piece-name">{p.name}</span>
          <span className="king-memory__piece-status">{p.status}</span>
        </div>
      ))}
    </div>
  );
}

// ── Board Visualization ───────────────────────────────────────
function LonelyBoard() {
  const cells = Array.from({ length: 64 }, (_, i) => {
    const row = Math.floor(i / 8);
    const col = i % 8;
    const isDark = (row + col) % 2 === 1;
    // King alone at e1, Queen spot empty at d1
    if (i === 60) return { dark: isDark, piece: "♔", type: "king" };
    if (i === 59) return { dark: isDark, piece: "·", type: "empty-king" };
    return { dark: isDark, piece: "", type: "" };
  });

  return (
    <div className="king-board k-reveal">
      {cells.map((cell, i) => (
        <div
          key={i}
          className={`king-board__cell king-board__cell--${cell.dark ? "dark" : "light"}${cell.type ? ` king-board__cell--${cell.type}` : ""}${cell.piece ? " king-board__cell--piece" : ""}`}
        >
          {cell.piece}
        </div>
      ))}
    </div>
  );
}

// ── Constants ─────────────────────────────────────────────────
const IDS = ["cover","prologue","ch1","ch2","ch3","ch4","ch5","ch6","ch7","ch8","ch9","ch10","epilogue"];
const LABELS = ["♔","서막","I","II","III","IV","V","VI","VII","VIII","IX","X","종막"];

// ── Main ──────────────────────────────────────────────────────
export default function King() {
  useScrollReveal();
  const progress = useProgress();
  const active = useActiveSection(IDS);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="king-story" data-header="king">
      <div className="king-progress" style={{ width: `${progress}%` }} />

      {/* ── COVER ── */}
      <section id="cover" className="king-cover">
        <div className="king-cover__bg" />
        <div className="king-cover__rays" />
        <div className="king-cover__ornament king-cover__ornament--tl" />
        <div className="king-cover__ornament king-cover__ornament--tr" />
        <div className="king-cover__ornament king-cover__ornament--bl" />
        <div className="king-cover__ornament king-cover__ornament--br" />

        <div className="king-cover__piece">♔</div>
        <span className="king-cover__eyebrow">The King's Game — Finale</span>
        <h1 className="king-cover__title">
          The <em>King's</em><br />Game
        </h1>
        <p className="king-cover__subtitle">게임을 만든 자의 몰락 — 왕좌에 혼자 남은 자</p>

        <div className="king-cover__pieces-row">
          {["♟","♜","♝","♞","♛","♔","♛","♞","♝","♜","♟"].map((p, i) => (
            <span key={i} className={p === "♔" ? "highlight" : ""}>{p}</span>
          ))}
        </div>

        <span className="king-cover__scroll">scroll to begin</span>
      </section>

      {/* ── PROLOGUE ── */}
      <section id="prologue">
        <div className="king-scene king-scene--centered">
          <ChapterHead num="Prologue" title="킹의 법칙" sub="The Law of the King" center />
          <Lines data={[
            { text: "체스에서 킹은 한 칸씩만 움직인다." }, { text: null },
            { text: "어느 방향으로든.", t: "pale" },
            { text: "하지만 — 한 칸.", t: "pale" }, { text: null },
            { text: "가장 느리다.", t: "ghost" },
            { text: "가장 약하다.", t: "ghost" },
            { text: "그러나 — 가장 중요하다.", t: "em" }, { text: null },
            { text: "게임의 모든 것이 킹을 위해 존재한다.", t: "gold" }, { text: null },
            { text: "킹은 그것을 알았다.", t: "" },
            { text: "어릴 때부터.", t: "pale" }, { text: null },
            { text: "그리고 그것을 — 당연하게 여겼다.", t: "ghost" }, { text: null },
            { text: "그것이 첫 번째 실수였다.", t: "amber" },
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH I ── */}
      <section id="ch1">
        <div className="king-scene">
          <ChapterHead num="Chapter I" title="킹이 되기 전" sub="Before the Crown" />
          <Lines data={[
            { text: "왕자였을 때." }, { text: "킹은 체스를 배웠다." }, { text: null },
            { text: "킹은 혼자 이기지 못한다.", t: "dialogue" },
            { text: "하지만 킹이 쓰러지면 — 게임은 끝난다.", t: "dialogue" },
            { text: "그러므로 킹은 절대 쓰러지면 안 된다.", t: "dialogue" }, { text: null },
            { text: "그럼 어떻게 해야 합니까.", t: "dialogue" }, { text: null },
            { text: "다른 말들이 쓰러지게 하시오.", t: "dialogue" },
            { text: "그것이 왕의 기술이오.", t: "dialogue" }, { text: null },
            { text: "왕자는 그날부터 체스판 앞에 앉았다.", t: "" },
            { text: "매일 밤.", t: "pale" }, { text: "혼자서.", t: "pale" }, { text: null },
            { text: "어느 말을 언제 희생할 것인지.", t: "" },
            { text: "어느 수가 가장 효율적인지.", t: "" }, { text: null },
            { text: "감정을 빼면 — 체스는 수학이었다.", t: "thought" },
            { text: "왕자는 감정을 뺐다.", t: "thought" },
            { text: "연습처럼. 반복처럼.", t: "thought" }, { text: null },
            { text: "그리고 어느 날 — 감정이 돌아오지 않았다.", t: "em" }, { text: null },
            { text: "왕자는 그것을 성장이라 불렀다.", t: "ghost" },
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH II ── */}
      <section id="ch2">
        <div className="king-scene">
          <ChapterHead num="Chapter II" title="왕좌에 오른 날" sub="The Day He Took the Throne" />
          <Lines data={[
            { text: "킹이 왕좌에 오른 날." }, { text: null },
            { text: "아무도 울지 않았다.", t: "pale" },
            { text: "신하들은 무릎을 꿇었다.", t: "pale" },
            { text: "백성들은 환호했다.", t: "pale" },
            { text: "비숍이 왕관을 씌웠다.", t: "pale" }, { text: null },
            { text: "킹은 그 모든 것을 위에서 내려다봤다.", t: "em" }, { text: null },
            { text: "체스판이 놓인 것이다.", t: "gold" },
            { text: "이제 게임이 시작된다.", t: "gold" }, { text: null },
            { text: "그날 밤 킹은 체스판 앞에 앉았다.", t: "" }, { text: null },
            { text: "퀸의 자리는 비어 있었다.", t: "pale" },
            { text: "아직.", t: "ghost" }, { text: null },
            { text: "언젠가 저 자리에 올 사람을.", t: "" },
            { text: "가장 강한 말을.", t: "em" }, { text: null },
            { text: "게임을 이기려면 퀸이 필요하다.", t: "thought" }, { text: null },
            { text: "그것이 킹의 첫 번째 수였다.", t: "amber" },
            { text: "그리고 — 가장 긴 계산이 시작됐다.", t: "ghost" },
          ]} />
          <LonelyBoard />
        </div>
        <Divider />
      </section>

      {/* ── CH III ── */}
      <section id="ch3">
        <div className="king-scene">
          <ChapterHead num="Chapter III" title="퀸을 처음 본 날" sub="The Day He First Saw Her" />
          <Lines data={[
            { text: "퀸이 왕국에 온 날." }, { text: null },
            { text: "킹은 창가에 서 있었다.", t: "" },
            { text: "그녀를 봤다.", t: "" },
            { text: "보지 않는 척했다.", t: "pale" }, { text: null },
            { text: "걷는 방식이 달랐다.", t: "" },
            { text: "왕좌를 두려워하지 않는 눈.", t: "em" }, { text: null },
            { text: "킹은 그날 밤 체스판을 꺼냈다.", t: "" },
            { text: "퀸 말(馬)을 손에 쥐었다.", t: "" }, { text: null },
            { text: "가장 많이 움직이는 말.", t: "pale" },
            { text: "가장 멀리 가는 말.", t: "pale" }, { text: null },
            { text: "모든 게임에는 첫 번째 수가 있다.", t: "thought" },
            { text: "나는 이미 뒀다.", t: "thought" }, { text: null },
            { text: "킹은 그렇게 생각했다.", t: "" },
            { text: "퀸을 — 전략적 자산으로.", t: "ghost" },
            { text: "게임의 가장 중요한 말로.", t: "ghost" }, { text: null },
            { text: "그것이 두 번째 실수였다.", t: "amber" },
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH IV ── */}
      <section id="ch4">
        <div className="king-scene">
          <ChapterHead num="Chapter IV" title="킹이 알고 있던 것들" sub="Everything He Already Knew" />
          <Lines data={[
            { text: "킹은 모든 것을 알았다.", t: "em" }, { text: null },
            { text: "나이트가 퀸을 흠모한다는 것을.", t: "pale" },
            { text: "비숍이 뇌물을 받는다는 것을.", t: "pale" },
            { text: "룩이 명령을 하나 어겼다는 것을.", t: "pale" },
            { text: "폰이 퀸의 방 앞에 물을 가져다 놓는다는 것을.", t: "pale" }, { text: null },
            { text: "집행자의 왕국에서", t: "" },
            { text: "비밀은 하루를 넘기지 못한다.", t: "gold" }, { text: null },
            { text: "그리고 알았다.", t: "em" }, { text: null },
            { text: "퀸의 작은 방을.", t: "" },
            { text: "꽃 세 송이를.", t: "" },
            { text: "퀸이 무릎을 꿇었다는 것을.", t: "" },
            { text: "전장에서도 꿇지 않던 무릎을.", t: "ghost" }, { text: null },
            { text: "킹은 그것을 알면서 — 체스판을 봤다.", t: "" }, { text: null },
          ]} />

          <div className="king-throne k-reveal">
            <span className="king-throne__piece">♛</span>
            <p className="king-throne__text">
              퀸이 킹 말(馬)을 자신의 말 옆에 놓았던 날.<br />
              나란히.<br /><br />
              킹은 처음으로 — 두려움을 느꼈다.<br />
              전략이 아닌 감정으로서의.<br />
              퀸이 자신을 너무 잘 안다는.<br /><br />
              그리고 두 번째.<br />
              자신도 그녀를 놓아주고 싶지 않다는.
            </p>
          </div>

          <Lines data={[
            { text: null },
            { text: "킹은 그 두려움을 — 체스판 안에 가뒀다.", t: "" },
            { text: "감정으로 쓰는 순간, 게임은 진다.", t: "thought" }, { text: null },
            { text: "그것이 세 번째 실수였다.", t: "amber" },
            { text: "그리고 가장 큰.", t: "ghost" },
          ]} />

          <MistakeCounter />
        </div>
        <Divider />
      </section>

      {/* ── CH V ── */}
      <section id="ch5">
        <div className="king-scene">
          <ChapterHead num="Chapter V" title="비숍의 제안" sub="The Bishop's Suggestion" />
          <Lines data={[
            { text: "비숍이 먼저 말했다.", t: "" }, { text: null },
            { text: "퀸을 쓰십시오. 남쪽 전선, 단독으로.", t: "dialogue" }, { text: null },
            { text: "킹은 그 말을 들었다.", t: "" },
            { text: "그리고 알았다.", t: "em" }, { text: null },
            { text: "비숍이 왜 그 말을 하는지를.", t: "" },
            { text: "뇌물. 모함. 자신의 자리.", t: "pale" },
            { text: "비숍의 속셈을 — 킹은 처음부터 알고 있었다.", t: "ghost" }, { text: null },
            { text: "그럼에도.", t: "amber" }, { text: null },
            { text: "킹은 오래 침묵했다.", t: "" }, { text: null },
            { text: "비숍을 이용해야 한다.", t: "thought" },
            { text: "퀸을 희생하는 것이 — 내 결정이 아닌 것처럼.", t: "thought" }, { text: null },
            { text: "그것이 네 번째 실수였다.", t: "amber" },
            { text: "자신에게 거짓말한 것이.", t: "ghost" }, { text: null },
            { text: "……그리하시오.", t: "dialogue" },
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH VI ── */}
      <section id="ch6">
        <div className="king-scene">
          <ChapterHead num="Chapter VI" title="룩에게 명령한 밤" sub="The Night He Ordered the Rook" />
          <Lines data={[
            { text: "킹은 룩을 불렀다.", t: "" }, { text: null },
            { text: "퀸에게 전하시오. 남쪽으로 가야 한다고.", t: "dialogue" }, { text: null },
            { text: "룩이 움직이지 않았다.", t: "em" },
            { text: "처음으로.", t: "em" }, { text: null },
            { text: "……직접 말씀하십시오.", t: "dialogue" }, { text: null },
            { text: "킹은 그 말을 들었다.", t: "" }, { text: null },
            { text: "룩도 알고 있다.", t: "thought" },
            { text: "그것이 어떤 명령인지를.", t: "thought" },
            { text: "그리고 룩은 — 킹이 직접 말하기를 원하는 것이다.", t: "thought" },
            { text: "그것이 유일한 예의라고.", t: "thought" }, { text: null },
            { text: "킹은 고개를 저었다.", t: "ghost" }, { text: null },
            { text: "명령이오.", t: "dialogue" }, { text: null },
            { text: "룩이 고개를 숙였다.", t: "" },
            { text: "그리고 걸어나갔다.", t: "" }, { text: null },
            { text: "킹은 그 등을 봤다.", t: "" }, { text: null },
            { text: "직선으로 걷는 룩의 등이.", t: "pale" },
            { text: "그날따라 — 무거워 보였다.", t: "pale" },
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH VII ── */}
      <section id="ch7">
        <div className="king-scene">
          <ChapterHead num="Chapter VII" title="퀸과의 마지막 밤" sub="The Last Night with the Queen" />
          <Lines data={[
            { text: "퀸이 킹의 방에 왔다.", t: "" }, { text: null },
            { text: "두 사람은 오래 침묵했다.", t: "pale" },
            { text: "촛불이 흔들렸다.", t: "pale" }, { text: null },
            { text: "알고 있었습니까.", t: "dialogue" },
            { text: "처음부터. 제가 이렇게 쓰일 거라는 것을.", t: "dialogue" }, { text: null },
            { text: "체스에서 퀸을 희생하는 수가 있소.", t: "dialogue" },
            { text: "가장 어려운 수.", t: "dialogue" },
            { text: "하지만 때로 — 유일한 수.", t: "dialogue" }, { text: null },
            { text: "그래서 저는 항상 당신의 말(馬)이었군요.", t: "dialogue" }, { text: null },
            { text: "아니오.", t: "em" }, { text: null },
            { text: "당신은 내가 가진 것 중 유일하게 —", t: "" },
            { text: "말(馬)로 쓰고 싶지 않았던 것이오.", t: "em" }, { text: null },
            { text: "하지만 쓰셨습니다.", t: "dialogue" }, { text: null },
            { text: "킹은 아무 말도 하지 않았다.", t: "ghost" }, { text: null },
            { text: "그 말을.", t: "dialogue" },
            { text: "아이들이 살아 있을 때 들었다면.", t: "dialogue" }, { text: null },
            { text: "킹이 눈을 감았다.", t: "pale" }, { text: null },
          ]} />

          <div className="king-throne k-reveal">
            <span className="king-throne__piece">♛</span>
            <p className="king-throne__text">
              퀸이 자신의 말(馬)을 판 밖으로 내려놓기 직전.<br />
              그녀는 잠깐 — 킹을 봤다.<br /><br />
              한 번만.<br />
              그냥 나를 봐줬으면.<br /><br />
              킹은 그 눈을 봤다.<br />
              그리고 — 처음으로 알았다.<br />
              퀸이 원했던 것이 무엇인지를.<br /><br />
              너무 늦게.
            </p>
          </div>

          <Lines data={[
            { text: null },
            { text: "문이 닫혔다.", t: "ghost" }, { text: null },
            { text: "킹은 그 자리에 오래 서 있었다.", t: "" },
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH VIII ── */}
      <section id="ch8">
        <div className="king-scene">
          <ChapterHead num="Chapter VIII" title="전쟁이 끝난 밤" sub="The Night the War Ended" />
          <Lines data={[
            { text: "전쟁이 끝났다.", t: "em" }, { text: null },
            { text: "왕국이 살아남았다.", t: "gold" },
            { text: "신하들이 축하했다.", t: "pale" }, { text: null },
            { text: "체스에서 퀸을 희생하면 게임에서 이긴다.", t: "" },
            { text: "킹은 이겼다.", t: "em" }, { text: null },
            { text: "신하들이 물러갔다.", t: "pale" },
            { text: "왕궁이 조용해졌다.", t: "pale" }, { text: null },
            { text: "킹은 일어났다.", t: "" }, { text: null },
            { text: "그 작은 방으로 걸어갔다.", t: "gold" }, { text: null },
            { text: "꽃 세 송이.", t: "" }, { text: null },
            { text: "세 송이의 의미를 — 이제야 알았다.", t: "" },
            { text: "아니, 알고 있었다.", t: "em" },
            { text: "알고도 — 모른 척했다.", t: "ghost" }, { text: null },
            { text: "킹은 체스판을 가져왔다.", t: "" },
            { text: "그 방 바닥에 내려놓았다.", t: "" }, { text: null },
            { text: "퀸의 말(馬)을 집었다.", t: "" }, { text: null },
            { text: "판 위에 놓지 않았다.", t: "em" },
            { text: "꽃 옆에.", t: "gold" },
            { text: "킹의 말도 그 옆에 내려놓았다.", t: "" }, { text: null },
            { text: "나란히.", t: "gold" }, { text: null },
            { text: "처음으로 — 계산 없이.", t: "em" }, { text: null },
            { text: "그것이 킹이 처음으로 둔 수였다.", t: "" },
            { text: "아무것도 얻을 수 없는.", t: "pale" },
            { text: "아무도 이기지 못하는.", t: "pale" },
            { text: "그냥 — 옆에 있고 싶다는.", t: "amber" }, { text: null },
            { text: "촛불이 꺼졌다.", t: "ghost" },
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH IX ── */}
      <section id="ch9">
        <div className="king-scene">
          <ChapterHead num="Chapter IX" title="킹이 알게 된 것" sub="What He Finally Understood" />
          <Lines data={[
            { text: "킹은 그 후로도 왕좌에 앉아 있었다.", t: "" }, { text: null },
          ]} />

          <PieceMemory />

          <Lines data={[
            { text: null },
            { text: "킹은 그 모든 것을 봤다.", t: "" }, { text: null },
            { text: "그리고 알게 됐다.", t: "em" }, { text: null },
            { text: "자신이 설계한 게임에서", t: "" },
            { text: "자신만 — 혼자라는 것을.", t: "amber" }, { text: null },
            { text: "체스에서 킹은 한 칸씩만 움직인다.", t: "" },
            { text: "가장 느리다.", t: "pale" },
            { text: "가장 약하다.", t: "pale" }, { text: null },
            { text: "킹은 처음으로 이해했다.", t: "em" }, { text: null },
            { text: "그것이 약함이 아니었다.", t: "" },
            { text: "경고였다.", t: "gold" }, { text: null },
            { text: "한 칸씩만 움직이는 자는", t: "thought" },
            { text: "한 칸씩만 잃는다.", t: "thought" },
            { text: "그리고 잃은 것을", t: "thought" },
            { text: "한 칸씩만 — 느낀다.", t: "thought" }, { text: null },
            { text: "느리게. 오래. 끝까지.", t: "ghost" },
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH X ── */}
      <section id="ch10">
        <div className="king-scene">
          <ChapterHead num="Chapter X" title="체스판 앞에서" sub="Before the Board" />
          <Lines data={[
            { text: "킹은 매일 밤 그 작은 방에 들어갔다.", t: "" }, { text: null },
            { text: "폰이 그것을 알았다.", t: "pale" },
            { text: "말하지 않았다.", t: "pale" }, { text: null },
            { text: "킹은 꽃 앞에 앉았다.", t: "" },
            { text: "체스판을 폈다.", t: "" }, { text: null },
            { text: "퀸의 말을 손에 쥐었다.", t: "" },
            { text: "오래 들여다봤다.", t: "" }, { text: null },
            { text: "그리고 — 두지 않았다.", t: "em" }, { text: null },
            { text: "이미 판 밖에 있는 말이었다.", t: "ghost" },
            { text: "돌아오지 않는.", t: "ghost" }, { text: null },
            { text: "킹은 그 말을 꽃 옆에 내려놓았다.", t: "" },
            { text: "언제나 같은 자리에.", t: "pale" }, { text: null },
            { text: "그리고 체스판을 접었다.", t: "" }, { text: null },
            { text: "게임은 끝났다.", t: "gold" }, { text: null },
            { text: "킹은 오래전에 알았어야 했다.", t: "" },
            { text: "체스에서 이기는 것과", t: "" },
            { text: "게임을 이기는 것은 — 다르다는 것을.", t: "em" }, { text: null },
            { text: "퀸은 그것을 알았다.", t: "pale" },
            { text: "처음부터.", t: "ghost" },
          ]} />
        </div>
      </section>

      {/* ── MAIN COPY ── */}
      <div className="king-copy">
        <span className="king-copy__piece">♔</span>
        <p className="king-copy__text">
          He built the game.<br />
          He moved every piece.<br />
          <em>He won.</em>
        </p>
        <span className="king-copy__sub">
          And lost everything that wasn't on the board.
        </span>
      </div>

      {/* ── EPILOGUE ── */}
      <section id="epilogue">
        <div className="king-scene king-scene--centered">
          <ChapterHead num="Epilogue" title="왕의 마지막 수" sub="The King's Final Move" center />
          <div className="king-epilogue">
            <div className="king-epilogue__bg" />
            <span className="king-epilogue__throne k-reveal">♔</span>
            <Lines data={[
              { text: "킹은 왕국에서 가장 오래 살았다.", t: "" }, { text: null },
              { text: "왕좌에서.", t: "pale" }, { text: "혼자.", t: "pale" }, { text: null },
              { text: "어느 날 밤.", t: "" },
              { text: "킹은 체스판을 꺼내지 않았다.", t: "" }, { text: null },
              { text: "그냥 꽃 앞에 앉아 있었다.", t: "pale" },
              { text: "퀸의 말을 손에 쥐고.", t: "gold" }, { text: null },
              { text: "그것으로 충분했다.", t: "em" }, { text: null },
              { text: "체스에서 킹이 혼자 남으면 — 진다.", t: "ghost" },
              { text: "체크메이트.", t: "amber" }, { text: null },
              { text: "킹은 이미 알고 있었다.", t: "" },
              { text: "자신이 언제 진 것인지를.", t: "" }, { text: null },
              { text: "퀸의 말이 판 밖으로 나간 순간.", t: "gold" }, { text: null },
              { text: "승리의 순간에.", t: "ghost" },
            ]} />
          </div>
        </div>
      </section>
    </div>
  );
}