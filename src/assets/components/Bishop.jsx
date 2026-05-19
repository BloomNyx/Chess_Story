import { useState, useEffect } from "react";

// ── Scroll Reveal Hook ────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".bishop-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

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

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.3 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

// ── Ledger Component ──────────────────────────────────────────
function BriberyLedger() {
  const entries = [
    { from: "북쪽 공작", what: "퀸에 대한 허위 정보 유포", price: "금 200냥" },
    { from: "동쪽 상인단", what: "퀸의 감시를 '돌려주겠다'는 약속", price: "금 350냥" },
    { from: "남쪽 귀족 연합", what: "퀸의 움직임 — 비숍이 창작한 것", price: "금 480냥" },
    { from: "외국 사절단", what: "퀸 접근 차단 경고", price: "침묵의 대가" },
  ];
  return (
    <div className="bishop-ledger bishop-reveal">
      {entries.map((e, i) => (
        <div key={i} className="bishop-ledger__entry">
          <span className="bishop-ledger__from">{e.from}</span>
          <span className="bishop-ledger__what">{e.what}</span>
          <span className="bishop-ledger__price">{e.price}</span>
        </div>
      ))}
    </div>
  );
}

// ── Cathedral Prayer Component ────────────────────────────────
function CathedralPrayer({ text, night }) {
  return (
    <div className="bishop-prayer bishop-reveal">
      <span className="bishop-prayer__cross">✝</span>
      <p className="bishop-prayer__text">{text}</p>
      {night && <span className="bishop-prayer__night">{night}</span>}
    </div>
  );
}

// ── Lines renderer ────────────────────────────────────────────
function Lines({ lines }) {
  return (
    <>
      {lines.map((item, i) =>
        !item.text ? (
          <span key={i} className="bishop-line--space" />
        ) : (
          <span key={i} className={`bishop-line bishop-reveal${item.type ? ` bishop-line--${item.type}` : ""}`}>
            {item.text}
          </span>
        )
      )}
    </>
  );
}

// ── Constants ─────────────────────────────────────────────────
const CHAPTERS = ["cover", "prologue", "ch1", "ch2", "ch3", "ch4", "ch5", "ch6", "ch7", "epilogue"];
const NAV_LABELS = ["♝", "서막", "I", "II", "III", "IV", "V", "VI", "VII", "종막"];

// ── Main ─────────────────────────────────────────────────────
export default function Bishop() {
  useScrollReveal();
  const progress = useProgress();
  const active = useActiveSection(CHAPTERS);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="bishop-story">
      <div className="bishop-progress" style={{ width: `${progress}%` }} />

      {/* Nav */}
      <nav className="bishop-nav">
        <span className="bishop-nav__symbol">♝ The Bishop</span>
        <ul className="bishop-nav__chapters">
          {CHAPTERS.map((id, i) => (
            <li
              key={id}
              className={`bishop-nav__chapter${active === id ? " active" : ""}`}
              onClick={() => scrollTo(id)}
            >
              {NAV_LABELS[i]}
            </li>
          ))}
        </ul>
      </nav>

      {/* ── COVER ── */}
      <section id="cover" className="bishop-cover">
        <div className="bishop-cover__bg" />
        <div className="bishop-cover__arch" />
        <div className="bishop-cover__piece">♝</div>
        <span className="bishop-cover__eyebrow">The King's Game</span>
        <h1 className="bishop-cover__title">
          The <em>Bishop's</em><br />Confession
        </h1>
        <p className="bishop-cover__subtitle">타락한 성직자의 몰락 — 사선의 끝에서</p>
        <span className="bishop-cover__cross">✝ scroll to begin ✝</span>
      </section>

      {/* ── PROLOGUE ── */}
      <section id="prologue">
        <div className="bishop-scene bishop-scene--centered">
          <div className="bishop-chapter bishop-reveal">
            <span className="bishop-chapter__number">Prologue</span>
            <h2 className="bishop-chapter__title">
              사선(斜線)
              <span className="bishop-chapter__title--sub">The Diagonal</span>
            </h2>
            <div className="bishop-chapter__rule" />
          </div>
          <Lines lines={[
            { text: "체스에서 비숍은 대각선으로만 간다." },
            { text: null },
            { text: "진실과 거짓 사이.", type: "pale" },
            { text: "신앙과 욕망 사이.", type: "pale" },
            { text: "그 비스듬한 선 위를 — 비숍은 살았다.", type: "gold-pale" },
            { text: null },
            { text: "그리고 그 선의 끝에서" },
            { text: "처음으로 — 직선을 만났다.", type: "em" },
            { text: null },
            { text: "칼날처럼.", type: "execution" },
          ]} />
        </div>
        <div className="bishop-divider">
          <div className="bishop-divider__line" />
          <span className="bishop-divider__symbol">✝</span>
          <div className="bishop-divider__line" />
        </div>
      </section>

      {/* ── CH I ── */}
      <section id="ch1">
        <div className="bishop-scene">
          <div className="bishop-chapter bishop-reveal">
            <span className="bishop-chapter__number">Chapter I</span>
            <h2 className="bishop-chapter__title">
              비숍의 시작
              <span className="bishop-chapter__title--sub">The Beginning</span>
            </h2>
            <div className="bishop-chapter__rule" />
          </div>
          <Lines lines={[
            { text: "비숍이 킹을 처음 만난 것은" },
            { text: "킹이 왕좌에 오르기 전이었다." },
            { text: null },
            { text: "어린 왕자.", type: "pale" },
            { text: "총명하고, 차갑고,", type: "pale" },
            { text: "무언가를 감추는 눈을 가진.", type: "pale" },
            { text: null },
            { text: "비숍은 그 눈을 보고 알았다.", type: "em" },
            { text: null },
            { text: "이 아이는 왕이 된다. 그리고 왕이 되면 — 나를 필요로 한다.", type: "thought" },
            { text: null },
            { text: "비숍은 신을 믿지 않았다.", type: "gold" },
            { text: "오래전부터.", type: "" },
            { text: "하지만 신의 언어를 누구보다 잘 알았다.", type: "" },
            { text: null },
            { text: "그것으로 충분했다.", type: "em" },
            { text: null },
            { text: "진실을 말하는 자. 하지만 진실을 — 원하는 방향으로 말할 수 있는 자.", type: "dialogue" },
            { text: null },
            { text: "비숍은 미소지었다.", type: "" },
            { text: null },
            { text: "저입니다.", type: "dialogue" },
          ]} />
        </div>
        <div className="bishop-divider">
          <div className="bishop-divider__line" />
          <span className="bishop-divider__symbol">✝</span>
          <div className="bishop-divider__line" />
        </div>
      </section>

      {/* ── CH II ── */}
      <section id="ch2">
        <div className="bishop-scene">
          <div className="bishop-chapter bishop-reveal">
            <span className="bishop-chapter__number">Chapter II</span>
            <h2 className="bishop-chapter__title">
              퀸을 향한 첫 번째 칼
              <span className="bishop-chapter__title--sub">The First Strike Against the Queen</span>
            </h2>
            <div className="bishop-chapter__rule" />
          </div>
          <Lines lines={[
            { text: "퀸이 왕국에 왔을 때." },
            { text: "비숍은 가장 먼저 그녀를 알아봤다." },
            { text: null },
            { text: "강하다. 너무 강하다.", type: "thought" },
            { text: "이 여자가 있으면 — 킹은 내 말을 덜 듣는다.", type: "thought" },
            { text: null },
            { text: "그것이 비숍의 진짜 이유였다.", type: "gold" },
            { text: "왕국을 위해서가 아니었다.", type: "" },
            { text: "자신의 자리를 위해서였다.", type: "em" },
            { text: null },
            { text: "비숍은 북쪽 공작에게 찾아갔다.", type: "" },
            { text: null },
            { text: "퀸이 독자적으로 세력을 모으고 있습니다. 공작께서 손해를 보실 수도 있습니다.", type: "dialogue" },
            { text: null },
            { text: "공작의 눈이 흔들렸다.", type: "pale" },
            { text: "비숍은 그 눈을 읽었다.", type: "pale" },
            { text: null },
            { text: "다음날 공작이 킹에게 퀸을 험담했다.", type: "" },
            { text: "자신의 말처럼.", type: "" },
            { text: null },
            { text: "비숍은 그 자리에 없었다.", type: "ghost" },
            { text: "흔적도 없었다.", type: "ghost" },
            { text: null },
            { text: "그것이 시작이었다.", type: "execution" },
          ]} />
        </div>
        <div className="bishop-divider">
          <div className="bishop-divider__line" />
          <span className="bishop-divider__symbol">✝</span>
          <div className="bishop-divider__line" />
        </div>
      </section>

      {/* ── CH III ── */}
      <section id="ch3">
        <div className="bishop-scene">
          <div className="bishop-chapter bishop-reveal">
            <span className="bishop-chapter__number">Chapter III</span>
            <h2 className="bishop-chapter__title">
              뇌물의 계절
              <span className="bishop-chapter__title--sub">The Season of Bribes</span>
            </h2>
            <div className="bishop-chapter__rule" />
          </div>

          <Lines lines={[
            { text: "비숍은 조용히 부유해졌다.", type: "gold" },
            { text: null },
          ]} />

          <BriberyLedger />

          <Lines lines={[
            { text: null },
            { text: "성당 지하에 금이 쌓였다.", type: "" },
            { text: "비숍은 밤마다 기도했다.", type: "" },
            { text: "아무도 없는 성당에서.", type: "pale" },
            { text: null },
          ]} />

          <CathedralPrayer
            text="신에게가 아니었다. 자신에게. 아직 들키지 않았다. 오늘도."
            night="— 매일 밤, 성당 지하에서"
          />

          <Lines lines={[
            { text: null },
            { text: "비숍은 신의 이름으로 말했다.", type: "em" },
            { text: "신의 이름은 언제나 — 의심받지 않았다.", type: "gold-pale" },
          ]} />
        </div>
        <div className="bishop-divider">
          <div className="bishop-divider__line" />
          <span className="bishop-divider__symbol">✝</span>
          <div className="bishop-divider__line" />
        </div>
      </section>

      {/* ── CH IV ── */}
      <section id="ch4">
        <div className="bishop-scene">
          <div className="bishop-chapter bishop-reveal">
            <span className="bishop-chapter__number">Chapter IV</span>
            <h2 className="bishop-chapter__title">
              세 번의 꽃
              <span className="bishop-chapter__title--sub">Three Flowers</span>
            </h2>
            <div className="bishop-chapter__rule" />
          </div>
          <Lines lines={[
            { text: "비숍은 퀸의 작은 방을 알고 있었다." },
            { text: "꽃이 하나 놓이고. 둘이 되고. 셋이 됐다.", type: "pale" },
            { text: null },
            { text: "비숍은 그것도 팔았다.", type: "execution" },
            { text: null },
            { text: "퀸 마마의 심신이 불안정합니다. 왕국의 중책을 맡기엔 우려됩니다.", type: "dialogue" },
            { text: null },
            { text: "킹은 그 보고를 거부했다.", type: "em" },
            { text: null },
            { text: "비숍은 방향을 바꿨다.", type: "gold" },
            { text: "귀족들에게 흘렸다.", type: "" },
            { text: "퀸이 아이를 낳지 못한다. 왕국의 후계가 위태롭다.", type: "dialogue" },
            { text: null },
            { text: "그 말이 퍼졌다.", type: "" },
            { text: "퀸을 향한 시선이 달라졌다.", type: "" },
            { text: "연민인지 경멸인지 모를.", type: "pale" },
            { text: null },
            { text: "비숍은 그것을 알았다.", type: "" },
            { text: "알면서 — 멈추지 않았다.", type: "em" },
            { text: null },
            { text: "멈추면 자신이 무너지니까.", type: "thought" },
            { text: "멈추면 — 자신이 한 일들이 보이니까.", type: "thought" },
            { text: null },
            { text: "그날 밤 비숍은 성당에서 처음으로 — 무언가에 기도했다.", type: "" },
            { text: "신인지, 세 송이 꽃인지, 자신도 몰랐다.", type: "ghost" },
          ]} />
        </div>
        <div className="bishop-divider">
          <div className="bishop-divider__line" />
          <span className="bishop-divider__symbol">✝</span>
          <div className="bishop-divider__line" />
        </div>
      </section>

      {/* ── CH V ── */}
      <section id="ch5">
        <div className="bishop-scene">
          <div className="bishop-chapter bishop-reveal">
            <span className="bishop-chapter__number">Chapter V</span>
            <h2 className="bishop-chapter__title">
              비숍의 마지막 수
              <span className="bishop-chapter__title--sub">The Final Move</span>
            </h2>
            <div className="bishop-chapter__rule" />
          </div>
          <Lines lines={[
            { text: "전쟁이 오기 전." },
            { text: "비숍은 킹에게 먼저 말했다.", type: "em" },
            { text: null },
            { text: "퀸을 쓰십시오. 남쪽 전선, 단독으로.", type: "dialogue" },
            { text: null },
            { text: "비숍은 눈을 피하지 않았다.", type: "" },
            { text: null },
            { text: "가장 효율적인 수입니다.", type: "dialogue" },
            { text: null },
            { text: "효율적인 수.", type: "pale" },
            { text: "비숍은 그렇게 포장했다.", type: "pale" },
            { text: null },
            { text: "하지만 비숍은 알고 있었다.", type: "gold" },
            { text: "퀸이 살아 돌아오면 — 언젠가 드러날 것들이 있었다.", type: "" },
            { text: "뇌물. 모함. 거짓 보고들.", type: "execution" },
            { text: null },
            { text: "퀸은 영리했다.", type: "" },
            { text: "살아있는 한 — 위험했다.", type: "em" },
            { text: null },
            { text: "킹이 말했다.", type: "" },
            { text: null },
            { text: "……그리하시오.", type: "dialogue" },
            { text: null },
            { text: "비숍은 물러나며 생각했다.", type: "" },
            { text: null },
            { text: "이것으로 끝난다.", type: "thought" },
            { text: null },
            { text: "끝나지 않았다.", type: "execution" },
          ]} />
        </div>
        <div className="bishop-divider">
          <div className="bishop-divider__line" />
          <span className="bishop-divider__symbol">✝</span>
          <div className="bishop-divider__line" />
        </div>
      </section>

      {/* ── CH VI ── */}
      <section id="ch6">
        <div className="bishop-scene">
          <div className="bishop-chapter bishop-reveal">
            <span className="bishop-chapter__number">Chapter VI</span>
            <h2 className="bishop-chapter__title">
              나이트가 돌아온 날
              <span className="bishop-chapter__title--sub">The Day the Knight Returned</span>
            </h2>
            <div className="bishop-chapter__rule" />
          </div>
          <Lines lines={[
            { text: "전쟁이 끝나고." },
            { text: "나이트가 돌아왔다.", type: "em" },
            { text: null },
            { text: "나이트는 왕국에 돌아온 뒤", type: "" },
            { text: "오랫동안 아무것도 하지 않았다.", type: "" },
            { text: null },
            { text: "하지만 — 기억하고 있었다.", type: "gold" },
            { text: null },
            { text: "퀸이 고립됐던 것들.", type: "pale" },
            { text: "귀족들의 달라진 시선.", type: "pale" },
            { text: "비숍이 항상 그 자리에 있었던 것을.", type: "pale" },
            { text: null },
            { text: "나이트는 생각하지 않는 자였다.", type: "" },
            { text: "하지만 오래 살아남은 자는", type: "" },
            { text: "결국 — 생각하게 된다.", type: "em" },
            { text: null },
            { text: "그는 하나씩 찾아갔다.", type: "" },
            { text: "그들은 결국 말했다.", type: "pale" },
            { text: null },
            { text: "비숍이었다.", type: "execution" },
            { text: "언제나 비숍이었다.", type: "execution" },
            { text: null },
            { text: "나이트는 킹에게 갔다.", type: "" },
            { text: "모든 것을 가져갔다.", type: "" },
            { text: "서류. 증언. 금의 출처.", type: "gold" },
            { text: null },
            { text: "킹은 오래 읽었다.", type: "" },
            { text: "아무 말도 하지 않았다.", type: "pale" },
            { text: null },
            { text: "그리고 — 고개를 끄덕였다.", type: "em" },
          ]} />
        </div>
        <div className="bishop-divider">
          <div className="bishop-divider__line" />
          <span className="bishop-divider__symbol">✝</span>
          <div className="bishop-divider__line" />
        </div>
      </section>

      {/* ── CH VII: EXECUTION ── */}
      <section id="ch7">
        <div className="bishop-scene">
          <div className="bishop-chapter bishop-reveal">
            <span className="bishop-chapter__number">Chapter VII</span>
            <h2 className="bishop-chapter__title">
              처형
              <span className="bishop-chapter__title--sub">The Execution</span>
            </h2>
            <div className="bishop-chapter__rule" />
          </div>

          <div className="bishop-execution bishop-reveal">
            <span className="bishop-execution__label">✝ 최후의 날 — 성당에서 광장으로</span>
            <p className="bishop-execution__text">
              비숍은 아침에 끌려나왔다.<br />
              성당에서.<br />
              기도하는 척하다가.<br /><br />
              광장에 사람들이 모였다.<br />
              비숍은 걸으면서 계산했다.<br />
              아직 빠져나갈 수 있는가.<br />
              누구에게 무엇을 약속하면.
            </p>
          </div>

          <Lines lines={[
            { text: "킹이 광장에 나왔다.", type: "" },
            { text: null },
            { text: "비숍은 그 눈을 봤다.", type: "" },
            { text: "차갑고. 계산적이고.", type: "pale" },
            { text: "감정이 없는 눈.", type: "pale" },
            { text: null },
            { text: "자신이 그토록 읽어왔던 눈.", type: "ghost" },
            { text: null },
            { text: "그 눈에서 비숍은 처음으로 — 읽지 못했다.", type: "em" },
            { text: null },
            { text: "비숍.", type: "dialogue" },
            { text: "그대는 신의 이름으로 거짓을 팔았소.", type: "dialogue" },
            { text: null },
            { text: "비숍은 입을 열었다.", type: "" },
            { text: "변명을 준비하고 있었다.", type: "" },
            { text: "정교하게 짜놓은.", type: "pale" },
            { text: null },
            { text: "말하지 마시오.", type: "dialogue" },
            { text: null },
            { text: "비숍은 닫았다.", type: "ghost" },
            { text: null },
            { text: "처형이 끝났다.", type: "execution" },
            { text: null },
            { text: "비숍은 자신이 밟아온 대각선의 끝에서", type: "" },
            { text: "처음으로 — 직선을 만났다.", type: "em" },
          ]} />
        </div>
      </section>

      {/* ── MAIN COPY ── */}
      <div className="bishop-copy">
        <span className="bishop-copy__piece">♝</span>
        <p className="bishop-copy__text">
          He sold truth in the name of God.<br />
          He sold silence in the name of the King.<br />
          In the end —<br />
          <em>no one bought his mercy.</em>
        </p>
      </div>

      {/* ── EPILOGUE ── */}
      <section id="epilogue">
        <div className="bishop-scene bishop-scene--centered">
          <div className="bishop-chapter bishop-reveal">
            <span className="bishop-chapter__number">Epilogue</span>
            <h2 className="bishop-chapter__title">
              성당의 빈 자리
              <span className="bishop-chapter__title--sub">The Empty Seat</span>
            </h2>
            <div className="bishop-chapter__rule" style={{ margin: "24px auto 0" }} />
          </div>

          <div className="bishop-epilogue">
            <div className="bishop-epilogue__bg" />
            <div className="bishop-epilogue__pieces bishop-reveal">
              <span>♛</span><span>♔</span><span>♞</span><span>♝</span>
            </div>

            <Lines lines={[
              { text: "성당에는 비숍의 자리가 있었다." },
              { text: "가장 앞줄.", type: "pale" },
              { text: "가장 높은 곳.", type: "pale" },
              { text: null },
              { text: "그 자리는 오래 비워졌다.", type: "" },
              { text: null },
              { text: "킹이 명령했다.", type: "em" },
              { text: null },
              { text: "그 자리는 두시오.", type: "dialogue" },
              { text: null },
              { text: "왜인지 아무도 몰랐다.", type: "ghost" },
              { text: null },
              { text: "비숍의 성당 지하에서", type: "" },
              { text: "금이 발견됐다.", type: "gold" },
              { text: "전부 왕국 재건에 쓰였다.", type: "" },
              { text: null },
              { text: "기증자 불명.", type: "pale" },
              { text: null },
              { text: "신의 이름으로 쌓은 것이", type: "" },
              { text: "신의 이름으로 쓰였다.", type: "gold-pale" },
              { text: null },
              { text: "비숍이 들었다면 웃었을 것이다.", type: "" },
              { text: "아니면 — 울었을 것이다.", type: "pale" },
              { text: null },
              { text: "어느 쪽인지는 아무도 모른다.", type: "ghost" },
            ]} />
          </div>
        </div>
      </section>
    </div>
  );
}