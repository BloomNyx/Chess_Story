import { useState, useEffect } from "react";

// ── Hooks ─────────────────────────────────────────────────────
function useScrollReveal(cls = "p-reveal") {
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
          <span key={i} className="pawn-line--space" />
        ) : (
          <span key={i} className={`pawn-line p-reveal${item.t ? ` pawn-line--${item.t}` : ""}`}>
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
    <div className="pawn-divider">
      <div className="pawn-divider__line" />
      <span className="pawn-divider__symbol">♟</span>
      <div className="pawn-divider__line" />
    </div>
  );
}

// ── Vigil Component ───────────────────────────────────────────
function FlowerVigil() {
  const rows = [
    { num: "첫 번째 꽃", desc: "퀸의 눈이 처음으로 — 비어 있었다." },
    { num: "두 번째 꽃", desc: "퀸의 걸음이 조금 느려졌다." },
    { num: "세 번째 꽃", desc: "퀸은 방에서 오래 나오지 않았다." },
  ];
  return (
    <div className="pawn-vigil p-reveal">
      <span className="pawn-vigil__label">폰이 본 것 — 퀸의 방 앞에서</span>
      <div className="pawn-vigil__rows">
        {rows.map((r, i) => (
          <div key={i} className="pawn-vigil__row">
            <span className="pawn-vigil__num">{r.num}</span>
            <span className="pawn-vigil__desc">{r.desc}</span>
          </div>
        ))}
        <p className="pawn-vigil__action">
          폰은 그 방 앞에 물을 가져다 놓았다. 노크하지 않고. 그냥.<br />
          나중에 보면 없어져 있었다.
        </p>
      </div>
    </div>
  );
}

// ── Steps Component ───────────────────────────────────────────
function BoardSteps() {
  const squares = [
    { type: "dark" }, { type: "light" }, { type: "dark", label: "♟" },
    { type: "light" }, { type: "dark" }, { type: "light" },
    { type: "dark" }, { type: "crown", label: "♛" },
  ];
  return (
    <div className="pawn-steps p-reveal">
      {squares.map((s, i) => (
        <div key={i} className={`pawn-steps__square pawn-steps__square--${s.type}`}>
          {s.label || ""}
        </div>
      ))}
    </div>
  );
}

// ── Coronation Component ──────────────────────────────────────
function Coronation() {
  return (
    <div className="pawn-coronation p-reveal">
      <span className="pawn-coronation__crown">♛</span>
      <p className="pawn-coronation__text">
        체스에서 폰이 끝까지 가면 퀸이 된다.<br />
        그것이 법칙이었다.<br /><br />
        폰은 끝에 닿았다.<br />
        퀸이 됐다.<br /><br />
        하지만.<br /><br />
        퀸의 방에는 꽃 세 송이가 있었다.<br />
        퀸이라는 이름에는 — 그 사람의 모든 것이 담겨 있었다.
      </p>
    </div>
  );
}

// ── Constants ─────────────────────────────────────────────────
const IDS = ["cover","prologue","ch1","ch2","ch3","ch4","ch5","ch6","ch7","ch8","epilogue"];
const LABELS = ["♟","서막","I","II","III","IV","V","VI","VII","VIII","종막"];

// ── Main Component ────────────────────────────────────────────
export default function Pawn() {
  useScrollReveal();
  const progress = useProgress();
  const active = useActiveSection(IDS);
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="pawn-story" data-header="pawn">
      <div className="pawn-progress" style={{ width: `${progress}%` }} />

      {/* ── COVER ── */}
      <section id="cover" className="pawn-cover">
        <div className="pawn-cover__bg" />
        <div className="pawn-cover__grid" />
        <div className="pawn-cover__piece">♟</div>
        <span className="pawn-cover__eyebrow">The King's Game</span>
        <h1 className="pawn-cover__title">The <em>Pawn's</em><br />Crown</h1>
        <p className="pawn-cover__subtitle">승진의 비극 — 퀸이 되었지만 이미 늦었던 자</p>
        <span className="pawn-cover__scroll">scroll to begin</span>
      </section>

      {/* ── PROLOGUE ── */}
      <section id="prologue">
        <div className="pawn-scene pawn-scene--centered">
          <div className="pawn-chapter p-reveal">
            <span className="pawn-chapter__number">Prologue</span>
            <h2 className="pawn-chapter__title">폰의 걸음<span className="pawn-chapter__title--sub">The Pawn's Walk</span></h2>
            <div className="pawn-chapter__rule" />
          </div>
          <BoardSteps />
          <Lines data={[
            {text:"체스에서 폰은 한 칸씩 앞으로 간다."},{text:null},
            {text:"뒤로 갈 수 없다.",t:"pale"},{text:"옆으로도 갈 수 없다.",t:"pale"},{text:"오직 — 앞으로.",t:"pale"},{text:null},
            {text:"그리고 끝까지 가면.",t:"crown"},{text:"무엇이든 될 수 있다.",t:"crown"},{text:null},
            {text:"사람들은 그것을 희망이라 했다."},{text:"폰은 알았다.",t:"em"},{text:null},
            {text:"그것은 희망이 아니었다.",t:"em"},{text:null},
            {text:"끝까지 살아남아야 한다는 — 조건이었다.",t:"ghost"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH I ── */}
      <section id="ch1">
        <div className="pawn-scene">
          <div className="pawn-chapter p-reveal">
            <span className="pawn-chapter__number">Chapter I</span>
            <h2 className="pawn-chapter__title">폰이었을 때<span className="pawn-chapter__title--sub">When She Was Still a Pawn</span></h2>
            <div className="pawn-chapter__rule" />
          </div>
          <Lines data={[
            {text:"폰은 왕국에서 가장 낮은 자였다."},{text:null},
            {text:"이름도 없었다.",t:"pale"},{text:"계급도 없었다.",t:"pale"},{text:"체스판 앞줄에 서서.",t:"pale"},{text:"가장 먼저 희생되는.",t:"pale"},{text:null},
            {text:"하지만 폰은 알았다.",t:"em"},{text:null},
            {text:"가장 낮은 자는 — 가장 잘 본다.",t:"crown"},{text:null},
            {text:"위에 있는 자들이 보지 못하는 것을.",t:"pale"},{text:"땅에 가까운 자가 먼저 안다.",t:"pale"},{text:null},
            {text:"폰은 왕궁에서 일했다."},{text:"청소하고. 나르고. 닦고.",t:"pale"},{text:"그러면서 — 보았다.",t:"em"},{text:null},
            {text:"퀸이 그 작은 방에 드나드는 것을."},{text:"꽃을 들고.",t:"parch"},{text:"혼자서.",t:"parch"},{text:null},
            {text:"폰은 알았다."},{text:"퀸이 울지 못한다는 것을.",t:"pale"},
            {text:"퀸이라는 자리가 — 울게 두지 않는다는 것을.",t:"pale"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH II ── */}
      <section id="ch2">
        <div className="pawn-scene">
          <div className="pawn-chapter p-reveal">
            <span className="pawn-chapter__number">Chapter II</span>
            <h2 className="pawn-chapter__title">룩과의 결혼<span className="pawn-chapter__title--sub">The Rook and the Pawn</span></h2>
            <div className="pawn-chapter__rule" />
          </div>
          <Lines data={[
            {text:"룩이 폰에게 먼저 다가왔다."},{text:null},
            {text:"성벽 같은 사람이.",t:"pale"},{text:"낮은 자에게 먼저.",t:"pale"},{text:null},
            {text:"폰은 놀랐다."},{text:null},
            {text:"왜 나입니까.",t:"dialogue"},{text:null},
            {text:"룩이 대답했다.",t:"pale"},{text:null},
            {text:"당신은 앞으로만 가오.",t:"dialogue"},
            {text:"멈추지 않고.",t:"dialogue"},
            {text:"나는 그것이 — 성벽보다 강하다고 생각하오.",t:"dialogue"},{text:null},
            {text:"폰은 그 말을 오래 기억했다.",t:"em"},{text:null},
            {text:"결혼 후.",t:"crown"},{text:"룩은 집행자로 살았다."},{text:"폰은 왕궁에서 계속 일했다.",},{text:null},
            {text:"한 칸씩.",t:"pale"},{text:"앞으로.",t:"pale"},{text:null},
            {text:"언젠가 끝에 닿을 것이라고.",t:"ghost"},{text:"그때 무엇이 될지는 몰랐지만.",t:"ghost"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH III ── */}
      <section id="ch3">
        <div className="pawn-scene">
          <div className="pawn-chapter p-reveal">
            <span className="pawn-chapter__number">Chapter III</span>
            <h2 className="pawn-chapter__title">퀸을 본 것들<span className="pawn-chapter__title--sub">What She Witnessed</span></h2>
            <div className="pawn-chapter__rule" />
          </div>
          <Lines data={[
            {text:"폰은 퀸과 가장 가까운 자리에 있었다."},{text:null},
            {text:"높은 자들이 보지 못하는 곳에서.",t:"pale"},{text:null},
          ]} />
          <FlowerVigil />
          <Lines data={[
            {text:null},
            {text:"그것이 폰이 퀸에게 할 수 있는 전부였다.",t:"ghost"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH IV ── */}
      <section id="ch4">
        <div className="pawn-scene">
          <div className="pawn-chapter p-reveal">
            <span className="pawn-chapter__number">Chapter IV</span>
            <h2 className="pawn-chapter__title">비숍이 한 말들<span className="pawn-chapter__title--sub">What the Bishop Spread</span></h2>
            <div className="pawn-chapter__rule" />
          </div>
          <Lines data={[
            {text:"비숍이 귀족들 사이에 말을 흘렸다."},{text:"퀸이 아이를 낳지 못한다고.",t:"pale"},{text:null},
            {text:"폰은 그 말을 들었다."},{text:"낮은 자리에서.",t:"pale"},{text:null},
            {text:"귀족들의 복도에서.",t:"ghost"},{text:"신하들의 식탁에서.",t:"ghost"},{text:"그 말이 돌았다.",t:"ghost"},{text:null},
            {text:"폰은 분노했다.",t:"em"},{text:"하지만 낮은 자의 분노는",t:""},{text:"들리지 않는다.",t:"ghost"},{text:null},
            {text:"폰은 룩에게 말했다."},{text:null},
            {text:"비숍이 퀸 마마를 모함하고 있어요.",t:"dialogue"},{text:null},
            {text:"룩은 조용했다.",t:"pale"},{text:null},
            {text:"알고 있소.",t:"dialogue"},{text:"그럼 왜.",t:"dialogue"},{text:"내 자리가 아니오.",t:"dialogue"},{text:null},
            {text:"폰은 그 말에 — 처음으로 룩이 밉지 않았다.",t:"parch"},
            {text:"그냥 슬펐다.",t:"pale"},{text:null},
            {text:"직선으로만 사는 자는",t:"thought"},{text:"비스듬한 것을 막지 못한다.",t:"thought"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH V ── */}
      <section id="ch5">
        <div className="pawn-scene">
          <div className="pawn-chapter p-reveal">
            <span className="pawn-chapter__number">Chapter V</span>
            <h2 className="pawn-chapter__title">퀸이 떠나던 날<span className="pawn-chapter__title--sub">The Morning of Departure</span></h2>
            <div className="pawn-chapter__rule" />
          </div>
          <Lines data={[
            {text:"폰은 퀸이 떠나는 것을 봤다."},{text:null},
            {text:"새벽.",t:"pale"},{text:"아무도 없는 성문.",t:"pale"},{text:null},
            {text:"퀸이 혼자 말에 올랐다.",t:""},{text:"깃발도 없이.",t:"pale"},{text:"배웅도 없이.",t:"pale"},{text:null},
            {text:"폰은 달려갔다."},{text:null},
            {text:"마마.",t:"dialogue"},{text:null},
            {text:"퀸이 돌아봤다.",t:"parch"},{text:null},
            {text:"폰은 아무 말도 못했다."},{text:"할 수 있는 말이 없었다.",t:"pale"},{text:null},
            {text:"퀸이 내려와서 — 폰의 손을 잡았다.",t:"crown"},{text:null},
            {text:"잘 가요.",t:"dialogue"},{text:"당신은.",t:"dialogue"},{text:"끝까지 가요.",t:"dialogue"},{text:null},
            {text:"폰은 고개를 끄덕였다.",t:""},{text:"울지 않으려 했다.",t:"pale"},{text:null},
            {text:"퀸이 웃었다.",t:"parch"},{text:"눈물 없이.",t:"pale"},{text:"그것이 퀸이었다.",t:"pale"},{text:null},
            {text:"말이 떠났다.",t:""},{text:"폰은 성문 앞에 서 있었다.",t:""},{text:"새벽이 밝아오고 있었다.",t:"pale"},{text:null},
            {text:"끝까지 가요.",t:"thought"},{text:null},
            {text:"폰은 그 말을 들었다.",t:""},{text:"그리고 — 걸었다.",t:"crown"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH VI ── */}
      <section id="ch6">
        <div className="pawn-scene">
          <div className="pawn-chapter p-reveal">
            <span className="pawn-chapter__number">Chapter VI</span>
            <h2 className="pawn-chapter__title">퀸의 자리<span className="pawn-chapter__title--sub">The Empty Throne</span></h2>
            <div className="pawn-chapter__rule" />
          </div>
          <Lines data={[
            {text:"전쟁이 끝나고.",t:""},{text:"퀸이 돌아오지 않았다.",t:"em"},{text:null},
            {text:"어느 날 킹이 불렀다."},{text:"폰을.",t:"crown"},{text:null},
            {text:"폰은 무릎을 꿇었다.",t:"pale"},{text:null},
            {text:"그대를 퀸으로 삼겠소.",t:"dialogue"},{text:null},
            {text:"폰은 고개를 들었다.",t:""},{text:null},
            {text:"왜 저입니까.",t:"dialogue"},{text:null},
            {text:"킹은 대답하지 않았다.",t:"ghost"},{text:"대신 — 창밖을 봤다.",t:"ghost"},{text:null},
            {text:"폰은 알았다.",t:"em"},{text:"킹이 말할 수 없다는 것을.",t:""},{text:null},
            {text:"퀸을 잃은 자리에.",t:"thought"},{text:"퀸과 가장 가까이 있었던 자를.",t:"thought"},{text:"그렇게 — 채우려 한다는 것을.",t:"thought"},{text:null},
            {text:"그것이 애도인지 이용인지.",t:"pale"},{text:"폰은 끝내 알지 못했다.",t:"ghost"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH VII ── */}
      <section id="ch7">
        <div className="pawn-scene">
          <div className="pawn-chapter p-reveal">
            <span className="pawn-chapter__number">Chapter VII</span>
            <h2 className="pawn-chapter__title">퀸이 된 날<span className="pawn-chapter__title--sub">The Day She Was Crowned</span></h2>
            <div className="pawn-chapter__rule" />
          </div>
          <Lines data={[
            {text:"폰은 퀸이 됐다.",t:"crown"},{text:null},
            {text:"왕관이 씌워졌다.",t:"pale"},{text:"예복이 입혀졌다.",t:"pale"},{text:"신하들이 무릎을 꿇었다.",t:"pale"},{text:null},
            {text:"폰은 그 자리에 서서 생각했다.",t:"em"},{text:null},
          ]} />
          <Coronation />
          <Lines data={[
            {text:null},
            {text:"폰은 퀸이 됐지만.",t:""},{text:"퀸이 될 수 없었다.",t:"em"},{text:null},
            {text:"그 자리는 — 이미 누군가의 것이었다.",t:"ghost"},
          ]} />
        </div>
        <Divider />
      </section>

      {/* ── CH VIII ── */}
      <section id="ch8">
        <div className="pawn-scene">
          <div className="pawn-chapter p-reveal">
            <span className="pawn-chapter__number">Chapter VIII</span>
            <h2 className="pawn-chapter__title">폰이 한 것<span className="pawn-chapter__title--sub">What She Did First</span></h2>
            <div className="pawn-chapter__rule" />
          </div>
          <Lines data={[
            {text:"폰은 퀸으로서 첫 번째로 한 일이 있었다."},{text:null},
            {text:"그 작은 방.",t:"parch"},{text:"아무도 들어가지 못하게 봉인된.",t:"pale"},{text:null},
            {text:"폰은 혼자 들어갔다.",t:"em"},{text:null},
            {text:"꽃 세 송이.",t:"crown"},{text:"체스 말 두 개.",t:"crown"},{text:"나란히.",t:"crown"},{text:null},
            {text:"폰은 오래 그 앞에 앉아 있었다.",t:"pale"},{text:null},
            {text:"그리고 말했다.",t:""},{text:null},
            {text:"제가 왔어요.",t:"dialogue"},{text:"당신 대신이 아니에요.",t:"dialogue"},{text:"그냥 — 왔어요.",t:"dialogue"},{text:null},
            {text:"아무도 없었다.",t:"ghost"},{text:null},
            {text:"폰은 자신의 퀸 말(馬)을 꺼냈다.",t:""},{text:"새로 만들어진. 반짝이는.",t:"pale"},{text:null},
            {text:"그 말을 — 기존의 말들 옆에 놓지 않았다.",t:"em"},{text:null},
            {text:"조금 떨어진 곳에.",t:"thought"},{text:"하지만 — 같은 방향을 보게.",t:"thought"},{text:null},
            {text:"저는 당신의 자리를 채우러 온 게 아니에요.",t:"dialogue"},
            {text:"그냥 — 당신 옆에 있고 싶었어요.",t:"dialogue"},{text:null},
            {text:"폰은 일어났다.",t:""},{text:"문을 닫았다.",t:"pale"},{text:null},
            {text:"복도에 룩이 서 있었다.",t:"parch"},{text:"기다리고 있었다.",t:"pale"},{text:null},
            {text:"두 사람은 아무 말 없이 걸었다.",t:"em"},{text:"나란히.",t:"crown"},{text:"앞으로.",t:"crown"},
          ]} />
        </div>
      </section>

      {/* ── MAIN COPY ── */}
      <div className="pawn-copy">
        <span className="pawn-copy__piece">♟</span>
        <p className="pawn-copy__text">
          She reached the end of the board.<br />
          The crown was waiting.<br />
          <em>So was the emptiness beneath it.</em>
        </p>
      </div>

      {/* ── EPILOGUE ── */}
      <section id="epilogue">
        <div className="pawn-scene pawn-scene--centered">
          <div className="pawn-chapter p-reveal">
            <span className="pawn-chapter__number">Epilogue</span>
            <h2 className="pawn-chapter__title">퀸으로 산다는 것<span className="pawn-chapter__title--sub">What It Means to Wear the Crown</span></h2>
            <div className="pawn-chapter__rule" style={{ margin: "20px auto 0" }} />
          </div>
          <div className="pawn-epilogue">
            <div className="pawn-epilogue__bg" />
            <div className="pawn-epilogue__pieces p-reveal">
              <span>♛</span><span>♔</span><span>♞</span><span>♝</span><span>♜</span><span>♟</span>
            </div>
            <Lines data={[
              {text:"폰은 퀸으로 살았다."},{text:null},
              {text:"잘 했다.",t:"pale"},{text:"강했다.",t:"pale"},{text:"왕국이 안정됐다.",t:"pale"},{text:null},
              {text:"하지만 밤이 되면.",t:""},{text:"폰은 혼자 그 작은 방 앞에 섰다.",t:"parch"},{text:null},
              {text:"들어가지 않았다.",t:"pale"},{text:"그냥 — 문 앞에.",t:"pale"},{text:null},
              {text:"체스에서 폰이 퀸이 되면",t:"thought"},{text:"이전의 폰으로는 돌아갈 수 없다.",t:"thought"},{text:null},
              {text:"폰은 알았다.",t:"em"},{text:"자신이 퀸인지.",t:"pale"},
              {text:"아직도 폰인지.",t:"pale"},{text:"어쩌면 — 둘 다인지.",t:"pale"},{text:null},
              {text:"다만 한 가지는 알았다.",t:"em"},{text:null},
              {text:"끝까지 왔다.",t:"crown"},{text:"그것만은.",t:"crown"},
            ]} />
          </div>
        </div>
      </section>
    </div>
  );
}