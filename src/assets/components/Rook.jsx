import { useState, useEffect } from "react";

// ── Hooks ─────────────────────────────────────────────────────
function useScrollReveal(cls = "r-reveal") {
  useEffect(() => {
    const els = document.querySelectorAll(`.${cls}`);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [cls]);
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
      { threshold: 0.25 }
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
          <span key={i} className="rook-line--space" />
        ) : (
          <span key={i} className={`rook-line r-reveal${item.t ? ` rook-line--${item.t}` : ""}`}>
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
    <div className="rook-divider">
      <div className="rook-divider__line" />
      <span className="rook-divider__symbol">♜</span>
      <div className="rook-divider__line" />
    </div>
  );
}

// ── Constants ─────────────────────────────────────────────────
const IDS = ["cover","prologue","ch1","ch2","ch3","ch4","ch5","ch6","ch7","epilogue"];
const LABELS = ["♜","서막","I","II","III","IV","V","VI","VII","종막"];

// ── Component ─────────────────────────────────────────────────
export default function Rook() {
  useScrollReveal();
  const progress = useProgress();
  const active = useActiveSection(IDS);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="rook-story">
      <div className="rook-progress" style={{ width: `${progress}%` }} />

      {/* Nav */}
      <nav className="rook-nav">
        <span className="rook-nav__symbol">♜ ROOK</span>
        <ul className="rook-nav__chapters">
          {IDS.map((id, i) => (
            <li key={id} className={`rook-nav__chapter${active === id ? " active" : ""}`} onClick={() => go(id)}>
              {LABELS[i]}
            </li>
          ))}
        </ul>
      </nav>

      {/* ── COVER ── */}
      <section id="cover" className="rook-cover">
        <div className="rook-cover__bg" />
        <div className="rook-cover__crack rook-cover__crack--left" />
        <div className="rook-cover__crack rook-cover__crack--right" />
        <div className="rook-cover__battlements">
          {Array.from({length: 20}).map((_,i) => <div key={i} className="rook-cover__merlon" />)}
        </div>
        <div className="rook-cover__piece">♜</div>
        <span className="rook-cover__eyebrow">The King's Game</span>
        <h1 className="rook-cover__title">The <em>Rook's</em><br />Wall</h1>
        <p className="rook-cover__subtitle">성벽의 몰락 — 안에서 무너지는 자</p>
        <span className="rook-cover__scroll">scroll to begin</span>
      </section>

      {/* ── PROLOGUE ── */}
      <section id="prologue">
        <div className="rook-scene rook-scene--centered">
          <div className="rook-chapter r-reveal">
            <span className="rook-chapter__number">Prologue</span>
            <h2 className="rook-chapter__title">성벽의 법칙<span className="rook-chapter__title--sub">The Law of the Wall</span></h2>
            <div className="rook-chapter__rule" />
          </div>
          <Lines data={[
            {text:"체스에서 룩은 직선으로만 간다."},{text:null},
            {text:"앞으로. 뒤로. 옆으로.",t:"pale"},
            {text:"꺾지 않는다.",t:"pale"},
            {text:"비틀지 않는다.",t:"pale"},
            {text:"망설이지 않는다.",t:"pale"},{text:null},
            {text:"그것이 룩의 힘이었다."},{text:"그리고 — 룩의 감옥이었다.",t:"crack"},{text:null},
            {text:"직선으로만 사는 자는"},{text:"비스듬한 것을 보지 못한다.",t:"em"},
            {text:"자신의 옆에서 일어나는 일을.",t:"ghost"},
            {text:"자신의 안에서 일어나는 일을.",t:"ghost"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH I ── */}
      <section id="ch1">
        <div className="rook-scene">
          <div className="rook-chapter r-reveal">
            <span className="rook-chapter__number">Chapter I</span>
            <h2 className="rook-chapter__title">룩이 된 날<span className="rook-chapter__title--sub">The Day He Became the Rook</span></h2>
            <div className="rook-chapter__rule" />
          </div>
          <Lines data={[
            {text:"룩이 킹의 집행자가 된 것은"},{text:"나이트와 같은 해였다."},{text:null},
            {text:"나이트는 싸우고 싶어서 왔다.",t:"pale"},
            {text:"룩은 — 지키고 싶어서 왔다.",t:"em"},{text:null},
            {text:"지켜야 할 것이 있었다."},{text:"왕국의 성벽.",t:"cold"},{text:"그리고 한 사람.",t:"cold"},{text:null},
            {text:"폰.",t:"crack"},{text:null},
            {text:"그녀는 그때 아직 폰이었다."},{text:"가장 낮은 자리.",t:"pale"},{text:"가장 느린 걸음.",t:"pale"},
            {text:"하지만 룩은 알았다.",t:"em"},{text:null},
            {text:"폰은 끝까지 가면 — 퀸이 된다.",t:"crack"},{text:null},
            {text:"그것이 체스의 법칙이었다."},{text:"그리고 룩은 그 날을 기다렸다.",},{text:"아내가 퀸이 되는 날을.",t:"cold"},{text:null},
            {text:"그때까지 — 지키면 됐다.",t:"ghost"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH II ── */}
      <section id="ch2">
        <div className="rook-scene">
          <div className="rook-chapter r-reveal">
            <span className="rook-chapter__number">Chapter II</span>
            <h2 className="rook-chapter__title">킹의 집행자<span className="rook-chapter__title--sub">The King's Executor</span></h2>
            <div className="rook-chapter__rule" />
          </div>
          <Lines data={[
            {text:"룩은 킹의 명령을 수행했다."},{text:null},
            {text:"감정 없이.",t:"pale"},{text:"의심 없이.",t:"pale"},{text:"직선으로.",t:"pale"},{text:null},
            {text:"귀족을 처형했다."},{text:"반란군을 진압했다."},{text:"왕국의 경계를 지켰다."},{text:null},
            {text:"신하들은 룩을 두려워했다."},{text:"차갑고. 거대하고.",t:"pale"},{text:"멈추지 않는 것 같았다.",t:"pale"},{text:null},
            {text:"두려움이 성벽이 되면",t:"thought"},{text:"실제 성벽이 필요 없어지니까.",t:"thought"},{text:null},
            {text:"밤에 집으로 돌아가면"},{text:"폰이 있었다.",t:"crack"},{text:"촛불을 켜놓고.",t:"cold"},{text:"문 앞에서.",t:"cold"},{text:null},
            {text:"룩은 그 촛불 앞에서만 — 멈췄다.",t:"em"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH III ── */}
      <section id="ch3">
        <div className="rook-scene">
          <div className="rook-chapter r-reveal">
            <span className="rook-chapter__number">Chapter III</span>
            <h2 className="rook-chapter__title">퀸에 대하여<span className="rook-chapter__title--sub">Concerning the Queen</span></h2>
            <div className="rook-chapter__rule" />
          </div>
          <Lines data={[
            {text:"퀸이 왕국에 왔을 때."},{text:"룩은 그녀를 처음 봤다."},{text:null},
            {text:"강하다.",t:"em"},{text:"왕국에서 자신 다음으로.",t:"pale"},{text:"아니, 어쩌면 — 자신보다.",t:"pale"},{text:null},
            {text:"룩은 퀸을 경계하지 않았다."},{text:"같은 편이었으니까."},{text:null},
            {text:"다만 — 생각했다.",t:"cold"},{text:null},
            {text:"퀸과 킹 사이에 무언가가 있다는 것을."},{text:"체스판의 말과 말 사이가 아닌.",t:"pale"},{text:"그 이상의 무언가가.",t:"pale"},{text:null},
            {text:"룩은 그것에 끼어들지 않았다."},{text:"자신의 자리가 아니었다.",t:"ghost"},{text:null},
            {text:"직선으로만 사는 자는",t:"thought"},{text:"대각선의 관계를 이해하지 못한다.",t:"thought"},{text:null},
            {text:"그것이 — 첫 번째 실수였다.",t:"crack"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH IV ── */}
      <section id="ch4">
        <div className="rook-scene">
          <div className="rook-chapter r-reveal">
            <span className="rook-chapter__number">Chapter IV</span>
            <h2 className="rook-chapter__title">폰이 말한 것<span className="rook-chapter__title--sub">What the Pawn Said</span></h2>
            <div className="rook-chapter__rule" />
          </div>
          <Lines data={[
            {text:"어느 날 밤 폰이 말했다."},{text:null},
            {text:"퀸 마마가 힘드신 것 같아요.",t:"dialogue"},
            {text:"아이를 원하시는데. 매번.",t:"dialogue"},
            {text:"혼자 그 방에 가시잖아요.",t:"dialogue"},
            {text:"아무도 모른 척하지만.",t:"dialogue"},{text:null},
            {text:"룩은 폰을 봤다."},{text:null},
            {text:"당신은 알고 있었어요?",t:"dialogue"},{text:null},
            {text:"룩은 대답하지 않았다.",t:"pale"},{text:null},
            {text:"알고 있었다.",t:"em"},{text:"집행자는 모든 것을 안다.",},{text:"알면서 — 직선으로 걸었다.",t:"crack"},{text:null},
            {text:"자신이 개입할 일이 아니라고.",t:"ghost"},{text:"킹과 퀸의 일이라고.",t:"ghost"},{text:null},
          ]} />

          <div className="rook-wall r-reveal">
            <span className="rook-wall__label">성벽이 갈라지는 소리</span>
            <p className="rook-wall__text">
              당신은 항상 그렇게 말하죠.<br />
              자신의 일이 아니라고.<br /><br />
              룩은 그 말을 밤새 기억했다.<br />
              자신의 일이 아니라고.<br />
              성벽 안에서 — 무언가가 갈라졌다.
            </p>
          </div>
        </div>
        <Divider />
      </section>

      {/* ── CH V ── */}
      <section id="ch5">
        <div className="rook-scene">
          <div className="rook-chapter r-reveal">
            <span className="rook-chapter__number">Chapter V</span>
            <h2 className="rook-chapter__title">퀸의 마지막 출정<span className="rook-chapter__title--sub">The Queen's Final March</span></h2>
            <div className="rook-chapter__rule" />
          </div>
          <Lines data={[
            {text:"퀸이 남쪽으로 간다는 명령이 떨어졌다."},{text:"단독으로.",t:"crack"},{text:null},
            {text:"킹이 말했다."},{text:null},
            {text:"퀸에게 전하시오. 남쪽으로 가야 한다고.",t:"dialogue"},{text:null},
            {text:"룩은 움직이지 않았다.",t:"em"},{text:"처음으로.",t:"em"},{text:null},
            {text:"……직접 말씀하십시오.",t:"dialogue"},{text:null},
            {text:"킹이 그를 봤다.",t:"pale"},{text:null},
            {text:"명령이오.",t:"dialogue"},{text:"알고 있습니다.",t:"dialogue"},{text:null},
          ]} />

          <div className="rook-door r-reveal">
            <div className="rook-door__line-v" />
            <span className="rook-door__text">퀸의 방 — 마지막 문</span>
            <div className="rook-door__line-v" />
          </div>

          <Lines data={[
            {text:"두 사람은 오래 서 있었다."},{text:"말하지 않아도 알았다.",t:"pale"},{text:null},
            {text:"킹이 보냈군요.",t:"dialogue"},{text:"……예.",t:"dialogue"},{text:null},
            {text:"퀸이 미소지었다.",t:"cold"},{text:"눈물 없이.",t:"pale"},{text:null},
            {text:"그래도 당신이 왔네요.",t:"dialogue"},{text:"직접 말하러.",t:"dialogue"},{text:null},
            {text:"룩은 아무 말도 하지 못했다.",t:"ghost"},{text:null},
            {text:"고마워요.",t:"dialogue"},{text:null},
            {text:"퀸이 문을 닫았다.",t:"pale"},{text:null},
            {text:"성벽은 — 밖에서가 아니라",t:"crack"},{text:"안에서 무너진다.",t:"crack"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH VI ── */}
      <section id="ch6">
        <div className="rook-scene">
          <div className="rook-chapter r-reveal">
            <span className="rook-chapter__number">Chapter VI</span>
            <h2 className="rook-chapter__title">퀸이 떠난 후<span className="rook-chapter__title--sub">After the Queen Was Gone</span></h2>
            <div className="rook-chapter__rule" />
          </div>
          <Lines data={[
            {text:"퀸이 돌아오지 않았다.",t:"em"},{text:null},
            {text:"룩은 그 소식을 들었다."},{text:"아무 표정 없이.",t:"pale"},{text:"집행자답게.",t:"pale"},{text:null},
            {text:"그날 밤.",t:"crack"},{text:null},
            {text:"폰이 그를 불렀다."},{text:null},
            {text:"알고 있었죠.",t:"dialogue"},{text:null},
            {text:"룩은 대답하지 않았다.",t:"ghost"},{text:null},
            {text:"그 명령이 무엇인지. 퀸 마마가 어떻게 되실지.",t:"dialogue"},{text:null},
            {text:"……알고 있었소.",t:"dialogue"},{text:null},
            {text:"그래서 직접 갔군요.",t:"dialogue"},{text:null},
            {text:"폰의 눈이 조용했다.",t:"cold"},{text:"화가 아니었다.",t:"pale"},{text:"슬픔이었다.",t:"pale"},{text:null},
            {text:"당신이 막을 수 있었을 거예요.",t:"dialogue"},{text:null},
            {text:"그랬다면 왕국이 졌을 것이오.",t:"dialogue"},{text:null},
            {text:"알아요. 그래서 안 막은 거잖아요.",t:"dialogue"},{text:null},
            {text:"룩은 아무 말도 하지 않았다.",t:"ghost"},{text:null},
            {text:"당신은 항상.",t:"thought"},
            {text:"알면서도.",t:"thought"},
            {text:"직선으로 걷잖아요.",t:"thought"},{text:null},
            {text:"그것이 비난이 아니라는 것을 룩은 알았다.",t:"cold"},
            {text:"그래서 더 — 무너졌다.",t:"crack"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH VII ── */}
      <section id="ch7">
        <div className="rook-scene">
          <div className="rook-chapter r-reveal">
            <span className="rook-chapter__number">Chapter VII</span>
            <h2 className="rook-chapter__title">룩이 남은 이유<span className="rook-chapter__title--sub">Why the Rook Remained</span></h2>
            <div className="rook-chapter__rule" />
          </div>
          <Lines data={[
            {text:"룩은 왕국을 떠나지 않았다."},{text:null},
            {text:"나이트는 살아남아 후회했다.",t:"pale"},
            {text:"비숍은 처형당했다.",t:"pale"},
            {text:"퀸은 돌아오지 않았다.",t:"pale"},{text:null},
            {text:"룩은 — 그냥 있었다.",t:"em"},{text:null},
            {text:"성벽처럼.",t:"cold"},{text:"무너지지 않는 척.",t:"pale"},{text:null},
            {text:"하지만 폰이 알았다."},{text:"성벽이 안에서 갈라진다는 것을.",t:"crack"},
            {text:"소리 없이.",t:"ghost"},{text:null},
            {text:"어느 날 룩이 퀸의 방 앞에 서 있었다."},{text:"폰이 옆에 왔다.",t:"cold"},{text:null},
            {text:"내가 막았어야 했소.",t:"dialogue"},{text:null},
            {text:"폰이 그의 손을 잡았다.",t:"cold"},{text:null},
            {text:"알아요.",t:"dialogue"},{text:null},
            {text:"하지만 당신은 못 막아요.",t:"dialogue"},
            {text:"당신은 성벽이니까.",t:"dialogue"},
            {text:"성벽은 누군가 열어야만 지나갈 수 있어요.",t:"dialogue"},{text:null},
            {text:"룩은 그 손을 오래 잡고 있었다.",t:"em"},{text:null},
            {text:"성벽은 — 혼자서는 열리지 않는다.",t:"crack"},
          ]} />
        </div>
      </section>

      {/* ── MAIN COPY ── */}
      <div className="rook-copy">
        <span className="rook-copy__piece">♜</span>
        <p className="rook-copy__text">
          He stood like a wall.<br />
          <em>He fell like one, too —</em><br />
          from the inside.
        </p>
      </div>

      {/* ── EPILOGUE ── */}
      <section id="epilogue">
        <div className="rook-scene rook-scene--centered">
          <div className="rook-chapter r-reveal">
            <span className="rook-chapter__number">Epilogue</span>
            <h2 className="rook-chapter__title">직선의 끝<span className="rook-chapter__title--sub">The End of the Line</span></h2>
            <div className="rook-chapter__rule" style={{ margin: "20px auto 0" }} />
          </div>
          <div className="rook-epilogue">
            <div className="rook-epilogue__bg" />
            <div className="rook-epilogue__pieces r-reveal">
              <span>♛</span><span>♔</span><span>♞</span><span>♝</span><span>♜</span>
            </div>
            <Lines data={[
              {text:"체스에서 룩은 끝까지 직선으로 간다."},{text:null},
              {text:"그 직선의 끝에 무엇이 있는지",t:"pale"},
              {text:"룩은 알지 못했다.",t:"pale"},{text:null},
              {text:"이제는 안다.",t:"em"},{text:null},
              {text:"직선의 끝에는 — 벽이 있다.",t:"crack"},
              {text:"그리고 그 벽 안에는.",t:"cold"},
              {text:"자신이 지키지 못한 것들이.",t:"ghost"},{text:null},
              {text:"룩은 아직 왕국에 있다."},{text:"성벽처럼.",t:"pale"},{text:null},
              {text:"갈라진 채로.",t:"crack"},{text:"무너지지 않은 채로.",t:"crack"},
            ]} />
          </div>
        </div>
      </section>
    </div>
  );
}