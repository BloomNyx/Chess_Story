export default function PawnHeader({ chapters = [], labels = [], activeChapter = "", onSelect = () => {} }) {
  return (
    <nav className="pawn-nav">
      <span className="pawn-nav__symbol">♟ Pawn</span>
      <ul className="pawn-nav__chapters">
        {(Array.isArray(chapters) ? chapters : []).map((id, index) => (
          <li
            key={id}
            className={`pawn-nav__chapter${activeChapter === id ? " active" : ""}`}
            onClick={() => onSelect(id)}
          >
            {labels[index]}
          </li>
        ))}
      </ul>
    </nav>
  );
}
